// components/Navbar/MobileHeader.jsx - OPTIMIZED VERSION
// - Static menu data moved outside component
// - Memoized sub-components
// - CSS transitions for simple animations
// - Framer Motion only for complex animations (height: auto)
// - useCallback for handlers

import React, { useState, useCallback, useMemo, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// =============================================================================
// STATIC DATA - Moved outside to prevent recreation on every render
// =============================================================================

const MENU_ITEMS = Object.freeze([
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
]);

const GAMES_ITEMS = Object.freeze([
  {
    id: "casino",
    label: "Casino",
    icon: "/icons/casino.svg",
    activeIcon: "/active-menu/casino-active.svg",
    submenu: [
      { path: "/casino/slots", label: "Slots", icon: "/icons/slots.svg" },
      { path: "/casino/blackjack", label: "Blackjack", icon: "/icons/blackjack.svg" },
      { path: "/casino/roulette", label: "Roulette", icon: "/icons/roulette.svg" },
      { path: "/casino/bacarrat", label: "Baccarat", icon: "/icons/bacarrat.svg" },
      { path: "/casino/game-shows", label: "Game Shows", icon: "/icons/game-shows.svg" },
      { path: "/casino/live-casino", label: "Live Casino", icon: "/icons/live-casino.svg" },
    ],
  },
  {
    id: "originals",
    label: "Originals",
    icon: "/icons/originals.svg",
    activeIcon: "/active-menu/originals-active.svg",
    submenu: [
      { path: "#", label: "Dice", icon: "/icons/dices.svg", comingSoon: true },
      { path: "#", label: "HoneyPot", icon: "/icons/honeyPot.svg", comingSoon: true },
      { path: "#", label: "Blackjack", icon: "/icons/blackjack.svg", comingSoon: true },
      { path: "#", label: "67", icon: "/icons/67.svg", comingSoon: true },
      { path: "#", label: "Baccarat", icon: "/icons/bacarrat.svg", comingSoon: true },
      { path: "#", label: "Mines", icon: "/icons/mines.svg", comingSoon: true },
    ],
  },
  {
    id: "leaderboard",
    label: "Leaderboard",
    icon: "/icons/leaderboard.svg",
    activeIcon: "/active-menu/leaderboard-active-collasped.svg",
    path: "/leaderboard",
  },
]);

// Account items factory - needs hasToken
const getAccountItems = (hasToken) => [
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
    label: "Promotions",
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

// =============================================================================
// HELPER FUNCTIONS - Moved outside component
// =============================================================================

const getMenuIcon = (item, currentPath, isSubmenuActive = false) => {
  const isActive = currentPath === item.path || isSubmenuActive;
  return isActive && item.activeIcon ? item.activeIcon : item.icon;
};

const getMenuIconClass = (item, currentPath, isSubmenuActive = false) => {
  const isActive = currentPath === item.path || isSubmenuActive;
  const base = "w-5 h-5 transition-all duration-300";
  return isActive ? `${base} icon-active` : `${base} icon-normal group-hover:icon-hover`;
};

// =============================================================================
// MEMOIZED SUB-COMPONENTS
// =============================================================================

// Coming Soon Badge
const ComingSoonBadge = memo(() => (
  <span
    className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-[4px] text-[#28C203]"
    style={{
      background: "linear-gradient(180deg, rgba(40,194,3,0) 0%, rgba(40,194,3,0.40) 100%)",
    }}
  >
    coming soon
  </span>
));

ComingSoonBadge.displayName = "ComingSoonBadge";

// Menu Item Component
const MenuItem = memo(({ item, currentPath, onClick }) => {
  const isActive = currentPath === item.path;
  
  const className = isActive
    ? "trust_btn view_moon_btn relative flex items-center gap-3 px-3 py-2 rounded-[8px] transition-all text-white"
    : "flex items-center gap-3 px-3 py-2 rounded-[8px] text-[#A8A8A8] hover:text-white hover:bg-[linear-gradient(0deg,#35326B_0%,rgba(53,50,107,0)_100%)] transition-all duration-200";

  return (
    <div className="menu-item-hover">
      <Link to={item.path} onClick={onClick} className={className}>
        <img
          src={getMenuIcon(item, currentPath)}
          className={getMenuIconClass(item, currentPath)}
          alt={item.label}
          loading="lazy"
        />
        <span className="font-medium">{item.label}</span>
      </Link>
    </div>
  );
});

MenuItem.displayName = "MenuItem";

// Submenu Item Component
const SubmenuItem = memo(({ subItem, currentPath, onClick }) => {
  const subActive = currentPath === subItem.path;
  const isComingSoon = subItem.comingSoon || subItem.path === "#";

  const className = `flex items-center gap-3 px-3 py-2 rounded-[8px] transition-all duration-200 ${
    subActive
      ? "text-white trust_btn view_moon_btn"
      : isComingSoon
      ? "text-[#E1E1E1]/60 cursor-not-allowed"
      : "text-[#E1E1E1] hover:bg-white/5 hover:text-white"
  }`;

  const handleClick = useCallback((e) => {
    if (isComingSoon) {
      e.preventDefault();
      return;
    }
    onClick?.();
  }, [isComingSoon, onClick]);

  return (
    <Link
      to={isComingSoon ? "#" : subItem.path}
      onClick={handleClick}
      className={className}
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
        loading="lazy"
      />
      <span>{subItem.label}</span>
      {subItem.comingSoon && <ComingSoonBadge />}
    </Link>
  );
});

SubmenuItem.displayName = "SubmenuItem";

// Games Menu Item (with submenu support)
const GamesMenuItem = memo(({ item, currentPath, activeSubmenu, onToggle, onClose }) => {
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  const submenuActive = item.submenu?.some((sub) => currentPath === sub.path);
  const isExpanded = activeSubmenu === item.id;

  // Direct link item (no submenu)
  if (!hasSubmenu && item.path) {
    const isActive = currentPath === item.path;
    const className = isActive
      ? "rounded-[8px] text-white border border-[rgba(255,255,255,0.40)] bg-[var(--click-state,linear-gradient(0deg,rgba(220,31,255,0.80)0%,rgba(220,31,255,0)100%))] shadow-[0_3px_3px_rgba(255,255,255,0.25)_inset,0_3px_3px_rgba(0,0,0,0.25)] px-3 py-2 flex items-center gap-3 w-full"
      : "rounded-[8px] w-full px-3 py-2 flex items-center gap-3 text-[#E1E1E1] bg-[#282753] hover:text-white hover:bg-[linear-gradient(0deg,#35326B_0%,rgba(53,50,107,0)_100%)] shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px] transition-all duration-200";

    return (
      <div className="menu-item-hover">
        <Link to={item.path} onClick={onClose} className={className}>
          <img
            src={getMenuIcon(item, currentPath)}
            className={getMenuIconClass(item, currentPath)}
            alt={item.label}
            loading="lazy"
          />
          <span className="font-medium">{item.label}</span>
        </Link>
      </div>
    );
  }

  // Submenu item
  const isActive = currentPath === item.path || submenuActive;
  const buttonClass = isActive
    ? "rounded-[8px] text-white border border-[rgba(255,255,255,0.40)] bg-[var(--click-state,linear-gradient(0deg,rgba(220,31,255,0.80)0%,rgba(220,31,255,0)100%))] shadow-[0_3px_3px_rgba(255,255,255,0.25)_inset,0_3px_3px_rgba(0,0,0,0.25)] px-3 py-2 flex items-center justify-between w-full"
    : "rounded-[8px] w-full px-3 py-2 flex items-center justify-between text-[#E1E1E1] bg-[#282753] hover:text-white hover:bg-[linear-gradient(0deg,#35326B_0%,rgba(53,50,107,0)_100%)] shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px] transition-all duration-200";

  const handleToggle = useCallback(() => {
    onToggle(item.id);
  }, [item.id, onToggle]);

  return (
    <div>
      <button onClick={handleToggle} className={buttonClass}>
        <div className="flex items-center gap-3">
          <img
            src={getMenuIcon(item, currentPath, submenuActive)}
            className={getMenuIconClass(item, currentPath, submenuActive)}
            alt={item.label}
            loading="lazy"
          />
          <span className="font-medium">{item.label}</span>
        </div>

        {/* Chevron - CSS transform instead of Framer Motion */}
        <svg
          className={`w-4 h-4 text-[#A8A8A8] transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
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
        </svg>
      </button>

      {/* Submenu - AnimatePresence for height animation */}
      <AnimatePresence>
        {isExpanded && item.submenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1 ml-2 space-y-1 overflow-hidden"
          >
            {item.submenu.map((subItem) => (
              <SubmenuItem
                key={`${subItem.path}-${subItem.label}`}
                subItem={subItem}
                currentPath={currentPath}
                onClick={onClose}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

GamesMenuItem.displayName = "GamesMenuItem";

// Account Menu Item
const AccountMenuItem = memo(({ item, index, currentPath, onClose }) => {
  const isComingSoon = item.comingSoon || item.path === "#";
  const isLiveSupport = item.label === "Live Support";
  const isActive = currentPath === item.path;

  const className = isActive
    ? "trust_btn view_moon_btn relative flex items-center gap-3 px-3 py-2 rounded-[8px] transition-all text-white"
    : "flex items-center gap-3 px-3 py-2 rounded-[8px] text-[#A8A8A8] hover:text-white hover:bg-[linear-gradient(0deg,#35326B_0%,rgba(53,50,107,0)_100%)] transition-all duration-200";

  if (isLiveSupport) {
    return (
      <div className="menu-item-hover">
        <button onClick={onClose} className={`${className} w-full`}>
          <img
            src={getMenuIcon(item, currentPath)}
            className={getMenuIconClass(item, currentPath)}
            alt={item.label}
            loading="lazy"
          />
          <span>{item.label}</span>
        </button>
      </div>
    );
  }

  if (isComingSoon) {
    return (
      <div className={`${className} cursor-not-allowed opacity-70`}>
        <img
          src={getMenuIcon(item, currentPath)}
          className={getMenuIconClass(item, currentPath)}
          alt={item.label}
          loading="lazy"
        />
        <span>{item.label}</span>
        <ComingSoonBadge />
      </div>
    );
  }

  return (
    <div className="menu-item-hover">
      <Link to={item.path} onClick={onClose} className={className}>
        <img
          src={getMenuIcon(item, currentPath)}
          className={getMenuIconClass(item, currentPath)}
          alt={item.label}
          loading="lazy"
        />
        <span>{item.label}</span>
      </Link>
    </div>
  );
});

AccountMenuItem.displayName = "AccountMenuItem";

// User Section
const UserSection = memo(({ userName, onLogout, onClose }) => {
  const handleLogout = useCallback(() => {
    onLogout();
    onClose();
  }, [onLogout, onClose]);

  return (
    <div className="px-4 mt-6 pt-4 border-t border-white/10">
      <div className="flex items-center gap-3 px-3 py-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <span className="text-white text-sm font-bold">
            {userName.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="text-white font-medium truncate">{userName}</span>
      </div>

      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-[8px] text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 logout-btn-hover"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        <span>Logout</span>
      </button>
    </div>
  );
});

UserSection.displayName = "UserSection";

// =============================================================================
// MAIN MOBILE HEADER COMPONENT
// =============================================================================

const MobileHeader = ({
  isMobileSidebarOpen = false,
  closeMobileSidebar = () => {},
  hasToken = false,
  userName = "",
  handleLogout = () => {},
}) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();
  const currentPath = location.pathname;

  // Memoize account items based on hasToken
  const accountItems = useMemo(() => getAccountItems(hasToken), [hasToken]);

  // Handlers
  const handleToggleSubmenu = useCallback((menuId) => {
    setActiveSubmenu((prev) => (prev === menuId ? null : menuId));
  }, []);

  const handleClose = useCallback(() => {
    closeMobileSidebar();
  }, [closeMobileSidebar]);

  return (
    <div className="lg:hidden">
      {/* Backdrop Overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={handleClose}
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
          {/* MAIN MENU */}
          <div className="px-4">
            <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-1">
              Main Menu
            </h3>
            <div className="space-y-1">
              {MENU_ITEMS.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  currentPath={currentPath}
                  onClick={handleClose}
                />
              ))}
            </div>
          </div>

          {/* GAMES MENU */}
          <div className="px-4 mt-6 relative customborder">
            <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-1">
              Games
            </h3>
            <div className="space-y-1">
              {GAMES_ITEMS.map((item) => (
                <GamesMenuItem
                  key={item.id}
                  item={item}
                  currentPath={currentPath}
                  activeSubmenu={activeSubmenu}
                  onToggle={handleToggleSubmenu}
                  onClose={handleClose}
                />
              ))}
            </div>
          </div>

          {/* ACCOUNT MENU */}
          <div className="px-4 mt-6 customborder">
            <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-1">
              Account
            </h3>
            <div className="space-y-1">
              {accountItems.map((item, index) => (
                <AccountMenuItem
                  key={`${item.path}-${item.label}-${index}`}
                  item={item}
                  index={index}
                  currentPath={currentPath}
                  onClose={handleClose}
                />
              ))}
            </div>
          </div>

          {/* USER SECTION */}
          {hasToken && userName && (
            <UserSection
              userName={userName}
              onLogout={handleLogout}
              onClose={handleClose}
            />
          )}
        </div>
      </motion.div>

      {/* CSS for hover effects */}
      <style>{`
        .menu-item-hover {
          transition: transform 0.15s ease;
        }
        .menu-item-hover:hover {
          transform: scale(1.01);
        }
        .logout-btn-hover:hover {
          transform: scale(1.01);
        }
      `}</style>
    </div>
  );
};

export default memo(MobileHeader);