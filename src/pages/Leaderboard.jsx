// src/pages/Leaderboard.jsx
// Podium Leaderboard matching design mock

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

        // Wire different endpoints later if your backend supports it
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

  const PodiumCard = ({ winner }) => {
    const isCenter = winner.position === "center";

    const heightClasses = isCenter
      ? "h-[320px] sm:h-[360px] lg:h-[388px]"
      : "h-[260px] sm:h-[300px] lg:h-[320px]";

    const delayMap = {
      left: 0.15,
      center: 0.05,
      right: 0.25,
    };

    const clipPath = isCenter
      ? "polygon(0 10%, 7% 0, 93% 0, 100% 10%, 100% 100%, 0 100%)"
      : winner.position === "left"
      ? "polygon(0 18%, 10% 0, 100% 0, 100% 100%, 0 100%)"
      : "polygon(0 0, 90% 0, 100% 18%, 100% 100%, 0 100%)";

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
        className={`relative flex flex-col items-center flex-1 min-w-0 ${marginTopClasses} ${scaleClasses}`}
      >
        {winner.isWinner && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute -top-4 z-30"
          >
            <img
              src="/leaderboard-assets/crown.svg"
              alt="Crown"
              className="w-8 h-8 sm:w-9 sm:h-9"
            />
          </motion.div>
        )}

        <div className="relative z-20 -mb-12 sm:-mb-14">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36">
            <img
              src="/leaderboard-assets/astro-profile1.svg"
              alt="Astronaut Helmet"
              className="absolute inset-0 w-full h-full"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={winner.profileInner}
                alt={winner.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${winner.name}&background=random`;
                }}
              />
            </div>
          </div>
        </div>

        <div
          className={`relative w-full max-w-xs sm:max-w-sm md:max-w-[320px] lg:max-w-[353px] ${heightClasses} rounded-t-[28px] overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.6)]`}
          style={{
            background:
              "linear-gradient(180deg, rgba(17,50,79,1) 0%, rgba(2,2,4,1) 82%)",
            clipPath,
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18)_0%,_transparent_55%)] opacity-80" />

          <div className="relative z-10 px-5 sm:px-7 pt-18 sm:pt-20 pb-6 sm:pb-7 flex flex-col h-full text-center">
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

            <p className="text-xs sm:text-sm text-gray-400 mb-3">
              Earn {winner.earned}
            </p>

            <div className="mb-3 sm:mb-4 flex items-center justify-center gap-2">
              <img
                src="/leaderboard-assets/diamond-white.svg"
                alt="Diamond"
                className="w-6 h-6 sm:w-7 sm:h-7"
              />
              <span className="text-xl sm:text-2xl font-['Neue_Plak'] font-bold">
                {winner.points}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 mb-3">
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
                <p className="text-gray-400">Ends in</p>
                <p className="text-white font-semibold text-sm sm:text-base">
                  {winner.endsIn}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <StarfieldBackground />

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] max-w-5xl h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(111,76,255,0.55) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-8 pt-10 pb-16">
        <div className="flex justify-center mb-10">
          <div className="inline-flex gap-1 p-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-black shadow-[0_0_18px_rgba(255,255,255,0.35)]"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20 text-gray-300 text-lg">
            Loading leaderboard...
          </div>
        ) : (
          <>
            {orderedTopWinners.length > 0 && (
              <div className="flex justify-center mb-8 md:mb-10">
                <div className="flex sm:flex-row justify-center items-end gap-6 lg:gap-8 w-full max-w-5xl">
                  {orderedTopWinners.map((winner, i) => (
                    <PodiumCard key={i} winner={winner} />
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-center mb-8">
              <div
                className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-black/80 border border-white/15 text-xs sm:text-sm text-gray-200 flex flex-wrap items-center gap-1 sm:gap-2 shadow-[0_12px_25px_rgba(0,0,0,0.7)]"
                style={{
                  backdropFilter: "blur(20px)",
                }}
              >
                <span className="text-gray-300">You earned</span>
                <span className="flex items-center gap-1 font-semibold text-white">
                  <img
                    src="/leaderboard-assets/diamond.svg"
                    alt="Diamond"
                    className="w-3.5 h-3.5"
                  />
                  0
                </span>
                <span className="text-gray-300">today and are ranked</span>
                <span className="font-semibold text-white">-</span>
                <span className="text-gray-300">out of</span>
                <span className="font-semibold text-white">
                  {userCount || 0} users
                </span>
              </div>
            </div>
          </>
        )}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="max-w-6xl mx-auto rounded-2xl overflow-hidden bg-black/70 border border-white/10 backdrop-blur-xl"
        >
          <div className="hidden md:grid grid-cols-[0.8fr,3fr,1.5fr] px-8 py-4 text-sm text-gray-400 border-b border-white/10 bg-white/5">
            <div>Rank</div>
            <div>User name</div>
            <div className="text-right">Points</div>
          </div>

          <div className="hidden md:block">
            {leaderboardData.map((user, index) => (
              <motion.div
                key={user.rank ?? index}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.4 + index * 0.03 }}
                className="px-4 py-2"
              >
                <div className="grid grid-cols-[0.8fr,3fr,1.5fr] items-center gap-4 px-4 py-3 rounded-full bg-gradient-to-r from-white/4 via-white/7 to-white/4 border border-white/8 shadow-[0_6px_18px_rgba(0,0,0,0.8)]">
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
                    <img
                      src="/leaderboard-assets/diamond.svg"
                      alt="Points"
                      className="w-4 h-4"
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

          <div className="md:hidden divide-y divide-white/5">
            {leaderboardData.map((user, index) => (
              <motion.div
                key={user.rank ?? index}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.3 + index * 0.03 }}
                className="px-3 py-2"
              >
                <div className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-full bg-gradient-to-r from-white/4 via-white/7 to-white/4 border border-white/8 shadow-[0_6px_18px_rgba(0,0,0,0.8)]">
                  <div className="flex items-center gap-2">
                    <span className="w-6 text-xs font-semibold text-gray-200 text-center">
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
                  <div className="flex items-center gap-1.5">
                    <img
                      src="/leaderboard-assets/diamond.svg"
                      alt="Points"
                      className="w-3.5 h-3.5"
                    />
                    <span className="text-xs font-semibold text-white">
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
                  ? "bg-white text-black shadow-[0_0_18px_rgba(255,255,255,0.4)]"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
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
                  ? "bg-white text-black shadow-[0_0_18px_rgba(255,255,255,0.4)]"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
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
