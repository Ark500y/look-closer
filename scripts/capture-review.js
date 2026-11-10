const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = path.join(__dirname, '../public/review_screenshots');

async function run() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  console.log('Launching Chrome from:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  const consoleLogs = [];
  page.on('console', msg => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => consoleLogs.push(`[ERROR] ${err.toString()}`));

  console.log('Navigating to http://localhost:3000/...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });

  // Wait for initial calibration
  await new Promise(r => setTimeout(r, 2000));

  // Capture Chapter 0 (z = 0)
  await page.screenshot({ path: path.join(OUT_DIR, 'ch0-void.png') });
  console.log('✓ Captured ch0-void.png');

  // Total chapters = 7, scroll container height = 6 * 150vh = 900vh
  // Total scrollable distance = document.body.scrollHeight - window.innerHeight
  const maxScroll = await page.evaluate(() => {
    return document.documentElement.scrollHeight - window.innerHeight;
  });
  console.log('Max scroll distance:', maxScroll);

  for (let i = 1; i <= 6; i++) {
    const targetY = (i / 6) * maxScroll;
    await page.evaluate((y) => {
      window.scrollTo(0, y);
    }, targetY);

    // Wait for GSAP scrub and rendering to settle
    await new Promise(r => setTimeout(r, 1200));

    await page.screenshot({ path: path.join(OUT_DIR, `ch${i}-review.png`) });
    console.log(`✓ Captured ch${i}-review.png at targetY=${Math.round(targetY)}`);
  }

  // Also capture mobile (390x844)
  console.log('Testing mobile viewport 390x844...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(OUT_DIR, 'mobile-hero.png') });
  console.log('✓ Captured mobile-hero.png');

  // Also capture /lite page
  console.log('Testing /lite page...');
  await page.goto('http://localhost:3000/lite', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(OUT_DIR, 'lite-page.png') });
  console.log('✓ Captured lite-page.png');

  await browser.close();

  console.log('\n--- Console Logs during execution ---');
  console.log(consoleLogs.join('\n') || '(No console logs or errors)');
}

run().catch(err => {
  console.error('Run error:', err);
  process.exit(1);
});
