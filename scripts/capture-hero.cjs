const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Desktop
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/dan-ppf-o-to-tphcm/', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'scratch/hero-desktop-preview.jpg', clip: { x: 0, y: 0, width: 1440, height: 800 } });

  // Mobile
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.reload({ waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'scratch/hero-mobile-preview.jpg', clip: { x: 0, y: 0, width: 390, height: 700 } });

  await browser.close();
  console.log('Screenshots saved!');
}

capture().catch(console.error);
