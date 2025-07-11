'use client';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import React, { Suspense } from 'react';
import { Group } from 'three';

function CometBoyModel(props: React.ComponentProps<'group'>) {
  const { scene } = useGLTF('/3d/cometboy.glb');
  const ref = React.useRef<Group>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.9; // 천천히 회전
    }
  });
  return <primitive ref={ref} object={scene} {...props} />;
}

export default function ThreeDModels() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden border-6 border-white shadow-2xl rounded-2xl bg-black max-w-md mx-auto"
      style={{ willChange: 'transform' }}
    >
      <div className="aspect-[4/3] w-full h-80 md:h-96">
        <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }} style={{ background: 'transparent', borderRadius: '1rem' }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[2, 2, 2]} intensity={0.7} />
          <Suspense fallback={null}>
            <CometBoyModel scale={22} position={[0, -1, 0]} />
          </Suspense>
          <OrbitControls enablePan={false} enableZoom={true} />
        </Canvas>
      </div>
      <div className="p-6 md:p-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-xl md:text-2xl font-bold text-white">Comet Boy</h3>
          <span className="text-gray-400 text-sm font-medium">2025</span>
        </div>
        <p className="text-gray-300 leading-relaxed text-sm md:text-base mt-3">comet boy</p>
      </div>
    </motion.div>
  );
}

// glTF 로더 프리로드
useGLTF.preload('/3d/cometboy.glb');
