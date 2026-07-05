// Browser-side GLB processing for uploads: split a single-mesh sculpt into its
// disconnected shells ("loose parts") so each becomes independently colorable,
// then Meshopt-compress. Mirrors scripts/split-model.mjs + optimize-models.mjs.
import * as THREE from 'three';
import { WebIO } from '@gltf-transform/core';
import { EXTMeshoptCompression } from '@gltf-transform/extensions';
import { dedup, prune, reorder, meshopt } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptDecoder } from 'meshoptimizer';

const Q = 1e5; // position quantization for welding
const MIN_TRIS = 4;

class UF {
  constructor(n) {
    this.p = new Int32Array(n);
    for (let i = 0; i < n; i++) this.p[i] = i;
  }
  find(x) {
    while (this.p[x] !== x) x = this.p[x] = this.p[this.p[x]];
    return x;
  }
  union(a, b) {
    this.p[this.find(a)] = this.find(b);
  }
}

const localMatrix = (node) => {
  const m = new THREE.Matrix4();
  m.compose(
    new THREE.Vector3(...node.getTranslation()),
    new THREE.Quaternion(...node.getRotation()),
    new THREE.Vector3(...node.getScale())
  );
  return m;
};

function worldMatrixOf(node) {
  const chain = [];
  for (let cur = node; cur; cur = cur.listParents().find((p) => p.propertyType === 'Node')) {
    chain.unshift(cur);
  }
  const m = new THREE.Matrix4();
  for (const n of chain) m.multiply(localMatrix(n));
  return m;
}

// Split the document's single source primitive into loose parts in-place.
function splitLooseParts(doc) {
  const root = doc.getRoot();
  const buffer = root.listBuffers()[0];
  const srcMesh = root.listMeshes()[0];
  const prim = srcMesh.listPrimitives()[0];

  const posArr = prim.getAttribute('POSITION').getArray();
  const nrmAttr = prim.getAttribute('NORMAL');
  const nrmArr = nrmAttr ? nrmAttr.getArray() : null;
  const idxArr = prim.getIndices() ? prim.getIndices().getArray() : null;
  const vCount = posArr.length / 3;
  const triCount = idxArr ? idxArr.length : vCount;
  const at = (t) => (idxArr ? idxArr[t] : t);

  // Weld coincident vertices → union-find over triangles.
  const key2canon = new Map();
  const canon = new Int32Array(vCount);
  for (let i = 0; i < vCount; i++) {
    const k = `${Math.round(posArr[i * 3] * Q)},${Math.round(posArr[i * 3 + 1] * Q)},${Math.round(posArr[i * 3 + 2] * Q)}`;
    if (!key2canon.has(k)) key2canon.set(k, i);
    canon[i] = key2canon.get(k);
  }
  const uf = new UF(vCount);
  for (let t = 0; t < triCount; t += 3) {
    const a = canon[at(t)], b = canon[at(t + 1)], c = canon[at(t + 2)];
    uf.union(a, b);
    uf.union(b, c);
  }
  const comps = new Map();
  for (let t = 0; t < triCount; t += 3) {
    const r = uf.find(canon[at(t)]);
    if (!comps.has(r)) comps.set(r, []);
    comps.get(r).push(t);
  }
  const parts = [...comps.values()].filter((tris) => tris.length / 3 >= MIN_TRIS);
  parts.sort((a, b) => b.length - a.length);

  const worldArr = worldMatrixOf(root.listNodes().find((n) => n.getMesh() === srcMesh)).toArray();
  const material = doc.createMaterial('default').setBaseColorFactor([0.85, 0.85, 0.85, 1]);
  const scene = root.listScenes()[0];
  for (const node of root.listNodes()) if (node.getMesh() === srcMesh) node.dispose();
  srcMesh.dispose();

  let n = 0;
  for (const tris of parts) {
    const remap = new Map();
    const pos = [];
    const nrm = nrmArr ? [] : null;
    const indices = [];
    for (const t of tris) {
      for (let k = 0; k < 3; k++) {
        const orig = at(t + k);
        let ni = remap.get(orig);
        if (ni === undefined) {
          ni = remap.size;
          remap.set(orig, ni);
          pos.push(posArr[orig * 3], posArr[orig * 3 + 1], posArr[orig * 3 + 2]);
          if (nrm) nrm.push(nrmArr[orig * 3], nrmArr[orig * 3 + 1], nrmArr[orig * 3 + 2]);
        }
        indices.push(ni);
      }
    }
    const label = `part${String(n).padStart(3, '0')}`;
    const p = doc
      .createPrimitive()
      .setAttribute('POSITION', doc.createAccessor().setType('VEC3').setArray(new Float32Array(pos)).setBuffer(buffer))
      .setIndices(doc.createAccessor().setType('SCALAR').setArray(new Uint32Array(indices)).setBuffer(buffer))
      .setMaterial(material);
    if (nrm) {
      p.setAttribute('NORMAL', doc.createAccessor().setType('VEC3').setArray(new Float32Array(nrm)).setBuffer(buffer));
    }
    const mesh = doc.createMesh(label).addPrimitive(p);
    scene.addChild(doc.createNode(label).setMesh(mesh).setMatrix(worldArr));
    n++;
  }
  return n;
}

// Process an uploaded GLB File → { blob, parts }. Single-mesh models are split
// into loose parts; already-multi-mesh models are just compressed.
export async function processModel(file, onProgress = () => {}) {
  await Promise.all([MeshoptEncoder.ready, MeshoptDecoder.ready]);
  const io = new WebIO()
    .registerExtensions([EXTMeshoptCompression])
    .registerDependencies({ 'meshopt.encoder': MeshoptEncoder, 'meshopt.decoder': MeshoptDecoder });

  onProgress('읽는 중…');
  const buf = new Uint8Array(await file.arrayBuffer());
  const doc = await io.readBinary(buf);

  const primCount = doc.getRoot().listMeshes().reduce((s, m) => s + m.listPrimitives().length, 0);
  let parts = doc.getRoot().listMeshes().length;
  if (primCount === 1) {
    onProgress('파츠 분할 중…');
    parts = splitLooseParts(doc);
  }

  onProgress('압축 중…');
  await doc.transform(
    dedup(),
    prune(),
    reorder({ encoder: MeshoptEncoder }),
    meshopt({ encoder: MeshoptEncoder, level: 'high' })
  );

  const out = await io.writeBinary(doc);
  return { blob: new Blob([out], { type: 'model/gltf-binary' }), parts };
}
