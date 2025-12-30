// src/pages/Casino.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import HeroSection from "../components/sections/HeroSection";
import HomeRewardsSection from "../components/sections/HomeRewardsSection";
import CasinoCategoryNav from "../components/casino/CasinoCategoryNav";
import GameGrid from "../components/casino"; // your grid component
import ProvidersSection from "../components/sections/ProvidersSection";
import HomeFAQSection from "../components/sections/HomeFAQSection";
import CryptoPaymentSection from "../components/sections/CryptoPaymentSection";
import TrustBadgesFinal from "../components/sections/TrustBadges";

const Casino = () => {
  const { category } = useParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const [filter, setFilter] = useState("trending");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudio, setSelectedStudio] = useState("all");
  
  // ⭐ Advanced filters state from FiltersPanel
  const [advancedFilters, setAdvancedFilters] = useState({
    quickPicks: [],
    gameTypes: [],
    themes: [],
    providers: [],
    volatility: 50,
  });

  // ⭐ Handle URL changes - batched state updates
  useEffect(() => {
    const newCategory = category || "all";
    setActiveCategory(newCategory);
    setSelectedStudio("all"); // Reset studio when category changes
  }, [category]);

  // ⭐ Handle filters from FiltersPanel
  const handleApplyFilters = (filters) => {
    console.log("Applied filters:", filters);
    setAdvancedFilters(filters);
    
    // If providers selected in advanced filters, update selectedStudio
    if (filters.providers && filters.providers.length > 0) {
      setSelectedStudio(filters.providers[0]); // Use first selected provider
    }
    
    // If game types selected, update category
    if (filters.gameTypes && filters.gameTypes.length > 0) {
      setActiveCategory(filters.gameTypes[0]); // Use first selected game type
    }
    
    // If quick picks include sorting options, update filter
    if (filters.quickPicks.includes('trending')) {
      setFilter('trending');
    } else if (filters.quickPicks.includes('new')) {
      setFilter('new');
    } else if (filters.quickPicks.includes('hot')) {
      setFilter('hot');
    }
  };

  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>Moonbet Casino — Play Provably Fair Crypto Games</title>
        <meta
          name="description"
          content="Discover Moonbet Casino — your decentralized hub for provably fair games. Play slots, blackjack, and exclusive Moonbet originals using Solana and crypto."
        />
        <meta
          name="keywords"
          content="Moonbet Casino, crypto casino, Solana games, provably fair, blackjack, slots, decentralized gaming"
        />
        <meta
          property="og:title"
          content="Moonbet Casino — Play Provably Fair Crypto Games"
        />
        <meta
          property="og:description"
          content="Experience the thrill of blockchain-powered gaming. Moonbet offers transparent, provably fair crypto casino games built on Solana."
        />
        <meta property="og:image" content="/home-assets/share-image.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://moonbet.games/casino" />
      </Helmet>
      <div className="min-h-screen">
        <HeroSection />

        {/* pass handlers & state */}
        <CasinoCategoryNav
          selectedCategory={activeCategory}
          setSelectedCategory={setActiveCategory}
          selectedFilter={filter}
          setSelectedFilter={setFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedStudio={selectedStudio}
          setSelectedStudio={setSelectedStudio}
          onApplyFilters={handleApplyFilters}
        />

        {/* dynamic data grid - now includes advanced filters */}
        <GameGrid
          type={activeCategory}
          filter={filter}
          searchTerm={searchTerm}
          provider={selectedStudio}
          advancedFilters={advancedFilters}
        />
        <ProvidersSection />
        <HomeFAQSection />
      </div>
    </>
  );
};

export default Casino;