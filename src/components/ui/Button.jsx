import { Loader2 } from "lucide-react";
import { forwardRef } from "react";

/**
 * Professional Button Component
 * Variants: primary, secondary, outline, ghost, destructive
 * Sizes: sm, md, lg
 * States: loading, disabled
 */

const buttonVariants = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500",
  secondary:
    "bg-secondary-600 text-white hover:bg-secondary-700 focus-visible:ring-secondary-500",
  outline:
    "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-500",
  ghost: "text-neutral-700 hover:bg-neutral-100 focus-visible:ring-neutral-500",
  destructive:
    "bg-error-600 text-white hover:bg-error-700 focus-visible:ring-error-500",
};

const buttonSizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      loading = false,
      disabled = false,
      className = "",
      type = "button",
      onClick,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "btn inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantStyles = buttonVariants[variant] || buttonVariants.primary;
    const sizeStyles = buttonSizes[size] || buttonSizes.md;

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        disabled={isDisabled}
        onClick={onClick}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
