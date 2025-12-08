// src/components/GameDescriptionCard.jsx
import React, { useState } from "react";
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
  howToPlayContent = "The Wanted Dead or a Wild online slot is loosely based on the Great Train Robbery, which lends its name to one of the bonus.The Wanted Dead or a Wild online slot is loosely based on the Great Train Robbery.",
  onViewMore,
  className = "",
}) => {
  // ✅ React state MUST be inside the component
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.section
      className={`container max-w-7xl mx-auto px-4 pt-6
        sm:px-4 
        md:px-6
        lg:px-4
        max-[480px]:px-3 
        max-[375px]:px-2 
        ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`flex flex-col sm:flex-row gap-4 px-4 rounded-lg py-5
          sm:gap-4 md:gap-5 lg:gap-6
          transition-all duration-300 overflow-hidden
          ${expanded ? "max-h-full" : "max-h-[200px] sm:max-h-[240px]"}
        `}
        style={{
          background: "rgba(28, 29, 73, 0.6)",
          border: "1px solid rgba(53, 50, 107, 0.4)",
        }}
      >
        {/* LEFT SECTION */}
        <div
          className="relative flex-shrink-0
            w-full sm:w-[190px] md:w-[190px] lg:w-[170px] xl:w-[180px]
            max-[480px]:w-full max-[480px]:max-w-[280px] max-[480px]:mx-auto
            max-[375px]:max-w-[240px] md:mt-1.5"
        >
          <div
            className="relative w-full overflow-hidden rounded-lg"
            style={{ aspectRatio: "1/1" }}
          >
            <img
              src={gameImage}
              alt={gameTitle}
              className="absolute inset-0 w-full h-full object-cover object-center bg-[#0D0E36]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E36] via-[#0D0E36]/40 to-transparent" />

            {/* Bets / RTP */}
            <div
              className="affiliate-para2 absolute bottom-0 left-0 right-0 flex items-center justify-between z-10
                px-2 py-1.5 
                sm:px-2.5 sm:py-2
                md:px-3 md:py-2
                max-[375px]:px-1.5 max-[375px]:py-1"
              style={{ borderRadius: "0 0 8px 8px" }}
            >
              <div className="flex items-center gap-1 sm:gap-1.5 pr-2 sm:pr-3 border-r border-[#35326B]/40">
                <span
                  className="text-[8px] sm:text-[9px] md:text-[10px] font-semibold uppercase tracking-wide"
                  style={{ color: "#FFB8A1" }}
                >
                  Bets
                </span>
                <span className="text-white text-[9px] sm:text-[10px] md:text-[11px] font-bold">
                  {bets}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <span
                  className="text-[8px] sm:text-[9px] md:text-[10px] font-medium"
                  style={{ color: "#7171B4" }}
                >
                  RTP:
                </span>
                <span className="text-white text-[9px] sm:text-[10px] md:text-[11px] font-bold">
                  {rtp}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div
          className="flex-1 flex flex-col min-w-0
            pt-0 sm:pt-0
            lg:pl-2
            max-[480px]:pt-2
            max-[375px]:pt-1.5"
        >
          <h4
            className="text-white font-semibold mb-2
              text-[12px] sm:text-[13px] md:text-[14px]"
          >
            Description
          </h4>

          {/* Stats Pills */}
          <div
            className="flex flex-wrap items-center gap-x-1.5 gap-y-1 pb-2.5
              sm:gap-x-2 sm:gap-y-1.5 sm:pb-3"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="trust_btn flex items-center gap-0.5 whitespace-nowrap
                  px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-2.5 md:py-1"
              >
                <span
                  className="relative z-10 text-[8px] sm:text-[9px] md:text-[10px]"
                  style={{ color: "#7171B4" }}
                >
                  {stat.label}:
                </span>
                <span
                  className="font-medium relative z-10 text-[8px] sm:text-[9px] md:text-[10px]"
                  style={{ color: "#9292D2" }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* DESCRIPTION TEXT */}
          <div
            className={`flex-1 space-y-1
    text-[10px] leading-[1]
    sm:text-[11px] sm:leading-[1.2] sm:space-y-2
    transition-all duration-300
    ${expanded ? "" : "line-clamp-4"}
  `}
            style={{ color: "#e1e1e1" }}
          >
            <p>
              {description} Wanted Dead or a Wild is a gritty adventure slot
              from{" "}
              <a href={providerLink} className="underline text-[#e1e1e1]">
                {providerName}
              </a>
              , {mainContent}
            </p>

            <p>
              {additionalContent}{" "}
              <a href={casinoLink} className="underline text-[#e1e1e1]">
                {casinoName}
              </a>{" "}
              today.
            </p>

            <div className="pt-1">
              <p className="text-[#e1e1e1] font-semibold text-[12px] sm:text-[13px] md:text-[14px]">
                {howToPlayTitle}
              </p>
              <p>{howToPlayContent}</p>
            </div>
          </div>

          {/* VIEW MORE / LESS BUTTON */}
          <div className="flex justify-end mt-2 md:mt-3">
            <motion.button
              onClick={() => setExpanded(!expanded)}
              className="font-medium flex items-center gap-0.5 
                text-[9px] sm:text-[10px] md:text-[11px]"
              style={{ color: "#e1e1e1" }}
              whileHover={{ x: 3, color: "#ffffff" }}
              transition={{ duration: 0.2 }}
            >
              {expanded ? "View Less" : "View More"}
              <svg
                className="w-3 h-3"
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
