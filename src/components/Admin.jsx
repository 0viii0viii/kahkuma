import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase, resolveModelUrl } from '../lib/supabase.js';
import { processModel } from '../lib/processModel.js';
import { Editor } from './Editor.jsx';
import '../styles.css';
import './admin.css';

export default function Admin() {
  const [session, setSession] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!ready) return null;

  return (
    <div className="admin">
      <header className="admin__bar">
        <a className="admin__brand" href="/">
          <img src="/kahkuma.jpg" alt="" />
          KAHKUMA
        </a>
        {session ? (
          <button className="admin__link" onClick={() => supabase.auth.signOut()}>로그아웃</button>
        ) : (
          <span>ADMIN</span>
        )}
      </header>
      {session ? <Dashboard /> : <Login />}
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setBusy(false);
  };

  return (
    <form className="admin__card admin__login" onSubmit={submit}>
      <h1>작가 로그인</h1>
      <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required />
      {error && <p className="admin__err">{error}</p>}
      <button className="admin__btn" disabled={busy}>{busy ? '로그인 중…' : '로그인'}</button>
    </form>
  );
}

function Dashboard() {
  const [works, setWorks] = useState([]);
  const [editing, setEditing] = useState(null);

  const refresh = useCallback(async () => {
    const { data } = await supabase
      .from('works')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });
    setWorks((data || []).map((w) => ({ ...w, url: resolveModelUrl(w.file) })));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (editing) {
    return (
      <Editor
        work={{
          id: editing.id,
          title: editing.title,
          caption: editing.caption || '',
          year: editing.year || '',
          file: editing.url,
          palette: editing.palette || {},
        }}
        onClose={() => {
          setEditing(null);
          refresh();
        }}
      />
    );
  }

  return (
    <>
      <Uploader onUploaded={refresh} />
      <WorksList works={works} onEdit={setEditing} onChanged={refresh} />
    </>
  );
}

function Uploader({ onUploaded }) {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [year, setYear] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState('');
  const fileRef = useRef(null);

  const reset = () => {
    setTitle('');
    setCaption('');
    setYear('');
    setFile(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setBusy(true);
    setDone('');
    try {
      const { blob, parts } = await processModel(file, setStatus);
      setStatus('업로드 중…');
      const path = `${crypto.randomUUID()}.glb`;
      const up = await supabase.storage.from('models').upload(path, blob, { contentType: 'model/gltf-binary' });
      if (up.error) throw up.error;

      const ins = await supabase.from('works').insert({
        title: title.trim() || file.name.replace(/\.glb$/i, ''),
        caption: caption.trim(),
        year: year.trim(),
        file: path,
      });
      if (ins.error) throw ins.error;

      const mb = (blob.size / 1024 / 1024).toFixed(1);
      setDone(`완료! ${parts}개 파츠 · ${mb}MB로 저장됐습니다.`);
      reset();
      onUploaded?.();
    } catch (err) {
      setDone('실패: ' + (err.message || err));
    } finally {
      setBusy(false);
      setStatus('');
    }
  };

  return (
    <form className="admin__card" onSubmit={submit}>
      <h1>작품 업로드</h1>
      <label className="admin__file">
        <input ref={fileRef} type="file" accept=".glb,model/gltf-binary" onChange={(e) => setFile(e.target.files?.[0] || null)} disabled={busy} />
        <span>{file ? file.name : 'GLB 파일 선택'}</span>
      </label>
      <input placeholder="작품명" value={title} onChange={(e) => setTitle(e.target.value)} disabled={busy} />
      <input placeholder="설명 (선택)" value={caption} onChange={(e) => setCaption(e.target.value)} disabled={busy} />
      <input placeholder="연도 (선택)" value={year} onChange={(e) => setYear(e.target.value)} disabled={busy} />
      <button className="admin__btn" disabled={busy || !file}>{busy ? status || '처리 중…' : '업로드'}</button>
      <p className="admin__note">
        업로드하면 자동으로 <b>파츠 분할 + Meshopt 압축</b> 후 갤러리에 추가됩니다. 색상은 아래 목록에서 <b>색 편집</b>으로 지정하세요.
      </p>
      {done && <p className={done.startsWith('실패') ? 'admin__err' : 'admin__ok'}>{done}</p>}
    </form>
  );
}

function WorksList({ works, onEdit, onChanged }) {
  const remove = async (w) => {
    if (!window.confirm(`"${w.title}" 삭제할까요?`)) return;
    await supabase.storage.from('models').remove([w.file]);
    await supabase.from('works').delete().eq('id', w.id);
    onChanged?.();
  };

  if (!works.length) {
    return <p className="admin__empty">아직 작품이 없습니다.</p>;
  }

  return (
    <div className="admin__list">
      <h2>작품 ({works.length})</h2>
      {works.map((w) => (
        <div key={w.id} className="admin__row">
          <div>
            <b>{w.title}</b>
            <span>{w.palette ? `${Object.keys(w.palette).length}개 파츠 채색됨` : '채색 전'}</span>
          </div>
          <div className="admin__row-actions">
            <button className="admin__pill" onClick={() => onEdit(w)}>색 편집</button>
            <button className="admin__pill admin__pill--danger" onClick={() => remove(w)}>삭제</button>
          </div>
        </div>
      ))}
    </div>
  );
}
