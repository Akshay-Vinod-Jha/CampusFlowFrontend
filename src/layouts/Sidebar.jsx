import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  ClipboardCheck,
  Users,
  BarChart3,
  FileText,
  CheckSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui";

/**
 * Professional Sidebar Component
 * Role-based navigation menu with collapsible sidebar
 */

const roleMenuItems = {
  STUDENT: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/student/dashboard" },
    { icon: Calendar, label: "Browse Events", path: "/student/events" },
    { icon: FileText, label: "My Events", path: "/student/my-events" },
  ],
  ORGANIZER: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/organizer/dashboard" },
    { icon: Calendar, label: "Create Event", path: "/organizer/create" },
    { icon: FileText, label: "My Events", path: "/organizer/events" },
    { icon: ClipboardCheck, label: "Approvals", path: "/organizer/approvals" },
  ],
  FACULTY: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/faculty/dashboard" },
    {
      icon: CheckSquare,
      label: "Pending Approvals",
      path: "/faculty/approvals",
    },
    { icon: Calendar, label: "All Events", path: "/faculty/events" },
  ],
  ADMIN: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: CheckSquare, label: "Approvals", path: "/admin/approvals" },
    { icon: Calendar, label: "Events", path: "/admin/events" },
    { icon: Users, label: "Users", path: "/admin/users" },
    { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ],
  SUPER_ADMIN: [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/super-admin/dashboard",
    },
    { icon: Users, label: "Colleges", path: "/super-admin/colleges" },
    { icon: Calendar, label: "All Events", path: "/super-admin/events" },
    { icon: BarChart3, label: "Analytics", path: "/super-admin/analytics" },
    { icon: Settings, label: "System Settings", path: "/super-admin/settings" },
  ],
};

const Sidebar = ({ user, onLogout, pendingCount = 0 }) => {
  const [collapsed, setCollapsed] = useState(false);
  const menuItems = roleMenuItems[user?.role] || roleMenuItems.STUDENT;

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-white border-r border-neutral-200 flex flex-col transition-all duration-300 ease-in-out`}
    >
      {/* Logo/Brand */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-200">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-neutral-900">
              CampusFlow
            </span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* User Info */}
      {!collapsed && (
        <div className="p-4 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-neutral-900 truncate">
                {user?.name || "User"}
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="primary" className="text-xs">
                  {user?.role?.replace("_", " ") || "STUDENT"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const showBadge =
              item.label === "Pending Approvals" && pendingCount > 0;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-primary-50 text-primary-700 font-medium"
                        : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                    } ${collapsed ? "justify-center" : ""}`
                  }
                  title={collapsed ? item.label : ""}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {showBadge && (
                        <Badge
                          variant="error"
                          className="px-1.5 min-w-[20px] text-center"
                        >
                          {pendingCount > 9 ? "9+" : pendingCount}
                        </Badge>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-3 border-t border-neutral-200">
        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-error-600 hover:bg-error-50 transition-colors ${
            collapsed ? "justify-center" : ""
          }`}
          title={collapsed ? "Logout" : ""}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
