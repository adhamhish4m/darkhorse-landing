import puppeteer from 'puppeteer';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const OUT_DIR = resolve('public/brand');

const FONT_LINK = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,500&display=swap" rel="stylesheet">`;

const SHARED_CSS = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 100%; height: 100%; }
  body { font-family: 'Cormorant Garamond', serif; }
  .word, .wordmark, .tagline {
    font-family: 'Cormorant Garamond', 'Times New Roman', serif;
    font-style: italic;
    font-weight: 500;
    color: #f4f1ec;
  }
  .dot { color: #c9a96e; line-height: 0; }
  .accent { color: #c9a96e; }
`;

const banner = `<!doctype html><html><head>${FONT_LINK}<style>${SHARED_CSS}
  body {
    width: 1584px; height: 396px;
    background:
      radial-gradient(ellipse at 80% 30%, rgba(157,106,221,0.22) 0%, transparent 65%),
      #0c0a10;
    position: relative; overflow: hidden;
  }
  .orb {
    position: absolute; top: -160px; right: -80px;
    width: 480px; height: 480px;
    background: radial-gradient(circle, rgba(157,106,221,0.18), transparent 70%);
    border-radius: 50%;
  }
  .content {
    position: absolute; top: 50%; right: 56px;
    transform: translateY(-50%);
    text-align: right;
    line-height: 1;
  }
  .hairline {
    width: 48px; height: 2px; background: #c9a96e;
    margin: 0 0 22px auto;
  }
  .wordmark {
    font-size: 110px;
    letter-spacing: -1px;
    line-height: 1;
    margin-bottom: 12px;
  }
  .wordmark .dot {
    font-size: 1.6em;
    margin-left: -0.04em;
    vertical-align: 0;
  }
  .tagline {
    font-size: 36px;
    letter-spacing: -0.5px;
    color: rgba(244, 241, 236, 0.78);
  }
</style></head><body>
  <div class="orb"></div>
  <div class="content">
    <div class="hairline"></div>
    <div class="wordmark">thirteen<span class="dot">.</span></div>
    <div class="tagline">AI, <span class="accent">engineered</span>.</div>
  </div>
</body></html>`;

const profileSquare = `<!doctype html><html><head>${FONT_LINK}<style>${SHARED_CSS}
  body {
    width: 1024px; height: 1024px;
    background:
      radial-gradient(ellipse at 70% 20%, rgba(157,106,221,0.20) 0%, transparent 60%),
      #0c0a10;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
  }
  .hairline {
    width: 72px; height: 2.5px; background: #c9a96e;
    margin-bottom: 36px;
  }
  .wordmark {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic; font-weight: 500;
    color: #f4f1ec;
    font-size: 130px;
    letter-spacing: -1.5px;
    line-height: 1;
  }
  .wordmark .dot {
    color: #c9a96e;
    font-size: 1.6em;
    margin-left: -0.04em;
    line-height: 0;
    vertical-align: 0;
  }
</style></head><body>
  <div class="hairline"></div>
  <div class="wordmark">thirteen<span class="dot">.</span></div>
</body></html>`;

const wordmarkOnly = `<!doctype html><html><head>${FONT_LINK}<style>${SHARED_CSS}
  body {
    width: 1200px; height: 240px;
    background: #0c0a10;
    display: flex; align-items: center; justify-content: center;
  }
  .wordmark {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic; font-weight: 500;
    color: #f4f1ec;
    font-size: 200px;
    letter-spacing: -2px;
    line-height: 1;
  }
  .wordmark .dot {
    color: #c9a96e;
    font-size: 1.6em;
    margin-left: -0.04em;
    line-height: 0;
    vertical-align: 0;
  }
</style></head><body>
  <div class="wordmark">thirteen<span class="dot">.</span></div>
</body></html>`;

async function render(browser, html, { width, height, scale = 2 }, outName) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: scale });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  // Make sure web fonts have rendered
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 300));
  const buf = await page.screenshot({ type: 'png', omitBackground: false });
  writeFileSync(resolve(OUT_DIR, outName), buf);
  console.log(`wrote ${outName} (${width}x${height}, ${scale}x)`);
  await page.close();
}

const browser = await puppeteer.launch({ headless: 'new' });
try {
  await render(browser, banner,        { width: 1584, height: 396, scale: 2 }, 'banner-linkedin.png');
  await render(browser, profileSquare, { width: 1024, height: 1024, scale: 2 }, 'profile-square.png');
  await render(browser, wordmarkOnly,  { width: 1200, height: 240, scale: 2 }, 'wordmark-dark.png');
} finally {
  await browser.close();
}
