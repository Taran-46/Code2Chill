import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors font-sans",
  {
    variants: {
      variant: {
        default:
          "border border-white/10 bg-white/[0.04] text-ink",
        brand:
          "border border-blue-500/30 bg-blue-500/10 text-brand-cyan font-medium",
        navy:
          "border border-white/15 bg-[#0B1224] text-white font-medium",
        subtle:
          "border border-white/8 bg-white/[0.03] text-ink-muted",
        accent:
          "border border-sky-400/30 bg-sky-400/10 text-sky-300",
        success:
          "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
        warning:
          "border border-amber-500/30 bg-amber-500/10 text-amber-300",
        error:
          "border border-rose-500/30 bg-rose-500/10 text-rose-300",
        lime:
          "border border-lime-400/30 bg-lime-400/10 text-lime-300 font-medium",
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
