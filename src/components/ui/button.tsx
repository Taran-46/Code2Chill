import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-white/[0.08] text-white hover:bg-white/[0.14] border border-white/12 shadow-subtle hover:border-white/25",
        primary:
          "bg-brand-blue text-white font-semibold hover:bg-brand-blue-hover shadow-[0_0_24px_-4px_rgba(37,99,235,0.5)] hover:shadow-[0_0_32px_-4px_rgba(56,189,248,0.6)] border border-blue-400/40",
        secondary:
          "bg-surface text-ink border border-white/10 hover:bg-white/[0.06] hover:border-white/20 shadow-subtle",
        outline:
          "border border-white/12 text-ink bg-transparent hover:bg-white/[0.04] hover:border-brand-cyan/60 hover:text-white",
        ghost:
          "text-ink-muted hover:bg-white/[0.06] hover:text-white",
        link:
          "text-brand-cyan underline-offset-4 hover:underline p-0 h-auto font-normal",
        danger:
          "bg-status-error/90 text-white hover:bg-status-error shadow-subtle border border-rose-500/30",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-6 text-base font-semibold",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
