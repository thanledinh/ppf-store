// functions/_middleware.js
// Cloudflare Pages Edge Middleware - Giám sát & nhận diện Bot AI & Search Engines

export async function onRequest(context) {
  const { request } = context;
  const userAgent = request.headers.get('user-agent') || '';
  const url = new URL(request.url);

  const KNOWN_BOTS = [
    { name: 'ChatGPT-User', pattern: /ChatGPT-User/i },
    { name: 'GPTBot', pattern: /GPTBot/i },
    { name: 'PerplexityBot', pattern: /PerplexityBot/i },
    { name: 'ClaudeBot', pattern: /ClaudeBot|anthropic-ai/i },
    { name: 'Googlebot', pattern: /Googlebot/i },
    { name: 'Google-Extended', pattern: /Google-Extended/i },
    { name: 'Bingbot', pattern: /bingbot/i },
    { name: 'Applebot', pattern: /Applebot/i },
    { name: 'Bytespider', pattern: /Bytespider/i }
  ];

  const matchedBot = KNOWN_BOTS.find(bot => bot.pattern.test(userAgent));
  const response = await context.next();

  if (matchedBot) {
    console.log(`🤖 [BOT DETECTED] ${matchedBot.name} -> ${url.pathname} [HTTP ${response.status}]`);
  }

  return response;
}