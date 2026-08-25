"use client";

import { useEffect, useRef } from "react";
import { animate, createScope, stagger, svg, utils } from "animejs";
import { ProjectArt } from "@/components/sketch/ProjectArt";
import type { ProjectArt as ArtKey } from "@/lib/content";

/**
 * Plays one project's diagram, in place, the first time it scrolls into view.
 *
 * Gated on IntersectionObserver rather than run on mount: five diagrams all
 * animating at page load would be wasted work for the four below the fold, and
 * nothing here loops, so an offscreen card costs exactly nothing.
 *
 * Nothing about this moves the element. The card stays where the layout put it;
 * only the artwork inside it animates.
 */
export function ProjectArtMotion({ art }: { art: ArtKey }) {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    // A CSS media query cannot gate a JS library. Under reduced motion the SVG
    // simply stays in its natural, fully drawn state and no scope is created.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let played = false;

    /*
     * Arm on MOUNT, not on intersection.
     *
     * anime only applies a drawable's initial state when its animation starts.
     * Arming late meant the card scrolled into view fully drawn, snapped blank,
     * then drew itself in — a visible pop. Snapping everything to its "not yet"
     * state up front means the card is already blank when it arrives.
     */
    let armed: ReturnType<typeof svg.createDrawable> | null = null;
    scope.current = createScope({ root: root as React.RefObject<HTMLElement> }).add(() => {
      armed = svg.createDrawable(".sketch-path");
      animate(armed, { draw: "0 0", duration: 0 });
      utils.set(".art-move", { opacity: 0 });
      utils.set(".art-scan, .art-pulse", { opacity: 0 });
      utils.set(".art-bar", { scaleY: 0 });
    });

    const play = () => {
      if (played) return;
      played = true;

      scope.current?.add(() => {
        // 1. Ink the line work on.
        const drawables = armed ?? svg.createDrawable(".sketch-path");
        animate(drawables, {
          draw: "0 1",
          duration: 620,
          ease: "inOutQuad",
          delay: stagger(28),
        });

        // 2. Then the moving parts arrive, after the lines have landed.
        animate(".art-move", {
          opacity: [0, 1],
          scale: [0.86, 1],
          duration: 380,
          ease: "outBack",
          delay: stagger(70, { start: 420 }),
        });

        // 3. Per-diagram accents.
        animate(".art-scan", {
          translateY: [0, 62],
          opacity: [0, 1, 1, 0],
          duration: 900,
          ease: "inOutSine",
          delay: 500,
        });

        animate(".art-bar", {
          scaleY: [0, 1],
          duration: 420,
          ease: "outBack",
          delay: stagger(90, { start: 700 }),
        });

        animate(".art-pulse", {
          translateX: [-38, 38],
          translateY: [-26, 26],
          opacity: [0, 1, 0],
          duration: 780,
          ease: "inOutQuad",
          delay: 620,
        });
      });
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.25 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      scope.current?.revert();
    };
  }, []);

  return (
    <div ref={root}>
      <ProjectArt art={art} />
    </div>
  );
}
