import type { Metadata, Viewport } from "next";
import { fontDisplay, fontBody, fontArabicHeading, fontArabicBody } from "@/styles/fonts";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0C1311",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Web Designer & Brand Identity | English & Arabic Websites | ARK STUDIO",
  description:
    "Remote web designer and developer in Sargodha, Pakistan. Websites and brand identities for businesses worldwide, in English and Arabic.",
  keywords: [
    "Abdulrehman Khalid",
    "ARK STUDIO",
    "Web Designer",
    "Brand Identity",
    "Next.js Developer",
    "Sargodha",
    "Bilingual Web Design",
    "Arabic English Websites",
  ],
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.author} | ${siteConfig.tagline}`,
    description:
      "Independent web designer and digital creator based in Sargodha, Pakistan. Crafting restrained, high-performance websites and brand systems for ambitious businesses worldwide.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.author}`,
    description: "Web design & brand identity for businesses worldwide.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "ARK STUDIO",
    description:
      "Remote web designer and developer in Sargodha, Pakistan. Websites and brand identities for businesses worldwide, in English and Arabic.",
    url: siteConfig.url,
    areaServed: "Worldwide",
    founder: {
      "@type": "Person",
      name: siteConfig.author,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sargodha",
      addressCountry: "PK",
    },
  };

  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontArabicHeading.variable} ${fontArabicBody.variable}`}
    >
      <body className="antialiased selection:bg-[var(--accent)] selection:text-[var(--bg)] min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
