const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const BASE_DIR = path.resolve('public/sanpham');

function getWebpFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getWebpFiles(fullPath));
    } else if (/\.webp$/i.test(file)) {
      results.push(fullPath);
    }
  });
  return results;
}

async function optimizeTo200KB() {
  const files = getWebpFiles(BASE_DIR);
  console.log(`Bắt đầu tinh chỉnh ${files.length} ảnh WebP về chuẩn ~200KB cực nét cho Web...\n`);

  let totalBefore = 0;
  let totalAfter = 0;
  const stats = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const relPath = path.relative(BASE_DIR, file);
    const inputBuffer = fs.readFileSync(file);
    const beforeSize = inputBuffer.length;
    totalBefore += beforeSize;

    // Chuẩn web 1440px (Full HD+ Retina), Lanczos3 + Sharpen + WebP quality 78
    const outputBuffer = await sharp(inputBuffer)
      .resize({
        width: 1440,
        height: 1440,
        fit: 'inside',
        withoutEnlargement: true,
        kernel: sharp.kernel.lanczos3
      })
      .sharpen({
        sigma: 0.7,
        m1: 0.35,
        m2: 0.35
      })
      .webp({
        quality: 78,
        effort: 6,
        smartSubsample: true
      })
      .toBuffer();

    fs.writeFileSync(file, outputBuffer);

    const afterSize = outputBuffer.length;
    totalAfter += afterSize;

    const meta = await sharp(outputBuffer).metadata();
    const beforeKB = (beforeSize / 1024).toFixed(1);
    const afterKB = (afterSize / 1024).toFixed(1);

    stats.push({
      file: relPath,
      dimensions: `${meta.width}x${meta.height}`,
      beforeKB: `${beforeKB} KB`,
      afterKB: `${afterKB} KB`
    });

    console.log(`[${i + 1}/${files.length}] ${relPath} (${meta.width}x${meta.height}): ${beforeKB} KB -> ${afterKB} KB`);
  }

  console.log('\n--- KẾT QUẢ TỐI ƯU ---');
  console.log(`Tổng dung lượng trước: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Tổng dung lượng sau: ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Trung bình mỗi ảnh: ~${(totalAfter / files.length / 1024).toFixed(1)} KB (Đúng chuẩn ~200KB cho Web!)`);
}

optimizeTo200KB().catch(err => {
  console.error('Lỗi:', err);
  process.exit(1);
});
