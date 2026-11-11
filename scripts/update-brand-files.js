const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const BG_DARK = '#0C1311';
const BONE = '#EAE6DA';
const ACCENT = '#C9704A';

const NEW_LOGO_MARK_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <path
    d="M26.5 7H37.5L57 57H45.5L40.2 43.5H23.8L18.5 57H7L26.5 7ZM25.8 35H38.2L32 19L25.8 35Z"
    fill="currentColor"
  />
  <circle cx="32" cy="39" r="6" fill="${BG_DARK}" stroke="currentColor" stroke-width="2" />
  <circle cx="32" cy="39" r="2.2" fill="${ACCENT}" />
</svg>
`.trim();

const NEW_LOCKUP_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 64" fill="none">
  <!-- Mark -->
  <g transform="translate(0, 0)">
    <path
      d="M26.5 7H37.5L57 57H45.5L40.2 43.5H23.8L18.5 57H7L26.5 7ZM25.8 35H38.2L32 19L25.8 35Z"
      fill="${BONE}"
    />
    <circle cx="32" cy="39" r="6" fill="${BG_DARK}" stroke="${BONE}" stroke-width="2" />
    <circle cx="32" cy="39" r="2.2" fill="${ACCENT}" />
  </g>
  <!-- Wordmark in Instrument Serif -->
  <text
    x="82"
    y="36"
    font-family="Instrument Serif, Georgia, serif"
    font-size="34"
    letter-spacing="-0.02em"
    fill="${BONE}"
  >
    ARK STUDIO
  </text>
  <text
    x="83"
    y="51"
    font-family="Hanken Grotesk, system-ui, sans-serif"
    font-size="9"
    letter-spacing="0.14em"
    text-transform="uppercase"
    fill="#94A096"
  >
    WEB DESIGN &amp; BRAND IDENTITY
  </text>
</svg>
`.trim();

const FAVICON_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="8" fill="${BG_DARK}" />
  <path
    d="M26.5 9H37.5L55 55H44.5L39.8 42.5H24.2L19.5 55H9L26.5 9ZM26 34.5H38L32 20L26 34.5Z"
    fill="${BONE}"
  />
  <circle cx="32" cy="38.5" r="5.5" fill="${BG_DARK}" stroke="${BONE}" stroke-width="1.8" />
  <circle cx="32" cy="38.5" r="2" fill="${ACCENT}" />
</svg>
`.trim();

async function run() {
  const brandDir = path.join(__dirname, '../public/brand');
  const publicDir = path.join(__dirname, '../public');

  fs.writeFileSync(path.join(brandDir, 'logo-mark.svg'), NEW_LOGO_MARK_SVG);
  fs.writeFileSync(path.join(brandDir, 'logo-lockup.svg'), NEW_LOCKUP_SVG);
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), FAVICON_SVG);

  // Favicon ico & apple touch icon
  const iconBuffer = Buffer.from(FAVICON_SVG);
  await sharp(iconBuffer).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  await sharp(iconBuffer).resize(32, 32).png().toFile(path.join(publicDir, 'favicon.ico'));

  // OG Image (1200x630)
  const ogSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" fill="none">
    <rect width="1200" height="630" fill="${BG_DARK}" />
    <!-- Hairline grid & borders -->
    <rect x="40" y="40" width="1120" height="550" rx="4" stroke="rgba(234,230,218,0.12)" fill="none" />
    <!-- Mark -->
    <g transform="translate(100, 180) scale(2.8)">
      <path
        d="M26.5 7H37.5L57 57H45.5L40.2 43.5H23.8L18.5 57H7L26.5 7ZM25.8 35H38.2L32 19L25.8 35Z"
        fill="${BONE}"
      />
      <circle cx="32" cy="39" r="6" fill="${BG_DARK}" stroke="${BONE}" stroke-width="2" />
      <circle cx="32" cy="39" r="2.2" fill="${ACCENT}" />
    </g>
    <!-- Text -->
    <text x="320" y="270" font-family="Instrument Serif, Georgia, serif" font-size="80" letter-spacing="-0.03em" fill="${BONE}">
      ARK STUDIO
    </text>
    <text x="325" y="325" font-family="Hanken Grotesk, system-ui, sans-serif" font-size="20" letter-spacing="0.14em" fill="#94A096">
      WEB DESIGN &amp; BRAND IDENTITY
    </text>
    <text x="325" y="380" font-family="Hanken Grotesk, system-ui, sans-serif" font-size="22" fill="${BONE}" font-weight="300">
      Websites and brand identities for businesses anywhere.
    </text>
    <text x="100" y="540" font-family="monospace" font-size="14" fill="#94A096" letter-spacing="0.1em">
      SARGODHA, PAKISTAN · SERVING CLIENTS WORLDWIDE
    </text>
  </svg>
  `;
  await sharp(Buffer.from(ogSvg)).png().toFile(path.join(publicDir, 'og-image.png'));

  console.log('✓ Successfully updated all production brand assets with clear Letter A mark!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
