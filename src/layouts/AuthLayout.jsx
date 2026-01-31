import { Outlet } from "react-router-dom";
import {
  Calendar,
  GraduationCap,
  CheckCircle2,
  Users,
  BarChart3,
} from "lucide-react";

/**
 * Authentication Layout
 * Used for login, register, and forgot password pages
 * Left side: Branding and features
 * Right side: Auth forms
 */

const features = [
  {
    icon: Calendar,
    title: "Event Management",
    description: "Create, manage, and track campus events effortlessly",
  },
  {
    icon: CheckCircle2,
    title: "Approval Workflow",
    description: "Streamlined approval process with faculty and admin",
  },
  {
    icon: Users,
    title: "Student Engagement",
    description: "Easy registration and QR code-based attendance",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Real-time insights and comprehensive reporting",
  },
];

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-primary-600 via-primary-700 to-secondary-700 text-white p-12 flex-col justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">CampusFlow</h1>
            <p className="text-sm text-primary-100">Event Management System</p>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Streamline Your Campus Events
            </h2>
            <p className="text-lg text-primary-100">
              Complete solution for organizing, approving, and managing college
              events
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-primary-100">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="text-sm text-primary-100">
          <p>&copy; 2026 CampusFlow. All rights reserved.</p>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-8 bg-neutral-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-linear-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-neutral-900">CampusFlow</h1>
              <p className="text-xs text-neutral-500">
                Event Management System
              </p>
            </div>
          </div>

          {/* Auth Form Content (Outlet) */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
