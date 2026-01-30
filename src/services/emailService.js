/**
 * Email Service
 * Handles email notifications and communication
 */

import apiClient from "./apiClient";

/**
 * Send registration confirmation email
 * @param {string} registrationId - Registration ID
 * @returns {Promise<Object>} - Email send status
 */
export const sendRegistrationEmail = async (registrationId) => {
  try {
    console.log(
      "[Email Service] Sending registration confirmation:",
      registrationId,
    );

    const response = await apiClient.post(`/emails/registration-confirmation`, {
      registrationId,
    });

    console.log("[Email Service] Registration email sent:", response.data);
    return response.data;
  } catch (error) {
    console.error("[Email Service] Registration email error:", error);
    throw error;
  }
};

/**
 * Send event approval notification email
 * @param {string} eventId - Event ID
 * @param {string} status - Approval status (APPROVED/REJECTED)
 * @returns {Promise<Object>} - Email send status
 */
export const sendApprovalEmail = async (eventId, status) => {
  try {
    console.log("[Email Service] Sending approval notification:", {
      eventId,
      status,
    });

    const response = await apiClient.post(`/emails/approval-notification`, {
      eventId,
      status,
    });

    console.log("[Email Service] Approval email sent:", response.data);
    return response.data;
  } catch (error) {
    console.error("[Email Service] Approval email error:", error);
    throw error;
  }
};

/**
 * Send event reminder email
 * @param {string} eventId - Event ID
 * @param {number} hoursBefore - Hours before event to send reminder
 * @returns {Promise<Object>} - Email send status
 */
export const sendEventReminder = async (eventId, hoursBefore = 24) => {
  try {
    console.log("[Email Service] Sending event reminder:", {
      eventId,
      hoursBefore,
    });

    const response = await apiClient.post(`/emails/event-reminder`, {
      eventId,
      hoursBefore,
    });

    console.log("[Email Service] Event reminder sent:", response.data);
    return response.data;
  } catch (error) {
    console.error("[Email Service] Event reminder error:", error);
    throw error;
  }
};

/**
 * Send cancellation notification email
 * @param {string} registrationId - Registration ID
 * @param {string} reason - Cancellation reason (optional)
 * @returns {Promise<Object>} - Email send status
 */
export const sendCancellationEmail = async (registrationId, reason = "") => {
  try {
    console.log(
      "[Email Service] Sending cancellation notification:",
      registrationId,
    );

    const response = await apiClient.post(`/emails/cancellation-notification`, {
      registrationId,
      reason,
    });

    console.log("[Email Service] Cancellation email sent:", response.data);
    return response.data;
  } catch (error) {
    console.error("[Email Service] Cancellation email error:", error);
    throw error;
  }
};

/**
 * Get email history for an event
 * @param {string} eventId - Event ID
 * @returns {Promise<Array>} - List of sent emails
 */
export const getEmailHistory = async (eventId) => {
  try {
    console.log("[Email Service] Fetching email history:", eventId);

    const response = await apiClient.get(`/emails/history/${eventId}`);

    console.log("[Email Service] Email history fetched:", {
      count: response.data.data?.length || 0,
    });

    return response.data;
  } catch (error) {
    console.error("[Email Service] Email history error:", error);
    throw error;
  }
};

/**
 * Preview email template
 * @param {string} templateType - Template type (registration/approval/reminder/cancellation)
 * @param {Object} data - Template data
 * @returns {Promise<Object>} - Email preview HTML
 */
export const previewEmailTemplate = async (templateType, data) => {
  try {
    console.log("[Email Service] Previewing email template:", templateType);

    const response = await apiClient.post(`/emails/preview`, {
      templateType,
      data,
    });

    console.log("[Email Service] Email preview generated");
    return response.data;
  } catch (error) {
    console.error("[Email Service] Email preview error:", error);
    throw error;
  }
};

/**
 * Send custom email to event participants
 * @param {string} eventId - Event ID
 * @param {string} subject - Email subject
 * @param {string} message - Email message
 * @param {Array} recipients - List of recipient emails (optional, defaults to all participants)
 * @returns {Promise<Object>} - Email send status
 */
export const sendCustomEmail = async (
  eventId,
  subject,
  message,
  recipients = [],
) => {
  try {
    console.log("[Email Service] Sending custom email:", { eventId, subject });

    const response = await apiClient.post(`/emails/custom`, {
      eventId,
      subject,
      message,
      recipients,
    });

    console.log("[Email Service] Custom email sent:", response.data);
    return response.data;
  } catch (error) {
    console.error("[Email Service] Custom email error:", error);
    throw error;
  }
};

/**
 * Get email statistics for an event
 * @param {string} eventId - Event ID
 * @returns {Promise<Object>} - Email statistics
 */
export const getEmailStats = async (eventId) => {
  try {
    console.log("[Email Service] Fetching email stats:", eventId);

    const response = await apiClient.get(`/emails/stats/${eventId}`);

    console.log("[Email Service] Email stats fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("[Email Service] Email stats error:", error);
    throw error;
  }
};

export default {
  sendRegistrationEmail,
  sendApprovalEmail,
  sendEventReminder,
  sendCancellationEmail,
  getEmailHistory,
  previewEmailTemplate,
  sendCustomEmail,
  getEmailStats,
};
