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
  Award,
  Shield,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import ApprovalTimeline from "@/components/events/ApprovalTimeline";
import approvalService from "@/services/approvalService";
import emailService from "@/services/emailService";
import { formatDate, formatDateRange } from "@/utils/dateUtils";

/**
 * Event Approval Page (Admin)
 * Final approval with authority to publish event
 */

const AdminEventApprovalPage = () => {
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
        "%c[PAGE] Fetching event for admin approval",
        "color: #9333ea; font-weight: bold",
        eventId,
      );

      // Mock data (will be replaced with API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockEvent = {
        _id: eventId,
        title: "Tech Fest 2024",
        description: "Annual technical festival with coding competitions",
        longDescription:
          "Major technical festival featuring hackathons, coding competitions, tech talks, and workshops. This three-day event will bring together students from various departments to showcase their technical skills. Expected to attract 500+ participants from various colleges.\n\nEvent Schedule:\nDay 1: Opening ceremony, tech talks by industry experts\nDay 2: Hackathon, coding competitions, workshops\nDay 3: Project showcase, awards ceremony\n\nPrizes worth ₹2,00,000 for winners across various categories.",
        category: "TECHNICAL",
        type: "OFFLINE",
        startDate: new Date("2024-03-15T09:00:00"),
        endDate: new Date("2024-03-17T18:00:00"),
        location: "Main Auditorium & Computer Labs",
        maxParticipants: 500,
        registeredCount: 324,
        requirements: [
          "Student ID Card (mandatory)",
          "Laptop for competitions",
          "Registration confirmation email",
          "Team registration (for group events)",
        ],
        tags: [
          "Hackathon",
          "Coding",
          "Technology",
          "Competition",
          "Innovation",
        ],
        status: "ADMIN_PENDING",
        organizer: {
          _id: "org1",
          name: "John Doe",
          email: "john@example.com",
          phone: "+1 234 567 8900",
          department: "Computer Science",
        },
        submittedAt: new Date("2024-02-08T15:00:00"),
        approvals: [
          {
            approvalLevel: "FACULTY",
            status: "APPROVED",
            approvedBy: { name: "Dr. John Smith", email: "smith@example.com" },
            approvedAt: new Date("2024-02-10T10:30:00"),
            comments:
              "Great initiative! Well-planned event with strong industry connections. Approved.",
          },
          {
            approvalLevel: "ADMIN",
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
        "%c[ACTION] Admin approving event (FINAL)",
        "color: #3b82f6; font-weight: bold",
        eventId,
        comments,
      );

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log(
        "%c[SUCCESS] Event approved and published!",
        "color: #22c55e; font-weight: bold",
      );

      // Send approval notification email
      try {
        await emailService.sendApprovalEmail(eventId, "APPROVED");
        console.log(
          "%c[EMAIL] Final approval notification sent",
          "color: #22c55e; font-weight: bold",
        );
      } catch (emailErr) {
        console.warn("[EMAIL] Failed to send approval email:", emailErr);
        // Don't fail approval if email fails
      }

      setApproveDialogOpen(false);
      navigate("/admin/approvals", {
        state: {
          message:
            "Event approved successfully! The event is now live and visible to all students.",
          variant: "success",
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
      setError("Please provide a detailed reason for rejection");
      return;
    }

    try {
      setProcessing(true);
      console.log(
        "%c[ACTION] Admin rejecting event (FINAL)",
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

      // Send rejection notification email
      try {
        await emailService.sendApprovalEmail(eventId, "REJECTED");
        console.log(
          "%c[EMAIL] Final rejection notification sent",
          "color: #22c55e; font-weight: bold",
        );
      } catch (emailErr) {
        console.warn("[EMAIL] Failed to send rejection email:", emailErr);
        // Don't fail rejection if email fails
      }

      setRejectDialogOpen(false);
      navigate("/admin/approvals", {
        state: {
          message:
            "Event rejected. The organizer and faculty have been notified.",
          variant: "info",
        },
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
        <Link to="/admin/approvals">
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
        <Link to="/admin/approvals">
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
              <Badge variant="warning">
                <Shield className="w-3 h-3" />
                Final Approval Required
              </Badge>
              <Badge variant="success">
                <CheckCircle className="w-3 h-3" />
                Faculty Approved
              </Badge>
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

          {/* Faculty Approval Details */}
          <Card>
            <Card.Header>
              <Card.Title>Faculty Approval</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                <div className="p-3 bg-success-50 rounded-lg border border-success-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-success-600" />
                    <p className="font-semibold text-success-900">Approved</p>
                  </div>
                  <p className="text-sm text-success-800">
                    {
                      event.approvals.find((a) => a.approvalLevel === "FACULTY")
                        ?.approvedBy?.name
                    }
                  </p>
                  <p className="text-xs text-success-700 mt-1">
                    {formatDate(
                      event.approvals.find((a) => a.approvalLevel === "FACULTY")
                        ?.approvedAt,
                    )}
                  </p>
                </div>
                {event.approvals.find((a) => a.approvalLevel === "FACULTY")
                  ?.comments && (
                  <div className="p-3 bg-neutral-50 rounded-lg">
                    <p className="text-sm font-medium text-neutral-700 mb-1">
                      Faculty Comments:
                    </p>
                    <p className="text-sm text-neutral-600 italic">
                      "
                      {
                        event.approvals.find(
                          (a) => a.approvalLevel === "FACULTY",
                        )?.comments
                      }
                      "
                    </p>
                  </div>
                )}
              </div>
            </Card.Content>
          </Card>

          {/* Final Approval Actions */}
          <Card>
            <Card.Header>
              <Card.Title>Final Approval Decision</Card.Title>
              <Card.Description>Make the final call</Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                <Button
                  variant="success"
                  className="w-full justify-start"
                  onClick={() => setApproveDialogOpen(true)}
                  disabled={processing}
                >
                  <Award className="w-4 h-4" />
                  Approve & Publish Event
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

              <Alert variant="warning" className="mt-4">
                <AlertCircle className="w-5 h-5" />
                <div>
                  <p className="text-sm font-semibold">Final Authority</p>
                  <p className="text-xs mt-1">
                    Your approval will publish this event immediately. If
                    rejected, the event will be sent back with feedback.
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
            <Dialog.Title>Approve & Publish Event</Dialog.Title>
            <Dialog.Description>
              This event will be published immediately and visible to all
              students
            </Dialog.Description>
          </Dialog.Header>

          <div className="my-6 space-y-4">
            <Alert variant="success">
              <Award className="w-5 h-5" />
              <div>
                <p className="font-semibold">Publishing Event</p>
                <p className="text-sm mt-1">
                  Students will be able to view and register for this event
                  immediately after approval.
                </p>
              </div>
            </Alert>

            <div className="p-4 bg-success-50 rounded-lg border border-success-200">
              <p className="font-semibold text-neutral-900 mb-1">
                {event.title}
              </p>
              <p className="text-sm text-neutral-600">
                {formatDateRange(event.startDate, event.endDate)}
              </p>
              <p className="text-sm text-neutral-600 mt-2">
                Capacity: {event.maxParticipants} participants
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Admin Comments (Optional)
              </label>
              <Input
                as="textarea"
                rows={4}
                placeholder="Add any final comments, suggestions, or congratulations for the organizer..."
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
              <Award className="w-4 h-4" />
              Confirm & Publish
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
              Provide detailed feedback for rejection
            </Dialog.Description>
          </Dialog.Header>

          <div className="my-6 space-y-4">
            <Alert variant="error">
              <XCircle className="w-5 h-5" />
              <div>
                <p className="font-semibold">Event Rejection</p>
                <p className="text-sm mt-1">
                  The organizer and faculty will be notified of this rejection
                  with your feedback.
                </p>
              </div>
            </Alert>

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
                rows={5}
                placeholder="Please provide a comprehensive reason for rejection. Include specific concerns and suggestions for improvement if the organizer wishes to resubmit."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                required
              />
              <p className="text-xs text-neutral-500 mt-1">
                Your feedback will be shared with the organizer and faculty
                advisor
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

export default AdminEventApprovalPage;
