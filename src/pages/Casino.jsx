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

  useEffect(() => {
    setActiveCategory(category || "all");
  }, [category]);

  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>Moonbet Casino – Play Provably Fair Crypto Games</title>
        <meta
          name="description"
          content="Discover Moonbet Casino – your decentralized hub for provably fair games. Play slots, blackjack, and exclusive Moonbet originals using Solana and crypto."
        />
        <meta
          name="keywords"
          content="Moonbet Casino, crypto casino, Solana games, provably fair, blackjack, slots, decentralized gaming"
        />
        <meta
          property="og:title"
          content="Moonbet Casino – Play Provably Fair Crypto Games"
        />
        <meta
          property="og:description"
          content="Experience the thrill of blockchain-powered gaming. Moonbet offers transparent, provably fair crypto casino games built on Solana."
        />
        <meta property="og:image" content="/home-assets/share-image.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://moonbet.games/casino" />
      </Helmet>
      <div className="min-h-screen  ">
        <HomeRewardsSection />
        <HeroSection />

        {/* pass handlers & state */}
        <CasinoCategoryNav
          selectedCategory={activeCategory}
          setSelectedCategory={setActiveCategory}
          selectedFilter={filter}
          setSelectedFilter={setFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* dynamic data grid */}
        <GameGrid
          type={activeCategory}
          filter={filter}
          searchTerm={searchTerm}
        />
        <ProvidersSection />
        <HomeFAQSection />
        <CryptoPaymentSection />
        <TrustBadgesFinal />
      </div>
    </>
  );
};

export default Casino;
