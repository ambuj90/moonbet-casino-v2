// src/pages/Homepage.jsx - OPTIMIZED VERSION
// Performance improvements:
// 1. Lazy loading for below-fold sections
// 2. Intersection Observer for deferred rendering
// 3. Suspense boundaries with skeleton fallbacks
// 4. Code splitting per section

import React, { Suspense, lazy, memo, useRef, useEffect, useState } from "react";

// ============================================================================
// CRITICAL ABOVE-FOLD SECTIONS (Load immediately - first paint)
// ============================================================================
import HomeRewardsSection from "../components/sections/HomeRewardsSection";
import HeroSection from "../components/sections/HeroSection";
import CasinoGameCards from "../components/sections/Casinogamecards";

// ============================================================================
// LAZY LOADED BELOW-FOLD SECTIONS (Load on demand)
// ============================================================================
const RecentSection = lazy(() => import("../components/sections/RecentSection"));
const RecommendedSection = lazy(() => import("../components/sections/RecommendedSection"));
const SlotsSection = lazy(() => import("../components/sections/SlotsSection"));
const LiveCasino = lazy(() => import("../components/sections/LiveCasino"));
const ProvidersSection = lazy(() => import("../components/sections/ProvidersSection"));
const GameBetsSection = lazy(() => import("../components/sections/GameBetsSection"));
const HomeFAQSection = lazy(() => import("../components/sections/HomeFAQSection"));
const BrandSection = lazy(() => import("../components/sections/brandSection"));
const CryptoPaymentSection = lazy(() => import("../components/sections/CryptoPaymentSection"));

// ============================================================================
// SKELETON LOADERS (Lightweight placeholders)
// ============================================================================
const GameSectionSkeleton = memo(() => (
  <div className="w-full py-4 px-4 animate-pulse">
    <div className="max-w-7xl mx-auto">
      <div className="h-6 w-32 bg-white/5 rounded mb-4" />
      <div className="flex gap-3 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-[calc(100%/3-12px)] sm:w-[calc(100%/6-12px)]">
            <div className="aspect-[18/12] bg-white/5 rounded-xl" />
            <div className="h-4 w-20 bg-white/5 rounded mt-2" />
            <div className="h-3 w-16 bg-white/5 rounded mt-1" />
          </div>
        ))}
      </div>
    </div>
  </div>
));
GameSectionSkeleton.displayName = "GameSectionSkeleton";

const ProvidersSkeleton = memo(() => (
  <div className="w-full py-6 px-4 animate-pulse">
    <div className="max-w-7xl mx-auto">
      <div className="h-6 w-32 bg-white/5 rounded mb-6" />
      <div className="flex gap-4 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-[140px] h-[60px] bg-white/5 rounded-lg" />
        ))}
      </div>
    </div>
  </div>
));
ProvidersSkeleton.displayName = "ProvidersSkeleton";

const BetsSkeleton = memo(() => (
  <div className="w-full py-6 px-4 animate-pulse">
    <div className="max-w-7xl mx-auto">
      <div className="h-10 w-48 bg-white/5 rounded-full mb-6" />
      <div className="bg-[#1C1D49] rounded-xl p-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-white/5 rounded-lg mb-2" />
        ))}
      </div>
    </div>
  </div>
));
BetsSkeleton.displayName = "BetsSkeleton";

const MinimalSkeleton = memo(() => (
  <div className="w-full py-4 animate-pulse">
    <div className="max-w-7xl mx-auto px-4">
      <div className="h-16 bg-white/5 rounded-xl" />
    </div>
  </div>
));
MinimalSkeleton.displayName = "MinimalSkeleton";

// ============================================================================
// INTERSECTION OBSERVER HOOK (Load when visible)
// ============================================================================
const useIntersectionObserver = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Once visible, stay visible (don't unload)
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px", // Start loading 100px before visible
        threshold: 0,
        ...options,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

// ============================================================================
// LAZY SECTION WRAPPER (Only render when in/near viewport)
// ============================================================================
const LazySection = memo(({ children, fallback, rootMargin = "100px" }) => {
  const [ref, isVisible] = useIntersectionObserver({ rootMargin });

  return (
    <div ref={ref} style={{ minHeight: isVisible ? "auto" : "100px" }}>
      {isVisible ? (
        <Suspense fallback={fallback}>{children}</Suspense>
      ) : (
        fallback
      )}
    </div>
  );
});
LazySection.displayName = "LazySection";

// ============================================================================
// HOMEPAGE COMPONENT
// ============================================================================
const Homepage = () => {
  return (
    <div className="min-h-screen bg-[#0D0E36]">
      {/* ====== CRITICAL PATH - Above fold (immediate render) ====== */}
      <HomeRewardsSection />
      <HeroSection />
      <CasinoGameCards />

      {/* ====== DEFERRED PATH - Below fold (lazy + intersection) ====== */}
      
      {/* Game Sections - High priority (user likely to scroll here) */}
      <LazySection 
        fallback={<GameSectionSkeleton />} 
        rootMargin="200px"
      >
        <RecentSection />
      </LazySection>

      <LazySection 
        fallback={<GameSectionSkeleton />} 
        rootMargin="150px"
      >
        <RecommendedSection />
      </LazySection>

      <LazySection 
        fallback={<GameSectionSkeleton />} 
        rootMargin="150px"
      >
        <SlotsSection />
      </LazySection>

      <LazySection 
        fallback={<GameSectionSkeleton />} 
        rootMargin="150px"
      >
        <LiveCasino />
      </LazySection>

      {/* Secondary Sections - Medium priority */}
      <LazySection 
        fallback={<ProvidersSkeleton />} 
        rootMargin="100px"
      >
        <ProvidersSection />
      </LazySection>

      <LazySection 
        fallback={<BetsSkeleton />} 
        rootMargin="100px"
      >
        <GameBetsSection />
      </LazySection>

      {/* Low Priority Sections - Load last */}
      <LazySection 
        fallback={<MinimalSkeleton />} 
        rootMargin="50px"
      >
        <HomeFAQSection />
      </LazySection>

      <LazySection 
        fallback={<MinimalSkeleton />} 
        rootMargin="50px"
      >
        <BrandSection />
      </LazySection>

      <LazySection 
        fallback={<MinimalSkeleton />} 
        rootMargin="50px"
      >
        <CryptoPaymentSection />
      </LazySection>
    </div>
  );
};

export default memo(Homepage);