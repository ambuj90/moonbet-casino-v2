// src/components/sections/SlotsSection.jsx - OPTIMIZED
// Uses reusable GameCarousel component
// Only handles data fetching and section-specific config

import React, { useState, useEffect, useMemo, memo } from "react";
import GameCarousel from "../common/GameCarousel";
import curatedGames from "../../data/slot-games.json";

// Section icon - defined outside component
const SectionIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <rect x="1" y="3" width="18" height="14" rx="2" stroke="url(#paint_slots)" strokeWidth="2" fill="none" />
    <line x1="7" y1="3" x2="7" y2="17" stroke="url(#paint_slots)" strokeWidth="2" />
    <line x1="13" y1="3" x2="13" y2="17" stroke="url(#paint_slots)" strokeWidth="2" />
    <circle cx="4" cy="10" r="1.5" fill="url(#paint_slots)" />
    <circle cx="10" cy="10" r="1.5" fill="url(#paint_slots)" />
    <circle cx="16" cy="10" r="1.5" fill="url(#paint_slots)" />
    <defs>
      <linearGradient
        id="paint_slots"
        x1="10"
        y1="3"
        x2="10"
        y2="17"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#8B5CF6" />
        <stop offset="1" stopColor="#6366F1" />
      </linearGradient>
    </defs>
  </svg>
);

// Process games once outside component
const processedGames = curatedGames
  .filter((item) => item.success && item.game)
  .map((item) => {
    const g = item.game;
    return {
      uuid: g.uuid,
      slug: g.slug,
      name: g.name,
      provider: g.provider,
      image: g.image,
      is_mobile: g.is_mobile,
      rtp: g.rtp,
      volatility: g.volatility,
      reels_count: g.reels_count,
    };
  });

const SlotsSection = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use requestIdleCallback for non-critical processing
    const loadGames = () => {
      setGames(processedGames);
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
      title="Slots"
      icon={SectionIcon}
      games={games}
      loading={loading}
      viewAllRoute="/casino/slots"
    />
  );
};

export default memo(SlotsSection);