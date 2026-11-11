import { Instrument_Serif, Hanken_Grotesk, Noto_Naskh_Arabic, IBM_Plex_Sans_Arabic } from "next/font/google";

// English Display: Instrument Serif
export const fontDisplay = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
});

// English Body & UI: Hanken Grotesk
export const fontBody = Hanken_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Arabic Heading: Noto Naskh Arabic
export const fontArabicHeading = Noto_Naskh_Arabic({
  weight: ["400", "600", "700"],
  subsets: ["arabic"],
  variable: "--font-arabic-heading",
  display: "swap",
});

// Arabic Body: IBM Plex Sans Arabic
export const fontArabicBody = IBM_Plex_Sans_Arabic({
  weight: ["300", "400", "500", "600"],
  subsets: ["arabic"],
  variable: "--font-arabic-body",
  display: "swap",
});
