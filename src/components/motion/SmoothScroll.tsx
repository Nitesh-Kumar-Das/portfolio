"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";

// Module scope — registers exactly once, never per render.
gsap.registerPlugin(ScrollTrigger);

/**
 * The single scroll owner for the whole page.
 *
 * ONE RAF loop for the DOM: GSAP's ticker drives Lenis, which runs with
 * autoRaf:false. R3F keeps its own loop, which is fine and separate.
 *
 * TREE SHAPE IS FIXED ON PURPOSE. An earlier version rendered `<>{children}</>`
 * under reduced motion and `<ReactLenis>{children}</ReactLenis>` otherwise.
 * Flipping between the two once the media query resolved remounted the whole
 * page, silently detaching every node ScrollTrigger had already measured — the
 * reveals stopped firing, with nothing in the console. ReactLenis therefore
 * always renders, and reduced motion is handled on the instance instead, which
 * leaves the React tree untouched.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let tickerFn: ((time: number) => void) | null = null;

    const teardown = () => {
      if (tickerFn) {
        gsap.ticker.remove(tickerFn);
        tickerFn = null;
      }
      lenisRef.current?.lenis?.off("scroll", ScrollTrigger.update);
    };

    const apply = () => {
      teardown();

      if (mq.matches) {
        // Native scroll, no smoothing. A CSS media query cannot switch a JS
        // library off — it has to be told directly.
        lenisRef.current?.lenis?.stop();
        ScrollTrigger.refresh();
        return;
      }

      lenisRef.current?.lenis?.start();

      // The ticker reads the ref EVERY FRAME rather than capturing the instance
      // once. ReactLenis populates the ref on its own schedule, and capturing it
      // here made apply() bail before adding the ticker — Lenis then swallowed
      // wheel events (lenis-smooth) with nothing pumping raf, so the page simply
      // would not scroll.
      //
      // Setup order: plugin registered (module scope) → Lenis with autoRaf:false
      // → ticker drives it → lagSmoothing off → ScrollTrigger listens → refresh.
      tickerFn = (time: number) => lenisRef.current?.lenis?.raf(time * 1000); // s → ms
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
      attachScrollListener();
      ScrollTrigger.refresh();
    };

    // The instance may not exist on the first pass; retry on animation frames.
    let attachTries = 0;
    const attachScrollListener = () => {
      const lenis = lenisRef.current?.lenis;
      if (lenis) {
        lenis.on("scroll", ScrollTrigger.update);
        ScrollTrigger.refresh();
      } else if (attachTries++ < 60) {
        requestAnimationFrame(attachScrollListener);
      }
    };

    apply();

    // Toggling the OS setting takes effect live, without a reload.
    mq.addEventListener("change", apply);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    // Fonts land after first paint and change every measurement.
    document.fonts?.ready.then(refresh);

    return () => {
      mq.removeEventListener("change", apply);
      window.removeEventListener("resize", refresh);
      teardown();
    };
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={{ lerp: 0.1, autoRaf: false }}>
      {children}
    </ReactLenis>
  );
}
