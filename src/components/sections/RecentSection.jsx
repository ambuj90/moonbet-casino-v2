import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MoonBetButton from "../ui-elements/MoonBetButton";
import api from "../../api/axios";
import axios from "axios";

const RecentSection = () => {
  const scrollContainerRef = useRef(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id || "690b0290cb255ca66b14a529";

  const GAME_QUERIES = [
    "Aviamasters",
    "Aviator",
    "Bonanza",
    "casino",
    "Wild",
    "Plinko",
    "Gate of olympus",
    "Live Blackjack",
    "Le pharaoh",
  ];

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
    const fetchAllGames = async () => {
      try {
        const requests = GAME_QUERIES.map((name) =>
          axios.get(
            `/wallet-service/api/games?name=${encodeURIComponent(name)}`
          )
        );

        const responses = await Promise.all(requests);

        let merged = [];

        responses.forEach((res) => {
          let list = [];

          // Support both API formats
          if (Array.isArray(res.data?.data)) {
            list = res.data.data;
          } else if (Array.isArray(res.data?.games?.items)) {
            list = res.data.games.items;
          }

          merged = [...merged, ...list];
        });

        // Remove duplicates by UUID
        const unique = merged.filter(
          (v, i, arr) => arr.findIndex((x) => x.uuid === v.uuid) === i
        );
        const shuffleArray = (array) => {
          return array
            .map((item) => ({ item, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ item }) => item);
        };

        setGames(shuffleArray(unique));
      } catch (error) {
        console.error("❌ Error fetching games:", error);
        toast.error(
          error.response?.data?.message || "Failed to load games list"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAllGames();
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

  const handlePlayNow = (gameName) => {
    // Replace spaces with dashes for clean URLs
    const gameSlug = encodeURIComponent(gameName);
    navigate(`/game/${gameSlug}`);
  };

  const handleViewAll = () => {
    navigate("/casino/recent"); // Navigate to all live casino page
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
      className="w-full relative  "
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
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M4.6875 6.61038H0V19.598H4.6875V6.61038Z"
                  fill="#CED5E3"
                />
                <path
                  d="M19.5739 12.0387C19.5739 11.5702 19.4258 11.1374 19.1763 10.7889C19.6748 10.4098 20 9.79425 20 9.10021C20 7.95092 19.1093 7.01589 18.0145 7.01589H13.501L14.1291 4.73827V3.64696C14.1291 1.63604 12.5706 0 10.655 0C10.1905 0 9.81269 0.396697 9.81269 0.884265V3.30365C9.49945 3.82993 7.75992 5.87903 5.85938 8.02588V18.7897L7.48117 19.4281C8.44512 19.8076 9.4559 20 10.4854 20H16.7362C17.831 20 18.7217 19.0649 18.7217 17.9156C18.7217 17.4473 18.5738 17.0146 18.3245 16.6662C18.8229 16.2871 19.1478 15.6712 19.1478 14.9771C19.1478 14.5086 18.9997 14.0758 18.7502 13.7274C19.2487 13.3484 19.5739 12.7328 19.5739 12.0387Z"
                  fill="#CED5E3"
                />
              </svg>
            </motion.span>
            <motion.h3
              className="text-[#CED5E3] font-[400]  text-[14px] md:text-[18px] leading-[44px] 
                     font-['Neuropolitical'] not-italic uppercase"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              High RTP Games
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
                      className="relative rounded-xl overflow-hidden border border-white/10  transition-all duration-300"
                      whileHover={{
                        boxShadow: "0 10px 30px rgba(240, 119, 48, 0.2)",
                        borderRadius: "12px",
                        background: "rgba(8, 8, 8, 0.30)",
                        backdropFilter: "blur(2px)",
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
                        className="absolute inset-0  /70 flex items-center justify-center pointer-events-none group-hover:pointer-events-auto"
                        variants={overlayVariants}
                        initial="idle"
                        animate="idle"
                        whileHover="hover"
                      >
                        <motion.button
                          onClick={() => handlePlayNow(game.name)}
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
                    <div className="mt-2 text-sm text-white/90 font-semibold truncate">
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

export default RecentSection;
