// components/Navbar/WalletDropdownCenter.jsx - OPTIMIZED VERSION v2
//
// FIXES:
// - Skeleton ONLY shows on initial load (when currencies array is empty)
// - Currency change keeps list visible, only updates balance
// - Smooth transitions between currency selections
//
// FEATURES:
// - Rakeback API caching (SWR pattern)
// - Image loading states with fallbacks
// - Memoized sub-components
// - CSS animations instead of Framer Motion

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  memo,
} from "react";
import axios from "axios";

// =============================================================================
// RAKEBACK CACHE - SWR Pattern
// =============================================================================
const rakebackCache = {
  data: null,
  timestamp: 0,
  userId: null,
};

const RAKEBACK_CACHE_TTL = 60 * 1000; // 1 minute

const isRakebackCacheValid = (userId) => {
  if (rakebackCache.data === null) return false;
  if (rakebackCache.userId !== userId) return false;
  return Date.now() - rakebackCache.timestamp < RAKEBACK_CACHE_TTL;
};

// =============================================================================
// ICON URL FIXER - Moved outside component
// =============================================================================
const fixIconUrl = (url) => {
  if (!url) return url;
  if (url.includes("dogecoin.svg")) return "/wallet-icons/doge-coin.svg";
  if (url.includes("usdttrc20.svg")) return "/wallet-icons/tether.svg";
  if (url.includes("bnbmainnet.svg")) return "/wallet-icons/bnb.svg";
  if (url.includes("maticmainnet.svg")) return "/wallet-icons/polygon.svg";
  return url;
};

// =============================================================================
// SKELETON LOADERS
// =============================================================================
const CurrencyListSkeleton = memo(() => (
  <div className="flex-1 mt-2.5 max-h-[280px] pr-1.5 pb-2 space-y-2">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="flex items-center pr-3 my-2.5 rounded-full"
        style={{ animationDelay: `${i * 100}ms` }}
      >
        <div className="w-9 h-9 rounded-full bg-white/20 animate-pulse" />
        <div className="flex-1 flex flex-col ml-2.5 gap-1.5">
          <div
            className="w-20 h-4 rounded bg-white/20 animate-pulse"
            style={{ animationDelay: `${i * 100 + 50}ms` }}
          />
          <div
            className="w-12 h-3 rounded bg-white/15 animate-pulse"
            style={{ animationDelay: `${i * 100 + 100}ms` }}
          />
        </div>
        <div
          className="w-16 h-4 rounded bg-white/20 animate-pulse"
          style={{ animationDelay: `${i * 100 + 150}ms` }}
        />
      </div>
    ))}
  </div>
));
CurrencyListSkeleton.displayName = "CurrencyListSkeleton";

const BalanceSkeleton = memo(() => (
  <div className="flex items-center gap-2 animate-pulse">
    <div className="w-5 h-5 rounded-full bg-white/30" />
    <div className="flex flex-col gap-1">
      <div className="w-14 h-3 rounded bg-white/30" />
    </div>
    <div className="w-3 h-3 rounded bg-white/20" />
  </div>
));
BalanceSkeleton.displayName = "BalanceSkeleton";

// =============================================================================
// MEMOIZED SUB-COMPONENTS
// =============================================================================

// Rakeback Section
const RakebackSection = memo(
  ({ rakeback, isClaiming, onClaim, selectedCurrency }) => (
    <div className="mt-3 mb-2 px-3 py-2 flex items-center justify-between rounded-[15px] border border-[#555594] bg-[rgba(13,14,54,0.50)] backdrop-blur-[30px]">
      <div className="flex flex-col leading-tight">
        <span className="text-[12px] text-[#9292D2] tracking-wide">
          Rakeback Available
        </span>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center overflow-hidden">
            {selectedCurrency?.iconPath ? (
              <img
                src={fixIconUrl(selectedCurrency.iconPath)}
                alt={selectedCurrency.symbol}
                className="w-3.5 h-3.5 object-contain"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/icons/default-coin.svg";
                }}
              />
            ) : (
              <span className="text-[10px] font-bold text-white/80">
                {selectedCurrency?.symbol || "$"}
              </span>
            )}
          </div>
          <span className="text-white text-[15px] font-semibold opacity-50">
            ${Number(rakeback || 0).toFixed(2)}
          </span>
        </div>
      </div>

      <button
        onClick={onClaim}
        disabled={rakeback <= 0 || isClaiming}
        className={`
        claim-btn relative px-4 py-1.5 rounded-[4px] transition-all select-none
        ${
          rakeback > 0
            ? "text-white hover:brightness-110"
            : "cursor-not-allowed text-white/40"
        }
      `}
        style={{
          background:
            rakeback > 0
              ? "linear-gradient(180deg, rgba(40,194,3,0.00) 0%, rgba(40,194,3,0.40) 100%)"
              : "rgba(255,255,255,0.05)",
          borderRadius: "4px",
        }}
      >
        {isClaiming ? "Claiming..." : "Claim"}
      </button>
    </div>
  )
);
RakebackSection.displayName = "RakebackSection";

// Search Box
const SearchBox = memo(({ value, onChange }) => (
  <div className="search-box mt-3 h-[42px] rounded-xl bg-white/10 border border-white/5 flex items-center px-3">
    <svg
      className="w-4 h-4 text-gray-400 opacity-60 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
    <input
      type="text"
      placeholder="Search Currency"
      value={value}
      onChange={onChange}
      className="w-full bg-transparent border-none outline-none text-white text-sm placeholder-gray-400"
    />
  </div>
));
SearchBox.displayName = "SearchBox";

// Currency Item with Image Loading State and Selection Animation
const CurrencyItem = memo(({ currency, isSelected, isUpdating, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback((e) => {
    e.target.onerror = null;
    e.target.src = "/icons/default-coin.svg";
    setImageError(true);
    setImageLoaded(true);
  }, []);

  return (
    <div
      onClick={onClick}
      className={`wallet-item group flex items-center pr-3 my-2.5 rounded-full relative cursor-pointer transition-all duration-250 ${
        isSelected
          ? "bg-gradient-to-r from-white/35 to-[rgba(90,55,153,0.10)]"
          : ""
      } ${isUpdating && isSelected ? "opacity-70" : ""}`}
    >
      {/* Hover Background Effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/35 to-[rgba(90,55,153,0.10)] opacity-0 scale-[0.98] group-hover:opacity-100 group-hover:scale-100 transition-all duration-250 pointer-events-none" />

      {/* Icon Wrapper */}
      <div
        className={`icon-wrap w-9 h-9 rounded-full flex items-center justify-center transition-all duration-250 relative z-10 group-hover:bg-white/55 ${
          isSelected ? "bg-white/30" : ""
        }`}
      >
        {/* Skeleton while image loads */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[26px] h-[26px] rounded-full bg-white/20 animate-pulse" />
          </div>
        )}
        <img
          src={currency.iconPath}
          alt={currency.name}
          className={`w-[26px] h-[26px] object-contain transition-opacity duration-200 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>

      {/* Currency Info */}
      <div className="coin-info flex-1 flex flex-col ml-2.5 z-10">
        <span className="coin-name text-white text-sm font-medium">
          {currency.name}
        </span>
        <span className="coin-symbol text-[#9292D2] text-xs group-hover:text-[#C8C8E1]">
          {currency.symbol}
        </span>
      </div>

      {/* Balance - Shows loading indicator when this item is being updated */}
      <div className="flex items-center gap-1 z-10">
        {isUpdating && isSelected ? (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : null}
        <span className="coin-amount text-white text-[13px]">
          {currency.balance.toFixed(2)}
        </span>
      </div>
    </div>
  );
});
CurrencyItem.displayName = "CurrencyItem";

// Wallet Settings Button
const WalletSettingsButton = memo(({ onClick }) => (
  <div
    onClick={onClick}
    className="wallet-settings h-[52px] bg-white/10 border- border-white/10 rounded-t-none flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-200 hover:bg-white/[0.18] -mx-3"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 14 13"
      fill="none"
      className="opacity-80"
    >
      <path
        d="M11.2502 0C11.6646 8.01163e-05 12.0001 0.349384 12.0001 0.779852C12.0001 1.21036 11.6647 1.55962 11.2502 1.5597H1.9999C1.72445 1.55975 1.49979 1.79287 1.49975 2.07985C1.49975 2.36686 1.72443 2.59996 1.9999 2.6H12.75C13.439 2.6 14 3.18293 14 3.9V5.2H11.4999C10.1215 5.20008 8.9999 6.36642 8.9999 7.8C8.99996 9.23353 10.1215 10.3999 11.4999 10.4H14V11.7C13.9999 12.417 13.4389 13 12.75 13H1.9999C0.897011 13 0.000151205 12.0671 0 10.9201C0 10.9201 0 2.08765 0 2.07985C3.95682e-05 0.932801 0.896942 4.11503e-05 1.9999 0H11.2502Z"
        fill="#E1E1E1"
      />
      <path
        d="M14 9.3597H11.4999C10.6715 9.35963 10.0003 8.66153 10.0002 7.8C10.0002 6.93842 10.6715 6.23963 11.4999 6.23956H14V9.3597Z"
        fill="#E1E1E1"
      />
    </svg>
    <span className="text-[#E1E1E1] text-sm">Wallet Settings</span>
  </div>
));
WalletSettingsButton.displayName = "WalletSettingsButton";

// Wallet Button (opens modal)
const WalletButton = memo(({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const currentSrc = isHovered
    ? "/active-menu/wallet_hover.svg"
    : "/active-menu/wallet_dec.svg";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center gap-2 transition-transform duration-200 hover:scale-[1.02]"
    >
      <span className="text-xl relative w-[40px] h-[40px]">
        {!imageLoaded && (
          <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
        )}
        <img
          src={currentSrc}
          alt="Wallet"
          width={40}
          height={40}
          className={`w-[40px] h-[40px] transition-opacity duration-200 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="eager"
          onLoad={() => setImageLoaded(true)}
        />
      </span>
    </button>
  );
});
WalletButton.displayName = "WalletButton";

// Claim Popup Animation
const ClaimPopup = memo(({ show, amount }) => {
  if (!show) return null;

  return (
    <div
      className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[9999]
        flex flex-col items-center animate-claimPopup"
    >
      <div
        className="text-[#28C203] font-bold text-2xl tracking-wide drop-shadow-lg"
        style={{ textShadow: "0 0 12px rgba(40, 194, 3, 0.8)" }}
      >
        +${amount}
      </div>
      <div
        className="mt-1 px-4 py-1 rounded-full bg-[#28C203]/20 border border-[#28C203]/40 
          text-[#28C203] text-sm font-semibold backdrop-blur-md"
      >
        Rakeback Claimed!
      </div>
    </div>
  );
});
ClaimPopup.displayName = "ClaimPopup";

// =============================================================================
// MAIN WALLET DROPDOWN CENTER COMPONENT
// =============================================================================
const WalletDropdownCenter = ({
  hasToken,
  userId,
  walletBalance,
  setWalletBalance,
  currencies,
  setCurrencies,
  selectedCurrency,
  setSelectedCurrency,
  setWalletModalOpen,
  setWalletSettingsOpen,
  handleCurrencySelect,
  // Loading states from Header.jsx
  isLoadingCurrencies = false,
  isUpdatingBalance = false,
  CurrencySkeletonLoader = null,
}) => {
  const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const walletDropdownRef = useRef(null);

  const [rakeback, setRakeback] = useState(0);
  const [isClaiming, setIsClaiming] = useState(false);
  const [isLoadingRakeback, setIsLoadingRakeback] = useState(true);
  const [showClaimPopup, setShowClaimPopup] = useState(false);
  const [claimAmount, setClaimAmount] = useState(0);
  const [selectedIconLoaded, setSelectedIconLoaded] = useState(false);
  const [isInPlay, setIsInPlay] = useState(false);

  // Track which currency is currently being updated
  const [updatingCurrencySymbol, setUpdatingCurrencySymbol] = useState(null);

  useEffect(() => {
    const handlePlayStateChange = () => {
      const state = window.__GAME_PLAY_STATE__;
      setIsInPlay(Boolean(state?.isInPlay));
    };

    window.addEventListener("GAME_PLAY_STATE_UPDATED", handlePlayStateChange);

    // read initial state
    handlePlayStateChange();

    return () => {
      window.removeEventListener(
        "GAME_PLAY_STATE_UPDATED",
        handlePlayStateChange
      );
    };
  }, []);

  useEffect(() => {
    if (!selectedCurrency && currencies.length > 0) {
      const preferred = localStorage.getItem("preferredCurrency") || "BTC";
      const found =
        currencies.find((c) => c.symbol === preferred) || currencies[0];

      setSelectedCurrency(found);
    }
  }, [currencies, selectedCurrency]);

  // Reset icon loaded state when currency changes
  useEffect(() => {
    setSelectedIconLoaded(false);
  }, [selectedCurrency?.symbol]);

  // Memoized currencies with fixed icons
  const finalCurrencies = useMemo(
    () =>
      currencies.map((c) => ({
        ...c,
        iconPath: fixIconUrl(c.iconPath),
      })),
    [currencies]
  );

  // Filtered currencies based on search
  const filteredCurrencies = useMemo(() => {
    if (!searchQuery) return finalCurrencies;
    const query = searchQuery.toLowerCase();
    return finalCurrencies.filter(
      (currency) =>
        currency.name?.toLowerCase().includes(query) ||
        currency.symbol?.toLowerCase().includes(query)
    );
  }, [finalCurrencies, searchQuery]);

  // Game currency from localStorage
  const gameCurrency = useMemo(() => localStorage.getItem("gameCurrency"), []);

  // ==========================================================================
  // RAKEBACK FETCH WITH CACHING
  // ==========================================================================
  const fetchRakeback = useCallback(async () => {
    if (!userId) return;

    if (isRakebackCacheValid(userId)) {
      setRakeback(rakebackCache.data);
      setIsLoadingRakeback(false);
    }

    try {
      const res = await axios.get(
        `/wallet-service/api/wallet/${userId}/rakeback`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const pending = res.data?.pending || 0;

      rakebackCache.data = pending;
      rakebackCache.timestamp = Date.now();
      rakebackCache.userId = userId;

      setRakeback(pending);
    } catch (err) {
      console.error("Rakeback fetch error:", err);
    } finally {
      setIsLoadingRakeback(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchRakeback();
    }
  }, [userId, fetchRakeback]);

  // ==========================================================================
  // CLAIM RAKEBACK
  // ==========================================================================
  const claimRakeback = useCallback(async () => {
    if (rakeback <= 0 || isClaiming) return;

    try {
      setIsClaiming(true);

      const res = await axios.post(
        `/wallet-service/api/wallet/${userId}/rakeback/claim`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (res.data?.success) {
        const usdAmount = Number(res.data.usd || 0).toFixed(2);

        setClaimAmount(usdAmount);
        setShowClaimPopup(true);
        setTimeout(() => setShowClaimPopup(false), 2000);

        rakebackCache.data = 0;
        rakebackCache.timestamp = Date.now();
        setRakeback(0);

        window.dispatchEvent(new Event("preferredCurrencyUpdated"));
        fetchRakeback();
      }
    } catch (err) {
      console.error("Rakeback claim error:", err);
    } finally {
      setIsClaiming(false);
    }
  }, [rakeback, isClaiming, userId, fetchRakeback]);

  // ==========================================================================
  // CLICK OUTSIDE HANDLER
  // ==========================================================================
  useEffect(() => {
    if (!walletDropdownOpen) return;

    const handleClickOutside = (event) => {
      if (
        walletDropdownRef.current &&
        !walletDropdownRef.current.contains(event.target)
      ) {
        setWalletDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [walletDropdownOpen]);

  // ==========================================================================
  // CURRENCY SELECT HANDLER - Smooth transition, no skeleton
  // ==========================================================================
  const onCurrencyClick = useCallback(
    async (currency) => {
      if (!currency) return;

      setUpdatingCurrencySymbol(currency.symbol);

      // 🔥 This now does:
      // - setSelectedCurrency
      // - localStorage updates
      // - walletBalance update
      // - preferredCurrencyUpdated event
      // - backend POST to setPreferredCurrency
      await handleCurrencySelect(currency);

      setUpdatingCurrencySymbol(null);
      setWalletDropdownOpen(false);
    },
    [handleCurrencySelect]
  );

  // ==========================================================================
  // OTHER HANDLERS
  // ==========================================================================
  const toggleDropdown = useCallback(() => {
    setWalletDropdownOpen((prev) => !prev);
    setSearchQuery(""); // Clear search on toggle
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const openWalletSettings = useCallback(() => {
    setWalletDropdownOpen(false);
    setWalletSettingsOpen(true);
  }, [setWalletSettingsOpen]);

  const openWalletModal = useCallback(() => {
    setWalletModalOpen(true);
  }, [setWalletModalOpen]);

  // ==========================================================================
  // RENDER
  // ==========================================================================
  if (!hasToken) return null;

  // ⭐ KEY FIX: Determine if we should show skeleton
  // Only show skeleton when currencies array is EMPTY (first load)
  // NOT when isLoadingCurrencies is true (could be background refresh)
  const showCurrencyListSkeleton = currencies.length === 0;

  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
      {/* Claim Popup Animation */}
      <ClaimPopup show={showClaimPopup} amount={claimAmount} />

      {/* Balance Display with Dropdown */}
      <div
        className="relative flex justify-center sm:justify-start"
        ref={walletDropdownRef}
      >
        {/* Wallet Button */}
        <button
          onClick={toggleDropdown}
          className="wallet-btn relative flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-[8px] text-[#E1E1E1] transition-all duration-300 max-w-[150px] sm:max-w-none"
        >
          {/* Show skeleton ONLY on initial load when no currency selected yet */}
          {!selectedCurrency ? (
            CurrencySkeletonLoader ? (
              <CurrencySkeletonLoader />
            ) : (
              <BalanceSkeleton />
            )
          ) : (
            <>
              {/* Coin logo */}
              <div className="relative w-4 h-4 sm:w-5 sm:h-5">
                {!selectedIconLoaded && (
                  <div className="absolute inset-0 rounded-full bg-white/30 animate-pulse" />
                )}
                <img
                  src={
                    fixIconUrl(selectedCurrency?.iconPath) ||
                    "/icons/default-coin.svg"
                  }
                  alt={selectedCurrency?.name || "Currency"}
                  className={`w-4 h-4 sm:w-5 sm:h-5 object-contain transition-opacity duration-200 ${
                    selectedIconLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  loading="eager"
                  onLoad={() => setSelectedIconLoaded(true)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/icons/default-coin.svg";
                    setSelectedIconLoaded(true);
                  }}
                />
              </div>

              {/* Balance text - show updating indicator if needed */}
              <span className="text-white text-xs sm:text-sm font-semibold tracking-wide truncate flex items-center gap-1">
                {isInPlay ? (
                  <span className="flex items-center gap-1 text-[#FFB8A1] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#28C203] animate-pulse" />
                    In Play
                  </span>
                ) : isUpdatingBalance ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="opacity-70">...</span>
                  </>
                ) : (
                  `${Number(selectedCurrency?.usdValue || 0).toFixed(2)} ${
                    gameCurrency || "USD"
                  }`
                )}
              </span>

              {/* Dropdown arrow */}
              <svg
                className={`w-3 sm:w-4 h-3 sm:h-4 text-white/70 transition-transform duration-200 ${
                  walletDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </>
          )}
        </button>

        {/* Wallet Dropdown */}
        {walletDropdownOpen && (
          <div
            className="custom-header wallet-dropdown-card absolute left-[80%] sm:left-1/2 md:left-[65%] -translate-x-1/2 mt-12 w-[267px] rounded-[24px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] dropdown-animate-in"
            style={{
              padding: "0 12px 10px",
              border:
                "2px solid var(--drop-down-order, rgba(255,255,255,0.05))",
              background: "rgba(200,200,225,0.20)",
              backdropFilter: "blur(67.5px)",
              WebkitBackdropFilter: "blur(67.5px)",
            }}
          >
            {/* Rakeback Section */}
            <RakebackSection
              rakeback={rakeback}
              isClaiming={isClaiming}
              onClaim={claimRakeback}
              selectedCurrency={selectedCurrency}
            />

            {/* Search Box */}
            {/* <SearchBox value={searchQuery} onChange={handleSearchChange} /> */}

            {/* Currency List - ⭐ KEY FIX: Skeleton ONLY when list is empty */}
            <div className="wallet-list flex-1 mt-2.5 max-h-[280px] overflow-y-auto pr-1.5 pb-2">
              {showCurrencyListSkeleton ? (
                <CurrencyListSkeleton />
              ) : filteredCurrencies.length === 0 ? (
                <div className="flex items-center justify-center py-8 text-white/50 text-sm">
                  No currencies found
                </div>
              ) : (
                filteredCurrencies.map((currency) => (
                  <CurrencyItem
                    key={currency.symbol}
                    currency={currency}
                    isSelected={selectedCurrency?.symbol === currency.symbol}
                    isUpdating={updatingCurrencySymbol === currency.symbol}
                    onClick={() => onCurrencyClick(currency)}
                  />
                ))
              )}
            </div>

            {/* Bottom Settings Bar */}
            {/* <WalletSettingsButton onClick={openWalletSettings} /> */}
          </div>
        )}
      </div>

      {/* Wallet Modal Button */}
      <WalletButton onClick={openWalletModal} />

      {/* Styles */}
      <style>{`
        .dropdown-animate-in {
          animation: dropdownFadeIn 0.2s ease-out;
        }
        
        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        .wallet-list::-webkit-scrollbar {
          width: 6px;
        }
        .wallet-list::-webkit-scrollbar-track {
          background: transparent;
        }
        .wallet-list::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.27);
          border-radius: 10px;
        }
        .wallet-list::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.35);
        }

        .wallet-item * {
          transition: all 0.25s ease;
        }

        .wallet-item:hover .coin-name {
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
        }

        @keyframes claim-float {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          40% {
            opacity: 1;
            transform: translateY(-10px) scale(1);
          }
          80% {
            opacity: 1;
            transform: translateY(-25px) scale(1.05);
          }
          100% {
            opacity: 0;
            transform: translateY(-40px) scale(0.7);
          }
        }

        .animate-claimPopup {
          animation: claim-float 1.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default memo(WalletDropdownCenter);
