import { Briefcase } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { StickyNote } from "@/components/ui/StickyNote";
import { RoughCircle, SketchBadge, Squiggle } from "@/components/sketch/Sketch";
import { ProjectArtMotion } from "@/components/motion/ProjectArtMotion";
import { experience, projects } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-5xl px-6 py-20 md:px-8">
      <StickyNote className="mb-8">Experience</StickyNote>
      <h2 data-reveal className="mb-12 font-hand text-4xl md:text-5xl">Where I&rsquo;ve been</h2>

      <div className="flex flex-col gap-8">
        {experience.map((job, i) => (
          <Card
            key={`${job.role}-${job.period}`}
            decoration="tape"
            tilt={i % 2 === 0 ? "-rotate-1" : "rotate-1"}
          >
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="flex items-center gap-2 font-hand text-2xl md:text-3xl">
                <Briefcase size={24} strokeWidth={2.5} aria-hidden="true" />
                {job.role}
              </h3>
              <span
                className={cn(
                  "font-body text-base",
                  job.current && "border-2 border-accent px-2 text-accent-ink",
                )}
              >
                {job.period}
              </span>
            </div>
            <p className="mb-4 font-body text-lg">
              {job.company}, {job.place}
            </p>
            <ul className="flex max-w-3xl flex-col gap-2">
              {job.points.map((p) => (
                <li key={p} className="font-body before:mr-2 before:content-['-']">
                  {p}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      {/* ---------------- Projects ---------------- */}
      <div className="mt-20">
        <div className="mb-8">
          <StickyNote>Projects</StickyNote>
        </div>
        <h2 data-reveal className="mb-12 font-hand text-4xl md:text-5xl">
          Things I built
        </h2>

        <div className="flex flex-col">
          {projects.map((project, i) => (
            <div key={project.title}>
              <div className="relative">
                <Card decoration="tack" tilt={i % 2 === 0 ? "rotate-1" : "-rotate-1"}>
                  <div className="grid gap-6 md:grid-cols-[minmax(0,240px)_1fr] md:gap-8">
                  <ProjectArtMotion art={project.art} />
                  <div>
                  <div className="mb-2 flex flex-wrap items-baseline gap-x-3">
                    {/* Dashed-circle highlight rings the featured project's title. */}
                    <h3 className="relative inline-block px-3 py-1 font-hand text-2xl md:text-3xl">
                      {project.title}
                      {project.featured && (
                        <RoughCircle dashed stretch className="text-accent" />
                      )}
                    </h3>
                    <p className="font-body text-lg text-pencil/75">{project.tagline}</p>
                  </div>

                  <ul className="mb-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-wobbly-sm border-2 border-dashed border-pencil px-3 py-1 font-body text-base"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <ul className="mb-6 flex max-w-3xl flex-col gap-2">
                    {project.points.map((p) => (
                      <li key={p} className="font-body before:mr-2 before:content-['-']">
                        {p}
                      </li>
                    ))}
                  </ul>

                  {/* Source only — none of the three has a live deployment,
                      so no "Live Demo" affordance is rendered for any of them. */}
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="wavy-underline inline-flex min-h-12 items-center gap-2 font-body text-lg"
                  >
                    <SketchBadge>GH</SketchBadge>
                    View source
                  </a>
                  </div>
                  </div>
                </Card>
              </div>

              {/* Squiggly connector between entries — decorative, md+ only */}
              {i < projects.length - 1 && (
                <Squiggle className="mx-auto hidden text-pencil/50 md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
