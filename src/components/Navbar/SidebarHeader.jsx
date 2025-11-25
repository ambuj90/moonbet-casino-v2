// components/Navbar/SidebarHeader.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const SidebarHeader = ({
  sidebarCollapsed = false,
  hasToken = false,
  userName = "",
  handleLogout = () => {},
  onCloseSidebar = () => {},
}) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    const base = "w-5 h-5 transition-all duration-300";

    if (isActive) {
      return `${base} icon-active`;
    } else {
      return `${base} icon-normal group-hover:icon-hover`;
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
      return "trust_btn view_moon_btn relative flex items-center gap-2 px-3 py-1.5 rounded-[8px]  transition-all  text-white";
    } else {
      if (isCollapsed) {
        return "justify-center text-[#000] hover:text-white/90 hover:bg-white/5";
      } else {
        return " gap-3 rounded-lg text-[#A8A8A8] hover:text-white/90 hover:bg-white/5";
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
    <div className="hidden lg:block">
      {/* Backdrop for mobile/tablet */}
      {sidebarOpen && !sidebarCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0  /50 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Desktop Sidebar with Glassmorphism */}
      <motion.aside
        initial={false}
        animate={{
          width: sidebarCollapsed ? 65 : 256,
          x: 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed left-0 top-16 bottom-0 bg-[#1C1D49] shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px]border-r border-white/10 z-[99999] px-2 `}
      >
        <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-[#3a3a3a] scrollbar-track-transparent pr-1">
          {/* Main Menu */}
          <div className="py-3">
            <div className="space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <div key={item.id}>
                    {item.submenu ? (
                      <>
                        <motion.button
                          whileHover={{
                            scale: sidebarCollapsed ? 1.05 : 1.01,
                          }}
                          onClick={() => toggleSubmenu(item.id)}
                          className={`w-full flex items-center ${
                            sidebarCollapsed
                              ? "justify-center"
                              : "justify-between"
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
                              {typeof item.icon === "string" &&
                              item.icon.startsWith("/") ? (
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
                                  key={`${item.id}-${isActive}-${sidebarCollapsed}`} // Force re-render
                                />
                              ) : (
                                item.icon
                              )}
                            </span>
                            <AnimatePresence>
                              {!sidebarCollapsed && (
                                <motion.span
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -20 }}
                                  className="text-base font-normal leading-24"
                                  style={{
                                    textShadow:
                                      "0 0 10px rgba(255, 255, 255, 0.25)",
                                  }}
                                >
                                  {item.label}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </div>

                          {!sidebarCollapsed && (
                            <motion.svg
                              animate={{
                                rotate: activeSubmenu === item.id ? 180 : 0,
                              }}
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
                                    <span className="opacity-60 text-sm">
                                      {subItem.icon}
                                    </span>
                                    <span
                                      className="text-sm font-['Neue_Plak']"
                                      style={{
                                        textShadow:
                                          "0 0 10px rgba(255, 255, 255, 0.25)",
                                      }}
                                    >
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
                        whileHover={{ scale: sidebarCollapsed ? 1.05 : 1.01 }}
                        className="relative group"
                      >
                        <Link
                          to={item.path}
                          className={`flex items-center ${
                            sidebarCollapsed ? "justify-center" : "gap-3"
                          } px-3 py-2 rounded-[8px] transition-all duration-200 
                              ${getMenuLinkClass(
                                item,
                                location.pathname,
                                sidebarCollapsed
                              )}`}
                          onClick={closeSidebar}
                        >
                          <span className="text-lg flex items-center justify-center">
                            {typeof item.icon === "string" &&
                            item.icon.startsWith("/") ? (
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
                                key={`${item.id}-${isActive}-${sidebarCollapsed}`} // Force re-render
                              />
                            ) : (
                              item.icon
                            )}
                          </span>
                          <AnimatePresence>
                            {!sidebarCollapsed && (
                              <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="text-base font-normal font-['Neue_Plak'] leading-6"
                                style={{
                                  textShadow:
                                    "0 0 10px rgba(255, 255, 255, 0.25)",
                                }}
                              >
                                {item.label}
                              </motion.span>
                            )}
                          </AnimatePresence>

                          {/* Active indicator bar */}
                          {isActive && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r"
                            />
                          )}

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
              })}
            </div>
          </div>

          {/* Game Menu */}
          <div className="py-3 relative customborder">
            <div className="space-y-1">
              {gamesItems.map((item) => {
                // Check if any submenu item is active for this parent
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
                          whileHover={{
                            scale: sidebarCollapsed ? 1.05 : 1.01,
                          }}
                          onClick={() => toggleSubmenu(item.id)}
                          className={`w-full flex items-center rounded-[8px] backdrop-blur-[2px] hover:text-white/90 ${
                            sidebarCollapsed
                              ? "justify-center"
                              : "justify-between bg-white/10 shadow-[2px_2px_4px_0_rgba(0,0,0,0.25)]"
                          } px-3 py-2 transition-all duration-200 group relative 
                              ${getMenuLinkClass(
                                item,
                                location.pathname,
                                sidebarCollapsed,
                                isSubmenuActive
                              )}`}
                        >
                          <div
                            className={`flex items-center ${
                              sidebarCollapsed ? "" : "gap-3"
                            } relative z-10`}
                          >
                            <span className="text-lg flex items-center justify-center">
                              {typeof item.icon === "string" &&
                              item.icon.startsWith("/") ? (
                                <img
                                  src={getMenuIcon(
                                    item,
                                    location.pathname,
                                    sidebarCollapsed,
                                    isSubmenuActive
                                  )}
                                  alt={item.label}
                                  className={getMenuIconClass(
                                    item,
                                    location.pathname,
                                    sidebarCollapsed,
                                    isSubmenuActive
                                  )}
                                  key={`${item.id}-${isActive}-${sidebarCollapsed}`} // Force re-render
                                />
                              ) : (
                                item.icon
                              )}
                            </span>
                            <AnimatePresence>
                              {!sidebarCollapsed && (
                                <motion.span
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -20 }}
                                  className={`text-base font-normal font-['Neue_Plak'] leading-6 ${
                                    isActive
                                      ? "text-white"
                                      : "text-[#A8A8A8] group-hover:text-white"
                                  }`}
                                  style={{
                                    textShadow:
                                      "0 0 10px rgba(255, 255, 255, 0.25)",
                                  }}
                                >
                                  {item.label}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </div>

                          {!sidebarCollapsed && (
                            <motion.svg
                              animate={{
                                rotate: activeSubmenu === item.id ? 180 : 0,
                              }}
                              className={`w-4 h-4 ${
                                isActive ? "text-white" : "text-[#A8A8A8]"
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
                              className="mt-2.5 overflow-hidden"
                            >
                              <div className="space-y-1.5">
                                {item.submenu.map((subItem) => (
                                  <Link
                                    key={subItem.path}
                                    to={subItem.path}
                                    className={`group flex items-center gap-4 px-3 py-1.5 rounded-[8px] backdrop-blur-[2px] transition-all
                                        ${
                                          location.pathname === subItem.path
                                            ? "text-white bg-gradient-to-b from-white/30 via-white/5 to-white/30 shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px]"
                                            : "text-[#A8A8A8] hover:text-white/90 hover:bg-white/5"
                                        }`}
                                    onClick={closeSidebar}
                                  >
                                    <span className="text-lg flex items-center justify-center">
                                      {typeof subItem.icon === "string" &&
                                      subItem.icon.startsWith("/") ? (
                                        <img
                                          src={subItem.icon}
                                          alt={subItem.label}
                                          className="w-5 h-5 object-contain opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert"
                                        />
                                      ) : (
                                        subItem.icon
                                      )}
                                    </span>
                                    <span
                                      className={`text-sm font-['Neue_Plak'] ${
                                        location.pathname === subItem.path
                                          ? "text-white"
                                          : "text-[#A8A8A8] group-hover:text-white"
                                      }`}
                                      style={{
                                        textShadow:
                                          "0 0 10px rgba(255, 255, 255, 0.25)",
                                      }}
                                    >
                                      {subItem.label}
                                    </span>
                                    {/* ⭐ coming soon BADGE (Only for Originals submenu) */}
                                    {item.id === "originals" &&
                                      subItem.comingSoon && (
                                        <span className="ml-auto text-[8px] font-semibold px-2 py-0.5 rounded-full  bg-[#f7f7f7]/20 text-[#C1C1C1] border border-[#ccc]/30 whitespace-nowrap tracking-wide">
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
                              ${getMenuLinkClass(
                                item,
                                location.pathname,
                                sidebarCollapsed
                              )}`}
                          onClick={closeSidebar}
                        >
                          <span className="text-lg flex items-center justify-center">
                            {typeof item.icon === "string" &&
                            item.icon.startsWith("/") ? (
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
                                key={`${item.id}-${isActive}-${sidebarCollapsed}`} // Force re-render
                              />
                            ) : (
                              item.icon
                            )}
                          </span>

                          <AnimatePresence>
                            {!sidebarCollapsed && (
                              <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="text-base font-normal font-['Neue_Plak'] leading-6"
                                style={{
                                  textShadow:
                                    "0 0 10px rgba(255, 255, 255, 0.25)",
                                }}
                              >
                                {item.label}
                              </motion.span>
                            )}
                          </AnimatePresence>

                          {/* Active indicator bar */}
                          {isActive && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6"
                            />
                          )}

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
              })}
            </div>
          </div>

          {/* Account Menu */}
          <div className="py-2 mt-1 relative customborder">
            <div className="space-y-1">
              {accountItems.map((item) => {
                const isActive = location.pathname === item.path;

                const isLiveSupport = item.label === "Live Support";

                return (
                  <motion.div
                    key={item.path || item.label}
                    whileHover={{ scale: sidebarCollapsed ? 1.05 : 1.01 }}
                    className="relative group"
                  >
                    {/* ⭐ LIVE SUPPORT BUTTON (opens Tidio) */}
                    {isLiveSupport ? (
                      <button
                        onClick={() => {
                          closeSidebar();
                          if (window.tidioChatApi) {
                            window.tidioChatApi.show();
                            window.tidioChatApi.open();
                          } else {
                            console.warn("Tidio not ready");
                          }
                        }}
                        className={`flex items-center ${
                          sidebarCollapsed ? "justify-center" : "gap-3"
                        } w-full px-3 py-2 rounded-[8px] transition-all duration-200
                ${getMenuLinkClass(item, location.pathname, sidebarCollapsed)}
              `}
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

                        {/* Label when expanded */}
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

                        {/* Tooltip */}
                        {sidebarCollapsed && (
                          <div className="absolute left-full ml-2 px-2 py-1 bg-[#1A1B23] border border-gray-800 rounded text-xs text-[#A8A8A8] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                            {item.label}
                          </div>
                        )}
                      </button>
                    ) : (
                      /* ⭐ ALL OTHER NORMAL LINK ITEMS */
                      <Link
                        to={item.path}
                        className={`flex items-center ${
                          sidebarCollapsed ? "justify-center" : "gap-3"
                        } px-3 py-2 rounded-[8px] transition-all duration-200 
                ${getMenuLinkClass(item, location.pathname, sidebarCollapsed)}
              `}
                        onClick={closeSidebar}
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
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              className="flex items-center justify-between w-full"
                            >
                              {/* Label */}
                              <span
                                className="text-base font-normal font-['Neue_Plak'] leading-6 text-white"
                                style={{
                                  textShadow: "0 0 10px rgba(255,255,255,0.25)",
                                }}
                              >
                                {item.label}
                              </span>

                              {/* ⭐ coming soon Badge */}
                              {item.comingSoon && (
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full  bg-[#f7f7f7]/20 text-[#C1C1C1] border border-[#ccc]/30 whitespace-nowrap tracking-wide ">
                                  coming soon
                                </span>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Active indicator bar */}
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r"
                          />
                        )}

                        {/* Tooltip */}
                        {sidebarCollapsed && (
                          <div className="absolute left-full ml-2 px-2 py-1 bg-[#1A1B23] border border-gray-800 rounded text-xs text-[#A8A8A8] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                            {item.label}
                          </div>
                        )}
                      </Link>
                    )}
                  </motion.div>
                );
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
                    {/* Profile Icon */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[linear-gradient(180deg,#1B1B1B_0%,#0F172A_100%)] shadow-[0px_2px_4px_rgba(0,0,0,0.25)] flex items-center justify-center">
                      <span className="text-lg sm:text-xl text-white font-semibold">
                        {userName ? userName.charAt(0).toUpperCase() : ""}
                      </span>
                    </div>

                    {/* Username */}
                    <p
                      className="text-[#C3C3C3] text-center font-[400] text-[16px] 
               leading-[24px] tracking-[0.3px] 
               font-['Neue_Plack',sans-serif] not-italic"
                    >
                      {userName}
                    </p>
                  </div>

                  {/* Language Selector */}
                  {/* <button className="w-full flex items-center gap-3 px-2 py-2 text-[#A8A8A8] hover:text-white/90 hover:bg-white/5 rounded-lg transition-all duration-200 mb-3">
                          <span className="text-lg">🌐</span>
                          <span
                            className="text-sm font-['Neue_Plak']"
                            style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.25)" }}
                          >
                            Language: English
                          </span>
                        </button> */}

                  {/* Social Links */}
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-3 bg-white/5 border border-gray-800 rounded-lg hover:bg-white/10 transition-all duration-200"
                      onClick={() =>
                        window.open("https://x.com/moonbetgames", "_blank")
                      }
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
                      onClick={() =>
                        window.open(
                          "https://www.telegram.com/moonbet.games/",
                          "_blank"
                        )
                      }
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
                      onClick={() =>
                        window.open(
                          "https://www.instagram.com/moonbet.games/",
                          "_blank"
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                      >
                        <path
                          d="M16.9568 4.99806C16.917 4.09478 16.7709 3.47379 16.5616 2.93569C16.3457 2.36451 16.0135 1.85313 15.5783 1.42802C15.1531 0.996291 14.6383 0.660821 14.0736 0.448331C13.5323 0.239084 12.9144 0.0930131 12.011 0.0531874C11.1008 0.00998885 10.8118 0 8.50331 0C6.19479 0 5.90584 0.00998885 4.99902 0.0498146C4.09556 0.0896403 3.47445 0.235841 2.93638 0.444958C2.36496 0.660821 1.85348 0.992919 1.42829 1.42802C0.996481 1.85313 0.661077 2.36788 0.448417 2.93244C0.23913 3.47379 0.0930309 4.09141 0.0531976 4.99469C0.00999076 5.90471 0 6.19361 0 8.50169C0 10.8098 0.00999076 11.0987 0.0498241 12.0053C0.0896574 12.9086 0.235886 13.5296 0.445173 14.0677C0.661077 14.6389 0.996481 15.1502 1.42829 15.5754C1.85348 16.0071 2.36833 16.3426 2.933 16.555C3.47445 16.7643 4.09219 16.9104 4.99577 16.9502C5.90247 16.9901 6.19155 17 8.50006 17C10.8086 17 11.0975 16.9901 12.0044 16.9502C12.9078 16.9104 13.5289 16.7643 14.067 16.555C15.2097 16.1133 16.1132 15.21 16.555 14.0677C16.7641 13.5263 16.9103 12.9086 16.9502 12.0053C16.99 11.0987 17 10.8098 17 8.50169C17 6.19361 16.9966 5.90471 16.9568 4.99806ZM15.4256 11.9389C15.389 12.7691 15.2495 13.2175 15.1333 13.5164C14.8476 14.257 14.2597 14.8447 13.5189 15.1304C13.22 15.2466 12.7683 15.3861 11.9412 15.4225C11.0443 15.4625 10.7754 15.4724 8.50668 15.4724C6.238 15.4724 5.96565 15.4625 5.07206 15.4225C4.24166 15.3861 3.79325 15.2466 3.4943 15.1304C3.12568 14.9942 2.79015 14.7783 2.5178 14.496C2.23547 14.2204 2.01956 13.8883 1.88332 13.5197C1.76707 13.2208 1.62759 12.7691 1.59113 11.9423C1.55116 11.0456 1.5413 10.7766 1.5413 8.5083C1.5413 6.24005 1.55116 5.96776 1.59113 5.07447C1.62759 4.24423 1.76707 3.7959 1.88332 3.49701C2.01956 3.12833 2.23547 2.79299 2.52118 2.52057C2.79677 2.23828 3.12893 2.02242 3.49768 1.88634C3.79662 1.7701 4.24841 1.63065 5.07544 1.59407C5.97227 1.55424 6.24137 1.54425 8.50993 1.54425C10.782 1.54425 11.051 1.55424 11.9445 1.59407C12.7749 1.63065 13.2234 1.7701 13.5223 1.88634C13.8909 2.02242 14.2265 2.23828 14.4988 2.52057C14.7811 2.79623 14.997 3.12833 15.1333 3.49701C15.2495 3.7959 15.389 4.24747 15.4256 5.07447C15.4654 5.97113 15.4754 6.24005 15.4754 8.5083C15.4754 10.7766 15.4654 11.0422 15.4256 11.9389Z"
                          fill="#A7A7A7"
                        />
                        <path
                          d="M8.50331 4.13461C6.0919 4.13461 4.1354 6.09061 4.1354 8.50169C4.1354 10.9128 6.0919 12.8688 8.50331 12.8688C10.9148 12.8688 12.8712 10.9128 12.8712 8.50169C12.8712 6.09061 10.9148 4.13461 8.50331 4.13461ZM8.50331 11.3345C6.93891 11.3345 5.66995 10.0659 5.66995 8.50169C5.66995 6.93746 6.93891 5.66887 8.50331 5.66887C10.0678 5.66887 11.3367 6.93746 11.3367 8.50169C11.3367 10.0659 10.0678 11.3345 8.50331 11.3345Z"
                          fill="#A7A7A7"
                        />
                        <path
                          d="M14.0638 3.96194C14.0638 4.52495 13.6072 4.98146 13.0439 4.98146C12.4808 4.98146 12.0242 4.52495 12.0242 3.96194C12.0242 3.39881 12.4808 2.94243 13.0439 2.94243C13.6072 2.94243 14.0638 3.39881 14.0638 3.96194Z"
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
    </div>
  );
};

export default SidebarHeader;
