const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const BG_DARK = '#0C1311';
const BONE = '#EAE6DA';
const ACCENT = '#C9704A';
const MUTED = '#94A096';

// Option A: The Aperture Crossbar 'A' (Recommended)
// Bold typographic 'A' with open legs, distinct crossbar, and integrated optical lens aperture
const OPTION_A_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <path
    d="M26.5 7H37.5L57 57H45.5L40.2 43.5H23.8L18.5 57H7L26.5 7ZM25.8 35H38.2L32 19L25.8 35Z"
    fill="__COLOR__"
  />
  <circle cx="32" cy="39" r="6" fill="__BG__" stroke="__COLOR__" stroke-width="2" />
  <circle cx="32" cy="39" r="2.2" fill="${ACCENT}" />
</svg>
`.trim();

// Option B: The Precision Iris 'A'
// Geometric modernist 'A' with architectural stem proportions and floating aperture ring crossbar
const OPTION_B_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <path
    d="M28 8H36L55 56H45L40.5 45H23.5L19 56H9L28 8ZM25.5 37H38.5L32 20L25.5 37Z"
    fill="__COLOR__"
  />
  <circle cx="32" cy="28.5" r="5" stroke="__COLOR__" stroke-width="1.8" fill="__BG__" />
  <circle cx="32" cy="28.5" r="1.8" fill="${ACCENT}" />
  <line x1="20" y1="41" x2="44" y2="41" stroke="__COLOR__" stroke-width="3" />
</svg>
`.trim();

// Option C: The Shutter-Blade Monogram 'A'
// Intersecting optical shutter blades forming the apex and legs of 'A' with an open focal crossbar
const OPTION_C_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <path d="M10 56L28 8H36L54 56H43.5L39.5 44H24.5L20.5 56H10Z" stroke="__COLOR__" stroke-width="3.5" stroke-linejoin="miter" fill="none" />
  <line x1="22" y1="40" x2="42" y2="40" stroke="__COLOR__" stroke-width="3" />
  <circle cx="32" cy="40" r="5" fill="__BG__" stroke="__COLOR__" stroke-width="1.8" />
  <circle cx="32" cy="40" r="1.8" fill="${ACCENT}" />
</svg>
`.trim();

function renderInner(svg, mainColor, bgColor) {
  return svg
    .replace(/__COLOR__/g, mainColor)
    .replace(/__BG__/g, bgColor)
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>/, '');
}

async function run() {
  const options = [
    { name: "OPTION A: APERTURE CROSSBAR 'A' (RECOMMENDED)", svg: OPTION_A_SVG },
    { name: "OPTION B: PRECISION IRIS 'A'", svg: OPTION_B_SVG },
    { name: "OPTION C: SHUTTER-BLADE MONOGRAM 'A'", svg: OPTION_C_SVG }
  ];

  const W = 1200;
  const H = 780;

  let compositeSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none">
    <rect width="${W}" height="${H}" fill="${BG_DARK}" />
    <text x="60" y="55" font-family="system-ui, sans-serif" font-size="20" font-weight="600" fill="${BONE}" letter-spacing="0.1em">
      ARK STUDIO — NEW BRAND MARK EXPLORATION (CLEAR LETTER 'A')
    </text>
    <text x="60" y="80" font-family="system-ui, sans-serif" font-size="13" fill="${MUTED}">
      Engineered to read unmistakably as the capital letter 'A' with an integrated optical aperture. Zero delta / eye-in-triangle artifacts.
    </text>
  `;

  const colWidth = 350;
  const startX = 60;
  const gapX = 35;

  options.forEach((opt, idx) => {
    const x = startX + idx * (colWidth + gapX);
    const yHeader = 120;

    compositeSvg += `
      <!-- Column ${idx + 1} -->
      <text x="${x}" y="${yHeader}" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="${ACCENT}" letter-spacing="0.08em">
        ${opt.name}
      </text>

      <!-- Dark Container -->
      <rect x="${x}" y="${yHeader + 15}" width="${colWidth}" height="280" rx="4" fill="#121B18" stroke="rgba(234,230,218,0.12)" />
      <text x="${x + 16}" y="${yHeader + 38}" font-family="monospace" font-size="10" fill="${MUTED}" letter-spacing="0.1em">
        ON DARK (#0C1311)
      </text>

      <!-- 128px on dark -->
      <g transform="translate(${x + 20}, ${yHeader + 60}) scale(2)">
        ${renderInner(opt.svg, BONE, '#121B18')}
      </g>
      <text x="${x + 75}" y="${yHeader + 210}" font-family="monospace" font-size="10" fill="${MUTED}">128px</text>

      <!-- 32px on dark -->
      <g transform="translate(${x + 180}, ${yHeader + 100}) scale(0.65)">
        ${renderInner(opt.svg, BONE, '#121B18')}
      </g>
      <text x="${x + 185}" y="${yHeader + 160}" font-family="monospace" font-size="10" fill="${MUTED}">32px</text>

      <!-- 16px on dark -->
      <g transform="translate(${x + 260}, ${yHeader + 110}) scale(0.35)">
        ${renderInner(opt.svg, BONE, '#121B18')}
      </g>
      <text x="${x + 260}" y="${yHeader + 160}" font-family="monospace" font-size="10" fill="${MUTED}">16px</text>

      <!-- Bone Container -->
      <rect x="${x}" y="${yHeader + 310}" width="${colWidth}" height="280" rx="4" fill="${BONE}" stroke="rgba(12,19,17,0.15)" />
      <text x="${x + 16}" y="${yHeader + 333}" font-family="monospace" font-size="10" fill="#4A524D" letter-spacing="0.1em">
        ON BONE (#EAE6DA)
      </text>

      <!-- 128px on bone -->
      <g transform="translate(${x + 20}, ${yHeader + 355}) scale(2)">
        ${renderInner(opt.svg, BG_DARK, BONE)}
      </g>
      <text x="${x + 75}" y="${yHeader + 505}" font-family="monospace" font-size="10" fill="#6A726D">128px</text>

      <!-- 32px on bone -->
      <g transform="translate(${x + 180}, ${yHeader + 395}) scale(0.65)">
        ${renderInner(opt.svg, BG_DARK, BONE)}
      </g>
      <text x="${x + 185}" y="${yHeader + 455}" font-family="monospace" font-size="10" fill="#6A726D">32px</text>

      <!-- 16px on bone -->
      <g transform="translate(${x + 260}, ${yHeader + 405}) scale(0.35)">
        ${renderInner(opt.svg, BG_DARK, BONE)}
      </g>
      <text x="${x + 260}" y="${yHeader + 455}" font-family="monospace" font-size="10" fill="#6A726D">16px</text>
    `;
  });

  compositeSvg += `</svg>`;

  const outPath1 = path.join(__dirname, '../public/brand/logo-new-options-matrix.png');
  const outPath2 = 'C:\\Users\\ARK\\.gemini\\antigravity\\brain\\9173bf3a-f43c-42a2-a486-d43607c50bdd\\logo-new-options-matrix.png';

  const buffer = Buffer.from(compositeSvg);
  await sharp(buffer).png().toFile(outPath1);
  await sharp(buffer).png().toFile(outPath2);

  console.log('✓ Generated new logo options matrix at:', outPath1);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
