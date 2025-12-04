// src/pages/GamePage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
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

  // ------------------------------------------
  // On logout: force switch to Fun Play
  // ------------------------------------------
  useEffect(() => {
    if (!isLoggedIn && isRealPlay) {
      toast.info("You have logged out — switching to Fun Play...");
      setIsRealPlay(false);
      setLoading(true);
    }
  }, [isLoggedIn, isRealPlay]);

  // ------------------------------------------
  // Fullscreen toggle
  // ------------------------------------------
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

  // ------------------------------------------
  // Listen for currency changes
  // ------------------------------------------
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
    const update = () => {
      const newC = localStorage.getItem("preferredCurrency") || "USD";
      setPreferredCurrency(newC);
    };
    window.addEventListener("preferredCurrencyUpdated", update);
    return () => window.removeEventListener("preferredCurrencyUpdated", update);
  }, []);

  // ------------------------------------------
  // Load game session URL
  // ------------------------------------------
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
          throw new Error("Failed to start game session");
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
  }, [game_uuid, isRealPlay, preferredCurrency]);

  // Scroll on new game
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [game_uuid]);

  // ------------------------------------------
  // Poll wallet balance (real play only)
  // ------------------------------------------
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

  // ------------------------------------------
  // Handle fun <-> real play toggle
  // ------------------------------------------
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

  // ------------------------------------------
  // Fallback error UI
  // ------------------------------------------
  if (!loading && !iframeUrl) {
    return (
      <div className="flex items-center justify-center h-screen text-red-400 text-xl">
        Failed to load game.
      </div>
    );
  }

  return (
    <>
      <div className="container relative flex flex-col max-w-7xl mx-auto px-4">
        {/* Game iframe */}
        <div className="iframe-wrapper">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
              <img
                src="/icons/moonlogo.gif"
                alt="loader"
                className="w-28 h-28"
              />
            </div>
          )}

          <iframe
            ref={iframeRef}
            src={iframeUrl}
            title={gameData?.name || "Game"}
            className="w-full md:h-[80vh] h-[75vh] pt-5 border-none pointer-events-auto"
            allowFullScreen
            onLoad={() => setLoading(false)}
          />
        </div>

        {/* ---------------------------------------------------------------
           MOBILE BOTTOM BAR — ONLY LOGO + TOGGLE (Option A)
        ---------------------------------------------------------------- */}
        <div className="sm:hidden w-full py-3 flex items-center justify-between bg-[#1C1D49] px-3 mt-2">
          {/* Logo */}
          <img src="/logo/logo.svg" alt="Moonbet" className="w-28 h-auto" />

          {/* Toggle */}
          <div className="trust_btn2 flex items-center gap-0 p-1 rounded-full bg-[#282753]">
            {/* FUN */}
            <button
              onClick={() => isRealPlay && handlePlayToggle()}
              className={`relative z-10 px-4 py-1.5 text-xs font-semibold rounded-full ${
                !isRealPlay ? "text-white" : "text-gray-300"
              }`}
            >
              {!isRealPlay && (
                <motion.div
                  layoutId="activePlayTab"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(0deg,#a62a00 0%,#FFB8A1 100%)",
                  }}
                />
              )}
              <span className="relative z-10">Fun</span>
            </button>

            {/* REAL */}
            <button
              onClick={() => !isRealPlay && handlePlayToggle()}
              className={`relative z-10 px-4 py-1.5 text-xs font-semibold rounded-full ${
                isRealPlay ? "text-white" : "text-gray-300"
              }`}
            >
              {isRealPlay && (
                <motion.div
                  layoutId="activePlayTab"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(0deg,#a62a00 0%,#FFB8A1 100%)",
                  }}
                />
              )}
              <span className="relative z-10">Real</span>
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------------------
           DESKTOP BOTTOM BAR — unchanged (full UI)
        ---------------------------------------------------------------- */}
        <div className="hidden sm:block w-full px-4 sm:px-6 bg-[#1C1D49] mt-1">
          <div className="w-full flex items-center justify-between gap-4 py-3">
            {/* LEFT: Logo + Game info */}
            <div className="flex items-center gap-4">
              {/* Moonbet Logo */}
              <img src="/logo/logo.svg" className="w-40" />

              {/* Game Info */}
              <div className="flex flex-col">
                <p className="font-bold text-[#C8C8E1]">{gameData?.name}</p>
                <p className="text-xs text-[#9292D2]">{gameData?.provider}</p>
              </div>
            </div>

            {/* RIGHT: Rakeback + fullscreen + toggle */}
            <div className="flex items-center gap-4">
              {/* Rakeback Box */}
              <div className="trust_btn flex items-center gap-3 px-3 py-2">
                <div className="text-[#9292D2] text-sm">Rakeback</div>
                <div className="flex items-center gap-1">
                  <span className="text-white font-semibold">$0.00</span>
                  <button
                    className="px-2 py-1 text-xs rounded-lg"
                    style={{
                      background:
                        "linear-gradient(180deg,#9292D2 0%,#7171B4 100%)",
                    }}
                  >
                    Claim
                  </button>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleFullScreen(iframeRef)}
                className="ml-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="37"
                  height="37"
                  viewBox="0 0 37 37"
                  fill="none"
                >
                  <rect
                    x="1"
                    y="1"
                    width="35"
                    height="35"
                    rx="8"
                    fill="#282753"
                    stroke="url(#paint0_linear_9689_1588)"
                    strokeWidth="2"
                  />
                  <path
                    d="M27.05 15.65C26.798 15.65 26.5564 15.5499 26.3782 15.3718C26.2001 15.1936 26.1 14.952 26.1 14.7V10.9H22.3C22.048 10.9 21.8064 10.7999 21.6282 10.6218C21.4501 10.4436 21.35 10.202 21.35 9.95C21.35 9.69804 21.4501 9.45641 21.6282 9.27825C21.8064 9.10009 22.048 9 22.3 9H26.1C26.6039 9 27.0872 9.20018 27.4435 9.5565C27.7998 9.91282 28 10.3961 28 10.9V14.7C28 14.952 27.8999 15.1936 27.7218 15.3718C27.5436 15.5499 27.302 15.65 27.05 15.65Z"
                    fill="#9292D2"
                  />
                  <path
                    d="M26.1 28H22.3C22.048 28 21.8064 27.8999 21.6282 27.7218C21.4501 27.5436 21.35 27.302 21.35 27.05C21.35 26.798 21.4501 26.5564 21.6282 26.3782C21.8064 26.2001 22.048 26.1 22.3 26.1H26.1V22.3C26.1 22.048 26.2001 21.8064 26.3782 21.6282C26.5564 21.4501 26.798 21.35 27.05 21.35C27.302 21.35 27.5436 21.4501 27.7218 21.6282C27.8999 21.8064 28 22.048 28 22.3V26.1C28 26.6039 27.7998 27.0872 27.4435 27.4435C27.0872 27.7998 26.6039 28 26.1 28Z"
                    fill="#9292D2"
                  />
                  <path
                    d="M14.7 28H10.9C10.3961 28 9.91282 27.7998 9.5565 27.4435C9.20018 27.0872 9 26.6039 9 26.1V22.3C9 22.048 9.10009 21.8064 9.27825 21.6282C9.45641 21.4501 9.69804 21.35 9.95 21.35C10.202 21.35 10.4436 21.4501 10.6218 21.6282C10.7999 21.8064 10.9 22.048 10.9 22.3V26.1H14.7C14.952 26.1 15.1936 26.2001 15.3718 26.3782C15.5499 26.5564 15.65 26.798 15.65 27.05C15.65 27.302 15.5499 27.5436 15.3718 27.7218C15.1936 27.8999 14.952 28 14.7 28Z"
                    fill="#9292D2"
                  />
                  <path
                    d="M9.95 15.65C9.69804 15.65 9.45641 15.5499 9.27825 15.3718C9.10009 15.1936 9 14.952 9 14.7V10.9C9 10.3961 9.20018 9.91282 9.5565 9.5565C9.91282 9.20018 10.3961 9 10.9 9H14.7C14.952 9 15.1936 9.10009 15.3718 9.27825C15.5499 9.45641 15.65 9.69804 15.65 9.95C15.65 10.202 15.5499 10.4436 15.3718 10.6218C15.1936 10.7999 14.952 10.9 14.7 10.9H10.9V14.7C10.9 14.952 10.7999 15.1936 10.6218 15.3718C10.4436 15.5499 10.202 15.65 9.95 15.65Z"
                    fill="#9292D2"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_9689_1588"
                      x1="3.45192"
                      y1="0.999992"
                      x2="20.1272"
                      y2="39.3892"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" stopOpacity="0.4" />
                      <stop
                        offset="0.405687"
                        stopColor="white"
                        stopOpacity="0.01"
                      />
                      <stop
                        offset="0.574372"
                        stopColor="white"
                        stopOpacity="0.01"
                      />
                      <stop offset="1" stopColor="white" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.button>

              {/* Toggle */}
              <div className="trust_btn2 flex items-center gap-0 p-1 rounded-full bg-[#282753]">
                {/* FUN */}
                <button
                  onClick={() => isRealPlay && handlePlayToggle()}
                  className={`relative z-10 px-5 py-1.5 text-sm font-semibold ${
                    !isRealPlay ? "text-white" : "text-gray-400"
                  }`}
                >
                  {!isRealPlay && (
                    <motion.div
                      layoutId="activePlayTab"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "linear-gradient(0deg,#a62a00 0%,#FFB8A1 100%)",
                      }}
                    />
                  )}
                  <span className="relative z-10">Fun Play</span>
                </button>

                {/* REAL */}
                <button
                  onClick={() => !isRealPlay && handlePlayToggle()}
                  className={`relative z-10 px-5 py-1.5 text-sm font-semibold ${
                    isRealPlay ? "text-white" : "text-gray-400"
                  }`}
                >
                  {isRealPlay && (
                    <motion.div
                      layoutId="activePlayTab"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "linear-gradient(0deg,#a62a00 0%,#FFB8A1 100%)",
                      }}
                    />
                  )}
                  <span className="relative z-10">Real Play</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested games */}
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
        />
      )}
    </>
  );
};

export default GamePage;
