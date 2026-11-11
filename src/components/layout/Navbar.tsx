"use client";

import React, { useState, useEffect } from "react";
import Logo from "@/components/brand/Logo";
import { SiteContent } from "@/content/en";

interface NavbarProps {
  content: SiteContent;
  currentLang: "en" | "ar";
  onToggleLang: () => void;
}

export default function Navbar({ content, currentLang, onToggleLang }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(12,19,17,0.92)] backdrop-blur-md hairline-b py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="grid-container flex items-center justify-between">
        {/* Brand Lockup */}
        <a
          href="#"
          className="group focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] rounded-[var(--ui-radius)]"
          aria-label="ARK STUDIO Home"
        >
          <Logo
            variant="lockup"
            size={30}
            className="text-[var(--text)] transition-opacity duration-200 group-hover:opacity-90"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-[0.9375rem] font-medium text-[var(--muted)]">
          <a
            href="#work"
            className="transition-colors hover:text-[var(--text)] focus:outline-none focus-visible:text-[var(--text)]"
          >
            {content.nav.work}
          </a>
          <a
            href="#services"
            className="transition-colors hover:text-[var(--text)] focus:outline-none focus-visible:text-[var(--text)]"
          >
            {content.nav.services}
          </a>
          <a
            href="#worldwide"
            className="transition-colors hover:text-[var(--text)] focus:outline-none focus-visible:text-[var(--text)]"
          >
            {content.nav.worldwide}
          </a>
          <a
            href="#contact"
            className="transition-colors hover:text-[var(--text)] focus:outline-none focus-visible:text-[var(--text)]"
          >
            {content.nav.contact}
          </a>
        </nav>

        {/* Actions: Lang Switch + CTA */}
        <div className="hidden md:flex items-center gap-5">
          <button
            onClick={onToggleLang}
            className="text-xs tracking-wider uppercase px-2.5 py-1 rounded-[var(--ui-radius)] text-[var(--muted)] hover:text-[var(--text)] border border-[var(--line)] hover:border-[var(--line-strong)] transition-all cursor-pointer"
            aria-label={`Switch to ${currentLang === "en" ? "Arabic" : "English"}`}
          >
            {content.nav.langSwitch}
          </button>
          <a
            href="#contact"
            className="btn-secondary text-xs px-4 py-2"
          >
            {content.nav.cta}
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onToggleLang}
            className="text-xs px-2 py-1 rounded-[var(--ui-radius)] text-[var(--muted)] border border-[var(--line)]"
          >
            {content.nav.langSwitch}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[var(--text)] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--surface)] hairline-b px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-base font-medium">
            <a
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[var(--text)] py-1"
            >
              {content.nav.work}
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[var(--text)] py-1"
            >
              {content.nav.services}
            </a>
            <a
              href="#worldwide"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[var(--text)] py-1"
            >
              {content.nav.worldwide}
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[var(--text)] py-1"
            >
              {content.nav.contact}
            </a>
          </nav>
          <div className="pt-3 hairline-t">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full text-center"
            >
              {content.nav.cta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
