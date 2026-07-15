interface RegistrationMarkProps {
  className?: string;
}

/**
 * A prepress registration mark — the crosshair printers use to align
 * plates. Stands in for the "premium web decoration" slot without
 * reaching for a blob or particle field; it's a direct quote of the
 * print-production motif the rest of the design language draws from.
 */
export function RegistrationMark({ className = "" }: RegistrationMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden
      className={className}
    >
      <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <line x1="12" y1="0" x2="12" y2="24" stroke="currentColor" strokeWidth="0.75" />
      <line x1="0" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}
