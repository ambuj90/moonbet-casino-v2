import React from "react";
import { motion } from "framer-motion";

const CasinoGameCards = () => {
  const gameCards = [
    {
      id: 1,
      icon: "/icons/casino.svg",
      href: "/casino",
      title: "CASINO",
      description: "Dive into our in-house games, live casino and slots",
      img: "/category/img8.png",
      bg: "linear-gradient(95deg, rgba(220,31,255,0.10) 0%, rgba(220,31,255,0.30) 100%)",
      w: "590px",
      h: "180px",
    },
    {
      id: 2,
      icon: "/icons/slots.svg",
      href: "/slots",
      title: "SLOTS",
      img: "/category/img10.png",
      bg: "linear-gradient(107deg, rgba(10,43,188,0.10) 0%, rgba(10,43,188,0.30) 100%)",
      w: "322px",
      h: "180px",
    },
    {
      id: 3,
      icon: "/icons/game-shows.svg",
      href: "/casino/gameshows",
      title: "GAME SHOWS",
      img: "/category/img3.png",
      bg: "linear-gradient(107deg, rgba(240,119,48,0.10) 0%, rgba(240,119,48,0.30) 100%)",
      w: "321px",
      h: "180px",
    },
    {
      id: 4,
      icon: "/icons/blackjack.svg",
      href: "/blackjack",
      title: "BLACKJACK",
      description: "Dive into our in-house games, live casino and slots",
      img: "/category/img11.png",
      bg: "linear-gradient(97deg, rgba(240,119,48,0.10) 0%, rgba(240,119,48,0.30) 100%)",
      w: "625px",
      h: "180px",
    },
    {
      id: 5,
      icon: "/icons/bacarrat-menu.svg",
      href: "/baccarat",
      title: "BACCARAT",
      description: "Dive into our in-house games, live casino and slots",
      img: "/category/img6.png",
      bg: "linear-gradient(157deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)",
      w: "625px",
      h: "180px",
    },
  ];

  const GameCard = ({ card, className, responsive = false }) => (
    <motion.div
      className={`reward_btn relative flex overflow-hidden group ${
        className || ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4 }}
      style={{
        width: responsive ? "100%" : card.w,
        height: responsive ? "auto" : card.h,
        minHeight: responsive ? "180px" : card.h,
        background: card.bg,
      }}
    >
      <div className="absolute inset-0 bg-[#080808]/30 backdrop-blur-sm" />

      <div className="flex flex-col justify-between p-4 sm:p-6 z-10 w-1/2 space-y-3">
        {/* Title with Icon */}
        <div className="flex items-start gap-2">
          {/* Animated Icon */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ rotate: 360 }}
            className="flex-shrink-0"
          >
            <motion.img
              src={card.icon}
              alt=""
              style={{
                width: "18px",
                height: "20px",
              }}
              className="object-contain md:mt-[0.2rem]"
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>

          {/* Title */}
          <motion.h3
            className="uppercase"
            style={{
              fontFamily: "Neue Plak",
              color: "#E5EAF2",
              fontSize: "clamp(16px, 2.5vw, 20px)",
              fontWeight: "500",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {card.title}
          </motion.h3>
        </div>

        {/* Description */}
        {card.description && (
          <motion.p
            className="text-gray-300 text-xs sm:text-sm leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {card.description}
          </motion.p>
        )}
      </div>

      {/* Main Image */}
      <motion.div
        className="flex items-center justify-center w-full z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
      >
        <img
          src={card.img}
          alt={card.title}
          className="max-w-full max-h-full object-contain"
          style={{
            width: responsive ? "auto" : card.imgW,
            height: responsive ? "auto" : card.imgH,
            maxWidth: responsive ? "100%" : card.imgW,
            maxHeight: responsive ? "180px" : card.imgH,
          }}
        />
      </motion.div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.8 }}
      />
    </motion.div>
  );

  return (
    <section className="w-full">
      <div
        className="max-w-7xl mx-auto p-6 md:p-2"
        style={{
          marginTop: "50px",
        }}
      >
        {/* DESKTOP - 1280px and above */}
        <div className="hidden xl:grid gap-4 grid-cols-[584px_320px_311px] auto-rows-[180px]">
          {/* ROW 1 */}
          <GameCard card={gameCards[0]} />
          <GameCard card={gameCards[1]} />
          <GameCard card={gameCards[2]} />

          {/* ROW 2 */}
          <GameCard card={gameCards[3]} className="row-start-2 col-start-1" />
          <GameCard
            card={gameCards[4]}
            className="row-start-2 col-start-2 col-span-2 ml-0 xl:ml-[34px]"
          />
        </div>

        {/* LARGE TABLET - 1024px to 1279px */}
        <div className="hidden lg:grid xl:hidden grid-cols-3 gap-4">
          {/* ROW 1 */}
          <GameCard card={gameCards[0]} className="col-span-2" responsive />
          <GameCard card={gameCards[1]} responsive />

          {/* ROW 2 */}
          <GameCard card={gameCards[2]} responsive />
          <GameCard card={gameCards[3]} className="col-span-2" responsive />

          {/* ROW 3 */}
          <GameCard card={gameCards[4]} className="col-span-3" responsive />
        </div>

        {/* MEDIUM TABLET - 768px to 1023px */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-4">
          <GameCard card={gameCards[0]} className="col-span-2" responsive />
          <GameCard card={gameCards[1]} responsive />
          <GameCard card={gameCards[2]} responsive />
          <GameCard card={gameCards[3]} className="col-span-2" responsive />
          <GameCard card={gameCards[4]} className="col-span-2" responsive />
        </div>

        {/* SMALL TABLET - 640px to 767px */}
        <div className="hidden sm:grid md:hidden grid-cols-2 gap-4">
          {gameCards.map((card, index) => (
            <GameCard
              key={card.id}
              card={card}
              className={index === 0 || index >= 3 ? "col-span-2" : ""}
              responsive
            />
          ))}
        </div>

        {/* MOBILE - below 640px */}
        <div className="grid sm:hidden grid-cols-1 gap-4">
          {gameCards.map((card) => (
            <GameCard key={card.id} card={card} responsive />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CasinoGameCards;
