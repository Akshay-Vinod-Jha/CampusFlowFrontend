import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, Button, Badge } from "@/components/ui";
import {
  Building2,
  BarChart3,
  Settings,
  Shield,
  Users,
  Calendar,
} from "lucide-react";

/**
 * Super Admin Dashboard
 * Multi-tenant system management
 */

const SuperAdminDashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    
  }, []);

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Super Admin Dashboard
        </h1>
        <p className="text-neutral-600">
          Multi-tenant system overview and management
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card hover>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <Badge variant="primary">Active</Badge>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">24</h3>
            <p className="text-sm text-neutral-600">Colleges</p>
          </div>
        </Card>

        <Card hover>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-secondary-100 text-secondary-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <Badge variant="success">Total</Badge>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">45.2K</h3>
            <p className="text-sm text-neutral-600">Total Users</p>
          </div>
        </Card>

        <Card hover>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-success-100 text-success-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <Badge variant="info">Global</Badge>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">1,240</h3>
            <p className="text-sm text-neutral-600">Total Events</p>
          </div>
        </Card>

        <Card hover>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-warning-100 text-warning-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <Badge variant="warning">System</Badge>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">99.9%</h3>
            <p className="text-sm text-neutral-600">Uptime</p>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Analytics */}
        <Card className="lg:col-span-2">
          <Card.Header>
            <Card.Title>System Analytics</Card.Title>
            <Card.Description>
              Cross-college metrics and trends
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="text-center py-12 text-neutral-500">
              <BarChart3 className="w-12 h-12 mx-auto mb-3 text-neutral-300" />
              <p className="text-sm">
                Global analytics will be implemented in future tasks
              </p>
              <p className="text-xs mt-2">Multi-tenant aggregated data</p>
            </div>
          </Card.Content>
        </Card>

        {/* Quick Actions */}
        <Card>
          <Card.Header>
            <Card.Title>System Actions</Card.Title>
            <Card.Description>Platform management</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="space-y-3">
              <Button variant="primary" className="w-full justify-start">
                <Building2 className="w-4 h-4" />
                Manage Colleges
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="w-4 h-4" />
                Global Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4" />
                All Users
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4" />
                System Settings
              </Button>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
