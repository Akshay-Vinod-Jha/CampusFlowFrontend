import api from "./api";

/**
 * Authentication Service
 * Handles login, register, logout, and token management
 */

const authService = {
  /**
   * Login user
   * @param {Object} credentials - { email, password }
   * @returns {Promise} User data and token
   */
  async login(credentials) {

    const response = await api.post("/auth/login", credentials);
    const { token, user } = response.data.data;

    // Store token and user in localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { token, user };
  },

  /**
   * Register new user
   * @param {Object} userData - { name, email, password, role, collegeId, department }
   * @returns {Promise} User data and token
   */
  async register(userData) {

    const response = await api.post("/auth/register", userData);
    const { token, user } = response.data.data;

    // Store token and user in localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { token, user };
  },

  /**
   * Logout user
   * Clears token and user data from localStorage
   */
  logout() {

    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

  },

  /**
   * Get current user from localStorage
   * @returns {Object|null} User object or null
   */
  getCurrentUser() {
    const userStr = localStorage.getItem("user");

    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        
        return user;
      } catch (error) {
        
        localStorage.removeItem("user");
        return null;
      }
    }

    return null;
  },

  /**
   * Get auth token from localStorage
   * @returns {string|null} JWT token or null
   */
  getToken() {
    return localStorage.getItem("authToken");
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} True if user has valid token
   */
  isAuthenticated() {
    const token = this.getToken();
    const isAuth = !!token;

    return isAuth;
  },

  /**
   * Get user profile from API
   * @returns {Promise} User profile data
   */
  async getProfile() {

    const response = await api.get("/auth/profile");
    const user = response.data.data;

    // Update user in localStorage
    localStorage.setItem("user", JSON.stringify(user));

    return user;
  },

  /**
   * Update user profile
   * @param {Object} updates - Profile fields to update
   * @returns {Promise} Updated user data
   */
  async updateProfile(updates) {

    const response = await api.put("/auth/profile", updates);
    const user = response.data.data;

    // Update user in localStorage
    localStorage.setItem("user", JSON.stringify(user));

    return user;
  },

  /**
   * Change password
   * @param {Object} passwords - { currentPassword, newPassword }
   * @returns {Promise} Success response
   */
  async changePassword(passwords) {

    const response = await api.put("/auth/change-password", passwords);

    return response.data;
  },

  /**
   * Request password reset
   * @param {string} email - User email
   * @returns {Promise} Success response
   */
  async forgotPassword(email) {

    const response = await api.post("/auth/forgot-password", { email });

    return response.data;
  },

  /**
   * Reset password with token
   * @param {Object} data - { token, newPassword }
   * @returns {Promise} Success response
   */
  async resetPassword(data) {

    const response = await api.post("/auth/reset-password", data);

    return response.data;
  },
};

export default authService;
