import * as React from "react";
import { CheckCircle2, CircleDashed, CircleDot } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusPill, type FitStatus } from "./status-pill";

type FitSummaryProps = {
  supported: number;
  partial: number;
  notEvidenced: number;
  status?: FitStatus;
  verifiedAt?: string;
  className?: string;
};

function FitSummary({
  supported,
  partial,
  notEvidenced,
  status,
  verifiedAt,
  className,
}: FitSummaryProps) {
  const total = supported + partial + notEvidenced;

  const computedStatus: FitStatus =
    supported + partial === 0
      ? "not-evidenced"
      : supported === total
        ? "supported"
        : "partial";

  const rows = [
    {
      label: "Supported",
      count: supported,
      icon: CheckCircle2,
      tone: "text-success-700",
    },
    {
      label: "Partially supported",
      count: partial,
      icon: CircleDot,
      tone: "text-warning-700",
    },
    {
      label: "Not evidenced",
      count: notEvidenced,
      icon: CircleDashed,
      tone: "text-muted",
    },
  ];

  return (
    <div
      data-slot="fit-summary"
      className={cn(
        "rounded-md border border-line bg-surface p-5 shadow-sm",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-micro uppercase text-muted">Evidence summary</p>
        <StatusPill status={status ?? computedStatus} />
      </div>

      <dl className="mt-4 space-y-2">
        {rows.map((row) => {
          const Icon = row.icon;
          return (
            <div
              key={row.label}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <dt className="flex items-center gap-2 text-ink-700">
                <Icon
                  className={cn("size-4 shrink-0", row.tone)}
                  aria-hidden="true"
                />
                {row.label}
              </dt>
              <dd className="font-mono text-data font-medium text-ink-950">
                {row.count}
              </dd>
            </div>
          );
        })}
      </dl>

      <p className="mt-4 border-t border-line pt-3 text-xs leading-5 text-muted">
        Based on {total} requirement{total === 1 ? "" : "s"}. This is an
        evidence count, not a score or a probability.
        {verifiedAt ? ` Profile verified ${verifiedAt}.` : null}
      </p>
    </div>
  );
}

export { FitSummary };
