import * as React from "react";
import { AlertCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "text-sm font-medium text-ink-900 select-none",
        className,
      )}
      {...props}
    />
  );
}

type FieldProps = {
  label: React.ReactNode;
  htmlFor: string;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  optional?: boolean;
  children: React.ReactNode;
  className?: string;
};

/**
 * Groups a label, control, hint, and error.
 * Wire the control with `aria-describedby="{id}-hint"` or `"{id}-error"`
 * and `aria-invalid` when an error is present.
 */
function Field({
  label,
  htmlFor,
  hint,
  error,
  optional = false,
  children,
  className,
}: FieldProps) {
  return (
    <div data-slot="field" className={cn("space-y-1.5", className)}>
      <Label htmlFor={htmlFor}>
        {label}
        {optional ? (
          <span className="ml-1.5 font-normal text-muted">(optional)</span>
        ) : null}
      </Label>
      {children}
      {error ? (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="flex items-start gap-1.5 text-sm text-danger-700"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p id={`${htmlFor}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

const controlBase =
  "w-full rounded-sm border border-line-strong bg-surface text-sm text-foreground shadow-xs transition-colors duration-[120ms] ease-brand placeholder:text-ink-300 hover:border-ink-300 focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:cursor-not-allowed disabled:border-line disabled:bg-paper-100 disabled:text-muted disabled:shadow-none aria-invalid:border-danger-700 aria-invalid:focus-visible:outline-danger-700";

function Input({ className, type = "text", ...props }: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(controlBase, "h-11 px-3", className)}
      {...props}
    />
  );
}

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(controlBase, "min-h-28 resize-y px-3 py-2.5", className)}
      {...props}
    />
  );
}

function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        data-slot="select"
        className={cn(controlBase, "h-11 appearance-none pr-9 pl-3", className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
    </div>
  );
}

function CharacterCounter({
  value,
  max,
  className,
}: {
  value: number;
  max: number;
  className?: string;
}) {
  const over = value > max;

  return (
    <p
      aria-live="polite"
      className={cn(
        "text-right text-sm",
        over ? "text-danger-700" : "text-muted",
        className,
      )}
    >
      <span className="font-mono text-data">{value}</span> / {max}
      {over ? " — over the limit" : ""}
    </p>
  );
}

export { Label, Field, Input, Textarea, Select, CharacterCounter };
