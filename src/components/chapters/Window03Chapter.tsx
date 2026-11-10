"use client";

import React from "react";
import Image from "next/image";

interface Window03ChapterProps {
  scale: number;
  portalRadius: number;
}

export default function Window03Chapter({ scale, portalRadius }: Window03ChapterProps) {
  const rasterOpacity = Math.max(0, Math.min(1, 1 - (scale - 1) / 1.2));

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none select-none overflow-hidden">
      {/* Poster Wall Exhibition Display */}
      <div
        className="w-[94vw] max-w-[880px] xl:max-w-[940px] lg:translate-x-[5%] transition-opacity duration-300 pointer-events-auto"
        style={{
          opacity: rasterOpacity,
        }}
      >
        <div className="relative group">
          {/* Ambient warm glow behind poster wall */}
          <div className="absolute -inset-8 bg-gradient-to-r from-orange-600/15 via-red-600/20 to-amber-600/15 rounded-3xl blur-3xl opacity-50 pointer-events-none" />

          {/* Exhibition Frame / Hanging Wire Header */}
          <div className="mb-3 flex items-center justify-between px-2">
            <div className="flex items-center space-x-3">
              <span className="font-mono text-[11px] text-[var(--ark-red)] tracking-[0.2em] uppercase font-bold">
                POSTER GALLERY &amp; BRAND SYSTEM
              </span>
              <span className="h-3 w-px bg-white/20" />
              <span className="font-mono text-[10px] text-[var(--ark-steel)] tracking-widest">
                SERIES 01-03
              </span>
            </div>

            <div className="px-3 py-1 rounded-full bg-[var(--ark-red)]/15 border border-[var(--ark-red)]/40 font-mono text-[10px] text-[var(--ark-red)] tracking-wider font-semibold">
              CASE STUDY IN PROGRESS
            </div>
          </div>

          {/* Poster Wall Collage */}
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden glass-panel border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
            <Image
              src="/projects/fast-foodies.webp"
              alt="ARK Fast Foodies Poster Wall and Visual Identity"
              fill
              sizes="(max-width: 1024px) 94vw, 940px"
              priority
              className="object-cover"
            />
          </div>

          {/* Wall Placard Footer */}
          <div className="mt-3 flex items-center justify-between px-2 text-[var(--ark-steel)] font-mono text-[10px] tracking-wider">
            <span>PACKAGING • SOCIAL CAMPAIGNS • VECTOR TYPOGRAPHY</span>
            <span>SARGODHA, PAKISTAN</span>
          </div>
        </div>
      </div>
    </div>
  );
}
