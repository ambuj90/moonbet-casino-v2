// src/store/useGameStore.js
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import gameService from "../services/gameService";

// Provider list for studio filter
const PROVIDER_LIST = [
  { id: "pragmatic play", label: "Pragmatic Play" },
  { id: "evolution gaming", label: "Evolution Gaming" },
  { id: "playngo", label: "Play'n GO" },
  { id: "netent", label: "NetEnt" },
  { id: "hacksaw gaming", label: "Hacksaw Gaming" },
  { id: "ezugi", label: "Ezugi" },
  { id: "bgaming", label: "BGaming" },
  { id: "nolimit city", label: "Nolimit City" },
  { id: "push gaming", label: "Push Gaming" },
  { id: "relax gaming", label: "Relax Gaming" },
];

// Cache configuration
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Utility to generate cache key
const generateCacheKey = (category, filter, searchTerm, studio) => {
  return `${category}:${filter}:${searchTerm}:${studio}`;
};

// Debounce utility
let searchTimeout = null;
const SEARCH_DEBOUNCE_MS = 300;

const useGameStore = create(
  subscribeWithSelector((set, get) => ({
    // ========== STATE ==========
    games: [],
    filteredGames: [],
    loading: false,
    error: null,

    // Filters
    selectedCategory: "all",
    selectedFilter: "trending",
    searchTerm: "",
    selectedStudio: "all",

    // Pagination
    currentPage: 1,
    totalPages: 1,
    totalGames: 0,
    limit: 100,

    // Cache
    cache: new Map(),
    lastFetchParams: null,

    // Studios list
    availableStudios: [{ id: "all", label: "All Studios" }, ...PROVIDER_LIST],

    // ========== ACTIONS ==========

    /**
     * Set selected category and fetch games
     */
    setCategory: (category) => {
      set({ selectedCategory: category, selectedStudio: "all", currentPage: 1 });
      get().fetchGames();
    },

    /**
     * Set selected filter and fetch games
     */
    setFilter: (filter) => {
      set({ selectedFilter: filter, currentPage: 1 });
      get().fetchGames();
    },

    /**
     * Set search term with debounce
     */
    setSearchTerm: (term) => {
      set({ searchTerm: term });
      
      // Debounce search API call
      if (searchTimeout) clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        set({ currentPage: 1 });
        get().fetchGames();
      }, SEARCH_DEBOUNCE_MS);
    },

    /**
     * Set selected studio and filter games locally
     */
    setStudio: (studio) => {
      set({ selectedStudio: studio });
      get().applyLocalFilters();
    },

    /**
     * Set page and fetch games
     */
    setPage: (page) => {
      set({ currentPage: page });
      get().fetchGames();
    },

    /**
     * Reset all filters to default
     */
    resetFilters: () => {
      set({
        selectedCategory: "all",
        selectedFilter: "trending",
        searchTerm: "",
        selectedStudio: "all",
        currentPage: 1,
      });
      get().fetchGames();
    },

    /**
     * Apply local filters (studio) to fetched games
     */
    applyLocalFilters: () => {
      const { games, selectedStudio } = get();
      
      if (selectedStudio === "all") {
        set({ filteredGames: games });
        return;
      }

      const filtered = games.filter((game) => {
        const provider = (
          game.provider ||
          game.provider_name ||
          game.studio ||
          game.vendor ||
          ""
        ).toLowerCase();
        return provider.includes(selectedStudio.toLowerCase());
      });

      set({ filteredGames: filtered });
    },

    /**
     * Check if cached data is valid
     */
    getCachedData: (cacheKey) => {
      const { cache } = get();
      const cached = cache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.data;
      }
      
      return null;
    },

    /**
     * Set cached data
     */
    setCachedData: (cacheKey, data) => {
      const { cache } = get();
      const newCache = new Map(cache);
      newCache.set(cacheKey, { data, timestamp: Date.now() });
      
      // Limit cache size to prevent memory issues
      if (newCache.size > 50) {
        const firstKey = newCache.keys().next().value;
        newCache.delete(firstKey);
      }
      
      set({ cache: newCache });
    },

    /**
     * Main fetch games function
     */
    fetchGames: async () => {
      const state = get();
      const {
        selectedCategory,
        selectedFilter,
        searchTerm,
        currentPage,
        limit,
      } = state;

      // Get user for recent/favourite filters
      const user = JSON.parse(localStorage.getItem("user") || "null");
      const userId = user?.id;

      // Generate cache key
      const cacheKey = generateCacheKey(
        selectedCategory,
        selectedFilter,
        searchTerm,
        "all" // Don't include studio in cache key as it's filtered locally
      );

      // Check cache first (skip for user-specific data)
      const skipCache = selectedCategory === "favorites" || 
                        selectedCategory === "recent" ||
                        selectedFilter === "recent" ||
                        selectedFilter === "favourite";
      
      if (!skipCache) {
        const cachedData = get().getCachedData(cacheKey);
        if (cachedData) {
          set({
            games: cachedData.games,
            totalGames: cachedData.total,
            totalPages: cachedData.totalPages,
            loading: false,
          });
          get().applyLocalFilters();
          return;
        }
      }

      set({ loading: true, error: null });

      try {
        let result;

        // Handle favorites category
        if (selectedCategory === "favorites") {
          if (!userId) {
            set({ games: [], filteredGames: [], loading: false });
            return;
          }
          result = await gameService.getFavouriteGames(userId);
          const games = result.games || [];
          set({
            games,
            filteredGames: games,
            totalGames: games.length,
            totalPages: 1,
            loading: false,
          });
          return;
        }

        // Handle recent games category
        if (selectedCategory === "recent") {
          if (!userId) {
            set({ games: [], filteredGames: [], loading: false });
            return;
          }
          result = await gameService.getGames({
            sortBy: "recent",
            userId,
            limit,
            page: currentPage,
          });
        } else {
          // Normal category fetch
          result = await gameService.getGames({
            type: selectedCategory,
            sortBy: selectedFilter,
            name: searchTerm || undefined,
            userId: userId || undefined,
            limit,
            page: currentPage,
          });
        }

        if (result.success) {
          const games = result.data || [];
          const total = result.total || games.length;
          const totalPages = result.totalPages || 1;

          // Cache the result
          if (!skipCache) {
            get().setCachedData(cacheKey, { games, total, totalPages });
          }

          set({
            games,
            totalGames: total,
            totalPages,
            loading: false,
          });

          get().applyLocalFilters();
        } else {
          set({ games: [], filteredGames: [], loading: false });
        }
      } catch (error) {
        console.error("Error fetching games:", error);
        set({
          error: error.message || "Failed to fetch games",
          loading: false,
          games: [],
          filteredGames: [],
        });
      }
    },

    /**
     * Toggle favourite game
     */
    toggleFavourite: async (gameUuid) => {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (!user?.id) {
        console.warn("User not logged in");
        return false;
      }

      try {
        const result = await gameService.toggleFavourite(user.id, gameUuid);
        
        // Invalidate favourites cache
        const { cache, selectedCategory } = get();
        const newCache = new Map(cache);
        
        // Remove all favourite-related cache entries
        for (const key of newCache.keys()) {
          if (key.startsWith("favorites:")) {
            newCache.delete(key);
          }
        }
        
        set({ cache: newCache });
        
        // Refetch if on favourites page
        if (selectedCategory === "favorites") {
          get().fetchGames();
        }
        
        return result.success;
      } catch (error) {
        console.error("Error toggling favourite:", error);
        return false;
      }
    },

    /**
     * Clear cache (useful for refresh)
     */
    clearCache: () => {
      set({ cache: new Map() });
    },

    /**
     * Initialize store - call on mount
     */
    initialize: (category = "all", filter = "trending") => {
      set({
        selectedCategory: category,
        selectedFilter: filter,
        searchTerm: "",
        selectedStudio: "all",
        currentPage: 1,
      });
      get().fetchGames();
    },
  }))
);

export default useGameStore;

// Export provider list for use in components
export { PROVIDER_LIST };