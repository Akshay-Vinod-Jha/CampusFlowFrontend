import { Loader2 } from "lucide-react";

/**
 * Professional Loading Spinner Component
 * Sizes: sm, md, lg, xl
 * Optional: text label
 */

const spinnerSizes = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12",
};

const Spinner = ({ size = "md", text, className = "", ...props }) => {
  const sizeClass = spinnerSizes[size] || spinnerSizes.md;

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 ${className}`}
      {...props}
    >
      <Loader2 className={`${sizeClass} animate-spin text-primary-600`} />
      {text && <p className="text-sm text-neutral-600">{text}</p>}
    </div>
  );
};

export default Spinner;
