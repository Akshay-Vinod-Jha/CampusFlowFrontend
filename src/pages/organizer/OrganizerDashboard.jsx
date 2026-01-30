import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, Button, Badge } from "@/components/ui";
import { Calendar, Plus, FileText, CheckCircle, Clock } from "lucide-react";

/**
 * Organizer Dashboard
 * Manage events and track approvals
 */

const OrganizerDashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    console.log(
      "%c[ROUTE] Organizer Dashboard loaded",
      "color: #9333ea; font-weight: bold",
    );
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
        <Card hover>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <Badge variant="primary">Total</Badge>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">15</h3>
            <p className="text-sm text-neutral-600">Total Events</p>
          </div>
        </Card>

        <Card hover>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-warning-100 text-warning-600 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <Badge variant="warning">Pending</Badge>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">4</h3>
            <p className="text-sm text-neutral-600">Awaiting Approval</p>
          </div>
        </Card>

        <Card hover>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-success-100 text-success-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <Badge variant="success">Approved</Badge>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">9</h3>
            <p className="text-sm text-neutral-600">Active Events</p>
          </div>
        </Card>

        <Card hover>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-secondary-100 text-secondary-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <Badge variant="info">Draft</Badge>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">2</h3>
            <p className="text-sm text-neutral-600">Drafts</p>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Events */}
        <Card className="lg:col-span-2">
          <Card.Header>
            <Card.Title>My Events</Card.Title>
            <Card.Description>Events you've created</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="text-center py-12 text-neutral-500">
              <Calendar className="w-12 h-12 mx-auto mb-3 text-neutral-300" />
              <p className="text-sm">
                Event management will be implemented in Task 17
              </p>
            </div>
          </Card.Content>
        </Card>

        {/* Quick Actions */}
        <Card>
          <Card.Header>
            <Card.Title>Quick Actions</Card.Title>
            <Card.Description>Manage events</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="space-y-3">
              <Link to="/organizer/create-event" className="block">
                <Button variant="primary" className="w-full justify-start">
                  <Plus className="w-4 h-4" />
                  Create New Event
                </Button>
              </Link>
              <Link to="/organizer/my-events" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4" />
                  View My Events
                </Button>
              </Link>
              <Link to="/organizer/my-events?filter=pending" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="w-4 h-4" />
                  Pending Approvals
                </Button>
              </Link>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
