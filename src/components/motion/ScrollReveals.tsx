"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * All ScrollTrigger work for the page.
 *
 * TRANSFORM OWNERSHIP (§2): every target here is a `.card-reveal-wrapper`, the
 * OUTER node. Framer Motion's hover/tap lives on the inner <m.div>. A card
 * hovered mid-reveal therefore has two independent transform stacks instead of
 * two libraries writing the same one every frame.
 *
 * The hero is deliberately excluded — anime.js choreographs its entrance, and
 * it is the LCP element, so it must not start at opacity 0.
 */
export function ScrollReveals() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ---- Full motion -----------------------------------------------------
      // Nothing here pins or parallaxes: entrance only, then the element stays
      // exactly where the layout put it.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const sections = gsap.utils.toArray<HTMLElement>(
          "#about, #skills, #work, #contact",
        );

        sections.forEach((section) => {
          const wrappers = gsap.utils.toArray<HTMLElement>(
            ".card-reveal-wrapper",
            section,
          );
          if (wrappers.length) {
            gsap.from(wrappers, {
              y: 28,
              opacity: 0,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.1,
              scrollTrigger: { trigger: section, start: "top 85%" },
            });
          }

          const heads = gsap.utils.toArray<HTMLElement>("[data-reveal]", section);
          if (heads.length) {
            gsap.from(heads, {
              y: 20,
              opacity: 0,
              duration: 0.45,
              ease: "power2.out",
              stagger: 0.08,
              scrollTrigger: { trigger: section, start: "top 88%" },
            });
          }
        });
      });

      // ---- Reduced motion: fades only, never transforms --------------------
      mm.add("(prefers-reduced-motion: reduce)", () => {
        const all = gsap.utils.toArray<HTMLElement>(
          "#about .card-reveal-wrapper, #skills .card-reveal-wrapper, #work .card-reveal-wrapper, #contact .card-reveal-wrapper",
        );
        gsap.from(all, {
          opacity: 0,
          duration: 0.3,
          stagger: 0.04,
          scrollTrigger: { trigger: "#about", start: "top 90%" },
        });
      });

      return () => mm.revert();
    });

    return () => ctx.revert();
  }, []);

  return null;
}
