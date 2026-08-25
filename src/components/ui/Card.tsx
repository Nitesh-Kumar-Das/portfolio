"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Tape } from "./Tape";
import { Thumbtack } from "./Thumbtack";

type Props = {
  children: ReactNode;
  /** Decoration pinning the card to the page. */
  decoration?: "tape" | "tack" | "none";
  /** Post-it yellow for feature cards. */
  tone?: "white" | "postit" | "muted";
  /** Static tilt. Magnitude reduces on mobile; it is never removed. */
  tilt?: string;
  className?: string;
  /** Hover interaction is opt-out for non-interactive cards. */
  interactive?: boolean;
  id?: string;
};

const tones = {
  white: "bg-white",
  postit: "bg-postit",
  muted: "bg-muted",
} as const;

/**
 * TWO-NODE STRUCTURE — see §2.
 *   outer  .card-reveal-wrapper  → GSAP writes y/opacity here on scroll
 *   inner  <m.div>               → Framer Motion writes rotate/scale on hover
 * A card hovered mid-reveal therefore has two independent transform stacks
 * rather than two libraries fighting over one.
 */
export function Card({
  children,
  decoration = "none",
  tone = "white",
  tilt = "",
  className,
  interactive = true,
  id,
}: Props) {
  const reduced = useReducedMotion();
  const canMove = interactive && !reduced;

  return (
    <div id={id} className={cn("card-reveal-wrapper relative", tilt)}>
      {decoration === "tape" && <Tape />}
      {decoration === "tack" && <Thumbtack />}
      <m.div
        className={cn(
          "relative h-full rounded-wobbly-md border-2 border-pencil p-6 md:p-8",
          "shadow-card transition-shadow duration-150 ease-out",
          interactive && "hover:shadow-hard",
          tones[tone],
          className,
        )}
        whileHover={canMove ? { rotate: 1, y: -4 } : undefined}
        whileTap={canMove ? { rotate: 0, y: 0 } : undefined}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        {children}
      </m.div>
    </div>
  );
}
