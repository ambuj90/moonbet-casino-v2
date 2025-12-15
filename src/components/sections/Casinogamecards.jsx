// src/components/sections/CasinoGameCards.jsx - OPTIMIZED
// Performance improvements:
// 1. Static data moved outside component
// 2. Sub-components memoized and moved outside
// 3. CSS animations replace Framer Motion
// 4. Lazy loaded images
// 5. GPU-accelerated transforms

import React, { memo } from "react";
import "../../styles/gameShapes.css";

// ============================================================================
// STATIC DATA - Defined outside component (never recreated)
// ============================================================================
const CARDS_DATA = Object.freeze([
  {
    id: 1,
    class: "clip-casino",
    mobileClass: "clip-casino-mobile",
    w: "47%",
    h: "160px",
    title: "Casino",
    icon: "/icons/casino.svg",
    img: "/category/img8.png",
    desc: "The full casino experience. Live, fair, and always on.",
    background: "rgba(132, 67, 160, 0.50)",
    hoverBg: "#8443A0",
  },
  {
    id: 2,
    class: "clip-gameshows",
    mobileClass: "clip-gameshows-mobile",
    w: "27%",
    h: "160px",
    title: "Game Shows",
    icon: "/icons/game-shows2.svg",
    img: "/category/img10.png",
    desc: "Spinning wheels, pumping multipliers",
    background: "rgba(90, 55, 153, 0.50)",
    hoverBg: "#a62a00",
  },
  {
    id: 3,
    class: "clip-slots",
    mobileClass: "clip-slots-mobile",
    w: "26%",
    h: "160px",
    title: "Slots",
    icon: "/icons/slots2.svg",
    img: "/category/img3.png",
    desc: "2K + titles, 98% + RTP, chase your next big win.",
    background: "rgba(85, 81, 169, 0.50)",
    hoverBg: "#a62a00",
  },
  {
    id: 4,
    class: "clip-blackjack",
    mobileClass: "clip-blackjack-mobile",
    w: "50%",
    h: "160px",
    title: "Blackjack",
    icon: "/icons/blackjack2.svg",
    img: "/category/img11.png",
    desc: "The thinking player's game with almost no house edge.",
    background: "rgba(85, 81, 169, 0.50)",
    hoverBg: "#5551A9",
  },
  {
    id: 5,
    class: "clip-baccarat",
    mobileClass: "clip-roulette-mobile",
    w: "50%",
    h: "160px",
    title: "Roulette",
    icon: "/icons/roulette2.svg",
    img: "/category/img6.png",
    desc: "Banker bets hit 50.68% of the time. The math is in your favor.",
    background: "rgba(132, 67, 160, 0.50)",
    hoverBg: "#8443A0",
  },
]);

// ============================================================================
// DESKTOP CARD COMPONENT - Memoized
// ============================================================================
const DesktopCard = memo(({ c }) => (
  <div
    className="casino-card relative group"
    style={{ 
      width: c.w,
      "--card-bg": c.background,
      "--card-hover-bg": c.hoverBg,
    }}
  >
    {/* Floating Label */}
    <div className="absolute top-2 left-2 z-30 flex items-center gap-2 text-[15px] text-white/80">
      <img src={c.icon} className="w-4 h-4" alt="" loading="lazy" />
      {c.title}
    </div>

    <div className="casino-card-wrapper p-[6px] rounded-xl">
      <div
        className={`relative overflow-hidden bg-[#0D0E36] ${c.class}`}
        style={{
          width: "100%",
          height: c.h,
          borderRadius: "20px",
          padding: "16px 16px",
        }}
      >
        {/* Desktop description */}
        <div className="w-[50%] h-full flex flex-col justify-end">
          <p
            className="mb-2"
            style={{
              color: "rgba(225,225,225,0.30)",
              fontFamily: "Neue Plak",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "18px",
            }}
          >
            {c.desc}
          </p>
        </div>

        {/* Image */}
        <img
          src={c.img}
          alt={c.title}
          className="absolute z-10 pointer-events-none object-contain desktop-img"
          loading="lazy"
          decoding="async"
        />

        {/* Hover sweep - CSS only */}
        <div className="casino-card-sweep absolute inset-0 pointer-events-none" />
      </div>
    </div>
  </div>
));
DesktopCard.displayName = "DesktopCard";

// ============================================================================
// MOBILE CARD COMPONENT - Memoized
// ============================================================================
const MobileCard = memo(({ c, isSmall = false }) => (
  <div
    className="casino-card relative group w-full"
    style={{ 
      "--card-bg": c.background,
      "--card-hover-bg": c.hoverBg,
    }}
  >
    {/* Floating Label */}
    <div
      className={`absolute top-2 left-2 z-30 flex items-center gap-1.5 text-white/90 ${
        isSmall ? "text-[11px] sm:text-[13px]" : "text-[13px] sm:text-[14px]"
      }`}
    >
      <img
        src={c.icon}
        className={`${
          isSmall ? "w-3 h-3 sm:w-3.5 sm:h-3.5" : "w-3.5 h-3.5 sm:w-4 sm:h-4"
        }`}
        alt=""
        loading="lazy"
      />
      <span className={`${isSmall ? "leading-tight" : ""}`}>
        {isSmall && c.title === "Game Shows" ? "Game Shows" : c.title}
      </span>
    </div>

    <div className="casino-card-wrapper p-[4px] sm:p-[5px] rounded-lg sm:rounded-xl">
      <div
        className={`relative overflow-hidden bg-[#0D0E36] ${c.mobileClass}`}
        style={{
          width: "100%",
          height: "107px",
        }}
      >
        {/* Image */}
        <img
          src={c.img}
          alt={c.title}
          className={`absolute z-10 pointer-events-none object-contain ${
            isSmall ? "mobile-img-small" : "mobile-img-large"
          }`}
          loading="lazy"
          decoding="async"
        />

        {/* Hover sweep - CSS only */}
        <div className="casino-card-sweep absolute inset-0 pointer-events-none" />
      </div>
    </div>
  </div>
));
MobileCard.displayName = "MobileCard";

// ============================================================================
// TABLET CARD COMPONENT - Memoized
// ============================================================================
const TabletCard = memo(({ c }) => (
  <div
    className="casino-card relative group w-full"
    style={{ 
      "--card-bg": c.background,
      "--card-hover-bg": c.hoverBg,
    }}
  >
    {/* Floating Label */}
    <div className="absolute top-2 left-2 z-30 flex items-center gap-2 text-[14px] text-white/90">
      <img src={c.icon} className="w-4 h-4" alt="" loading="lazy" />
      {c.title}
    </div>

    <div className="casino-card-wrapper p-[5px] rounded-xl">
      <div
        className={`relative overflow-hidden bg-[#0D0E36] ${c.mobileClass}`}
        style={{
          width: "100%",
          height: "140px",
        }}
      >
        {/* Image */}
        <img
          src={c.img}
          alt={c.title}
          className="absolute z-10 pointer-events-none object-contain tablet-img"
          loading="lazy"
          decoding="async"
        />

        {/* Hover sweep - CSS only */}
        <div className="casino-card-sweep absolute inset-0 pointer-events-none" />
      </div>
    </div>
  </div>
));
TabletCard.displayName = "TabletCard";

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const CasinoGameCards = () => {
  return (
    <section className="casino-game-cards w-full md:py-2 py-2">
      <div className="max-w-7xl mx-auto space-y-3 px-3">
        {/* Desktop Layout */}
        <div className="hidden xl:flex gap-3">
          <DesktopCard c={CARDS_DATA[0]} />
          <DesktopCard c={CARDS_DATA[1]} />
          <DesktopCard c={CARDS_DATA[2]} />
        </div>

        <div className="hidden xl:flex gap-3">
          <DesktopCard c={CARDS_DATA[3]} />
          <DesktopCard c={CARDS_DATA[4]} />
        </div>

        {/* Tablet Layout (md to xl) */}
        <div className="hidden md:grid xl:hidden gap-3 grid-cols-2">
          <TabletCard c={CARDS_DATA[0]} />
          <TabletCard c={CARDS_DATA[3]} />
          <TabletCard c={CARDS_DATA[2]} />
          <TabletCard c={CARDS_DATA[1]} />
          <TabletCard c={CARDS_DATA[4]} />
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-3">
          {/* First Row: Casino + Blackjack (2 columns, equal) */}
          <div className="grid grid-cols-2 gap-3">
            <MobileCard c={CARDS_DATA[0]} />
            <MobileCard c={CARDS_DATA[3]} />
          </div>

          {/* Second Row: Slots + Game Shows + Roulette (3 columns, equal) */}
          <div className="grid grid-cols-3 gap-2">
            <MobileCard c={CARDS_DATA[2]} isSmall={true} />
            <MobileCard c={CARDS_DATA[1]} isSmall={true} />
            <MobileCard c={CARDS_DATA[4]} isSmall={true} />
          </div>
        </div>
      </div>

      {/* CSS Animations - GPU Accelerated */}
      <style jsx>{`
        /* Card hover scale - CSS only */
        .casino-card {
          transition: transform 0.3s ease-out;
          will-change: transform;
        }
        .casino-card:hover {
          transform: scale(1.02);
        }

        /* Card wrapper background transition */
        .casino-card-wrapper {
          background: var(--card-bg);
          transition: background-color 0.3s ease-out;
        }
        .casino-card:hover .casino-card-wrapper {
          background: var(--card-hover-bg);
        }

        /* Sweep effect - CSS only */
        .casino-card-sweep {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(-100%);
          opacity: 0;
          transition: opacity 0.3s ease-out;
        }
        .casino-card:hover .casino-card-sweep {
          opacity: 1;
          animation: sweepRight 0.8s ease-out forwards;
        }

        @keyframes sweepRight {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
};

export default memo(CasinoGameCards);