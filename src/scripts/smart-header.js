/**
 * Store Detailing - Smart Header Controller
 * 
 * Tính năng:
 * 1. Lăn xuống: Ẩn thanh Header mượt mà để giải phóng 100% không gian cho phim/xe.
 * 2. Lăn ngược lên: Hiện thanh Header ngay lập tức để tiện thao tác.
 * 3. Di chuột lên đỉnh màn hình (<= 75px): Tự động trượt Header xuống để người dùng bấm menu/hotline.
 * 4. Luôn hiển thị khi ở đỉnh trang (scrollY <= 15px).
 */

export function initSmartHeader() {
  const header = document.getElementById('site-header') || document.querySelector('header');
  if (!header) return;

  let lastScrollY = window.scrollY || 0;
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

  // 1. Lắng nghe cuộn chuột: Lăn xuống -> Ẩn, Lăn ngược lên -> Hiện
  function onScroll() {
    const currentScrollY = window.scrollY || 0;

    // Luôn giữ hiện khi ở đỉnh trang
    if (currentScrollY <= 15) {
      showHeader();
      lastScrollY = currentScrollY;
      return;
    }

    const diff = currentScrollY - lastScrollY;

    // Lăn xuống đáng kể (> 5px) -> Ẩn Header
    if (diff > 5 && currentScrollY > 50) {
      hideHeader();
    }
    // Lăn ngược lên (> 5px) -> Hiện Header
    else if (diff < -5) {
      showHeader();
    }

    lastScrollY = currentScrollY;
  }

  // 2. Di chuột lên đỉnh màn hình (<= 75px) -> Hiện Header
  function onMouseMove(e) {
    if (e.clientY <= 75) {
      showHeader();
    } else if (!isMouseOverHeader && window.scrollY > 80 && header.classList.contains('header-visible')) {
      // Khi chuột di chuyển ra khỏi vùng đỉnh và trang đang ở dưới, hẹn giờ ẩn nhẹ sau 1.5s
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

  // 3. Xử lý mở/đóng Menu Hamburger trên Mobile
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-menu-drawer');

  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileDrawer.classList.toggle('hidden');
    });

    // Tự động đóng menu khi bấm vào bất kỳ liên kết nào trong menu
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.add('hidden');
      });
    });

    // Đóng menu khi bấm ra ngoài vùng header
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) {
        mobileDrawer.classList.add('hidden');
      }
    });
  }

  // Trạng thái ban đầu đã được định nghĩa tĩnh qua class header-visible trong HTML
}
