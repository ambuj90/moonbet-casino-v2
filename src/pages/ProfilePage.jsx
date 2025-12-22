import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";

/* ---------------- ICONS ---------------- */
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

/* ---------------- PAGE ---------------- */
const ProfilePage = () => {
  const { token } = useAuthStore();

  const [activeTab, setActiveTab] = useState("bets");
  const [txnTab, setTxnTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [bets, setBets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id;

  /* ---------------- FETCH BETS ---------------- */
  useEffect(() => {
    if (activeTab !== "bets") return;

    setLoading(true);
    axios.get("/wallet-service/api/games/bets").then((res) => {
      if (Array.isArray(res.data?.data)) {
        setBets(
          res.data.data.map((b) => ({
            game: b.game,
            user: b.user || "tank...",
            betAmount: `${b.amount || "0.00"} SOL`,
            multiplier: b.multiplier || "0.30x",
            payout:
              b.payout > 0 ? `+${b.payout} SOL` : `-${Math.abs(b.payout)} SOL`,
            color: b.payout > 0 ? "green" : "gray",
          }))
        );
      }
      setLoading(false);
    });
  }, [activeTab]);

  /* ---------------- FETCH TRANSACTIONS ---------------- */
  useEffect(() => {
    if (activeTab !== "transactions") return;

    setLoading(true);
    axios
      .get(`/wallet-service/api/wallet/${userId}/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (Array.isArray(res.data.transactions)) {
          setTransactions(
            res.data.transactions.map((tx) => ({
              id: tx._id,
              type: tx.type === "withdraw" ? "withdrawal" : tx.type,
              status: tx.status,
              date: new Date(tx.createdAt).toLocaleString(),
              amount: `${tx.amount} ${tx.currency?.toUpperCase()}`,
            }))
          );
        }
        setLoading(false);
      });
  }, [activeTab, txnTab]);

  /* ---------------- FILTERS ---------------- */
  const filteredBets = bets.filter((b) =>
    `${b.game} ${b.user}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTx = transactions.filter((tx) => {
    const tabMatch = txnTab === "all" ? true : tx.type === txnTab;
    const searchMatch =
      tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.type.toLowerCase().includes(searchQuery.toLowerCase());
    return tabMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-[#0D0E36] py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* ================= TOP PROFILE TABS ================= */}
        <div className="flex items-center gap-3 mb-8">
          <div className="trust_btn2 flex gap-1 p-1 rounded-full">
            {["profile", "bets", "transactions", "settings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-2 rounded-full text-sm ${
                  activeTab === tab ? "text-white" : "text-gray-400"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="profileTab"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "linear-gradient(0deg,#A62A00,#FFB8A1)",
                    }}
                  />
                )}
                <span className="relative z-10 capitalize">{tab}</span>
              </button>
            ))}
          </div>

          {/* SEARCH */}
          <div className="ml-auto w-72 relative">
            <input
              placeholder={
                activeTab === "transactions"
                  ? "Search Transaction ID or Type"
                  : "Search bet ID or game"
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#1A1B3E] border border-[#2B2C55] rounded-full text-white text-sm"
            />
          </div>
        </div>

        {/* ================= TRANSACTION FILTER TABS ================= */}
        {activeTab === "transactions" && (
          <div className="flex justify-end mb-4">
            <div className="bet_btn flex gap-1 p-1 rounded-full bg-[#282753]">
              {["all", "reward", "rakeback", "deposit", "withdrawal"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setTxnTab(tab)}
                    className={`relative px-4 py-2 text-sm rounded-full ${
                      txnTab === tab ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {txnTab === tab && (
                      <motion.div
                        layoutId="txnTab"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: "linear-gradient(0deg,#A62A00,#FFB8A1)",
                        }}
                      />
                    )}
                    <span className="relative z-10 capitalize">
                      {tab === "all" ? "All Transactions" : tab}
                    </span>
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* ================= BETS TABLE ================= */}
        {activeTab === "bets" && (
          <div className="rounded-xl overflow-hidden bg-[#1C1D49] border border-white/10">
            <div className="grid grid-cols-5 px-6 py-3 text-xs text-[#555594]">
              <div>Game</div>
              <div>User</div>
              <div className="text-center">Bet Amount</div>
              <div className="text-center">Multiplier</div>
              <div className="text-right">Payout</div>
            </div>

            {loading ? (
              <div className="p-8 text-center text-gray-400">Loading…</div>
            ) : (
              filteredBets.map((bet, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-5 px-6 py-3 items-center ${
                    i % 2 === 0 ? "bg-[#282753]" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 text-white">
                    <GameIcon />
                    {bet.game}
                  </div>
                  <div className="flex items-center gap-2 text-[#D6D7FA]">
                    <UserIcon />
                    {bet.user}
                  </div>
                  <div className="text-center text-[#D6D7FA]">
                    {bet.betAmount}
                  </div>
                  <div className="text-center text-[#989ACD]">
                    {bet.multiplier}
                  </div>
                  <div
                    className={`text-right font-semibold ${
                      bet.color === "green"
                        ? "text-[#28C203]"
                        : "text-[#555594]"
                    }`}
                  >
                    {bet.payout}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ================= TRANSACTIONS TABLE ================= */}
        {activeTab === "transactions" && (
          <div className="rounded-xl overflow-hidden bg-[#1C1D49] border border-white/10">
            <div className="grid grid-cols-5 px-6 py-3 text-xs text-[#555594]">
              <div>Type</div>
              <div>Txn ID</div>
              <div className="text-center">Status</div>
              <div className="text-center">Date</div>
              <div className="text-right">Amount</div>
            </div>

            {loading ? (
              <div className="p-8 text-center text-gray-400">Loading…</div>
            ) : (
              filteredTx.map((tx, i) => (
                <div
                  key={tx.id}
                  className={`grid grid-cols-5 px-6 py-3 items-center ${
                    i % 2 === 0 ? "bg-[#282753]" : ""
                  }`}
                >
                  <div className="text-white capitalize">{tx.type}</div>
                  <div className="text-gray-300">{tx.id}</div>
                  <div className="text-center text-green-400 capitalize">
                    {tx.status}
                  </div>
                  <div className="text-center text-gray-400">{tx.date}</div>
                  <div className="text-right text-green-400 font-semibold">
                    {tx.amount}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
