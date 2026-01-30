import { FileX } from 'lucide-react';
import Button from './Button';

/**
 * Professional Empty State Component
 * For displaying when no data is available
 */

const EmptyState = ({ 
  icon: Icon = FileX,
  title = 'No data found',
  description,
  action,
  actionLabel,
  className = '',
  ...props 
}) => {
  return (
    <div className={`empty-state flex flex-col items-center justify-center py-12 px-4 text-center ${className}`} {...props}>
      <div className="empty-state-icon w-16 h-16 mb-4 text-neutral-400">
        <Icon className="w-full h-full" />
      </div>
      <h3 className="empty-state-title text-lg font-semibold text-neutral-900 mb-2">
        {title}
      </h3>
      {description && (
        <p className="empty-state-description text-sm text-neutral-600 mb-6 max-w-md">
          {description}
        </p>
      )}
      {action && actionLabel && (
        <Button onClick={action} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
