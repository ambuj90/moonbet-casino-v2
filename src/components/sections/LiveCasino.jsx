// src/components/sections/LiveCasino.jsx
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MoonBetButton from "../ui-elements/MoonBetButton";
import api from "../../api/axios";
import axios from "axios";

const LiveCasino = () => {
  const scrollContainerRef = useRef(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
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
    const checkDevice = () => {
      setIsMobileDevice(window.innerWidth <= 768); // mobile breakpoint
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

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

  const handlePlayNow = (game) => {
    if (!game.slug) {
      console.error("❌ No slug found for game:", game);
      return;
    }

    navigate(`/game/${game.slug}`);
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

  // Filter games based on device type
  const filteredGames = games.filter((game) => {
    const isMobileFlag =
      game.is_mobile === true ||
      game.is_mobile === "true" ||
      game.is_mobile === 1;

    if (isMobileDevice) {
      // show mobile games
      return isMobileFlag;
    } else {
      // show desktop games
      return (
        game.is_mobile === false ||
        game.is_mobile === "false" ||
        game.is_mobile === 0 ||
        typeof game.is_mobile === "undefined"
      );
    }
  });

  return (
    <motion.section
      className="w-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container max-w-7xl mx-auto px-4 md:py-5 py-5">
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
                height="16"
                viewBox="0 0 23 16"
                fill="none"
              >
                <path
                  d="M15.571 13.1885C15.3449 13.1878 15.1239 13.1209 14.9359 12.996C14.7478 12.8712 14.601 12.694 14.5137 12.4867C14.4264 12.2793 14.4026 12.051 14.4453 11.8303C14.4879 11.6095 14.5951 11.4062 14.7534 11.2457C15.6159 10.3843 16.1001 9.2186 16.1001 8.00343C16.1001 6.78825 15.6159 5.62252 14.7534 4.76116C14.5448 4.5445 14.4302 4.25505 14.4344 3.95523C14.4386 3.65541 14.5612 3.36923 14.7758 3.15841C14.9903 2.94759 15.2796 2.82901 15.5814 2.82824C15.8831 2.82747 16.173 2.94458 16.3887 3.15431C17.6771 4.4434 18.4001 6.18655 18.4001 8.00343C18.4001 9.82031 17.6771 11.5635 16.3887 12.8525C16.2815 12.9594 16.154 13.0442 16.0137 13.1018C15.8733 13.1595 15.7229 13.189 15.571 13.1885ZM8.23742 12.8583C8.45424 12.6452 8.57701 12.3552 8.57874 12.0522C8.58046 11.7491 8.461 11.4578 8.24662 11.2423C7.38411 10.3809 6.89991 9.21518 6.89991 8C6.89991 6.78483 7.38411 5.61909 8.24662 4.75773C8.35569 4.65165 8.44242 4.52506 8.50177 4.38533C8.56111 4.2456 8.59187 4.09554 8.59226 3.94388C8.59265 3.79221 8.56266 3.64199 8.50404 3.50197C8.44542 3.36194 8.35934 3.23491 8.25082 3.12827C8.1423 3.02164 8.0135 2.93754 7.87195 2.88087C7.73039 2.82421 7.5789 2.79611 7.4263 2.79821C7.2737 2.80031 7.12305 2.83258 6.98313 2.89313C6.84321 2.95368 6.71681 3.0413 6.61131 3.15088C5.32293 4.43997 4.59986 6.18312 4.59986 8C4.59986 9.81688 5.32293 11.56 6.61131 12.8491C6.82575 13.0646 7.11752 13.1866 7.42246 13.1883C7.72741 13.19 8.02055 13.0713 8.23742 12.8583ZM20.0469 15.624C21.9476 13.534 23 10.8171 23 8C23 5.18287 21.9476 2.46604 20.0469 0.376036C19.8422 0.151285 19.5561 0.0165323 19.2515 0.00142229C18.9468 -0.0136877 18.6486 0.0920827 18.4225 0.295465C18.1963 0.498847 18.0607 0.783181 18.0455 1.08592C18.0303 1.38865 18.1367 1.68499 18.3414 1.90974C19.8595 3.57947 20.6999 5.74969 20.6999 8C20.6999 10.2503 19.8595 12.4205 18.3414 14.0903C18.1367 14.315 18.0303 14.6113 18.0455 14.9141C18.0607 15.2168 18.1963 15.5012 18.4225 15.7045C18.6486 15.9079 18.9468 16.0137 19.2515 15.9986C19.5561 15.9835 19.8422 15.8487 20.0469 15.624ZM4.57694 15.704C4.80302 15.5007 4.93862 15.2165 4.95393 14.9139C4.96924 14.6113 4.86301 14.315 4.65859 14.0903C3.14054 12.4205 2.30012 10.2503 2.30012 8C2.30012 5.74969 3.14054 3.57947 4.65859 1.90974C4.75993 1.79846 4.83822 1.66843 4.88898 1.52707C4.93975 1.38572 4.96201 1.23582 4.95448 1.08592C4.94695 0.936018 4.90978 0.789059 4.84511 0.653433C4.78043 0.517807 4.6895 0.39617 4.57752 0.295465C4.46554 0.19476 4.33469 0.116961 4.19245 0.0665089C4.05022 0.016057 3.89937 -0.00605942 3.74853 0.00142229C3.4439 0.0165323 3.15779 0.151285 2.95313 0.376036C1.05236 2.46604 0 5.18287 0 8C0 10.8171 1.05236 13.534 2.95313 15.624C3.15784 15.8485 3.44388 15.983 3.74837 15.998C4.05287 16.013 4.35089 15.9072 4.57694 15.704ZM11.5 6.28572C11.1588 6.28572 10.8253 6.38626 10.5416 6.57463C10.258 6.763 10.0369 7.03073 9.9063 7.34397C9.77573 7.65722 9.74157 8.0019 9.80813 8.33444C9.87469 8.66698 10.039 8.97243 10.2802 9.21218C10.5215 9.45192 10.8288 9.61519 11.1635 9.68134C11.4981 9.74748 11.8449 9.71354 12.1601 9.58379C12.4753 9.45404 12.7448 9.23431 12.9343 8.9524C13.1238 8.67049 13.225 8.33905 13.225 8C13.225 7.54535 13.0433 7.10931 12.7198 6.78782C12.3963 6.46633 11.9575 6.28572 11.5 6.28572Z"
                  fill="url(#paint0_linear_8959_12863)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_8959_12863"
                    x1="26.2857"
                    y1="20"
                    x2="18.211"
                    y2="-5.39131"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#a62a00" />
                    <stop offset="1" stop-color="#ffb8a1" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.span>
            <motion.h3
              className="font-[400]  text-[16px] md:text-[18px] leading-[44px] 
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
            className="flex items-center gap-2"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* View All Button */}
            <motion.button
              onClick={handleViewAll}
              className="view_btn hover:text-white transition-colors duration-300 "
              style={{
                fontFamily: "Neue Plak",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "24px", // 171.429%
                textTransform: "capitalize",
                background: "#282753",
                padding: "4px 10px",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All
            </motion.button>

            {/* Arrow Buttons */}
            <div className="flex items-center gap-2">
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
                {filteredGames.map((game, index) => (
                  <motion.div
                    key={game.uuid}
                    variants={cardVariants}
                    whileHover="hover"
                    className="group cursor-pointer flex-shrink-0"
                    custom={index}
                  >
                    <motion.div className="relative rounded-xl overflow-hidden border border-white/10  transition-all duration-300">
                      {/* Insert the updated image block here */}
                      <div className="relative w-full aspect-[18/12] flex items-center justify-center overflow-hidden rounded-xl">
                        <motion.img
                          src={game.image}
                          alt={game.name}
                          className="w-full h-full object-cover rounded-xl"
                          variants={imageVariants}
                          initial="idle"
                          whileHover="hover"
                        />
                        {/* <div className="absolute top-2 left-2 bg-[#1C1D49] text-white text-[10px] font-semibold px-2 py-[2px] rounded">
                          {game.name || "game"}
                        </div> */}
                      </div>

                      {/* Overlay with Play Button */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:pointer-events-auto bg-[var(--overlay-bg)] backdrop-blur-[2px]"
                        variants={overlayVariants}
                        initial="idle"
                        animate="idle"
                        whileHover="hover"
                      >
                        <motion.button
                          onClick={() => handlePlayNow(game)}
                          className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-white font-semibold text-sm sm:text-base shadow-lg"
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
                    <div className="mt-2 text-sm  font-semibold">
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
