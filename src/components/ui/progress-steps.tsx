import * as React from "react";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type StepStatus = "complete" | "current" | "upcoming" | "error";

export type Step = {
  label: string;
  description?: string;
  status: StepStatus;
};

const markerStyles: Record<StepStatus, string> = {
  complete: "border-accent-200 bg-accent-100 text-accent-800",
  current: "border-accent bg-accent text-white",
  upcoming: "border-line-strong bg-surface text-muted",
  error: "border-danger-100 bg-danger-50 text-danger-700",
};

const labelStyles: Record<StepStatus, string> = {
  complete: "text-ink-900",
  current: "text-ink-950",
  upcoming: "text-muted",
  error: "text-danger-700",
};

function ProgressSteps({
  steps,
  label = "Progress",
  className,
}: {
  steps: Step[];
  label?: string;
  className?: string;
}) {
  return (
    <ol aria-label={label} className={cn("space-y-0", className)}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <li
            key={step.label}
            aria-current={step.status === "current" ? "step" : undefined}
            className="relative flex gap-3 pb-6 last:pb-0"
          >
            {!isLast ? (
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-8 bottom-0 left-4 w-px",
                  step.status === "complete" ? "bg-accent-200" : "bg-line",
                )}
              />
            ) : null}

            <span
              className={cn(
                "relative z-10 grid size-8 shrink-0 place-items-center rounded-full border font-mono text-data",
                markerStyles[step.status],
              )}
            >
              {step.status === "complete" ? (
                <Check className="size-4" strokeWidth={3} aria-hidden="true" />
              ) : step.status === "error" ? (
                <AlertCircle className="size-4" aria-hidden="true" />
              ) : step.status === "current" ? (
                <Loader2
                  className="size-4 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <span aria-hidden="true">{index + 1}</span>
              )}
            </span>

            <div className="pt-1">
              <p
                className={cn(
                  "text-sm font-medium",
                  labelStyles[step.status],
                )}
              >
                {step.label}
                {step.status === "current" ? (
                  <span className="sr-only"> (in progress)</span>
                ) : null}
              </p>
              {step.description ? (
                <p className="mt-0.5 text-sm text-muted">{step.description}</p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export { ProgressSteps };
