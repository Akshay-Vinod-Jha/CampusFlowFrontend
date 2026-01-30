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
      
      const response = await api.get(`/approvals/events/${eventId}`);
      
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
   * Approve an event
   * @param {string} eventId - Event ID
   * @param {Object} data - Approval data (comments)
   * @returns {Promise} Updated approval record
   */
  approveEvent: async (eventId, data = {}) => {
    try {
      
      const response = await api.post(`/approvals/${eventId}/approve`, data);
      
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
      
      const response = await api.post(`/approvals/${eventId}/reject`, data);
      
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
      
      const response = await api.get("/approvals/stats");
      
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
};

export default approvalService;
