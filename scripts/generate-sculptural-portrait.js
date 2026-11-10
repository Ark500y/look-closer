const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateSculpturalPortrait() {
  console.log('Generating high-fashion sculptural portrait silhouette...');

  const portraitSvg = Buffer.from(`
    <svg width="1200" height="1600" viewBox="0 0 1200 1600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Atmospheric volumetric red backlight -->
        <radialGradient id="rimGlow" cx="68%" cy="38%" r="55%">
          <stop offset="0%" stop-color="#FF2A1F" stop-opacity="0.8" />
          <stop offset="35%" stop-color="#FF2A1F" stop-opacity="0.25" />
          <stop offset="70%" stop-color="#FF2A1F" stop-opacity="0.04" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0" />
        </radialGradient>

        <linearGradient id="bodyChiaroscuro" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#242629" />
          <stop offset="45%" stop-color="#121315" />
          <stop offset="85%" stop-color="#080809" />
          <stop offset="100%" stop-color="#050505" />
        </linearGradient>

        <linearGradient id="headShadow" x1="20%" y1="20%" x2="80%" y2="80%">
          <stop offset="0%" stop-color="#2A2C30" />
          <stop offset="50%" stop-color="#16171A" />
          <stop offset="100%" stop-color="#090A0B" />
        </linearGradient>

        <filter id="neonRim" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" result="blur1" />
          <feGaussianBlur stdDeviation="4" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- 1. Ambient red volumetric aura behind head -->
      <circle cx="780" cy="560" r="460" fill="url(#rimGlow)" />

      <!-- 2. Sculptural Torso & Shoulders -->
      <path
        d="M 120 1600
           C 160 1280, 240 1140, 380 1060
           C 430 1030, 480 1000, 500 860
           L 500 810
           C 460 780, 430 710, 430 600
           C 430 450, 520 340, 670 330
           C 800 320, 890 400, 910 520
           C 920 620, 880 730, 830 790
           L 830 860
           C 860 990, 920 1030, 980 1070
           C 1110 1150, 1170 1290, 1200 1600
           Z"
        fill="url(#bodyChiaroscuro)"
      />

      <!-- 3. Chiseled Head Profile / Jaw Contour Shadow -->
      <path
        d="M 520 540
           C 520 400, 590 350, 680 340
           C 780 330, 870 390, 880 500
           C 890 610, 860 690, 810 750
           C 760 800, 680 820, 610 800
           C 550 780, 520 700, 520 540
           Z"
        fill="url(#headShadow)"
      />

      <!-- 4. Subtle Ear & Jawbone anatomical contouring -->
      <path
        d="M 740 560
           C 760 560, 775 580, 770 610
           C 765 640, 745 660, 735 670
           C 700 740, 630 765, 590 770"
        fill="none"
        stroke="#2E3238"
        stroke-width="5"
        stroke-linecap="round"
        opacity="0.6"
      />

      <!-- 5. Collar / High Neck Lapel Architecture -->
      <path
        d="M 490 850 L 590 980 L 690 980 L 830 850"
        fill="none"
        stroke="#2B2D33"
        stroke-width="4"
        opacity="0.8"
      />
      <path
        d="M 640 980 L 640 1600"
        fill="none"
        stroke="#1E2024"
        stroke-width="3"
        opacity="0.7"
      />

      <!-- 6. Razor-Sharp Red Rim Light on Silhouette Edge -->
      <!-- Right shoulder & head glowing rim -->
      <path
        d="M 680 340
           C 780 330, 870 390, 880 500
           C 890 610, 860 690, 810 750
           C 770 790, 750 820, 760 880
           C 780 970, 860 1020, 930 1060
           C 1060 1140, 1120 1280, 1160 1600"
        fill="none"
        stroke="#FF2A1F"
        stroke-width="14"
        filter="url(#neonRim)"
        opacity="0.95"
      />
      <!-- Pure white specular highlight inside the red rim -->
      <path
        d="M 710 345
           C 790 340, 865 395, 875 490
           C 885 580, 855 660, 820 720
           C 790 760, 770 795, 775 850
           C 790 930, 860 990, 920 1030"
        fill="none"
        stroke="#FFFFFF"
        stroke-width="3.5"
        stroke-linecap="round"
        opacity="0.85"
      />

      <!-- 7. Minimalist Studio Identity Laser Badge on Lapel -->
      <g transform="translate(490, 1180)">
        <rect width="220" height="36" rx="18" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
        <circle cx="20" cy="18" r="4" fill="#FF2A1F" />
        <text x="36" y="22" font-family="monospace" font-size="11" letter-spacing="3" fill="#EDE9E3">ARK STUDIO • SARGODHA</text>
      </g>
    </svg>
  `);

  await sharp(portraitSvg).png().toFile(path.join(__dirname, '../public/images/portrait-cutout.png'));
  console.log('✓ Sculptural portrait successfully generated at /public/images/portrait-cutout.png');
}

generateSculpturalPortrait().catch(err => {
  console.error(err);
  process.exit(1);
});
