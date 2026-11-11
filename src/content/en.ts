export interface ProjectContent {
  id: string;
  tag: string;
  studioTag: string;
  title: string;
  category: string;
  location: string;
  description: string;
  url: string;
  type: "client" | "studio";
  laptopImage: string;
  phoneImage?: string;
}

export interface ServiceItem {
  number: string;
  name: string;
  detail: string;
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
    projects: ProjectContent[];
  };
  services: {
    sectionNumber: string;
    sectionTitle: string;
    items: ServiceItem[];
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
    directEmail: string;
    whatsappNumber: string;
    workingHoursLabel: string;
  };
  footer: {
    copyright: string;
    location: string;
    backToTop: string;
  };
}

export const contentEn: SiteContent = {
  meta: {
    title: "Web Designer & Brand Identity | English & Arabic Websites | ARK STUDIO",
    description:
      "Remote web designer and developer in Sargodha, Pakistan. Websites and brand identities for businesses worldwide, in English and Arabic.",
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
    headlinePart1: "Websites and brand identities",
    headlinePart2: "for businesses anywhere.",
    subline:
      "I'm Abdulrehman Khalid, a web designer in Sargodha, Pakistan. I work remotely with clients in any time zone, and I build in English and Arabic.",
    primaryCta: "Start a project",
    secondaryCta: "See the work",
    status: "Available for new projects Q2 2026",
    cityTimeLabel: "Sargodha, PK",
  },
  work: {
    sectionNumber: "01",
    sectionTitle: "Work",
    groupClientTitle: "Client work",
    groupStudioTitle: "Studio builds and earlier portfolios",
    openLive: "Open live site",
    projects: [
      {
        id: "miansaqib",
        tag: "01 / 06",
        studioTag: "ARK STUDIO",
        title: "Mian Saqib",
        category: "Boom truck services",
        location: "Dammam, Saudi Arabia",
        description:
          "A one-page Arabic and English website for a solo boom-truck operator. Call and WhatsApp buttons are always one tap away.",
        url: "https://www.miansaqib.com/",
        type: "client",
        laptopImage: "/work/01-miansaqib-desktop.webp",
        phoneImage: "/work/01-miansaqib-mobile.webp",
      },
      {
        id: "actech",
        tag: "02 / 06",
        studioTag: "ARK STUDIO",
        title: "AC Technical Services",
        category: "AC repair and maintenance",
        location: "UAE",
        description:
          "A website with separate pages for Dubai, Sharjah and Ajman, a booking form and direct WhatsApp contact.",
        url: "https://actech-services.netlify.app/",
        type: "client",
        laptopImage: "/work/02-actech-desktop.webp",
        phoneImage: "/work/02-actech-mobile.webp",
      },
      {
        id: "ark-creative-engineering",
        tag: "03 / 06",
        studioTag: "ARK STUDIO",
        title: "ARK Creative Engineering",
        category: "Studio build",
        location: "Studio showcase",
        description:
          "A futuristic, aerospace-inspired showcase with parallax layers, interactive 3D, sound and a telemetry-style interface.",
        url: "https://portfolio-alpha-one-ym3ipfauzw.vercel.app/",
        type: "studio",
        laptopImage: "/work/03-ark-creative-engineering-desktop.webp",
      },
      {
        id: "ark-studio-red-black",
        tag: "04 / 06",
        studioTag: "ARK STUDIO",
        title: "ARK Studio, red and black edition",
        category: "Earlier portfolio",
        location: "Studio showcase",
        description:
          "An earlier version of this portfolio with a projects archive, an about page and WhatsApp contact.",
        url: "https://ark-studio-portfolio.vercel.app/projects",
        type: "studio",
        laptopImage: "/work/04-ark-studio-red-black-desktop.webp",
      },
      {
        id: "ark-portfolio",
        tag: "05 / 06",
        studioTag: "ARK STUDIO",
        title: "ARK Portfolio",
        category: "Earlier portfolio",
        location: "Studio showcase",
        description:
          "An earlier Next.js portfolio with case studies and a services page.",
        url: "https://env-three-kohl.vercel.app/",
        type: "studio",
        laptopImage: "/work/05-ark-portfolio-desktop.webp",
      },
      {
        id: "ark-creative-developer",
        tag: "06 / 06",
        studioTag: "ARK STUDIO",
        title: "ARK Creative Developer portfolio",
        category: "Earlier portfolio",
        location: "Studio showcase",
        description:
          "An earlier portfolio with services, process and contact pages and a project inquiry form.",
        url: "https://arkstudio-three.vercel.app/",
        type: "studio",
        laptopImage: "/work/06-ark-creative-developer-desktop.webp",
      },
    ],
  },
  services: {
    sectionNumber: "02",
    sectionTitle: "Services",
    items: [
      {
        number: "01",
        name: "Websites",
        detail: "Design and development in Next.js",
      },
      {
        number: "02",
        name: "Brand identity and logos",
        detail: "Logos, typographic systems and brand collateral",
      },
      {
        number: "03",
        name: "English and Arabic layouts",
        detail: "Right-to-left done properly",
      },
      {
        number: "04",
        name: "Enquiry flows",
        detail: "Forms that open a ready-written WhatsApp message or email",
      },
      {
        number: "05",
        name: "Search and performance",
        detail: "Page titles, structure and speed so customers can find you",
      },
      {
        number: "06",
        name: "Posters and social graphics",
        detail: "Vector graphics and promotional design",
      },
    ],
  },
  posters: {
    sectionNumber: "03",
    sectionTitle: "Posters",
    sectionSubtitle: "Vector craft, typographic experiments, and physical print collateral.",
  },
  worldwide: {
    sectionNumber: "04",
    sectionTitle: "Worldwide",
    headline: "Based in Sargodha. Working wherever you are.",
    subline:
      "I work remotely with clients in any time zone. Distance is never a barrier to fast turnarounds and direct communication.",
    localTime: "Your local time",
    sargodhaTime: "Mine (PKT)",
    overlapLabel: "Working days overlap",
    overlapSummary: (hours: number) =>
      hours > 0
        ? `${hours} hours of live working day overlap today.`
        : "Outside active working hours right now. Leave a message and I will reply first thing.",
    selectCityPrompt: "Or check overlap with your city:",
    remoteReady: "Remote web designer and developer · Daily progress · English and Arabic",
  },
  contact: {
    sectionNumber: "05",
    sectionTitle: "Contact",
    headline: "Tell me about your business.",
    form: {
      nameLabel: "Name",
      namePlaceholder: "Your name",
      businessLabel: "Business",
      businessPlaceholder: "Your business or project name",
      countryLabel: "Country",
      countryPlaceholder: "Your country or city",
      needLabel: "What do you need?",
      needs: [
        "A new website",
        "Rebuild my website",
        "Brand identity or logo",
        "Posters",
        "Not sure yet",
      ],
      messageLabel: "Message",
      messagePlaceholder: "Tell me about your project...",
      sendWhatsApp: "Send on WhatsApp",
      sendEmail: "Send by email",
    },
    directEmail: "ark203777@gmail.com",
    whatsappNumber: "+92 314 1495630",
    workingHoursLabel: "Working hours: 09:00 – 18:00 PKT",
  },
  footer: {
    copyright: "© 2026 ARK STUDIO. Abdulrehman Khalid, Sargodha, Pakistan.",
    location: "Sargodha, Pakistan",
    backToTop: "Back to top",
  },
};
