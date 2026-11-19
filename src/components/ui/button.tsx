import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-medium transition-colors duration-[120ms] ease-brand disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-white shadow-xs hover:bg-accent-700 active:bg-accent-800",
        secondary:
          "border border-line-strong bg-surface text-ink-900 shadow-xs hover:border-ink-300 hover:bg-paper-100 active:bg-paper-200",
        ghost:
          "text-ink-700 hover:bg-paper-100 hover:text-ink-950 active:bg-paper-200",
        destructive:
          "bg-danger-700 text-white shadow-xs hover:bg-danger-800 active:bg-danger-800",
        link: "rounded-none text-accent-700 underline-offset-4 hover:text-accent-800 hover:underline",
      },
      size: {
        sm: "h-11 px-3 text-sm [&_svg]:size-4",
        md: "h-11 px-4 text-sm [&_svg]:size-4",
        lg: "h-12 px-6 text-base [&_svg]:size-5",
        icon: "size-11 [&_svg]:size-5",
      },
    },
    compoundVariants: [
      { variant: "link", class: "h-auto px-0 py-1" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  if (asChild) {
    return (
      <Slot
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </Slot>
    );
  }

  return (
    <button
      data-slot="button"
      {...props}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {loading ? (
        <Loader2 className="animate-spin" aria-hidden="true" />
      ) : null}
      {children}
    </button>
  );
}

type IconButtonProps = Omit<ButtonProps, "size" | "children"> & {
  label: string;
  children: React.ReactNode;
};

function IconButton({ label, children, ...props }: IconButtonProps) {
  return (
    <Button size="icon" aria-label={label} {...props}>
      {children}
    </Button>
  );
}

export { Button, IconButton, buttonVariants };
export type { ButtonProps };
