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
      // Phục vụ tài nguyên public tại root domain (tránh 404 khi browser request root path như /sanpham/, /favicon.svg,...)
      {
        name: 'root-public-fallback',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const cleanUrl = decodeURIComponent((req.url || '').split('?')[0]);
            if (cleanUrl && cleanUrl !== '/' && !cleanUrl.startsWith('/@') && !cleanUrl.startsWith('/src/')) {
              const relPath = cleanUrl.replace(/^\/+/, '');
              const publicFilePath = path.resolve(process.cwd(), 'public', relPath);
              if (fs.existsSync(publicFilePath) && fs.statSync(publicFilePath).isFile()) {
                const ext = path.extname(publicFilePath).toLowerCase();
                const mimeTypes = {
                  '.webp': 'image/webp',
                  '.png': 'image/png',
                  '.jpg': 'image/jpeg',
                  '.jpeg': 'image/jpeg',
                  '.svg': 'image/svg+xml',
                  '.mp4': 'video/mp4',
                  '.ico': 'image/x-icon',
                  '.json': 'application/json',
                };
                if (mimeTypes[ext]) {
                  res.setHeader('Content-Type', mimeTypes[ext]);
                }
                fs.createReadStream(publicFilePath).pipe(res);
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
          const publicDir = path.resolve(process.cwd(), 'public');
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
            if (fs.existsSync(publicDir)) {
              const items = fs.readdirSync(publicDir);
              for (const item of items) {
                const srcItem = path.join(publicDir, item);
                const destItem = path.join(subDir, item);
                if (!fs.existsSync(destItem)) {
                  fs.cpSync(srcItem, destItem, { recursive: true });
                }
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