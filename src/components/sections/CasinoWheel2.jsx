// F:\Moonbet Games\casino-frontend\src\components\sections\CasinoWheel2.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const CasinoWheel2 = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    if (!isSpinning) {
      setIsSpinning(true);

      // Random rotation between 3-5 full spins
      const randomRotation = 1080 + Math.random() * 720; // 3-5 rotations
      setRotation((prev) => prev + randomRotation);

      setTimeout(() => {
        setIsSpinning(false);
      }, 4000);
    }
  };

  return (
    <section className="relative w-full py-16 md:py-24 bg-[#080808] overflow-hidden">
      {/* Starry Background */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Text */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm md:text-base max-w-3xl mx-auto">
            Explore our featured games and join us in talking about Virtual
            sports, live casino
          </p>
        </motion.div>

        {/* Wheel Container */}
        <div className="relative max-w-4xl mx-auto">
          <div className="wheel-container relative w-full aspect-[2/1] flex items-end justify-center">
            {/* Rotating Wheel Group */}
            <motion.div
              className="absolute inset-0 flex items-end justify-center"
              style={{ transformOrigin: "center bottom" }}
              animate={{ rotate: rotation }}
              transition={{
                duration: 4,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            >
              {/* Base Wheel Layer */}
              <img
                src="/home-assets/wheel.svg"
                alt="Moon Wheel Base"
                className="wheel-base absolute inset-0 w-full h-full object-contain"
              />

              {/* Top Arc Segments - Positioned as overlays */}
              <img
                src="https://res.cloudinary.com/dyp5px1nj/image/upload/v1760347853/Subtract_2_meg7kn.svg"
                alt="Wheel Segment 1"
                className="wheel-segment segment-1 absolute top-0 left-[12%] w-[20%] h-auto"
              />

              <img
                src="https://res.cloudinary.com/dyp5px1nj/image/upload/v1760347854/Ellipse_7_1_z9dg9u.png"
                alt="Wheel Segment 3"
                className="wheel-segment segment-3 absolute top-[2%] left-[40%] w-[20%] h-auto"
              />
              <img
                src="https://res.cloudinary.com/dyp5px1nj/image/upload/v1760347852/Subtract_3_rcrqih.svg"
                alt="Wheel Segment 4"
                className="wheel-segment segment-4 absolute top-0 right-[28%] w-[15%] h-auto"
              />

              <img
                src="https://res.cloudinary.com/dyp5px1nj/image/upload/v1760347852/Subtract_2_cqhvgl.png"
                alt="Wheel Segment 6"
                className="wheel-segment segment-6 absolute top-[5%] left-[5%] w-[18%] h-auto opacity-80"
              />

              {/* Center Overlay - Does NOT rotate */}
            </motion.div>

            {/* Center Overlay - Fixed, doesn't rotate */}
            <div className="wheel-center absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[20%] z-20 text-center">
              <h2 className="text-white font-bold text-xl md:text-2xl tracking-[0.2em] leading-tight">
                MOON
                <br />
                <span className="text-lg md:text-xl">ORIGINALS</span>
              </h2>
            </div>

            {/* Top Center Card - Blackjack (Fixed Position) */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
              animate={{
                scale: isSpinning ? [1, 1.08, 1] : 1,
                y: isSpinning ? [-20, -25, -20] : -20,
              }}
              transition={{
                duration: 0.6,
                repeat: isSpinning ? Infinity : 0,
              }}
            >
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-br from-cyan-400 via-blue-600 to-cyan-700 rounded-3xl blur-2xl opacity-50 animate-pulse" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Spin Button */}
        <motion.div
          className="flex justify-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            onClick={handleSpin}
            disabled={isSpinning}
            className="group relative px-10 md:px-14 py-4 md:py-5 bg-white/5 backdrop-blur-2xl border-2 border-white/20 rounded-full font-bold text-white text-base md:text-lg overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-cyan-400/60 hover:bg-white/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
              animate={{
                x: isSpinning ? ["-200%", "200%"] : "-200%",
              }}
              transition={{
                duration: 1.5,
                repeat: isSpinning ? Infinity : 0,
                ease: "linear",
              }}
            />

            <span className="relative z-10 flex items-center gap-3">
              <span className="text-2xl md:text-3xl">🎯</span>
              <span className="tracking-[0.15em]">
                {isSpinning ? "SPINNING..." : "SPIN AND WIN"}
              </span>
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Ambient Glow Effects */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-cyan-500/8 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-blue-600/8 blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
};

export default CasinoWheel2;
