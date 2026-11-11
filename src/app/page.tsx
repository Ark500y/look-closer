"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import WorkSection from "@/components/sections/WorkSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PostersSection from "@/components/sections/PostersSection";
import WorldwideSection from "@/components/sections/WorldwideSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import { contentEn } from "@/content/en";
import { contentAr } from "@/content/ar";

export default function Home() {
  const [lang, setLang] = useState<"en" | "ar">("en");

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
  };

  const content = lang === "en" ? contentEn : contentAr;

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300"
    >
      {/* Fixed Navigation Bar */}
      <Navbar
        content={content}
        currentLang={lang}
        onToggleLang={toggleLang}
      />

      {/* Main Exhibition Sequence */}
      <main>
        {/* 1. Hero: Instant paint, no loader */}
        <HeroSection content={content} />

        {/* 2. Selected Work: 6 projects across 2 groups */}
        <WorkSection content={content} />

        {/* 3. Services: Editorial row list */}
        <ServicesSection content={content} />

        {/* 4. Posters: Skips cleanly if /public/posters is empty */}
        <PostersSection content={content} posters={[]} />

        {/* 5. Worldwide: Dotted SVG world map + Sargodha coordinate + Time zone overlap calculator */}
        <WorldwideSection content={content} />

        {/* 6. Contact: "Tell me about your business" form + direct communication channels */}
        <ContactSection content={content} />
      </main>

      {/* Giant Monumental Wordmark Footer */}
      <Footer content={content} />
    </div>
  );
}
