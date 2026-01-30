import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/ui";

/**
 * Public Route Component
 * Redirects to dashboard if already authenticated
 * Used for login/register pages
 */

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-neutral-50">
        <Spinner size="xl" text="Loading..." />
      </div>
    );
  }

  // Redirect to dashboard if already authenticated
  if (user) {

    const roleRoutes = {
      STUDENT: "/student/dashboard",
      ORGANIZER: "/organizer/dashboard",
      FACULTY: "/faculty/dashboard",
      ADMIN: "/admin/dashboard",
      SUPER_ADMIN: "/super-admin/dashboard",
    };

    const defaultRoute = roleRoutes[user.role] || "/student/dashboard";
    return <Navigate to={defaultRoute} replace />;
  }

  // Render children if not authenticated
  return children;
};

export default PublicRoute;
