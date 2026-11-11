const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\ARK\\.gemini\\antigravity\\brain\\9173bf3a-f43c-42a2-a486-d43607c50bdd';

async function run() {
  console.log('Launching Chrome for updated Phase 1 verification...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.toString()));

  console.log('Navigating to http://localhost:3000/ ...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // 1. Desktop Hero view
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'phase1-v2-desktop-hero.png') });
  console.log('✓ Captured phase1-v2-desktop-hero.png');

  // 2. Work: Mian Saqib (01)
  await page.evaluate(() => {
    document.getElementById('project-miansaqib')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'phase1-v2-desktop-work-01-miansaqib.png') });
  console.log('✓ Captured phase1-v2-desktop-work-01-miansaqib.png');

  // 3. Work: AC Tech (02)
  await page.evaluate(() => {
    document.getElementById('project-actech')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'phase1-v2-desktop-work-02-actech.png') });
  console.log('✓ Captured phase1-v2-desktop-work-02-actech.png');

  // 4. Work: Studio Builds (03 & 04)
  await page.evaluate(() => {
    document.getElementById('project-ark-creative-engineering')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'phase1-v2-desktop-work-03-studio.png') });
  console.log('✓ Captured phase1-v2-desktop-work-03-studio.png');

  // 5. Services Section
  await page.evaluate(() => {
    document.getElementById('services')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'phase1-v2-desktop-services.png') });
  console.log('✓ Captured phase1-v2-desktop-services.png');

  // 6. Worldwide Section
  await page.evaluate(() => {
    document.getElementById('worldwide')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'phase1-v2-desktop-worldwide.png') });
  console.log('✓ Captured phase1-v2-desktop-worldwide.png');

  // 7. Contact Section
  await page.evaluate(() => {
    document.getElementById('contact')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'phase1-v2-desktop-contact.png') });
  console.log('✓ Captured phase1-v2-desktop-contact.png');

  // 8. Mobile View (390x844)
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'phase1-v2-mobile-hero.png') });

  await page.evaluate(() => {
    document.getElementById('project-miansaqib')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'phase1-v2-mobile-work.png') });
  console.log('✓ Captured mobile views');

  const hasOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  console.log('Mobile horizontal overflow:', hasOverflow);
  console.log('Browser errors:', errors);

  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
