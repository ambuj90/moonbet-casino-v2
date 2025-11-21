// src/pages/ProvidersPage.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import GameGrid from "../components/providers/GameGrid";

const providers = [
  { id: 1, name: "Pragmatic Play", logo: "/providers/vector1.svg" },
  { id: 2, name: "Evolution", logo: "/providers/evolution.svg" },
  { id: 3, name: "BGaming", logo: "/providers/bgaming.svg" },
  { id: 4, name: "Hacksaw Gaming", logo: "/providers/hacksaw.svg" },
  { id: 5, name: "Thunderkick", logo: "/providers/thunderkick.svg" },
  { id: 6, name: "Play'n GO", logo: "/providers/playngo.svg" },
  { id: 7, name: "Spribe", logo: "/providers/spribe.svg" },
  { id: 8, name: "Endorphina", logo: "/providers/endorphina.svg" },
  { id: 9, name: "3oaks", logo: "/providers/3oaks.svg" },
  { id: 10, name: "Nolimit", logo: "/providers/nolimit.svg" },
];

// Convert name <-> slug
const nameToSlug = (name) => name.replace(/\s+/g, "-").toLowerCase();
const slugToName = (slug) =>
  slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

const ProvidersPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const providerName = slug ? slugToName(slug) : null;

  // ⭐ Works like category pages (game providers)
  const handleProviderClick = (name) => {
    navigate(`/providers/${nameToSlug(name)}`);
  };

  return (
    <section className="w-full py-10">
      <div className="container max-w-7xl mx-auto px-4">
        
        {/* Header */}
        {!providerName && (
          <motion.h3
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#CED5E3] text-[18px] font-[400] uppercase mb-8"
          >
            Providers
          </motion.h3>
        )}

        {/* =============== SHOW PROVIDER GRID WHEN NO SLUG =============== */}
        {!providerName && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {providers.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleProviderClick(p.name)}
                className="cursor-pointer bg-[#080808]/20 flex items-center justify-center p-1 hover:bg-white/5 transition-all duration-300"
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-w-[100px] max-h-[50px] object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* =============== SHOW GAME GRID WHEN SLUG EXISTS =============== */}
        {providerName && (
          <div className="mt-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {providers.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleProviderClick(p.name)}
                className="view_btn cursor-pointer bg-[#080808]/20 flex items-center justify-center p-1 hover:bg-white/5 transition-all duration-300"
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-w-[100px] max-h-[50px] object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                />
              </motion.div>
            ))}
          </div>

            {/* Games */}
            <GameGrid provider={providerName} />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProvidersPage;
