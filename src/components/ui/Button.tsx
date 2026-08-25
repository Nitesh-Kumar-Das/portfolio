"use client";

import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Internal routes must go through next/link for client-side navigation, but
 * they still want the same hover physics as every other button, so Link is
 * wrapped as a motion component once at module scope.
 */
const MotionLink = m.create(Link);

type Variant = "primary" | "secondary";

type Props = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  download?: boolean;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

/**
 * TWO-NODE STRUCTURE — see §2.
 *   outer  .card-reveal-wrapper  → GSAP owns entrance transforms
 *   inner  <m.button|m.a>        → Framer Motion owns hover/tap transforms
 * Never let both libraries write transform on the same node.
 *
 * Non-transform hover feedback (background, text colour, shadow offset) stays
 * in Tailwind, where it cannot collide with either library.
 */
const base = cn(
  "inline-flex min-h-12 items-center justify-center gap-2",
  "rounded-oval border-[3px] border-pencil px-7 py-3",
  "font-body text-lg md:text-2xl leading-none",
  "cursor-pointer select-none",
  "transition-[background-color,color,box-shadow] duration-100 ease-out",
);

const variants: Record<Variant, string> = {
  primary: cn(
    "bg-white text-pencil shadow-hard",
    // accent-ink, not accent, for the FILLED state: white on #ff4d4d is 3.29:1,
    // which fails AA at this 18px label size. #c62222 is 5.7:1 and still reads
    // as correction-marker red. Lighthouse does not audit hover states, so this
    // one has to be caught by hand.
    "hover:bg-accent-ink hover:text-white hover:shadow-hard-sm",
    "active:shadow-none",
  ),
  secondary: cn(
    "bg-muted text-pencil shadow-hard",
    "hover:bg-ink hover:text-white hover:shadow-hard-sm",
    "active:shadow-none",
  ),
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
  download,
  external,
  type = "button",
  disabled,
  onClick,
}: Props) {
  const reduced = useReducedMotion();

  // Under reduced motion the press/jiggle transforms are dropped entirely, but
  // the colour and shadow feedback above still fires so the control responds.
  const hover = reduced ? undefined : { x: 2, y: 2, rotate: -1 };
  const tap = reduced ? undefined : { x: 4, y: 4, rotate: 0 };
  const transition = { duration: 0.1, ease: "easeOut" as const };

  const inner = cn(base, variants[variant], disabled && "pointer-events-none opacity-50", className);

  if (href) {
    // A download or an explicitly external target is a plain anchor; an
    // in-app route goes through Link so navigation stays client-side.
    const isInternalRoute = href.startsWith("/") && !download && !external;

    if (isInternalRoute) {
      return (
        <span className="card-reveal-wrapper inline-block">
          <MotionLink
            href={href}
            className={inner}
            whileHover={hover}
            whileTap={tap}
            transition={transition}
          >
            {children}
          </MotionLink>
        </span>
      );
    }

    return (
      <span className="card-reveal-wrapper inline-block">
        <m.a
          href={href}
          className={inner}
          whileHover={hover}
          whileTap={tap}
          transition={transition}
          download={download}
          {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        >
          {children}
        </m.a>
      </span>
    );
  }

  return (
    <span className="card-reveal-wrapper inline-block">
      <m.button
        type={type}
        onClick={onClick}
        className={inner}
        whileHover={hover}
        whileTap={tap}
        transition={transition}
        disabled={disabled}
      >
        {children}
      </m.button>
    </span>
  );
}
