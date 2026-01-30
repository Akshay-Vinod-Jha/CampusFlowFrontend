import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Card, Alert } from '@/components/ui';
import { Mail, ArrowLeft } from 'lucide-react';
import authService from '@/services/authService';

/**
 * Forgot Password Page
 * Request password reset email
 */

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('%c[AUTH] Requesting password reset for:', 'color: #22c55e; font-weight: bold', email);
      await authService.forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      console.log('%c[ERROR] Password reset request failed:', 'color: #ef4444; font-weight: bold', err);
      setError(err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full">
        <Card className="w-full">
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-success-100 text-success-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                Check Your Email
              </h2>
              <p className="text-sm text-neutral-600">
                We've sent password reset instructions to{' '}
                <span className="font-medium text-neutral-900">{email}</span>
              </p>
            </div>

            <Alert variant="info" className="mb-6">
              If you don't see the email, check your spam folder or try again.
            </Alert>

            <Link to="/auth/login">
              <Button variant="primary" size="lg" className="w-full">
                <ArrowLeft className="w-5 h-5" />
                Back to Login
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Card className="w-full">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
              Forgot Password?
            </h2>
            <p className="text-sm text-neutral-600">
              Enter your email and we'll send you reset instructions
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="error" className="mb-6" onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@college.edu"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              disabled={loading}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              <Mail className="w-5 h-5" />
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              to="/auth/login"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
