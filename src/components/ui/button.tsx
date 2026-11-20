import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-brand-navy text-white hover:bg-brand-slate shadow-subtle hover:shadow-card",
        primary:
          "bg-brand-blue text-white font-semibold hover:bg-brand-blue-hover shadow-subtle hover:shadow-card border border-blue-600/30",
        secondary:
          "bg-surface text-ink border border-border hover:bg-canvas-muted hover:border-border-strong shadow-subtle",
        outline:
          "border border-border text-ink bg-transparent hover:bg-canvas-muted hover:border-brand-navy",
        ghost:
          "text-ink hover:bg-canvas-muted hover:text-ink",
        link:
          "text-brand-blue underline-offset-4 hover:underline p-0 h-auto font-normal",
        danger:
          "bg-status-error text-white hover:bg-status-error/90 shadow-subtle",
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
