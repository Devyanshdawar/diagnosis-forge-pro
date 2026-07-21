/** Animated ECG line SVG used behind the hero. */
export function EcgLine({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 120"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ecg-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.68 0.19 250)" stopOpacity="0" />
          <stop offset="50%" stopColor="oklch(0.78 0.2 250)" stopOpacity="1" />
          <stop offset="100%" stopColor="oklch(0.68 0.19 250)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,60 L200,60 L220,60 L235,20 L250,100 L265,40 L280,60 L500,60 L520,60 L535,25 L550,95 L565,45 L580,60 L900,60 L920,60 L935,15 L950,105 L965,35 L980,60 L1200,60"
        fill="none"
        stroke="url(#ecg-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 1000,
          animation: "ecg 6s linear infinite",
          filter: "drop-shadow(0 0 6px oklch(0.7 0.2 255 / 0.7))",
        }}
      />
    </svg>
  );
}
