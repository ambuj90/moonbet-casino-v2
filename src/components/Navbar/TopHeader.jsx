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

  const submitSearch = () => {
    const value = searchTerm.trim();

    if (value.length > 0) {
      navigate(`/casino/${value.toLowerCase()}`);
    } else {
      navigate("/casino");
    }
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="153"
              height="18"
              viewBox="0 0 153 18"
              fill="none"
              className="hidden sm:block"
            >
              <g clip-path="url(#clip0_9612_7404)">
                <path
                  d="M97.7389 0C105.628 5.24836e-05 108.37 1.32711 108.37 5.04492C108.37 6.81343 107.925 8.02066 106.721 8.80371C108.018 9.54712 108.757 10.8341 108.757 12.4629C108.757 16.2611 105.923 17.5879 97.8854 17.5879C95.4409 17.5879 91.5694 17.206 89.402 16.8447C89.1791 16.805 89.0691 16.664 89.069 16.4033H89.07V1.24707C89.07 1.006 89.1799 0.864332 89.403 0.803711C91.5512 0.421552 95.3492 0 97.7389 0ZM123.152 0C125.56 2.8776e-05 127.355 0.221732 128.782 0.523438C128.986 0.563085 129.097 0.703732 129.153 0.905273L129.56 2.93457C129.634 3.23633 129.524 3.35647 129.246 3.2959C127.376 2.93471 124.634 2.79395 123.115 2.79395C117.096 2.79396 114.965 4.08034 114.557 7.45801H129.06C129.282 7.45801 129.413 7.59894 129.413 7.83984V9.58887C129.413 9.84988 129.282 9.97168 129.06 9.97168H114.521C114.928 13.4087 117.04 14.7148 123.115 14.7148C124.634 14.7148 127.375 14.5543 129.246 14.2129C129.524 14.1325 129.634 14.273 129.56 14.5537L129.153 16.584C129.116 16.8052 129.004 16.9248 128.801 16.9854C127.375 17.2871 125.56 17.5283 123.152 17.5283C114.503 17.5283 111.316 14.5933 111.335 8.74414C111.316 2.95473 114.504 0 123.152 0ZM70.1217 0C72.8064 0.000114809 74.3437 1.30622 75.5846 4.74414C75.6952 5.16595 76.5297 7.41892 77.8073 11.1777C78.7326 13.8712 79.2887 14.5947 80.5114 14.5947C81.6224 14.5947 82.1227 13.609 82.1227 11.3184V0.623047C82.1228 0.362242 82.2336 0.241211 82.4557 0.241211H84.734C84.9559 0.241372 85.0845 0.361318 85.0846 0.623047V12.7441C85.0846 15.5184 83.3441 17.5088 80.8063 17.5088C78.1204 17.5087 76.602 16.2022 75.361 12.7441C75.2499 12.3211 74.3606 9.88816 73.1393 6.33105C72.2312 3.63752 71.6566 2.91406 70.4166 2.91406C69.3055 2.91407 68.8053 3.91848 68.8053 6.19043L68.8248 16.8848V16.8857C68.8248 17.1466 68.7137 17.2676 68.4723 17.2676H66.194C65.9721 17.2675 65.862 17.1475 65.862 16.8857V4.74414C65.8621 1.95028 67.6032 0 70.1217 0ZM6.39125 0C8.31722 0 9.59653 1.06596 10.4479 3.39746C11.3733 5.88975 11.5949 9.16781 12.2809 10.9365C12.5771 11.7203 12.9659 12.2029 13.5582 12.2031H14.0026C14.5951 12.2031 15.0022 11.7204 15.2995 10.9365C15.9844 9.1678 16.2067 5.89085 17.1139 3.39746C17.9856 1.06596 19.2648 0 21.1725 0H21.8942C24.5244 0 26.08 1.64899 26.358 4.52344L27.5631 16.9062L27.5621 16.9053C27.5804 17.1465 27.4875 17.2871 27.2653 17.2871H24.9694C24.7289 17.2871 24.598 17.1465 24.5807 16.9053L23.5621 5.84863C23.3764 3.73897 22.8018 2.89464 21.7467 2.89453H21.2096C20.4314 2.89458 19.8763 3.43777 19.4694 4.70312C18.8586 6.6536 18.617 9.80892 17.7282 12.1006C17.025 13.9704 15.9501 15.1357 14.2282 15.1357H13.3395C11.6359 15.1357 10.5613 13.9693 9.85707 12.1006C8.96823 9.80891 8.72735 6.6536 8.09731 4.70312C7.70872 3.43681 7.15275 2.89471 6.37465 2.89453H5.81898C4.76286 2.89465 4.20754 3.73898 4.00356 5.84863L3.00356 16.9053C2.9853 17.1464 2.83699 17.287 2.61488 17.2871H0.316055C0.0757352 17.287 -0.0166572 17.1464 0.00160217 16.9053L1.20473 4.52344C1.48275 1.64915 3.05793 0.000180736 5.66859 0H6.39125ZM152.27 0.242188C152.474 0.242188 152.585 0.362619 152.641 0.583984L152.993 2.6543C153.029 2.93617 152.938 3.07617 152.66 3.07617H143.806V16.8652H143.805C143.805 17.1261 143.695 17.2479 143.455 17.248H141.195C140.972 17.248 140.842 17.1273 140.842 16.8652V3.07617H131.989C131.712 3.07617 131.618 2.93505 131.656 2.6543L132.008 0.583984C132.045 0.362619 132.176 0.242188 132.379 0.242188H152.27ZM103.887 9.70801C102.554 9.94915 100.831 10.0498 98.609 10.0498H92.0153V14.4932C93.7382 14.7343 96.1643 14.8545 97.4977 14.8545C104.073 14.8545 105.647 14.3117 105.647 12.1006C105.647 10.7944 105.128 10.0494 103.887 9.70801ZM97.3317 2.75488C95.702 2.75488 93.4978 2.91565 92.0153 3.11719V7.7793H98.2204C103.943 7.7793 105.258 7.33777 105.258 5.28711C105.258 3.23675 103.758 2.75489 97.3317 2.75488Z"
                  fill="white"
                />
                <path
                  d="M45.0848 11.5132C43.4723 17.9504 36.1104 20.3601 31.7572 15.2048C25.0315 7.23899 34.6857 -3.9185 42.1867 2.4174C46.0944 5.71806 50.6678 19.0452 57.1033 13.7885C62.7919 9.14097 56.8699 0.324889 51.1032 4.0815C49.9687 4.82048 49.1031 6.09361 48.0691 6.96365C48.6922 0.817179 55.3996 -1.95485 59.906 1.84912C68.8803 9.42621 58.3727 22.5881 50.607 15.6894C46.6901 12.2093 42.9558 0.518722 36.4849 4.21145C30.4238 7.6707 34.2991 17.1377 40.7468 14.6949C42.4241 14.0595 43.6053 12.5143 45.0827 11.5143L45.0848 11.5132Z"
                  fill="url(#paint0_linear_9612_7404)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_9612_7404"
                  x1="46.4205"
                  y1="0.111752"
                  x2="45.9999"
                  y2="27"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FFB8A1" />
                  <stop offset="1" stop-color="#A62A00" />
                </linearGradient>
                <clipPath id="clip0_9612_7404">
                  <rect width="153" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
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
                    <motion.div
                      key="search-wrapper"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 220, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center bg-[var(--bg-dark-purple-2)] border border-white/10 rounded-lg overflow-hidden"
                    >
                      {/* INPUT */}
                      <input
                        type="text"
                        placeholder="Search games..."
                        autoFocus
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && submitSearch()}
                        className="px-3 py-2 text-white text-sm bg-transparent outline-none w-full"
                      />

                      <button
                        onClick={submitSearch}
                        className="px-2 py-1 mr-2 text-[10px] font-semibold text-white rounded-md 
             bg-gradient-to-r from-[#a62a00] to-[#ffb8a1]
             hover:shadow-[0_0_6px_#ffb8a1] transition-all duration-300"
                      >
                        Ent.
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ICON button to toggle search */}
                <button
                  onClick={() => setShowSearch((prev) => !prev)}
                  className="w-10 h-10 hidden md:flex items-center justify-center rounded-full transition-all"
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
