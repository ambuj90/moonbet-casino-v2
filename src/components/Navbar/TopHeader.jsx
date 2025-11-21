// components/Navbar/TopHeader.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LoginTrigger from "../LoginSignup/LoginTrigger";

const TopHeader = ({
  onDesktopSidebarToggle,
  sidebarCollapsed,
  hasToken,
  userName,
  handleLogout,
  children, // This will be the WalletDropdownCenter component
}) => {
  // Toggle desktop sidebar collapse
  const toggleDesktopSidebar = () => {
    const newCollapsedState = !sidebarCollapsed;
    if (onDesktopSidebarToggle) {
      onDesktopSidebarToggle(newCollapsedState);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 h-16 bg-[rgba(20,20,20,0.80)] shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px] border-b border-white/10 z-50"
    >
      <div className="h-full px-4 lg:px-4 flex items-center justify-between">
        {/* Left Section - Logo & Hamburger */}
        <div className="flex items-center gap-3">
          {/* Desktop Sidebar Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDesktopSidebar}
            className="hidden md:flex view_btn items-center justify-center w-10 h-10 rounded-lg from-[rgba(30,30,30,0.15)] to-[rgba(75,75,75,0.15)] shadow-[1px_2px_1px_0_rgba(0,0,0,0.40)] backdrop-blur-[1.5px] hover:from-[rgba(40,40,40,0.20)] hover:to-[rgba(85,85,85,0.20)] transition-all duration-300 group"
          >
            <motion.div
              animate={{ rotate: sidebarCollapsed ? 0 : 180 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-1"
            >
              <span className="hidden md:block w-5 h-0.5 bg-[#7D7D7D]" />
              <span className="hidden md:block w-3 h-0.5 bg-[#7D7D7D]" />
              <span className="hidden md:block w-5 h-0.5 bg-[#7D7D7D]" />
            </motion.div>
          </motion.button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="flex items-center gap-2 text-xl font-bold text-white tracking-wider">
              <img
                src="/icons/logo.svg"
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

        {/* Center Section - Wallet Dropdown (passed as children) */}
        {children}

        {/* Right Section - Profile and Actions */}
        <div className="flex items-center gap-2">
          {/* Show Login & Register only when NOT logged in */}
          {!hasToken && (
            <>
              <LoginTrigger
                buttonText={
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-[150px] h-[36px] 
                      bg-gradient-to-r from-[#F07730] to-[#EFD28E]
                      text-black font-[600] text-[16px] 
                      font-['Neue_Plack',sans-serif]
                      rounded-lg shadow-md 
                      transition-all duration-300
                      hover:from-[#F07730]/90 hover:to-[#EFD28E]/90
                      r"
                  >
                    LOGIN
                  </motion.button>
                }
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              />

              <LoginTrigger
                buttonText={
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-[129px] h-[36px]
                      bg-transparent 
                      border-2
                      bg-[linear-gradient(#1A1D24,#1A1D24)_padding-box,linear-gradient(90deg,#F07730,#EFD28E)_border-box]
                      text-white font-[600] text-[16px]
                      font-['Neue_Plack',sans-serif]
                      rounded-lg shadow-md
                      flex items-center justify-center
                      transition-all duration-300
                      hover:shadow-lg hover:shadow-[#F07730]/30"
                  >
                    Register
                  </motion.button>
                }
                defaultTab="register"
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              />
            </>
          )}

          {/* Profile shown only when logged in */}
          {hasToken && (
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
                    <path
                      d="M20.1612 1.52601C20.2324 1.17783 21.0307 1.18575 20.9991 1.62888L20.9833 12.5726C20.8173 13.2373 20.3667 13.6883 19.7107 13.8703C19.5289 15.4055 18.7542 16.7428 17.6555 17.7873C17.782 19.2591 17.5449 20.7468 15.8375 21H5.25351C3.52245 20.7863 3.2458 19.275 3.38807 17.7873C2.28936 16.7349 1.51473 15.3976 1.33293 13.8703C0.613629 13.6646 0.107747 13.1503 0.0445116 12.3827C-0.0108193 11.7259 -0.0187237 10.5152 0.0445116 9.85844C0.107747 9.20166 0.629437 8.58444 1.29341 8.45783C1.39616 7.68235 1.52263 6.9227 1.77558 6.18679C3.36436 1.51809 8.56546 -1.0299 13.2765 0.394443C16.8098 1.47062 19.434 4.74662 19.7423 8.43409L20.1612 8.57653V1.52601ZM4.20223 15.5875C5.48274 16.8694 9.78274 17.2176 11.5454 17.1305C13.4346 17.0356 17.4105 16.4896 17.6476 14.1157C17.8373 12.2482 17.5132 10.0879 17.6476 8.18879C17.3947 6.36879 15.7506 5.97314 14.2408 5.56957C13.9642 5.49835 13.2449 5.26888 13.0077 5.27679C12.9287 5.27679 12.9129 5.29261 12.8496 5.33218C12.5888 5.48253 11.9881 6.33714 11.7509 6.38461H9.30057L8.13862 5.29261C6.44708 5.71201 3.64102 5.97314 3.44341 8.1967C3.30903 9.72392 3.41179 11.8842 3.49874 13.443C3.54616 14.353 3.49874 14.899 4.19432 15.6033L4.20223 15.5875Z"
                      fill="#CED5E3"
                    />
                  </svg>
                </div>
              }
              className="p-2 rounded-lg hover:opacity-80 transition-colors"
            />
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default TopHeader;
