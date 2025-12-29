import { motion, AnimatePresence } from "framer-motion";
import React from "react";

const FiltersPanel = ({ open, onClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
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
              fixed top-0 right-0 z-[100]
              h-full
              w-full sm:w-[420px]
              bg-[#0D0E36]
              border-l border-white/10
              backdrop-blur-xl
              shadow-2xl
              flex flex-col
            "
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-4">
              <h2 className="text-white text-lg font-semibold flex items-center gap-2">
                <span className="text-[#9EA2FF]">⚙️</span>
                Filters
              </h2>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white"
              >
                ✕
              </button>
            </div>

            <div className="h-px bg-white/10" />

            {/* CONTENT */}
            <div className="p-6 space-y-6 overflow-y-auto">

              {/* SELECTED TAGS SECTION */}
              <div>
                <p className="text-xs text-[#9EA2FF] mb-2">Selected filters</p>

                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-sm text-white/90">
                    Example tag ✕
                  </span>
                </div>
              </div>

              {/* QUICK PICK BUTTONS */}
              <div>
                <p className="text-sm text-white font-medium mb-2">
                  Quick Picks
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-[#1A1B3E] border border-white/10 rounded-xl py-3 text-white text-sm">
                    High Roller
                  </button>

                  <button className="bg-[#1A1B3E] border border-white/10 rounded-xl py-3 text-white text-sm">
                    Trending
                  </button>
                </div>
              </div>

              {/* BOTTOM BUTTONS */}
              <div className="pt-4 flex gap-3">
                <button
                  className="flex-1 py-3 rounded-xl text-white font-semibold"
                  style={{
                    background: "linear-gradient(90deg,#FFB8A1,#A62A00)",
                  }}
                >
                  Show Games
                </button>

                <button
                  onClick={() => console.log("clear")}
                  className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold border border-white/20"
                >
                  Clear All
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FiltersPanel;
