// src/components/sections/LiveCasino.jsx - OPTIMIZED
// Uses reusable GameCarousel component
// Only handles data fetching and section-specific config

import React, { useState, useEffect, memo } from "react";
import GameCarousel from "../common/GameCarousel";
import liveGames from "../../data/live-games.json";

// Section icon - defined outside component
const SectionIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <circle cx="10" cy="10" r="8" stroke="url(#paint_live)" strokeWidth="2" fill="none" />
    <circle cx="10" cy="10" r="3" fill="url(#paint_live)" />
    <path d="M10 2V4" stroke="url(#paint_live)" strokeWidth="2" strokeLinecap="round" />
    <path d="M10 16V18" stroke="url(#paint_live)" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 10H16" stroke="url(#paint_live)" strokeWidth="2" strokeLinecap="round" />
    <path d="M4 10H2" stroke="url(#paint_live)" strokeWidth="2" strokeLinecap="round" />
    <defs>
      <linearGradient
        id="paint_live"
        x1="10"
        y1="2"
        x2="10"
        y2="18"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EF4444" />
        <stop offset="1" stopColor="#DC2626" />
      </linearGradient>
    </defs>
  </svg>
);

// Shuffle function - defined outside component
const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Process games once outside component
const validLiveGames = liveGames
  .filter((item) => item.success && item.game)
  .map((item) => item.game);

const LiveCasino = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use requestIdleCallback for non-critical processing
    const loadGames = () => {
      const shuffled = shuffleArray(validLiveGames);
      setGames(shuffled);
      setLoading(false);
    };

    if ("requestIdleCallback" in window) {
      requestIdleCallback(loadGames);
    } else {
      setTimeout(loadGames, 0);
    }
  }, []);

  return (
    <GameCarousel
      title="Live Casino"
      icon={SectionIcon}
      games={games}
      loading={loading}
      viewAllRoute="/casino/live-casino"
    />
  );
};

export default memo(LiveCasino);