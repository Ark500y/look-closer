const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\ARK\\.gemini\\antigravity\\brain\\9173bf3a-f43c-42a2-a486-d43607c50bdd';
const PUBLIC_DIR = path.join(__dirname, '../public/review_screenshots');

async function run() {
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });

  console.log('Launching headless Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.toString()));

  console.log('Navigating to http://localhost:3000/ ...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // 1. Desktop Hero view
  const heroPath = path.join(ARTIFACT_DIR, 'phase1-desktop-hero.png');
  await page.screenshot({ path: heroPath });
  fs.copyFileSync(heroPath, path.join(PUBLIC_DIR, 'phase1-desktop-hero.png'));
  console.log('✓ Captured desktop hero');

  // 2. Scroll to Work Section
  await page.evaluate(() => {
    document.getElementById('work')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  const workPath = path.join(ARTIFACT_DIR, 'phase1-desktop-work.png');
  await page.screenshot({ path: workPath });
  console.log('✓ Captured desktop work');

  // 3. Scroll to Services & Worldwide
  await page.evaluate(() => {
    document.getElementById('services')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  const servicesPath = path.join(ARTIFACT_DIR, 'phase1-desktop-services.png');
  await page.screenshot({ path: servicesPath });
  console.log('✓ Captured desktop services');

  // 4. Scroll to Worldwide
  await page.evaluate(() => {
    document.getElementById('worldwide')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  const worldwidePath = path.join(ARTIFACT_DIR, 'phase1-desktop-worldwide.png');
  await page.screenshot({ path: worldwidePath });
  console.log('✓ Captured desktop worldwide');

  // 5. Scroll to Contact & Footer
  await page.evaluate(() => {
    document.getElementById('contact')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  const contactPath = path.join(ARTIFACT_DIR, 'phase1-desktop-contact.png');
  await page.screenshot({ path: contactPath });
  console.log('✓ Captured desktop contact');

  // 6. Mobile View (390x844)
  console.log('Switching to mobile viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 800));

  const mobileHeroPath = path.join(ARTIFACT_DIR, 'phase1-mobile-hero.png');
  await page.screenshot({ path: mobileHeroPath });
  console.log('✓ Captured mobile hero');

  // Check for horizontal overflow
  const hasOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });

  console.log('Horizontal overflow on mobile:', hasOverflow);
  console.log('Console errors:', errors);

  await browser.close();
  console.log('All captures complete!');
}

run().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
