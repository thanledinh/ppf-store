import { initCarScrollCanvas } from './scripts/car-scroll-canvas.js';
import { initFilmSolutions } from './scripts/film-solutions.js';
import { initSmartHeader } from './scripts/smart-header.js';
import { initFloatingContact } from './scripts/floating-contact.js';
import { initQuoteForm } from './scripts/quote-form.js';
import { initCountdownTimer } from './scripts/countdown-timer.js';
import { initFaqAccordion } from './scripts/faq-accordion.js';
import { initKolVideo } from './scripts/kol-video.js';
import { initGallery } from './scripts/gallery.js';

/**
 * Store Detailing - Landing Page Dán Phim Cách Nhiệt Ô Tô
 * Mã nguồn JavaScript ES Module thuần (Vanilla Static-First)
 * Tối ưu hiệu năng 100/100 Core Web Vitals
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('⚡ Store Detailing Landing Page Initialized');

  // Khởi động Smart Header & Form báo giá (nhẹ, thuần DOM)
  initSmartHeader();
  try { initQuoteForm(); } catch(e) { console.error(e); }

  // TRÌ HOÃN HERO CANVAS (CẢ PC VÀ MOBILE):
  // Hero section đã hiển thị sẵn background-image CSS (0ms LCP).
  // Canvas chỉ khởi chạy khi người dùng bắt đầu chạm / cuộn hoặc khi trình duyệt hoàn toàn rảnh rỗi (idle),
  // triệt tiêu 100% Forced Reflow ở thời điểm tải trang đầu tiên!
  let carCanvasStarted = false;
  const startCarCanvas = () => {
    if (carCanvasStarted) return;
    carCanvasStarted = true;
    try { initCarScrollCanvas(); } catch(e) { console.error(e); }
  };

  window.addEventListener('scroll', startCarCanvas, { passive: true, once: true });
  window.addEventListener('touchstart', startCarCanvas, { passive: true, once: true });
  window.addEventListener('wheel', startCarCanvas, { passive: true, once: true });

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(startCarCanvas, { timeout: 2200 });
  } else {
    setTimeout(startCarCanvas, 1200);
  }

  // Các module phía dưới màn hình (Below-the-fold): Khởi động khi trình duyệt rảnh rỗi
  // Tránh chiếm dụng luồng chính (Main Thread) lúc vừa tải trang
  const initDeferredModules = () => {
    try { initCountdownTimer(); } catch(e) { console.error(e); }
    try { initFilmSolutions(); } catch(e) { console.error(e); }
    try { initFloatingContact(); } catch(e) { console.error(e); }
    try { initFaqAccordion(); } catch(e) { console.error(e); }
    try { initKolVideo(); } catch(e) { console.error(e); }
    try { initGallery(); } catch(e) { console.error(e); }
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(initDeferredModules, { timeout: 1500 });
  } else {
    setTimeout(initDeferredModules, 350);
  }
});