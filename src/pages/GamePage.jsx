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
  const { gameId } = useParams(); // actually the game name
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

  // React to login/logout instantly
  useEffect(() => {
    if (!isLoggedIn) {
      // 👇 if logged out while playing Real
      if (isRealPlay) {
        toast.info("You have logged out — switching to Fun Play...");
        setIsRealPlay(false);
        setLoading(true);
      }
    }
  }, [isLoggedIn]);

  // Utility to toggle fullscreen
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

  useEffect(() => {
    // Whenever another component updates preferredCurrency in localStorage
    const handleCurrencyChange = () => {
      const newCurrency = localStorage.getItem("preferredCurrency") || "BTC";
      setPreferredCurrency(newCurrency);
    };

    window.addEventListener("currencyChanged", handleCurrencyChange);

    return () => {
      window.removeEventListener("currencyChanged", handleCurrencyChange);
    };
  }, []);

  useEffect(() => {
    // ✅ When preferredCurrency is updated via conversion API
    const handlePreferredCurrencyUpdate = () => {
      const newCurrency = localStorage.getItem("preferredCurrency") || "USD";
      console.log(
        "💱 preferredCurrency updated → restarting game init:",
        newCurrency
      );
      setPreferredCurrency(newCurrency);

      // ✅ Force reload game init with the new currency
      // This will trigger the useEffect that depends on preferredCurrency
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

  useEffect(() => {
    const fetchGameUrl = async () => {
      try {
        // 🕹 Step 1: Fetch all games
        const res = await axios.get("/wallet-service/api/games");
        const allGames = res.data?.data || [];

        const game = allGames.find(
          (g) =>
            g.name.toLowerCase() === decodeURIComponent(gameId).toLowerCase()
        );

        if (!game) {
          toast.error("Game not found!");
          return;
        }

        setGameData(game);

        // 🎮 Step 2: Initialize depending on play mode
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
          // Real Play payload
          const preferredCurrency =
            localStorage.getItem("gameCurrency") || "USD";
          initUrl = `/wallet-service/api/games/${game.uuid}/init`;
          payload = {
            player_id: user.id || "68eb94c22a7983ea19b0bd6a",
            player_name: user.username || "Guest Player",
            currency: preferredCurrency,
            device: "desktop",
            language: "en",
            email: user.email || "ashtavinayaksharma555@gmail.com",
            return_url: `${window.location.origin}/game-return`,
          };
        } else {
          // Fun Play payload
          initUrl = `/wallet-service/api/games/${game.uuid}/init-demo`;
          payload = {
            device: "desktop",
            language: "en",
            return_url: window.location.origin,
          };
        }

        const { data: initData } = await axios.post(initUrl, payload);

        if (initData.success && initData.data?.url) {
          setIframeUrl(initData.data.url);
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
  }, [gameId, isRealPlay, preferredCurrency, navigate]);

  useEffect(() => {
    // Always scroll to the top when this page mounts or when a new game is loaded
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [gameId]);

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
          // Optionally update a global balance state if you use Recoil/Context
        }
      } catch (err) {
        console.error("❌ Error fetching balance:", err.message);
      }
    };

    // fetch immediately + every 10s
    fetchBalance();
    const interval = setInterval(fetchBalance, 10000);

    return () => clearInterval(interval);
  }, [isRealPlay]);

  const handlePlayToggle = () => {
    if (isRealPlay) {
      // Switching back to Fun play
      setLoading(true);
      setIsRealPlay(false);
    } else {
      // Switching to Real play → check login first
      const token = localStorage.getItem("token");
      if (!token) {
        toast.warning("Please log in to play for real money!");
        setShowLogin(true); // 👈 open login popup instead of navigating
        return;
      }
      setLoading(true);
      setIsRealPlay(true);
    }
  };

  // useEffect(() => {
  //   const fetchGameUrl = async () => {
  //     try {
  //       // Step 1: Get all games
  //       const res = await fetch("https://mapi.examtree.ai/wallet-service/api/games");
  //       const data = await res.json();
  //       const game = data?.games?.items?.find(
  //         (g) => g.name.toLowerCase() === decodeURIComponent(gameId).toLowerCase()
  //       );

  //       if (!game) {
  //         toast.error("Game not found!");
  //         return;
  //       }

  //       setGameData(game);

  //       // Step 2: Call init-demo API with that UUID
  //       const initRes = await fetch(
  //         `https://mapi.examtree.ai/wallet-service/api/games/${game.uuid}/init-demo`,
  //         {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({
  //             device: "desktop",
  //             language: "en",
  //             return_url: window.location.origin,
  //           }),
  //         }
  //       );

  //       const initData = await initRes.json();
  //       if (initData.success && initData.data?.url) {
  //         setIframeUrl(initData.data.url);
  //       } else {
  //         throw new Error("Failed to initialize demo game");
  //       }
  //     } catch (error) {
  //       console.error("Error loading game:", error);
  //       toast.error(error.message || "Unable to load game");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchGameUrl();
  // }, [gameId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen   text-white text-xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-transparent bg-clip-text bg-gradient-to-r from-[#F07730] via-[#EFD28E] to-[#F07730] text-2xl sm:text-3xl font-bold blur-[0.3px]"
        >
          {isRealPlay
            ? "Loading for Real gamePlay..."
            : "Loading for Fun Play..."}
        </motion.div>

        {/* Shimmer bar effect */}
        <div className="mt-6 w-64 h-2 rounded-full bg-gradient-to-r from-[#F07730]/20 via-[#EFD28E]/30 to-[#F07730]/20 overflow-hidden">
          <motion.div
            className="h-full w-1/3 bg-gradient-to-r from-[#F07730] via-[#EFD28E] to-[#F07730]"
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
      <div className="h-full   flex flex-col">
        <div
          className="iframe-wrapper"
          style={{
            flex: 1,
            overflowY: "auto", // enables parent scroll
            overflowX: "hidden",
            position: "relative",
          }}
        >
          <iframe
            ref={iframeRef}
            src={iframeUrl}
            title={gameData?.name || "Game"}
            className="w-full  h-[82vh] border-none pointer-events-auto md:px-[10%] px-[4%]"
            allowFullScreen
          />
        </div>

        {/* Bottom Control Bar with Glassmorphism */}
        <div
          className="relative bg-white/5 backdrop-blur-xl border-t border-white/20"
          style={{
            height: "10vh",
            width: "80%",
            margin: "auto",
            minHeight: "30px",
            background:
              "linear-gradient(135deg, rgba(30, 36, 51, 0.8) 0%, rgba(20, 25, 40, 0.9) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow:
              "0 -4px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Glass overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 pointer-events-none"></div>

          <div className="relative h-full flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-4">
            {/* Left Side - Game Info with 80px margin */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6 ml-0 sm:ml-10 md:ml-16 lg:ml-20">
              {/* 80px margin: ml-20 = 80px on large screens, scales down on smaller screens */}

              {/* Rainbet Logo */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#F07730] to-[#EFD28E] flex items-center justify-center shadow-lg shadow-[#F07730]/30">
                  <span className="text-white font-bold text-sm sm:text-base md:text-lg">
                    R
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm md:text-base text-white">
                    {gameData.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-400">
                    {gameData.provider}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Control Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              {/* Screenshot Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-1.5 sm:p-2 md:p-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-gray-300 hover:text-white backdrop-blur-sm border border-white/10"
                title="Screenshot"
              >
                <svg
                  width="20"
                  height="20"
                  className="sm:w-6 sm:h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </motion.button>

              {/* 🆕 Fullscreen Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleFullScreen(iframeRef)}
                className="p-1.5 sm:p-2 md:p-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-gray-300 hover:text-white backdrop-blur-sm border border-white/10"
                title="Fullscreen"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="sm:w-6 sm:h-6"
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

              {/* Divider */}
              <div className="hidden md:block w-px h-8 bg-white/30 mx-1 md:mx-2"></div>

              {/* Play Mode Toggle */}
              <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
                <span
                  className={`text-[10px] sm:text-xs md:text-sm font-semibold transition-colors duration-300 ${
                    !isRealPlay ? "text-blue-400" : "text-gray-400"
                  }`}
                >
                  Fun Play
                </span>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlayToggle}
                  className={`relative w-12 h-6 sm:w-14 sm:h-7 md:w-16 md:h-8 rounded-full transition-all backdrop-blur-sm border ${
                    isRealPlay
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/40 border-blue-400/50"
                      : "bg-white/20 border-white/10"
                  }`}
                >
                  <motion.div
                    animate={{
                      x: isRealPlay
                        ? window.innerWidth < 640
                          ? 24
                          : window.innerWidth < 768
                          ? 28
                          : 32
                        : 2,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                    className="absolute top-0.5 sm:top-1 w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 bg-white rounded-full shadow-lg"
                  />
                </motion.button>

                <span
                  className={`text-[10px] sm:text-xs md:text-sm font-semibold transition-colors duration-300 ${
                    isRealPlay ? "text-blue-400" : "text-gray-400"
                  }`}
                >
                  Real Play
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" ">
        <GamesYouLike
          provider={gameData?.provider}
          excludeGame={gameData?.name}
        />
        <ProvidersSection />
        <GameBetsSection />
      </div>
      {!hasToken ||
        (showLogin && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            <LoginTrigger
              buttonText=""
              defaultTab="login"
              forceOpen={true} // 👈 triggers modal immediately
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
        ))}
    </>
  );
};

export default GamePage;
