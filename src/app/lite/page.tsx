"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CHAPTERS } from "@/data/chapters";

const PROJECT_TYPES = [
  "Bilingual Web Design (EN/AR)",
  "Next.js High-Performance Rebuild",
  "Commercial Lead-Gen Platform",
  "Brand Identity & Posters",
];

const BUDGET_TIERS = [
  "Under $1,500",
  "$1,500 – $3,000",
  "$3,000 – $6,000",
  "Enterprise / Custom",
];

export default function LitePage() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [selectedType, setSelectedType] = useState(PROJECT_TYPES[0]);
  const [selectedBudget, setSelectedBudget] = useState(BUDGET_TIERS[1]);
  const [details, setDetails] = useState("");

  const email = "ark203777@gmail.com";
  const whatsappNumber = "923141495630";
  const whatsappDisplay = "+92 314 1495630";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2600);
  };

  const handleWhatsAppInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const message = [
      `*PROJECT INQUIRY — ARK STUDIO (FAST LANE)*`,
      `---------------------------------`,
      `*Client:* ${name.trim()}`,
      `*Project Type:* ${selectedType}`,
      `*Budget Bracket:* ${selectedBudget}`,
      `*Brief:* ${details.trim() || "Ready to discuss scope & timeline."}`,
      `---------------------------------`,
    ].join("\n");

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[var(--ark-void)] text-[var(--ark-ink)] selection:bg-[var(--ark-red)] selection:text-black font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-white/10 px-4 sm:px-10 py-3.5 flex items-center justify-between backdrop-blur-xl">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="relative w-6 h-6 sm:w-7 sm:h-7">
              <Image
                src="/logo/ark-mark-red-white.svg"
                alt="ARK STUDIO"
                fill
                priority
                className="object-contain"
              />
            </div>
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-[var(--ark-ink)]">
              ARK STUDIO
            </span>
          </Link>
          <span className="hidden md:inline-block font-mono text-[9px] text-[var(--ark-steel)] tracking-widest uppercase border-l border-white/20 pl-3">
            FAST LANE ARCHIVE
          </span>
        </div>

        <div className="flex items-center space-x-2.5">
          <Link
            href="/"
            className="px-3 sm:px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] sm:text-xs tracking-wider uppercase transition-colors whitespace-nowrap"
          >
            <span className="hidden sm:inline">EXPLORE 3D ZOOM</span>
            <span className="sm:hidden">3D ZOOM ↗</span>
          </Link>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[var(--ark-red)] hover:bg-[#e02419] text-white font-mono text-[11px] sm:text-xs tracking-wider font-bold transition-all shadow-[0_0_15px_rgba(255,42,31,0.4)] whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>WHATSAPP</span>
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 md:px-12 py-12 sm:py-20 space-y-24 sm:space-y-32">
        {/* HERO / VALUE PROPOSITION */}
        <section id="chapter-0" className="pt-4 space-y-6">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--ark-steel)] tracking-[0.2em] uppercase">
            <span className="text-[var(--ark-red)] font-bold whitespace-nowrap">{CHAPTERS[0].fig}</span>
            <span>•</span>
            <span className="whitespace-nowrap">{CHAPTERS[0].subtitle}</span>
            <span>•</span>
            <span className="whitespace-nowrap">{CHAPTERS[0].place}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl text-[var(--ark-ink)] tracking-tight leading-[1.05]">
            Look <em className="italic text-[var(--ark-red)] not-italic-font">closer.</em>
          </h1>

          <p className="font-sans text-lg sm:text-2xl text-[var(--ark-steel)] max-w-2xl leading-relaxed">
            I&apos;m Abdulrehman Khalid. I design and build fast, mobile-first websites in English and Arabic for ambitious businesses in Saudi Arabia, the UAE, and Pakistan.
          </p>

          {/* Value proposition badges */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            <span className="px-3 py-1.5 rounded-lg glass-panel border-white/10 font-mono text-[11px] text-[var(--ark-ink)] tracking-wider">
              ✦ SUB-SECOND PERFORMANCE
            </span>
            <span className="px-3 py-1.5 rounded-lg glass-panel border-[var(--ark-red)]/30 text-[var(--ark-red)] font-mono text-[11px] tracking-wider font-semibold">
              ✦ BILINGUAL EN / AR ARABIC RTL
            </span>
            <span className="px-3 py-1.5 rounded-lg glass-panel border-white/10 font-mono text-[11px] text-[var(--ark-ink)] tracking-wider">
              ✦ WHATSAPP CONVERSION ENGINES
            </span>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-3.5">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-[var(--ark-red)] text-white font-mono text-xs tracking-wider uppercase font-bold hover:bg-[#e02419] transition-all shadow-[0_0_20px_rgba(255,42,31,0.4)]"
            >
              <span>DISCUSS YOUR PROJECT ON WHATSAPP</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl glass-panel hover:bg-white/10 text-white font-mono text-xs tracking-wider uppercase transition-all border border-white/15"
            >
              <span>EXPERIENCE 3D INFINITE ZOOM</span>
            </Link>
          </div>
        </section>

        {/* WHY BUSINESS OWNERS HIRE ARK STUDIO */}
        <section className="glass-panel rounded-2xl p-6 sm:p-10 border border-white/15 space-y-6">
          <div className="font-mono text-xs text-[var(--ark-red)] tracking-[0.25em] uppercase font-bold">
            EXECUTIVE ADVANTAGES • WHY WORK WITH ME
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <span className="font-mono text-lg font-bold text-white block">01 / Speed</span>
              <p className="text-xs text-[var(--ark-steel)] leading-relaxed">
                Next.js App Router engineering tuned for 95+ Google Lighthouse scores and zero layout shift.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-lg font-bold text-[#F5A623] block">02 / Dual-Lingual</span>
              <p className="text-xs text-[var(--ark-steel)] leading-relaxed">
                Native Arabic typography and seamless RTL layout logic built for Gulf consumers and search engines.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-lg font-bold text-emerald-400 block">03 / Lead Generation</span>
              <p className="text-xs text-[var(--ark-steel)] leading-relaxed">
                Instant WhatsApp quote flows and mobile actions that turn cold visitors into immediate conversations.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-lg font-bold text-[var(--ark-red)] block">04 / Direct Maker</span>
              <p className="text-xs text-[var(--ark-steel)] leading-relaxed">
                Zero agency bureaucracy. You communicate directly with the designer and builder from day one.
              </p>
            </div>
          </div>
        </section>

        {/* CHAPTER 1: THE MAKER */}
        <section id="chapter-1" className="glass-panel rounded-2xl p-6 sm:p-10 border border-white/15 space-y-8">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--ark-steel)] tracking-[0.2em] uppercase">
            <span className="text-[var(--ark-red)] font-bold">{CHAPTERS[1].fig}</span>
            <span>•</span>
            <span>{CHAPTERS[1].title}</span>
            <span>•</span>
            <span>{CHAPTERS[1].place}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-3xl sm:text-4xl text-[var(--ark-ink)] leading-tight">
                Designer and developer, in <em className="italic text-[var(--ark-red)] not-italic-font">one person.</em>
              </h2>
              <p className="text-sm sm:text-base text-[var(--ark-steel)] leading-relaxed">
                {CHAPTERS[1].body}
              </p>

              <div className="space-y-3">
                <span className="font-mono text-xs text-[var(--ark-steel)] uppercase tracking-wider block">
                  CORE DISCIPLINES &amp; TOOLING
                </span>
                <div className="flex flex-wrap gap-2">
                  {CHAPTERS[1].skills?.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 font-mono text-xs text-[var(--ark-ink)] tracking-wider"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
              <Image
                src="/images/portrait-cutout.png"
                alt="Abdulrehman Khalid — Maker"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain filter grayscale contrast-125"
              />
            </div>
          </div>
        </section>

        {/* CHAPTER 2: THE ARC (REGIONAL REACH) */}
        <section id="chapter-2" className="glass-panel rounded-2xl p-6 sm:p-10 border border-white/15 space-y-8">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--ark-steel)] tracking-[0.2em] uppercase">
            <span className="text-[var(--ark-red)] font-bold">{CHAPTERS[2].fig}</span>
            <span>•</span>
            <span>{CHAPTERS[2].title}</span>
            <span>•</span>
            <span>{CHAPTERS[2].place}</span>
          </div>

          <div className="space-y-4 max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-4xl text-[var(--ark-ink)]">
              Built in Sargodha. <em className="italic text-[var(--ark-red)] not-italic-font">Delivered</em> worldwide.
            </h2>
            <p className="text-sm sm:text-base text-[var(--ark-steel)] leading-relaxed">
              {CHAPTERS[2].body}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            {CHAPTERS[2].hubs?.map((hub) => (
              <div
                key={hub.name}
                className={`p-4 rounded-xl border ${
                  hub.name === "Sargodha"
                    ? "bg-[var(--ark-red)]/10 border-[var(--ark-red)]/40"
                    : "glass-panel border-white/10"
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      hub.name === "Sargodha" ? "bg-[var(--ark-red)] animate-pulse" : "bg-emerald-400"
                    }`}
                  />
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    {hub.name}
                  </span>
                </div>
                <div className="font-mono text-[10px] text-[var(--ark-steel)] tracking-widest uppercase mb-2">
                  {hub.country}
                </div>
                <p className="font-sans text-xs text-[var(--ark-steel)]">
                  {hub.role}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CHAPTER 3: AC TECHNICAL SERVICES */}
        <section id="chapter-3" className="glass-panel rounded-2xl p-6 sm:p-10 border border-white/15 space-y-6">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--ark-steel)] tracking-[0.2em] uppercase">
            <span className="text-[var(--ark-red)] font-bold">{CHAPTERS[3].fig}</span>
            <span>•</span>
            <span>{CHAPTERS[3].title}</span>
            <span>•</span>
            <span>{CHAPTERS[3].place}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[var(--ark-ink)]">
                AC Technical Services (Dubai, UAE)
              </h2>
              <p className="text-sm sm:text-base text-[var(--ark-steel)] max-w-xl mt-2 leading-relaxed">
                {CHAPTERS[3].body}
              </p>
            </div>
            <a
              href="https://actech-services.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[var(--ark-red)] hover:bg-[#e02419] text-white font-mono text-xs tracking-wider uppercase font-bold self-start md:self-auto shadow-[0_0_15px_rgba(255,42,31,0.3)] transition-all"
            >
              <span>OPEN LIVE SITE</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
            <Image
              src="/projects/actech.webp"
              alt="AC Technical Services"
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover object-top"
            />
          </div>
        </section>

        {/* CHAPTER 4: BOOM TRUCK RENTAL */}
        <section id="chapter-4" className="glass-panel rounded-2xl p-6 sm:p-10 border border-white/15 space-y-6">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--ark-steel)] tracking-[0.2em] uppercase">
            <span className="text-[var(--ark-red)] font-bold">{CHAPTERS[4].fig}</span>
            <span>•</span>
            <span>{CHAPTERS[4].title}</span>
            <span>•</span>
            <span>{CHAPTERS[4].place}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[var(--ark-ink)]">
                Boom Truck Rental (Dammam, KSA)
              </h2>
              <p className="text-sm sm:text-base text-[var(--ark-steel)] max-w-xl mt-2 leading-relaxed">
                {CHAPTERS[4].body}
              </p>
            </div>
            <a
              href="https://miansaqib.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#F5A623] hover:bg-[#e09419] text-black font-mono text-xs tracking-wider uppercase font-bold self-start md:self-auto shadow-[0_0_15px_rgba(245,166,35,0.3)] transition-all"
            >
              <span>OPEN LIVE SITE</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
            <Image
              src="/projects/miansaqib.webp"
              alt="Boom Truck Rental"
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover object-top"
            />
          </div>
        </section>

        {/* CHAPTER 5: ARK FAST FOODIES */}
        <section id="chapter-5" className="glass-panel rounded-2xl p-6 sm:p-10 border border-white/15 space-y-6">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--ark-steel)] tracking-[0.2em] uppercase">
            <span className="text-[var(--ark-red)] font-bold">{CHAPTERS[5].fig}</span>
            <span>•</span>
            <span>{CHAPTERS[5].title}</span>
            <span>•</span>
            <span>{CHAPTERS[5].place}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[var(--ark-ink)]">
                ARK Fast Foodies (Branding &amp; Posters)
              </h2>
              <p className="text-sm sm:text-base text-[var(--ark-steel)] max-w-xl mt-2 leading-relaxed">
                {CHAPTERS[5].body}
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-[var(--ark-red)]/15 border border-[var(--ark-red)]/40 font-mono text-xs text-[var(--ark-red)] tracking-wider self-start md:self-auto font-semibold">
              CASE STUDY IN PROGRESS
            </span>
          </div>

          <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
            <Image
              src="/projects/fast-foodies.webp"
              alt="ARK Fast Foodies Posters"
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
            />
          </div>
        </section>

        {/* CHAPTER 6: INQUIRY CONSOLE */}
        <section id="chapter-6" className="glass-panel rounded-2xl p-6 sm:p-10 border border-white/15 space-y-8">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--ark-steel)] tracking-[0.2em] uppercase">
            <span className="text-[var(--ark-red)] font-bold">{CHAPTERS[6].fig}</span>
            <span>•</span>
            <span>THE NEXT PIXEL</span>
            <span>•</span>
            <span>START A PROJECT</span>
          </div>

          <div className="max-w-2xl space-y-3">
            <h2 className="font-serif text-3xl sm:text-5xl text-[var(--ark-ink)]">
              The next pixel is <em className="italic text-[var(--ark-red)] not-italic-font">yours.</em>
            </h2>
            <p className="text-base text-[var(--ark-steel)] leading-relaxed">
              Ready to elevate your digital presence? Send a quick brief below or connect directly on WhatsApp. Typical response within 15 minutes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-[var(--ark-red)] hover:bg-[#e02419] text-white font-mono text-xs tracking-wider uppercase font-bold transition-all shadow-[0_0_20px_rgba(255,42,31,0.4)]"
            >
              <span>MESSAGE ON WHATSAPP ({whatsappDisplay})</span>
            </a>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl glass-panel hover:bg-white/10 text-white font-mono text-xs tracking-wider uppercase transition-all border border-white/15"
            >
              <span>{copied ? "✓ COPIED TO CLIPBOARD" : email}</span>
            </button>
          </div>

          {/* Form */}
          <div className="pt-8 border-t border-white/10 max-w-xl">
            <div className="flex items-center justify-between pb-3 mb-4">
              <h3 className="font-mono text-xs text-[var(--ark-ink)] uppercase tracking-widest font-bold">
                WHATSAPP PROJECT DISPATCH
              </h3>
              <span className="text-[10px] text-emerald-400 font-mono tracking-wider">
                ● ONLINE
              </span>
            </div>

            <form onSubmit={handleWhatsAppInquiry} className="space-y-4">
              <div>
                <label className="block font-mono text-[11px] text-[var(--ark-steel)] uppercase tracking-wider mb-1.5">
                  Your Name &amp; Business *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tariq Al-Mansoor"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-[var(--ark-red)]"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-[var(--ark-steel)] uppercase tracking-wider mb-1.5">
                  Project Type *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PROJECT_TYPES.map((pt) => (
                    <button
                      key={pt}
                      type="button"
                      onClick={() => setSelectedType(pt)}
                      className={`px-3 py-2 rounded-lg font-mono text-[10px] text-left transition-all ${
                        selectedType === pt
                          ? "bg-[var(--ark-red)] text-white font-bold"
                          : "bg-white/5 hover:bg-white/10 border border-white/10 text-[var(--ark-steel)]"
                      }`}
                    >
                      {pt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] text-[var(--ark-steel)] uppercase tracking-wider mb-1.5">
                  Target Budget
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {BUDGET_TIERS.map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setSelectedBudget(tier)}
                      className={`px-2.5 py-1.5 rounded-lg font-mono text-[10px] text-center transition-all ${
                        selectedBudget === tier
                          ? "bg-white/20 text-white font-bold border border-white/40"
                          : "bg-white/5 hover:bg-white/10 border border-white/10 text-[var(--ark-steel)]"
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] text-[var(--ark-steel)] uppercase tracking-wider mb-1.5">
                  Project Brief
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Key goals, timeline, or current site URL..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-[var(--ark-red)] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[var(--ark-red)] hover:bg-[#e02419] text-white font-mono text-xs tracking-widest uppercase font-bold transition-all shadow-[0_0_20px_rgba(255,42,31,0.35)]"
              >
                DISPATCH BRIEF TO WHATSAPP
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[var(--ark-steel)] font-mono text-xs gap-4">
          <div>
            © 2026 ARK STUDIO / Abdulrehman Khalid. Sargodha, Pakistan.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/" className="hover:text-[var(--ark-red)] transition-colors">
              Infinite Zoom 3D
            </Link>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--ark-red)] transition-colors"
            >
              WhatsApp Direct
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
