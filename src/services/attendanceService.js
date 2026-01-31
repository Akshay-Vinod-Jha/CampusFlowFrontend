/**
 * Attendance Service
 * Handles attendance tracking and QR code validation
 */

import api from "./api";

/**
 * Mark attendance using QR code data
 * @param {string} eventId - Event ID
 * @param {Object} qrData - QR code data
 * @returns {Promise<Object>} - Attendance record
 */
export const markAttendance = async (eventId, qrData) => {
  try {
    const response = await api.post(`/events/${eventId}/attendance`, {
      registrationId: qrData.registrationId,
      userId: qrData.userId,
      qrData,
    });

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
    const response = await api.get(`/events/${eventId}/attendance`);

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
    const response = await api.get(`/events/${eventId}/attendance/stats`);

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
    const response = await api.post(
      `/events/${eventId}/attendance/validate`,
      {
        registrationId: qrData.registrationId,
        userId: qrData.userId,
        qrData,
      },
    );

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
    const response = await api.get(
      `/events/${eventId}/attendance/export`,
      {
        responseType: "blob",
      },
    );

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
