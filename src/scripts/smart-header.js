export function initSmartHeader() {
  const header = document.getElementById('site-header') || document.querySelector('header');
  if (!header) return;
  let lastScrollY = 0;
  let isMouseOverHeader = false;
  let hideTimeout = null;
  function showHeader() {
    clearTimeout(hideTimeout);
    header.classList.remove('header-hidden');
    header.classList.add('header-visible');
  }
  function hideHeader() {
    if (isMouseOverHeader) return;
    if (window.scrollY <= 15) {
      showHeader();
      return;
    }
    header.classList.remove('header-visible');
    header.classList.add('header-hidden');
  }
  function onScroll() {
    const currentScrollY = window.scrollY || 0;
    if (currentScrollY <= 15) {
      showHeader();
      lastScrollY = currentScrollY;
      return;
    }
    const diff = currentScrollY - lastScrollY;
    if (diff > 5 && currentScrollY > 50) {
      hideHeader();
    }
    else if (diff < -5) {
      showHeader();
    }
    lastScrollY = currentScrollY;
  }
  function onMouseMove(e) {
    if (e.clientY <= 75) {
      showHeader();
    } else if (!isMouseOverHeader && window.scrollY > 80 && header.classList.contains('header-visible')) {
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        if (!isMouseOverHeader && window.scrollY > 80) {
          hideHeader();
        }
      }, 1500);
    }
  }
  header.addEventListener('mouseenter', () => {
    isMouseOverHeader = true;
    showHeader();
  });
  header.addEventListener('mouseleave', () => {
    isMouseOverHeader = false;
    if (window.scrollY > 80) {
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(hideHeader, 1000);
    }
  });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('mousemove', onMouseMove, { passive: true });
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-menu-drawer');
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileDrawer.classList.toggle('hidden');
    });
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.add('hidden');
      });
    });
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) {
        mobileDrawer.classList.add('hidden');
      }
    });
  }
}
