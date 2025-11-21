// components/Navbar/SidebarHeader.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const SidebarHeader = ({
  sidebarCollapsed,
  hasToken,
  userName,
  handleLogout,
  onCloseSidebar,
}) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();

  // Helper functions for menu icons and classes
  const getMenuIcon = (
    item,
    currentPath,
    isCollapsed,
    isSubmenuActive = false
  ) => {
    const isActive = currentPath === item.path || isSubmenuActive;
    if (isActive && item.activeIcon) {
      return item.activeIcon;
    }
    return item.icon;
  };

  const getMenuIconClass = (
    item,
    currentPath,
    isCollapsed,
    isSubmenuActive = false
  ) => {
    const isActive = currentPath === item.path || isSubmenuActive;
    const baseClass = "w-5 h-5 object-contain transition-all duration-300";

    if (isActive) {
      return `${baseClass} opacity-100 filter-none`;
    } else {
      return `${baseClass} opacity-70 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert`;
    }
  };

  const getMenuLinkClass = (
    item,
    currentPath,
    isCollapsed,
    isSubmenuActive = false
  ) => {
    const isActive = currentPath === item.path || isSubmenuActive;

    if (isActive) {
      return "wallet-btn2 view_moon_btn relative flex items-center gap-2 px-3 py-1.5 rounded-[8px] border border-[rgba(255,255,255,0.40)] transition-all shadow-[1px_2px_1px_rgba(0,0,0,0.40)] bg-[linear-gradient(0deg,rgba(240,119,48,0.6)_0%,rgba(240,119,48,0)_100%)] text-white";
    } else {
      if (isCollapsed) {
        return "justify-center text-[#000] hover:text-white/90 hover:bg-white/5";
      } else {
        return "gap-3 rounded-lg text-[#A8A8A8] hover:text-white/90 hover:bg-white/5";
      }
    }
  };

  // Menu items data
  const menuItems = [
    {
      id: "home",
      label: "Home",
      icon: "/icons/home.svg",
      activeIcon: "/active-menu/home-active.svg",
      path: "/",
    },
    {
      id: "favourites",
      label: "Favorites",
      icon: "/icons/favourites.svg",
      activeIcon: "/active-menu/favourites-active.svg",
      path: "/casino/favourites",
    },
    {
      id: "recommended",
      label: "Trending",
      icon: "/icons/recommended.svg",
      activeIcon: "/active-menu/recommended-active.svg",
      path: "/casino/trending",
    },
  ];

  const gamesItems = [
    {
      id: "casino",
      label: "Casino",
      icon: "/icons/casino.svg",
      activeIcon: "/active-menu/casino-active.svg",
      submenu: [
        { path: "/casino/slots", label: "Slots", icon: "/icons/slots.svg" },
        {
          path: "/casino/blackjack",
          label: "Blackjack",
          icon: "/icons/blackjack.svg",
        },
        {
          path: "/casino/roulette",
          label: "Roulette",
          icon: "/icons/roulette.svg",
        },
        {
          path: "/casino/bacarrat",
          label: "Baccarat",
          icon: "/icons/bacarrat-menu.svg",
        },
        {
          path: "/casino/game-shows",
          label: "Game Shows",
          icon: "/icons/game-shows.svg",
        },
        {
          path: "/casino/live-casino",
          label: "Live Casino",
          icon: "/icons/live-casino.svg",
        },
      ],
    },
    {
      id: "originals",
      label: "Originals",
      icon: "/icons/originals.svg",
      activeIcon: "/active-menu/originals-active.svg",
      submenu: [
        {
          path: "#",
          label: "Dice",
          icon: "/icons/dices.svg",
          comingSoon: true,
        },
        {
          path: "#",
          label: "HoneyPot",
          icon: "/icons/honeyPot.svg",
          comingSoon: true,
        },
        {
          path: "#",
          label: "Blackjack",
          icon: "/icons/blackjack.svg",
          comingSoon: true,
        },
        { path: "#", label: "67", icon: "/icons/67.svg", comingSoon: true },
        {
          path: "#",
          label: "Baccarat",
          icon: "/icons/bacarrat-menu.svg",
          comingSoon: true,
        },
        {
          path: "#",
          label: "Mines",
          icon: "/icons/mines.svg",
          comingSoon: true,
        },
      ],
    },
    {
      id: "leaderboard",
      label: "Leaderboard",
      icon: "/icons/leaderboard.svg",
      activeIcon: "/active-menu/leaderboard-active-collasped.svg",
      path: "/leaderboard",
    },
  ];

  const accountItems = [
    {
      path: "/providers",
      label: "Providers",
      icon: "/icons/providers.svg",
      activeIcon: "/active-menu/providers-active.svg",
    },
    ...(hasToken
      ? [
          {
            path: "/affiliate",
            label: "Affiliates",
            icon: "/icons/affiliates.svg",
            activeIcon: "/active-menu/affliate-active.svg",
          },
        ]
      : []),
    {
      path: "#",
      label: "Rewards",
      icon: "/icons/rewards.svg",
      activeIcon: "/active-menu/rewards-active.svg",
      comingSoon: true,
    },
    {
      path: "",
      label: "Live Support",
      icon: "/icons/live-support.svg",
      activeIcon: "/active-menu/live-support-active.svg",
    },
  ];

  const toggleSubmenu = (menuId) => {
    if (!sidebarCollapsed) {
      setActiveSubmenu(activeSubmenu === menuId ? null : menuId);
    }
  };

  const closeSidebar = () => {
    setActiveSubmenu(null);
    if (onCloseSidebar) {
      onCloseSidebar();
    }
  };

  // Close sidebar when route changes
  useEffect(() => {
    if (!sidebarCollapsed) {
      closeSidebar();
    }
  }, [location.pathname]);

  const renderMenuItem = (item, isActive) => (
    <div key={item.id}>
      {item.submenu ? (
        <>
          <motion.button
            whileHover={{ scale: sidebarCollapsed ? 1.05 : 1.01 }}
            onClick={() => toggleSubmenu(item.id)}
            className={`w-full flex items-center ${
              sidebarCollapsed ? "justify-center" : "justify-between"
            } px-3 py-2 rounded-lg transition-all duration-200 group relative
              ${
                activeSubmenu === item.id || isActive
                  ? "bg-gradient-to-b from-white/30 via-white/5 backdrop-blur-[2px]"
                  : "hover:bg-white/5 to-white/30 shadow-[2px_2px_4px_rgba(0,0,0,0.25)]"
              }`}
          >
            <div
              className={`flex items-center ${
                sidebarCollapsed ? "" : "gap-3"
              } relative z-10`}
            >
              <span className="text-lg flex items-center justify-center">
                <img
                  src={getMenuIcon(item, location.pathname, sidebarCollapsed)}
                  alt={item.label}
                  className={getMenuIconClass(
                    item,
                    location.pathname,
                    sidebarCollapsed
                  )}
                />
              </span>
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="text-base font-normal leading-24"
                    style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.25)" }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {!sidebarCollapsed && (
              <motion.svg
                animate={{ rotate: activeSubmenu === item.id ? 180 : 0 }}
                className="w-4 h-4 text-[#A8A8A8]"
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
              </motion.svg>
            )}

            {/* Tooltip for collapsed state */}
            {sidebarCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-[#1A1B23] border border-gray-800 rounded text-xs text-[#A8A8A8] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                {item.label}
              </div>
            )}
          </motion.button>

          {/* Submenu */}
          <AnimatePresence>
            {activeSubmenu === item.id && !sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 relative mt-1 overflow-hidden"
              >
                <div className="space-y-0.5">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all
                        ${
                          location.pathname === subItem.path
                            ? "text-white bg-gradient-to-b from-white/30 via-white/5 to-white/30 shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px]"
                            : "text-[#A8A8A8] hover:text-white/90 hover:bg-white/5"
                        }`}
                      onClick={closeSidebar}
                    >
                      <span className="opacity-60 text-sm">{subItem.icon}</span>
                      <span
                        className="text-sm font-['Neue_Plak']"
                        style={{
                          textShadow: "0 0 10px rgba(255, 255, 255, 0.25)",
                        }}
                      >
                        {subItem.label}
                      </span>
                      {item.id === "originals" && subItem.comingSoon && (
                        <span className="text-[8px] font-semibold px-2 py-0.5 rounded-full bg-[#f7f7f7]/20 text-[#C1C1C1] border border-[#ccc]/30 whitespace-nowrap tracking-wide">
                          coming soon
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <motion.div
          whileHover={{ scale: sidebarCollapsed ? 1.05 : 1.01 }}
          className="relative group"
        >
          <Link
            to={item.path}
            className={`flex items-center ${
              sidebarCollapsed ? "justify-center" : "gap-3"
            } px-3 py-2 rounded-[8px] transition-all duration-200 
              ${getMenuLinkClass(item, location.pathname, sidebarCollapsed)}`}
            onClick={closeSidebar}
          >
            <span className="text-lg flex items-center justify-center">
              <img
                src={getMenuIcon(item, location.pathname, sidebarCollapsed)}
                alt={item.label}
                className={getMenuIconClass(
                  item,
                  location.pathname,
                  sidebarCollapsed
                )}
              />
            </span>
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-base font-normal font-['Neue_Plak'] leading-6"
                  style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.25)" }}
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Tooltip for collapsed state */}
            {sidebarCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-[#1A1B23] border border-gray-800 rounded text-xs text-[#A8A8A8] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                {item.label}
              </div>
            )}
          </Link>
        </motion.div>
      )}
    </div>
  );

  return (
    <motion.aside
      initial={false}
      animate={{
        width: sidebarCollapsed ? 65 : 256,
        x: 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-16 bottom-0 bg-[rgba(20,20,20,0.80)] shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px] border-r border-white/10 z-[99999] px-2"
    >
      <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-[#3a3a3a] scrollbar-track-transparent pr-1">
        {/* Main Menu */}
        <div className="py-3">
          <div className="space-y-1">
            {menuItems.map((item) =>
              renderMenuItem(item, location.pathname === item.path)
            )}
          </div>
        </div>

        {/* Game Menu */}
        <div className="py-3 relative customborder">
          <div className="space-y-1">
            {gamesItems.map((item) => {
              const isSubmenuActive = item.submenu?.some(
                (subItem) => location.pathname === subItem.path
              );
              return renderMenuItem(
                item,
                location.pathname === item.path || isSubmenuActive
              );
            })}
          </div>
        </div>

        {/* Account Menu */}
        <div className="py-2 mt-1 relative customborder">
          <div className="space-y-1">
            {accountItems.map((item) => {
              const isActive = location.pathname === item.path;
              const isLiveSupport = item.label === "Live Support";

              if (isLiveSupport) {
                return (
                  <motion.button
                    key={item.label}
                    whileHover={{ scale: sidebarCollapsed ? 1.05 : 1.01 }}
                    className="relative group w-full"
                    onClick={() => {
                      closeSidebar();
                      if (window.tidioChatApi) {
                        window.tidioChatApi.show();
                        window.tidioChatApi.open();
                      }
                    }}
                  >
                    <div
                      className={`flex items-center ${
                        sidebarCollapsed ? "justify-center" : "gap-3"
                      } px-3 py-2 rounded-[8px] transition-all duration-200 
                      ${getMenuLinkClass(
                        item,
                        location.pathname,
                        sidebarCollapsed
                      )}`}
                    >
                      <span className="text-lg flex items-center justify-center">
                        <img
                          src={getMenuIcon(
                            item,
                            location.pathname,
                            sidebarCollapsed
                          )}
                          alt={item.label}
                          className={getMenuIconClass(
                            item,
                            location.pathname,
                            sidebarCollapsed
                          )}
                        />
                      </span>
                      <AnimatePresence>
                        {!sidebarCollapsed && (
                          <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="text-base font-normal font-['Neue_Plak'] leading-6 text-white"
                            style={{
                              textShadow: "0 0 10px rgba(255,255,255,0.25)",
                            }}
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.button>
                );
              }

              return renderMenuItem(item, isActive);
            })}

            {/* Logout Button */}
            {hasToken && (
              <motion.button
                whileHover={{ scale: sidebarCollapsed ? 1.05 : 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center ${
                  sidebarCollapsed ? "justify-center" : "gap-3"
                } px-3 py-2 rounded-lg text-[#A8A8A8] hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 group relative`}
                onClick={handleLogout}
              >
                <img
                  src="/icons/logout.svg"
                  alt="Logout"
                  className="w-7 h-7 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
                <AnimatePresence>
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="text-base font-normal font-['Neue_Plak'] leading-6"
                      style={{
                        textShadow: "0 0 10px rgba(255, 255, 255, 0.25)",
                      }}
                    >
                      Logout
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Tooltip for collapsed state */}
                {sidebarCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-[#1A1B23] border border-gray-800 rounded text-xs text-[#A8A8A8] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    Logout
                  </div>
                )}
              </motion.button>
            )}
          </div>
        </div>

        {/* Social Links - Only show when expanded */}
        {hasToken && (
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="relative customborder left-0 right-0 p-3"
              >
                {/* User Profile */}
                <div className="flex flex-col items-center justify-center gap-2 p-4 mb-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[linear-gradient(180deg,#1B1B1B_0%,#0F172A_100%)] shadow-[0px_2px_4px_rgba(0,0,0,0.25)] flex items-center justify-center">
                    <span className="text-lg sm:text-xl text-white font-semibold">
                      {userName ? userName.charAt(0).toUpperCase() : ""}
                    </span>
                  </div>
                  <p className="text-[#C3C3C3] text-center font-[400] text-[16px] leading-[24px] tracking-[0.3px] font-['Neue_Plack',sans-serif] not-italic">
                    {userName}
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-3 bg-white/5 border border-gray-800 rounded-lg hover:bg-white/10 transition-all duration-200"
                  >
                    <img
                      src="/icons/twitter.svg"
                      alt="Twitter"
                      className="w-4 h-4 object-contain"
                    />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-3 bg-white/5 border border-gray-800 rounded-lg hover:bg-white/10 transition-all duration-200"
                  >
                    <img
                      src="/icons/telegram.svg"
                      alt="Telegram"
                      className="w-4 h-4 object-contain"
                    />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-3 bg-white/5 border border-gray-800 rounded-lg hover:bg-white/10 transition-all duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                    >
                      <path
                        d="M16.9568 4.99806C16.917 4.09478..."
                        fill="#A7A7A7"
                      />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </motion.aside>
  );
};

export default SidebarHeader;
