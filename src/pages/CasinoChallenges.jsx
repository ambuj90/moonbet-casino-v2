import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sample challenge data - replace with your API data
const sampleChallenges = {
  active: [
    {
      id: 1,
      title: "13th Trial Hercules Abyssways",
      description: "First to hit 15,000X with minimum bet of $1.00",
      prize: 1000,
      creator: "MoonBet",
      image:
        "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&h=200&fit=crop",
      gameSlug: "hercules-abyssways",
    },
    {
      id: 2,
      title: "13th Trial Hercules Abyssways",
      description: "First to hit 15,000X with minimum bet of $1.00",
      prize: 1000,
      creator: "MoonBet",
      image:
        "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&h=200&fit=crop",
      gameSlug: "hercules-abyssways",
    },
    {
      id: 3,
      title: "13th Trial Hercules Abyssways",
      description: "First to hit 15,000X with minimum bet of $1.00",
      prize: 1000,
      creator: "MoonBet",
      image:
        "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&h=200&fit=crop",
      gameSlug: "hercules-abyssways",
    },
    {
      id: 4,
      title: "13th Trial Hercules Abyssways",
      description: "First to hit 15,000X with minimum bet of $1.00",
      prize: 1000,
      creator: "MoonBet",
      image:
        "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&h=200&fit=crop",
      gameSlug: "hercules-abyssways",
    },
    {
      id: 5,
      title: "13th Trial Hercules Abyssways",
      description: "First to hit 15,000X with minimum bet of $1.00",
      prize: 1000,
      creator: "MoonBet",
      image:
        "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&h=200&fit=crop",
      gameSlug: "hercules-abyssways",
    },
    {
      id: 6,
      title: "13th Trial Hercules Abyssways",
      description: "First to hit 15,000X with minimum bet of $1.00",
      prize: 1000,
      creator: "MoonBet",
      image:
        "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&h=200&fit=crop",
      gameSlug: "hercules-abyssways",
    },
    {
      id: 7,
      title: "13th Trial Hercules Abyssways",
      description: "First to hit 15,000X with minimum bet of $1.00",
      prize: 1000,
      creator: "MoonBet",
      image:
        "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&h=200&fit=crop",
      gameSlug: "hercules-abyssways",
    },
    {
      id: 8,
      title: "13th Trial Hercules Abyssways",
      description: "First to hit 15,000X with minimum bet of $1.00",
      prize: 1000,
      creator: "MoonBet",
      image:
        "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&h=200&fit=crop",
      gameSlug: "hercules-abyssways",
    },
    {
      id: 9,
      title: "13th Trial Hercules Abyssways",
      description: "First to hit 15,000X with minimum bet of $1.00",
      prize: 1000,
      creator: "MoonBet",
      image:
        "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&h=200&fit=crop",
      gameSlug: "hercules-abyssways",
    },
    {
      id: 10,
      title: "13th Trial Hercules Abyssways",
      description: "First to hit 15,000X with minimum bet of $1.00",
      prize: 1000,
      creator: "MoonBet",
      image:
        "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&h=200&fit=crop",
      gameSlug: "hercules-abyssways",
    },
  ],
  completed: [
    {
      id: 101,
      title: "13th Trial Hercules Abyssways",
      description: "First to hit 15,000X with minimum bet of $1.00",
      prize: 1000,
      creator: "MoonBet",
      claimedBy: {
        username: "tank...",
        avatar: "/icons/moon.svg",
      },
      image:
        "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&h=200&fit=crop",
      gameSlug: "hercules-abyssways",
    },
    {
      id: 102,
      title: "13th Trial Hercules Abyssways",
      description: "First to hit 15,000X with minimum bet of $1.00",
      prize: 1000,
      creator: "MoonBet",
      claimedBy: {
        username: "tank...",
        avatar: "/icons/moon.svg",
      },
      image:
        "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&h=200&fit=crop",
      gameSlug: "hercules-abyssways",
    },
    {
      id: 103,
      title: "13th Trial Hercules Abyssways",
      description: "First to hit 15,000X with minimum bet of $1.00",
      prize: 1000,
      creator: "MoonBet",
      claimedBy: {
        username: "tank...",
        avatar: "/icons/moon.svg",
      },
      image:
        "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&h=200&fit=crop",
      gameSlug: "hercules-abyssways",
    },
    {
      id: 104,
      title: "13th Trial Hercules Abyssways",
      description: "First to hit 15,000X with minimum bet of $1.00",
      prize: 1000,
      creator: "MoonBet",
      claimedBy: {
        username: "tank...",
        avatar: "/icons/moon.svg",
      },
      image:
        "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&h=200&fit=crop",
      gameSlug: "hercules-abyssways",
    },
    {
      id: 105,
      title: "13th Trial Hercules Abyssways",
      description: "First to hit 15,000X with minimum bet of $1.00",
      prize: 1000,
      creator: "MoonBet",
      claimedBy: {
        username: "tank...",
        avatar: "/icons/moon.svg",
      },
      image:
        "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&h=200&fit=crop",
      gameSlug: "hercules-abyssways",
    },
    {
      id: 106,
      title: "13th Trial Hercules Abyssways",
      description: "First to hit 15,000X with minimum bet of $1.00",
      prize: 1000,
      creator: "MoonBet",
      claimedBy: {
        username: "tank...",
        avatar: "/icons/moon.svg",
      },
      image:
        "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&h=200&fit=crop",
      gameSlug: "hercules-abyssways",
    },
    {
      id: 107,
      title: "13th Trial Hercules Abyssways",
      description: "First to hit 15,000X with minimum bet of $1.00",
      prize: 1000,
      creator: "MoonBet",
      claimedBy: {
        username: "tank...",
        avatar: "/icons/moon.svg",
      },
      image:
        "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&h=200&fit=crop",
      gameSlug: "hercules-abyssways",
    },
    {
      id: 108,
      title: "13th Trial Hercules Abyssways",
      description: "First to hit 15,000X with minimum bet of $1.00",
      prize: 1000,
      creator: "MoonBet",
      claimedBy: {
        username: "tank...",
        avatar: "/icons/moon.svg",
      },
      image:
        "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&h=200&fit=crop",
      gameSlug: "hercules-abyssways",
    },
    {
      id: 109,
      title: "13th Trial Hercules Abyssways",
      description: "First to hit 15,000X with minimum bet of $1.00",
      prize: 1000,
      creator: "MoonBet",
      claimedBy: {
        username: "tank...",
        avatar: "/icons/moon.svg",
      },
      image:
        "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&h=200&fit=crop",
      gameSlug: "hercules-abyssways",
    },
    {
      id: 110,
      title: "13th Trial Hercules Abyssways",
      description: "First to hit 15,000X with minimum bet of $1.00",
      prize: 1000,
      creator: "MoonBet",
      claimedBy: {
        username: "tank...",
        avatar: "/icons/moon.svg",
      },
      image:
        "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&h=200&fit=crop",
      gameSlug: "hercules-abyssways",
    },
  ],
};

// Challenge Card Component for Active challenges
const ActiveChallengeCard = ({ challenge, onPlayGame }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl overflow-hidden"
      style={{
        background: "rgba(30, 27, 75, 0.6)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      {/* Game Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={challenge.image}
          alt={challenge.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 50%, rgba(30, 27, 75, 0.8) 100%)",
          }}
        />
      </div>

      {/* Card Content */}
      <div className="p-3 sm:p-4">
        {/* Title */}
        <p className=" text-[14px] mb-1 truncate">{challenge.title}</p>

        {/* Description */}
        <p className="text-gray-400 text-[10px] sm:text-xs mb-3 line-clamp-2 leading-relaxed">
          {challenge.description}
        </p>

        {/* Prize Row */}
        <div className="flex justify-between items-center mb-1">
          <span className="text-white/50 text-[10px] sm:text-xs">Prize</span>
          <span className="text-xs sm:text-sm ">
            ${challenge.prize.toLocaleString()}
          </span>
        </div>

        {/* Creator Row */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-white/50 text-[10px] sm:text-xs">Creator</span>
          <span className="text-white text-xs sm:text-sm font-medium">
            {challenge.creator}
          </span>
        </div>
      </div>
      {/* Play Game Button */}
      <motion.button
        whileHover={{
          scale: 1.02,
          boxShadow: "0 6px 20px rgba(240, 119, 48, 0.4)",
        }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onPlayGame(challenge)}
        className="w-full py-2.5 rounded-lg transition-all"
        style={{
          background: "linear-gradient(180deg, #FFB8A1 0%, #A62A00 100%)",
          borderRadius: "0 0 8px 8px",
        }}
      >
        Play Game
      </motion.button>
    </motion.div>
  );
};

// Challenge Card Component for Completed challenges
const CompletedChallengeCard = ({ challenge }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl overflow-hidden"
      style={{
        background: "rgba(30, 27, 75, 0.6)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      {/* Game Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={challenge.image}
          alt={challenge.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 50%, rgba(30, 27, 75, 0.8) 100%)",
          }}
        />
      </div>

      {/* Card Content */}
      <div className="p-3 sm:p-4">
        {/* Title */}
        <h3 className="text-white text-sm font-semibold mb-1 truncate">
          {challenge.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-[10px] sm:text-xs mb-3 line-clamp-2 leading-relaxed">
          {challenge.description}
        </p>

        {/* Prize Row */}
        <div className="flex justify-between items-center mb-1">
          <span className="text-white/50 text-[10px] sm:text-xs">Prize</span>
          <span className="text-xs sm:text-sm font-semibold">
            ${challenge.prize.toLocaleString()}
          </span>
        </div>

        {/* Creator Row */}
        <div className="flex justify-between items-center mb-1">
          <span className="text-white/50 text-[10px] sm:text-xs">Creator</span>
          <span className="text-white text-xs sm:text-sm font-medium">
            {challenge.creator}
          </span>
        </div>

        {/* Claimed By Row */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-white/50 text-[10px] sm:text-xs">
            Claimed by
          </span>
          <div className="flex items-center gap-1.5">
            <img
              src={challenge.claimedBy.avatar}
              alt={challenge.claimedBy.username}
              className="w-3 h-3 rounded-full"
            />
            <span className="text-xs font-medium pr-2 py-0.5 rounded">
              {challenge.claimedBy.username}
            </span>
          </div>
        </div>

        {/* Completed Badge */}
        <div
          className="w-full py-2.5 rounded-lg text-sm font-medium text-center transition-all bg-transparent"
          style={{
            color: "var(--moon-silver)",
          }}
        >
          Completed
        </div>
      </div>
    </motion.div>
  );
};

// Trophy/Challenge Icon Component
const ChallengeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M17.8366 8.14935C17.3768 8.6161 16.7249 8.88273 16.0646 8.88273H14.6437L14.6186 8.90776C14.7607 9.39108 14.8443 9.90777 14.8443 10.4412C14.8443 13.3246 12.4872 15.6748 9.58695 15.6748C6.69498 15.6748 4.33794 13.3246 4.33794 10.4412C4.33794 7.54934 6.69498 5.19915 9.58695 5.19915C10.0884 5.19915 10.5816 5.26589 11.0413 5.4075L11.0831 5.36589V3.92406C11.0831 3.24907 11.3422 2.62404 11.8186 2.1574L12.6126 1.36562C11.6514 1.04059 10.6317 0.873958 9.59527 0.873958C4.30453 0.873958 0 5.16589 0 10.4328C0 15.7082 4.30453 20 9.59527 20C14.8861 20 19.1822 15.7082 19.1822 10.4328C19.1822 9.36606 19.0067 8.32433 18.6556 7.33266L17.8366 8.14935Z"
      fill="url(#paint0_linear_10165_3392)"
    />
    <path
      d="M19.9512 3.0158C19.8341 2.70735 19.55 2.49901 19.224 2.47398L17.6359 2.3574L17.5189 0.773956C17.4938 0.448926 17.2849 0.165605 16.9756 0.048919C16.6747 -0.0594246 16.3237 0.0155512 16.098 0.24058L12.9971 3.33239C12.8383 3.49078 12.7547 3.69913 12.7547 3.92406V6.04922L10.7046 8.12026C10.3649 7.95708 9.98885 7.85769 9.58695 7.85769C8.16604 7.85769 7.00423 9.0161 7.00423 10.4328C7.00423 11.8579 8.16604 13.0164 9.58695 13.0164C11.0162 13.0164 12.178 11.8579 12.178 10.4328C12.178 10.0206 12.0705 9.63585 11.8958 9.28955L13.9416 7.21597H16.0646C16.2819 7.21597 16.4992 7.13265 16.658 6.97436L19.7506 3.89079C19.9846 3.66576 20.0598 3.31571 19.9512 3.0158Z"
      fill="url(#paint1_linear_10165_3392)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_10165_3392"
        x1="-1.56462e-08"
        y1="3"
        x2="24.5"
        y2="24"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FFB8A1" />
        <stop offset="1" stop-color="#A62A00" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_10165_3392"
        x1="-1.56462e-08"
        y1="3"
        x2="24.5"
        y2="24"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FFB8A1" />
        <stop offset="1" stop-color="#A62A00" />
      </linearGradient>
    </defs>
  </svg>
);

const CasinoChallenges = () => {
  const [activeTab, setActiveTab] = useState("active");

  const handlePlayGame = (challenge) => {
    // Navigate to game or open game modal
    console.log("Playing game:", challenge.gameSlug);
    // You can use react-router navigation here:
    // navigate(`/games/${challenge.gameSlug}`);
  };

  const challenges =
    activeTab === "active"
      ? sampleChallenges.active
      : sampleChallenges.completed;

  return (
    <section className="w-full py-8 sm:py-12 md:py-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          {/* Title with Icon */}
          <div className="flex items-center gap-3">
            <ChallengeIcon />
            <h2
              className="text-xl sm:text-xl font-bold tracking-wide"
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Casino Challenges at MoonBet
            </h2>
          </div>

          {/* Tabs */}
          <div
            className="flex gap-1 p-1 rounded-full w-fit"
            style={{
              background: "#282753",
            }}
          >
            {["active", "completed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 sm:px-6 py-2 font-medium text-sm rounded-full transition-all duration-200 ${
                  activeTab === tab
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="challengeTab"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(180deg, #FFB8A1 0%, #A62A00 100%)",
                    }}
                    transition={{ type: "spring", duration: 0.4 }}
                  />
                )}
                <span className="relative z-10 capitalize">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Challenge Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-4"
          >
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {activeTab === "active" ? (
                  <ActiveChallengeCard
                    challenge={challenge}
                    onPlayGame={handlePlayGame}
                  />
                ) : (
                  <CompletedChallengeCard challenge={challenge} />
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {challenges.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <ChallengeIcon />
            <p className="text-gray-400 mt-4 text-center">
              No {activeTab} challenges available at the moment.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CasinoChallenges;
