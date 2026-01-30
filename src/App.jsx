import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/components/ui";
import { ProtectedRoute, PublicRoute } from "@/components/auth";
import { AppLayout, AuthLayout } from "@/layouts";

// Auth Pages
import { LoginPage, RegisterPage, ForgotPasswordPage } from "@/pages/auth";

// Student Pages
import {
  StudentDashboard,
  EventListingPage,
  EventDetailsPage,
  MyEventsPage,
} from "@/pages/student";

// Organizer Pages
import {
  OrganizerDashboard,
  CreateEventPage,
  MyCreatedEventsPage,
} from "@/pages/organizer";

// Faculty Pages
import {
  FacultyDashboard,
  PendingApprovalsPage,
  EventApprovalPage,
} from "@/pages/faculty";

// Admin Pages
import AdminDashboard from "@/pages/admin/AdminDashboard";

// Super Admin Pages
import SuperAdminDashboard from "@/pages/super-admin/SuperAdminDashboard";

// 404 Page
import NotFoundPage from "@/pages/NotFoundPage";

/**
 * Main App Component with React Router
 * Routes are organized by user role with protection
 */

function App() {
  console.log(
    "%c[APP] CampusFlow initialized",
    "color: #3b82f6; font-weight: bold; font-size: 14px",
  );

  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            {/* Root - Redirect to login or dashboard */}
            <Route path="/" element={<Navigate to="/auth/login" replace />} />

            {/* Public Routes - Auth Pages */}
            <Route
              path="/auth"
              element={
                <PublicRoute>
                  <AuthLayout />
                </PublicRoute>
              }
            >
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
            </Route>

            {/* Protected Routes - Student */}
            <Route
              path="/student/*"
              element={
                <ProtectedRoute roles={["STUDENT"]}>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="events" element={<EventListingPage />} />
              <Route path="events/:eventId" element={<EventDetailsPage />} />
              <Route path="my-events" element={<MyEventsPage />} />
              <Route
                path="*"
                element={<Navigate to="/student/dashboard" replace />}
              />
            </Route>

            {/* Protected Routes - Organizer */}
            <Route
              path="/organizer/*"
              element={
                <ProtectedRoute roles={["ORGANIZER"]}>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<OrganizerDashboard />} />
              <Route path="create-event" element={<CreateEventPage />} />
              <Route path="my-events" element={<MyCreatedEventsPage />} />
              <Route
                path="*"
                element={<Navigate to="/organizer/dashboard" replace />}
              />
            </Route>

            {/* Protected Routes - Faculty */}
            <Route
              path="/faculty/*"
              element={
                <ProtectedRoute roles={["FACULTY"]}>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<FacultyDashboard />} />
              <Route path="approvals" element={<PendingApprovalsPage />} />
              <Route
                path="approvals/:eventId"
                element={<EventApprovalPage />}
              />
              <Route
                path="*"
                element={<Navigate to="/faculty/dashboard" replace />}
              />
            </Route>

            {/* Protected Routes - Admin */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute roles={["ADMIN"]}>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route
                path="*"
                element={<Navigate to="/admin/dashboard" replace />}
              />
            </Route>

            {/* Protected Routes - Super Admin */}
            <Route
              path="/super-admin/*"
              element={
                <ProtectedRoute roles={["SUPER_ADMIN"]}>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<SuperAdminDashboard />} />
              <Route
                path="*"
                element={<Navigate to="/super-admin/dashboard" replace />}
              />
            </Route>

            {/* 404 - Not Found */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
