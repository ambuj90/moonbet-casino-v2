// src/components/sections/GameCarousel.jsx - OPTIMIZED WITH PREFETCH ON HOVER
// 
// OPTIMIZATIONS:
// 1. CSS animations replace Framer Motion (~15KB savings)
// 2. Memoized components prevent re-renders
// 3. Image loading states with skeletons
// 4. Geo-blocking support
// 5. ⭐ PREFETCH ON HOVER - Like Stake.com for instant game loading
// 6. Responsive grid layout

import React, { useRef, useState, useEffect, useCallback, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGeoStore } from "../../store/useGeoStore";
import { prefetchGame } from "../../services/gamePrefetchService";

// =============================================================================
// PLAY BUTTON SVG - Memoized (exact SVG from original)
// =============================================================================
const PlayButtonSVG = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="54"
    height="59"
    viewBox="0 0 54 59"
    fill="none"
  >
    <g filter="url(#filter0_d_8546_318)">
      <path
        d="M12.1624 1.12451C7.65462 -1.51293 4 0.647693 4 5.94654V45.0497C4 50.3539 7.65462 52.5117 12.1624 49.8767L45.6704 30.2758C50.1797 27.6374 50.1797 23.3629 45.6704 20.7251L12.1624 1.12451Z"
        fill="#E1E1E1"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_8546_318"
        x="0"
        y="0"
        width="53.0522"
        height="59.0001"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_8546_318"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_8546_318"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
));

PlayButtonSVG.displayName = "PlayButtonSVG";

// =============================================================================
// GEO BLOCK OVERLAY - Memoized (matches original SlotsSection premium UI)
// =============================================================================
const GeoBlockOverlay = memo(({ variant = "default" }) => {
  if (variant === "premium") {
    return (
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[3px] flex flex-col items-center justify-center gap-3 px-3 z-10">
        <img
          src="/icons/geo-locked.svg"
          alt="locked"
          className="w-14 h-14 opacity-90 animate-pulse"
          loading="lazy"
        />
        <p className="text-white text-sm font-semibold tracking-wide text-center">
          Not available in your region
        </p>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
      <div className="text-center">
        <div className="text-3xl mb-2">🔒</div>
        <p className="text-xs text-white">Not available in your region</p>
      </div>
    </div>
  );
});

GeoBlockOverlay.displayName = "GeoBlockOverlay";

// =============================================================================
// SKELETON CARD - Loading state
// =============================================================================
const SkeletonCard = memo(() => (
  <div className="flex-shrink-0 animate-pulse">
    <div className="relative rounded-xl overflow-hidden border border-white/10">
      <div className="relative w-full aspect-[18/12] bg-white/10 rounded-xl" />
    </div>
    <div className="mt-2 h-4 bg-white/10 rounded w-3/4" />
    <div className="mt-1 h-3 bg-white/5 rounded w-1/2" />
  </div>
));

SkeletonCard.displayName = "SkeletonCard";

// =============================================================================
// GAME CARD - Memoized with PREFETCH ON HOVER ⭐
// =============================================================================
const GameCard = memo(({ game, onPlay, isBlocked, geoVariant }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback((e) => {
    e.target.onerror = null;
    setImageError(true);
    setImageLoaded(true);
  }, []);

  const handleClick = useCallback(() => {
    if (isBlocked) {
      toast.error("This game is blocked in your region.");
      return;
    }
    onPlay(game);
  }, [game, isBlocked, onPlay]);

  // ⭐ PREFETCH ON HOVER - Like Stake.com!
  // When user hovers, we prefetch game data so clicking is instant
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);

    // Prefetch game data when user hovers (before they click!)
    // This makes navigation instant because data is already cached
    if (game.slug && !isBlocked) {
      prefetchGame(game.slug);
    }
  }, [game.slug, isBlocked]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      className="group cursor-pointer flex-shrink-0 game-card-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Card Container */}
      <div className="relative rounded-xl overflow-hidden border border-white/10 transition-all duration-300">
        {/* Image Container */}
        <div className="relative w-full aspect-[18/12] flex items-center justify-center overflow-hidden rounded-xl">
          {/* Image Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-white/10 animate-pulse rounded-xl" />
          )}

          {/* Game Image with hover scale effect */}
          <img
            src={imageError ? "/images/game-placeholder.png" : game.image}
            alt={game.name}
            className={`w-full h-full object-cover rounded-xl transition-transform duration-300 ${
              isHovered ? "scale-110" : "scale-100"
            } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />

          {/* Geo Block Overlay */}
          {isBlocked && <GeoBlockOverlay variant={geoVariant} />}
        </div>

        {/* Play Overlay */}
        {!isBlocked && (
          <div
            className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
              isHovered ? "opacity-100 pointer-events-auto" : "opacity-0"
            }`}
            style={{
              background: "rgba(40, 39, 83, 0.50)",
              backdropFilter: "blur(2px)",
            }}
          >
            <button
              onClick={handleClick}
              className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-white font-semibold text-sm sm:text-base shadow-lg transition-all duration-300 ${
                isHovered ? "scale-100 opacity-100" : "scale-80 opacity-0"
              }`}
            >
              <PlayButtonSVG />
            </button>
          </div>
        )}
      </div>

      {/* Game Title + Provider */}
      {/* <div className="mt-2 text-sm font-semibold truncate text-white">
        {game.name || "Game"}
      </div>
      <div className="text-xs text-white/50 truncate">
        {game.provider || "Moonbet Originals"}
      </div> */}
    </div>
  );
});

GameCard.displayName = "GameCard";

// =============================================================================
// SCROLL ARROWS - Memoized
// =============================================================================
const ScrollArrows = memo(({ canScrollLeft, canScrollRight, onScroll }) => (
  <div className="flex items-center gap-2">
    <button
      onClick={() => onScroll("left")}
      disabled={!canScrollLeft}
      className={`view_btn w-8 h-8 flex items-center justify-center rounded-md transition-all duration-300 ${
        canScrollLeft
          ? "bg-white/10 hover:bg-white/20 text-white hover:scale-110 active:scale-90"
          : "bg-white/5 text-gray-600 cursor-not-allowed"
      }`}
      aria-label="Scroll left"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>

    <button
      onClick={() => onScroll("right")}
      disabled={!canScrollRight}
      className={`view_btn w-8 h-8 flex items-center justify-center rounded-md transition-all duration-300 ${
        canScrollRight
          ? "bg-white/10 hover:bg-white/20 text-white hover:scale-110 active:scale-90"
          : "bg-white/5 text-gray-600 cursor-not-allowed"
      }`}
      aria-label="Scroll right"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  </div>
));

ScrollArrows.displayName = "ScrollArrows";

// =============================================================================
// SECTION HEADER - Memoized
// =============================================================================
const SectionHeader = memo(({ icon, title, viewAllPath, canScrollLeft, canScrollRight, onScroll, onViewAll }) => (
  <div className="flex justify-between items-center mb-1">
    <div className="flex items-center gap-3">
      {icon && (
        <span className="text-2xl section-icon-animate">
          {icon}
        </span>
      )}
      <h3 className="font-[400] text-[14px] md:text-[18px] leading-[44px] font-['Neuropolitical'] not-italic uppercase text-white">
        {title}
      </h3>
    </div>

    <div className="flex items-center gap-2">
      {/* View All Button */}
      <button
        onClick={onViewAll}
        className="view_btn hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          fontFamily: "Neue Plak",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "24px",
          textTransform: "capitalize",
          background: "#282753",
          padding: "4px 10px",
        }}
      >
        All
      </button>

      {/* Arrow Buttons */}
      <ScrollArrows
        canScrollLeft={canScrollLeft}
        canScrollRight={canScrollRight}
        onScroll={onScroll}
      />
    </div>
  </div>
));

SectionHeader.displayName = "SectionHeader";

// =============================================================================
// MAIN GAME CAROUSEL COMPONENT
// =============================================================================
const GameCarousel = ({
  games = [],
  loading = false,
  title = "Games",
  icon = null,
  viewAllPath = "/casino",
  geoVariant = "default",
}) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const navigate = useNavigate();
  const { isProviderBlocked } = useGeoStore();

  // Check scroll position
  const checkScrollPosition = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    const tolerance = 5;

    setCanScrollLeft(scrollLeft > tolerance);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - tolerance);
  }, []);

  // Check device type
  useEffect(() => {
    const checkDevice = () => {
      setIsMobileDevice(window.innerWidth <= 768);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Setup scroll listeners
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || games.length === 0) return;

    container.addEventListener("scroll", checkScrollPosition, { passive: true });
    window.addEventListener("resize", checkScrollPosition);

    // Initial check after layout
    const timeout = setTimeout(checkScrollPosition, 300);

    return () => {
      container.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
      clearTimeout(timeout);
    };
  }, [games, checkScrollPosition]);

  // Scroll handler
  const handleScroll = useCallback((direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 640;
    const scrollAmount = isMobile ? container.clientWidth : 300;

    const targetScroll =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });

    setTimeout(checkScrollPosition, 400);
  }, [checkScrollPosition]);

  // Play handler
  const handlePlayNow = useCallback((game) => {
    if (!game.slug && !game.uuid) {
      console.error("❌ No slug or uuid found for game:", game);
      return;
    }
    navigate(`/game/${game.slug || game.uuid}`);
  }, [navigate]);

  // View All handler
  const handleViewAll = useCallback(() => {
    navigate(viewAllPath);
  }, [navigate, viewAllPath]);

  // Filter games based on device type
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const isMobileFlag =
        game.is_mobile === true ||
        game.is_mobile === "true" ||
        game.is_mobile === 1;

      if (isMobileDevice) {
        return isMobileFlag;
      } else {
        return (
          game.is_mobile === false ||
          game.is_mobile === "false" ||
          game.is_mobile === 0 ||
          typeof game.is_mobile === "undefined"
        );
      }
    });
  }, [games, isMobileDevice]);

  // Skeleton count for loading state
  const skeletonCount = useMemo(() => (isMobileDevice ? 3 : 6), [isMobileDevice]);

  return (
    <section className="w-full relative section-fade-in">
      <div className="container max-w-7xl mx-auto px-4 md:py-5 py-5">
        {/* Header */}
        <SectionHeader
          icon={icon}
          title={title}
          viewAllPath={viewAllPath}
          canScrollLeft={canScrollLeft}
          canScrollRight={canScrollRight}
          onScroll={handleScroll}
          onViewAll={handleViewAll}
        />

        {/* Content */}
        {loading ? (
          <div className="text-center text-gray-400 py-10">
            Loading games...
          </div>
        ) : (
          <div className="relative">
            {/* Games Grid */}
            <div
              ref={scrollContainerRef}
              className="grid grid-flow-col auto-cols-[calc(100%/3-12px)] sm:auto-cols-[calc(100%/6-12px)] gap-3 overflow-x-auto overflow-y-hidden scrollbar-hide"
              style={{
                WebkitOverflowScrolling: "touch",
                overscrollBehaviorX: "contain",
              }}
            >
              {filteredGames.length === 0 ? (
                [...Array(skeletonCount)].map((_, i) => (
                  <SkeletonCard key={`skeleton-${i}`} />
                ))
              ) : (
                filteredGames.map((game) => (
                  <GameCard
                    key={game.uuid || game.slug || `game-${game.name}`}
                    game={game}
                    onPlay={handlePlayNow}
                    isBlocked={isProviderBlocked(game.provider)}
                    geoVariant={geoVariant}
                  />
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .section-fade-in {
          animation: sectionFadeIn 0.5s ease-out;
        }

        @keyframes sectionFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .section-icon-animate {
          animation: iconRotateIn 0.6s ease-out 0.2s both;
        }

        @keyframes iconRotateIn {
          from {
            transform: rotate(-180deg);
            opacity: 0;
          }
          to {
            transform: rotate(0deg);
            opacity: 1;
          }
        }

        .game-card-wrapper {
          animation: cardFadeIn 0.6s ease-out both;
        }

        @keyframes cardFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Staggered animation for cards */
        .game-card-wrapper:nth-child(1) { animation-delay: 0.1s; }
        .game-card-wrapper:nth-child(2) { animation-delay: 0.15s; }
        .game-card-wrapper:nth-child(3) { animation-delay: 0.2s; }
        .game-card-wrapper:nth-child(4) { animation-delay: 0.25s; }
        .game-card-wrapper:nth-child(5) { animation-delay: 0.3s; }
        .game-card-wrapper:nth-child(6) { animation-delay: 0.35s; }
        .game-card-wrapper:nth-child(n+7) { animation-delay: 0.4s; }

        /* Card hover effect */
        .game-card-wrapper:hover {
          transform: scale(1.02);
        }

        .game-card-wrapper {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .scale-80 {
          transform: scale(0.8);
        }
      `}</style>
    </section>
  );
};

export default memo(GameCarousel);