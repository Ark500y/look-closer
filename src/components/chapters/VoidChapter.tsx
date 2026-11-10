"use client";

import React, { useEffect, useRef } from "react";

interface VoidChapterProps {
  scale: number;
  velocity: number;
  portalRadius: number; // radius in px at scale 1
}

interface Star {
  x: number; // normalized -1 to 1 from center
  y: number; // normalized -1 to 1 from center
  size: number;
  layer: number; // 0: distant, 1: mid, 2: near red-tinted
  alpha: number;
  speed: number;
}

export default function VoidChapter({ scale, velocity, portalRadius }: VoidChapterProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const isTabHiddenRef = useRef<boolean>(false);

  // Initialize stars
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 120 : 300;
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      // distribute in circle/oval away from direct center
      const angle = Math.random() * Math.PI * 2;
      const dist = 0.08 + Math.sqrt(Math.random()) * 0.92; // leave center somewhat open
      stars.push({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        size: Math.random() < 0.2 ? 1.8 : Math.random() < 0.6 ? 1.2 : 0.8,
        layer: Math.floor(Math.random() * 3),
        alpha: 0.3 + Math.random() * 0.7,
        speed: 0.0003 + Math.random() * 0.0008,
      });
    }
    starsRef.current = stars;

    const handleVisibility = () => {
      isTabHiddenRef.current = document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // Canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const render = () => {
      if (!isTabHiddenRef.current) {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
        const w = window.innerWidth;
        const h = window.innerHeight;
        const cx = w / 2;
        const cy = h / 2;

        ctx.clearRect(0, 0, w, h);

        const currentVelocity = velocity || 0;
        const streakFactor = Math.min(Math.abs(currentVelocity) / 300, 4.0);

        // Draw stars
        const stars = starsRef.current;
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          // Drift outward slightly or rotate
          s.x += Math.cos(i) * s.speed * (s.layer + 1);
          s.y += Math.sin(i) * s.speed * (s.layer + 1);

          // Wrap boundaries
          if (Math.hypot(s.x, s.y) > 1.2) {
            const angle = Math.random() * Math.PI * 2;
            s.x = Math.cos(angle) * 0.12;
            s.y = Math.sin(angle) * 0.12;
          }

          // Screen position
          const sx = cx + s.x * (w * 0.7);
          const sy = cy + s.y * (h * 0.7);

          // Skip if inside center portal hole at rest
          const distFromCenter = Math.hypot(sx - cx, sy - cy);
          if (distFromCenter < portalRadius * 0.95) continue;

          ctx.save();
          if (s.layer === 2) {
            // Near star with faint red scintilla
            ctx.fillStyle = `rgba(255, 75, 65, ${s.alpha * 0.9})`;
            ctx.shadowColor = "#FF2A1F";
            ctx.shadowBlur = 4;
          } else if (s.layer === 1) {
            // Mid star
            ctx.fillStyle = `rgba(237, 233, 227, ${s.alpha * 0.75})`;
          } else {
            // Distant faint star
            ctx.fillStyle = `rgba(139, 144, 153, ${s.alpha * 0.5})`;
          }

          if (streakFactor > 0.1) {
            // Radial streak towards / away from center
            const dx = (sx - cx) / distFromCenter;
            const dy = (sy - cy) / distFromCenter;
            const length = s.size * (1 + streakFactor * (s.layer + 1) * 3);

            ctx.lineWidth = s.size;
            ctx.strokeStyle = ctx.fillStyle;
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(sx + dx * length, sy + dy * length);
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }

        // Draw breathing red lens glow and concentric rings around center portal
        const holeR = portalRadius; // base portal radius
        const breathing = Math.sin(Date.now() / 1100) * 0.05 + 1; // slow, heavy idle breath
        const activeR = holeR * breathing;

        // Outer soft red halo
        const radialGrad = ctx.createRadialGradient(cx, cy, activeR * 0.9, cx, cy, activeR * 2.8);
        radialGrad.addColorStop(0, "rgba(255, 42, 31, 0.45)");
        radialGrad.addColorStop(0.4, "rgba(255, 42, 31, 0.12)");
        radialGrad.addColorStop(1, "rgba(255, 42, 31, 0)");

        ctx.fillStyle = radialGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, activeR * 2.8, 0, Math.PI * 2);
        ctx.fill();

        // Hairline concentric outer ring
        ctx.strokeStyle = "rgba(255, 42, 31, 0.25)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, activeR * 1.5, 0, Math.PI * 2);
        ctx.stroke();

        // Secondary tick marks on perimeter
        const numTicks = 32;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        for (let t = 0; t < numTicks; t++) {
          const a = (t / numTicks) * Math.PI * 2;
          const r1 = activeR * 1.48;
          const r2 = t % 4 === 0 ? activeR * 1.55 : activeR * 1.52;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
          ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
          ctx.stroke();
        }

        // Exact portal hairline ring
        ctx.strokeStyle = "#FF2A1F";
        ctx.lineWidth = 1.2;
        ctx.shadowColor = "#FF2A1F";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(cx, cy, activeR, 0, Math.PI * 2);
        ctx.stroke();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [velocity, portalRadius]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
