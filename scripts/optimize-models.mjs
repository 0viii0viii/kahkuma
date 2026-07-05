// Compress raw GLB artworks for the web: Meshopt geometry compression + texture
// resize/re-encode. Run with `npm run models:optimize`.
//
// Meshopt (vs Draco) decodes an order of magnitude faster — important since our
// split models have dozens of primitives that each get decoded separately.
//
// Reads every *.glb from `raw-models/` (or the project root as a fallback) and
// writes optimized versions into `public/models/`.
import { readdir, mkdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { NodeIO } from '@gltf-transform/core';
import { EXTMeshoptCompression } from '@gltf-transform/extensions';
import { dedup, prune, resample, textureCompress, reorder, meshopt } from '@gltf-transform/functions';
import { MeshoptEncoder } from 'meshoptimizer';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const rawDir = existsSync(path.join(root, 'raw-models')) ? path.join(root, 'raw-models') : root;
const outDir = path.join(root, 'public', 'models');

const TEXTURE_MAX = 2048; // no need for 4K/8K on the web

await MeshoptEncoder.ready;
const io = new NodeIO()
  .registerExtensions([EXTMeshoptCompression])
  .registerDependencies({ 'meshopt.encoder': MeshoptEncoder });

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(1);

await mkdir(outDir, { recursive: true });
const files = (await readdir(rawDir)).filter((f) => f.toLowerCase().endsWith('.glb'));

if (files.length === 0) {
  console.error(`No .glb files found in ${rawDir}`);
  process.exit(1);
}

console.log(`Optimizing ${files.length} model(s) → public/models/\n`);

for (const file of files) {
  const src = path.join(rawDir, file);
  const dst = path.join(outDir, file);
  const before = (await stat(src)).size;

  const document = await io.read(src);
  await document.transform(
    dedup(),
    prune(),
    resample(),
    textureCompress({ encoder: sharp, targetFormat: 'webp', resize: [TEXTURE_MAX, TEXTURE_MAX] }),
    reorder({ encoder: MeshoptEncoder }), // optimize vertex order for meshopt
    meshopt({ encoder: MeshoptEncoder, level: 'high' })
  );
  await io.write(dst, document);

  const after = (await stat(dst)).size;
  const saved = (100 * (1 - after / before)).toFixed(0);
  console.log(`  ${file.padEnd(34)} ${mb(before)}MB → ${mb(after)}MB  (-${saved}%)`);
}

console.log('\nDone.');
