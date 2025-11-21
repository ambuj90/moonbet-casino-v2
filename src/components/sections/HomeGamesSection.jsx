// src/components/sections/HomeGamesSection.jsx
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import MoonBetButton from "../ui-elements/MoonBetButton";

const HomeGamesSection = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Games data
  const gamesData = [
    {
      id: 1,
      title: "SLOTS",
      badge: "HOT",
      badgeColor: "bg-red-500",
      icon: "🎰",
      players: "2.3k",
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: 2,
      title: "POKER",
      badge: "NEW",
      badgeColor: "bg-green-500",
      icon: "♠️",
      players: "1.8k",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "MINES",
      icon: "🎡",
      players: "3.1k",
      gradient: "from-red-500 to-pink-500",
    },
    {
      id: 4,
      title: "DICES",
      badge: "LIVE",
      badgeColor: "bg-blue-500",
      icon: "🃏",
      players: "1.5k",
      gradient: "from-gray-700 to-gray-900",
    },
    {
      id: 5,
      title: "DICE",
      icon: "🎲",
      players: "2.1k",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 6,
      title: "CRASH",
      badge: "POPULAR",
      badgeColor: "bg-purple-500",
      icon: "📈",
      players: "4.2k",
      gradient: "from-purple-600 to-blue-600",
    },
    {
      id: 7,
      title: "WHEEL",
      icon: "🎯",
      players: "1.2k",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      id: 8,
      title: "WHEEL",
      icon: "🎯",
      players: "1.2k",
      gradient: "from-yellow-500 to-orange-500",
    },
  ];

  // Check scroll position
  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollPosition();
      container.addEventListener("scroll", checkScrollPosition);
      window.addEventListener("resize", checkScrollPosition);

      return () => {
        container.removeEventListener("scroll", checkScrollPosition);
        window.removeEventListener("resize", checkScrollPosition);
      };
    }
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full py-16 md:py-20 bg-[#000] relative">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-between items-center mb-10"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
              >
                <path
                  d="M12.2529 0C14.4557 0 16.2479 1.79235 16.248 3.99512V5.19141L15.5264 7.68652H20.7168C21.9757 7.68662 23 8.71076 23 9.96973C22.9999 10.7299 22.6259 11.4041 22.0527 11.8193C22.3397 12.2011 22.5098 12.6752 22.5098 13.1885C22.5098 13.9489 22.1358 14.6229 21.5625 15.0381C21.8494 15.4198 22.0195 15.8941 22.0195 16.4072C22.0195 17.1675 21.6464 17.8426 21.0732 18.2578C21.3599 18.6395 21.5303 19.114 21.5303 19.627C21.53 20.8856 20.5057 21.9099 19.2471 21.9102H12.0586C10.8747 21.9102 9.71203 21.6989 8.60352 21.2832L6.73828 20.584V8.79297C8.92389 6.44115 10.9239 4.19569 11.2842 3.61914V0.96875C11.2843 0.434861 11.719 0.000198252 12.2529 0ZM5.39062 7.24219V21.4697H0V7.24219H5.39062Z"
                  fill="#CED5E3"
                />
              </svg>
            </span>
            <h3
              className="text-[#CED5E3] font-[400] text-[16px] md:text-[18px] leading-[44px]
             font-['Neuropolitical'] not-italic uppercase"
            >
              RECOMMENDED
            </h3>
          </div>

          <button className="hidden md:flex items-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-[176px] h-[44px] 
                             bg-gradient-to-r from-[#424242] to-[#6B6B6B]
                             text-[#fff] font-[600] text-[16px] 
                             font-['Neue_Plack',sans-serif]
                             rounded-lg shadow-md 
                             transition-all duration-300
                             hover:from-[#F07730]/90 hover:to-[#EFD28E]/90
                             flex items-center justify-center"
            >
              To The Casino
            </motion.button>
          </button>
        </motion.div>

        {/* Games Container */}
        <div className="relative">
          {/* Scroll Buttons - Desktop Only */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12  /80 border border-white/10 rounded-full items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              ←
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12  /80 border border-white/10 rounded-full items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              →
            </button>
          )}

          {/* Games Grid */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide pb-4"
          >
            <div className="grid grid-flow-col auto-cols-[87px] sm:auto-cols-[180px] md:auto-cols-[145px] gap-3 md:gap-3">
              {gamesData.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                >
                  <div className="relative h-24 md:h-48 rounded-2xl overflow-hidden">
                    {/* Background Gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-90`}
                    />

                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)`,
                        }}
                      />
                    </div>

                    {/* Badge */}
                    {/* {game.badge && (
                      <span
                        className={`absolute top-3 right-3 px-2 py-1 ${game.badgeColor} text-white text-xs font-bold rounded-full animate-pulse`}
                      >
                        {game.badge}
                      </span>
                    )} */}

                    {/* Content */}
                    <div className="relative h-full flex flex-col items-center justify-center p-4">
                      <span className="text-5xl md:text-6xl mb-3 group-hover:scale-110 transition-transform">
                        {game.icon}
                      </span>
                      <h3 className="text-[#CED5E3] font-[400] text-[14px] leading-[24px] mb-2">
                        {game.title}
                      </h3>
                      {/* <p className="text-white/70 text-sm">
                        {game.players} playing
                      </p> */}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <button className="w-full py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold border border-white/30 hover:bg-white/30 transition-colors">
                        PLAY NOW
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex md:hidden justify-center mt-8"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full text-white font-semibold hover:scale-105 transition-transform">
            VIEW ALL GAMES
          </button>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default HomeGamesSection;
