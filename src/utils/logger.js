/**
 * Professional Console Logger Utility
 * Provides color-coded, categorized logging for better debugging
 */

const isDev = import.meta.env.DEV;

const styles = {
  auth: "color: #22c55e; font-weight: bold",
  api: "color: #3b82f6; font-weight: bold",
  route: "color: #8b5cf6; font-weight: bold",
  form: "color: #f59e0b; font-weight: bold",
  state: "color: #06b6d4; font-weight: bold",
  error: "color: #ef4444; font-weight: bold",
  success: "color: #22c55e; font-weight: bold",
  warn: "color: #f59e0b; font-weight: bold",
  info: "color: #3b82f6; font-weight: bold",
};

class Logger {
  constructor() {
    this.enabled = isDev;
  }

  /**
   * Authentication logs
   */
  auth(message, data = null) {
    if (!this.enabled) return;
    console.log(`%c[AUTH] ${message}`, styles.auth, data || "");
  }

  /**
   * API request/response logs
   */
  api(message, data = null) {
    if (!this.enabled) return;
    console.log(`%c[API] ${message}`, styles.api, data || "");
  }

  /**
   * Route navigation logs
   */
  route(message, data = null) {
    if (!this.enabled) return;
    console.log(`%c[ROUTE] ${message}`, styles.route, data || "");
  }

  /**
   * Form submission logs
   */
  form(message, data = null) {
    if (!this.enabled) return;
    console.log(`%c[FORM] ${message}`, styles.form, data || "");
  }

  /**
   * State management logs
   */
  state(message, data = null) {
    if (!this.enabled) return;
    console.log(`%c[STATE] ${message}`, styles.state, data || "");
  }

  /**
   * Success logs
   */
  success(message, data = null) {
    if (!this.enabled) return;
    console.log(`%c✓ ${message}`, styles.success, data || "");
  }

  /**
   * Error logs (always enabled)
   */
  error(message, error = null) {
    console.error(`%c✗ [ERROR] ${message}`, styles.error);
    if (error) {
      console.error(error);
    }
  }

  /**
   * Warning logs
   */
  warn(message, data = null) {
    if (!this.enabled) return;
    console.warn(`%c⚠ [WARN] ${message}`, styles.warn, data || "");
  }

  /**
   * Info logs
   */
  info(message, data = null) {
    if (!this.enabled) return;
    console.info(`%cℹ [INFO] ${message}`, styles.info, data || "");
  }

  /**
   * Group logs for complex operations
   */
  group(title, callback) {
    if (!this.enabled) return;
    console.group(`%c${title}`, "font-weight: bold; font-size: 14px");
    callback();
    console.groupEnd();
  }

  /**
   * Table display for array data
   */
  table(data, title = null) {
    if (!this.enabled) return;
    if (title) console.log(`%c${title}`, "font-weight: bold");
    console.table(data);
  }

  /**
   * Performance timing
   */
  time(label) {
    if (!this.enabled) return;
    console.time(label);
  }

  timeEnd(label) {
    if (!this.enabled) return;
    console.timeEnd(label);
  }
}

// Export singleton instance
export const logger = new Logger();

// Convenience methods for specific scenarios
export const logApiRequest = (method, url, data = null) => {
  logger.api(`${method.toUpperCase()} ${url}`, data);
};

export const logApiResponse = (method, url, status, data = null) => {
  const statusColor = status >= 200 && status < 300 ? "✓" : "✗";
  logger.api(`${statusColor} ${method.toUpperCase()} ${url} - ${status}`, data);
};

export const logApiError = (method, url, error) => {
  logger.error(`API Error: ${method.toUpperCase()} ${url}`, error);

  // Log validation errors in a more readable format
  if (error?.response?.data?.errors) {
    console.group(
      "%c📋 Validation Errors:",
      "color: #ff6b6b; font-weight: bold;",
    );
    error.response.data.errors.forEach((err) => {
      console.error(`  • ${err.field}: ${err.message}`);
    });
    console.groupEnd();
  } else if (error?.response?.data) {
    console.log(
      "%c📄 Error Details:",
      "color: #ff6b6b; font-weight: bold;",
      error.response.data,
    );
  }
};

export default logger;
