import { useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

// Local Draco decoder so decoding works offline (PWA) — see /public/draco.
const DRACO_PATH = '/draco/';

// The source GLBs are geometry-only sculpts (no UVs/textures/vertex colors),
// so we give every mesh a single refined "plaster" material. Colored studio
// lights (per-work accent) do the rest, yielding a museum-sculpture look.
function makePlaster() {
  return new THREE.MeshStandardMaterial({
    color: '#eae6de',
    roughness: 0.62,
    metalness: 0.04,
    envMapIntensity: 0.9,
  });
}

// Renders a GLB. Cloned so the same asset can live in a grid card and the
// spotlight stage simultaneously without sharing transforms/materials.
export function Model({ url, ...props }) {
  const { scene } = useGLTF(url, DRACO_PATH);

  // Source sculpts vary wildly in raw scale (~0.09 units tall). Normalize each
  // to a ~2-unit, origin-centered object so fixed cameras/lights behave the
  // same for every work.
  const cloned = useMemo(() => {
    const root = scene.clone(true);
    const material = makePlaster();
    root.traverse((obj) => {
      if (obj.isMesh) {
        obj.material = material;
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

  return <primitive object={cloned} {...props} />;
}
