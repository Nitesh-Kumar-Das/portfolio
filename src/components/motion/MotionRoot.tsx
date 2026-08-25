"use client";

import { LazyMotion, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * Wraps the app once. `domAnimation` + the `m` component is ~4.6KB against
 * ~32KB for a full `motion` import — the reason every component in this build
 * imports `m`, never `motion`.
 */
export function MotionRoot({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
