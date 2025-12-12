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
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M13.7473 3.74906H2.50543C2.17415 3.74906 1.85644 3.88072 1.62219 4.11508C1.38794 4.34944 1.25634 4.6673 1.25634 4.99874C1.25634 5.33017 1.38794 5.64803 1.62219 5.88239C1.85644 6.11675 2.17415 6.24842 2.50543 6.24842H13.7473C14.4098 6.24842 15.0453 6.51174 15.5138 6.98046C15.9823 7.44918 16.2455 8.0849 16.2455 8.74777C16.2455 9.07921 16.3771 9.39707 16.6113 9.63143C16.8456 9.86579 17.1633 9.99745 17.4946 9.99745C17.8258 9.99745 18.1436 9.86579 18.3778 9.63143C18.6121 9.39707 18.7437 9.07921 18.7437 8.74777C18.7437 7.42203 18.2173 6.15059 17.2803 5.21315C16.3433 4.27571 15.0724 3.74906 13.7473 3.74906Z"
      fill="url(#paint0_linear_9169_861)"
    />
    <path
      d="M2.50543 9.99745C2.17415 9.99745 1.85644 10.1291 1.62219 10.3635C1.38794 10.5978 1.25634 10.9157 1.25634 11.2471C1.25634 12.5729 1.78274 13.8443 2.71974 14.7818C3.65675 15.7192 4.92759 16.2458 6.25272 16.2458H17.4946C17.8258 16.2458 18.1436 16.1142 18.3778 15.8798C18.6121 15.6455 18.7437 15.3276 18.7437 14.9962C18.7437 14.6647 18.6121 14.3469 18.3778 14.1125C18.1436 13.8782 17.8258 13.7465 17.4946 13.7465H6.25272C5.59016 13.7465 4.95473 13.4832 4.48623 13.0144C4.01773 12.5457 3.75453 11.91 3.75453 11.2471C3.75453 10.9157 3.62293 10.5978 3.38868 10.3635C3.15442 10.1291 2.83671 9.99745 2.50543 9.99745Z"
      fill="url(#paint1_linear_9169_861)"
    />
    <path
      d="M14.9964 9.99745C14.832 9.9965 14.669 10.028 14.5168 10.0902C14.3647 10.1524 14.2262 10.244 14.1095 10.3599C13.9924 10.476 13.8995 10.6143 13.8361 10.7665C13.7727 10.9188 13.74 11.0822 13.74 11.2471C13.74 11.4121 13.7727 11.5754 13.8361 11.7277C13.8995 11.88 13.9924 12.0182 14.1095 12.1344L16.9824 14.9962L14.1095 17.8579C13.8743 18.0933 13.7422 18.4124 13.7422 18.7452C13.7422 19.078 13.8743 19.3972 14.1095 19.6325C14.3447 19.8678 14.6637 20 14.9964 20C15.329 20 15.648 19.8678 15.8832 19.6325L19.6305 15.8834C19.7476 15.7673 19.8405 15.6291 19.9039 15.4768C19.9674 15.3245 20 15.1611 20 14.9962C20 14.8312 19.9674 14.6679 19.9039 14.5156C19.8405 14.3633 19.7476 14.2251 19.6305 14.1089L15.8832 10.3599C15.7665 10.244 15.6281 10.1524 15.4759 10.0902C15.3237 10.028 15.1608 9.9965 14.9964 9.99745Z"
      fill="url(#paint2_linear_9169_861)"
    />
    <path
      d="M5.00362 2.08875e-05C4.83923 -0.000929985 4.67627 0.0305932 4.52409 0.092783C4.3719 0.154973 4.23348 0.246606 4.11676 0.362428L0.36948 4.11147C0.252404 4.22764 0.159479 4.36585 0.096064 4.51814C0.0326491 4.67042 0 4.83376 0 4.99874C0 5.16371 0.0326491 5.32705 0.096064 5.47933C0.159479 5.63162 0.252404 5.76984 0.36948 5.88601L4.11676 9.63505C4.35197 9.87037 4.67099 10.0026 5.00362 10.0026C5.16833 10.0026 5.33142 9.97011 5.48359 9.90705C5.63575 9.84399 5.77402 9.75156 5.89048 9.63505C6.00694 9.51853 6.09933 9.3802 6.16236 9.22796C6.22539 9.07572 6.25783 8.91256 6.25783 8.74777C6.25783 8.58299 6.22539 8.41982 6.16236 8.26759C6.09933 8.11535 6.00694 7.97702 5.89048 7.8605L3.01756 4.99874L5.89048 2.13697C6.00755 2.0208 6.10048 1.88258 6.16389 1.7303C6.22731 1.57801 6.25996 1.41467 6.25996 1.2497C6.25996 1.08473 6.22731 0.921388 6.16389 0.769103C6.10048 0.616818 6.00755 0.478602 5.89048 0.362428C5.77376 0.246606 5.63534 0.154973 5.48316 0.092783C5.33097 0.0305932 5.16801 -0.000929985 5.00362 2.08875e-05Z"
      fill="url(#paint3_linear_9169_861)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_9169_861"
        x1="22.8571"
        y1="25"
        x2="9.64214"
        y2="-3.90783"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#a62a00" />
        <stop offset="1" stop-color="#ffb8a1" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_9169_861"
        x1="22.8571"
        y1="25"
        x2="9.64214"
        y2="-3.90783"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#a62a00" />
        <stop offset="1" stop-color="#ffb8a1" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_9169_861"
        x1="22.8571"
        y1="25"
        x2="9.64214"
        y2="-3.90783"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#a62a00" />
        <stop offset="1" stop-color="#ffb8a1" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_9169_861"
        x1="22.8571"
        y1="25"
        x2="9.64214"
        y2="-3.90783"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#a62a00" />
        <stop offset="1" stop-color="#ffb8a1" />
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
