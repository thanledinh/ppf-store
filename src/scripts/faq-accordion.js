/**
 * Store Detailing - FAQ Exclusive Accordion Controller
 * Đảm bảo chỉ mở duy nhất 1 câu hỏi tại một thời điểm:
 * Khi người dùng bấm mở câu hỏi mới -> câu hỏi trước đó sẽ tự động đóng lại.
 */
export function initFaqAccordion() {
  const faqList = document.querySelectorAll('#faq-section details');
  if (!faqList.length) return;

  faqList.forEach((detail) => {
    detail.addEventListener('toggle', () => {
      if (detail.open) {
        faqList.forEach((other) => {
          if (other !== detail && other.open) {
            other.open = false;
          }
        });
      }
    });
  });
}
