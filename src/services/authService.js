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
    console.log(
      "%c[AUTH] Login attempt for:",
      "color: #22c55e; font-weight: bold",
      credentials.email,
    );

    const response = await api.post("/auth/login", credentials);
    const { token, user } = response.data.data;

    // Store token and user in localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));

    console.log(
      "%c✓ [AUTH] Login successful:",
      "color: #22c55e; font-weight: bold",
      user,
    );

    return { token, user };
  },

  /**
   * Register new user
   * @param {Object} userData - { name, email, password, role, collegeId, department }
   * @returns {Promise} User data and token
   */
  async register(userData) {
    console.log(
      "%c[AUTH] Registration attempt for:",
      "color: #22c55e; font-weight: bold",
      userData.email,
    );

    const response = await api.post("/auth/register", userData);
    const { token, user } = response.data.data;

    // Store token and user in localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));

    console.log(
      "%c✓ [AUTH] Registration successful:",
      "color: #22c55e; font-weight: bold",
      user,
    );

    return { token, user };
  },

  /**
   * Logout user
   * Clears token and user data from localStorage
   */
  logout() {
    console.log(
      "%c[AUTH] Logging out user",
      "color: #22c55e; font-weight: bold",
    );

    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    console.log(
      "%c✓ [AUTH] Logout successful",
      "color: #22c55e; font-weight: bold",
    );
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
        console.log(
          "%c[AUTH] Current user retrieved from storage:",
          "color: #22c55e; font-weight: bold",
          user,
        );
        return user;
      } catch (error) {
        console.log(
          "%c[ERROR] Failed to parse user from localStorage",
          "color: #ef4444; font-weight: bold",
        );
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

    console.log(
      "%c[AUTH] Authentication check:",
      "color: #22c55e; font-weight: bold",
      isAuth ? "Authenticated" : "Not authenticated",
    );

    return isAuth;
  },

  /**
   * Get user profile from API
   * @returns {Promise} User profile data
   */
  async getProfile() {
    console.log(
      "%c[AUTH] Fetching user profile",
      "color: #22c55e; font-weight: bold",
    );

    const response = await api.get("/auth/profile");
    const user = response.data.data;

    // Update user in localStorage
    localStorage.setItem("user", JSON.stringify(user));

    console.log(
      "%c✓ [AUTH] Profile fetched:",
      "color: #22c55e; font-weight: bold",
      user,
    );

    return user;
  },

  /**
   * Update user profile
   * @param {Object} updates - Profile fields to update
   * @returns {Promise} Updated user data
   */
  async updateProfile(updates) {
    console.log(
      "%c[AUTH] Updating user profile",
      "color: #22c55e; font-weight: bold",
    );

    const response = await api.put("/auth/profile", updates);
    const user = response.data.data;

    // Update user in localStorage
    localStorage.setItem("user", JSON.stringify(user));

    console.log(
      "%c✓ [AUTH] Profile updated:",
      "color: #22c55e; font-weight: bold",
      user,
    );

    return user;
  },

  /**
   * Change password
   * @param {Object} passwords - { currentPassword, newPassword }
   * @returns {Promise} Success response
   */
  async changePassword(passwords) {
    console.log(
      "%c[AUTH] Changing password",
      "color: #22c55e; font-weight: bold",
    );

    const response = await api.put("/auth/change-password", passwords);

    console.log(
      "%c✓ [AUTH] Password changed successfully",
      "color: #22c55e; font-weight: bold",
    );

    return response.data;
  },

  /**
   * Request password reset
   * @param {string} email - User email
   * @returns {Promise} Success response
   */
  async forgotPassword(email) {
    console.log(
      "%c[AUTH] Password reset requested for:",
      "color: #22c55e; font-weight: bold",
      email,
    );

    const response = await api.post("/auth/forgot-password", { email });

    console.log(
      "%c✓ [AUTH] Password reset email sent",
      "color: #22c55e; font-weight: bold",
    );

    return response.data;
  },

  /**
   * Reset password with token
   * @param {Object} data - { token, newPassword }
   * @returns {Promise} Success response
   */
  async resetPassword(data) {
    console.log(
      "%c[AUTH] Resetting password with token",
      "color: #22c55e; font-weight: bold",
    );

    const response = await api.post("/auth/reset-password", data);

    console.log(
      "%c✓ [AUTH] Password reset successful",
      "color: #22c55e; font-weight: bold",
    );

    return response.data;
  },
};

export default authService;
