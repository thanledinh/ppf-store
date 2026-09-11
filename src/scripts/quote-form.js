
// Cấu hình Google Apps Script Web App URL (Backend bảo mật trung gian)
export const GOOGLE_SCRIPT_URL =
  import.meta.env.VITE_GOOGLE_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbz_VirxF_3ci3gd9wCay9VQm9k7YNCBeOYroyy65OJZkdBaFSWAfzPbILiKPR5kvhwX2g/exec';

// Thời điểm trang tải xong (dùng cho Time-gate check chống bot)
const pageLoadTimestamp = Date.now();

// Cấu hình giới hạn tần suất: Tối đa 5 lần gửi trong 1 phút (60,000 ms)
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_SUBMISSIONS_PER_MINUTE = 5;

/**
 * Lấy danh sách số lần gửi hợp lệ trong 60 giây qua
 */
function getRecentTimestamps() {
  try {
    const now = Date.now();
    let timestamps = JSON.parse(localStorage.getItem('sd_submit_timestamps') || '[]');
    timestamps = timestamps.filter((t) => (now - t) < RATE_LIMIT_WINDOW_MS);
    localStorage.setItem('sd_submit_timestamps', JSON.stringify(timestamps));
    return timestamps;
  } catch (e) {
    return [];
  }
}

/**
 * Kiểm tra giới hạn tần suất gửi: Chặn nếu gửi quá 5 lần trong vòng 1 phút
 */
function isRateLimitExceeded() {
  const timestamps = getRecentTimestamps();
  return timestamps.length >= MAX_SUBMISSIONS_PER_MINUTE;
}

/**
 * Ghi nhận một lượt gửi thành công vào bộ đếm tần suất
 */
function recordSubmissionAttempt() {
  try {
    const now = Date.now();
    let timestamps = getRecentTimestamps();
    timestamps.push(now);
    localStorage.setItem('sd_submit_timestamps', JSON.stringify(timestamps));
  } catch (e) {}
}

/**
 * Kiểm tra xem có phải bot submit quá nhanh không (Khách thật cần ít nhất 1.2s để đọc hoặc autofill)
 */
function isBotTooFast() {
  return (Date.now() - pageLoadTimestamp) < 1200;
}

/**
 * Kiểm tra số điện thoại có phải số ảo / số rác / số troll không
 */
function isSpamPhoneNumber(phone) {
  if (!phone || phone.length !== 10) return true;

  // 1. Danh sách các dãy số troll thử nghiệm phổ biến
  const junkNumbers = [
    '0123456789', '0987654321', '0912345678', '0901234567',
    '0900000000', '0911111111', '0922222222', '0933333333',
    '0944444444', '0955555555', '0966666666', '0977777777',
    '0988888888', '0999999999', '0888888888', '0777777777',
    '0333333333', '0555555555',
  ];
  if (junkNumbers.includes(phone)) return true;

  // 2. Kiểm tra nếu có 6 chữ số giống hệt nhau liên tiếp (ví dụ 0981111112, 0907777778)
  if (/(\d)\1{5,}/.test(phone)) return true;

  // 3. Kiểm tra nếu toàn bộ 8 số phía sau đầu mạng đều giống nhau (ví dụ 0900000000)
  const suffix = phone.slice(2);
  if (/^(\d)\1+$/.test(suffix)) return true;

  return false;
}

/**
 * Kiểm tra xem số điện thoại này có vừa gửi thành công trong vòng 3 phút không
 */
function isRecentDuplicate(phone) {
  try {
    const list = JSON.parse(sessionStorage.getItem('sd_recent_submits') || '[]');
    const now = Date.now();
    // Lọc lại các lượt gửi trong vòng 3 phút (180,000 ms)
    const valid = list.filter((item) => now - item.time < 180000);
    sessionStorage.setItem('sd_recent_submits', JSON.stringify(valid));
    return valid.some((item) => item.phone === phone);
  } catch (e) {
    return false;
  }
}

/**
 * Ghi nhận số vừa gửi thành công để chống spam trùng lặp
 */
function recordSubmittedPhone(phone) {
  try {
    const list = JSON.parse(sessionStorage.getItem('sd_recent_submits') || '[]');
    list.push({ phone, time: Date.now() });
    sessionStorage.setItem('sd_recent_submits', JSON.stringify(list));
  } catch (e) {}
}

/**
 * Tự động đọc và lưu giữ các tham số UTM Ads từ URL của khách truy cập
 */
function getUtmParams() {
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'ttclid'];
  const utm = {};

  try {
    const searchParams = new URLSearchParams(window.location.search);
    let hasNewUtm = false;

    keys.forEach((key) => {
      const val = searchParams.get(key);
      if (val) {
        utm[key] = val;
        hasNewUtm = true;
      }
    });

    if (hasNewUtm) {
      sessionStorage.setItem('sd_utm_tracking', JSON.stringify(utm));
    } else {
      const cached = sessionStorage.getItem('sd_utm_tracking');
      if (cached) Object.assign(utm, JSON.parse(cached));
    }
  } catch (e) {
    // Dự phòng lỗi bảo mật sessionStorage
  }

  return utm;
}

/**
 * Kích hoạt sự kiện chuyển đổi cho các nền tảng Ads (Facebook Pixel, GTM, GA4, TikTok, Zalo)
 */
export function triggerConversion(eventName = 'Lead', eventData = {}) {
  try {
    // 1. Facebook Pixel (Meta Ads)
    if (typeof window.fbq === 'function') {
      window.fbq('track', eventName, eventData);
    }
    // 2. Google Tag Manager / Google Ads / GA4
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: eventName === 'Lead' ? 'generate_lead' : 'contact_click',
        ...eventData,
      });
    }
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName === 'Lead' ? 'generate_lead' : 'contact_click', eventData);
    }
    // 3. TikTok Pixel
    if (typeof window.ttq === 'object' && typeof window.ttq.track === 'function') {
      window.ttq.track(eventName === 'Lead' ? 'SubmitForm' : 'Contact', eventData);
    }
    // 4. Zalo Pixel
    if (typeof window.za === 'function') {
      window.za('track', eventName === 'Lead' ? 'Purchase' : 'Contact');
    }
  } catch (err) {
    // Không làm gián đoạn trải nghiệm người dùng nếu Pixel lỗi
  }
}

/**
 * Gửi dữ liệu về Google Sheets qua Web App URL
 */
/**
 * Gửi dữ liệu về Google Sheets qua Web App URL (có timeout 8s chống treo khi mất mạng)
 */
async function sendToGoogleSheet(data) {
  if (!GOOGLE_SCRIPT_URL || !GOOGLE_SCRIPT_URL.startsWith('http')) {
    return false;
  }

  // Kiểm tra nếu thiết bị đang offline hoàn toàn
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return false;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 giây timeout

  try {
    const formData = new FormData();
    const now = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    formData.append('time', now);
    formData.append('xem_het_trang', data.viewed_all ? '✓' : '✗');

    for (const key in data) {
      formData.append(key, data[key]);
    }

    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: formData,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return true;
  } catch (err) {
    clearTimeout(timeoutId);
    return false;
  }
}

/**
 * Tự động gửi bù các lead chưa đồng bộ khi máy có mạng trở lại
 */
async function retryUnsyncedLeads() {
  try {
    const localLeads = JSON.parse(localStorage.getItem('sd_leads') || '[]');
    const unsynced = localLeads.filter((l) => !l.synced);
    if (unsynced.length === 0) return;

    for (const lead of unsynced) {
      const ok = await sendToGoogleSheet(lead);
      if (ok) {
        lead.synced = true;
      }
    }
    localStorage.setItem('sd_leads', JSON.stringify(localLeads));
  } catch (e) {}
}

window.addEventListener('online', () => {
  retryUnsyncedLeads();
});

/**
 * Điều phối dữ liệu: Bắt UTM Ads, lưu LocalStorage và gửi an toàn qua Google Apps Script
 */
async function dispatchLead(data) {
  const utm = getUtmParams();
  const fullPayload = {
    ...data,
    viewed_all: Boolean(data.viewed_all),
    utm_source: utm.utm_source || '',
    utm_medium: utm.utm_medium || '',
    utm_campaign: utm.utm_campaign || '',
    utm_term: utm.utm_term || '',
    utm_content: utm.utm_content || '',
    ad_click_id: utm.gclid || utm.fbclid || utm.ttclid || '',
    synced: false,
  };

  // 1. Luôn lưu bản sao vào localStorage máy để không bao giờ sợ mất số
  try {
    const localLeads = JSON.parse(localStorage.getItem('sd_leads') || '[]');
    localLeads.push({ ...fullPayload, createdAt: new Date().toISOString() });
    localStorage.setItem('sd_leads', JSON.stringify(localLeads));
  } catch (e) {}

  // 2. Kích hoạt sự kiện chuyển đổi Ads cho Pixel / GTM
  triggerConversion('Lead', {
    phone: fullPayload.phone,
    package: fullPayload.package,
    source: fullPayload.source,
  });

  // 3. Gửi dữ liệu qua Google Apps Script (có timeout 8s)
  const isSuccess = await sendToGoogleSheet(fullPayload);

  if (isSuccess) {
    // Đánh dấu lead đã đồng bộ thành công trong localStorage
    try {
      const localLeads = JSON.parse(localStorage.getItem('sd_leads') || '[]');
      const last = localLeads[localLeads.length - 1];
      if (last) last.synced = true;
      localStorage.setItem('sd_leads', JSON.stringify(localLeads));
    } catch (e) {}

    // Ghi nhận số điện thoại để chống spam lặp trong 3 phút
    recordSubmittedPhone(fullPayload.phone);

    // Ghi nhận lượt gửi vào bộ đếm giới hạn 5 lần / 1 phút
    recordSubmissionAttempt();

    return { ok: true };
  } else {
    // Thất bại do mạng: Không ghi nhận trùng lặp để khách có thể bấm thử lại
    return { ok: false, reason: 'network' };
  }
}

export function initQuoteForm() {
  // Theo dõi trạng thái khách đã cuộn hết trang hay chưa
  let hasScrolledToBottom = false;
  window.addEventListener('scroll', () => {
    if (!hasScrolledToBottom && (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 350) {
      hasScrolledToBottom = true;
    }
  }, { passive: true });

  // =========================================================================
  // 1. THEO DÕI CHUYỂN ĐỔI KHI KHÁCH CLICK GỌI ĐIỆN HOẶC CHAT ZALO (CLICK-TO-CALL)
  // =========================================================================
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="tel:"], a[href*="zalo.me"], a[href*="m.me"]');
    if (link) {
      const href = link.getAttribute('href') || '';
      let channel = 'Hotline';
      if (href.includes('zalo')) channel = 'Zalo';
      else if (href.includes('m.me') || href.includes('facebook.com')) channel = 'Messenger';

      triggerConversion('Contact', { channel: channel, target: href });
    }
  });

  // Biến lưu trữ ngầm dòng xe khách đang xem ở Section 2
  let lastViewedCarType = '';

  // =========================================================================
  // 2. LẮNG NGHE CHỌN GÓI SẢN PHẨM TỪ SECTION 2 (HOẶC CÁC NÚT CTA CÓ SẢN PHẨM)
  // =========================================================================
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-select-package], [data-prefill-product]');
    if (!trigger) return;

    const packageName = trigger.getAttribute('data-select-package') || trigger.getAttribute('data-prefill-product');
    if (!packageName) return;

    const formSection = document.getElementById('form-bao-gia');
    const packageInput = document.getElementById('quote-package');
    const phoneInput = document.getElementById('quote-phone');

    // 1. Lưu DỮ LIỆU NGẦM của gói quan tâm (hoàn toàn ẩn, không hiện badge lên form)
    if (packageInput) {
      packageInput.value = packageName;
    }

    // 2. Tự động lưu DỮ LIỆU NGẦM dòng xe khách đang xem (không tự đổi chữ trong ô chọn xe)
    const activeCarPill = document.querySelector('.car-type-pill.active-car');
    const activeCarType = activeCarPill ? activeCarPill.getAttribute('data-cartype') : null;
    const carMapping = {
      'sedan': 'Sedan 4-5 chỗ',
      'suv5': 'SUV / Crossover 5 chỗ',
      'suv7': 'MPV / SUV 7 chỗ',
      'pickup': 'Bán tải (Pickup)',
      'ev': 'Xe điện EV',
    };
    if (activeCarType && carMapping[activeCarType]) {
      lastViewedCarType = carMapping[activeCarType];
    }

    // 3. Cuộn mượt tới form và tự động trỏ focus vào ô Số điện thoại
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        phoneInput?.focus();
      }, 450);
    }
  });

  // =========================================================================
  // 3. XỬ LÝ FORM CHÍNH: #quote-request-form (Form Báo Giá & Ưu Đãi)
  // =========================================================================
  const form = document.getElementById('quote-request-form');
  const successBox = document.getElementById('quote-success-box');
  const successMsg = document.getElementById('quote-success-msg');
  const resetBtn = document.getElementById('quote-reset-btn');
  const honeypotInput = document.getElementById('quote-bot-check');

  const nameInput = document.getElementById('quote-name');
  const phoneInput = document.getElementById('quote-phone');
  const carInput = document.getElementById('quote-car');
  const packageInput = document.getElementById('quote-package');

  const phoneError = document.getElementById('quote-phone-error');

  if (form) {
    phoneInput?.addEventListener('input', () => {
      phoneError?.classList.add('hidden');
      phoneInput.classList.remove('border-red-500');
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // LỚP 1: Bẫy Honeypot chống bot
      if (honeypotInput && honeypotInput.value.trim() !== '') {
        return;
      }

      // LỚP 2: Chặn bot submit quá nhanh (< 1.2s)
      if (isBotTooFast()) {
        return;
      }

      // LỚP 3: Giới hạn tần suất: Tối đa 5 lần gửi trong 1 phút
      if (isRateLimitExceeded()) {
        if (phoneError) {
          phoneError.textContent = 'Bạn đã gửi thông tin quá nhiều lần. Vui lòng chờ 1 phút trước khi thử lại.';
          phoneError.classList.remove('hidden');
        }
        phoneInput?.classList.add('border-red-500');
        phoneInput?.focus();
        return;
      }

      // Họ tên và Dòng xe là tùy chọn (mặc định không cần nhập)
      const nameVal = nameInput ? nameInput.value.trim() : '';
      const phoneVal = phoneInput ? phoneInput.value.trim().replace(/\s+/g, '') : '';
      const carVal = carInput ? carInput.value.trim() : '';
      const packageVal = packageInput ? packageInput.value.trim() : '';

      // LỚP 4: Bắt buộc SỐ ĐIỆN THOẠI 10 chữ số nhà mạng Việt Nam
      const phoneRegex = /^(03|05|07|08|09)\d{8}$/;
      const isPhoneRegexValid = phoneRegex.test(phoneVal);

      if (!phoneVal || !isPhoneRegexValid) {
        if (phoneError) {
          phoneError.textContent = 'Vui lòng nhập số điện thoại hợp lệ (10 chữ số)';
          phoneError.classList.remove('hidden');
        }
        phoneInput?.classList.add('border-red-500');
        phoneInput?.focus();
        return;
      }

      // LỚP 5: Lọc số rác / số ảo / số troll
      const isSpamPhone = isSpamPhoneNumber(phoneVal);
      if (isSpamPhone) {
        if (phoneError) {
          phoneError.textContent = 'Vui lòng nhập đúng số điện thoại di động thực tế';
          phoneError.classList.remove('hidden');
        }
        phoneInput?.classList.add('border-red-500');
        phoneInput?.focus();
        return;
      }

      // Chuẩn bị dữ liệu lead
      const finalName = nameVal || 'Khách hàng';
      const finalCar = carVal || lastViewedCarType || 'Chưa cung cấp';
      const finalPackage = packageVal || 'Tư vấn tổng quan theo xe';
      const finalSource = packageVal ? `Form Báo Giá (Chọn: ${packageVal})` : 'Form Hero Ưu Đãi 30%';

      // LỚP 6: Chống gửi trùng lặp liên tục trong 3 phút (vẫn lưu thông tin và chuyển sang /cam-on)
      const isDuplicate = isRecentDuplicate(phoneVal);
      const origin = window.location.origin;
      const base = (import.meta.env.BASE_URL || '/dan-pcn-o-to-tphcm/').replace(/\/?$/, '/');
      const search = window.location.search || '';
      const targetUrl = `${origin}${base}cam-on/${search}`;

      if (isDuplicate) {
        try {
          sessionStorage.setItem('sd_lead_name', finalName);
          sessionStorage.setItem('sd_lead_phone', phoneVal);
          sessionStorage.setItem('sd_lead_car', finalCar);
        } catch (e) {}

        form.classList.add('hidden');
        if (successBox) successBox.classList.remove('hidden');
        if (successMsg) {
          successMsg.innerHTML = `Store Detailing đã tiếp nhận số <strong>${phoneVal}</strong> của bạn trước đó. Đang chuyển hướng sang trang xác nhận...`;
        }
        setTimeout(() => {
          window.location.assign(targetUrl);
        }, 300);
        return;
      }

      // LỚP 7: Khóa nút submit chống bấm nhiều lần (Debounce)
      const submitBtn = document.getElementById('quote-submit-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <span>Đang gửi thông tin...</span>
        `;
      }

      const res = await dispatchLead({
        name: finalName,
        phone: phoneVal,
        car: finalCar,
        package: finalPackage,
        viewed_all: hasScrolledToBottom,
        source: finalSource,
      });

      // Nếu gặp lỗi mạng / Google Script không phản hồi
      if (!res.ok) {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <span>Thử gửi lại</span>
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          `;
        }
        if (phoneError) {
          phoneError.innerHTML = `Đường truyền mạng gián đoạn. Vui lòng bấm <strong>Thử gửi lại</strong> hoặc gọi Hotline: <a href="tel:0378788898" class="underline font-bold text-red-600">0378 78 88 98</a> để được hỗ trợ ngay!`;
          phoneError.classList.remove('hidden');
        }
        phoneInput?.classList.add('border-red-500');
        phoneInput?.focus();
        return;
      }

      // Ẩn form và hiện thông báo cảm ơn tạm thời
      form.classList.add('hidden');
      if (successBox) {
        successBox.classList.remove('hidden');
      }

      if (successMsg) {
        const greeting = nameVal ? `anh/chị <strong>${nameVal}</strong>` : `<strong>Quý khách</strong>`;
        const carInfo = (carVal || lastViewedCarType) ? ` cho dòng xe <strong>${carVal || lastViewedCarType}</strong>` : '';
        const pkgInfo = packageVal ? ` • Gói quan tâm: <strong>${packageVal}</strong>` : '';
        successMsg.innerHTML = `Cảm ơn ${greeting}! Store Detailing đã tiếp nhận yêu cầu báo giá${carInfo}${pkgInfo}. Đang chuyển hướng sang trang xác nhận...`;
      }

      // Lưu thông tin lead vào sessionStorage để trang /cam-on hiển thị cá nhân hóa
      try {
        sessionStorage.setItem('sd_lead_name', finalName);
        sessionStorage.setItem('sd_lead_phone', phoneVal);
        sessionStorage.setItem('sd_lead_car', finalCar);
      } catch (e) {}

      // Chuyển hướng sang trang /cam-on (giữ nguyên UTM / query tracking cho Pixel & Google Ads Conversion)
      setTimeout(() => {
        window.location.assign(targetUrl);
      }, 300);
    });

    resetBtn?.addEventListener('click', () => {
      form.reset();
      lastViewedCarType = '';
      if (packageInput) packageInput.value = '';
      form.classList.remove('hidden');
      successBox?.classList.add('hidden');
      phoneError?.classList.add('hidden');
      phoneInput?.classList.remove('border-red-500');
    });
  }

  // =========================================================================
  // 4. XỬ LÝ FORM Ở ĐÁY TRANG (FINAL CTA FORM CHÂN TRANG)
  // =========================================================================
  const easterForm = document.getElementById('easter-egg-form');
  if (easterForm) {
    easterForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const honeypotEl = document.getElementById('ee-bot-check');
      const nameEl = document.getElementById('ee-name');
      const phoneEl = document.getElementById('ee-phone');
      const carEl = document.getElementById('ee-car');
      const submitBtn = easterForm.querySelector('button[type="submit"]');

      // LỚP 1: Bẫy Honeypot
      if (honeypotEl && honeypotEl.value.trim() !== '') {
        return;
      }

      // LỚP 2: Chặn bot submit quá nhanh (< 1.2s)
      if (isBotTooFast()) {
        return;
      }

      // LỚP 3: Giới hạn tần suất: Tối đa 5 lần gửi trong 1 phút
      if (isRateLimitExceeded()) {
        alert('Bạn đã gửi thông tin quá nhiều lần trong 1 phút. Vui lòng chờ 1 phút trước khi thử lại.');
        phoneEl?.focus();
        return;
      }

      const nameVal = nameEl ? nameEl.value.trim() : '';
      const phoneVal = phoneEl ? phoneEl.value.trim().replace(/\s+/g, '') : '';
      const carVal = carEl ? carEl.value.trim() : '';

      // LỚP 4: Bắt buộc số điện thoại hợp lệ (10 chữ số)
      const phoneRegex = /^(03|05|07|08|09)\d{8}$/;
      const isPhoneRegexValid = phoneRegex.test(phoneVal);

      if (!phoneVal || !isPhoneRegexValid) {
        alert('Vui lòng nhập đúng số điện thoại di động (10 chữ số) để Store Detailing hỗ trợ tư vấn.');
        phoneEl?.focus();
        return;
      }

      // LỚP 5: Lọc số rác / số ảo
      const isSpamPhone = isSpamPhoneNumber(phoneVal);
      if (isSpamPhone) {
        alert('Vui lòng nhập đúng số điện thoại di động thực tế để nhận báo giá.');
        phoneEl?.focus();
        return;
      }

      const finalName = nameVal || 'Khách hàng';
      const finalCar = carVal || 'Chưa cung cấp';

      // LỚP 6: Chống gửi trùng lặp liên tục trong 3 phút
      const isDuplicate = isRecentDuplicate(phoneVal);
      if (isDuplicate) {
        easterForm.innerHTML = `
          <div class="py-6 text-center text-white animate-in fade-in zoom-in-95 duration-200">
            <h4 class="text-xl font-black mb-1">Đã nhận thông tin!</h4>
            <p class="text-sm text-slate-300">Store Detailing đã tiếp nhận số <strong>${phoneVal}</strong> của bạn trước đó. Chuyên viên đang chuẩn bị gọi điện/Zalo tư vấn ngay!</p>
          </div>
        `;
        return;
      }

      // LỚP 7: Khóa nút submit
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Đang tiếp nhận...</span>`;
      }

      const res = await dispatchLead({
        name: finalName,
        phone: phoneVal,
        car: finalCar,
        package: 'Tư vấn chi tiết',
        viewed_all: true,
        source: 'Form chân trang',
      });

      if (!res.ok) {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Thử gửi lại</span>`;
        }
        alert('Đường truyền mạng gián đoạn không thể gửi thông tin. Quý khách vui lòng bấm thử lại hoặc gọi Hotline tư vấn ngay: 0378 78 88 98');
        phoneEl?.focus();
        return;
      }

      const greeting = nameVal ? `anh/chị <strong>${nameVal}</strong>` : `<strong>Quý khách</strong>`;
      easterForm.innerHTML = `
        <div class="py-6 text-center text-white animate-in fade-in zoom-in-95 duration-200">
          <div class="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h4 class="text-xl font-black mb-1">Đã nhận thông tin thành công!</h4>
          <p class="text-sm text-slate-300">Cảm ơn ${greeting}. Store Detailing sẽ liên hệ tư vấn qua số <strong>${phoneVal}</strong> ngay.</p>
        </div>
      `;
    });
  }
}
