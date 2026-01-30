/**
 * Email Preview Component
 * Displays email template preview with styling
 */

import { useState, useEffect } from "react";
import { Card, Button, Badge, Spinner } from "../ui";
import { Mail, Eye, X } from "lucide-react";
import emailService from "../../services/emailService";

const EmailPreview = ({ templateType, data, onClose }) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (templateType && data) {
      loadPreview();
    }
  }, [templateType, data]);

  const loadPreview = async () => {
    try {
      setLoading(true);
      setError("");
      console.log(
        "%c[EmailPreview] Loading template preview",
        "color: #9333ea; font-weight: bold",
        templateType,
      );

      const response = await emailService.previewEmailTemplate(
        templateType,
        data,
      );
      setPreview(response.data);

      console.log(
        "%c[EmailPreview] Preview loaded",
        "color: #22c55e; font-weight: bold",
      );
    } catch (err) {
      console.error(
        "%c[EmailPreview] Preview error",
        "color: #ef4444; font-weight: bold",
        err,
      );
      setError(err.message || "Failed to load email preview");
    } finally {
      setLoading(false);
    }
  };

  const getTemplateName = () => {
    const names = {
      registration: "Registration Confirmation",
      approval: "Approval Notification",
      reminder: "Event Reminder",
      cancellation: "Cancellation Notice",
      custom: "Custom Email",
    };
    return names[templateType] || "Email Preview";
  };

  if (loading) {
    return (
      <Card>
        <Card.Content className="p-8 flex items-center justify-center">
          <Spinner text="Loading email preview..." />
        </Card.Content>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Card.Content className="p-6">
          <div className="text-center text-error-600">
            <p className="font-medium mb-2">Failed to load preview</p>
            <p className="text-sm">{error}</p>
          </div>
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
              <Card.Title>{getTemplateName()}</Card.Title>
              <p className="text-sm text-neutral-600 mt-1">
                Email Template Preview
              </p>
            </div>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </Card.Header>

      <Card.Content className="p-6 space-y-4">
        {/* Email Metadata */}
        {preview && (
          <div className="space-y-3 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600">Subject:</span>
              <span className="font-medium text-neutral-900">
                {preview.subject}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600">To:</span>
              <span className="font-medium text-neutral-900">
                {preview.to || data.email}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600">Template:</span>
              <Badge variant="primary">{templateType}</Badge>
            </div>
          </div>
        )}

        {/* Email Content Preview */}
        <div className="border-2 border-neutral-200 rounded-lg overflow-hidden">
          <div className="bg-neutral-100 px-4 py-2 border-b border-neutral-200">
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </div>
          </div>
          <div className="bg-white p-6">
            {preview?.html ? (
              <div
                className="email-preview-content"
                dangerouslySetInnerHTML={{ __html: preview.html }}
              />
            ) : (
              <div className="text-neutral-600 whitespace-pre-wrap">
                {preview?.text || "No preview available"}
              </div>
            )}
          </div>
        </div>

        {/* Email Variables */}
        {preview?.variables && Object.keys(preview.variables).length > 0 && (
          <div className="p-4 bg-info-50 border border-info-200 rounded-lg">
            <p className="text-sm font-medium text-info-900 mb-2">
              Template Variables:
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {Object.entries(preview.variables).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="text-info-700 font-mono">
                    {"{{" + key + "}}"}
                  </span>
                  <span className="text-info-600">→</span>
                  <span className="text-info-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card.Content>
    </Card>
  );
};

export default EmailPreview;
