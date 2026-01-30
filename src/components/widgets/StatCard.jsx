/**
 * StatCard Component
 * Enhanced statistics card with trend indicators
 */

import { Card } from "../ui";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel,
  color = "primary",
  subtitle,
  className = "",
}) => {
  const colorVariants = {
    primary: {
      bg: "bg-primary-100",
      text: "text-primary-600",
      iconBg: "bg-primary-500",
    },
    success: {
      bg: "bg-success-100",
      text: "text-success-600",
      iconBg: "bg-success-500",
    },
    warning: {
      bg: "bg-warning-100",
      text: "text-warning-600",
      iconBg: "bg-warning-500",
    },
    error: {
      bg: "bg-error-100",
      text: "text-error-600",
      iconBg: "bg-error-500",
    },
    info: {
      bg: "bg-info-100",
      text: "text-info-600",
      iconBg: "bg-info-500",
    },
    neutral: {
      bg: "bg-neutral-100",
      text: "text-neutral-600",
      iconBg: "bg-neutral-500",
    },
  };

  const colors = colorVariants[color] || colorVariants.primary;

  const getTrendIcon = () => {
    if (!trend) return null;

    if (trend > 0) {
      return <TrendingUp className="w-4 h-4 text-success-600" />;
    } else if (trend < 0) {
      return <TrendingDown className="w-4 h-4 text-error-600" />;
    } else {
      return <Minus className="w-4 h-4 text-neutral-600" />;
    }
  };

  const getTrendColor = () => {
    if (!trend) return "text-neutral-600";
    return trend > 0
      ? "text-success-600"
      : trend < 0
        ? "text-error-600"
        : "text-neutral-600";
  };

  return (
    <Card hover className={className}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-12 h-12 ${colors.bg} ${colors.text} rounded-lg flex items-center justify-center`}
          >
            {Icon && <Icon className="w-6 h-6" />}
          </div>
          {trend !== undefined && (
            <div
              className={`flex items-center gap-1 text-sm font-medium ${getTrendColor()}`}
            >
              {getTrendIcon()}
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>

        <h3 className="text-3xl font-bold text-neutral-900 mb-1">
          {typeof value === "number" ? value.toLocaleString() : value}
        </h3>

        <p className="text-sm text-neutral-600 font-medium">{title}</p>

        {(subtitle || trendLabel) && (
          <div className="mt-3 pt-3 border-t border-neutral-200">
            <p className="text-xs text-neutral-500">{trendLabel || subtitle}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
