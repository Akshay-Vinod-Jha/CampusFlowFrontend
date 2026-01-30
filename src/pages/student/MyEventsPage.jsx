import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  Clock,
  Download,
  X,
  CheckCircle,
  AlertCircle,
  QrCode,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import eventService from "@/services/eventService";
import emailService from "@/services/emailService";
import {
  formatDate,
  formatDateRange,
  isPastDate,
  isToday,
} from "@/utils/dateUtils";
import { QRCodeDisplay } from "@/components/qr";

/**
 * My Events Page
 * View registered events and manage registrations
 */

const MyEventsPage = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [filter, setFilter] = useState("all"); // all, upcoming, past

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
    try {
      setLoading(true);
      setError("");
      console.log(
        "%c[PAGE] Fetching my registered events",
        "color: #9333ea; font-weight: bold",
      );

      // Mock data (will be replaced with API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockEvents = [
        {
          _id: "2",
          event: {
            _id: "2",
            title: "AI & Machine Learning Workshop",
            description:
              "Hands-on workshop on building ML models with Python and TensorFlow",
            category: "WORKSHOP",
            type: "ONLINE",
            startDate: new Date("2024-03-20T14:00:00"),
            endDate: new Date("2024-03-20T17:00:00"),
            location: "Google Meet",
          },
          registeredAt: new Date("2024-02-15T10:30:00"),
          status: "CONFIRMED",
          qrCode: "QR_CODE_DATA_HERE",
          attended: false,
        },
        {
          _id: "3",
          event: {
            _id: "3",
            title: "Cultural Night",
            description:
              "Evening of music, dance, and drama performances by students",
            category: "CULTURAL",
            type: "OFFLINE",
            startDate: new Date("2024-03-22T18:00:00"),
            endDate: new Date("2024-03-22T22:00:00"),
            location: "Open Air Theatre",
          },
          registeredAt: new Date("2024-02-18T15:45:00"),
          status: "CONFIRMED",
          qrCode: "QR_CODE_DATA_HERE",
          attended: false,
        },
        {
          _id: "4",
          event: {
            _id: "4",
            title: "Startup Seminar",
            description:
              "Learn from successful entrepreneurs about building startups",
            category: "SEMINAR",
            type: "HYBRID",
            startDate: new Date("2024-03-25T10:00:00"),
            endDate: new Date("2024-03-25T13:00:00"),
            location: "Seminar Hall / Zoom",
          },
          registeredAt: new Date("2024-02-20T09:15:00"),
          status: "CONFIRMED",
          qrCode: "QR_CODE_DATA_HERE",
          attended: false,
        },
        {
          _id: "5",
          event: {
            _id: "5",
            title: "Web Development Fundamentals",
            description: "Introduction to HTML, CSS, and JavaScript",
            category: "WORKSHOP",
            type: "ONLINE",
            startDate: new Date("2024-02-10T14:00:00"),
            endDate: new Date("2024-02-10T17:00:00"),
            location: "Zoom",
          },
          registeredAt: new Date("2024-02-05T11:00:00"),
          status: "CONFIRMED",
          qrCode: "QR_CODE_DATA_HERE",
          attended: true,
        },
        {
          _id: "6",
          event: {
            _id: "6",
            title: "Photography Workshop",
            description: "Learn professional photography techniques",
            category: "WORKSHOP",
            type: "OFFLINE",
            startDate: new Date("2024-02-15T10:00:00"),
            endDate: new Date("2024-02-15T16:00:00"),
            location: "Media Lab",
          },
          registeredAt: new Date("2024-02-08T14:30:00"),
          status: "CONFIRMED",
          qrCode: "QR_CODE_DATA_HERE",
          attended: true,
        },
      ];

      setEvents(mockEvents);
      console.log(
        "%c[STATE] My events loaded",
        "color: #22c55e; font-weight: bold",
        mockEvents.length,
      );
    } catch (err) {
      console.error(
        "%c[ERROR] Failed to fetch my events",
        "color: #ef4444; font-weight: bold",
        err,
      );
      setError(err.message || "Failed to load your events");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRegistration = async () => {
    if (!selectedEvent) return;

    try {
      setCancelling(true);
      console.log(
        "%c[ACTION] Cancelling registration",
        "color: #3b82f6; font-weight: bold",
        selectedEvent._id,
      );

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Remove from list
      setEvents(events.filter((e) => e._id !== selectedEvent._id));

      console.log(
        "%c[STATE] Registration cancelled",
        "color: #22c55e; font-weight: bold",
      );

      // Send cancellation notification email
      try {
        await emailService.sendCancellationEmail(
          selectedEvent._id,
          "Cancelled by student",
        );
        console.log(
          "%c[EMAIL] Cancellation notification sent",
          "color: #22c55e; font-weight: bold",
        );
      } catch (emailErr) {
        console.warn("[EMAIL] Failed to send cancellation email:", emailErr);
        // Don't fail cancellation if email fails
      }

      setCancelDialogOpen(false);
      setSelectedEvent(null);
    } catch (err) {
      console.error(
        "%c[ERROR] Cancellation failed",
        "color: #ef4444; font-weight: bold",
        err,
      );
      setError(err.message || "Failed to cancel registration");
    } finally {
      setCancelling(false);
    }
  };

  const openCancelDialog = (event) => {
    setSelectedEvent(event);
    setCancelDialogOpen(true);
  };

  const openQRDialog = (event) => {
    setSelectedEvent(event);
    setQrDialogOpen(true);
    console.log(
      "%c[ACTION] Opening QR code dialog",
      "color: #3b82f6; font-weight: bold",
      event._id,
    );
  };

  const handleDownloadQR = (event) => {
    openQRDialog(event);
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

  // Filter events
  const filteredEvents = events.filter((registration) => {
    const eventDate = new Date(registration.event.startDate);
    const isPast = isPastDate(registration.event.endDate);

    if (filter === "upcoming") return !isPast;
    if (filter === "past") return isPast;
    return true; // all
  });

  // Separate into categories
  const upcomingEvents = events.filter((r) => !isPastDate(r.event.endDate));
  const pastEvents = events.filter((r) => isPastDate(r.event.endDate));
  const todayEvents = events.filter((r) => isToday(r.event.startDate));

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">My Events</h1>
        <p className="text-neutral-600">
          View and manage your event registrations
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
            <p className="text-sm text-neutral-600">Total Registrations</p>
          </div>
        </Card>

        <Card hover>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-warning-100 text-warning-600 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <Badge variant="warning">Upcoming</Badge>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">
              {upcomingEvents.length}
            </h3>
            <p className="text-sm text-neutral-600">Upcoming Events</p>
          </div>
        </Card>

        <Card hover>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-success-100 text-success-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <Badge variant="success">Attended</Badge>
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-1">
              {pastEvents.length}
            </h3>
            <p className="text-sm text-neutral-600">Past Events</p>
          </div>
        </Card>
      </div>

      {/* Today's Events Alert */}
      {todayEvents.length > 0 && (
        <Alert variant="info" className="mb-6">
          <AlertCircle className="w-5 h-5" />
          You have {todayEvents.length} event
          {todayEvents.length !== 1 ? "s" : ""} today!
        </Alert>
      )}

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
            filter === "upcoming"
              ? "text-primary-600 border-b-2 border-primary-600"
              : "text-neutral-600 hover:text-neutral-900"
          }`}
          onClick={() => setFilter("upcoming")}
        >
          Upcoming ({upcomingEvents.length})
        </button>
        <button
          className={`px-4 py-2 font-medium transition-colors ${
            filter === "past"
              ? "text-primary-600 border-b-2 border-primary-600"
              : "text-neutral-600 hover:text-neutral-900"
          }`}
          onClick={() => setFilter("past")}
        >
          Past ({pastEvents.length})
        </button>
      </div>

      {/* Events List */}
      {filteredEvents.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No events found"
          description={
            filter === "upcoming"
              ? "You don't have any upcoming events"
              : filter === "past"
                ? "You haven't attended any events yet"
                : "You haven't registered for any events yet"
          }
          action={
            <Link to="/student/events">
              <Button variant="primary">
                Browse Events
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          {filteredEvents.map((registration) => {
            const event = registration.event;
            const isPast = isPastDate(event.endDate);
            const eventIsToday = isToday(event.startDate);

            return (
              <Card key={registration._id} hover className="overflow-hidden">
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
                        {registration.attended && (
                          <Badge variant="success">
                            <CheckCircle className="w-3 h-3" />
                            Attended
                          </Badge>
                        )}
                        {eventIsToday && <Badge variant="warning">Today</Badge>}
                        {isPast && !registration.attended && (
                          <Badge variant="neutral">Missed</Badge>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-neutral-900 mb-2">
                      {event.title}
                    </h3>

                    <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
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
                    </div>

                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <Calendar className="w-3 h-3" />
                      <span>
                        Registered on{" "}
                        {formatDate(registration.registeredAt, "short")}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Link to={`/student/events/${event._id}`}>
                        <Button variant="primary" size="sm">
                          View Details
                        </Button>
                      </Link>

                      {!isPast && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadQR(registration)}
                          >
                            <QrCode className="w-4 h-4" />
                            QR Code
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openCancelDialog(registration)}
                          >
                            <X className="w-4 h-4" />
                            Cancel
                          </Button>
                        </>
                      )}

                      {registration.attended && (
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                          Certificate
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Cancel Registration Dialog */}
      <Dialog
        open={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
      >
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Cancel Registration</Dialog.Title>
            <Dialog.Description>
              Are you sure you want to cancel your registration for this event?
            </Dialog.Description>
          </Dialog.Header>

          {selectedEvent && (
            <div className="my-6">
              <div className="p-4 bg-neutral-50 rounded-lg space-y-2">
                <p className="font-semibold text-neutral-900">
                  {selectedEvent.event.title}
                </p>
                <p className="text-sm text-neutral-600">
                  {formatDateRange(
                    selectedEvent.event.startDate,
                    selectedEvent.event.endDate,
                  )}
                </p>
              </div>

              <Alert variant="warning" className="mt-4">
                <AlertCircle className="w-5 h-5" />
                This action cannot be undone. You will need to register again to
                attend this event.
              </Alert>
            </div>
          )}

          <Dialog.Footer>
            <Button
              variant="outline"
              onClick={() => setCancelDialogOpen(false)}
              disabled={cancelling}
            >
              Keep Registration
            </Button>
            <Button
              variant="error"
              onClick={handleCancelRegistration}
              loading={cancelling}
            >
              Cancel Registration
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>

      {/* QR Code Dialog */}
      <Dialog open={qrDialogOpen} onClose={() => setQrDialogOpen(false)}>
        <Dialog.Content className="max-w-md">
          <Dialog.Header>
            <Dialog.Title>Event QR Code</Dialog.Title>
            <Dialog.Description>
              Show this QR code at the event for attendance tracking
            </Dialog.Description>
          </Dialog.Header>

          <div className="my-6">
            {selectedEvent && (
              <QRCodeDisplay
                registration={selectedEvent}
                event={selectedEvent.event}
                size={256}
                showActions={true}
              />
            )}
          </div>

          <Dialog.Footer>
            <Button
              variant="primary"
              onClick={() => setQrDialogOpen(false)}
              className="w-full"
            >
              Close
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </div>
  );
};

export default MyEventsPage;
