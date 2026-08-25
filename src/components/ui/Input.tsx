import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * §13 usability flag, acted on rather than applied blindly:
 *
 * A wobbly-bordered box risks not reading as a text field, so this component
 * keeps three affordances the aesthetic would otherwise erode —
 *   1. a always-visible <label> (not a placeholder standing in for one),
 *   2. a real focus ring (blue border + ring), never `outline:none` alone,
 *   3. placeholder at pencil/65, not the spec's /40.
 *
 * /40 over white computes to ~2.3:1 contrast, well under the 4.5:1 the build
 * targets; /65 clears it while still reading as lighter than entered text.
 */

const field = cn(
  "w-full min-h-12 rounded-wobbly-sm border-2 border-pencil bg-white",
  "px-4 py-3 font-body text-lg text-pencil",
  "placeholder:text-pencil/65",
  "transition-[border-color,box-shadow] duration-150 ease-out",
  "focus:border-ink focus:ring-2 focus:ring-ink/20 focus:outline-none",
  "aria-[invalid=true]:border-accent aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-accent/20",
);

function Shell({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-hand text-xl">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="font-body text-base text-accent-ink">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type InputProps = ComponentProps<"input"> & {
  id: string;
  label: string;
  error?: string;
};

export function Input({ id, label, error, className, ...rest }: InputProps) {
  return (
    <Shell id={id} label={label} error={error}>
      <input
        id={id}
        className={cn(field, className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
    </Shell>
  );
}

type TextareaProps = ComponentProps<"textarea"> & {
  id: string;
  label: string;
  error?: string;
};

export function Textarea({ id, label, error, className, ...rest }: TextareaProps) {
  return (
    <Shell id={id} label={label} error={error}>
      <textarea
        id={id}
        rows={5}
        className={cn(field, "resize-y", className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
    </Shell>
  );
}
