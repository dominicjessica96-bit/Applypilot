import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type ApplicationStatus =
  | "draft"
  | "preparing"
  | "ready"
  | "applied"
  | "interview"
  | "offer"
  | "rejected"
  | "withdrawn";

const statusConfig: Record<
  ApplicationStatus,
  { label: string; tone: string }
> = {
  draft: {
    label: "Draft",
    tone: "border-line-strong bg-paper-100 text-ink-700",
  },
  preparing: {
    label: "Preparing",
    tone: "border-accent-200 bg-accent-100 text-accent-800",
  },
  ready: {
    label: "Ready to submit",
    tone: "border-accent-200 bg-accent-100 text-accent-800",
  },
  applied: {
    label: "Applied",
    tone: "border-info-100 bg-info-50 text-info-700",
  },
  interview: {
    label: "Interview",
    tone: "border-info-100 bg-info-50 text-info-700",
  },
  offer: {
    label: "Offer",
    tone: "border-success-100 bg-success-50 text-success-700",
  },
  rejected: {
    label: "Rejected",
    tone: "border-line-strong bg-paper-100 text-muted",
  },
  withdrawn: {
    label: "Withdrawn",
    tone: "border-line-strong bg-paper-100 text-muted",
  },
};

function ApplicationRow({
  role,
  company,
  status,
  updated,
  nextAction,
  onOpen,
  className,
}: {
  role: string;
  company: string;
  status: ApplicationStatus;
  updated: string;
  nextAction?: string;
  onOpen?: () => void;
  className?: string;
}) {
  const config = statusConfig[status];

  return (
    <div
      data-slot="application-row"
      className={cn(
        "flex flex-col gap-3 border-b border-line py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6",
        className,
      )}
    >
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink-950">{role}</p>
        <p className="mt-0.5 text-sm text-muted">
          {company} · Updated {updated}
        </p>
        {nextAction ? (
          <p className="mt-1.5 text-sm text-ink-700">{nextAction}</p>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <span
          className={cn(
            "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap",
            config.tone,
          )}
        >
          {config.label}
        </span>
        <Button variant="ghost" size="sm" onClick={onOpen}>
          Open
          <ChevronRight aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}

export { ApplicationRow, statusConfig as applicationStatusConfig };
