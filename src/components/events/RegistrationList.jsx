import { Card, Badge, EmptyState, Button } from "@/components/ui";
import {
  Users,
  Mail,
  Phone,
  Calendar,
  Download,
  UserCheck,
} from "lucide-react";
import { formatDate } from "@/utils/dateUtils";

/**
 * RegistrationList Component
 * Display list of registered users for an event
 */

const RegistrationList = ({
  registrations = [],
  eventTitle,
  onExport,
  showActions = true,
}) => {
  const getStatusBadge = (status) => {
    const badges = {
      REGISTERED: { variant: "success", label: "Registered" },
      ATTENDED: { variant: "primary", label: "Attended" },
      CANCELLED: { variant: "error", label: "Cancelled" },
      WAITLIST: { variant: "warning", label: "Waitlist" },
    };
    const badge = badges[status] || badges.REGISTERED;
    return <Badge variant={badge.variant}>{badge.label}</Badge>;
  };

  if (registrations.length === 0) {
    return (
      <Card>
        <Card.Content>
          <EmptyState
            icon={Users}
            title="No registrations yet"
            description="No students have registered for this event"
          />
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header>
        <div className="flex items-center justify-between">
          <div>
            <Card.Title>Registered Participants</Card.Title>
            <Card.Description>
              {registrations.length} participant
              {registrations.length !== 1 ? "s" : ""}{" "}
              {eventTitle && `for ${eventTitle}`}
            </Card.Description>
          </div>
          {showActions && onExport && (
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="w-4 h-4" />
              Export List
            </Button>
          )}
        </div>
      </Card.Header>
      <Card.Content>
        <div className="space-y-3">
          {registrations.map((registration) => (
            <div
              key={registration._id}
              className="flex items-start justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <div className="flex items-start gap-3 flex-1">
                {/* Avatar */}
                <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-semibold text-sm">
                    {registration.user?.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-neutral-900">
                      {registration.user?.name || "Unknown User"}
                    </h4>
                    {getStatusBadge(registration.status)}
                  </div>

                  <div className="space-y-1">
                    {registration.user?.email && (
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <Mail className="w-3 h-3" />
                        <span className="truncate">
                          {registration.user.email}
                        </span>
                      </div>
                    )}

                    {registration.user?.phone && (
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <Phone className="w-3 h-3" />
                        <span>{registration.user.phone}</span>
                      </div>
                    )}

                    {registration.user?.department && (
                      <div className="text-sm text-neutral-600">
                        <span className="font-medium">Department:</span>{" "}
                        {registration.user.department}
                      </div>
                    )}

                    {registration.user?.year && (
                      <div className="text-sm text-neutral-600">
                        <span className="font-medium">Year:</span>{" "}
                        {registration.user.year}
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs text-neutral-500 mt-2">
                      <Calendar className="w-3 h-3" />
                      <span>
                        Registered on {formatDate(registration.registeredAt)}
                      </span>
                    </div>

                    {registration.attendedAt && (
                      <div className="flex items-center gap-2 text-xs text-success-600 mt-1">
                        <UserCheck className="w-3 h-3" />
                        <span>
                          Attended on {formatDate(registration.attendedAt)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* QR Code or Additional Actions */}
              {registration.qrCode && (
                <div className="ml-4">
                  <div className="w-16 h-16 bg-white border border-neutral-200 rounded flex items-center justify-center">
                    <span className="text-xs text-neutral-400">QR</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 pt-4 border-t border-neutral-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-neutral-900">
                {registrations.filter((r) => r.status === "REGISTERED").length}
              </p>
              <p className="text-sm text-neutral-600">Registered</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success-600">
                {registrations.filter((r) => r.status === "ATTENDED").length}
              </p>
              <p className="text-sm text-neutral-600">Attended</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-warning-600">
                {registrations.filter((r) => r.status === "WAITLIST").length}
              </p>
              <p className="text-sm text-neutral-600">Waitlist</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-error-600">
                {registrations.filter((r) => r.status === "CANCELLED").length}
              </p>
              <p className="text-sm text-neutral-600">Cancelled</p>
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default RegistrationList;
