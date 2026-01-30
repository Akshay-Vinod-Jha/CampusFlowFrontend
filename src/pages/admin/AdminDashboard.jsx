import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, Button, Badge } from "@/components/ui";
import {
  BarChart3,
  Users,
  Calendar,
  CheckSquare,
  TrendingUp,
  Settings,
} from "lucide-react";

/**
 * Admin Dashboard
 * System overview with analytics and management
 */

const AdminDashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    console.log(
      "%c[ROUTE] Admin Dashboard loaded",
      "color: #9333ea; font-weight: bold",
    );
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
        <Card hover>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <Badge variant="primary">Active</Badge>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">1,234</h3>
            <p className="text-sm text-neutral-600">Total Users</p>
          </div>
        </Card>

        <Card hover>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-secondary-100 text-secondary-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <Badge variant="success">Live</Badge>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">48</h3>
            <p className="text-sm text-neutral-600">Active Events</p>
          </div>
        </Card>

        <Card hover>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-warning-100 text-warning-600 rounded-lg flex items-center justify-center">
                <CheckSquare className="w-6 h-6" />
              </div>
              <Badge variant="warning">Pending</Badge>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">12</h3>
            <p className="text-sm text-neutral-600">Pending Approvals</p>
          </div>
        </Card>

        <Card hover>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-success-100 text-success-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <Badge variant="success">Growth</Badge>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">+23%</h3>
            <p className="text-sm text-neutral-600">vs Last Month</p>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics */}
        <Card className="lg:col-span-2">
          <Card.Header>
            <Card.Title>Event Analytics</Card.Title>
            <Card.Description>
              Monthly event activity and registrations
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="text-center py-8 text-neutral-500">
              <BarChart3 className="w-12 h-12 mx-auto mb-3 text-neutral-300" />
              <p className="text-sm mb-2">
                Analytics and reporting coming soon
              </p>
              <p className="text-xs text-neutral-400">Using Recharts library</p>
            </div>
          </Card.Content>
        </Card>

        {/* Quick Actions */}
        <Card>
          <Card.Header>
            <Card.Title>Quick Actions</Card.Title>
            <Card.Description>Admin tools</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="space-y-3">
              <Link to="/admin/users" className="block">
                <Button variant="primary" className="w-full justify-start">
                  <Users className="w-4 h-4" />
                  Manage Users
                </Button>
              </Link>
              <Link to="/admin/approvals" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <CheckSquare className="w-4 h-4" />
                  Review Approvals
                </Button>
              </Link>
              <Link to="/admin/analytics" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4" />
                  View Analytics
                </Button>
              </Link>
              <Link to="/student/events" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4" />
                  Browse Events
                </Button>
              </Link>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
