import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "@/services/authService";
import { useToast } from "@/components/ui";

/**
 * Authentication Context
 * Manages user authentication state and provides auth methods
 */

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize auth state on mount
  useEffect(() => {
    
    initializeAuth();
  }, []);

  /**
   * Initialize authentication state from localStorage
   */
  const initializeAuth = async () => {
    try {
      const currentUser = authService.getCurrentUser();
      const token = authService.getToken();

      if (currentUser && token) {

        // Fetch fresh user data from API to ensure token is still valid
        try {
          const freshUser = await authService.getProfile();
          setUser(freshUser);
          
        } catch (error) {
          // Token expired or invalid, clear auth
          
          authService.logout();
          setUser(null);
        }
      } else {
        
        setUser(null);
      }
    } catch (error) {
      
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login user
   * @param {Object} credentials - { email, password }
   */
  const login = async (credentials) => {
    try {
      
      const { user: loggedInUser } = await authService.login(credentials);

      setUser(loggedInUser);
      toast.success("Welcome back!");

      // Redirect based on role
      redirectAfterLogin(loggedInUser.role);

      return loggedInUser;
    } catch (error) {
      
      toast.error(
        error.message || "Login failed. Please check your credentials.",
      );
      throw error;
    }
  };

  /**
   * Register new user
   * @param {Object} userData - Registration data
   */
  const register = async (userData) => {
    try {
      
      const { user: registeredUser } = await authService.register(userData);

      setUser(registeredUser);
      toast.success("Registration successful! Welcome to CampusFlow.");

      // Redirect based on role
      redirectAfterLogin(registeredUser.role);

      return registeredUser;
    } catch (error) {
      
      toast.error(error.message || "Registration failed. Please try again.");
      throw error;
    }
  };

  /**
   * Logout user
   */
  const logout = () => {

    authService.logout();
    setUser(null);
    toast.info("You have been logged out");

    navigate("/auth/login");
  };

  /**
   * Update user profile
   * @param {Object} updates - Profile updates
   */
  const updateUser = async (updates) => {
    try {
      
      const updatedUser = await authService.updateProfile(updates);

      setUser(updatedUser);
      toast.success("Profile updated successfully");

      return updatedUser;
    } catch (error) {
      
      toast.error(error.message || "Failed to update profile");
      throw error;
    }
  };

  /**
   * Refresh user data from API
   */
  const refreshUser = async () => {
    try {
      
      const freshUser = await authService.getProfile();
      setUser(freshUser);
      
      return freshUser;
    } catch (error) {
      
      throw error;
    }
  };

  /**
   * Redirect user based on role after login
   * @param {string} role - User role
   */
  const redirectAfterLogin = (role) => {
    const roleRoutes = {
      STUDENT: "/student/dashboard",
      ORGANIZER: "/organizer/dashboard",
      FACULTY: "/faculty/dashboard",
      ADMIN: "/admin/dashboard",
      SUPER_ADMIN: "/super-admin/dashboard",
    };

    const route = roleRoutes[role] || "/student/dashboard";
    
    navigate(route);
  };

  /**
   * Check if user has specific role
   * @param {string|string[]} roles - Role or array of roles
   * @returns {boolean} True if user has role
   */
  const hasRole = (roles) => {
    if (!user) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
  };

  /**
   * Check if user has permission for specific action
   * @param {string} permission - Permission name
   * @returns {boolean} True if user has permission
   */
  const hasPermission = (permission) => {
    if (!user) return false;

    // Define role-based permissions
    const permissions = {
      SUPER_ADMIN: ["*"], // All permissions
      ADMIN: [
        "manage_events",
        "manage_users",
        "approve_events",
        "view_analytics",
      ],
      FACULTY: ["approve_events", "view_events"],
      ORGANIZER: ["create_events", "manage_own_events", "view_events"],
      STUDENT: ["view_events", "register_events"],
    };

    const userPermissions = permissions[user.role] || [];
    return (
      userPermissions.includes("*") || userPermissions.includes(permission)
    );
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
    refreshUser,
    hasRole,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook to access auth context
 * @returns {Object} Auth context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

export default AuthContext;
