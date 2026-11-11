"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/components/brand/Logo";
import { SiteContent } from "@/content/en";
import { siteConfig } from "@/config/site";

interface HeroSectionProps {
  content: SiteContent;
}

export default function HeroSection({ content }: HeroSectionProps) {
  // Client-side only Sargodha clock to avoid hydration mismatch
  const [sargodhaTime, setSargodhaTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat("en-GB", {
          timeZone: siteConfig.workingHours.tz,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        setSargodhaTime(formatter.format(new Date()));
      } catch (e) {
        // Fallback
        const d = new Date();
        const utc = d.getTime() + d.getTimezoneOffset() * 60000;
        const pkt = new Date(utc + 5 * 3600000);
        setSargodhaTime(pkt.toTimeString().substring(0, 8));
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden hairline-b">
      <div className="grid-container">
        {/* Top Meta Bar: Status indicator + Sargodha Live Clock */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12 text-xs font-medium text-[var(--muted)]">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-[var(--ui-radius)] border border-[var(--line)] bg-[var(--surface)]">
            <span className="accent-dot animate-pulse" />
            <span>{content.hero.status}</span>
          </div>

          <div className="inline-flex items-center gap-2 num-label">
            <span className="text-[var(--text)]">{content.hero.cityTimeLabel}</span>
            <span className="text-[var(--line)]">/</span>
            <span>{sargodhaTime ? `${sargodhaTime} PKT` : "--:--:-- PKT"}</span>
          </div>
        </div>

        {/* 12-Column Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (7 cols): Large Logo Mark, Headline, Subline, CTAs */}
          <div className="lg:col-span-7 space-y-8">
            {/* Prominent Architectural Logo Mark in Hero */}
            <div className="inline-block text-[var(--text)]">
              <Logo variant="mark" size={54} />
            </div>

            {/* Display Headline */}
            <h1 className="display-hero text-[var(--text)] tracking-tight">
              <span>{content.hero.headlinePart1}</span>{" "}
              <span className="italic font-serif text-[var(--text)] opacity-95">
                {content.hero.headlinePart2}
              </span>
            </h1>

            {/* Subline */}
            <p className="body-lead max-w-xl text-[var(--muted)] font-normal">
              {content.hero.subline}
            </p>

            {/* Actions: 4px radius, no pills */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a href="#contact" className="btn-primary">
                {content.hero.primaryCta}
              </a>
              <a href="#work" className="btn-secondary">
                {content.hero.secondaryCta}
              </a>
            </div>
          </div>

          {/* Right Column (5 cols): Sculptural Monochrome Portrait with subtle vignette */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-[var(--ui-radius)] overflow-hidden border border-[var(--line)] bg-[var(--surface)]">
              {/* Soft radial vignette behind the portrait */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background:
                    "radial-gradient(circle at 50% 40%, transparent 45%, rgba(12, 19, 17, 0.75) 100%)",
                }}
              />

              {/* Portrait Cutout */}
              <Image
                src="/images/portrait-cutout.png"
                alt="Abdulrehman Khalid — ARK STUDIO"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 380px"
                className="object-cover object-top grayscale contrast-[1.08] filter"
              />

              {/* Museum style bottom label badge */}
              <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between px-3 py-2 bg-[rgba(12,19,17,0.85)] backdrop-blur-sm rounded-[var(--ui-radius)] border border-[var(--line)] text-[11px] text-[var(--muted)] font-mono">
                <span>ABDULREHMAN KHALID</span>
                <span className="text-[var(--text)]">MAKER / ENGINEER</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
