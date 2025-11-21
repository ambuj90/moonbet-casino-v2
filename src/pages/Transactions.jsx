// src/pages/Transactions.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import api from "../api/axios";
import axios from "axios";

const Transactions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = user.id;

        if (!userId || !token) {
          console.warn("No userId or token found in localStorage.");
          setIsLoading(false);
          return;
        }

        setIsLoading(true);

        const { data } = await axios.get(
          `/wallet-service/api/wallet/${userId}/transactions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetching:", `https://api.moonbet.games/wallet-service/api/wallet/${userId}/transactions`);

        if (Array.isArray(data.transactions)) {
          // ✅ Format transactions for frontend
          const formatted = data.transactions.map((tx) => ({
            id: tx._id,
            type:
              tx.type === "deposit"
                ? "Deposit"
                : tx.type === "withdraw"
                ? "Withdrawal"
                : tx.type,
            status:
              tx.status === "finished" || tx.status === "confirmed"
                ? "Complete"
                : tx.status
                ? tx.status.charAt(0).toUpperCase() + tx.status.slice(1)
                : "Unknown",
            date: new Date(tx.createdAt).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
            amount: `${tx.amount} ${tx.currency?.toUpperCase() || ""}`,
          }));

          setTransactions(formatted);
        } else {
          setTransactions([]);
        }
      } catch (error) {
        console.error("❌ Error fetching transactions:", error);
        toast.error("Failed to load transactions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);


  // Filter transactions
  const filteredTransactions = transactions.filter((tx) => {
  const matchesSearch =
    tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.type.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesFilter =
    filterType === "all" || tx.type.toLowerCase().includes(filterType);
  return matchesSearch && matchesFilter;
});


  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Get status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "complete":
        return "text-green-400 bg-green-500/20";
      case "pending":
        return "text-yellow-400 bg-yellow-500/20";
      case "failed":
        return "text-red-400 bg-red-500/20";
      default:
        return "text-gray-400 bg-gray-500/20";
    }
  };

  // Get type icon
  const getTypeIcon = (type) => {
    if (type.toLowerCase().includes("reward")) {
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    } else if (type.toLowerCase().includes("rakeback")) {
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
          />
        </svg>
      );
    }
    return (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
        />
      </svg>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0B0D] pt-20 md:pt-24 pb-8 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            {/* Header Skeleton */}
            <div className="h-10 bg-white/5 rounded-lg w-64" />

            {/* Filters Skeleton */}
            <div className="flex gap-4">
              <div className="h-10 bg-white/5 rounded-lg w-32" />
              <div className="h-10 bg-white/5 rounded-lg w-32" />
              <div className="h-10 bg-white/5 rounded-lg flex-1" />
            </div>

            {/* Table Skeleton */}
            <div className="bg-white/5 rounded-2xl p-6 space-y-4">
              {[...Array(10)].map((_, i) => (
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
            Transactions
          </h1>
          <p className="text-gray-400">
            View your transaction history and activity
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex flex-col md:flex-row gap-4"
        >
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {["all", "reward", "rakeback", "deposit", "withdrawal"].map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setFilterType(filter);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    filterType === filter
                      ? "bg-gradient-to-r from-[#F07730] to-[#EFD28E] text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              )
            )}
          </div>

          {/* Search */}
          <div className="relative flex-1 md:max-w-xs">
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
              placeholder="Search by ID or type..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#F07730]/50 transition-all"
            />
          </div>
        </motion.div>

        {/* Transactions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
        >
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    Txn ID
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {paginatedTransactions.map((tx, index) => (
                    <motion.tr
                      key={tx.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.02 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <code className="text-sm text-gray-300 font-mono">
                          {tx.id}
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[#F07730]">
                            {getTypeIcon(tx.type)}
                          </span>
                          <span className="text-white font-medium">
                            {tx.type}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            tx.status
                          )}`}
                        >
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {tx.date}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-green-400 font-semibold">
                          {tx.amount}
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
              {paginatedTransactions.map((tx, index) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.02 }}
                  className="p-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[#F07730]">
                        {getTypeIcon(tx.type)}
                      </span>
                      <span className="text-white font-semibold">
                        {tx.type}
                      </span>
                    </div>
                    <span className="text-green-400 font-bold">
                      {tx.amount}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Transaction ID</span>
                      <code className="text-gray-300 font-mono text-xs">
                        {tx.id}
                      </code>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Status</span>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(
                          tx.status
                        )}`}
                      >
                        {tx.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Date</span>
                      <span className="text-gray-300">{tx.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredTransactions.length === 0 && (
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-400 text-center mb-2">
                No transactions found
              </p>
              <p className="text-gray-500 text-sm text-center">
                Try adjusting your filters or search query
              </p>
            </div>
          )}

          {/* Pagination */}
          {filteredTransactions.length > 0 && (
            <div className="px-6 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-400">
                Showing{" "}
                <span className="text-white font-semibold">
                  {startIndex + 1}
                </span>{" "}
                to{" "}
                <span className="text-white font-semibold">
                  {Math.min(
                    startIndex + itemsPerPage,
                    filteredTransactions.length
                  )}
                </span>{" "}
                of{" "}
                <span className="text-white font-semibold">
                  {filteredTransactions.length}
                </span>{" "}
                transactions
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

        {/* Load More Button (Alternative to pagination) */}
        {filteredTransactions.length > itemsPerPage &&
          currentPage < totalPages && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center mt-6"
            >
              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-semibold transition-all"
              >
                Load More
              </button>
            </motion.div>
          )}
      </div>
    </div>
  );
};

export default Transactions;
