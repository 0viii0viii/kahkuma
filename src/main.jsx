import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

// Minimal path-based routing. Both entries are code-split so the gallery bundle
// stays lean — the heavy upload/processing libs load only on /admin.
const root = createRoot(document.getElementById('root'));
const isAdmin = window.location.pathname.replace(/\/+$/, '') === '/admin';

const load = isAdmin ? import('./components/Admin.jsx') : import('./App.jsx');
load.then(({ default: Component }) =>
  root.render(
    <React.StrictMode>
      <Component />
    </React.StrictMode>
  )
);
