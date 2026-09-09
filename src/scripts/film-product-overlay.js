/**
 * Store Detailing - Section 2: Film Product Info & Brand Selector Overlay
 * 
 * Quản lý tương tác:
 * - Đồng bộ xuất hiện mượt mà khi cuộn phim trải rộng.
 * - Rê chuột (hover) hoặc bấm (click) vào 3 thẻ thương hiệu (3M, GLOBAL, CeraMAX)
 *   để chuyển đổi thông tin, bảng giá và công nghệ hiển thị trên mặt kính phim.
 */

export const BRANDS_DATA = {
  '3m': {
    id: '3m',
    name: '3M',
    slogan: 'Thương hiệu phim cách nhiệt cao cấp từ Mỹ',
    warranty: 'Bảo hành chính hãng 10 năm',
    badge: '3 gói nổi bật',
    origin: 'CÔNG NGHỆ TỪ MỸ',
    accentColor: '#ed1c24',
    logoHtml: `
      <span class="text-3xl md:text-4xl font-black text-[#ed1c24] tracking-tighter drop-shadow-sm select-none">3M</span>
    `,
    cardLogoHtml: `
      <span class="text-2xl font-black text-[#ed1c24] tracking-tighter select-none">3M</span>
    `,
    packages: [
      { name: '3M Ceramic', price: '9.000.000đ' },
      { name: '3M Eco Premium', price: '11.400.000đ' },
      { name: '3M Crystalline BLK', price: '14.800.000đ' },
    ],
    features: [
      { icon: 'layer', text: 'Nano Multi-Layer · Ceramic' },
      { icon: 'sun', text: 'Giảm nhiệt ·' },
      { icon: 'shield', text: 'Chống UV ·' },
      { icon: 'eye', text: 'Giảm chói' },
    ]
  },
  'global': {
    id: 'global',
    name: 'GLOBAL',
    slogan: 'Thương hiệu phim cách nhiệt hàng đầu xuất xứ từ Hoa Kỳ',
    warranty: 'Bảo hành trọn đời chính hãng toàn cầu',
    badge: 'Bảo hành trọn đời',
    origin: 'PHIM CÁCH NHIỆT TOÀN CẦU',
    accentColor: '#b91c1c',
    logoHtml: `
      <div class="flex items-center gap-2 select-none">
        <svg class="w-7 h-7 text-[#b91c1c] fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
        <span class="text-2xl md:text-3xl font-black text-white tracking-wider">GLOBAL</span>
      </div>
    `,
    cardLogoHtml: `
      <div class="flex items-center gap-1.5 select-none">
        <svg class="w-5 h-5 text-[#b91c1c] fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
        <span class="text-lg font-black text-slate-900 tracking-wider">GLOBAL</span>
      </div>
    `,
    packages: [
      { name: 'Global QDP Ceramic', price: '6.300.000đ' },
      { name: 'Global Supreme Ceramic', price: '8.500.000đ' },
      { name: 'Global High-End', price: '12.000.000đ' },
    ],
    features: [
      { icon: 'layer', text: 'Kim loại & Nano Ceramic' },
      { icon: 'sun', text: 'Cản nhiệt 96% ·' },
      { icon: 'shield', text: 'Chống UV 99.9% ·' },
      { icon: 'eye', text: 'Quang học sắc nét' },
    ]
  },
  'ceramax': {
    id: 'ceramax',
    name: 'CeraMAX',
    slogan: 'Công nghệ men gốm Nano Ceramic & Sputter vượt trội',
    warranty: 'Bảo hành chính hãng 15 năm',
    badge: 'Ceramic & Sputter',
    origin: 'HIỆU SUẤT VƯỢT TRỘI',
    accentColor: '#ea580c',
    logoHtml: `
      <span class="text-2xl md:text-3xl font-black text-white tracking-tight select-none">
        Cera<span class="text-[#ea580c]">MAX</span>
      </span>
    `,
    cardLogoHtml: `
      <span class="text-lg font-black text-slate-900 tracking-tight select-none">
        Cera<span class="text-[#ea580c]">MAX</span>
      </span>
    `,
    packages: [
      { name: 'CeraMAX Diamond', price: '9.500.000đ' },
      { name: 'CeraMAX Eco Ceramic', price: '5.500.000đ' },
      { name: 'CeraMAX Platinum', price: '10.500.000đ' },
    ],
    features: [
      { icon: 'layer', text: 'Nano Ceramic & Sputter' },
      { icon: 'sun', text: 'Cản nhiệt 95% ·' },
      { icon: 'shield', text: 'Cắt tia cực tím 99% ·' },
      { icon: 'eye', text: 'Không cản sóng GPS' },
    ]
  }
};

const ICONS = {
  layer: `
    <svg class="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  `,
  sun: `
    <svg class="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  `,
  shield: `
    <svg class="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  `,
  eye: `
    <svg class="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  `
};

export function initFilmProductOverlay() {
  const overlay = document.getElementById('film-ui-overlay');
  const brandContent = document.getElementById('film-brand-content');
  const cardButtons = document.querySelectorAll('.brand-card-item');
  const prevBtn = document.getElementById('brand-prev-btn');
  const nextBtn = document.getElementById('brand-next-btn');

  if (!overlay || !brandContent) return;

  const brandKeys = ['3m', 'global', 'ceramax'];
  let currentBrandIndex = 0;

  // Render nội dung thương hiệu lên mặt phim
  function renderBrandContent(brandId, animate = true) {
    const data = BRANDS_DATA[brandId];
    if (!data) return;

    if (animate) {
      brandContent.style.opacity = '0';
      brandContent.style.transform = 'translateY(6px)';
    }

    setTimeout(() => {
      let packagesHtml = data.packages.map(p => `
        <div class="flex justify-between items-center py-1.5 md:py-2 border-b border-white/10 last:border-0">
          <span class="text-sm md:text-base font-semibold text-white tracking-wide">${p.name}</span>
          <div class="text-sm md:text-base text-slate-200">
            <span class="text-xs md:text-sm text-slate-300 font-normal">từ</span>
            <span class="font-bold text-white text-base md:text-lg ml-1">${p.price}</span>
          </div>
        </div>
      `).join('');

      let featuresHtml = data.features.map((f, i) => `
        <div class="flex items-center gap-1.5">
          ${ICONS[f.icon] || ''}
          <span class="text-slate-200">${f.text}</span>
        </div>
        ${i === 0 ? '<div class="hidden sm:block w-px h-3.5 bg-white/30 mx-1"></div>' : ''}
      `).join('');

      brandContent.innerHTML = `
        <div class="flex items-center gap-3">
          ${data.logoHtml}
        </div>
        <div class="text-sm md:text-base font-semibold text-white mt-1 leading-snug">
          ${data.slogan}
        </div>
        <div class="flex items-center gap-1.5 text-xs md:text-sm text-slate-200 mt-1">
          <svg class="w-4 h-4 text-emerald-400 fill-current shrink-0" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
          </svg>
          <span>${data.warranty}</span>
        </div>

        <div class="w-full h-px bg-white/20 my-3 md:my-3.5"></div>

        <!-- Bảng giá gói phim -->
        <div class="space-y-0.5">
          ${packagesHtml}
        </div>

        <!-- Dòng tính năng công nghệ -->
        <div class="flex flex-wrap items-center gap-3 md:gap-4 text-xs text-slate-200/90 font-medium pt-3 mt-1 border-t border-white/10">
          ${featuresHtml}
        </div>
      `;

      if (animate) {
        brandContent.style.opacity = '1';
        brandContent.style.transform = 'translateY(0)';
      }
    }, animate ? 150 : 0);

    // Cập nhật giao diện thẻ chọn thương hiệu bên dưới
    cardButtons.forEach(card => {
      const cardBrand = card.getAttribute('data-brand');
      const actionBtn = card.querySelector('.brand-action-circle');

      if (cardBrand === brandId) {
        card.classList.remove('border-slate-100', 'bg-white/90');
        card.classList.add('border-red-400', 'bg-white', 'shadow-[0_12px_28px_-6px_rgba(239,68,68,0.22)]', 'ring-2', 'ring-red-400/20');
        if (actionBtn) {
          actionBtn.classList.remove('bg-slate-100', 'text-slate-700');
          actionBtn.classList.add('bg-slate-950', 'text-white');
        }
      } else {
        card.classList.remove('border-red-400', 'shadow-[0_12px_28px_-6px_rgba(239,68,68,0.22)]', 'ring-2', 'ring-red-400/20');
        card.classList.add('border-slate-100', 'bg-white/90');
        if (actionBtn) {
          actionBtn.classList.remove('bg-slate-950', 'text-white');
          actionBtn.classList.add('bg-slate-100', 'text-slate-700');
        }
      }
    });
  }

  // Khởi tạo hiển thị thương hiệu đầu tiên (3M)
  renderBrandContent(brandKeys[0], false);

  // Gán sự kiện Hover & Click cho 3 thẻ thương hiệu
  cardButtons.forEach((card, index) => {
    const brandId = card.getAttribute('data-brand');

    card.addEventListener('mouseenter', () => {
      currentBrandIndex = index;
      renderBrandContent(brandId, true);
    });

    card.addEventListener('click', () => {
      currentBrandIndex = index;
      renderBrandContent(brandId, true);
    });
  });

  // Điều hướng mũi tên < và >
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentBrandIndex = (currentBrandIndex - 1 + brandKeys.length) % brandKeys.length;
      renderBrandContent(brandKeys[currentBrandIndex], true);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentBrandIndex = (currentBrandIndex + 1) % brandKeys.length;
      renderBrandContent(brandKeys[currentBrandIndex], true);
    });
  }
}

/**
 * Hiệu ứng làm mượt mà xuất hiện toàn bộ UI Overlay khi cuộn phim trải rộng
 */
export function showFilmUIOverlay() {
  const overlay = document.getElementById('film-ui-overlay');
  if (!overlay) return;
  overlay.classList.remove('opacity-0', 'pointer-events-none');
  overlay.classList.add('opacity-100');
}

export function hideFilmUIOverlay() {
  const overlay = document.getElementById('film-ui-overlay');
  if (!overlay) return;
  overlay.classList.remove('opacity-100');
  overlay.classList.add('opacity-0', 'pointer-events-none');
}
