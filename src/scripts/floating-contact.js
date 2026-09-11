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
      dialItems.classList.add('scale-0', 'opacity-0', 'pointer-events-none', 'translate-y-6');
      dialItems.classList.remove('scale-100', 'opacity-100', 'pointer-events-auto', 'translate-y-0');
      closeIcon?.classList.add('hidden', 'rotate-90');
      msgIcon?.classList.remove('hidden');
      fabPing?.classList.remove('hidden');
    }
  }
  contactFab.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDial();
  });
  window.addEventListener('scroll', () => {
    if (isDialOpen) {
      toggleDial(false);
    }
    clearTimeout(scrollStopTimer);
    scrollStopTimer = setTimeout(() => {
      toggleDial(true);
    }, 450);
  }, { passive: true });
  document.addEventListener('click', (e) => {
    if (isDialOpen && !e.target.closest('#floating-contact-speeddial')) {
      toggleDial(false);
    }
  });
  setTimeout(() => {
    if (!isDialOpen && window.scrollY < 100) {
      toggleDial(true);
    }
  }, 1800);
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
