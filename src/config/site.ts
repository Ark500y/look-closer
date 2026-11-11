export interface WorkingHoursConfig {
  start: number; // 9 = 09:00
  end: number;   // 18 = 18:00
  tz: string;    // "Asia/Karachi"
  city: string;  // "Sargodha"
  country: string; // "Pakistan"
  label: string; // "09:00 – 18:00 PKT"
  display: string;
  workDays: number[]; // [1, 2, 3, 4, 5] (Monday to Friday)
}

export const WORKING_HOURS: WorkingHoursConfig = {
  start: 9,
  end: 18,
  tz: "Asia/Karachi",
  city: "Sargodha",
  country: "Pakistan",
  label: "09:00 – 18:00 PKT",
  display: "09:00 – 18:00 PKT",
  workDays: [1, 2, 3, 4, 5],
};

export interface SiteConfig {
  name: string;
  tagline: string;
  taglineAr: string;
  author: string;
  location: string;
  locationAr: string;
  coords: {
    lat: number;
    lng: number;
  };
  email: string;
  whatsapp: string;
  whatsappRaw: string;
  github: string;
  linkedin: string;
  workingHours: WorkingHoursConfig;
  url: string;
}

export const siteConfig: SiteConfig = {
  name: "ARK STUDIO",
  tagline: "Web design & brand identity",
  taglineAr: "تصميم المواقع والهوية البصرية",
  author: "Abdulrehman Khalid",
  location: "Sargodha, Pakistan",
  locationAr: "سرغودها، باكستان",
  coords: {
    lat: 32.0836,
    lng: 72.6711,
  },
  email: "ark203777@gmail.com",
  whatsapp: "+92 314 1495630",
  whatsappRaw: "923141495630",
  github: "https://github.com/Ark500y",
  linkedin: "https://linkedin.com/in/abdulrehman-khalid",
  workingHours: WORKING_HOURS,
  url: "https://arkstudio.design",
};
