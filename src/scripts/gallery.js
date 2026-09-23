export function initGallery() {
  const lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox) return;
  const mainImg = document.getElementById('lightbox-main-img');
  const titleEl = document.getElementById('lightbox-title');
  const thumbnailsContainer = document.getElementById('lightbox-thumbnails');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  let currentImages = [];
  let currentIndex = 0;

  const resolveAssetUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
    const base = import.meta.env.BASE_URL || '/';
    const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
    const cleanBase = base.endsWith('/') ? base : base + '/';
    if (url.startsWith(cleanBase)) return url;
    return cleanBase + cleanUrl;
  };

  const openLightbox = (title, imagesData) => {
    try {
      const parsed = typeof imagesData === 'string' ? JSON.parse(imagesData) : imagesData;
      currentImages = (Array.isArray(parsed) ? parsed : []).map(resolveAssetUrl);
      currentIndex = 0;
      if (titleEl) titleEl.textContent = title || '';
      updateLightboxContent();
      if (thumbnailsContainer) {
        thumbnailsContainer.innerHTML = '';
        currentImages.forEach((src, index) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.setAttribute('aria-label', `Xem ảnh ${index + 1}`);
          btn.className = `w-16 h-12 sm:w-20 sm:h-14 shrink-0 rounded-md overflow-hidden border-2 transition-all opacity-60 hover:opacity-100 ${index === currentIndex ? 'border-[#ba1b23] opacity-100' : 'border-transparent'}`;
          btn.onclick = () => {
            currentIndex = index;
            updateLightboxContent();
          };
          const img = document.createElement('img');
          img.src = src;
          img.alt = `Thumbnail ${index + 1}`;
          img.width = 80;
          img.height = 56;
          img.loading = 'lazy';
          img.className = 'w-full h-full object-cover';
          btn.appendChild(img);
          thumbnailsContainer.appendChild(btn);
        });
      }
      lightbox.classList.remove('hidden');
      window.requestAnimationFrame(() => {
        lightbox.classList.remove('opacity-0');
        lightbox.classList.add('opacity-100');
      });
      document.body.style.overflow = 'hidden'; 
    } catch (e) {
      console.error('Invalid image data', e);
    }
  };
  const closeLightbox = () => {
    lightbox.classList.remove('opacity-100');
    lightbox.classList.add('opacity-0');
    setTimeout(() => {
      lightbox.classList.add('hidden');
      document.body.style.overflow = '';
      currentImages = [];
    }, 250);
  };
  const updateLightboxContent = () => {
    if (currentImages.length === 0 || !mainImg) return;
    mainImg.style.opacity = '0';
    setTimeout(() => {
      mainImg.src = currentImages[currentIndex];
      mainImg.onload = () => {
        mainImg.style.opacity = '1';
      };
    }, 120);
    if (thumbnailsContainer) {
      const thumbs = thumbnailsContainer.children;
      for (let i = 0; i < thumbs.length; i++) {
        if (i === currentIndex) {
          thumbs[i].classList.add('border-[#ba1b23]', 'opacity-100');
          thumbs[i].classList.remove('border-transparent', 'opacity-60');
          thumbs[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
          thumbs[i].classList.remove('border-[#ba1b23]', 'opacity-100');
          thumbs[i].classList.add('border-transparent', 'opacity-60');
        }
      }
    }
  };
  const nextImage = () => {
    if (currentImages.length === 0) return;
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateLightboxContent();
  };
  const prevImage = () => {
    if (currentImages.length === 0) return;
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateLightboxContent();
  };
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.gallery-card');
    if (card) {
      const title = card.getAttribute('data-title');
      const imagesData = card.getAttribute('data-images');
      openLightbox(title, imagesData);
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = document.activeElement && document.activeElement.closest('.gallery-card');
      if (card) {
        e.preventDefault();
        const title = card.getAttribute('data-title');
        const imagesData = card.getAttribute('data-images');
        openLightbox(title, imagesData);
      }
    }
  });
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', nextImage);
  if (prevBtn) prevBtn.addEventListener('click', prevImage);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || (e.target.closest('.flex-1') === e.target)) {
      closeLightbox();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });
}
