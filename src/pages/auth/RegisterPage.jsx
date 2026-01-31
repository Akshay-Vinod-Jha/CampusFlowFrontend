import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button, Input, Card, Alert, Badge } from "@/components/ui";
import { User, Mail, Lock, GraduationCap, Building2 } from "lucide-react";

/**
 * Registration Page
 * User registration with validation
 */

const RegisterPage = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "STUDENT",
    department: "",
    collegeId: "", // In production, this would be selected from a dropdown
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const roles = [
    { value: "STUDENT", label: "Student", description: "Register for events" },
    {
      value: "ORGANIZER",
      label: "Organizer",
      description: "Create and manage events",
    },
    { value: "FACULTY", label: "Faculty", description: "Approve events" },
  ];

  const departments = [
    "Computer Science",
    "Electronics",
    "Mechanical",
    "Civil",
    "Electrical",
    "Information Technology",
    "Other",
  ];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Clear API error when user modifies form
    if (apiError) {
      setApiError("");
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Department validation
    if (!formData.department) {
      newErrors.department = "Department is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setApiError("");

    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registrationData } = formData;

      await register(registrationData);
      // Redirect is handled by AuthContext
    } catch (error) {
      // Handle validation errors from backend
      if (error.errors && Array.isArray(error.errors)) {
        const backendErrors = {};
        error.errors.forEach((err) => {
          backendErrors[err.field] = err.message;
        });
        setErrors(backendErrors);
        setApiError("Please fix the validation errors below.");
      } else {
        setApiError(error.message || "Registration failed. Please try again.");
      }
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
              Create Account
            </h2>
            <p className="text-sm text-neutral-600">
              Join CampusFlow and start managing events
            </p>
          </div>

          {/* API Error Alert */}
          {apiError && (
            <Alert
              variant="error"
              className="mb-6"
              onClose={() => setApiError("")}
            >
              {apiError}
            </Alert>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <Input
              label="Full Name"
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              disabled={loading}
              required
            />

            {/* Email */}
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="you@college.edu"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              helperText="Use your college email address"
              disabled={loading}
              required
            />

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Select Role <span className="text-error-500">*</span>
              </label>
              <div className="grid grid-cols-1 gap-3">
                {roles.map((role) => (
                  <label
                    key={role.value}
                    className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.role === role.value
                        ? "border-primary-500 bg-primary-50"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      checked={formData.role === role.value}
                      onChange={handleChange}
                      className="mt-1 mr-3"
                      disabled={loading}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-neutral-900">
                          {role.label}
                        </span>
                        {formData.role === role.value && (
                          <Badge variant="primary">Selected</Badge>
                        )}
                      </div>
                      <p className="text-sm text-neutral-600">
                        {role.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Department <span className="text-error-500">*</span>
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg bg-white border text-neutral-900 transition-colors duration-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 disabled:bg-neutral-100 disabled:cursor-not-allowed ${
                  errors.department ? "border-error-500" : "border-neutral-300"
                }`}
                disabled={loading}
                required
              >
                <option value="">Select department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="mt-1 text-sm text-error-600">
                  {errors.department}
                </p>
              )}
            </div>

            {/* Password */}
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              helperText={
                !errors.password &&
                "Min 6 characters with uppercase, lowercase & number"
              }
              disabled={loading}
              required
            />

            {/* Confirm Password */}
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              disabled={loading}
              required
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              <GraduationCap className="w-5 h-5" />
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-neutral-500">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <Link to="/auth/login">
            <Button variant="outline" size="lg" className="w-full">
              Sign In
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
