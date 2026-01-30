import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  StatCard,
  ApprovalChart,
  RegistrationChart,
  CategoryChart,
  RecentEvents,
  QuickActions,
} from "@/components/widgets";
import {
  BarChart3,
  Users,
  Calendar,
  CheckSquare,
  TrendingUp,
  Settings,
  Shield,
} from "lucide-react";

/**
 * Admin Dashboard
 * System overview with analytics and management
 */

const AdminDashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    
  }, []);

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-neutral-600">
          System overview and analytics for{" "}
          {user?.college?.name || "your college"}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={1234}
          icon={Users}
          color="primary"
          trend={12}
          trendLabel="vs last month"
        />
        <StatCard
          title="Active Events"
          value={48}
          icon={Calendar}
          color="success"
          trend={23}
          trendLabel="vs last month"
        />
        <StatCard
          title="Final Approvals"
          value={12}
          icon={CheckSquare}
          color="warning"
          subtitle="Awaiting review"
        />
        <StatCard
          title="System Activity"
          value="+23%"
          icon={TrendingUp}
          color="info"
          trend={5}
          trendLabel="engagement"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RegistrationChart title="Monthly Registration Trends" />
        <CategoryChart title="Events by Category" />
      </div>

      {/* Second Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ApprovalChart title="Approval Status Overview" />
        <div className="bg-white rounded-lg border-2 border-neutral-200 p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
              <BarChart3 className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">
                System Statistics
              </h3>
              <p className="text-sm text-neutral-600">
                Key performance metrics
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-600">
                Total Registrations
              </span>
              <span className="font-semibold text-neutral-900">2,456</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-600">
                Active Organizers
              </span>
              <span className="font-semibold text-neutral-900">45</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-600">Faculty Members</span>
              <span className="font-semibold text-neutral-900">32</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-600">Total Students</span>
              <span className="font-semibold text-neutral-900">1,157</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-neutral-200">
              <span className="text-sm font-semibold text-neutral-900">
                Avg. Event Size
              </span>
              <span className="font-bold text-primary-600">51 attendees</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentEvents
            events={mockRecentActivity}
            title="Recent System Activity"
            viewAllLink="/student/events"
            maxItems={3}
          />
        </div>

        {/* Quick Actions */}
        <QuickActions title="Admin Tools" actions={adminQuickActions} />
      </div>
    </div>
  );
};

// Mock data
const mockRecentActivity = [
  {
    _id: "1",
    title: "System-wide Hackathon",
    description: "24-hour coding marathon",
    category: "TECHNICAL",
    type: "OFFLINE",
    startDate: new Date("2024-04-05T09:00:00"),
    endDate: new Date("2024-04-06T09:00:00"),
    location: "Main Campus",
    maxParticipants: 200,
    registeredCount: 180,
    status: "PENDING_ADMIN",
  },
  {
    _id: "2",
    title: "Annual Convocation",
    description: "Graduation ceremony",
    category: "OTHER",
    type: "OFFLINE",
    startDate: new Date("2024-04-10T10:00:00"),
    endDate: new Date("2024-04-10T14:00:00"),
    location: "Auditorium",
    maxParticipants: 1000,
    registeredCount: 856,
    status: "APPROVED",
  },
  {
    _id: "3",
    title: "Faculty Development Program",
    description: "Teaching excellence workshop",
    category: "SEMINAR",
    type: "HYBRID",
    startDate: new Date("2024-04-08T14:00:00"),
    endDate: new Date("2024-04-08T17:00:00"),
    location: "Conference Hall / Teams",
    maxParticipants: 50,
    registeredCount: 42,
    status: "APPROVED",
  },
];

const adminQuickActions = [
  {
    label: "Final Approvals",
    description: "Review requests",
    icon: CheckSquare,
    link: "/admin/approvals",
    color: "bg-warning-100",
    iconColor: "text-warning-600",
    badge: "12",
  },
  {
    label: "User Management",
    description: "Manage users",
    icon: Users,
    link: "/admin/users",
    color: "bg-primary-100",
    iconColor: "text-primary-600",
  },
  {
    label: "System Analytics",
    description: "View reports",
    icon: BarChart3,
    link: "/admin/analytics",
    color: "bg-info-100",
    iconColor: "text-info-600",
  },
  {
    label: "Settings",
    description: "System config",
    icon: Settings,
    link: "/admin/settings",
    color: "bg-neutral-100",
    iconColor: "text-neutral-600",
  },
];

export default AdminDashboard;
