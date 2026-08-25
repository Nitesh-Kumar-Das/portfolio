import { Card } from "@/components/ui/Card";
import { StickyNote } from "@/components/ui/StickyNote";
import { skills } from "@/lib/content";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-20 md:px-8">
      <StickyNote className="mb-8">Skills</StickyNote>

      <h2 data-reveal className="mb-12 font-hand text-4xl md:text-5xl">Things I reach for</h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => (
          <Card key={group.label} tone="postit" tilt={group.rotate}>
            <h3 className="mb-4 font-hand text-2xl">{group.label}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-wobbly-sm border-2 border-pencil bg-white px-3 py-1 font-body text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
}
