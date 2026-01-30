/**
 * Date Utility Functions
 * Helper functions for date formatting and manipulation
 */

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @param {string} format - Format type ('short', 'long', 'time', 'datetime')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = "short") => {
  if (!date) return "";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) return "";

  const options = {
    short: { month: "short", day: "numeric", year: "numeric" },
    long: { month: "long", day: "numeric", year: "numeric" },
    time: { hour: "2-digit", minute: "2-digit" },
    datetime: {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  };

  return dateObj.toLocaleDateString("en-US", options[format] || options.short);
};

/**
 * Get relative time (e.g., "2 hours ago", "in 3 days")
 * @param {Date|string} date - Date to compare
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  if (!date) return "";

  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = dateObj - now;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) {
    return diffSec < 0 ? "just now" : "in a few seconds";
  }

  if (diffMin < 60) {
    const abs = Math.abs(diffMin);
    return diffMin < 0
      ? `${abs} minute${abs !== 1 ? "s" : ""} ago`
      : `in ${abs} minute${abs !== 1 ? "s" : ""}`;
  }

  if (diffHour < 24) {
    const abs = Math.abs(diffHour);
    return diffHour < 0
      ? `${abs} hour${abs !== 1 ? "s" : ""} ago`
      : `in ${abs} hour${abs !== 1 ? "s" : ""}`;
  }

  const abs = Math.abs(diffDay);
  return diffDay < 0
    ? `${abs} day${abs !== 1 ? "s" : ""} ago`
    : `in ${abs} day${abs !== 1 ? "s" : ""}`;
};

/**
 * Check if date is in the past
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if date is in the past
 */
export const isPastDate = (date) => {
  if (!date) return false;
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj < new Date();
};

/**
 * Check if date is today
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if date is today
 */
export const isToday = (date) => {
  if (!date) return false;
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const today = new Date();
  return dateObj.toDateString() === today.toDateString();
};

/**
 * Format date range
 * @param {Date|string} startDate - Start date
 * @param {Date|string} endDate - End date
 * @returns {string} Formatted date range
 */
export const formatDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return "";

  const start = typeof startDate === "string" ? new Date(startDate) : startDate;
  const end = typeof endDate === "string" ? new Date(endDate) : endDate;

  // Same day
  if (start.toDateString() === end.toDateString()) {
    return `${formatDate(start, "short")} • ${formatDate(start, "time")} - ${formatDate(end, "time")}`;
  }

  // Different days
  return `${formatDate(start, "datetime")} - ${formatDate(end, "datetime")}`;
};
