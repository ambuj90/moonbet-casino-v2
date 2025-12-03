import React from "react";
import { motion } from "framer-motion";

const StarfieldBackground = () => {
  // Generate tiny star particles
  const generateStars = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.4 + 0.4,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 1.5,
    }));
  };

  const stars = generateStars(140);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* ====== BASE GRADIENT BACKGROUND ====== */}
      <div className="absolute inset-0" />

      {/* ====== TOP ELLIPSE PURPLE ARC (your asset) ====== */}
      <img
        src="/leaderboard-assets/background-top-ellipses.svg"
        alt="bg ellipse"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[99%] opacity-90"
        style={{
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      {/* ====== STAR PARTICLES (twinkling dots) ====== */}
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
              opacity: 0.5,
            }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.7, 1.2, 0.7],
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

      {/* ====== LEFT PURPLE GLOW ORB ====== */}
      <motion.div
        className="absolute -top-40 -left-40 w-[420px] h-[420px]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-full h-full rounded-full" />
      </motion.div>

      {/* ====== RIGHT SOFT PURPLE GLOW ====== */}
      <motion.div
        className="absolute top-1/3 -right-40 w-[360px] h-[360px]"
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.15, 0.3, 0.15],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(200,140,255,0.4) 0%, rgba(200,140,255,0) 70%)",
            filter: "blur(90px)",
          }}
        />
      </motion.div>

      {/* ====== CENTER DEPTH ORB (very subtle) ====== */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px]"
        animate={{
          scale: [0.9, 1.05, 0.9],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(120,60,255,0.35) 0%, rgba(120,60,255,0) 60%)",
            filter: "blur(160px)",
          }}
        />
      </motion.div>

      {/* ====== FINE NOISE GRID OVERLAY ====== */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "90px 90px",
        }}
      />

      {/* ====== SUBTLE CENTER AURA GRADIENT ====== */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.06) 0%, transparent 60%)",
        }}
      />
    </div>
  );
};

export default StarfieldBackground;
