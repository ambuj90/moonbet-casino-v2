// src/components/sections/GameBetsSection.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useAuthStore } from "../../store/useAuthStore";

const GameBetsSection = () => {
  const { isLoggedIn, token } = useAuthStore();
  const [activeTab, setActiveTab] = useState("all");
  const [bets, setBets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const intervalRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id || "68f90703350b2308ed5e5be9";

  useEffect(() => {
    loadBets();

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => loadBets(true), 2000);

    return () => clearInterval(intervalRef.current);
  }, [activeTab, isLoggedIn]);

  const loadBets = async (silent = false) => {
    if (!silent) setIsLoading(true);
    const endpoint =
      activeTab === "my"
        ? `/wallet-service/api/games/bets/${userId}`
        : "/wallet-service/api/games/bets";

    try {
      const res = await axios.get(endpoint, {
        headers:
          activeTab === "my" ? { Authorization: `Bearer ${token}` } : undefined,
      });

      if (res.data?.success && Array.isArray(res.data.data)) {
        const formatted =
          activeTab === "my"
            ? res.data.data.map((b) => ({
                game: b.game || "unknown",
                user: "You",
                betAmount: b.amount,
                multiplier: b.multiplier || "-",
                payout: b.payout,
                color:
                  b.type === "win" || b.type === "refund" ? "green" : "red",
              }))
            : res.data.data;

        setBets(formatted);
      } else {
        setBets([]);
      }
    } catch (err) {
      console.error(err);
      setBets([]);
    } finally {
      if (!silent) setIsLoading(false);
    }
  };

  const displayedBets = showAll ? bets : bets.slice(0, 15);

  return (
    <section className="w-full py-12 sm:py-16 md:py-20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="bet_btn flex gap-2 mb-6 p-1 overflow-x-auto rounded-[50px] scrollbar-hide w-fit">
          {["all", "my"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-2 rounded-[50px] font-semibold ${
                activeTab === tab ? "text-white" : "text-[#9292D2]"
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="custom-btn absolute inset-0 rounded-[50px]"
                />
              )}
              <span className="relative z-10">
                {tab === "all" ? "All Bets" : "My Bets"}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <motion.div
          className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl
          rounded-2xl border border-white/10 overflow-hidden px-5 pb-5"
        >
          {/* HEADER (Always 5 columns, unified spacing) */}
          <div className="grid grid-cols-5 px-5 py-3 text-xs lg:text-sm font-medium text-[#555594]">
            <div>Game</div>
            <div>User</div>
            <div className="text-center">Bet Amount</div>
            <div className="text-center">Multiplier</div>
            <div className="text-right">Payout</div>
          </div>

          {/* BODY */}
          <div className="divide-y divide-transparent">
            <AnimatePresence>
              {isLoading ? (
                <div className="p-8 text-center text-gray-400">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F07730] mx-auto"></div>
                </div>
              ) : displayedBets.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  No bets to display.
                </div>
              ) : (
                displayedBets.map((bet, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`grid grid-cols-5 px-5 py-3 text-xs lg:text-sm rounded-lg ${
                      index % 2 === 0 ? "bg-[#282753]" : ""
                    }`}
                  >
                    <div className="text-white">{bet.game}</div>
                    <div className="text-gray-300">{bet.user}</div>
                    <div className="text-center text-white">
                      {bet.betAmount}
                    </div>
                    <div className="text-center text-gray-400">
                      {bet.multiplier || "-"}
                    </div>
                    <div
                      className={`text-right font-semibold ${
                        bet.color === "green"
                          ? "text-green-400"
                          : "text-[#555594]"
                      }`}
                    >
                      {bet.payout}
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GameBetsSection;
