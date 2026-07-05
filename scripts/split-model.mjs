// Split a single-mesh sculpt into its disconnected shells ("loose parts") so
// each becomes an independently colorable mesh — like 3haku's per-part meshes.
//
//   node scripts/split-model.mjs <name>        (reads raw-models/<name>.glb)
//
// Writes raw-models/<name>-split.glb (run models:optimize afterwards).
import { NodeIO } from '@gltf-transform/core';
import * as THREE from 'three';
import path from 'node:path';

const name = process.argv[2];
if (!name) {
  console.error('usage: node scripts/split-model.mjs <name>');
  process.exit(1);
}

const Q = 1e5; // position quantization for welding
const MIN_TRIS = 4; // drop degenerate specks

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

const io = new NodeIO();
const doc = await io.read(`raw-models/${name}.glb`);
const root = doc.getRoot();
const buffer = root.listBuffers()[0];

// Grab the (single) source primitive.
const srcMesh = root.listMeshes()[0];
const prim = srcMesh.listPrimitives()[0];

// Capture the source node's WORLD transform so we can re-apply it to each new
// part node — the export often carries a Z-up→Y-up rotation here.
const localMatrix = (node) => {
  const m = new THREE.Matrix4();
  m.compose(
    new THREE.Vector3(...node.getTranslation()),
    new THREE.Quaternion(...node.getRotation()),
    new THREE.Vector3(...node.getScale())
  );
  return m;
};
const srcNode = root.listNodes().find((n) => n.getMesh() === srcMesh);
const worldMatrix = new THREE.Matrix4();
for (let cur = srcNode, chain = []; cur; ) {
  chain.unshift(cur);
  cur = cur.listParents().find((p) => p.propertyType === 'Node');
  if (!cur) {
    for (const node of chain) worldMatrix.multiply(localMatrix(node));
  }
}
const worldArr = worldMatrix.toArray();
const posArr = prim.getAttribute('POSITION').getArray();
const nrmAttr = prim.getAttribute('NORMAL');
const nrmArr = nrmAttr ? nrmAttr.getArray() : null;
const idxArr = prim.getIndices() ? prim.getIndices().getArray() : null;
const vCount = posArr.length / 3;
const triCount = idxArr ? idxArr.length : vCount;
const at = (t) => (idxArr ? idxArr[t] : t);

// Weld coincident vertices -> canonical id, then union-find over triangles.
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

// Bucket triangles by component root.
const comps = new Map(); // root -> array of triangle start indices
for (let t = 0; t < triCount; t += 3) {
  const r = uf.find(canon[at(t)]);
  if (!comps.has(r)) comps.set(r, []);
  comps.get(r).push(t);
}

// Sort components largest-first, drop specks.
const parts = [...comps.values()].filter((tris) => tris.length / 3 >= MIN_TRIS);
parts.sort((a, b) => b.length - a.length);

// Shared material (colors are applied in-app).
const material = doc.createMaterial('default').setBaseColorFactor([0.85, 0.85, 0.85, 1]);
const scene = root.listScenes()[0];

// Remove the original mesh + its nodes.
for (const node of root.listNodes()) if (node.getMesh() === srcMesh) node.dispose();
srcMesh.dispose();

let n = 0;
for (const tris of parts) {
  // Build a compact vertex set for this part.
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
  const posAcc = doc.createAccessor().setType('VEC3').setArray(new Float32Array(pos)).setBuffer(buffer);
  const idxAcc = doc.createAccessor().setType('SCALAR').setArray(new Uint32Array(indices)).setBuffer(buffer);
  const label = `part${String(n).padStart(3, '0')}`;
  const p = doc.createPrimitive().setAttribute('POSITION', posAcc).setIndices(idxAcc).setMaterial(material);
  if (nrm) p.setAttribute('NORMAL', doc.createAccessor().setType('VEC3').setArray(new Float32Array(nrm)).setBuffer(buffer));
  const mesh = doc.createMesh(label).addPrimitive(p);
  scene.addChild(doc.createNode(label).setMesh(mesh).setMatrix(worldArr));
  n++;
}

const out = path.join('raw-models', `${name}-split.glb`);
await io.write(out, doc);
console.log(`${name}: split into ${n} parts → ${out}`);
