// components/Navbar/TopHeader.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LoginTrigger from "../LoginSignup/LoginTrigger";
import WalletDropdownCenter from "./WalletDropdownCenter";
import { useGameSearchStore } from "../../store/useGameSearchStore";

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
}) => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const searchTerm = useGameSearchStore((s) => s.searchTerm);
  const setSearchTerm = useGameSearchStore((s) => s.setSearchTerm);

  const toggleDesktopSidebar = () => {
    const newCollapsed = !sidebarCollapsed;
    if (onDesktopSidebarToggle) onDesktopSidebarToggle(newCollapsed);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 h-16 bg-[#1C1D49] z-50"
    >
      <div className="h-full px-4 lg:px-4 flex items-center justify-between">
        {/* LEFT — Logo + Sidebar */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDesktopSidebar}
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg transition-all"
          >
            <motion.div
              animate={{ rotate: sidebarCollapsed ? 0 : 180 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-1 w-5"
            >
              <span className="w-5 h-[2px] bg-[#9292D2]" />
              <div className="flex justify-end">
                <span className="w-4 h-[3px] bg-[#9292D2]" />
              </div>
              <span className="w-5 h-[2px] bg-[#9292D2]" />
            </motion.div>
          </motion.button>

          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo/logo.svg"
              alt="Moonbet Logo"
              className="w-30 h-30 object-contain hidden md:block md:mx-4"
            />
            <img
              src="/home-assets/mobile-logo.svg"
              alt="Moonbet Logo mobile"
              className="w-30 h-30 object-contain block md:hidden"
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
        />

        {/* RIGHT SIDE — Actions */}
        <div className="flex items-center gap-2">
          {/* Show login/register only when not logged in */}
          {!hasToken && (
            <>
              <LoginTrigger
                buttonText={
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                      background:
                        "linear-gradient(0deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.25) 100%), var(--CTA-HOVER)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 text-white font-semibold rounded-[8px] transition-all"
                    style={{ background: "var(--CTA-HOVER)" }}
                  >
                    Login
                  </motion.button>
                }
              />

              <LoginTrigger
                buttonText={
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                      background: "rgba(255,255,255,0.15)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="text-white px-8 py-2.5 font-semibold rounded-[8px] transition-all"
                    style={{
                      border: " 1px solid #FFB8A1",
                      background: "transparent",
                    }}
                  >
                    Register
                  </motion.button>
                }
                defaultTab="register"
              />
            </>
          )}

          {/* SHOW WHEN LOGGED IN */}
          {hasToken && (
            <div className="flex items-center">
              {/* Animated Search Field */}
              <div className="relative flex items-center mr-2">
                <AnimatePresence>
                  {showSearch && (
                    <motion.input
                      key="search-input"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 180, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      type="text"
                      placeholder="Search games..."
                      autoFocus
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value.trim())}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const value = searchTerm.trim();

                          if (value.length > 0) {
                            navigate(`/casino/${value.toLowerCase()}`);
                          } else {
                            navigate("/casino");
                          }
                        }
                      }}
                      className="px-3 py-2 mr-2 text-white text-sm rounded-lg 
                                 bg-[var(--bg-dark-purple-2)] border border-white/10 outline-none"
                    />
                  )}
                </AnimatePresence>

                {/* Search Button */}
                <button
                  onClick={() => setShowSearch((prev) => !prev)}
                  className="w-10 h-10 hidden md:flex items-center justify-center 
                             rounded-full transition-all"
                >
                  <img
                    src="/icons/search.svg"
                    alt="Search"
                    className="w-10 h-10 object-contain"
                  />
                </button>
              </div>

              {/* Leaderboard Button */}
              <button
                onClick={() => navigate("/leaderboard2")}
                className="w-10 h-10 hidden md:flex items-center justify-center 
                           rounded-full hover:bg-white/10 transition-all"
              >
                <img
                  src="/icons/leaderboard.svg"
                  alt="Leaderboard"
                  className="w-10 h-10 object-contain"
                />
              </button>

              {/* Profile Button */}
              <LoginTrigger
                buttonText={
                  <div className="flex items-center justify-center rounded-full hover:opacity-80 transition-all">
                    <img
                      src="/icons/user-avatar.svg"
                      className="w-10 h-10"
                      alt="User"
                    />
                  </div>
                }
                className="rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default TopHeader;
