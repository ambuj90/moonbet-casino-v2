import React from "react";
import { motion } from "framer-motion";
import "../../styles/gameShapes.css";

const CasinoGameCards = () => {
  const cards = [
    {
      id: 1,
      class: "clip-casino",
      w: "47%",
      h: "160px",
      title: "Casino",
      icon: "/icons/casino.svg",
      img: "/category/img8.png",
      desc: "Dive into our in-house games, live casino and slots",
      background: "rgba(132, 67, 160, 0.50)",
      hoverBg: "#8443A0",
    },
    {
      id: 2,
      class: "clip-gameshows",
      w: "27%",
      h: "160px",
      title: "Game Shows",
      icon: "/icons/game-shows.svg",
      img: "/category/img3.png",
      desc: "How about live game shows?",
      background: "rgba(90, 55, 153, 0.50)",
      hoverBg: "#5A3799",
    },
    {
      id: 3,
      class: "clip-slots",
      w: "26%",
      h: "160px",
      title: "Slots",
      icon: "/icons/slots.svg",
      img: "/category/img10.png",
      desc: "How about live game shows?",
      background: "rgba(85, 81, 169, 0.50)",
      hoverBg: "#5A3799",
    },
    {
      id: 4,
      class: "clip-blackjack",
      w: "50%",
      h: "160px",
      title: "Blackjack",
      icon: "/icons/blackjack.svg",
      img: "/category/img11.png",
      desc: "Dive into our in-house games, live casino and slots",
      background: "rgba(85, 81, 169, 0.50)",
      hoverBg: "#5551A9",
    },
    {
      id: 5,
      class: "clip-baccarat",
      w: "50%",
      h: "160px",
      title: "Roulette",
      icon: "/icons/roulette.svg",
      img: "/category/img6.png",
      desc: "Dive into our in-house games, live casino and slots",
      background: "rgba(132, 67, 160, 0.50)",
      hoverBg: "#8443A0",
    },
  ];

  const Card = ({ c, responsive = false }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.35 }}
      className={`relative group ${responsive ? "w-full" : ""}`}
      style={!responsive ? { width: c.w } : {}}
    >
      {/* Floating Label */}
      <div className="absolute top-2 left-2 z-30 flex items-center gap-2 px-3 py-[3px] rounded-lg text-white/60 text-xs sm:text-sm">
        <img src={c.icon} className="w-4 h-4" alt="" />
        {c.title}
      </div>

      {/* Outer Frame */}
      <motion.div
        className="p-[6px] sm:p-[8px] rounded-xl transition-all"
        style={{ background: c.background }}
        whileHover={{ backgroundColor: c.hoverBg }}
      >
        {/* Clip Path Shape */}
        <div
          className={`relative overflow-hidden bg-[#0D0E36] ${c.class}`}
          style={{
            width: "100%",
            height: responsive ? "140px" : c.h,
            borderRadius: "20px",
            padding: "18px 20px",
          }}
        >
          {/* LEFT TEXT */}
          <div className="w-[50%] sm:w-[40%] flex flex-col justify-end h-full">
            <p
              className="mb-2"
              style={{
                color: "rgba(225, 225, 225, 0.35)",
                fontFamily: "Neue Plak",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "18px",
              }}
            >
              {c.desc}
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <img
            src={c.img}
            alt={c.title}
            className="absolute bottom-0 right-0 h-full max-h-full object-contain z-10 pointer-events-none"
          />

          {/* Hover Sweep */}
          <motion.div
            className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 pointer-events-none"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <section className="w-full py-12">
      <div className="max-w-7xl mx-auto space-y-6 px-3">
        {/* Desktop */}
        <div className="hidden xl:flex gap-3">
          <Card c={cards[0]} />
          <Card c={cards[2]} />
          <Card c={cards[1]} />
        </div>

        <div className="hidden xl:flex gap-3">
          <Card c={cards[3]} />
          <Card c={cards[4]} />
        </div>

        {/* Tablet */}
        <div className="hidden md:grid xl:hidden gap-3 grid-cols-2">
          {cards.map((c) => (
            <Card key={c.id} c={c} responsive />
          ))}
        </div>

        {/* Mobile */}
        <div className="grid md:hidden gap-3">
          {cards.map((c) => (
            <Card key={c.id} c={c} responsive />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CasinoGameCards;
