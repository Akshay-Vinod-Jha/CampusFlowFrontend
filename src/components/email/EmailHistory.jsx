/**
 * Email History Component
 * Displays email sending history with status and details
 */

import { useState, useEffect } from "react";
import { Card, Badge, EmptyState, Spinner, Button } from "../ui";
import { Mail, CheckCircle, XCircle, Clock, RefreshCw } from "lucide-react";
import emailService from "../../services/emailService";
import { formatDate } from "../../utils/dateUtils";

const EmailHistory = ({ eventId, refreshTrigger = 0 }) => {
  const [emails, setEmails] = useState([]);
  const [stats, setStats] = useState({ sent: 0, failed: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (eventId) {
      fetchEmailHistory();
      fetchEmailStats();
    }
  }, [eventId, refreshTrigger]);

  const fetchEmailHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await emailService.getEmailHistory(eventId);
      setEmails(response.data || []);

    } catch (err) {
      console.error(
        "%c[EmailHistory] Fetch error",
        "color: #ef4444; font-weight: bold",
        err,
      );
      setError(err.message || "Failed to load email history");
    } finally {
      setLoading(false);
    }
  };

  const fetchEmailStats = async () => {
    try {
      const response = await emailService.getEmailStats(eventId);
      setStats(response.data || { sent: 0, failed: 0, pending: 0 });
    } catch (err) {
      console.error("[EmailHistory] Stats error:", err);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      SENT: (
        <Badge variant="success">
          <CheckCircle className="w-3 h-3" /> Sent
        </Badge>
      ),
      FAILED: (
        <Badge variant="error">
          <XCircle className="w-3 h-3" /> Failed
        </Badge>
      ),
      PENDING: (
        <Badge variant="warning">
          <Clock className="w-3 h-3" /> Pending
        </Badge>
      ),
    };
    return variants[status] || <Badge variant="neutral">{status}</Badge>;
  };

  const getTypeLabel = (type) => {
    const labels = {
      registration: "Registration Confirmation",
      approval: "Approval Notification",
      reminder: "Event Reminder",
      cancellation: "Cancellation Notice",
      custom: "Custom Email",
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <Card>
        <Card.Content className="p-8 flex items-center justify-center">
          <Spinner text="Loading email history..." />
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <Card.Title>Email History</Card.Title>
              <p className="text-sm text-neutral-600 mt-1">
                Email notifications sent for this event
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              fetchEmailHistory();
              fetchEmailStats();
            }}
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </Card.Header>

      <Card.Content className="p-6">
        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-neutral-50 rounded-lg">
          <div className="text-center">
            <p className="text-2xl font-bold text-success-600">{stats.sent}</p>
            <p className="text-sm text-neutral-600">Sent</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-warning-600">
              {stats.pending}
            </p>
            <p className="text-sm text-neutral-600">Pending</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-error-600">{stats.failed}</p>
            <p className="text-sm text-neutral-600">Failed</p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-error-50 border border-error-200 rounded-lg text-error-800">
            {error}
          </div>
        )}

        {/* Email List */}
        {emails.length === 0 ? (
          <EmptyState
            icon={Mail}
            title="No emails sent"
            description="No email notifications have been sent for this event yet"
          />
        ) : (
          <div className="space-y-3">
            {emails.map((email) => (
              <div
                key={email._id}
                className="p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-neutral-900">
                        {getTypeLabel(email.type)}
                      </p>
                      {getStatusBadge(email.status)}
                    </div>
                    <p className="text-sm text-neutral-600">
                      To: {email.recipient}
                    </p>
                  </div>
                  <p className="text-xs text-neutral-500">
                    {formatDate(email.sentAt || email.createdAt, "short")}
                  </p>
                </div>

                {email.subject && (
                  <p className="text-sm text-neutral-700 mb-2">
                    <span className="font-medium">Subject:</span>{" "}
                    {email.subject}
                  </p>
                )}

                {email.error && (
                  <div className="mt-2 p-2 bg-error-50 border border-error-200 rounded text-xs text-error-800">
                    <span className="font-medium">Error:</span> {email.error}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Card.Content>
    </Card>
  );
};

export default EmailHistory;
