/**
 * Professional Badge Component
 * Variants: default, success, warning, error, info
 */

const badgeVariants = {
  default: "bg-neutral-100 text-neutral-700 border-neutral-200",
  success: "bg-success-50 text-success-700 border-success-200",
  warning: "bg-warning-50 text-warning-700 border-warning-200",
  error: "bg-error-50 text-error-700 border-error-200",
  info: "bg-secondary-50 text-secondary-700 border-secondary-200",
  primary: "bg-primary-50 text-primary-700 border-primary-200",
};

const Badge = ({ children, variant = "default", className = "", ...props }) => {
  const baseStyles =
    "badge inline-flex items-center px-2 py-1 text-xs font-medium rounded border";
  const variantStyles = badgeVariants[variant] || badgeVariants.default;

  return (
    <span className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </span>
  );
};

export default Badge;
