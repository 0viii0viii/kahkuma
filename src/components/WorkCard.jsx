import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, PresentationControls } from '@react-three/drei';
import { Model } from './Model.jsx';

// Sentinel rendered inside <Suspense> — it only mounts once the model has
// resolved. Fires on the next painted frame so the reveal starts when the
// model is actually on screen, not merely decoded.
function Reveal({ onReady }) {
  useEffect(() => {
    const id = requestAnimationFrame(() => onReady());
    return () => cancelAnimationFrame(id);
  }, [onReady]);
  return null;
}

// A single artwork tile. The <Canvas> is only mounted once the card scrolls
// near the viewport (IntersectionObserver) so we never pay to render off-screen
// works — key for keeping the grid smooth on mobile.
export function WorkCard({ work, index, onOpen }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      className="card"
      style={{ '--accent': work.accent, animationDelay: `${index * 90}ms` }}
      onClick={() => onOpen(work)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`${work.title} 작품 감상`}
    >
      <div className="card__stage">
        {visible && (
          <div className={`card__reveal ${loaded ? 'is-loaded' : ''}`}>
            <Canvas
              dpr={[1, 1.5]}
              camera={{ position: [0, 0, 4], fov: 40 }}
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            >
              <ambientLight intensity={0.45} />
              <spotLight position={[4, 6, 4]} intensity={2.6} angle={0.5} penumbra={0.9} />
              <directionalLight position={[-5, 3, -4]} intensity={0.5} />
              <Suspense fallback={null}>
                <PresentationControls
                  enabled={hovered}
                  global={false}
                  snap
                  rotation={[0, 0, 0]}
                  polar={[-0.3, 0.3]}
                  azimuth={[-0.6, 0.6]}
                >
                  {/* Models are pre-normalized to ~2 units at origin, so a
                      fixed camera frames them — no <Bounds> auto-fit (its
                      post-load camera snap caused a "far → jump closer" flicker). */}
                  <AutoSpin paused={hovered}>
                    <Model url={work.file} palette={work.palette} />
                  </AutoSpin>
                </PresentationControls>
                {/* CDN-free reflections via inline lightformers */}
                <Environment resolution={128}>
                  <Lightformer intensity={1.5} position={[0, 3, 2]} scale={[6, 3, 1]} />
                  <Lightformer intensity={1} position={[-3, 1, -2]} scale={[4, 4, 1]} />
                </Environment>
                <Reveal onReady={() => setLoaded(true)} />
              </Suspense>
            </Canvas>
          </div>
        )}
        {/* Shimmer holds the frame, then cross-fades out as the model develops in */}
        <div className={`card__skeleton ${loaded ? 'is-done' : ''}`} aria-hidden />
      </div>

      <div className="card__meta">
        <span className="card__index">{String(index + 1).padStart(2, '0')}</span>
        <div>
          <h3 className="card__title">{work.title}</h3>
          <p className="card__medium">
            {work.medium} · {work.year}
          </p>
        </div>
        <span className="card__cta">감상 →</span>
      </div>
    </button>
  );
}

// Idle rotation that pauses on hover (so PresentationControls can take over).
function AutoSpin({ children, paused }) {
  const group = useRef();
  useFrame((_, delta) => {
    if (group.current && !paused) group.current.rotation.y += delta * 0.35;
  });
  return <group ref={group}>{children}</group>;
}
