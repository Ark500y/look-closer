"use client";

import React, { useState } from "react";

interface PixelChapterProps {
  scale: number;
  onScrollToTop?: () => void;
}

const PROJECT_TYPES = [
  "Bilingual Web Design (EN/AR)",
  "Next.js High-Performance Site",
  "Commercial Lead-Gen Platform",
  "Brand Identity & Posters",
];

const BUDGET_TIERS = [
  "Under $1,500",
  "$1,500 – $3,000",
  "$3,000 – $6,000",
  "Enterprise / Custom",
];

export default function PixelChapter({ scale, onScrollToTop }: PixelChapterProps) {
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
      `*PROJECT INQUIRY — ARK STUDIO*`,
      `---------------------------------`,
      `*Client:* ${name.trim()}`,
      `*Project Type:* ${selectedType}`,
      `*Budget Bracket:* ${selectedBudget}`,
      `*Project Brief:* ${details.trim() || "Ready to discuss requirements."}`,
      `---------------------------------`,
      `Sent via LOOK CLOSER terminal.`,
    ].join("\n");

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank");
  };

  const pixelResolvedFactor = Math.min(1, Math.max(0, scale));

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-auto select-none overflow-y-auto px-4 py-16 sm:py-20 z-50">
      <div className="relative w-full max-w-3xl mx-auto flex flex-col items-center text-center my-auto">
        {/* 1. The Monolithic Resolving 1:1 Red Pixel */}
        <div className="relative mb-6 group">
          {/* Ambient red breathing glow */}
          <div className="absolute -inset-8 bg-[var(--ark-red)] opacity-30 blur-2xl rounded-full pointer-events-none animate-pulse" />

          {/* Central 1:1 Pixel Box */}
          <div
            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-sm flex flex-col items-center justify-center transition-all duration-700 shadow-[0_0_45px_rgba(255,42,31,0.65)]"
            style={{
              backgroundColor: "#FF2A1F",
              transform: `scale(${0.75 + pixelResolvedFactor * 0.25})`,
            }}
          >
            <div className="absolute inset-1.5 border border-white/35 pointer-events-none" />
            <span className="font-mono text-[10px] font-bold text-white tracking-[0.25em] uppercase">
              1:1 PIXEL
            </span>
            <span className="font-mono text-[8px] text-white/80 tracking-widest mt-0.5">
              ATOMIC SCALE
            </span>
          </div>

          <div className="mt-3 font-mono text-[10px] text-[var(--ark-steel)] tracking-[0.25em] uppercase">
            TERMINUS • 1,000,000x CLOSER
          </div>
        </div>

        {/* 2. Main Executive Headline & Value Proposition */}
        <div className="max-w-2xl mb-8">
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[var(--ark-ink)] tracking-tight leading-[1.08] mb-4">
            You&apos;re x1,000,000 closer. The next pixel is{" "}
            <em className="italic text-[var(--ark-red)] not-italic-font">yours.</em>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[var(--ark-steel)] leading-relaxed max-w-xl mx-auto">
            I design and build fast, mobile-first websites in English and Arabic for ambitious businesses in Saudi Arabia, the UAE, and Pakistan. No generic themes. Pure bespoke craft with direct commercial impact.
          </p>

          {/* Trust proof ribbon */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] text-[var(--ark-steel)] tracking-wider uppercase">
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-white">AVAILABLE FOR Q1/Q2 PROJECTS</span>
            </span>
            <span>•</span>
            <span>2–3 WEEKS DISPATCH</span>
            <span>•</span>
            <span>BILINGUAL EN / AR ARABIC RTL</span>
          </div>
        </div>

        {/* 3. Direct Fast Contact CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-8 w-full max-w-lg">
          {/* WhatsApp Primary Button */}
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[220px] inline-flex items-center justify-center space-x-3 px-6 py-3.5 rounded-xl bg-[var(--ark-red)] hover:bg-[#e02419] text-white font-mono text-xs tracking-wider font-bold transition-all duration-200 shadow-[0_0_25px_rgba(255,42,31,0.4)] hover:shadow-[0_0_35px_rgba(255,42,31,0.7)] hover:scale-[1.02]"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span>START A PROJECT ON WHATSAPP</span>
          </a>

          {/* Email Copy Pill */}
          <button
            onClick={handleCopyEmail}
            className="flex-1 min-w-[200px] inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-xl glass-panel hover:bg-white/10 text-[var(--ark-ink)] font-mono text-xs tracking-wider transition-all duration-200 border border-white/15"
          >
            <svg className="w-4 h-4 text-[var(--ark-steel)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>{copied ? "✓ COPIED EMAIL TO CLIPBOARD" : email}</span>
          </button>
        </div>

        {/* 4. Executive WhatsApp Dispatch Console */}
        <div className="w-full max-w-xl glass-panel rounded-2xl p-6 sm:p-7 text-left border border-white/15 shadow-2xl mb-8 backdrop-blur-2xl">
          <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-white/10">
            <div>
              <span className="font-mono text-xs text-[var(--ark-ink)] tracking-widest uppercase font-bold block">
                PROJECT DISPATCH CONSOLE
              </span>
              <span className="font-mono text-[9px] text-[var(--ark-steel)] tracking-wider">
                PRE-FORMATTED BRIEF DISPATCHED STRAIGHT TO WHATSAPP
              </span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[9px] tracking-wider uppercase">
              NO SIGNUP REQUIRED
            </span>
          </div>

          <form onSubmit={handleWhatsAppInquiry} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block font-mono text-[10px] text-[var(--ark-steel)] uppercase tracking-wider mb-1.5">
                Your Name &amp; Company *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tariq Al-Mansoor (Al-Mansoor Logistics)"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-[var(--ark-red)] focus:ring-1 focus:ring-[var(--ark-red)] transition-all"
              />
            </div>

            {/* Project Type Select Pills */}
            <div>
              <label className="block font-mono text-[10px] text-[var(--ark-steel)] uppercase tracking-wider mb-1.5">
                Select Project Scope *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PROJECT_TYPES.map((pt) => {
                  const isSelected = selectedType === pt;
                  return (
                    <button
                      key={pt}
                      type="button"
                      onClick={() => setSelectedType(pt)}
                      className={`px-3 py-2 rounded-lg font-mono text-[10px] tracking-wider text-left transition-all ${
                        isSelected
                          ? "bg-[var(--ark-red)] text-white font-bold shadow-[0_0_12px_rgba(255,42,31,0.3)]"
                          : "bg-white/5 hover:bg-white/10 border border-white/10 text-[var(--ark-steel)]"
                      }`}
                    >
                      {pt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget Tier Pills */}
            <div>
              <label className="block font-mono text-[10px] text-[var(--ark-steel)] uppercase tracking-wider mb-1.5">
                Target Investment (USD)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {BUDGET_TIERS.map((tier) => {
                  const isSelected = selectedBudget === tier;
                  return (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setSelectedBudget(tier)}
                      className={`px-2.5 py-1.5 rounded-lg font-mono text-[10px] tracking-wider text-center transition-all ${
                        isSelected
                          ? "bg-white/20 text-white font-bold border border-white/40"
                          : "bg-white/5 hover:bg-white/10 border border-white/10 text-[var(--ark-steel)]"
                      }`}
                    >
                      {tier}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Details */}
            <div>
              <label className="block font-mono text-[10px] text-[var(--ark-steel)] uppercase tracking-wider mb-1.5">
                Key Objectives or Timeline
              </label>
              <textarea
                rows={2}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Briefly describe your requirements or existing website..."
                className="w-full px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-[var(--ark-red)] resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[var(--ark-red)] hover:bg-[#e02419] text-white font-mono text-xs tracking-widest uppercase font-bold transition-all duration-200 flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(255,42,31,0.4)]"
            >
              <span>SEND BRIEF VIA WHATSAPP</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>

        {/* 5. Back to Surface & Studio Footnote */}
        <div className="flex flex-col items-center space-y-3 pb-6">
          <button
            onClick={onScrollToTop}
            className="group inline-flex items-center space-x-2 px-5 py-2 rounded-full border border-white/20 hover:border-[var(--ark-red)] text-[var(--ark-steel)] hover:text-white font-mono text-xs tracking-widest uppercase transition-all"
          >
            <svg className="w-3.5 h-3.5 transform group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span>RETURN TO SURFACE (ZOOM x1)</span>
          </button>

          <p className="font-mono text-[10px] text-[var(--ark-steel)] tracking-widest uppercase">
            © 2026 ARK STUDIO / Abdulrehman Khalid. Sargodha, Pakistan.
          </p>
        </div>
      </div>
    </div>
  );
}
