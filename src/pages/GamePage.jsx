// src/pages/GamePage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import api from "../api/axios";
import axios from "axios";
import GameBetsSection from "../components/sections/GameBetsSection";
import RecommendedSection from "../components/sections/RecommendedSection";
import ProvidersSection from "../components/sections/ProvidersSection";
import { LoginTrigger } from "../components/LoginSignup/LoginTrigger";
import { useAuthStore } from "../store/useAuthStore";
import GamesYouLike from "../components/sections/GamesYouLike";

const GamePage = () => {
  const { game_uuid, slug } = useParams();
  const navigate = useNavigate();
  const iframeRef = useRef(null);
  const { isLoggedIn } = useAuthStore();
  const [gameData, setGameData] = useState(null);
  const [iframeUrl, setIframeUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [isRealPlay, setIsRealPlay] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [hasToken, setHasToken] = useState(!!localStorage.getItem("token"));
  const [preferredCurrency, setPreferredCurrency] = useState(
    localStorage.getItem("preferredCurrency") || "BTC"
  );

  // React to login/logout
  useEffect(() => {
    if (!isLoggedIn && isRealPlay) {
      toast.info("You have logged out — switching to Fun Play...");
      setIsRealPlay(false);
      setLoading(true);
    }
  }, [isLoggedIn, isRealPlay]);

  // Fullscreen toggle
  const toggleFullScreen = (iframeRef) => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      iframe.requestFullscreen?.() ||
        iframe.webkitRequestFullscreen?.() ||
        iframe.mozRequestFullScreen?.() ||
        iframe.msRequestFullscreen?.();
    }
  };

  // Listen for preferredCurrency change (events)
  useEffect(() => {
    const handleCurrencyChange = () => {
      const newCurrency = localStorage.getItem("preferredCurrency") || "BTC";
      setPreferredCurrency(newCurrency);
    };

    window.addEventListener("currencyChanged", handleCurrencyChange);
    return () =>
      window.removeEventListener("currencyChanged", handleCurrencyChange);
  }, []);

  useEffect(() => {
    const handlePreferredCurrencyUpdate = () => {
      const newCurrency = localStorage.getItem("preferredCurrency") || "USD";
      console.log(
        "💱 preferredCurrency updated → restarting game init:",
        newCurrency
      );
      setPreferredCurrency(newCurrency);
    };

    window.addEventListener(
      "preferredCurrencyUpdated",
      handlePreferredCurrencyUpdate
    );

    return () => {
      window.removeEventListener(
        "preferredCurrencyUpdated",
        handlePreferredCurrencyUpdate
      );
    };
  }, []);

  // Load game URL
  useEffect(() => {
    const fetchGameUrl = async () => {
      try {
        const { data } = await axios.get(
          `/wallet-service/api/games/${game_uuid}/details`
        );

        if (!data.success) {
          toast.error("Game not found!");
          return;
        }

        const game = data.data;
        setGameData(game);

        let initUrl;
        let payload;

        if (isRealPlay) {
          const token = localStorage.getItem("token");
          const user = JSON.parse(localStorage.getItem("user") || "{}");

          if (!token || !user?.id) {
            toast.warning("Please log in to play for real money!");
            setShowLogin(true);
            return;
          }

          const preferredCurrency =
            localStorage.getItem("gameCurrency") || "USD";

          initUrl = `/wallet-service/api/games/${game_uuid}/init`;
          payload = {
            player_id: user.id,
            player_name: user.username || "Guest Player",
            currency: preferredCurrency,
            device: "desktop",
            language: "en",
            email: user.email,
            return_url: `${window.location.origin}/game-return/${game_uuid}`,
          };
        } else {
          initUrl = `/wallet-service/api/games/${game_uuid}/init-demo`;
          payload = {
            device: "desktop",
            language: "en",
            return_url: `${window.location.origin}/game-return/${game_uuid}`,
          };
        }

        const initData = await axios.post(initUrl, payload);

        if (initData.data.success && initData.data.data?.url) {
          setIframeUrl(initData.data.data.url);
        } else {
          throw new Error("Failed to initialize game session");
        }
      } catch (error) {
        console.error("❌ Error loading game:", error);
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Unable to load game"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGameUrl();
  }, [game_uuid, isRealPlay, preferredCurrency, navigate]);

  // Scroll top when changing game
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [game_uuid]);

  // Poll balance on real play
  useEffect(() => {
    if (!isRealPlay) return;

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user?.id) return;

    const fetchBalance = async () => {
      try {
        const res = await axios.get(
          `/wallet-service/api/wallet/${user.id}/balance`
        );
        if (res.data?.balance !== undefined) {
          console.log("💰 Updated balance:", res.data.balance);
          localStorage.setItem("balance", res.data.balance);
        }
      } catch (err) {
        console.error("❌ Error fetching balance:", err.message);
      }
    };

    fetchBalance();
    const interval = setInterval(fetchBalance, 10000);
    return () => clearInterval(interval);
  }, [isRealPlay]);

  const handlePlayToggle = () => {
    if (isRealPlay) {
      setLoading(true);
      setIsRealPlay(false);
    } else {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.warning("Please log in to play for real money!");
        setShowLogin(true);
        return;
      }
      setLoading(true);
      setIsRealPlay(true);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white text-xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-transparent bg-clip-text bg-gradient-to-r from-[#5A3799] to-[#DC1FFF] text-2xl sm:text-3xl font-bold blur-[0.3px]"
        >
          {isRealPlay
            ? "Loading for Real gamePlay..."
            : "Loading for Fun Play..."}
        </motion.div>

        <div className="mt-6 w-64 h-2 rounded-full bg-gradient-to-r from-[#F07730]/20 via-[#EFD28E]/30 to-[#F07730]/20 overflow-hidden">
          <motion.div
            className="h-full w-1/3 bg-gradient-to-r from-[#5A3799] to-[#DC1FFF]"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    );
  }

  if (!iframeUrl) {
    return (
      <div className="flex items-center justify-center h-screen text-red-400 text-xl">
        Failed to load game.
      </div>
    );
  }

  return (
    <>
      <div className="container h-full relative flex flex-col max-w-7xl mx-auto px-4">
        <div
          className="iframe-wrapper"
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            position: "relative",
          }}
        >
          <iframe
            ref={iframeRef}
            src={iframeUrl}
            title={gameData?.name || "Game"}
            className="w-full h-[82vh] border-none pointer-events-auto"
            allowFullScreen
          />
        </div>

        {/* Bottom Control Bar with Glassmorphism */}
        <div className="trust_btn w-full min-h-[64px] px-4 sm:px-6 md:px-6 relative bg-[var(--container-dark-purple-3)] backdrop-blur-xl">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "var(--glass-highlight)",
              borderRadius: "8px",
            }}
          />

          {/* Responsive Inner Layout */}
          <div
            className="
              relative w-full 
              flex flex-col sm:flex-row 
              sm:items-center 
              sm:justify-between 
              gap-3 sm:gap-4 
              py-2
            "
          >
            {/* LEFT SIDE — Logo + Game Info */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                <img
                  src="/home-assets/mobile-logo.svg"
                  alt="Moonbet Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="min-w-0">
                <h3 className="font-bold text-xs sm:text-sm md:text-base text-[var(--text-light-grey)] truncate max-w-[140px] sm:max-w-[220px] md:max-w-none">
                  {gameData.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-[var(--text-lavender-2)] truncate max-w-[160px] sm:max-w-none">
                  {gameData.provider}
                </p>
              </div>
            </div>

            {/* RIGHT SIDE — Buttons & Play Toggle */}
            <div
              className="
                flex flex-wrap 
                items-center 
                justify-end 
                gap-2 sm:gap-3 md:gap-4 
                w-full sm:w-auto
              "
            >
              {/* Rakeback Available Box */}
              <div
                className="
                  flex items-center gap-2 sm:gap-3 
                  px-3 py-2 
                  rounded-xl 
                  bg-[var(--glass-white-10)] 
                  border border-[var(--glass-white-20)] 
                  backdrop-blur-md 
                  shadow-[0_4px_12px_rgba(0,0,0,0.25)]
                  max-w-full flex-shrink
                "
              >
                <div className="text-[var(--text-lavender-2)] text-xs sm:text-sm font-semibold whitespace-nowrap">
                  Rakeback
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <div
                    className="
                      w-4 h-4 sm:w-5 sm:h-5 
                      rounded-full flex items-center justify-center 
                      bg-[var(--cta2-green)] 
                      text-[var(--black)] 
                      text-[10px] sm:text-xs font-extrabold 
                      shadow-md
                    "
                  >
                    $
                  </div>

                  <span className="text-sm sm:text-base font-semibold">0</span>

                  <button
                    className="
                      px-2 py-1 
                      rounded-lg text-[10px] sm:text-xs font-bold 
                      text-[var(--text-light-grey)]
                      transition-all flex-shrink-0
                    "
                    style={{
                      background:
                        "linear-gradient(180deg, var(--cta2-light-green) 0%, var(--cta2-green) 100%)",
                      border: "1px solid var(--cta2-green)",
                      boxShadow: "0 0 10px rgba(40,194,3,0.35)",
                    }}
                  >
                    Claim
                  </button>
                </div>
              </div>

              {/* Screenshot Button (Desktop only) */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  p-2 
                  hidden md:flex 
                  rounded-lg 
                  bg-[var(--bg-dark-purple-2)] 
                  hover:bg-[var(--glass-white-10)]
                  text-[var(--text-light-grey)] 
                  transition-all flex-shrink-0
                "
                title="Screenshot"
              >
                <svg
                  width="20"
                  height="20"
                  className="sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </motion.button>

              {/* Fullscreen Button — ALWAYS VISIBLE, NEVER SHRINKS AWAY */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleFullScreen(iframeRef)}
                className="
                  p-2 
                  rounded-lg 
                  bg-[var(--bg-dark-purple-2)] 
                  hover:bg-[var(--glass-white-10)] 
                  text-[var(--text-light-grey)] 
                  transition-all 
                  flex-shrink-0
                "
                title="Fullscreen"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8V4h4M4 16v4h4m12-4v4h-4m4-12V4h-4"
                  />
                </svg>
              </motion.button>

              {/* Divider (Desktop only) */}
              <div className="hidden md:block w-px h-8 bg-[var(--glass-white-20)]" />

              {/* Toggle (Fun / Real) */}
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
                <span
                  className={`
                    text-[10px] sm:text-xs md:text-sm font-semibold
                    ${
                      !isRealPlay
                        ? "text-[var(--cta-pink)]"
                        : "text-[var(--text-light-grey)]"
                    }
                  `}
                >
                  Fun Play
                </span>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlayToggle}
                  className="
                    relative 
                    w-12 h-6 sm:w-14 sm:h-7 md:w-16 md:h-8 
                    rounded-full p-1 
                    flex items-center 
                    transition-all 
                    bg-[var(--bg-dark-purple-2)] 
                    flex-shrink-0
                  "
                >
                  <motion.div
                    animate={{ x: isRealPlay ? "150%" : "0%" }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 28,
                    }}
                    className="w-4 h-4 sm:w-5 sm:h-5 bg-[var(--white)] rounded-full shadow-md"
                  />
                </motion.button>

                <span
                  className={`
                    text-[10px] sm:text-xs md:text-sm font-semibold
                    ${
                      isRealPlay
                        ? "text-[var(--cta-pink)]"
                        : "text-[var(--text-lavender-2)]"
                    }
                  `}
                >
                  Real Play
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="game-you-may-like">
        <GamesYouLike
          provider={gameData?.provider}
          excludeGame={gameData?.name}
        />
        <ProvidersSection />
        <GameBetsSection />
      </div>

      {/* Login Modal */}
      {(!hasToken || showLogin) && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <LoginTrigger
            buttonText=""
            defaultTab="login"
            forceOpen={true}
            onLoginSuccess={() => {
              setShowLogin(false);
              setIsRealPlay(true);
            }}
            onSignupSuccess={() => {
              setShowLogin(false);
              setIsRealPlay(true);
            }}
            className=""
          />
        </div>
      )}
    </>
  );
};

export default GamePage;
