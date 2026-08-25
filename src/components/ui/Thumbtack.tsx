import { cn } from "@/lib/cn";

/** Red push-pin. Sits above the card via z-10, outside its padding box. */
export function Thumbtack({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -top-2 left-1/2 z-10 -translate-x-1/2",
        className,
      )}
    >
      <span className="block h-5 w-5 rounded-full border-2 border-pencil bg-accent shadow-hard-sm" />
    </span>
  );
}
