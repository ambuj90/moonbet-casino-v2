// src/components/sections/HeroSection.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BetDetailsModal from "../ui-elements/BetDetailsModal";
import { useWalletSocket } from "../../context/WalletSocketContext";
import axios from "axios";

const formatAmount = (amountStr) => {
  if (!amountStr) return "$0.00";

  const parts = amountStr.split(" ");
  const amt = parseFloat(parts[0] || 0);
  const currency = parts[1] || "USD";

  const symbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
    JPY: "¥",
    BTC: "₿",
    ETH: "Ξ",
    SOL: "◎",
  };

  return `${symbols[currency] || ""}${amt.toFixed(2)}`;
};

const SkeletonCard = () => (
  <div className="flex flex-col items-center flex-shrink-0 animate-pulse">
    <div className="w-[48px] h-[64px] bg-[#2f2f55] rounded-lg mb-2"></div>

    <div className="flex items-center gap-1 mb-1">
      <div className="w-3 h-3 bg-[#3a3a6b] rounded-full"></div>
      <div className="w-10 h-2 bg-[#3a3a6b] rounded"></div>
    </div>

    <div className="w-12 h-3 bg-[#3a3a6b] rounded"></div>
  </div>
);

const HeroSection = () => {
  // State for modal
  const socket = useWalletSocket();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBetData, setSelectedBetData] = useState(null);

  // Auto-slide state for mobile
  const [mobileScrollPosition, setMobileScrollPosition] = useState(0);
  const mobileContainerRef = useRef(null);
  const [recentWinsData, setRecentWinsData] = useState([]);

  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentWins = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "/wallet-service/api/games/recent-wins?limit=20"
        );

        if (data?.success && Array.isArray(data.data)) {
          const mapped = data.data.map((item, index) => ({
            id: `${item.user}-${index}`,
            gameImage: `/slots/img${(index % 9) + 1}.svg`, // you can map real images later
            amount: formatAmount(item.amount),
            username: item.user || "Player***XXX",
            icon: `/moon/moon${(index % 3) + 1}.svg`,
            timeAgo: item.timeAgo,
            gameName: item.game || "Unknown Game",
            provider: "Moonbet Games",
            betId: `auto-${Date.now()}-${index}`,
            date: new Date(item.time || Date.now()).toLocaleDateString(),
            time: new Date(item.time || Date.now()).toLocaleTimeString(),
            multiplier: "—",
            payout: formatAmount(item.amount),
            originalCurrency: item.amount,
            isLive: false,
          }));
          setLoading(false);

          setRecentWinsData(mapped);
        }
      } catch (err) {
        console.error("❌ Failed to fetch recent wins:", err);
      }
    };

    fetchRecentWins();
  }, []);

  // Handle card click
  const handleCardClick = (winData) => {
    setSelectedBetData(winData);
    setIsModalOpen(true);
  };

  // Auto-sliding carousel for mobile
  useEffect(() => {
    let autoSlideInterval;

    if (!isPaused && mobileContainerRef.current) {
      autoSlideInterval = setInterval(() => {
        const container = mobileContainerRef.current;
        if (container) {
          const maxScroll = container.scrollWidth - container.clientWidth;
          const newPosition = mobileScrollPosition + 60; // Card width + gap

          if (newPosition >= maxScroll) {
            // Reset to beginning with smooth transition
            container.scrollTo({ left: 0, behavior: "smooth" });
            setMobileScrollPosition(0);
          } else {
            container.scrollTo({ left: newPosition, behavior: "smooth" });
            setMobileScrollPosition(newPosition);
          }
        }
      }, 2500); // Slide every 2.5 seconds
    }

    return () => clearInterval(autoSlideInterval);
  }, [isPaused, mobileScrollPosition]);

  // Real-time recent wins via socket
  useEffect(() => {
    if (!socket) return;

    const onRecentWins = (data) => {
      const formatted = data.map((item, index) => ({
        id: `${item.user}-${Date.now()}-${index}`,
        gameImage: `/slots/img${(index % 9) + 1}.svg`,
        amount: formatAmount(item.amount),
        username: item.user || "Player***XXX",
        icon: `/moon/moon${(index % 3) + 1}.svg`,
        timeAgo: item.timeAgo,
        gameName: item.game,
        provider: "Moonbet Games",
        betId: `socket-${Date.now()}-${index}`,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        multiplier: "—",
        payout: formatAmount(item.amount),
        originalCurrency: item.amount,
        isLive: true,
      }));

      setRecentWinsData(formatted);
    };

    const onNewWin = (item) => {
      const rand = Math.floor(Math.random() * 9);

      const formatted = {
        id: `${item.user}-${Date.now()}`,
        gameImage: `/slots/img${rand + 1}.svg`,
        amount: formatAmount(item.amount),
        username: item.user,
        icon: `/moon/moon${(rand % 3) + 1}.svg`,
        timeAgo: item.timeAgo,
        gameName: item.game,
        provider: "Moonbet Games",
        betId: `new-${Date.now()}`,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        multiplier: "—",
        payout: formatAmount(item.amount),
        originalCurrency: item.amount,
        isLive: true,
      };

      setRecentWinsData((prev) => [formatted, ...prev.slice(0, 19)]);
    };

    socket.on("recentWins", onRecentWins);
    socket.on("recentWins:new", onNewWin);

    return () => {
      socket.off("recentWins", onRecentWins);
      socket.off("recentWins:new", onNewWin);
    };
  }, [socket]);

  // Mobile data (first 7)
  const mobileWinsData = recentWinsData.slice(0, 7);

  // Animation variants for cards
  const cardVariants = {
    enter: {
      x: -100,
      opacity: 0,
      scale: 0.8,
    },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: {
      x: 100,
      opacity: 0,
      scale: 0.8,
    },
  };

  return (
    <section className="w-full relative md:py-2">
      {/* Recent Wins Section - Dark background strip */}
      <div className="flex justify-center">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 md:px-4 sm:py-3 rounded-[12px]">
          {/* Recent Wins Label positioned above cards */}
          <motion.div
            className="absolute flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2 "
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="flex items-center gap-2 text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-md whitespace-nowrap"
              style={{
                background: "#282753",
                border: "3.5px solid #0D0E36",
                zIndex: 1,
                borderRadius: "8px",
              }}
            >
              <motion.span
                className="relative flex h-1 w-1 sm:h-1.5 sm:w-1.5"
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span
                  className="relative inline-flex rounded-full h-1 w-1 sm:h-1.5 sm:w-1.5 bg-[#28C203]"
                  style={{
                    opacity: 0.8,
                    boxShadow: "0 0 8px 0 #28C203",
                  }}
                ></span>
                <span className=" absolute inline-flex h-full w-full rounded-full bg-[#28C203] opacity-50"></span>
              </motion.span>
              Recent Wins
            </span>
          </motion.div>

          {/* Cards Container */}
          <div
            className="overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
          >
            {/* Mobile View - Auto-sliding carousel with 7 cards */}
            <div
              ref={mobileContainerRef}
              className="sm:hidden flex gap-3 overflow-x-auto scrollbar-hide py-2"
              style={{ scrollBehavior: "smooth" }}
            >
              {loading
                ? [...Array(7)].map((_, i) => <SkeletonCard key={i} />)
                : mobileWinsData.map((win, index) => (
                    <motion.div
                      key={win.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex flex-col items-center cursor-pointer flex-shrink-0"
                      onClick={() => handleCardClick(win)}
                    >
                      {/* Game Card Image */}
                      <div className="relative mb-2">
                        <motion.div
                          className="relative w-[48px] h-[64px] rounded-lg overflow-hidden"
                          whileHover={{
                            boxShadow: "0 8px 16px rgba(147, 51, 234, 0.3)",
                          }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <img
                              src={win.gameImage}
                              alt="Game"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </motion.div>
                      </div>

                      {/* Username with Icon - Equal spacing */}
                      <div className="flex items-center gap-1 mb-1">
                        <img
                          src={`/moon/moon${(index % 3) + 1}.svg`}
                          alt="icon"
                          className="w-3 h-3"
                        />
                        <span className="text-gray-400 text-[9px]">
                          {win.username}
                        </span>
                      </div>

                      {/* Win Amount - Equal spacing */}
                      <div className="win-amount">
                        <span className="text-[#28C203] text-[11px] font-semibold">
                          {win.amount}
                        </span>
                      </div>
                    </motion.div>
                  ))}
            </div>

            {/* Desktop View - Show all cards */}
            <div className="hidden sm:flex gap-2 md:gap-2 lg:gap- py-2">
              <AnimatePresence mode="popLayout">
                {loading
                  ? [...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center animate-pulse"
                      >
                        <div className="w-[60px] h-[75px] bg-[#2f2f55] rounded-lg mb-2"></div>
                        <div className="w-12 h-2 bg-[#3a3a6b] rounded mb-1"></div>
                        <div className="w-14 h-3 bg-[#3a3a6b] rounded"></div>
                      </div>
                    ))
                  : recentWinsData.map((win, index) => (
                      <motion.div
                        key={win.id}
                        layout
                        initial="enter"
                        animate="center"
                        exit="exit"
                        variants={cardVariants}
                        transition={{
                          x: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.2 },
                        }}
                        whileHover={{ scale: 1.06, y: -3 }}
                        className="flex flex-col items-center cursor-pointer "
                        onClick={() => handleCardClick(win)}
                      >
                        {/* Card Image (scaled 3.5x smaller) */}
                        <div className="relative rounded-lg overflow-hidden">
                          <img
                            src={win.gameImage}
                            alt={win.gameName}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        {/* Username + Icon */}
                        <div className="flex items-center gap-1 mt-1">
                          <img
                            src={win.icon}
                            alt="icon"
                            className="w-3 h-3 opacity-80"
                          />
                          <span className="text-gray-300 text-[11px] leading-none">
                            {win.username}
                          </span>
                        </div>

                        {/* Amount in Green */}
                        <span className="text-[#28C203] text-[12px] font-semibold leading-none mt-0.5">
                          {win.amount}
                        </span>
                      </motion.div>
                    ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Bet Details Modal */}
      <BetDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        betData={selectedBetData}
      />

      {/* Add custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
