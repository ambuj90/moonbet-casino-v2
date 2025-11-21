// components/Navbar/MobileHeader.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const MobileHeader = ({
  isMobileSidebarOpen,
  closeMobileSidebar,
  hasToken,
  userName,
  handleLogout,
}) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();

  const getMenuIcon = (item, currentPath, isSubmenuActive = false) => {
    const isActive = currentPath === item.path || isSubmenuActive;
    if (isActive && item.activeIcon) {
      return item.activeIcon;
    }
    return item.icon;
  };

  const getMenuIconClass = (item, currentPath, isSubmenuActive = false) => {
    const isActive = currentPath === item.path || isSubmenuActive;
    const baseClass = "w-5 h-5 object-contain transition-all duration-300";

    if (isActive) {
      return `${baseClass} opacity-100 filter-none`;
    } else {
      return `${baseClass} opacity-70 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert`;
    }
  };

  const getMenuLinkClass = (item, currentPath) => {
    const isActive = currentPath === item.path;

    if (isActive) {
      return "wallet-btn2 view_moon_btn relative flex items-center gap-2 px-3 py-1.5 rounded-[8px] border border-[rgba(255,255,255,0.40)] transition-all shadow-[1px_2px_1px_rgba(0,0,0,0.40)] bg-[linear-gradient(0deg,rgba(240,119,48,0.6)_0%,rgba(240,119,48,0)_100%)] text-white";
    } else {
      return "gap-3 rounded-lg text-[#A8A8A8] hover:text-white/90 hover:bg-white/5";
    }
  };

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
    setActiveSubmenu(activeSubmenu === menuId ? null : menuId);
  };

  return (
    <div className="lg:hidden">
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0  /50 backdrop-blur-sm z-40"
            onClick={closeMobileSidebar}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isMobileSidebarOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed left-0 top-16 bottom-0 w-64 bg-gradient-to-b from-[#0A0B0D]/95 to-[#141519]/95 backdrop-blur-xl border-r border-white/10 z-50"
      >
        <div className="overflow-y-auto h-full custom-scrollbar pb-20">
          {/* Main Menu */}
          <div className="p-4">
            <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-3">
              Main Menu
            </h3>
            <div className="space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <div key={item.id}>
                    {item.submenu ? (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          onClick={() => toggleSubmenu(item.id)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[8px] transition-all duration-300 group relative
                            ${getMenuLinkClass(item, location.pathname)}`}
                        >
                          <div className="flex items-center gap-3 relative z-10">
                            <span className="text-lg flex items-center justify-center">
                              <img
                                src={getMenuIcon(item, location.pathname)}
                                alt={item.label}
                                className={getMenuIconClass(
                                  item,
                                  location.pathname
                                )}
                              />
                            </span>
                            <span
                              className={`font-medium relative z-10 transition-colors duration-300 ${
                                isActive
                                  ? "text-white"
                                  : "text-[#A8A8A8] group-hover:text-white"
                              }`}
                            >
                              {item.label}
                            </span>
                          </div>
                          <motion.svg
                            animate={{
                              rotate: activeSubmenu === item.id ? 180 : 0,
                            }}
                            className={`w-4 h-4 ${
                              isActive ? "text-white" : "text-gray-400"
                            } relative z-10`}
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
                        </motion.button>

                        {/* Mobile Submenu */}
                        <AnimatePresence>
                          {activeSubmenu === item.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-4 mr-0 mt-1 overflow-hidden"
                            >
                              <div className="p-2 space-y-1  /40 backdrop-blur-md rounded-xl">
                                {item.submenu.map((subItem) => (
                                  <Link
                                    key={subItem.path}
                                    to={subItem.path}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-white/10 ${
                                      location.pathname === subItem.path
                                        ? "bg-white/10 border-l-2 border-purple-500"
                                        : ""
                                    }`}
                                    onClick={closeMobileSidebar}
                                  >
                                    <span className="text-lg opacity-70">
                                      {subItem.icon}
                                    </span>
                                    <span className="text-gray-300 text-sm">
                                      {subItem.label}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="relative group"
                      >
                        <Link
                          to={item.path}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-[8px] transition-all duration-300 
                            ${getMenuLinkClass(item, location.pathname)}`}
                          onClick={closeMobileSidebar}
                        >
                          <span className="text-lg flex items-center justify-center">
                            <img
                              src={getMenuIcon(item, location.pathname)}
                              alt={item.label}
                              className={getMenuIconClass(
                                item,
                                location.pathname
                              )}
                            />
                          </span>
                          <span
                            className={`font-normal font-['Neue_Plak'] font-medium relative z-10 transition-colors duration-300 ${
                              isActive
                                ? "text-white"
                                : "text-[#A8A8A8] group-hover:text-white"
                            }`}
                          >
                            {item.label}
                          </span>
                        </Link>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Games Menu */}
          <div className="p-4 relative customborder mobile-game">
            <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-3">
              Games
            </h3>
            <div className="space-y-1">
              {gamesItems.map((item) => {
                const isSubmenuActive = item.submenu?.some(
                  (subItem) => location.pathname === subItem.path
                );
                const isActive =
                  location.pathname === item.path || isSubmenuActive;

                return (
                  <div key={item.id}>
                    {item.submenu ? (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          onClick={() => toggleSubmenu(item.id)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[8px] bg-white/10 shadow-[2px_2px_4px_0_rgba(0,0,0,0.25)] backdrop-blur-[2px] transition-all duration-300 hover:bg-white/10 relative overflow-hidden group
                            ${
                              isActive
                                ? "bg-gradient-to-b from-white/30 via-white/5 to-white/30 shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px] text-white"
                                : "text-[rgb(168,168,168)] hover:text-white"
                            }`}
                        >
                          <div className="flex items-center gap-3 relative z-10">
                            <span className="text-lg flex items-center justify-center">
                              <img
                                src={getMenuIcon(
                                  item,
                                  location.pathname,
                                  isSubmenuActive
                                )}
                                alt={item.label}
                                className={getMenuIconClass(
                                  item,
                                  location.pathname,
                                  isSubmenuActive
                                )}
                              />
                            </span>
                            <span
                              className={`font-medium relative z-10 transition-colors duration-300 ${
                                isActive
                                  ? "text-white"
                                  : "text-[rgb(168,168,168)] group-hover:text-white"
                              }`}
                            >
                              {item.label}
                            </span>
                          </div>

                          <motion.svg
                            animate={{
                              rotate: activeSubmenu === item.id ? 180 : 0,
                            }}
                            className={`w-4 h-4 ${
                              isActive ? "text-white" : "text-current"
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
                          </motion.svg>
                        </motion.button>

                        {/* Submenu for Mobile */}
                        <AnimatePresence>
                          {activeSubmenu === item.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="mt-2 overflow-hidden"
                            >
                              <div className="space-y-1.5">
                                {item.submenu.map((subItem) => {
                                  const isSubItemActive =
                                    location.pathname === subItem.path;

                                  return (
                                    <Link
                                      key={subItem.path}
                                      to={subItem.path}
                                      className={`group flex items-center gap-4 px-3 py-2 rounded-[8px] bg-white/10 shadow-[2px_2px_4px_0_rgba(0,0,0,0.25)] backdrop-blur-[2px] transition-all duration-300 hover:bg-white/10 relative overflow-hidden
                                        ${
                                          isSubItemActive
                                            ? "bg-gradient-to-b from-white/30 via-white/5 to-white/30 shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px] text-white"
                                            : "text-[rgb(168,168,168)] hover:text-white"
                                        }`}
                                      onClick={closeMobileSidebar}
                                    >
                                      <span className="text-lg flex items-center justify-center">
                                        <img
                                          src={subItem.icon}
                                          alt={subItem.label}
                                          className="w-5 h-5 object-contain opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert"
                                        />
                                      </span>
                                      <span
                                        className={`font-medium transition-colors duration-300 ${
                                          isSubItemActive
                                            ? "text-white"
                                            : "text-[rgb(168,168,168)] group-hover:text-white"
                                        }`}
                                      >
                                        {subItem.label}
                                      </span>
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="relative group"
                      >
                        <Link
                          to={item.path}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-[8px] bg-white/10 shadow-[2px_2px_4px_0_rgba(0,0,0,0.25)] backdrop-blur-[2px] transition-all duration-300 hover:bg-white/10 relative overflow-hidden group ${
                            isActive
                              ? "bg-gradient-to-b from-white/30 via-white/5 to-white/30 shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px] text-white"
                              : "text-[rgb(168,168,168)]"
                          }`}
                          onClick={closeMobileSidebar}
                        >
                          <span className="text-lg flex items-center justify-center">
                            <img
                              src={getMenuIcon(item, location.pathname)}
                              alt={item.label}
                              className={getMenuIconClass(
                                item,
                                location.pathname
                              )}
                            />
                          </span>
                          <span
                            className={`font-medium relative z-10 transition-colors duration-300 ${
                              isActive
                                ? "text-white"
                                : "text-[rgb(168,168,168)] group-hover:text-white"
                            }`}
                          >
                            {item.label}
                          </span>
                        </Link>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Account Menu */}
          <div className="p-4 relative customborder">
            <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-3">
              Account
            </h3>
            <div className="space-y-1">
              {accountItems.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <motion.div
                    key={item.path}
                    whileHover={{ scale: 1.01 }}
                    className="relative group"
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-[8px] transition-all duration-300 
                        ${getMenuLinkClass(item, location.pathname)}`}
                      onClick={closeMobileSidebar}
                    >
                      <span className="text-lg flex items-center justify-center">
                        <img
                          src={getMenuIcon(item, location.pathname)}
                          alt={item.label}
                          className={getMenuIconClass(item, location.pathname)}
                        />
                      </span>
                      <span
                        className={`font-medium relative z-10 transition-colors duration-300 ${
                          isActive
                            ? "text-white"
                            : "text-[#A8A8A8] group-hover:text-white"
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              {hasToken && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[8px] bg-white/10 text-[#A8A8A8] hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 group shadow-[2px_2px_4px_0_rgba(0,0,0,0.25)] backdrop-blur-[2px]"
                  onClick={handleLogout}
                >
                  <img
                    src="/icons/logout.svg"
                    alt="Logout"
                    className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="font-medium">Logout</span>
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #ec4899);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #9333ea, #f43f5e);
        }
      `}</style>
    </div>
  );
};

export default MobileHeader;
