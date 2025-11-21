// src/pages/Premium404.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Premium404 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/"), 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  const floatingCoins = ["₿", "Ξ", "◎", "🪙", "Ξ", "₿"];

  return (
    <div className="min-h-screen w-full bg-[#080808] overflow-hidden flex flex-col items-center justify-center relative">

      {/* ===== STARFIELD ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 55 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: Math.random() * 3 + 2,
              height: Math.random() * 3 + 2,
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animation: `twinkle ${2 + Math.random() * 4}s infinite ease-in-out`,
            }}
          />
        ))}

        <style>
          {`
            @keyframes twinkle {
              0% { opacity: 0.2; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.3); }
              100% { opacity: 0.2; transform: scale(1); }
            }
          `}
        </style>
      </div>

      {/* ===== FLOATING COINS ===== */}
      {floatingCoins.map((coin, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl md:text-3xl opacity-40 pointer-events-none"
          initial={{ y: -200, x: Math.random() * window.innerWidth }}
          animate={{ y: ["0%", "120%"] }}
          transition={{
            duration: 6 + i * 1.2,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            left: `${Math.random() * 100}%`,
          }}
        >
          {coin}
        </motion.div>
      ))}

      {/* ===== SOFT MOON GLOW BEHIND 404 ===== */}
      <div className="absolute top-1/3 w-[450px] h-[450px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(239,210,142,0.4), transparent 60%)",
        }}
      />

      {/* ===== SLOT MACHINE STYLE 404 ===== */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0, rotate: -6 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-[120px] sm:text-[160px] font-extrabold flex gap-6"
      >
        {["4", "0", "4"].map((n, index) => (
          <motion.div
            key={index}
            initial={{ y: -200, rotateX: -90 }}
            animate={{ y: 0, rotateX: 0 }}
            transition={{ duration: 0.7 + index * 0.2 }}
            className="w-28 h-32 sm:w-36 sm:h-40 
                       bg-gradient-to-b from-[#F07730] to-[#EFD28E]
                       rounded-lg flex items-center justify-center text-black 
                       shadow-[0_0_40px_rgba(240,119,48,0.6)]
                       border border-[#EFD28E]/30"
            style={{
              textShadow: "0 0 10px rgba(255,255,255,0.3)",
            }}
          >
            {n}
          </motion.div>
        ))}
      </motion.div>

      {/* ===== NEON PAGE NOT FOUND ===== */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-4 text-xl sm:text-2xl text-[#EFD28E] font-light tracking-widest 
                   drop-shadow-[0_0_10px_rgba(239,210,142,0.8)]"
      >
        PAGE NOT FOUND
      </motion.p>

      {/* ===== FLOATING ASTRONAUT GIF ===== */}
      <motion.img
        src="/icons/moonlogo.gif"
        alt="MoonBet Astronaut"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: [-12, 12, -12], opacity: 1 }}
        transition={{
          opacity: { delay: 1.2, duration: 0.6 },
          y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
        }}
        className="w-28 mt-8 opacity-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
      />

      {/* ===== REDIRECT TIMER ===== */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-6 text-gray-300 text-sm"
      >
        Redirecting to homepage in{" "}
        <span className="text-[#F07730] font-bold">5 seconds...</span>
      </motion.p>

      {/* ===== BUTTON ===== */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 bg-gradient-to-r from-[#F07730] to-[#EFD28E] 
                   text-black px-6 py-3 rounded-lg font-bold 
                   shadow-lg shadow-[#F07730]/40"
        onClick={() => navigate("/")}
      >
        Go Home Now
      </motion.button>
    </div>
  );
};

export default Premium404;
