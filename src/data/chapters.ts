export interface HubLocation {
  name: string;
  country: string;
  coords: [number, number]; // [lon, lat]
  role: string;
  clientType?: string;
}

export interface Chapter {
  index: number;
  id: string;
  fig: string;
  title: string;
  subtitle: string;
  medium: string;
  place: string;
  headline: string;
  headlineItalicWord?: string;
  body: string;
  hint?: string;
  zoomFactor: number;
  zoomDisplay: string;
  tags?: string[];
  skills?: string[];
  url?: string;
  urlText?: string;
  image?: string;
  statusLabel?: string;
  businessImpact?: string;
  projectWhatsAppPrompt?: string;
  hubs?: HubLocation[];
  contact?: {
    whatsapp: string;
    whatsappDisplay: string;
    email: string;
  };
}

export const CHAPTERS: Chapter[] = [
  {
    index: 0,
    id: 'void',
    fig: 'FIG. 01',
    title: 'ARK STUDIO',
    subtitle: 'WEB DESIGNER & DIGITAL CREATOR',
    medium: 'DEEP VOID DRIFT / RED LIGHT LENS',
    place: 'SARGODHA, PK',
    headline: 'Look closer.',
    headlineItalicWord: 'closer.',
    body: "I'm Abdulrehman Khalid. I design and build fast, mobile-first websites in English and Arabic that convert visitors into revenue.",
    hint: 'Scroll to go inside',
    zoomFactor: 1,
    zoomDisplay: 'x1',
  },
  {
    index: 1,
    id: 'the-maker',
    fig: 'FIG. 02',
    title: 'THE MAKER',
    subtitle: 'CRAFT & DISCIPLINE',
    medium: 'MONOCHROME PORTRAIT / ORBITAL RINGS',
    place: 'SARGODHA, PK',
    headline: 'Designer and developer, in one person.',
    headlineItalicWord: 'one person.',
    body: 'Based in Sargodha, Pakistan. Fast, mobile-first websites, in English and Arabic, for businesses in Saudi Arabia, the UAE and Pakistan. No agency bureaucracy: you get senior design and engineering directly from me.',
    skills: [
      'Web design',
      'UI/UX',
      'Branding & posters',
      'Next.js',
      'SEO',
      'Arabic + English',
    ],
    image: '/images/portrait-cutout.png',
    zoomFactor: 10,
    zoomDisplay: 'x10',
  },
  {
    index: 2,
    id: 'the-arc',
    fig: 'FIG. 03',
    title: 'THE ARC',
    subtitle: 'REGIONAL FOOTPRINT',
    medium: 'DOT-MATRIX PROJECTION / D3 GEODESIC ARCS',
    place: 'MENA & SOUTH ASIA',
    headline: 'Built in Sargodha. Delivered worldwide.',
    headlineItalicWord: 'Delivered',
    body: 'Direct transmission across GCC timezones. High-performance bilingual web architecture built for business leaders who need sub-second speed, native Arabic RTL, and direct WhatsApp customer conversion.',
    hubs: [
      { name: 'Sargodha', country: 'Pakistan', coords: [72.67, 32.08], role: 'Studio Origin / Core Dev', clientType: 'Headquarters' },
      { name: 'Dammam', country: 'Saudi Arabia', coords: [50.10, 26.43], role: 'Fleet & Heavy Machinery Portals', clientType: 'Commercial Client' },
      { name: 'Jeddah', country: 'Saudi Arabia', coords: [39.19, 21.49], role: 'Commerce & Trade Systems', clientType: 'Enterprise' },
      { name: 'Dubai', country: 'UAE', coords: [55.27, 25.20], role: 'Technical Contracting Platforms', clientType: 'Commercial Client' },
    ],
    zoomFactor: 100,
    zoomDisplay: 'x100',
  },
  {
    index: 3,
    id: 'window-01',
    fig: 'FIG. 04',
    title: 'AC TECHNICAL SERVICES',
    subtitle: 'COMMERCIAL SERVICE PLATFORM',
    medium: 'GLASS BROWSER FRAME / NEXT.JS ENGINE',
    place: 'DUBAI, UAE',
    headline: 'AC Technical Services',
    headlineItalicWord: 'Services',
    body: 'Emergency HVAC & contracting platform engineered for immediate WhatsApp dispatch across Dubai. Designed for emergency speed with sub-second mobile page loads.',
    businessImpact: '+280% mobile lead inquiries via instant 45-minute dispatch CTAs',
    projectWhatsAppPrompt: 'Hello Abdulrehman, I saw your AC Technical Services Dubai project. I need a high-conversion service website for my business.',
    tags: ['Mobile-first', 'WhatsApp actions', 'Local SEO'],
    url: 'https://actech-services.netlify.app/',
    urlText: 'Open live site',
    image: '/projects/actech.webp',
    zoomFactor: 1000,
    zoomDisplay: 'x1,000',
  },
  {
    index: 4,
    id: 'window-02',
    fig: 'FIG. 05',
    title: 'BOOM TRUCK RENTAL',
    subtitle: 'HEAVY EQUIPMENT BILINGUAL PORTAL',
    medium: 'RTL/LTR DUAL ENGINE / NEXT.JS',
    place: 'DAMMAM, KSA',
    headline: 'Boom Truck Rental',
    headlineItalicWord: 'Rental',
    body: 'Dual-language Arabic & English machinery rental platform with native RTL layouts, instant quote flows, and localized regional search dominance in Eastern Province.',
    businessImpact: '#1 local search visibility for heavy machinery rentals in Dammam & Khobar',
    projectWhatsAppPrompt: 'Hello Abdulrehman, I saw your Boom Truck Rental Saudi project. I need a bilingual English/Arabic platform for my company.',
    tags: ['EN/AR', 'RTL', 'Local SEO'],
    url: 'https://miansaqib.com/',
    urlText: 'Open live site',
    image: '/projects/miansaqib.webp',
    zoomFactor: 10000,
    zoomDisplay: 'x10,000',
  },
  {
    index: 5,
    id: 'window-03',
    fig: 'FIG. 06',
    title: 'ARK FAST FOODIES',
    subtitle: 'RESTAURANT BRANDING & POSTER WALL',
    medium: 'POSTER WALL & PACKAGING / VECTOR CRAFT',
    place: 'SARGODHA, PK',
    headline: 'ARK Fast Foodies',
    headlineItalicWord: 'Foodies',
    body: 'Visual identity, promotional poster series, dynamic social layouts, and packaging engineered for brand recognition and high appetitive drive.',
    businessImpact: 'Complete brand rollout from packaging to social campaign templates',
    projectWhatsAppPrompt: 'Hello Abdulrehman, I saw your ARK Fast Foodies branding. I would like to discuss brand identity and poster design.',
    statusLabel: 'Case study in progress',
    image: '/projects/fast-foodies.webp',
    zoomFactor: 100000,
    zoomDisplay: 'x100,000',
  },
  {
    index: 6,
    id: 'the-next-pixel',
    fig: 'FIG. 07',
    title: 'THE NEXT PIXEL',
    subtitle: 'TERMINUS / 1:1 ATOMIC RESOLUTION',
    medium: 'PURE RED EMISSIVE MATRIX',
    place: 'THE WORK CONTINUES',
    headline: "You're x1,000,000 closer. The next pixel is yours.",
    headlineItalicWord: 'yours.',
    body: 'Every website I design is built with obsessive precision — from sub-millisecond load times to razor-sharp typography. Let’s make your next digital presence iconic.',
    contact: {
      whatsapp: 'https://wa.me/923141495630',
      whatsappDisplay: '+92 314 1495630',
      email: 'ark203777@gmail.com',
    },
    zoomFactor: 1000000,
    zoomDisplay: 'x1,000,000',
  },
];

export const TOTAL_CHAPTERS = CHAPTERS.length; // 7 levels: z = 0..6
