// src/components/sections/LiveCasino.jsx
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MoonBetButton from "../ui-elements/MoonBetButton";
import api from "../../api/axios";
import axios from "axios";
import { Link } from "react-router-dom";

const LiveCasino = () => {
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
    const tolerance = 5; // Allow small rounding differences

    setCanScrollLeft(scrollLeft > tolerance);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - tolerance);
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const { data } = await axios.get("/wallet-service/api/games");

        // ✅ Support both new and old response formats
        let fetchedGames = [];

        if (Array.isArray(data?.data)) {
          // new backend structure
          fetchedGames = data.data;
        } else if (Array.isArray(data?.games?.items)) {
          // old backend structure
          fetchedGames = data.games.items;
        }

        // ✅ Shuffle the games list randomly
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

    // ✅ Delay initial check after layout
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

    const isMobile = window.innerWidth < 640;
    const scrollAmount = isMobile ? container.clientWidth : 300;

    const targetScroll =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });

    // ✅ Force re-check after smooth scroll finishes
    setTimeout(() => {
      checkScrollPosition();
    }, 400);
  };

  const handlePlayNow = (gameName) => {
    // Replace spaces with dashes for clean URLs
    const gameSlug = encodeURIComponent(gameName);
    navigate(`/game/${gameSlug}`);
  };

  const handleViewAll = () => {
    navigate("/casino/live-casino"); // Navigate to all live casino page
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
      className="w-full relative mt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container max-w-7xl mx-auto px-4">
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
                width="23"
                height="20"
                viewBox="0 0 23 20"
                fill="none"
              >
                <path
                  d="M15.571 15.1885C15.3449 15.1878 15.1239 15.1209 14.9359 14.996C14.7478 14.8712 14.601 14.694 14.5137 14.4867C14.4264 14.2793 14.4026 14.051 14.4453 13.8303C14.4879 13.6095 14.5951 13.4062 14.7534 13.2457C15.6159 12.3843 16.1001 11.2186 16.1001 10.0034C16.1001 8.78825 15.6159 7.62252 14.7534 6.76116C14.5448 6.5445 14.4302 6.25505 14.4344 5.95523C14.4386 5.65541 14.5612 5.36923 14.7758 5.15841C14.9903 4.94759 15.2796 4.82901 15.5814 4.82824C15.8831 4.82747 16.173 4.94458 16.3887 5.15431C17.6771 6.4434 18.4001 8.18655 18.4001 10.0034C18.4001 11.8203 17.6771 13.5635 16.3887 14.8525C16.2815 14.9594 16.154 15.0442 16.0137 15.1018C15.8733 15.1595 15.7229 15.189 15.571 15.1885ZM8.23742 14.8583C8.45424 14.6452 8.57701 14.3552 8.57874 14.0522C8.58046 13.7491 8.461 13.4578 8.24662 13.2423C7.38411 12.3809 6.89991 11.2152 6.89991 10C6.89991 8.78483 7.38411 7.61909 8.24662 6.75773C8.35569 6.65165 8.44242 6.52506 8.50177 6.38533C8.56111 6.2456 8.59187 6.09554 8.59226 5.94388C8.59265 5.79221 8.56266 5.64199 8.50404 5.50197C8.44542 5.36194 8.35934 5.23491 8.25082 5.12827C8.1423 5.02164 8.0135 4.93754 7.87195 4.88087C7.73039 4.82421 7.5789 4.79611 7.4263 4.79821C7.2737 4.80031 7.12305 4.83258 6.98313 4.89313C6.84321 4.95368 6.71681 5.0413 6.61131 5.15088C5.32293 6.43997 4.59986 8.18312 4.59986 10C4.59986 11.8169 5.32293 13.56 6.61131 14.8491C6.82575 15.0646 7.11752 15.1866 7.42246 15.1883C7.72741 15.19 8.02055 15.0713 8.23742 14.8583ZM20.0469 17.624C21.9476 15.534 23 12.8171 23 10C23 7.18287 21.9476 4.46604 20.0469 2.37604C19.8422 2.15128 19.5561 2.01653 19.2515 2.00142C18.9468 1.98631 18.6486 2.09208 18.4225 2.29546C18.1963 2.49885 18.0607 2.78318 18.0455 3.08592C18.0303 3.38865 18.1367 3.68499 18.3414 3.90974C19.8595 5.57947 20.6999 7.74969 20.6999 10C20.6999 12.2503 19.8595 14.4205 18.3414 16.0903C18.1367 16.315 18.0303 16.6113 18.0455 16.9141C18.0607 17.2168 18.1963 17.5012 18.4225 17.7045C18.6486 17.9079 18.9468 18.0137 19.2515 17.9986C19.5561 17.9835 19.8422 17.8487 20.0469 17.624ZM4.57694 17.704C4.80302 17.5007 4.93862 17.2165 4.95393 16.9139C4.96924 16.6113 4.86301 16.315 4.65859 16.0903C3.14054 14.4205 2.30012 12.2503 2.30012 10C2.30012 7.74969 3.14054 5.57947 4.65859 3.90974C4.75993 3.79846 4.83822 3.66843 4.88898 3.52707C4.93975 3.38572 4.96201 3.23582 4.95448 3.08592C4.94695 2.93602 4.90978 2.78906 4.84511 2.65343C4.78043 2.51781 4.6895 2.39617 4.57752 2.29546C4.46554 2.19476 4.33469 2.11696 4.19245 2.06651C4.05022 2.01606 3.89937 1.99394 3.74853 2.00142C3.4439 2.01653 3.15779 2.15128 2.95313 2.37604C1.05236 4.46604 0 7.18287 0 10C0 12.8171 1.05236 15.534 2.95313 17.624C3.15784 17.8485 3.44388 17.983 3.74837 17.998C4.05287 18.013 4.35089 17.9072 4.57694 17.704ZM11.5 8.28572C11.1588 8.28572 10.8253 8.38626 10.5416 8.57463C10.258 8.763 10.0369 9.03073 9.9063 9.34397C9.77573 9.65722 9.74157 10.0019 9.80813 10.3344C9.87469 10.667 10.039 10.9724 10.2802 11.2122C10.5215 11.4519 10.8288 11.6152 11.1635 11.6813C11.4981 11.7475 11.8449 11.7135 12.1601 11.5838C12.4753 11.454 12.7448 11.2343 12.9343 10.9524C13.1238 10.6705 13.225 10.3391 13.225 10C13.225 9.54535 13.0433 9.10931 12.7198 8.78782C12.3963 8.46633 11.9575 8.28572 11.5 8.28572Z"
                  fill="#CED5E3"
                />
              </svg>
            </motion.span>
            <motion.h3
              className="text-[#CED5E3] font-[400]  text-[16px] md:text-[18px] leading-[44px] 
                     font-['Neuropolitical'] not-italic uppercase"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              LIVE CASINO
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
              All
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
                      {/* Insert the updated image block here */}
                      <div className="relative w-full aspect-[18/12]   flex items-center justify-center overflow-hidden rounded-xl">
                        <motion.img
                          src={game.image}
                          alt={game.name}
                          className="w-full h-full object-cover rounded-xl"
                          variants={imageVariants}
                          initial="idle"
                          whileHover="hover"
                        />
                        <div className="absolute top-2 left-2 bg-[#6A4DF4] text-white text-[10px] font-semibold px-2 py-[2px] rounded">
                          {game.name || "game"}
                        </div>
                        <div className="absolute top-2 right-2  /70 text-white text-[10px] font-semibold px-2 py-[2px] rounded">
                          {game.provider || "Endrophia"}
                        </div>
                      </div>

                      {/* Overlay with Play Button */}
                      <motion.div
                        className="absolute inset-0  /70 flex items-center justify-center pointer-events-none group-hover:pointer-events-auto"
                        variants={overlayVariants}
                        initial="idle"
                        animate="idle"
                        whileHover="hover"
                      >
                        <motion.button
                          onClick={() => handlePlayNow(game.name)}
                          className="px-4 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full text-white font-semibold text-sm sm:text-base shadow-lg"
                          variants={buttonVariants}
                          whileTap="tap"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="54"
                            height="59"
                            viewBox="0 0 54 59"
                            fill="none"
                          >
                            <g filter="url(#filter0_d_8546_318)">
                              <path
                                d="M12.1624 1.12451C7.65462 -1.51293 4 0.647693 4 5.94654V45.0497C4 50.3539 7.65462 52.5117 12.1624 49.8767L45.6704 30.2758C50.1797 27.6374 50.1797 23.3629 45.6704 20.7251L12.1624 1.12451Z"
                                fill="#E1E1E1"
                              />
                            </g>
                            <defs>
                              <filter
                                id="filter0_d_8546_318"
                                x="0"
                                y="0"
                                width="53.0522"
                                height="59.0001"
                                filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB"
                              >
                                <feFlood
                                  flood-opacity="0"
                                  result="BackgroundImageFix"
                                />
                                <feColorMatrix
                                  in="SourceAlpha"
                                  type="matrix"
                                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                  result="hardAlpha"
                                />
                                <feOffset dy="4" />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix
                                  type="matrix"
                                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                />
                                <feBlend
                                  mode="normal"
                                  in2="BackgroundImageFix"
                                  result="effect1_dropShadow_8546_318"
                                />
                                <feBlend
                                  mode="normal"
                                  in="SourceGraphic"
                                  in2="effect1_dropShadow_8546_318"
                                  result="shape"
                                />
                              </filter>
                            </defs>
                          </svg>
                        </motion.button>
                      </motion.div>
                    </motion.div>

                    {/* Game title + provider */}
                    <div className="mt-2 text-sm text-white/90 font-semibold">
                      {game.name || "game"}
                    </div>
                    <div className="text-xs text-white/50">
                      {game.provider || "Endrophia"}
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

export default LiveCasino;
