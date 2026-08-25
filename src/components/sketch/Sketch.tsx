import { cn } from "@/lib/cn";

/**
 * Hand-drawn SVG decorations. Every path carries `.sketch-path` so anime.js
 * can pick it up with svg.createDrawable() in stage 3 — the geometry here is
 * static and works with zero JS.
 *
 * Paths are deliberately irregular: a perfect circle or a straight arrow reads
 * as vector clip-art and breaks the felt-tip illusion.
 */

const stroke = {
  fill: "none",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Dashed arrow pointing at the primary CTA. Decorative — hidden on mobile. */
export function SketchArrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 80"
      className={cn("pointer-events-none h-20 w-28", className)}
    >
      <path
        className="sketch-path"
        d="M6 12c14 22 26 36 44 44 12 5 26 7 40 6"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeDasharray="7 6"
        {...stroke}
      />
      <path
        className="sketch-path"
        d="M78 52l14 10-16 6"
        stroke="currentColor"
        strokeWidth={2.5}
        {...stroke}
      />
    </svg>
  );
}

/** Squiggly connector drawn between project entries. */
export function Squiggle({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 160"
      preserveAspectRatio="none"
      className={cn("pointer-events-none h-32 w-10", className)}
    >
      <path
        className="sketch-path"
        d="M20 2c-12 18 12 26 0 44s12 26 0 44 10 26 0 44"
        stroke="currentColor"
        strokeWidth={2.5}
        {...stroke}
      />
    </svg>
  );
}

/** Corner frame marks — the crop-mark brackets around the avatar. */
export function CornerMarks({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 240"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    >
      <path className="sketch-path" d="M4 34C3 20 5 9 16 6c8-2 16-1 24 0" stroke="currentColor" strokeWidth={3} {...stroke} />
      <path className="sketch-path" d="M160 5c12-1 22 0 34 3 3 9 3 18 2 27" stroke="currentColor" strokeWidth={3} {...stroke} />
      <path className="sketch-path" d="M196 206c2 13 0 23-6 28-9 2-19 2-28 1" stroke="currentColor" strokeWidth={3} {...stroke} />
      <path className="sketch-path" d="M40 236c-13 1-24 0-32-5-2-9-3-19-2-29" stroke="currentColor" strokeWidth={3} {...stroke} />
    </svg>
  );
}

/**
 * Irregular hand-drawn circle around an icon or a featured item.
 * Not `rounded-full` — the wobble is the whole point.
 */
export function RoughCircle({
  className,
  dashed = false,
  strokeWidth = 2.5,
  stretch = false,
}: {
  className?: string;
  dashed?: boolean;
  strokeWidth?: number;
  /** Stretch to the parent box (an ellipse round a title) instead of staying circular. */
  stretch?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio={stretch ? "none" : undefined}
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    >
      <path
        className="sketch-path"
        d="M50 6c22-1 42 16 43 37 1 24-17 45-40 46C28 90 7 73 6 50 5 28 25 7 50 6z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={dashed ? "8 7" : undefined}
        {...stroke}
      />
    </svg>
  );
}

/** Hand-drawn horizontal rule used between sections. */
export function SketchDivider({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 12"
      preserveAspectRatio="none"
      className={cn("pointer-events-none h-3 w-full", className)}
    >
      <path
        className="sketch-path"
        d="M2 7c86-5 173 3 259-1 94-4 188 5 337-2"
        stroke="currentColor"
        strokeWidth={2.5}
        {...stroke}
      />
    </svg>
  );
}

/** Underline scribble sitting under a heading word. */
export function SketchUnderline({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 16"
      preserveAspectRatio="none"
      className={cn("pointer-events-none h-4 w-full", className)}
    >
      <path
        className="sketch-path"
        d="M4 11c40-6 84 4 126-2 30-4 58 3 88-1"
        stroke="currentColor"
        strokeWidth={4}
        {...stroke}
      />
    </svg>
  );
}

/**
 * lucide v1 removed brand glyphs (GitHub / LinkedIn) for trademark reasons.
 * Rather than substitute a vague generic icon, these are hand-lettered marks
 * in a rough circle — closer to the napkin system than a stock brand glyph,
 * and the adjacent text label carries the actual identification.
 */
export function SketchBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-flex h-7 w-7 shrink-0 items-center justify-center",
        className,
      )}
    >
      <RoughCircle strokeWidth={4} />
      <span className="font-hand text-[0.6875rem] leading-none">{children}</span>
    </span>
  );
}
