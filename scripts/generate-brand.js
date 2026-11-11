const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Brand colours
const BG_DARK = '#0C1311';
const BONE = '#EAE6DA';
const ACCENT = '#C9704A';
const MUTED = '#94A096';

// Option 1: The Prismatic Lens Aperture (Recommended)
// Equilateral triangular chassis + inscribed circular lens diaphragm + accent pinhole pupil
const OPTION_1_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M32 4L4 58H16.8L22.4 46.8H41.6L47.2 58H60L32 4ZM32 17.6L24.8 32H39.2L32 17.6Z"
    fill="currentColor"
  />
  <circle cx="32" cy="34" r="9" stroke="currentColor" stroke-width="2.5" fill="none" />
  <circle cx="32" cy="34" r="2.75" fill="${ACCENT}" />
</svg>
`.trim();

// Option 2: The Collimator Diaphragm
const OPTION_2_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <path d="M28 8L6 56H18L30 30V8H28Z" fill="currentColor" />
  <path d="M36 8V30L46 56H58L36 8Z" fill="currentColor" />
  <rect x="18" y="38" width="28" height="4.5" fill="currentColor" />
  <circle cx="32" cy="24" r="6" stroke="currentColor" stroke-width="2.2" fill="none" />
  <circle cx="32" cy="24" r="2" fill="${ACCENT}" />
</svg>
`.trim();

// Option 3: The Focal Reticle
const OPTION_3_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <path d="M32 6L8 56H20.5L25.5 45.5H38.5L43.5 56H56L32 6ZM32 21L27.5 37H36.5L32 21Z" fill="currentColor" />
  <circle cx="32" cy="32" r="11" stroke="${ACCENT}" stroke-width="1.8" fill="none" />
  <line x1="32" y1="18" x2="32" y2="21" stroke="${ACCENT}" stroke-width="2" />
  <line x1="32" y1="43" x2="32" y2="46" stroke="${ACCENT}" stroke-width="2" />
  <line x1="18" y1="32" x2="21" y2="32" stroke="${ACCENT}" stroke-width="2" />
  <line x1="43" y1="32" x2="46" y2="32" stroke="${ACCENT}" stroke-width="2" />
</svg>
`.trim();

// Extract raw inner paths for SVG embedding
function innerSvg(svgStr) {
  return svgStr.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '');
}

// Full Wordmark SVG in Instrument Serif vector outlines
const WORDMARK_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 54" fill="none">
  <text
    x="0"
    y="40"
    font-family="Instrument Serif, Georgia, serif"
    font-size="44"
    letter-spacing="-0.02em"
    fill="currentColor"
  >ARK STUDIO</text>
  <text
    x="2"
    y="51"
    font-family="Hanken Grotesk, sans-serif"
    font-size="8.5"
    letter-spacing="0.14em"
    fill="${MUTED}"
  >WEB DESIGN &amp; BRAND IDENTITY</text>
</svg>
`.trim();

// Full Lockup SVG: Mark + Wordmark
const LOCKUP_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 44" fill="none">
  <g transform="translate(0, 4) scale(0.5625)">
    ${innerSvg(OPTION_1_SVG)}
  </g>
  <text
    x="46"
    y="24"
    font-family="Instrument Serif, Georgia, serif"
    font-size="24"
    letter-spacing="-0.02em"
    fill="currentColor"
  >ARK STUDIO</text>
  <text
    x="47"
    y="36"
    font-family="Hanken Grotesk, sans-serif"
    font-size="7.5"
    letter-spacing="0.14em"
    fill="${MUTED}"
  >WEB DESIGN &amp; BRAND IDENTITY</text>
</svg>
`.trim();

async function buildBrandAssets() {
  const brandDir = path.join(__dirname, '../public/brand');
  const publicDir = path.join(__dirname, '../public');
  fs.mkdirSync(brandDir, { recursive: true });

  fs.writeFileSync(path.join(brandDir, 'logo-mark.svg'), OPTION_1_SVG);
  fs.writeFileSync(path.join(brandDir, 'logo-wordmark.svg'), WORDMARK_SVG);
  fs.writeFileSync(path.join(brandDir, 'logo-lockup.svg'), LOCKUP_SVG);
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), OPTION_1_SVG.replace('currentColor', BONE));

  // Render a clean comparison matrix sheet
  const matrixWidth = 1200;
  const matrixHeight = 840;

  function renderOptionBlock(svgStr, x, y, fgColor, isDark) {
    const raw = innerSvg(svgStr);
    const boxBg = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)';
    const boxBorder = isDark ? 'rgba(234,230,218,0.12)' : 'rgba(12,19,17,0.15)';
    const labelColor = isDark ? MUTED : '#606B62';

    return `
    <g transform="translate(${x}, ${y})">
      <!-- 128px Preview Box (Box size 148x148) -->
      <rect x="0" y="0" width="148" height="148" fill="${boxBg}" stroke="${boxBorder}" stroke-width="1" rx="4" />
      <g transform="translate(10, 10) scale(2)" color="${fgColor}">
        ${raw}
      </g>
      <text x="74" y="165" font-family="monospace" font-size="10" fill="${labelColor}" text-anchor="middle">128px</text>

      <!-- 32px Preview Box (Box size 64x64) -->
      <g transform="translate(180, 42)">
        <rect x="0" y="0" width="64" height="64" fill="${boxBg}" stroke="${boxBorder}" stroke-width="1" rx="4" />
        <g transform="translate(16, 16) scale(0.5)" color="${fgColor}">
          ${raw}
        </g>
        <text x="32" y="80" font-family="monospace" font-size="10" fill="${labelColor}" text-anchor="middle">32px</text>
      </g>

      <!-- 16px Preview Box (Box size 48x48) -->
      <g transform="translate(280, 50)">
        <rect x="0" y="0" width="48" height="48" fill="${boxBg}" stroke="${boxBorder}" stroke-width="1" rx="4" />
        <g transform="translate(16, 16) scale(0.25)" color="${fgColor}">
          ${raw}
        </g>
        <text x="24" y="65" font-family="monospace" font-size="10" fill="${labelColor}" text-anchor="middle">16px</text>
      </g>
    </g>
    `;
  }

  const comparisonSvg = `
  <svg width="${matrixWidth}" height="${matrixHeight}" viewBox="0 0 ${matrixWidth} ${matrixHeight}" xmlns="http://www.w3.org/2000/svg">
    <!-- Split Ground -->
    <rect x="0" y="0" width="600" height="${matrixHeight}" fill="${BG_DARK}" />
    <rect x="600" y="0" width="600" height="${matrixHeight}" fill="${BONE}" />
    <line x1="600" y1="0" x2="600" y2="${matrixHeight}" stroke="rgba(148,160,150,0.25)" stroke-width="1" />

    <!-- Top Column Labels -->
    <text x="50" y="45" font-family="Hanken Grotesk, sans-serif" font-size="11" letter-spacing="0.2em" fill="${MUTED}">ARK STUDIO · BRAND MARK EXPLORATION</text>
    <text x="50" y="70" font-family="Instrument Serif, serif" font-size="26" fill="${BONE}">Dark Ground (--bg #0C1311)</text>

    <text x="650" y="45" font-family="Hanken Grotesk, sans-serif" font-size="11" letter-spacing="0.2em" fill="#606B62">ARK STUDIO · BRAND MARK EXPLORATION</text>
    <text x="650" y="70" font-family="Instrument Serif, serif" font-size="26" fill="${BG_DARK}">Bone Ground (#EAE6DA)</text>

    <!-- OPTION 1 -->
    <g transform="translate(50, 110)">
      <text x="0" y="0" font-family="Hanken Grotesk, sans-serif" font-size="12" font-weight="600" fill="${ACCENT}">OPTION 01: THE PRISMATIC APERTURE (RECOMMENDED)</text>
      <text x="0" y="16" font-family="Hanken Grotesk, sans-serif" font-size="10.5" fill="${MUTED}">Letter 'A' intersecting an inscribed optical lens diaphragm with central pinhole.</text>
      ${renderOptionBlock(OPTION_1_SVG, 0, 30, BONE, true)}
    </g>
    <g transform="translate(650, 110)">
      <text x="0" y="0" font-family="Hanken Grotesk, sans-serif" font-size="12" font-weight="600" fill="${ACCENT}">OPTION 01: THE PRISMATIC APERTURE (RECOMMENDED)</text>
      <text x="0" y="16" font-family="Hanken Grotesk, sans-serif" font-size="10.5" fill="#606B62">Equilateral optical geometry with pure bone-and-dark contrast.</text>
      ${renderOptionBlock(OPTION_1_SVG, 0, 30, BG_DARK, false)}
    </g>

    <!-- OPTION 2 -->
    <g transform="translate(50, 350)">
      <text x="0" y="0" font-family="Hanken Grotesk, sans-serif" font-size="12" font-weight="600" fill="${BONE}">OPTION 02: THE COLLIMATOR DIAPHRAGM</text>
      <text x="0" y="16" font-family="Hanken Grotesk, sans-serif" font-size="10.5" fill="${MUTED}">Split-apex focal slit with suspended camera diaphragm aperture.</text>
      ${renderOptionBlock(OPTION_2_SVG, 0, 30, BONE, true)}
    </g>
    <g transform="translate(650, 350)">
      <text x="0" y="0" font-family="Hanken Grotesk, sans-serif" font-size="12" font-weight="600" fill="${BG_DARK}">OPTION 02: THE COLLIMATOR DIAPHRAGM</text>
      <text x="0" y="16" font-family="Hanken Grotesk, sans-serif" font-size="10.5" fill="#606B62">Architectural precision with parallel vertical collimation.</text>
      ${renderOptionBlock(OPTION_2_SVG, 0, 30, BG_DARK, false)}
    </g>

    <!-- OPTION 3 -->
    <g transform="translate(50, 590)">
      <text x="0" y="0" font-family="Hanken Grotesk, sans-serif" font-size="12" font-weight="600" fill="${BONE}">OPTION 03: THE FOCAL RETICLE</text>
      <text x="0" y="16" font-family="Hanken Grotesk, sans-serif" font-size="10.5" fill="${MUTED}">Monolithic 'A' with calibrated viewfinder target circle and tick marks.</text>
      ${renderOptionBlock(OPTION_3_SVG, 0, 30, BONE, true)}
    </g>
    <g transform="translate(650, 590)">
      <text x="0" y="0" font-family="Hanken Grotesk, sans-serif" font-size="12" font-weight="600" fill="${BG_DARK}">OPTION 03: THE FOCAL RETICLE</text>
      <text x="0" y="16" font-family="Hanken Grotesk, sans-serif" font-size="10.5" fill="#606B62">Technical measurement and cartographic crosshair aesthetics.</text>
      ${renderOptionBlock(OPTION_3_SVG, 0, 30, BG_DARK, false)}
    </g>
  </svg>
  `;

  await sharp(Buffer.from(comparisonSvg)).png().toFile(path.join(brandDir, 'logo-options-matrix.png'));
  console.log('✓ Regenerated public/brand/logo-options-matrix.png with centered bounds');
}

buildBrandAssets().catch(err => {
  console.error(err);
  process.exit(1);
});
