import React from "react";
import { motion } from "framer-motion";

const VipMoonSection = () => {
  const cards = [
    {
      image: "/home-assets/astronomical.svg",
    },
    {
      image: "/home-assets/vip-moon.svg",
      isCenter: true,
    },
    {
      image: "/home-assets/astronomical.svg",
    },
  ];

  return (
    <div
      className="relative z-[9999] flex items-center justify-center py-16 px-4 md:px-8 overflow-hidden"
      style={{
        background:
          "radial-gradient(50% 46.86% at 50% 0%, rgba(239, 210, 142, 0.55) 0%, rgba(240, 119, 48, 0.55) 25.87%, rgba(147, 56, 3, 0.55) 52.57%, rgba(65, 25, 1, 0.55) 78.58%, rgba(0, 0, 0, 0.55) 100%)",
        backgroundColor: "#000",
      }}
    >
      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                z: 50,
              }}
              className={`relative group cursor-pointer w-full max-w-sm ${
                card.isCenter ? "md:scale-110" : ""
              }`}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              {/* Glass / Glow Card Container */}
              <div
                className="relative rounded-2xl overflow-hidden backdrop-blur-lg border border-white/20
                  bg-[#080808]/40 shadow-2xl transition-all duration-500
                  group-hover:shadow-amber-500/40 group-hover:border-amber-400/40"
              >
                {/* Neon Glow Overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                ></div>

                {/* Image */}
                <motion.img
                  src={card.image}
                  alt="vip-moon-card"
                  className="w-full h-auto object-contain md:object-cover"
                  style={{
                    display: "block",
                    aspectRatio: "16/9",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VipMoonSection;
