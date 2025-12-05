import React, { useState } from "react";
import { motion } from "framer-motion";

const GamepageLeaderboard = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [currentPage, setCurrentPage] = useState(1);

  const leaderboardData = Array.from({ length: 10 }).map((_, i) => ({
    username: "Henrietta O’Connell",
    points: "44,048.54",
    prize: "$15,000.00",
  }));

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* ===================== TOP HEADER ===================== */}
      <div
        className="
        w-full flex flex-wrap 
        items-center justify-between 
        gap-3 bg-[#101338] px-4 py-4 rounded-xl mb-6
      "
      >
        {/* COLUMN WRAPPER - MOBILE STACKS FIRST TWO ITEMS */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 flex-1">
          {/* Prize Pool */}
          <div
            className="
            flex items-center gap-2 
            bg-[#1C1D49] border border-white/10 
            rounded-lg px-4 py-2 w-full sm:w-auto
          "
          >
            <img src="/icons/prizepool.svg" className="w-5 h-5" />
            <span className="text-[#9292D2] text-sm">Prize Pool</span>
            <span className="text-white font-semibold text-sm">$0.00</span>
          </div>

          {/* Your Position */}
          <div
            className="
            flex items-center gap-2 
            bg-[#1C1D49] border border-white/10 
            rounded-lg px-4 py-2 w-full sm:w-auto
          "
          >
            <img src="/icons/yourposition.svg" className="w-5 h-5" />
            <span className="text-[#9292D2] text-sm">Your Position</span>
            <span className="text-white font-semibold text-sm">-</span>
          </div>
        </div>

        {/* ENDS IN - Center aligned on mobile/tablet */}
        <div
          className="
          flex items-center gap-2 mx-auto 
          bg-[#1C1D49] border border-white/10 
          rounded-lg px-4 py-2
          order-last sm:order-none
        "
        >
          <img src="/icons/timer.svg" className="w-4 h-4 opacity-60" />
          <span className="text-[#9292D2] text-sm">Ends in</span>
          <span className="text-white text-sm font-semibold">
            10d 23h 59m 29s
          </span>
        </div>

        {/* TABS — RIGHT SIDE ON ALL DEVICES */}
        <div
          className="
          flex items-center gap-1 
          bg-[#1C1D49] border border-white/10 
          p-2 rounded-full ml-auto
        "
        >
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

      {/* ===================== TABLE ===================== */}
      <div className="rounded-xl overflow-hidden bg-[#101338] border border-white/10">
        {/* Header */}
        <div className="grid grid-cols-4 px-6 py-3 text-[#555594] text-xs font-semibold uppercase">
          <div>Rank</div>
          <div>Username</div>
          <div className="hidden md:block text-center">Points</div>
          <div className="text-right">Prize</div>
        </div>

        {/* Rows */}
        {leaderboardData.map((p, i) => (
          <div
            key={i}
            className={`grid grid-cols-4 px-6 py-3 items-center ${
              i % 2 === 0 ? "bg-[#282753]/40" : ""
            }`}
          >
            {/* Rank */}
            <div className="flex items-center gap-2 text-white font-medium">
              {i + 1 <= 3 ? (
                <img src={`/icons/moon.svg`} className="w-5 h-5" />
              ) : (
                <span className="w-5 h-5" />
              )}
              <span>{String(i + 1).padStart(2, "0")}</span>
            </div>

            {/* Username */}
            <div className="flex items-center gap-2 text-white">
              <img
                src="/leaderboard-assets/astro-profile1.svg"
                className="w-6 h-6 rounded-full"
              />
              <span className="truncate">{p.username}</span>
            </div>

            {/* Points */}
            <div className="hidden md:block text-center text-white">
              {p.points}
            </div>

            {/* Prize */}
            <div className="text-right font-semibold text-white">{p.prize}</div>
          </div>
        ))}
      </div>

      {/* ===================== PAGINATION ===================== */}
      <div className="flex justify-center items-center gap-2 mt-6 w-full">
        {/* Left Arrow */}
        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10">
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="#9292D2"
            strokeWidth="2"
          >
            <path d="M10 4L6 8l4 4" />
          </svg>
        </button>

        {/* Page Numbers */}
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            onClick={() => setCurrentPage(n)}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold ${
              currentPage === n
                ? "text-white bg-gradient-to-b from-[#A62A00] to-[#FFB8A1]"
                : "text-gray-300 bg-white/5 hover:bg-white/10"
            }`}
          >
            {n}
          </button>
        ))}

        <span className="text-gray-600 px-1">…</span>

        {[10, 11].map((n) => (
          <button
            key={n}
            className="w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold text-gray-300 bg-white/5 hover:bg-white/10"
          >
            {n}
          </button>
        ))}

        {/* Right Arrow */}
        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10">
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="#9292D2"
            strokeWidth="2"
          >
            <path d="M6 4l4 4-4 4" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default GamepageLeaderboard;
