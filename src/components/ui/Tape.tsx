import { cn } from "@/lib/cn";

/** Translucent tape strip, top-centre, rotated — pins a card to the page. */
export function Tape({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -top-3 left-1/2 z-10 h-6 w-24",
        "-translate-x-1/2 -rotate-3",
        "bg-pencil/15 border-x border-pencil/20",
        className,
      )}
    />
  );
}
