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
    <path
      d="M15.0977 20C15.9748 20 16.6911 19.2805 16.6911 18.3994V16.629C16.6911 15.7478 15.9748 15.0283 15.0977 15.0283H1.59343C0.716355 15.0283 0 15.7478 0 16.629V18.3994C0 19.2805 0.716355 20 1.59343 20H15.0977Z"
      fill="url(#paint0_linear_8959_12837)"
    />
    <path
      d="M19.1952 3.96285H17.1833C16.7385 3.96285 16.3785 4.32481 16.3785 4.77126C16.3785 5.2177 16.7385 5.57966 17.1833 5.57966H17.3845V8.85514L15.2405 9.37223V3.14225C15.2405 1.96201 14.2827 1 13.0997 1H3.57923C2.4043 1 1.44667 1.96201 1.44667 3.14225V13.312H15.2405V11.0346L18.3771 10.2781C18.7386 10.1909 18.994 9.86604 18.994 9.49223V5.57966H19.1952C19.6401 5.57966 20 5.2177 20 4.77126C20 4.32481 19.6401 3.96285 19.1952 3.96285ZM9.60165 6.05255V11.194H7.08831V6.05255H9.60165ZM3.06427 10.6685V6.57799C3.06427 6.28697 3.29768 6.05255 3.57923 6.05255H5.47877V11.194H3.57923C3.29768 11.194 3.06427 10.9596 3.06427 10.6685ZM13.631 10.6685C13.631 10.9596 13.3976 11.194 13.1078 11.194H11.2112V6.05255H13.1078C13.3976 6.05255 13.631 6.28697 13.631 6.57799V10.6685Z"
      fill="url(#paint1_linear_8959_12837)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_8959_12837"
        x1="22.8571"
        y1="24.75"
        x2="10.7262"
        y2="-3.18321"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#a62a00" />
        <stop offset="1" stop-color="#ffb8a1" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_8959_12837"
        x1="22.8571"
        y1="24.75"
        x2="10.7262"
        y2="-3.18321"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#a62a00" />
        <stop offset="1" stop-color="#ffb8a1" />
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
