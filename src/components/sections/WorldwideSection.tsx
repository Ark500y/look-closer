"use client";

import React, { useState, useEffect } from "react";
import { SiteContent } from "@/content/en";
import { siteConfig } from "@/config/site";

interface WorldwideSectionProps {
  content: SiteContent;
}

interface CityOption {
  name: string;
  tz: string;
  label: string;
}

const WORLD_CITIES: CityOption[] = [
  { name: "London", tz: "Europe/London", label: "London (GMT/BST)" },
  { name: "New York", tz: "America/New_York", label: "New York (EST/EDT)" },
  { name: "San Francisco", tz: "America/Los_Angeles", label: "San Francisco (PST/PDT)" },
  { name: "Dubai", tz: "Asia/Dubai", label: "Dubai (GST, UTC+4)" },
  { name: "Riyadh", tz: "Asia/Riyadh", label: "Riyadh (AST, UTC+3)" },
  { name: "Tokyo", tz: "Asia/Tokyo", label: "Tokyo (JST, UTC+9)" },
  { name: "Sydney", tz: "Australia/Sydney", label: "Sydney (AEST, UTC+10)" },
  { name: "Singapore", tz: "Asia/Singapore", label: "Singapore (SGT, UTC+8)" },
  { name: "Berlin", tz: "Europe/Berlin", label: "Berlin (CET/CEST)" },
  { name: "Toronto", tz: "America/Toronto", label: "Toronto (EST/EDT)" },
  { name: "Zurich", tz: "Europe/Zurich", label: "Zurich (CET/CEST)" },
  { name: "Sargodha", tz: "Asia/Karachi", label: "Sargodha (PKT, UTC+5)" },
];

export default function WorldwideSection({ content }: WorldwideSectionProps) {
  const [selectedTz, setSelectedTz] = useState<string>("Asia/Karachi");
  const [visitorTimeStr, setVisitorTimeStr] = useState<string>("");
  const [sargodhaTimeStr, setSargodhaTimeStr] = useState<string>("");
  const [detectedCityName, setDetectedCityName] = useState<string>("");
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const [overlapHours, setOverlapHours] = useState<number>(4);

  // Detect visitor timezone on mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (detected) {
        setSelectedTz(detected);
        const cityPart = detected.split("/")[1]?.replace(/_/g, " ") || detected;
        setDetectedCityName(cityPart);
      }
    } catch (e) {
      setSelectedTz("Europe/London");
      setDetectedCityName("London");
    }
  }, []);

  // Update clocks & overlap hours inside useEffect to prevent prerender time mismatch
  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      try {
        const vFormatter = new Intl.DateTimeFormat("en-GB", {
          timeZone: selectedTz,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        setVisitorTimeStr(vFormatter.format(now));

        const sFormatter = new Intl.DateTimeFormat("en-GB", {
          timeZone: siteConfig.workingHours.tz,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        setSargodhaTimeStr(sFormatter.format(now));

        // Calculate overlap hours safely
        const sargodhaDateStr = now.toLocaleString("en-US", { timeZone: siteConfig.workingHours.tz });
        const visitorDateStr = now.toLocaleString("en-US", { timeZone: selectedTz });
        const sargodhaDate = new Date(sargodhaDateStr);
        const visitorDate = new Date(visitorDateStr);

        const diffHours = (sargodhaDate.getTime() - visitorDate.getTime()) / (1000 * 60 * 60);
        const visitorStartInPkt = 9 + diffHours;
        const visitorEndInPkt = 18 + diffHours;
        const overlapStart = Math.max(9, visitorStartInPkt);
        const overlapEnd = Math.min(18, visitorEndInPkt);
        const overlap = Math.max(0, Math.round(overlapEnd - overlapStart));
        setOverlapHours(Math.min(9, Math.max(0, overlap)));
      } catch (e) {
        setVisitorTimeStr("--:--:--");
        setSargodhaTimeStr("--:--:--");
        setOverlapHours(4);
      }
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [selectedTz]);

  return (
    <section id="worldwide" className="py-24 md:py-32 hairline-b">
      <div className="grid-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 hairline-b">
          <div>
            <div className="flex items-center gap-2 num-label mb-3">
              <span>{content.worldwide.sectionNumber}</span>
              <span className="text-[var(--line)]">/</span>
              <span className="uppercase text-[var(--accent)]">GLOBAL</span>
            </div>
            <h2 className="display-title text-[var(--text)]">
              {content.worldwide.headline}
            </h2>
          </div>
          <p className="body-regular max-w-md text-[var(--muted)]">
            {content.worldwide.subline}
          </p>
        </div>

        {/* Dotted World Map SVG with Sargodha Coordinate Indicator */}
        <div className="pt-12 pb-16">
          <div className="relative w-full aspect-[2.1/1] rounded-[var(--ui-radius)] border border-[var(--line)] bg-[var(--surface)] overflow-hidden flex items-center justify-center p-6">
            {/* World Map Dotted Pattern Representation */}
            <svg
              viewBox="0 0 1000 480"
              className="w-full h-full opacity-35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Subtle Grid Lines */}
              <line x1="0" y1="120" x2="1000" y2="120" stroke="var(--line-subtle)" strokeDasharray="4 4" />
              <line x1="0" y1="240" x2="1000" y2="240" stroke="var(--line-subtle)" strokeDasharray="4 4" />
              <line x1="0" y1="360" x2="1000" y2="360" stroke="var(--line-subtle)" strokeDasharray="4 4" />
              <line x1="250" y1="0" x2="250" y2="480" stroke="var(--line-subtle)" strokeDasharray="4 4" />
              <line x1="500" y1="0" x2="500" y2="480" stroke="var(--line-subtle)" strokeDasharray="4 4" />
              <line x1="750" y1="0" x2="750" y2="480" stroke="var(--line-subtle)" strokeDasharray="4 4" />

              {/* Simplified Dotted Landmass Clusters */}
              {/* North America */}
              <g fill="var(--text)" opacity="0.4">
                <circle cx="180" cy="130" r="1.75" />
                <circle cx="200" cy="120" r="1.75" />
                <circle cx="220" cy="135" r="1.75" />
                <circle cx="240" cy="150" r="1.75" />
                <circle cx="210" cy="160" r="1.75" />
                <circle cx="190" cy="180" r="1.75" />
                <circle cx="230" cy="180" r="1.75" />
                <circle cx="250" cy="170" r="1.75" />
                <circle cx="270" cy="160" r="1.75" />
                <circle cx="260" cy="190" r="1.75" />
                <circle cx="220" cy="210" r="1.75" />
              </g>

              {/* Europe & UK */}
              <g fill="var(--text)" opacity="0.5">
                <circle cx="490" cy="130" r="1.75" />
                <circle cx="510" cy="120" r="1.75" />
                <circle cx="525" cy="140" r="1.75" />
                <circle cx="505" cy="150" r="1.75" />
                <circle cx="520" cy="160" r="1.75" />
                <circle cx="540" cy="150" r="1.75" />
                <circle cx="535" cy="170" r="1.75" />
              </g>

              {/* Middle East & Gulf */}
              <g fill="var(--text)" opacity="0.6">
                <circle cx="585" cy="205" r="1.75" />
                <circle cx="600" cy="215" r="1.75" />
                <circle cx="615" cy="225" r="1.75" />
                <circle cx="625" cy="215" r="1.75" />
                <circle cx="605" cy="235" r="1.75" />
              </g>

              {/* South Asia / Pakistan / Sargodha Node */}
              <g fill="var(--text)" opacity="0.75">
                <circle cx="665" cy="190" r="1.75" />
                <circle cx="675" cy="205" r="1.75" />
                <circle cx="690" cy="230" r="1.75" />
                <circle cx="705" cy="245" r="1.75" />
                <circle cx="715" cy="265" r="1.75" />
              </g>

              {/* East Asia & Japan */}
              <g fill="var(--text)" opacity="0.5">
                <circle cx="780" cy="180" r="1.75" />
                <circle cx="810" cy="170" r="1.75" />
                <circle cx="835" cy="165" r="1.75" />
                <circle cx="800" cy="210" r="1.75" />
                <circle cx="820" cy="230" r="1.75" />
                <circle cx="770" cy="260" r="1.75" />
              </g>

              {/* Australia */}
              <g fill="var(--text)" opacity="0.4">
                <circle cx="850" cy="350" r="1.75" />
                <circle cx="880" cy="340" r="1.75" />
                <circle cx="860" cy="370" r="1.75" />
                <circle cx="890" cy="375" r="1.75" />
              </g>

              {/* Africa */}
              <g fill="var(--text)" opacity="0.4">
                <circle cx="510" cy="230" r="1.75" />
                <circle cx="530" cy="260" r="1.75" />
                <circle cx="550" cy="290" r="1.75" />
                <circle cx="540" cy="330" r="1.75" />
                <circle cx="560" cy="360" r="1.75" />
              </g>
            </svg>

            {/* Pulsing Sargodha Marker (32.08°N, 72.67°E on projected map) */}
            <div
              className="absolute z-10 flex flex-col items-center"
              style={{ top: "42%", left: "67%" }}
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full border border-[var(--accent)] opacity-40 animate-ping" />
                <span className="absolute w-4 h-4 rounded-full border border-[var(--accent)] opacity-80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
              </div>

              <div className="mt-2 px-2.5 py-1 rounded-[var(--ui-radius)] bg-[rgba(12,19,17,0.92)] border border-[var(--line)] text-[10px] font-mono text-[var(--text)] whitespace-nowrap">
                <span>SARGODHA (STUDIO HQ)</span>
                <span className="text-[var(--muted)] ml-1">32.08°N 72.67°E</span>
              </div>
            </div>
          </div>
        </div>

        {/* Time Zone Overlap Calculation Tool */}
        <div className="p-8 md:p-10 rounded-[var(--ui-radius)] border border-[var(--line)] bg-[var(--surface)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Clocks Dual Display */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Visitor Clock */}
              <div className="p-5 rounded-[var(--ui-radius)] border border-[var(--line)] bg-[var(--surface-2)] space-y-2">
                <span className="text-xs uppercase tracking-wider text-[var(--muted)] font-mono block">
                  {content.worldwide.localTime}
                </span>
                <div className="text-2xl sm:text-3xl font-mono text-[var(--text)] font-semibold">
                  {isMounted ? visitorTimeStr || "--:--:--" : "--:--:--"}
                </div>
                <div className="text-xs text-[var(--muted)] truncate">
                  {detectedCityName ? `Detected: ${detectedCityName}` : selectedTz}
                </div>
              </div>

              {/* Sargodha HQ Clock */}
              <div className="p-5 rounded-[var(--ui-radius)] border border-[var(--line)] bg-[var(--surface-2)] space-y-2">
                <span className="text-xs uppercase tracking-wider text-[var(--muted)] font-mono block">
                  {content.worldwide.sargodhaTime}
                </span>
                <div className="text-2xl sm:text-3xl font-mono text-[var(--accent)] font-semibold">
                  {isMounted ? sargodhaTimeStr || "--:--:--" : "--:--:--"}
                </div>
                <div className="text-xs text-[var(--muted)]">
                  Pakistan Standard Time (PKT, UTC+5)
                </div>
              </div>
            </div>

            {/* Overlap Summary & City Selector */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-[var(--ui-radius)] bg-[var(--bg)] border border-[var(--line)] space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)]">
                  <span className="accent-dot" />
                  <span className="uppercase">{content.worldwide.overlapLabel}</span>
                </div>
                <p className="text-sm font-medium text-[var(--text)]">
                  {content.worldwide.overlapSummary(overlapHours)}
                </p>
              </div>

              {/* 12-City Fallback Dropdown */}
              <div className="space-y-1.5">
                <label
                  htmlFor="city-select"
                  className="block text-xs font-mono text-[var(--muted)]"
                >
                  {content.worldwide.selectCityPrompt}
                </label>
                <select
                  id="city-select"
                  value={selectedTz}
                  onChange={(e) => {
                    setSelectedTz(e.target.value);
                    const opt = WORLD_CITIES.find((c) => c.tz === e.target.value);
                    if (opt) setDetectedCityName(opt.name);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-[var(--ui-radius)] bg-[var(--surface-2)] border border-[var(--line)] text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-colors cursor-pointer"
                >
                  {WORLD_CITIES.map((c) => (
                    <option key={c.tz} value={c.tz} className="bg-[var(--surface)]">
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <p className="text-xs text-[var(--muted)] font-mono">
                {content.worldwide.remoteReady}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
