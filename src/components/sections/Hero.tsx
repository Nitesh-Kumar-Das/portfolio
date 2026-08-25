"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { animate, createScope, stagger, splitText, svg } from "animejs";
import Image from "next/image";
import { ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StickyNote } from "@/components/ui/StickyNote";
import { CornerMarks, RoughCircle, SketchArrow } from "@/components/sketch/Sketch";
import { profile } from "@/lib/content";
import { SketchLoader } from "@/components/canvas/SketchLoader";

/*
 * ssr:false is mandatory — three/drei touch `window` and WebGL, which would
 * throw during SSR and desync hydration. It also code-splits the whole 3D
 * stack out of the initial JS bundle.
 */
const Scene = dynamic(() => import("@/components/canvas/Scene"), {
  ssr: false,
  loading: () => <SketchLoader />,
});

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);
  // Gate the canvas on viewport width so phones never create a GL context at
  // all — cheaper than mounting it and hiding it with CSS.
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    /*
     * The opening moment now belongs to MailboxLoader. What is left here is
     * ordinary on-load choreography for the headline and the sketch marks.
     */
    scope.current = createScope({
      root: root as React.RefObject<HTMLElement>,
      // A CSS media query cannot gate a JS library; anime.js needs its own.
      mediaQueries: { reduceMotion: "(prefers-reduced-motion: reduce)" },
    }).add((self) => {
      if (self?.matches?.reduceMotion) return; // page just appears, no intro

      /*
       * addEffect() is MANDATORY here, not stylistic. The splitter re-splits on
       * resize and again once fonts load — and Kalam/Patrick Hand load async,
       * so an animation declared outside an effect would be orphaned by the
       * very first re-split and never run.
       *
       * Timings are tuned to land the whole sequence under the 1.5s budget:
       * last character settles at ~15x30 + 380 + 80 + 460 = ~1.37s.
       */
      splitText(".hero-name", { chars: true, accessible: true }).addEffect(
        ({ chars }) =>
          animate(chars, {
            y: [
              { to: "-2.75rem", ease: "outExpo", duration: 380 },
              { to: 0, ease: "outBounce", duration: 460, delay: 80 },
            ],
            rotate: { from: "-1turn" },
            delay: stagger(30),
          }),
      );

      // Hand-drawn marks draw themselves on, using anime's own drawable —
      // not manual getTotalLength() maths, not GSAP DrawSVGPlugin.
      const drawables = svg.createDrawable(".sketch-path");
      animate(drawables, { draw: "0 1", duration: 700, ease: "inOutQuad", delay: stagger(60) });
    });


    // Handles unmount AND React StrictMode's double-invoke.
    return () => scope.current?.revert();
  }, []);

  return (
    <section ref={root} className="relative mx-auto max-w-5xl px-6 py-20 md:px-8">
      {/*
        Decorative only — crowds small screens, adds nothing there.
        Two nodes on purpose: Tailwind v4's -translate-x-* writes the `translate`
        property, and so does the bob keyframe. Positioning lives on the outer
        node, the animation on the inner one, so neither clobbers the other.
      */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/3 hidden h-16 w-16 -translate-x-[150%] text-accent lg:block"
      >
        <div className="bounce-slow relative h-full w-full">
          <RoughCircle />
        </div>
      </div>

      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-8">
        {/* ---- Copy ---- */}
        <div className="flex flex-col items-start gap-6">
          <StickyNote>{profile.location}</StickyNote>

          {/*
            .hero-name is the anime.js splitText target (stage 3).
            aria-label + aria-hidden spans keep the accessible name intact once
            the text is split into decorative per-character spans.
          */}
          <h1
            className="hero-name font-hand text-shout leading-[0.95]"
            aria-label={profile.name}
          >
            {profile.name}
          </h1>

          <p className="max-w-md font-body text-lg md:text-xl">{profile.valueProp}</p>

          <div className="relative flex flex-wrap items-center gap-8">
            <Button href="#work">
              See my work
              <ArrowDown size={20} strokeWidth={3} aria-hidden="true" />
            </Button>

            <Button href={profile.resumePage} variant="secondary">
              Résumé
              <Download size={20} strokeWidth={3} aria-hidden="true" />
            </Button>

            {/* Dashed arrow pointing at the primary CTA — decorative, md+ only */}
            <SketchArrow
              className="absolute left-8 top-full hidden -scale-y-100 text-accent md:block"
            />
          </div>

          {/* Sketch-styled 3D solid, sharing the page's paper grain. */}
          <div className="hidden h-56 w-full md:block" aria-hidden="true">
            {isDesktop ? <Scene /> : <SketchLoader />}
          </div>
        </div>

        {/* ---- Avatar ---- */}
        <div className="relative mx-auto w-full max-w-[280px] md:max-w-[340px]">
          <div className="relative rotate-2 p-4">
            {/*
              The photo is duotoned toward paper/pencil and shares the page's
              grain so a studio headshot doesn't float on its own glossy plane
              (the §5 "sitting on paper" rule, applied to photography).
              Hovering restores full colour.
            */}
            <div className="paper-grain overflow-hidden rounded-wobbly-md border-[3px] border-pencil shadow-hard-lg">
              <Image
                src={profile.photo}
                alt={`${profile.name}, ${profile.role}`}
                width={profile.photoWidth}
                height={profile.photoHeight}
                priority
                sizes="(max-width: 768px) 280px, 340px"
                className="photo-paper h-auto w-full"
              />
            </div>
            <CornerMarks className="text-pencil" />
          </div>
        </div>
      </div>
    </section>
  );
}
