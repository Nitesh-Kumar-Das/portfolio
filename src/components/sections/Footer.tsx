import Link from "next/link";
import { profile } from "@/lib/content";
import { SketchDivider } from "@/components/sketch/Sketch";

export function Footer() {
  return (
    <footer className="mx-auto max-w-5xl px-6 pb-16 md:px-8">
      <SketchDivider className="mb-8 text-pencil/40" />
      <div className="flex flex-wrap items-center justify-between gap-6">
        <p className="font-body text-base">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js.
        </p>
        <ul className="flex flex-wrap gap-6">
          <li>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="strike-hover inline-flex min-h-12 items-center font-body text-base"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="strike-hover inline-flex min-h-12 items-center font-body text-base"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <Link
              href={profile.resumePage}
              className="strike-hover inline-flex min-h-12 items-center font-body text-base"
            >
              Résumé
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
