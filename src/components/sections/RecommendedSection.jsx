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
    width="14"
    height="20"
    viewBox="0 0 14 20"
    fill="none"
  >
    <path
      d="M12.3408 7.59087C12.2884 7.52329 12.2248 7.53657 12.1915 7.55036C12.1636 7.562 12.0996 7.59919 12.1084 7.69239C12.1191 7.80431 12.125 7.91841 12.1262 8.03157C12.1309 8.50102 11.9478 8.96094 11.6239 9.2934C11.3019 9.62371 10.8785 9.80168 10.4277 9.79652C9.81187 9.78844 9.30111 9.45809 8.95059 8.84118C8.66076 8.33106 8.78815 7.67313 8.92301 6.97654C9.00194 6.5688 9.08356 6.14716 9.08356 5.74588C9.08356 2.62132 7.04119 0.818669 5.82376 0.0222265C5.79858 0.00578122 5.77461 0 5.75338 0C5.71885 0 5.69151 0.0153124 5.67803 0.0246874C5.6519 0.0428905 5.61008 0.0843747 5.62352 0.157812C6.08886 2.69929 4.7009 4.22783 3.23143 5.84611C1.71676 7.51419 0 9.40485 0 12.8147C0 16.7767 3.13405 20 6.98634 20C10.1582 20 12.9547 17.7256 13.787 14.4692C14.3545 12.2487 13.7598 9.42031 12.3408 7.59087ZM7.16064 18.4663C6.19601 18.5115 5.27862 18.1557 4.57792 17.4667C3.88473 16.7849 3.48715 15.8336 3.48715 14.8565C3.48715 13.0228 4.16883 11.6768 6.00231 9.88973C6.03231 9.86047 6.06304 9.85121 6.08981 9.85121C6.11408 9.85121 6.13512 9.85883 6.14959 9.86598C6.18009 9.88109 6.23023 9.91852 6.22347 9.99945C6.15791 10.784 6.15905 11.4352 6.22681 11.9351C6.4 13.2118 7.30876 14.0697 8.48825 14.0697C9.06654 14.0697 9.61738 13.8458 10.0393 13.4394C10.0883 13.3922 10.143 13.3982 10.1639 13.4028C10.1917 13.409 10.2289 13.4265 10.2483 13.4748C10.4233 13.9092 10.5127 14.3703 10.5141 14.8453C10.5196 16.7564 9.01531 18.3808 7.16064 18.4663Z"
      fill="url(#paint0_linear_8959_12805)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_8959_12805"
        x1="16"
        y1="25"
        x2="1.809e-06"
        y2="0.499998"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#a62a00" />
        <stop offset="1" stop-color="#ffb8a1" />
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
