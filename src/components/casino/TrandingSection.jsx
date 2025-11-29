// src/components/sections/TrandingSection.jsx
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MoonBetButton from "../ui-elements/MoonBetButton";
import api from "../../api/axios";
import axios from "axios";

const TrandingSection = () => {
  const scrollContainerRef = useRef(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const navigate = useNavigate();

  // Check scroll position
  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    const tolerance = 5; // allows small rounding differences

    setCanScrollLeft(scrollLeft > tolerance);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - tolerance);
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const { data } = await axios.get("/wallet-service/api/games");

        // ✅ Compatible with both old and new API response formats
        let fetchedGames = [];

        if (Array.isArray(data?.data)) {
          // new API response (data.data)
          fetchedGames = data.data;
        } else if (Array.isArray(data?.games?.items)) {
          // old API response (data.games.items)
          fetchedGames = data.games.items;
        }

        // ✅ Randomize (shuffle) the games list
        const shuffled = fetchedGames.sort(() => Math.random() - 0.5);
        setGames(shuffled);
      } catch (error) {
        console.error("❌ Error fetching games:", error);
        toast.error(
          error.response?.data?.message || "Failed to load games list"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Add scroll position check after games are loaded
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || games.length === 0) return;

    const handle = () => checkScrollPosition();
    container.addEventListener("scroll", handle);
    window.addEventListener("resize", handle);

    // ensure initial state after layout paint
    const timeout = setTimeout(handle, 300);

    return () => {
      container.removeEventListener("scroll", handle);
      window.removeEventListener("resize", handle);
      clearTimeout(timeout);
    };
  }, [games]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = window.innerWidth < 640 ? container.clientWidth : 300;
    const targetScroll =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({ left: targetScroll, behavior: "smooth" });

    // re-check after animation completes
    setTimeout(checkScrollPosition, 400);
  };

  const handlePlayNow = (game) => {
  const slug = game.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  navigate(`/game/${game.uuid}/${slug}`);
};

  const handleViewAll = () => {
    navigate("/live-casino"); // Navigate to all live casino page
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const imageVariants = {
    idle: {
      scale: 1,
    },
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const overlayVariants = {
    idle: {
      opacity: 0,
    },
    hover: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const buttonVariants = {
    idle: {
      scale: 0.8,
      opacity: 0,
    },
    hover: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.1,
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1],
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <motion.section
      className="w-full relative py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container max-w-7xl mx-auto px-4 py-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 100,
          }}
          className="flex justify-between items-center mb-1"
        >
          <div className="flex items-center gap-3">
            <motion.span
              className="text-2xl"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="20"
                viewBox="0 0 14 20"
                fill="none"
              >
                <path
                  d="M12.3408 7.59087C12.2884 7.52329 12.2248 7.53657 12.1915 7.55036C12.1636 7.562 12.0996 7.59919 12.1084 7.69239C12.1191 7.80431 12.125 7.91841 12.1262 8.03157C12.1309 8.50102 11.9478 8.96094 11.6239 9.2934C11.3019 9.62371 10.8785 9.80168 10.4277 9.79652C9.81187 9.78844 9.30111 9.45809 8.95059 8.84118C8.66076 8.33106 8.78815 7.67313 8.92301 6.97654C9.00194 6.5688 9.08356 6.14716 9.08356 5.74588C9.08356 2.62132 7.04119 0.818669 5.82376 0.0222265C5.79858 0.00578122 5.77461 0 5.75338 0C5.71885 0 5.69151 0.0153124 5.67803 0.0246874C5.6519 0.0428905 5.61008 0.0843747 5.62352 0.157812C6.08886 2.69929 4.7009 4.22783 3.23143 5.84611C1.71676 7.51419 0 9.40485 0 12.8147C0 16.7767 3.13405 20 6.98634 20C10.1582 20 12.9547 17.7256 13.787 14.4692C14.3545 12.2487 13.7598 9.42031 12.3408 7.59087ZM7.16064 18.4663C6.19601 18.5115 5.27862 18.1557 4.57792 17.4667C3.88473 16.7849 3.48715 15.8336 3.48715 14.8565C3.48715 13.0228 4.16883 11.6768 6.00231 9.88973C6.03231 9.86047 6.06304 9.85121 6.08981 9.85121C6.11408 9.85121 6.13512 9.85883 6.14959 9.86598C6.18009 9.88109 6.23023 9.91852 6.22347 9.99945C6.15791 10.784 6.15905 11.4352 6.22681 11.9351C6.4 13.2118 7.30876 14.0697 8.48825 14.0697C9.06654 14.0697 9.61738 13.8458 10.0393 13.4394C10.0883 13.3922 10.143 13.3982 10.1639 13.4028C10.1917 13.409 10.2289 13.4265 10.2483 13.4748C10.4233 13.9092 10.5127 14.3703 10.5141 14.8453C10.5196 16.7564 9.01531 18.3808 7.16064 18.4663Z"
                  fill="url(#paint0_linear_8959_12805)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_8959_12805"
                    x1="16"
                    y1="25"
                    x2="1.809e-06"
                    y2="0.499998"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#5A3799" />
                    <stop offset="1" stop-color="#DC1FFF" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.span>
            <motion.h3
              className="  font-[400]  text-[14px] md:text-[18px] leading-[44px] 
                     font-['Neuropolitical'] not-italic uppercase"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              TRENDING
            </motion.h3>
          </div>

          {/* Right side controls - View All and Arrow Buttons */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* View All Button */}
            <motion.button
              onClick={handleViewAll}
              className="view_btn text-[#A7A7A7] hover:text-white transition-colors duration-300 "
              style={{
                fontFamily: "Neue Plak",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "24px", // 171.429%
                textTransform: "capitalize",
                background: "rgba(255, 255, 255, 0.20)",
                padding: "2px 10px",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All
            </motion.button>

            {/* Arrow Buttons */}
            <div className="flex items-center gap-1">
              <motion.button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={`view_btn w-8 h-8 flex items-center justify-center rounded-md transition-all duration-300 ${
                  canScrollLeft
                    ? "bg-white/10 hover:bg-white/20 text-white"
                    : "bg-white/5 text-gray-600 cursor-not-allowed"
                }`}
                aria-label="Scroll left"
                whileHover={canScrollLeft ? { scale: 1.1 } : {}}
                whileTap={canScrollLeft ? { scale: 0.9 } : {}}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </motion.button>

              <motion.button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={`view_btn w-8 h-8 flex items-center justify-center rounded-md transition-all duration-300 ${
                  canScrollRight
                    ? "bg-white/10 hover:bg-white/20 text-white"
                    : "bg-white/5 text-gray-600 cursor-not-allowed"
                }`}
                aria-label="Scroll right"
                whileHover={canScrollRight ? { scale: 1.1 } : {}}
                whileTap={canScrollRight ? { scale: 0.9 } : {}}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.p
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-400 py-10"
            >
              Loading games...
            </motion.p>
          ) : (
            <motion.div
              key="content"
              className="relative"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <div
                ref={scrollContainerRef}
                className="grid grid-flow-col auto-cols-[calc(100%/3-12px)] sm:auto-cols-[calc(100%/6-12px)] gap-3 overflow-x-auto overflow-y-hidden scrollbar-hide"
                style={{
                  WebkitOverflowScrolling: "touch",
                  overscrollBehaviorX: "contain",
                }}
              >
                {games.map((game, index) => (
                  <motion.div
                    key={game.uuid}
                    variants={cardVariants}
                    whileHover="hover"
                    className="group cursor-pointer flex-shrink-0"
                    custom={index}
                  >
                    <motion.div
                      className="relative rounded-xl overflow-hidden border border-white/10 hover:border-[#F07730]/50 transition-all duration-300"
                      whileHover={{
                        borderColor: "rgba(240, 119, 48, 0.5)",
                        boxShadow: "0 10px 30px rgba(240, 119, 48, 0.2)",
                      }}
                    >
                      {/* Increased image size but kept 16:9 proportion */}
                      <div className="relative w-full aspect-[18/12]   flex items-center justify-center overflow-hidden rounded-xl">
                        <motion.img
                          src={game.image}
                          alt={game.name}
                          className="w-full h-full object-cover rounded-xl"
                          variants={imageVariants}
                          initial="idle"
                          whileHover="hover"
                        />

                        {/* Tags */}
                        <div className="absolute top-2 left-2 bg-[#6A4DF4] text-white text-[10px] font-semibold px-2 py-[2px] rounded">
                          NEW
                        </div>
                        <div className="absolute top-2 right-2  /70 text-white text-[10px] font-semibold px-2 py-[2px] rounded">
                          99% RTP
                        </div>
                      </div>

                      {/* Overlay with Play Button */}
                      <motion.div
                        className="absolute inset-0  bg-[#080808]/70 flex items-center justify-center pointer-events-none group-hover:pointer-events-auto"
                        variants={overlayVariants}
                        initial="idle"
                        animate="idle"
                        whileHover="hover"
                      >
                        <motion.button
                          onClick={() => handlePlayNow(game)}
                          className="px-4 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full text-white font-semibold text-sm sm:text-base shadow-lg"
                          variants={buttonVariants}
                          whileTap="tap"
                        >
                          PLAY NOW
                        </motion.button>
                      </motion.div>
                    </motion.div>

                    {/* Game title + provider */}
                    <div className="mt-2 text-sm  font-semibold truncate">
                      {game.name || "Game"}
                    </div>
                    <div className="text-xs text-white/50 truncate">
                      {game.provider || "Moonbet Originals"}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default TrandingSection;
