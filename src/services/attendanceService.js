/**
 * Attendance Service
 * Handles attendance tracking and QR code validation
 */

import apiClient from "./apiClient";

/**
 * Mark attendance using QR code data
 * @param {string} eventId - Event ID
 * @param {Object} qrData - QR code data
 * @returns {Promise<Object>} - Attendance record
 */
export const markAttendance = async (eventId, qrData) => {
  try {
    console.log("[Attendance Service] Marking attendance:", {
      eventId,
      registrationId: qrData.registrationId,
    });

    const response = await apiClient.post(`/events/${eventId}/attendance`, {
      registrationId: qrData.registrationId,
      userId: qrData.userId,
      qrData,
    });

    console.log(
      "[Attendance Service] Attendance marked successfully:",
      response.data,
    );
    return response.data;
  } catch (error) {
    console.error("[Attendance Service] Mark attendance error:", error);
    throw error;
  }
};

/**
 * Get attendance list for an event
 * @param {string} eventId - Event ID
 * @returns {Promise<Array>} - List of attendance records
 */
export const getAttendance = async (eventId) => {
  try {
    console.log("[Attendance Service] Fetching attendance list:", eventId);

    const response = await apiClient.get(`/events/${eventId}/attendance`);

    console.log("[Attendance Service] Attendance list fetched:", {
      count: response.data.data?.length || 0,
    });

    return response.data;
  } catch (error) {
    console.error("[Attendance Service] Get attendance error:", error);
    throw error;
  }
};

/**
 * Get attendance statistics for an event
 * @param {string} eventId - Event ID
 * @returns {Promise<Object>} - Attendance statistics
 */
export const getAttendanceStats = async (eventId) => {
  try {
    console.log("[Attendance Service] Fetching attendance stats:", eventId);

    const response = await apiClient.get(`/events/${eventId}/attendance/stats`);

    console.log(
      "[Attendance Service] Attendance stats fetched:",
      response.data,
    );
    return response.data;
  } catch (error) {
    console.error("[Attendance Service] Get attendance stats error:", error);
    throw error;
  }
};

/**
 * Validate QR code before marking attendance
 * @param {string} eventId - Event ID
 * @param {Object} qrData - QR code data
 * @returns {Promise<Object>} - Validation result
 */
export const validateQRCode = async (eventId, qrData) => {
  try {
    console.log("[Attendance Service] Validating QR code:", {
      eventId,
      registrationId: qrData.registrationId,
    });

    const response = await apiClient.post(
      `/events/${eventId}/attendance/validate`,
      {
        registrationId: qrData.registrationId,
        userId: qrData.userId,
        qrData,
      },
    );

    console.log("[Attendance Service] QR code validated:", response.data);
    return response.data;
  } catch (error) {
    console.error("[Attendance Service] QR validation error:", error);
    throw error;
  }
};

/**
 * Export attendance list as CSV
 * @param {string} eventId - Event ID
 * @returns {Promise<Blob>} - CSV file blob
 */
export const exportAttendance = async (eventId) => {
  try {
    console.log("[Attendance Service] Exporting attendance:", eventId);

    const response = await apiClient.get(
      `/events/${eventId}/attendance/export`,
      {
        responseType: "blob",
      },
    );

    console.log("[Attendance Service] Attendance exported successfully");
    return response.data;
  } catch (error) {
    console.error("[Attendance Service] Export attendance error:", error);
    throw error;
  }
};

export default {
  markAttendance,
  getAttendance,
  getAttendanceStats,
  validateQRCode,
  exportAttendance,
};
