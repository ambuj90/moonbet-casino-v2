import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";

// ICONS
const GameIcon = () => (
  <svg
    className="w-4 h-4 text-[#989ACD]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <rect x="3" y="4" width="14" height="18" rx="2" strokeWidth="1.5" />
    <rect x="7" y="2" width="14" height="18" rx="2" strokeWidth="1.5" />
  </svg>
);

const UserIcon = () => (
  <svg
    className="w-4 h-4 text-[#989ACD]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="8" r="4" strokeWidth="1.5" />
    <path
      d="M4 20c0-4 4-6 8-6s8 2 8 6"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const ProfilePage = () => {
  const { isLoggedIn, token } = useAuthStore();
  const [activeTab, setActiveTab] = useState("bets");
  const [searchQuery, setSearchQuery] = useState("");
  const [bets, setBets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const intervalRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id;

  // Fetch Bets
  useEffect(() => {
    loadBets();

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => loadBets(true), 3000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const loadBets = async (silent = false) => {
    if (!silent) setIsLoading(true);
    try {
      const res = await axios.get("/wallet-service/api/games/bets");
      if (res.data?.success && Array.isArray(res.data.data)) {
        const formatted = res.data.data.map((b) => ({
          game: b.game,
          user: b.user || "Unknown",
          betAmount: b.amount || "0.00 SOL",
          multiplier: b.multiplier || "0.30x",
          payout:
            b.payout > 0 ? `+${b.payout} SOL` : `-${Math.abs(b.payout)} SOL`,
          color: b.payout > 0 ? "green" : "gray",
        }));
        setBets(formatted);
      }
    } catch (err) {
      console.error("Error loading bets:", err);
    } finally {
      if (!silent) setIsLoading(false);
    }
  };

  // Filter
  const filteredBets = bets.filter((b) =>
    `${b.game} ${b.user} ${b.betAmount}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0D0E36] py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* ================= TOP TABS ================= */}
        <div className="flex items-center gap-3 mb-8">
          <div className="trust_btn2 flex gap-1 mb-8 p-1 rounded-full overflow-x-auto scrollbar-hide w-fit">
            {["profile", "bets", "transactions", "settings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 sm:px-6 py-2 font-medium text-sm rounded-full transition-all duration-200 ${
                  activeTab === tab
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {/* Animated Gradient Bubble */}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabProfile"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(0deg, #a62a00 0%, #FFB8A1 100%)",
                    }}
                    transition={{ type: "spring", duration: 0.4 }}
                  />
                )}

                <span className="relative z-10 capitalize">{tab}</span>
              </button>
            ))}
          </div>
          {/* SEARCH BAR */}
          <div className="trust_btn2 ml-auto relative w-72">
            <input
              type="text"
              placeholder="Search bet ID or game"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#1A1B3E] border border-[#2B2C55]
               rounded-full text-white text-sm placeholder-[#6F71A5]"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6F71A5]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* ================= TABLE CARD ================= */}
        <div
          className="rounded-xl px-4"
          style={{
            background:
              "linear-gradient(180deg, rgba(28,29,73,0.60) 0%, rgba(28,29,73,0.40) 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Header */}
          <div className="grid grid-cols-5 py-3 px-4 border-b border-white/5">
            <div className="text-[#989ACD] text-xs font-medium">Game</div>
            <div className="text-[#989ACD] text-xs font-medium">User</div>
            <div className="text-[#989ACD] text-xs font-medium text-center">
              Bet Amount
            </div>
            <div className="text-[#989ACD] text-xs font-medium text-center">
              Multiplier
            </div>
            <div className="text-[#989ACD] text-xs font-medium text-right">
              Payout
            </div>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="text-center py-6 text-[#989ACD]">Loading...</div>
          ) : filteredBets.length === 0 ? (
            <div className="text-center py-6 text-[#989ACD]">No bets found</div>
          ) : (
            filteredBets.map((bet, i) => (
              <div
                key={i}
                className={`grid grid-cols-5 px-4 py-3 items-center text-sm
                  ${i % 2 === 0 ? "bg-white/5 rounded-lg" : ""}`}
              >
                {/* GAME */}
                <div className="flex items-center gap-2 text-white">
                  <GameIcon />
                  {bet.game}
                </div>

                {/* USER */}
                <div className="flex items-center gap-2 text-[#D6D7FA]">
                  <UserIcon />
                  <span className="truncate w-20">{bet.user}</span>
                </div>

                {/* AMOUNT */}
                <div className="text-center text-[#D6D7FA]">
                  {bet.betAmount}
                </div>

                {/* MULTIPLIER */}
                <div className="text-center text-[#989ACD]">
                  {bet.multiplier}
                </div>

                {/* PAYOUT */}
                <div
                  className={`text-right font-semibold ${
                    bet.color === "green" ? "text-green-400" : "text-[#989ACD]"
                  }`}
                >
                  {bet.payout}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
