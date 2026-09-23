import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Slug đường dẫn con cho landing page PPF Store Detailing
  // Ví dụ: ppf.storedetailing.vn/dan-ppf-o-to-tphcm/
  const base = env.VITE_BASE_PATH || '/dan-ppf-o-to-tphcm/';

  return {
    base,
    plugins: [
      tailwindcss(),
      {
        name: 'trailing-slash-redirect',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = req.url || '';
            const [pathname, search] = url.split('?');
            if (pathname === '/dan-ppf-o-to-tphcm' || pathname === '/dan-pcn-o-to-tphcm') {
              res.statusCode = 301;
              res.setHeader('Location', '/dan-ppf-o-to-tphcm/' + (search ? `?${search}` : ''));
              res.end();
              return;
            }
            if (pathname === '/cam-on' || pathname === '/cam-on/') {
              res.statusCode = 301;
              res.setHeader('Location', '/dan-ppf-o-to-tphcm/cam-on/' + (search ? `?${search}` : ''));
              res.end();
              return;
            }
            if (pathname === '/dan-ppf-o-to-tphcm/cam-on' || pathname === '/dan-pcn-o-to-tphcm/cam-on') {
              res.statusCode = 301;
              res.setHeader('Location', '/dan-ppf-o-to-tphcm/cam-on/' + (search ? `?${search}` : ''));
              res.end();
              return;
            }
            next();
          });
        },
        configurePreviewServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = req.url || '';
            const [pathname, search] = url.split('?');
            if (pathname === '/dan-ppf-o-to-tphcm' || pathname === '/dan-pcn-o-to-tphcm') {
              res.statusCode = 301;
              res.setHeader('Location', '/dan-ppf-o-to-tphcm/' + (search ? `?${search}` : ''));
              res.end();
              return;
            }
            if (pathname === '/cam-on' || pathname === '/cam-on/') {
              res.statusCode = 301;
              res.setHeader('Location', '/dan-ppf-o-to-tphcm/cam-on/' + (search ? `?${search}` : ''));
              res.end();
              return;
            }
            if (pathname === '/dan-ppf-o-to-tphcm/cam-on' || pathname === '/dan-pcn-o-to-tphcm/cam-on') {
              res.statusCode = 301;
              res.setHeader('Location', '/dan-ppf-o-to-tphcm/cam-on/' + (search ? `?${search}` : ''));
              res.end();
              return;
            }
            next();
          });
        },
      },
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
      {
        name: 'copy-subpath-index',
        closeBundle() {
          const distDir = path.resolve(process.cwd(), 'dist');
          const subDir = path.resolve(distDir, 'dan-ppf-o-to-tphcm');
          if (fs.existsSync(distDir)) {
            fs.mkdirSync(subDir, { recursive: true });
            const indexPath = path.join(distDir, 'index.html');
            if (fs.existsSync(indexPath)) {
              fs.copyFileSync(indexPath, path.join(subDir, 'index.html'));
              fs.writeFileSync(
                indexPath,
                '<!DOCTYPE html><html lang="vi"><head><meta charset="utf-8"><title>Store Detailing</title><meta http-equiv="refresh" content="0;url=/dan-ppf-o-to-tphcm/"><script>location.replace(\'/dan-ppf-o-to-tphcm/\'+location.search+location.hash);</script></head><body></body></html>'
              );
            }
            const camonDistDir = path.join(distDir, 'cam-on');
            const camonSubDir = path.join(subDir, 'cam-on');
            if (fs.existsSync(camonDistDir)) {
              fs.mkdirSync(camonSubDir, { recursive: true });
              const camonIndex = path.join(camonDistDir, 'index.html');
              if (fs.existsSync(camonIndex)) {
                fs.copyFileSync(camonIndex, path.join(camonSubDir, 'index.html'));
                fs.writeFileSync(
                  camonIndex,
                  '<!DOCTYPE html><html lang="vi"><head><meta charset="utf-8"><title>Store Detailing</title><meta http-equiv="refresh" content="0;url=/dan-ppf-o-to-tphcm/cam-on/"><script>location.replace(\'/dan-ppf-o-to-tphcm/cam-on/\'+location.search+location.hash);</script></head><body></body></html>'
                );
              }
            }
          }
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
      rollupOptions: {
        input: {
          main: path.resolve(process.cwd(), 'index.html'),
          camon: path.resolve(process.cwd(), 'cam-on/index.html'),
        },
      },
    },
  };
});