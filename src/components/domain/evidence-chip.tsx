import * as React from "react";
import { Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

type EvidenceChipProps = {
  source: string;
  fact?: string;
  onClick?: () => void;
  className?: string;
};

function EvidenceChip({ source, fact, onClick, className }: EvidenceChipProps) {
  const content = (
    <>
      <Link2 className="size-3.5 shrink-0 text-accent-700" aria-hidden="true" />
      <span className="shrink-0 font-medium text-ink-900">{source}</span>
      {fact ? (
        <>
          <span aria-hidden="true" className="text-ink-300">
            ·
          </span>
          <span className="truncate text-muted">“{fact}”</span>
        </>
      ) : null}
    </>
  );

  const classes = cn(
    "inline-flex max-w-full items-center gap-1.5 rounded-sm border border-line bg-surface px-2 py-1 text-left text-xs shadow-xs",
    onClick &&
      "transition-colors duration-[120ms] ease-brand hover:border-ink-300 hover:bg-paper-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
    className,
  );

  if (onClick) {
    return (
      <button
        type="button"
        data-slot="evidence-chip"
        onClick={onClick}
        className={classes}
        title={fact ? `Source: ${fact}` : `Source: ${source}`}
      >
        {content}
      </button>
    );
  }

  return (
    <span data-slot="evidence-chip" className={classes} title={fact}>
      {content}
    </span>
  );
}

export { EvidenceChip };
