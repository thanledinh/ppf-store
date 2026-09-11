/**
 * Floating Action Speed-Dial Contact Button
 * - Nút tin nhắn tổng hợp chứa 3 kênh: Messenger, Zalo, Gọi điện
 * - Tương tác thông minh:
 *   + Khi người dùng lướt cuộn trang: Tự động thu gọn 3 nút vào trong để giải phóng tầm nhìn
 *   + Khi người dùng dừng lại (ngừng lướt 450ms): 3 nút tự động nhảy bung ra để kích thích liên hệ
 *   + Người dùng bấm vào nút chính: Có thể chủ động đóng/mở tùy ý
 */
export function initFloatingContact() {
  const contactFab = document.getElementById('contact-main-fab');
  const dialItems = document.getElementById('contact-dial-items');
  const msgIcon = document.getElementById('contact-msg-icon');
  const closeIcon = document.getElementById('contact-close-icon');
  const fabPing = document.getElementById('contact-fab-ping');
  const greetingBubble = document.getElementById('contact-greeting-bubble');

  if (!contactFab || !dialItems) return;

  let isDialOpen = false;
  let scrollStopTimer = null;

  function toggleDial(open) {
    isDialOpen = typeof open === 'boolean' ? open : !isDialOpen;
    if (isDialOpen) {
      // Mở menu: 3 nút nhảy vọt ra, nút chính biến thành dấu X
      dialItems.classList.remove('scale-0', 'opacity-0', 'pointer-events-none', 'translate-y-6');
      dialItems.classList.add('scale-100', 'opacity-100', 'pointer-events-auto', 'translate-y-0');
      
      msgIcon?.classList.add('hidden');
      closeIcon?.classList.remove('hidden', 'rotate-90');
      fabPing?.classList.add('hidden');

      if (greetingBubble) {
        greetingBubble.style.opacity = '0';
        greetingBubble.style.pointerEvents = 'none';
      }
    } else {
      // Đóng menu: 3 nút thu gọn lại vào trong, nút chính trở lại icon tin nhắn
      dialItems.classList.add('scale-0', 'opacity-0', 'pointer-events-none', 'translate-y-6');
      dialItems.classList.remove('scale-100', 'opacity-100', 'pointer-events-auto', 'translate-y-0');
      
      closeIcon?.classList.add('hidden', 'rotate-90');
      msgIcon?.classList.remove('hidden');
      fabPing?.classList.remove('hidden');
    }
  }

  // Sự kiện click nút FAB chính
  contactFab.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDial();
  });

  // Tự động thu gọn khi đang lướt cuộn và tự động nhảy bung ra khi dừng lướt
  window.addEventListener('scroll', () => {
    // 1. Khi đang lướt cuộn: Thu gọn 3 nút vào trong ngay lập tức
    if (isDialOpen) {
      toggleDial(false);
    }

    // 2. Hẹn giờ: Khi người dùng dừng lại (450ms không cuộn thêm) -> Tự động bung 3 nút ra
    clearTimeout(scrollStopTimer);
    scrollStopTimer = setTimeout(() => {
      toggleDial(true);
    }, 450);
  }, { passive: true });

  // Tự động đóng khi click ra bên ngoài
  document.addEventListener('click', (e) => {
    if (isDialOpen && !e.target.closest('#floating-contact-speeddial')) {
      toggleDial(false);
    }
  });

  // Khi vừa vào trang: Tự động bung ra sau 1.8 giây nếu người dùng đứng yên
  setTimeout(() => {
    if (!isDialOpen && window.scrollY < 100) {
      toggleDial(true);
    }
  }, 1800);

  // Khi vào trên mobile: Báo lên "Bấm vào để liên hệ" rồi vài giây sau tự mờ dần biến mất
  const isMobile = window.matchMedia && window.matchMedia('(max-width: 767px)').matches;
  if (greetingBubble && isMobile) {
    greetingBubble.classList.remove('hidden');
    setTimeout(() => {
      greetingBubble.style.opacity = '0';
      greetingBubble.style.transform = 'translateX(10px)';
      setTimeout(() => {
        greetingBubble.remove();
      }, 500);
    }, 4500);
  }
}
