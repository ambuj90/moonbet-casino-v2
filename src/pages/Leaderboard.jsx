// Leaderboard.jsx - Fixed Podium Dimensions
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import StarfieldBackground from "../components/leaderboard/StarfieldBackground";

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [currentPage, setCurrentPage] = useState(1);
  const [topWinners, setTopWinners] = useState([]);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Tab options
  const tabs = [
    { id: "daily", label: "Daily" },
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
    { id: "all-time", label: "All Time" },
  ];

  // Leaderboard data

  const totalPages = 11;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);

        // ✅ Fetch leaderboard data from backend
        const response = await axios.get(
          `/referral-service/api/leaderboard/top/all-time`
        );

        let leaderboard = [];
        if (response.data?.success) {
          leaderboard = response.data.data || [];
        }

        // 🧩 Add static UI fields to each dynamic user
        const enrichedLeaderboard = leaderboard.map((item, index) => ({
          ...item,
          prize: "Prize",
          avatar: `/leaderboard-assets/astro-profile${(index % 5) + 1}.svg`,
          profileInner: `/leaderboard-assets/profile${(index % 5) + 1}.svg`,
          icon: `/leaderboard-assets/group${(index % 5) + 1}.svg`,
          earned: `${Math.floor(item.points / 4) || 50}+ points`,
          position:
            index % 3 === 0 ? "left" : index % 3 === 1 ? "center" : "right",
          bgColor:
            index % 2 === 0
              ? "from-gray-400 to-gray-600"
              : "from-yellow-400 to-yellow-600",
        }));

        // 🥇 Split top 3 for podium and others for table
        const topThree = enrichedLeaderboard.slice(0, 3);
        const others = enrichedLeaderboard.slice(3);

        // 🧭 Assign final positions for podium winners
        const positions = ["left", "center", "right"];
        const formattedTop = topThree.map((item, i) => ({
          ...item,
          position: positions[i] || "center",
          isWinner: i === 1, // Center winner
        }));

        setTopWinners(formattedTop);
        setLeaderboardData(others);
      } catch (error) {
        console.error("❌ Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [activeTab]);

  // Podium card component with fixed dimensions
  const PodiumCard = ({ winner }) => {
    // Heights for each position
    const heightMap = {
      left: "320px",
      center: "388px", // Main winner gets full height
      right: "320px",
    };

    // Margin top to align bottoms properly
    const marginTop = {
      left: "68px", // 388 - 320 = 68px difference
      center: "0",
      right: "68px",
    };

    const delayMap = {
      left: 0.2,
      center: 0,
      right: 0.4,
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delayMap[winner.position] }}
        className="relative flex flex-col items-center"
        style={{
          width: "353px",
          marginTop: marginTop[winner.position],
        }}
      >
        {/* Crown for winner */}
        {winner.isWinner && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute -top-1 z-30"
          >
            <img
              src="/leaderboard-assets/crown.svg"
              alt="Crown"
              className="w-7 h-7"
            />
          </motion.div>
        )}

        {/* Avatar Container with astronaut helmet */}
        <div className="relative z-20" style={{ marginBottom: "-60px" }}>
          <div className="relative w-40 h-40">
            {/* Astronaut Helmet Background */}
            <img
              src="/leaderboard-assets/astro-profile1.svg"
              alt="Astronaut Helmet"
              className="absolute inset-0 w-full h-full"
            />
            {/* Profile Image Inside - positioned in the helmet visor */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={winner.profileInner}
                alt={winner.name}
                className="w-24 h-24 rounded-full object-cover"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${winner.name}&background=random`;
                }}
              />
            </div>
          </div>
        </div>

        {/* Podium Card - Fixed 353px width */}
        <div
          className="relative rounded-t-[32px] overflow-hidden"
          style={{
            width: "353px",
            height: heightMap[winner.position],
            background: "linear-gradient(180deg, #11324F 0%, #000 82.23%)",
          }}
        >
          {/* Gradient overlay at top */}
          <div className={`absolute top-0 left-0 right-0 h-32  opacity-20`} />

          {/* Content */}
          <div className="relative z-10 px-8 pt-20 pb-8 text-center text-white h-full flex flex-col">
            <h3 className="text-2xl font-['Neue_Plak'] font-bold mb-4">
              {winner.name}
            </h3>

            {/* Icon */}
            {winner.icon && (
              <div className="mb-4">
                <img
                  src={winner.icon}
                  alt="Icon"
                  className="w-14 h-14 mx-auto"
                />
              </div>
            )}

            {/* Earned Points */}
            <p className="text-sm text-gray-400 mb-4">Earn {winner.earned}</p>

            {/* Points with diamond */}
            <div className="mb-4 flex items-center justify-center gap-2">
              <img
                src="/leaderboard-assets/diamond-white.svg"
                alt="Diamond"
                className="w-7 h-7"
              />
              <span className="text-2xl font-['Neue_Plak'] font-bold">
                {winner.points}
              </span>
            </div>

            {/* Prize Label */}
            <p className="text-base text-gray-400 mb-4">{winner.prize}</p>

            {/* Alarm Icon */}
            <div className="mb-4">
              <img
                src="/leaderboard-assets/alarm-clock.svg"
                alt="Alarm"
                className="w-10 h-10 mx-auto"
              />
            </div>

            {/* Ends In (for winner) */}
            {winner.endsIn && (
              <div className="mt-auto text-sm">
                <p className="text-gray-400">Ends in</p>
                <p className="text-white font-semibold text-base">
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
    <div className="min-h-screen bg-[#0A0B0F] relative overflow-hidden">
      {/* Animated Background */}
      <StarfieldBackground />

      {/* Blue glow arc at top */}
      <div
        className="absolute top-0 left-0 right-0 h-64"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Tabs */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex gap-1 p-1 rounded-full bg-[#080808]/50 backdrop-blur-sm border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-400 text-lg">
            Loading leaderboard...
          </div>
        ) : (
          <>
            {/* Top 3 Podium Section - Fixed Width Container */}
            <div className="flex justify-center mb-12">
              <div className="flex items-end gap-8">
                {topWinners.map((winner, i) => (
                  <PodiumCard key={i} winner={winner} />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="max-w-7xl mx-auto rounded-2xl overflow-hidden bg-[#080808]/30 backdrop-blur-sm border border-white/10"
        >
          {/* Table Header */}
          <div className="grid grid-cols-3 px-8 py-4 border-b border-white/10 bg-[#080808]/50">
            <div className="text-gray-500 text-sm font-medium">Rank</div>
            <div className="text-gray-500 text-sm font-medium">User name</div>
            <div className="text-gray-500 text-sm font-medium text-right">
              Points
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/5">
            {leaderboardData.map((user, index) => (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                className="grid grid-cols-3 px-8 py-4 hover:bg-white/5 transition-colors items-center"
              >
                <div className="text-white font-semibold">{user.rank}</div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-800">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${user.username}&background=random`;
                      }}
                    />
                  </div>
                  <span className="text-white">{user.username}</span>
                </div>
                <div className="text-right flex items-center justify-end gap-2">
                  <img
                    src="/leaderboard-assets/diamond.svg"
                    alt="Heart"
                    className="w-5 h-5"
                  />
                  <span className="text-[#fff] font-semibold">
                    {user.points}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
          >
            <svg
              className="w-5 h-5 text-gray-400"
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
              className={`w-10 h-10 rounded-lg font-medium transition-all ${
                currentPage === page
                  ? "bg-white text-black"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
              }`}
            >
              {page}
            </button>
          ))}

          <span className="text-gray-400">...</span>

          {[10, 11].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className="w-10 h-10 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 font-medium transition-all border border-white/10"
            >
              {page}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
          >
            <svg
              className="w-5 h-5 text-gray-400"
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
