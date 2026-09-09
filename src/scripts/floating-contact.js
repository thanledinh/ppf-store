/**
 * Floating Action Speed-Dial Contact Button
 * - Nút tin nhắn tổng hợp chứa 3 kênh: Messenger, Zalo, Gọi điện
 * - Bấm vào thì 3 nút nhảy vọt ra, nút chính biến thành dấu X
 * - Khi lướt cuộn trang hoặc bấm ra ngoài: Tự động đóng gọn lại để tối ưu diện tích
 * - Trên mobile: Hiển thị tooltip 'Bấm vào để liên hệ' khi vừa vào trang và tự biến mất sau 4.5s
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

  // Tự động đóng khi lướt cuộn giao diện để tối ưu diện tích
  window.addEventListener('scroll', () => {
    if (isDialOpen) {
      toggleDial(false);
    }
  }, { passive: true });

  // Tự động đóng khi click ra bên ngoài
  document.addEventListener('click', (e) => {
    if (isDialOpen && !e.target.closest('#floating-contact-speeddial')) {
      toggleDial(false);
    }
  });

  // Khi vào trên mobile: Báo lên "Bấm vào để liên hệ" rồi vài giây sau tự mờ dần biến mất
  if (greetingBubble && window.innerWidth < 768) {
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
