/**
 * QR Code Utility Functions
 * Handles QR code generation data, encoding, and validation
 */

import QRCode from "qrcode";

/**
 * Generate QR code data string for event registration
 * @param {Object} registration - Registration object
 * @returns {string} - Encoded QR data string
 */
export const generateQRData = (registration) => {
  try {
    const qrData = {
      registrationId: registration._id,
      eventId: registration.eventId,
      userId: registration.userId,
      timestamp: new Date().toISOString(),
      version: "1.0",
    };

    // Convert to JSON string
    const dataString = JSON.stringify(qrData);

    return dataString;
  } catch (error) {
    console.error("[QR Utils] Error generating QR data:", error);
    throw new Error("Failed to generate QR code data");
  }
};

/**
 * Parse QR code data string
 * @param {string} qrDataString - QR code data string
 * @returns {Object} - Parsed QR data object
 */
export const parseQRData = (qrDataString) => {
  try {
    const qrData = JSON.parse(qrDataString);

    // Validate required fields
    if (!qrData.registrationId || !qrData.eventId || !qrData.userId) {
      throw new Error("Invalid QR code data: missing required fields");
    }

    return qrData;
  } catch (error) {
    console.error("[QR Utils] Error parsing QR data:", error);
    throw new Error("Invalid QR code format");
  }
};

/**
 * Generate QR code as Data URL (base64 image)
 * @param {string} data - Data to encode in QR code
 * @param {Object} options - QR code generation options
 * @returns {Promise<string>} - Data URL of QR code image
 */
export const generateQRCodeDataURL = async (data, options = {}) => {
  try {
    const defaultOptions = {
      errorCorrectionLevel: "M",
      type: "image/png",
      width: 256,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
      ...options,
    };

    const dataURL = await QRCode.toDataURL(data, defaultOptions);

    return dataURL;
  } catch (error) {
    console.error("[QR Utils] Error generating QR code data URL:", error);
    throw new Error("Failed to generate QR code image");
  }
};

/**
 * Validate QR code data structure
 * @param {Object} qrData - Parsed QR data object
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateQRData = (qrData) => {
  try {
    // Check required fields
    if (!qrData.registrationId || !qrData.eventId || !qrData.userId) {
      console.warn("[QR Utils] Validation failed: missing required fields");
      return false;
    }

    // Check version
    if (!qrData.version || qrData.version !== "1.0") {
      console.warn("[QR Utils] Validation failed: invalid version");
      return false;
    }

    // Check timestamp
    if (!qrData.timestamp || isNaN(Date.parse(qrData.timestamp))) {
      console.warn("[QR Utils] Validation failed: invalid timestamp");
      return false;
    }

    return true;
  } catch (error) {
    console.error("[QR Utils] Validation error:", error);
    return false;
  }
};

/**
 * Download QR code as image file
 * @param {string} dataURL - QR code data URL
 * @param {string} filename - Filename for download
 */
export const downloadQRCode = (dataURL, filename = "qr-code.png") => {
  try {
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (error) {
    console.error("[QR Utils] Error downloading QR code:", error);
    throw new Error("Failed to download QR code");
  }
};
