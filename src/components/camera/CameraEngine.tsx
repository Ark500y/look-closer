"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CHAPTERS, TOTAL_CHAPTERS } from "@/data/chapters";
import ChapterLayer from "./ChapterLayer";
import TextOverlay from "./TextOverlay";
import HUD from "@/components/hud/HUD";
import CustomCursor from "@/components/cursor/CustomCursor";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export default function CameraEngine() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Velocity smoothing refs
  const targetVelRef = useRef<number>(0);
  const currentVelRef = useRef<number>(0);

  // Master z value from 0 to (TOTAL_CHAPTERS - 1)
  const [z, setZ] = useState<number>(0);
  const [velocity, setVelocity] = useState<number>(0);
  const [viewportDims, setViewportDims] = useState<{ width: number; height: number }>({
    width: 1920,
    height: 1080,
  });

  // Track viewport dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setViewportDims({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Half diagonal and portal radius: exactly 10% of viewport half-diagonal at scale 1
  const portalRadius = useMemo(() => {
    const halfDiag = Math.hypot(viewportDims.width, viewportDims.height) / 2;
    return 0.1 * halfDiag;
  }, [viewportDims.width, viewportDims.height]);

  // Current active chapter index (rounded)
  const currentChapterIndex = Math.min(
    TOTAL_CHAPTERS - 1,
    Math.max(0, Math.round(z))
  );
  const currentChapter = CHAPTERS[currentChapterIndex];

  // Jump to specific chapter with animated smooth ease
  const handleJumpToChapter = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const totalHeight = container.offsetHeight;
    const maxScroll = totalHeight - window.innerHeight;
    const targetScroll = (index / (TOTAL_CHAPTERS - 1)) * maxScroll;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetScroll, {
        duration: 1.4,
        easing: (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
      });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  }, []);

  const handleScrollToTop = useCallback(() => {
    handleJumpToChapter(0);
  }, [handleJumpToChapter]);

  // Setup Lenis + GSAP ScrollTrigger with Velocity Decay
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      window.location.href = "/lite";
      return;
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: isMobile ? 1.0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });
    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Ticker callback with continuous velocity decay loop
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);

      // Smooth decay of velocity towards 0 when scrolling ceases
      currentVelRef.current += (targetVelRef.current - currentVelRef.current) * 0.18;
      targetVelRef.current *= 0.88; // decay target towards 0

      if (Math.abs(currentVelRef.current) < 0.8) {
        currentVelRef.current = 0;
      }
      setVelocity(currentVelRef.current);

      // Dynamic vignette pulse decay
      const vigEl = document.getElementById("vignette-fx");
      if (vigEl) {
        const normVel = Math.min(Math.abs(currentVelRef.current) / 1600, 0.25);
        vigEl.style.opacity = `${0.75 + normVel}`;
      }
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Master ScrollTrigger on container
    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      pin: stage,
      scrub: 0.9,
      onUpdate: (self) => {
        const rawZ = self.progress * (TOTAL_CHAPTERS - 1);
        setZ(rawZ);
        // Feed real scroll velocity into decay engine
        const vel = self.getVelocity();
        targetVelRef.current = vel;
      },
      snap: {
        snapTo: 1 / (TOTAL_CHAPTERS - 1),
        delay: 0.25,
        duration: { min: 0.25, max: 0.65 },
        ease: "power2.inOut",
      },
    });

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.tagName === "SELECT") {
        return;
      }

      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        const next = Math.min(TOTAL_CHAPTERS - 1, Math.round(z) + 1);
        handleJumpToChapter(next);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        const prev = Math.max(0, Math.round(z) - 1);
        handleJumpToChapter(prev);
      } else if (e.key === "Home") {
        e.preventDefault();
        handleJumpToChapter(0);
      } else if (e.key === "End") {
        e.preventDefault();
        handleJumpToChapter(TOTAL_CHAPTERS - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      gsap.ticker.remove(tickerCallback);
      st.kill();
      lenis.destroy();
    };
  }, [handleJumpToChapter, z]);

  // Layer order: render only active chapters floor(z) to floor(z) + 2
  const baseChapter = Math.floor(z);
  const activeChapterIndices = useMemo(() => {
    const indices: number[] = [];
    for (let offset = 0; offset <= 2; offset++) {
      const idx = baseChapter + offset;
      if (idx >= 0 && idx < TOTAL_CHAPTERS) {
        indices.push(idx);
      }
    }
    return indices;
  }, [baseChapter]);

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Head-Up Display (HUD) */}
      <HUD
        z={z}
        currentChapter={currentChapter}
        onJumpToChapter={handleJumpToChapter}
        onScrollToTop={handleScrollToTop}
      />

      {/* Main Scroll Container: ~150vh per chapter */}
      <main
        id="main-stage"
        ref={containerRef}
        className="relative w-full bg-[var(--ark-void)]"
        style={{
          height: `${(TOTAL_CHAPTERS - 1) * 150}vh`,
        }}
      >
        {/* Pinned Stage: 100svh */}
        <div
          ref={stageRef}
          className="relative w-full h-[100svh] overflow-hidden select-none"
        >
          {/* Active Chapter Visual Layers (Higher index sits lower in z-order: 50 - idx * 5) */}
          {activeChapterIndices.map((idx) => {
            const chap = CHAPTERS[idx];
            return (
              <ChapterLayer
                key={chap.id}
                chapter={chap}
                z={z}
                velocity={velocity}
                portalRadius={portalRadius}
                zIndex={50 - idx * 5}
                onScrollToTop={handleScrollToTop}
              />
            );
          })}

          {/* Non-scaling Text Overlays (Chapters 0 through 5; Chapter 6 is self-contained) */}
          {CHAPTERS.map((chap) => {
            if (chap.index === 6) return null; // PixelChapter renders its own dedicated terminal
            return (
              <TextOverlay
                key={`text-${chap.id}`}
                chapter={chap}
                z={z}
                velocity={velocity}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}
