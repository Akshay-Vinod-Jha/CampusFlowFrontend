import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  StatCard,
  ApprovalChart,
  RecentEvents,
  QuickActions,
} from "@/components/widgets";
import {
  CheckSquare,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
} from "lucide-react";

/**
 * Faculty Dashboard
 * Approve/reject events and view pending requests
 */

const FacultyDashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    console.log(
      "%c[ROUTE] Faculty Dashboard loaded",
      "color: #9333ea; font-weight: bold",
    );
  }, []);

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Welcome back, {user?.name?.split(" ")[0] || "Faculty"}!
        </h1>
        <p className="text-neutral-600">
          Review and approve pending event requests
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Pending Approvals"
          value={7}
          icon={Clock}
          color="warning"
          subtitle="Require your review"
        />
        <StatCard
          title="Approved This Month"
          value={24}
          icon={CheckCircle}
          color="success"
          trend={8}
          trendLabel="vs last month"
        />
        <StatCard
          title="Rejected This Month"
          value={3}
          icon={XCircle}
          color="error"
          trend={-2}
          trendLabel="vs last month"
        />
        <StatCard
          title="Total Reviewed"
          value={35}
          icon={Calendar}
          color="primary"
          subtitle="All time"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Pending Events */}
        <div className="lg:col-span-2">
          <RecentEvents
            events={mockPendingEvents}
            title="Pending Approvals"
            viewAllLink="/faculty/approvals"
            maxItems={3}
          />
        </div>

        {/* Quick Actions */}
        <QuickActions title="Quick Actions" actions={facultyQuickActions} />
      </div>

      {/* Approval Chart */}
      <div className="grid grid-cols-1 gap-6">
        <ApprovalChart title="Approval Decisions (This Month)" />
      </div>
    </div>
  );
};

// Mock data
const mockPendingEvents = [
  {
    _id: "1",
    title: "AI Workshop Series",
    description: "Hands-on AI and machine learning workshop",
    category: "WORKSHOP",
    type: "OFFLINE",
    startDate: new Date("2024-03-26T14:00:00"),
    endDate: new Date("2024-03-26T18:00:00"),
    location: "Lab 301",
    maxParticipants: 30,
    registeredCount: 0,
    status: "PENDING_FACULTY",
  },
  {
    _id: "2",
    title: "Sports Fest 2024",
    description: "Annual inter-department sports competition",
    category: "SPORTS",
    type: "OFFLINE",
    startDate: new Date("2024-04-01T08:00:00"),
    endDate: new Date("2024-04-03T18:00:00"),
    location: "Sports Complex",
    maxParticipants: 500,
    registeredCount: 0,
    status: "PENDING_FACULTY",
  },
  {
    _id: "3",
    title: "Entrepreneurship Summit",
    description: "Startup and business development seminar",
    category: "SEMINAR",
    type: "HYBRID",
    startDate: new Date("2024-03-29T09:00:00"),
    endDate: new Date("2024-03-29T17:00:00"),
    location: "Conference Hall / Webex",
    maxParticipants: 100,
    registeredCount: 0,
    status: "PENDING_FACULTY",
  },
];

const facultyQuickActions = [
  {
    label: "Review Approvals",
    description: "Pending requests",
    icon: CheckSquare,
    link: "/faculty/approvals",
    color: "bg-warning-100",
    iconColor: "text-warning-600",
    badge: "7",
  },
  {
    label: "Approved Events",
    description: "View approved",
    icon: CheckCircle,
    link: "/faculty/history?status=approved",
    color: "bg-success-100",
    iconColor: "text-success-600",
  },
  {
    label: "Approval History",
    description: "All decisions",
    icon: FileText,
    link: "/faculty/history",
    color: "bg-primary-100",
    iconColor: "text-primary-600",
  },
  {
    label: "Browse Events",
    description: "View all events",
    icon: Calendar,
    link: "/student/events",
    color: "bg-info-100",
    iconColor: "text-info-600",
  },
];

export default FacultyDashboard;
