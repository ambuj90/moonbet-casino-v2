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

const tabs = [
  "profile",
  "bets",
  "transactions",
  "security",
  "preferences",
  "settings",
];

const DisplayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="17"
    viewBox="0 0 18 17"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0 10.4669L1.42852 10.4958L3.42645 8.46729L5.01036 10.0769C5.42446 9.53581 5.93349 9.08235 6.52503 8.73481L6.62896 8.67469L6.71045 8.76172L6.35984 7.25401C6.07352 7.32818 5.77599 7.36639 5.47229 7.36639C4.48486 7.36639 3.56374 6.96316 2.87849 6.23324L2.79701 6.14623L2.69308 6.20622C1.24363 7.05789 0.290364 8.54578 0.01032 10.3996L0 10.4669ZM5.47228 6.62147C3.67635 6.62147 2.21517 5.13657 2.21517 3.31131C2.21517 1.4848 3.67635 0 5.47228 0C7.02697 0 8.33065 1.1125 8.65295 2.59515C7.29064 3.07275 6.13619 4.69862 6.12385 6.55469C5.91326 6.59836 5.69541 6.62147 5.47228 6.62147Z"
      fill="url(#paint0_linear_10728_4017)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.78178 17H17.9894C18.1129 14.2338 17.1674 11.867 14.6272 10.3761L14.4974 10.2998L14.392 10.4102C13.5227 11.3363 12.354 11.8479 11.101 11.8479C9.84821 11.8479 8.67968 11.3363 7.81023 10.4102L7.70683 10.2998L7.57507 10.3761C7.03721 10.6921 6.57096 11.0475 6.17086 11.4377L7.8751 13.1694H5.20818C5.32881 14.4854 5.81026 15.5697 6.95532 16.4005L7.78178 17ZM11.101 10.9029C8.82248 10.9029 6.96872 9.01901 6.96872 6.70336C6.96872 4.38609 8.82248 2.50246 11.101 2.50246C13.3798 2.50246 15.2336 4.38609 15.2336 6.7014C15.2336 9.01704 13.3798 10.9029 11.101 10.9029Z"
      fill="url(#paint1_linear_10728_4017)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.19104 9.85716L0.33024 12.6338H1.96388C2.37298 15.413 4.41572 16.6025 6.45846 16.9999C5.02806 16.0077 4.37591 14.6182 4.37591 12.6338H6.04937L3.19104 9.85716Z"
      fill="url(#paint2_linear_10728_4017)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_10728_4017"
        x1="-1.40816e-08"
        y1="2.55"
        x2="20.9742"
        y2="21.5854"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FFB8A1" />
        <stop offset="1" stop-color="#A62A00" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_10728_4017"
        x1="-1.40816e-08"
        y1="2.55"
        x2="20.9742"
        y2="21.5854"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FFB8A1" />
        <stop offset="1" stop-color="#A62A00" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_10728_4017"
        x1="-1.40816e-08"
        y1="2.55"
        x2="20.9742"
        y2="21.5854"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FFB8A1" />
        <stop offset="1" stop-color="#A62A00" />
      </linearGradient>
    </defs>
  </svg>
);

/* ---------------- PAGE ---------------- */
const ProfilePage = () => {
  const { token } = useAuthStore();

  const [activeTab, setActiveTab] = useState("bets");
  const [txnTab, setTxnTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [showBetsPublicly, setShowBetsPublicly] = useState(false);
  const [displayStats, setDisplayStats] = useState(false);
  const [receiveTips, setReceiveTips] = useState(false);
  const [showSecurityPasswordForm, setShowSecurityPasswordForm] =
    useState(false);

  const [securityPasswordData, setSecurityPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [bets, setBets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{ }");
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

  const handleSecurityPasswordChange = (e) => {
    const { name, value } = e.target;

    setSecurityPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
    <div className="min-h-screen bg-[#0D0E36] py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        {/* ================= TOP PROFILE TABS ================= */}
        {/* ============ MOBILE (tabs look different) ============ */}
        <div className="md:hidden mb-5 space-y-3">
          {/* Mobile tab selector */}
          <div className="w-full">
            <label className="block text-xs text-gray-400 mb-1">Section</label>
            <div className="relative">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="w-full bg-[#1A1B3E] border border-[#2B2C55] rounded-xl
                   text-white text-sm py-2.5 pl-3 pr-9
                   appearance-none"
              >
                {tabs.map((tab) => (
                  <option key={tab} value={tab} className="bg-[#1A1B3E]">
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </option>
                ))}
              </select>

              {/* little chevron */}
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 text-xs">
                ▼
              </span>
            </div>
          </div>

          {/* Mobile search below */}
          <div className="relative">
            <input
              placeholder={
                activeTab === "transactions"
                  ? "Search Transaction ID or Type"
                  : "Search bet ID or game"
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-4 py-2 bg-[#1A1B3E] border border-[#2B2C55] rounded-full text-white text-sm"
            />
          </div>
        </div>

        {/* ============ DESKTOP / TABLET (original pill tabs) ============ */}
        <div className="hidden md:flex items-center gap-3 mb-6 md:mb-8">
          <div
            className="
      trust_btn2 flex gap-1 p-1 rounded-full
      overflow-x-auto no-scrollbar
      max-w-full
    "
          >
            {tabs.map((tab) => (
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

          {/* SEARCH (desktop / tablet) */}
          <div className="ml-auto w-40 sm:w-56 md:w-72 relative">
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 px-3 sm:px-4 md:px-6 py-3 text-xs text-[#555594]">
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
        {activeTab === "profile" && (
          <div className="flex justify-center">
            <div className="w-full max-w-6xl bg-[#15163F] border border-[#2B2C55] rounded-2xl py-12 px-6 md:px-12">
              {/* AVATAR */}
              <div className="flex justify-center">
                <div className="relative">
                  <img src="./leaderboard-assets/astro-profile1.svg" />
                  <span className="text-[#989ACD] cursor-pointer"></span>
                  <button className="absolute top-1 right-0 text-xs px-2 py-1 rounded-full text-white">
                    <img src="./icons/frame.svg" />
                  </button>
                </div>
              </div>

              {/* PROFILE CARD */}
              <div className="flex justify-center">
                <div className="bg-[#1C1D49] border border-white/10 rounded-xl px-8 py-6 text-center w-full trust_btn max-w-md">
                  <h2 className="text-white font-semibold flex items-center justify-center gap-2">
                    🌙 Akshita
                    <span className="text-[#989ACD] cursor-pointer">✏️</span>
                  </h2>

                  <p className="text-sm text-[#989ACD] mt-1">
                    akshita@gmail.com
                  </p>

                  <div className="mt-4 bg-[#12133A] rounded-lg px-4 py-2 text-xs text-[#D6D7FA] flex justify-between items-center">
                    <span>Public ID:</span>
                    <span className="flex items-center gap-2">
                      HDCSHAC7A9S52B6QHGF56T8
                      <button className="text-[#7C7EFF]">📋</button>
                    </span>
                  </div>

                  <p className="text-[11px] text-[#555594] mt-3">
                    Member since November 20, 2023
                  </p>
                </div>
              </div>

              {/* WALLETS */}
              <div className="mt-10 md:mt-14 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                {/* BONUS WALLET */}
                <div className="bg-[#1C1D49] border border-white/10 rounded-xl px-6 py-4 w-full md:w-[260px] flex items-center trust_btn gap-4">
                  <div className="bg-[#2B2C55] p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      viewBox="0 0 80 80"
                      fill="none"
                    >
                      <circle
                        cx="40"
                        cy="40"
                        r="35"
                        stroke="white"
                        stroke-opacity="0.3"
                        stroke-width="10"
                      />
                      <path
                        d="M40 75C59.33 75 75 59.33 75 40C75 20.67 59.33 5 40 5"
                        stroke="white"
                        stroke-width="10"
                        stroke-linejoin="round"
                      />
                      <circle cx="40" cy="75" r="5" fill="white" />
                      <circle cx="40" cy="5" r="5" fill="white" />
                      <path
                        d="M39.5 29.8C46.9558 29.8 53 35.8889 53 43.4C53 50.9111 46.9558 57 39.5 57C32.0442 57 26 50.9111 26 43.4C26 35.8889 32.0442 29.8 39.5 29.8ZM39.5 33.2C33.9081 33.2 29.375 37.7667 29.375 43.4C29.375 49.0333 33.9081 53.6 39.5 53.6C45.0919 53.6 49.625 49.0333 49.625 43.4C49.625 37.7667 45.0919 33.2 39.5 33.2ZM43.9297 38.5125L45.4062 40L37.8125 47.65L33.5938 43.4L35.0703 41.9125L37.8125 44.675L43.9297 38.5125ZM53 23L48.4718 32.1249C46.1166 30.2205 43.152 29.0496 39.9195 28.9561L42.875 23H53ZM36.125 23L39.081 28.956C35.8486 29.0495 32.884 30.2202 30.5288 32.1244L26 23H36.125Z"
                        fill="white"
                        fill-opacity="0.5"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[#989ACD]">Bonus Wallet</p>
                    <p className="text-[#28C203] font-semibold">$4,00,000</p>
                  </div>
                </div>

                {/* CENTER GIF */}
                <div className="hidden md:flex items-center justify-center">
                  <img
                    src="/icons/wallet_transfer.gif"
                    alt="Wallet transfer"
                    className="w-[300px] h-auto select-none pointer-events-none"
                  />
                </div>

                {/* MAIN WALLET */}
                <div className="bg-[#1C1D49] border border-white/10 flex gap-4 items-center md:w-[260px] px-6 py-4 rounded-xl trust_btn w-full">
                  <div className="text-right">
                    <p className="text-sm text-[#989ACD]">Your Wallet</p>
                    <p className="text-[#28C203] font-semibold">$1,00,000</p>
                  </div>
                  <div className="bg-[#2B2C55] p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      viewBox="0 0 80 80"
                      fill="none"
                    >
                      <circle
                        cx="40"
                        cy="40"
                        r="35"
                        stroke="white"
                        stroke-opacity="0.3"
                        stroke-width="10"
                      />
                      <path
                        d="M40 75C59.33 75 75 59.33 75 40C75 20.67 59.33 5 40 5"
                        stroke="white"
                        stroke-width="10"
                        stroke-linejoin="round"
                      />
                      <circle cx="40" cy="75" r="5" fill="white" />
                      <circle cx="40" cy="5" r="5" fill="white" />
                      <path
                        d="M39.5 29.8C46.9558 29.8 53 35.8889 53 43.4C53 50.9111 46.9558 57 39.5 57C32.0442 57 26 50.9111 26 43.4C26 35.8889 32.0442 29.8 39.5 29.8ZM39.5 33.2C33.9081 33.2 29.375 37.7667 29.375 43.4C29.375 49.0333 33.9081 53.6 39.5 53.6C45.0919 53.6 49.625 49.0333 49.625 43.4C49.625 37.7667 45.0919 33.2 39.5 33.2ZM43.9297 38.5125L45.4062 40L37.8125 47.65L33.5938 43.4L35.0703 41.9125L37.8125 44.675L43.9297 38.5125ZM53 23L48.4718 32.1249C46.1166 30.2205 43.152 29.0496 39.9195 28.9561L42.875 23H53ZM36.125 23L39.081 28.956C35.8486 29.0495 32.884 30.2202 30.5288 32.1244L26 23H36.125Z"
                        fill="white"
                        fill-opacity="0.5"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* ================= SECURITY TAB ================= */}
        {activeTab === "security" && (
          <div className="flex justify-left">
            <div className="w-full max-w-2xl space-y-3">
              {/* ---- Create Password ---- */}
              <div className="bg-[#1C1D49] border border-white/10 rounded-xl p-4 flex items-start justify-between hover:bg-[#24245A] transition">
                <div>
                  <div className="flex items-center gap-2 text-white font-medium">
                    <DisplayIcon />
                    <span>Create Password</span>
                  </div>
                </div>
                <button
                  className="text-[#B7B8F5] hover:text-white"
                  onClick={() => setShowSecurityPasswordForm((prev) => !prev)}
                >
                  ➜
                </button>
              </div>
              <p className="text-sm text-[#A0A2D9] mt-2">
                Since you signed up with SSO, you’ll need to use the reset
                password flow to set a password.
              </p>
              {showSecurityPasswordForm && (
                <div className="bg-[#101233] border border-white/10 rounded-xl p-5 mt-2 space-y-4">
                  <label class="block text-sm text-gray-400 mb-2">
                    Current Password
                  </label>

                  {/* Current Password */}
                  <input
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    value={securityPasswordData.currentPassword}
                    onChange={handleSecurityPasswordChange}
                    className="w-full rounded-lg px-4 py-3 text-white border border-white/20 backdrop-blur-md"
                    style={{
                      background:
                        "linear-gradient(109deg, rgba(255,255,255,0.5) 1.57%, rgba(255,255,255,0.1) 100%)",
                    }}
                  />

                  <label class="block text-sm text-gray-400 mb-2">
                    New Password
                  </label>
                  {/* New Password */}
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={securityPasswordData.newPassword}
                    onChange={handleSecurityPasswordChange}
                    className="w-full rounded-lg px-4 py-3 text-white border border-white/20 backdrop-blur-md"
                    style={{
                      background:
                        "linear-gradient(109deg, rgba(255,255,255,0.5) 1.57%, rgba(255,255,255,0.1) 100%)",
                    }}
                  />

                  <label class="block text-sm text-gray-400 mb-2">
                    Confirm Password
                  </label>
                  {/* Confirm Password */}
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={securityPasswordData.confirmPassword}
                    onChange={handleSecurityPasswordChange}
                    className="w-full rounded-lg px-4 py-3 text-white border border-white/20 backdrop-blur-md"
                    style={{
                      background:
                        "linear-gradient(109deg, rgba(255,255,255,0.5) 1.57%, rgba(255,255,255,0.1) 100%)",
                    }}
                  />

                  <button
                    className="w-full py-3 rounded-lg text-white font-semibold"
                    style={{
                      background: "linear-gradient(90deg,#FFB8A1,#A62A00)",
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              )}

              {/* ---- Sessions ---- */}
              <div className="bg-[#1C1D49] border border-white/10 rounded-xl p-4 flex items-start justify-between hover:bg-[#24245A] transition">
                <div>
                  <div className="flex items-center gap-2 text-white font-medium">
                    <DisplayIcon />
                    <span> Sessions</span>
                  </div>
                </div>

                <button className="text-[#B7B8F5] hover:text-white">➜</button>
              </div>
              <p className="text-sm text-[#A0A2D9] mt-2">
                Keep track of your logins – see when, where, and which device
                you used.
              </p>

              {/* ---- Enable 2FA ---- */}
              <div className="bg-[#1C1D49] border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <DisplayIcon />
                    <span>Enable 2FA</span>
                  </div>

                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={twoFAEnabled}
                      onChange={() => setTwoFAEnabled(!twoFAEnabled)}
                    />
                    <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-checked:bg-green-500 transition relative">
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5" />
                    </div>
                  </label>
                </div>
              </div>
              <p className="text-sm text-[#A0A2D9] mt-2">
                Adds extra security to your account with Two-Factor
                Authentication.
              </p>
            </div>
          </div>
        )}

        {/* ================= PREFERENCES TAB ================= */}
        {activeTab === "preferences" && (
          <div className="flex justify-left">
            <div className="w-full max-w-2xl space-y-6">
              {/* ---- Show Bets Publicly ---- */}
              <div className="bg-[#1C1D49] border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-white font-medium">
                    <DisplayIcon />
                    <span>Show Bets Publicly</span>
                  </div>

                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={showBetsPublicly}
                      onChange={() => setShowBetsPublicly(!showBetsPublicly)}
                    />
                    <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-checked:bg-green-500 transition relative">
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5" />
                    </div>
                  </label>
                </div>
              </div>
              <p className="text-sm text-[#A0A2D9] mt-1">
                Show your username on bets you make in the live feed and recent
                wins.
              </p>

              {/* ---- Display Statistics ---- */}
              <div className="bg-[#1C1D49] border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-white font-medium">
                    <DisplayIcon />
                    <span>Display Statistics On Profile</span>
                  </div>

                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={displayStats}
                      onChange={() => setDisplayStats(!displayStats)}
                    />
                    <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-checked:bg-green-500 transition relative">
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5" />
                    </div>
                  </label>
                </div>
              </div>
              <p className="text-sm text-[#A0A2D9] mt-1">
                Display your total bet statistics on your profile for other
                players to see.
              </p>

              {/* ---- Tip Notifications ---- */}
              <div className="bg-[#1C1D49] border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <DisplayIcon />
                    <span> Receive Tip Notifications</span>
                  </div>

                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={receiveTips}
                      onChange={() => setReceiveTips(!receiveTips)}
                    />
                    <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-checked:bg-green-500 transition relative">
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5" />
                    </div>
                  </label>
                </div>
              </div>
              <p className="text-sm text-[#A0A2D9] mt-1">
                Receive a notification when a player sends you a tip.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
