// components/Navbar/TopHeader.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LoginTrigger from "../LoginSignup/LoginTrigger";
import WalletDropdownCenter from "./WalletDropdownCenter";

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
  walletDropdownOpen,
  setWalletDropdownOpen,
}) => {
  // Toggle desktop sidebar collapse
  const toggleDesktopSidebar = () => {
    const newCollapsedState = !sidebarCollapsed;
    if (onDesktopSidebarToggle) {
      onDesktopSidebarToggle(newCollapsedState);
    }
  };
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 h-16 bg-[#1C1D49] z-50"
    >
      <div className="h-full px-4 lg:px-4 flex items-center justify-between">
        {/* Left Section - Logo & Hamburger */}
        <div className="flex items-center gap-3">
          {/* Desktop Sidebar Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDesktopSidebar}
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 group"
          >
            <motion.div
              animate={{ rotate: sidebarCollapsed ? 0 : 180 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-1 w-5"
            >
              {/* Top bar */}
              <span className="hidden md:block w-5 h-[2px] bg-[#9292D2]" />

              {/* Middle bar aligned RIGHT */}
              <div className="flex justify-end">
                <span className="hidden md:block w-4 h-[3px] bg-[#9292D2]" />
              </div>

              {/* Bottom bar */}
              <span className="hidden md:block w-5 h-[2px] bg-[#9292D2]" />
            </motion.div>
          </motion.button>

          {/* Logo with 3D Coin */}
          <Link to="/" className="flex items-center gap-2">
            <span className="flex items-center gap-2 text-xl font-bold text-white tracking-wider">
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
            </span>
          </Link>
        </div>

        {/* Center Section - Balance and Coins */}
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

        {/* Right Section - Profile and Actions */}
        <div className="flex items-center">
          {/* ✅ Show Login & Register only when NOT logged in */}
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
                    className="
    px-8 py-3 text-white text-sm font-semibold rounded-[8px]
    font-['Neue_Plack',sans-serif] text-[16px]
     transition-all duration-300
    flex items-center justify-center
  "
                    style={{
                      background: "var(--CTA-HOVER)",
                    }}
                  >
                    Login
                  </motion.button>
                }
                className="p-2 rounded-lg transition-colors"
              />

              <LoginTrigger
                buttonText={
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                      background: "rgba(255,255,255,0.15)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="text-white px-8 py-3 font-[600] text-[16px] font-['Neue_Plack',sans-serif] rounded-[8px] flex items-center justify-center transition-all duration-300 "
                    style={{
                      border: "1px solid var(--icons, #5A3799)",
                      background: "transparent",
                    }}
                  >
                    Register
                  </motion.button>
                }
                defaultTab="register"
                className="p-2 transition-colors"
              />
            </>
          )}

          {/* ✅ Profile & Wallet shown only when logged in */}
          {/* ✅ Profile, Leaderboard and Wallet shown only when logged in */}
          {hasToken && (
            <div className="flex items-center">
              {/* ⭐ Leaderboard Button */}
              <button
                onClick={() => navigate("/leaderboard2")}
                className="w-10 h-10 md:flex hidden items-center justify-center rounded-full hover:bg-white/10 transition-all"
              >
                <img
                  src="/icons/leaderboard.svg"
                  alt="Leaderboard"
                  className="w-10 h-10 object-contain"
                />
              </button>

              {/* ⭐ Profile Button (already existing LoginTrigger) */}
              <LoginTrigger
                buttonText={
                  <div className="view_btn w-10 h-10 flex items-center justify-center rounded-full overflow-hidden hover:opacity-80 transition-all">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                    >
                      <path d="M20.1612 1.52601C20.2324..." fill="#CED5E3" />
                    </svg>
                  </div>
                }
                className="rounded-lg hover:opacity-80 transition-colors"
              />
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default TopHeader;
