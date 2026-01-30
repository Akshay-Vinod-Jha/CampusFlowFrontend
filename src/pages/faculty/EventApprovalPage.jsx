import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Card,
  Button,
  Badge,
  Alert,
  Dialog,
  Spinner,
  Input,
} from "@/components/ui";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  ArrowLeft,
  User,
  Tag,
  FileText,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import ApprovalTimeline from "@/components/events/ApprovalTimeline";
import approvalService from "@/services/approvalService";
import { formatDate, formatDateRange } from "@/utils/dateUtils";

/**
 * Event Approval Page (Faculty)
 * View event details and approve/reject with comments
 */

const EventApprovalPage = () => {
  const { eventId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [comments, setComments] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      setError("");
      console.log(
        "%c[PAGE] Fetching event for approval",
        "color: #9333ea; font-weight: bold",
        eventId,
      );

      // Mock data (will be replaced with API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockEvent = {
        _id: eventId,
        title: "AI & ML Workshop",
        description: "Hands-on workshop on machine learning fundamentals",
        longDescription:
          "A comprehensive workshop covering the basics of artificial intelligence and machine learning, including practical hands-on sessions with popular ML frameworks. Participants will learn about supervised learning, unsupervised learning, neural networks, and deep learning. The workshop includes coding exercises using Python, TensorFlow, and scikit-learn.",
        category: "WORKSHOP",
        type: "ONLINE",
        startDate: new Date("2024-03-20T14:00:00"),
        endDate: new Date("2024-03-20T17:00:00"),
        location: "Zoom (link will be shared)",
        maxParticipants: 100,
        requirements: [
          "Laptop with Python 3.8+ installed",
          "Basic programming knowledge",
          "Jupyter Notebook setup",
          "Stable internet connection",
        ],
        tags: ["AI", "Machine Learning", "Python", "TensorFlow"],
        status: "FACULTY_PENDING",
        organizer: {
          _id: "org1",
          name: "John Doe",
          email: "john@example.com",
          phone: "+1 234 567 8900",
          department: "Computer Science",
        },
        submittedAt: new Date("2024-02-20T10:00:00"),
        approvals: [
          {
            approvalLevel: "FACULTY",
            status: "PENDING",
          },
        ],
      };

      setEvent(mockEvent);
      console.log(
        "%c[STATE] Event loaded",
        "color: #22c55e; font-weight: bold",
        mockEvent,
      );
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

  const handleApprove = async () => {
    try {
      setProcessing(true);
      console.log(
        "%c[ACTION] Approving event",
        "color: #3b82f6; font-weight: bold",
        eventId,
        comments,
      );

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log(
        "%c[SUCCESS] Event approved",
        "color: #22c55e; font-weight: bold",
      );
      setApproveDialogOpen(false);
      navigate("/faculty/approvals", {
        state: {
          message:
            "Event approved successfully! It will now proceed to admin review.",
        },
      });
    } catch (err) {
      console.error(
        "%c[ERROR] Approval failed",
        "color: #ef4444; font-weight: bold",
        err,
      );
      setError(err.message || "Failed to approve event");
      setApproveDialogOpen(false);
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!comments.trim()) {
      setError("Please provide a reason for rejection");
      return;
    }

    try {
      setProcessing(true);
      console.log(
        "%c[ACTION] Rejecting event",
        "color: #3b82f6; font-weight: bold",
        eventId,
        comments,
      );

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log(
        "%c[SUCCESS] Event rejected",
        "color: #22c55e; font-weight: bold",
      );
      setRejectDialogOpen(false);
      navigate("/faculty/approvals", {
        state: { message: "Event rejected. The organizer has been notified." },
      });
    } catch (err) {
      console.error(
        "%c[ERROR] Rejection failed",
        "color: #ef4444; font-weight: bold",
        err,
      );
      setError(err.message || "Failed to reject event");
      setRejectDialogOpen(false);
    } finally {
      setProcessing(false);
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

  if (loading) {
    return (
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-center py-12">
          <Spinner size="xl" text="Loading event details..." />
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="p-6 md:p-8">
        <Alert variant="error">Event not found</Alert>
        <Link to="/faculty/approvals">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Approvals
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <Link to="/faculty/approvals">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Pending Approvals
          </Button>
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              {event.title}
            </h1>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={getCategoryVariant(event.category)}>
                {event.category}
              </Badge>
              <Badge variant={getTypeVariant(event.type)}>{event.type}</Badge>
              <Badge variant="warning">Awaiting Your Approval</Badge>
            </div>
          </div>
        </div>
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

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Event Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Banner */}
          <Card>
            <div className="w-full h-64 bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center rounded-t-lg">
              <Calendar className="w-16 h-16 text-white opacity-50" />
            </div>
          </Card>

          {/* Description */}
          <Card>
            <Card.Header>
              <Card.Title>About This Event</Card.Title>
            </Card.Header>
            <Card.Content>
              <p className="text-neutral-700 whitespace-pre-line">
                {event.longDescription}
              </p>
            </Card.Content>
          </Card>

          {/* Details */}
          <Card>
            <Card.Header>
              <Card.Title>Event Details</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-neutral-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-neutral-900">Date & Time</p>
                    <p className="text-sm text-neutral-600">
                      {formatDateRange(event.startDate, event.endDate)}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {formatDate(event.startDate, "time")} -{" "}
                      {formatDate(event.endDate, "time")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-neutral-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-neutral-900">Location</p>
                    <p className="text-sm text-neutral-600">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-neutral-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-neutral-900">Capacity</p>
                    <p className="text-sm text-neutral-600">
                      Maximum {event.maxParticipants} participants
                    </p>
                  </div>
                </div>

                {event.requirements && event.requirements.length > 0 && (
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-neutral-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-neutral-900 mb-2">
                        Requirements
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        {event.requirements.map((req, index) => (
                          <li key={index} className="text-sm text-neutral-600">
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {event.tags && event.tags.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Tag className="w-5 h-5 text-neutral-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-neutral-900 mb-2">Tags</p>
                      <div className="flex flex-wrap gap-2">
                        {event.tags.map((tag, index) => (
                          <Badge key={index} variant="neutral">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card.Content>
          </Card>

          {/* Approval Timeline */}
          <Card>
            <Card.Header>
              <Card.Title>Approval Workflow</Card.Title>
              <Card.Description>
                Current approval status and history
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <ApprovalTimeline
                approvals={event.approvals}
                currentStatus={event.status}
              />
            </Card.Content>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Organizer Info */}
          <Card>
            <Card.Header>
              <Card.Title>Organizer Information</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-neutral-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-neutral-900">
                      {event.organizer.name}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {event.organizer.department}
                    </p>
                  </div>
                </div>
                <div className="pt-3 border-t border-neutral-200">
                  <p className="text-sm text-neutral-600">
                    <span className="font-medium">Email:</span>{" "}
                    {event.organizer.email}
                  </p>
                  {event.organizer.phone && (
                    <p className="text-sm text-neutral-600 mt-1">
                      <span className="font-medium">Phone:</span>{" "}
                      {event.organizer.phone}
                    </p>
                  )}
                </div>
                <div className="pt-3 border-t border-neutral-200">
                  <p className="text-xs text-neutral-500">
                    Submitted on {formatDate(event.submittedAt)}
                  </p>
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* Approval Actions */}
          <Card>
            <Card.Header>
              <Card.Title>Approval Decision</Card.Title>
              <Card.Description>Review and take action</Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                <Button
                  variant="success"
                  className="w-full justify-start"
                  onClick={() => setApproveDialogOpen(true)}
                  disabled={processing}
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve Event
                </Button>
                <Button
                  variant="error"
                  className="w-full justify-start"
                  onClick={() => setRejectDialogOpen(true)}
                  disabled={processing}
                >
                  <XCircle className="w-4 h-4" />
                  Reject Event
                </Button>
              </div>

              <Alert variant="info" className="mt-4">
                <AlertCircle className="w-5 h-5" />
                <div>
                  <p className="text-sm font-semibold">Approval Process</p>
                  <p className="text-xs mt-1">
                    If approved, this event will proceed to admin review. If
                    rejected, the organizer will be notified with your comments.
                  </p>
                </div>
              </Alert>
            </Card.Content>
          </Card>
        </div>
      </div>

      {/* Approve Dialog */}
      <Dialog
        open={approveDialogOpen}
        onClose={() => setApproveDialogOpen(false)}
      >
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Approve Event</Dialog.Title>
            <Dialog.Description>
              Approve this event to move it to admin review stage
            </Dialog.Description>
          </Dialog.Header>

          <div className="my-6 space-y-4">
            <div className="p-4 bg-success-50 rounded-lg border border-success-200">
              <p className="font-semibold text-neutral-900 mb-1">
                {event.title}
              </p>
              <p className="text-sm text-neutral-600">
                {formatDateRange(event.startDate, event.endDate)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Comments (Optional)
              </label>
              <Input
                as="textarea"
                rows={4}
                placeholder="Add any comments or suggestions for the organizer or admin..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>
          </div>

          <Dialog.Footer>
            <Button
              variant="outline"
              onClick={() => setApproveDialogOpen(false)}
              disabled={processing}
            >
              Cancel
            </Button>
            <Button
              variant="success"
              onClick={handleApprove}
              loading={processing}
            >
              <CheckCircle className="w-4 h-4" />
              Confirm Approval
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog
        open={rejectDialogOpen}
        onClose={() => setRejectDialogOpen(false)}
      >
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Reject Event</Dialog.Title>
            <Dialog.Description>
              Provide a reason for rejecting this event request
            </Dialog.Description>
          </Dialog.Header>

          <div className="my-6 space-y-4">
            <div className="p-4 bg-error-50 rounded-lg border border-error-200">
              <p className="font-semibold text-neutral-900 mb-1">
                {event.title}
              </p>
              <p className="text-sm text-neutral-600">
                {formatDateRange(event.startDate, event.endDate)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Reason for Rejection <span className="text-error-500">*</span>
              </label>
              <Input
                as="textarea"
                rows={4}
                placeholder="Please provide a detailed reason for rejection. This will help the organizer understand what needs to be improved."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                required
              />
              <p className="text-xs text-neutral-500 mt-1">
                The organizer will receive this feedback
              </p>
            </div>
          </div>

          <Dialog.Footer>
            <Button
              variant="outline"
              onClick={() => setRejectDialogOpen(false)}
              disabled={processing}
            >
              Cancel
            </Button>
            <Button variant="error" onClick={handleReject} loading={processing}>
              <XCircle className="w-4 h-4" />
              Confirm Rejection
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </div>
  );
};

export default EventApprovalPage;
