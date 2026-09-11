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
