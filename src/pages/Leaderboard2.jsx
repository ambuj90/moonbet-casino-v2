import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { io } from "socket.io-client";

const API_BASE = "/wallet-service/api/games";
const SOCKET_URL = "https://api.moonbet.games/wallet-service";

const periodTabs = [
  { id: "daily", label: "Daily", prizeLabel: "$500" },
  { id: "weekly", label: "Weekly", prizeLabel: "$3,000" },
  { id: "monthly", label: "Monthly", prizeLabel: "$10,000" },
  { id: "all-time", label: "All Time", prizeLabel: "—" },
];

function getPeriodEndDate(period) {
  const now = new Date();

  if (period === "daily") {
    const end = new Date(now);
    end.setDate(now.getDate() + 1);
    end.setHours(0, 0, 0, 0);
    return end;
  }
  if (period === "weekly") {
    const end = new Date(now);
    const day = end.getDay();
    const daysToNextMonday = ((8 - day) % 7) || 7;
    end.setDate(end.getDate() + daysToNextMonday);
    end.setHours(0, 0, 0, 0);
    return end;
  }
  if (period === "monthly") {
    return new Date(now.getFullYear(), now.getMonth() + 1, 1);
  }

  return null;
}

function formatTimeRemaining(endDate) {
  if (!endDate) return "--:--:--";
  const now = new Date();
  let diff = endDate - now;
  if (diff <= 0) return "00:00:00";
  const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
  const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
  const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function formatCurrency(value) {
  if (!value || isNaN(value)) return "$0.00";
  return `$${Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

const Leaderboard2 = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [prizePool, setPrizePool] = useState(0);
  const [endsIn, setEndsIn] = useState("--:--:--");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [myPosition, setMyPosition] = useState({
    rank: "-",
    initials: "AS",
  });

  // Countdown
  useEffect(() => {
    const endDate = getPeriodEndDate(activeTab);
    const update = () => setEndsIn(formatTimeRemaining(endDate));
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [activeTab]);

  // Fetch data
  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const [lbRes, prizeRes] = await Promise.all([
        axios.get(`${API_BASE}/leaderboard/${activeTab}?metric=wager&limit=100`),
        axios.get(`${API_BASE}/leaderboard/${activeTab}/prizepool`),
      ]);

      const lb = lbRes.data?.data || [];
      const prize = prizeRes.data || {};

      setPrizePool(prize.prizePool || 0);

      const prizeMap = {};
      (prize.winners || []).forEach((w) => {
        prizeMap[String(w.userId)] = w.prize;
      });

      const mapped = lb.map((row) => {
        const idStr = String(row.userId);
        return {
          rank: row.rank,
          userId: idStr,
          username: row.username || `Player***${idStr.slice(-3)}`,
          avatar:
            row.avatar ||
            `https://ui-avatars.com/api/?name=${row.username}&background=random`,
          points: Number(row.points),
          prize:
            typeof prizeMap[idStr] === "number"
              ? formatCurrency(prizeMap[idStr])
              : "—",
        };
      });

      setLeaderboardData(mapped);
      setMyPosition((prev) => ({ ...prev, rank: "-" }));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load leaderboard");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [activeTab]);

  useEffect(() => {
    const socket = io(SOCKET_URL, { transports: ["websocket"] });
    const refresh = () => fetchLeaderboard();
    socket.on("leaderboard:bet", refresh);
    socket.on("leaderboard:win", refresh);
    return () => socket.disconnect();
  }, [activeTab]);

  const currentTabMeta = useMemo(
    () => periodTabs.find((t) => t.id === activeTab),
    [activeTab]
  );

  return (
    <div className="min-h-screen bg-[#0A0B0D] pt-20 md:pt-24 pb-8 px-4 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold">Leaderboards</h1>
          <p className="text-gray-400">Track top players & prize distributions</p>
        </motion.div>

        {/* TABS */}
        <div className="flex gap-3 mb-8">
          {periodTabs.slice(0, 3).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[#F07730] to-[#EFD28E] text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* PRIZE POOL + YOUR POSITION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-6 mb-10"
        >
          <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#F07730]/20 to-[#EFD28E]/10 flex items-center justify-center">
              <span className="text-3xl">🏆</span>
            </div>
            <div>
              <div className="text-gray-400 text-sm">Prizepool</div>
              <div className="text-2xl font-semibold mt-1">
                {formatCurrency(prizePool)}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#F07730] to-[#EFD28E] flex items-center justify-center text-black font-bold">
                {myPosition.initials}
              </div>
              <div>
                <div className="text-gray-400 text-sm">Your Position</div>
                <div className="text-xl font-semibold">{myPosition.rank}</div>
              </div>
            </div>

            {activeTab !== "all-time" && (
              <div className="text-right">
                <div className="text-gray-400 text-xs uppercase mb-1">Ends in</div>
                <div className="font-semibold text-lg">{endsIn}</div>
              </div>
            )}
          </div>
        </motion.div>

        {/* TABLE */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-white/5 to-white/0.5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
        >
          <div className="grid grid-cols-[1fr,3fr,2fr,2fr] px-8 py-4 text-gray-400 border-b border-white/10 text-sm">
            <div>Place</div>
            <div>Player</div>
            <div className="text-right">Points</div>
            <div className="text-right">Prize</div>
          </div>

          {/* BODY */}
          {loading ? (
            <div className="p-10 text-center text-gray-400">Loading...</div>
          ) : leaderboardData.length === 0 ? (
            <div className="p-10 text-center text-gray-400">No entries</div>
          ) : (
            leaderboardData.slice(0, 10).map((user, i) => {
              const isTop3 = user.rank <= 3;
              return (
                <div
                  key={i}
                  className={`grid grid-cols-[1fr,3fr,2fr,2fr] px-8 py-4 items-center border-t border-white/5 ${
                    isTop3
                      ? "bg-white/10"
                      : "hover:bg-white/5 transition-all"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : user.rank === 3 ? "🥉" : ""}
                    {String(user.rank).padStart(2, "0")}
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      className="w-8 h-8 rounded-full bg-gray-700 object-cover"
                    />
                    {user.username}
                  </div>

                  <div className="text-right">{user.points.toLocaleString()}</div>

                  <div className="text-right">{user.prize}</div>
                </div>
              );
            })
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard2;
