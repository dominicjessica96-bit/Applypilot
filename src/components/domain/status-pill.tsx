import * as React from "react";
import {
  Ban,
  CheckCircle2,
  CircleDashed,
  CircleDot,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type FitStatus =
  | "supported"
  | "partial"
  | "not-evidenced"
  | "not-eligible";

const statusConfig: Record<
  FitStatus,
  { label: string; icon: LucideIcon; tone: string }
> = {
  supported: {
    label: "Supported",
    icon: CheckCircle2,
    tone: "border-success-100 bg-success-50 text-success-700",
  },
  partial: {
    label: "Partially supported",
    icon: CircleDot,
    tone: "border-warning-100 bg-warning-50 text-warning-700",
  },
  "not-evidenced": {
    label: "Not evidenced",
    icon: CircleDashed,
    tone: "border-line-strong bg-paper-100 text-ink-700",
  },
  "not-eligible": {
    label: "Not eligible",
    icon: Ban,
    tone: "border-danger-100 bg-danger-50 text-danger-700",
  },
};

function StatusPill({
  status,
  label,
  className,
}: {
  status: FitStatus;
  label?: React.ReactNode;
  className?: string;
}) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      data-slot="status-pill"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap",
        config.tone,
        className,
      )}
    >
      <Icon className="size-3.5 shrink-0" aria-hidden="true" />
      <span>{label ?? config.label}</span>
    </span>
  );
}

export { StatusPill, statusConfig };
