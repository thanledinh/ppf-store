import { initCarScrollCanvas } from './scripts/car-scroll-canvas.js';
import { initFilmSolutions } from './scripts/film-solutions.js';
import { initSmartHeader } from './scripts/smart-header.js';
import { initFloatingContact } from './scripts/floating-contact.js';
import { initQuoteForm } from './scripts/quote-form.js';
import { initCountdownTimer } from './scripts/countdown-timer.js';
import { initFaqAccordion } from './scripts/faq-accordion.js';
import { initKolVideo } from './scripts/kol-video.js';
import { initGallery } from './scripts/gallery.js';
import { initSmoothScroll } from './scripts/smooth-scroll.js';
document.addEventListener('DOMContentLoaded', () => {
  console.log('⚡ Store Detailing Landing Page Initialized');
  initSmartHeader();
  try { initSmoothScroll(); } catch(e) { console.error(e); }
  try { initQuoteForm(); } catch(e) { console.error(e); }
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
