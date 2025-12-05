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
import SlotsSection from "../components/sections/SlotsSection";
import LiveCasino from "../components/sections/LiveCasino";
import RecommendedSection from "../components/sections/RecommendedSection";
import RecentSection from "../components/sections/RecentSection";
import BrandSection from "../components/sections/brandSection";
import TruestedSection from "../components/sections/TrustedSection";
import CasinoGameCards from "../components/sections/Casinogamecards";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-[#0D0E36] ">
      <HomeRewardsSection />
      <HeroSection />
      <CasinoGameCards />
      <RecentSection />
      <RecommendedSection />
      <SlotsSection />
      <LiveCasino />
      <ProvidersSection />
      <GameBetsSection />
      <HomeFAQSection />
      {/* <TruestedSection /> */}
      <BrandSection />
      <CryptoPaymentSection />
    </div>
  );
};

// IMPORTANT: Default export
export default Homepage;
