// src/pages/ProvidersPage.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import GameGrid from "../components/providers/GameGrid";

// ⭐ All providers added
const providers = [
  { id: 1, name: "PragmaticPlay", logo: "/providers/vector1.svg" },
  { id: 2, name: "Evolution Gaming", logo: "/providers/evolution.svg" },
  { id: 3, name: "BGaming", logo: "/providers/bgaming.svg" },
  { id: 5, name: "Hacksaw Gaming", logo: "/providers/hacksaw.svg" },
  { id: 6, name: "Thunderkick", logo: "/providers/thunderkick.svg" },
  { id: 7, name: "Play'n GO", logo: "/providers/playngo.svg" },
  { id: 8, name: "Spribe", logo: "/providers/spribe.svg" },
  { id: 9, name: "Endorphina", logo: "/providers/endorphina.svg" },
  { id: 10, name: "3 Oaks", logo: "/providers/3oaks.svg" },
  { id: 11, name: "Nolimit City", logo: "/providers/nolimit.svg" },
  { id: 12, name: "NetEnt", logo: "/providers/netent.svg" },
  { id: 13, name: "Playson", logo: "/providers/Playson.svg" },
  { id: 14, name: "Red Tiger", logo: "/providers/red-tiger.svg" },
  { id: 15, name: "Relax Gaming", logo: "/providers/relax-gaming.svg" },
  { id: 16, name: "SmartSoft Gaming", logo: "/providers/smartsoft-gaming.svg" },
  { id: 17, name: "Evoplay", logo: "/providers/evoplay.svg" },
  { id: 18, name: "Avatar UX", logo: "/providers/avatar ux.svg" },
  { id: 19, name: "Zillion", logo: "/providers/Zillion.svg" },
];

// Convert name <-> slug
const nameToSlug = (name) => name.replace(/\s+/g, "-").toLowerCase();
const slugToName = (slug) =>
  slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

// Region Restriction Popup Component
const RegionRestrictionPopup = ({
  isOpen,
  onClose,
  providerName,
  regionCode = "IN",
}) => {
  const navigate = useNavigate();

  const handleExploreGames = () => {
    onClose();
    navigate("/");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={onClose}
          >
            {/* Blur overlay */}
            <div className="absolute inset-0 bg-[#0a0a1a]/80 backdrop-blur-sm" />

            {/* Popup Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-[90%] max-w-[480px] mx-4"
            >
              {/* Popup Box */}
              <div
                className="relative rounded-2xl px-6 py-8 sm:px-10 sm:py-10 text-center"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(35, 37, 79, 0.95) 0%, rgba(28, 29, 63, 0.98) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow:
                    "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)",
                }}
              >
                {/* Restricted Icon */}
                <div className="flex justify-center mb-5">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14">
                    {/* Circle */}
                    <svg
                      viewBox="0 0 56 56"
                      fill="none"
                      className="w-full h-full"
                    >
                      {/* Outer circle */}
                      <circle
                        cx="28"
                        cy="28"
                        r="24"
                        stroke="#E57373"
                        strokeWidth="3"
                        fill="none"
                      />
                      {/* Diagonal line */}
                      <line
                        x1="14"
                        y1="42"
                        x2="42"
                        y2="14"
                        stroke="#E57373"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <h2
                  className="text-white text-xl sm:text-2xl md:text-[26px] font-bold mb-3 leading-tight"
                  style={{
                    fontFamily: "Neuropolitical, sans-serif",
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  Game not Found for this Provider !!
                </h2>

                {/* Subtitle */}
                <p
                  className="text-[#9ca3af] text-sm sm:text-[15px] mb-8 leading-relaxed"
                  style={{ fontFamily: "Neue Plak, sans-serif" }}
                >
                  Provider{" "}
                  <span className="text-white font-medium uppercase">
                    {providerName}
                  </span>{" "}
                  is restricted in your region ({regionCode})
                </p>

                {/* Explore Button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleExploreGames}
                  className="relative w-full max-w-[340px] mx-auto overflow-hidden rounded-full cursor-pointer"
                >
                  {/* Button background with gradient */}
                  <div className="trust_btn view_moon_btn relative px-8 py-3.5 sm:py-4">
                    {/* Top highlight */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[1px]"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
                      }}
                    />

                    {/* Button text */}
                    <span
                      className="relative z-10 text-white text-sm sm:text-[15px] font-semibold tracking-wide"
                      style={{
                        fontFamily: "Neue Plak, sans-serif",
                        textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      Explore other games
                    </span>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ProvidersPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const providerName = slug ? slugToName(slug) : null;

  // Popup state
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  // Handle provider click - open popup
  const handleProviderClick = (name) => {
    setSelectedProvider(name);
    setIsPopupOpen(true);
  };

  // Close popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedProvider(null);
  };

  return (
    <section className="w-full py-10">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Title when no provider selected */}
        {!providerName && (
          <motion.h3
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[18px] font-[400] uppercase mb-8"
          >
            Providers
          </motion.h3>
        )}

        {/* ---------------------- PROVIDERS GRID ---------------------- */}
        {!providerName && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {providers.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleProviderClick(p.name)}
                className="trust_btn cursor-pointer bg-white/0 hover:bg-white/5 transition-all rounded-xl flex items-center justify-center p-2"
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-w-[100px] max-h-[55px] object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* ---------------------- PROVIDER PAGE + GAMES ---------------------- */}
        {providerName && (
          <div className="mt-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6 mb-10">
              {providers.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleProviderClick(p.name)}
                  className={`trust_btn cursor-pointer rounded-xl flex items-center justify-center p-1 transition-all ${
                    providerName === p.name
                      ? "bg-white/10 border border-white/20"
                      : "hover:bg-white/5"
                  }`}
                >
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="max-w-[100px] max-h-[55px] object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </motion.div>
              ))}
            </div>

            {/* GAME GRID */}
            <GameGrid provider={providerName} />
          </div>
        )}
      </div>

      {/* Region Restriction Popup */}
      <RegionRestrictionPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        providerName={selectedProvider}
        regionCode="IN"
      />
    </section>
  );
};

export default ProvidersPage;
