const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const WORK_DIR = path.join(__dirname, '../public/work');

if (!fs.existsSync(WORK_DIR)) {
  fs.mkdirSync(WORK_DIR, { recursive: true });
}

const PROJECTS = [
  {
    id: '01-miansaqib',
    url: 'https://www.miansaqib.com/',
    name: 'Mian Saqib',
  },
  {
    id: '02-actech',
    url: 'https://actech-services.netlify.app/',
    name: 'AC Technical Services',
  },
  {
    id: '03-ark-creative-engineering',
    url: 'https://portfolio-alpha-one-ym3ipfauzw.vercel.app/',
    name: 'ARK Creative Engineering',
  },
  {
    id: '04-ark-studio-red-black',
    url: 'https://ark-studio-portfolio.vercel.app/projects',
    name: 'ARK Studio, red and black edition',
  },
  {
    id: '05-ark-portfolio',
    url: 'https://env-three-kohl.vercel.app/',
    name: 'ARK Portfolio',
  },
  {
    id: '06-ark-creative-developer',
    url: 'https://arkstudio-three.vercel.app/',
    name: 'ARK Creative Developer portfolio',
  },
];

async function capture() {
  console.log('Launching headless Chrome for project captures...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--mute-audio']
  });

  const page = await browser.newPage();

  for (const proj of PROJECTS) {
    console.log(`\nCapturing [${proj.id}] ${proj.name} at ${proj.url} ...`);
    try {
      // 1. Desktop 1440x900 (2x deviceScaleFactor)
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
      await page.goto(proj.url, { waitUntil: 'networkidle2', timeout: 25000 });
      // Wait for intro animations / loader to settle
      await new Promise(r => setTimeout(r, 3000));

      const desktopPng = await page.screenshot({ type: 'png' });
      const desktopWebpPath = path.join(WORK_DIR, `${proj.id}-desktop.webp`);
      await sharp(desktopPng).webp({ quality: 90 }).toFile(desktopWebpPath);
      console.log(`✓ Saved ${proj.id}-desktop.webp`);

      // 2. Mobile 390x844 (3x deviceScaleFactor)
      await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
      await page.goto(proj.url, { waitUntil: 'networkidle2', timeout: 25000 });
      await new Promise(r => setTimeout(r, 2500));

      const mobilePng = await page.screenshot({ type: 'png' });
      const mobileWebpPath = path.join(WORK_DIR, `${proj.id}-mobile.webp`);
      await sharp(mobilePng).webp({ quality: 90 }).toFile(mobileWebpPath);
      console.log(`✓ Saved ${proj.id}-mobile.webp`);
    } catch (err) {
      console.error(`⨯ Failed capturing ${proj.name} (${proj.url}):`, err.message);
    }
  }

  await browser.close();
  console.log('\nAll project captures complete!');
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
