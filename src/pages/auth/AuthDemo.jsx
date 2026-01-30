import { useState } from 'react';
import { Card, Button } from '@/components/ui';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ForgotPasswordPage from './ForgotPasswordPage';

/**
 * Auth Pages Demo/Preview
 * Shows all authentication pages in one view for development
 */

const AuthDemo = () => {
  const [currentPage, setCurrentPage] = useState('login');

  const pages = [
    { id: 'login', label: 'Login Page', component: LoginPage },
    { id: 'register', label: 'Register Page', component: RegisterPage },
    { id: 'forgot', label: 'Forgot Password', component: ForgotPasswordPage },
  ];

  const CurrentComponent = pages.find(p => p.id === currentPage)?.component;

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            Authentication Pages
          </h1>
          <p className="text-neutral-600">
            Professional auth pages with validation and error handling
          </p>
        </div>

        {/* Page Selector */}
        <div className="flex gap-3 mb-8">
          {pages.map((page) => (
            <Button
              key={page.id}
              variant={currentPage === page.id ? 'primary' : 'outline'}
              onClick={() => setCurrentPage(page.id)}
            >
              {page.label}
            </Button>
          ))}
        </div>

        {/* Page Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Page Component */}
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              {pages.find(p => p.id === currentPage)?.label}
            </h2>
            {CurrentComponent && <CurrentComponent />}
          </div>

          {/* Right: Features Info */}
          <div>
            <Card>
              <Card.Header>
                <Card.Title>Features</Card.Title>
                <Card.Description>
                  Professional authentication with validation
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-2">
                      Login Page
                    </h4>
                    <ul className="text-sm text-neutral-600 space-y-1 list-disc list-inside">
                      <li>Email and password validation</li>
                      <li>Remember me functionality (localStorage)</li>
                      <li>Forgot password link</li>
                      <li>Loading state with spinner</li>
                      <li>Error handling with alerts</li>
                      <li>Demo credentials display</li>
                      <li>Link to registration</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-2">
                      Registration Page
                    </h4>
                    <ul className="text-sm text-neutral-600 space-y-1 list-disc list-inside">
                      <li>Full name, email, password validation</li>
                      <li>Password strength requirements</li>
                      <li>Confirm password matching</li>
                      <li>Role selection (Student, Organizer, Faculty)</li>
                      <li>Department dropdown</li>
                      <li>Real-time field validation</li>
                      <li>Professional error messages</li>
                      <li>Link to login</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-2">
                      Forgot Password
                    </h4>
                    <ul className="text-sm text-neutral-600 space-y-1 list-disc list-inside">
                      <li>Email validation</li>
                      <li>Success confirmation screen</li>
                      <li>Back to login link</li>
                      <li>Helpful instructions</li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-neutral-200">
                    <h4 className="font-semibold text-neutral-900 mb-2">
                      Technical Implementation
                    </h4>
                    <ul className="text-sm text-neutral-600 space-y-1 list-disc list-inside">
                      <li>AuthContext integration</li>
                      <li>Axios API service</li>
                      <li>Toast notifications (no alerts)</li>
                      <li>Console logging for debugging</li>
                      <li>Professional loading states</li>
                      <li>Form state management</li>
                      <li>Error state management</li>
                      <li>Responsive design</li>
                    </ul>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthDemo;
