import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // Single CSS bundle (linked from index.html) so styles apply on every route,
  // including the dynamically-loaded /admin — async CSS injection was flaky.
  build: { cssCodeSplit: false },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['apple-touch-icon.png'],
      // GLB models can exceed the default 2 MB precache limit.
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,webp,woff2}'],
        maximumFileSizeToCacheInBytes: 30 * 1024 * 1024,
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.endsWith('.glb'),
            // v2: previous CacheFirst pinned stale Draco GLBs after the switch to
            // Meshopt. StaleWhileRevalidate keeps models fresh if they ever change.
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'artwork-models-v2',
              expiration: { maxEntries: 40, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      manifest: {
        name: 'KAHKUMA — 3D Artist Space',
        short_name: 'KAHKUMA',
        description: 'A curated space for 3D artworks.',
        theme_color: '#0a0a0c',
        background_color: '#0a0a0c',
        display: 'standalone',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
});
