import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors font-sans",
  {
    variants: {
      variant: {
        default:
          "border border-border bg-surface text-ink",
        brand:
          "border border-blue-200 bg-brand-ice text-brand-blue font-semibold",
        navy:
          "border border-slate-700 bg-brand-navy text-white font-medium",
        subtle:
          "border border-canvas-subtle bg-canvas-muted text-ink-muted",
        accent:
          "border border-sky-200 bg-sky-50 text-sky-700",
        success:
          "border border-status-success/30 bg-emerald-50 text-status-success",
        warning:
          "border border-status-warning/30 bg-amber-50 text-status-warning",
        error:
          "border border-status-error/30 bg-rose-50 text-status-error",
        lime:
          "border border-brand-lime-dark/30 bg-brand-lime text-ink font-semibold",
      },
      size: {
        sm: "text-[11px] px-2 py-0.5",
        default: "text-xs px-2.5 py-0.5",
        lg: "text-sm px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
