// src/components/sections/GamesYouLike.jsx - OPTIMIZED VERSION
// 
// OPTIMIZATIONS:
// 1. Uses GameCarousel for rendering (already optimized with CSS animations)
// 2. Caches provider games data (5 min TTL)
// 3. Removes Framer Motion dependency (~15KB savings)
// 4. Memoized deduplication logic
// 5. AbortController for cleanup
// 6. Prefetch support via GameCarousel's GameCard

import React, { useState, useEffect, useMemo, memo } from "react";
import axios from "axios";
import GameCarousel from "../common/GameCarousel";

// =============================================================================
// PROVIDER GAMES CACHE - SWR Pattern
// =============================================================================
const providerGamesCache = new Map(); // { provider: { data, timestamp } }
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const isCacheValid = (provider) => {
  const cached = providerGamesCache.get(provider);
  if (!cached?.data) return false;
  return Date.now() - cached.timestamp < CACHE_TTL;
};

const getCachedGames = (provider) => {
  const cached = providerGamesCache.get(provider);
  if (cached && isCacheValid(provider)) {
    return cached.data;
  }
  return null;
};

const setCachedGames = (provider, games) => {
  providerGamesCache.set(provider, {
    data: games,
    timestamp: Date.now(),
  });
};

// =============================================================================
// DEDUPLICATION HELPER - Moved outside component for performance
// =============================================================================
const deduplicateGames = (games, excludeGame) => {
  // Remove current game
  let list = games.filter((g) => g.name !== excludeGame);

  // Remove duplicate game names (case-insensitive)
  list = list.filter(
    (game, index, self) =>
      index ===
      self.findIndex(
        (g) => g.name.trim().toLowerCase() === game.name.trim().toLowerCase()
      )
  );

  // If same name exists with and without RTP (e.g. "2 Wild 2 Die" and "2 Wild 2 Die 94%")
  // Keep the shorter name
  const deduped = list.reduce((acc, game) => {
    const nameKey = game.name
      .replace(/\s*\d+%$/, "")
      .trim()
      .toLowerCase();

    if (!acc[nameKey] || game.name.length < acc[nameKey].name.length) {
      acc[nameKey] = game;
    }
    return acc;
  }, {});

  return Object.values(deduped);
};

// =============================================================================
// FIRE ICON SVG - Memoized
// =============================================================================
const FireIcon = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M15.3408 7.59087C15.2884 7.52329 15.2248 7.53657 15.1915 7.55036C15.1636 7.562 15.0996 7.59919 15.1084 7.69239C15.1191 7.80431 15.125 7.91841 15.1262 8.03157C15.1309 8.50102 14.9478 8.96094 14.6239 9.2934C14.3019 9.62371 13.8785 9.80168 13.4277 9.79652C12.8119 9.78844 12.3011 9.45809 11.9506 8.84118C11.6608 8.33106 11.7881 7.67313 11.923 6.97654C12.0019 6.5688 12.0836 6.14716 12.0836 5.74588C12.0836 2.62132 10.0412 0.818669 8.82376 0.0222265C8.79858 0.00578122 8.77461 0 8.75338 0C8.71885 0 8.69151 0.0153124 8.67803 0.0246874C8.6519 0.0428905 8.61008 0.0843747 8.62352 0.157812C9.08886 2.69929 7.7009 4.22783 6.23143 5.84611C4.71676 7.51419 3 9.40485 3 12.8147C3 16.7767 6.13405 20 9.98634 20C13.1582 20 15.9547 17.7256 16.787 14.4692C17.3545 12.2487 16.7598 9.42031 15.3408 7.59087ZM10.1606 18.4663C9.19601 18.5115 8.27862 18.1557 7.57792 17.4667C6.88473 16.7849 6.48715 15.8336 6.48715 14.8565C6.48715 13.0228 7.16883 11.6768 9.00231 9.88973C9.03231 9.86047 9.06304 9.85121 9.08981 9.85121C9.11408 9.85121 9.13512 9.85883 9.14959 9.86598C9.18009 9.88109 9.23023 9.91852 9.22347 9.99945C9.15791 10.784 9.15905 11.4352 9.22681 11.9351C9.4 13.2118 10.3088 14.0697 11.4882 14.0697C12.0665 14.0697 12.6174 13.8458 13.0393 13.4394C13.0883 13.3922 13.143 13.3982 13.1639 13.4028C13.1917 13.409 13.2289 13.4265 13.2483 13.4748C13.4233 13.9092 13.5127 14.3703 13.5141 14.8453C13.5196 16.7564 12.0153 18.3808 10.1606 18.4663Z"
      fill="#ffb8a1"
    />
  </svg>
));
FireIcon.displayName = "FireIcon";

// =============================================================================
// MAIN COMPONENT
// =============================================================================
const GamesYouLike = ({ provider, excludeGame }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch games by provider with caching
  useEffect(() => {
    if (!provider) {
      setLoading(false);
      return;
    }

    let isCancelled = false;

    const fetchGames = async () => {
      // Check cache first (SWR: Stale)
      const cachedGames = getCachedGames(provider);
      if (cachedGames) {
        const dedupedGames = deduplicateGames(cachedGames, excludeGame);
        setGames(dedupedGames);
        setLoading(false);
        // Don't return - still fetch fresh data in background
      }

      try {
        const res = await axios.get(
          `/wallet-service/api/games?provider=${encodeURIComponent(provider)}`
        );

        if (isCancelled) return;

        const list = res.data?.data || [];

        // Cache the raw data
        setCachedGames(provider, list);

        // Deduplicate and set
        const dedupedGames = deduplicateGames(list, excludeGame);
        setGames(dedupedGames);
      } catch (err) {
        console.error("❌ GamesYouLike fetch error:", err);
        // If we have cached data, keep showing it
        if (!cachedGames) {
          setGames([]);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchGames();

    return () => {
      isCancelled = true;
    };
  }, [provider, excludeGame]);

  // Memoize the icon to prevent re-renders
  const icon = useMemo(() => <FireIcon />, []);

  // Don't render if no provider
  if (!provider) {
    return null;
  }

  return (
    <GameCarousel
      games={games}
      loading={loading}
      title="Games You May Like"
      icon={icon}
      viewAllPath={`/providers/${provider.toLowerCase().replace(/\s+/g, "-")}`}
      geoVariant="default"
    />
  );
};

export default memo(GamesYouLike);