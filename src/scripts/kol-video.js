export function initKolVideo() {
  const videoCards = document.querySelectorAll('.kol-video-card');
  const modal = document.getElementById('kol-tiktok-modal');
  const modalVideo = document.getElementById('kol-modal-video');
  const modalClose = document.getElementById('kol-modal-close');
  const loader = document.getElementById('kol-modal-loader');

  if (!videoCards.length || !modal || !modalVideo) return;

  videoCards.forEach(card => {
    card.addEventListener('click', () => {
      const videoSrc = card.getAttribute('data-video-src');
      if (!videoSrc) return;

      loader.classList.remove('hidden');
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      
      modalVideo.src = videoSrc;
      
      document.body.style.overflow = 'hidden';

      modalVideo.play().then(() => {
        loader.classList.add('hidden');
      }).catch(err => {
        console.error("Video play failed:", err);
        loader.classList.add('hidden');
      });
    });
  });

  const closeModal = () => {
    modalVideo.pause();
    modalVideo.src = '';
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}
