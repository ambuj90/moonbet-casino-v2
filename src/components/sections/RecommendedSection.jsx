// src/components/sections/RecommendedSection.jsx - OPTIMIZED
// Uses reusable GameCarousel component
// Only handles data fetching and section-specific config

import React, { useState, useEffect, memo } from "react";
import GameCarousel from "../common/GameCarousel";
import axios from "axios";
import { toast } from "react-toastify";

// Section icon - defined outside component
const SectionIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z"
      fill="url(#paint_recommended)"
    />
    <defs>
      <linearGradient
        id="paint_recommended"
        x1="10"
        y1="0"
        x2="10"
        y2="18.0902"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFD700" />
        <stop offset="1" stopColor="#FFA500" />
      </linearGradient>
    </defs>
  </svg>
);

// Cache for API response to avoid duplicate calls
let gamesCache = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const RecommendedSection = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      // Check cache first
      const now = Date.now();
      if (gamesCache && now - cacheTimestamp < CACHE_DURATION) {
        setGames(gamesCache);
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get("/wallet-service/api/games");

        // Compatible with both old and new API response formats
        let fetchedGames = [];

        if (Array.isArray(data?.data)) {
          fetchedGames = data.data;
        } else if (Array.isArray(data?.games?.items)) {
          fetchedGames = data.games.items;
        }

        // Shuffle games
        const shuffled = fetchedGames.sort(() => Math.random() - 0.5);
        
        // Update cache
        gamesCache = shuffled;
        cacheTimestamp = now;
        
        setGames(shuffled);
      } catch (error) {
        console.error("❌ Error fetching games:", error);
        toast.error(
          error.response?.data?.message || "Failed to load games list"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <GameCarousel
      title="Trending Games"
      icon={SectionIcon}
      games={games}
      loading={loading}
      viewAllRoute="/casino/trending"
    />
  );
};

export default memo(RecommendedSection);