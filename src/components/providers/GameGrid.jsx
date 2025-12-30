import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import StarGameBackground from "../leaderboard/starGameBackground";

const canShowGameOnDevice = (game, isMobileDevice) => {
  const nameHasMobile =
    typeof game.name === "string" && game.name.toLowerCase().includes("mobile");

  const isMobileFlag =
    game.is_mobile === 1 ||
    game.is_mobile === true ||
    game.is_mobile === "true";

  // RULE 1: Name contains "Mobile" → mobile only
  if (nameHasMobile) {
    return isMobileDevice;
  }

  // RULE 2: No "Mobile" in name + is_mobile = 0 → desktop only
  if (!nameHasMobile && !isMobileFlag) {
    return !isMobileDevice;
  }

  // RULE 3: No "Mobile" in name + is_mobile = 1 → all devices
  if (!nameHasMobile && isMobileFlag) {
    return true;
  }

  return false;
};

const GameGrid = ({
  type = "all",
  filter = "",
  searchTerm = "",
  provider = "",
}) => {
  const [games, setGames] = useState([]);
  const [visibleCount, setVisibleCount] = useState(21);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState({});
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const id = user.id || "690b0290cb255ca66b14a529"; // fallback
      setUserId(id);
    } catch (e) {
      console.error("Failed to parse user", e);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchFavourites = async () => {
      try {
        const res = await axios.get(
          `/wallet-service/api/games/${userId}/favourite-game`
        );

        const favGames = res.data?.games || [];
        const map = {};

        favGames.forEach((g) => {
          map[g.uuid] = true;
        });

        setFavorite(map);
      } catch (err) {
        console.error("Failed to fetch favourites:", err);
      }
    };

    fetchFavourites();
  }, [userId]);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobileDevice(window.innerWidth <= 768); // 768px = mobile/tablet
    };

    checkDevice(); // run initially
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = user.id || "690b0290cb255ca66b14a529";
        let apiUrl = "";

        if (provider) {
          apiUrl = `/wallet-service/api/games?provider=${provider}`;
        } else {
          const params = new URLSearchParams();
          if (type && type !== "all") params.append("type", type);
          if (filter) params.append("sortBy", filter);
          if (searchTerm) params.append("name", searchTerm);
          const query = params.toString() ? `?${params.toString()}` : "";
          apiUrl = `/wallet-service/api/games${query}`;
        }

        const { data } = await axios.get(apiUrl);
        if (data?.success) setGames(data.data || []);
        else if (Array.isArray(data?.data)) setGames(data.data);
        else setGames([]);
      } catch (err) {
        console.error("❌ Error fetching games:", err);
        setGames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [type, filter, searchTerm, provider]);

  const handlePlayNow = (game) => {
    if (!game.slug) {
      console.error("❌ No slug found for game:", game);
      return;
    }

    navigate(`/game/${game.slug}`);
  };

  const handleLoadMore = () => setVisibleCount((prev) => prev + 21);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    }),
  };

  const filteredGames = games.filter((game) =>
    canShowGameOnDevice(game, isMobileDevice)
  );

  const handleToggleFavorite = async (e, game) => {
    e.stopPropagation();
    if (!userId || !game?.uuid) return;

    const prevState = !!favorite[game.uuid];
    const nextState = !prevState;

    // Optimistic UI
    setFavorite((prev) => ({
      ...prev,
      [game.uuid]: nextState,
    }));

    try {
      await axios.post(`/wallet-service/api/games/${userId}/favourite`, {
        uuid: game.uuid,
      });

      // If on favourites page and unfavourited → remove card
      if (type === "favorites" && !nextState) {
        setGames((prev) => prev.filter((g) => g.uuid !== game.uuid));
      }
    } catch (err) {
      console.error("Failed to toggle favourite:", err);

      // Rollback UI
      setFavorite((prev) => ({
        ...prev,
        [game.uuid]: prevState,
      }));
    }
  };

  return (
    <section className="w-full py-6">
      <div className="relative max-w-7xl mx-auto px-2 min-h-[calc(80vh-100px)]">
        <h2 className="font-['Neuropolitical'] text-xl mb-6 uppercase">
          {`${provider}`.toUpperCase()}
        </h2>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-[140px] bg-white/10 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : filteredGames.length === 0 ? (
          <div
            className="relative flex flex-col items-center justify-center w-full px-4 mt-24 md:mt-40  top-16
        sm:top-32
        md:top-20"
          >
            <div className="relative flex flex-col items-center">
              {/* Astronaut */}
              <img
                src="/leaderboard-assets/leaderboard-astro.png"
                alt="No Games Astronaut"
                className="
        absolute
        -top-28
        sm:-top-32
        md:-top-52
        w-40
        sm:w-48
        md:w-56
        lg:w-60
        object-contain
        z-20
        pointer-events-none
      "
              />

              {/* Glass Card */}
              <div
                className="
        trust_btn
        relative
        z-10
        w-full
        max-w-sm
        sm:max-w-md
        rounded-2xl
        px-6
        sm:px-8
        pt-16
        pb-6
        text-center
      "
                style={{
                  background: "rgba(28,29,73,0.92)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <h3 className="text-white text-lg sm:text-xl font-semibold mb-2">
                  No Games Available
                </h3>

                <p className="text-sm text-[#B4B4DE] mb-5 leading-snug">
                  No games found for{" "}
                  <span className="text-white font-semibold">{provider}</span>.
                  Try exploring other providers.
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/providers")}
                  className="
          w-full
          sm:w-3/4
          mx-auto
          px-4
          py-2.5
          rounded-xl
          text-sm
          font-semibold
          text-white
        "
                  style={{
                    background:
                      "linear-gradient(180deg, #FFB8A1 0%, #A62A00 100%)",
                  }}
                >
                  Browse Providers
                </motion.button>

                <p className="text-xs text-[#9C9CCB] mt-4">
                  Check back later as new games are added.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-2"
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
                  {/* Favorite Icon */}
                  <button
                    onClick={(e) => handleToggleFavorite(e, game)}
                    className={`absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-[8px] transition-all duration-300 z-10 ${
                      favorite?.[game.uuid]
                        ? ""
                        : "hover:bg-[rgba(255,255,255,0.10)]"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      fill={
                        favorite?.[game.uuid] ? "rgba(209,51,51,1)" : "#7D7D7D"
                      }
                      className="transition-all duration-300"
                    >
                      <path d="M12.5107 0C13.9776 7.87092e-05 15.3563 0.572114 16.3936 1.60938C18.5348 3.75068 18.5349 7.23458 16.3936 9.37598L10.3721 15.3984C10.0067 15.7637 9.51929 15.9648 9 15.9648C8.48071 15.9648 7.99326 15.7636 7.62793 15.3984L1.60547 9.37598C-0.53553 7.23467 -0.535317 3.75066 1.60547 1.60938C2.64272 0.572084 4.02233 4.57993e-05 5.48926 0C6.78661 0 8.01573 0.44767 9 1.26855C9.98434 0.44767 11.2133 0 12.5107 0Z" />
                    </svg>
                  </button>

                  {/* Image Wrapper */}
                  <div className="relative aspect-[18/12] overflow-hidden rounded-xl">
                    <motion.img
                      src={game.image}
                      alt={game.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* NEW OVERLAY (no red glow) */}
                    <motion.div
                      className="
                        absolute inset-0 
                        flex items-center justify-center 
                        pointer-events-none 
                        group-hover:pointer-events-auto
                        bg-[var(--overlay-bg)]
                        backdrop-blur-[2px]
                        opacity-0 group-hover:opacity-100
                        transition-all
                      "
                    >
                      <motion.button
                        onClick={() => handlePlayNow(game)}
                        className="px-4 py-2 rounded-full text-white font-semibold text-sm"
                        whileTap={{ scale: 0.9 }}
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
                        </svg>
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Title */}
                  <div className="mt-2">
                    <div className="text-sm font-semibold text-white truncate">
                      {game.name}
                    </div>
                    <div className="text-xs text-gray-400">{game.provider}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {visibleCount < filteredGames.length && (
              <div className="flex justify-center mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLoadMore}
                  className="px-6 py-2 rounded-full text-white font-semibold text-sm shadow-md"
                  style={{
                    background: "var(--cta-pink-gradient)",
                  }}
                >
                  Load More
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
