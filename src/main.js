import { initCarScrollCanvas } from './scripts/car-scroll-canvas.js';
import { initFilmSolutions } from './scripts/film-solutions.js';
import { initSmartHeader } from './scripts/smart-header.js';
import { initFloatingContact } from './scripts/floating-contact.js';
import { initQuoteForm } from './scripts/quote-form.js';
import { initCountdownTimer } from './scripts/countdown-timer.js';

/**
 * Store Detailing - Landing Page Dán Phim Cách Nhiệt Ô Tô
 * Mã nguồn JavaScript ES Module thuần (Vanilla Static-First)
 * Tối ưu hiệu năng 100/100 Core Web Vitals
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('⚡ Store Detailing Landing Page Initialized');

  // Khởi động Smart Header & Hero Scroll Canvas (Ưu tiên số 1 để đạt FCP/LCP 100/100)
  initSmartHeader();
  initCarScrollCanvas();

  // Các module phía dưới màn hình (Below-the-fold): Khởi động khi trình duyệt rảnh rỗi
  // Tránh chiếm dụng luồng chính (Main Thread) lúc vừa tải trang
  const initDeferredModules = () => {
    initFilmSolutions();
    initQuoteForm();
    initCountdownTimer();
    initFloatingContact();
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(initDeferredModules, { timeout: 1200 });
  } else {
    setTimeout(initDeferredModules, 250);
  }
});