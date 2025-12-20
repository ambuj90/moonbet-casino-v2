// components/Navbar/TopHeader.jsx - OPTIMIZED VERSION
// - CSS animations instead of Framer Motion where possible
// - Memoized handlers with useCallback
// - Skeleton loader support for currencies
// - Optimized search handling

import React, { useState, useCallback, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import LoginTrigger from "../LoginSignup/LoginTrigger";
import WalletDropdownCenter from "./WalletDropdownCenter";
import { useGameSearchStore } from "../../store/useGameSearchStore";

// =============================================================================
// MEMOIZED SUB-COMPONENTS
// =============================================================================

// Hamburger Icon with CSS animation
const HamburgerIcon = memo(({ isCollapsed }) => (
  <div
    className="flex flex-col gap-1 w-5 transition-transform duration-300"
    style={{ transform: isCollapsed ? "rotate(0deg)" : "rotate(180deg)" }}
  >
    <span className="w-5 h-[2px] bg-[#9292D2]" />
    <div className="flex justify-end">
      <span className="w-4 h-[3px] bg-[#9292D2]" />
    </div>
    <span className="w-5 h-[2px] bg-[#9292D2]" />
  </div>
));

HamburgerIcon.displayName = "HamburgerIcon";

// Desktop Search Bar (for non-logged in users)
const DesktopSearchBar = memo(({ searchTerm, setSearchTerm, onSubmit }) => {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") onSubmit();
    },
    [onSubmit]
  );

  const handleChange = useCallback(
    (e) => setSearchTerm(e.target.value),
    [setSearchTerm]
  );

  return (
    <div className="relative hidden md:flex items-center mr-2">
      <div className="trust_btn flex items-center bg-[var(--bg-dark-purple-2)] rounded-lg overflow-hidden w-[260px]">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search games"
            className="w-full px-4 py-2.5 pl-10 text-sm text-[#7171B4] placeholder-[#7171B4] focus:border-[#F07730]/50 focus:bg-white/10 focus:outline-none transition-all font-semibold
         bg-[#0D0E36]"
          />

          {/* Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="absolute left-3 top-1/2 -translate-y-1/2"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.91938 1.89852C7.45073 -0.632855 11.5701 -0.632826 14.1015 1.89852C16.6328 4.42991 16.6329 8.54917 14.1015 11.0806C11.9541 13.2277 8.76039 13.5528 6.26647 12.0571C6.26647 12.0571 6.0863 11.9497 5.93426 12.1014C5.10789 12.9277 2.62776 15.4073 2.62776 15.4073C1.96853 16.0662 1.04706 16.2224 0.46251 15.6377L0.362195 15.5375C-0.222361 14.9528 -0.0661856 14.0314 0.59279 13.3722C0.59279 13.3722 3.07764 10.8879 3.9058 10.0598C4.04794 9.91772 3.94781 9.74149 3.94358 9.73424C2.44747 7.24024 2.7721 4.04606 4.91938 1.89852ZM12.9029 3.09771C11.0325 1.22729 7.98972 1.2274 6.11926 3.09771C4.24892 4.96802 4.24787 8.0109 6.11795 9.88137C7.98846 11.7517 11.0325 11.7517 12.9029 9.88137C14.7732 8.01101 14.7731 4.96809 12.9029 3.09771Z"
              fill="#555594"
            />
          </svg>
        </div>
      </div>
    </div>
  );
});

DesktopSearchBar.displayName = "DesktopSearchBar";

// Animated Search Field (for logged in users)
const AnimatedSearchField = memo(
  ({
    isOpen,
    searchTerm,
    setSearchTerm,
    onSubmit,
    onToggle,
    setGlobalSearchOpen,
  }) => {
    const handleKeyDown = useCallback(
      (e) => {
        if (e.key === "Enter") onSubmit();
      },
      [onSubmit]
    );

    const handleChange = useCallback(
      (e) => setSearchTerm(e.target.value),
      [setSearchTerm]
    );

    return (
      <div className="relative flex items-center mr-2">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="search-wrapper"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 220, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center bg-[var(--bg-dark-purple-2)] border border-white/10 rounded-lg overflow-hidden"
            >
              <input
                type="text"
                placeholder="Search games..."
                autoFocus
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="px-3 py-2 text-white text-sm bg-transparent outline-none w-full"
              />

              <button
                onClick={onSubmit}
                className="px-2 py-1 mr-2 text-[10px] font-semibold text-white rounded-md
                bg-gradient-to-r from-[#a62a00] to-[#ffb8a1]
                hover:shadow-[0_0_6px_#ffb8a1] transition-all duration-300"
              >
                Ent.
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search toggle button */}
        <button
          onClick={() => setGlobalSearchOpen(true)}
          className="w-10 h-10 hidden md:flex items-center justify-center rounded-full "
        >
          <img
            src="/icons/search.svg"
            alt="Search"
            className="w-10 h-10 object-contain"
            loading="lazy"
          />
        </button>
      </div>
    );
  }
);

AnimatedSearchField.displayName = "AnimatedSearchField";

// Login/Register Buttons
const AuthButtons = memo(() => (
  <>
    <LoginTrigger
      buttonText={
        <button
          className="px-8 py-3 text-white font-semibold rounded-[8px] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: "var(--CTA-HOVER)" }}
        >
          Login
        </button>
      }
    />

    <LoginTrigger
      buttonText={
        <button
          className="text-white px-8 py-2.5 font-semibold rounded-[8px] transition-all duration-200 hover:scale-[1.02] hover:bg-white/10 active:scale-[0.98]"
          style={{
            border: "1px solid #FFB8A1",
            background: "transparent",
          }}
        >
          Register
        </button>
      }
      defaultTab="register"
    />
  </>
));

AuthButtons.displayName = "AuthButtons";

// Logged-in User Actions
const UserActions = memo(({ onNavigateLeaderboard }) => (
  <>
    {/* Leaderboard Button */}
    {/* <button
      onClick={onNavigateLeaderboard}
      className="w-10 h-10 hidden md:flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-200"
    >
      <img
        src="/icons/leaderboard.svg"
        alt="Leaderboard"
        className="w-10 h-10 object-contain"
        loading="lazy"
      />
    </button> */}

    {/* Profile Button */}
    <LoginTrigger
      buttonText={
        <div className="flex items-center justify-center rounded-full hover:opacity-80 transition-all duration-200">
          <img
            src="/icons/user-avatar.svg"
            className="w-10 h-10"
            alt="User"
            loading="lazy"
          />
        </div>
      }
      className="rounded-lg"
    />
  </>
));

UserActions.displayName = "UserActions";

// =============================================================================
// MAIN TOP HEADER COMPONENT
// =============================================================================

const TopHeader = ({
  onDesktopSidebarToggle,
  sidebarCollapsed = false,
  hasToken = false,
  userName = "",
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
  setGlobalSearchOpen,
  // New props from optimized Header.jsx
  isLoadingCurrencies = false,
  isUpdatingBalance = false,
  CurrencySkeletonLoader = null,
}) => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  // Use Zustand store selectors
  const searchTerm = useGameSearchStore((s) => s.searchTerm);
  const setSearchTerm = useGameSearchStore((s) => s.setSearchTerm);

  // Memoized handlers
  const toggleDesktopSidebar = useCallback(() => {
    onDesktopSidebarToggle?.(!sidebarCollapsed);
  }, [onDesktopSidebarToggle, sidebarCollapsed]);

  const submitSearch = useCallback(() => {
    const value = searchTerm.trim();
    navigate(value.length > 0 ? `/casino/${value.toLowerCase()}` : "/casino");
  }, [searchTerm, navigate]);

  const toggleSearch = useCallback(() => {
    setShowSearch((prev) => !prev);
  }, []);

  const navigateToLeaderboard = useCallback(() => {
    navigate("/leaderboard2");
  }, [navigate]);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#1C1D49] z-50 header-animate-in">
      <div className="h-full px-4 lg:px-4 flex items-center justify-between">
        {/* LEFT — Logo + Sidebar */}
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle Button */}
          <button
            onClick={toggleDesktopSidebar}
            className="hidden lg:flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 hover:bg-white/10 active:scale-95"
          >
            <HamburgerIcon isCollapsed={sidebarCollapsed} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/home-assets/cri-logo.svg"
              alt="MoonBet Logo"
              className="hidden md:block object-contain"
              loading="eager"
            />
            <img
              src="/home-assets/mobile-logo.svg"
              alt="Moonbet Logo mobile"
              className="w-30 h-30 object-contain block md:hidden"
              loading="eager"
            />
          </Link>
        </div>

        {/* CENTER — Balance Handler */}
        <WalletDropdownCenter
          hasToken={hasToken}
          userId={userId}
          walletBalance={walletBalance}
          setWalletBalance={setWalletBalance}
          currencies={currencies}
          setCurrencies={setCurrencies}
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
          setWalletModalOpen={setWalletModalOpen}
          setWalletSettingsOpen={setWalletSettingsOpen}
          handleCurrencySelect={handleCurrencySelect}
          isLoadingCurrencies={isLoadingCurrencies}
          isUpdatingBalance={isUpdatingBalance}
          CurrencySkeletonLoader={CurrencySkeletonLoader}
        />

        {/* DESKTOP SEARCH — Show only when NOT logged in */}
        {!hasToken && (
          <DesktopSearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSubmit={submitSearch}
          />
        )}

        {/* RIGHT SIDE — Actions */}
        <div className="flex items-center gap-2">
          {/* Show login/register when NOT logged in */}
          {!hasToken && <AuthButtons />}

          {/* Show when LOGGED IN */}
          {hasToken && (
            <div className="flex items-center">
              {/* Animated Search Field */}
              <AnimatedSearchField
                isOpen={showSearch}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onSubmit={submitSearch}
                onToggle={toggleSearch}
                setGlobalSearchOpen={setGlobalSearchOpen}
              />

              {/* User Actions */}
              <UserActions onNavigateLeaderboard={navigateToLeaderboard} />
            </div>
          )}
        </div>
      </div>

      {/* CSS for header animation */}
      <style>{`
        .header-animate-in {
          animation: slideDown 0.3s ease-out;
        }
       
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
};

export default memo(TopHeader);
