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
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import approvalService from "@/services/approvalService";
import {
  formatDate,
  formatDateRange,
  getRelativeTime,
} from "@/utils/dateUtils";

/**
 * Pending Approvals Page (Faculty)
 * View and manage events awaiting faculty approval
 */

const PendingApprovalsPage = () => {
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

      // Fetch pending approvals from API
      const response = await approvalService.getPendingApprovals();
      setEvents(response.data || []);

      /* LEGACY MOCK DATA - REMOVED
      const mockEvents = [
        {
          _id: "1",
          title: "AI & ML Workshop",
          description: "Hands-on workshop on machine learning fundamentals",
          longDescription:
            "A comprehensive workshop covering the basics of artificial intelligence and machine learning, including practical hands-on sessions with popular ML frameworks.",
          category: "WORKSHOP",
          type: "ONLINE",
          startDate: new Date("2024-03-20T14:00:00"),
          endDate: new Date("2024-03-20T17:00:00"),
          location: "Zoom",
          maxParticipants: 100,
          requirements: [
            "Laptop with Python installed",
            "Basic programming knowledge",
          ],
          tags: ["AI", "Machine Learning", "Python"],
          status: "FACULTY_PENDING",
          organizer: {
            _id: "org1",
            name: "John Doe",
            email: "john@example.com",
            department: "Computer Science",
          },
          submittedAt: new Date("2024-02-20T10:00:00"),
          approvals: [
            {
              approvalLevel: "FACULTY",
              status: "PENDING",
            },
          ],
        },
        {
          _id: "2",
          title: "Startup Bootcamp",
          description:
            "Intensive entrepreneurship bootcamp for aspiring founders",
          longDescription:
            "Three-day intensive bootcamp covering all aspects of starting and scaling a startup, from ideation to funding.",
          category: "WORKSHOP",
          type: "HYBRID",
          startDate: new Date("2024-04-01T09:00:00"),
          endDate: new Date("2024-04-03T18:00:00"),
          location: "Innovation Lab / Online",
          maxParticipants: 80,
          requirements: [
            "Bring your business idea",
            "Laptop for presentations",
          ],
          tags: ["Entrepreneurship", "Startup", "Business"],
          status: "FACULTY_PENDING",
          organizer: {
            _id: "org2",
            name: "Jane Smith",
            email: "jane@example.com",
            department: "Business Management",
          },
          submittedAt: new Date("2024-02-25T11:30:00"),
          approvals: [
            {
              approvalLevel: "FACULTY",
              status: "PENDING",
            },
          ],
        },
        {
          _id: "3",
          title: "Web Development Bootcamp",
          description: "Learn modern web development with React and Node.js",
          longDescription:
            "A comprehensive bootcamp covering frontend and backend web development using modern technologies like React, Node.js, and MongoDB.",
          category: "TECHNICAL",
          type: "OFFLINE",
          startDate: new Date("2024-03-25T10:00:00"),
          endDate: new Date("2024-03-27T17:00:00"),
          location: "Computer Lab 3",
          maxParticipants: 60,
          requirements: ["Laptop", "Basic HTML/CSS knowledge"],
          tags: ["Web Development", "React", "Node.js"],
          status: "FACULTY_PENDING",
          organizer: {
            _id: "org3",
            name: "Mike Johnson",
            email: "mike@example.com",
            department: "Information Technology",
          },
          submittedAt: new Date("2024-01-15T09:00:00"),
          approvals: [
            {
              approvalLevel: "FACULTY",
              status: "PENDING",
            },
          ],
        },
      ];
      */ // END LEGACY MOCK DATA
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

  const getUrgencyBadge = (submittedAt) => {
    const daysSinceSubmission = Math.floor(
      (new Date() - new Date(submittedAt)) / (1000 * 60 * 60 * 24),
    );

    if (daysSinceSubmission > 7) {
      return (
        <Badge variant="error">
          Urgent - {daysSinceSubmission} days pending
        </Badge>
      );
    } else if (daysSinceSubmission > 3) {
      return (
        <Badge variant="warning">
          Review Soon - {daysSinceSubmission} days pending
        </Badge>
      );
    }
    return (
      <Badge variant="info">Recent - {daysSinceSubmission} days pending</Badge>
    );
  };

  // Filter events
  const filteredEvents = events.filter((event) => {
    const daysSinceSubmission = Math.floor(
      (new Date() - new Date(event.submittedAt)) / (1000 * 60 * 60 * 24),
    );

    if (filter === "urgent") return daysSinceSubmission > 7;
    if (filter === "recent") return daysSinceSubmission <= 3;
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
          Pending Approvals
        </h1>
        <p className="text-neutral-600">
          Review and approve events awaiting your action
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
                    (new Date() - new Date(e.submittedAt)) /
                      (1000 * 60 * 60 * 24),
                  ) > 7,
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
                    (new Date() - new Date(e.submittedAt)) /
                      (1000 * 60 * 60 * 24),
                  ) <= 3,
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
                ? "No recent submissions"
                : "All caught up! No events awaiting your approval"
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
                <div className="w-full md:w-48 h-48 md:h-auto bg-linear-to-br from-primary-500 to-secondary-500 flex items-center justify-center shrink-0">
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
                      {getUrgencyBadge(event.submittedAt)}
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

                  {/* Organizer Info */}
                  <div className="mb-4 p-3 bg-neutral-50 rounded-lg">
                    <p className="text-sm text-neutral-600">
                      <span className="font-semibold">Organizer:</span>{" "}
                      {event.organizer.name}
                      {event.organizer.department &&
                        ` • ${event.organizer.department}`}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      Submitted {getRelativeTime(event.submittedAt)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() =>
                        navigate(`/faculty/approvals/${event._id}`)
                      }
                    >
                      <Eye className="w-4 h-4" />
                      Review & Decide
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

export default PendingApprovalsPage;
