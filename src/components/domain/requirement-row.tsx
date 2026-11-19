import * as React from "react";
import { cn } from "@/lib/utils";
import { EvidenceChip } from "./evidence-chip";
import { StatusPill, type FitStatus } from "./status-pill";

type RequirementRowProps = {
  requirement: string;
  status: FitStatus;
  evidence?: { source: string; fact?: string };
  note?: string;
  onAddEvidence?: () => void;
  className?: string;
};

function RequirementRow({
  requirement,
  status,
  evidence,
  note,
  onAddEvidence,
  className,
}: RequirementRowProps) {
  return (
    <li
      data-slot="requirement-row"
      className={cn(
        "flex flex-col gap-3 border-b border-line py-4 last:border-b-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6",
        className,
      )}
    >
      <div className="min-w-0 space-y-1.5">
        <p className="text-sm font-medium text-ink-900">{requirement}</p>
        {note ? <p className="text-sm text-muted">{note}</p> : null}
        {evidence ? (
          <EvidenceChip source={evidence.source} fact={evidence.fact} />
        ) : (
          <p className="text-sm text-muted">
            No evidence found in your profile.{" "}
            {onAddEvidence ? (
              <button
                type="button"
                onClick={onAddEvidence}
                className="rounded-sm font-medium text-accent-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                Add evidence
              </button>
            ) : null}
          </p>
        )}
      </div>
      <StatusPill status={status} className="self-start" />
    </li>
  );
}

export { RequirementRow };
