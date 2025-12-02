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

  const handlePlayNow = (game) => {
    const slug = game.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    navigate(`/game/${game.uuid}/${slug}`);
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
      className="w-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container max-w-7xl mx-auto px-4 py-4">
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
                  d="M13.7473 3.74906H2.50543C2.17415 3.74906 1.85644 3.88072 1.62219 4.11508C1.38794 4.34944 1.25634 4.6673 1.25634 4.99874C1.25634 5.33017 1.38794 5.64803 1.62219 5.88239C1.85644 6.11675 2.17415 6.24842 2.50543 6.24842H13.7473C14.4098 6.24842 15.0453 6.51174 15.5138 6.98046C15.9823 7.44918 16.2455 8.0849 16.2455 8.74777C16.2455 9.07921 16.3771 9.39707 16.6113 9.63143C16.8456 9.86579 17.1633 9.99745 17.4946 9.99745C17.8258 9.99745 18.1436 9.86579 18.3778 9.63143C18.6121 9.39707 18.7437 9.07921 18.7437 8.74777C18.7437 7.42203 18.2173 6.15059 17.2803 5.21315C16.3433 4.27571 15.0724 3.74906 13.7473 3.74906Z"
                  fill="url(#paint0_linear_9169_861)"
                />
                <path
                  d="M2.50543 9.99745C2.17415 9.99745 1.85644 10.1291 1.62219 10.3635C1.38794 10.5978 1.25634 10.9157 1.25634 11.2471C1.25634 12.5729 1.78274 13.8443 2.71974 14.7818C3.65675 15.7192 4.92759 16.2458 6.25272 16.2458H17.4946C17.8258 16.2458 18.1436 16.1142 18.3778 15.8798C18.6121 15.6455 18.7437 15.3276 18.7437 14.9962C18.7437 14.6647 18.6121 14.3469 18.3778 14.1125C18.1436 13.8782 17.8258 13.7465 17.4946 13.7465H6.25272C5.59016 13.7465 4.95473 13.4832 4.48623 13.0144C4.01773 12.5457 3.75453 11.91 3.75453 11.2471C3.75453 10.9157 3.62293 10.5978 3.38868 10.3635C3.15442 10.1291 2.83671 9.99745 2.50543 9.99745Z"
                  fill="url(#paint1_linear_9169_861)"
                />
                <path
                  d="M14.9964 9.99745C14.832 9.9965 14.669 10.028 14.5168 10.0902C14.3647 10.1524 14.2262 10.244 14.1095 10.3599C13.9924 10.476 13.8995 10.6143 13.8361 10.7665C13.7727 10.9188 13.74 11.0822 13.74 11.2471C13.74 11.4121 13.7727 11.5754 13.8361 11.7277C13.8995 11.88 13.9924 12.0182 14.1095 12.1344L16.9824 14.9962L14.1095 17.8579C13.8743 18.0933 13.7422 18.4124 13.7422 18.7452C13.7422 19.078 13.8743 19.3972 14.1095 19.6325C14.3447 19.8678 14.6637 20 14.9964 20C15.329 20 15.648 19.8678 15.8832 19.6325L19.6305 15.8834C19.7476 15.7673 19.8405 15.6291 19.9039 15.4768C19.9674 15.3245 20 15.1611 20 14.9962C20 14.8312 19.9674 14.6679 19.9039 14.5156C19.8405 14.3633 19.7476 14.2251 19.6305 14.1089L15.8832 10.3599C15.7665 10.244 15.6281 10.1524 15.4759 10.0902C15.3237 10.028 15.1608 9.9965 14.9964 9.99745Z"
                  fill="url(#paint2_linear_9169_861)"
                />
                <path
                  d="M5.00362 2.08875e-05C4.83923 -0.000929985 4.67627 0.0305932 4.52409 0.092783C4.3719 0.154973 4.23348 0.246606 4.11676 0.362428L0.36948 4.11147C0.252404 4.22764 0.159479 4.36585 0.096064 4.51814C0.0326491 4.67042 0 4.83376 0 4.99874C0 5.16371 0.0326491 5.32705 0.096064 5.47933C0.159479 5.63162 0.252404 5.76984 0.36948 5.88601L4.11676 9.63505C4.35197 9.87037 4.67099 10.0026 5.00362 10.0026C5.16833 10.0026 5.33142 9.97011 5.48359 9.90705C5.63575 9.84399 5.77402 9.75156 5.89048 9.63505C6.00694 9.51853 6.09933 9.3802 6.16236 9.22796C6.22539 9.07572 6.25783 8.91256 6.25783 8.74777C6.25783 8.58299 6.22539 8.41982 6.16236 8.26759C6.09933 8.11535 6.00694 7.97702 5.89048 7.8605L3.01756 4.99874L5.89048 2.13697C6.00755 2.0208 6.10048 1.88258 6.16389 1.7303C6.22731 1.57801 6.25996 1.41467 6.25996 1.2497C6.25996 1.08473 6.22731 0.921388 6.16389 0.769103C6.10048 0.616818 6.00755 0.478602 5.89048 0.362428C5.77376 0.246606 5.63534 0.154973 5.48316 0.092783C5.33097 0.0305932 5.16801 -0.000929985 5.00362 2.08875e-05Z"
                  fill="url(#paint3_linear_9169_861)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_9169_861"
                    x1="22.8571"
                    y1="25"
                    x2="9.64214"
                    y2="-3.90783"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#5A3799" />
                    <stop offset="1" stop-color="#DC1FFF" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_9169_861"
                    x1="22.8571"
                    y1="25"
                    x2="9.64214"
                    y2="-3.90783"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#5A3799" />
                    <stop offset="1" stop-color="#DC1FFF" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_9169_861"
                    x1="22.8571"
                    y1="25"
                    x2="9.64214"
                    y2="-3.90783"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#5A3799" />
                    <stop offset="1" stop-color="#DC1FFF" />
                  </linearGradient>
                  <linearGradient
                    id="paint3_linear_9169_861"
                    x1="22.8571"
                    y1="25"
                    x2="9.64214"
                    y2="-3.90783"
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
              High RTP Games
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
                {games.map((game, index) => (
                  <motion.div
                    key={game.uuid}
                    variants={cardVariants}
                    whileHover="hover"
                    className="group cursor-pointer flex-shrink-0"
                    custom={index}
                  >
                    <motion.div className="relative rounded-xl overflow-hidden border border-white/10 transition-all duration-300">
                      {/* Increased image size but kept 16:9 proportion */}
                      <div className="relative w-full aspect-[18/12] flex items-center justify-center overflow-hidden rounded-xl">
                        <motion.img
                          src={game.image}
                          alt={game.name}
                          className="w-full h-full object-cover rounded-xl"
                          variants={imageVariants}
                          initial="idle"
                          whileHover="hover"
                        />

                        {/* Tags */}

                        <div className="absolute top-2 right-2 bg-[#1C1D49] text-white text-[10px] font-semibold px-2 py-[2px] rounded">
                          99% RTP
                        </div>
                      </div>

                      {/* Overlay with Play Button */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:pointer-events-auto"
                        style={{
                          background: "rgba(40, 39, 83, 0.50)",
                          backdropFilter: "blur(2px)",
                        }}
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

export default RecentSection;
