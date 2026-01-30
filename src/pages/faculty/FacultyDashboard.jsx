import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, Button, Badge } from "@/components/ui";
import {
  CheckSquare,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
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
        <Card hover>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-warning-100 text-warning-600 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <Badge variant="warning">Action Required</Badge>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">7</h3>
            <p className="text-sm text-neutral-600">Pending Approvals</p>
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
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">24</h3>
            <p className="text-sm text-neutral-600">This Month</p>
          </div>
        </Card>

        <Card hover>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-error-100 text-error-600 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6" />
              </div>
              <Badge variant="error">Rejected</Badge>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">3</h3>
            <p className="text-sm text-neutral-600">This Month</p>
          </div>
        </Card>

        <Card hover>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <Badge variant="primary">Total</Badge>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">35</h3>
            <p className="text-sm text-neutral-600">All Events</p>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Approvals */}
        <Card className="lg:col-span-2">
          <Card.Header>
            <Card.Title>Pending Approvals</Card.Title>
            <Card.Description>Events waiting for your review</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="text-center py-12 text-neutral-500">
              <CheckSquare className="w-12 h-12 mx-auto mb-3 text-neutral-300" />
              <p className="text-sm">
                Approval interface will be implemented in Task 18
              </p>
            </div>
          </Card.Content>
        </Card>

        {/* Quick Actions */}
        <Card>
          <Card.Header>
            <Card.Title>Quick Actions</Card.Title>
            <Card.Description>Approval tasks</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="space-y-3">
              <Button variant="primary" className="w-full justify-start">
                <CheckSquare className="w-4 h-4" />
                Review Pending
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CheckCircle className="w-4 h-4" />
                Approved Events
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4" />
                All Events
              </Button>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default FacultyDashboard;
