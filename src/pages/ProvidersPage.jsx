// src/pages/ProvidersPage.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import GameGrid from "../components/providers/GameGrid";
import GameBetsSection from "../components/sections/GameBetsSection";

const providers = [
  { id: 1, name: "PragmaticPlay", logo: "/providers/vector1.svg" },
  { id: 2, name: "Evolution Gaming", logo: "/providers/evolution.svg" },
  { id: 3, name: "Platiplus2", logo: "/providers/platipus.svg" },
  { id: 5, name: "Hacksaw Gaming", logo: "/providers/hacksaw.svg" },
  { id: 6, name: "Thunderkick", logo: "/providers/thunderkick.svg" },
  { id: 7, name: "Play'n GO", logo: "/providers/playngo.svg" },
  { id: 8, name: "Spribe", logo: "/providers/spribe.svg" },
  { id: 9, name: "Endorphina", logo: "/providers/endorphina.svg" },
  { id: 10, name: "Playtech", logo: "/providers/playtech.svg" },
  { id: 11, name: "Nolimit City", logo: "/providers/nolimit.svg" },
  { id: 12, name: "NetEnt", logo: "/providers/netent.svg" },
  { id: 13, name: "Playson", logo: "/providers/Playson.svg" },
  { id: 14, name: "Red Tiger", logo: "/providers/red-tiger.svg" },
  { id: 15, name: "Relax Gaming", logo: "/providers/relax-gaming.svg" },
  { id: 16, name: "SmartBet", logo: "/providers/smartbet.svg" },
  { id: 17, name: "Zillion", logo: "/providers/Zillion.svg" },
  { id: 18, name: "Avatar UX", logo: "/providers/avatar ux.svg" },
];

const nameToSlug = (name) => name.replace(/\s+/g, "-").toLowerCase();
const slugToName = (slug) =>
  slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

const ProvidersPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const selectedProvider = slug ? slugToName(slug) : null;

  const handleProviderClick = (name) => {
    navigate(`/providers/${nameToSlug(name)}`);
  };

  return (
    <>
      <section className="w-full py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* ================= TOP BAR ================= */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
            {/* LEFT PILLS */}
            <div className="trust_btn2 flex gap-1 p-1 rounded-full overflow-x-auto scrollbar-hide w-fit">
              <button
                onClick={() => navigate("/casino")}
                className="px-4 py-2 rounded-full text-xs sm:text-sm text-gray-300 hover:text-white whitespace-nowrap"
              >
                Casino
              </button>

              <button
                onClick={() => navigate("/providers")}
                className={`relative px-4 py-2 rounded-full text-xs sm:text-sm whitespace-nowrap ${
                  !selectedProvider ? "text-white" : "text-gray-300"
                }`}
              >
                {!selectedProvider && (
                  <motion.div
                    layoutId="providerTab"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "linear-gradient(0deg,#A62A00,#FFB8A1)",
                    }}
                  />
                )}
                <span className="relative z-10">Game Providers</span>
              </button>

              {selectedProvider && (
                <button className="relative px-4 py-2 rounded-full text-xs sm:text-sm text-white whitespace-nowrap">
                  <motion.div
                    layoutId="providerTab"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "linear-gradient(0deg,#A62A00,#FFB8A1)",
                    }}
                  />
                  <span className="relative z-10">{selectedProvider}</span>
                </button>
              )}
            </div>

            {/* RIGHT CONTROLS */}
            <div className="flex items-center gap-2 w-full md:w-auto md:ml-auto">
              {/* STUDIOS + FILTERS — ONLY WHEN PROVIDER SELECTED */}
              {selectedProvider && (
                <div className="flex items-center gap-2">
                  {/* Studios pill */}
                  <button
                    className="crypto_btn
                      flex items-center gap-2
                      px-4 py-2
                      rounded-full
                      bg-[#0D0E36]
                      
                      text-sm text-[#7171B4]
                    "
                  >
                    <span>Studios</span>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M6 8L10 12L14 8"
                        stroke="#7171B4"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* Filters icon pill */}
                  <button
                    className="crypto_btn
                      w-[44px] h-[44px]
                      flex items-center justify-center
                      rounded-full
                      bg-[#0D0E36]
                    
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M13 3.25C13 2.80499 13.132 2.36998 13.3792 1.99997C13.6264 1.62996 13.9778 1.34157 14.389 1.17127C14.8001 1.00097 15.2525 0.956417 15.689 1.04323C16.1254 1.13005 16.5263 1.34434 16.841 1.65901C17.1557 1.97368 17.37 2.37459 17.4568 2.81105C17.5436 3.24751 17.499 3.6999 17.3287 4.11104C17.1584 4.52217 16.87 4.87357 16.5 5.12081C16.13 5.36804 15.695 5.5 15.25 5.5C14.6533 5.5 14.081 5.26295 13.659 4.84099C13.2371 4.41903 13 3.84674 13 3.25ZM1.75 4H10.75C10.9489 4 11.1397 3.92098 11.2803 3.78033C11.421 3.63968 11.5 3.44891 11.5 3.25C11.5 3.05109 11.421 2.86032 11.2803 2.71967C11.1397 2.57902 10.9489 2.5 10.75 2.5H1.75C1.55109 2.5 1.36032 2.57902 1.21967 2.71967C1.07902 2.86032 1 3.05109 1 3.25C1 3.44891 1.07902 3.63968 1.21967 3.78033C1.36032 3.92098 1.55109 4 1.75 4ZM6.25 6.25C5.78579 6.25131 5.33335 6.39616 4.9547 6.6647C4.57605 6.93325 4.28973 7.31234 4.135 7.75H1.75C1.55109 7.75 1.36032 7.82902 1.21967 7.96967C1.07902 8.11032 1 8.30109 1 8.5C1 8.69891 1.07902 8.88968 1.21967 9.03033C1.36032 9.17098 1.55109 9.25 1.75 9.25H4.135C4.27259 9.63916 4.51458 9.98297 4.83448 10.2438C5.15439 10.5046 5.53988 10.6725 5.94877 10.7289C6.35766 10.7853 6.77419 10.7281 7.15278 10.5637C7.53137 10.3992 7.85742 10.1338 8.09526 9.79645C8.33309 9.45909 8.47355 9.06281 8.50125 8.65098C8.52894 8.23914 8.44282 7.82762 8.2523 7.46146C8.06178 7.09529 7.7742 6.78859 7.42105 6.57492C7.06789 6.36125 6.66276 6.24884 6.25 6.25ZM16.75 7.75H10.75C10.5511 7.75 10.3603 7.82902 10.2197 7.96967C10.079 8.11032 10 8.30109 10 8.5C10 8.69891 10.079 8.88968 10.2197 9.03033C10.3603 9.17098 10.5511 9.25 10.75 9.25H16.75C16.9489 9.25 17.1397 9.17098 17.2803 9.03033C17.421 8.88968 17.5 8.69891 17.5 8.5C17.5 8.30109 17.421 8.11032 17.2803 7.96967C17.1397 7.82902 16.9489 7.75 16.75 7.75ZM7.75 13H1.75C1.55109 13 1.36032 13.079 1.21967 13.2197C1.07902 13.3603 1 13.5511 1 13.75C1 13.9489 1.07902 14.1397 1.21967 14.2803C1.36032 14.421 1.55109 14.5 1.75 14.5H7.75C7.94891 14.5 8.13968 14.421 8.28033 14.2803C8.42098 14.1397 8.5 13.9489 8.5 13.75C8.5 13.5511 8.42098 13.3603 8.28033 13.2197C8.13968 13.079 7.94891 13 7.75 13ZM16.75 13H14.365C14.1881 12.4996 13.8399 12.0778 13.3821 11.8093C12.9243 11.5407 12.3863 11.4427 11.8632 11.5324C11.3401 11.6222 10.8655 11.894 10.5234 12.2998C10.1813 12.7056 9.99368 13.2192 9.99368 13.75C9.99368 14.2808 10.1813 14.7944 10.5234 15.2002C10.8655 15.606 11.3401 15.8778 11.8632 15.9676C12.3863 16.0574 12.9243 15.9593 13.3821 15.6907C13.8399 15.4222 14.1881 15.0004 14.365 14.5H16.75C16.9489 14.5 17.1397 14.421 17.2803 14.2803C17.421 14.1397 17.5 13.9489 17.5 13.75C17.5 13.5511 17.421 13.3603 17.2803 13.2197C17.1397 13.079 16.9489 13 16.75 13Z"
                        fill="#7171B4"
                      />
                    </svg>
                  </button>
                </div>
              )}

              {/* SEARCH — ALWAYS VISIBLE */}
              {/* Search Bar */}
              <div className="crypto_btn relative w-full sm:w-64 lg:w-72">
                <input
                  type="text"
                  placeholder="Search for a casino game"
                  // value={searchTerm}
                  // onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2.5 pl-10 text-sm text-[#7171B4] placeholder-[#7171B4] focus:border-[#F07730]/50 focus:bg-white/10 focus:outline-none transition-all
        rounded-[60px] bg-[#0D0E36]"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.91938 2.89852C8.45073 0.367145 12.5701 0.367174 15.1015 2.89852C17.6328 5.42991 17.6329 9.54917 15.1015 12.0806C12.9541 14.2277 9.76039 14.5528 7.26647 13.0571C7.26647 13.0571 7.0863 12.9497 6.93426 13.1014C6.10789 13.9277 3.62776 16.4073 3.62776 16.4073C2.96853 17.0662 2.04706 17.2224 1.46251 16.6377L1.36219 16.5375C0.777639 15.9528 0.933814 15.0314 1.59279 14.3722C1.59279 14.3722 4.07764 11.8879 4.9058 11.0598C5.04794 10.9177 4.94781 10.7415 4.94358 10.7342C3.44747 8.24024 3.7721 5.04606 5.91938 2.89852ZM13.9029 4.09771C12.0325 2.22729 8.98972 2.2274 7.11926 4.09771C5.24892 5.96802 5.24787 9.0109 7.11795 10.8814C8.98846 12.7517 12.0325 12.7517 13.9029 10.8814C15.7732 9.01101 15.7731 5.96809 13.9029 4.09771Z"
                    fill="#555594"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* ================= PROVIDERS GRID ================= */}
          {!selectedProvider && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-4 mb-10">
              {providers.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => handleProviderClick(p.name)}
                  className="trust_btn cursor-pointer rounded-xl flex items-center justify-center p-3 bg-[#282753] hover:bg-white/5"
                >
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="max-w-[110px] max-h-[50px] object-contain
                               filter brightness-0 invert opacity-80 hover:opacity-100"
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* ================= GAMES GRID ================= */}
          {selectedProvider && <GameGrid provider={selectedProvider} />}
        </div>
      </section>

      <GameBetsSection />
    </>
  );
};

export default ProvidersPage;
