"use client";

import React from "react";
import { Chapter } from "@/data/chapters";

interface TextOverlayProps {
  chapter: Chapter;
  z: number;
  velocity: number;
}

export default function TextOverlay({ chapter, z, velocity }: TextOverlayProps) {
  const i = chapter.index;
  const isFirst = i === 0;

  // Calculate opacity, translateY, and blur based on z
  let opacity = 0;
  let translateY = 0;
  let blur = 0;

  if (isFirst && z <= 0) {
    opacity = 1;
    translateY = 0;
    blur = 0;
  } else if (z >= i - 0.3 && z <= i) {
    const p = (z - (i - 0.3)) / 0.3; // 0 to 1
    opacity = Math.max(0, Math.min(1, p));
    translateY = (1 - p) * 20;
    blur = (1 - p) * 5;
  } else if (z > i && z <= i + 0.35) {
    const q = (z - i) / 0.35; // 0 to 1
    opacity = Math.max(0, Math.min(1, 1 - q));
    translateY = -q * 24;
    blur = q * 6;
  } else {
    opacity = 0;
  }

  if (opacity <= 0.005) return null;

  // Velocity for chromatic aberration on headlines (resets cleanly to 0 at rest)
  const normVel = Math.min(Math.abs(velocity || 0) / 450, 1.4);

  // Render Headline with optional italic key word
  const renderHeadline = () => {
    const word = chapter.headlineItalicWord;
    if (!word) {
      return chapter.headline;
    }
    const parts = chapter.headline.split(word);
    if (parts.length < 2) return chapter.headline;

    return (
      <>
        {parts[0]}
        <em className="italic font-serif text-[var(--ark-red)] not-italic-word font-normal">
          {word}
        </em>
        {parts[1]}
      </>
    );
  };

  const isProjectChapter = i >= 3 && i <= 5;
  const whatsappNumber = "923141495630";

  return (
    <div
      className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-10 md:p-14 z-40 transition-opacity duration-150"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        filter: blur > 0.2 ? `blur(${blur}px)` : "none",
        "--velocity-split": normVel,
      } as React.CSSProperties}
    >
      {/* Editorial Text Placement */}
      <div className={`pt-12 sm:pt-14 ${isProjectChapter ? "w-full max-w-[280px] sm:max-w-[310px] xl:max-w-[340px]" : "max-w-xl"}`}>
        {/* Curated Project Plaque container for Chapters 3, 4, 5 */}
        <div className={isProjectChapter ? "glass-panel rounded-2xl p-4 sm:p-5 border border-white/15 shadow-2xl backdrop-blur-xl pointer-events-auto bg-[#050505]/90" : ""}>
          {/* Chapter taxonomy */}
          <div className="flex items-center space-x-2 mb-2 font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--ark-steel)]">
            <span className="text-[var(--ark-red)] font-bold whitespace-nowrap">{chapter.fig}</span>
            <span className="h-2 w-px bg-white/20 flex-shrink-0" />
            <span className="truncate">{chapter.subtitle}</span>
          </div>

          {/* Headline */}
          {chapter.index === 0 ? (
            <h1 className="chromatic-aberration font-serif text-4xl sm:text-6xl md:text-7xl text-[var(--ark-ink)] tracking-tight leading-[1.04] mb-3">
              {renderHeadline()}
            </h1>
          ) : (
            <h2 className={`chromatic-aberration font-serif text-[var(--ark-ink)] tracking-tight leading-[1.08] mb-2 ${
              isProjectChapter ? "text-2xl sm:text-3xl" : "text-3xl sm:text-5xl md:text-6xl"
            }`}>
              {renderHeadline()}
            </h2>
          )}

          {/* Body Copy */}
          <p className="font-sans text-xs sm:text-sm text-[var(--ark-steel)] leading-relaxed">
            {chapter.body}
          </p>

          {/* Business Impact Metric for Projects */}
          {isProjectChapter && chapter.businessImpact && (
            <div className="mt-3 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] tracking-wide flex items-start space-x-1.5">
              <span className="font-bold flex-shrink-0">ROI:</span>
              <span>{chapter.businessImpact}</span>
            </div>
          )}

          {/* Value Badges & Conversion CTAs for Projects */}
          {isProjectChapter && (
            <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {chapter.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[9px] text-[var(--ark-ink)] tracking-wider uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Direct Project Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                {chapter.url && (
                  <a
                    href={chapter.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center space-x-1 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-[10px] tracking-wider uppercase transition-colors"
                  >
                    <span>LIVE SITE</span>
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                )}
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(chapter.projectWhatsAppPrompt || "Hello Abdulrehman, I'd like to discuss a project.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center space-x-1 px-2.5 py-1.5 rounded-lg bg-[var(--ark-red)] hover:bg-[#e02419] text-white font-mono text-[10px] tracking-wider uppercase font-bold transition-all shadow-[0_0_10px_rgba(255,42,31,0.4)]"
                >
                  <span>BUILD SIMILAR ➔</span>
                </a>
              </div>
            </div>
          )}

          {/* Chapter 0 Call to Action & Hint */}
          {chapter.index === 0 && (
            <div className="mt-5 space-y-3 pointer-events-auto">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Abdulrehman, I'd like to discuss building a website for my business.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[var(--ark-red)] hover:bg-[#e02419] text-white font-mono text-xs tracking-wider uppercase font-bold transition-all shadow-[0_0_18px_rgba(255,42,31,0.4)]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>START A PROJECT ON WHATSAPP</span>
                </a>
                <a
                  href="/lite"
                  className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl glass-panel hover:bg-white/10 text-[var(--ark-ink)] font-mono text-xs tracking-wider uppercase transition-all"
                >
                  <span>EXECUTIVE OVERVIEW ➔</span>
                </a>
              </div>

              <div className="flex items-center space-x-2 text-[var(--ark-steel)] font-mono text-[11px] tracking-[0.2em] uppercase pt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--ark-red)]" />
                <span>SCROLL TO ENTER 3D EXHIBITION</span>
                <svg className="w-3.5 h-3.5 animate-bounce text-[var(--ark-red)] ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom spacer for museum label */}
      <div className="h-16" />
    </div>
  );
}
