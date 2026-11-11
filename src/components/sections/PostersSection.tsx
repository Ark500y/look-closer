"use client";

import React from "react";
import Image from "next/image";
import { SiteContent } from "@/content/en";

interface PostersSectionProps {
  content: SiteContent;
  posters?: string[];
}

export default function PostersSection({ content, posters = [] }: PostersSectionProps) {
  // If the folder is empty, skip the scene and do not generate placeholders.
  if (!posters || posters.length === 0) {
    return null;
  }

  return (
    <section id="posters" className="py-24 md:py-32 hairline-b overflow-hidden">
      <div className="grid-container mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 hairline-b">
          <div>
            <div className="flex items-center gap-2 num-label mb-3">
              <span>{content.posters.sectionNumber}</span>
              <span className="text-[var(--line)]">/</span>
              <span className="uppercase text-[var(--accent)]">ARCHIVE</span>
            </div>
            <h2 className="display-title text-[var(--text)]">
              {content.posters.sectionTitle}
            </h2>
          </div>
          <p className="body-regular max-w-md text-[var(--muted)]">
            {content.posters.sectionSubtitle}
          </p>
        </div>
      </div>

      {/* Horizontal Gallery */}
      <div className="flex gap-6 overflow-x-auto pb-8 px-6 md:px-12 scrollbar-none cursor-grab active:cursor-grabbing">
        {posters.map((poster, idx) => (
          <div
            key={idx}
            className="shrink-0 w-[280px] sm:w-[340px] aspect-[1/1.414] rounded-[var(--ui-radius)] border border-[var(--line)] bg-[var(--surface)] relative overflow-hidden"
          >
            <Image
              src={poster}
              alt={`Poster ${idx + 1}`}
              fill
              sizes="340px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
