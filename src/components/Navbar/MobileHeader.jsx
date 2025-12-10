// components/Navbar/MobileHeader.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const MobileHeader = ({
  isMobileSidebarOpen = false,
  closeMobileSidebar = () => {},
  hasToken = false,
  userName = "",
  handleLogout = () => {},
}) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();

  /* -------------------------------
      ICON + ACTIVE CLASS MATCHING
     ------------------------------- */

  const getMenuIcon = (item, currentPath, isSubmenuActive = false) => {
    const isActive = currentPath === item.path || isSubmenuActive;
    return isActive && item.activeIcon ? item.activeIcon : item.icon;
  };

  const getMenuIconClass = (item, currentPath, isSubmenuActive = false) => {
    const isActive = currentPath === item.path || isSubmenuActive;
    const base = "w-5 h-5 transition-all duration-300";

    return isActive
      ? `${base} icon-active`
      : `${base} icon-normal group-hover:icon-hover`;
  };

  const getMainMenuClass = (item, currentPath) => {
    const isActive = currentPath === item.path;

    return isActive
      ? "trust_btn view_moon_btn relative flex items-center gap-3 px-3 py-2 rounded-[8px] transition-all text-white"
      : "flex items-center gap-3 px-3 py-2 rounded-[8px] text-[#A8A8A8] hover:text-white hover:bg-[linear-gradient(0deg,#35326B_0%,rgba(53,50,107,0)_100%)]";
  };

  const getGamesMenuClass = (item, currentPath, submenuActive) => {
    const isActive = currentPath === item.path || submenuActive;

    return isActive
      ? "rounded-[8px] text-white border border-[rgba(255,255,255,0.40)] bg-[var(--click-state,linear-gradient(0deg,rgba(220,31,255,0.80)0%,rgba(220,31,255,0)100%))] shadow-[0_3px_3px_rgba(255,255,255,0.25)_inset,0_3px_3px_rgba(0,0,0,0.25)] px-3 py-2 flex items-center justify-between w-full"
      : "rounded-[8px] w-full px-3 py-2 flex items-center justify-between text-[#E1E1E1] bg-[#282753] hover:text-white hover:bg-[linear-gradient(0deg,#35326B_0%,rgba(53,50,107,0)_100%)] shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px]";
  };

  // Separate class for direct link items (no submenu)
  const getGamesLinkClass = (item, currentPath) => {
    const isActive = currentPath === item.path;

    return isActive
      ? "rounded-[8px] text-white border border-[rgba(255,255,255,0.40)] bg-[var(--click-state,linear-gradient(0deg,rgba(220,31,255,0.80)0%,rgba(220,31,255,0)100%))] shadow-[0_3px_3px_rgba(255,255,255,0.25)_inset,0_3px_3px_rgba(0,0,0,0.25)] px-3 py-2 flex items-center gap-3 w-full"
      : "rounded-[8px] w-full px-3 py-2 flex items-center gap-3 text-[#E1E1E1] bg-[#282753] hover:text-white hover:bg-[linear-gradient(0deg,#35326B_0%,rgba(53,50,107,0)_100%)] shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px]";
  };

  const getAccountMenuClass = (item, currentPath) => {
    const isActive = currentPath === item.path;

    return isActive
      ? "trust_btn view_moon_btn relative flex items-center gap-3 px-3 py-2 rounded-[8px] transition-all text-white"
      : "flex items-center gap-3 px-3 py-2 rounded-[8px] text-[#A8A8A8] hover:text-white hover:bg-[linear-gradient(0deg,#35326B_0%,rgba(53,50,107,0)_100%)]";
  };

  /* -------------------------------
      MENU STRUCTURE
     ------------------------------- */

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
          icon: "/icons/bacarrat.svg",
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

  /* -------------------------------
      HANDLE NAVIGATION
     ------------------------------- */

  const handleItemClick = (item) => {
    // If item has submenu, toggle it
    if (item.submenu) {
      setActiveSubmenu(activeSubmenu === item.id ? null : item.id);
    }
    // If item has direct path (no submenu), close sidebar after navigation
    // Navigation is handled by Link component
  };

  const handleSubmenuClick = (subItem) => {
    // Don't navigate if it's a "coming soon" item with # path
    if (subItem.comingSoon || subItem.path === "#") {
      return;
    }
    closeMobileSidebar();
  };

  /* -------------------------------
      COMPONENT RENDER
     ------------------------------- */

  return (
    <div className="lg:hidden">
      {/* Backdrop Overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={closeMobileSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isMobileSidebarOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed left-0 top-16 bottom-0 w-64 bg-[#1C1D49] border-r border-white/10 shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px] z-50 overflow-hidden"
      >
        <div className="overflow-y-auto h-full pt-4 pb-20 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {/* ------------------- MAIN MENU ------------------- */}
          <div className="px-4">
            <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-1">
              Main Menu
            </h3>

            <div className="space-y-1">
              {menuItems.map((item) => (
                <motion.div key={item.id} whileHover={{ scale: 1.01 }}>
                  <Link
                    to={item.path}
                    onClick={closeMobileSidebar}
                    className={getMainMenuClass(item, location.pathname)}
                  >
                    <img
                      src={getMenuIcon(item, location.pathname)}
                      className={getMenuIconClass(item, location.pathname)}
                      alt={item.label}
                    />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ------------------- GAMES MENU ------------------- */}
          <div className="px-4 mt-6 relative customborder">
            <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-1">
              Games
            </h3>

            <div className="space-y-1">
              {gamesItems.map((item) => {
                const submenuActive = item.submenu?.some(
                  (sub) => location.pathname === sub.path
                );
                const hasSubmenu = item.submenu && item.submenu.length > 0;

                return (
                  <div key={item.id}>
                    {/* RENDER LINK FOR DIRECT PATH ITEMS (no submenu) */}
                    {!hasSubmenu && item.path ? (
                      <motion.div whileHover={{ scale: 1.01 }}>
                        <Link
                          to={item.path}
                          onClick={closeMobileSidebar}
                          className={getGamesLinkClass(item, location.pathname)}
                        >
                          <img
                            src={getMenuIcon(item, location.pathname)}
                            className={getMenuIconClass(
                              item,
                              location.pathname
                            )}
                            alt={item.label}
                          />
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      </motion.div>
                    ) : (
                      <>
                        {/* RENDER BUTTON FOR SUBMENU ITEMS */}
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          onClick={() => handleItemClick(item)}
                          className={getGamesMenuClass(
                            item,
                            location.pathname,
                            submenuActive
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={getMenuIcon(
                                item,
                                location.pathname,
                                submenuActive
                              )}
                              className={getMenuIconClass(
                                item,
                                location.pathname,
                                submenuActive
                              )}
                              alt={item.label}
                            />
                            <span className="font-medium">{item.label}</span>
                          </div>

                          <motion.svg
                            animate={{
                              rotate: activeSubmenu === item.id ? 180 : 0,
                            }}
                            transition={{ duration: 0.2 }}
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
                        </motion.button>

                        {/* SUBMENU */}
                        <AnimatePresence>
                          {activeSubmenu === item.id && item.submenu && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="mt-1 ml-2 space-y-1 overflow-hidden"
                            >
                              {item.submenu.map((subItem) => {
                                const subActive =
                                  location.pathname === subItem.path;
                                const isComingSoon =
                                  subItem.comingSoon || subItem.path === "#";

                                return (
                                  <Link
                                    key={subItem.path + subItem.label}
                                    to={isComingSoon ? "#" : subItem.path}
                                    onClick={(e) => {
                                      if (isComingSoon) {
                                        e.preventDefault();
                                        return;
                                      }
                                      closeMobileSidebar();
                                    }}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-[8px] transition-all ${
                                      subActive
                                        ? "text-white trust_btn view_moon_btn"
                                        : isComingSoon
                                        ? "text-[#E1E1E1]/60 cursor-not-allowed"
                                        : "text-[#E1E1E1] hover:bg-white/5 hover:text-white"
                                    }`}
                                  >
                                    <img
                                      src={subItem.icon}
                                      className={`w-5 h-5 transition-all ${
                                        isComingSoon
                                          ? "opacity-40"
                                          : subActive
                                          ? "brightness-0 invert-[.88]"
                                          : "opacity-70 group-hover:opacity-100"
                                      }`}
                                      alt={subItem.label}
                                    />

                                    <span>{subItem.label}</span>

                                    {subItem.comingSoon && (
                                      <span
                                        className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-[4px] text-[#28C203]"
                                        style={{
                                          background:
                                            "linear-gradient(180deg, rgba(40,194,3,0) 0%, rgba(40,194,3,0.40) 100%)",
                                        }}
                                      >
                                        coming soon
                                      </span>
                                    )}
                                  </Link>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ------------------- ACCOUNT MENU ------------------- */}
          <div className="px-4 mt-6 customborder">
            <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-1">
              Account
            </h3>

            <div className="space-y-1">
              {accountItems.map((item, index) => {
                const isComingSoon = item.comingSoon || item.path === "#";
                const isLiveSupport = item.label === "Live Support";

                return (
                  <motion.div
                    key={item.path + item.label + index}
                    whileHover={{ scale: 1.01 }}
                  >
                    {isLiveSupport ? (
                      // Live Support - could be a button or external link
                      <button
                        onClick={() => {
                          // Handle live support action here
                          // e.g., open chat widget
                          closeMobileSidebar();
                        }}
                        className={`${getAccountMenuClass(
                          item,
                          location.pathname
                        )} w-full`}
                      >
                        <img
                          src={getMenuIcon(item, location.pathname)}
                          className={getMenuIconClass(item, location.pathname)}
                          alt={item.label}
                        />
                        <span>{item.label}</span>
                      </button>
                    ) : isComingSoon ? (
                      // Coming Soon items - non-clickable
                      <div
                        className={`${getAccountMenuClass(
                          item,
                          location.pathname
                        )} cursor-not-allowed opacity-70`}
                      >
                        <img
                          src={getMenuIcon(item, location.pathname)}
                          className={getMenuIconClass(item, location.pathname)}
                          alt={item.label}
                        />
                        <span>{item.label}</span>
                        <span
                          className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-[4px] text-[#28C203]"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(40,194,3,0) 0%, rgba(40,194,3,0.40) 100%)",
                          }}
                        >
                          coming soon
                        </span>
                      </div>
                    ) : (
                      // Regular navigation items
                      <Link
                        to={item.path}
                        onClick={closeMobileSidebar}
                        className={getAccountMenuClass(item, location.pathname)}
                      >
                        <img
                          src={getMenuIcon(item, location.pathname)}
                          className={getMenuIconClass(item, location.pathname)}
                          alt={item.label}
                        />
                        <span>{item.label}</span>
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ------------------- USER SECTION (if logged in) ------------------- */}
          {hasToken && userName && (
            <div className="px-4 mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3 px-3 py-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-white font-medium truncate">
                  {userName}
                </span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default MobileHeader;
