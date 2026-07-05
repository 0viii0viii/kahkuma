import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

// Local Draco decoder so decoding works offline (PWA) — see /public/draco.
const DRACO_PATH = '/draco/';

// The source GLBs are geometry-only sculpts (no UVs/textures/vertex colors).
// By default every mesh gets one refined "plaster" material and colored studio
// lights do the rest. If a work provides a `palette` (materialName → hex), each
// part is tinted individually — used for models split into per-part meshes.
function makeMaterial(color) {
  return new THREE.MeshStandardMaterial({
    color: color ?? '#eae6de',
    roughness: 0.6,
    metalness: 0.05,
    envMapIntensity: 0.9,
  });
}

// Renders a GLB. Cloned so the same asset can live in a grid card and the
// spotlight stage simultaneously without sharing transforms/materials.
export function Model({ url, palette, inspect, selectedPart, onSelect, ...props }) {
  const { scene } = useGLTF(url, DRACO_PATH);

  // Source sculpts vary wildly in raw scale (~0.09 units tall). Normalize each
  // to a ~2-unit, origin-centered object so fixed cameras/lights behave the
  // same for every work.
  const cloned = useMemo(() => {
    const root = scene.clone(true);
    const plaster = makeMaterial();
    const cache = new Map();
    // 'segments' auto-tints each part a distinct hue — a quick way to visualize
    // a split model's separate meshes.
    const segments = palette === 'segments';
    let seg = 0;
    root.traverse((obj) => {
      if (obj.isMesh) {
        if (inspect) {
          // Unique material per mesh so a single part can be highlighted.
          obj.material = makeMaterial(palette?.[obj.name]);
        } else if (segments) {
          obj.material = makeMaterial(new THREE.Color().setHSL((seg++ * 0.13) % 1, 0.6, 0.55));
        } else {
          // Key by mesh (node) name: material names get merged by the optimize
          // pass's dedup(), but per-part node names survive.
          const hex = palette?.[obj.name];
          if (hex) {
            if (!cache.has(hex)) cache.set(hex, makeMaterial(hex));
            obj.material = cache.get(hex);
          } else {
            obj.material = plaster;
          }
        }
        obj.castShadow = true;
        obj.receiveShadow = true;
        if (!obj.geometry.attributes.normal) obj.geometry.computeVertexNormals();
      }
    });

    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const scale = 2 / Math.max(size.x, size.y, size.z);

    const wrapper = new THREE.Group();
    root.position.sub(center); // center at origin
    wrapper.add(root);
    wrapper.scale.setScalar(scale);
    return wrapper;
  }, [scene, palette, inspect]);

  // Highlight the selected part (inspect mode only) by tinting its emissive.
  useEffect(() => {
    if (!inspect) return;
    cloned.traverse((obj) => {
      if (obj.isMesh && obj.material?.emissive) {
        const on = obj.name === selectedPart;
        obj.material.emissive.setHex(on ? 0x2266ff : 0x000000);
        obj.material.emissiveIntensity = on ? 0.9 : 0;
      }
    });
  }, [cloned, inspect, selectedPart]);

  const handleClick = inspect
    ? (e) => {
        e.stopPropagation();
        onSelect?.(e.object.name);
      }
    : undefined;

  return <primitive object={cloned} onClick={handleClick} {...props} />;
}
