import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Lightformer, useProgress } from '@react-three/drei';
import { Model } from './Model.jsx';

// Overlay loader (outside the canvas so it stays sharp while the model develops).
function Loader() {
  const { progress } = useProgress();
  return (
    <div className="viewer__loading">
      <span className="viewer__loading-bar" style={{ '--p': `${progress}%` }} />
      <em>{Math.round(progress)}%</em>
    </div>
  );
}

// Fires once the model has resolved + painted, to start the reveal.
function Reveal({ onReady }) {
  useEffect(() => {
    const id = requestAnimationFrame(() => onReady());
    return () => cancelAnimationFrame(id);
  }, [onReady]);
  return null;
}

// Full-screen stage for a single artwork: orbit + auto-rotate on a grounded,
// studio-lit pedestal. Closes on ESC or backdrop click.
export function Spotlight({ work, onClose }) {
  const [autoRotate, setAutoRotate] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!work) return null;

  return (
    <div className="viewer" style={{ '--accent': work.accent }} onClick={onClose}>
      <div className="viewer__canvas" onClick={(e) => e.stopPropagation()}>
        <div className={`viewer__reveal ${loaded ? 'is-loaded' : ''}`}>
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0.2, 4.6], fov: 42 }}
            gl={{ antialias: true, powerPreference: 'high-performance' }}
          >
            <color attach="background" args={['#0a0a0c']} />
            <fog attach="fog" args={['#0a0a0c', 9, 24]} />
            {/* Neutral white studio lighting — same for every model, no color tint */}
            <ambientLight intensity={0.5} />
            <spotLight position={[4, 8, 3]} angle={0.4} penumbra={1} intensity={90} castShadow />
            <directionalLight position={[-5, 4, -4]} intensity={0.5} />
            {/* Models are normalized to ~2 units centered at origin (see Model.jsx),
                so the orbit target sits exactly on the model center → it spins in
                place instead of swinging around the screen. */}
            <Suspense fallback={null}>
              <Model url={work.file} palette={work.palette} />
              <ContactShadows
                position={[0, -1.02, 0]}
                opacity={0.55}
                scale={9}
                blur={2.6}
                far={3}
                color="#000000"
              />
              <Environment resolution={256}>
                <Lightformer intensity={2} position={[0, 4, 3]} scale={[10, 5, 1]} />
                <Lightformer intensity={1.2} position={[-5, 1, -3]} scale={[6, 6, 1]} />
                <Lightformer intensity={0.8} position={[5, 2, -2]} scale={[6, 6, 1]} />
              </Environment>
              <Reveal onReady={() => setLoaded(true)} />
            </Suspense>
            <OrbitControls
              makeDefault
              target={[0, 0, 0]}
              autoRotate={autoRotate}
              autoRotateSpeed={0.8}
              enablePan={false}
              minPolarAngle={0.3}
              maxPolarAngle={Math.PI / 1.7}
              minDistance={2.6}
              maxDistance={9}
            />
          </Canvas>
        </div>
        {!loaded && <Loader />}
      </div>

      <header className="viewer__bar" onClick={(e) => e.stopPropagation()}>
        <div>
          <h2 className="viewer__title">{work.title}</h2>
          <p className="viewer__caption">{work.caption}</p>
        </div>
        <div className="viewer__meta">
          {work.medium} · {work.year}
        </div>
      </header>

      <div className="viewer__controls" onClick={(e) => e.stopPropagation()}>
        <button
          className={`chip ${autoRotate ? 'chip--on' : ''}`}
          onClick={() => setAutoRotate((v) => !v)}
        >
          {autoRotate ? '자동 회전 ⏸' : '자동 회전 ▶'}
        </button>
        <span className="viewer__hint">드래그로 회전 · 확대·축소</span>
      </div>

      <button className="viewer__close" onClick={onClose} aria-label="닫기">
        ✕
      </button>
    </div>
  );
}
