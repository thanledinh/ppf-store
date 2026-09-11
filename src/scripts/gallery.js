/**
 * Store Detailing - Gallery Lightbox Controller
 * Tối ưu hiệu năng: Sử dụng Event Delegation, không forced reflow, cực nhẹ luồng chính
 */
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

  // Mở Lightbox
  const openLightbox = (title, imagesData) => {
    try {
      currentImages = typeof imagesData === 'string' ? JSON.parse(imagesData) : imagesData;
      currentIndex = 0;
      if (titleEl) titleEl.textContent = title || '';
      
      updateLightboxContent();
      
      // Render thumbnails
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

      // Show lightbox mượt mà không gây forced reflow
      lightbox.classList.remove('hidden');
      window.requestAnimationFrame(() => {
        lightbox.classList.remove('opacity-0');
        lightbox.classList.add('opacity-100');
      });
      document.body.style.overflow = 'hidden'; // Ngăn cuộn trang
    } catch (e) {
      console.error('Invalid image data', e);
    }
  };

  // Đóng Lightbox
  const closeLightbox = () => {
    lightbox.classList.remove('opacity-100');
    lightbox.classList.add('opacity-0');
    setTimeout(() => {
      lightbox.classList.add('hidden');
      document.body.style.overflow = '';
      currentImages = [];
    }, 250);
  };

  // Cập nhật nội dung Lightbox
  const updateLightboxContent = () => {
    if (currentImages.length === 0 || !mainImg) return;
    
    // Fade effect cho ảnh chính
    mainImg.style.opacity = '0';
    setTimeout(() => {
      mainImg.src = currentImages[currentIndex];
      mainImg.onload = () => {
        mainImg.style.opacity = '1';
      };
    }, 120);

    // Cập nhật trạng thái thumbnail
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

  // Event Delegation cho Gallery Cards - 0ms startup time!
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.gallery-card');
    if (card) {
      const title = card.getAttribute('data-title');
      const imagesData = card.getAttribute('data-images');
      openLightbox(title, imagesData);
    }
  });

  // Hỗ trợ phím Enter/Space cho Accessibility trên Gallery Cards
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

  // Gắn sự kiện cho Modal Controls
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', nextImage);
  if (prevBtn) prevBtn.addEventListener('click', prevImage);
  
  // Đóng khi click ra ngoài ảnh
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || (e.target.closest('.flex-1') === e.target)) {
      closeLightbox();
    }
  });

  // Hỗ trợ phím tắt Keyboard
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });
}

// Tự động khởi chạy nếu được import trực tiếp
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGallery);
} else {
  initGallery();
}
