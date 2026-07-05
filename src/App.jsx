import { useState } from 'react';
import { works } from './data/works.js';
import { WorkCard } from './components/WorkCard.jsx';
import { Spotlight } from './components/Spotlight.jsx';

export default function App() {
  const [active, setActive] = useState(null);

  return (
    <div className="app">
      <div className="grain" aria-hidden />

      <header className="masthead">
        <div className="masthead__brand">
          <span className="masthead__mark" />
          KAHKUMA
        </div>
        <nav className="masthead__nav">
          <span>3D ARTIST SPACE</span>
        </nav>
      </header>

      <section className="hero">
        <p className="hero__eyebrow">SELECTED WORKS · {works.length}</p>
        <h1 className="hero__title">
          만질 수 없는 조각들,
          <br />
          빛 아래 놓다.
        </h1>
        <p className="hero__lede">
          스크롤로 컬렉션을 거닐고, 작품을 눌러 무대 위에서 360°로 감상하세요.
        </p>
      </section>

      <main className="grid">
        {works.map((work, i) => (
          <WorkCard key={work.id} work={work} index={i} onOpen={setActive} />
        ))}
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} KAHKUMA</span>
        <span>Built with react-three-fiber</span>
      </footer>

      {active && <Spotlight work={active} onClose={() => setActive(null)} />}
    </div>
  );
}
