import React from "react";

export type LogoOption = "option-1" | "option-2" | "option-3";

interface LogoProps {
  variant?: "mark" | "wordmark" | "lockup";
  option?: LogoOption;
  size?: number; // base size for mark in px
  className?: string;
  showTagline?: boolean;
}

// Option 1: The Prismatic Lens Aperture (Recommended default)
export function LogoMarkOption1({ size = 32, className = "" }: { size?: number; className?: string }) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32 4L4 58H16.8L22.4 46.8H41.6L47.2 58H60L32 4ZM32 17.6L24.8 32H39.2L32 17.6Z"
        fill="currentColor"
      />
      <circle cx="32" cy="34" r="9" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <circle cx="32" cy="34" r="2.75" fill="var(--accent, #C9704A)" />
    </svg>
  );
}

// Option 2: The Collimator Diaphragm
export function LogoMarkOption2({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ARK STUDIO Logo Mark Option 2"
    >
      <path d="M28 8L6 56H18L30 30V8H28Z" fill="currentColor" />
      <path d="M36 8V30L46 56H58L36 8Z" fill="currentColor" />
      <rect x="18" y="38" width="28" height="4.5" fill="currentColor" />
      <circle cx="32" cy="24" r="6" stroke="currentColor" strokeWidth="2.2" fill="none" />
      <circle cx="32" cy="24" r="2" fill="var(--accent, #C9704A)" />
    </svg>
  );
}

// Option 3: The Focal Reticle
export function LogoMarkOption3({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ARK STUDIO Logo Mark Option 3"
    >
      <path d="M32 6L8 56H20.5L25.5 45.5H38.5L43.5 56H56L32 6ZM32 21L27.5 37H36.5L32 21Z" fill="currentColor" />
      <circle cx="32" cy="32" r="11" stroke="var(--accent, #C9704A)" strokeWidth="1.8" fill="none" />
      <line x1="32" y1="18" x2="32" y2="21" stroke="var(--accent, #C9704A)" strokeWidth="2" />
      <line x1="32" y1="43" x2="32" y2="46" stroke="var(--accent, #C9704A)" strokeWidth="2" />
      <line x1="18" y1="32" x2="21" y2="32" stroke="var(--accent, #C9704A)" strokeWidth="2" />
      <line x1="43" y1="32" x2="46" y2="32" stroke="var(--accent, #C9704A)" strokeWidth="2" />
    </svg>
  );
}

// Master Logo Component
export default function Logo({
  variant = "lockup",
  option = "option-1",
  size = 32,
  className = "",
  showTagline = true,
}: LogoProps) {
  const renderMark = (s: number) => {
    switch (option) {
      case "option-2":
        return <LogoMarkOption2 size={s} className="shrink-0" />;
      case "option-3":
        return <LogoMarkOption3 size={s} className="shrink-0" />;
      case "option-1":
      default:
        return <LogoMarkOption1 size={s} className="shrink-0" />;
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
