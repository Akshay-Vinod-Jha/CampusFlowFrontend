import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Spinner } from '@/components/ui';

/**
 * Protected Route Component
 * Redirects to login if not authenticated
 * Optionally checks for specific roles
 */

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, loading, hasRole } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-neutral-50">
        <Spinner size="xl" text="Loading..." />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    console.log(
      '%c[ROUTE] Not authenticated, redirecting to login',
      'color: #f59e0b; font-weight: bold'
    );
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Check role authorization if roles specified
  if (roles.length > 0 && !hasRole(roles)) {
    console.log(
      '%c[ROUTE] Insufficient permissions, redirecting to dashboard',
      'color: #ef4444; font-weight: bold'
    );
    
    // Redirect to user's appropriate dashboard
    const roleRoutes = {
      STUDENT: '/student/dashboard',
      ORGANIZER: '/organizer/dashboard',
      FACULTY: '/faculty/dashboard',
      ADMIN: '/admin/dashboard',
      SUPER_ADMIN: '/super-admin/dashboard',
    };
    
    const defaultRoute = roleRoutes[user.role] || '/student/dashboard';
    return <Navigate to={defaultRoute} replace />;
  }

  // Render children if authenticated and authorized
  return children;
};

export default ProtectedRoute;
