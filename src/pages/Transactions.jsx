// src/pages/Transactions.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";

const Transactions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // FETCH TRANSACTIONS
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = user.id;

        if (!userId || !token) {
          setIsLoading(false);
          return;
        }

        const { data } = await axios.get(
          `/wallet-service/api/wallet/${userId}/transactions`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (Array.isArray(data.transactions)) {
          const formatted = data.transactions.map((tx) => ({
            id: tx._id,
            type: tx.type === "withdraw" ? "withdrawal" : tx.type.toLowerCase(),
            status:
              tx.status === "finished" || tx.status === "confirmed"
                ? "complete"
                : tx.status.toLowerCase(),
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
        }
      } catch (err) {
        toast.error("Failed to load transactions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // FILTERING LOGIC
  const filtered = transactions.filter((tx) => {
    const matchesTab =
      activeTab === "all" ? true : tx.type.toLowerCase() === activeTab;
    const matchesSearch =
      tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // PAGINATION
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  // STATUS COLOR
  const getStatusColor = (status) => {
    if (status === "complete") return "text-green-400";
    if (status === "pending") return "text-yellow-400";
    if (status === "failed") return "text-red-400";
    return "text-gray-400";
  };

  return (
    <div className="min-h-screen py-6 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1 }}>
          <p className="text-3xl font-bold py-4">Transactions</p>
        </motion.div>

        {/* FILTER TABS */}
        {/* FILTER TABS (desktop unchanged, mobile improved) */}
        <div
          className="
    bet_btn 
    flex 
    gap-1 
    mb-6 
    p-1 
    rounded-full 
    overflow-x-auto 
    scrollbar-hide 
    w-full
    md:w-fit 
    md:justify-start
  "
          style={{ background: "#282753" }}
        >
          {["all", "reward", "rakeback", "deposit", "withdrawal"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={`
        relative 
        px-4 
        sm:px-5 
        py-2 
        text-xs 
        sm:text-sm 
        font-medium 
        whitespace-nowrap 
        rounded-full 
        transition-all 
        ${activeTab === tab ? "text-white" : "text-gray-300 hover:text-white"}
      `}
            >
              {/* Active Background */}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(0deg,#A62A00 0%,#FFB8A1 100%)",
                  }}
                  transition={{ type: "spring", duration: 0.4 }}
                />
              )}

              <span className="relative z-10 capitalize">
                {tab === "all" ? "All Transactions" : tab}
              </span>
            </button>
          ))}
        </div>

        {/* SEARCH */}
        <div className="relative max-w-md mb-6">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <input
            type="text"
            placeholder="Search by Transaction ID or Type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
          />
        </div>

        {/* ====================================
             🟣 NEW TABLE STYLE (MATCHING BETS)
        ====================================== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl overflow-hidden border border-white/10 bg-[#1C1D49]"
        >
          {/* DESKTOP TABLE HEADER (GRID VERSION) */}
          <div className="grid grid-cols-2 md:grid-cols-5 px-4 md:px-6 py-3">
            <div className="text-[#555594] text-xs uppercase tracking-wider">
              Type
            </div>
            <div className="hidden md:block text-[#555594] text-xs uppercase tracking-wider">
              Txn ID
            </div>
            <div className="hidden md:block text-[#555594] text-xs uppercase tracking-wider text-center">
              Status
            </div>
            <div className="hidden md:block text-[#555594] text-xs uppercase tracking-wider text-center">
              Date
            </div>
            <div className="text-[#555594] text-xs uppercase tracking-wider text-right">
              Amount
            </div>
          </div>

          {/* BODY */}
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              <div className="p-8 text-center text-gray-400">Loading…</div>
            ) : paginated.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                No transactions found
              </div>
            ) : (
              paginated.map((tx, index) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`grid grid-cols-2 md:grid-cols-5 px-4 md:px-6 py-3 items-center mx-4 ${
                    index % 2 === 0 ? "bg-[#282753] rounded-xl" : ""
                  }`}
                >
                  {/* TYPE */}
                  <div className="flex items-center text-white text-sm font-medium capitalize">
                    {tx.type}
                  </div>

                  {/* ID */}
                  <div className="hidden md:block text-gray-300 text-sm">
                    {tx.id}
                  </div>

                  {/* STATUS */}
                  <div
                    className={`hidden md:block text-sm text-center capitalize font-semibold ${getStatusColor(
                      tx.status
                    )}`}
                  >
                    {tx.status}
                  </div>

                  {/* DATE */}
                  <div className="hidden md:block text-gray-400 text-sm text-center">
                    {tx.date}
                  </div>

                  {/* AMOUNT */}
                  <div
                    className={`text-right text-sm font-semibold ${
                      tx.status === "complete"
                        ? "text-[#28C203]"
                        : "text-[#555594]"
                    }`}
                  >
                    {tx.amount}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* =====================
             PAGINATION
        ====================== */}
        {filtered.length > 0 && (
          <div className="flex justify-between items-center mt-6 text-gray-400 text-sm">
            <span>
              Showing <span className="text-white">{startIndex + 1}</span>–
              <span className="text-white">
                {Math.min(startIndex + itemsPerPage, filtered.length)}
              </span>{" "}
              of <span className="text-white">{filtered.length}</span>{" "}
              transactions
            </span>

            <div className="flex items-center gap-2">
              {/* Prev */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-white/5 rounded-lg disabled:opacity-40 text-white"
              >
                Prev
              </button>

              {/* Page Numbers */}
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
                      ? { background: "linear-gradient(0deg,#A62A00,#FFB8A1)" }
                      : {}
                  }
                >
                  {i + 1}
                </button>
              ))}

              {/* Next */}
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

export default Transactions;
