import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { LucideIcon } from "lucide-react";
import { LoadingSpinner } from "@/components";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 capitalize",
  {
    variants: {
      variant: {
        default: "bg-primary text-background shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const iconSizeVariants = cva("opacity-50", {
  variants: {
    size: {
      default: "!size-5",
      sm: "!size-4",
      lg: "!size-6",
      icon: "!size-5",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  icon?: LucideIcon;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  iconClassName?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      loadingText,
      icon: Icon,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      iconClassName,
      disabled,
      children,
      type,
      ...props
    },
    ref
  ) => {
    const iconClassNames = cn(iconSizeVariants({ size }), iconClassName);
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} type={type || "button"} disabled={disabled || isLoading} {...props}>
        {LeftIcon && !isLoading && <LeftIcon className={iconClassNames} aria-hidden={true} />}
        {isLoading ? (
          <LoadingSpinner iconClassName={cn(iconClassNames, "opacity-100")} loadingText={size == "icon" ? null : loadingText || children} />
        ) : size == "icon" && Icon ? (
          <>
            <Icon className={cn(iconClassNames, "opacity-100")} aria-hidden={true} />
            <span className="sr-only">{children}</span>
          </>
        ) : (
          children
        )}
        {RightIcon && !isLoading && <RightIcon className={iconClassNames} aria-hidden={true} />}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
