import React from "react";
import { motion } from "framer-motion";
import "../../styles/gameShapes.css";
import { Link } from "react-router-dom";

const CasinoGameCards = () => {
  const cards = [
    {
      id: 1,
      class: "clip-casino",
      mobileClass: "clip-casino-mobile",
      w: "47%",
      h: "160px",
      title: "Casino",
      icon: "/icons/casino.svg",
      img: "/category/img8.png",
      desc: "The full casino experience. Live, fair, and always on.",
      background: "rgba(132, 67, 160, 0.50)",
      hoverBg: "#8443A0",
      link: "/casino",
    },
    {
      id: 2,
      class: "clip-gameshows",
      mobileClass: "clip-gameshows-mobile",
      w: "27%",
      h: "160px",
      title: "Game Shows",
      icon: "/icons/game-shows2.svg",
      img: "/category/img10.png",
      desc: "Spinning wheels, pumping multipliers",
      background: "rgba(90, 55, 153, 0.50)",
      hoverBg: "#a62a00",
      link: "/casino/gameshows",
    },
    {
      id: 3,
      class: "clip-slots",
      mobileClass: "clip-slots-mobile",
      w: "26%",
      h: "160px",
      title: "Slots",
      icon: "/icons/slots2.svg",
      img: "/category/img3.png",
      desc: "2K + titles, 98% + RTP, chase your next big win.",
      background: "rgba(85, 81, 169, 0.50)",
      hoverBg: "#a62a00",
      link: "/casino/slots",
    },
    {
      id: 4,
      class: "clip-blackjack",
      mobileClass: "clip-blackjack-mobile",
      w: "50%",
      h: "160px",
      title: "Blackjack",
      icon: "/icons/blackjack2.svg",
      img: "/category/img11.png",
      desc: "The thinking player's game with almost no house edge.",
      background: "rgba(85, 81, 169, 0.50)",
      hoverBg: "#5551A9",
      link: "/casino/blackjack",
    },
    {
      id: 5,
      class: "clip-baccarat",
      mobileClass: "clip-roulette-mobile",
      w: "50%",
      h: "160px",
      title: "Roulette",
      icon: "/icons/roulette2.svg",
      img: "/category/img6.png",
      desc: "Banker bets hit 50.68% of the time. The math is in your favor.",
      background: "rgba(132, 67, 160, 0.50)",
      hoverBg: "#8443A0",
      link: "/casino/baccarat",
    },
  ];

  // Desktop Card Component (unchanged)
  const DesktopCard = ({ c }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative group"
      style={{ width: c.w }}
    >
      <Link to={c.link} className="absolute inset-0 z-40"></Link>

      {/* Floating Label */}
      <div className="absolute top-2 left-2 z-30 flex items-center gap-2 text-[15px] text-white/80">
        <img src={c.icon} className="w-4 h-4" alt="" />
        {c.title}
      </div>

      <motion.div
        className="p-[6px] rounded-xl transition-all"
        style={{ background: c.background }}
        whileHover={{ backgroundColor: c.hoverBg }}
      >
        <div
          className={`relative overflow-hidden bg-[#0D0E36] ${c.class}`}
          style={{
            width: "100%",
            height: c.h,
            borderRadius: "20px",
            padding: "16px 16px",
          }}
        >
          <div className="w-[50%] h-full flex flex-col justify-end">
            <p
              className="mb-2"
              style={{
                color: "rgba(225,225,225,0.30)",
                fontFamily: "Neue Plak",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "18px",
              }}
            >
              {c.desc}
            </p>
          </div>

          <img
            src={c.img}
            alt={c.title}
            className="absolute z-10 pointer-events-none object-contain desktop-img"
          />
        </div>
      </motion.div>
    </motion.div>
  );

  // Mobile Card Component with specific SVG clip-path
  const MobileCard = ({ c, isSmall = false }) => (
    <Link to={c.link} className="block">
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="relative group w-full"
      >
        {/* Floating Label */}
        <div
          className={`absolute top-2 left-2 z-30 flex items-center gap-1.5 text-white/90 ${
            isSmall
              ? "text-[11px] sm:text-[13px]"
              : "text-[13px] sm:text-[14px]"
          }`}
        >
          <img
            src={c.icon}
            className={`${
              isSmall
                ? "w-3 h-3 sm:w-3.5 sm:h-3.5"
                : "w-3.5 h-3.5 sm:w-4 sm:h-4"
            }`}
            alt=""
          />
          <span className={`${isSmall ? "leading-tight" : ""}`}>
            {isSmall && c.title === "Game Shows" ? <>Game Shows</> : c.title}
          </span>
        </div>

        <motion.div
          className="p-[4px] sm:p-[5px] rounded-lg sm:rounded-xl transition-all"
          style={{ background: c.background }}
          whileHover={{ backgroundColor: c.hoverBg }}
        >
          <div
            className={`relative overflow-hidden bg-[#0D0E36] ${c.mobileClass}`}
            style={{
              width: "100%",
              height: isSmall ? "107px" : "107px",
            }}
          >
            {/* Image */}
            <img
              src={c.img}
              alt={c.title}
              className={`absolute z-10 pointer-events-none object-contain ${
                isSmall ? "mobile-img-small" : "mobile-img-large"
              }`}
            />

            {/* Hover sweep */}
            <motion.div
              className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 pointer-events-none"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );

  // Tablet Card Component
  const TabletCard = ({ c }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative group w-full"
    >
      {/* CLICKABLE OVERLAY */}
      <Link to={c.link} className="absolute inset-0 z-40"></Link>

      {/* Floating Label */}
      <div className="absolute top-2 left-2 z-30 flex items-center gap-2 text-[14px] text-white/90">
        <img src={c.icon} className="w-4 h-4" alt="" />
        {c.title}
      </div>

      <motion.div
        className="p-[5px] rounded-xl transition-all"
        style={{ background: c.background }}
        whileHover={{ backgroundColor: c.hoverBg }}
      >
        <div
          className={`relative overflow-hidden bg-[#0D0E36] ${c.mobileClass}`}
          style={{
            width: "100%",
            height: "140px",
            borderRadius: "18px",
          }}
        >
          {/* Image */}
          <img
            src={c.img}
            alt={c.title}
            className="absolute z-10 pointer-events-none object-contain tablet-img"
          />

          {/* Hover sweep */}
          <motion.div
            className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 pointer-events-none"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <section className="w-full md:py-2 py-2">
      <div className="max-w-7xl mx-auto space-y-3 px-3">
        {/* Desktop Layout - Unchanged */}
        <div className="hidden xl:flex gap-3">
          <DesktopCard c={cards[0]} />
          <DesktopCard c={cards[1]} />
          <DesktopCard c={cards[2]} />
        </div>

        <div className="hidden xl:flex gap-3">
          <DesktopCard c={cards[3]} />
          <DesktopCard c={cards[4]} />
        </div>

        {/* Tablet Layout (md to xl) */}
        <div className="hidden md:grid xl:hidden gap-3 grid-cols-2">
          <TabletCard c={cards[0]} />
          <TabletCard c={cards[3]} />
          <TabletCard c={cards[2]} />
          <TabletCard c={cards[1]} />
          <TabletCard c={cards[4]} />
        </div>

        {/* Mobile Layout - Matching Image 1 exactly */}
        <div className="md:hidden space-y-3">
          {/* First Row: Casino + Blackjack (2 columns, equal) */}
          <div className="grid grid-cols-2 gap-3">
            <MobileCard c={cards[0]} />
            <MobileCard c={cards[3]} />
          </div>

          {/* Second Row: Slots + Game Shows + Roulette (3 columns, equal) */}
          <div className="grid grid-cols-3 gap-2">
            <MobileCard c={cards[2]} isSmall={true} />
            <MobileCard c={cards[1]} isSmall={true} />
            <MobileCard c={cards[4]} isSmall={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasinoGameCards;
