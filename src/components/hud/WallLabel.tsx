"use client";

import React from "react";
import { Chapter } from "@/data/chapters";

interface WallLabelProps {
  currentChapter: Chapter;
}

export default function WallLabel({ currentChapter }: WallLabelProps) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-6 sm:bottom-10 left-6 sm:left-10 z-50 pointer-events-auto select-none"
    >
      <div className="glass-panel px-4 py-2.5 rounded-lg border border-white/10 max-w-[280px] sm:max-w-md backdrop-blur-md">
        {/* Wall label museum classification */}
        <div className="flex items-center space-x-2 text-[var(--ark-red)] font-mono text-[10px] tracking-[0.2em] uppercase font-bold mb-1">
          <span>{currentChapter.fig}</span>
          <span className="text-white/30">•</span>
          <span className="text-[var(--ark-ink)] truncate">{currentChapter.title}</span>
        </div>

        {/* Medium & Origin */}
        <div className="font-mono text-[9px] sm:text-[10px] text-[var(--ark-steel)] tracking-[0.14em] uppercase flex flex-wrap items-center gap-x-2">
          <span className="text-white/70">{currentChapter.medium}</span>
          <span className="text-white/30">/</span>
          <span>{currentChapter.place}</span>
        </div>
      </div>
    </div>
  );
}
