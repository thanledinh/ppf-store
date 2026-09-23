import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

let lenisInstance = null;

export function initSmoothScroll() {
  // If user prefers reduced motion, keep native scrolling
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  try {
    lenisInstance = new Lenis({
      autoRaf: true,
      // lerp: 0.1 gives immediate responsiveness with a gentle momentum coasting tail before stopping
      lerp: 0.1,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      // Keep mobile touch scrolling 100% native (120Hz smooth on iOS/Android)
      syncTouch: false,
      smoothWheel: true,
      anchors: {
        offset: -75 // Offset for fixed navigation header
      }
    });

    window.lenis = lenisInstance;

    return lenisInstance;
  } catch (err) {
    console.warn('Could not initialize Lenis smooth scroll:', err);
    return null;
  }
}

export function stopSmoothScroll() {
  if (lenisInstance) lenisInstance.stop();
}

export function startSmoothScroll() {
  if (lenisInstance) lenisInstance.start();
}
