"use client";

import { useEffect, useRef, useState } from "react";
import { animate, createTimeline, svg } from "animejs";

const KEY = "nkd-intro-played";

const stroke = {
  fill: "none",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: "currentColor",
} as const;

/**
 * Four-beat opening: mail is taken out of the mailbox, opened, and the letter
 * unfolds into the page.
 *
 *   1. mailbox draws itself on, flag drops
 *   2. envelope rises out of the mailbox
 *   3. flap opens, letter lifts out of the pocket
 *   4. letter unfolds flat, then expands to fill the viewport
 *
 * Beat 4 IS the page transition. The letter is painted in --color-paper, the
 * same background the site uses, so by the time it fills the viewport it is
 * already indistinguishable from the page behind it; the overlay then just
 * fades away. No hard cut between "loader" and "site".
 *
 * Constraints this inherits from the intro it replaces:
 *   - position: fixed, so it cannot shift layout (the CLS-0 result must hold)
 *   - gates no fetch and no paint; it sits on top of already-loaded content
 *   - once per session, skippable by any input, skipped under reduced motion
 */
export function MailboxLoader() {
  const root = useRef<HTMLDivElement>(null);
  /*
   * "pending" is the SSR state: the overlay IS rendered, so a first visit is
   * covered from the very first paint. A session that has already seen it has
   * `data-intro-seen` set by the <head> script before paint, and CSS hides the
   * overlay, so it is never visible there either.
   */
  const [phase, setPhase] = useState<"pending" | "playing" | "done">("pending");
  const active = phase === "playing";

  useEffect(() => {
    let seen = true;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      seen = true; // blocked storage: behave as already seen
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) {
      document.documentElement.dataset.introSeen = "1";
      setPhase("done");
      return;
    }

    setPhase("playing");
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* replays next session, harmless */
    }
  }, []);

  useEffect(() => {
    if (!active || !root.current) return;

    const el = root.current;
    // Lock scrolling only while the overlay is up.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const finish = () => {
      document.body.style.overflow = prevOverflow;
      document.documentElement.dataset.introSeen = "1";
      setPhase("done");
    };

    const tl = createTimeline({ defaults: { ease: "outQuad" }, onComplete: finish });

    // ---- beat 1: mailbox inks on, flag drops -------------------------------
    tl.add(svg.createDrawable(".mb-line"), { draw: "0 1", duration: 400, ease: "inOutQuad" })
      .add(".mb-flag", { rotate: [0, 78], duration: 300 }, 260)

      // ---- beat 2: envelope rises out of the mailbox -----------------------
      .add(".mb-envelope", { opacity: [0, 1], translateY: [16, -104], duration: 450 }, 420)
      .add(".mb-body", { opacity: [1, 0], duration: 420 }, 500)

      // ---- beat 3: flap opens, letter lifts out ----------------------------
      .add(".mb-flap", { rotateX: [0, -172], duration: 380, ease: "inOutQuad" }, 820)
      .add(".mb-letter", { opacity: [0, 1], translateY: [24, -34], duration: 420 }, 1000)

      // ---- beat 4: unfold, then expand into the page -----------------------
      .add(".mb-fold-top", { rotateX: [-88, 0], duration: 340, ease: "outQuad" }, 1320)
      .add(".mb-fold-bottom", { rotateX: [88, 0], duration: 340, ease: "outQuad" }, 1380)
      .add(".mb-envelope", { opacity: [1, 0], duration: 220 }, 1400)
      // Ink out first, so only bare paper scales into the page.
      .add(".mb-ink", { opacity: [1, 0], duration: 260, ease: "inQuad" }, 1560)
      .add(
        ".mb-letter",
        { scale: [1, 26], translateY: [-34, 0], duration: 620, ease: "inOutQuad" },
        1620,
      )
      .add(el, { opacity: [1, 0], duration: 220 }, 2120);

    // Skippable immediately by any input.
    const skip = () => {
      tl.pause();
      animate(el, { opacity: 0, duration: 160, onComplete: finish });
      teardown();
    };
    const teardown = () => {
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
    window.addEventListener("pointerdown", skip, { once: true });
    window.addEventListener("keydown", skip, { once: true });

    return () => {
      teardown();
      tl.pause();
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  if (phase === "done") return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="mailbox-overlay fixed inset-0 z-[100] grid place-items-center bg-paper"
      style={{ perspective: "900px" }}
    >
      <div className="relative h-[320px] w-[280px]">
        {/* ---------- mailbox ---------- */}
        <svg viewBox="0 0 200 220" className="mb-body absolute inset-0 h-full w-full text-pencil">
          <path
            className="mb-line" pathLength={1} strokeDasharray={1} strokeDashoffset={1}
            d="M40 118V92c0-22 18-38 40-38h42c22 0 30 16 30 38v26z"
            strokeWidth={3}
            {...stroke}
          />
          <path className="mb-line" pathLength={1} strokeDasharray={1} strokeDashoffset={1} d="M40 118h112v46H40z" strokeWidth={3} {...stroke} />
          <path className="mb-line" pathLength={1} strokeDasharray={1} strokeDashoffset={1} d="M96 164v40" strokeWidth={3} {...stroke} />
          <path className="mb-line" pathLength={1} strokeDasharray={1} strokeDashoffset={1} d="M72 204h48" strokeWidth={3} {...stroke} />
          {/* flag, pivoting at its base */}
          <g className="mb-flag" style={{ transformOrigin: "152px 108px" }}>
            <path className="mb-line" pathLength={1} strokeDasharray={1} strokeDashoffset={1} d="M152 108V68" strokeWidth={3} {...stroke} />
            <path className="mb-line" pathLength={1} strokeDasharray={1} strokeDashoffset={1} d="M152 70h22v16h-22z" strokeWidth={3} {...stroke} stroke="var(--color-accent)" />
          </g>
        </svg>

        {/* ---------- envelope ---------- */}
        <svg
          viewBox="0 0 200 140"
          className="mb-envelope absolute left-0 top-[76px] h-[140px] w-full text-pencil opacity-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          <rect x={20} y={30} width={160} height={100} rx={4} strokeWidth={3} {...stroke} fill="#ffffff" />
          {/* flap folds up and back */}
          <g className="mb-flap" style={{ transformOrigin: "100px 30px", transformBox: "fill-box" }}>
            <path d="M20 30l80 56 80-56" strokeWidth={3} {...stroke} fill="#ffffff" />
          </g>
        </svg>

        {/* ---------- letter: unfolds, then becomes the page ---------- */}
        <div
          className="mb-letter absolute left-[26px] top-[52px] h-[150px] w-[228px] opacity-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Bare paper. This is the only layer that scales up, and it is the
              same colour as the page, so the expansion lands on the site
              itself rather than on a giant piece of stationery. */}
          <div className="h-full w-full bg-paper">
            {/* Every mark lives in this layer and fades out before the scale,
                otherwise a 3px rule becomes an 80px grey band at 26x. */}
            <div className="mb-ink absolute inset-0 border-2 border-pencil shadow-hard">
              <div
                className="mb-fold-top h-1/3 border-b border-dashed border-pencil/25"
                style={{ transformOrigin: "center bottom", transformStyle: "preserve-3d" }}
              >
                <div className="mt-4 space-y-2 px-5">
                  <div className="h-[3px] w-2/3 bg-pencil/25" />
                  <div className="h-[3px] w-1/2 bg-pencil/20" />
                </div>
              </div>
              <div className="h-1/3 space-y-2 px-5 pt-3">
                <div className="h-[3px] w-5/6 bg-pencil/25" />
                <div className="h-[3px] w-3/4 bg-pencil/20" />
              </div>
              <div
                className="mb-fold-bottom h-1/3 border-t border-dashed border-pencil/25"
                style={{ transformOrigin: "center top", transformStyle: "preserve-3d" }}
              >
                <div className="mt-3 space-y-2 px-5">
                  <div className="h-[3px] w-1/2 bg-pencil/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
