import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const GlobalSearchPopup = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const load = setTimeout(async () => {
      try {
        const { data } = await axios.get(`/wallet-service/api/games?name=${query}`);
        setResults(data?.data || []);
      } catch {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(load);
  }, [query]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[99999]  flex items-center justify-center "
        style={{
        backgroundColor: "rgba(13, 14, 54, 0.30)",
        backdropFilter: "blur(25px)",
        WebkitBackdropFilter: "blur(25px)",
      }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Modal Box */}
        <motion.div
          className="w-full max-w-3xl rounded-2xl p-6 mx-4 max-h-[80vh] overflow-y-auto"
          style={{
              background:
                "linear-gradient(137deg, rgb(201 201 201 / 26%) 1.57%, rgba(196, 196, 196, 0.1) 100%)",
            }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER INPUT */}
          <div className="flex items-center gap-3 border border-white/10 rounded-xl px-4 py-3 bg-[#17172f]">
            <img src="/icons/search.svg" className="w-6 opacity-70" />

            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search games, providers..."
              className="w-full bg-transparent outline-none text-white text-lg"
            />

            <button onClick={onClose}>
              <img src="/icons/logo.svg" className="w-20 opacity-70" />
            </button>
          </div>

          {/* TABS - Casino, Sports, Esports */}
          <div className="flex gap-2 mt-4">
            {["Casino", "Live Dealer", "Slots"].map((tab) => (
              <button
                key={tab}
                className="px-4 py-2 rounded-full bg-[#23234a] text-white text-sm hover:bg-[#2f2f61]"
              >
                {tab}
              </button>
            ))}
          </div>

          {/* RESULTS */}
          <div className="mt-6 min-h-[200px]">
            {results.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <img src="/icons/searchicon.png" className="w-40 mx-auto mb-4 opacity-70" />
                <p className="text-xl font-semibold">No games matched your search</p>
                <p className="opacity-60 mt-1">Try another keyword</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {results.map((g) => (
                  <div key={g.uuid} className="rounded-lg bg-[#1f1f3d] p-2">
                    <a href={`/game/${g.uuid}`} className="block hover:opacity-80 transition-opacity">
                      <img src={g.image} className="w-full rounded-lg" />
                      <p className="text-white text-center text-sm mt-2">{g.name}</p>
                      <p className="text-gray-400 text-center text-xs">{g.provider}</p>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GlobalSearchPopup;
