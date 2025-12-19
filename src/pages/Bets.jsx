// src/pages/Bets.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import BonusProgressBar from "../components/bonus/BonusProgressBar";
import { useAuthStore } from "../store/useAuthStore";
import { useUserBonus } from "../hooks/useUserBonus";


const Bets = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("casino");
  const [bets, setBets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;
  const bonus = useUserBonus(userId, Boolean(userId));

  useEffect(() => {
  if (!userId) {
    console.log("⏳ Waiting for userId...");
    return;
  }
  console.log("✅ Fetching bets for user:", userId);

  const loadBets = async () => {
    try {
      setIsLoading(true);

      const res = await axios.get(
        `/wallet-service/api/games/bets/${userId}`
      );

      const apiBets = res.data.data.map((item, index) => ({
        id: `${index}`,
        game: item.game,
        amount: item.amount,
        multiplier: "-",
        payout: item.amount,
        status: item.type === "win" ? "win" : "loss",
        date: item.createdAt,
      }));

      setBets(apiBets);

    } catch (err) {
      console.error("Failed to load bets", err);
    } finally {
      setIsLoading(false);
    }
  };

  loadBets();
}, [userId]);

  // FILTER
  const filteredBets = bets.filter((bet) => {
    const q = searchQuery.toLowerCase();
    return (
      bet.id.toLowerCase().includes(q) || bet.game.toLowerCase().includes(q)
    );
  });

  // PAGINATION
  const totalPages = Math.ceil(filteredBets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBets = filteredBets.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // GAME ICON LOGIC (kept same)
  const getGameIcon = (game) => {
    const g = game.toLowerCase();
    if (g.includes("keno"))
      return (
        <div className="w-6 h-6 bg-blue-500/20 rounded flex-center">
          <span className="text-blue-400">🎯</span>
        </div>
      );
    if (g.includes("limbo"))
      return (
        <div className="w-6 h-6 bg-red-500/20 rounded flex-center">
          <span className="text-red-400">🔥</span>
        </div>
      );
    if (g.includes("dice"))
      return (
        <div className="w-6 h-6 bg-purple-500/20 rounded flex-center">
          <span className="text-purple-400">🎲</span>
        </div>
      );
    return (
      <div className="w-6 h-6 bg-orange-500/20 rounded flex-center">
        <span className="text-orange-400">🎰</span>
      </div>
    );
  };

  if (isLoading) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4 bg-[#0F102A]">
      <img
        src="/icons/moonlogo.gif"
        alt="Loading bets"
        className="w-20 h-20 md:w-36 md:h-36 object-contain"
      />
      <p className="text-sm md:text-base text-white/70 tracking-wide">
        Loading your bets...
      </p>
    </div>
  );
}

  return (
    <div className="min-h-screen md:py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ===== HEADER ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <p className="text-3xl font-bold text-white">Bets</p>
          <div className="w-full md:w-auto flex justify-end">
    <BonusProgressBar bonus={bonus} />
  </div>
        </motion.div>

        {/* ===== SEARCH ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search bet ID or game..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </motion.div>

        {/* ========================================================
           🟣 NEW BET TABLE — EXACT SAME LAYOUT REQUESTED
        ========================================================= */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl overflow-hidden border border-white/10 bg-[#1C1D49]"
        >
          {/* TABLE HEADER */}
          <div className="grid grid-cols-2 md:grid-cols-5 px-4 md:px-6 py-3">
            <div className="text-[#555594] text-xs uppercase tracking-wider">
              Game
            </div>
            <div className="hidden md:block text-[#555594] text-xs uppercase tracking-wider">
              ID
            </div>
            <div className="hidden md:block text-[#555594] text-xs uppercase tracking-wider text-center">
              Bet Amount
            </div>
            <div className="hidden md:block text-[#555594] text-xs uppercase tracking-wider text-center">
              Multiplier
            </div>
            <div className="text-[#555594] text-xs uppercase tracking-wider text-right">
              Payout
            </div>
          </div>

          {/* TABLE BODY */}
          <div>
            <AnimatePresence>
              {paginatedBets.map((bet, index) => (
                <motion.div
                  key={bet.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`grid grid-cols-2 md:grid-cols-5 px-4 md:px-6 py-3 items-center mx-4 ${
                    index % 2 === 0 ? "bg-[#282753] rounded-xl" : ""
                  }`}
                >
                  {/* Game Column */}
                  <div className="flex items-center text-white text-sm font-medium">
                    {getGameIcon(bet.game)}
                    <span className="ml-2">{bet.game}</span>
                  </div>

                  {/* ID */}
                  <div className="hidden md:block text-gray-300 text-sm">
                    {bet.id}
                  </div>

                  {/* Amount */}
                  <div className="hidden md:block text-white text-sm text-center">
                    {bet.amount}
                  </div>

                  {/* Multiplier */}
                  <div className="hidden md:block text-sm text-center text-gray-400">
                    {bet.multiplier}
                  </div>

                  {/* Payout */}
                  <div
                    className={`text-right text-sm font-semibold ${
                      bet.status === "win" ? "text-[#28C203]" : "text-[#555594]"
                    }`}
                  >
                    +{bet.payout}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ===== PAGINATION ===== */}
        {filteredBets.length > 0 && (
          <div className="flex justify-between items-center mt-6 text-gray-400 text-sm">
            <span>
              Showing <span className="text-white">{startIndex + 1}</span>–
              <span className="text-white">
                {Math.min(startIndex + itemsPerPage, filteredBets.length)}
              </span>{" "}
              of <span className="text-white">{filteredBets.length}</span> bets
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-white/5 rounded-lg disabled:opacity-40 text-white"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                    currentPage === i + 1
                      ? "text-white"
                      : "text-gray-400 bg-white/5"
                  }`}
                  style={
                    currentPage === i + 1
                      ? { background: "linear-gradient(0deg,#a62a00,#FFB8A1)" }
                      : {}
                  }
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-white/5 rounded-lg disabled:opacity-40 text-white"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bets;
