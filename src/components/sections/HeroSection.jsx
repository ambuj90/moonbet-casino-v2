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

const HeroSection = () => {
  // State for modal
  const socket = useWalletSocket();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBetData, setSelectedBetData] = useState(null);

  // Auto-slide state for mobile
  const [mobileScrollPosition, setMobileScrollPosition] = useState(0);
  const mobileContainerRef = useRef(null);

  // Recent wins data with game cards
  const initialWinsData = [
    {
      id: 1,
      gameImage: "/bg/herocard.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
      // Additional data for modal
      gameName: "Golden Slots",
      provider: "Pragmatic Play",
      betId: "e0b1a8dc-c888-47b",
      date: "Nov 1, 2025",
      time: "12:39:46",
      multiplier: "2.00x",
      payout: "$0.32",
      originalCurrency: "C$0.22",
      isLive: false,
    },
    {
      id: 2,
      gameImage: "/bg/herocard2.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
      gameName: "Speed Baccarat",
      provider: "Evolution Gaming",
      betId: "f1c2b9dc-d999-58c",
      date: "Nov 1, 2025",
      time: "12:38:15",
      multiplier: "1.50x",
      payout: "$0.24",
      originalCurrency: "C$0.22",
      isLive: true,
    },
    {
      id: 3,
      gameImage: "/bg/herocard.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
      gameName: "Mega Roulette",
      provider: "Pragmatic Play",
      betId: "g2d3c0ed-e000-69d",
      date: "Nov 1, 2025",
      time: "12:37:30",
      multiplier: "3.00x",
      payout: "$0.48",
      originalCurrency: "C$0.22",
      isLive: false,
    },
    {
      id: 4,
      gameImage: "/bg/herocard2.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
      gameName: "Lightning Blackjack",
      provider: "Evolution Gaming",
      betId: "h3e4d1fe-f111-70e",
      date: "Nov 1, 2025",
      time: "12:36:45",
      multiplier: "2.50x",
      payout: "$0.40",
      originalCurrency: "C$0.22",
      isLive: true,
    },
    {
      id: 5,
      gameImage: "/bg/herocard.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
      gameName: "Sweet Bonanza",
      provider: "Pragmatic Play",
      betId: "i4f5e2gf-g222-81f",
      date: "Nov 1, 2025",
      time: "12:35:00",
      multiplier: "5.00x",
      payout: "$0.80",
      originalCurrency: "C$0.22",
      isLive: false,
    },
    {
      id: 6,
      gameImage: "/bg/herocard2.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
      gameName: "Crazy Time",
      provider: "Evolution Gaming",
      betId: "j5g6f3hg-h333-92g",
      date: "Nov 1, 2025",
      time: "12:34:15",
      multiplier: "10.00x",
      payout: "$1.60",
      originalCurrency: "C$0.22",
      isLive: true,
    },
    {
      id: 7,
      gameImage: "/bg/herocard.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
      gameName: "Gates of Olympus",
      provider: "Pragmatic Play",
      betId: "k6h7g4ih-i444-03h",
      date: "Nov 1, 2025",
      time: "12:33:30",
      multiplier: "1.25x",
      payout: "$0.20",
      originalCurrency: "C$0.22",
      isLive: false,
    },
    {
      id: 8,
      gameImage: "/bg/herocard2.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
      gameName: "Monopoly Live",
      provider: "Evolution Gaming",
      betId: "l7i8h5ji-j555-14i",
      date: "Nov 1, 2025",
      time: "12:32:45",
      multiplier: "4.00x",
      payout: "$0.64",
      originalCurrency: "C$0.22",
      isLive: true,
    },
    {
      id: 9,
      gameImage: "/bg/herocard.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
      gameName: "Book of Dead",
      provider: "Play'n GO",
      betId: "m8j9i6kj-k666-25j",
      date: "Nov 1, 2025",
      time: "12:32:00",
      multiplier: "2.00x",
      payout: "$0.32",
      originalCurrency: "C$0.22",
      isLive: false,
    },
  ];

  const [recentWinsData, setRecentWinsData] = useState(initialWinsData);
  const [isPaused, setIsPaused] = useState(false);

  // Generate new winner data
  const generateNewWinner = () => {
    const randomAmount = (Math.random() * 10 + 0.1).toFixed(2);
    const randomUsername = `${Math.random()
      .toString(36)
      .substring(2, 4)}...${Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()}`;
    const randomMultiplier = (Math.random() * 20 + 1).toFixed(2);
    const gameNames = [
      "Speed Baccarat",
      "Lightning Roulette",
      "Crazy Time",
      "Sweet Bonanza",
      "Aviator",
    ];
    const providers = [
      "Evolution Gaming",
      "Pragmatic Play",
      "Spribe",
      "NetEnt",
      "Play'n GO",
    ];
    const randomGame = gameNames[Math.floor(Math.random() * gameNames.length)];
    const randomProvider =
      providers[Math.floor(Math.random() * providers.length)];

    return {
      id: Date.now(),
      gameImage: "/bg/herocard.svg",
      amount: `$${randomAmount}`,
      username: randomUsername,
      icon: "/icons/moon1.svg",
      gameName: randomGame,
      provider: randomProvider,
      betId: Math.random().toString(36).substring(2, 15),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      multiplier: `${randomMultiplier}x`,
      payout: `$${(
        parseFloat(randomAmount) * parseFloat(randomMultiplier)
      ).toFixed(2)}`,
      originalCurrency: `C$${(parseFloat(randomAmount) * 1.4).toFixed(2)}`,
      isLive: Math.random() > 0.5,
    };
  };

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

  // Auto update winners with push/pop animation
  useEffect(() => {
    let interval;

    const getCurrencySymbol = (currency) => {
      switch (currency?.toUpperCase()) {
        case "USD":
          return "$";
        case "EUR":
          return "€";
        case "GBP":
          return "£";
        case "INR":
          return "₹";
        case "JPY":
          return "¥";
        case "BTC":
          return "₿";
        case "ETH":
          return "Ξ";
        case "SOL":
          return "◎";
        default:
          return "";
      }
    };

    const parseAmountWithSymbol = (amountStr) => {
      if (!amountStr) return "$0.00";

      // Example formats from backend: "1.6 USD", "2.4 EURO", "0.3 EUR"
      const parts = amountStr.trim().split(" ");
      let amount = parts[0];
      let currency = parts[1] || "USD";

      const symbol = getCurrencySymbol(currency);
      return `${symbol}${parseFloat(amount).toFixed(2)}`;
    };

    const fetchRecentWins = async () => {
      try {
        const { data } = await axios.get(
          "/wallet-service/api/games/recent-wins?limit=20"
        );

        if (data?.success && Array.isArray(data.data)) {
          const mapped = data.data.map((item, index) => ({
            id: `${item.user}-${index}`,
            gameImage: `/slots/img${(index % 9) + 1}.svg`,
            amount: parseAmountWithSymbol(item.amount),
            username: item.user || "Player***XXX",
            icon: `/moon/moon${(index % 3) + 1}.svg`,
            timeAgo: item.timeAgo,
            gameName: item.game || "Unknown Game",
            provider: "Moonbet Games",
            betId: `auto-${Date.now()}-${index}`,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            multiplier: "—",
            payout: item.amount,
            originalCurrency: item.amount,
            isLive: false,
          }));
          setRecentWinsData(mapped);
        }
      } catch (err) {
        console.error("❌ Failed to fetch recent wins:", err);
      }
    };

    return () => clearInterval(interval);
  }, [isPaused]);

  // Real-time recent wins via socket
  useEffect(() => {
    if (!socket) return;

    const getCurrencySymbol = (currency) => {
      switch (currency?.toUpperCase()) {
        case "USD":
          return "$";
        case "EUR":
          return "€";
        case "GBP":
          return "£";
        case "INR":
          return "₹";
        case "JPY":
          return "¥";
        case "BTC":
          return "₿";
        case "ETH":
          return "Ξ";
        case "SOL":
          return "◎";
        default:
          return "";
      }
    };

    const parseAmount = (amountStr) => {
      if (!amountStr) return "$0.00";
      const parts = amountStr.split(" ");
      const amount = parseFloat(parts[0] || 0);
      const currency = parts[1] || "USD";
      return `${getCurrencySymbol(currency)}${amount.toFixed(2)}`;
    };

    // ✅ When backend sends full recentWins array
    socket.on("recentWins", (data) => {
      const formatted = data.map((item, index) => ({
        id: `${item.user}-${index}`,
        gameImage: `/slots/img${(index % 9) + 1}.svg`,
        amount: parseAmount(item.amount),
        username: item.user || "Player***XXX",
        icon: `/moon/moon${(index % 3) + 1}.svg`,
        timeAgo: item.timeAgo,

        gameName: item.game || "Unknown Game",
        provider: "Moonbet Games",
        betId: `socket-${Date.now()}-${index}`,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        multiplier: "—",
        payout: parseAmount(item.amount),
        originalCurrency: item.amount,
        isLive: true,
      }));

      setRecentWinsData(formatted);
    });

    // ✅ When backend sends NEW SINGLE WIN
    socket.on("recentWins:new", (item) => {
      const index = Math.floor(Math.random() * 9); // pick random image

      const formattedSingle = {
        id: `${item.user}-${Date.now()}`,
        gameImage: `/slots/img${(index % 9) + 1}.svg`,
        icon: `/moon/moon${(index % 3) + 1}.svg`,
        amount: parseAmount(item.amount),
        username: item.user,

        gameName: item.game || "Unknown Game",
        provider: "Moonbet Games",
        betId: `single-${Date.now()}`,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        multiplier: "—",
        payout: parseAmount(item.amount),
        originalCurrency: item.amount,
        isLive: true,
      };

      setRecentWinsData((prev) => [formattedSingle, ...prev.slice(0, 19)]);
    });

    return () => {
      socket.off("recentWins");
      socket.off("recentWins:new");
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
              {mobileWinsData.map((win, index) => (
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
                {recentWinsData.map((win, index) => (
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
