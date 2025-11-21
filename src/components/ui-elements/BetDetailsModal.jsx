import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const randomBetId = () => {
  return Math.floor(Math.random() * 1000) + 1;
};

const BetDetailsModal = ({ isOpen, onClose, betData }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  console.log("betData is:", betData);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Copy to clipboard function
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };

  if (!isOpen && !isVisible) return null;
  const makeSlug = (name) =>
    encodeURIComponent(name?.toLowerCase().replace(/\s+/g, "-"));

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdropClick}
        >
          {/* Backdrop with blur */}
          <div className="absolute inset-0 bg-[#080808]/60 backdrop-blur-sm" />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-lg"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glass Card Container */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                boxShadow:
                  "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 100px rgba(240, 119, 48, 0.1)",
              }}
            >
              {/* Gradient Overlay for extra depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#F07730]/5 via-transparent to-purple-600/5 pointer-events-none" />

              {/* Header */}
              <div className="relative px-6 py-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Bet</h2>
                  <button
                    onClick={handleClose}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors group"
                  >
                    <svg
                      className="w-5 h-5 text-white/70 group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="relative p-6 space-y-6">
                {/* Game Info Section */}
                <div className="flex items-start gap-4">
                  {/* Game Thumbnail */}
                  <div className="relative flex-shrink-0">
                    <div
                      className="w-24 h-24 rounded-xl overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(240, 119, 48, 0.1) 0%, rgba(240, 119, 48, 0.05) 100%)",
                        border: "1px solid rgba(240, 119, 48, 0.2)",
                      }}
                    >
                      <img
                        src={betData?.gameImage || "/games/golden.svg"}
                        alt={betData?.gameName || "Game"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Live indicator if game is live */}
                    {betData?.isLive && (
                      <div className="absolute -top-1 -right-1">
                        <span className="flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Game Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">
                      {betData?.gameName || "Speed Baccarat"}
                    </h3>
                    <p className="text-sm text-white/60 mt-1">
                      {betData?.provider || "Pragmatic Play"}
                    </p>
                  </div>
                </div>

                {/* Bet ID Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60">Bet ID:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white/80 font-mono">
                        {betData?.betId || "e0b1a8dc-c888-47b..."}
                      </span>
                      <button
                        onClick={() =>
                          copyToClipboard(betData?.betId || "e0b1a8dc-c888-47b")
                        }
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                      >
                        <svg
                          className="w-4 h-4 text-white/60"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                      <button className="p-1 hover:bg-white/10 rounded transition-colors">
                        <svg
                          className="w-4 h-4 text-white/60"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Player Info */}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-white/60">Placed by</span>
                    <div className="flex items-center gap-1">
                      <img
                        src="/icons/moon.svg"
                        alt="coin"
                        className="w-4 h-4"
                      />
                      <span className="text-[#F07730] font-semibold">
                        {betData?.username || "kiri..."}
                      </span>
                    </div>
                    <span className="text-white/60">on</span>
                    <span className="text-white/80">
                      {betData?.date || "Nov 1, 2025"}
                    </span>
                    <span className="text-white/60">at</span>
                    <span className="text-white/80">
                      {betData?.time || "12:39:46"}
                    </span>
                  </div>
                </div>

                {/* Result Label */}
                <div className="flex justify-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#F07730] to-[#D66920] bg-clip-text text-transparent">
                    Moonbet
                  </span>
                </div>

                {/* Bet Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Amount */}
                  <div className="text-center">
                    <p className="text-sm text-white/60 mb-2">Amount</p>
                    <div
                      className="py-3 px-2 rounded-xl"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      <p className="text-xl font-bold text-white">
                        {betData?.amount || "$147.83"}
                      </p>
                    </div>
                  </div>

                  {/* Multiplier */}
                  <div className="text-center">
                    <p className="text-sm text-white/60 mb-2">Multiplier</p>
                    <div
                      className="py-3 px-2 rounded-xl"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      <p className="text-xl font-bold text-white">
                        {betData?.multiplier || "2.00x"}
                      </p>
                    </div>
                  </div>

                  {/* Payout */}
                  <div className="text-center">
                    <p className="text-sm text-white/60 mb-2">Payout</p>
                    <div
                      className="py-3 px-2 rounded-xl"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)",
                        border: "1px solid rgba(34, 197, 94, 0.2)",
                      }}
                    >
                      <p className="text-xl font-bold text-green-500">
                        {betData?.payout || "$295.67"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Currency Notice */}
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(240, 119, 48, 0.1) 0%, rgba(240, 119, 48, 0.05) 100%)",
                    border: "1px solid rgba(240, 119, 48, 0.2)",
                  }}
                >
                  <p className="text-sm text-[#F07730]">
                    This bet was originally placed as{" "}
                    {betData?.originalCurrency || "C$207.00"} but is showing the
                    approximate value in your display currency.
                  </p>
                </div>

                {/* Play Button */}
                <motion.button
                  onClick={() => {
                    const slug = makeSlug(betData?.gameName);

                    handleClose();

                    // Navigate after closing animation completes
                    setTimeout(() => {
                      navigate(`/game/${slug}`);
                    }, 250);
                  }}
                  className="w-full py-4 bg-gradient-to-r from-[#F07730] to-[#EFD28E] text-[#000] font-[600] text-[16px] rounded-lg shadow-md transition-all duration-300 hover:from-[#F07730]/90 hover:to-[#EFD28E]/90 flex items-center justify-center "
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 6px 30px rgba(30, 144, 255, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Play {betData?.gameName || "Speed Baccarat"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BetDetailsModal;
