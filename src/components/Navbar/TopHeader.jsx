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
                  <div className="view_btn flex items-center justify-center rounded-full overflow-hidden hover:opacity-80 transition-all">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      viewBox="0 0 35 35"
                      fill="none"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="34"
                        height="34"
                        rx="7.5"
                        fill="url(#paint0_linear_9142_775)"
                      />
                      <rect
                        x="0.5"
                        y="0.5"
                        width="34"
                        height="34"
                        rx="7.5"
                        stroke="url(#paint1_linear_9142_775)"
                      />
                      <path
                        d="M27.1612 8.5261C27.2324 8.17793 28.0307 8.18584 27.9991 8.62897L27.9833 19.5727C27.8173 20.2374 27.3667 20.6884 26.7107 20.8704C26.5289 22.4056 25.7542 23.7429 24.6555 24.7874C24.782 26.2592 24.5449 27.7469 22.8375 28.0001H12.2535C10.5224 27.7864 10.2458 26.275 10.3881 24.7874C9.28936 23.735 8.51473 22.3977 8.33293 20.8704C7.61363 20.6647 7.10775 20.1504 7.04451 19.3828C6.98918 18.726 6.98128 17.5153 7.04451 16.8585C7.10775 16.2017 7.62944 15.5845 8.29341 15.4579C8.39616 14.6824 8.52263 13.9228 8.77558 13.1869C10.3644 8.51819 15.5655 5.97019 20.2765 7.39453C23.8097 8.47071 26.434 11.7467 26.7423 15.4342L27.1612 15.5766V8.5261ZM11.2022 22.5876C12.4827 23.8695 16.7827 24.2177 18.5454 24.1306C20.4346 24.0357 24.4105 23.4897 24.6476 21.1157C24.8373 19.2483 24.5132 17.088 24.6476 15.1889C24.3947 13.3689 22.7506 12.9732 21.2408 12.5697C20.9642 12.4984 20.2449 12.269 20.0077 12.2769C19.9287 12.2769 19.9129 12.2927 19.8496 12.3323C19.5888 12.4826 18.9881 13.3372 18.7509 13.3847H16.3006L15.1386 12.2927C13.4471 12.7121 10.641 12.9732 10.4434 15.1968C10.309 16.724 10.4118 18.8843 10.4987 20.4431C10.5462 21.3531 10.4987 21.8991 11.1943 22.6034L11.2022 22.5876Z"
                        fill="white"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_9142_775"
                          x1="17.5"
                          y1="35"
                          x2="17.5"
                          y2="4.17233e-06"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#5A3799" />
                          <stop offset="1" stop-color="#DC1FFF" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_9142_775"
                          x1="2.45192"
                          y1="-7.76018e-06"
                          x2="19.1272"
                          y2="38.3892"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="white" stop-opacity="0.4" />
                          <stop
                            offset="0.405687"
                            stop-color="white"
                            stop-opacity="0.01"
                          />
                          <stop
                            offset="0.574372"
                            stop-color="white"
                            stop-opacity="0.01"
                          />
                          <stop
                            offset="1"
                            stop-color="white"
                            stop-opacity="0.1"
                          />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                }
                className="rounded-lg transition-colors"
              />
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default TopHeader;
