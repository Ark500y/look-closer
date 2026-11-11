"use client";

import React, { useState } from "react";
import { SiteContent } from "@/content/en";

interface ServicesSectionProps {
  content: SiteContent;
}

export default function ServicesSection({ content }: ServicesSectionProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 md:py-32 hairline-b">
      <div className="grid-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 hairline-b">
          <div>
            <div className="flex items-center gap-2 num-label mb-3">
              <span>{content.services.sectionNumber}</span>
              <span className="text-[var(--line)]">/</span>
              <span className="uppercase text-[var(--accent)]">CAPABILITIES</span>
            </div>
            <h2 className="display-title text-[var(--text)]">
              {content.services.sectionTitle}
            </h2>
          </div>
        </div>

        {/* Editorial Rows (No cards) */}
        <div className="divide-y divide-[var(--line)]">
          {content.services.items.map((service, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={service.number}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group py-8 md:py-10 transition-colors duration-300 relative"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline">
                  {/* Row Number */}
                  <div className="md:col-span-2 flex items-center gap-3">
                    <span className="num-label font-mono text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                      {service.number}
                    </span>
                    <span
                      className={`h-[1px] bg-[var(--accent)] transition-all duration-300 ${
                        isHovered ? "w-6" : "w-0"
                      }`}
                    />
                  </div>

                  {/* Service Title */}
                  <div className="md:col-span-5">
                    <h3 className="font-serif text-2xl md:text-3xl text-[var(--text)] tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                      {service.name}
                    </h3>
                  </div>

                  {/* Service Detail */}
                  <div className="md:col-span-5">
                    <p className="body-regular text-[var(--muted)] group-hover:text-[#D5D0C5] transition-colors duration-300">
                      {service.detail}
                    </p>
                  </div>
                </div>

                {/* Subtle row underline animation */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--line-strong)] transition-opacity duration-300 pointer-events-none ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
