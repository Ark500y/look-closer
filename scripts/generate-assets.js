const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generate() {
  console.log('Generating placeholder art assets with sharp...');

  // Ensure directories exist
  fs.mkdirSync(path.join(__dirname, '../public/images'), { recursive: true });
  fs.mkdirSync(path.join(__dirname, '../public/projects'), { recursive: true });

  // 1. Portrait Cutout: 1200 x 1600 PNG with transparent background
  const portraitSvg = Buffer.from(`
    <svg width="1200" height="1600" viewBox="0 0 1200 1600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="rimLight" cx="65%" cy="35%" r="60%">
          <stop offset="0%" stop-color="#FF2A1F" stop-opacity="0.65" />
          <stop offset="50%" stop-color="#FF2A1F" stop-opacity="0.15" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#34373B" />
          <stop offset="60%" stop-color="#141517" />
          <stop offset="100%" stop-color="#080809" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="16" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <!-- Atmospheric rim light behind silhouette -->
      <circle cx="750" cy="600" r="420" fill="url(#rimLight)" />

      <!-- Stylized silhouette torso and shoulders -->
      <path d="M 200 1600 Q 220 1200 380 1100 Q 420 1060 480 1020 L 480 840 Q 440 820 420 760 Q 400 700 410 600 Q 420 460 520 400 Q 600 350 700 370 Q 800 400 820 480 Q 840 580 820 680 Q 800 760 760 820 L 760 1020 Q 820 1060 860 1100 Q 1020 1200 1040 1600 Z" fill="url(#bodyGrad)" />

      <!-- Red rim highlight on head and shoulder edge -->
      <path d="M 700 370 Q 800 400 820 480 Q 840 580 820 680 Q 800 760 760 820 L 760 1020 Q 820 1060 860 1100 Q 1020 1200 1040 1600" fill="none" stroke="#FF2A1F" stroke-width="12" filter="url(#glow)" opacity="0.85" />
      <path d="M 710 375 Q 805 405 825 482 Q 842 580 822 680" fill="none" stroke="#FFFFFF" stroke-width="4" opacity="0.75" />

      <!-- Subtle stylized facial structure -->
      <path d="M 540 620 Q 600 660 660 620" fill="none" stroke="#8B9099" stroke-width="4" opacity="0.3" />
      <path d="M 600 520 L 600 580 L 620 590" fill="none" stroke="#8B9099" stroke-width="4" opacity="0.4" />

      <!-- Studio badge on chest -->
      <rect x="520" y="1160" width="200" height="42" rx="21" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
      <text x="620" y="1187" font-family="monospace" font-size="14" letter-spacing="4" fill="#EDE9E3" text-anchor="middle">ABDULREHMAN</text>
    </svg>
  `);
  await sharp(portraitSvg).png().toFile(path.join(__dirname, '../public/images/portrait-cutout.png'));
  console.log('✓ Created portrait-cutout.png');

  // 2. AC Technical Services screenshot: 1600 x 1000 WebP
  const actechSvg = Buffer.from(`
    <svg width="1600" height="1000" viewBox="0 0 1600 1000" xmlns="http://www.w3.org/2000/svg">
      <rect width="1600" height="1000" fill="#0A0D14" />
      <!-- Top banner / header -->
      <rect width="1600" height="80" fill="#0E131F" />
      <circle cx="60" cy="40" r="16" fill="#FF2A1F" />
      <text x="95" y="46" font-family="sans-serif" font-size="20" font-weight="bold" fill="#FFFFFF">AC TECHNICAL SERVICES</text>
      <text x="1340" y="46" font-family="sans-serif" font-size="15" fill="#25D366">24/7 EMERGENCY DUBAI</text>
      
      <!-- Hero section -->
      <rect x="100" y="160" width="340" height="32" rx="16" fill="rgba(255,42,31,0.15)" stroke="#FF2A1F" stroke-width="1" />
      <text x="120" y="182" font-family="monospace" font-size="14" fill="#FF2A1F" letter-spacing="2">PREMIUM HVAC &amp; CONTRACTING</text>
      
      <text x="100" y="280" font-family="sans-serif" font-size="64" font-weight="800" fill="#EDE9E3">Fast, Reliable AC Repair</text>
      <text x="100" y="350" font-family="sans-serif" font-size="64" font-weight="800" fill="#EDE9E3">&amp; HVAC Maintenance in UAE.</text>
      
      <text x="100" y="420" font-family="sans-serif" font-size="22" fill="#8B9099">Direct dispatch within 45 minutes across Dubai, Sharjah &amp; Ajman.</text>
      
      <!-- CTA Buttons -->
      <rect x="100" y="470" width="260" height="60" rx="8" fill="#25D366" />
      <text x="230" y="507" font-family="sans-serif" font-size="18" font-weight="bold" fill="#000000" text-anchor="middle">WhatsApp Emergency</text>
      
      <rect x="380" y="470" width="200" height="60" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
      <text x="480" y="507" font-family="sans-serif" font-size="18" fill="#FFFFFF" text-anchor="middle">Our Services</text>

      <!-- Visual cards in hero -->
      <g transform="translate(960, 160)">
        <rect width="540" height="400" rx="16" fill="#121824" stroke="rgba(255,255,255,0.1)" stroke-width="2" />
        <rect x="40" y="40" width="460" height="180" rx="10" fill="#1B2436" />
        <text x="60" y="80" font-family="sans-serif" font-size="18" font-weight="bold" fill="#FF2A1F">SERVICE METRICS</text>
        <text x="60" y="130" font-family="monospace" font-size="42" font-weight="bold" fill="#FFFFFF">99.4%</text>
        <text x="60" y="165" font-family="sans-serif" font-size="15" fill="#8B9099">Same-day resolution rate in 2026</text>
        
        <rect x="40" y="250" width="215" height="110" rx="10" fill="#171F2E" />
        <text x="60" y="290" font-family="sans-serif" font-size="15" fill="#8B9099">Response Time</text>
        <text x="60" y="330" font-family="monospace" font-size="28" font-weight="bold" fill="#FFFFFF">&lt; 45 MIN</text>

        <rect x="285" y="250" width="215" height="110" rx="10" fill="#171F2E" />
        <text x="305" y="290" font-family="sans-serif" font-size="15" fill="#8B9099">Customer Rating</text>
        <text x="305" y="330" font-family="monospace" font-size="28" font-weight="bold" fill="#FF2A1F">4.9 / 5.0</text>
      </g>
      
      <!-- Bottom feature bar -->
      <rect y="640" width="1600" height="360" fill="#0C1019" />
      <g transform="translate(100, 720)">
        <text x="0" y="0" font-family="sans-serif" font-size="28" font-weight="bold" fill="#FFFFFF">Commercial &amp; Residential Solutions</text>
        <text x="0" y="40" font-family="sans-serif" font-size="16" fill="#8B9099">Chiller maintenance, VRF systems, duct cleaning, and smart building sensors.</text>
      </g>
    </svg>
  `);
  await sharp(actechSvg).webp({ quality: 80 }).toFile(path.join(__dirname, '../public/projects/actech.webp'));
  console.log('✓ Created actech.webp');

  // 3. Boom Truck Rental screenshot: 1600 x 1000 WebP
  const miansaqibSvg = Buffer.from(`
    <svg width="1600" height="1000" viewBox="0 0 1600 1000" xmlns="http://www.w3.org/2000/svg">
      <rect width="1600" height="1000" fill="#0D0E10" />
      <!-- Top header -->
      <rect width="1600" height="80" fill="#14161A" />
      <text x="80" y="48" font-family="sans-serif" font-size="22" font-weight="900" fill="#F5A623">MIAN SAQIB</text>
      <text x="240" y="48" font-family="sans-serif" font-size="14" letter-spacing="3" fill="#8B9099">BOOM TRUCK RENTAL • DAMMAM</text>
      <rect x="1360" y="24" width="160" height="36" rx="6" fill="rgba(245,166,35,0.15)" stroke="#F5A623" stroke-width="1" />
      <text x="1440" y="47" font-family="sans-serif" font-size="14" font-weight="bold" fill="#F5A623" text-anchor="middle">ARABIC / EN</text>

      <!-- Hero Section -->
      <g transform="translate(80, 160)">
        <rect width="360" height="32" rx="16" fill="rgba(245,166,35,0.1)" stroke="#F5A623" stroke-width="1" />
        <text x="20" y="22" font-family="monospace" font-size="13" fill="#F5A623" letter-spacing="2">HEAVY CRANE &amp; HYDRAULIC FLEET</text>

        <text x="0" y="110" font-family="sans-serif" font-size="58" font-weight="900" fill="#EDE9E3">Heavy Lifting Fleet Rental</text>
        <text x="0" y="180" font-family="sans-serif" font-size="58" font-weight="900" fill="#EDE9E3">Across Saudi Arabia.</text>

        <text x="0" y="250" font-family="sans-serif" font-size="28" font-weight="bold" fill="#8B9099">Boom Trucks, Mobile Cranes &amp; Man Lifts in Eastern Province</text>

        <text x="0" y="320" font-family="sans-serif" font-size="20" fill="#8B9099">TUV certified operators, 3-ton to 100-ton capacity, 24/7 site mobilization.</text>

        <rect x="0" y="380" width="280" height="60" rx="8" fill="#F5A623" />
        <text x="140" y="417" font-family="sans-serif" font-size="18" font-weight="bold" fill="#000000" text-anchor="middle">Get Instant Quotation</text>

        <rect x="300" y="380" width="240" height="60" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
        <text x="420" y="417" font-family="sans-serif" font-size="18" fill="#FFFFFF" text-anchor="middle">View Fleet Catalog</text>
      </g>

      <!-- Right Crane illustration -->
      <g transform="translate(960, 150)">
        <rect width="560" height="460" rx="16" fill="#17191E" stroke="rgba(255,255,255,0.08)" stroke-width="2" />
        <line x1="100" y1="380" x2="440" y2="80" stroke="#F5A623" stroke-width="18" stroke-linecap="round" />
        <line x1="440" y1="80" x2="440" y2="220" stroke="#8B9099" stroke-width="4" stroke-dasharray="6 4" />
        <circle cx="440" cy="230" r="10" fill="#FF2A1F" />
        <rect x="80" y="360" width="280" height="60" rx="8" fill="#22262E" />
        <circle cx="140" cy="420" r="26" fill="#333742" stroke="#F5A623" stroke-width="4" />
        <circle cx="280" cy="420" r="26" fill="#333742" stroke="#F5A623" stroke-width="4" />
        <text x="40" y="60" font-family="monospace" font-size="14" fill="#8B9099">BOOM CAPACITY: 25 - 80 METERS</text>
      </g>

      <rect y="680" width="1600" height="320" fill="#111215" />
      <g transform="translate(80, 760)">
        <text x="0" y="0" font-family="sans-serif" font-size="24" font-weight="bold" fill="#EDE9E3">Eastern Province Deployment: Dammam • Khobar • Jubail • Ras Tanura</text>
        <text x="0" y="40" font-family="monospace" font-size="15" fill="#F5A623">ARAMCO &amp; SABIC VENDOR COMPLIANT</text>
      </g>
    </svg>
  `);
  await sharp(miansaqibSvg).webp({ quality: 80 }).toFile(path.join(__dirname, '../public/projects/miansaqib.webp'));
  console.log('✓ Created miansaqib.webp');

  // 4. ARK Fast Foodies posters: 1600 x 1000 WebP
  const fastFoodiesSvg = Buffer.from(`
    <svg width="1600" height="1000" viewBox="0 0 1600 1000" xmlns="http://www.w3.org/2000/svg">
      <rect width="1600" height="1000" fill="#080808" />
      
      <!-- Poster 1: The Smash Burger (Left Angled) -->
      <g transform="translate(120, 120) rotate(-4)">
        <rect width="400" height="620" rx="12" fill="#1B120C" stroke="#FF5722" stroke-width="2" />
        <rect x="30" y="40" width="340" height="280" rx="8" fill="#2A1A10" />
        <circle cx="200" cy="180" r="85" fill="#FF8A00" />
        <rect x="110" y="170" width="180" height="24" rx="8" fill="#7A3E1D" />
        <rect x="115" y="196" width="170" height="16" rx="4" fill="#FF2A1F" />
        <text x="200" y="380" font-family="sans-serif" font-size="36" font-weight="900" fill="#FFF" text-anchor="middle">THE SMASH</text>
        <text x="200" y="420" font-family="monospace" font-size="14" letter-spacing="4" fill="#FF8A00" text-anchor="middle">PREMIUM WAGYU BLEND</text>
        <line x1="50" y1="460" x2="350" y2="460" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
        <text x="200" y="510" font-family="sans-serif" font-size="20" font-weight="bold" fill="#EDE9E3" text-anchor="middle">SERIOUS FLAVOUR.</text>
        <text x="200" y="550" font-family="monospace" font-size="12" fill="#8B9099" text-anchor="middle">ARK FAST FOODIES • SARGODHA</text>
      </g>

      <!-- Poster 2: Brand Lockup & Typography (Center Hero) -->
      <g transform="translate(590, 80)">
        <rect width="420" height="680" rx="12" fill="#120707" stroke="#FF2A1F" stroke-width="3" />
        <rect x="40" y="40" width="340" height="50" fill="#FF2A1F" />
        <text x="210" y="73" font-family="monospace" font-size="16" font-weight="bold" fill="#000000" text-anchor="middle" letter-spacing="6">ORIGINAL RECIPE</text>
        
        <text x="210" y="180" font-family="sans-serif" font-size="52" font-weight="900" fill="#EDE9E3" text-anchor="middle">ARK</text>
        <text x="210" y="240" font-family="sans-serif" font-size="52" font-weight="900" fill="#FF2A1F" text-anchor="middle">FAST</text>
        <text x="210" y="300" font-family="sans-serif" font-size="52" font-weight="900" fill="#EDE9E3" text-anchor="middle">FOODIES</text>

        <circle cx="210" cy="420" r="80" fill="none" stroke="#EDE9E3" stroke-width="2" stroke-dasharray="6 6" />
        <text x="210" y="426" font-family="monospace" font-size="20" font-weight="bold" fill="#EDE9E3" text-anchor="middle">EST. 2026</text>

        <text x="210" y="560" font-family="sans-serif" font-size="18" fill="#8B9099" text-anchor="middle">Visual Identity &amp; Packaging</text>
        <rect x="80" y="600" width="260" height="36" rx="6" fill="rgba(255,42,31,0.2)" stroke="#FF2A1F" stroke-width="1" />
        <text x="210" y="623" font-family="monospace" font-size="12" fill="#FF2A1F" text-anchor="middle" letter-spacing="3">CASE STUDY COMING SOON</text>
      </g>

      <!-- Poster 3: The Golden Fries (Right Angled) -->
      <g transform="translate(1070, 140) rotate(5)">
        <rect width="400" height="620" rx="12" fill="#16130A" stroke="#FFC107" stroke-width="2" />
        <rect x="30" y="40" width="340" height="280" rx="8" fill="#221D10" />
        <line x1="160" y1="100" x2="160" y2="240" stroke="#FFC107" stroke-width="16" stroke-linecap="round" />
        <line x1="190" y1="80" x2="190" y2="250" stroke="#FFD54F" stroke-width="16" stroke-linecap="round" />
        <line x1="220" y1="110" x2="220" y2="240" stroke="#FFC107" stroke-width="16" stroke-linecap="round" />
        <line x1="250" y1="95" x2="250" y2="250" stroke="#FFE082" stroke-width="16" stroke-linecap="round" />

        <text x="200" y="380" font-family="sans-serif" font-size="36" font-weight="900" fill="#FFF" text-anchor="middle">CRUNCH</text>
        <text x="200" y="420" font-family="monospace" font-size="14" letter-spacing="4" fill="#FFC107" text-anchor="middle">SEASONED WITH SEA SALT</text>
        <text x="200" y="510" font-family="sans-serif" font-size="20" font-weight="bold" fill="#EDE9E3" text-anchor="middle">EVERY CRUNCH COUNTS.</text>
        <text x="200" y="550" font-family="monospace" font-size="12" fill="#8B9099" text-anchor="middle">ARK FAST FOODIES • SARGODHA</text>
      </g>
    </svg>
  `);
  await sharp(fastFoodiesSvg).webp({ quality: 80 }).toFile(path.join(__dirname, '../public/projects/fast-foodies.webp'));
  console.log('✓ Created fast-foodies.webp');

  console.log('All placeholder image assets successfully generated!');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
