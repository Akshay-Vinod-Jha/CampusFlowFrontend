import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  Badge,
  EmptyState,
  Spinner,
  Alert,
  Dialog,
} from "@/components/ui";
import {
  Calendar,
  MapPin,
  Users,
  Edit,
  Trash2,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  QrCode,
  Mail,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import ApprovalTimeline from "@/components/events/ApprovalTimeline";
import { SendEmailDialog } from "@/components/email";
import eventService from "@/services/eventService";
import { formatDate, formatDateRange, isPastDate } from "@/utils/dateUtils";

/**
 * My Created Events Page
 * View and manage events created by the organizer
 */

const MyCreatedEventsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // all, draft, pending, approved, rejected
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [timelineDialogOpen, setTimelineDialogOpen] = useState(false);

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
    try {
      setLoading(true);
      setError("");
      console.log(
        "%c[PAGE] Fetching my created events",
        "color: #9333ea; font-weight: bold",
      );

      // Mock data (will be replaced with API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockEvents = [
        {
          _id: "1",
          title: "Tech Fest 2024",
          description: "Annual technical festival with coding competitions",
          category: "TECHNICAL",
          type: "OFFLINE",
          startDate: new Date("2024-03-15T09:00:00"),
          endDate: new Date("2024-03-17T18:00:00"),
          location: "Main Auditorium",
          maxParticipants: 500,
          registeredCount: 324,
          status: "APPROVED",
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
              status: "APPROVED",
              approvedBy: { name: "Admin Office" },
              approvedAt: new Date("2024-02-12T14:00:00"),
              comments: "All requirements met. Approved.",
            },
          ],
          createdAt: new Date("2024-02-08T15:00:00"),
        },
        {
          _id: "2",
          title: "AI & ML Workshop",
          description: "Hands-on workshop on machine learning",
          category: "WORKSHOP",
          type: "ONLINE",
          startDate: new Date("2024-03-20T14:00:00"),
          endDate: new Date("2024-03-20T17:00:00"),
          location: "Zoom",
          maxParticipants: 100,
          registeredCount: 0,
          status: "FACULTY_PENDING",
          approvals: [
            {
              approvalLevel: "FACULTY",
              status: "PENDING",
            },
          ],
          createdAt: new Date("2024-02-20T10:00:00"),
        },
        {
          _id: "3",
          title: "Startup Bootcamp",
          description: "Intensive entrepreneurship bootcamp",
          category: "WORKSHOP",
          type: "HYBRID",
          startDate: new Date("2024-04-01T09:00:00"),
          endDate: new Date("2024-04-03T18:00:00"),
          location: "Innovation Lab / Online",
          maxParticipants: 80,
          registeredCount: 0,
          status: "DRAFT",
          approvals: [],
          createdAt: new Date("2024-02-25T11:30:00"),
        },
        {
          _id: "4",
          title: "Music Festival",
          description: "Evening of live music performances",
          category: "CULTURAL",
          type: "OFFLINE",
          startDate: new Date("2024-03-28T18:00:00"),
          endDate: new Date("2024-03-28T22:00:00"),
          location: "Open Air Theatre",
          maxParticipants: 1000,
          registeredCount: 0,
          status: "REJECTED",
          approvals: [
            {
              approvalLevel: "FACULTY",
              status: "REJECTED",
              approvedBy: { name: "Dr. Sarah Johnson" },
              approvedAt: new Date("2024-02-18T16:00:00"),
              comments:
                "Please provide more details about security arrangements.",
            },
          ],
          createdAt: new Date("2024-02-15T14:00:00"),
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
      setError(err.message || "Failed to load your events");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;

    try {
      setDeleting(true);
      console.log(
        "%c[ACTION] Deleting event",
        "color: #3b82f6; font-weight: bold",
        selectedEvent._id,
      );

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setEvents(events.filter((e) => e._id !== selectedEvent._id));
      setDeleteDialogOpen(false);
      setSelectedEvent(null);

      console.log(
        "%c[STATE] Event deleted",
        "color: #22c55e; font-weight: bold",
      );
    } catch (err) {
      console.error(
        "%c[ERROR] Deletion failed",
        "color: #ef4444; font-weight: bold",
        err,
      );
      setError(err.message || "Failed to delete event");
    } finally {
      setDeleting(false);
    }
  };

  const openDeleteDialog = (event) => {
    setSelectedEvent(event);
    setDeleteDialogOpen(true);
  };

  const openTimelineDialog = (event) => {
    setSelectedEvent(event);
    setTimelineDialogOpen(true);
  };

  const openEmailDialog = (event) => {
    setSelectedEvent(event);
    setEmailDialogOpen(true);
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

  const getStatusBadge = (status) => {
    const badges = {
      DRAFT: { variant: "neutral", icon: Edit, label: "Draft" },
      FACULTY_PENDING: {
        variant: "warning",
        icon: Clock,
        label: "Faculty Review",
      },
      ADMIN_PENDING: { variant: "warning", icon: Clock, label: "Admin Review" },
      APPROVED: { variant: "success", icon: CheckCircle, label: "Approved" },
      REJECTED: { variant: "error", icon: XCircle, label: "Rejected" },
    };
    const badge = badges[status] || badges.DRAFT;
    const Icon = badge.icon;

    return (
      <Badge variant={badge.variant}>
        <Icon className="w-3 h-3" />
        {badge.label}
      </Badge>
    );
  };

  // Filter events
  const filteredEvents = events.filter((event) => {
    if (filter === "all") return true;
    if (filter === "draft") return event.status === "DRAFT";
    if (filter === "pending")
      return (
        event.status === "FACULTY_PENDING" || event.status === "ADMIN_PENDING"
      );
    if (filter === "approved") return event.status === "APPROVED";
    if (filter === "rejected") return event.status === "REJECTED";
    return true;
  });

  // Stats
  const draftCount = events.filter((e) => e.status === "DRAFT").length;
  const pendingCount = events.filter(
    (e) => e.status === "FACULTY_PENDING" || e.status === "ADMIN_PENDING",
  ).length;
  const approvedCount = events.filter((e) => e.status === "APPROVED").length;
  const rejectedCount = events.filter((e) => e.status === "REJECTED").length;

  if (loading) {
    return (
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-center py-12">
          <Spinner size="xl" text="Loading your events..." />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            My Events
          </h1>
          <p className="text-neutral-600">Manage events you've created</p>
        </div>
        <Link to="/organizer/create-event">
          <Button variant="primary" size="lg">
            <Plus className="w-5 h-5" />
            Create Event
          </Button>
        </Link>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card hover>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <Badge variant="primary">Total</Badge>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">
              {events.length}
            </h3>
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
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">
              {pendingCount}
            </h3>
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
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">
              {approvedCount}
            </h3>
            <p className="text-sm text-neutral-600">Live Events</p>
          </div>
        </Card>

        <Card hover>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-neutral-100 text-neutral-600 rounded-lg flex items-center justify-center">
                <Edit className="w-6 h-6" />
              </div>
              <Badge variant="neutral">Draft</Badge>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">
              {draftCount}
            </h3>
            <p className="text-sm text-neutral-600">Drafts</p>
          </div>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2 border-b border-neutral-200">
        <button
          className={`px-4 py-2 font-medium transition-colors ${
            filter === "all"
              ? "text-primary-600 border-b-2 border-primary-600"
              : "text-neutral-600 hover:text-neutral-900"
          }`}
          onClick={() => setFilter("all")}
        >
          All Events ({events.length})
        </button>
        <button
          className={`px-4 py-2 font-medium transition-colors ${
            filter === "pending"
              ? "text-primary-600 border-b-2 border-primary-600"
              : "text-neutral-600 hover:text-neutral-900"
          }`}
          onClick={() => setFilter("pending")}
        >
          Pending ({pendingCount})
        </button>
        <button
          className={`px-4 py-2 font-medium transition-colors ${
            filter === "approved"
              ? "text-primary-600 border-b-2 border-primary-600"
              : "text-neutral-600 hover:text-neutral-900"
          }`}
          onClick={() => setFilter("approved")}
        >
          Approved ({approvedCount})
        </button>
        <button
          className={`px-4 py-2 font-medium transition-colors ${
            filter === "draft"
              ? "text-primary-600 border-b-2 border-primary-600"
              : "text-neutral-600 hover:text-neutral-900"
          }`}
          onClick={() => setFilter("draft")}
        >
          Drafts ({draftCount})
        </button>
        {rejectedCount > 0 && (
          <button
            className={`px-4 py-2 font-medium transition-colors ${
              filter === "rejected"
                ? "text-primary-600 border-b-2 border-primary-600"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
            onClick={() => setFilter("rejected")}
          >
            Rejected ({rejectedCount})
          </button>
        )}
      </div>

      {/* Events List */}
      {filteredEvents.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No events found"
          description={
            filter === "draft"
              ? "You don't have any draft events"
              : filter === "pending"
                ? "You don't have any events pending approval"
                : filter === "approved"
                  ? "You don't have any approved events"
                  : filter === "rejected"
                    ? "You don't have any rejected events"
                    : "You haven't created any events yet"
          }
          action={
            <Link to="/organizer/create-event">
              <Button variant="primary">
                <Plus className="w-4 h-4" />
                Create Your First Event
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          {filteredEvents.map((event) => {
            const isPast = isPastDate(event.endDate);

            return (
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
                        {getStatusBadge(event.status)}
                        {isPast && <Badge variant="neutral">Past Event</Badge>}
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
                        <span>
                          {event.registeredCount} / {event.maxParticipants}{" "}
                          registered
                        </span>
                      </div>
                    </div>

                    {/* Rejection Notice */}
                    {event.status === "REJECTED" &&
                      event.approvals.length > 0 && (
                        <Alert variant="error" className="mb-4">
                          <AlertCircle className="w-5 h-5" />
                          <div>
                            <p className="font-semibold">Event Rejected</p>
                            <p className="text-sm mt-1">
                              {
                                event.approvals.find(
                                  (a) => a.status === "REJECTED",
                                )?.comments
                              }
                            </p>
                          </div>
                        </Alert>
                      )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      {event.status === "DRAFT" ? (
                        <>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() =>
                              navigate(`/organizer/events/${event._id}/edit`)
                            }
                          >
                            <Edit className="w-4 h-4" />
                            Edit & Submit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openDeleteDialog(event)}
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => openTimelineDialog(event)}
                          >
                            <Eye className="w-4 h-4" />
                            View Timeline
                          </Button>
                          {event.status === "APPROVED" && (
                            <>
                              <Link to={`/student/events/${event._id}`}>
                                <Button variant="outline" size="sm">
                                  <Eye className="w-4 h-4" />
                                  View Public Page
                                </Button>
                              </Link>
                              <Link
                                to={`/organizer/events/${event._id}/attendance`}
                              >
                                <Button variant="outline" size="sm">
                                  <QrCode className="w-4 h-4" />
                                  Track Attendance
                                </Button>
                              </Link>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEmailDialog(event)}
                              >
                                <Mail className="w-4 h-4" />
                                Send Email
                              </Button>
                            </>
                          )}
                          {event.status === "REJECTED" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                navigate(`/organizer/events/${event._id}/edit`)
                              }
                            >
                              <Edit className="w-4 h-4" />
                              Edit & Resubmit
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Delete Event</Dialog.Title>
            <Dialog.Description>
              Are you sure you want to delete this event? This action cannot be
              undone.
            </Dialog.Description>
          </Dialog.Header>

          {selectedEvent && (
            <div className="my-6">
              <div className="p-4 bg-neutral-50 rounded-lg space-y-2">
                <p className="font-semibold text-neutral-900">
                  {selectedEvent.title}
                </p>
                <p className="text-sm text-neutral-600">
                  {formatDateRange(
                    selectedEvent.startDate,
                    selectedEvent.endDate,
                  )}
                </p>
              </div>
            </div>
          )}

          <Dialog.Footer>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button variant="error" onClick={handleDelete} loading={deleting}>
              Delete Event
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>

      {/* Approval Timeline Dialog */}
      <Dialog
        open={timelineDialogOpen}
        onClose={() => setTimelineDialogOpen(false)}
      >
        <Dialog.Content className="max-w-2xl">
          <Dialog.Header>
            <Dialog.Title>Approval Timeline</Dialog.Title>
            <Dialog.Description>
              {selectedEvent && selectedEvent.title}
            </Dialog.Description>
          </Dialog.Header>

          <div className="my-6">
            {selectedEvent && (
              <ApprovalTimeline
                approvals={selectedEvent.approvals}
                currentStatus={selectedEvent.status}
              />
            )}
          </div>

          <Dialog.Footer>
            <Button onClick={() => setTimelineDialogOpen(false)}>Close</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>

      {/* Send Email Dialog */}
      {selectedEvent && (
        <SendEmailDialog
          open={emailDialogOpen}
          onClose={() => setEmailDialogOpen(false)}
          eventId={selectedEvent._id}
          eventTitle={selectedEvent.title}
        />
      )}
    </div>
  );
};

export default MyCreatedEventsPage;
