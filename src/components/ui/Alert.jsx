import {
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  X,
} from "lucide-react";

/**
 * Professional Alert Component
 * Variants: success, error, warning, info
 * Optional: dismissible
 */

const alertVariants = {
  success: {
    container: "bg-success-50 border-success-200 text-success-800",
    icon: CheckCircle2,
    iconColor: "text-success-600",
  },
  error: {
    container: "bg-error-50 border-error-200 text-error-800",
    icon: AlertCircle,
    iconColor: "text-error-600",
  },
  warning: {
    container: "bg-warning-50 border-warning-200 text-warning-800",
    icon: AlertTriangle,
    iconColor: "text-warning-600",
  },
  info: {
    container: "bg-secondary-50 border-secondary-200 text-secondary-800",
    icon: Info,
    iconColor: "text-secondary-600",
  },
};

const Alert = ({
  children,
  variant = "info",
  title,
  onClose,
  className = "",
  ...props
}) => {
  const config = alertVariants[variant] || alertVariants.info;
  const Icon = config.icon;

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border ${config.container} ${className}`}
      role="alert"
      {...props}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.iconColor}`} />
      <div className="flex-1">
        {title && <h5 className="font-semibold mb-1">{title}</h5>}
        <div className="text-sm">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 rounded hover:bg-black/5 transition-colors"
          aria-label="Close alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;
