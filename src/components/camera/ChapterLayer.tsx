"use client";

import React from "react";
import { Chapter } from "@/data/chapters";
import VoidChapter from "@/components/chapters/VoidChapter";
import MakerChapter from "@/components/chapters/MakerChapter";
import ArcChapter from "@/components/chapters/ArcChapter";
import Window01Chapter from "@/components/chapters/Window01Chapter";
import Window02Chapter from "@/components/chapters/Window02Chapter";
import Window03Chapter from "@/components/chapters/Window03Chapter";
import PixelChapter from "@/components/chapters/PixelChapter";

interface ChapterLayerProps {
  chapter: Chapter;
  z: number;
  velocity: number;
  portalRadius: number; // radius in px at scale 1
  zIndex: number;
  onScrollToTop?: () => void;
}

export default function ChapterLayer({
  chapter,
  z,
  velocity,
  portalRadius,
  zIndex,
  onScrollToTop,
}: ChapterLayerProps) {
  const i = chapter.index;
  const isLast = i === 6;

  // Exponential scale: s_i = 10^(z - i)
  const scale = Math.pow(10, z - i);

  // If chapter is far zoomed past (> 10x) or too deep (< 0.008x), clamp/hide
  if (scale > 12 || scale < 0.005) {
    return null;
  }

  // Counter-scaled stroke width to maintain 1px hairline on screen
  const hairlineStroke = 1 / Math.max(scale, 0.05);

  // Mask styling: creates the clear circular hole at screen centre that scales with the chapter
  // The last chapter (index 6) has NO hole
  const maskStyle: React.CSSProperties = !isLast
    ? {
        WebkitMaskImage: `radial-gradient(circle at center, transparent 0, transparent ${portalRadius}px, black ${portalRadius + 1}px)`,
        maskImage: `radial-gradient(circle at center, transparent 0, transparent ${portalRadius}px, black ${portalRadius + 1}px)`,
      }
    : {};

  // Render the specific chapter's real art
  const renderChapterArt = () => {
    switch (i) {
      case 0:
        return <VoidChapter scale={scale} velocity={velocity} portalRadius={portalRadius} />;
      case 1:
        return <MakerChapter scale={scale} portalRadius={portalRadius} />;
      case 2:
        return <ArcChapter scale={scale} portalRadius={portalRadius} />;
      case 3:
        return <Window01Chapter scale={scale} portalRadius={portalRadius} />;
      case 4:
        return <Window02Chapter scale={scale} portalRadius={portalRadius} />;
      case 5:
        return <Window03Chapter scale={scale} portalRadius={portalRadius} />;
      case 6:
        return <PixelChapter scale={scale} onScrollToTop={onScrollToTop} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center will-change-transform"
      style={{
        zIndex,
        transform: `scale(${scale})`,
        transformOrigin: "50% 50%",
      }}
    >
      {/* Chapter Art Container with Center Portal Mask */}
      <div className="absolute inset-0 w-full h-full" style={maskStyle}>
        {renderChapterArt()}
      </div>

      {/* Hairline Red Portal Ring + Soft Glow (Scales with the chapter, hairline stays 1px) */}
      {!isLast && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ overflow: "visible" }}
        >
          <defs>
            <filter id={`portalGlow-${i}`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation={3 / Math.max(scale, 0.2)} result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Soft outer aura ring */}
          <circle
            cx="50%"
            cy="50%"
            r={portalRadius}
            fill="none"
            stroke="rgba(255, 42, 31, 0.4)"
            strokeWidth={hairlineStroke * 2.5}
            filter={`url(#portalGlow-${i})`}
          />

          {/* Razor-sharp 1px red circle */}
          <circle
            cx="50%"
            cy="50%"
            r={portalRadius}
            fill="none"
            stroke="#FF2A1F"
            strokeWidth={hairlineStroke}
          />
        </svg>
      )}
    </div>
  );
}
