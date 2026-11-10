import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LOOK CLOSER — ARK STUDIO | Abdulrehman Khalid",
  description:
    "Single-page, scroll-driven infinite-zoom exhibition portfolio of Abdulrehman Khalid, web designer and digital creator based in Sargodha, Pakistan. Building fast, mobile-first websites in English and Arabic for clients in Saudi Arabia, the UAE, and Pakistan.",
  keywords: [
    "Abdulrehman Khalid",
    "ARK STUDIO",
    "Web Designer Sargodha",
    "Creative Developer Pakistan",
    "Next.js Portfolio",
    "Bilingual Web Design Saudi Arabia UAE",
    "Arabic English Web Developer",
    "AC Technical Services",
    "Boom Truck Rental Mian Saqib",
  ],
  authors: [{ name: "Abdulrehman Khalid", url: "https://wa.me/923141495630" }],
  creator: "Abdulrehman Khalid",
  publisher: "ARK STUDIO",
  metadataBase: new URL("https://arkstudio.me"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LOOK CLOSER — ARK STUDIO | Abdulrehman Khalid",
    description: "The closer you look, the better the craft. An infinite-zoom exhibition portfolio.",
    url: "https://arkstudio.me",
    siteName: "ARK STUDIO",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LOOK CLOSER — ARK STUDIO | Abdulrehman Khalid",
    description: "The closer you look, the better the craft. Scroll-driven infinite zoom portfolio.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${jetbrainsMono.variable} ${inter.variable} dark`}>
      <head>
        <link rel="icon" href="/logo/ark-mark.svg" type="image/svg+xml" />
        {/* JSON-LD Schema markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Abdulrehman Khalid",
                jobTitle: "Web Designer & Digital Creator",
                worksFor: {
                  "@type": "Organization",
                  name: "ARK STUDIO",
                },
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Sargodha",
                  addressCountry: "PK",
                },
                email: "ark203777@gmail.com",
                telephone: "+923141495630",
                url: "https://arkstudio.me",
                knowsAbout: [
                  "Web Design",
                  "UI/UX Design",
                  "Next.js Development",
                  "Arabic & English Bilingual Websites",
                  "Performance Optimization",
                  "Local SEO",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                name: "ARK STUDIO",
                founder: {
                  "@type": "Person",
                  name: "Abdulrehman Khalid",
                },
                description:
                  "High-craft web design, Next.js engineering, and digital identity for brands in Pakistan, Saudi Arabia, and the UAE.",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Sargodha",
                  addressCountry: "PK",
                },
                priceRange: "$$",
                openingHours: "Mo-Sa 09:00-18:00",
                url: "https://arkstudio.me",
              },
            ]),
          }}
        />
      </head>
      <body className="bg-[var(--ark-void)] text-[var(--ark-ink)] min-h-screen antialiased selection:bg-[var(--ark-red)] selection:text-black">
        {/* Hairline frame inset 12px */}
        <div className="hairline-frame" aria-hidden="true" />
        {/* Film grain and vignette overlays */}
        <div className="grain-overlay" aria-hidden="true" />
        <div className="vignette-overlay" id="vignette-fx" aria-hidden="true" />

        {/* Skip to content for accessibility */}
        <a
          href="#main-stage"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--ark-red)] focus:text-white focus:font-mono focus:text-xs tracking-wider"
        >
          Skip to main stage
        </a>
        <a
          href="/lite"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-48 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-mono focus:text-xs tracking-wider"
        >
          Fast Lane (Lite version)
        </a>

        {children}
      </body>
    </html>
  );
}
