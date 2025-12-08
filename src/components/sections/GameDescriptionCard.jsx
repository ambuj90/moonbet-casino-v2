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
      className={`container max-w-7xl mx-auto px-4 sm:px-4 lg:px-4 pt-6 
        max-[480px]:px-2 max-[375px]:px-1.5 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="flex flex-col sm:flex-row px-4 rounded-lg py-5 
          max-[480px]:px-3 max-[480px]:py-4 
          max-[375px]:px-2 max-[375px]:py-3"
        style={{
          background: "rgba(28, 29, 73, 0.6)",
          border: "1px solid rgba(53, 50, 107, 0.4)",
        }}
      >
        {/* Left Section - Game Image Card */}
        <div
          className="relative w-full sm:w-[140px] md:w-[160px] lg:w-[180px] flex-shrink-0 
  max-[480px]:max-w-[200px] max-[375px]:max-w-[180px] max-[480px]:mx-auto"
        >
          <div
            className="
      relative 
      rounded-lg 
      overflow-hidden 
      w-full 
      h-[136px]       /* Desktop height fixed */
      sm:h-[170px]    /* Tablet/desktop */
      max-[480px]:h-auto   /* Mobile auto height */
    "
          >
            {/* Game Image */}
            <img
              src={gameImage}
              alt={gameTitle}
              className="w-full h-full object-cover bg-[#0D0E36]"
              onError={(e) => {
                e.target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='220'%3E%3Crect fill='%231C1D49' width='180' height='220'/%3E%3Ctext fill='%239292D2' font-size='12' x='90' y='110' text-anchor='middle'%3EGame%3C/text%3E%3C/svg%3E";
              }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E36] via-[#0D0E36]/50 to-transparent" />

            {/* Bets & RTP Bar */}
            <div
              className="affiliate-para2 absolute bottom-0 left-0 right-0 flex items-center justify-between px-2.5 py-2 sm:px-3 sm:py-2.5"
              style={{ borderRadius: "0 0 8px 8px" }}
            >
              <div className="flex items-center gap-1.5 pr-3 border-r border-[#35326B]/40">
                <span
                  className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide"
                  style={{ color: "#FFB8A1" }}
                >
                  Bets
                </span>
                <span
                  className="text-white text-[10px] sm:text-[11px] font-bold"
                  style={{ fontFamily: "Neue Plak, sans-serif" }}
                >
                  {bets}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <span
                  className="text-[9px] sm:text-[10px] font-medium"
                  style={{ color: "#7171B4" }}
                >
                  RTP:
                </span>
                <span
                  className="text-white text-[10px] sm:text-[11px] font-bold"
                  style={{ fontFamily: "Neue Plak, sans-serif" }}
                >
                  {rtp}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Description Content */}
        <div
          className="flex-1 pt:0 sm:p-0 lg:pl-4 flex flex-col min-w-0 
          max-[480px]:pt-4 max-[375px]:p-2 max-[375px]:pt-0"
        >
          {/* Description Header */}
          <h4
            className="text-white text-[13px] sm:text-[14px] font-semibold mb-2.5 
              max-[480px]:mb-2 max-[375px]:text-[12px]"
            style={{ fontFamily: "Neue Plak, sans-serif" }}
          >
            Description
          </h4>

          {/* Stats Pills */}
          <div
            className="flex flex-wrap items-center gap-x-2 gap-y-1.5 pb-3 
            max-[480px]:gap-x-1.5 max-[480px]:gap-y-1 max-[480px]:mb-2 max-[480px]:pb-2
            max-[375px]:overflow-x-auto max-[375px]:flex-nowrap max-[375px]:scrollbar-hide"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="trust_btn px-2 py-1 sm:px-2.5 sm:py-1.5 flex items-center gap-1 
                  whitespace-nowrap
                  max-[480px]:px-1.5 max-[480px]:py-0.5
                  max-[375px]:flex-shrink-0"
              >
                <span
                  className="text-[9px] sm:text-[10px] max-[375px]:text-[8px] relative z-10"
                  style={{ color: "#7171B4" }}
                >
                  {stat.label}:
                </span>
                <span
                  className="text-[9px] sm:text-[10px] font-medium max-[375px]:text-[8px] relative z-10"
                  style={{ color: "#9292D2" }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* Description Text Content */}
          <div
            className="flex-1 space-y-2 text-[11px] sm:text-[12px] leading-[1.2] 
            max-[480px]:text-[10px] max-[480px]:space-y-1.5
            max-[375px]:text-[9px] max-[375px]:leading-[1.6]"
            style={{ color: "#9292D2" }}
          >
            <p>
              {description} Wanted Dead or a Wild is a gritty adventure slot
              from{" "}
              <a
                href={providerLink}
                className="underline decoration-dotted underline-offset-2 
                  transition-colors hover:opacity-80 hover:text-white"
                style={{ color: "#B8B8E0" }}
              >
                {providerName}
              </a>
              , {mainContent}
            </p>

            <p>
              {additionalContent}{" "}
              <a
                href={casinoLink}
                className="underline decoration-dotted underline-offset-2 
                  transition-colors hover:opacity-80 hover:text-white"
                style={{ color: "#B8B8E0" }}
              >
                {casinoName}
              </a>{" "}
              today.
            </p>

            <div className="max-[480px]:pt-1">
              <p
                className="text-white text-[13px] sm:text-[14px] font-semibold mb-1 
                  max-[480px]:text-[12px] max-[375px]:text-[11px]"
                style={{ fontFamily: "Neue Plak, sans-serif" }}
              >
                {howToPlayTitle}
              </p>
              <p>{howToPlayContent}</p>
            </div>
          </div>

          {/* View More Button */}
          <div className="flex justify-end mt-3 max-[480px]:mt-2">
            <motion.button
              onClick={onViewMore}
              className="text-[10px] sm:text-[11px] font-medium flex items-center gap-1 
                transition-colors cursor-pointer max-[375px]:text-[9px]"
              style={{ color: "#9292D2" }}
              whileHover={{ x: 3, color: "#ffffff" }}
              transition={{ duration: 0.2 }}
            >
              View More
              <svg
                className="w-3 h-3 max-[375px]:w-2.5 max-[375px]:h-2.5"
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
