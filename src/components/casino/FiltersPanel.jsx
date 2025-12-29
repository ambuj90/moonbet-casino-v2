import { AnimatePresence, motion } from "framer-motion";
import React from "react";

/* ---------- TAG CHIP WITH ICON ---------- */
const TagChip = ({ iconSrc, text }) => (
  <div
    className="
      flex items-center gap-2
      px-3 py-1.5 rounded-full
      bg-[#3A3D6C]
      text-xs text-white
      trust_btn
      border border-white/10
      whitespace-nowrap
    "
  >
    <img
      src={iconSrc}
      alt={text}
      className="w-3.5 h-3.5 object-contain"
    />

    {text}
    <span className="opacity-70 ml-1 cursor-pointer">×</span>
  </div>
);

/* ---------- QUICK PICK ---------- */
const QuickPick = ({ iconSrc, label }) => (
  <button
    className="
      flex flex-col items-center justify-center gap-1
      h-[58px]
      rounded-xl
      bg-[#2B2E55]
      trust_btn
      border border-white/10
      text-[11px] text-[#E6E7FF]
    "
  >
    <img
      src={iconSrc}
      alt={label}
      className="w-5 h-5 object-contain"
    />
    {label}
  </button>
);

/* ---------- CHECK / RADIO BUTTON ---------- */
const GameTypeChip = ({ label, checked = false }) => (
  <button
    className={`
      flex items-center gap-2
      px-4 py-2
      rounded-xl
      min-w-[130px]
      text-sm
      trust_btn
      border
      ${
        checked
          ? "bg-[#3C3F6B] border-white/40 text-white"
          : "bg-[#2B2E55] border-white/10 text-[#C9CBFF]"
      }
    `}
  >
    {/* CHECKBOX */}
    <span
      className={`
        w-4 h-4 rounded
        flex items-center justify-center
        border
        ${
          checked
            ? "bg-white border-white"
            : "border-white/30"
        }
      `}
    >
      {checked && (
        <svg
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
        >
          <path
            d="M1 4L4 7L9 1"
            stroke="#2B2E55"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>

    {label}
  </button>
);

const ThemeChip = ({ label, active = false }) => (
  <button
    className={`
      px-4 py-2
      rounded-full
      text-sm
      trust_btn
      border
      ${
        active
          ? "bg-[#4B4F7E] border-white/40 text-white"
          : "bg-[#2B2E55] border-white/10 text-[#C9CBFF]"
      }
    `}
  >
    {label}
  </button>
);



/* ---------- PROVIDER ---------- */
const ProviderBtn = ({ text }) => (
  <button
    className="
      flex items-center gap-2
      px-3 py-2 rounded-xl
      bg-[#2B2E55]
      border border-white/10
      trust_btn
      text-xs text-white
    "
  >
    <span className="w-3 h-3 rounded bg-[#5F63FF]" />
    {text}
  </button>
);

/* ================= PANEL ================= */
const FiltersPanel = ({ open, onClose }) => {
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
            className="
              fixed top-0 right-0 z-[200]
              h-full w-full sm:w-[420px]
              bg-gradient-to-b from-[#2A2D55] to-[#1E2146]
              border-l border-white/10
              flex flex-col
              
            "

          >
            {/* ================= HEADER (FIXED & VISIBLE) ================= */}
            <div
              className="mt-16 backdrop-filter: blur(24px);
                relative z-[300]
                flex items-center justify-between
                px-5
                h-[64px]
                bg-[#2B2F5F]
                border-b border-white/15
              
              "
              style={{
                paddingTop: "env(safe-area-inset-top)",
                background: "rgba(200, 200, 225, 0.20)",
              }}
            >
              {/* LEFT */}
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <span className="text-lg"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none">
                  <path d="M12 2.25C12 1.80499 12.132 1.36998 12.3792 0.999968C12.6264 0.629957 12.9778 0.341569 13.389 0.171272C13.8001 0.000974894 14.2525 -0.0435826 14.689 0.0432341C15.1254 0.130051 15.5263 0.344343 15.841 0.659011C16.1557 0.973679 16.37 1.37459 16.4568 1.81105C16.5436 2.24751 16.499 2.6999 16.3287 3.11104C16.1584 3.52217 15.87 3.87357 15.5 4.12081C15.13 4.36804 14.695 4.5 14.25 4.5C13.6533 4.5 13.081 4.26295 12.659 3.84099C12.2371 3.41903 12 2.84674 12 2.25ZM0.75 3H9.75C9.94891 3 10.1397 2.92098 10.2803 2.78033C10.421 2.63968 10.5 2.44891 10.5 2.25C10.5 2.05109 10.421 1.86032 10.2803 1.71967C10.1397 1.57902 9.94891 1.5 9.75 1.5H0.75C0.551088 1.5 0.360322 1.57902 0.21967 1.71967C0.0790176 1.86032 0 2.05109 0 2.25C0 2.44891 0.0790176 2.63968 0.21967 2.78033C0.360322 2.92098 0.551088 3 0.75 3ZM5.25 5.25C4.78579 5.25131 4.33335 5.39616 3.9547 5.6647C3.57605 5.93325 3.28973 6.31234 3.135 6.75H0.75C0.551088 6.75 0.360322 6.82902 0.21967 6.96967C0.0790176 7.11032 0 7.30109 0 7.5C0 7.69891 0.0790176 7.88968 0.21967 8.03033C0.360322 8.17098 0.551088 8.25 0.75 8.25H3.135C3.27259 8.63916 3.51458 8.98297 3.83448 9.24381C4.15439 9.50464 4.53988 9.67245 4.94877 9.72887C5.35766 9.78529 5.77419 9.72815 6.15278 9.56369C6.53137 9.39923 6.85742 9.1338 7.09526 8.79645C7.33309 8.45909 7.47355 8.06281 7.50125 7.65098C7.52894 7.23914 7.44282 6.82762 7.2523 6.46146C7.06178 6.09529 6.7742 5.78859 6.42105 5.57492C6.06789 5.36125 5.66276 5.24884 5.25 5.25ZM15.75 6.75H9.75C9.55109 6.75 9.36032 6.82902 9.21967 6.96967C9.07902 7.11032 9 7.30109 9 7.5C9 7.69891 9.07902 7.88968 9.21967 8.03033C9.36032 8.17098 9.55109 8.25 9.75 8.25H15.75C15.9489 8.25 16.1397 8.17098 16.2803 8.03033C16.421 7.88968 16.5 7.69891 16.5 7.5C16.5 7.30109 16.421 7.11032 16.2803 6.96967C16.1397 6.82902 15.9489 6.75 15.75 6.75ZM6.75 12H0.75C0.551088 12 0.360322 12.079 0.21967 12.2197C0.0790176 12.3603 0 12.5511 0 12.75C0 12.9489 0.0790176 13.1397 0.21967 13.2803C0.360322 13.421 0.551088 13.5 0.75 13.5H6.75C6.94891 13.5 7.13968 13.421 7.28033 13.2803C7.42098 13.1397 7.5 12.9489 7.5 12.75C7.5 12.5511 7.42098 12.3603 7.28033 12.2197C7.13968 12.079 6.94891 12 6.75 12ZM15.75 12H13.365C13.1881 11.4996 12.8399 11.0778 12.3821 10.8093C11.9243 10.5407 11.3863 10.4427 10.8632 10.5324C10.3401 10.6222 9.86553 10.894 9.52342 11.2998C9.18131 11.7056 8.99368 12.2192 8.99368 12.75C8.99368 13.2808 9.18131 13.7944 9.52342 14.2002C9.86553 14.606 10.3401 14.8778 10.8632 14.9676C11.3863 15.0574 11.9243 14.9593 12.3821 14.6907C12.8399 14.4222 13.1881 14.0004 13.365 13.5H15.75C15.9489 13.5 16.1397 13.421 16.2803 13.2803C16.421 13.1397 16.5 12.9489 16.5 12.75C16.5 12.5511 16.421 12.3603 16.2803 12.2197C16.1397 12.079 15.9489 12 15.75 12Z" fill="url(#paint0_linear_10832_3250)" />
                  <defs>
                    <linearGradient id="paint0_linear_10832_3250" x1="-1.29081e-08" y1="2.25" x2="18.5616" y2="19.7509" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#FFB8A1" />
                      <stop offset="1" stop-color="#A62A00" />
                    </linearGradient>
                  </defs>
                </svg></span>
                FILTERS
              </div>

              {/* RIGHT */}
              <button
                onClick={onClose}
                className="
                  w-9 h-9
                  flex items-center justify-center
                  rounded-lg
                  trust_btn
                  bg-white/15
                  border border-white/30
                  text-white text-lg
                "
              >
                ✕
              </button>
            </div>

            {/* ================= SELECTED TAGS ================= */}
            <div className="px-5 py-4 flex flex-wrap gap-2">
              <TagChip iconSrc="/icons/new.png" text="New" />
              <TagChip iconSrc="/icons/hot.png" text="Hot" />
              <TagChip iconSrc="/icons/live.png" text="Live Dealer" />
              <TagChip iconSrc="/icons/live.png" text="Animals" />
            </div>

            {/* ================= BODY ================= */}
            <div className="flex-1 overflow-y-auto px-5 space-y-7 pb-6">

              {/* QUICK PICKS */}
              <div>
                <p className="text-xs text-[#A6A8FF] mb-3">Quick Picks</p>
                <div className="grid grid-cols-4 gap-3">
                  <QuickPick iconSrc="/icons/high-roller.png" label="High Roller" />
                  <QuickPick iconSrc="/icons/feature-buy.png" label="Feature Buy" />
                  <QuickPick iconSrc="/icons/trending.png" label="Trending" />
                  <QuickPick iconSrc="/icons/new.png" label="New" />
                  <QuickPick iconSrc="/icons/hot.png" label="Hot" />
                  <QuickPick iconSrc="/icons/cold.png" label="Cold" />
                  <QuickPick iconSrc="/icons/autoplay.png" label="Auto Play" />
                  <QuickPick iconSrc="/icons/rtp.png" label="High RTP" />
                </div>
              </div>

              {/* VOLATILITY */}
              <div>
                <p className="text-xs text-[#A6A8FF] mb-3">Volatility</p>
                <div className="relative h-2 rounded-full bg-[#3A3D6C]">
                  <div
                    className="
                      absolute left-1/2 -translate-x-1/2 -top-[10px]
                      w-7 h-7 rounded-full
                      bg-white text-black text-[11px]
                      flex items-center justify-center
                    "
                  >
                    ∞
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-[11px] text-[#C9CBFF]">
                  <span>Chill</span>
                  <span>Balanced</span>
                  <span>Wild</span>
                </div>
              </div>
              {/* ================= GAME TYPE ================= */}
              <div>
                <p className="text-sm text-white mb-3 font-medium">
                  Game Type
                </p>

                <div className="flex flex-wrap gap-3">
                  <GameTypeChip label="Slots" checked />
                  <GameTypeChip label="Live Casino" />
                  <GameTypeChip label="Live Casino" />
                  <GameTypeChip label="Black Jack" />
                  <GameTypeChip label="Arcade" />
                  <GameTypeChip label="Arcade" />
                </div>

                <p className="text-sm text-[#8E90C9] mt-3 cursor-pointer">
                  + Show All
                </p>
              </div>


              <div>
                <p className="text-sm text-white mb-3 font-medium">
                  Themes
                </p>

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

                <p className="text-sm text-[#8E90C9] mt-3 cursor-pointer">
                  + Show All
                </p>
              </div>

              {/* PROVIDERS */}
              <div>
                <p className="text-xs text-[#A6A8FF] mb-3">Providers</p>
                <div className="grid grid-cols-2 gap-3">
                  <ProviderBtn text="Hacksaw" />
                  <ProviderBtn text="Pragmatic Play" />
                  <ProviderBtn text="BGaming" />
                  <ProviderBtn text="Evolution" />
                </div>
              </div>
            </div>

            {/* ================= FOOTER ================= */}
            <div className="px-5 py-4 border-t border-white/10 flex gap-3">
              <button
                className="flex-1 py-3 rounded-xl text-sm font-semibold text-white"
                style={{
                  background:
                    "linear-gradient(180deg,#FFB27A 0%,#D64A1F 100%)",
                }}
              >
                Show 128 Games
              </button>

              <button className="flex-1 py-3 rounded-xl text-sm bg-[#6C6F90] text-white">
                Clear All
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FiltersPanel;
