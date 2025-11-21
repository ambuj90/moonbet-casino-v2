// F:\Moonbet Games\casino-frontend\src\components\sections\CasinoWheel.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const CasinoWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  // Wheel segments data
  const segments = [
    { id: 1, color: "#D1D5DB", darkColor: "#6B7280" },
    { id: 2, color: "#F3F4F6", darkColor: "#9CA3AF" },
    { id: 3, color: "#D1D5DB", darkColor: "#6B7280" },
    { id: 4, color: "#F3F4F6", darkColor: "#9CA3AF" },
    { id: 5, color: "#D1D5DB", darkColor: "#6B7280" },
    { id: 6, color: "#F3F4F6", darkColor: "#9CA3AF" },
    { id: 7, color: "#D1D5DB", darkColor: "#6B7280" },
    { id: 8, color: "#F3F4F6", darkColor: "#9CA3AF" },
  ];

  const segmentAngle = 360 / segments.length;

  const handleSpin = () => {
    if (!isSpinning) {
      setIsSpinning(true);
      const randomSpin = 1800 + Math.random() * 1800; // 5-10 rotations
      setRotation(rotation + randomSpin);

      setTimeout(() => {
        setIsSpinning(false);
      }, 4000);
    }
  };

  return (
    <section className="relative w-full py-20   overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 via-black to-black" />

      {/* Section Title */}
      <motion.div
        className="text-center mb-12 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
          Moon Originals
        </h2>
        <p className="text-white/70 text-lg">
          Try your luck with our exclusive casino wheel
        </p>
      </motion.div>

      {/* Wheel Container */}
      <div className="relative w-full flex items-center justify-center">
        <div className="relative w-full max-w-[700px] h-[300px] md:h-[400px] flex items-end justify-center px-4">
          {/* Wheel SVG */}
          <motion.svg
            viewBox="0 0 400 200"
            className="w-full h-full"
            style={{ originX: 0.5, originY: 1 }}
            animate={{ rotate: rotation }}
            transition={{
              duration: 4,
              ease: [0.17, 0.67, 0.12, 0.99],
              times: [0, 1],
            }}
          >
            <defs>
              {/* Gradient for center circle */}
              <radialGradient id="centerGradient" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#1a1a1a" />
                <stop offset="100%" stopColor="#0a0a0a" />
              </radialGradient>

              {/* Neon glow for center */}
              <filter id="neonGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Wheel segments */}
            {segments.map((segment, index) => {
              const startAngle = (index * segmentAngle - 90) * (Math.PI / 180);
              const endAngle =
                ((index + 1) * segmentAngle - 90) * (Math.PI / 180);
              const outerRadius = 195;
              const innerRadius = 80;

              const x1 = 200 + Math.cos(startAngle) * innerRadius;
              const y1 = 200 + Math.sin(startAngle) * innerRadius;
              const x2 = 200 + Math.cos(startAngle) * outerRadius;
              const y2 = 200 + Math.sin(startAngle) * outerRadius;
              const x3 = 200 + Math.cos(endAngle) * outerRadius;
              const y3 = 200 + Math.sin(endAngle) * outerRadius;
              const x4 = 200 + Math.cos(endAngle) * innerRadius;
              const y4 = 200 + Math.sin(endAngle) * innerRadius;

              const pathData = `
                M ${x1} ${y1}
                L ${x2} ${y2}
                A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3}
                L ${x4} ${y4}
                A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1}
                Z
              `;

              // Create darker inner segment
              const midRadius = (outerRadius + innerRadius) / 2;
              const x1Mid = 200 + Math.cos(startAngle) * innerRadius;
              const y1Mid = 200 + Math.sin(startAngle) * innerRadius;
              const x2Mid = 200 + Math.cos(startAngle) * midRadius;
              const y2Mid = 200 + Math.sin(startAngle) * midRadius;
              const x3Mid = 200 + Math.cos(endAngle) * midRadius;
              const y3Mid = 200 + Math.sin(endAngle) * midRadius;
              const x4Mid = 200 + Math.cos(endAngle) * innerRadius;
              const y4Mid = 200 + Math.sin(endAngle) * innerRadius;

              const darkPathData = `
                M ${x1Mid} ${y1Mid}
                L ${x2Mid} ${y2Mid}
                A ${midRadius} ${midRadius} 0 0 1 ${x3Mid} ${y3Mid}
                L ${x4Mid} ${y4Mid}
                A ${innerRadius} ${innerRadius} 0 0 0 ${x1Mid} ${y1Mid}
                Z
              `;

              return (
                <g key={segment.id}>
                  {/* Outer segment */}
                  <path
                    d={pathData}
                    fill={segment.color}
                    stroke="#000"
                    strokeWidth="1"
                  />
                  {/* Inner darker segment */}
                  <path
                    d={darkPathData}
                    fill={segment.darkColor}
                    stroke="#000"
                    strokeWidth="1"
                  />
                </g>
              );
            })}

            {/* Center circle with gradient */}
            <circle
              cx="200"
              cy="200"
              r="75"
              fill="url(#centerGradient)"
              stroke="#333"
              strokeWidth="2"
            />

            {/* Center content container */}
            <foreignObject x="125" y="125" width="150" height="150">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white text-xs font-bold tracking-wider mb-1">
                    MOON
                  </div>
                  <div className="text-white text-xs font-bold tracking-wider">
                    ORIGINALS
                  </div>
                </div>
              </div>
            </foreignObject>
          </motion.svg>

          {/* Blackjack Card - Positioned at top center */}
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="relative w-24 h-32 md:w-32 md:h-40 perspective-1000">
              {/* Card with 3D effect */}
              <div className="relative w-full h-full rounded-lg bg-gradient-to-br from-cyan-400 via-blue-500 to-cyan-600 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                {/* Neon glow effect */}
                <div className="absolute inset-0 rounded-lg bg-cyan-400/50 blur-xl animate-pulse" />

                {/* Card content */}
                <div className="relative w-full h-full rounded-lg border-2 border-cyan-300/50 backdrop-blur-sm flex flex-col items-center justify-center p-2 md:p-3 bg-gradient-to-br from-cyan-500/80 to-blue-600/80">
                  {/* Playing cards icons */}
                  <div className="flex gap-1.5 md:gap-2 mb-1.5 md:mb-2">
                    <div className="w-6 h-8 md:w-8 md:h-10 bg-white rounded shadow-lg flex items-center justify-center">
                      <span className="text-red-600 text-base md:text-xl">
                        ♠
                      </span>
                    </div>
                    <div className="w-6 h-8 md:w-8 md:h-10 bg-white rounded shadow-lg flex items-center justify-center">
                      <span className="text-red-600 text-base md:text-xl">
                        ♦
                      </span>
                    </div>
                  </div>

                  {/* Blackjack text */}
                  <div className="text-white font-bold text-xs md:text-sm tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    BLACKJACK
                  </div>

                  {/* Infinity symbol */}
                  <div className="text-cyan-200 text-xl md:text-2xl mt-0.5 md:mt-1 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">
                    ∞
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Spin button */}
      <motion.div
        className="flex justify-center mt-12 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          onClick={handleSpin}
          disabled={isSpinning}
          className="px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Button glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300" />

          <span className="relative z-10">
            {isSpinning ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Spinning...
              </span>
            ) : (
              "Spin the Wheel"
            )}
          </span>
        </motion.button>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

export default CasinoWheel;
