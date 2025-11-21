// src/components/sections/GameBetsSection.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useAuthStore } from "../../store/useAuthStore"; // 👈 use global store

const GameBetsSection = () => {
  const { isLoggedIn, token } = useAuthStore();
  const [activeTab, setActiveTab] = useState("all");
  const [bets, setBets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const intervalRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id || "68f90703350b2308ed5e5be9";

  // 🧠 Load bets every 2 seconds when activeTab changes or login state changes
  useEffect(() => {
    loadBets();

    if (intervalRef.current) clearInterval(intervalRef.current);

    // Only auto-refresh when "my" tab is active
    if (activeTab === "my" && isLoggedIn) {
      intervalRef.current = setInterval(() => loadBets(true), 2000);
    } else if (activeTab === "all") {
      intervalRef.current = setInterval(() => loadBets(true), 2000);
    }

    return () => clearInterval(intervalRef.current);
  }, [activeTab, isLoggedIn]);

  const loadBets = async (silent = false) => {
    if (!silent) setIsLoading(true);
    setShowAll(false);

    try {
      if (activeTab === "all") {
        const res = await axios.get("/wallet-service/api/games/bets");
        if (res.data?.success && Array.isArray(res.data.data)) {
          setBets(res.data.data);
        } else {
          setBets([]);
        }
      } else if (activeTab === "my") {
        if (!token || !isLoggedIn) {
          setBets([]); // not logged in → show empty
          return;
        }

        const res = await axios.get(
          `/wallet-service/api/games/bets/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data?.success && Array.isArray(res.data.data)) {
          const formatted = res.data.data.map((b) => ({
            game: b.game || "unknown",
            user: "You",
            betAmount: b.amount,
            multiplier: b.multiplier || "-",
            payout: b.payout,
            color: b.type === "win" || b.type === "refund" ? "green" : "red",
            time: new Date(b.createdAt).toLocaleTimeString(),
          }));
          setBets(formatted);
        } else {
          setBets([]);
        }
      }
    } catch (err) {
      console.error("Error fetching bets:", err);
      setBets([]);
    } finally {
      if (!silent) setIsLoading(false);
    }
  };

  const displayedBets = showAll ? bets : bets.slice(0, 15);

  return (
    <section className="w-full py-12 sm:py-16 md:py-20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl text-[#CED5E3]">🎰</span>
            <h3 className="text-[#CED5E3] font-[400] text-[18px] leading-[44px] uppercase font-['Neuropolitical']">
              SLOTS
            </h3>
          </div>
          <p className="text-sm sm:text-base text-gray-400">
            Watch real-time bets from players around the world
          </p>
        </motion.div> */}

        {/* Tabs */}
        <div
          class="bet_btn flex gap-2 mb-4 sm:mb-6 p-1 rounded-[8px] overflow-x-auto scrollbar-hide w-fit"
          style={{
            background:
              "linear-gradient(0deg, rgba(30, 30, 30, 0.15) 0%, rgba(75, 75, 75, 0.15) 100%)",
          }}
        >
          {["all", "my"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 sm:px-6 py-2 sm:py-3 font-semibold text-sm sm:text-base rounded-[8px] transition-all duration-200 ${
                activeTab === tab
                  ? "text-black" // Active text color
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {/* Active tab gradient background */}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-[8px] bg-gradient-to-tr from-[#7F0577] to-[#F474FB]"
                  transition={{ type: "spring", duration: 0.4 }}
                />
              )}

              {/* Label (always above gradient) */}
              <span className="relative z-10">
                {tab === "all" ? "All Bets" : "My Bets"}
              </span>
            </button>
          ))}
        </div>

        {/* Bets Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden px-5"
        >
          {/* Header */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 lg:gap-4 p-3 lg:p-4 border-b border-white/10 bg-[#080808]/3">
            {["Game", "User", "Bet Amount", "Multiplier", "Payout", "Time"].map(
              (h) => (
                <div
                  key={h}
                  className={`text-gray-400 text-xs lg:text-sm font-medium ${
                    ["User", "Bet Amount", "Multiplier", "Time"].includes(h)
                      ? "hidden md:block"
                      : ""
                  }`}
                >
                  {h}
                </div>
              )
            )}
          </div>

          {/* Body */}
          <div className="divide-y divide-transparent">
            <AnimatePresence mode="popLayout">
              {isLoading ? (
                <div className="p-8 text-center text-gray-400">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#F07730]"></div>
                </div>
              ) : !isLoggedIn && activeTab === "my" ? (
                <div className="p-8 text-center text-gray-400">
                  Please log in to see your bets.
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
                    className={`grid md:grid-cols-6 grid-cols-2 gap-2 lg:gap-4 p-3 lg:p-4 rounded-lg ${
                      index % 2 === 0
                        ? "[background:rgba(255,255,255,0.15)]"
                        : "bg-gradient-to-r from-[#0A0A0A] via-[#161616] to-[#0A0A0A]"
                    }`}
                  >
                    <div className="text-white text-xs lg:text-sm font-medium">
                      {bet.game}
                    </div>
                    <div className="hidden md:block text-gray-300 text-xs lg:text-sm truncate">
                      {bet.user}
                    </div>
                    <div className="hidden md:block text-white text-xs lg:text-sm">
                      {bet.betAmount}
                    </div>
                    <div className="hidden md:block text-gray-400 text-xs lg:text-sm">
                      -
                    </div>
                    <div
                      className={`text-xs lg:text-sm font-semibold ${
                        bet.color === "green"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {bet.payout}
                    </div>
                    <div className="hidden md:block text-gray-500 text-xs lg:text-sm">
                      {bet.time}
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* View More */}
        {/* {bets.length > 10 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex justify-center mt-6 sm:mt-8"
          >
            <button
              onClick={() => setShowAll((p) => !p)}
              className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base border border-white/20 rounded-full text-white font-semibold hover:bg-white/10 transition-colors"
            >
              {showAll ? "Show Less Bets" : "View More Bets"}
            </button>
          </motion.div>
        )} */}
      </div>
    </section>
  );
};

export default GameBetsSection;
