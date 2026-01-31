import { Bell, Search, Menu, User, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Badge } from "@/components/ui";

/**
 * Professional Top Navbar Component
 * Search, notifications, and user menu
 */

const Navbar = ({ user, onLogout, onMenuToggle, notifications = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search logic here
    }
  };

  return (
    <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left Section - Mobile Menu + Search */}
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Menu Toggle */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center flex-1 max-w-md"
        >
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search events, users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-sm text-neutral-900 placeholder-neutral-400 focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
            />
          </div>
        </form>
      </div>

      {/* Right Section - Notifications + User Menu */}
      <div className="flex items-center gap-3">
        {/* Notifications Dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className="relative p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-error-500 rounded-full" />
              )}
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="bg-white rounded-lg shadow-soft-xl border border-neutral-200 p-2 w-80 animate-scale-in"
              sideOffset={5}
              align="end"
            >
              <div className="px-3 py-2 border-b border-neutral-200 mb-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-neutral-900">
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <Badge variant="primary">{unreadCount} new</Badge>
                  )}
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.slice(0, 5).map((notification, index) => (
                    <DropdownMenu.Item
                      key={index}
                      className="px-3 py-2 rounded-lg hover:bg-neutral-50 cursor-pointer outline-none transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                            notification.read
                              ? "bg-neutral-300"
                              : "bg-primary-500"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-sm text-neutral-900 font-medium mb-1">
                            {notification.title}
                          </p>
                          <p className="text-xs text-neutral-600">
                            {notification.message}
                          </p>
                          <p className="text-xs text-neutral-400 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </DropdownMenu.Item>
                  ))
                ) : (
                  <div className="px-3 py-8 text-center text-sm text-neutral-500">
                    No notifications
                  </div>
                )}
              </div>

              {notifications.length > 5 && (
                <div className="px-3 py-2 border-t border-neutral-200 mt-2">
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium w-full text-center">
                    View all notifications
                  </button>
                </div>
              )}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        {/* User Menu Dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-100 transition-colors"
              aria-label="User menu"
            >
              <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold text-sm">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-neutral-900">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-neutral-500">
                  {user?.role?.replace("_", " ") || "STUDENT"}
                </p>
              </div>
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="bg-white rounded-lg shadow-soft-xl border border-neutral-200 p-2 w-56 animate-scale-in"
              sideOffset={5}
              align="end"
            >
              <div className="px-3 py-2 border-b border-neutral-200 mb-2">
                <p className="text-sm font-semibold text-neutral-900">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  {user?.email || "user@example.com"}
                </p>
              </div>

              <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-50 cursor-pointer outline-none transition-colors">
                <User className="w-4 h-4 text-neutral-600" />
                <span className="text-sm text-neutral-900">Profile</span>
              </DropdownMenu.Item>

              <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-50 cursor-pointer outline-none transition-colors">
                <Settings className="w-4 h-4 text-neutral-600" />
                <span className="text-sm text-neutral-900">Settings</span>
              </DropdownMenu.Item>

              <DropdownMenu.Separator className="h-px bg-neutral-200 my-2" />

              <DropdownMenu.Item
                onClick={onLogout}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-error-50 cursor-pointer outline-none transition-colors text-error-600"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </header>
  );
};

export default Navbar;
