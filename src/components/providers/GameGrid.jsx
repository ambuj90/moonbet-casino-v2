import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const GameGrid = ({
  type = "all",
  filter = "",
  searchTerm = "",
  provider = "",
}) => {
  const [games, setGames] = useState([]);
  const [visibleCount, setVisibleCount] = useState(48);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = user.id || "690b0290cb255ca66b14a529";
        let apiUrl = "";

        // 🔥 If provider filter is active
        if (provider) {
          apiUrl = `/wallet-service/api/games?provider=${provider}`;
        }

        // 🔥 Other categories
        else {
          const params = new URLSearchParams();

          if (type && type !== "all") params.append("type", type);
          if (filter) params.append("sortBy", filter);
          if (searchTerm) params.append("name", searchTerm);

          const query = params.toString() ? `?${params.toString()}` : "";
          apiUrl = `/wallet-service/api/games${query}`;
        }

        console.log("🔗 FINAL GameGrid API:", apiUrl);

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

  const handlePlayNow = (gameName) => {
    // Replace spaces with dashes for clean URLs
    const gameSlug = encodeURIComponent(gameName);
    navigate(`/game/${gameSlug}`);
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

  return (
    <section className="w-full bg-[#080808] py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-[#CED5E3] font-['Neuropolitical'] text-xl mb-6 uppercase">
          {`${provider}`.toUpperCase()} GAMES
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
              {games.slice(0, visibleCount).map((game, i) => (
                <motion.div
                  key={game.uuid || i}
                  variants={cardVariants}
                  custom={i}
                  className="relative rounded-xl overflow-hidden border border-white/10  cursor-pointer group transition-all"
                  style={{
                    boxShadow: "0 10px 30px rgba(240, 119, 48, 0.2)",
                    borderRadius: "12px",
                    background: "rgba(8, 8, 8, 0.30)",
                    backdropFilter: "blur(2px)",
                  }}
                >
                  {/* Favorite Icon (Top Right) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevents PLAY NOW trigger
                      setFavorite((prev) => ({
                        ...prev,
                        [game.uuid]: !prev[game.uuid],
                      }));
                    }}
                    className={`absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-[8px]   transition-all duration-300 z-50 ${
                      favorite?.[game.uuid]
                        ? ""
                        : " hover:bg-[rgba(240,119,48,0.10)]"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      fill={
                        favorite?.[game.uuid]
                          ? "rgba(209, 51, 51, 1)"
                          : "#7D7D7D"
                      }
                      className="transition-all duration-300"
                    >
                      <path d="M12.5107 0C13.9776 7.87092e-05 15.3563 0.572114 16.3936 1.60938C18.5348 3.75068 18.5349 7.23458 16.3936 9.37598L10.3721 15.3984C10.0067 15.7637 9.51929 15.9648 9 15.9648C8.48071 15.9648 7.99326 15.7636 7.62793 15.3984L1.60547 9.37598C-0.53553 7.23467 -0.535317 3.75066 1.60547 1.60938C2.64272 0.572084 4.02233 4.57993e-05 5.48926 0C6.78661 0 8.01573 0.44767 9 1.26855C9.98434 0.44767 11.2133 0 12.5107 0Z" />
                    </svg>
                  </button>
                  <div className="relative aspect-[18/12] overflow-hidden rounded-xl">
                    <motion.img
                      src={game.image}
                      alt={game.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-[#080808]/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                      <motion.button
                        onClick={() => handlePlayNow(game.name)}
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
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-sm font-semibold text-white truncate">
                      {game.name}
                    </div>
                    <div className="text-xs text-gray-400">{game.provider}</div>
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
                  className="px-6 py-2 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full text-white font-semibold text-sm shadow-md"
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
