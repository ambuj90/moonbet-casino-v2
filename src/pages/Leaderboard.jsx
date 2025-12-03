// src/pages/Leaderboard.jsx
// Podium Leaderboard – matches provided design (desktop + mobile)

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import StarfieldBackground from "../components/leaderboard/StarfieldBackground";

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [currentPage, setCurrentPage] = useState(1);
  const [topWinners, setTopWinners] = useState([]);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: "daily", label: "Daily" },
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
    { id: "all-time", label: "All Time" },
  ];

  const totalPages = 11;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `/referral-service/api/leaderboard/top/all-time`
        );

        let leaderboard = [];
        if (response.data?.success) {
          leaderboard = response.data.data || [];
        }

        const enriched = leaderboard.map((item, index) => ({
          ...item,
          prize: "Prize",
          avatar: `/leaderboard-assets/astro-profile${(index % 5) + 1}.svg`,
          profileInner: `/leaderboard-assets/profile${(index % 5) + 1}.svg`,
          icon: `/leaderboard-assets/group${(index % 5) + 1}.svg`,
          earned: `${Math.floor(item.points / 4) || 50}+ points`,
        }));

        const topThree = enriched.slice(0, 3);
        const others = enriched.slice(3);

        const formattedTop = topThree.map((item, i) => {
          let position = "center";
          if (i === 1) position = "left";
          if (i === 2) position = "right";

          return {
            ...item,
            position,
            isWinner: i === 0,
          };
        });

        setTopWinners(formattedTop);
        setLeaderboardData(others);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [activeTab]);

  const orderedTopWinners = useMemo(() => {
    const weight = { left: 0, center: 1, right: 2 };
    return [...topWinners].sort(
      (a, b) => (weight[a.position] || 0) - (weight[b.position] || 0)
    );
  }, [topWinners]);

  const userCount = topWinners.length + leaderboardData.length;

  const podiumBgByPosition = {
    left: "/leaderboard-assets/left-podium.svg",
    center: "/leaderboard-assets/center-podium.svg",
    right: "/leaderboard-assets/right-podium.svg",
  };

  const PodiumCard = ({ winner }) => {
    const isCenter = winner.position === "center";

    const heightClasses = isCenter
      ? "h-[340px] sm:h-[380px] lg:h-[410px]"
      : "h-[290px] sm:h-[330px] lg:h-[360px]";

    const delayMap = {
      left: 0.15,
      center: 0.05,
      right: 0.25,
    };

    const marginTopClasses =
      winner.position === "center" ? "sm:mt-0" : "sm:mt-6 lg:mt-[52px]";

    const scaleClasses =
      winner.position === "center"
        ? "sm:scale-105"
        : "sm:scale-[0.9] lg:scale-100";

    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delayMap[winner.position] || 0 }}
        className={`relative flex flex-col items-center flex-1 min-w-[230px] ${marginTopClasses} ${scaleClasses}`}
      >
        {winner.isWinner && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute top-8 left-1/2 z-30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="37"
              height="37"
              viewBox="0 0 37 37"
              fill="none"
            >
              <path
                d="M0.266001 24.0488C0.686392 23.5226 1.47125 23.435 1.99745 23.8554L14.8314 34.1084C15.3576 34.5287 15.4451 35.3136 15.0248 35.8398C14.6044 36.366 13.8195 36.4545 13.2933 36.0341L0.459361 25.7802C-0.0667064 25.3598 -0.154304 24.5749 0.266001 24.0488Z"
                fill="url(#paint0_linear_9665_5200)"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.92713 1.11227C10.4572 -0.419661 12.6279 -0.346635 13.0805 1.19234L15.2816 8.96383C15.5619 10.0077 16.7599 10.4816 17.6908 9.92184L25.2875 5.415C26.5902 4.62674 28.1682 5.88741 27.6869 7.33199L24.9447 15.7382C24.6144 16.7569 25.3544 17.8319 26.4242 17.8877L34.4906 18.3183C36.0886 18.3971 36.6391 20.4978 35.2494 21.3427L17.9652 32.0283C17.3857 32.3853 16.6205 32.3427 16.0814 31.9121L3.85096 22.1406C3.31193 21.7099 3.0912 20.986 3.32167 20.3291L9.92713 1.11227ZM12.639 17.1142C12.1129 16.6939 11.328 16.7814 10.9076 17.3076C10.4875 17.8337 10.575 18.6186 11.101 19.039L17.518 24.166C18.0441 24.5863 18.83 24.4987 19.2504 23.9726C19.6708 23.4464 19.5822 22.6606 19.056 22.2402L12.639 17.1142Z"
                fill="url(#paint1_linear_9665_5200)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_9665_5200"
                  x1="-2.81969e-08"
                  y1="5.44497"
                  x2="44.4179"
                  y2="43.2482"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FFB8A1" />
                  <stop offset="1" stop-color="#A62A00" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_9665_5200"
                  x1="-2.81969e-08"
                  y1="5.44497"
                  x2="44.4179"
                  y2="43.2482"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FFB8A1" />
                  <stop offset="1" stop-color="#A62A00" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        )}

        {/* Helmet avatar */}
        <div className="relative z-20 mt-12 sm:-mb-10">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36">
            <img
              src="/leaderboard-assets/astro-profile1.svg"
              alt="Astronaut Helmet"
              className="absolute object-contain inset-0 w-full h-full"
            />
            <div className="absolute inset-0 flex items-center justify-center -mt-4">
              <img
                src={winner.profileInner}
                alt={winner.name}
                className="w-20 h-20 sm:w-20 sm:h-20 rounded-full object-cover"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${winner.name}&background=random`;
                }}
              />
            </div>
          </div>
        </div>

        {/* Podium block using SVG as full background */}
        <div
          className={`relative w-full max-w-[320px] lg:max-w-[353px] ${heightClasses} flex items-stretch justify-center`}
        >
          <div
            className="relative w-full h-full rounded-[24px] overflow-hidden"
            style={{
              backgroundImage: `url(${podiumBgByPosition[winner.position]})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top center",
            }}
          >
            {/* Slight top glow */}
            <div className="absolute inset-0" />

            <div className="relative z-10 px-6 sm:px-8 pt-20 sm:pt-20 flex flex-col h-full text-center">
              <h3 className="text-xl sm:text-2xl font-['Neue_Plak'] font-bold mb-3 sm:mb-4 truncate">
                {winner.name}
              </h3>

              {winner.icon && (
                <div className="mb-3 sm:mb-4 flex justify-center">
                  <img
                    src={winner.icon}
                    alt="Icon"
                    className="w-11 h-11 sm:w-12 sm:h-12"
                  />
                </div>
              )}

              <p className="text-xs sm:text-sm text-gray-200 mb-3">
                Earn {winner.earned}
              </p>

              <div className="mb-3 sm:mb-4 flex items-center justify-center gap-2">
                <div
                  className="w-5 h-5"
                  style={{
                    WebkitMaskImage: "url(/leaderboard-assets/diamond.svg)",
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    background:
                      "linear-gradient(131deg, #FFB8A1 6.92%, #A62A00 121.35%)",
                  }}
                />
                <span className="text-xl sm:text-2xl font-['Neue_Plak'] font-bold">
                  {winner.points}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-200 mb-3">
                {winner.prize}
              </p>

              <div className="mb-3">
                <img
                  src="/leaderboard-assets/alarm-clock.svg"
                  alt="Alarm"
                  className="w-8 h-8 sm:w-9 sm:h-9 mx-auto"
                />
              </div>

              {winner.endsIn && (
                <div className="mt-auto text-xs sm:text-sm">
                  <p className="text-gray-300">Ends in</p>
                  <p className="text-white font-semibold text-sm sm:text-base">
                    {winner.endsIn}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <StarfieldBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-8 pt-10 pb-16">
        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="trust_btn inline-flex gap-1 p-2 rounded-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-2 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "text-white "
                    : "text-gray-300 hover:text-white"
                }`}
                style={
                  activeTab === tab.id
                    ? { background: "var(--cta-pink-gradient)" }
                    : {}
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Podium area */}
        {loading ? (
          <div className="flex justify-center items-center py-20 text-gray-300 text-lg">
            Loading leaderboard...
          </div>
        ) : (
          <>
            {orderedTopWinners.length > 0 && (
              <div className="flex justify-center mb-8 md:mb-10">
                <div className="flex sm:flex-row justify-center items-end gap-2 lg:gap-2 w-full max-w-5xl">
                  {orderedTopWinners.map((winner, i) => (
                    <PodiumCard key={i} winner={winner} />
                  ))}
                </div>
              </div>
            )}

            {/* Prize Pool + Your Position bar with glow */}
            <div className="relative flex justify-center mb-10">
              {/* Glow behind bar (from your glow SVG) */}
              <div
                className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px]"
                style={{
                  background:
                    "radial-gradient(circle, rgba(244,116,251,0.5) 0%, rgba(244,116,251,0) 70%)",
                  filter: "blur(90px)",
                  opacity: 0.75,
                }}
              />
              <div className="flex flex-wrap items-stretch gap-2 rounded-full bg-[#101338] border border-white/10 px-2 py-1.5 text-xs sm:text-sm shadow-[0_14px_30px_rgba(0,0,0,0.7)]">
                {/* Prize Pool */}
                <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5">
                  <span className="flex h-5 w-5 items-center justify-center text-[11px]">
                    🏆
                  </span>
                  <span className="text-gray-200">Prize Pool</span>
                  <span className="ml-1 font-semibold">$0.00</span>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px bg-white/10 mx-1" />

                {/* Your Position */}
                <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5">
                  <span className="flex h-5 w-5 items-center justify-center text-[11px]">
                    👤
                  </span>
                  <span className="text-gray-200">Your Position</span>
                  <span className="ml-1 font-semibold">-</span>
                  <svg
                    className="w-3.5 h-3.5 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="customborder max-w-6xl mx-auto rounded-2xl overflow-hidden backdrop-blur-xl"
        >
          <div
            className="hidden md:grid grid-cols-3 px-8 py-4 text-sm mt-6"
            style={{
              color: "var(--moon-silver)",
            }}
          >
            <div>Rank</div>
            <div>User name</div>
            <div className="text-right">Points</div>
          </div>

          {/* Desktop rows */}
          <div className="hidden md:block">
            {leaderboardData.map((user, index) => (
              <motion.div
                key={user.rank ?? index}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.4 + index * 0.03 }}
                className="px-4 py-2"
              >
                {/* ⭐ TABLE ROW DEFAULT STYLE UPDATE */}
                <div
                  className="trust_btn grid grid-cols-3 items-center gap-4 px-4 py-3 rounded-[8px] transition-all"
                  style={{
                    borderRadius: "8px",

                    background: "#1C1D49",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#35326B";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#1C1D49";
                  }}
                >
                  <div className="text-sm font-semibold text-gray-200">
                    {user.rank}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${user.username}&background=random`;
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-white truncate">
                      {user.username}
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    {/* ⭐ DIAMOND COLOR FIX */}
                    <div
                      className="w-4 h-4"
                      style={{
                        WebkitMaskImage: "url(/leaderboard-assets/diamond.svg)",
                        WebkitMaskSize: "contain",
                        WebkitMaskRepeat: "no-repeat",
                        background:
                          "linear-gradient(131deg, #FFB8A1 6.92%, #A62A00 121.35%)",
                      }}
                    />
                    <span className="text-sm font-semibold text-white">
                      {user.points}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {!leaderboardData.length && !loading && (
              <div className="py-8 text-center text-gray-400 text-sm">
                No leaderboard entries
              </div>
            )}
          </div>

          {/* Mobile rows */}
          <div className="md:hidden divide-y divide-white/5">
            {leaderboardData.map((user, index) => (
              <motion.div
                key={user.rank ?? index}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.3 + index * 0.03 }}
                className="px-3 py-2"
              >
                <div className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-2xl bg-[#282753]/70 border border-white/8 shadow-[0_6px_18px_rgba(0,0,0,0.8)]">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-6 text-xs font-semibold text-gray-200 text-center flex-shrink-0">
                      {user.rank}
                    </span>
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${user.username}&background=random`;
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium text-white truncate max-w-[120px]">
                      {user.username}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <img
                      src="/leaderboard-assets/diamond.svg"
                      alt="Points"
                      className="w-3.5 h-3.5"
                    />
                    <span className="text-xs font-semibold text_white">
                      {user.points}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {!leaderboardData.length && !loading && (
              <div className="py-6 text-center text-gray-400 text-xs">
                No leaderboard entries
              </div>
            )}
          </div>
        </motion.div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
          >
            <svg
              className="w-4 h-4 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full text-xs sm:text-sm font-medium transition-all ${
                currentPage === page
                  ? "bg-white text.black shadow-[0_0_18px_rgba(255,255,255,0.4)] text-black"
                  : "bg.white/5 text-gray-300 hover:bg-white/10 border border-white/10 bg-white/5"
              }`}
            >
              {page}
            </button>
          ))}

          <span className="text-gray-400 text-xs sm:text-sm px-1">...</span>

          {[10, 11].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full text-xs sm:text-sm font-medium transition-all ${
                currentPage === page
                  ? "bg.white text-black shadow-[0_0_18px_rgba(255,255,255,0.4)] bg-white"
                  : "bg.white/5 text-gray-300 hover:bg-white/10 border border-white/10 bg-white/5"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            className="p-2 rounded-lg bg.white/5 hover:bg-white/10 transition-colors border border-white/10 disabled:opacity-40 disabled:cursor-not-allowed bg-white/5"
            disabled={currentPage === totalPages}
          >
            <svg
              className="w-4 h-4 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
