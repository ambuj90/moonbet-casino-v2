// components/Navbar/SidebarHeader.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { createPortal } from "react-dom";

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
  const [tooltip, setTooltip] = useState({ show: false, text: "", top: 0 });
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isLoggedIn = !!user?.id;
  const navigate = useNavigate();

  // Tooltip handlers
  const handleMouseEnter = (e, text) => {
    if (sidebarCollapsed) {
      const rect = e.currentTarget.getBoundingClientRect();
      setTooltip({ show: true, text, top: rect.top + rect.height / 2 });
    }
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, text: "", top: 0 });
  };

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
    const base = "w-5 h-5 transition-all duration-200 sidebar-icon";

    if (isActive) {
      return `${base} icon-active`;
    } else {
      return `${base} icon-normal`;
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
      return "trust_btn view_moon_btn relative flex items-center gap-2 px-3 py-1.5 rounded-[8px] transition-all text-white";
    } else {
      if (isCollapsed) {
        return "justify-center hover:bg-[linear-gradient(0deg,#35326B_0%,rgba(53,50,107,0)_100%)]";
      } else {
        return "gap-3 rounded-lg hover:bg-[linear-gradient(0deg,#35326B_0%,rgba(53,50,107,0)_100%)]";
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
    ...(isLoggedIn
      ? [
          {
            id: "favourites",
            label: "Favorites",
            icon: "/icons/favourites.svg",
            activeIcon: "/active-menu/favourites-active.svg",
            path: "/casino/favorites",
          },
        ]
      : []),
    {
      id: "recommended",
      label: "Trending",
      icon: "/icons/trending.svg",
      activeIcon: "/icons/trending.svg",
      path: "/casino",
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
          path: "/casino/baccarat",
          label: "Baccarat",
          icon: "/icons/bacarrat.svg",
        },
        {
          path: "/casino/game%20show",
          label: "Game Shows",
          icon: "/icons/game-shows.svg",
        },
        {
          path: "/casino/live-casino",
          label: "Live Casino",
          icon: "/icons/live-casino.svg",
        },
      ],
      path: "/casino/slots",
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
          icon: "/icons/bacarrat.svg",
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
      icon: "/icons/leaderboard-new.svg",
      activeIcon: "/active-menu/leaderboard-active-collasped.svg",
      comingSoon: true,
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
      id: "promotions",
      label: "Rewards",
      icon: "/icons/rewards.svg",
      activeIcon: "/active-menu/originals-active.svg",
      submenu: [
        {
          path: "casinochallenges",
          label: "Challenges",
          icon: "/icons/dices.svg",
          comingSoon: false,
        },
        {
          path: "promotions",
          label: "Promotions",
          icon: "/icons/rewards.svg",
          comingSoon: false,
        },
      ],
      path: "/casinochallenges",
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
            onMouseEnter={(e) => handleMouseEnter(e, item.label)}
            onMouseLeave={handleMouseLeave}
            className={`w-full flex items-center ${
              sidebarCollapsed ? "justify-center" : "justify-between"
            } px-3 py-2 rounded-lg transition-all duration-200 group relative
              ${
                activeSubmenu === item.id || isActive
                  ? "sb-active-expanded"
                  : "sb-hover-expanded"
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
                    className="text-[#e1e1e1] font-normal leading-24"
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
            {/* {sidebarCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-[#1A1B23] border border-gray-800 rounded text-xs text-[#A8A8A8] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                {item.label}
              </div>
            )} */}
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
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all group
                        ${
                          location.pathname === subItem.path
                            ? "text-white bg-gradient-to-b from-white/30 via-white/5 to-white/30 shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px]"
                            : "text-[#A8A8A8] hover:bg-[linear-gradient(0deg,#35326B_0%,rgba(53,50,107,0)_100%)]"
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
                        <span
                          className="claim-btn ml-auto text-[10px] font-semibold px-2 py-0.5  rounded-[4px] whitespace-nowrap tracking-wide"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(40, 194, 3, 0.00) 0%, rgba(40, 194, 3, 0.40) 100%)",
                          }}
                        >
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
                  className="text-[#e1e1e1] font-normal font-['Neue_Plak'] leading-6"
                  style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.25)" }}
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Tooltip for collapsed state */}
            {/* {sidebarCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-[#1A1B23] border border-gray-800 rounded text-xs text-[#A8A8A8] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                {item.label}
              </div>
            )} */}
          </Link>
        </motion.div>
      )}
    </div>
  );

  return (
    <div className="hidden lg:block">
      {/* Inline styles for icon hover effect */}
      <style>{`
        /* Icon hover effect - changes to #E1E1E1 on hover */
        .sidebar-icon {
          transition: filter 0.2s ease, opacity 0.2s ease;
        }
        
        /* Normal state */
        .sidebar-icon.icon-normal {
          filter: brightness(0) saturate(100%) invert(70%) sepia(8%) saturate(900%) hue-rotate(200deg) brightness(90%);
          opacity: 0.7;
        }
        
        /* Hover state - icon becomes #E1E1E1 */
        .group:hover .sidebar-icon.icon-normal,
        a:hover .sidebar-icon.icon-normal,
        button:hover .sidebar-icon.icon-normal {
          filter: brightness(0) saturate(100%) invert(95%) sepia(5%) saturate(100%) hue-rotate(200deg) brightness(100%);
          opacity: 1;
        }
        
        /* Active state */
        .sidebar-icon.icon-active {
          filter: brightness(0) invert(1);
          opacity: 1;
        }
        
        /* Submenu icon hover */
        .submenu-icon {
          transition: filter 0.2s ease, opacity 0.2s ease;
          filter: brightness(0) saturate(100%) invert(70%) sepia(8%) saturate(900%) hue-rotate(200deg) brightness(90%);
          opacity: 0.7;
        }
        
        .group:hover .submenu-icon,
        a:hover .submenu-icon {
          filter: brightness(0) saturate(100%) invert(95%) sepia(5%) saturate(100%) hue-rotate(200deg) brightness(100%);
          opacity: 1;
        }
      `}</style>

      {/* Backdrop for mobile/tablet */}
      {sidebarOpen && !sidebarCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 /50 backdrop-blur-sm z-40 lg:hidden"
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
        className={`fixed left-0 top-16 bottom-0 bg-[#1C1D49] px-2 `}
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
                          onMouseEnter={(e) => handleMouseEnter(e, item.label)}
                          onMouseLeave={handleMouseLeave}
                          className={`w-full flex items-center ${
                            sidebarCollapsed
                              ? "justify-center"
                              : "justify-between"
                          } px-3 py-2 rounded-lg transition-all duration-200 group relative
                              ${
                                activeSubmenu === item.id || isActive
                                  ? "sb-active-expanded"
                                  : "sb-hover-expanded"
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
                                  key={`${item.id}-${isActive}-${sidebarCollapsed}`}
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
                                  className="text-[#e1e1e1] font-normal leading-24"
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
                          {/* {sidebarCollapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-[#1A1B23] border border-gray-800 rounded text-xs text-[#A8A8A8] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                              {item.label}
                            </div>
                          )} */}
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
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all group
                                        ${
                                          location.pathname === subItem.path
                                            ? "text-white bg-gradient-to-b from-white/30 via-white/5 to-white/30 shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px]"
                                            : "text-[#A8A8A8] hover:bg-[linear-gradient(0deg,#35326B_0%,rgba(53,50,107,0)_100%)]"
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
                          onMouseEnter={(e) => handleMouseEnter(e, item.label)}
                          onMouseLeave={handleMouseLeave}
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
                                key={`${item.id}-${isActive}-${sidebarCollapsed}`}
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
                                className="text-[#e1e1e1] font-normal font-['Neue_Plak'] leading-6"
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
                          {/* {sidebarCollapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-[#1A1B23] border border-gray-800 rounded text-xs text-[#A8A8A8] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                              {item.label}
                            </div>
                          )} */}
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
                          onClick={() => {
                            // If sidebar is collapsed → go directly to slots
                            if (sidebarCollapsed) {
                              navigate(item.path || "/casino/slots");
                              closeSidebar();
                              return;
                            }

                            // If expanded → navigate + open submenu
                            // navigate(item.path || "/casino/slots");
                            setActiveSubmenu(item.id);
                          }}
                          onMouseEnter={(e) => handleMouseEnter(e, item.label)}
                          onMouseLeave={handleMouseLeave}
                          className={`w-full flex items-center rounded-[8px] backdrop-blur-[2px] ${
                            sidebarCollapsed
                              ? "justify-center"
                              : "justify-between bg-[#282753] shadow-[2px_2px_4px_0_rgba(0,0,0,0.25)]"
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
                                  key={`${item.id}-${isActive}-${sidebarCollapsed}`}
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
                                  className={`text-[#e1e1e1] font-normal font-['Neue_Plak'] leading-6 ${
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
                          {/* {sidebarCollapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-[#1A1B23] border border-gray-800 rounded text-xs text-[#A8A8A8] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                              {item.label}
                            </div>
                          )} */}
                        </motion.button>

                        {/* Submenu */}
                        <AnimatePresence>
                          {activeSubmenu === item.id && !sidebarCollapsed && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="mt-0 overflow-hidden"
                              style={{
                                background: "#282753",
                                borderEndEndRadius: "6px",
                                borderEndStartRadius: "6px",
                              }}
                            >
                              <div className="space-y-1.5">
                                {item.submenu.map((subItem) => (
                                  <Link
                                    key={subItem.path}
                                    to={subItem.path}
                                    className={`flex items-center gap-4 px-3 py-1.5 rounded-[8px] backdrop-blur-[2px] transition-all group
                                        ${
                                          location.pathname === subItem.path
                                            ? "trust_btn view_moon_btn text-white bg-gradient-to-b backdrop-blur-[2px]"
                                            : "text-[#E1E1E1] hover:bg-[linear-gradient(0deg,#35326B_0%,rgba(53,50,107,0)_100%)]"
                                        }`}
                                    onClick={closeSidebar}
                                  >
                                    <span className="text-lg flex items-center justify-center">
                                      {typeof subItem.icon === "string" &&
                                      subItem.icon.startsWith("/") ? (
                                        <img
                                          src={subItem.icon}
                                          alt={subItem.label}
                                          className={`w-5 h-5 object-contain ${
                                            location.pathname === subItem.path
                                              ? "icon-active"
                                              : "submenu-icon"
                                          }`}
                                        />
                                      ) : (
                                        subItem.icon
                                      )}
                                    </span>
                                    <span
                                      className={`text-sm font-['Neue_Plak'] ${
                                        location.pathname === subItem.path
                                          ? "text-white"
                                          : "text-[#E1E1E1] group-hover:text-white"
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
                                        <span
                                          className="claim-btn ml-auto text-[10px] font-semibold px-2 py-0.5  rounded-[4px]  whitespace-nowrap tracking-wide"
                                          style={{
                                            background:
                                              "linear-gradient(180deg, rgba(40, 194, 3, 0.00) 0%, rgba(40, 194, 3, 0.40) 100%)",
                                          }}
                                        >
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
                          onMouseEnter={(e) => handleMouseEnter(e, item.label)}
                          onMouseLeave={handleMouseLeave}
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

                          {!sidebarCollapsed && (
                            <motion.span
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              className="text-[#e1e1e1] font-normal font-['Neue_Plak'] leading-6"
                              style={{
                                textShadow:
                                  "0 0 10px rgba(255, 255, 255, 0.25)",
                              }}
                            >
                              {item.label}
                            </motion.span>
                          )}

                          {/* ⭐ COMING SOON BADGE FOR LEADERBOARD */}
                          {!sidebarCollapsed && item.comingSoon && (
                            <span
                              className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-[4px] whitespace-nowrap tracking-wide"
                              style={{
                                background:
                                  "linear-gradient(180deg, rgba(40,194,3,0.00) 0%, rgba(40,194,3,0.40) 100%)",
                                color: "#28C203",
                              }}
                            >
                              coming soon
                            </span>
                          )}

                          {isActive && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6"
                            />
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
                // Check if any submenu item is active for this parent
                const isSubmenuActive = item.submenu?.some(
                  (subItem) => location.pathname === subItem.path
                );
                const isActive =
                  location.pathname === item.path || isSubmenuActive;
                const isLiveSupport = item.label === "Live Support";

                return (
                  <div key={item.id || item.path || item.label}>
                    {/* ⭐ ITEM WITH SUBMENU (like Promotions) */}
                    {item.submenu ? (
                      <>
                        <motion.button
                          whileHover={{
                            scale: sidebarCollapsed ? 1.05 : 1.01,
                          }}
                          onClick={() => {
                            // Collapsed: go directly to default page
                            if (sidebarCollapsed) {
                              navigate(item.path || "/casinochallenges");
                              closeSidebar();
                              return;
                            }

                            // Expanded: navigate + open submenu
                            // navigate(item.path);
                            setActiveSubmenu(item.id);
                          }}
                          onMouseEnter={(e) => handleMouseEnter(e, item.label)}
                          onMouseLeave={handleMouseLeave}
                          className={`w-full flex items-center rounded-[8px] backdrop-blur-[2px] ${
                            sidebarCollapsed
                              ? "justify-center"
                              : "justify-between bg-[#282753] shadow-[2px_2px_4px_0_rgba(0,0,0,0.25)]"
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
                                  key={`${item.id}-${isActive}-${sidebarCollapsed}`}
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
                                  className={`text-[#e1e1e1] font-normal font-['Neue_Plak'] leading-6 ${
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
                        </motion.button>

                        {/* Submenu for Promotions */}
                        <AnimatePresence>
                          {activeSubmenu === item.id && !sidebarCollapsed && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="mt-0 overflow-hidden"
                              style={{
                                background: "#282753",
                                borderEndEndRadius: "6px",
                                borderEndStartRadius: "6px",
                              }}
                            >
                              <div className="space-y-1.5">
                                {item.submenu.map((subItem) => (
                                  <Link
                                    key={subItem.path + subItem.label}
                                    to={subItem.path}
                                    className={`flex items-center gap-4 px-3 py-1.5 rounded-[8px] backdrop-blur-[2px] transition-all group
                              ${
                                location.pathname === subItem.path
                                  ? "trust_btn view_moon_btn text-white bg-gradient-to-b backdrop-blur-[2px]"
                                  : "text-[#E1E1E1] hover:bg-[linear-gradient(0deg,#35326B_0%,rgba(53,50,107,0)_100%)]"
                              }`}
                                    onClick={closeSidebar}
                                  >
                                    <span className="text-lg flex items-center justify-center">
                                      {typeof subItem.icon === "string" &&
                                      subItem.icon.startsWith("/") ? (
                                        <img
                                          src={subItem.icon}
                                          alt={subItem.label}
                                          className={`w-5 h-5 object-contain ${
                                            location.pathname === subItem.path
                                              ? "icon-active"
                                              : "submenu-icon"
                                          }`}
                                        />
                                      ) : (
                                        subItem.icon
                                      )}
                                    </span>
                                    <span
                                      className={`text-sm font-['Neue_Plak'] ${
                                        location.pathname === subItem.path
                                          ? "text-white"
                                          : "text-[#E1E1E1] group-hover:text-white"
                                      }`}
                                      style={{
                                        textShadow:
                                          "0 0 10px rgba(255, 255, 255, 0.25)",
                                      }}
                                    >
                                      {subItem.label}
                                    </span>
                                    {/* ⭐ Coming Soon Badge for Promotions submenu */}
                                    {subItem.comingSoon && (
                                      <span
                                        className="claim-btn ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-[4px] whitespace-nowrap tracking-wide"
                                        style={{
                                          background:
                                            "linear-gradient(180deg, rgba(40, 194, 3, 0.00) 0%, rgba(40, 194, 3, 0.40) 100%)",
                                        }}
                                      >
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
                    ) : isLiveSupport ? (
                      /* ⭐ LIVE SUPPORT BUTTON (opens Tidio) */
                      <motion.div
                        whileHover={{ scale: sidebarCollapsed ? 1.05 : 1.01 }}
                        className="relative group"
                      >
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
                          onMouseEnter={(e) => handleMouseEnter(e, item.label)}
                          onMouseLeave={handleMouseLeave}
                          className={`flex items-center ${
                            sidebarCollapsed ? "justify-center" : "gap-3"
                          } w-full px-3 py-2 rounded-[8px] transition-all duration-200
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
                                className="text-[#e1e1e1] font-normal font-['Neue_Plak'] leading-6 text-white"
                                style={{
                                  textShadow: "0 0 10px rgba(255,255,255,0.25)",
                                }}
                              >
                                {item.label}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </button>
                      </motion.div>
                    ) : (
                      /* ⭐ ALL OTHER NORMAL LINK ITEMS */
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
                          onMouseEnter={(e) => handleMouseEnter(e, item.label)}
                          onMouseLeave={handleMouseLeave}
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
                                <span
                                  className="text-[#e1e1e1] font-normal font-['Neue_Plak'] leading-6 text-white"
                                  style={{
                                    textShadow:
                                      "0 0 10px rgba(255,255,255,0.25)",
                                  }}
                                >
                                  {item.label}
                                </span>

                                {item.comingSoon && (
                                  <span
                                    className="claim-btn ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-[4px] whitespace-nowrap tracking-wide"
                                    style={{
                                      background:
                                        "linear-gradient(180deg, rgba(40, 194, 3, 0.00) 0%, rgba(40, 194, 3, 0.40) 100%)",
                                    }}
                                  >
                                    coming soon
                                  </span>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {isActive && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r"
                            />
                          )}
                        </Link>
                      </motion.div>
                    )}
                  </div>
                );
              })}
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
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: "var(--cta-gradient)" }}
                    >
                      <span className="text-lg sm:text-xl text-white font-semibold">
                        {userName ? userName.charAt(0).toUpperCase() : ""}
                      </span>
                    </div>

                    {/* Username */}
                    <p
                      className="text-center font-[400] text-[16px] 
               leading-[24px] tracking-[0.3px] 
               font-['Neue_Plack',sans-serif] capitalize not-italic"
                    >
                      {userName}
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center px-1">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2  py-3 transition-all duration-200"
                      onClick={() =>
                        window.open(
                          "https://www.instagram.com/moonbet.games/",
                          "_blank"
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                      >
                        <rect
                          x="1"
                          y="1"
                          width="34"
                          height="34"
                          rx="12"
                          fill="#282753"
                        />
                        <rect
                          x="1"
                          y="1"
                          width="34"
                          height="34"
                          rx="12"
                          stroke="url(#paint0_linear_9185_1053)"
                          strokeWidth="2"
                        />
                        <path
                          d="M26.9543 14.2921C26.9121 13.3357 26.7574 12.6781 26.5358 12.1084C26.3072 11.5036 25.9555 10.9621 25.4947 10.512C25.0445 10.0549 24.4994 9.69969 23.9015 9.4747C23.3283 9.25315 22.6741 9.09848 21.7175 9.05632C20.7538 9.01058 20.4478 9 18.0035 9C15.5592 9 15.2532 9.01058 14.2931 9.05274C13.3365 9.09491 12.6788 9.24971 12.1091 9.47113C11.5041 9.69969 10.9625 10.0513 10.5123 10.512C10.0551 10.9621 9.69996 11.5072 9.47479 12.1049C9.2532 12.6781 9.0985 13.3321 9.05633 14.2885C9.01058 15.252 9 15.5579 9 18.0018C9 20.4456 9.01058 20.7515 9.05275 21.7115C9.09493 22.6679 9.24976 23.3254 9.47136 23.8952C9.69996 24.5 10.0551 25.0414 10.5123 25.4916C10.9625 25.9487 11.5076 26.3039 12.1055 26.5289C12.6788 26.7504 13.3329 26.9051 14.2896 26.9473C15.2497 26.9896 15.5558 27 18.0001 27C20.4444 27 20.7503 26.9896 21.7105 26.9473C22.6671 26.9051 23.3247 26.7504 23.8945 26.5289C25.1044 26.0612 26.061 25.1048 26.5288 23.8952C26.7502 23.322 26.9051 22.6679 26.9472 21.7115C26.9894 20.7515 27 20.4456 27 18.0018C27 15.5579 26.9964 15.252 26.9543 14.2921ZM25.333 21.6412C25.2943 22.5203 25.1466 22.995 25.0235 23.3114C24.721 24.0956 24.0985 24.718 23.3142 25.0204C22.9976 25.1435 22.5194 25.2911 21.6436 25.3297C20.694 25.3721 20.4092 25.3825 18.0071 25.3825C15.6049 25.3825 15.3166 25.3721 14.3704 25.3297C13.4912 25.2911 13.0164 25.1435 12.6998 25.0204C12.3095 24.8762 11.9543 24.6476 11.6659 24.3487C11.367 24.0569 11.1384 23.7052 10.9941 23.315C10.871 22.9985 10.7233 22.5203 10.6847 21.6448C10.6424 20.6953 10.632 20.4105 10.632 18.0088C10.632 15.6071 10.6424 15.3188 10.6847 14.373C10.7233 13.4939 10.871 13.0192 10.9941 12.7027C11.1384 12.3123 11.367 11.9573 11.6695 11.6688C11.9613 11.3699 12.313 11.1414 12.7034 10.9973C13.02 10.8742 13.4983 10.7266 14.374 10.6878C15.3236 10.6457 15.6085 10.6351 18.0105 10.6351C20.4162 10.6351 20.701 10.6457 21.6472 10.6878C22.5264 10.7266 23.0012 10.8742 23.3177 10.9973C23.708 11.1414 24.0633 11.3699 24.3517 11.6688C24.6506 11.9607 24.8792 12.3123 25.0235 12.7027C25.1466 13.0192 25.2943 13.4973 25.333 14.373C25.3752 15.3224 25.3858 15.6071 25.3858 18.0088C25.3858 20.4105 25.3752 20.6918 25.333 21.6412Z"
                          fill="#9292D2"
                        />
                        <path
                          d="M18.0035 13.3778C15.4502 13.3778 13.3787 15.4489 13.3787 18.0018C13.3787 20.5547 15.4502 22.6258 18.0035 22.6258C20.5569 22.6258 22.6284 20.5547 22.6284 18.0018C22.6284 15.4489 20.5569 13.3778 18.0035 13.3778ZM18.0035 21.0012C16.3471 21.0012 15.0035 19.658 15.0035 18.0018C15.0035 16.3455 16.3471 15.0023 18.0035 15.0023C19.6601 15.0023 21.0035 16.3455 21.0035 18.0018C21.0035 19.658 19.6601 21.0012 18.0035 21.0012Z"
                          fill="#9292D2"
                        />
                        <path
                          d="M23.891 13.195C23.891 13.7911 23.4076 14.2745 22.8112 14.2745C22.215 14.2745 21.7315 13.7911 21.7315 13.195C21.7315 12.5987 22.215 12.1155 22.8112 12.1155C23.4076 12.1155 23.891 12.5987 23.891 13.195Z"
                          fill="#9292D2"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_9185_1053"
                            x1="3.38187"
                            y1="0.999992"
                            x2="19.5807"
                            y2="38.2923"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="white" stopOpacity="0.4" />
                            <stop
                              offset="0.405687"
                              stopColor="white"
                              stopOpacity="0.01"
                            />
                            <stop
                              offset="0.574372"
                              stopColor="white"
                              stopOpacity="0.01"
                            />
                            <stop
                              offset="1"
                              stopColor="white"
                              stopOpacity="0.1"
                            />
                          </linearGradient>
                        </defs>
                      </svg>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2  py-3 transition-all duration-200"
                      onClick={() =>
                        window.open("https://x.com/moonbetgames ", "_blank")
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                      >
                        <rect
                          x="1"
                          y="1"
                          width="34"
                          height="34"
                          rx="12"
                          fill="#282753"
                        />
                        <rect
                          x="1"
                          y="1"
                          width="34"
                          height="34"
                          rx="12"
                          stroke="url(#paint0_linear_9185_1056)"
                          strokeWidth="2"
                        />
                        <path
                          d="M19.7124 16.6218L26.4133 9H24.8254L19.0071 15.6179L14.3599 9H9L16.0274 19.0074L9 27H10.588L16.7324 20.0113L21.6401 27H27L19.7124 16.6218ZM11.1602 10.1697H13.5992L24.8262 25.8835H22.3871L11.1602 10.1697Z"
                          fill="#9292D2"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_9185_1056"
                            x1="3.38187"
                            y1="0.999992"
                            x2="19.5807"
                            y2="38.2923"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="white" stopOpacity="0.4" />
                            <stop
                              offset="0.405687"
                              stopColor="white"
                              stopOpacity="0.01"
                            />
                            <stop
                              offset="0.574372"
                              stopColor="white"
                              stopOpacity="0.01"
                            />
                            <stop
                              offset="1"
                              stopColor="white"
                              stopOpacity="0.1"
                            />
                          </linearGradient>
                        </defs>
                      </svg>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 transition-all duration-200"
                      onClick={() =>
                        window.open(
                          "https://www.telegram.com/moonbet.games/",
                          "_blank"
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                      >
                        <rect
                          x="1"
                          y="1"
                          width="34"
                          height="34"
                          rx="12"
                          fill="#282753"
                        />
                        <rect
                          x="1"
                          y="1"
                          width="34"
                          height="34"
                          rx="12"
                          stroke="url(#paint0_linear_9185_1059)"
                          strokeWidth="2"
                        />
                        <path
                          d="M16.0631 21.2041L15.7653 25.9505C16.1913 25.9505 16.3758 25.7431 16.5971 25.4941L18.5944 23.3308L22.733 26.7657C23.492 27.2451 24.0267 26.9926 24.2315 25.9743L26.9481 11.5482L26.9488 11.5473C27.1896 10.2757 26.5431 9.7785 25.8035 10.0904L9.83565 17.0188C8.74588 17.4982 8.76238 18.1867 9.6504 18.4986L13.7327 19.9376L23.2152 13.2133C23.6615 12.8784 24.0672 13.0637 23.7335 13.3986L16.0631 21.2041Z"
                          fill="#9292D2"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_9185_1059"
                            x1="3.38187"
                            y1="0.999992"
                            x2="19.5807"
                            y2="38.2923"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="white" stopOpacity="0.4" />
                            <stop
                              offset="0.405687"
                              stopColor="white"
                              stopOpacity="0.01"
                            />
                            <stop
                              offset="0.574372"
                              stopColor="white"
                              stopOpacity="0.01"
                            />
                            <stop
                              offset="1"
                              stopColor="white"
                              stopOpacity="0.1"
                            />
                          </linearGradient>
                        </defs>
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Portal Tooltip - Renders to body, bypasses all stacking contexts */}
        {sidebarCollapsed &&
          tooltip.show &&
          createPortal(
            <div
              className="fixed left-[70px] px-2 py-1  border border-gray-800 rounded text-xs text-[#A8A8A8] whitespace-nowrap pointer-events-none"
              style={{
                top: tooltip.top,
                transform: "translateY(-50%)",
                zIndex: 9999,
                backgroundColor: "var(--bg-dark-purple-2)",
              }}
            >
              {tooltip.text}
            </div>,
            document.body
          )}
      </motion.aside>
    </div>
  );
};

export default SidebarHeader;
