/**
 * Store Detailing - Section 2: Film Roll Auto-Play Canvas Controller
 * 
 * Tính năng tinh gọn & mượt mà:
 * 1. Tải trước 96 khung hình WebP 1080p sắc nét ngầm ngay khi vào trang.
 * 2. Ảnh poster frame 0 chuẩn SEO (loading="lazy").
 * 3. Khi cuộn tới Phần 2:
 *    - Tự động căn chỉnh và khóa con lăn trong đúng 2.0 giây.
 *    - Tự động chạy trải phẳng cuộn phim (0 -> 95) siêu mượt 48 FPS.
 *    - Sau 2 giây: Mở khóa con lăn hoàn toàn để người dùng cuộn tự do không giật lag.
 * 4. Không can thiệp lướt ngược: Cuộn lên xuống tự nhiên của trình duyệt, siêu nhẹ, không tốn tài nguyên.
 */

import { showFilmUIOverlay, hideFilmUIOverlay } from './film-product-overlay.js';

export function initFilmRollCanvas() {
  const canvas = document.getElementById('film-roll-canvas');
  const section = document.getElementById('film-roll-section');
  const poster = document.getElementById('film-poster');

  if (!canvas || !section) {
    console.warn('⚠️ Film roll elements not found');
    return;
  }

  const ctx = canvas.getContext('2d', { alpha: false });
  const totalFrames = 96;
  const frames = new Array(totalFrames);
  const DURATION_MS = 2000; // Hoàn tất chính xác trong 2.0 giây

  let loadedCount = 0;
  let currentFrameIndex = 0;
  let isPlaying = false;
  let hasPlayed = false;
  let isLocked = false;
  let cachedSectionTop = 0;
  let cachedSectionHeight = 0;

  function updateSectionMetrics() {
    cachedSectionTop = section.offsetTop;
    cachedSectionHeight = section.offsetHeight;
  }

  // 1. Khởi tạo kích thước canvas theo tỷ lệ màn hình (Retina / 4K DPR - Tránh forced reflow)
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    updateSectionMetrics();
    renderFrame(currentFrameIndex);
  }

  // 2. Vẽ frame với thuật toán COVER và khử răng cưa chất lượng cao (1080p)
  function renderFrame(index) {
    const img = frames[index] || frames[0];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const scale = Math.max(canvas.width / imgWidth, canvas.height / imgHeight);

    const drawW = imgWidth * scale;
    const drawH = imgHeight * scale;
    const drawX = (canvas.width - drawW) / 2;
    const drawY = (canvas.height - drawH) / 2;

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    currentFrameIndex = index;
  }

  // 3. Tải trước thông minh khi người dùng cuộn đến gần Section 2 (Lazy Batch Loading)
  let isPreloadStarted = false;

  function startFilmPreload() {
    if (isPreloadStarted) return;
    isPreloadStarted = true;

    // Tải frame 0 làm nền
    const firstFrame = new Image();
    firstFrame.src = '/film-frames/film_000.webp';
    firstFrame.onload = () => {
      frames[0] = firstFrame;
      loadedCount++;
      resizeCanvas();
      if (poster) {
        poster.style.opacity = '0';
      }
      // Nạp các frame còn lại theo hàng đợi giới hạn băng thông (4 luồng song song)
      loadRemainingFilmFramesQueue();
    };
  }

  function loadRemainingFilmFramesQueue() {
    let nextIndex = 1;
    const MAX_CONCURRENCY = 4;
    let activeDownloads = 0;

    function process() {
      while (activeDownloads < MAX_CONCURRENCY && nextIndex < totalFrames) {
        const i = nextIndex++;
        if (frames[i]) continue;
        activeDownloads++;
        const img = new Image();
        img.src = `/film-frames/film_${String(i).padStart(3, '0')}.webp`;
        img.onload = img.onerror = () => {
          frames[i] = img;
          loadedCount++;
          activeDownloads--;
          process();
        };
      }
    }

    process();
  }

  // Kích hoạt nạp Section 2 khi cuộn cách Section 2 trong phạm vi 800px (Không nghẽn mạng lúc tải trang đầu tiên)
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startFilmPreload();
        observer.disconnect();
      }
    }, { rootMargin: '800px 0px 800px 0px' });
    observer.observe(section);
  } else {
    const onFirstScroll = () => {
      startFilmPreload();
      window.removeEventListener('scroll', onFirstScroll);
    };
    window.addEventListener('scroll', onFirstScroll, { passive: true });
  }

  // 5. Cơ chế khóa con lăn nhẹ nhàng chỉ trong 2.0 giây khi phát
  let lockedScrollTop = 0;

  function preventScroll(e) {
    e.preventDefault();
  }

  const blockedKeys = ['Space', 'PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'End', 'Home'];
  function preventKeys(e) {
    if (blockedKeys.includes(e.code)) {
      e.preventDefault();
    }
  }

  function onLockedScroll() {
    if (isLocked) {
      window.scrollTo(0, lockedScrollTop);
    }
  }

  function lockScroll() {
    if (isLocked) return;
    isLocked = true;
    lockedScrollTop = section.offsetTop;
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventKeys, { passive: false });
    window.addEventListener('scroll', onLockedScroll, { passive: true });
  }

  function unlockScroll() {
    if (!isLocked) return;
    isLocked = false;
    window.removeEventListener('wheel', preventScroll);
    window.removeEventListener('touchmove', preventScroll);
    window.removeEventListener('keydown', preventKeys);
    window.removeEventListener('scroll', onLockedScroll);
  }

  // 6. Hoạt ảnh tự động trải rộng cuộn phim một chiều trong đúng 2.0s
  function playRollAnimation() {
    if (isPlaying || hasPlayed) return;
    isPlaying = true;
    lockScroll();

    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / DURATION_MS, 1.0);

      // Tính frame tương ứng từ 0 đến 95
      const targetIndex = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
      renderFrame(targetIndex);

      // Khi cuộn phim trải rộng được ~55% (khoảng 1.1s), giao diện chữ và thương hiệu bắt đầu hiện êm ái
      if (progress >= 0.55) {
        showFilmUIOverlay();
      }

      if (progress < 1.0) {
        requestAnimationFrame(step);
      } else {
        // Đã hoàn thành 2.0 giây -> chốt ở frame 95 và mở khóa con lăn
        renderFrame(totalFrames - 1);
        showFilmUIOverlay();
        unlockScroll();
        isPlaying = false;
        hasPlayed = true;
        console.log('🎬 Cuộn phim cách nhiệt đã trải rộng hoàn tất trong 2.0 giây.');
      }
    }

    requestAnimationFrame(step);
  }

  // 7. Lắng nghe cuộn chuột tự nhiên (Khi di chuyển xuống tới Phần 2 -> Khóa lăn -> Trải film ra)
  function checkScrollTrigger() {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const rectTop = cachedSectionTop - scrollY;
    const rectBottom = rectTop + cachedSectionHeight;
    const viewportHeight = window.innerHeight;

    // Khi người dùng cuộn xuống tới trọn vẹn Phần 2 (chạm đỉnh màn hình)
    if (!isPlaying && !hasPlayed && rectTop <= 20 && rectBottom >= viewportHeight * 0.5) {
      playRollAnimation();
    }

    // Nếu người dùng cuộn ngược về phần xe (Section 1), reset để sẵn sàng phát lại nếu lướt xuống
    if (hasPlayed && !isPlaying && scrollY < cachedSectionTop - 200) {
      hasPlayed = false;
      renderFrame(0);
      hideFilmUIOverlay();
    }
  }

  window.addEventListener('scroll', checkScrollTrigger, { passive: true });
  window.addEventListener('resize', resizeCanvas, { passive: true });

  // Khởi tạo kích thước ban đầu và kiểm tra vị trí ngay khi tải trang
  resizeCanvas();
  checkScrollTrigger();
}
