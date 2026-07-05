import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bounds, Environment, Lightformer, PresentationControls } from '@react-three/drei';
import { Model } from './Model.jsx';

// A single artwork tile. The <Canvas> is only mounted once the card scrolls
// near the viewport (IntersectionObserver) so we never pay to render off-screen
// works — key for keeping the grid smooth on mobile.
export function WorkCard({ work, index, onOpen }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

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
        {visible ? (
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 4], fov: 40 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          >
            <ambientLight intensity={0.25} />
            <spotLight position={[4, 6, 4]} intensity={2.6} angle={0.5} penumbra={0.9} color={work.accent} />
            <directionalLight position={[-5, 3, -4]} intensity={0.5} color="#8ea6ff" />
            <Suspense fallback={null}>
              <PresentationControls
                enabled={hovered}
                global={false}
                snap
                rotation={[0, 0, 0]}
                polar={[-0.3, 0.3]}
                azimuth={[-0.6, 0.6]}
              >
                <Bounds fit clip observe margin={1.15}>
                  <AutoSpin paused={hovered}>
                    <Model url={work.file} palette={work.palette} />
                  </AutoSpin>
                </Bounds>
              </PresentationControls>
              {/* CDN-free reflections via inline lightformers */}
              <Environment resolution={128}>
                <Lightformer intensity={1.5} position={[0, 3, 2]} scale={[6, 3, 1]} />
                <Lightformer intensity={1} color={work.accent} position={[-3, 1, -2]} scale={[4, 4, 1]} />
              </Environment>
            </Suspense>
          </Canvas>
        ) : (
          <div className="card__skeleton" />
        )}
        <div className="card__glow" />
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
