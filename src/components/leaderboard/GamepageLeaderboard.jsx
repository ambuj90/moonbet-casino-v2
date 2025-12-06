// src/components/sections/GameBetsSection.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useAuthStore } from "../../store/useAuthStore";

// Card icon SVG component
const CardIcon = () => (
  <svg
    className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="4"
      width="14"
      height="18"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <rect
      x="7"
      y="2"
      width="14"
      height="18"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);

// User icon SVG component
const UserIcon = () => (
  <svg
    className="w-3.5 h-3.5 mr-1.5 flex-shrink-0 text-gray-400"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M4 20c0-4 4-6 8-6s8 2 8 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// ======================= LEADERBOARD SECTION =======================
const LeaderboardSection = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [currentPage, setCurrentPage] = useState(1);

  const leaderboardData = Array.from({ length: 10 }).map(() => ({
    username: "Henrietta O’Connell",
    points: "44,048.54",
    prize: "$15,000.00",
  }));

  return (
    <section
      className="w-full mx-auto py-4"
      style={{
        borderRadius: "12px",
        border: "1px solid #35326B",
        background: "#1C1D49",
      }}
    >
      {/* TOP HEADER */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 px-6 py-4 rounded-xl">
        {/* Prize Pool */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 flex-1">
          <div className="bj-action-btn flex items-center gap-2 bg-[#0D0E36] rounded-lg px-4 py-3">
            <img src="/icons/prizepool.svg" className="w-5 h-5" />
            <span className="text-[#9292D2] text-sm">Prize Pool</span>
            <span className="text-white font-semibold pl-8 text-sm">$0.00</span>
          </div>

          {/* Your Position */}
          <div className="bj-action-btn flex items-center gap-2 bg-[#0D0E36] rounded-lg px-4 py-3">
            <img src="/icons/yourposition.svg" className="w-5 h-5" />
            <span className="text-[#9292D2] text-sm">Your Position</span>
            <span className="text-white font-semibold text-sm pl-8">-</span>
          </div>
          {/* Ends In */}
          <div className="flex items-center gap-2 rounded-lg px-10 py-2">
            <img src="/icons/timer.svg" className="w-4 h-4 opacity-60" />
            <span className="text-[#9292D2] text-sm">Ends in</span>
            <span className="text-white text-sm font-semibold">
              10d 23h 59m
            </span>
          </div>
        </div>

        {/* Internal Tabs */}
        <div className="flex items-center gap-1 bg-[#1C1D49] border border-white/10 p-2 rounded-full ml-auto">
          {["Daily", "Weekly", "Monthly"].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t.toLowerCase())}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                activeTab === t.toLowerCase() ? "text-white" : "text-gray-300"
              }`}
              style={
                activeTab === t.toLowerCase()
                  ? {
                      background:
                        "linear-gradient(0deg,#A62A00 0%,#FFB8A1 100%)",
                    }
                  : {}
              }
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="rounded-xl overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 px-6 py-3 text-[#555594] text-xs font-semibold uppercase">
          <div>Rank</div>
          <div className="hidden md:block px-4">Username</div>
          <div className="hidden md:block text-center">Points</div>
          <div className="text-right pr-12">Prize</div>
        </div>

        {/* Rows */}
        {leaderboardData.map((p, i) => (
          <div
            key={i}
            className={`grid grid-cols-2 md:grid-cols-4 px-6 py-3 rounded-[12px] mx-6 ${
              i % 2 === 0 ? "bg-[#282753]" : ""
            }`}
          >
            <div className="flex items-center gap-2 text-white font-medium">
              {i + 1 <= 3 ? (
                <img src="/icons/moon.svg" className="w-5 h-5" />
              ) : (
                <span className="w-5 h-5" />
              )}
              <span>{String(i + 1).padStart(2, "0")}</span>
            </div>

            <div className=" hidden md:flex items-center gap-2 text-white">
              <img
                src="/leaderboard-assets/astro-profile1.svg"
                className="w-6 h-6 rounded-full"
              />
              <span className="truncate">{p.username}</span>
            </div>

            <div className="hidden md:block text-center text-white">
              {p.points}
            </div>

            <div className="text-right font-semibold text-white">{p.prize}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const GameBetsSection = () => {
  const { isLoggedIn, token } = useAuthStore();
  const [activeTab, setActiveTab] = useState("all");
  const [bets, setBets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const intervalRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id || "68f90703350b2308ed5e5be9";

  useEffect(() => {
    loadBets();

    if (intervalRef.current) clearInterval(intervalRef.current);

    if (activeTab === "my" && isLoggedIn) {
      intervalRef.current = setInterval(() => loadBets(true), 2000);
    } else if (activeTab === "all") {
      intervalRef.current = setInterval(() => loadBets(true), 2000);
    }

    return () => clearInterval(intervalRef.current);
  }, [activeTab, isLoggedIn]);

  const loadBets = async (silent = false) => {
    if (!silent) setIsLoading(true);

    try {
      if (activeTab === "all") {
        const res = await axios.get("/wallet-service/api/games/bets");
        if (res.data?.success && Array.isArray(res.data.data)) {
          setBets(res.data.data.slice(0, 10));
        } else {
          setBets([]);
        }
      } else if (activeTab === "my") {
        if (!token || !isLoggedIn) {
          setBets([]);
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
          setBets(formatted.slice(0, 10));
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

  return (
    <section className="w-full py-6 sm:py-16 md:py-3">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        {/* Tabs */}
        <div
          className="bet_btn flex gap-1 mb-4 sm:mb-6 p-1 rounded-full overflow-x-auto scrollbar-hide w-fit"
          style={{
            background: "#282753",
          }}
        >
          {["leaderboard", "all", "my"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-5 sm:px-6 py-2 font-medium text-sm rounded-full transition-all duration-200 ${
                activeTab === tab
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(0deg, #a62a00 0%, #FFB8A1 100%)",
                  }}
                  transition={{ type: "spring", duration: 0.4 }}
                />
              )}
              <span className="relative z-10">
                {tab === "leaderboard"
                  ? "Leaderboard"
                  : tab === "all"
                  ? "All Bets"
                  : "My Bets"}
              </span>
            </button>
          ))}
        </div>
        {activeTab === "leaderboard" ? (
          <LeaderboardSection />
        ) : (
          <>
            {/* Bets Table */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-xl overflow-hidden"
              style={{
                background: "#1C1D49",
              }}
            >
              {/* Header - Desktop: 5 columns, Mobile: 2 columns */}
              <div className="grid grid-cols-2 md:grid-cols-5 px-4 md:px-6 py-3 ">
                <div className="text-[#555594] text-xs font-medium uppercase tracking-wider">
                  Game
                </div>
                <div className="hidden md:block text-[#555594] text-xs font-medium uppercase tracking-wider ml-10">
                  User
                </div>
                <div className="hidden md:block text-[#555594] text-xs font-medium uppercase tracking-wider text-center">
                  Bet Amount
                </div>
                <div className="hidden md:block text-[#555594] text-xs font-medium uppercase tracking-wider text-center">
                  Multiplier
                </div>
                <div className="text-[#555594] text-xs font-medium uppercase tracking-wider text-right">
                  Payout
                </div>
              </div>

              {/* Body */}
              <div>
                <AnimatePresence mode="popLayout">
                  {isLoading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-8 text-center text-gray-400"
                    >
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                    </motion.div>
                  ) : !isLoggedIn && activeTab === "my" ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-8 text-center text-gray-400"
                    >
                      Please log in to see your bets.
                    </motion.div>
                  ) : bets.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-8 text-center text-gray-400"
                    >
                      No bets to display.
                    </motion.div>
                  ) : (
                    bets.map((bet, index) => (
                      <motion.div
                        key={`${bet.game}-${index}-${bet.time || Date.now()}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, delay: index * 0.015 }}
                        className={`grid grid-cols-2 md:grid-cols-5 px-4 md:px-6 py-3 items-center mx-4 ${
                          index % 2 === 0
                            ? "bg-[#282753] rounded-xl "
                            : "bg-transparent"
                        }`}
                      >
                        {/* Game Column */}
                        <div className="flex items-center text-white text-sm font-medium">
                          <CardIcon />
                          <span className="capitalize">{bet.game}</span>
                        </div>

                        {/* User Column - Desktop only */}
                        <div className="hidden md:flex items-center text-gray-300 text-sm">
                          <UserIcon />
                          <span className="truncate max-w-[80px]">
                            {bet.user}
                          </span>
                        </div>

                        {/* Bet Amount Column - Desktop only */}
                        <div className="hidden md:block text-white text-sm text-center">
                          {bet.betAmount}
                        </div>

                        {/* Multiplier Column - Desktop only */}
                        <div className="hidden md:block text-gray-400 text-sm text-center">
                          {bet.multiplier || "0.30x"}
                        </div>

                        {/* Payout Column */}
                        <div
                          className={`text-sm font-semibold text-right ${
                            bet.color === "green"
                              ? "text-green-400"
                              : "text-green-400"
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
          </>
        )}
      </div>
    </section>
  );
};

export default GameBetsSection;
