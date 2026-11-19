import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const alertVariants = cva("flex gap-3 rounded-md border p-4 text-sm", {
  variants: {
    tone: {
      info: "border-info-100 bg-info-50 text-info-800",
      success: "border-success-100 bg-success-50 text-success-800",
      warning: "border-warning-100 bg-warning-50 text-warning-800",
      danger: "border-danger-100 bg-danger-50 text-danger-800",
    },
  },
  defaultVariants: {
    tone: "info",
  },
});

const icons: Record<NonNullable<AlertProps["tone"]>, LucideIcon> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: XCircle,
};

type AlertProps = Omit<React.ComponentProps<"div">, "title"> &
  VariantProps<typeof alertVariants> & {
    title?: React.ReactNode;
    action?: React.ReactNode;
  };

function Alert({
  className,
  tone = "info",
  title,
  action,
  children,
  ...props
}: AlertProps) {
  const Icon = icons[tone ?? "info"];

  return (
    <div
      data-slot="alert"
      role={tone === "danger" ? "alert" : "status"}
      className={cn(alertVariants({ tone }), className)}
      {...props}
    >
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        {title ? <p className="font-medium">{title}</p> : null}
        {children ? (
          <div className={cn("text-sm", title && "mt-1")}>{children}</div>
        ) : null}
      </div>
      {action ? <div className="shrink-0 self-center">{action}</div> : null}
    </div>
  );
}

export { Alert, alertVariants };
