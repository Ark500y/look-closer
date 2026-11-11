"use client";

import React from "react";
import { SiteContent } from "@/content/en";

interface FooterProps {
  content: SiteContent;
}

export default function Footer({ content }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="pt-20 pb-12 overflow-hidden bg-[var(--bg)] border-t border-[var(--line)]">
      <div className="grid-container">
        {/* Top Meta Row */}
        <div className="flex flex-wrap items-center justify-between gap-6 pb-16 text-xs text-[var(--muted)] font-mono">
          <div className="flex items-center gap-3">
            <span>{content.footer.copyright}</span>
            <span className="text-[var(--line)]">/</span>
            <span>{content.footer.location}</span>
          </div>

          <button
            onClick={scrollToTop}
            className="hover:text-[var(--text)] transition-colors inline-flex items-center gap-1.5 cursor-pointer focus:outline-none"
            aria-label="Back to top of page"
          >
            <span>{content.footer.backToTop}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 9.5V2.5M6 2.5L2.5 6M6 2.5L9.5 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Monumental Giant Full-Width Wordmark */}
        <div className="w-full select-none pointer-events-none pt-4 pb-2 border-t border-[var(--line-subtle)]">
          <div
            className="font-serif tracking-[-0.035em] text-[var(--text)] text-center leading-[0.88] whitespace-nowrap overflow-hidden opacity-90"
            style={{
              fontSize: "clamp(4rem, 15.5vw, 16.5rem)",
            }}
          >
            ARK STUDIO
          </div>
        </div>
      </div>
    </footer>
  );
}
