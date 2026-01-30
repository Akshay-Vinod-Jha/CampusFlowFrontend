/**
 * Send Email Dialog Component
 * Allows organizers to send custom emails to event participants
 */

import { useState } from "react";
import { Dialog, Button, Alert } from "../ui";
import { Mail, Send, AlertCircle, CheckCircle } from "lucide-react";
import emailService from "../../services/emailService";

const SendEmailDialog = ({ open, onClose, eventId, eventTitle }) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject.trim() || !message.trim()) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setSending(true);
      setError("");

      await emailService.sendCustomEmail(eventId, subject, message);

      setSuccess(true);

      // Reset form after 2 seconds and close
      setTimeout(() => {
        setSubject("");
        setMessage("");
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error(
        "%c[SendEmailDialog] Send error",
        "color: #ef4444; font-weight: bold",
        err,
      );
      setError(err.message || "Failed to send email");
    } finally {
      setSending(false);
    }
  };

  const handleClose = () => {
    if (!sending) {
      setSubject("");
      setMessage("");
      setError("");
      setSuccess(false);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Dialog.Content className="max-w-2xl">
        <Dialog.Header>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <Dialog.Title>Send Email to Participants</Dialog.Title>
              <Dialog.Description>
                Send a custom email to all registered participants of{" "}
                {eventTitle}
              </Dialog.Description>
            </div>
          </div>
        </Dialog.Header>

        <form onSubmit={handleSubmit}>
          <div className="my-6 space-y-4">
            {/* Success Message */}
            {success && (
              <Alert variant="success">
                <CheckCircle className="w-5 h-5" />
                Email sent successfully to all participants!
              </Alert>
            )}

            {/* Error Message */}
            {error && (
              <Alert variant="error">
                <AlertCircle className="w-5 h-5" />
                {error}
              </Alert>
            )}

            {/* Subject Input */}
            <div>
              <label
                htmlFor="email-subject"
                className="block text-sm font-medium text-neutral-900 mb-2"
              >
                Subject *
              </label>
              <input
                id="email-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter email subject"
                className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                disabled={sending}
                maxLength={200}
              />
              <p className="text-xs text-neutral-500 mt-1">
                {subject.length}/200 characters
              </p>
            </div>

            {/* Message Textarea */}
            <div>
              <label
                htmlFor="email-message"
                className="block text-sm font-medium text-neutral-900 mb-2"
              >
                Message *
              </label>
              <textarea
                id="email-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message to participants"
                rows={8}
                className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                disabled={sending}
                maxLength={2000}
              />
              <p className="text-xs text-neutral-500 mt-1">
                {message.length}/2000 characters
              </p>
            </div>

            {/* Info Notice */}
            <div className="p-4 bg-info-50 border border-info-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-info-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-info-900">
                  <p className="font-medium mb-1">Email will be sent to:</p>
                  <ul className="list-disc ml-4 space-y-1 text-info-800">
                    <li>All registered participants</li>
                    <li>Emails will be sent individually</li>
                    <li>This action cannot be undone</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Dialog.Footer>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={sending}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={sending}>
              <Send className="w-4 h-4 mr-2" />
              {sending ? "Sending..." : "Send Email"}
            </Button>
          </Dialog.Footer>
        </form>
      </Dialog.Content>
    </Dialog>
  );
};

export default SendEmailDialog;
