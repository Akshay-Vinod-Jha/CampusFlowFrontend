/**
 * Email Service
 * Handles email notifications and communication
 */

import api from "./api";

/**
 * Send registration confirmation email
 * @param {string} registrationId - Registration ID
 * @returns {Promise<Object>} - Email send status
 */
export const sendRegistrationEmail = async (registrationId) => {
  try {
    const response = await api.post(`/emails/registration-confirmation`, {
      registrationId,
    });

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
    const response = await api.post(`/emails/approval-notification`, {
      eventId,
      status,
    });

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
    const response = await api.post(`/emails/event-reminder`, {
      eventId,
      hoursBefore,
    });

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
    const response = await api.post(`/emails/cancellation-notification`, {
      registrationId,
      reason,
    });

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
    const response = await api.get(`/emails/history/${eventId}`);

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
    const response = await api.post(`/emails/preview`, {
      templateType,
      data,
    });

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
    const response = await api.post(`/emails/custom`, {
      eventId,
      subject,
      message,
      recipients,
    });

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
    const response = await api.get(`/emails/stats/${eventId}`);

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
