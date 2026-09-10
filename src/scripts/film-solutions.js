/**
 * Store Detailing - Section 2: Film Solutions & Brand Packages
 * Quản lý tương tác chọn thương hiệu (3M, Global, CeraMAX) và hiển thị các gói phim chuẩn thiết kế mockup
 */

export const SOLUTIONS_DATA = {
  '3m': {
    name: '3M',
    tag: '3M',
    warranty: 'Lên đến 10 năm',
    heading: 'CÔNG NGHỆ<br>TẠO NÊN<br>SỰ KHÁC BIỆT',
    desc: 'Mỗi dòng phim 3M được nghiên cứu để đáp ứng những nhu cầu riêng, từ cân bằng chi phí đến hiệu suất vượt trội.',
    packages: [
      {
        id: '3m-ceramic',
        brand: '3m',
        brandDisplay: '3M',
        brandSub: 'CERAMIC',
        subtitle: 'Ổn định. Bền bỉ. Hiệu quả.',
        badgeImg: '/sanpham/vf5/42.webp',
        tag: 'TIẾT KIỆM',
        tagClass: 'bg-white text-slate-800 border border-slate-200/90',
        hasCrown: false,
        specs: [
          { label: 'TSER 60%', sub: 'Giảm nhiệt tổng thể', icon: 'sun' },
          { label: 'IRR 95%', sub: 'Cản tia hồng ngoại', icon: 'heat' },
          { label: 'UVR 99%', sub: 'Chống tia UV', icon: 'shield' },
          { label: 'VLT 70%', sub: 'Tầm nhìn rõ ràng', icon: 'eye' }
        ],
        prices: {
          sedan: '9.000.000đ',
          suv5: '9.800.000đ',
          suv7: '10.500.000đ',
          pickup: '9.800.000đ',
          ev: '9.500.000đ'
        },
        suitableFor: 'Xe gia đình, di chuyển hàng ngày.',
        fullSpecs: {
          brand: '3M (Mỹ)',
          series: '3M Ceramic IR Series',
          tech: 'Men gốm Nano Ceramic phi kim loại',
          thickness: '2.0 mil (50.8 µm)',
          irr: '95% (dải bức xạ 900 – 1.000 nm)',
          tser: '54% – 66% (tùy độ tối mã phim)',
          uvr: '99.9% (chỉ số chống nắng SPF 1000+)',
          vlt: '15% – 70% (kính lái IR70, sườn IR15/IR25)',
          vlr: '<8% (độ phản gương cực thấp)',
          hardCoat: 'Chuẩn 2H (tiêu chuẩn ASTM D3363)',
          adhesive: 'Keo Acrylic PSA quang học nhạy áp lực',
          signal: '100% không kim loại, không cản sóng GPS/VETC/5G',
          warranty: '10 năm bảo hành điện tử chính hãng 3M'
        }
      },
      {
        id: '3m-eco',
        brand: '3m',
        brandDisplay: '3M',
        brandSub: 'ECO PREMIUM',
        subtitle: 'Rõ nét hơn. Thoải mái hơn.',
        badgeImg: '/sanpham/hondacity/20260623-DSC06042.webp',
        tag: 'PHỔ BIẾN',
        tagClass: 'bg-[#e0f2fe] text-[#0284c7] border border-[#bae6fd]',
        hasCrown: true,
        specs: [
          { label: 'TSER 65%', sub: 'Giảm nhiệt mạnh mẽ', icon: 'sun' },
          { label: 'IRR 97%', sub: 'Cản tia hồng ngoại', icon: 'heat' },
          { label: 'UVR 99%', sub: 'Chống tia UV', icon: 'shield' },
          { label: 'VLT 75%', sub: 'Kính sáng, rõ nét', icon: 'eye' }
        ],
        prices: {
          sedan: '11.400.000đ',
          suv5: '12.500.000đ',
          suv7: '13.500.000đ',
          pickup: '12.500.000đ',
          ev: '12.000.000đ'
        },
        suitableFor: 'Người thường xuyên di chuyển, ưu tiên sự thoải mái.',
        fullSpecs: {
          brand: '3M (Mỹ)',
          series: '3M Eco Premium Series',
          tech: 'Nano Ceramic kết hợp màng cản nhiệt hiệu suất cao',
          thickness: '2.0 mil (50.8 µm)',
          irr: '97% (dải bức xạ 900 – 1.000 nm)',
          tser: '60% – 65%',
          uvr: '99.9% (bảo vệ da và nội thất)',
          vlt: '20% – 75%',
          vlr: '<7.5%',
          hardCoat: 'Chuẩn 2H chống xước khi hạ kính',
          adhesive: 'Keo Acrylic PSA quang học chịu nhiệt 100°C',
          signal: '100% xuyên sóng điện tử',
          warranty: '10 năm bảo hành điện tử chính hãng 3M'
        }
      },
      {
        id: '3m-crystalline',
        brand: '3m',
        brandDisplay: '3M',
        brandSub: 'CRYSTALLINE BLK',
        subtitle: 'Đỉnh cao hiệu suất. Tầm nhìn vượt trội.',
        badgeImg: '/sanpham/BMW320i/DSC04297-Edit.webp',
        tag: 'CAO CẤP',
        tagClass: 'bg-[#fef3c7] text-[#92400e] border border-[#fde68a]',
        hasCrown: true,
        specs: [
          { label: 'TSER 68%', sub: 'Giảm nhiệt tối ưu', icon: 'sun' },
          { label: 'IRR 99%', sub: 'Cản tia hồng ngoại tối đa', icon: 'heat' },
          { label: 'UVR 99%', sub: 'Chống tia UV vượt trội', icon: 'shield' },
          { label: 'VLT 70%', sub: 'Độ rõ quang học cao', icon: 'eye' }
        ],
        prices: {
          sedan: '14.800.000đ',
          suv5: '16.200.000đ',
          suv7: '17.500.000đ',
          pickup: '16.200.000đ',
          ev: '15.500.000đ'
        },
        suitableFor: 'Xe cao cấp, người muốn trải nghiệm tốt nhất.',
        fullSpecs: {
          brand: '3M (Mỹ)',
          series: '3M Crystalline BLK Series',
          tech: 'Màng quang học đa lớp độc quyền >200 lớp nano (MOF)',
          thickness: '2.0 mil (50.8 µm) – Liner bảo vệ 0.9 mil',
          irr: '99% (kỷ lục cản nhiệt dải 900 – 1.000 nm)',
          irer: '68% (cản năng lượng dải rộng 780 – 2.500 nm)',
          tser: '64% – 70% (tổng cản nhiệt cao nhất của 3M)',
          uvr: '99.9% (chỉ số chống nắng SPF 1000+)',
          glare: 'Giảm chói lóa lên tới 77%',
          vlt: '20% – 70% (kính lái CR60/CR70 trong suốt dịu mắt)',
          vlr: '6% – 8% (tương đương kính xe nguyên bản)',
          hardCoat: 'Lớp phủ siêu cứng >3H (ASTM D3363)',
          adhesive: 'Keo quang học PSA chuyên dụng không mùi độc hại',
          signal: '100% phi kim loại, hoàn toàn không cản sóng vô tuyến',
          warranty: '10 năm bảo hành điện tử chính hãng 3M'
        }
      }
    ]
  },
  'global': {
    name: 'GLOBAL',
    tag: 'GLOBAL',
    warranty: 'Trọn đời',
    heading: 'CÔNG NGHỆ<br>TẠO NÊN<br>SỰ KHÁC BIỆT',
    desc: 'Thương hiệu phim cách nhiệt hàng đầu Hoa Kỳ với công nghệ sấy định hình Super Shrink độc quyền và bảo hành trọn đời.',
    packages: [
      {
        id: 'global-qdp',
        brand: 'global',
        brandDisplay: 'GLOBAL',
        brandSub: 'QDP CERAMIC',
        subtitle: 'Màng đôi 2-Ply chống tĩnh điện, trong sạch.',
        badgeImg: '/card-glass-bg-1.webp',
        tag: 'TIẾT KIỆM',
        tagClass: 'bg-white text-slate-800 border border-slate-200/90',
        hasCrown: false,
        specs: [
          { label: 'TSER 58%', sub: 'Giảm nhiệt cân bằng', icon: 'sun' },
          { label: 'IRR 90%', sub: 'Cản tia hồng ngoại', icon: 'heat' },
          { label: 'UVR 99%', sub: 'Chống tia UV', icon: 'shield' },
          { label: 'VLT 70%', sub: 'Tầm nhìn sáng rõ', icon: 'eye' }
        ],
        prices: {
          sedan: '6.300.000đ',
          suv5: '6.300.000đ',
          suv7: '7.200.000đ',
          pickup: '6.300.000đ',
          ev: '6.300.000đ'
        },
        suitableFor: 'Xe chạy phố, dịch vụ hoặc gia đình trẻ tiết kiệm chi phí.',
        fullSpecs: {
          brand: 'Global Window Films (Mỹ)',
          series: 'Global QDP Ceramic Series',
          tech: 'Cấu trúc màng đôi 2-Ply kết hợp Nano Ceramic',
          thickness: '2.0 mil (cấu trúc màng kép gia cường)',
          irr: '90% (khả năng chặn bức xạ NIR ở 1.025 nm)',
          tser: '49% – 66%',
          uvr: '>99% (ngăn chặn tia cực tím gây hại)',
          vlt: '05% – 70%',
          vlr: '<8%',
          special: 'Công nghệ sấy định hình SuperShrink & chống tĩnh điện Anti-Static',
          hardCoat: 'Chuẩn 2H chống trầy xước bề mặt',
          signal: '100% không kim loại, an toàn tuyệt đối cho sóng thu phí tự động',
          warranty: 'Bảo hành điện tử trọn đời (Lifetime Warranty)'
        }
      },
      {
        id: 'global-supreme',
        brand: 'global',
        brandDisplay: 'GLOBAL',
        brandSub: 'SUPREME IR',
        subtitle: 'Liên kết chéo chống co mép, cản bức xạ sâu.',
        badgeImg: '/card-glass-bg-3.webp',
        tag: 'CAO CẤP',
        tagClass: 'bg-[#fef3c7] text-[#92400e] border border-[#fde68a]',
        hasCrown: true,
        specs: [
          { label: 'TSER 66%', sub: 'Giảm nhiệt tối ưu', icon: 'sun' },
          { label: 'IRR 96%', sub: 'Cản tia hồng ngoại cao', icon: 'heat' },
          { label: 'UVR 99.9%', sub: 'Chống tia UV tuyệt đối', icon: 'shield' },
          { label: 'VLT 65%', sub: 'Dịu mát êm ái', icon: 'eye' }
        ],
        prices: {
          sedan: '13.200.000đ',
          suv5: '13.200.000đ',
          suv7: '15.500.000đ',
          pickup: '13.200.000đ',
          ev: '13.200.000đ'
        },
        suitableFor: 'Xe di chuyển đường dài thường xuyên, cần độ mát sâu.',
        fullSpecs: {
          brand: 'Global Window Films (Mỹ)',
          series: 'Global Supreme IR Series',
          tech: 'Nano Ceramic hồng ngoại cao cấp, liên kết chéo siêu co',
          thickness: '2.0 mil',
          irr: '96% (chặn hồng ngoại nhiệt lượng)',
          tser: '58% – 68%',
          uvr: '99.9%',
          glare: 'Giảm chói lóa 70%',
          vlt: '15% – 65%',
          hardCoat: 'Chuẩn 2H+ chống xước chuyên sâu',
          signal: '100% xuyên sóng GPS, VETC, 4G/5G',
          warranty: 'Bảo hành điện tử trọn đời (Lifetime Warranty)'
        }
      }
    ]
  },
  'ceramax': {
    name: 'CeraMAX',
    tag: 'CERAMAX',
    warranty: '15 năm',
    heading: 'CÔNG NGHỆ<br>TẠO NÊN<br>SỰ KHÁC BIỆT',
    desc: 'Công nghệ Men gốm Nano Ceramic và Phún xạ kim loại đa tầng chân không tối ưu chi phí và hiệu năng vượt trội.',
    packages: [
      {
        id: 'ceramax-diamond',
        brand: 'ceramax',
        brandDisplay: 'CERAMAX',
        brandSub: 'DIAMOND',
        subtitle: 'Men gốm phủ TiN chống oxy hóa, cản hồng ngoại 99%.',
        badgeImg: '/card-glass-bg-2.webp',
        tag: 'PHỔ BIẾN',
        tagClass: 'bg-[#e0f2fe] text-[#0284c7] border border-[#bae6fd]',
        hasCrown: true,
        specs: [
          { label: 'TSER 65%', sub: 'Giảm nhiệt hiệu quả', icon: 'sun' },
          { label: 'IRR 99.1%', sub: 'Cản tia hồng ngoại vượt trội', icon: 'heat' },
          { label: 'UVR 99.9%', sub: 'Chống tia UV', icon: 'shield' },
          { label: 'VLT 60%', sub: 'Kính trong mát mắt', icon: 'eye' }
        ],
        prices: {
          sedan: '9.500.000đ',
          suv5: '9.500.000đ',
          suv7: '11.300.000đ',
          pickup: '9.500.000đ',
          ev: '9.500.000đ'
        },
        suitableFor: 'Xe gia đình cao cấp, cần độ bền màu và chống oxy hóa.',
        fullSpecs: {
          brand: 'CeraMAX (Hàn Quốc)',
          series: 'CeraMAX Diamond Series',
          tech: 'Men gốm Nano Ceramic tráng phủ Titanium Nitride (TiN)',
          thickness: '2.0 mil (0.05 mm)',
          irr: '99.1% (kỷ lục cản nhiệt hồng ngoại vượt trội)',
          tser: '65% – 72%',
          uvr: '99.9%',
          vlt: '07.4% – 59.7% (CeraMAX 50 kính lái VLT 59.7%)',
          vlr: '6.0% – 8.6% (hạn chế tối đa bóng gương taplo lên kính)',
          hardCoat: 'Chuẩn 2H chống trầy xước',
          signal: '100% không kim loại, đường truyền sóng thông suốt',
          warranty: 'Bảo hành điện tử chính hãng 15 năm'
        }
      },
      {
        id: 'ceramax-sputter',
        brand: 'ceramax',
        brandDisplay: 'CERAMAX',
        brandSub: 'MULTILAYER SPUTTER',
        subtitle: 'Phún xạ đa tầng chân không, phản xạ nhiệt tức thì.',
        badgeImg: '/card-glass-bg-3.webp',
        tag: 'CAO CẤP',
        tagClass: 'bg-[#fef3c7] text-[#92400e] border border-[#fde68a]',
        hasCrown: true,
        specs: [
          { label: 'TSER 72%', sub: 'Tổng cản nhiệt kỷ lục', icon: 'sun' },
          { label: 'IRR 97.1%', sub: 'Phản xạ bức xạ nhiệt', icon: 'heat' },
          { label: 'UVR 99.9%', sub: 'Chống tia UV tối đa', icon: 'shield' },
          { label: 'VLT 50%', sub: 'Tầm nhìn thể thao dịu mắt', icon: 'eye' }
        ],
        prices: {
          sedan: '15.500.000đ',
          suv5: '15.500.000đ',
          suv7: '17.900.000đ',
          pickup: '15.500.000đ',
          ev: '15.500.000đ'
        },
        suitableFor: 'Xe sang & SUV cỡ lớn, đòi hỏi công nghệ phản xạ đỉnh cao.',
        fullSpecs: {
          brand: 'CeraMAX (Hàn Quốc)',
          series: 'CeraMAX Multilayer Sputter Series',
          tech: 'Phún xạ kim loại đa tầng trong chân không (Multi-layer Sputtering)',
          thickness: '2.0 mil',
          irr: '97.1% (cản bức xạ nhiệt trực tiếp)',
          tser: '68% – 75%',
          uvr: '99.9%',
          energyReflect: '24.3% phản xạ trực tiếp ra ngoài môi trường',
          vlt: '12.2% – 50.6% (Sputter 50 kính lái)',
          vlr: '6.0% – 7.5%',
          hardCoat: 'Chuẩn 2H+ chống xước',
          warranty: 'Bảo hành điện tử chính hãng 15 năm'
        }
      }
    ]
  }
};

export const POSITION_PRICING_DATA = [
  {
    code: '3M Crystalline BLK',
    brand: '3m',
    tag: 'CAO CẤP',
    tagClass: 'bg-amber-100 text-amber-800 border border-amber-200',
    kinhLai: '5.700.000đ',
    suonTruoc: '2.600.000đ',
    suonSau: '2.600.000đ',
    kinhLung: '4.100.000đ'
  },
  {
    code: '3M Ceramic IR',
    brand: '3m',
    tag: 'TIẾT KIỆM',
    tagClass: 'bg-slate-100 text-slate-700 border border-slate-200',
    kinhLai: '3.300.000đ',
    suonTruoc: '1.800.000đ',
    suonSau: '1.800.000đ',
    kinhLung: '2.300.000đ'
  },
  {
    code: 'Global Supreme',
    brand: 'global',
    tag: 'PHỔ BIẾN',
    tagClass: 'bg-blue-100 text-blue-800 border border-blue-200',
    kinhLai: '4.900.000đ',
    suonTruoc: '2.700.000đ',
    suonSau: '2.700.000đ',
    kinhLung: '2.900.000đ'
  },
  {
    code: 'Global QDP Ceramic',
    brand: 'global',
    tag: 'TIẾT KIỆM',
    tagClass: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    kinhLai: '2.800.000đ',
    suonTruoc: '1.100.000đ',
    suonSau: '1.100.000đ',
    kinhLung: '1.300.000đ'
  },
  {
    code: 'Ceramax Diamond',
    brand: 'ceramax',
    tag: 'TIẾT KIỆM',
    tagClass: 'bg-orange-100 text-orange-800 border border-orange-200',
    kinhLai: '3.300.000đ',
    suonTruoc: '2.000.000đ',
    suonSau: '2.000.000đ',
    kinhLung: '2.200.000đ'
  },
  {
    code: 'Ceramax Sputter',
    brand: 'ceramax',
    tag: 'ĐẲNG CẤP',
    tagClass: 'bg-purple-100 text-purple-800 border border-purple-200',
    kinhLai: '5.800.000đ',
    suonTruoc: '2.900.000đ',
    suonSau: '2.900.000đ',
    kinhLung: '3.900.000đ'
  }
];

let currentBrandKey = '3m';
let currentCarType = 'sedan';
let currentViewMode = 'package';

export function openSpecModal(packageId) {
  const modal = document.getElementById('film-spec-modal');
  if (!modal) return;

  // Find package data
  let pkgData = null;
  for (const brandKey in SOLUTIONS_DATA) {
    const found = SOLUTIONS_DATA[brandKey].packages.find(p => p.id === packageId);
    if (found) {
      pkgData = found;
      break;
    }
  }

  if (!pkgData) return;

  const titleEl = document.getElementById('spec-modal-title');
  const tagEl = document.getElementById('spec-modal-tag');
  const brandEl = document.getElementById('spec-modal-brand');
  const priceEl = document.getElementById('spec-modal-price');
  const tableBody = document.getElementById('spec-modal-table');

  if (titleEl) titleEl.textContent = `${pkgData.brandDisplay} ${pkgData.brandSub}`;
  if (brandEl) brandEl.textContent = pkgData.fullSpecs.brand;
  const currentPrice = pkgData.prices[currentCarType] || pkgData.prices['sedan'];
  if (priceEl) priceEl.textContent = 'Từ ' + currentPrice;
  if (tagEl) {
    tagEl.textContent = pkgData.tag;
    tagEl.className = `inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${pkgData.tagClass}`;
  }

  if (tableBody) {
    const s = pkgData.fullSpecs;
    tableBody.innerHTML = `
      <tr class="border-b border-slate-100"><td class="py-2 text-xs text-slate-500 font-medium">Thương hiệu / Xuất xứ</td><td class="py-2 text-xs font-bold text-slate-900">${s.brand}</td></tr>
      <tr class="border-b border-slate-100"><td class="py-2 text-xs text-slate-500 font-medium">Dòng sản phẩm</td><td class="py-2 text-xs font-bold text-slate-900">${s.series}</td></tr>
      <tr class="border-b border-slate-100"><td class="py-2 text-xs text-slate-500 font-medium">Công nghệ cốt lõi</td><td class="py-2 text-xs font-bold text-slate-900">${s.tech}</td></tr>
      <tr class="border-b border-slate-100"><td class="py-2 text-xs text-slate-500 font-medium">Độ dày màng phim</td><td class="py-2 text-xs font-bold text-slate-900">${s.thickness}</td></tr>
      <tr class="border-b border-slate-100"><td class="py-2 text-xs text-slate-500 font-medium">Cản tia hồng ngoại (IRR)</td><td class="py-2 text-xs font-bold text-[#ba1b23]">${s.irr}</td></tr>
      <tr class="border-b border-slate-100"><td class="py-2 text-xs text-slate-500 font-medium">Tổng cản nhiệt (TSER)</td><td class="py-2 text-xs font-bold text-slate-900">${s.tser}</td></tr>
      <tr class="border-b border-slate-100"><td class="py-2 text-xs text-slate-500 font-medium">Ngăn tia cực tím (UVR)</td><td class="py-2 text-xs font-bold text-slate-900">${s.uvr}</td></tr>
      <tr class="border-b border-slate-100"><td class="py-2 text-xs text-slate-500 font-medium">Độ truyền sáng (VLT)</td><td class="py-2 text-xs font-bold text-slate-900">${s.vlt}</td></tr>
      <tr class="border-b border-slate-100"><td class="py-2 text-xs text-slate-500 font-medium">Độ phản gương (VLR)</td><td class="py-2 text-xs font-bold text-slate-900">${s.vlr}</td></tr>
      <tr class="border-b border-slate-100"><td class="py-2 text-xs text-slate-500 font-medium">Lớp chống trầy (Hard Coat)</td><td class="py-2 text-xs font-bold text-slate-900">${s.hardCoat}</td></tr>
      <tr class="border-b border-slate-100"><td class="py-2 text-xs text-slate-500 font-medium">Xuyên sóng điện tử / GPS</td><td class="py-2 text-xs font-bold text-emerald-600">${s.signal || '100% không cản sóng'}</td></tr>
      <tr><td class="py-2 text-xs text-slate-500 font-medium">Bảo hành điện tử</td><td class="py-2 text-xs font-bold text-[#ba1b23]">${s.warranty}</td></tr>
    `;
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

export function closeSpecModal() {
  const modal = document.getElementById('film-spec-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

export function initFilmSolutions() {
  const brandTabs = document.querySelectorAll('.brand-filter-tab');
  const carPills = document.querySelectorAll('.car-type-pill');
  const packagesContainer = document.getElementById('film-packages-list');
  const positionTableEl = document.getElementById('position-pricing-table');
  const positionTableBody = document.getElementById('position-table-body');
  const carTabsContainer = document.getElementById('car-type-tabs');
  const tabModePackage = document.getElementById('tab-mode-package');
  const tabModePositions = document.getElementById('tab-mode-positions');
  const compareBtn = document.getElementById('compare-all-btn');
  const compareBtnText = document.getElementById('compare-btn-text');

  const brandTagNameEl = document.getElementById('brand-tag-name');
  const brandHeadingTitleEl = document.getElementById('brand-heading-title');
  const brandDescTextEl = document.getElementById('brand-desc-text');
  const warrantyTextEl = document.getElementById('brand-warranty-text');

  // Render Bảng giá phụ theo vị trí kính
  function renderPositionTable(activeBrandKey = currentBrandKey) {
    if (!positionTableBody) return;

    positionTableBody.innerHTML = POSITION_PRICING_DATA.map((row) => {
      const isBrandMatch = (row.brand === activeBrandKey);
      const rowBgClass = isBrandMatch ? 'bg-red-50/25 ring-1 ring-inset ring-red-200/50' : 'hover:bg-slate-50/70';

      return `
        <tr class="transition-colors ${rowBgClass}">
          <td class="py-2.5 sm:py-3 px-4">
            <div class="flex items-center gap-2">
              <span class="font-bold text-slate-900">${row.code}</span>
              <span class="text-[10px] font-black px-2 py-0.5 rounded-full ${row.tagClass} uppercase tracking-wider">${row.tag}</span>
            </div>
          </td>
          <td class="py-2.5 sm:py-3 px-3 text-center font-bold text-[#ba1b23] bg-red-50/40">${row.kinhLai}</td>
          <td class="py-2.5 sm:py-3 px-3 text-center text-slate-800 font-semibold">${row.suonTruoc}</td>
          <td class="py-2.5 sm:py-3 px-3 text-center text-slate-800 font-semibold">${row.suonSau}</td>
          <td class="py-2.5 sm:py-3 px-3 text-center text-slate-800 font-semibold">${row.kinhLung}</td>
          <td class="py-2.5 sm:py-3 px-4 text-center">
            <a href="#quote-form-section"
              data-prefill-product="${row.code}"
              class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0f172a] hover:bg-[#ba1b23] text-white text-[11px] font-bold transition-all shadow-xs whitespace-nowrap">
              <span>Báo giá</span>
              <span>→</span>
            </a>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Chuyển đổi giữa chế độ Gói full xe và Bảng giá từng vị trí kính
  function setViewMode(mode) {
    currentViewMode = mode;

    if (mode === 'positions') {
      if (tabModePackage) {
        tabModePackage.className = "px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-slate-700 hover:text-slate-900 cursor-pointer flex items-center gap-1.5";
      }
      if (tabModePositions) {
        tabModePositions.className = "px-3 py-1.5 rounded-lg text-xs font-bold transition-all bg-[#0f172a] text-white shadow-xs cursor-pointer flex items-center gap-1.5";
      }
      if (carTabsContainer) carTabsContainer.classList.add('hidden');
      if (packagesContainer) packagesContainer.classList.add('hidden');
      if (positionTableEl) positionTableEl.classList.remove('hidden');

      if (brandHeadingTitleEl) {
        brandHeadingTitleEl.innerHTML = 'BẢNG GIÁ<br>DÁN LẺ<br>TỪNG VỊ TRÍ';
      }
      if (brandDescTextEl) {
        brandDescTextEl.textContent = 'Bảng giá niêm yết chính hãng cho các vị trí kính lái, sườn trước, sườn sau và kính lưng khi có nhu cầu dán lẻ hoặc phối ghép gói.';
      }
      if (compareBtnText) {
        compareBtnText.textContent = '← Quay lại gói full xe';
      }
      renderPositionTable(currentBrandKey);
    } else {
      if (tabModePackage) {
        tabModePackage.className = "px-3 py-1.5 rounded-lg text-xs font-bold transition-all bg-[#0f172a] text-white shadow-xs cursor-pointer flex items-center gap-1.5";
      }
      if (tabModePositions) {
        tabModePositions.className = "px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-slate-700 hover:text-slate-900 cursor-pointer flex items-center gap-1.5";
      }
      if (carTabsContainer) carTabsContainer.classList.remove('hidden');
      if (packagesContainer) packagesContainer.classList.remove('hidden');
      if (positionTableEl) positionTableEl.classList.add('hidden');

      const data = SOLUTIONS_DATA[currentBrandKey] || SOLUTIONS_DATA['3m'];
      if (brandHeadingTitleEl) {
        brandHeadingTitleEl.innerHTML = data.heading || 'CÔNG NGHỆ<br>TẠO NÊN<br>SỰ KHÁC BIỆT';
      }
      if (brandDescTextEl) {
        brandDescTextEl.textContent = data.desc || '';
      }
      if (compareBtnText) {
        compareBtnText.textContent = 'Xem bảng giá vị trí kính';
      }
    }
  }

  // Wire Tab switcher click
  if (tabModePackage) {
    tabModePackage.addEventListener('click', () => setViewMode('package'));
  }
  if (tabModePositions) {
    tabModePositions.addEventListener('click', () => setViewMode('positions'));
  }

  // Wire "Xem bảng giá vị trí kính" toggle button
  if (compareBtn) {
    compareBtn.addEventListener('click', () => {
      if (currentViewMode === 'positions') {
        setViewMode('package');
      } else {
        setViewMode('positions');
      }
    });
  }

  // Wire modal close buttons
  const modalCloseBtn = document.getElementById('spec-modal-close-btn');
  const modalBackdrop = document.getElementById('spec-modal-backdrop');
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeSpecModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeSpecModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSpecModal();
  });

  // Attach click listener for TDS modal
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-open-spec]');
    if (btn) {
      e.preventDefault();
      const pkgId = btn.getAttribute('data-open-spec');
      if (pkgId) openSpecModal(pkgId);
    }
  });



  if (!packagesContainer) return;

  function renderPackages(brandKey, carType = currentCarType) {
    currentBrandKey = brandKey;
    currentCarType = carType;

    const data = SOLUTIONS_DATA[brandKey] || SOLUTIONS_DATA['3m'];

    if (brandTagNameEl) {
      brandTagNameEl.textContent = data.tag || data.name;
    }
    if (brandHeadingTitleEl) {
      brandHeadingTitleEl.innerHTML = data.heading || 'CÔNG NGHỆ<br>TẠO NÊN<br>SỰ KHÁC BIỆT';
    }
    if (brandDescTextEl) {
      brandDescTextEl.textContent = data.desc || '';
    }
    if (warrantyTextEl) {
      warrantyTextEl.textContent = data.warranty;
    }

    packagesContainer.innerHTML = data.packages.map((pkg) => {
      const priceVal = pkg.prices[carType] || pkg.prices['sedan'];

      return `
        <div class="package-card group bg-white rounded-xl lg:rounded-2xl border border-slate-200/90 hover:border-red-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative shadow-xs">
          <!-- 1. Header image with Brand overlay -->
          <div class="h-36 sm:h-40 xl:h-44 w-full bg-slate-950 relative overflow-hidden flex items-end p-4 select-none shrink-0">
            <img src="${pkg.badgeImg}" alt="${pkg.brandDisplay} ${pkg.brandSub}" class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" width="450" height="250" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent pointer-events-none"></div>

            <!-- Title & subtitle overlay (bottom left) -->
            <div class="relative z-10 text-left pr-6">
              <div class="text-2xl xl:text-3xl font-black ${pkg.brand === '3m' ? 'text-[#ba1b23]' : 'text-white'} leading-none tracking-tight">
                ${pkg.brandDisplay}
              </div>
              <div class="text-sm xl:text-base font-black text-white tracking-wide uppercase mt-1 leading-tight">
                ${pkg.brandSub}
              </div>
              <p class="text-[11px] xl:text-xs text-slate-200/90 font-medium mt-1 leading-snug">
                ${pkg.subtitle}
              </p>
            </div>

            <!-- Tag corner top right -->
            <div class="absolute top-3.5 right-3.5 z-10">
              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] xl:text-[11px] font-black tracking-wide ${pkg.tagClass} shadow-xs uppercase">
                ${pkg.tag}
              </span>
            </div>

            ${pkg.hasCrown ? `
            <!-- Watermark / Crown bottom right -->
            <div class="absolute bottom-3 right-3 z-10 text-amber-400/80">
              <svg class="w-4 h-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
              </svg>
            </div>
            ` : ''}
          </div>

          

          <!-- 3. Price & Suitable For row -->
          <div class="px-4 py-3 flex items-center justify-between gap-3 border-b border-slate-100/60">
            <!-- Left: Price -->
            <div class="shrink-0 text-left">
              <div class="text-[11px] text-slate-400 font-medium uppercase">Từ</div>
              <div class="package-price-val text-lg xl:text-xl font-black text-[#ba1b23] tracking-tight leading-none mt-1">
                ${priceVal}
              </div>
            </div>

            <!-- Vertical separator -->
            <div class="h-8 w-px bg-slate-200 shrink-0"></div>

            <!-- Right: Suitable for -->
            <div class="flex-1 text-left">
              <div class="text-[11px] text-slate-400 font-medium uppercase">Phù hợp với</div>
              <div class="text-[11px] xl:text-xs text-slate-700 font-medium leading-tight mt-1 line-clamp-2">
                ${pkg.suitableFor}
              </div>
            </div>
          </div>

          <!-- 4. 2 Action buttons at bottom -->
          <div class="px-3 sm:px-4 py-3.5 pt-2.5 mt-auto">
            <div class="grid grid-cols-2 gap-2 sm:gap-2.5">
              <!-- Xem chi tiết button -->
              <button type="button" data-open-spec="${pkg.id}" aria-label="Xem chi tiết ${pkg.brandDisplay} ${pkg.brandSub}"
                class="inline-flex items-center justify-center py-2.5 px-2 sm:px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-[11px] sm:text-xs xl:text-[13px] font-bold transition-colors cursor-pointer shadow-2xs whitespace-nowrap">
                <span>Xem chi tiết</span>
              </button>

              <!-- Nhận ưu đãi button (Dark black/slate like mockup) -->
              <a href="#quote-form-section"
                class="inline-flex items-center justify-center gap-1 sm:gap-1.5 py-2.5 px-2 sm:px-3 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white text-[11px] sm:text-xs xl:text-[13px] font-bold transition-colors shadow-2xs whitespace-nowrap">
                <svg class="w-3.5 h-3.5 fill-none stroke-current stroke-2 shrink-0 hidden min-[400px]:inline-block md:hidden xl:inline-block" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>Nhận ưu đãi</span>
                <span class="text-xs">→</span>
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function updateBrandTabs(activeBrand) {
    brandTabs.forEach((tab) => {
      const bKey = tab.getAttribute('data-brand');
      const isActive = (bKey === activeBrand);
      const indicator = tab.querySelector('.tab-indicator');
      const titleSpan = tab.querySelector('.brand-tab-title');

      if (indicator) {
        if (isActive) {
          indicator.classList.remove('hidden');
        } else {
          indicator.classList.add('hidden');
        }
      }

      if (isActive) {
        tab.classList.add('active-tab');
        tab.classList.remove('hover:bg-slate-50/60');
        if (titleSpan) {
          if (bKey === '3m') {
            titleSpan.className = "brand-tab-title text-xl lg:text-2xl font-black text-[#ba1b23] leading-none";
          } else if (bKey === 'ceramax') {
            titleSpan.className = "brand-tab-title text-xl lg:text-2xl font-black text-slate-900 leading-none";
            titleSpan.innerHTML = 'Cera<span class="text-[#ea580c]">MAX</span>';
          } else {
            titleSpan.className = "brand-tab-title text-xl lg:text-2xl font-black text-slate-900 leading-none";
          }
        }
      } else {
        tab.classList.remove('active-tab');
        tab.classList.add('hover:bg-slate-50/60');
        if (titleSpan) {
          if (bKey === '3m') {
            titleSpan.className = "brand-tab-title text-xl lg:text-2xl font-black text-slate-600 leading-none";
          } else if (bKey === 'ceramax') {
            titleSpan.className = "brand-tab-title text-xl lg:text-2xl font-black text-slate-600 leading-none";
            titleSpan.innerHTML = 'Cera<span class="text-slate-500">MAX</span>';
          } else {
            titleSpan.className = "brand-tab-title text-xl lg:text-2xl font-black text-slate-600 leading-none";
          }
        }
      }
    });
  }

  function updateCarPills(activeCar) {
    carPills.forEach((pill) => {
      const cType = pill.getAttribute('data-cartype');
      const isActive = (cType === activeCar);

      if (isActive) {
        pill.className = "car-type-pill active-car flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-[#0f172a] text-white text-[11px] sm:text-xs font-bold shadow-xs whitespace-nowrap transition-colors cursor-pointer";
      } else {
        pill.className = "car-type-pill flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-white border border-slate-200/90 text-slate-700 hover:text-slate-900 hover:bg-slate-50 text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer";
      }
    });
  }

  // Brand tabs click
  brandTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const brandKey = tab.getAttribute('data-brand');
      if (!brandKey) return;

      updateBrandTabs(brandKey);
      renderPackages(brandKey, currentCarType);
      if (currentViewMode === 'positions') {
        renderPositionTable(brandKey);
      }
    });
  });

  // Car type pills click
  carPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const carType = pill.getAttribute('data-cartype');
      if (!carType) return;

      updateCarPills(carType);
      renderPackages(currentBrandKey, carType);
    });
  });

  // Initial render: 3M & Sedan
  updateBrandTabs('3m');
  updateCarPills('sedan');
  renderPackages('3m', 'sedan');
}

