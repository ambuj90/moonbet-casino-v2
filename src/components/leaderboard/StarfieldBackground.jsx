import React from "react";
import { motion } from "framer-motion";

const StarfieldBackground = () => {
  // Generate random stars
  const generateStars = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
  };

  const stars = generateStars(200);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-[#13131A] to-black" />

      {/* Animated starfield */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Large glowing orbs */}
      {/* Top left purple orb */}
      <motion.div
        className="absolute -top-48 -left-48 w-96 h-96"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(244, 116, 251, 0.5) 0%, rgba(244, 116, 251, 0) 70%)",
            filter: "blur(100px)",
          }}
        />
      </motion.div>

      {/* Bottom right purple orb */}
      <motion.div
        className="absolute -bottom-48 -right-48 w-96 h-96"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(244, 116, 251, 0.5) 0%, rgba(244, 116, 251, 0) 70%)",
            filter: "blur(100px)",
          }}
        />
      </motion.div>

      {/* Center gold/orange orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
        animate={{
          scale: [0.8, 1, 0.8],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(240, 119, 48, 0.4) 0%, rgba(240, 119, 48, 0) 60%)",
            filter: "blur(120px)",
          }}
        />
      </motion.div>

      {/* Additional smaller orbs for depth */}
      <motion.div
        className="absolute top-1/4 right-1/3 w-64 h-64"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(237, 219, 116, 0.3) 0%, rgba(237, 219, 116, 0) 70%)",
            filter: "blur(80px)",
          }}
        />
      </motion.div>

      {/* Animated gradient overlay for extra depth */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(244, 116, 251, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 80% 50%, rgba(240, 119, 48, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 50% 100%, rgba(237, 219, 116, 0.05) 0%, transparent 40%)
          `,
        }}
      />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />
    </div>
  );
};

export default StarfieldBackground;
