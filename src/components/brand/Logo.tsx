import React from "react";

export type LogoOption = "option-a" | "option-b" | "option-c";

interface LogoProps {
  variant?: "mark" | "wordmark" | "lockup";
  option?: LogoOption;
  size?: number; // base size for mark in px
  className?: string;
  showTagline?: boolean;
}

// Option A: The Aperture Crossbar 'A' (Recommended default)
// Unmistakable capital letter 'A' with open legs, structural baseline, and integrated precision optical aperture in the crossbar
export function LogoMarkOptionA({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ARK STUDIO Logo Mark"
    >
      <path
        d="M26.5 7H37.5L57 57H45.5L40.2 43.5H23.8L18.5 57H7L26.5 7ZM25.8 35H38.2L32 19L25.8 35Z"
        fill="currentColor"
      />
      <circle cx="32" cy="39" r="6" fill="var(--bg, #0C1311)" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="39" r="2.2" fill="var(--accent, #C9704A)" />
    </svg>
  );
}

// Option B: The Precision Iris 'A'
export function LogoMarkOptionB({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ARK STUDIO Logo Mark Option B"
    >
      <path
        d="M28 8H36L55 56H45L40.5 45H23.5L19 56H9L28 8ZM25.5 37H38.5L32 20L25.5 37Z"
        fill="currentColor"
      />
      <circle cx="32" cy="28.5" r="5" stroke="currentColor" strokeWidth="1.8" fill="var(--bg, #0C1311)" />
      <circle cx="32" cy="28.5" r="1.8" fill="var(--accent, #C9704A)" />
      <line x1="20" y1="41" x2="44" y2="41" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

// Option C: The Shutter-Blade Monogram 'A'
export function LogoMarkOptionC({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ARK STUDIO Logo Mark Option C"
    >
      <path
        d="M10 56L28 8H36L54 56H43.5L39.5 44H24.5L20.5 56H10Z"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="miter"
        fill="none"
      />
      <line x1="22" y1="40" x2="42" y2="40" stroke="currentColor" strokeWidth="3" />
      <circle cx="32" cy="40" r="5" fill="var(--bg, #0C1311)" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="32" cy="40" r="1.8" fill="var(--accent, #C9704A)" />
    </svg>
  );
}

// Master Logo Component
export default function Logo({
  variant = "lockup",
  option = "option-a",
  size = 32,
  className = "",
  showTagline = true,
}: LogoProps) {
  const renderMark = (s: number) => {
    switch (option) {
      case "option-b":
        return <LogoMarkOptionB size={s} className="shrink-0" />;
      case "option-c":
        return <LogoMarkOptionC size={s} className="shrink-0" />;
      case "option-a":
      default:
        return <LogoMarkOptionA size={s} className="shrink-0" />;
    }
  };

  if (variant === "mark") {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        {renderMark(size)}
      </span>
    );
  }

  if (variant === "wordmark") {
    return (
      <span className={`inline-flex flex-col leading-none ${className}`}>
        <span className="font-serif tracking-[-0.02em] text-[var(--text)] text-[1.4em]">
          ARK STUDIO
        </span>
        {showTagline && (
          <span className="font-sans text-[0.45em] tracking-[0.14em] uppercase text-[var(--muted)] mt-1">
            Web design &amp; brand identity
          </span>
        )}
      </span>
    );
  }

  // Lockup: Mark + Wordmark
  return (
    <span className={`inline-flex items-center gap-3 select-none leading-none ${className}`}>
      {renderMark(Math.max(28, size))}
      <span className="inline-flex flex-col">
        <span className="font-serif tracking-[-0.02em] text-[var(--text)] text-[22px] leading-tight">
          ARK STUDIO
        </span>
        {showTagline && (
          <span className="font-sans text-[9px] tracking-[0.14em] uppercase text-[var(--muted)] mt-0.5">
            Web design &amp; brand identity
          </span>
        )}
      </span>
    </span>
  );
}
