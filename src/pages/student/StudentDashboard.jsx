import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, Button, Badge } from "@/components/ui";
import { GraduationCap, Calendar, FileText, TrendingUp } from "lucide-react";

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
        <Card hover>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <Badge variant="success">Active</Badge>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">12</h3>
            <p className="text-sm text-neutral-600">Available Events</p>
          </div>
        </Card>

        <Card hover>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-secondary-100 text-secondary-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <Badge variant="primary">Registered</Badge>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">3</h3>
            <p className="text-sm text-neutral-600">My Events</p>
          </div>
        </Card>

        <Card hover>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-success-100 text-success-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <Badge variant="success">Completed</Badge>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">8</h3>
            <p className="text-sm text-neutral-600">Attended</p>
          </div>
        </Card>

        <Card hover>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-warning-100 text-warning-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <Badge variant="warning">Upcoming</Badge>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">2</h3>
            <p className="text-sm text-neutral-600">This Week</p>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <Card className="lg:col-span-2">
          <Card.Header>
            <Card.Title>Upcoming Events</Card.Title>
            <Card.Description>Events you're registered for</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="text-center py-12 text-neutral-500">
              <Calendar className="w-12 h-12 mx-auto mb-3 text-neutral-300" />
              <p className="text-sm">
                Event listing will be implemented in Task 16
              </p>
            </div>
          </Card.Content>
        </Card>

        {/* Quick Actions */}
        <Card>
          <Card.Header>
            <Card.Title>Quick Actions</Card.Title>
            <Card.Description>Common tasks</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4" />
                Browse Events
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4" />
                My Registrations
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <GraduationCap className="w-4 h-4" />
                Attended Events
              </Button>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
