// src/pages/ProvidersPage.jsx
import React from "react";
import { motion } from "framer-motion";
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

const ProvidersPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const providerName = slug ? slugToName(slug) : null;

  // Navigate on click
  const handleProviderClick = (name) => {
    navigate(`/providers/${nameToSlug(name)}`);
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
                  className={`trust_btn  cursor-pointer rounded-xl flex items-center justify-center p-2 transition-all ${
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
    </section>
  );
};

export default ProvidersPage;
