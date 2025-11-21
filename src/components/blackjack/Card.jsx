// ==========================================
// components/blackjack/Card.jsx - Updated Card Component
// ==========================================

import React from "react";
import { motion } from "framer-motion";

const Card = ({ card, hidden = false, index = 0 }) => {
  console.log("[CardRender]", {
  rank: card?.rank,
  suit: card?.suit,
  hidden,
  index,
});

  const suits = {
    hearts: "♥",
    diamonds: "♦",
    clubs: "♣",
    spades: "♠",
  };

  const suitColors = {
    hearts: "#ef4444",
    diamonds: "#ef4444",
    clubs: "#1f2937",
    spades: "#1f2937",
  };

  // ✅ Normalize backend suit symbols to consistent keys
  const normalizedSuit =
    card?.suit === "♠"
      ? "spades"
      : card?.suit === "♥"
      ? "hearts"
      : card?.suit === "♦"
      ? "diamonds"
      : card?.suit === "♣"
      ? "clubs"
      : card?.suit || "spades";

  // 🂠 Back of card (hidden)
  if (hidden) {
    return (
      <motion.div
        initial={{ scale: 0, rotateY: 180 }}
        animate={{ scale: 1, rotateY: 0 }}
        transition={{
          delay: index * 0.1,
          duration: 0.5,
          type: "spring",
          stiffness: 100,
        }}
        className="relative w-20 h-28 md:w-24 md:h-32 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-xl"
        style={{ marginLeft: index > 0 ? "-2rem" : "0" }}
      >
        <div className="absolute inset-0 rounded-lg border border-blue-400/50"></div>
        <div className="absolute inset-2 rounded bg-blue-900/20 backdrop-blur-sm"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-blue-200 font-bold text-xs tracking-wider">
            MOONBET
          </div>
        </div>
      </motion.div>
    );
  }

  // 🂡 Face-up card
  return (
    <motion.div
      initial={{ scale: 0, rotateY: 180 }}
      animate={{ scale: 1, rotateY: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ y: -5 }}
      className="relative w-20 h-28 md:w-24 md:h-32 bg-white rounded-lg shadow-xl"
      style={{ marginLeft: index > 0 ? "-2rem" : "0" }}
    >
      <div className="absolute inset-0 rounded-lg border border-gray-300"></div>

      {/* Top left corner */}
      <div
        className="absolute top-1 left-1 flex flex-col items-center"
        style={{ color: suitColors[normalizedSuit] }}
      >
        <div className="text-lg font-bold leading-none">{card?.rank}</div>
        <div className="text-base leading-none">
          {suits[normalizedSuit] || "?"}
        </div>
      </div>

      {/* Center suit */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ color: suitColors[normalizedSuit] }}
      >
        <div className="text-4xl md:text-5xl">
          {suits[normalizedSuit] || "?"}
        </div>
      </div>

      {/* Bottom right corner (rotated) */}
      <div
        className="absolute bottom-1 right-1 rotate-180 flex flex-col items-center"
        style={{ color: suitColors[normalizedSuit] }}
      >
        <div className="text-lg font-bold leading-none">{card?.rank}</div>
        <div className="text-base leading-none">
          {suits[normalizedSuit] || "?"}
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
