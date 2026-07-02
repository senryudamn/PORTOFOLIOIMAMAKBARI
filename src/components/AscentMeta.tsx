import { Mountain } from 'lucide-react';

/**
 * Small marker used on the ascent trail nodes. Kept in its own module
 * so Awards and the Summit marker share one source.
 */
export function TrailIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return <Mountain className={className} />;
}

/** Elevation-style chevron pointing upward, used as a scroll ascender cue. */
export function AscendIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}
