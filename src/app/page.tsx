"use client";

import dynamic from "next/dynamic";

const CameraEngine = dynamic(() => import("@/components/camera/CameraEngine"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-[#050505] flex items-center justify-center select-none">
      <div className="flex flex-col items-center space-y-4">
        {/* Pulsing red aperture */}
        <div className="w-12 h-12 rounded-full border border-[var(--ark-red)] animate-ping opacity-60" />
        <span className="font-mono text-xs text-[var(--ark-steel)] tracking-[0.25em] uppercase">
          CALIBRATING OPTICS...
        </span>
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <>
      {/* Visually hidden semantic text hierarchy for indexing & screen readers */}
      <div className="sr-only">
        <h1>LOOK CLOSER — ARK STUDIO | Abdulrehman Khalid</h1>
        <p>
          Single-page, scroll-driven infinite-zoom portfolio for ARK STUDIO, Abdulrehman Khalid,
          web designer &amp; digital creator based in Sargodha, Pakistan. Fast, mobile-first websites
          in English and Arabic for clients in Saudi Arabia, the UAE, and Pakistan.
        </p>
        <h2>The Maker: Abdulrehman Khalid</h2>
        <p>Web design, UI/UX, Next.js, SEO, Arabic and English bilingual platforms.</p>
        <h2>The Regional Arc</h2>
        <p>Sargodha to Dammam, Jeddah, and Dubai.</p>
        <h2>Projects</h2>
        <ul>
          <li>AC Technical Services (Dubai, UAE) — Mobile-first HVAC platform</li>
          <li>Boom Truck Rental (Dammam, Saudi Arabia) — Bilingual heavy machinery rental</li>
          <li>ARK Fast Foodies (Sargodha, Pakistan) — Visual identity and poster design</li>
        </ul>
        <a href="/lite">View Accessible Lite Version</a>
      </div>

      <CameraEngine />
    </>
  );
}
