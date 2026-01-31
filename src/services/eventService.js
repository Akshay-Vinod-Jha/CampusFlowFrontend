import api from "./api";

/**
 * Event Service
 * API calls for event management
 */

const eventService = {
  /**
   * Get all approved events (for students)
   * @param {Object} params - Query parameters (page, limit, search, category, etc.)
   * @returns {Promise} Events list with pagination
   */
  getAllEvents: async (params = {}) => {
    try {
      const response = await api.get("/events", { params });

      return response.data;
    } catch (error) {
      console.error(
        "%c[ERROR] Failed to fetch events:",
        "color: #ef4444; font-weight: bold",
        error,
      );
      throw error;
    }
  },

  /**
   * Get single event by ID
   * @param {string} eventId - Event ID
   * @returns {Promise} Event details
   */
  getEventById: async (eventId) => {
    try {
      const response = await api.get(`/events/${eventId}`);

      return response.data;
    } catch (error) {
      console.error(
        "%c[ERROR] Failed to fetch event:",
        "color: #ef4444; font-weight: bold",
        error,
      );
      throw error;
    }
  },

  /**
   * Get my registered events (for students)
   * @returns {Promise} List of events user is registered for
   */
  getMyEvents: async () => {
    try {
      const response = await api.get("/registrations/my-events");

      return response.data;
    } catch (error) {
      console.error(
        "%c[ERROR] Failed to fetch my events:",
        "color: #ef4444; font-weight: bold",
        error,
      );
      throw error;
    }
  },

  /**
   * Register for an event
   * @param {string} eventId - Event ID
   * @returns {Promise} Registration confirmation
   */
  registerForEvent: async (eventId) => {
    try {
      const response = await api.post(`/registrations/${eventId}`);

      return response.data;
    } catch (error) {
      console.error(
        "%c[ERROR] Registration failed:",
        "color: #ef4444; font-weight: bold",
        error,
      );
      throw error;
    }
  },

  /**
   * Cancel event registration
   * @param {string} eventId - Event ID
   * @returns {Promise} Cancellation confirmation
   */
  cancelRegistration: async (eventId) => {
    try {
      const response = await api.delete(`/registrations/${eventId}`);

      return response.data;
    } catch (error) {
      console.error(
        "%c[ERROR] Cancellation failed:",
        "color: #ef4444; font-weight: bold",
        error,
      );
      throw error;
    }
  },

  /**
   * Create new event (for organizers)
   * @param {Object} eventData - Event details
   * @param {File} posterFile - Optional poster/banner file
   * @returns {Promise} Created event
   */
  createEvent: async (eventData, posterFile = null) => {
    try {
      let requestData;
      let headers = {};

      if (posterFile) {
        // If there's a file, use FormData
        const formData = new FormData();
        formData.append("poster", posterFile);

        // Append all event data fields
        Object.keys(eventData).forEach((key) => {
          if (Array.isArray(eventData[key])) {
            formData.append(key, JSON.stringify(eventData[key]));
          } else {
            formData.append(key, eventData[key]);
          }
        });

        requestData = formData;
        headers = { "Content-Type": "multipart/form-data" };
      } else {
        // No file, send as JSON
        requestData = eventData;
      }

      const response = await api.post("/events", requestData, { headers });

      return response.data;
    } catch (error) {
      console.error(
        "%c[ERROR] Event creation failed:",
        "color: #ef4444; font-weight: bold",
        error,
      );
      throw error;
    }
  },

  /**
   * Update event (for organizers)
   * @param {string} eventId - Event ID
   * @param {Object} eventData - Updated event details
   * @returns {Promise} Updated event
   */
  updateEvent: async (eventId, eventData) => {
    try {
      const response = await api.put(`/events/${eventId}`, eventData);

      return response.data;
    } catch (error) {
      console.error(
        "%c[ERROR] Event update failed:",
        "color: #ef4444; font-weight: bold",
        error,
      );
      throw error;
    }
  },

  /**
   * Delete event (for organizers)
   * @param {string} eventId - Event ID
   * @returns {Promise} Deletion confirmation
   */
  deleteEvent: async (eventId) => {
    try {
      const response = await api.delete(`/events/${eventId}`);

      return response.data;
    } catch (error) {
      console.error(
        "%c[ERROR] Event deletion failed:",
        "color: #ef4444; font-weight: bold",
        error,
      );
      throw error;
    }
  },

  /**
   * Get events created by current user (for organizers)
   * @returns {Promise} List of created events
   */
  getMyCreatedEvents: async () => {
    try {
      const response = await api.get("/events/my-events");

      return response.data;
    } catch (error) {
      console.error(
        "%c[ERROR] Failed to fetch my created events:",
        "color: #ef4444; font-weight: bold",
        error,
      );
      throw error;
    }
  },

  /**
   * Upload event banner image
   * @param {File} file - Image file
   * @returns {Promise} Image URL
   */
  uploadBanner: async (file) => {
    try {
      const formData = new FormData();
      formData.append("banner", file);
      const response = await api.post("/events/upload-banner", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    } catch (error) {
      console.error(
        "%c[ERROR] Banner upload failed:",
        "color: #ef4444; font-weight: bold",
        error,
      );
      throw error;
    }
  },

  /**
   * Submit event for approval
   * @param {string} eventId - Event ID
   * @returns {Promise} Submission confirmation
   */
  submitForApproval: async (eventId) => {
    try {
      const response = await api.post(`/events/${eventId}/submit`);

      return response.data;
    } catch (error) {
      console.error(
        "%c[ERROR] Failed to submit event for approval:",
        "color: #ef4444; font-weight: bold",
        error,
      );
      throw error;
    }
  },
};

export default eventService;
