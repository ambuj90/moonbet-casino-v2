// src/pages/GamePage.jsx - PRODUCTION READY v2
// 
// FEATURES:
// 1. Prefetch support - instant load if user hovered game card
// 2. Currency change listener - reloads game when user switches CRYPTO in real play
// 3. Proper loading states - loader always visible during transitions
// 4. Key-based remounting via publicRoutes for clean navigation
// 5. Caching with SWR pattern for game metadata and sessions
// 6. Geo-blocking support
// 7. GTM tracking
//
// CURRENCY HANDLING:
// - preferredCurrency = Selected crypto (BTC, ETH, USDT) - stored in localStorage
// - gameCurrency = Bet/display currency (USD, EUR) - stored in localStorage
// - When user changes crypto in wallet dropdown, game reloads with new crypto

import React, { useState, useEffect, useRef, useCallback, useMemo, memo, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { LoginTrigger } from "../components/LoginSignup/LoginTrigger";
import { useAuthStore } from "../store/useAuthStore";
import { 
  getPrefetchedGame, 
  getPrefetchedSession, 
  setGameCache, 
  setSessionCache 
} from "../services/gamePrefetchService";

// =============================================================================
// LAZY LOAD BELOW-FOLD SECTIONS
// =============================================================================
const GamesYouLike = lazy(() => import("../components/sections/GamesYouLike"));
const GamepageLeaderboard = lazy(() => import("../components/leaderboard/GamepageLeaderboard"));
const ProvidersSection = lazy(() => import("../components/sections/ProvidersSection"));

// =============================================================================
// CACHES
// =============================================================================
const rakebackCache = { data: null, timestamp: 0, userId: null };
const RAKEBACK_CACHE_TTL = 60 * 1000; // 1 minute

// =============================================================================
// HELPERS
// =============================================================================
const preconnectToProvider = (url) => {
  if (!url) return;
  try {
    const domain = new URL(url).origin;
    if (document.querySelector(`link[href="${domain}"][rel="preconnect"]`)) return;
    
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = domain;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  } catch (e) {}
};

const pushGTMEvent = (data) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
};

// =============================================================================
// GAME LOADER COMPONENT
// =============================================================================
const GameLoader = memo(({ gameName, provider, isVisible }) => (
  <div 
    className={`absolute inset-0 z-20 transition-opacity duration-500 ${
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}
    style={{ backgroundColor: '#0D0E36' }}
  >
    {/* Background */}
    <div className="absolute inset-0">
      <div 
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at 50% 50%, #1C1D49 0%, #0D0E36 70%)' }}
      />
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
    </div>

    {/* Content */}
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      {/* Spinner */}
      <div className="relative w-20 h-20 mb-6">
        <svg className="absolute inset-0 w-20 h-20 animate-spin-slow" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" fill="none" stroke="url(#loaderGrad)" strokeWidth="3" strokeLinecap="round" strokeDasharray="180 360"/>
          <defs>
            <linearGradient id="loaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFB8A1"/>
              <stop offset="100%" stopColor="#a62a00"/>
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-2 rounded-full border-2 border-white/10 animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="/icons/moonlogo.gif" alt="Loading" className="w-10 h-10 object-contain"/>
        </div>
      </div>

      {/* Game Info */}
      <div className="text-center mb-4">
        <h3 className="text-white font-semibold text-base sm:text-lg mb-1">
          {gameName || "Loading Game..."}
        </h3>
        {provider && <p className="text-[#9292D2] text-sm">{provider}</p>}
      </div>

      {/* Loading Bar */}
      <div className="w-40 sm:w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-3">
        <div className="h-full rounded-full animate-loading-bar" style={{ background: 'linear-gradient(90deg, #a62a00, #FFB8A1)' }}/>
      </div>

      <p className="text-[#9292D2] text-xs sm:text-sm">Connecting to game server...</p>
    </div>
  </div>
));
GameLoader.displayName = "GameLoader";

// =============================================================================
// PLAY MODE TOGGLE
// =============================================================================
const PlayModeToggle = memo(({ isRealPlay, onToggle, disabled, size = "default" }) => {
  const isSmall = size === "small";
  
  return (
    <div className={`trust_btn2 flex items-center gap-0 p-1 rounded-full bg-[#282753] ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <button
        onClick={() => isRealPlay && onToggle()}
        disabled={disabled}
        className={`relative z-10 font-semibold rounded-full transition-all duration-300 ${
          isSmall ? "px-4 py-1 text-xs" : "px-5 py-1.5 text-sm"
        } ${!isRealPlay ? "text-white" : "text-gray-400"}`}
      >
        <span className={`absolute inset-0 rounded-full transition-all duration-300 ${!isRealPlay ? "opacity-100 scale-100" : "opacity-0 scale-90"}`} style={{ background: "linear-gradient(0deg,#a62a00 0%,#FFB8A1 100%)" }}/>
        <span className="relative z-10">{isSmall ? "Fun" : "Fun Play"}</span>
      </button>
      <button
        onClick={() => !isRealPlay && onToggle()}
        disabled={disabled}
        className={`relative z-10 font-semibold rounded-full transition-all duration-300 ${
          isSmall ? "px-4 py-1 text-xs" : "px-5 py-1.5 text-sm"
        } ${isRealPlay ? "text-white" : "text-gray-400"}`}
      >
        <span className={`absolute inset-0 rounded-full transition-all duration-300 ${isRealPlay ? "opacity-100 scale-100" : "opacity-0 scale-90"}`} style={{ background: "linear-gradient(0deg,#a62a00 0%,#FFB8A1 100%)" }}/>
        <span className="relative z-10">{isSmall ? "Real" : "Real Play"}</span>
      </button>
    </div>
  );
});
PlayModeToggle.displayName = "PlayModeToggle";

// =============================================================================
// FULLSCREEN BUTTON
// =============================================================================
const FullscreenButton = memo(({ onClick, size = "default" }) => {
  const isSmall = size === "small";
  return (
    <button onClick={onClick} className="transition-all duration-200 hover:scale-105 active:scale-95" title="Fullscreen">
      <svg xmlns="http://www.w3.org/2000/svg" width={isSmall ? "32" : "37"} height={isSmall ? "32" : "37"} viewBox="0 0 37 37" fill="none" className={isSmall ? "w-8 h-8" : ""}>
        <rect x="1" y="1" width="35" height="35" rx="8" fill="#282753" stroke="url(#fsGrad)" strokeWidth="2"/>
        <path d="M27.05 15.65C26.798 15.65 26.5564 15.5499 26.3782 15.3718C26.2001 15.1936 26.1 14.952 26.1 14.7V10.9H22.3C22.048 10.9 21.8064 10.7999 21.6282 10.6218C21.4501 10.4436 21.35 10.202 21.35 9.95C21.35 9.69804 21.4501 9.45641 21.6282 9.27825C21.8064 9.10009 22.048 9 22.3 9H26.1C26.6039 9 27.0872 9.20018 27.4435 9.5565C27.7998 9.91282 28 10.3961 28 10.9V14.7C28 14.952 27.8999 15.1936 27.7218 15.3718C27.5436 15.5499 27.302 15.65 27.05 15.65Z" fill="#9292D2"/>
        <path d="M26.1 28H22.3C22.048 28 21.8064 27.8999 21.6282 27.7218C21.4501 27.5436 21.35 27.302 21.35 27.05C21.35 26.798 21.4501 26.5564 21.6282 26.3782C21.8064 26.2001 22.048 26.1 22.3 26.1H26.1V22.3C26.1 22.048 26.2001 21.8064 26.3782 21.6282C26.5564 21.4501 26.798 21.35 27.05 21.35C27.302 21.35 27.5436 21.4501 27.7218 21.6282C27.8999 21.8064 28 22.048 28 22.3V26.1C28 26.6039 27.7998 27.0872 27.4435 27.4435C27.0872 27.7998 26.6039 28 26.1 28Z" fill="#9292D2"/>
        <path d="M14.7 28H10.9C10.3961 28 9.91282 27.7998 9.5565 27.4435C9.20018 27.0872 9 26.6039 9 26.1V22.3C9 22.048 9.10009 21.8064 9.27825 21.6282C9.45641 21.4501 9.69804 21.35 9.95 21.35C10.202 21.35 10.4436 21.4501 10.6218 21.6282C10.7999 21.8064 10.9 22.048 10.9 22.3V26.1H14.7C14.952 26.1 15.1936 26.2001 15.3718 26.3782C15.5499 26.5564 15.65 26.798 15.65 27.05C15.65 27.302 15.5499 27.5436 15.3718 27.7218C15.1936 27.8999 14.952 28 14.7 28Z" fill="#9292D2"/>
        <path d="M9.95 15.65C9.69804 15.65 9.45641 15.5499 9.27825 15.3718C9.10009 15.1936 9 14.952 9 14.7V10.9C9 10.3961 9.20018 9.91282 9.5565 9.5565C9.91282 9.20018 10.3961 9 10.9 9H14.7C14.952 9 15.1936 9.10009 15.3718 9.27825C15.5499 9.45641 15.65 9.69804 15.65 9.95C15.65 10.202 15.5499 10.4436 15.3718 10.6218C15.1936 10.7999 14.952 10.9 14.7 10.9H10.9V14.7C10.9 14.952 10.7999 15.1936 10.6218 15.3718C10.4436 15.5499 10.202 15.65 9.95 15.65Z" fill="#9292D2"/>
        <defs><linearGradient id="fsGrad" x1="3.45" y1="1" x2="20.13" y2="39.39" gradientUnits="userSpaceOnUse"><stop stopColor="white" stopOpacity="0.4"/><stop offset="0.41" stopColor="white" stopOpacity="0.01"/><stop offset="0.57" stopColor="white" stopOpacity="0.01"/><stop offset="1" stopColor="white" stopOpacity="0.1"/></linearGradient></defs>
      </svg>
    </button>
  );
});
FullscreenButton.displayName = "FullscreenButton";

// =============================================================================
// RELOAD GAME BUTTON - For session expiry recovery
// =============================================================================
const ReloadButton = memo(({ onClick, disabled, size = "default" }) => {
  const isSmall = size === "small";
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${disabled ? 'animate-spin' : ''}`} 
      title="Reload Game"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={isSmall ? "32" : "37"} 
        height={isSmall ? "32" : "37"} 
        viewBox="0 0 37 37" 
        fill="none" 
        className={isSmall ? "w-8 h-8" : ""}
      >
        <rect x="1" y="1" width="35" height="35" rx="8" fill="#282753" stroke="url(#reloadGrad)" strokeWidth="2"/>
        <path 
          d="M18.5 10C14.358 10 11 13.358 11 17.5C11 21.642 14.358 25 18.5 25C22.642 25 26 21.642 26 17.5" 
          stroke="#9292D2" 
          strokeWidth="2" 
          strokeLinecap="round"
          fill="none"
        />
        <path 
          d="M23 10L26 13L23 16" 
          stroke="#9292D2" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          fill="none"
        />
        <defs>
          <linearGradient id="reloadGrad" x1="3.45" y1="1" x2="20.13" y2="39.39" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.4"/>
            <stop offset="0.41" stopColor="white" stopOpacity="0.01"/>
            <stop offset="0.57" stopColor="white" stopOpacity="0.01"/>
            <stop offset="1" stopColor="white" stopOpacity="0.1"/>
          </linearGradient>
        </defs>
      </svg>
    </button>
  );
});
ReloadButton.displayName = "ReloadButton";

// =============================================================================
// RAKEBACK BOX
// =============================================================================
const RakebackBox = memo(({ rakeback, onClaim, isClaiming, size = "default" }) => {
  const isSmall = size === "small";
  return (
    <div className={`trust_btn flex items-center gap-2 ${isSmall ? "px-2 py-2" : "px-3 py-2"}`}>
      <div className={`text-[#9292D2] whitespace-nowrap ${isSmall ? "text-xs" : "text-sm"}`}>Rakeback</div>
      <div className="flex items-center gap-1 flex-shrink-0">
        <span className={`text-white font-semibold ${isSmall ? "text-xs" : ""}`}>${Number(rakeback).toFixed(2)}</span>
        <button onClick={onClaim} disabled={rakeback <= 0 || isClaiming} className={`rounded-lg transition-all duration-200 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed ${isSmall ? "px-2 py-1 text-[10px]" : "px-2 py-1 text-xs"}`} style={{ background: "linear-gradient(180deg,#9292D2 0%,#7171B4 100%)" }}>
          {isClaiming ? "..." : "Claim"}
        </button>
      </div>
    </div>
  );
});
RakebackBox.displayName = "RakebackBox";

// =============================================================================
// SECTION SKELETON
// =============================================================================
const SectionSkeleton = memo(() => (
  <div className="w-full py-6 animate-pulse">
    <div className="h-6 w-32 bg-white/5 rounded mb-4" />
    <div className="flex gap-3 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex-shrink-0 w-[calc(100%/3-12px)] sm:w-[calc(100%/6-12px)]">
          <div className="aspect-[18/12] bg-white/5 rounded-xl" />
        </div>
      ))}
    </div>
  </div>
));
SectionSkeleton.displayName = "SectionSkeleton";

// =============================================================================
// MAIN GAME PAGE COMPONENT
// =============================================================================
const GamePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const iframeRef = useRef(null);
  const { isLoggedIn } = useAuthStore();
  
  // Refs for tracking current values (avoid stale closures)
  const currentSlugRef = useRef(slug);
  const currentCryptoRef = useRef(localStorage.getItem("preferredCurrency") || "BTC");
  const isRealPlayRef = useRef(false);
  const currencyChangeTimeoutRef = useRef(null);
  
  currentSlugRef.current = slug;

  // State
  const [gameData, setGameData] = useState(() => getPrefetchedGame(slug));
  const [iframeUrl, setIframeUrl] = useState(() => getPrefetchedSession(slug, false));
  const [isRealPlay, setIsRealPlay] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [geoBlocked, setGeoBlocked] = useState({ blocked: false, message: "" });
  const [rakeback, setRakeback] = useState(0);
  const [isClaiming, setIsClaiming] = useState(false);
  const [isLoading, setIsLoading] = useState(!getPrefetchedGame(slug));
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [sessionKey, setSessionKey] = useState(0); // Increment to force session refresh

  // Keep ref in sync with state
  isRealPlayRef.current = isRealPlay;

  // User data
  const userData = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("user") || "{}"); } 
    catch { return {}; }
  }, []);

  // ==========================================================================
  // FULLSCREEN
  // ==========================================================================
  const toggleFullScreen = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      iframe.requestFullscreen?.() || iframe.webkitRequestFullscreen?.() || iframe.mozRequestFullScreen?.();
    }
  }, []);

  // ==========================================================================
  // RELOAD GAME - For session expiry recovery
  // ==========================================================================
  const handleReloadGame = useCallback(() => {
    console.log(`🔄 Reloading game session...`);
    
    // Clear current iframe
    setIframeUrl("");
    setIsIframeLoaded(false);
    setIsLoading(true);
    
    // Increment session key to trigger fresh API call
    setSessionKey(prev => prev + 1);
    
    toast.info("Reloading game...", { autoClose: 1500 });
  }, []);

  // ==========================================================================
  // ⭐ CRYPTO CHANGE LISTENER - Reloads game when user switches crypto wallet
  // ==========================================================================
  useEffect(() => {
    const handleCurrencyChange = () => {
      // Clear any pending timeout (debounce)
      if (currencyChangeTimeoutRef.current) {
        clearTimeout(currencyChangeTimeoutRef.current);
      }

      // Debounce: wait 300ms before processing
      currencyChangeTimeoutRef.current = setTimeout(() => {
        // Get the NEW crypto selection from localStorage
        const newCrypto = localStorage.getItem("preferredCurrency") || "BTC";
        const oldCrypto = currentCryptoRef.current;

        console.log(`🔄 Currency event received:`, {
          oldCrypto,
          newCrypto,
          isRealPlay: isRealPlayRef.current,
          willReload: isRealPlayRef.current && newCrypto !== oldCrypto
        });

        // Only reload if:
        // 1. User is in Real Play mode (demo doesn't use wallet balance)
        // 2. Crypto actually changed (BTC → ETH, not same)
        if (isRealPlayRef.current && newCrypto !== oldCrypto) {
          console.log(`💱 Crypto changed: ${oldCrypto} → ${newCrypto}, reloading game...`);
          
          // Update ref to new crypto
          currentCryptoRef.current = newCrypto;
          
          // Trigger game reload
          setIsLoading(true);
          setIsIframeLoaded(false);
          setIframeUrl(""); // Clear old iframe immediately
          setSessionKey(prev => prev + 1); // This triggers the main useEffect
        }
      }, 300);
    };

    // Listen for currency change event from WalletDropdownCenter
    window.addEventListener("preferredCurrencyUpdated", handleCurrencyChange);
    
    return () => {
      window.removeEventListener("preferredCurrencyUpdated", handleCurrencyChange);
      if (currencyChangeTimeoutRef.current) {
        clearTimeout(currencyChangeTimeoutRef.current);
      }
    };
  }, []); // Empty deps - all values accessed via refs

  // ==========================================================================
  // LOGOUT HANDLER - Switch to demo when logged out
  // ==========================================================================
  useEffect(() => {
    if (!isLoggedIn && isRealPlay) {
      toast.info("You have logged out — switching to Fun Play...");
      setIsRealPlay(false);
      setIsLoading(true);
      setIsIframeLoaded(false);
      setIframeUrl("");
      setSessionKey(prev => prev + 1);
    }
  }, [isLoggedIn, isRealPlay]);

  // ==========================================================================
  // ⭐ MAIN GAME LOADING - Fetches game and initializes session
  // ==========================================================================
  useEffect(() => {
    let isCancelled = false;

    const loadGame = async () => {
      // Get current currency values
      const preferredCurrency = localStorage.getItem("preferredCurrency") || "BTC";
      const gameCurrency = localStorage.getItem("gameCurrency") || "USD";
      
      // Update crypto ref
      currentCryptoRef.current = preferredCurrency;

      console.log(`🎮 Loading game:`, {
        slug,
        isRealPlay,
        sessionKey,
        preferredCurrency,
        gameCurrency
      });

      // Check for prefetched data FIRST (instant load)
      const prefetchedGame = getPrefetchedGame(slug);
      const prefetchedSession = !isRealPlay ? getPrefetchedSession(slug, false) : null;

      // Use prefetched game metadata if available
      if (prefetchedGame) {
        setGameData(prefetchedGame);
        
        // For demo mode, use prefetched session URL if available
        if (prefetchedSession && !isRealPlay) {
          setIframeUrl(prefetchedSession);
          setIsLoading(false);
          return; // Done - using cached data
        }
      }

      // Need to fetch from API
      setIsLoading(true);
      setIsIframeLoaded(false);

      try {
        // STEP 1: Get game metadata (if not prefetched)
        let game = prefetchedGame;
        
        if (!game) {
          const { data } = await axios.get(`/wallet-service/api/games/slug/${slug}`);
          
          if (isCancelled || currentSlugRef.current !== slug) return;

          if (!data.success) {
            toast.error("Game not found!");
            setIsLoading(false);
            return;
          }

          game = data.data;
          setGameData(game);
          setGameCache(slug, game);
        }

        // STEP 2: Initialize game session
        let initUrl, payload;

        if (isRealPlay) {
          // Real Play - needs authentication and currency
          const token = localStorage.getItem("token");
          const user = JSON.parse(localStorage.getItem("user") || "{}");

          if (!token || !user?.id) {
            toast.warning("Please log in to play for real money!");
            setShowLogin(true);
            setIsLoading(false);
            return;
          }

          initUrl = `/wallet-service/api/games/${game.uuid}/init`;
          payload = {
            player_id: user.id,
            player_name: user.username || "Guest Player",
            currency: gameCurrency,              // Bet currency (USD, EUR)
            preferredCurrency: preferredCurrency, // ⭐ Crypto wallet (BTC, ETH)
            device: window.innerWidth < 768 ? "mobile" : "desktop",
            language: "en",
            email: user.email,
            return_url: `${window.location.origin}/game-return/${game.uuid}`,
          };

          console.log(`💰 Real Play init:`, { 
            preferredCurrency, 
            gameCurrency,
            playerId: user.id 
          });
        } else {
          // Demo Play - no currency needed
          initUrl = `/wallet-service/api/games/${game.uuid}/init-demo`;
          payload = {
            device: window.innerWidth < 768 ? "mobile" : "desktop",
            language: "en",
            return_url: `${window.location.origin}/game-return/${game.uuid}`,
          };
        }

        // Make API call
        const initRes = await axios.post(initUrl, payload);

        if (isCancelled || currentSlugRef.current !== slug) return;

        if (!initRes.data.success || !initRes.data.data?.url) {
          throw new Error("Failed to start game session");
        }

        const sessionUrl = initRes.data.data.url;
        
        // Cache demo sessions only (real sessions are user-specific)
        if (!isRealPlay) {
          setSessionCache(slug, false, sessionUrl);
        }

        // Preconnect to game provider for faster iframe load
        preconnectToProvider(sessionUrl);

        // Set iframe URL - this will start loading the game
        setIframeUrl(sessionUrl);
        setGeoBlocked({ blocked: false, message: "" });
        setIsLoading(false);

        console.log(`✅ Game session initialized:`, { sessionUrl: sessionUrl.substring(0, 50) + '...' });

      } catch (error) {
        if (isCancelled || currentSlugRef.current !== slug) return;

        console.error("❌ Error loading game:", error);

        if (error.response?.status === 403 && error.response?.data?.blocked) {
          setGeoBlocked({ 
            blocked: true, 
            message: error.response.data.message || "This game is not available in your region." 
          });
          toast.warning(error.response.data.message);
        } else {
          toast.error(error.response?.data?.message || error.message || "Unable to load game");
        }
        setIsLoading(false);
      }
    };

    // Reset geo block state
    setGeoBlocked({ blocked: false, message: "" });
    
    // Scroll to top on game change
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Load the game
    loadGame();

    return () => {
      isCancelled = true;
    };
  }, [slug, isRealPlay, sessionKey]); // ⭐ sessionKey triggers reload on currency change

  // ==========================================================================
  // RAKEBACK
  // ==========================================================================
  useEffect(() => {
    if (!userData?.id) return;

    const fetchRakeback = async () => {
      // Check cache first
      if (rakebackCache.userId === userData.id && 
          Date.now() - rakebackCache.timestamp < RAKEBACK_CACHE_TTL) {
        setRakeback(rakebackCache.data || 0);
        return;
      }

      try {
        const res = await axios.get(`/wallet-service/api/wallet/${userData.id}/rakeback`);
        rakebackCache.data = res.data.pending || 0;
        rakebackCache.timestamp = Date.now();
        rakebackCache.userId = userData.id;
        setRakeback(rakebackCache.data);
      } catch (err) {
        console.error("Rakeback fetch error:", err);
      }
    };

    fetchRakeback();
  }, [userData?.id, slug]);

  // ==========================================================================
  // CLAIM RAKEBACK
  // ==========================================================================
  const claimRakeback = useCallback(async () => {
    if (!userData?.id || rakeback <= 0 || isClaiming) return;

    try {
      setIsClaiming(true);
      const res = await axios.post(
        `/wallet-service/api/wallet/${userData.id}/rakeback/claim`, 
        {}, 
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (res.data.success) {
        toast.success("Rakeback claimed!");
        setRakeback(0);
        rakebackCache.data = 0;
        window.dispatchEvent(new Event("preferredCurrencyUpdated"));
      }
    } catch (err) {
      toast.error("Failed to claim rakeback");
    } finally {
      setIsClaiming(false);
    }
  }, [userData?.id, rakeback, isClaiming]);

  // ==========================================================================
  // PLAY MODE TOGGLE
  // ==========================================================================
  const handlePlayToggle = useCallback(() => {
    if (geoBlocked.blocked) {
      toast.info(geoBlocked.message || "Not available in your region.");
      return;
    }

    if (!isRealPlay) {
      // Switching to Real Play
      if (!localStorage.getItem("token")) {
        toast.warning("Please log in to play for real money!");
        setShowLogin(true);
        return;
      }

      pushGTMEvent({
        event: "bet_placed",
        user_id: userData?.id,
        game_name: gameData?.name?.toLowerCase(),
        currency: localStorage.getItem("gameCurrency") || "USD",
        crypto: localStorage.getItem("preferredCurrency") || "BTC",
        is_demo: false,
      });

      setIsLoading(true);
      setIsIframeLoaded(false);
      setIframeUrl("");
      setIsRealPlay(true);
      return;
    }

    // Switching to Demo
    setIsLoading(true);
    setIsIframeLoaded(false);
    setIframeUrl("");
    setIsRealPlay(false);
  }, [geoBlocked, isRealPlay, userData?.id, gameData?.name]);

  // ==========================================================================
  // IFRAME LOAD HANDLER
  // ==========================================================================
  const handleIframeLoad = useCallback(() => {
    console.log(`✅ Iframe loaded`);
    setIsIframeLoaded(true);
    
    if (gameData?.name) {
      pushGTMEvent({ 
        event: "game_opened", 
        game_name: gameData.name.toLowerCase(),
        is_real_play: isRealPlay
      });
    }
  }, [gameData?.name, isRealPlay]);

  // ==========================================================================
  // NAVIGATION
  // ==========================================================================
  const handleExploreGames = useCallback(() => navigate("/casino"), [navigate]);

  // ==========================================================================
  // COMPUTED: Show loader
  // ==========================================================================
  const showLoader = isLoading || (!isIframeLoaded && !geoBlocked.blocked && iframeUrl);

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <>
      <div className="container relative flex flex-col max-w-7xl mx-auto px-4">
        {/* GAME CONTAINER - Fixed height for consistent loader display */}
        <div 
          className="game-container relative mt-5 rounded-lg overflow-hidden"
          style={{ 
            height: 'calc(80vh - 20px)', 
            minHeight: '400px', 
            maxHeight: '800px', 
            backgroundColor: '#0D0E36' 
          }}
        >
          {/* LOADER - Always rendered, visibility controlled by CSS */}
          <GameLoader 
            gameName={gameData?.name} 
            provider={gameData?.provider} 
            isVisible={showLoader}
          />

          {/* GEO BLOCK OVERLAY */}
          {geoBlocked.blocked && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#0D0E36]">
              <div className="max-w-md w-full bg-[#181836] border border-[#3B3B70] rounded-2xl px-6 py-6 text-center shadow-lg mx-4">
                <div className="mb-3 text-2xl">🚫</div>
                <h2 className="text-lg md:text-xl font-semibold text-white mb-2">
                  Game not available in your region
                </h2>
                <p className="text-sm text-[#B4B4DE] mb-4">{geoBlocked.message}</p>
                <button 
                  onClick={handleExploreGames} 
                  className="w-full px-4 py-2 rounded-xl text-sm font-semibold text-white" 
                  style={{ background: "linear-gradient(90deg,#FFB8A1 0%,#A62A00 100%)" }}
                >
                  Explore other games
                </button>
              </div>
            </div>
          )}

          {/* GAME IFRAME */}
          {iframeUrl && !geoBlocked.blocked && (
            <iframe
              ref={iframeRef}
              src={iframeUrl}
              title={gameData?.name || "Game"}
              className={`absolute inset-0 w-full h-full border-none transition-opacity duration-300 ${
                isIframeLoaded ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              allowFullScreen
              allow="autoplay; fullscreen"
              onLoad={handleIframeLoad}
            />
          )}
        </div>

        {/* MOBILE CONTROL BAR */}
        <div className="sm:hidden w-full px-3 py-2 flex items-center justify-between bg-[#1C1D49] mt-2 gap-2">
          <RakebackBox 
            rakeback={rakeback} 
            onClaim={claimRakeback} 
            isClaiming={isClaiming} 
            size="small"
          />
          <div className="flex items-center gap-2">
            <ReloadButton onClick={handleReloadGame} disabled={isLoading} size="small"/>
            <FullscreenButton onClick={toggleFullScreen} size="small"/>
          </div>
          <PlayModeToggle 
            isRealPlay={isRealPlay} 
            onToggle={handlePlayToggle} 
            disabled={isLoading} 
            size="small"
          />
        </div>

        {/* DESKTOP CONTROL BAR */}
        <div className="hidden sm:block w-full px-4 sm:px-6 bg-[#1C1D49] mt-1">
          <div className="w-full flex items-center justify-between gap-4 py-3">
            <div className="flex flex-col">
              <p className="font-bold text-[#C8C8E1]">{gameData?.name || "Loading..."}</p>
              <p className="text-xs text-[#9292D2]">{gameData?.provider || ""}</p>
            </div>
            <RakebackBox 
              rakeback={rakeback} 
              onClaim={claimRakeback} 
              isClaiming={isClaiming}
            />
            <div className="flex items-center gap-4">
              <ReloadButton onClick={handleReloadGame} disabled={isLoading}/>
              <FullscreenButton onClick={toggleFullScreen}/>
              <PlayModeToggle 
                isRealPlay={isRealPlay} 
                onToggle={handlePlayToggle} 
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>

      {/* BELOW-FOLD SECTIONS - Lazy loaded */}
      <div className="game-you-may-like">
        <Suspense fallback={<SectionSkeleton/>}>
          <GamesYouLike provider={gameData?.provider} excludeGame={gameData?.name}/>
        </Suspense>
        <Suspense fallback={<SectionSkeleton/>}>
          <GamepageLeaderboard/>
        </Suspense>
        <Suspense fallback={<SectionSkeleton/>}>
          <ProvidersSection/>
        </Suspense>
      </div>

      {/* LOGIN MODAL */}
      {showLogin && (
        <LoginTrigger 
          buttonText="" 
          defaultTab="login" 
          forceOpen={true}
          onOpen={() => localStorage.setItem("hasSeenGamePageLoginPopup", "true")}
          onLoginSuccess={() => { setShowLogin(false); setIsRealPlay(true); }}
          onSignupSuccess={() => { setShowLogin(false); setIsRealPlay(true); }}
        />
      )}

      {/* ANIMATIONS */}
      <style jsx>{`
        @keyframes loading-bar { 
          0% { width: 0%; margin-left: 0; } 
          50% { width: 60%; margin-left: 20%; } 
          100% { width: 0%; margin-left: 100%; } 
        }
        .animate-loading-bar { animation: loading-bar 1.5s ease-in-out infinite; }
        .animate-spin-slow { animation: spin 2s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-pulse { animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </>
  );
};

export default memo(GamePage);