"use client";

import React from "react";
import Image from "next/image";

interface Window01ChapterProps {
  scale: number;
  portalRadius: number;
}

export default function Window01Chapter({ scale, portalRadius }: Window01ChapterProps) {
  const rasterOpacity = Math.max(0, Math.min(1, 1 - (scale - 1) / 1.2));

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none select-none overflow-hidden">
      {/* Glass Browser Window: calibrated max width and subtle depth */}
      <div
        className="w-[92vw] max-w-[780px] xl:max-w-[820px] lg:translate-x-[5%] transition-opacity duration-300 pointer-events-auto"
        style={{
          opacity: rasterOpacity,
        }}
      >
        <div className="glass-panel rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-white/15">
          {/* Browser Chrome Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-black/50 border-b border-white/10 backdrop-blur-md">
            {/* Window control dots */}
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--ark-red)] opacity-90 shadow-[0_0_6px_#FF2A1F]" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            </div>

            {/* URL bar */}
            <div className="flex items-center space-x-2 px-3.5 py-1 bg-white/5 rounded-full border border-white/10 font-mono text-[10px] text-[var(--ark-steel)] tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[var(--ark-ink)] font-semibold">actech-services.netlify.app</span>
            </div>

            {/* Region / Status Tag */}
            <div className="flex items-center space-x-2 font-mono text-[10px] text-[var(--ark-steel)] tracking-widest">
              <span className="text-[var(--ark-red)] font-bold">DUBAI</span>
              <span>•</span>
              <span>UAE</span>
            </div>
          </div>

          {/* Screenshot Preview */}
          <div className="relative w-full aspect-[16/10] bg-[#0A0D14]">
            <Image
              src="/projects/actech.webp"
              alt="AC Technical Services UAE Web Platform"
              fill
              sizes="(max-width: 1024px) 92vw, 820px"
              priority
              className="object-cover object-top"
            />
          </div>

          {/* Bottom Bar: Value Metrics & Live Action */}
          <div className="px-5 py-3.5 bg-black/70 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 backdrop-blur-md">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-[var(--ark-ink)] tracking-wider">
                MOBILE-FIRST DISPATCH
              </span>
              <span className="px-2.5 py-1 rounded bg-[var(--ark-red)]/15 border border-[var(--ark-red)]/35 font-mono text-[10px] text-[var(--ark-red)] tracking-wider font-semibold">
                DIRECT WHATSAPP CONVERSION
              </span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-[var(--ark-steel)] tracking-wider">
                GULF LOCAL SEO
              </span>
            </div>

            <a
              href="https://actech-services.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-lg bg-[var(--ark-red)] hover:bg-[#e02419] text-white font-mono text-[11px] tracking-wider font-bold transition-all shadow-[0_0_12px_rgba(255,42,31,0.3)] hover:scale-105"
            >
              <span>OPEN LIVE SITE</span>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
