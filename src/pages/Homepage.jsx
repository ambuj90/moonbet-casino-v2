// src/pages/Homepage.jsx
import React from "react";
import HeroSection from "../components/sections/HeroSection";
import HomeRewardsSection from "../components/sections/HomeRewardsSection";
import HomeFAQSection from "../components/sections/HomeFAQSection";
// import SlotsSection from "../components/sections/SlotsSection";
import GameBetsSection from "../components/sections/GameBetsSection";

// import LiveCasino from "../components/sections/LiveCasino";
import ProvidersSection from "../components/sections/ProvidersSection";
import CryptoPaymentSection from "../components/sections/CryptoPaymentSection";
// import VipMoonSection from "../components/sections/VipMoonSection";
import TrustBadges from "../components/sections/TrustBadges";
import CircularWheel from "../components/circular/CircularWheel";
import SlotsSection from "../components/sections/SlotsSection";
import LiveCasino from "../components/sections/LiveCasino";
import RecommendedSection from "../components/sections/RecommendedSection";
import RecentSection from "../components/sections/RecentSection";
import CasinoGamesSection from "../components/sections/CasinoCategorySection";
import BrandSection from "../components/sections/brandSection";
import AwardSection from "../components/sections/awardSection";
import TruestedSection from "../components/sections/TrustedSection";
import CasinoCategorySection from "../components/sections/CasinoCategorySection";
import CasinoGameCards from "../components/sections/Casinogamecards";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-[#080808]">
      <HomeRewardsSection />
      <HeroSection />
      {/* <CasinoCategorySection /> */}
      <CasinoGameCards />
      {/* <RecommendedSection />
      <SlotsSection />
      <LiveCasino /> */}
      <RecentSection />
      <RecommendedSection />
      <SlotsSection />
      <LiveCasino />
      {/* <CircularWheel /> */}
      <ProvidersSection />
      <BrandSection />
      <GameBetsSection />
      <HomeFAQSection />
      {/* <AwardSection /> */}
    </div>
  );
};

// IMPORTANT: Default export
export default Homepage;
