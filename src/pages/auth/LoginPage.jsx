import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button, Input, Card, Alert } from '@/components/ui';
import { Mail, Lock, LogIn } from 'lucide-react';

/**
 * Login Page
 * Email and password authentication with validation
 */

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    
    // Clear API error when user modifies form
    if (apiError) {
      setApiError('');
    }

    console.log('%c[FORM] Field updated:', 'color: #f97316; font-weight: bold', { name, value });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    console.log('%c[FORM] Validation result:', 'color: #f97316; font-weight: bold', {
      valid: Object.keys(newErrors).length === 0,
      errors: newErrors,
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('%c[FORM] Login form submitted', 'color: #f97316; font-weight: bold');
    
    // Validate form
    if (!validateForm()) {
      console.log('%c[FORM] Validation failed', 'color: #f97316; font-weight: bold');
      return;
    }

    setLoading(true);
    setApiError('');

    try {
      console.log('%c[AUTH] Attempting login...', 'color: #22c55e; font-weight: bold');
      await login(formData);
      // Redirect is handled by AuthContext
    } catch (error) {
      console.log('%c[ERROR] Login failed:', 'color: #ef4444; font-weight: bold', error);
      setApiError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Card className="w-full">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-sm text-neutral-600">
              Sign in to your CampusFlow account
            </p>
          </div>

          {/* API Error Alert */}
          {apiError && (
            <Alert variant="error" className="mb-6" onClose={() => setApiError('')}>
              {apiError}
            </Alert>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="you@college.edu"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              disabled={loading}
              required
            />

            {/* Password */}
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              disabled={loading}
              required
            />

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link
                to="/auth/forgot-password"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              <LogIn className="w-5 h-5" />
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-neutral-500">
                Don't have an account?
              </span>
            </div>
          </div>

          {/* Register Link */}
          <Link to="/auth/register">
            <Button variant="outline" size="lg" className="w-full">
              Create Account
            </Button>
          </Link>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <p className="text-xs font-semibold text-neutral-700 mb-2">
              Demo Credentials:
            </p>
            <div className="space-y-1 text-xs text-neutral-600">
              <p>Student: student@college.edu / password123</p>
              <p>Organizer: organizer@college.edu / password123</p>
              <p>Faculty: faculty@college.edu / password123</p>
              <p>Admin: admin@college.edu / password123</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
