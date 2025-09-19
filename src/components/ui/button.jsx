import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover civic-transition",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 civic-transition",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground civic-transition",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 civic-transition",
        ghost: "hover:bg-accent hover:text-accent-foreground civic-transition",
        link: "text-primary underline-offset-4 hover:underline civic-transition",
        // Civic-specific variants
        hero: "civic-hero text-white border-white/20 hover:bg-white/10 hover:border-white/30 civic-transition shadow-lg",
        success: "bg-success text-success-foreground hover:bg-success/90 civic-transition",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90 civic-transition",
        critical: "bg-critical text-critical-foreground hover:bg-critical/90 civic-transition",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? "button" : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
