"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "size-5 shrink-0 rounded-full border border-line-strong bg-surface shadow-xs transition-colors duration-[120ms] ease-brand hover:border-ink-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-accent",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="grid place-items-center">
        <span className="size-2.5 rounded-full bg-accent" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

function RadioOption({
  id,
  value,
  label,
  description,
}: {
  id: string;
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <RadioGroupItem id={id} value={value} className="mt-0.5" />
      <div className="space-y-0.5">
        <label htmlFor={id} className="text-sm font-medium text-ink-900">
          {label}
        </label>
        {description ? (
          <p className="text-sm text-muted">{description}</p>
        ) : null}
      </div>
    </div>
  );
}

export { RadioGroup, RadioGroupItem, RadioOption };
