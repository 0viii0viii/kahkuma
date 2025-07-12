'use client';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import React, { useCallback, useMemo } from 'react';
import { Group, Object3D, Mesh } from 'three';
import { useTranslation } from 'react-i18next';
import '../../lib/i18n-client';

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
    name: 'model.cometboy.name',
    path: '/3d/cometboy.glb',
    scale: 21.5,
    position: [0, -0.95, 0],
    description: 'model.cometboy.description',
    year: '2025',
    color: '#FF6B6B',
    backgroundColor: '#000',
  },
  {
    id: 'iceboy',
    name: 'model.iceboy.name',
    path: '/3d/ice-boy.glb',
    scale: 11,
    position: [0, -0.85, 0],
    description: 'model.iceboy.description',
    year: '2025',
    color: '#4ECDC4',
    backgroundColor: '#000',
  },
  {
    id: 'samboypen',
    name: 'model.samboypen.name',
    path: '/3d/samboypen.glb',
    scale: 10.5,
    position: [0, -0.85, 0],
    description: 'model.samboypen.description',
    year: '2025',
    color: '#45B7D1',
    backgroundColor: '#000',
  },
  {
    id: 'deeperent',
    name: 'model.deeperent.name',
    path: '/3d/deeperent_double_lovers.glb',
    scale: 16,
    position: [0, -1.5, 0],
    description: 'model.deeperent.description',
    year: '2025',
    color: '#FF8A3D',
    backgroundColor: '#000',
  },
];

// 성능 최적화된 3D 모델 컴포넌트
const Model3D = React.memo(
  ({
    modelPath,
    scale,
    position,
    color,
    enableInteraction,
  }: {
    modelPath: string;
    scale: number;
    position: [number, number, number];
    color?: string;
    enableInteraction: boolean;
  }) => {
    const { scene } = useGLTF(modelPath);
    const ref = React.useRef<Group>(null);

    // 색상 적용 함수 - useCallback으로 메모이제이션
    const applyColorToMeshes = useCallback(
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

    // 자동 회전 - 상호작용이 꺼져있을 때만 동작
    useFrame((_, delta) => {
      if (ref.current && !enableInteraction) {
        ref.current.rotation.y += delta * 0.9;
      }
    });

    return <primitive ref={ref} object={scene} scale={scale} position={position} />;
  }
);

Model3D.displayName = 'Model3D';

// 성능 최적화된 조명 컴포넌트
const SceneLights = React.memo(() => (
  <>
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
  </>
));

SceneLights.displayName = 'SceneLights';

// 로딩 스피너 컴포넌트 - Canvas 외부용
const LoadingSpinner = React.memo(() => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
  </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';

// 성능 최적화된 모델 카드 컴포넌트
const ModelCard = React.memo(({ model }: { model: ModelData }) => {
  const { t } = useTranslation();
  const [enableInteraction, setEnableInteraction] = React.useState(false);
  const [isInView, setIsInView] = React.useState(false);

  // Intersection Observer로 뷰포트 진입 감지
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // 한 번만 실행
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Canvas 스타일 메모이제이션
  const canvasStyle = useMemo(
    () => ({
      background: model.backgroundColor || 'transparent',
      borderRadius: '1rem',
      transition: 'background-color 0.3s ease',
      // 모바일에서 터치 이벤트 처리 개선
      touchAction: enableInteraction ? 'none' : 'auto',
    }),
    [model.backgroundColor, enableInteraction]
  );

  // 카메라 설정 메모이제이션
  const cameraConfig = useMemo(
    () => ({
      position: [0, 0, 2.5] as [number, number, number],
      fov: 50,
    }),
    []
  );

  // OrbitControls 설정 메모이제이션
  const orbitControlsConfig = useMemo(
    () => ({
      enablePan: false,
      enableZoom: enableInteraction,
      enableRotate: enableInteraction,
      zoomSpeed: 0.8,
      // 모바일에서 스크롤 방지 문제 해결
      enableDamping: true,
      dampingFactor: 0.05,
    }),
    [enableInteraction]
  );

  return (
    <motion.div
      ref={cardRef}
      data-model-id={model.id}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden border-4 sm:border-6 border-white shadow-2xl rounded-xl sm:rounded-2xl bg-black w-full max-w-sm sm:max-w-md mx-auto"
      style={{ willChange: 'transform' }}
    >
      <div className="aspect-[4/3] w-full h-64 sm:h-80 md:h-96 relative">
        {/* 상호작용 버튼 */}
        <button
          onClick={() => setEnableInteraction(!enableInteraction)}
          className={`absolute top-1 sm:top-2 right-1 sm:right-2 z-20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-xs font-medium transition-all duration-200 ${
            enableInteraction
              ? 'bg-[url("/68.jpg")] bg-cover bg-center text-white font-bold shadow-lg'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {enableInteraction ? t('works.interact.on') : t('works.interact.off')}
        </button>

        {isInView ? (
          <Canvas
            camera={cameraConfig}
            style={canvasStyle}
            // frameloop="demand" 옵션 제거
            dpr={[1, 1.5]} // 모바일에서 성능 최적화
            gl={{
              antialias: false, // 성능 향상을 위해 안티앨리어싱 비활성화
              powerPreference: 'high-performance',
            }}
          >
            <SceneLights />
            <Model3D
              modelPath={model.path}
              scale={model.scale}
              position={model.position}
              color={model.color}
              enableInteraction={enableInteraction}
            />
            {enableInteraction && <OrbitControls {...orbitControlsConfig} />}
          </Canvas>
        ) : (
          <div className="flex items-center justify-center h-full bg-black rounded-xl sm:rounded-2xl">
            <LoadingSpinner />
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6 md:p-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{t(model.name)}</h3>
          <span className="text-white text-sm font-medium">{model.year}</span>
        </div>
        <p className="text-gray-300 leading-relaxed text-sm md:text-base mt-2 sm:mt-3">{t(model.description)}</p>
      </div>
    </motion.div>
  );
});

ModelCard.displayName = 'ModelCard';

// 성능 최적화된 메인 컴포넌트
const ThreeDModels = React.memo(() => {
  const { t } = useTranslation();
  // 모델 데이터 메모이제이션
  const memoizedModelData = useMemo(() => modelData, []);

  return (
    <section id="works" className="py-16 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-0">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-6xl font-bold text-center text-white mb-12 sm:mb-16 px-2"
        >
          {t('works.title')}
        </motion.h2>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 sm:gap-8">
          {memoizedModelData.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      </div>
    </section>
  );
});

ThreeDModels.displayName = 'ThreeDModels';

// 지연 로딩을 위한 동적 import
const DynamicThreeDModels = React.lazy(() => Promise.resolve({ default: ThreeDModels }));

// glTF 로더 프리로드 - 뷰포트에 들어올 때만 로드
const preloadModel = (modelPath: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'fetch';
  link.href = modelPath;
  document.head.appendChild(link);
};

export default function ThreeDModelsWrapper() {
  // Intersection Observer로 뷰포트 진입 시 프리로드
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 뷰포트에 들어온 모델만 프리로드
            const modelId = entry.target.getAttribute('data-model-id');
            const model = modelData.find((m) => m.id === modelId);
            if (model) {
              preloadModel(model.path);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    // 모든 모델 카드에 observer 연결
    document.querySelectorAll('[data-model-id]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return <DynamicThreeDModels />;
}
