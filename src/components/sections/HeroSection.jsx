// src/components/sections/HeroSection.jsx
import React, { useState, useEffect } from "react";
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

  // Recent wins data with game cards
  const initialWinsData = [
    {
      id: 1,
      gameImage: "/games/golden.svg",
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
      gameImage: "/games/golden.svg",
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
      gameImage: "/games/golden.svg",
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
      gameImage: "/games/golden.svg",
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
      gameImage: "/games/golden.svg",
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
      gameImage: "/games/golden.svg",
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
      gameImage: "/games/golden.svg",
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
      gameImage: "/games/golden.svg",
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
      gameImage: "/games/golden.svg",
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
    {
      id: 10,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
      gameName: "Dream Catcher",
      provider: "Evolution Gaming",
      betId: "n9k0j7lk-l777-36k",
      date: "Nov 1, 2025",
      time: "12:31:15",
      multiplier: "7.00x",
      payout: "$1.12",
      originalCurrency: "C$0.22",
      isLive: true,
    },
    {
      id: 11,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
      gameName: "Wolf Gold",
      provider: "Pragmatic Play",
      betId: "o0l1k8ml-m888-47l",
      date: "Nov 1, 2025",
      time: "12:30:30",
      multiplier: "1.75x",
      payout: "$0.28",
      originalCurrency: "C$0.22",
      isLive: false,
    },
    {
      id: 12,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
      gameName: "Lightning Dice",
      provider: "Evolution Gaming",
      betId: "p1m2l9nm-n999-58m",
      date: "Nov 1, 2025",
      time: "12:29:45",
      multiplier: "3.50x",
      payout: "$0.56",
      originalCurrency: "C$0.22",
      isLive: true,
    },
    {
      id: 13,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
      gameName: "The Dog House",
      provider: "Pragmatic Play",
      betId: "q2n3m0on-o000-69n",
      date: "Nov 1, 2025",
      time: "12:29:00",
      multiplier: "6.00x",
      payout: "$0.96",
      originalCurrency: "C$0.22",
      isLive: false,
    },
    {
      id: 14,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
      gameName: "Cash or Crash",
      provider: "Evolution Gaming",
      betId: "r3o4n1po-p111-70o",
      date: "Nov 1, 2025",
      time: "12:28:15",
      multiplier: "8.00x",
      payout: "$1.28",
      originalCurrency: "C$0.22",
      isLive: true,
    },
    {
      id: 15,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
      gameName: "Starburst",
      provider: "NetEnt",
      betId: "s4p5o2qp-q222-81p",
      date: "Nov 1, 2025",
      time: "12:27:30",
      multiplier: "1.10x",
      payout: "$0.18",
      originalCurrency: "C$0.22",
      isLive: false,
    },
    {
      id: 16,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
      gameName: "Gonzo's Quest",
      provider: "NetEnt",
      betId: "t5q6p3rq-r333-92q",
      date: "Nov 1, 2025",
      time: "12:26:45",
      multiplier: "15.00x",
      payout: "$2.40",
      originalCurrency: "C$0.22",
      isLive: false,
    },
    {
      id: 17,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
      gameName: "Mega Ball",
      provider: "Evolution Gaming",
      betId: "u6r7q4sr-s444-03r",
      date: "Nov 1, 2025",
      time: "12:26:00",
      multiplier: "100.00x",
      payout: "$16.00",
      originalCurrency: "C$0.22",
      isLive: true,
    },
    {
      id: 18,
      gameImage: "/games/golden.svg",
      amount: "$0.16",
      username: "6z...CfcH",
      icon: "/icons/moon.svg",
      gameName: "Aviator",
      provider: "Spribe",
      betId: "v7s8r5ts-t555-14s",
      date: "Nov 1, 2025",
      time: "12:25:15",
      multiplier: "12.50x",
      payout: "$2.00",
      originalCurrency: "C$0.22",
      isLive: true,
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
      gameImage: "/games/golden.svg",
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
    <section className="w-full relative md:h-[200]  ">
      {/* Recent Wins Section - Dark background strip */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-center">
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-4 py-2 sm:py-3 rounded-[12px]">
          {/* Recent Wins Label positioned above cards */}
          <motion.div
            className="absolute flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2 "
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="flex items-center gap-2 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-md whitespace-nowrap"
              style={{
                background: "#4B4B4B",
                border: "3.5px solid #222223",
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
                  className="relative inline-flex rounded-full h-1 w-1 sm:h-1.5 sm:w-1.5 bg-[#F07730]"
                  style={{
                    opacity: 0.8,
                    boxShadow: "0 0 8px 0 #F07730",
                  }}
                ></span>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F07730] opacity-50"></span>
              </motion.span>
              Recent Wins
            </span>
          </motion.div>

          {/* Cards Container */}
          <div
            className="overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Mobile View - Show 7 cards */}
            <div className="sm:hidden flex gap-1.5">
              <AnimatePresence mode="popLayout">
                {mobileWinsData.map((win, index) => (
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
                    whileHover={{ scale: 1.05, y: -3 }}
                    className="flex flex-col items-center cursor-pointer flex-shrink-0"
                    onClick={() => handleCardClick(win)}
                  >
                    {/* Game Card */}
                    <div className="relative">
                      <motion.div
                        className="relative w-[50px] h-[60px] xs:w-[60px] xs:h-[70px] rounded-lg overflow-hidden"
                        style={{
                          backdropFilter: "blur(10px)",
                        }}
                        whileHover={{
                          boxShadow: "0 8px 16px rgba(147, 51, 234, 0.3)",
                        }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img
                            src={win.gameImage}
                            alt="Game"
                            className="w-20 h-20 xs:w-10 xs:h-10 object-contain"
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* Win Amount */}
                    <motion.div className="mt-0.5">
                      <span className="text-white text-[10px] xs:text-[11px] font-semibold">
                        {win.amount}
                      </span>
                    </motion.div>

                    {/* Username with Icon */}
                    <motion.div className="flex items-center gap-1">
                      <img
                        src={`/moon/moon${(index % 3) + 1}.svg`}
                        alt="icon"
                        className="w-3 h-3"
                      />
                      <span className="text-gray-400 text-[8px] xs:text-[9px]">
                        {win.username}
                      </span>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Desktop View - Show all cards */}
            <div className="hidden sm:flex gap-1.5 md:gap-2">
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
                    whileHover={{ scale: 1.05, y: -3 }}
                    className="flex flex-col items-center cursor-pointer flex-shrink-0"
                    onClick={() => handleCardClick(win)}
                  >
                    {/* Game Card */}
                    <div className="relative">
                      <motion.div className="relative w-[60px] h-[70px] md:w-[70px] md:h-[80px] lg:w-[75px] lg:h-[85px] rounded-lg overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img
                            src={win.gameImage}
                            alt="Game"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* Win Amount */}
                    <motion.div className="mt-1">
                      <span className="text-[#D3D3D3] text-[11px] md:text-xs font-semibold">
                        {win.amount}
                      </span>
                    </motion.div>

                    {/* Username with Icon */}
                    <motion.div className="flex items-center gap-1">
                      <img
                        src={win.icon}
                        alt="icon"
                        className="w-3 h-3 md:w-4 md:h-4"
                      />
                      <span className="text-gray-400 text-[9px] md:text-[10px]">
                        {win.username}
                      </span>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Content - Main Banner */}
      <div className="relative z-10 w-full  flex items-center justify-center pt-24 sm:pt-28 md:pt-32">
        {/* Background image */}
        {/* <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover h-[400px] sm:h-auto"
          style={{
            backgroundImage: "url('/home-assets/home-banner.png')",
            backgroundSize: "cover",
          }}
        >
         
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div> */}

        {/* Foreground content */}
        <div className="relative container mx-auto px-4 z-20">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Add your hero content here */}
          </motion.div>
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
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
