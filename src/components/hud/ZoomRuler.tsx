"use client";

import React from "react";
import { CHAPTERS, TOTAL_CHAPTERS } from "@/data/chapters";

interface ZoomRulerProps {
  z: number;
  onJumpToChapter: (index: number) => void;
}

export default function ZoomRuler({ z, onJumpToChapter }: ZoomRulerProps) {
  // Format 10^z nicely
  const currentZoomVal = Math.round(Math.pow(10, z));
  const formattedZoom = currentZoomVal >= 1000 ? currentZoomVal.toLocaleString() : currentZoomVal;

  return (
    <aside
      aria-label="Zoom Scale Ruler"
      className="fixed left-6 sm:left-10 top-1/2 -translate-y-1/2 z-50 pointer-events-auto flex items-center space-x-3 select-none"
    >
      {/* Vertical Tick Ruler */}
      <div className="relative flex flex-col items-center justify-between h-48 sm:h-56 py-1">
        {/* Subtle background ruler axis line */}
        <div className="absolute left-[3px] top-0 bottom-0 w-px bg-white/15" />

        {/* Dynamic active indicator along ruler */}
        <div
          className="absolute left-0 w-2 h-2 -translate-x-[2px] rounded-full bg-[var(--ark-red)] shadow-[0_0_10px_#FF2A1F] transition-all duration-75 pointer-events-none"
          style={{
            top: `${(z / (TOTAL_CHAPTERS - 1)) * 100}%`,
            transform: "translate(-2px, -50%)",
          }}
        />

        {/* Ticks for each chapter */}
        {CHAPTERS.map((chap) => {
          const isActive = Math.round(z) === chap.index;
          return (
            <button
              key={chap.id}
              onClick={() => onJumpToChapter(chap.index)}
              title={`Jump to ${chap.fig}: ${chap.title} (${chap.zoomDisplay})`}
              className="group relative flex items-center focus:outline-none py-1"
            >
              {/* Tick line */}
              <span
                className={`block h-px transition-all duration-200 ${
                  isActive
                    ? "w-4 bg-[var(--ark-red)]"
                    : "w-2.5 bg-white/30 group-hover:w-3.5 group-hover:bg-white/70"
                }`}
              />

              {/* Hover tooltip label */}
              <span className="absolute left-6 hidden group-hover:inline-block whitespace-nowrap font-mono text-[9px] text-[var(--ark-ink)] bg-black/80 px-2 py-0.5 rounded border border-white/10 tracking-widest uppercase">
                {chap.fig} • {chap.zoomDisplay}
              </span>
            </button>
          );
        })}
      </div>

      {/* Live Zoom Multiplier Counter */}
      <div className="flex flex-col">
        <span className="font-mono text-[9px] text-[var(--ark-steel)] tracking-[0.2em] uppercase">
          SCALE
        </span>
        <span className="font-mono text-xs sm:text-sm font-bold text-[var(--ark-ink)] tracking-wider">
          x{formattedZoom}
        </span>
      </div>
    </aside>
  );
}
