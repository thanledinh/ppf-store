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
  let isMobileMode = window.matchMedia ? window.matchMedia('(max-width: 767px)').matches : (window.innerWidth < 768);
  let currentFrameIndex = 0;
  let isTicking = false;
  function getActiveFrames() {
    return isMobileMode ? mobileFrames : desktopFrames;
  }
  const BASE_URL = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
  function getFramePath(index, forMobile) {
    const padded = String(index).padStart(3, '0');
    const folder = forMobile ? 'mobile-frames' : 'frames';
    return `${BASE_URL}${folder}/frame_${padded}.webp`;
  }
  let cachedViewportWidth = window.innerWidth || document.documentElement.clientWidth || 390;
  let cachedViewportHeight = window.innerHeight || document.documentElement.clientHeight || 844;
  let cachedDpr = Math.min(window.devicePixelRatio || 1, 2);
  let cachedMaxScroll = Math.max(Math.round(cachedViewportHeight * 0.85), 350);
  function resizeCanvas() {
    cachedDpr = Math.min(window.devicePixelRatio || 1, 2);
    cachedViewportWidth = window.innerWidth || document.documentElement.clientWidth || 390;
    cachedViewportHeight = window.innerHeight || document.documentElement.clientHeight || 844;
    const newIsMobile = window.matchMedia ? window.matchMedia('(max-width: 767px)').matches : (cachedViewportWidth < 768);
    if (newIsMobile !== isMobileMode) {
      isMobileMode = newIsMobile;
      const activeFrames = getActiveFrames();
      if (!activeFrames[0]) {
        loadInitialFrame(isMobileMode);
      }
    }
    const targetW = Math.round(cachedViewportWidth * cachedDpr);
    const targetH = Math.round(cachedViewportHeight * cachedDpr);
    const targetStyleW = `${cachedViewportWidth}px`;
    const targetStyleH = `${cachedViewportHeight}px`;
    cachedMaxScroll = Math.max(Math.round(cachedViewportHeight * 0.85), 350);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
    if (canvas.style.width !== targetStyleW) canvas.style.width = targetStyleW;
    if (canvas.style.height !== targetStyleH) canvas.style.height = targetStyleH;
    renderFrame(currentFrameIndex);
  }
  function recalculateDimensions() {
    cachedViewportHeight = window.innerHeight || document.documentElement.clientHeight || 800;
    cachedMaxScroll = Math.max(Math.round(cachedViewportHeight * 0.85), 350);
  }
  function renderFrame(index) {
    const activeFrames = getActiveFrames();
    let img = activeFrames[index];
    if (!img || !img.complete || img.naturalWidth === 0) {
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
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    let scale;
    let drawW, drawH;
    let drawX, drawY;
    if (isMobileMode) {
      const dpr = cachedDpr;
      const isTallScreen = cachedViewportHeight > 740;
      const widthMultiplier = isTallScreen ? 1.05 : 1.0;
      scale = (canvas.width * widthMultiplier) / imgWidth;
      if (imgHeight * scale > canvas.height * 1.15) {
        scale = canvas.height / imgHeight;
      }
      drawW = imgWidth * scale;
      drawH = imgHeight * scale;
      drawX = (canvas.width - drawW) / 2;
      const extraHeight = Math.max(0, (cachedViewportHeight - 740) * dpr);
      const liftY = Math.min(extraHeight * 0.28, 62 * dpr);
      drawY = (canvas.height - drawH) - liftY;
    } else {
      scale = Math.max(canvas.width / imgWidth, canvas.height / imgHeight);
      drawW = imgWidth * scale;
      drawH = imgHeight * scale;
      drawX = (canvas.width - drawW) / 2;
      drawY = (canvas.height - drawH) / 2;
      if (canvas.width >= 1024 && drawW > canvas.width) {
        drawX = Math.max(canvas.width - drawW, (canvas.width - drawW) * 0.85);
      }
    }
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    currentFrameIndex = index;
  }
  function loadInitialFrame(forMobile) {
    const targetFrames = forMobile ? mobileFrames : desktopFrames;
    if (targetFrames[0]) return;
    const firstFrame = new Image();
    firstFrame.src = getFramePath(0, forMobile);
    firstFrame.onload = () => {
      targetFrames[0] = firstFrame;
      renderFrame(0);
    };
  }
  loadInitialFrame(isMobileMode);
  const MAX_CONCURRENT_DOWNLOADS = 6;
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
  function ensureFramesAhead(targetIndex, count = 10) {
    for (let offset = 0; offset <= count; offset++) {
      const ahead = targetIndex + offset;
      if (ahead < totalFrames) queueFrame(ahead, isMobileMode, true);
      const behind = targetIndex - offset;
      if (behind >= 0) queueFrame(behind, isMobileMode, false);
    }
  }
  function preloadAllFrames() {
    for (let i = 1; i <= 20; i++) {
      queueFrame(i, isMobileMode, false);
    }
    const scheduleRemaining = () => {
      for (let i = 21; i < totalFrames; i++) {
        queueFrame(i, isMobileMode, false);
      }
    };
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(scheduleRemaining, { timeout: 1500 });
    } else {
      setTimeout(scheduleRemaining, 500);
    }
  }
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
    if (cachedMaxScroll <= 0) return;
    const scrolled = window.scrollY || window.pageYOffset || 0;
    if (scrolled > cachedMaxScroll * 1.5) {
      if (currentFrameIndex !== totalFrames - 1) {
        currentFrameIndex = totalFrames - 1;
        renderFrame(totalFrames - 1);
      }
      return;
    }
    const progress = Math.min(Math.max(scrolled / cachedMaxScroll, 0), 1);
    const targetIndex = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
    ensureFramesAhead(targetIndex, 8);
    if (targetIndex !== currentFrameIndex) {
      renderFrame(targetIndex);
    }
    if (heroOverlay) {
      if (heroOverlay.style.opacity !== '1') {
        heroOverlay.style.opacity = '1';
        heroOverlay.style.transform = 'translateY(0px)';
        heroOverlay.style.pointerEvents = 'auto';
      }
    }
    if (scrollIndicator) {
      const targetOpacity = progress > 0.05 ? '0' : '1';
      if (scrollIndicator.style.opacity !== targetOpacity) {
        scrollIndicator.style.opacity = targetOpacity;
      }
    }
  }
  window.addEventListener('resize', resizeCanvas, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.requestAnimationFrame(resizeCanvas);
}
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
