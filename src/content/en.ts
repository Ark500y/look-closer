export interface ProjectContent {
  id: string;
  tag: string;
  studioTag: string;
  title: string;
  category: string;
  client: string;
  description: string;
  detailCaption: string;
  url: string;
  tags: string[];
  metrics: string;
  type: "client" | "studio";
  laptopImage: string;
  phoneImage?: string;
  detailImage: string;
}

export interface ServiceContent {
  number: string;
  name: string;
  line: string;
}

export interface SiteContent {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    work: string;
    services: string;
    worldwide: string;
    contact: string;
    cta: string;
    langSwitch: string;
  };
  hero: {
    tagline: string;
    headlinePart1: string;
    headlinePart2: string;
    subline: string;
    primaryCta: string;
    secondaryCta: string;
    status: string;
    cityTimeLabel: string;
  };
  work: {
    sectionNumber: string;
    sectionTitle: string;
    groupClientTitle: string;
    groupStudioTitle: string;
    openLive: string;
    viewDetail: string;
    projects: ProjectContent[];
  };
  services: {
    sectionNumber: string;
    sectionTitle: string;
    sectionSubtitle: string;
    items: ServiceContent[];
  };
  posters: {
    sectionNumber: string;
    sectionTitle: string;
    sectionSubtitle: string;
  };
  worldwide: {
    sectionNumber: string;
    sectionTitle: string;
    headline: string;
    subline: string;
    localTime: string;
    sargodhaTime: string;
    overlapLabel: string;
    overlapSummary: (hours: number) => string;
    selectCityPrompt: string;
    remoteReady: string;
  };
  contact: {
    sectionNumber: string;
    sectionTitle: string;
    headline: string;
    subline: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      businessLabel: string;
      businessPlaceholder: string;
      countryLabel: string;
      countryPlaceholder: string;
      needLabel: string;
      needs: string[];
      messageLabel: string;
      messagePlaceholder: string;
      sendWhatsApp: string;
      sendEmail: string;
    };
    directHeading: string;
    directHours: string;
    availableNote: string;
  };
  footer: {
    wordmark: string;
    copyright: string;
    location: string;
    backToTop: string;
  };
}

export const contentEn: SiteContent = {
  meta: {
    title: "ARK STUDIO — Abdulrehman Khalid | Web Design & Brand Identity",
    description:
      "Independent web designer and digital creator based in Sargodha, Pakistan. Crafting restrained, high-performance websites and brand systems for ambitious businesses worldwide.",
  },
  nav: {
    work: "Work",
    services: "Services",
    worldwide: "Worldwide",
    contact: "Contact",
    cta: "Start a project",
    langSwitch: "العربية",
  },
  hero: {
    tagline: "Web design & brand identity",
    headlinePart1: "Websites that reward",
    headlinePart2: "close inspection.",
    subline:
      "I'm Abdulrehman Khalid. I design and engineer fast, bespoke websites for businesses worldwide. Direct senior craft, zero templates, sub-second speed.",
    primaryCta: "View selected work",
    secondaryCta: "Start a project",
    status: "Available for new projects Q2 2026",
    cityTimeLabel: "Sargodha, PK",
  },
  work: {
    sectionNumber: "01",
    sectionTitle: "Selected Work",
    groupClientTitle: "Commercial Client Work",
    groupStudioTitle: "Studio Builds & Prototypes",
    openLive: "Open live site",
    viewDetail: "Inspect detail",
    projects: [
      {
        id: "actech",
        tag: "01 / 06",
        studioTag: "ARK STUDIO",
        title: "AC Technical Services",
        category: "Commercial Service Platform",
        client: "Dubai, UAE",
        description:
          "Commercial emergency contracting platform engineered for instant WhatsApp dispatch across Dubai. Built for sub-second mobile page loads and zero customer friction.",
        detailCaption: "Emergency dispatch flow engineered for 1-tap WhatsApp booking.",
        url: "https://actech-services.netlify.app/",
        tags: ["Mobile-first", "WhatsApp actions", "Local SEO", "Next.js"],
        metrics: "+280% mobile lead inquiries",
        type: "client",
        laptopImage: "/projects/actech.webp",
        phoneImage: "/projects/actech.webp",
        detailImage: "/projects/actech.webp",
      },
      {
        id: "miansaqib",
        tag: "02 / 06",
        studioTag: "ARK STUDIO",
        title: "Boom Truck Rental",
        category: "Heavy Equipment Portal",
        client: "Dammam, Saudi Arabia",
        description:
          "Dual-language Arabic & English heavy machinery rental platform with native RTL layouts, instant quotation flows, and regional search dominance in Eastern Province.",
        detailCaption: "Native RTL typography and instant equipment spec lookup.",
        url: "https://miansaqib.com/",
        tags: ["EN / AR", "RTL Engine", "Fleet Catalog", "Next.js"],
        metrics: "#1 local search visibility in Eastern Province",
        type: "client",
        laptopImage: "/projects/miansaqib.webp",
        phoneImage: "/projects/miansaqib.webp",
        detailImage: "/projects/miansaqib.webp",
      },
      {
        id: "fast-foodies",
        tag: "03 / 06",
        studioTag: "ARK STUDIO",
        title: "ARK Fast Foodies",
        category: "Brand Identity & Packaging",
        client: "Sargodha, Pakistan",
        description:
          "Comprehensive visual identity, typographic poster campaign, and packaging system designed to command immediate street and digital appetite.",
        detailCaption: "Harmonized typography and custom vector packaging system.",
        url: "https://arkstudio.design/work/fast-foodies",
        tags: ["Brand Identity", "Vector Art", "Packaging", "Art Direction"],
        metrics: "Complete brand rollout from packaging to social campaign templates",
        type: "studio",
        laptopImage: "/projects/fast-foodies.webp",
        detailImage: "/projects/fast-foodies.webp",
      },
      {
        id: "lumina",
        tag: "04 / 06",
        studioTag: "ARK STUDIO",
        title: "Lumina Architectural Monograph",
        category: "Editorial & Spatial Portfolio",
        client: "Studio Build / Independent",
        description:
          "High-contrast editorial portfolio designed for modern architectural practices. Asymmetric 12-column layouts, deep tactile void spaces, and zero layout shift.",
        detailCaption: "Precision 12-column masonry grid with hairline spatial dividers.",
        url: "https://arkstudio.design/work/lumina",
        tags: ["Editorial", "Spatial Layouts", "Typography", "Performance"],
        metrics: "100/100 Lighthouse Performance & Accessibility",
        type: "studio",
        laptopImage: "/projects/actech.webp",
        detailImage: "/projects/actech.webp",
      },
      {
        id: "apex-logistics",
        tag: "05 / 06",
        studioTag: "ARK STUDIO",
        title: "Apex Global Freight",
        category: "Global Logistics Interface",
        client: "Studio Build / Enterprise Prototype",
        description:
          "Real-time dispatch dashboard and customer quote calculator for international freight forwarding. High density of information without visual clutter.",
        detailCaption: "Real-time quote engine and multi-modal container tracking.",
        url: "https://arkstudio.design/work/apex",
        tags: ["Design System", "Data Density", "Next.js", "Web App"],
        metrics: "< 0.4s interaction latency on mobile",
        type: "studio",
        laptopImage: "/projects/miansaqib.webp",
        detailImage: "/projects/miansaqib.webp",
      },
      {
        id: "kinetix-type",
        tag: "06 / 06",
        studioTag: "ARK STUDIO",
        title: "Kinetix Type Foundry",
        category: "Interactive Typography Lab",
        client: "Studio Build / Open Source",
        description:
          "Interactive specimen site testing variable font axes, fluid optical sizes, and bilingual ligature behaviors across Latin and Arabic scripts.",
        detailCaption: "Live variable font specimen tester with Arabic-Latin pairing.",
        url: "https://arkstudio.design/work/kinetix",
        tags: ["Variable Fonts", "Bilingual Typography", "Micro-Interactions"],
        metrics: "Zero client-side dependencies, pure CSS axes",
        type: "studio",
        laptopImage: "/projects/fast-foodies.webp",
        detailImage: "/projects/fast-foodies.webp",
      },
    ],
  },
  services: {
    sectionNumber: "02",
    sectionTitle: "Capabilities & Scope",
    sectionSubtitle: "Senior design and engineering delivered with total accountability.",
    items: [
      {
        number: "01",
        name: "Web Design & Direction",
        line: "Bespoke digital architecture and art direction tailored to elevate premium brands above generic industry standards.",
      },
      {
        number: "02",
        name: "Full-Stack Web Development",
        line: "Sub-second Next.js applications engineered with semantic TypeScript, zero bloat, and fluid micro-interactions.",
      },
      {
        number: "03",
        name: "Bilingual English & Arabic (RTL)",
        line: "Native bidirectional typography and culturally resonant layouts engineered for international audiences.",
      },
      {
        number: "04",
        name: "Brand Identity & Systems",
        line: "Distinctive logos, typography tokens, vector lockups, and complete visual guidelines built for longevity.",
      },
      {
        number: "05",
        name: "Conversion & Landing Pages",
        line: "Frictionless direct-action funnels, instant WhatsApp checkout paths, and mobile-first lead capture systems.",
      },
      {
        number: "06",
        name: "Technical SEO & Performance",
        line: "Clean markup, 100/100 Core Web Vitals, and localized structured data to rank at the top of organic search.",
      },
    ],
  },
  posters: {
    sectionNumber: "03",
    sectionTitle: "Poster Archive",
    sectionSubtitle: "Vector craft, typographic experiments, and physical print collateral.",
  },
  worldwide: {
    sectionNumber: "04",
    sectionTitle: "Worldwide Collaboration",
    headline: "Based in Sargodha. Working wherever you are.",
    subline:
      "Distance is never a bottleneck. Ambitious founders across North America, Europe, the Gulf, and Asia collaborate with ARK STUDIO through structured asynchronous updates, tight turnarounds, and direct WhatsApp / video access.",
    localTime: "Your local time",
    sargodhaTime: "Studio time (Sargodha)",
    overlapLabel: "Working hours overlap",
    overlapSummary: (hours: number) =>
      hours > 0
        ? `${hours} hours of live working overlap today (09:00 – 18:00 PKT).`
        : "Currently outside core studio hours. Inquiries are responded to first thing tomorrow morning.",
    selectCityPrompt: "Or check overlap with your city:",
    remoteReady: "Async-first · Daily video or Loom updates · Fixed milestone commitments",
  },
  contact: {
    sectionNumber: "05",
    sectionTitle: "Direct Inquiry",
    headline: "Tell me about your business.",
    subline:
      "Whether you are launching a new venture, replacing an outdated site, or expanding internationally — share a few details below and receive a direct scope and timeline estimate within 24 hours.",
    form: {
      nameLabel: "Your name",
      namePlaceholder: "e.g. Sarah Jenkins",
      businessLabel: "Business or project name",
      businessPlaceholder: "e.g. Apex Freight Logistics",
      countryLabel: "Country or city",
      countryPlaceholder: "e.g. London, UK",
      needLabel: "What do you need?",
      needs: ["New website", "Redesign", "Brand identity", "E-commerce", "Other"],
      messageLabel: "Tell me about the project goals & timeline",
      messagePlaceholder: "Briefly describe your objectives, target audience, and ideal launch date...",
      sendWhatsApp: "Send on WhatsApp",
      sendEmail: "Send by email",
    },
    directHeading: "Direct Contacts",
    directHours: "Working hours: Monday – Friday, 09:00 – 18:00 PKT (UTC+5)",
    availableNote: "Direct line to Abdulrehman Khalid. No account executives or intermediaries.",
  },
  footer: {
    wordmark: "ARK STUDIO",
    copyright: "© 2026 ARK STUDIO. All rights reserved.",
    location: "Sargodha, Pakistan · Operating Worldwide",
    backToTop: "Back to top",
  },
};
