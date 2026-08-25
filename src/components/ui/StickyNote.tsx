import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Post-it section label. Rotated, post-it yellow, hard shadow. */
export function StickyNote({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block -rotate-2 bg-postit px-4 py-2",
        "border-2 border-pencil shadow-hard-sm",
        "font-body text-scrawl uppercase tracking-[0.18em]",
        className,
      )}
    >
      {children}
    </span>
  );
}
