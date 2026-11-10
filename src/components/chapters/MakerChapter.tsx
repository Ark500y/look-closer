"use client";

import React, { useMemo } from "react";
import Image from "next/image";

interface MakerChapterProps {
  scale: number;
  portalRadius: number;
}

const SKILLS = [
  "Web design",
  "UI/UX",
  "Branding & posters",
  "Next.js",
  "SEO",
  "Arabic + English",
];

export default function MakerChapter({ scale, portalRadius }: MakerChapterProps) {
  // Fade out raster portrait smoothly before scale 2.5
  // When scale = 1, opacity = 1; when scale >= 2.2, opacity = 0
  const portraitOpacity = Math.max(0, Math.min(1, 1 - (scale - 1) / 1.2));

  // Portrait scale is strictly clamped so it never exceeds 1.15x
  const portraitScale = Math.min(scale, 1.15);

  // Counter-scale for SVG stroke widths to keep them exactly 1px on screen
  const strokeWidth = 1 / Math.max(scale, 0.05);

  // Orbital rings configuration (in px relative to 1000x1000 base coordinates)
  const ring1Radius = portalRadius * 1.6;
  const ring2Radius = portalRadius * 2.3;

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none select-none overflow-hidden">
      {/* 1. Slow Rotating Skill Orbital Rings (Pure SVG for infinite sharpness) */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <path
            id="orbitPath1"
            d={`M 500,500 m -${ring1Radius},0 a ${ring1Radius},${ring1Radius} 0 1,1 ${ring1Radius * 2},0 a ${ring1Radius},${ring1Radius} 0 1,1 -${ring1Radius * 2},0`}
          />
          <path
            id="orbitPath2"
            d={`M 500,500 m -${ring2Radius},0 a ${ring2Radius},${ring2Radius} 0 1,1 ${ring2Radius * 2},0 a ${ring2Radius},${ring2Radius} 0 1,1 -${ring2Radius * 2},0`}
          />
        </defs>

        {/* Orbit Ring 1 - hairline */}
        <circle
          cx="500"
          cy="500"
          r={ring1Radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth={strokeWidth}
          strokeDasharray="4 6"
        />

        {/* Orbit Ring 2 - hairline with subtle red tint */}
        <circle
          cx="500"
          cy="500"
          r={ring2Radius}
          fill="none"
          stroke="rgba(255, 42, 31, 0.25)"
          strokeWidth={strokeWidth}
        />

        {/* Orbit Ring 1 Text (Skills) with continuous slow rotation */}
        <g className="animate-[spin_45s_linear_infinite] origin-center">
          <text
            fill="#8B9099"
            fontSize="10"
            fontFamily="monospace"
            letterSpacing="0.25em"
            className="uppercase select-none"
          >
            <textPath href="#orbitPath1" startOffset="0%">
              {SKILLS[0]} &nbsp; • &nbsp; {SKILLS[1]} &nbsp; • &nbsp; {SKILLS[2]} &nbsp; • &nbsp;
            </textPath>
          </text>
        </g>

        {/* Orbit Ring 2 Text (Counter-rotation) */}
        <g className="animate-[spin_60s_linear_infinite_reverse] origin-center">
          <text
            fill="#EDE9E3"
            fontSize="9"
            fontFamily="monospace"
            letterSpacing="0.28em"
            className="uppercase select-none opacity-80"
          >
            <textPath href="#orbitPath2" startOffset="0%">
              {SKILLS[3]} &nbsp; ✦ &nbsp; {SKILLS[4]} &nbsp; ✦ &nbsp; {SKILLS[5]} &nbsp; ✦ &nbsp;
            </textPath>
          </text>
        </g>
      </svg>

      {/* 2. Portrait Cutout placed off-centre so the centre portal stays clear */}
      <div
        className="absolute top-1/2 right-[8%] sm:right-[14%] md:right-[18%] -translate-y-[45%] pointer-events-auto transition-opacity duration-300"
        style={{
          opacity: portraitOpacity,
          transform: `translateY(-48%) scale(${portraitScale})`,
          transformOrigin: "center center",
        }}
      >
        <div className="relative w-[280px] h-[380px] sm:w-[360px] sm:h-[480px] md:w-[420px] md:h-[560px]">
          {/* Subtle red rim light backlight glow */}
          <div
            className="absolute -inset-4 rounded-full blur-2xl opacity-40 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 75% 30%, rgba(255, 42, 31, 0.5) 0%, rgba(255, 42, 31, 0.1) 50%, transparent 80%)",
            }}
          />
          <Image
            src="/images/portrait-cutout.png"
            alt="Abdulrehman Khalid — Maker & Designer"
            fill
            sizes="(max-width: 768px) 280px, 420px"
            priority
            unoptimized
            className="object-contain filter grayscale contrast-125 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
          />
        </div>
      </div>
    </div>
  );
}
