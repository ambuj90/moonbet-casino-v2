// src/services/gameService.js
import apiClient from "../api/apiClient";

const gameService = {
  /**
   * Get games with filters - server-side filtering
   */
  getGames: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();

      if (params.type && params.type !== "all") {
        queryParams.append("type", params.type);
      }
      if (params.provider) {
        queryParams.append("provider", params.provider);
      }
      if (params.name) {
        queryParams.append("name", params.name);
      }
      if (params.sortBy) {
        queryParams.append("sortBy", params.sortBy);
      }
      if (params.userId) {
        queryParams.append("userId", params.userId);
      }
      if (params.limit) {
        queryParams.append("limit", params.limit);
      }
      if (params.page) {
        queryParams.append("page", params.page);
      }

      const query = queryParams.toString() ? `?${queryParams.toString()}` : "";
      const response = await apiClient.get(`/games${query}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching games:", error);
      throw error;
    }
  },

  /**
   * Get user's favourite games
   */
  getFavouriteGames: async (userId) => {
    try {
      const response = await apiClient.get(`/games/${userId}/favourite-game`);
      return response.data;
    } catch (error) {
      console.error("Error fetching favourite games:", error);
      throw error;
    }
  },

  /**
   * Toggle favourite status
   */
  toggleFavourite: async (userId, gameUuid) => {
    try {
      const response = await apiClient.post(`/games/${userId}/favourite`, {
        uuid: gameUuid,
      });
      return response.data;
    } catch (error) {
      console.error("Error toggling favourite:", error);
      throw error;
    }
  },

  /**
   * Get game by slug
   */
  getGameBySlug: async (slug) => {
    try {
      const response = await apiClient.get(`/games/slug/${slug}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching game by slug:", error);
      throw error;
    }
  },

  /**
   * Get game by UUID
   */
  getGameByUUID: async (uuid) => {
    try {
      const response = await apiClient.get(`/games/${uuid}/details`);
      return response.data;
    } catch (error) {
      console.error("Error fetching game by UUID:", error);
      throw error;
    }
  },

  /**
   * Search games by names
   */
  searchGames: async (names) => {
    try {
      const query = Array.isArray(names) ? names.join(",") : names;
      const response = await apiClient.get(`/games/search?names=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error("Error searching games:", error);
      throw error;
    }
  },

  /**
   * Get recent wins
   */
  getRecentWins: async (limit = 50) => {
    try {
      const response = await apiClient.get(`/games/recent-wins?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching recent wins:", error);
      throw error;
    }
  },

  /**
   * Get all bets
   */
  getAllBets: async (limit = 50) => {
    try {
      const response = await apiClient.get(`/games/bets?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all bets:", error);
      throw error;
    }
  },

  /**
   * Get user bets
   */
  getUserBets: async (userId, limit = 50) => {
    try {
      const response = await apiClient.get(`/games/bets/${userId}?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user bets:", error);
      throw error;
    }
  },

  /**
   * Initialize a game session
   */
  initGame: async (uuid, payload = {}) => {
    try {
      const response = await apiClient.post(`/games/${uuid}/init`, payload);
      console.log("Game initialized:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error initializing game:", error);
      throw error;
    }
  },

  /**
   * Initialize a demo game session
   */
  initDemoGame: async (uuid, payload = {}) => {
    try {
      const response = await apiClient.post(`/games/${uuid}/init-demo`, payload);
      return response.data;
    } catch (error) {
      console.error("Error initializing demo game:", error);
      throw error;
    }
  },

  /**
   * Close game session
   */
  closeGameSession: async (userId) => {
    try {
      const response = await apiClient.post(`/games/${userId}/session/close`);
      return response.data;
    } catch (error) {
      console.error("Error closing game session:", error);
      throw error;
    }
  },
};

export default gameService;