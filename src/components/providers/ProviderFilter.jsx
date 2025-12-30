import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

/* ================= GLASS STYLES ================= */
const glassBase = "trust-btn3 border-2 border-white/40 backdrop-blur-[67.5px]";
const glassInactive = "bg-[rgba(40,39,83,0.40)]";
const glassActive = "bg-[rgba(200,200,225,0.20)]";

/* ================= TAG CHIP ================= */
const TagChip = ({ iconSrc, text }) => (
  <div
    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-white ${glassBase} ${glassInactive}`}
  >
    {iconSrc && <img src={iconSrc} className="w-3.5 h-3.5" />}
    {text}
    <span className="ml-1 opacity-70">×</span>
  </div>
);

/* ================= QUICK PICK ================= */
const QuickPick = ({ iconSrc, label, active }) => (
  <button
    className={`h-[56px] rounded-xl flex flex-col items-center justify-center gap-1 text-[11px] ${glassBase} ${
      active ? glassActive : glassInactive
    }`}
  >
    <img src={iconSrc} className="w-4 h-4" />
    <span className="text-[#E6E7FF]">{label}</span>
  </button>
);

/* ================= GAME TYPE ================= */
const GameTypeChip = ({ label, checked }) => (
  <button
    className={`min-w-[120px] px-4 py-2 rounded-xl flex items-center gap-2 text-sm ${glassBase} ${
      checked ? glassActive : glassInactive
    }`}
  >
    <span
      className={`w-4 h-4 rounded border flex items-center justify-center ${
        checked ? "bg-white" : "border-white/40"
      }`}
    >
      {checked && (
        <svg width="10" height="8" viewBox="0 0 10 8">
          <path d="M1 4L4 7L9 1" stroke="#2B2E55" strokeWidth="1.5" />
        </svg>
      )}
    </span>
    <span className={checked ? "text-white" : "text-[#C9CBFF]"}>{label}</span>
  </button>
);

/* ================= THEME CHIP ================= */
const ThemeChip = ({ label, active }) => (
  <button
    className={`px-4 py-2 rounded-full text-sm ${glassBase} ${
      active ? glassActive : glassInactive
    } ${active ? "text-white" : "text-[#C9CBFF]"}`}
  >
    {label}
  </button>
);

/* ================= PROVIDER ================= */
const ProviderBtn = ({ text, active }) => (
  <button
    className={`px-4 py-2 rounded-xl flex items-center gap-2 text-xs ${glassBase} ${
      active ? glassActive : glassInactive
    } ${active ? "text-white" : "text-[#C9CBFF]"}`}
  >
    <span
      className={`w-3.5 h-3.5 rounded border ${
        active ? "bg-white" : "border-white/40"
      }`}
    />
    {text}
  </button>
);

/* ================= PANEL ================= */
const ProviderFilter = ({ open, onClose }) => {
  const [volatility, setVolatility] = React.useState(50);
  const sliderRef = React.useRef(null);
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
          />

          {/* PANEL */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25 }}
            className="fixed top-0 right-0 z-[200] h-full w-full sm:w-[420px] flex flex-col border-l border-white/10"
            style={{
              background: "rgba(200,200,225,0.20)",
              backdropFilter: "blur(67.5px)",
            }}
          >
            {/* HEADER */}
            <div className="h-[64px] px-5 flex items-center justify-between border-b border-white/20">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="15"
                  viewBox="0 0 17 15"
                  fill="none"
                >
                  <path
                    d="M12 2.25C12 1.80499 12.132 1.36998 12.3792 0.999968C12.6264 0.629957 12.9778 0.341569 13.389 0.171272C13.8001 0.000974894 14.2525 -0.0435826 14.689 0.0432341C15.1254 0.130051 15.5263 0.344343 15.841 0.659011C16.1557 0.973679 16.37 1.37459 16.4568 1.81105C16.5436 2.24751 16.499 2.6999 16.3287 3.11104C16.1584 3.52217 15.87 3.87357 15.5 4.12081C15.13 4.36804 14.695 4.5 14.25 4.5C13.6533 4.5 13.081 4.26295 12.659 3.84099C12.2371 3.41903 12 2.84674 12 2.25ZM0.75 3H9.75C9.94891 3 10.1397 2.92098 10.2803 2.78033C10.421 2.63968 10.5 2.44891 10.5 2.25C10.5 2.05109 10.421 1.86032 10.2803 1.71967C10.1397 1.57902 9.94891 1.5 9.75 1.5H0.75C0.551088 1.5 0.360322 1.57902 0.21967 1.71967C0.0790176 1.86032 0 2.05109 0 2.25C0 2.44891 0.0790176 2.63968 0.21967 2.78033C0.360322 2.92098 0.551088 3 0.75 3ZM5.25 5.25C4.78579 5.25131 4.33335 5.39616 3.9547 5.6647C3.57605 5.93325 3.28973 6.31234 3.135 6.75H0.75C0.551088 6.75 0.360322 6.82902 0.21967 6.96967C0.0790176 7.11032 0 7.30109 0 7.5C0 7.69891 0.0790176 7.88968 0.21967 8.03033C0.360322 8.17098 0.551088 8.25 0.75 8.25H3.135C3.27259 8.63916 3.51458 8.98297 3.83448 9.24381C4.15439 9.50464 4.53988 9.67245 4.94877 9.72887C5.35766 9.78529 5.77419 9.72815 6.15278 9.56369C6.53137 9.39923 6.85742 9.1338 7.09526 8.79645C7.33309 8.45909 7.47355 8.06281 7.50125 7.65098C7.52894 7.23914 7.44282 6.82762 7.2523 6.46146C7.06178 6.09529 6.7742 5.78859 6.42105 5.57492C6.06789 5.36125 5.66276 5.24884 5.25 5.25ZM15.75 6.75H9.75C9.55109 6.75 9.36032 6.82902 9.21967 6.96967C9.07902 7.11032 9 7.30109 9 7.5C9 7.69891 9.07902 7.88968 9.21967 8.03033C9.36032 8.17098 9.55109 8.25 9.75 8.25H15.75C15.9489 8.25 16.1397 8.17098 16.2803 8.03033C16.421 7.88968 16.5 7.69891 16.5 7.5C16.5 7.30109 16.421 7.11032 16.2803 6.96967C16.1397 6.82902 15.9489 6.75 15.75 6.75ZM6.75 12H0.75C0.551088 12 0.360322 12.079 0.21967 12.2197C0.0790176 12.3603 0 12.5511 0 12.75C0 12.9489 0.0790176 13.1397 0.21967 13.2803C0.360322 13.421 0.551088 13.5 0.75 13.5H6.75C6.94891 13.5 7.13968 13.421 7.28033 13.2803C7.42098 13.1397 7.5 12.9489 7.5 12.75C7.5 12.5511 7.42098 12.3603 7.28033 12.2197C7.13968 12.079 6.94891 12 6.75 12ZM15.75 12H13.365C13.1881 11.4996 12.8399 11.0778 12.3821 10.8093C11.9243 10.5407 11.3863 10.4427 10.8632 10.5324C10.3401 10.6222 9.86553 10.894 9.52342 11.2998C9.18131 11.7056 8.99368 12.2192 8.99368 12.75C8.99368 13.2808 9.18131 13.7944 9.52342 14.2002C9.86553 14.606 10.3401 14.8778 10.8632 14.9676C11.3863 15.0574 11.9243 14.9593 12.3821 14.6907C12.8399 14.4222 13.1881 14.0004 13.365 13.5H15.75C15.9489 13.5 16.1397 13.421 16.2803 13.2803C16.421 13.1397 16.5 12.9489 16.5 12.75C16.5 12.5511 16.421 12.3603 16.2803 12.2197C16.1397 12.079 15.9489 12 15.75 12Z"
                    fill="url(#paint0_linear_10795_2998)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_10795_2998"
                      x1="-1.29081e-08"
                      y1="2.25"
                      x2="18.5616"
                      y2="19.7509"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#FFB8A1" />
                      <stop offset="1" stop-color="#A62A00" />
                    </linearGradient>
                  </defs>
                </svg>
                FILTERS
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-lg border border-white/30 bg-white/15 text-white"
              >
                ✕
              </button>
            </div>

            {/* TAGS */}
            <div className="px-5 py-4 flex flex-wrap gap-2">
              <TagChip iconSrc="/icons/new.png" text="New" />
              <TagChip iconSrc="/icons/hot.png" text="Hot" />
              <TagChip iconSrc="/icons/live.png" text="Live Dealer" />
              <TagChip text="Animals" />
            </div>

            {/* BODY */}
            <div className="flex-1 overflow-y-auto px-5 space-y-6 pb-6">
              {/* QUICK PICKS */}
              <div>
                <p className="text-xs text-[#A6A8FF] mb-3">Quick Picks</p>
                <div className="grid grid-cols-4 gap-3">
                  <QuickPick
                    iconSrc="/icons/high-roller.png"
                    label="High Roller"
                  />
                  <QuickPick
                    iconSrc="/icons/feature-buy.png"
                    label="Feature Buy"
                  />
                  <QuickPick
                    iconSrc="/icons/trending.png"
                    label="Trending"
                    active
                  />
                  <QuickPick iconSrc="/icons/new.png" label="New" />
                  <QuickPick iconSrc="/icons/hot.png" label="Hot" />
                  <QuickPick iconSrc="/icons/cold.png" label="Cold" />
                  <QuickPick iconSrc="/icons/autoplay.png" label="Auto Play" />
                  <QuickPick iconSrc="/icons/rtp.png" label="High RTP" />
                </div>
              </div>

              {/* VOLATILITY */}
              {/* VOLATILITY */}
              <div>
                <p className="text-white font-semibold text-sm mb-3">
                  Volatility
                </p>

                <div
                  ref={sliderRef}
                  className={`relative h-10 flex items-center rounded-xl px-3`}
                >
                  {/* TRACK */}
                  <div className="absolute left-3 right-3 h-[4px] rounded-full bg-white/20" />

                  {/* ACTIVE TRACK */}
                  <div
                    className="absolute left-3 h-[4px] rounded-full bg-[#4EA6FF]"
                    style={{ width: `calc(${volatility}% - 6px)` }}
                  />

                  {/* THUMB */}
                  <div
                    className="absolute mt-6 top-1/2 -translate-y-1/2 cursor-pointer"
                    style={{ left: `calc(${volatility}% - 70px)` }}
                    onMouseDown={(e) => {
                      e.preventDefault();

                      const move = (ev) => {
                        const rect = sliderRef.current.getBoundingClientRect();
                        const x = ev.clientX - rect.left;
                        const percent = Math.min(
                          100,
                          Math.max(0, (x / rect.width) * 100)
                        );
                        setVolatility(percent);
                      };

                      const stop = () => {
                        window.removeEventListener("mousemove", move);
                        window.removeEventListener("mouseup", stop);
                      };

                      window.addEventListener("mousemove", move);
                      window.addEventListener("mouseup", stop);
                    }}
                  >
                    <img
                      src="/icons/volatility-thumb.svg"
                      className="w-18 h-18 select-none pointer-events-none"
                      draggable={false}
                    />
                  </div>
                </div>

                <div className="flex justify-between text-[11px] text-[#C9CBFF] mt-2 px-1">
                  <span>Chill</span>
                  <span>Balanced</span>
                  <span>Wild</span>
                </div>
              </div>

              {/* GAME TYPE */}
              <div>
                <p className="text-sm text-white mb-3">Game Type</p>
                <div className="flex flex-wrap gap-3">
                  <GameTypeChip label="Slots" checked />
                  <GameTypeChip label="Live Casino" />
                  <GameTypeChip label="Live Casino" />
                  <GameTypeChip label="Black Jack" />
                  <GameTypeChip label="Arcade" />
                  <GameTypeChip label="Arcade" />
                </div>
                <p className="text-sm text-[#8E90C9] mt-3">+ Show All</p>
              </div>

              {/* THEMES */}
              <div>
                <p className="text-sm text-white mb-3">Themes</p>
                <div className="flex flex-wrap gap-3">
                  <ThemeChip label="Classic" />
                  <ThemeChip label="Animals" active />
                  <ThemeChip label="Crypto" />
                  <ThemeChip label="Vegas" />
                  <ThemeChip label="Greek" />
                  <ThemeChip label="Speed Games" />
                  <ThemeChip label="Roman" />
                  <ThemeChip label="Gods" active />
                  <ThemeChip label="First Person" />
                </div>
                <p className="text-sm text-[#8E90C9] mt-3">+ Show All</p>
              </div>

              {/* PROVIDERS */}
              <div>
                <p className="text-sm text-white mb-3">Providers</p>
                <div className="grid grid-cols-2 gap-3">
                  <ProviderBtn text="Hacksaw" active />
                  <ProviderBtn text="Pragmatic Play" />
                  <ProviderBtn text="BGaming" />
                  <ProviderBtn text="Evolution" />
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="px-5 py-4 border-t border-white/10 flex gap-3">
              <button className="flex-1 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-b from-[#FFB27A] to-[#D64A1F]">
                Show 128 Games
              </button>
              <button className="flex-1 py-3 rounded-xl bg-[#6C6F90] text-white text-sm">
                Clear All
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProviderFilter;
