import Link from "next/link";
import { nav, profile } from "@/lib/content";

export function Nav() {
  return (
    <header className="mx-auto max-w-5xl px-6 pt-8 md:px-8">
      <nav className="flex flex-wrap items-center justify-between gap-4" aria-label="Main">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center font-hand text-2xl"
          aria-label={`NKD, ${profile.name}, home`}
        >
          NKD
        </Link>
        <ul className="flex flex-wrap items-center gap-6">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="wavy-underline inline-flex min-h-12 items-center font-body text-lg"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
