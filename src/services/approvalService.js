import api from "./api";

/**
 * Approval Service
 * Handle event approval operations (faculty and admin)
 */

const approvalService = {
  /**
   * Get pending approvals for current user (faculty or admin)
   * @returns {Promise} List of events pending approval
   */
  getPendingApprovals: async () => {
    try {
      const response = await api.get("/approvals/pending");

      return response.data;
    } catch (error) {
      console.error(
        "%c[API] Failed to fetch pending approvals",
        "color: #ef4444; font-weight: bold",
        error,
      );
      throw error;
    }
  },

  /**
   * Get approval history (approved/rejected by current user)
   * @param {Object} filters - Filter options (status, dateRange)
   * @returns {Promise} List of approval records
   */
  getApprovalHistory: async (filters = {}) => {
    try {
      const response = await api.get("/approvals/history", { params: filters });

      return response.data;
    } catch (error) {
      console.error(
        "%c[API] Failed to fetch approval history",
        "color: #ef4444; font-weight: bold",
        error,
      );
      throw error;
    }
  },

  /**
   * Get event details for approval review
   * @param {string} eventId - Event ID
   * @returns {Promise} Event with approval details
   */
  getEventForApproval: async (eventId) => {
    try {
      // Events for approval are fetched via the events endpoint
      const response = await api.get(`/events/${eventId}`);

      return response.data;
    } catch (error) {
      console.error(
        "%c[API] Failed to fetch event for approval",
        "color: #ef4444; font-weight: bold",
        error,
      );
      throw error;
    }
  },

  /**
   * Process approval decision (approve or reject)
   * @param {string} eventId - Event ID
   * @param {string} decision - "APPROVED" or "REJECTED"
   * @param {string} comment - Optional comment for approval, required for rejection
   * @returns {Promise} Updated approval record
   */
  processDecision: async (eventId, decision, comment = "") => {
    try {
      const response = await api.post(`/approvals/${eventId}`, {
        decision,
        comment,
      });

      return response.data;
    } catch (error) {
      console.error(
        "%c[API] Failed to process approval decision",
        "color: #ef4444; font-weight: bold",
        error,
      );
      throw error;
    }
  },

  /**
   * Approve an event
   * @param {string} eventId - Event ID
   * @param {Object} data - Approval data (comments)
   * @returns {Promise} Updated approval record
   */
  approveEvent: async (eventId, data = {}) => {
    try {
      const response = await api.post(`/approvals/${eventId}`, {
        decision: "APPROVED",
        comment: data.comment || data.comments || "",
      });

      return response.data;
    } catch (error) {
      console.error(
        "%c[API] Failed to approve event",
        "color: #ef4444; font-weight: bold",
        error,
      );
      throw error;
    }
  },

  /**
   * Reject an event
   * @param {string} eventId - Event ID
   * @param {Object} data - Rejection data (comments - required)
   * @returns {Promise} Updated approval record
   */
  rejectEvent: async (eventId, data) => {
    try {
      const response = await api.post(`/approvals/${eventId}`, {
        decision: "REJECTED",
        comment: data.comment || data.comments || "",
      });

      return response.data;
    } catch (error) {
      console.error(
        "%c[API] Failed to reject event",
        "color: #ef4444; font-weight: bold",
        error,
      );
      throw error;
    }
  },

  /**
   * Get approval statistics for current user
   * @returns {Promise} Approval stats
   */
  getApprovalStats: async () => {
    try {
      const response = await api.get("/approvals/statistics");

      return response.data;
    } catch (error) {
      console.error(
        "%c[API] Failed to fetch approval stats",
        "color: #ef4444; font-weight: bold",
        error,
      );
      throw error;
    }
  },

  /**
   * Get approval history for a specific event
   * @param {string} eventId - Event ID
   * @returns {Promise} Approval history
   */
  getEventHistory: async (eventId) => {
    try {
      const response = await api.get(`/approvals/history/${eventId}`);

      return response.data;
    } catch (error) {
      console.error(
        "%c[API] Failed to fetch event approval history",
        "color: #ef4444; font-weight: bold",
        error,
      );
      throw error;
    }
  },
};

export default approvalService;
