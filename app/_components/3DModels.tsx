'use client';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import React, { Suspense } from 'react';
import { Group, Object3D, Mesh } from 'three';

interface ModelData {
  id: string;
  name: string;
  path: string;
  scale: number;
  position: [number, number, number];
  description: string;
  year: string;
  color?: string;
  backgroundColor?: string;
}

const modelData: ModelData[] = [
  {
    id: 'cometboy',
    name: 'Comet Boy',
    path: '/3d/cometboy.glb',
    scale: 21.5,
    position: [0, -0.95, 0],
    description: 'comet boy',
    year: '2025',
    color: '#FF6B6B',
    backgroundColor: '#000',
  },
  {
    id: 'iceboy',
    name: 'Ice Boy',
    path: '/3d/ice-boy.glb',
    scale: 11,
    position: [0, -0.85, 0],
    description: 'ice boy',
    year: '2025',
    color: '#4ECDC4',
    backgroundColor: '#000',
  },
  {
    id: 'samboypen',
    name: 'SamBoy Pen',
    path: '/3d/samboypen.glb',
    scale: 10.5,
    position: [0, -0.85, 0],
    description: 'sam boy pen',
    year: '2025',
    color: '#45B7D1',
    backgroundColor: '#000',
  },
  {
    id: 'deeperent',
    name: 'Deeperent Double Lovers',
    path: '/3d/deeperent_double_lovers.glb',
    scale: 16,
    position: [0, -1.5, 0],
    description: 'deeperent double lovers',
    year: '2025',
    color: '#FF8A3D',
    backgroundColor: '#000',
  },
];

function Model3D({
  modelPath,
  scale,
  position,
  color,
}: {
  modelPath: string;
  scale: number;
  position: [number, number, number];
  color?: string;
}) {
  const { scene } = useGLTF(modelPath);
  const ref = React.useRef<Group>(null);

  // 색상 적용 함수
  const applyColorToMeshes = React.useCallback(
    (object: Object3D) => {
      if (color) {
        object.traverse((child: Object3D) => {
          if (child instanceof Mesh && child.material) {
            // 기존 재질을 복사하여 새로운 재질 생성
            const newMaterial = child.material.clone();
            newMaterial.color.setHex(parseInt(color.replace('#', ''), 16));
            child.material = newMaterial;
          }
        });
      }
    },
    [color]
  );

  // scene이 로드되면 색상 적용
  React.useEffect(() => {
    if (scene && color) {
      applyColorToMeshes(scene);
    }
  }, [scene, color, applyColorToMeshes]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.9; // 천천히 회전
    }
  });

  return <primitive ref={ref} object={scene} scale={scale} position={position} />;
}

function ModelCard({ model }: { model: ModelData }) {
  const [enableScrollZoom, setEnableScrollZoom] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden border-6 border-white shadow-2xl rounded-2xl bg-black max-w-md mx-auto"
      style={{ willChange: 'transform' }}
    >
      <div className="aspect-[4/3] w-full h-80 md:h-96 relative">
        {/* 줌 버튼 */}
        <button
          onClick={() => setEnableScrollZoom(!enableScrollZoom)}
          className={`absolute top-2 right-2 z-20 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
            enableScrollZoom
              ? 'bg-[url("/68.jpg")] bg-cover bg-center text-white font-bold shadow-lg'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {enableScrollZoom ? 'ZOOM ON' : 'ZOOM OFF'}
        </button>

        <Canvas
          camera={{ position: [0, 0, 2.5], fov: 50 }}
          style={{
            background: model.backgroundColor || 'transparent',
            borderRadius: '1rem',
            transition: 'background-color 0.3s ease',
          }}
        >
          {/* 전체적인 환경 조명 */}
          <ambientLight intensity={0.3} />

          {/* 주요 조명 - 정면에서 */}
          <directionalLight position={[0, 0, 5]} intensity={0.4} />

          {/* 보조 조명들 - 여러 방향에서 */}
          <directionalLight position={[5, 5, 5]} intensity={0.4} />
          <directionalLight position={[-5, 5, 5]} intensity={0.4} />
          <directionalLight position={[5, -5, 5]} intensity={0.3} />
          <directionalLight position={[-5, -5, 5]} intensity={0.3} />

          {/* 상단 조명 */}
          <directionalLight position={[0, 10, 0]} intensity={0.5} />

          {/* 하단 조명 */}
          <directionalLight position={[0, -10, 0]} intensity={0.2} />

          <Suspense fallback={null}>
            <Model3D modelPath={model.path} scale={model.scale} position={model.position} color={model.color} />
          </Suspense>
          <OrbitControls enablePan={false} enableZoom={enableScrollZoom} enableRotate={true} zoomSpeed={0.8} />
        </Canvas>
      </div>
      <div className="p-6 md:p-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-xl md:text-2xl font-bold text-white">{model.name}</h3>
          <span className="text-white text-sm font-medium">{model.year}</span>
        </div>
        <p className="text-gray-300 leading-relaxed text-sm md:text-base mt-3">{model.description}</p>
      </div>
    </motion.div>
  );
}

export default function ThreeDModels() {
  return (
    <section id="works" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-center text-white mb-16"
        >
          3D WORKS
        </motion.h2>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {modelData.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      </div>
    </section>
  );
}

// glTF 로더 프리로드
modelData.forEach((model) => {
  useGLTF.preload(model.path);
});
