import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Slug đường dẫn con cho landing page (tránh trùng với trang chủ / root domain)
  // Ví dụ: pcn.storedetailing.vn/dan-pcn-o-to-tphcm/
  const base = env.VITE_BASE_PATH || '/dan-pcn-o-to-tphcm/';

  return {
    base,
    plugins: [
      tailwindcss(),
      // Phục vụ favicon.svg tại root domain (tránh 404 khi browser request root)
      {
        name: 'root-favicon-fallback',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const cleanUrl = (req.url || '').split('?')[0];
            if (cleanUrl === '/favicon.svg' || cleanUrl === '/favicon.ico') {
              const faviconPath = path.resolve(process.cwd(), 'public/favicon.svg');
              if (fs.existsSync(faviconPath)) {
                res.setHeader('Content-Type', 'image/svg+xml');
                res.end(fs.readFileSync(faviconPath));
                return;
              }
            }
            next();
          });
        },
      },
    ],
    server: {
      port: 3000,
      open: true,
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'esbuild',
    },
  };
});