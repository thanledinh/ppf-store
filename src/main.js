import { initCarScrollCanvas } from './scripts/car-scroll-canvas.js';
import { initFilmSolutions } from './scripts/film-solutions.js';
import { initSmartHeader } from './scripts/smart-header.js';
import { initFloatingContact } from './scripts/floating-contact.js';
import { initQuoteForm } from './scripts/quote-form.js';
import { initCountdownTimer } from './scripts/countdown-timer.js';
import { initFaqAccordion } from './scripts/faq-accordion.js';
import { initKolVideo } from './scripts/kol-video.js';

/**
 * Store Detailing - Landing Page Dán Phim Cách Nhiệt Ô Tô
 * Mã nguồn JavaScript ES Module thuần (Vanilla Static-First)
 * Tối ưu hiệu năng 100/100 Core Web Vitals
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('⚡ Store Detailing Landing Page Initialized');

  // Khởi động Smart Header, Hero Canvas & Lead Form (Above-the-fold)
  initSmartHeader();
  initCarScrollCanvas();
  try { initQuoteForm(); } catch(e) { console.error(e); }

  // Các module phía dưới màn hình (Below-the-fold): Khởi động khi trình duyệt rảnh rỗi
  // Tránh chiếm dụng luồng chính (Main Thread) lúc vừa tải trang
  const initDeferredModules = () => {
    try { initFilmSolutions(); } catch(e) { console.error(e); }
    try { initCountdownTimer(); } catch(e) { console.error(e); }
    try { initFloatingContact(); } catch(e) { console.error(e); }
    try { initFaqAccordion(); } catch(e) { console.error(e); }
    try { initKolVideo(); } catch(e) { console.error(e); }
    import('./scripts/gallery.js').catch(e => console.error(e));
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(initDeferredModules, { timeout: 1200 });
  } else {
    setTimeout(initDeferredModules, 250);
  }
});