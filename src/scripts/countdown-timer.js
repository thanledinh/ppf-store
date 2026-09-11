export function initCountdownTimer() {
  const container = document.getElementById('promo-countdown');
  if (!container) return;
  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minutesEl = document.getElementById('countdown-minutes');
  const secondsEl = document.getElementById('countdown-seconds');
  const deadlineStr = container.dataset.deadline || '2026-09-30T23:59:59+07:00';
  let targetDate = new Date(deadlineStr).getTime();
  const now = Date.now();
  if (isNaN(targetDate) || targetDate <= now) {
    const current = new Date();
    targetDate = new Date(current.getFullYear(), current.getMonth() + 1, 0, 23, 59, 59).getTime();
  }
  function update() {
    const currentNow = Date.now();
    let distance = targetDate - currentNow;
    if (distance <= 0) {
      const current = new Date();
      targetDate = new Date(current.getFullYear(), current.getMonth() + 1, 0, 23, 59, 59).getTime();
      distance = targetDate - currentNow;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }
  update();
  setInterval(update, 1000);
}
