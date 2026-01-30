import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, Button, Badge } from "@/components/ui";
import {
  GraduationCap,
  Calendar,
  FileText,
  TrendingUp,
  Plus,
  Search,
} from "lucide-react";
import {
  StatCard,
  RecentEvents,
  QuickActions,
  CategoryChart,
} from "@/components/widgets";

/**
 * Student Dashboard
 * Overview of events, registrations, and upcoming activities
 */

const StudentDashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    console.log(
      "%c[ROUTE] Student Dashboard loaded",
      "color: #9333ea; font-weight: bold",
    );
  }, []);

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Welcome back, {user?.name?.split(" ")[0] || "Student"}!
        </h1>
        <p className="text-neutral-600">
          Here's what's happening with your events
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Available Events"
          value={12}
          icon={Calendar}
          color="primary"
          trend={15}
          trendLabel="vs last month"
        />
        <StatCard
          title="My Registrations"
          value={3}
          icon={FileText}
          color="info"
          trend={-5}
          trendLabel="vs last month"
        />
        <StatCard
          title="Events Attended"
          value={8}
          icon={GraduationCap}
          color="success"
          trend={20}
          trendLabel="vs last month"
        />
        <StatCard
          title="Upcoming This Week"
          value={2}
          icon={TrendingUp}
          color="warning"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Events */}
        <div className="lg:col-span-2">
          <RecentEvents
            events={mockRecentEvents}
            title="Upcoming Events"
            viewAllLink="/student/events"
            maxItems={3}
          />
        </div>

        {/* Quick Actions */}
        <QuickActions title="Quick Actions" actions={studentQuickActions} />
      </div>

      {/* Category Chart */}
      <div className="grid grid-cols-1 gap-6">
        <CategoryChart title="Events by Category" />
      </div>
    </div>
  );
};

// Mock data
const mockRecentEvents = [
  {
    _id: "1",
    title: "Web Development Workshop",
    description: "Learn React, Node.js and modern web development",
    category: "WORKSHOP",
    type: "ONLINE",
    startDate: new Date("2024-03-20T14:00:00"),
    endDate: new Date("2024-03-20T17:00:00"),
    location: "Google Meet",
    maxParticipants: 50,
    registeredCount: 35,
    status: "APPROVED",
  },
  {
    _id: "2",
    title: "Cultural Night 2024",
    description: "Annual cultural festival with music and dance",
    category: "CULTURAL",
    type: "OFFLINE",
    startDate: new Date("2024-03-22T18:00:00"),
    endDate: new Date("2024-03-22T22:00:00"),
    location: "Main Auditorium",
    maxParticipants: 200,
    registeredCount: 150,
    status: "APPROVED",
  },
  {
    _id: "3",
    title: "AI & Machine Learning Seminar",
    description: "Introduction to AI and ML concepts",
    category: "SEMINAR",
    type: "HYBRID",
    startDate: new Date("2024-03-25T10:00:00"),
    endDate: new Date("2024-03-25T13:00:00"),
    location: "Seminar Hall / Zoom",
    maxParticipants: 100,
    registeredCount: 75,
    status: "APPROVED",
  },
];

const studentQuickActions = [
  {
    label: "Browse Events",
    description: "Explore upcoming events",
    icon: Search,
    link: "/student/events",
    color: "bg-primary-100",
    iconColor: "text-primary-600",
  },
  {
    label: "My Registrations",
    description: "View registered events",
    icon: FileText,
    link: "/student/my-events",
    color: "bg-info-100",
    iconColor: "text-info-600",
    badge: "3",
  },
  {
    label: "Attended Events",
    description: "View past events",
    icon: GraduationCap,
    link: "/student/my-events?filter=past",
    color: "bg-success-100",
    iconColor: "text-success-600",
  },
];

export default StudentDashboard;
