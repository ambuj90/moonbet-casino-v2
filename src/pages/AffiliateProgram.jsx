import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";

const AffiliateProgram = () => {
  const [referralCode, setReferralCode] = useState("");
  const [isCodeSet, setIsCodeSet] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Date");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [points, setPoints] = useState({ referrer: 0, referee: 0 });
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id;
  const { token, isLoggedIn } = useAuthStore();

  // Mock data - replace with actual data from your backend
  const [stats, setStats] = useState({
    totalReferrals: 0,
    totalWagered: 0.0,
    totalEarnings: 0.0,
    pendingIncome: 0.0,
  });

  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    const fetchReferralStats = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No auth token found");
          return;
        }

        const { data } = await axios.get(
          `/referral-service/api/referral/stats/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (data?.success && data.data) {
          const info = data.data;

          // ✅ Get referral code if exists
          const code = info.asReferrer?.code || "";
          if (code) {
            setReferralCode(code);
            setIsCodeSet(true);

            const frontendUrl = window.origin;
            setGeneratedLink(`${frontendUrl}/register?ref=${code}`);

            // ✅ Stats update with backend totals
            setStats({
              totalReferrals: info.totals?.totalReferrals || 0,
              totalWagered: 0,
              totalEarnings: info.totals?.totalPointsOverall || 0, // 💰 comes from backend now
              pendingIncome: 0,
            });

            // ✅ Combine referrals list
            setReferrals(info.asReferrer?.recentReferrals || []);
          } else {
            setIsCodeSet(false);
            setReferrals([]);
          }
        }
      } catch (error) {
        console.error("❌ Failed to fetch referral stats:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReferralStats();
  }, []);

  // Generate random referral code
  const generateReferralCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  const handleGenerateCode = async () => {
    try {
      setLoading(true);

      if (!isLoggedIn || !token) {
        alert("You must be logged in to generate a referral code.");
        return;
      }

      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const { data } = await axios.post(
        "/referral-service/api/referral/generate-code",
        {
          userId: user.id,
          userInfo: {
            username: user.username,
            email: user.email,
            displayName: user.displayName,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",

            // 🔥 REQUIRED 🔥
            "x-internal-secret": import.meta.env.VITE_INTERNAL_API_KEY,
          },
        }
      );

      if (data?.success) {
        const info = data.data;
        setReferralCode(info.code);
        setGeneratedLink(info.shareLink);
        setPoints(info.points);
        setIsCodeSet(true);
      }
    } catch (error) {
      console.error("Referral API error:", error);
      alert(error.response?.data?.message || "Error generating referral code");
      console.log("❌ ERROR RESPONSE:", error.response);
    } finally {
      setLoading(false);
    }
  };

  // Handle copying the link
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Handle claiming pending income
  const handleClaim = () => {
    console.log("Claiming pending income...");
  };

  // Glass card styles
  const glassCardStyle = {
    borderRadius: "32px",
    border: "1px solid rgba(255, 255, 255, 0.40)",
    background:
      "linear-gradient(0deg, rgba(30, 30, 30, 0.15) 0%, rgba(75, 75, 75, 0.15) 100%)",
    backdropFilter: "blur(2px)",
    WebkitBackdropFilter: "blur(2px)",
  };

  // Typography styles
  const titleStyle = {
    color: "#C1C1C1",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "normal",
  };

  const subHeadingStyle = {
    color: "#CED5E3",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "18px",

    fontFamily: "Neue Plak",
    textTransform: "capitalize",
  };

  const h2Style = {
    color: "#E5EAF2",
    textAlign: "center",
    fontFamily: "Neuropolitical, sans-serif",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "44px",
    textTransform: "uppercase",
  };

  return (
    <div className="min-h-screen   ">
      {/* Background gradient effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#13151A]/30 via-transparent to-[#1A1D24]/30 pointer-events-none" />
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50">
          <img
            src="/icons/moonlogo.gif"
            alt="Loading..."
            className="w-32 h-32 object-contain animate-pulse"
          />
        </div>
      )}

      <div className=" z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section with Affiliate Program */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          {/* Main Glass Card */}
          <div className="main-grid-affi">
            <div className="trust_btn grid lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="space-y-6 md:px-12 px:4 p-4">
                {/* Title with icon */}
                <div className="flex items-center gap-4">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  <h2 style={{ ...h2Style, textAlign: "left" }}>
                    Affiliate Program
                  </h2>
                </div>

                <p style={subHeadingStyle}>
                  Share Moonbet with your friends and earn as they play
                </p>

                {/* Referral Code Section - Modified */}
                <AnimatePresence mode="wait">
                  {!isCodeSet ? (
                    <motion.div
                      key="generate"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <button
                        onClick={handleGenerateCode}
                        className="w-full sm:w-auto px-8 py-3.5 text-[#rgba(255, 255, 255, 0.50)] font-[400] text-[14px] rounded-[8px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                        style={{
                          borderRadius: "8px",
                          border: "1px solid rgba(255, 255, 255, 0.80)",
                          opacity: 0.5,

                          backdropFilter: "blur(30px)",
                          WebkitBackdropFilter: "blur(30px)",
                        }}
                      >
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
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        Generate Referral Code
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="display"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="space-y-4"
                    >
                      {/* Display the referral code */}
                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <div
                          style={{
                            ...subHeadingStyle,

                            padding: "14px 20px",
                          }}
                          className="trust_btn flex items-center gap-3"
                        >
                          <span className="text-gray-400">Code:</span>
                          <span className=" font-bold text-xl">
                            {referralCode}
                          </span>
                        </div>
                      </div>

                      {/* Display the link with copy button */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div
                          style={{
                            ...subHeadingStyle,
                            border: "1px solid",
                            borderRadius: "12px",
                            padding: "14px 20px",
                          }}
                          className="flex-1 flex items-center overflow-hidden"
                        >
                          <span className="truncate text-sm">
                            {generatedLink}
                          </span>
                        </div>
                        <button
                          onClick={handleCopy}
                          className="w-12 h-12 bg-gradient-to-r from-[#ffb8a1] to-[#a62a00] text-white font-bold 
                                   rounded-xl hover:shadow-lg hover:shadow-[#F07730]/25 transition-all duration-200
                                   hover:scale-[1.02] active:scale-[0.98] min-w-[100px]
                                   flex items-center justify-center"
                        >
                          {copied ? (
                            <>
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
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              Copied!
                            </>
                          ) : (
                            <>
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
                                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                              </svg>
                              Copy
                            </>
                          )}
                        </button>
                      </div>

                      {/* Generate New Code Button */}
                      <button
                        onClick={handleGenerateCode}
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        Generate new code
                      </button>
                      {points.referrer > 0 && (
                        <div className="text-gray-400 text-sm mt-2">
                          <p>
                            You earn{" "}
                            <span className="text-[#F07730] font-bold">
                              {points.referrer}
                            </span>{" "}
                            points per referral.
                          </p>
                          <p>
                            Your friend earns{" "}
                            <span className="text-[#10B981] font-bold">
                              {points.referee}
                            </span>{" "}
                            points when they join.
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Side - Visual Element */}
              <div className="hidden lg:flex justify-content-start -mt-2 z-20">
                <div className="relative">
                  <img
                    src="/affiliates/astro-affilaite-final.svg"
                    alt="Affiliate Illustration"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8"
        >
          {/* Total Referrals Card */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative">
            <div className="p-2">
              <p className="affiliate-para">Total Referrals</p>
              <div className="trust_btn flex items-center gap-3  relative p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="18"
                  viewBox="0 0 19 18"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 11.0826L1.50788 11.1131L3.6168 8.96536L5.28872 10.6697C5.72581 10.0967 6.26313 9.6166 6.88753 9.24862L6.99724 9.18497L7.08325 9.27711L6.71316 7.68072C6.41094 7.75925 6.09688 7.79971 5.77631 7.79971C4.73402 7.79971 3.76173 7.37276 3.03841 6.5999L2.9524 6.50777L2.84269 6.5713C1.31272 7.47306 0.306496 9.04847 0.0108933 11.0113L0 11.0826ZM5.7763 7.01097C3.88059 7.01097 2.33824 5.43872 2.33824 3.50609C2.33824 1.57214 3.88059 0 5.7763 0C7.41736 0 8.79347 1.17794 9.13367 2.74781C7.69568 3.2535 6.47709 4.97501 6.46406 6.94026C6.24177 6.9865 6.01182 7.01097 5.7763 7.01097Z"
                    fill="url(#paint0_linear_10064_1292)"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.2141 18H18.9888C19.1192 15.0711 18.1211 12.565 15.4398 10.9865L15.3029 10.9057L15.1916 11.0226C14.2739 12.0031 13.0404 12.5449 11.7177 12.5449C10.3953 12.5449 9.16189 12.0031 8.24413 11.0226L8.13499 10.9057L7.99591 10.9865C7.42817 11.321 6.93601 11.6974 6.51368 12.1105L8.3126 13.9441H5.49752C5.62486 15.3375 6.13305 16.4856 7.34173 17.3652L8.2141 18ZM11.7177 11.5442C9.31262 11.5442 7.35587 9.54954 7.35587 7.09767C7.35587 4.64409 9.31262 2.64966 11.7177 2.64966C14.1231 2.64966 16.08 4.64409 16.08 7.0956C16.08 9.54745 14.1231 11.5442 11.7177 11.5442Z"
                    fill="url(#paint1_linear_10064_1292)"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.36832 10.437L0.348586 13.377H2.07298C2.50481 16.3196 4.66104 17.5791 6.81726 17.9999C5.30739 16.9493 4.61901 15.4781 4.61901 13.377H6.38545L3.36832 10.437Z"
                    fill="url(#paint2_linear_10064_1292)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_10064_1292"
                      x1="-1.48639e-08"
                      y1="2.7"
                      x2="22.2012"
                      y2="22.7868"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#FFB8A1" />
                      <stop offset="1" stop-color="#A62A00" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_10064_1292"
                      x1="-1.48639e-08"
                      y1="2.7"
                      x2="22.2012"
                      y2="22.7868"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#FFB8A1" />
                      <stop offset="1" stop-color="#A62A00" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_10064_1292"
                      x1="-1.48639e-08"
                      y1="2.7"
                      x2="22.2012"
                      y2="22.7868"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#FFB8A1" />
                      <stop offset="1" stop-color="#A62A00" />
                    </linearGradient>
                  </defs>
                </svg>
                <span style={titleStyle}>{stats.totalReferrals}</span>
              </div>
            </div>
          </motion.div>

          {/* Total Earnings Card */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative">
            <div className="p-2">
              <p className="affiliate-para">Total Earnings</p>
              <div className="trust_btn flex items-center gap-3 p-3 relative ">
                <span className="inline-flex items-center gap-3 align-middle">
                  <span style={titleStyle} className="flex items-center gap-1">
                    {stats.totalEarnings.toFixed(0)}
                  </span>
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Referrals Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div
            className="trust_btn overflow-hidden "
            style={{
              background: "#0D0E36 ",
            }}
          >
            {/* Table Header */}
            <div className="p-6 border-b border-white/20">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-[#9292D2]">Your Referrals</p>

                <div className="flex gap-3 w-full sm:w-auto">
                  {/* Search Input */}
                  <div className="affiliate-para2 relative inline-flex items-center rounded-[8px] px-3 py-[8px] w-full sm:w-[200px]">
                    <svg
                      className="w-4 h-4 mr-2 text-[#555594] flex-shrink-0"
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
                      placeholder="Search Users"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        color: "#555594",
                        fontFeatureSettings: "'ss01' on, 'cv01' on",
                        fontFamily: "Neue Plak, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "20px",
                        letterSpacing: "0",
                      }}
                      className="bg-transparent w-full placeholder-[#555594] focus:outline-none"
                    />
                  </div>

                  {/* Sort Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setShowSortDropdown(!showSortDropdown)}
                      style={{
                        color: "#A7A7A7",
                        fontFeatureSettings: "'ss01' on, 'cv01' on",
                        fontFamily: "Neue Plak, sans-serif",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "20px",
                        letterSpacing: "0",

                        borderRadius: "8px",
                        padding: "8px 16px",

                        backdropFilter: "blur(30px)",
                      }}
                      className="affiliate-para2 flex items-center gap-2  transition-all duration-200"
                    >
                      <span className="text-[#555594]">Sort By:</span>
                      <span className="text-[#E1E1E1]">{sortBy}</span>
                      <svg
                        className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                          showSortDropdown ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {showSortDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          style={{
                            ...glassCardStyle,
                            borderRadius: "12px",
                          }}
                          className="absolute right-0 mt-2 py-2 w-48 z-10"
                        >
                          {["Date", "Username", "Wagered", "Earnings"].map(
                            (option) => (
                              <button
                                key={option}
                                onClick={() => {
                                  setSortBy(option);
                                  setShowSortDropdown(false);
                                }}
                                style={subHeadingStyle}
                                className="block w-full px-4 py-2 text-left hover:bg-white/10 transition-all duration-200"
                              >
                                {option}
                              </button>
                            )
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* Table Content */}
            <div className="p-1">
              {!referrals || referrals.length === 0 ? (
                <>
                  <p style={h2Style}>Share Referral for Earning</p>
                </>
              ) : (
                <div className="overflow-x-auto w-full">
                  <table className="min-w-full text-left ">
                    <thead>
                      <tr className="text-[#9292D2] text-sm uppercase ">
                        <th className="px-4 py-3">#</th>
                        <th className="px-4 py-3">Referee ID</th>
                        <th className="px-4 py-3">Points</th>
                        <th className="px-4 py-3">Date</th>
                      </tr>
                    </thead>

                    <tbody>
                      {referrals.map((ref, idx) => (
                        <motion.tr
                          key={idx}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.04 }}
                          className={`text-gray-200
                ${idx % 2 === 0 ? "bg-white/5" : "bg-transparent"}
                hover:bg-white/10 transition-colors`}
                        >
                          <td className="px-4 py-3">{idx + 1}</td>

                          <td className="px-4 py-3">Player_8ec0</td>

                          <td className="px-4 py-3 text-[#10B981] font-semibold">
                            +{ref.pointsEarned}
                          </td>

                          <td className="px-4 py-3 text-gray-400">
                            {new Date(ref.referredAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AffiliateProgram;
