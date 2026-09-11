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
      {
        name: 'trailing-slash-redirect',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = req.url || '';
            const [pathname, search] = url.split('?');
            if (pathname === '/dan-pcn-o-to-tphcm') {
              res.statusCode = 301;
              res.setHeader('Location', '/dan-pcn-o-to-tphcm/' + (search ? `?${search}` : ''));
              res.end();
              return;
            }
            if (pathname === '/cam-on' || pathname === '/cam-on/') {
              res.statusCode = 301;
              res.setHeader('Location', '/dan-pcn-o-to-tphcm/cam-on/' + (search ? `?${search}` : ''));
              res.end();
              return;
            }
            if (pathname === '/dan-pcn-o-to-tphcm/cam-on') {
              res.statusCode = 301;
              res.setHeader('Location', '/dan-pcn-o-to-tphcm/cam-on/' + (search ? `?${search}` : ''));
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
            if (pathname === '/dan-pcn-o-to-tphcm') {
              res.statusCode = 301;
              res.setHeader('Location', '/dan-pcn-o-to-tphcm/' + (search ? `?${search}` : ''));
              res.end();
              return;
            }
            if (pathname === '/cam-on' || pathname === '/cam-on/') {
              res.statusCode = 301;
              res.setHeader('Location', '/dan-pcn-o-to-tphcm/cam-on/' + (search ? `?${search}` : ''));
              res.end();
              return;
            }
            if (pathname === '/dan-pcn-o-to-tphcm/cam-on') {
              res.statusCode = 301;
              res.setHeader('Location', '/dan-pcn-o-to-tphcm/cam-on/' + (search ? `?${search}` : ''));
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
      // Tạo bản sao index.html và cam-on tại dist/dan-pcn-o-to-tphcm/ cho các nền tảng static hosting
      {
        name: 'copy-subpath-index',
        closeBundle() {
          const distDir = path.resolve(process.cwd(), 'dist');
          const subDir = path.resolve(distDir, 'dan-pcn-o-to-tphcm');
          if (fs.existsSync(distDir)) {
            fs.mkdirSync(subDir, { recursive: true });
            const indexPath = path.join(distDir, 'index.html');
            if (fs.existsSync(indexPath)) {
              fs.copyFileSync(indexPath, path.join(subDir, 'index.html'));
            }
            const camonDistDir = path.join(distDir, 'cam-on');
            const camonSubDir = path.join(subDir, 'cam-on');
            if (fs.existsSync(camonDistDir)) {
              fs.mkdirSync(camonSubDir, { recursive: true });
              const camonIndex = path.join(camonDistDir, 'index.html');
              if (fs.existsSync(camonIndex)) {
                fs.copyFileSync(camonIndex, path.join(camonSubDir, 'index.html'));
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