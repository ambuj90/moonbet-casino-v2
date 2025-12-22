import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSeo } from "../utils/SEO";

import HeroSection from "../components/sections/HeroSection";
import HomeRewardsSection from "../components/sections/HomeRewardsSection";
import CasinoCategoryNav from "../components/casino/CasinoCategoryNav";
import GameGrid from "../components/casino";
import ProvidersSection from "../components/sections/ProvidersSection";
import HomeFAQSection from "../components/sections/HomeFAQSection";
import CryptoPaymentSection from "../components/sections/CryptoPaymentSection";
import TrustBadgesFinal from "../components/sections/TrustBadges";

const Casino = () => {
  const { category } = useParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const [filter, setFilter] = useState("trending");
  const [searchTerm, setSearchTerm] = useState("");

  useSeo({
    title: "Moonbet Casino – Play Provably Fair Crypto Games",
    description:
      "Discover Moonbet Casino – your decentralized hub for provably fair games. Play slots, blackjack, and exclusive Moonbet originals using Solana and crypto.",
    keywords:
      "Moonbet Casino, crypto casino, Solana games, provably fair, blackjack, slots, decentralized gaming",
    ogImage: "/home-assets/share-image.png",
    ogUrl: "https://moonbet.games/casino",
  });

  useEffect(() => {
    setActiveCategory(category || "all");
  }, [category]);

  return (
    <div className="min-h-screen">
      <HeroSection />

      <CasinoCategoryNav
        selectedCategory={activeCategory}
        setSelectedCategory={setActiveCategory}
        selectedFilter={filter}
        setSelectedFilter={setFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <GameGrid type={activeCategory} filter={filter} searchTerm={searchTerm} />
      <ProvidersSection />
      <HomeFAQSection />
    </div>
  );
};

export default Casino;
