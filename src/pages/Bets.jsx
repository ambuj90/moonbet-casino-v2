// src/pages/Bets.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Bets = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("casino"); // casino, sports
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
    // Simulate loading data
    const loadBets = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setBets(sampleBets);
      setIsLoading(false);
    };
    loadBets();
  }, []);

  // Filter bets
  const filteredBets = bets.filter((bet) => {
    const matchesSearch =
      bet.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bet.game.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBets = filteredBets.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Get game icon
  const getGameIcon = (game) => {
    const gameLower = game.toLowerCase();
    if (gameLower.includes("keno")) {
      return (
        <div className="w-6 h-6 bg-blue-500/20 rounded flex items-center justify-center">
          <svg
            className="w-4 h-4 text-blue-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <circle cx="10" cy="10" r="8" />
          </svg>
        </div>
      );
    } else if (gameLower.includes("limbo")) {
      return (
        <div className="w-6 h-6 bg-red-500/20 rounded flex items-center justify-center">
          <svg
            className="w-4 h-4 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        </div>
      );
    } else if (gameLower.includes("dice")) {
      return (
        <div className="w-6 h-6 bg-purple-500/20 rounded flex items-center justify-center">
          <span className="text-purple-400 text-xs">🎲</span>
        </div>
      );
    } else {
      return (
        <div className="w-6 h-6 bg-orange-500/20 rounded flex items-center justify-center">
          <svg
            className="w-4 h-4 text-orange-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
            />
          </svg>
        </div>
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0B0D] pt-20 md:pt-24 pb-8 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            {/* Header Skeleton */}
            <div className="h-10 bg-white/5 rounded-lg w-48" />

            {/* Tabs Skeleton */}
            <div className="flex gap-4">
              <div className="h-12 bg-white/5 rounded-lg w-32" />
              <div className="h-12 bg-white/5 rounded-lg w-32" />
            </div>

            {/* Search Skeleton */}
            <div className="h-10 bg-white/5 rounded-lg w-full max-w-md" />

            {/* Table Skeleton */}
            <div className="bg-white/5 rounded-2xl p-6 space-y-4">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="h-16 bg-white/5 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0B0D] pt-20 md:pt-24 pb-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            Bets
          </h1>
          <p className="text-gray-400">View your betting history and results</p>
        </motion.div>

        {/* Tabs */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-6"
        >
          <button
            onClick={() => setActiveTab("casino")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "casino"
                ? "bg-gradient-to-r from-[#F07730] to-[#EFD28E] text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            Casino
          </button>
          <button
            onClick={() => setActiveTab("sports")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "sports"
                ? "bg-gradient-to-r from-[#F07730] to-[#EFD28E] text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            Sports
          </button>
        </motion.div> */}

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="relative max-w-md">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
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
            <input
              type="text"
              placeholder="Search by Bet ID or Game..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#F07730]/50 transition-all"
            />
          </div>
        </motion.div>

        {/* Bets Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
        >
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    Game
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    Bet Amount
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    Multiplier
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    Payout
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {paginatedBets.map((bet, index) => (
                    <motion.tr
                      key={bet.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.02 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group"
                    >
                      <td className="px-6 py-4">
                        <code className="text-sm text-gray-300 font-mono group-hover:text-[#F07730] transition-colors">
                          {bet.id}
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {getGameIcon(bet.game)}
                          <span className="text-white font-medium">
                            {bet.game}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white font-medium">
                          {bet.amount}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`font-semibold ${
                            parseFloat(bet.multiplier) > 1
                              ? "text-cyan-400"
                              : "text-gray-400"
                          }`}
                        >
                          {bet.multiplier}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {bet.date}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span
                          className={`font-bold ${
                            bet.status === "win"
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {bet.status === "win" ? "+" : "-"}
                          {bet.payout}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-white/5">
            <AnimatePresence mode="popLayout">
              {paginatedBets.map((bet, index) => (
                <motion.div
                  key={bet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.02 }}
                  className="p-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getGameIcon(bet.game)}
                      <div>
                        <span className="text-white font-semibold block">
                          {bet.game}
                        </span>
                        <code className="text-xs text-gray-400 font-mono">
                          {bet.id}
                        </code>
                      </div>
                    </div>
                    <span
                      className={`font-bold text-lg ${
                        bet.status === "win" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {bet.status === "win" ? "+" : "-"}
                      {bet.payout}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-400 block mb-1">
                        Bet Amount
                      </span>
                      <span className="text-white font-medium">
                        {bet.amount}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-1">
                        Multiplier
                      </span>
                      <span
                        className={`font-semibold ${
                          parseFloat(bet.multiplier) > 1
                            ? "text-cyan-400"
                            : "text-gray-400"
                        }`}
                      >
                        {bet.multiplier}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-400 block mb-1">Date</span>
                      <span className="text-gray-300">{bet.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredBets.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <p className="text-gray-400 text-center mb-2">No bets found</p>
              <p className="text-gray-500 text-sm text-center">
                Try adjusting your search query
              </p>
            </div>
          )}

          {/* Pagination */}
          {filteredBets.length > 0 && (
            <div className="px-6 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-400">
                Showing{" "}
                <span className="text-white font-semibold">
                  {startIndex + 1}
                </span>{" "}
                to{" "}
                <span className="text-white font-semibold">
                  {Math.min(startIndex + itemsPerPage, filteredBets.length)}
                </span>{" "}
                of{" "}
                <span className="text-white font-semibold">
                  {filteredBets.length}
                </span>{" "}
                bets
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 rounded-lg font-semibold transition-all ${
                            currentPage === page
                              ? "bg-gradient-to-r from-[#F07730] to-[#EFD28E] text-white"
                              : "bg-white/5 text-gray-400 hover:bg-white/10"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span key={page} className="text-gray-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Load More Button */}
        {filteredBets.length > itemsPerPage && currentPage < totalPages && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mt-6"
          >
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-semibold transition-all"
            >
              Load More
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Bets;
