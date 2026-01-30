import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '@/services/authService';
import { useToast } from '@/components/ui';

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
    console.log('%c[AUTH] Initializing auth context', 'color: #22c55e; font-weight: bold');
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
        console.log('%c[AUTH] User found in storage, fetching fresh profile', 'color: #22c55e; font-weight: bold');
        
        // Fetch fresh user data from API to ensure token is still valid
        try {
          const freshUser = await authService.getProfile();
          setUser(freshUser);
          console.log('%c✓ [AUTH] Auth initialized with user:', 'color: #22c55e; font-weight: bold', freshUser);
        } catch (error) {
          // Token expired or invalid, clear auth
          console.log('%c[AUTH] Token invalid, clearing auth', 'color: #f59e0b; font-weight: bold');
          authService.logout();
          setUser(null);
        }
      } else {
        console.log('%c[AUTH] No user found in storage', 'color: #22c55e; font-weight: bold');
        setUser(null);
      }
    } catch (error) {
      console.log('%c[ERROR] Auth initialization failed:', 'color: #ef4444; font-weight: bold', error);
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
      console.log('%c[AUTH] Logging in...', 'color: #22c55e; font-weight: bold');
      const { user: loggedInUser } = await authService.login(credentials);
      
      setUser(loggedInUser);
      toast.success('Welcome back!');
      
      console.log('%c✓ [AUTH] Login successful, user state updated', 'color: #22c55e; font-weight: bold');
      
      // Redirect based on role
      redirectAfterLogin(loggedInUser.role);
      
      return loggedInUser;
    } catch (error) {
      console.log('%c[ERROR] Login failed:', 'color: #ef4444; font-weight: bold', error);
      toast.error(error.message || 'Login failed. Please check your credentials.');
      throw error;
    }
  };

  /**
   * Register new user
   * @param {Object} userData - Registration data
   */
  const register = async (userData) => {
    try {
      console.log('%c[AUTH] Registering new user...', 'color: #22c55e; font-weight: bold');
      const { user: registeredUser } = await authService.register(userData);
      
      setUser(registeredUser);
      toast.success('Registration successful! Welcome to CampusFlow.');
      
      console.log('%c✓ [AUTH] Registration successful, user state updated', 'color: #22c55e; font-weight: bold');
      
      // Redirect based on role
      redirectAfterLogin(registeredUser.role);
      
      return registeredUser;
    } catch (error) {
      console.log('%c[ERROR] Registration failed:', 'color: #ef4444; font-weight: bold', error);
      toast.error(error.message || 'Registration failed. Please try again.');
      throw error;
    }
  };

  /**
   * Logout user
   */
  const logout = () => {
    console.log('%c[AUTH] Logging out user', 'color: #22c55e; font-weight: bold');
    
    authService.logout();
    setUser(null);
    toast.info('You have been logged out');
    
    console.log('%c✓ [AUTH] Logout successful, user state cleared', 'color: #22c55e; font-weight: bold');
    
    navigate('/auth/login');
  };

  /**
   * Update user profile
   * @param {Object} updates - Profile updates
   */
  const updateUser = async (updates) => {
    try {
      console.log('%c[AUTH] Updating user profile...', 'color: #22c55e; font-weight: bold');
      const updatedUser = await authService.updateProfile(updates);
      
      setUser(updatedUser);
      toast.success('Profile updated successfully');
      
      console.log('%c✓ [AUTH] Profile updated, user state refreshed', 'color: #22c55e; font-weight: bold');
      
      return updatedUser;
    } catch (error) {
      console.log('%c[ERROR] Profile update failed:', 'color: #ef4444; font-weight: bold', error);
      toast.error(error.message || 'Failed to update profile');
      throw error;
    }
  };

  /**
   * Refresh user data from API
   */
  const refreshUser = async () => {
    try {
      console.log('%c[AUTH] Refreshing user data...', 'color: #22c55e; font-weight: bold');
      const freshUser = await authService.getProfile();
      setUser(freshUser);
      console.log('%c✓ [AUTH] User data refreshed', 'color: #22c55e; font-weight: bold');
      return freshUser;
    } catch (error) {
      console.log('%c[ERROR] Failed to refresh user:', 'color: #ef4444; font-weight: bold', error);
      throw error;
    }
  };

  /**
   * Redirect user based on role after login
   * @param {string} role - User role
   */
  const redirectAfterLogin = (role) => {
    const roleRoutes = {
      STUDENT: '/student/dashboard',
      ORGANIZER: '/organizer/dashboard',
      FACULTY: '/faculty/dashboard',
      ADMIN: '/admin/dashboard',
      SUPER_ADMIN: '/super-admin/dashboard',
    };

    const route = roleRoutes[role] || '/student/dashboard';
    console.log('%c[ROUTE] Redirecting to:', 'color: #9333ea; font-weight: bold', route);
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
      SUPER_ADMIN: ['*'], // All permissions
      ADMIN: ['manage_events', 'manage_users', 'approve_events', 'view_analytics'],
      FACULTY: ['approve_events', 'view_events'],
      ORGANIZER: ['create_events', 'manage_own_events', 'view_events'],
      STUDENT: ['view_events', 'register_events'],
    };

    const userPermissions = permissions[user.role] || [];
    return userPermissions.includes('*') || userPermissions.includes(permission);
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
    throw new Error('useAuth must be used within AuthProvider');
  }
  
  return context;
};

export default AuthContext;
