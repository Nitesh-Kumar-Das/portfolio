import type { Metadata } from "next";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StickyNote } from "@/components/ui/StickyNote";
import { Tape } from "@/components/ui/Tape";
import { SketchUnderline } from "@/components/sketch/Sketch";
import { profile, experience, education, skills, achievements } from "@/lib/content";

export const metadata: Metadata = {
  title: `Résumé, ${profile.name}`,
  description: `Download or read the résumé of ${profile.name}, ${profile.role} based in ${profile.location}.`,
};

export default function ResumePage() {
  return (
    <div>
      <Nav />

      <main className="mx-auto max-w-5xl px-6 py-20 md:px-8">
        <div className="mb-8">
          <StickyNote>Résumé</StickyNote>
        </div>

        <h1 className="relative mb-6 inline-block font-hand text-4xl md:text-6xl">
          Résumé
          <SketchUnderline className="absolute -bottom-2 left-0 text-accent" />
        </h1>

        <p className="mb-10 max-w-2xl font-body text-lg md:text-xl">
          {profile.role} in {profile.location}. Grab the PDF, or read the short version below
          if you would rather not download anything.
        </p>

        <div className="mb-16 flex flex-wrap items-center gap-8">
          {/* download forces "save" rather than an in-browser tab */}
          <Button href={profile.resume} download>
            Download PDF
            <Download size={20} strokeWidth={3} aria-hidden="true" />
          </Button>
          <Button href={profile.resume} variant="secondary" external>
            Open in new tab
            <ExternalLink size={20} strokeWidth={3} aria-hidden="true" />
          </Button>
        </div>

        {/*
          Inline preview, desktop only. Mobile browsers handle <object type=
          "application/pdf"> badly — most render a grey box or silently trigger
          a download — so small screens get the buttons above and the readable
          summary below instead of a broken embed.
        */}
        <div className="relative mb-16 hidden md:block">
          <Tape />
          <div className="overflow-hidden rounded-wobbly-md border-[3px] border-pencil bg-white shadow-hard-lg">
            <object
              /*
                toolbar=0&navpanes=0 strips the viewer's dark chrome in
                Chromium so the embed reads as paper rather than as a browser
                widget. Firefox and Safari ignore these and show their own UI,
                which is fine. The Download and Open buttons above mean nothing
                is lost when the toolbar is hidden.
              */
              data={`${profile.resume}#toolbar=0&navpanes=0&view=FitH`}
              type="application/pdf"
              aria-label={`Résumé of ${profile.name}`}
              className="h-[900px] w-full"
            >
              {/* Rendered only when the browser cannot display a PDF inline. */}
              <div className="flex flex-col items-start gap-4 p-8">
                <p className="font-body text-lg">
                  Your browser can&rsquo;t show the PDF inline.
                </p>
                <Button href={profile.resume} download>
                  Download PDF
                  <Download size={20} strokeWidth={3} aria-hidden="true" />
                </Button>
              </div>
            </object>
          </div>
        </div>

        {/* ---- Readable summary: works with no PDF viewer, and is indexable ---- */}
        <h2 className="mb-8 font-hand text-3xl md:text-4xl">The short version</h2>

        <section className="mb-12" aria-labelledby="r-experience">
          <h3 id="r-experience" className="mb-6 font-hand text-2xl">
            Experience
          </h3>
          <div className="flex flex-col gap-8">
            {experience.map((job) => (
              <Card key={`${job.role}-${job.period}`} tilt="-rotate-1">
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-hand text-xl md:text-2xl">{job.role}</h4>
                  <span className="font-body text-base">{job.period}</span>
                </div>
                <p className="mb-4 font-body">
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
        </section>

        <section className="mb-12" aria-labelledby="r-skills">
          <h3 id="r-skills" className="mb-6 font-hand text-2xl">
            Skills
          </h3>
          <dl className="grid gap-6 md:grid-cols-2">
            {skills.map((group) => (
              <div key={group.label}>
                <dt className="mb-2 font-hand text-xl">{group.label}</dt>
                <dd className="font-body">{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mb-12 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 font-hand text-2xl">Education</h3>
            <p className="font-body">{education.degree}</p>
            <p className="font-body">{education.school}</p>
            <p className="font-body">
              {education.year} · CGPA {education.cgpa}
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-hand text-2xl">Achievements</h3>
            <ul className="flex flex-col gap-2">
              {achievements.map((a) => (
                <li key={a} className="font-body">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="flex flex-wrap items-center gap-8">
          <Button href="/" variant="secondary">
            <ArrowLeft size={20} strokeWidth={3} aria-hidden="true" />
            Back to portfolio
          </Button>
          <a
            href={`mailto:${profile.email}`}
            className="wavy-underline inline-flex min-h-12 items-center font-body text-lg"
          >
            {profile.email}
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
