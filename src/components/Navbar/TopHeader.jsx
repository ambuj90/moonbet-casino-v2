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
        <div className="flex items-center justify-center pl-3">
          <img
            src="/icons/search.svg"
            alt="Search"
            className="w-10 h-10 object-contain opacity-60"
            loading="lazy"
          />
        </div>

        <input
          type="text"
          placeholder="Search games..."
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
      </div>
    </div>
  );
});

DesktopSearchBar.displayName = "DesktopSearchBar";

// Animated Search Field (for logged in users)
const AnimatedSearchField = memo(({ isOpen, searchTerm, setSearchTerm, onSubmit, onToggle, setGlobalSearchOpen }) => {
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
  className="w-10 h-10 hidden md:flex items-center justify-center rounded-full hover:bg-white/10"
>
  <img src="/icons/search.svg" alt="Search" className="w-10 h-10 object-contain" loading="lazy" />
</button>

    </div>
  );
});

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
    <button
      onClick={onNavigateLeaderboard}
      className="w-10 h-10 hidden md:flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-200"
    >
      <img
        src="/icons/leaderboard.svg"
        alt="Leaderboard"
        className="w-10 h-10 object-contain"
        loading="lazy"
      />
    </button>

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
    <header
      className="fixed top-0 left-0 right-0 h-16 bg-[#1C1D49] z-50 header-animate-in"
    >
      <div className="h-full px-4 lg:px-4 flex items-center justify-between">
        {/* LEFT — Logo + Sidebar */}
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle Button */}
          <button
            onClick={toggleDesktopSidebar}
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 hover:bg-white/10 active:scale-95"
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