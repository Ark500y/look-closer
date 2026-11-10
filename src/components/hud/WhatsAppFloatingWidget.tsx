"use client";

import React, { useState } from "react";

export default function WhatsAppFloatingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = "923141495630";
  const whatsappDisplay = "+92 314 1495630";

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 pointer-events-auto select-none">
      {/* Expanded Quick Drawer */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 glass-panel rounded-2xl p-4 sm:p-5 border border-white/20 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-2 duration-200 bg-[#08080a]/95">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs text-[var(--ark-ink)] font-bold tracking-wider">
                ABDULREHMAN KHALID
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[var(--ark-steel)] hover:text-white p-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="font-sans text-xs text-[var(--ark-steel)] mb-3 leading-relaxed">
            Direct communication for project inquiries in Saudi Arabia, the UAE, and Pakistan. Typically replies in &lt; 15 minutes.
          </p>

          <div className="space-y-2">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Abdulrehman, I'd like to discuss a new website project.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-[var(--ark-red)] hover:bg-[#e02419] text-white font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(255,42,31,0.4)]"
            >
              <span>OPEN WHATSAPP CHAT</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            <a
              href={`tel:+${whatsappNumber}`}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[var(--ark-ink)] font-mono text-xs tracking-wider border border-white/10 transition-all"
            >
              <span>CALL: {whatsappDisplay}</span>
            </a>
          </div>
        </div>
      )}

      {/* Persistent WhatsApp Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Direct WhatsApp Contact"
        className="group flex items-center space-x-2.5 px-4 py-2.5 rounded-full bg-[#121418] hover:bg-[var(--ark-red)] border border-white/20 hover:border-transparent text-white shadow-[0_4px_25px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-105"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>

        {/* WhatsApp Icon */}
        <svg className="w-4 h-4 fill-[#25D366] group-hover:fill-white transition-colors" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>

        <span className="font-mono text-xs font-bold tracking-wider">
          <span className="hidden sm:inline">CHAT ON WHATSAPP</span>
          <span className="sm:hidden">WHATSAPP</span>
        </span>
      </button>
    </div>
  );
}
