import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui";
import {
  StatCard,
  ApprovalChart,
  RegistrationChart,
  RecentEvents,
  QuickActions,
} from "@/components/widgets";
import {
  Calendar,
  Plus,
  FileText,
  CheckCircle,
  Clock,
  Users,
  Mail,
  QrCode,
} from "lucide-react";

/**
 * Organizer Dashboard
 * Manage events and track approvals
 */

const OrganizerDashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    
  }, []);

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Welcome back, {user?.name?.split(" ")[0] || "Organizer"}!
          </h1>
          <p className="text-neutral-600">
            Manage your events and track approvals
          </p>
        </div>
        <Link to="/organizer/create-event">
          <Button variant="primary" size="lg">
            <Plus className="w-5 h-5" />
            Create Event
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Events"
          value={15}
          icon={Calendar}
          color="primary"
          trend={25}
          trendLabel="vs last month"
        />
        <StatCard
          title="Pending Approval"
          value={4}
          icon={Clock}
          color="warning"
          subtitle="Awaiting review"
        />
        <StatCard
          title="Active Events"
          value={9}
          icon={CheckCircle}
          color="success"
          trend={12}
          trendLabel="vs last month"
        />
        <StatCard
          title="Total Attendees"
          value={456}
          icon={Users}
          color="info"
          trend={18}
          trendLabel="vs last month"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ApprovalChart title="Event Status Distribution" />
        <RegistrationChart title="Registration Trends" />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Events */}
        <div className="lg:col-span-2">
          <RecentEvents
            events={mockOrganizerEvents}
            title="My Recent Events"
            viewAllLink="/organizer/my-events"
            maxItems={3}
          />
        </div>

        {/* Quick Actions */}
        <QuickActions title="Quick Actions" actions={organizerQuickActions} />
      </div>
    </div>
  );
};

// Mock data
const mockOrganizerEvents = [
  {
    _id: "1",
    title: "Tech Symposium 2024",
    description: "Annual technology symposium",
    category: "TECHNICAL",
    type: "HYBRID",
    startDate: new Date("2024-03-28T09:00:00"),
    endDate: new Date("2024-03-28T17:00:00"),
    location: "Main Hall / Zoom",
    maxParticipants: 150,
    registeredCount: 120,
    status: "APPROVED",
  },
  {
    _id: "2",
    title: "Coding Bootcamp",
    description: "Intensive coding workshop",
    category: "WORKSHOP",
    type: "OFFLINE",
    startDate: new Date("2024-03-30T10:00:00"),
    endDate: new Date("2024-03-30T16:00:00"),
    location: "Computer Lab",
    maxParticipants: 40,
    registeredCount: 38,
    status: "PENDING_FACULTY",
  },
  {
    _id: "3",
    title: "Guest Lecture Series",
    description: "Industry experts talk",
    category: "SEMINAR",
    type: "ONLINE",
    startDate: new Date("2024-04-02T15:00:00"),
    endDate: new Date("2024-04-02T17:00:00"),
    location: "Microsoft Teams",
    maxParticipants: 200,
    registeredCount: 85,
    status: "APPROVED",
  },
];

const organizerQuickActions = [
  {
    label: "Create New Event",
    description: "Start a new event",
    icon: Plus,
    link: "/organizer/create-event",
    color: "bg-primary-100",
    iconColor: "text-primary-600",
  },
  {
    label: "Manage Events",
    description: "View all events",
    icon: FileText,
    link: "/organizer/my-events",
    color: "bg-info-100",
    iconColor: "text-info-600",
    badge: "15",
  },
  {
    label: "Track Attendance",
    description: "QR code scanning",
    icon: QrCode,
    link: "/organizer/attendance",
    color: "bg-success-100",
    iconColor: "text-success-600",
  },
  {
    label: "Send Emails",
    description: "Notify participants",
    icon: Mail,
    link: "/organizer/emails",
    color: "bg-warning-100",
    iconColor: "text-warning-600",
  },
];

export default OrganizerDashboard;
