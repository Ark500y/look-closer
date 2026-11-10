"use client";

import React, { useEffect, useRef } from "react";
import { CHAPTERS, Chapter } from "@/data/chapters";

interface IndexModalProps {
  isOpen: boolean;
  activeChapterIndex: number;
  onClose: () => void;
  onSelectChapter: (index: number) => void;
}

export default function IndexModal({
  isOpen,
  activeChapterIndex,
  onClose,
  onSelectChapter,
}: IndexModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Exhibition Index"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
    >
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      <div
        ref={modalRef}
        className="relative w-full max-w-2xl glass-panel rounded-2xl p-6 sm:p-8 border border-white/15 shadow-2xl z-10"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/10">
          <div>
            <div className="font-mono text-[10px] text-[var(--ark-red)] tracking-[0.25em] uppercase font-bold">
              ARK STUDIO • EXHIBITION INDEX
            </div>
            <h3 className="font-serif text-2xl text-[var(--ark-ink)] tracking-tight">
              Levels of Resolution
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Index"
            className="p-2 rounded-full hover:bg-white/10 text-[var(--ark-steel)] hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Chapter List */}
        <nav className="space-y-2">
          {CHAPTERS.map((chap: Chapter) => {
            const isActive = chap.index === activeChapterIndex;
            return (
              <button
                key={chap.id}
                onClick={() => {
                  onSelectChapter(chap.index);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3 sm:p-4 rounded-xl text-left transition-all duration-200 group ${
                  isActive
                    ? "bg-[var(--ark-red)]/15 border border-[var(--ark-red)]/40 text-white"
                    : "hover:bg-white/5 border border-transparent hover:border-white/10 text-[var(--ark-ink)]"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span
                    className={`font-mono text-xs tracking-widest ${
                      isActive ? "text-[var(--ark-red)] font-bold" : "text-[var(--ark-steel)]"
                    }`}
                  >
                    {chap.fig}
                  </span>
                  <div>
                    <div className="font-serif text-lg sm:text-xl group-hover:text-[var(--ark-red)] transition-colors">
                      {chap.title}
                    </div>
                    <div className="font-mono text-[10px] text-[var(--ark-steel)] tracking-wider uppercase">
                      {chap.medium}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="font-mono text-xs font-bold text-[var(--ark-ink)] bg-white/5 px-2.5 py-1 rounded border border-white/10 tracking-wider">
                    {chap.zoomDisplay}
                  </span>
                  <svg
                    className="w-4 h-4 text-[var(--ark-steel)] group-hover:text-[var(--ark-red)] group-hover:translate-x-1 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-[var(--ark-steel)] tracking-wider">
          <span>SELECT CHAPTER TO TELEPORT</span>
          <span>ESC TO CLOSE</span>
        </div>
      </div>
    </div>
  );
}
