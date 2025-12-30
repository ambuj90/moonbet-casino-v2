import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

// ⭐ Skeleton Loader Component
const GameSkeleton = () => (
  <div className="relative overflow-hidden rounded-xl">
    <div className="aspect-[18/12] bg-[#1a1b4b] animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2a2b5b] to-transparent skeleton-shimmer" />
    </div>
  </div>
);

// ⭐ Configuration
const GAMES_PER_PAGE = 48;      // How many to show at once
const API_BATCH_SIZE = 200;     // How many to fetch per API call

const GameGrid = ({ type = "all", filter = "", searchTerm = "", provider = "all" }) => {
  const [games, setGames] = useState([]);           // All cached games
  const [visibleCount, setVisibleCount] = useState(GAMES_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);     // Are there more games in DB?

  // ⭐ Map: { [gameUuid]: true | false }
  const [favorite, setFavorite] = useState({});

  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // ─────────────────────────────────────────────
  // 1) Detect device type
  // ─────────────────────────────────────────────
  useEffect(() => {
    const checkDevice = () => {
      if (typeof window === "undefined") return;
      setIsMobileDevice(window.innerWidth <= 768);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // ─────────────────────────────────────────────
  // 2) Get userId once from localStorage
  // ─────────────────────────────────────────────
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      setUserId(user.id || null);
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
    }
  }, []);

  // ─────────────────────────────────────────────
  // 3) Build API URL helper
  // ─────────────────────────────────────────────
  const buildApiUrl = (page = 1) => {
    // Recent Games
    if (type === "recent") {
      return `/wallet-service/api/games?sortBy=recent&userId=${userId}&limit=${API_BATCH_SIZE}&page=${page}`;
    }
    // Favourite Games
    if (type === "favorites") {
      return `/wallet-service/api/games?sortBy=favourite&userId=${userId}&limit=${API_BATCH_SIZE}&page=${page}`;
    }
    // All other categories
    const params = new URLSearchParams();
    if (type && type !== "all") params.append("type", type);
    if (filter) params.append("sortBy", filter);
    if (searchTerm) params.append("name", searchTerm);
    if (provider && provider !== "all") params.append("provider", provider);
    params.append("limit", API_BATCH_SIZE);
    params.append("page", page);
    
    return `/wallet-service/api/games?${params.toString()}`;
  };

  // ─────────────────────────────────────────────
  // 4) Initial fetch when filters change
  // ─────────────────────────────────────────────
  useEffect(() => {
    // Only require userId for recent/favorites
    if ((type === "recent" || type === "favorites") && !userId) {
      setGames([]);
      setLoading(false);
      return;
    }

    let isCancelled = false;
    
    const fetchGames = async () => {
      setLoading(true);
      setCurrentPage(1);
      setVisibleCount(GAMES_PER_PAGE);
      
      try {
        const apiUrl = buildApiUrl(1);
        const { data } = await axios.get(apiUrl);

        if (isCancelled) return;

        let list = [];
        if (data?.success && Array.isArray(data.data)) list = data.data;
        else if (Array.isArray(data?.data)) list = data.data;

        setGames(list);
        
        // Check if there are more pages
        const total = data?.total || list.length;
        setHasMore(list.length >= API_BATCH_SIZE || total > list.length);
        
      } catch (err) {
        console.error("Error fetching games:", err);
        if (!isCancelled) {
          setGames([]);
          setHasMore(false);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchGames();

    return () => {
      isCancelled = true;
    };
  }, [type, filter, searchTerm, provider, userId]);

  // ─────────────────────────────────────────────
  // 5) Fetch favourites for heart icons
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (!userId) return;

    const fetchFavourites = async () => {
      try {
        const res = await axios.get(`/wallet-service/api/games/${userId}/favourite-game`);
        const favGames = res.data?.games || [];
        const map = {};
        favGames.forEach((g) => (map[g.uuid] = true));
        setFavorite(map);
      } catch (err) {
        console.error("Failed to fetch favourites:", err);
      }
    };

    fetchFavourites();
  }, [userId]);

  // ─────────────────────────────────────────────
  // 6) Filter by device (mobile/desktop) - ORIGINAL LOGIC
  // ─────────────────────────────────────────────
  const filteredGames = games.filter((game) => {
    const isMobileFlag =
      game.is_mobile === true ||
      game.is_mobile === "true" ||
      game.is_mobile === 1;

    if (isMobileDevice) {
      return isMobileFlag;
    } else {
      return (
        game.is_mobile === false ||
        game.is_mobile === "false" ||
        game.is_mobile === 0 ||
        typeof game.is_mobile === "undefined"
      );
    }
  });

  // ─────────────────────────────────────────────
  // 7) Load More handler - HYBRID APPROACH
  // ─────────────────────────────────────────────
  const handleLoadMore = async () => {
    const nextVisibleCount = visibleCount + GAMES_PER_PAGE;
    
    // ⚡ Case 1: We have cached games - just show more (instant!)
    if (nextVisibleCount <= filteredGames.length) {
      setVisibleCount(nextVisibleCount);
      return;
    }
    
    // ⚡ Case 2: Need to fetch more from API
    if (!hasMore || loadingMore) return;
    
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    
    try {
      const apiUrl = buildApiUrl(nextPage);
      const { data } = await axios.get(apiUrl);
      
      let newGames = [];
      if (data?.success && Array.isArray(data.data)) newGames = data.data;
      else if (Array.isArray(data?.data)) newGames = data.data;
      
      if (newGames.length > 0) {
        // Append new games to cache (avoid duplicates)
        setGames(prev => {
          const existingIds = new Set(prev.map(g => g.uuid));
          const uniqueNew = newGames.filter(g => !existingIds.has(g.uuid));
          return [...prev, ...uniqueNew];
        });
        setCurrentPage(nextPage);
        setVisibleCount(nextVisibleCount);
      }
      
      // Check if more pages exist
      setHasMore(newGames.length >= API_BATCH_SIZE);
      
    } catch (err) {
      console.error("Error loading more games:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  // ─────────────────────────────────────────────
  // 8) Play now handler
  // ─────────────────────────────────────────────
  const handlePlayNow = (game) => {
    if (!game.slug) {
      console.error("❌ No slug found for game:", game);
      return;
    }
    navigate(`/game/${game.slug}`);
  };

  // ─────────────────────────────────────────────
  // 9) Toggle favorite handler
  // ─────────────────────────────────────────────
  const handleToggleFavorite = async (e, game) => {
    e.stopPropagation();
    if (!userId || !game?.uuid) return;

    const prevState = !!favorite[game.uuid];
    const nextState = !prevState;

    // Optimistic update
    setFavorite((prev) => ({
      ...prev,
      [game.uuid]: nextState,
    }));

    try {
      await axios.post(`/wallet-service/api/games/${userId}/favourite`, {
        uuid: game.uuid,
      });

      // If user un-favorites inside favourites page → remove from UI
      if (type === "favorites" && !nextState) {
        setGames((prev) => prev.filter((g) => g.uuid !== game.uuid));
      }
    } catch (err) {
      console.error("Failed to toggle favourite:", err);
      // Rollback
      setFavorite((prev) => ({
        ...prev,
        [game.uuid]: prevState,
      }));
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  // ─────────────────────────────────────────────
  // 10) Check if Load More should show
  // ─────────────────────────────────────────────
  const showLoadMore = visibleCount < filteredGames.length || hasMore;

  // ─────────────────────────────────────────────
  // 11) RENDER
  // ─────────────────────────────────────────────
  return (
    <section className="w-full py-2">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-['Neuropolitical'] text-xl mb-6 uppercase">
          {type === "all" ? "ALL" : type.toUpperCase()}
        </h2>

        {/* ⭐ Skeleton Loading */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
            {[...Array(21)].map((_, i) => (
              <GameSkeleton key={i} />
            ))}
          </div>
        ) : filteredGames.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No games found.</p>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4"
            >
              {filteredGames.slice(0, visibleCount).map((game, i) => (
                <motion.div
                  key={game.uuid || i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative overflow-hidden cursor-pointer group transition-all"
                >
                  {/* ⭐ Favorite Icon (Top Right) */}
                  <button
                    onClick={(e) => handleToggleFavorite(e, game)}
                    className={`group/fav absolute top-0 right-0 w-8 h-8 flex items-center justify-center rounded-[8px] transition-all duration-300 z-10 ${
                      favorite?.[game.uuid] ? "opacity-100" : ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      fill="none"
                    >
                      <defs>
                        <linearGradient
                          id="favoriteGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#D10000" />
                          <stop offset="100%" stopColor="#D10000" />
                        </linearGradient>
                      </defs>

                      <g filter="url(#filter0_i_9169_775)">
                        <path
                          d="M12.5109 0C13.9778 8.11794e-05 15.3565 0.572116 16.3938 1.60938C18.535 3.75069 18.5351 7.23458 16.3938 9.37598L10.3723 15.3984C10.007 15.7637 9.51949 15.9648 9.00021 15.9648C8.48092 15.9648 7.99347 15.7636 7.62813 15.3984L1.60567 9.37598C-0.535331 7.23467 -0.535118 3.75066 1.60567 1.60938C2.64293 0.572082 4.02253 4.3329e-05 5.48946 0C6.78681 0 8.01594 0.44767 9.00021 1.26855C9.98454 0.44767 11.2135 0 12.5109 0Z"
                          fill={
                            favorite?.[game.uuid]
                              ? "url(#favoriteGradient)"
                              : undefined
                          }
                          className={
                            !favorite?.[game.uuid]
                              ? "fill-[#16192DB2] group-hover/fav:fill-white stroke-white transition-all duration-300"
                              : ""
                          }
                          fillOpacity="1"
                          strokeWidth="0.3"
                        />
                      </g>

                      <defs>
                        <filter
                          id="filter0_i_9169_775"
                          x="0"
                          y="0"
                          width="18.9997"
                          height="16.9648"
                          filterUnits="userSpaceOnUse"
                          colorInterpolationFilters="sRGB"
                        >
                          <feFlood
                            floodOpacity="0"
                            result="BackgroundImageFix"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dx="1" dy="1" />
                          <feGaussianBlur stdDeviation="1" />
                          <feComposite
                            in2="hardAlpha"
                            operator="arithmetic"
                            k2="-1"
                            k3="1"
                          />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="shape"
                            result="effect1_innerShadow_9169_775"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </button>

                  {/* Thumbnail + Play overlay */}
                  <div className="relative aspect-[18/12] overflow-hidden rounded-xl bg-[#1a1b4b]">
                    <img
                      src={game.image || "/images/game-placeholder.png"}
                      alt={game.name || "Game"}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'%3E%3Crect fill='%231a1b4b' width='200' height='150'/%3E%3Ctext fill='%23666' font-family='Arial' font-size='14' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EGame%3C/text%3E%3C/svg%3E";
                      }}
                    />

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:pointer-events-auto bg-[var(--overlay-bg)] backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all">
                      <motion.button
                        onClick={() => handlePlayNow(game)}
                        className="px-4 py-2 rounded-full text-white font-semibold text-sm"
                        whileTap={{ scale: 0.9 }}
                      >
                        {/* play icon */}
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
                              colorInterpolationFilters="sRGB"
                            >
                              <feFlood
                                floodOpacity="0"
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
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* ⭐ Load More Button - Shows when more games available */}
            {showLoadMore && (
              <div className="flex justify-center mt-8">
                <motion.button
                  whileHover={{ scale: loadingMore ? 1 : 1.05 }}
                  whileTap={{ scale: loadingMore ? 1 : 0.95 }}
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className={`px-8 py-3 rounded-full text-white font-semibold text-sm shadow-md flex items-center gap-2 ${
                    loadingMore ? "opacity-70 cursor-wait" : ""
                  }`}
                  style={{
                    background: "var(--cta-pink-gradient)",
                  }}
                >
                  {loadingMore ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      LOADING...
                    </>
                  ) : (
                    <>
                      LOAD MORE
                      <span className="text-xs opacity-70">
                        ({filteredGames.length} loaded)
                      </span>
                    </>
                  )}
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ⭐ Skeleton shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .skeleton-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </section>
  );
};

export default GameGrid;
