"use client";

import React, { useMemo } from "react";
import { REGIONAL_HUBS, REGIONAL_LAND_DOTS } from "@/data/regionalMapData";

interface ArcChapterProps {
  scale: number;
  portalRadius: number;
}

export default function ArcChapter({ scale, portalRadius }: ArcChapterProps) {
  const strokeWidth = 1 / Math.max(scale, 0.05);

  const V_WIDTH = 1200;
  const V_HEIGHT = 800;
  const CX = V_WIDTH / 2;
  const CY = V_HEIGHT / 2;

  // Pre-calculate hub positions in SVG space
  const hubCoords = useMemo(() => {
    return REGIONAL_HUBS.map((hub) => ({
      ...hub,
      svgX: hub.normalized[0] * V_WIDTH,
      svgY: hub.normalized[1] * V_HEIGHT,
    }));
  }, []);

  const originHub = hubCoords[0]; // Sargodha

  // Calculate high-craft curved arc paths from Sargodha
  const arcPaths = useMemo(() => {
    return hubCoords.slice(1).map((dest, i) => {
      const x0 = originHub.svgX;
      const y0 = originHub.svgY;
      const x1 = dest.svgX;
      const y1 = dest.svgY;

      // Dynamic arching: arcs sweep upward and curve gracefully
      const archFactor = i === 2 ? 140 : i === 1 ? 110 : 80;
      const midX = (x0 + x1) / 2 + (dest.name === "Dubai" ? -30 : 0);
      const midY = (y0 + y1) / 2 - archFactor;
      const pathD = `M ${x0},${y0} Q ${midX},${midY} ${x1},${y1}`;

      return {
        ...dest,
        pathD,
        midX,
        midY,
      };
    });
  }, [originHub, hubCoords]);

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none select-none overflow-hidden">
      <svg
        className="w-full h-full max-w-full max-h-full"
        viewBox={`0 0 ${V_WIDTH} ${V_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="hubOriginGlow">
            <stop offset="0%" stopColor="#FF2A1F" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#FF2A1F" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FF2A1F" stopOpacity="0" />
          </radialGradient>
          <filter id="arcGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Tactical Lat / Lon Coordinate Grid Overlay */}
        <g opacity="0.12">
          {/* Latitude lines */}
          <line x1={0} y1={200} x2={V_WIDTH} y2={200} stroke="#EDE9E3" strokeWidth={strokeWidth} strokeDasharray="3 9" />
          <line x1={0} y1={400} x2={V_WIDTH} y2={400} stroke="#EDE9E3" strokeWidth={strokeWidth} strokeDasharray="3 9" />
          <line x1={0} y1={600} x2={V_WIDTH} y2={600} stroke="#EDE9E3" strokeWidth={strokeWidth} strokeDasharray="3 9" />
          {/* Longitude lines */}
          <line x1={300} y1={0} x2={300} y2={V_HEIGHT} stroke="#EDE9E3" strokeWidth={strokeWidth} strokeDasharray="3 9" />
          <line x1={600} y1={0} x2={600} y2={V_HEIGHT} stroke="#EDE9E3" strokeWidth={strokeWidth} strokeDasharray="3 9" />
          <line x1={900} y1={0} x2={900} y2={V_HEIGHT} stroke="#EDE9E3" strokeWidth={strokeWidth} strokeDasharray="3 9" />
        </g>

        {/* 2. Regional Dot-Matrix Land Points */}
        <g opacity="0.6">
          {REGIONAL_LAND_DOTS.map(([nx, ny], idx) => {
            const px = nx * V_WIDTH;
            const py = ny * V_HEIGHT;
            const distFromCenter = Math.hypot(px - CX, py - CY);
            // Leave clear radius around center portal
            if (distFromCenter < portalRadius * 0.8) return null;

            return (
              <circle
                key={idx}
                cx={px}
                cy={py}
                r={1.25}
                fill="#424750"
              />
            );
          })}
        </g>

        {/* 3. Red Geodesic Flight & Transmission Arcs */}
        {arcPaths.map((arc, i) => (
          <g key={arc.name}>
            {/* Hairline background path */}
            <path
              d={arc.pathD}
              fill="none"
              stroke="rgba(255, 42, 31, 0.2)"
              strokeWidth={Math.max(1, strokeWidth)}
              strokeDasharray="4 6"
            />
            {/* Animated glowing transmission pulse */}
            <path
              d={arc.pathD}
              fill="none"
              stroke="#FF2A1F"
              strokeWidth={Math.max(1.8, strokeWidth * 1.5)}
              strokeDasharray="70 320"
              strokeDashoffset={-((i * 110) % 400)}
              filter="url(#arcGlow)"
              className="animate-[dash_3.2s_linear_infinite]"
            />
          </g>
        ))}

        {/* 4. Origin Hub: SARGODHA, PK */}
        <g transform={`translate(${originHub.svgX}, ${originHub.svgY})`}>
          <circle r={32} fill="url(#hubOriginGlow)" />
          <circle
            r={18}
            fill="none"
            stroke="#FF2A1F"
            strokeWidth={Math.max(1.2, strokeWidth)}
            className="animate-pulse"
          />
          <circle r={5} fill="#FF2A1F" />
          <circle r={2} fill="#FFFFFF" />

          {/* Technical Leader Line & Label */}
          <line x1={0} y1={0} x2={40} y2={-30} stroke="#FF2A1F" strokeWidth={strokeWidth} opacity="0.6" />
          <line x1={40} y1={-30} x2={160} y2={-30} stroke="#FF2A1F" strokeWidth={strokeWidth} opacity="0.6" />

          <text
            x={45}
            y={-38}
            fill="#FF2A1F"
            fontFamily="monospace"
            fontSize="12"
            fontWeight="bold"
            letterSpacing="0.18em"
          >
            SARGODHA (STUDIO ORIGIN)
          </text>
          <text
            x={45}
            y={-18}
            fill="#EDE9E3"
            fontFamily="monospace"
            fontSize="9"
            letterSpacing="0.14em"
            opacity="0.8"
          >
            32.08°N / 72.67°E • CORE DEV ENGINE
          </text>
        </g>

        {/* 5. Destination Hubs with Offset Callout Leader Lines */}
        {/* Dammam */}
        {(() => {
          const dammam = hubCoords[1];
          return (
            <g transform={`translate(${dammam.svgX}, ${dammam.svgY})`}>
              <circle r={14} fill="none" stroke="rgba(255, 42, 31, 0.4)" strokeWidth={strokeWidth} className="animate-ping" />
              <circle r={4} fill="#EDE9E3" stroke="#FF2A1F" strokeWidth={Math.max(1.5, strokeWidth)} />
              {/* Leader line up and left */}
              <line x1={0} y1={0} x2={-35} y2={-30} stroke="rgba(255, 255, 255, 0.3)" strokeWidth={strokeWidth} />
              <line x1={-35} y1={-30} x2={-140} y2={-30} stroke="rgba(255, 255, 255, 0.3)" strokeWidth={strokeWidth} />
              <text x={-40} y={-36} fill="#EDE9E3" fontFamily="monospace" fontSize="11" fontWeight="bold" letterSpacing="0.14em" textAnchor="end">
                DAMMAM, KSA
              </text>
              <text x={-40} y={-18} fill="#8B9099" fontFamily="monospace" fontSize="8" letterSpacing="0.12em" textAnchor="end">
                26.43°N / 50.10°E • LOGISTICS &amp; FLEET
              </text>
            </g>
          );
        })()}

        {/* Jeddah */}
        {(() => {
          const jeddah = hubCoords[2];
          return (
            <g transform={`translate(${jeddah.svgX}, ${jeddah.svgY})`}>
              <circle r={14} fill="none" stroke="rgba(255, 42, 31, 0.4)" strokeWidth={strokeWidth} className="animate-ping" />
              <circle r={4} fill="#EDE9E3" stroke="#FF2A1F" strokeWidth={Math.max(1.5, strokeWidth)} />
              {/* Leader line down and left */}
              <line x1={0} y1={0} x2={-35} y2={30} stroke="rgba(255, 255, 255, 0.3)" strokeWidth={strokeWidth} />
              <line x1={-35} y1={30} x2={-140} y2={30} stroke="rgba(255, 255, 255, 0.3)" strokeWidth={strokeWidth} />
              <text x={-40} y={24} fill="#EDE9E3" fontFamily="monospace" fontSize="11" fontWeight="bold" letterSpacing="0.14em" textAnchor="end">
                JEDDAH, KSA
              </text>
              <text x={-40} y={42} fill="#8B9099" fontFamily="monospace" fontSize="8" letterSpacing="0.12em" textAnchor="end">
                21.49°N / 39.19°E • COMMERCE &amp; TRADE
              </text>
            </g>
          );
        })()}

        {/* Dubai - Engineered leader callout branching outside the center portal radius! */}
        {(() => {
          const dubai = hubCoords[3];
          return (
            <g transform={`translate(${dubai.svgX}, ${dubai.svgY})`}>
              <circle r={14} fill="none" stroke="rgba(255, 42, 31, 0.4)" strokeWidth={strokeWidth} className="animate-ping" />
              <circle r={4} fill="#EDE9E3" stroke="#FF2A1F" strokeWidth={Math.max(1.5, strokeWidth)} />
              {/* Leader line branching down and right outside the portal hole */}
              <line x1={0} y1={0} x2={65} y2={75} stroke="#FF2A1F" strokeWidth={strokeWidth} opacity="0.8" />
              <line x1={65} y1={75} x2={180} y2={75} stroke="#FF2A1F" strokeWidth={strokeWidth} opacity="0.8" />
              <circle cx={65} cy={75} r={2} fill="#FF2A1F" />
              <text x={75} y={67} fill="#EDE9E3" fontFamily="monospace" fontSize="11" fontWeight="bold" letterSpacing="0.14em">
                DUBAI, UAE
              </text>
              <text x={75} y={87} fill="#8B9099" fontFamily="monospace" fontSize="8" letterSpacing="0.12em">
                25.20°N / 55.27°E • CONTRACTING &amp; SERVICES
              </text>
            </g>
          );
        })()}
      </svg>
    </div>
  );
}
