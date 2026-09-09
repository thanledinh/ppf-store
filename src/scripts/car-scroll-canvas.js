/**
 * Store Detailing - Hero Scroll-Driven Canvas Controller
 * 
 * Tính năng:
 * 1. Vẽ frame đầu tiên làm nền ngay tức thì (0ms LCP).
 * 2. Tự động co giãn theo tỷ lệ màn hình để ảnh luôn FULL 100vh (Cover mode).
 * 3. Hỗ trợ Retina / 4K với devicePixelRatio chuẩn xác.
 * 4. Đồng bộ tiến độ cuộn chuột (scroll progress) với chuỗi 96 frames 60-120 FPS.
 * 5. Tải trước (preloading) thông minh theo chunks để không làm nghẽn mạng.
 * 6. Đi kèm công cụ tách frame video bằng canvas phía client (extractFramesFromVideo).
 */

export function initCarScrollCanvas() {
  const canvas = document.getElementById('hero-car-canvas');
  const track = document.getElementById('hero-scroll-track');
  const stickyStage = document.getElementById('hero-sticky-stage');
  const heroOverlay = document.getElementById('hero-overlay-content');
  const scrollIndicator = document.getElementById('hero-scroll-indicator');

  if (!canvas || !track) {
    console.warn('⚠️ Hero canvas elements not found');
    return;
  }

  const ctx = canvas.getContext('2d', { alpha: false });
  const totalFrames = 96;
  const desktopFrames = new Array(totalFrames);
  const mobileFrames = new Array(totalFrames);

  let isMobileMode = window.innerWidth < 768;
  let currentFrameIndex = 0;
  let isTicking = false;

  function getActiveFrames() {
    return isMobileMode ? mobileFrames : desktopFrames;
  }

  function getFramePath(index, forMobile) {
    const padded = String(index).padStart(3, '0');
    return forMobile ? `/mobile-frames/frame_${padded}.webp` : `/frames/frame_${padded}.webp`;
  }

  // 1. Khởi tạo canvas kích thước chuẩn theo màn hình (Full 100vh - Tránh forced reflow)
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    const newIsMobile = window.innerWidth < 768;
    if (newIsMobile !== isMobileMode) {
      isMobileMode = newIsMobile;
      const activeFrames = getActiveFrames();
      if (!activeFrames[0]) {
        loadInitialFrame(isMobileMode);
      }
      preloadRemainingFrames(isMobileMode);
    }

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Render lại frame hiện tại khi đổi kích thước màn hình
    renderFrame(currentFrameIndex);
  }

  // 2. Hàm vẽ frame lên canvas với thuật toán COVER (Full 100vh và 100vw)
  function renderFrame(index) {
    const activeFrames = getActiveFrames();
    let img = activeFrames[index];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Tìm frame đã tải gần nhất để chuyển động luôn mượt mà, không giật về frame đầu
      for (let offset = 1; offset < totalFrames; offset++) {
        const prev = activeFrames[index - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = activeFrames[index + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }
    if (!img || !img.complete || img.naturalWidth === 0) {
      img = activeFrames[0];
    }
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Tô nền trắng studio đồng nhất
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    let scale;
    let drawW, drawH;
    let drawX, drawY;

    if (isMobileMode) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const isTallScreen = window.innerHeight > 740;

      // Chiều cao <= 740px: Giữ nguyên 100% chiều ngang sát đáy (để yên)
      // Chiều cao > 740px (iPhone 16 Pro Max, 844 - 1000px): Phóng lớn nhẹ 6% và nâng vị trí lên để hòa quyện với phần thông tin
      const widthMultiplier = isTallScreen ? 1.05 : 1.0;
      scale = (canvas.width * widthMultiplier) / imgWidth;

      // Đảm bảo không bị tràn chiều cao nếu màn hình thấp hoặc xoay ngang
      if (imgHeight * scale > canvas.height * 1.15) {
        scale = canvas.height / imgHeight;
      }

      drawW = imgWidth * scale;
      drawH = imgHeight * scale;

      drawX = (canvas.width - drawW) / 2;
      const extraHeight = Math.max(0, (window.innerHeight - 740) * dpr);
      const liftY = Math.min(extraHeight * 0.28, 62 * dpr);
      drawY = (canvas.height - drawH) - liftY;
    } else {
      // Trên desktop: Thuật toán COVER lấp đầy 100% chiều cao (100vh) và 100% chiều rộng
      scale = Math.max(canvas.width / imgWidth, canvas.height / imgHeight);
      drawW = imgWidth * scale;
      drawH = imgHeight * scale;

      drawX = (canvas.width - drawW) / 2;
      drawY = (canvas.height - drawH) / 2;

      // Căn chỉnh vị trí X: Trên desktop ưu tiên xe nằm gọn sang bên phải để nhường không gian cho tiêu đề
      if (canvas.width >= 1024 && drawW > canvas.width) {
        drawX = Math.max(canvas.width - drawW, (canvas.width - drawW) * 0.85);
      }
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    currentFrameIndex = index;
  }

  // 3. Tải ngay frame 0 làm ảnh nền tức thì
  function loadInitialFrame(forMobile) {
    const targetFrames = forMobile ? mobileFrames : desktopFrames;
    const firstFrame = new Image();
    firstFrame.src = getFramePath(0, forMobile);
    firstFrame.onload = () => {
      targetFrames[0] = firstFrame;
      resizeCanvas();
    };
  }

  // Tải frame ban đầu cho chế độ màn hình hiện tại
  loadInitialFrame(isMobileMode);

  // 4. Tải trước các frame tiếp theo theo thứ tự ưu tiên (Progressive Batch Loading không nghẽn mạng)
  const MAX_CONCURRENT_DOWNLOADS = 4;
  let activeDownloads = 0;
  const loadQueue = [];
  const queuedIndices = new Set();

  function queueFrame(index, forMobile, priority = false) {
    const targetFrames = forMobile ? mobileFrames : desktopFrames;
    if (targetFrames[index] || queuedIndices.has(index)) return;

    queuedIndices.add(index);
    if (priority) {
      loadQueue.unshift({ index, forMobile });
    } else {
      loadQueue.push({ index, forMobile });
    }
    processQueue();
  }

  function processQueue() {
    while (activeDownloads < MAX_CONCURRENT_DOWNLOADS && loadQueue.length > 0) {
      const item = loadQueue.shift();
      const targetFrames = item.forMobile ? mobileFrames : desktopFrames;
      if (targetFrames[item.index]) continue;

      activeDownloads++;
      const img = new Image();
      img.src = getFramePath(item.index, item.forMobile);
      img.onload = img.onerror = () => {
        targetFrames[item.index] = img;
        activeDownloads--;
        processQueue();
      };
    }
  }

  // Ưu tiên nạp các frame lân cận vị trí cuộn hiện tại
  function ensureFramesAhead(targetIndex, count = 10) {
    for (let offset = 0; offset <= count; offset++) {
      const ahead = targetIndex + offset;
      if (ahead < totalFrames) queueFrame(ahead, isMobileMode, true);
      const behind = targetIndex - offset;
      if (behind >= 0) queueFrame(behind, isMobileMode, false);
    }
  }

  // Khởi đầu: Nạp 12 frame đầu tiên, sau đó tiếp tục nạp toàn bộ 96 frame trong nền khi rảnh rỗi
  function preloadAllFrames() {
    // Đợt 1: 12 frame đầu để phản hồi ngay khi cuộn
    for (let i = 1; i <= 12; i++) {
      queueFrame(i, isMobileMode, false);
    }
    // Đợt 2: Nạp các frame còn lại để hoàn tất toàn bộ 96 frames trong bộ nhớ đệm
    const scheduleRemaining = () => {
      for (let i = 13; i < totalFrames; i++) {
        queueFrame(i, isMobileMode, false);
      }
    };
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(scheduleRemaining, { timeout: 3000 });
    } else {
      setTimeout(scheduleRemaining, 800);
    }
  }

  // Khởi động preloading các frame tiếp theo khi người dùng bắt đầu tương tác hoặc khi rảnh rỗi
  let hasStartedPreloading = false;
  function triggerPreload() {
    if (hasStartedPreloading) return;
    hasStartedPreloading = true;
    preloadAllFrames();
  }

  window.addEventListener('scroll', triggerPreload, { passive: true, once: true });
  window.addEventListener('touchstart', triggerPreload, { passive: true, once: true });
  window.addEventListener('wheel', triggerPreload, { passive: true, once: true });

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(triggerPreload, { timeout: 3500 });
  } else {
    setTimeout(triggerPreload, 2500);
  }

  // 5. Tính toán tiến trình cuộn trang và cập nhật canvas
  function onScroll() {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        updateScrollAnimation();
        isTicking = false;
      });
      isTicking = true;
    }
  }

  function updateScrollAnimation() {
    const trackRect = track.getBoundingClientRect();
    const trackHeight = track.offsetHeight;
    const viewportHeight = window.innerHeight;
    const maxScroll = trackHeight - viewportHeight;

    if (maxScroll <= 0) return;

    // Tiến trình từ 0.0 (đầu hero) đến 1.0 (cuối hero)
    const scrolled = -trackRect.top;
    const progress = Math.min(Math.max(scrolled / maxScroll, 0), 1);

    // Tính toán index frame tương ứng
    const targetIndex = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));

    // Nạp trước các frame tiếp theo theo chiều lướt cuộn
    ensureFramesAhead(targetIndex, 8);

    if (targetIndex !== currentFrameIndex) {
      renderFrame(targetIndex);
    }

    // Hiệu ứng mờ nhẹ lớp chữ Overlay khi xe cuộn gần hết hành trình để chuyển tiếp sang Section 2
    // Giữ chữ rõ nét trong suốt 70% hành trình đầu để xe xoay 360 độ và chữ hiển thị đồng bộ, không bao giờ để khoảng trắng rỗng
    if (heroOverlay) {
      const fadeStart = 0.70;
      const fadeEnd = 0.95;

      if (progress <= fadeStart) {
        heroOverlay.style.opacity = '1';
        heroOverlay.style.transform = 'translateY(0px)';
        heroOverlay.style.pointerEvents = 'auto';
      } else {
        const fadeRatio = Math.min((progress - fadeStart) / (fadeEnd - fadeStart), 1);
        heroOverlay.style.opacity = String(Math.max(0, 1 - fadeRatio));
        heroOverlay.style.transform = `translateY(-${fadeRatio * 30}px)`;
        heroOverlay.style.pointerEvents = fadeRatio > 0.6 ? 'none' : 'auto';
      }
    }

    // Ẩn chỉ báo cuộn chuột khi đã cuộn
    if (scrollIndicator) {
      scrollIndicator.style.opacity = progress > 0.05 ? '0' : '1';
    }
  }

  // 6. Gán các Event Listeners
  window.addEventListener('resize', resizeCanvas, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });

  // Khởi chạy kích thước ban đầu
  resizeCanvas();
}

/**
 * Tiện ích: Tách frame trực tiếp từ video element bằng canvas phía client (nếu cần xử lý video mới)
 * @param {string} videoSrc - Đường dẫn video
 * @param {number} frameRate - Số frame mỗi giây
 * @returns {Promise<string[]>} - Mảng các Data URL của từng frame
 */
export async function extractFramesFromVideo(videoSrc, frameRate = 24) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.src = videoSrc;
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = 'anonymous';

    const offscreenCanvas = document.createElement('canvas');
    const offCtx = offscreenCanvas.getContext('2d');
    const extractedFrames = [];

    video.onloadedmetadata = async () => {
      offscreenCanvas.width = video.videoWidth;
      offscreenCanvas.height = video.videoHeight;
      const duration = video.duration;
      const totalSteps = Math.floor(duration * frameRate);
      const stepDuration = 1 / frameRate;

      for (let i = 0; i < totalSteps; i++) {
        video.currentTime = i * stepDuration;
        await new Promise((res) => {
          video.onseeked = () => {
            offCtx.drawImage(video, 0, 0);
            extractedFrames.push(offscreenCanvas.toDataURL('image/webp', 0.8));
            res();
          };
        });
      }
      resolve(extractedFrames);
    };

    video.onerror = (err) => reject(err);
  });
}
