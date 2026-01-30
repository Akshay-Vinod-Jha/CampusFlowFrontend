/**
 * Professional Card Component
 * Clean container with soft shadows
 * Optional: hover effect, padding variants
 */

const Card = ({
  children,
  className = "",
  hover = false,
  padding = "default",
  ...props
}) => {
  const baseStyles =
    "card bg-white rounded-lg shadow-soft border border-neutral-200";
  const hoverStyles = hover
    ? "card-hover hover:shadow-soft-md transition-shadow duration-200"
    : "";

  const paddingStyles = {
    none: "",
    sm: "p-3",
    default: "p-4",
    lg: "p-6",
  };

  const paddingClass = paddingStyles[padding] || paddingStyles.default;

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${paddingClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "", ...props }) => (
  <h3
    className={`text-xl font-semibold text-neutral-900 ${className}`}
    {...props}
  >
    {children}
  </h3>
);

const CardDescription = ({ children, className = "", ...props }) => (
  <p className={`text-sm text-neutral-600 mt-1 ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = "", ...props }) => (
  <div className={`mt-4 flex items-center gap-2 ${className}`} {...props}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
