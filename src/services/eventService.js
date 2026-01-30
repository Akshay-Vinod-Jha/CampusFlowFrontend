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
      console.log(
        "%c[API] Fetching all events",
        "color: #3b82f6; font-weight: bold",
        params,
      );
      const response = await api.get("/events", { params });
      console.log(
        "%c[API] Events fetched successfully",
        "color: #22c55e; font-weight: bold",
        response.data,
      );
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
      console.log(
        "%c[API] Fetching event details",
        "color: #3b82f6; font-weight: bold",
        eventId,
      );
      const response = await api.get(`/events/${eventId}`);
      console.log(
        "%c[API] Event details fetched",
        "color: #22c55e; font-weight: bold",
        response.data,
      );
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
      console.log(
        "%c[API] Fetching my registered events",
        "color: #3b82f6; font-weight: bold",
      );
      const response = await api.get("/registrations/my-events");
      console.log(
        "%c[API] My events fetched",
        "color: #22c55e; font-weight: bold",
        response.data,
      );
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
      console.log(
        "%c[API] Registering for event",
        "color: #3b82f6; font-weight: bold",
        eventId,
      );
      const response = await api.post(`/registrations/${eventId}`);
      console.log(
        "%c[API] Registration successful",
        "color: #22c55e; font-weight: bold",
        response.data,
      );
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
      console.log(
        "%c[API] Cancelling registration",
        "color: #3b82f6; font-weight: bold",
        eventId,
      );
      const response = await api.delete(`/registrations/${eventId}`);
      console.log(
        "%c[API] Registration cancelled",
        "color: #22c55e; font-weight: bold",
        response.data,
      );
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
   * @returns {Promise} Created event
   */
  createEvent: async (eventData) => {
    try {
      console.log(
        "%c[API] Creating event",
        "color: #3b82f6; font-weight: bold",
        eventData,
      );
      const response = await api.post("/events", eventData);
      console.log(
        "%c[API] Event created",
        "color: #22c55e; font-weight: bold",
        response.data,
      );
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
      console.log(
        "%c[API] Updating event",
        "color: #3b82f6; font-weight: bold",
        { eventId, eventData },
      );
      const response = await api.put(`/events/${eventId}`, eventData);
      console.log(
        "%c[API] Event updated",
        "color: #22c55e; font-weight: bold",
        response.data,
      );
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
      console.log(
        "%c[API] Deleting event",
        "color: #3b82f6; font-weight: bold",
        eventId,
      );
      const response = await api.delete(`/events/${eventId}`);
      console.log(
        "%c[API] Event deleted",
        "color: #22c55e; font-weight: bold",
        response.data,
      );
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
      console.log(
        "%c[API] Fetching my created events",
        "color: #3b82f6; font-weight: bold",
      );
      const response = await api.get("/events/my-events");
      console.log(
        "%c[API] My created events fetched",
        "color: #22c55e; font-weight: bold",
        response.data,
      );
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
      console.log(
        "%c[API] Uploading event banner",
        "color: #3b82f6; font-weight: bold",
      );
      const formData = new FormData();
      formData.append("banner", file);
      const response = await api.post("/events/upload-banner", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(
        "%c[API] Banner uploaded",
        "color: #22c55e; font-weight: bold",
        response.data,
      );
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
};

export default eventService;
