import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Dialog, Button } from "@/components/ui";

/**
 * Main Application Layout
 * Sidebar + Navbar + Content Area
 * Used for authenticated pages
 */

const AppLayout = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  // Mock user data - will be replaced with AuthContext in Task 14
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@college.edu",
    role: "STUDENT",
  });

  // Mock notifications - will be replaced with API in Task 14
  const [notifications] = useState([
    {
      title: "Event Approved",
      message: 'Your event "Tech Fest 2024" has been approved',
      time: "5 minutes ago",
      read: false,
    },
    {
      title: "New Event",
      message: 'Check out "Cultural Night" happening next week',
      time: "2 hours ago",
      read: false,
    },
    {
      title: "Registration Confirmed",
      message: 'You are registered for "Workshop: AI & ML"',
      time: "1 day ago",
      read: true,
    },
  ]);

  // Mock pending approvals count
  const [pendingCount] = useState(3);

  useEffect(() => {
    console.log(
      "%c[ROUTE] AppLayout mounted",
      "color: #9333ea; font-weight: bold",
    );
    console.log("%c[STATE] User:", "color: #06b6d4; font-weight: bold", user);
  }, [user]);

  const handleLogout = () => {
    console.log(
      "%c[AUTH] Logout initiated",
      "color: #22c55e; font-weight: bold",
    );
    setLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    console.log(
      "%c[AUTH] User logged out",
      "color: #22c55e; font-weight: bold",
    );
    setLogoutDialogOpen(false);
    // Clear auth state and redirect - will be implemented in Task 14
    navigate("/auth/login");
  };

  const handleMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-neutral-50">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:block">
        <Sidebar
          user={user}
          onLogout={handleLogout}
          pendingCount={pendingCount}
        />
      </div>

      {/* Sidebar - Mobile Overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
            <Sidebar
              user={user}
              onLogout={handleLogout}
              pendingCount={pendingCount}
            />
          </div>
        </>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          user={user}
          onLogout={handleLogout}
          onMenuToggle={handleMenuToggle}
          notifications={notifications}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Confirm Logout</Dialog.Title>
            <Dialog.Description>
              Are you sure you want to logout from CampusFlow?
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button variant="ghost">Cancel</Button>
            </Dialog.Close>
            <Button variant="primary" onClick={confirmLogout}>
              Logout
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </div>
  );
};

export default AppLayout;
