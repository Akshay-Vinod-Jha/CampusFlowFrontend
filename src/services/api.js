import axios from "axios";
import { logApiRequest, logApiResponse, logApiError } from "@/utils/logger";

/**
 * Axios Instance with JWT Interceptors
 * Automatically adds Authorization header and logs all API calls
 */

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor - Add JWT token and log request
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log API request
    logApiRequest(config.method.toUpperCase(), config.url, {
      params: config.params,
      data: config.data,
    });

    return config;
  },
  (error) => {
    logApiError("REQUEST_SETUP", error.config?.url || "Unknown", error);
    return Promise.reject(error);
  },
);

// Response Interceptor - Log response and handle errors
api.interceptors.response.use(
  (response) => {
    // Log successful response
    logApiResponse(
      response.config.method.toUpperCase(),
      response.config.url,
      response.status,
      response.data,
    );

    return response;
  },
  (error) => {
    const { config, response } = error;

    // Log API error
    logApiError(
      config?.method?.toUpperCase() || "UNKNOWN",
      config?.url || "Unknown",
      error,
    );

    // Handle specific error cases
    if (response) {
      // Server responded with error status
      const { status, data } = response;

      switch (status) {
        case 401:
          // Unauthorized - clear auth and redirect to login
          console.log(
            "%c[AUTH] Unauthorized - Clearing session",
            "color: #ef4444; font-weight: bold",
          );
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");

          // Only redirect if not already on auth page
          if (!window.location.pathname.startsWith("/auth")) {
            window.location.href = "/auth/login";
          }
          break;

        case 403:
          // Forbidden - insufficient permissions
          console.log(
            "%c[AUTH] Forbidden - Insufficient permissions",
            "color: #ef4444; font-weight: bold",
          );
          break;

        case 404:
          // Not found
          console.log(
            "%c[API] Resource not found",
            "color: #f59e0b; font-weight: bold",
          );
          break;

        case 422:
          // Validation error
          console.log(
            "%c[FORM] Validation failed:",
            "color: #f97316; font-weight: bold",
            data.errors || data.message,
          );
          break;

        case 500:
        case 502:
        case 503:
          // Server error
          console.log(
            "%c[ERROR] Server error occurred",
            "color: #ef4444; font-weight: bold",
          );
          break;

        default:
          console.log(
            `%c[ERROR] Request failed with status ${status}`,
            "color: #ef4444; font-weight: bold",
          );
      }

      // Return formatted error
      return Promise.reject({
        status,
        message: data.message || "An error occurred",
        errors: data.errors || null,
        data,
      });
    } else if (error.request) {
      // Request was made but no response
      console.log(
        "%c[ERROR] No response from server (Network error)",
        "color: #ef4444; font-weight: bold",
      );
      return Promise.reject({
        status: 0,
        message: "Network error. Please check your connection.",
        errors: null,
      });
    } else {
      // Request setup error
      console.log(
        "%c[ERROR] Request setup failed",
        "color: #ef4444; font-weight: bold",
      );
      return Promise.reject({
        status: 0,
        message: error.message || "Request failed",
        errors: null,
      });
    }
  },
);

export default api;
