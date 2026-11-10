"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Chapter } from "@/data/chapters";
import IndexModal from "./IndexModal";
import ZoomRuler from "./ZoomRuler";
import WallLabel from "./WallLabel";
import WhatsAppFloatingWidget from "./WhatsAppFloatingWidget";

interface HUDProps {
  z: number;
  currentChapter: Chapter;
  onJumpToChapter: (index: number) => void;
  onScrollToTop: () => void;
}

export default function HUD({
  z,
  currentChapter,
  onJumpToChapter,
  onScrollToTop,
}: HUDProps) {
  const [indexOpen, setIndexOpen] = useState(false);

  return (
    <>
      {/* Top Header Bar */}
      <header className="fixed top-6 sm:top-8 left-6 sm:left-10 right-6 sm:right-10 z-50 pointer-events-none flex items-center justify-between select-none">
        {/* Top-Left: ARK Mark + ARK STUDIO */}
        <div className="flex items-center space-x-3 pointer-events-auto">
          <button
            onClick={onScrollToTop}
            title="Reset to Surface (Chapter 0)"
            className="group flex items-center space-x-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ark-red)] rounded px-1.5 py-1 transition-transform"
          >
            <div className="relative w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:scale-105">
              <Image
                src="/logo/ark-mark-red-white.svg"
                alt="ARK STUDIO Mark"
                fill
                priority
                className="object-contain"
              />
            </div>
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-[var(--ark-ink)] group-hover:text-[var(--ark-red)] transition-colors">
              ARK STUDIO
            </span>
          </button>

          {/* Quick link to /lite */}
          <Link
            href="/lite"
            className="hidden md:inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 font-mono text-[10px] text-[var(--ark-steel)] hover:text-white tracking-widest uppercase transition-colors"
          >
            <span>LITE LANE</span>
          </Link>
        </div>

        {/* Top-Right: INDEX + WhatsApp Pill */}
        <div className="flex items-center space-x-3 pointer-events-auto">
          {/* INDEX Button */}
          <button
            onClick={() => setIndexOpen(true)}
            className="px-3.5 py-1.5 rounded-full glass-panel hover:bg-white/10 text-[var(--ark-ink)] font-mono text-xs tracking-[0.18em] uppercase transition-all duration-200 border border-white/15"
          >
            INDEX
          </button>

          {/* Always-visible 'Start a project' WhatsApp pill */}
          <a
            href="https://wa.me/923141495630"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[var(--ark-red)] hover:bg-[#e02419] text-white font-mono text-xs tracking-wider font-semibold transition-all duration-200 shadow-[0_0_15px_rgba(255,42,31,0.35)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="hidden sm:inline">START A PROJECT</span>
            <span className="sm:hidden">CONTACT</span>
          </a>
        </div>
      </header>

      {/* Left Edge: Live Zoom Counter & Tick Ruler */}
      <ZoomRuler z={z} onJumpToChapter={onJumpToChapter} />

      {/* Bottom-Left: Museum Wall Label */}
      <WallLabel currentChapter={currentChapter} />

      {/* Floating Direct WhatsApp Dispatch Widget */}
      <WhatsAppFloatingWidget />

      {/* Bottom-Right: Keyboard / Navigation Hint */}
      <div className="fixed bottom-6 sm:bottom-10 right-6 sm:right-10 z-40 pointer-events-none select-none hidden md:flex items-center space-x-3 text-[var(--ark-steel)] font-mono text-[10px] tracking-widest uppercase">
        <span className="flex items-center space-x-1 bg-white/5 px-2 py-1 rounded border border-white/10">
          <span>↑</span>
          <span>↓</span>
          <span className="ml-1">KEYS TO JUMP</span>
        </span>
        <span>•</span>
        <span>SCROLL TO ZOOM</span>
      </div>

      {/* Index Modal Overlay */}
      <IndexModal
        isOpen={indexOpen}
        activeChapterIndex={currentChapter.index}
        onClose={() => setIndexOpen(false)}
        onSelectChapter={onJumpToChapter}
      />
    </>
  );
}
