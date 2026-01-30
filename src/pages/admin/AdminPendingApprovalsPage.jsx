import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  Badge,
  EmptyState,
  Spinner,
  Alert,
} from "@/components/ui";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Eye,
  CheckCircle,
  XCircle,
  Filter,
  Award,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import approvalService from "@/services/approvalService";
import {
  formatDate,
  formatDateRange,
  getRelativeTime,
} from "@/utils/dateUtils";

/**
 * Pending Approvals Page (Admin)
 * View and manage events awaiting final admin approval
 */

const AdminPendingApprovalsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // all, urgent, recent

  useEffect(() => {
    fetchPendingApprovals();
  }, []);

  const fetchPendingApprovals = async () => {
    try {
      setLoading(true);
      setError("");
      console.log(
        "%c[PAGE] Fetching admin pending approvals",
        "color: #9333ea; font-weight: bold",
      );

      // Mock data (will be replaced with API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockEvents = [
        {
          _id: "1",
          title: "Tech Fest 2024",
          description: "Annual technical festival with coding competitions",
          longDescription:
            "Major technical festival featuring hackathons, coding competitions, tech talks, and workshops. Expected to attract 500+ participants from various colleges.",
          category: "TECHNICAL",
          type: "OFFLINE",
          startDate: new Date("2024-03-15T09:00:00"),
          endDate: new Date("2024-03-17T18:00:00"),
          location: "Main Auditorium & Computer Labs",
          maxParticipants: 500,
          registeredCount: 324,
          requirements: [
            "Student ID Card",
            "Laptop for competitions",
            "Registration confirmation",
          ],
          tags: ["Hackathon", "Coding", "Technology"],
          status: "ADMIN_PENDING",
          organizer: {
            _id: "org1",
            name: "John Doe",
            email: "john@example.com",
            department: "Computer Science",
          },
          submittedAt: new Date("2024-02-08T15:00:00"),
          facultyApprovedAt: new Date("2024-02-10T10:30:00"),
          approvals: [
            {
              approvalLevel: "FACULTY",
              status: "APPROVED",
              approvedBy: { name: "Dr. John Smith" },
              approvedAt: new Date("2024-02-10T10:30:00"),
              comments: "Great initiative! Approved.",
            },
            {
              approvalLevel: "ADMIN",
              status: "PENDING",
            },
          ],
        },
        {
          _id: "2",
          title: "Annual Cultural Fest",
          description:
            "Three-day cultural extravaganza with music, dance, and drama",
          longDescription:
            "Grand cultural festival showcasing student talent in music, dance, drama, and arts. Multiple stages, celebrity performances, and competitions.",
          category: "CULTURAL",
          type: "OFFLINE",
          startDate: new Date("2024-03-22T10:00:00"),
          endDate: new Date("2024-03-24T22:00:00"),
          location: "Open Air Theatre & Main Ground",
          maxParticipants: 2000,
          registeredCount: 0,
          requirements: [
            "College ID",
            "Event pass",
            "Participant registration for competitions",
          ],
          tags: ["Music", "Dance", "Drama", "Arts"],
          status: "ADMIN_PENDING",
          organizer: {
            _id: "org2",
            name: "Sarah Williams",
            email: "sarah@example.com",
            department: "Fine Arts",
          },
          submittedAt: new Date("2024-02-15T09:00:00"),
          facultyApprovedAt: new Date("2024-02-18T14:00:00"),
          approvals: [
            {
              approvalLevel: "FACULTY",
              status: "APPROVED",
              approvedBy: { name: "Dr. Emily Davis" },
              approvedAt: new Date("2024-02-18T14:00:00"),
              comments: "Well-planned event with proper safety measures.",
            },
            {
              approvalLevel: "ADMIN",
              status: "PENDING",
            },
          ],
        },
        {
          _id: "3",
          title: "Startup Summit 2024",
          description: "Entrepreneurship summit with industry leaders",
          longDescription:
            "Full-day summit featuring keynote speakers from successful startups, panel discussions, networking sessions, and pitch competitions for student entrepreneurs.",
          category: "SEMINAR",
          type: "HYBRID",
          startDate: new Date("2024-04-05T09:00:00"),
          endDate: new Date("2024-04-05T18:00:00"),
          location: "Conference Hall / Online Stream",
          maxParticipants: 300,
          registeredCount: 0,
          requirements: [
            "Registration form",
            "Pitch deck (for competitors)",
            "Business plan (optional)",
          ],
          tags: ["Entrepreneurship", "Startup", "Business", "Innovation"],
          status: "ADMIN_PENDING",
          organizer: {
            _id: "org3",
            name: "Mike Johnson",
            email: "mike@example.com",
            department: "Business Management",
          },
          submittedAt: new Date("2024-01-20T10:00:00"),
          facultyApprovedAt: new Date("2024-01-25T16:00:00"),
          approvals: [
            {
              approvalLevel: "FACULTY",
              status: "APPROVED",
              approvedBy: { name: "Prof. Robert Brown" },
              approvedAt: new Date("2024-01-25T16:00:00"),
              comments: "Excellent speakers lineup. Approved with enthusiasm.",
            },
            {
              approvalLevel: "ADMIN",
              status: "PENDING",
            },
          ],
        },
      ];

      setEvents(mockEvents);
      console.log(
        "%c[STATE] Events loaded",
        "color: #22c55e; font-weight: bold",
        mockEvents.length,
      );
    } catch (err) {
      console.error(
        "%c[ERROR] Failed to fetch events",
        "color: #ef4444; font-weight: bold",
        err,
      );
      setError(err.message || "Failed to load pending approvals");
    } finally {
      setLoading(false);
    }
  };

  const getCategoryVariant = (category) => {
    const variants = {
      TECHNICAL: "primary",
      CULTURAL: "secondary",
      SPORTS: "success",
      WORKSHOP: "warning",
      SEMINAR: "info",
      OTHER: "neutral",
    };
    return variants[category] || "neutral";
  };

  const getTypeVariant = (type) => {
    const variants = {
      ONLINE: "info",
      OFFLINE: "success",
      HYBRID: "warning",
    };
    return variants[type] || "neutral";
  };

  const getUrgencyBadge = (facultyApprovedAt) => {
    const daysSinceFacultyApproval = Math.floor(
      (new Date() - new Date(facultyApprovedAt)) / (1000 * 60 * 60 * 24),
    );

    if (daysSinceFacultyApproval > 5) {
      return (
        <Badge variant="error">
          Urgent - {daysSinceFacultyApproval} days waiting
        </Badge>
      );
    } else if (daysSinceFacultyApproval > 2) {
      return (
        <Badge variant="warning">
          Review Soon - {daysSinceFacultyApproval} days waiting
        </Badge>
      );
    }
    return (
      <Badge variant="info">
        Recent - {daysSinceFacultyApproval} days waiting
      </Badge>
    );
  };

  // Filter events
  const filteredEvents = events.filter((event) => {
    const daysSinceFacultyApproval = Math.floor(
      (new Date() - new Date(event.facultyApprovedAt)) / (1000 * 60 * 60 * 24),
    );

    if (filter === "urgent") return daysSinceFacultyApproval > 5;
    if (filter === "recent") return daysSinceFacultyApproval <= 2;
    return true;
  });

  if (loading) {
    return (
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-center py-12">
          <Spinner size="xl" text="Loading pending approvals..." />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Final Approval Required
        </h1>
        <p className="text-neutral-600">
          Events approved by faculty awaiting your final decision
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert
          variant="error"
          className="mb-6"
          dismissible
          onClose={() => setError("")}
        >
          {error}
        </Alert>
      )}

      {/* Info Banner */}
      <Alert variant="info" className="mb-6">
        <Award className="w-5 h-5" />
        <div>
          <p className="font-semibold">Final Approval Authority</p>
          <p className="text-sm mt-1">
            Your approval will make these events live and visible to all
            students. Once approved, events cannot be reversed without creating
            a new event.
          </p>
        </div>
      </Alert>

      {/* Filter Bar */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex items-center gap-2 text-neutral-600">
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filter:</span>
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "primary" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All ({events.length})
          </Button>
          <Button
            variant={filter === "urgent" ? "error" : "outline"}
            size="sm"
            onClick={() => setFilter("urgent")}
          >
            Urgent (
            {
              events.filter(
                (e) =>
                  Math.floor(
                    (new Date() - new Date(e.facultyApprovedAt)) /
                      (1000 * 60 * 60 * 24),
                  ) > 5,
              ).length
            }
            )
          </Button>
          <Button
            variant={filter === "recent" ? "info" : "outline"}
            size="sm"
            onClick={() => setFilter("recent")}
          >
            Recent (
            {
              events.filter(
                (e) =>
                  Math.floor(
                    (new Date() - new Date(e.facultyApprovedAt)) /
                      (1000 * 60 * 60 * 24),
                  ) <= 2,
              ).length
            }
            )
          </Button>
        </div>
      </div>

      {/* Events List */}
      {filteredEvents.length === 0 ? (
        <EmptyState
          icon={CheckCircle}
          title="No pending approvals"
          description={
            filter === "urgent"
              ? "No urgent approvals at this time"
              : filter === "recent"
                ? "No recent faculty approvals"
                : "All caught up! No events awaiting your final approval"
          }
          action={
            filter !== "all" ? (
              <Button variant="outline" onClick={() => setFilter("all")}>
                View All
              </Button>
            ) : null
          }
        />
      ) : (
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <Card key={event._id} hover className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Event Banner */}
                <div className="w-full md:w-48 h-48 md:h-auto bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-12 h-12 text-white opacity-50" />
                </div>

                {/* Event Details */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant={getCategoryVariant(event.category)}>
                        {event.category}
                      </Badge>
                      <Badge variant={getTypeVariant(event.type)}>
                        {event.type}
                      </Badge>
                      {getUrgencyBadge(event.facultyApprovedAt)}
                      <Badge variant="success">
                        <CheckCircle className="w-3 h-3" />
                        Faculty Approved
                      </Badge>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    {event.title}
                  </h3>

                  <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Clock className="w-4 h-4" />
                      <span>
                        {formatDateRange(event.startDate, event.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Users className="w-4 h-4" />
                      <span>Capacity: {event.maxParticipants}</span>
                    </div>
                  </div>

                  {/* Approval Info */}
                  <div className="mb-4 p-3 bg-success-50 rounded-lg border border-success-200">
                    <p className="text-sm text-success-900 font-semibold mb-1">
                      Faculty Approval Details
                    </p>
                    <p className="text-sm text-success-800">
                      Approved by{" "}
                      {event.approvals.find(
                        (a) => a.approvalLevel === "FACULTY",
                      )?.approvedBy?.name || "Faculty"}{" "}
                      • {getRelativeTime(event.facultyApprovedAt)}
                    </p>
                    {event.approvals.find((a) => a.approvalLevel === "FACULTY")
                      ?.comments && (
                      <p className="text-sm text-success-700 mt-1 italic">
                        "
                        {
                          event.approvals.find(
                            (a) => a.approvalLevel === "FACULTY",
                          )?.comments
                        }
                        "
                      </p>
                    )}
                  </div>

                  {/* Organizer Info */}
                  <div className="mb-4 p-3 bg-neutral-50 rounded-lg">
                    <p className="text-sm text-neutral-600">
                      <span className="font-semibold">Organizer:</span>{" "}
                      {event.organizer.name}
                      {event.organizer.department &&
                        ` • ${event.organizer.department}`}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/admin/approvals/${event._id}`)}
                    >
                      <Eye className="w-4 h-4" />
                      Review & Make Final Decision
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPendingApprovalsPage;
