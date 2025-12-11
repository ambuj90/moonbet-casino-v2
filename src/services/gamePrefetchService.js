// src/services/gamePrefetchService.js
// 
// GAME PREFETCH SERVICE - Like Stake.com
// Prefetches game data when user hovers over game card
// By the time they click, data is already cached
//
// Usage:
// - GameCard: onMouseEnter → prefetchGame(slug)
// - GamePage: getPrefetchedGame(slug) → instant data if available

import axios from "axios";

// =============================================================================
// CACHE CONFIGURATION
// =============================================================================
const GAME_CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const SESSION_CACHE_TTL = 2 * 60 * 1000; // 2 minutes
const PREFETCH_DEBOUNCE = 100; // ms - prevent rapid prefetch calls

// =============================================================================
// CACHES
// =============================================================================
const gameMetadataCache = new Map(); // { slug: { data, timestamp } }
const sessionUrlCache = new Map(); // { `${slug}-demo`: { url, timestamp } }
const prefetchInProgress = new Set(); // Prevent duplicate prefetch calls
const prefetchTimeouts = new Map(); // Debounce timeouts

// =============================================================================
// HELPER: Check if cache is valid
// =============================================================================
const isCacheValid = (cacheEntry, ttl) => {
  if (!cacheEntry?.data) return false;
  return Date.now() - cacheEntry.timestamp < ttl;
};

// =============================================================================
// PREFETCH GAME METADATA
// Called on hover - fetches game info before user clicks
// =============================================================================
export const prefetchGame = async (slug) => {
  if (!slug) return;

  // Check if already cached
  const cached = gameMetadataCache.get(slug);
  if (isCacheValid(cached, GAME_CACHE_TTL)) {
    return cached.data;
  }

  // Check if prefetch already in progress
  if (prefetchInProgress.has(slug)) {
    return null;
  }

  // Debounce rapid calls
  if (prefetchTimeouts.has(slug)) {
    clearTimeout(prefetchTimeouts.get(slug));
  }

  return new Promise((resolve) => {
    const timeoutId = setTimeout(async () => {
      prefetchTimeouts.delete(slug);
      prefetchInProgress.add(slug);

      try {
        const { data } = await axios.get(`/wallet-service/api/games/slug/${slug}`);

        if (data.success && data.data) {
          const gameData = data.data;
          
          // Cache the metadata
          gameMetadataCache.set(slug, {
            data: gameData,
            timestamp: Date.now(),
          });

          // Also prefetch demo session URL (most users start with demo)
          prefetchDemoSession(gameData.uuid, slug);

          resolve(gameData);
        } else {
          resolve(null);
        }
      } catch (error) {
        console.warn(`Prefetch failed for ${slug}:`, error.message);
        resolve(null);
      } finally {
        prefetchInProgress.delete(slug);
      }
    }, PREFETCH_DEBOUNCE);

    prefetchTimeouts.set(slug, timeoutId);
  });
};

// =============================================================================
// PREFETCH DEMO SESSION URL
// Most users start with demo, so prefetch this too
// =============================================================================
const prefetchDemoSession = async (uuid, slug) => {
  if (!uuid) return;

  const cacheKey = `${slug}-demo`;
  
  // Check if already cached
  const cached = sessionUrlCache.get(cacheKey);
  if (isCacheValid(cached, SESSION_CACHE_TTL)) {
    return cached.url;
  }

  try {
    const { data } = await axios.post(`/wallet-service/api/games/${uuid}/init-demo`, {
      device: window.innerWidth < 768 ? "mobile" : "desktop",
      language: "en",
      return_url: `${window.location.origin}/game-return/${uuid}`,
    });

    if (data.success && data.data?.url) {
      sessionUrlCache.set(cacheKey, {
        url: data.data.url,
        timestamp: Date.now(),
      });

      // Preconnect to game provider
      preconnectToProvider(data.data.url);

      return data.data.url;
    }
  } catch (error) {
    console.warn(`Demo session prefetch failed for ${slug}:`, error.message);
  }

  return null;
};

// =============================================================================
// PRECONNECT TO PROVIDER
// Creates early connection to game server
// =============================================================================
const preconnectToProvider = (url) => {
  if (!url) return;
  
  try {
    const domain = new URL(url).origin;
    
    // Check if already preconnected
    if (document.querySelector(`link[href="${domain}"][rel="preconnect"]`)) return;
    
    // Add preconnect
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = domain;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
    
    // Also add dns-prefetch
    const dnsPrefetch = document.createElement("link");
    dnsPrefetch.rel = "dns-prefetch";
    dnsPrefetch.href = domain;
    document.head.appendChild(dnsPrefetch);
  } catch (e) {
    // Invalid URL, skip
  }
};

// =============================================================================
// GET PREFETCHED GAME DATA
// GamePage calls this to get cached data instantly
// =============================================================================
export const getPrefetchedGame = (slug) => {
  const cached = gameMetadataCache.get(slug);
  if (isCacheValid(cached, GAME_CACHE_TTL)) {
    return cached.data;
  }
  return null;
};

// =============================================================================
// GET PREFETCHED SESSION URL
// GamePage calls this to get cached demo session URL
// =============================================================================
export const getPrefetchedSession = (slug, isRealPlay = false) => {
  // Only return cached demo sessions (real sessions should always be fresh)
  if (isRealPlay) return null;

  const cacheKey = `${slug}-demo`;
  const cached = sessionUrlCache.get(cacheKey);
  
  if (isCacheValid(cached, SESSION_CACHE_TTL)) {
    return cached.url;
  }
  return null;
};

// =============================================================================
// SET GAME DATA (for GamePage to update cache after fetch)
// =============================================================================
export const setGameCache = (slug, gameData) => {
  if (!slug || !gameData) return;
  
  gameMetadataCache.set(slug, {
    data: gameData,
    timestamp: Date.now(),
  });
};

// =============================================================================
// SET SESSION CACHE
// =============================================================================
export const setSessionCache = (slug, isRealPlay, url) => {
  if (!slug || !url) return;
  
  // Only cache demo sessions
  if (isRealPlay) return;
  
  const cacheKey = `${slug}-demo`;
  sessionUrlCache.set(cacheKey, {
    url,
    timestamp: Date.now(),
  });
};

// =============================================================================
// CLEAR ALL CACHES (for logout, etc.)
// =============================================================================
export const clearGameCaches = () => {
  gameMetadataCache.clear();
  sessionUrlCache.clear();
  prefetchInProgress.clear();
  
  // Clear any pending timeouts
  prefetchTimeouts.forEach((timeout) => clearTimeout(timeout));
  prefetchTimeouts.clear();
};

// =============================================================================
// EXPORT CACHE STATS (for debugging)
// =============================================================================
export const getCacheStats = () => ({
  gameMetadata: gameMetadataCache.size,
  sessionUrls: sessionUrlCache.size,
  prefetchInProgress: prefetchInProgress.size,
});

export default {
  prefetchGame,
  getPrefetchedGame,
  getPrefetchedSession,
  setGameCache,
  setSessionCache,
  clearGameCaches,
  getCacheStats,
};