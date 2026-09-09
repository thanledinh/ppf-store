/**
 * Module xử lý Form Nhận Báo Giá Chi Tiết (Trang 3)
 * Store Detailing - Báo giá ngay trong 3-5 phút
 */

export function initQuoteForm() {
  const form = document.getElementById('quote-request-form');
  const successBox = document.getElementById('quote-success-box');
  const successMsg = document.getElementById('quote-success-msg');
  const resetBtn = document.getElementById('quote-reset-btn');
  const honeypotInput = document.getElementById('quote-bot-check');

  const nameInput = document.getElementById('quote-name');
  const phoneInput = document.getElementById('quote-phone');
  const carInput = document.getElementById('quote-car');
  const packageInput = document.getElementById('quote-package');

  const nameError = document.getElementById('quote-name-error');
  const phoneError = document.getElementById('quote-phone-error');

  if (!form) return;

  // Xóa báo lỗi khi người dùng gõ phím
  nameInput?.addEventListener('input', () => {
    nameError?.classList.add('hidden');
    nameInput.classList.remove('border-red-500');
  });

  phoneInput?.addEventListener('input', () => {
    phoneError?.classList.add('hidden');
    phoneInput.classList.remove('border-red-500');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // 1. Kiểm tra Honeypot (Chống bot spam tự động điền)
    if (honeypotInput && honeypotInput.value.trim() !== '') {
      console.warn('Bot detected via honeypot.');
      return;
    }

    // 2. Kiểm tra dữ liệu đầu vào
    let isValid = true;
    const nameVal = nameInput ? nameInput.value.trim() : '';
    const phoneVal = phoneInput ? phoneInput.value.trim().replace(/\s+/g, '') : '';
    const carVal = carInput ? carInput.value.trim() : '';
    const packageVal = packageInput ? packageInput.value.trim() : '';

    if (!nameVal) {
      nameError?.classList.remove('hidden');
      nameInput?.classList.add('border-red-500');
      isValid = false;
    }

    // Kiểm tra định dạng số điện thoại Việt Nam (10 số, bắt đầu bằng 03, 05, 07, 08, 09)
    const phoneRegex = /^(03|05|07|08|09)\d{8}$/;
    if (!phoneVal || !phoneRegex.test(phoneVal)) {
      phoneError?.classList.remove('hidden');
      phoneInput?.classList.add('border-red-500');
      isValid = false;
    }

    if (!isValid) return;

    // 3. Giả lập gửi form thành công
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

    setTimeout(() => {
      // Ẩn form và hiện hộp cảm ơn
      form.classList.add('hidden');
      if (successBox) {
        successBox.classList.remove('hidden');
      }

      if (successMsg) {
        const carInfo = carVal ? ` cho dòng xe <strong>${carVal}</strong>` : '';
        const pkgInfo = packageVal ? ` • Gói quan tâm: <strong>${packageVal}</strong>` : '';
        successMsg.innerHTML = `Cảm ơn anh/chị <strong>${nameVal}</strong>! Store Detailing đã tiếp nhận yêu cầu báo giá${carInfo}${pkgInfo}. Chuyên viên kỹ thuật sẽ gọi điện/Zalo qua số <strong>${phoneVal}</strong> ngay trong 3-5 phút.`;
      }

      // Khôi phục nút submit
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <span>Nhận tư vấn và báo giá chi tiết</span>
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        `;
      }
    }, 600);
  });

  // Nút gửi lại yêu cầu khác
  resetBtn?.addEventListener('click', () => {
    form.reset();
    form.classList.remove('hidden');
    successBox?.classList.add('hidden');
    nameError?.classList.add('hidden');
    phoneError?.classList.add('hidden');
  });
}
