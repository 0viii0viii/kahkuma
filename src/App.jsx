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
          <img className="masthead__logo" src="/kahkuma.jpg" alt="KAHKUMA 로고" />
          KAHKUMA
        </div>
        <nav className="masthead__nav">
          <span>3D ARTIST SPACE</span>
        </nav>
      </header>

      <main className="grid">
        {works.map((work, i) => (
          <WorkCard key={work.id} work={work} index={i} onOpen={setActive} />
        ))}
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} KAHKUMA</span>
        <nav className="footer__links">
          <a
            className="footer__link"
            href="https://www.instagram.com/kahkuma/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            Instagram
          </a>
          <a
            className="footer__link"
            href="https://naver.me/5LQ5r4pt"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10Z" />
              <circle cx="12" cy="11" r="2.2" />
            </svg>
            오시는 길
          </a>
        </nav>
      </footer>

      {active && <Spotlight work={active} onClose={() => setActive(null)} />}
    </div>
  );
}
