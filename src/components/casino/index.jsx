import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const GameGrid = ({ type = "all", filter = "", searchTerm = "" }) => {
  const [games, setGames] = useState([]);
  const [visibleCount, setVisibleCount] = useState(48);
  const [loading, setLoading] = useState(true);

  // ⭐ Map: { [gameUuid]: true | false }
  const [favorite, setFavorite] = useState({});

  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [userId, setUserId] = useState(null);      // ⭐ keep userId
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
      const id = user.id || "690b0290cb255ca66b14a529"; // your fallback
      setUserId(id);
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
    }
  }, []);

  // ─────────────────────────────────────────────
  // 3) Fetch games when type/filter/search/user changes
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (!userId) return; // wait until we know userId

    const fetchGames = async () => {
      setLoading(true);
      try {
        let apiUrl = "";

        // 1. Recent Games
        if (type === "recent") {
          apiUrl = `/wallet-service/api/games?sortBy=recent&userId=${userId}`;
        }

        // 2. Favourite Games
        else if (type === "favorites") {
          apiUrl = `/wallet-service/api/games?sortBy=favourite&userId=${userId}`;
        }

        // 3. All other categories
        else {
          const params = new URLSearchParams();

          if (type && type !== "all") params.append("type", type);
          if (filter) params.append("sortBy", filter);
          if (searchTerm) params.append("name", searchTerm);

          const query = params.toString() ? `?${params.toString()}` : "";
          apiUrl = `/wallet-service/api/games${query}`;
        }

        const { data } = await axios.get(apiUrl);

        let list = [];
        if (data?.success && Array.isArray(data.data)) list = data.data;
        else if (Array.isArray(data?.data)) list = data.data;
        else list = [];

        setGames(list);
      } catch (err) {
        console.error("Error fetching games:", err);
        setGames([]);
        setFavorite({});
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [type, filter, searchTerm, userId]);

  // ⭐ Fetch backend favourite list on mount or when userId changes
useEffect(() => {
  if (!userId) return;

  const fetchFavourites = async () => {
    try {
      const res = await axios.get(`/wallet-service/api/games/${userId}/favourite-game`);
      const favGames = res.data?.games || [];

      const map = {};
      favGames.forEach(g => map[g.uuid] = true);

      setFavorite(map);
    } catch (err) {
      console.error("Failed to fetch favourites:", err);
    }
  };

  fetchFavourites();
}, [userId]);

  // ─────────────────────────────────────────────
  // 4) Play now
  // ─────────────────────────────────────────────
  const handlePlayNow = (game) => {
    if (!game.slug) {
      console.error("❌ No slug found for game:", game);
      return;
    }
    navigate(`/game/${game.slug}`);
  };

  const handleLoadMore = () => setVisibleCount((prev) => prev + 48);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.02 },
    }),
  };

  // ─────────────────────────────────────────────
  // 5) TOGGLE FAVORITE (with API)
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
    await axios.post(
      `/wallet-service/api/games/${userId}/favourite`,
      { uuid: game.uuid }
    );

    // If user un-favorites inside favourites page → remove from UI
    if (type === "favorites" && !nextState) {
      setGames((prev) => prev.filter((g) => g.uuid !== game.uuid));
    }

  } catch (err) {
    console.error("Failed to toggle favourite:", err);

    // rollback UI
    setFavorite((prev) => ({
      ...prev,
      [game.uuid]: prevState,
    }));
  }
};

  // ─────────────────────────────────────────────
  // 6) Filter by device (mobile/desktop)
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
  // 7) RENDER
  // ─────────────────────────────────────────────
  return (
    <section className="w-full py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-['Neuropolitical'] text-xl mb-6 uppercase">
          {type === "all" ? "ALL" : type.toUpperCase()} GAMES
        </h2>

        {loading ? (
          <p className="text-gray-400 text-center py-8">Loading games...</p>
        ) : games.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No games found.</p>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4"
              initial="hidden"
              animate="visible"
            >
              {filteredGames.slice(0, visibleCount).map((game, i) => (
                <motion.div
                  key={game.uuid || i}
                  variants={cardVariants}
                  custom={i}
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
                              ? "fill-[#16192DB2] group-hover/fav:fill-white  stroke-white transition-all duration-300"
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
                  <div className="relative aspect-[18/12] overflow-hidden rounded-xl">
                    <motion.img
                      src={game.image}
                      alt={game.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
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

                  <div className="mt-2">
                    <div className="text-sm font-semibold text-white truncate">
                      {game.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {game.provider}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {visibleCount < games.length && (
              <div className="flex justify-center mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLoadMore}
                  className="px-6 py-2 rounded-full text-white font-semibold text-sm shadow-md"
                  style={{
                    background: "var(--cta-pink-gradient )",
                  }}
                >
                  LOAD MORE
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default GameGrid;
