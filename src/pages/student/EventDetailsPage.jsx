import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, Button, Badge, Spinner, Alert, Dialog } from "@/components/ui";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ArrowLeft,
  CheckCircle,
  User,
  Mail,
  Phone,
  Globe,
  Share2,
  Bookmark,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import eventService from "@/services/eventService";
import emailService from "@/services/emailService";
import { formatDate, formatDateRange, isPastDate } from "@/utils/dateUtils";

/**
 * Event Details Page
 * View full event details and register
 */

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [registering, setRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch event details from API
      const response = await eventService.getEventById(eventId);
      setEvent(response.data);

      /* LEGACY MOCK DATA - REMOVED
      const mockEvent = {
        _id: eventId,
        title: "Tech Fest 2024",
        description:
          "Join us for the biggest technical festival of the year! Tech Fest 2024 brings together students, professionals, and tech enthusiasts for three days of innovation, competition, and learning.",
        longDescription: `
          <h3>About the Event</h3>
          <p>Tech Fest 2024 is an annual technical festival that showcases the latest innovations in technology, provides a platform for students to compete in various technical events, and offers opportunities to learn from industry experts.</p>
          
          <h3>Highlights</h3>
          <ul>
            <li>Hackathon with prizes worth $10,000</li>
            <li>Technical workshops by industry experts</li>
            <li>Project exhibitions from students</li>
            <li>Tech talks from renowned speakers</li>
            <li>Coding competitions and challenges</li>
            <li>Networking opportunities with professionals</li>
          </ul>
          
          <h3>Schedule</h3>
          <p><strong>Day 1:</strong> Opening ceremony, Hackathon kickoff, Workshop sessions</p>
          <p><strong>Day 2:</strong> Coding competitions, Project presentations, Tech talks</p>
          <p><strong>Day 3:</strong> Finals, Prize distribution, Closing ceremony</p>
          
          <h3>What to Bring</h3>
          <ul>
            <li>Laptop (mandatory for hackathon participants)</li>
            <li>Student ID card</li>
            <li>Registration confirmation</li>
          </ul>
        `,
        category: "TECHNICAL",
        type: "OFFLINE",
        startDate: new Date("2024-03-15T09:00:00"),
        endDate: new Date("2024-03-17T18:00:00"),
        location: "Main Auditorium, Block A",
        maxParticipants: 500,
        registeredCount: 324,
        bannerUrl: null,
        status: "APPROVED",
        organizer: {
          name: "Technical Committee",
          email: "tech.committee@college.edu",
          phone: "+1 234 567 8900",
        },
        requirements: [
          "Must be a registered student",
          "Age: 18 years and above",
          "Basic programming knowledge (for hackathon)",
        ],
        tags: [
          "Technology",
          "Hackathon",
          "Coding",
          "Innovation",
          "Competition",
        ],
      };
      */ // END LEGACY MOCK DATA

      // Check if user is already registered (from event data or separate call if needed)
      // setIsRegistered will be set based on API response if available
    } catch (err) {
      console.error(
        "%c[ERROR] Failed to fetch event",
        "color: #ef4444; font-weight: bold",
        err,
      );
      setError(err.message || "Failed to load event details");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setRegistering(true);

      // Register for event via API
      const response = await eventService.registerForEvent(eventId);
      const registrationId = response.data._id || response.data.id;

      setIsRegistered(true);
      setRegisterDialogOpen(false);
      setSuccessDialogOpen(true);

      // Update event registered count
      setEvent((prev) => ({
        ...prev,
        registeredCount: prev.registeredCount + 1,
      }));

      // Send registration confirmation email
      try {
        await emailService.sendRegistrationEmail(registrationId);
      } catch (emailErr) {
        console.warn("[EMAIL] Failed to send confirmation email:", emailErr);
        // Don't fail registration if email fails
      }
    } catch (err) {
      console.error(
        "%c[ERROR] Registration failed",
        "color: #ef4444; font-weight: bold",
        err,
      );
      setError(err.message || "Failed to register for event");
    } finally {
      setRegistering(false);
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

  const getSeatsInfo = () => {
    if (!event) return { available: 0, percentage: 0, isFull: true };
    const available = event.maxParticipants - event.registeredCount;
    const percentage = (event.registeredCount / event.maxParticipants) * 100;
    return { available, percentage, isFull: available === 0 };
  };

  if (loading) {
    return (
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-center py-12">
          <Spinner size="xl" text="Loading event details..." />
        </div>
      </div>
    );
  }

  if (error && !event) {
    return (
      <div className="p-6 md:p-8">
        <Alert variant="error" className="mb-6">
          {error}
        </Alert>
        <Button onClick={() => navigate("/student/events")}>
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Button>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="p-6 md:p-8">
        <Alert variant="error" className="mb-6">
          Event not found
        </Alert>
        <Button onClick={() => navigate("/student/events")}>
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Button>
      </div>
    );
  }

  const seatsInfo = getSeatsInfo();
  const isEventPast = isPastDate(event.endDate);

  return (
    <div className="p-6 md:p-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate("/student/events")}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Events
      </Button>

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

      {/* Registration Success */}
      {isRegistered && (
        <Alert variant="success" className="mb-6">
          <CheckCircle className="w-5 h-5" />
          You are registered for this event! Check your email for confirmation.
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event Banner */}
          <Card>
            <div className="h-96 bg-linear-to-br from-primary-500 to-secondary-500 rounded-t-lg flex items-center justify-center">
              <Calendar className="w-24 h-24 text-white opacity-50" />
            </div>
            <div className="p-6">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-4">
                <Badge variant={getCategoryVariant(event.category)}>
                  {event.category}
                </Badge>
                <Badge variant={getTypeVariant(event.type)}>{event.type}</Badge>
                {isEventPast && <Badge variant="neutral">Past Event</Badge>}
                {isRegistered && <Badge variant="success">Registered</Badge>}
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-neutral-900 mb-4">
                {event.title}
              </h1>

              {/* Short Description */}
              <p className="text-lg text-neutral-600 mb-6">
                {event.description}
              </p>

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Long Description */}
          <Card>
            <Card.Header>
              <Card.Title>Event Details</Card.Title>
            </Card.Header>
            <Card.Content>
              <div
                className="prose prose-neutral max-w-none"
                dangerouslySetInnerHTML={{ __html: event.longDescription }}
              />
            </Card.Content>
          </Card>

          {/* Requirements */}
          {event.requirements && event.requirements.length > 0 && (
            <Card>
              <Card.Header>
                <Card.Title>Requirements</Card.Title>
              </Card.Header>
              <Card.Content>
                <ul className="space-y-2">
                  {event.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 shrink-0" />
                      <span className="text-neutral-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </Card.Content>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Registration Card */}
          <Card>
            <div className="p-6">
              <h3 className="font-bold text-neutral-900 mb-4">Registration</h3>

              {/* Seats Info */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-neutral-600">
                    Seats Available
                  </span>
                  <span className="text-sm font-semibold text-neutral-900">
                    {seatsInfo.available} / {event.maxParticipants}
                  </span>
                </div>
                <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      seatsInfo.percentage > 90
                        ? "bg-error-500"
                        : seatsInfo.percentage > 70
                          ? "bg-warning-500"
                          : "bg-success-500"
                    }`}
                    style={{ width: `${seatsInfo.percentage}%` }}
                  />
                </div>
              </div>

              {/* Register Button */}
              {isRegistered ? (
                <Button variant="success" className="w-full" disabled>
                  <CheckCircle className="w-5 h-5" />
                  Already Registered
                </Button>
              ) : isEventPast ? (
                <Button variant="neutral" className="w-full" disabled>
                  Event Ended
                </Button>
              ) : seatsInfo.isFull ? (
                <Button variant="error" className="w-full" disabled>
                  Event Full
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => setRegisterDialogOpen(true)}
                >
                  Register Now
                </Button>
              )}

              {/* Action Buttons */}
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Bookmark className="w-4 h-4" />
                  Save
                </Button>
              </div>
            </div>
          </Card>

          {/* Event Info Card */}
          <Card>
            <div className="p-6 space-y-4">
              <h3 className="font-bold text-neutral-900 mb-4">
                Event Information
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      Date & Time
                    </p>
                    <p className="text-sm text-neutral-600">
                      {formatDateRange(event.startDate, event.endDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      Location
                    </p>
                    <p className="text-sm text-neutral-600">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      Capacity
                    </p>
                    <p className="text-sm text-neutral-600">
                      {event.maxParticipants} participants
                    </p>
                  </div>
                </div>

                {event.type === "ONLINE" && (
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-neutral-900">
                        Platform
                      </p>
                      <p className="text-sm text-neutral-600">
                        Link will be shared via email
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Organizer Info Card */}
          <Card>
            <div className="p-6">
              <h3 className="font-bold text-neutral-900 mb-4">Organizer</h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-neutral-400" />
                  <span className="text-sm text-neutral-900">
                    {event.organizer.name}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-neutral-400" />
                  <a
                    href={`mailto:${event.organizer.email}`}
                    className="text-sm text-primary-600 hover:underline"
                  >
                    {event.organizer.email}
                  </a>
                </div>

                {event.organizer.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-neutral-400" />
                    <a
                      href={`tel:${event.organizer.phone}`}
                      className="text-sm text-primary-600 hover:underline"
                    >
                      {event.organizer.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Registration Confirmation Dialog */}
      <Dialog
        open={registerDialogOpen}
        onClose={() => setRegisterDialogOpen(false)}
      >
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Confirm Registration</Dialog.Title>
            <Dialog.Description>
              Are you sure you want to register for this event?
            </Dialog.Description>
          </Dialog.Header>

          <div className="my-6">
            <div className="p-4 bg-neutral-50 rounded-lg space-y-2">
              <p className="font-semibold text-neutral-900">{event.title}</p>
              <p className="text-sm text-neutral-600">
                {formatDateRange(event.startDate, event.endDate)}
              </p>
              <p className="text-sm text-neutral-600">{event.location}</p>
            </div>

            <p className="text-sm text-neutral-600 mt-4">
              A confirmation email will be sent to{" "}
              <strong>{user?.email}</strong>
            </p>
          </div>

          <Dialog.Footer>
            <Button
              variant="outline"
              onClick={() => setRegisterDialogOpen(false)}
              disabled={registering}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleRegister}
              loading={registering}
            >
              Confirm Registration
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>

      {/* Success Dialog */}
      <Dialog
        open={successDialogOpen}
        onClose={() => setSuccessDialogOpen(false)}
      >
        <Dialog.Content>
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-success-100 text-success-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10" />
            </div>
            <Dialog.Title className="text-center mb-2">
              Registration Successful!
            </Dialog.Title>
            <Dialog.Description className="text-center">
              You have successfully registered for{" "}
              <strong>{event.title}</strong>. Check your email for confirmation
              and event details.
            </Dialog.Description>
          </div>

          <Dialog.Footer className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setSuccessDialogOpen(false)}
              className="w-full"
            >
              Close
            </Button>
            <Link to="/student/my-events" className="w-full">
              <Button variant="primary" className="w-full">
                View My Events
              </Button>
            </Link>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </div>
  );
};

export default EventDetailsPage;
