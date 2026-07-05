import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { MeshoptDecoder } from 'meshoptimizer';

// Models are Meshopt-compressed (fast decode). We inject the meshoptimizer
// decoder explicitly (drei's bundled one failed in-browser). Draco disabled.
const withMeshopt = (loader) => loader.setMeshoptDecoder(MeshoptDecoder);

const PLASTER = '#eae6de';

// The source GLBs are geometry-only sculpts (no UVs/textures/vertex colors), so
// each mesh gets its own plain material and we drive the color from `palette`
// (meshName → hex) in an effect — so recoloring never re-clones the geometry
// (fast live editing in the admin color editor).
function makeMaterial() {
  return new THREE.MeshStandardMaterial({
    color: PLASTER,
    roughness: 0.6,
    metalness: 0.05,
    envMapIntensity: 0.9,
  });
}

export function Model({ url, palette, inspect, selectedPart, onSelect, ...props }) {
  const { scene } = useGLTF(url, false, false, withMeshopt);

  // Clone + normalize once. Every mesh gets its own material instance so parts
  // can be tinted independently. Source sculpts vary wildly in raw scale
  // (~0.09 units) — normalize to a ~2-unit, origin-centered object.
  const cloned = useMemo(() => {
    const root = scene.clone(true);
    root.traverse((obj) => {
      if (obj.isMesh) {
        obj.material = makeMaterial();
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
  }, [scene]);

  // Apply per-part colors (+ selection highlight) without re-cloning.
  useEffect(() => {
    const segments = palette === 'segments';
    let seg = 0;
    cloned.traverse((obj) => {
      if (!obj.isMesh || !obj.material) return;
      const color = segments
        ? new THREE.Color().setHSL((seg++ * 0.13) % 1, 0.6, 0.55)
        : palette?.[obj.name] || PLASTER;
      obj.material.color.set(color);
      // No selection glow — the selected part shows its true color so picked
      // colors read exactly. Selection is shown in the editor panel; parts are
      // found by hovering. Emissive is driven only by the hover handler below.
      obj.material.emissive.setHex(0x000000);
      obj.material.emissiveIntensity = 0;
    });
  }, [cloned, palette]);

  // Hover highlight (inspect mode): emphasize the part under the cursor so you
  // can see which part you'll select — a transient cue, no color mixing.
  const hovered = useRef(null);
  const setHover = (obj, on) => {
    if (!obj?.material?.emissive) return;
    obj.material.emissive.setHex(on ? 0xffffff : 0x000000);
    obj.material.emissiveIntensity = on ? 0.22 : 0;
  };

  const handlers = inspect
    ? {
        onClick: (e) => {
          e.stopPropagation();
          onSelect?.(e.object.name);
        },
        onPointerOver: (e) => {
          e.stopPropagation();
          if (hovered.current && hovered.current !== e.object) setHover(hovered.current, false);
          hovered.current = e.object;
          setHover(e.object, true);
          document.body.style.cursor = 'pointer';
        },
        onPointerOut: (e) => {
          setHover(e.object, false);
          if (hovered.current === e.object) hovered.current = null;
          document.body.style.cursor = '';
        },
      }
    : {};

  return <primitive object={cloned} {...handlers} {...props} />;
}
