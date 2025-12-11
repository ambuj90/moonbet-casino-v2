// src/components/sections/RecentSection.jsx - OPTIMIZED VERSION
// Uses shared GameCarousel component
// - Static data loaded once
// - Memoized for performance

import React, { useState, useEffect, useMemo, memo } from "react";
import GameCarousel from "../common/GameCarousel";
import highRtpGames from "../../data/high-rtp-games.json";

// Recent Section Icon (from original)
const RecentIcon = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
  >
    <path
      d="M11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2ZM11 18C7.13401 18 4 14.866 4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 14.866 14.866 18 11 18ZM11.5 6H10V12L15.25 15.15L16 13.92L11.5 11.25V6Z"
      fill="url(#recentGradient)"
    />
    <defs>
      <linearGradient
        id="recentGradient"
        x1="2"
        y1="2"
        x2="20"
        y2="20"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#a62a00" />
        <stop offset="1" stopColor="#ffb8a1" />
      </linearGradient>
    </defs>
  </svg>
));

RecentIcon.displayName = "RecentIcon";

const RecentSection = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load and shuffle games once on mount
  useEffect(() => {
    setLoading(true);
    
    // Shuffle games for variety
    const shuffled = [...highRtpGames]
      .map((g) => ({ ...g, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort);
    
    setGames(shuffled);
    setLoading(false);
  }, []);

  // Memoize icon to prevent re-renders
  const icon = useMemo(() => <RecentIcon />, []);

  return (
    <GameCarousel
      games={games}
      loading={loading}
      title="HIGH RTP GAMES"
      icon={icon}
      viewAllPath="/casino/recent"
      geoVariant="default"
    />
  );
};

export default memo(RecentSection);