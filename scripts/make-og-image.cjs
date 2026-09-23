const fs = require('fs');
const sharp = require('sharp');

async function makeOgImage() {
  if (!fs.existsSync('scratch')) {
    fs.mkdirSync('scratch', { recursive: true });
  }

  // 1. Prepare background from wm-34.webp (1200x630)
  const bg = await sharp('public/sanpham/EVEREST/wm-34.webp')
    .extract({ left: 0, top: 120, width: 1440, height: 756 })
    .resize(1200, 630)
    .modulate({ brightness: 1.02, saturation: 1.05 })
    .toBuffer();

  // 2. Prepare logo: resize logotrang.png
  const logoBuffer = await sharp('public/logotrang.png')
    .resize({ height: 42 })
    .toBuffer();
  const logoBase64 = 'data:image/png;base64,' + logoBuffer.toString('base64');

  // 3. SVG overlay
  const svgOverlay = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Bottom gradient -->
        <linearGradient id="bottomGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0a0f1d" stop-opacity="0" />
          <stop offset="25%" stop-color="#0a0f1d" stop-opacity="0.75" />
          <stop offset="55%" stop-color="#0a0f1d" stop-opacity="0.92" />
          <stop offset="100%" stop-color="#070a14" stop-opacity="0.98" />
        </linearGradient>

        <!-- Red brand gradient -->
        <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ba1b23" />
          <stop offset="100%" stop-color="#8b0e15" />
        </linearGradient>

        <!-- Red line gradient -->
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ba1b23" stop-opacity="0.2" />
          <stop offset="25%" stop-color="#ba1b23" stop-opacity="1" />
          <stop offset="75%" stop-color="#e11d48" stop-opacity="1" />
          <stop offset="100%" stop-color="#ba1b23" stop-opacity="0.4" />
        </linearGradient>

        <!-- Top Left Badge Gradient -->
        <linearGradient id="badgeDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f172a" stop-opacity="0.88" />
          <stop offset="100%" stop-color="#090d16" stop-opacity="0.94" />
        </linearGradient>

        <!-- Subtle drop shadows -->
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.4" />
        </filter>
      </defs>

      <!-- Bottom gradient bar -->
      <rect x="0" y="420" width="1200" height="210" fill="url(#bottomGrad)" />

      <!-- Red accent horizontal line -->
      <rect x="0" y="502" width="1200" height="2.5" fill="url(#lineGrad)" />

      <!-- Top Left Logo Badge -->
      <g filter="url(#shadow)">
        <rect x="36" y="30" width="194" height="60" rx="14" fill="url(#badgeDarkGrad)" stroke="rgba(255,255,255,0.22)" stroke-width="1.5" />
        <image href="${logoBase64}" x="48" y="39" width="170" height="42" preserveAspectRatio="xMidYMid meet" />
      </g>

      <!-- Top Right Authorized Dealer Badge -->
      <g filter="url(#shadow)">
        <rect x="716" y="30" width="448" height="48" rx="12" fill="url(#redGrad)" stroke="rgba(255,255,255,0.35)" stroke-width="1.2" />
        <text x="940" y="60" fill="#ffffff" font-size="13.5" font-weight="800" font-family="'Segoe UI', 'Roboto', 'Arial', sans-serif" text-anchor="middle" letter-spacing="0.6">
          ĐẠI LÝ ỦY QUYỀN ZAPPA · 3M · TECKWRAP · FELIX
        </text>
      </g>

      <!-- Bottom Left Title -->
      <text x="42" y="552" fill="#ffffff" font-size="29" font-weight="900" font-family="'Segoe UI', 'Roboto', 'Arial', sans-serif" letter-spacing="0.4">
        DÁN PHIM PPF Ô TÔ CHÍNH HÃNG TPHCM
      </text>

      <!-- Bottom Left Subtitle -->
      <text x="42" y="586" fill="#cbd5e1" font-size="15.5" font-weight="600" font-family="'Segoe UI', 'Roboto', 'Arial', sans-serif" letter-spacing="0.2">
        Chống đá văng &amp; xước quẹt • Tự phục hồi xước dăm • Bảo hành chính hãng 3–10 năm
      </text>

      <!-- Bottom Right Hotline CTA Box -->
      <g filter="url(#shadow)">
        <rect x="918" y="522" width="246" height="74" rx="14" fill="url(#redGrad)" stroke="rgba(255,255,255,0.3)" stroke-width="1.2" />
        <text x="1041" y="549" fill="#fecaca" font-size="11.5" font-weight="700" font-family="'Segoe UI', 'Roboto', 'Arial', sans-serif" text-anchor="middle" letter-spacing="1.2">
          HOTLINE TƯ VẤN 24/7
        </text>
        <text x="1041" y="581" fill="#ffffff" font-size="23" font-weight="900" font-family="'Segoe UI', 'Roboto', 'Arial', sans-serif" text-anchor="middle" letter-spacing="0.6">
          0378 78 88 98
        </text>
      </g>
    </svg>
  `);

  await sharp(bg)
    .composite([{ input: svgOverlay, top: 0, left: 0 }])
    .jpeg({ quality: 92 })
    .toFile('public/og-image.jpg');

  console.log('Successfully generated public/og-image.jpg');
}

makeOgImage();
