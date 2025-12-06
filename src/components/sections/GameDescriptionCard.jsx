// src/components/GameDescriptionCard.jsx
import React from "react";
import { motion } from "framer-motion";

const GameDescriptionCard = ({
  gameImage = "/bg/herocard.svg",
  gameTitle = "13TH TRIAL",
  gameSubtitle = "HERCULES",
  gameBadge = "ABYSSWAYS",
  bets = "940,424",
  rtp = "96.18%",
  stats = [
    { label: "Edge", value: "3.62%" },
    { label: "Net Edge", value: "3.62%" },
    { label: "Net RTP", value: "3.62%" },
    { label: "Net Edge", value: "3.62%" },
    { label: "Variance", value: "3.62%" },
    { label: "Total Bets", value: "3.62%" },
  ],
  description = "Saddle the horses and rattle your hooks; the train is coming and it is time for action.",
  providerName = "Hacksaw Gaming",
  providerLink = "#",
  mainContent = "with high variance gameplay on a 5x5 game grid. The action packed title boasts 15 fixed paylines three bonus features and a max prize of 12,500x.",
  additionalContent = "Wanted Dead or a Wild has reached iconic status, delighting players with its gunslinging outlaws, enthralling graphics, and lucrative bonus features. Join the fray at",
  casinoName = "Stake Casino",
  casinoLink = "#",
  howToPlayTitle = "How to Play Dead or a Wild & Gameplay",
  howToPlayContent = "The Wanted Dead or a Wild online slot is loosely based on the Great Train Robbery, which lends its name to one of the bonus.",
  onViewMore,
  className = "",
}) => {
  return (
    <motion.section
      className={`container max-w-7xl mx-auto px-4 sm:px-4 lg:px-4 pt-6 max-[480px]:px-2 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="flex flex-col sm:flex-row px-4 rounded-lg py-5 max-[480px]:px-3 max-[480px]:py-4"
        style={{
          background: "rgba(28, 29, 73, 0.6)",
          border: "1px solid rgba(53, 50, 107, 0.4)",
        }}
      >
        {/* Left Section - Game Image */}
        <div className="relative w-full sm:w-[120px] md:w-[140px] lg:w-[160px] flex-shrink-0 max-[480px]:max-w-[220px] max-[480px]:mx-auto">
          <div className="relative aspect-[4/5] sm:aspect-auto sm:h-full min-h-[130px] overflow-hidden">
            <img
              src={gameImage}
              alt={gameTitle}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                e.target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='180'%3E%3Crect fill='%231C1D49' width='160' height='180'/%3E%3Ctext fill='%239292D2' font-size='12' x='80' y='90' text-anchor='middle'%3EGame%3C/text%3E%3C/svg%3E";
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E36] via-[#0D0E36]/30 to-transparent" />

            <div className="absolute bottom-7 left-2 right-2 max-[480px]:bottom-6">
              <p
                className="text-[10px] font-bold text-white uppercase tracking-wide"
                style={{ fontFamily: "Neuropolitical, sans-serif" }}
              >
                {gameTitle}
              </p>
              <p
                className="text-[11px] font-bold text-white uppercase"
                style={{ fontFamily: "Neuropolitical, sans-serif" }}
              >
                {gameSubtitle}
              </p>
              {gameBadge && (
                <span
                  className="text-[7px] font-bold uppercase tracking-widest"
                  style={{
                    color: "#FFB8A1",
                    textShadow: "0 0 6px rgba(255, 184, 161, 0.5)",
                  }}
                >
                  {gameBadge}
                </span>
              )}
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-2 py-1.5"
              style={{
                background: "rgba(13, 14, 54, 0.95)",
              }}
            >
              <div className="flex items-center gap-1">
                <span
                  className="text-[8px] font-semibold"
                  style={{ color: "#FFB8A1" }}
                >
                  Bets
                </span>
                <span className="text-white text-[9px] font-bold">{bets}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[8px]" style={{ color: "#7171B4" }}>
                  RTP:
                </span>
                <span className="text-white text-[9px] font-bold">{rtp}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Description Content */}
        <div className="flex-1 p-3 sm:p-3.5 flex flex-col min-w-0 max-[480px]:pt-4">
          <h4
            className="text-white text-[12px] font-semibold mb-2 max-[480px]:mb-1"
            style={{ fontFamily: "Neue Plak, sans-serif" }}
          >
            Description
          </h4>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2 pb-2 border-b border-[#35326B]/40 max-[480px]:overflow-x-auto max-[480px]:scrollbar-hide max-[480px]:pb-1">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="trust_btn2 px-2 py-1 flex items-center gap-1 whitespace-nowrap max-[480px]:text-[9px]"
              >
                <span className="text-[10px]" style={{ color: "#7171B4" }}>
                  {stat.label}:
                </span>
                <span
                  className="text-[10px] font-medium"
                  style={{ color: "#9292D2" }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex-1 space-y-1 text-[10px] leading-[1.6] max-[480px]:text-[9px]">
            <p>
              {description} Wanted Dead or a Wild is a gritty adventure slot
              from{" "}
              <a
                href={providerLink}
                className="underline decoration-dotted underline-offset-2 transition-colors hover:opacity-80"
              >
                {providerName}
              </a>
              , {mainContent}
            </p>

            <p>
              {additionalContent}{" "}
              <a
                href={casinoLink}
                className="underline decoration-dotted underline-offset-2 transition-colors hover:opacity-80"
              >
                {casinoName}
              </a>{" "}
              today.
            </p>

            <div className="pt-1">
              <h5 className="text-white text-[10px] font-semibold mb-0.5">
                {howToPlayTitle}
              </h5>
              <p>{howToPlayContent}</p>
            </div>
          </div>

          <div className="flex justify-end mt-2 max-[480px]:mt-1">
            <motion.button
              onClick={onViewMore}
              className="text-[10px] font-medium flex items-center gap-0.5 transition-colors cursor-pointer"
              whileHover={{ x: 2, opacity: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              View More
              <svg
                className="w-2.5 h-2.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default GameDescriptionCard;
