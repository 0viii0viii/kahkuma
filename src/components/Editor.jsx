import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Lightformer, Html, useProgress } from '@react-three/drei';
import { Model } from './Model.jsx';
import { supabase } from '../lib/supabase.js';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="viewer__loading">
        <span className="viewer__loading-bar" style={{ '--p': `${progress}%` }} />
        <em>{Math.round(progress)}%</em>
      </div>
    </Html>
  );
}

// Quick-pick swatches for common toy colors.
const SWATCHES = [
  '#eae6de', '#1c1c1e', '#d4a276', '#3f7ca8', '#b83232', '#dd6a2a',
  '#e8b04b', '#4e8c3f', '#6e7176', '#e583b0', '#6faee2', '#6b4a2f',
];

export function Editor({ work, onClose }) {
  const [palette, setPalette] = useState({ ...(work.palette || {}) });
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const dirty = JSON.stringify(palette) !== JSON.stringify(work.palette || {});

  const setColor = (hex) => {
    if (!selected) return;
    setPalette((p) => ({ ...p, [selected]: hex }));
  };
  const clearColor = () => {
    if (!selected) return;
    setPalette((p) => {
      const next = { ...p };
      delete next[selected];
      return next;
    });
  };

  const save = async () => {
    setSaving(true);
    setMsg('');
    const { error } = await supabase.from('works').update({ palette }).eq('id', work.id);
    setSaving(false);
    if (error) setMsg('저장 실패: ' + error.message);
    else {
      setMsg('저장됐습니다 ✓');
      work.palette = palette; // keep local dirty check in sync
    }
  };

  const current = selected ? palette[selected] || '#eae6de' : '#eae6de';

  return (
    <div className="editor">
      <div className="editor__stage">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0.2, 4.6], fov: 42 }}>
          <color attach="background" args={['#0a0a0c']} />
          <ambientLight intensity={0.5} />
          <spotLight position={[4, 8, 3]} angle={0.4} penumbra={1} intensity={90} castShadow />
          <directionalLight position={[-5, 4, -4]} intensity={0.5} />
          <Suspense fallback={<Loader />}>
            <Model
              url={work.file}
              palette={palette}
              inspect
              selectedPart={selected}
              onSelect={setSelected}
            />
            <ContactShadows position={[0, -1.02, 0]} opacity={0.55} scale={9} blur={2.6} far={3} />
            <Environment resolution={256}>
              <Lightformer intensity={2} position={[0, 4, 3]} scale={[10, 5, 1]} />
              <Lightformer intensity={1.2} position={[-5, 1, -3]} scale={[6, 6, 1]} />
              <Lightformer intensity={0.8} position={[5, 2, -2]} scale={[6, 6, 1]} />
            </Environment>
          </Suspense>
          <OrbitControls makeDefault enablePan={false} minDistance={2.6} maxDistance={9} minPolarAngle={0.3} maxPolarAngle={Math.PI / 1.7} />
        </Canvas>
      </div>

      <aside className="editor__panel">
        <div className="editor__head">
          <button className="admin__link" onClick={onClose}>← 목록</button>
          <b>{work.title}</b>
        </div>

        <p className="editor__hint">모델의 <b>파츠를 클릭</b>해 선택한 뒤 색을 지정하세요.</p>

        <div className="editor__selected">
          {selected ? (
            <>
              <span className="editor__sw" style={{ background: current }} />
              <code>{selected}</code>
            </>
          ) : (
            <span className="editor__none">선택된 파츠 없음</span>
          )}
        </div>

        <div className="editor__swatches">
          {SWATCHES.map((c) => (
            <button
              key={c}
              className="editor__chip"
              style={{ background: c }}
              disabled={!selected}
              onClick={() => setColor(c)}
              aria-label={c}
            />
          ))}
        </div>

        <label className="editor__custom">
          직접 선택
          <input type="color" value={current} disabled={!selected} onChange={(e) => setColor(e.target.value)} />
        </label>

        <button className="admin__link" disabled={!selected} onClick={clearColor}>
          선택 파츠 기본색(석고)으로
        </button>

        <button className="admin__btn" disabled={saving || !dirty} onClick={save}>
          {saving ? '저장 중…' : dirty ? '색상 저장' : '저장됨'}
        </button>
        {msg && <p className={msg.startsWith('저장 실패') ? 'admin__err' : 'admin__ok'}>{msg}</p>}
      </aside>
    </div>
  );
}
