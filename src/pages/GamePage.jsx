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

  if (!loading && !iframeUrl) {
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
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#00000080] backdrop-blur-sm">
              <img
                src="/icons/moonlogo.gif"
                alt="Moon Loader"
                className="w-28 h-28 object-contain"
              />
            </div>
          )}
          <iframe
            ref={iframeRef}
            src={iframeUrl}
            title={gameData?.name || "Game"}
            className="w-full h-[82vh] border-none pointer-events-auto"
            allowFullScreen
            onLoad={() => setLoading(false)}
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="153"
                  height="18"
                  viewBox="0 0 153 18"
                  fill="none"
                >
                  <g clip-path="url(#clip0_9689_1433)">
                    <path
                      d="M97.738 0C105.627 0 108.37 1.32704 108.37 5.04492C108.37 6.81364 107.925 8.02067 106.72 8.80371C108.017 9.5471 108.758 10.834 108.758 12.4629C108.757 16.2611 105.923 17.5879 97.8855 17.5879C95.441 17.5879 91.5696 17.206 89.4021 16.8447C89.1791 16.805 89.0682 16.6641 89.0681 16.4033H89.0691V1.24707C89.0691 1.00596 89.18 0.864316 89.4031 0.803711C91.5512 0.421573 95.3483 4.54706e-05 97.738 0ZM123.151 0C125.559 0 127.355 0.2217 128.782 0.523438C128.986 0.563085 129.097 0.703732 129.153 0.905273L129.56 2.93457C129.634 3.23633 129.524 3.35647 129.246 3.2959C127.376 2.9347 124.634 2.79395 123.115 2.79395C117.096 2.79395 114.965 4.08033 114.557 7.45801H129.06C129.282 7.45801 129.413 7.59894 129.413 7.83984V9.58887C129.413 9.84988 129.283 9.97168 129.06 9.97168H114.521C114.928 13.4087 117.04 14.7148 123.115 14.7148C124.634 14.7148 127.375 14.5543 129.246 14.2129C129.524 14.1325 129.634 14.273 129.56 14.5537L129.153 16.584C129.117 16.8052 129.004 16.9248 128.802 16.9854C127.375 17.2871 125.559 17.5283 123.151 17.5283C114.503 17.5282 111.316 14.5932 111.335 8.74414C111.317 2.95481 114.503 8.76675e-05 123.151 0ZM70.1218 0C72.8064 0.000154396 74.3438 1.30624 75.5847 4.74414C75.6953 5.16595 76.5298 7.41892 77.8074 11.1777C78.7327 13.8712 79.2888 14.5947 80.5115 14.5947C81.6224 14.5946 82.1228 13.6089 82.1228 11.3184V0.623047C82.1229 0.362242 82.2337 0.241211 82.4558 0.241211H84.7332C84.9553 0.241211 85.0846 0.361142 85.0847 0.623047V12.7441C85.0847 15.5184 83.3443 17.5088 80.8064 17.5088C78.1205 17.5087 76.6021 16.2022 75.3611 12.7441C75.25 12.3211 74.3607 9.88825 73.1394 6.33105C72.2313 3.63757 71.6566 2.91411 70.4167 2.91406C69.3056 2.91406 68.8054 3.91847 68.8054 6.19043L68.825 16.8848V16.8857C68.8249 17.1466 68.7138 17.2676 68.4724 17.2676H66.1941C65.9721 17.2675 65.8612 17.1476 65.8611 16.8857V4.74414C65.8612 1.95028 67.6034 0 70.1218 0ZM6.39136 0C8.31727 0 9.59566 1.06612 10.447 3.39746C11.3725 5.88975 11.595 9.1678 12.281 10.9365C12.5773 11.7204 12.966 12.203 13.5583 12.2031H14.0027C14.5952 12.2031 15.0023 11.7204 15.2996 10.9365C15.9845 9.1678 16.2068 5.89085 17.114 3.39746C17.9857 1.06599 19.2649 0 21.1726 0H21.8943C24.5245 0 26.0801 1.64899 26.3582 4.52344L27.5632 16.9062L27.5623 16.9053C27.5805 17.1465 27.4876 17.2871 27.2654 17.2871H24.9695C24.729 17.2871 24.5981 17.1465 24.5808 16.9053L23.5623 5.84863C23.3765 3.73905 22.8019 2.89471 21.7468 2.89453H21.2097C20.4314 2.89453 19.8764 3.43771 19.4695 4.70312C18.8587 6.6536 18.6171 9.8089 17.7283 12.1006C17.0251 13.9705 15.9502 15.1357 14.2283 15.1357H13.3396C11.636 15.1357 10.5614 13.9693 9.85718 12.1006C8.96834 9.80892 8.72745 6.6536 8.09741 4.70312C7.70877 3.43661 7.15208 2.89453 6.37378 2.89453H5.81909C4.76289 2.89458 4.20765 3.7389 4.00366 5.84863L3.00366 16.9053C2.98541 17.1463 2.83703 17.287 2.61499 17.2871H0.316162C0.0757461 17.2871 -0.0165537 17.1464 0.00170898 16.9053L1.20483 4.52344C1.48286 1.6491 3.05796 0.000126505 5.6687 0H6.39136ZM152.27 0.242188C152.474 0.242188 152.585 0.362619 152.64 0.583984L152.993 2.6543C153.029 2.93616 152.938 3.07617 152.66 3.07617H143.806V16.8652H143.805C143.805 17.1262 143.694 17.248 143.454 17.248H141.194C140.971 17.2479 140.843 17.1272 140.843 16.8652V3.07617H131.989C131.712 3.07617 131.618 2.93506 131.656 2.6543L132.009 0.583984C132.045 0.362619 132.176 0.242188 132.379 0.242188H152.27ZM103.887 9.70801C102.554 9.94916 100.831 10.0498 98.6091 10.0498H92.0154V14.4932C93.7383 14.7343 96.1644 14.8545 97.4978 14.8545C104.073 14.8545 105.647 14.3117 105.647 12.1006C105.647 10.7944 105.128 10.0494 103.887 9.70801ZM97.3318 2.75488C95.7021 2.75488 93.4979 2.91565 92.0154 3.11719V7.7793H98.2205C103.944 7.77929 105.259 7.33777 105.259 5.28711C105.258 3.23676 103.758 2.7549 97.3318 2.75488Z"
                      fill="white"
                    />
                    <path
                      d="M45.0847 11.5133C43.4723 17.9505 36.1104 20.3602 31.7572 15.2049C25.0315 7.23905 34.6857 -3.91844 42.1867 2.41746C46.0944 5.71812 50.6678 19.0452 57.1033 13.7886C62.7919 9.14103 56.8699 0.324954 51.1032 4.08156C49.9687 4.82055 49.1031 6.09368 48.0691 6.96372C48.6921 0.817244 55.3995 -1.95478 59.906 1.84918C68.8803 9.42628 58.3727 22.5882 50.6069 15.6895C46.6901 12.2093 42.9558 0.518787 36.4849 4.21152C30.4238 7.67077 34.2991 17.1377 40.7467 14.695C42.4241 14.0595 43.6053 12.5144 45.0827 11.5144L45.0847 11.5133Z"
                      fill="url(#paint0_linear_9689_1433)"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_9689_1433"
                      x1="46.4204"
                      y1="0.111816"
                      x2="45.9999"
                      y2="27.0001"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#FFB8A1" />
                      <stop offset="1" stop-color="#A62A00" />
                    </linearGradient>
                    <clipPath id="clip0_9689_1433">
                      <rect width="153" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <div className="min-w-0">
                <h3 className="font-bold text-xs sm:text-sm md:text-base text-[var(--text-light-grey)] truncate max-w-[140px] sm:max-w-[220px] md:max-w-none">
                  {gameData?.name || "Loading..."}
                </h3>
                <p className="text-[10px] sm:text-xs text-[var(--text-lavender-2)] truncate max-w-[160px] sm:max-w-none">
                  {gameData?.provider || ""}
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
        <div>
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
