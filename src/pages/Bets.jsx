// src/pages/Bets.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Bets = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("casino");
  const [bets, setBets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Sample bet data
  const sampleBets = [
    {
      id: "E0v5b8772...",
      game: "Keno",
      amount: "$0.12",
      multiplier: "0.00x",
      date: "Oct 15, 10:14 AM",
      payout: "$0.56",
      status: "win",
    },
    {
      id: "dY3pBga...",
      game: "Keno",
      amount: "$0.24",
      multiplier: "0.00x",
      date: "Oct 15, 10:42 AM",
      payout: "$0.07",
      status: "loss",
    },
    {
      id: "0D0kY2...",
      game: "Keno",
      amount: "$0.01",
      multiplier: "0.00x",
      date: "Oct 15, 9:55 AM",
      payout: "$0.01",
      status: "loss",
    },
    {
      id: "DrQWKG...",
      game: "Keno",
      amount: "$0.12",
      multiplier: "1.00x",
      date: "Oct 15, 6:33 AM",
      payout: "$0.56",
      status: "win",
    },
    {
      id: "Zubb4abz1...",
      game: "Limbo",
      amount: "$0.20",
      multiplier: "1.00x",
      date: "Oct 15, 10:24 AM",
      payout: "$0.30",
      status: "win",
    },
    {
      id: "MkQv2t27...",
      game: "Limbo",
      amount: "$0.20",
      multiplier: "1.00x",
      date: "Oct 15, 10:24 AM",
      payout: "$0.30",
      status: "win",
    },
    {
      id: "NLcuzmsm...",
      game: "Limbo",
      amount: "$0.10",
      multiplier: "1.00x",
      date: "Oct 15, 10:24 AM",
      payout: "$0.30",
      status: "win",
    },
    {
      id: "54G6xzmr...",
      game: "Limbo",
      amount: "$0.10",
      multiplier: "1.00x",
      date: "Oct 15, 10:24 AM",
      payout: "$0.30",
      status: "win",
    },
    {
      id: "FNkKOvXq...",
      game: "Limbo",
      amount: "$0.20",
      multiplier: "1.29x",
      date: "Oct 15, 10:24 AM",
      payout: "$0.24",
      status: "win",
    },
    {
      id: "k1nKP27EJ...",
      game: "Limbo",
      amount: "$0.10",
      multiplier: "1.00x",
      date: "Oct 15, 10:42 AM",
      payout: "$0.10",
      status: "loss",
    },
    {
      id: "K18xV2Mk...",
      game: "Limbo",
      amount: "$0.10",
      multiplier: "1.27x",
      date: "Oct 15, 10:24 AM",
      payout: "$0.16",
      status: "loss",
    },
    {
      id: "hL9E7...",
      game: "Limbo",
      amount: "$0.10",
      multiplier: "0.00x",
      date: "Oct 15, 10:24 AM",
      payout: "$0.12",
      status: "loss",
    },
    {
      id: "kLPF9rFi...",
      game: "Limbo",
      amount: "$0.10",
      multiplier: "1.27x",
      date: "Oct 15, 10:24 AM",
      payout: "$0.17",
      status: "win",
    },
    {
      id: "SLEPPER...",
      game: "Limbo",
      amount: "$0.10",
      multiplier: "0.00x",
      date: "Oct 15, 10:24 AM",
      payout: "$0.13",
      status: "loss",
    },
    {
      id: "MRMRE93...",
      game: "Limbo",
      amount: "$0.10",
      multiplier: "1.39x",
      date: "Oct 15, 10:50 AM",
      payout: "$0.12",
      status: "win",
    },
    {
      id: "O2QG8Pc...",
      game: "Limbo",
      amount: "$0.10",
      multiplier: "0.00x",
      date: "Oct 14, 7:18 AM",
      payout: "$0.10",
      status: "loss",
    },
    {
      id: "87Kf3r...",
      game: "Limbo",
      amount: "$0.10",
      multiplier: "0.00x",
      date: "Oct 14, 10:24 AM",
      payout: "$0.05",
      status: "loss",
    },
    {
      id: "yEQS8f...",
      game: "Dice",
      amount: "$0.12",
      multiplier: "1.45x",
      date: "Oct 15, 4:10 AM",
      payout: "$0.16",
      status: "win",
    },
    {
      id: "UqRla5AA...",
      game: "Rainbet Automatic",
      amount: "$0.10",
      multiplier: "0.00x",
      date: "Oct 15, 5:40 PM",
      payout: "$0.07",
      status: "loss",
    },
    {
      id: "VRmLttt...",
      game: "Rainbet Automatic",
      amount: "$0.10",
      multiplier: "0.00x",
      date: "Oct 15, 10:44 AM",
      payout: "$0.07",
      status: "loss",
    },
  ];

  useEffect(() => {
    const loadBets = async () => {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setBets(sampleBets);
      setIsLoading(false);
    };
    loadBets();
  }, []);

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
      <div className="min-h-screen flex justify-center items-center text-gray-400">
        Loading Bets...
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
          className="mb-8"
        >
          <p className="text-3xl font-bold text-white">Bets</p>
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
                    {bet.payout}
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
