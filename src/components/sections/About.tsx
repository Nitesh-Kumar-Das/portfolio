"use client";

import { useEffect, useRef } from "react";
import { animate, createScope, stagger, splitText } from "animejs";
import { StickyNote } from "@/components/ui/StickyNote";
import { SketchUnderline } from "@/components/sketch/Sketch";
import { about, education, achievements } from "@/lib/content";
import { Card } from "@/components/ui/Card";
import { Award, GraduationCap } from "lucide-react";

export function About() {
  const root = useRef<HTMLElement>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);

  useEffect(() => {
    scope.current = createScope({
      root: root as React.RefObject<HTMLElement>,
      mediaQueries: { reduceMotion: "(prefers-reduced-motion: reduce)" },
    }).add((self) => {
      if (self?.matches?.reduceMotion) return;

      splitText(".about-copy", { words: { wrap: "clip" }, accessible: true }).addEffect(
        ({ words }) =>
          animate(words, {
            y: [{ to: ["100%", "0%"] }],
            duration: 750,
            ease: "out(3)",
            delay: stagger(100),
          }),
      );
    });

    return () => scope.current?.revert();
  }, []);

  return (
    <section ref={root} id="about" className="mx-auto max-w-3xl px-6 py-20 md:px-8">
      <div className="mb-8">
        <StickyNote>About</StickyNote>
      </div>

      <h2 className="relative mb-8 inline-block font-hand text-4xl md:text-5xl">
        The short version
        <SketchUnderline className="absolute -bottom-2 left-0 text-accent" />
      </h2>

      {/*
        .about-copy is the anime.js word-clip target (stage 3). Split text is
        applied to headings only elsewhere; this paragraph is the one exception
        the spec calls for, so it carries accessible:true and an aria-label.
      */}
      <p className="about-copy font-body text-lg md:text-xl" aria-label={about}>
        {about}
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <Card tone="muted" tilt="-rotate-1" interactive={false}>
          <h3 className="mb-3 flex items-center gap-2 font-hand text-2xl">
            <GraduationCap size={26} strokeWidth={2.5} aria-hidden="true" />
            Education
          </h3>
          <p className="font-body">{education.degree}</p>
          <p className="font-body">{education.school}</p>
          <p className="font-body">
            {education.year} · CGPA {education.cgpa}
          </p>
        </Card>

        <Card tone="muted" tilt="rotate-1" interactive={false}>
          <h3 className="mb-3 flex items-center gap-2 font-hand text-2xl">
            <Award size={26} strokeWidth={2.5} aria-hidden="true" />
            Achievements
          </h3>
          <ul className="flex flex-col gap-2">
            {achievements.map((a) => (
              <li key={a} className="font-body">
                {a}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
