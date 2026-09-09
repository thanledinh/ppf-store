// scripts/summon-bots.mjs
// Tự động kích hoạt IndexNow và thông báo tới các AI Search Engines (ChatGPT Search, Bing, Copilot)

const DOMAIN = 'storedetailing.vn';
const INDEXNOW_KEY = 'c035653b478d4624b423f0abc1234567';

const TARGET_URLS = [
  `https://${DOMAIN}/dan-phim-cach-nhiet/`,
  `https://${DOMAIN}/dan-phim-cach-nhiet/llms.txt`,
  `https://${DOMAIN}/dan-phim-cach-nhiet/sitemap.xml`
];

async function summonBots() {
  console.log('🚀 Đang triệu hồi các AI Crawlers & Search Engine Bots...');

  // 1. Giao thức IndexNow (Bing, ChatGPT Search, Copilot, Yandex)
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: DOMAIN,
        key: INDEXNOW_KEY,
        keyLocation: `https://${DOMAIN}/${INDEXNOW_KEY}.txt`,
        urlList: TARGET_URLS
      })
    });
    console.log(`[IndexNow] Trạng thái phản hồi: ${res.status} (200/202 = Thành công)`);
  } catch (err) {
    console.error('[IndexNow] Lỗi:', err.message);
  }

  // 2. Ping Sitemap trực tiếp tới Bing
  try {
    const sitemapUrl = encodeURIComponent(`https://${DOMAIN}/dan-phim-cach-nhiet/sitemap.xml`);
    const bingPing = await fetch(`https://www.bing.com/ping?sitemap=${sitemapUrl}`);
    console.log(`[Bing Sitemap Ping] Trạng thái: ${bingPing.status}`);
  } catch (err) {
    console.error('[Sitemap Ping] Lỗi:', err.message);
  }

  console.log('✅ Hoàn tất kích hoạt bot!');
}

summonBots();