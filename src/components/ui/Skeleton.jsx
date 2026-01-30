/**
 * Professional Skeleton Loader Component
 * For content loading states
 */

const Skeleton = ({ 
  className = '',
  width,
  height,
  circle = false,
  ...props 
}) => {
  const baseStyles = 'skeleton animate-pulse bg-neutral-200 rounded';
  const shapeStyles = circle ? 'rounded-full' : '';
  
  const inlineStyles = {};
  if (width) inlineStyles.width = width;
  if (height) inlineStyles.height = height;

  return (
    <div 
      className={`${baseStyles} ${shapeStyles} ${className}`}
      style={inlineStyles}
      {...props}
    />
  );
};

// Pre-built skeleton patterns
const SkeletonCard = () => (
  <div className="card p-4 space-y-3">
    <Skeleton height="20px" width="60%" />
    <Skeleton height="16px" width="100%" />
    <Skeleton height="16px" width="80%" />
    <div className="flex gap-2 mt-4">
      <Skeleton height="32px" width="80px" />
      <Skeleton height="32px" width="80px" />
    </div>
  </div>
);

const SkeletonText = ({ lines = 3 }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton 
        key={i} 
        height="16px" 
        width={i === lines - 1 ? '70%' : '100%'} 
      />
    ))}
  </div>
);

const SkeletonAvatar = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return <Skeleton className={sizes[size]} circle />;
};

Skeleton.Card = SkeletonCard;
Skeleton.Text = SkeletonText;
Skeleton.Avatar = SkeletonAvatar;

export default Skeleton;
