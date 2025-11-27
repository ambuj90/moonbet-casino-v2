// Enhanced Header.jsx with Sidebar Toggle and Futuristic Casino UI
import React, { useState, useEffect, useRef, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import WalletSettingsModal from "../WalletSettingsModal";
import WalletModal from "../WalletModal";
import LoginTrigger from "../LoginSignup/LoginTrigger";
import axios from "axios";
import { toast } from "react-toastify";
import WalletDropdownCenter from "../Navbar/WalletDropdownCenter";
import MobileHeader from "../Navbar/MobileHeader";
import SidebarHeader from "../Navbar/SidebarHeader";
import TopHeader from "../Navbar/TopHeader";

// 3D Rotating Coin Component
const RotatingCoin = () => {
  const meshRef = useRef();

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[0.8, 0.8, 0.15, 32]} />
        <meshStandardMaterial
          color="#FFD700"
          metalness={0.9}
          roughness={0.1}
          emissive="#FFA500"
          emissiveIntensity={0.3}
        />
      </mesh>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </Float>
  );
};

const Header = ({
  onMobileSidebarToggle,
  isMobileSidebarOpen,
  onCloseMobileSidebar,
  onDesktopSidebarToggle,
  isDesktopSidebarCollapsed = true,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    isDesktopSidebarCollapsed
  );
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);
  const [walletSettingsOpen, setWalletSettingsOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [walletBalance, setWalletBalance] = useState("0.00");
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);
  const location = useLocation();
  const walletDropdownRef = useRef(null);

  const [hasToken, setHasToken] = useState(!!localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id;
  const userName = user.username;
  console.log("selectedCurrency are:", selectedCurrency);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setHasToken(!!token);
    };

    // Watch for login/logout actions — custom event
    window.addEventListener("tokenChanged", checkToken);

    // Optional: also handle cross-tab changes
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("tokenChanged", checkToken);
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        // Replace with dynamic user ID if available in localStorage later
        const response = await axios.get(
          `/wallet-service/api/wallet/${userId}/balance`
        );

        if (response.data && response.data.totalUsd) {
          setWalletBalance(response.data.totalUsd.toFixed(2));
        } else {
          setWalletBalance("0.00");
        }
      } catch (error) {
        console.error("Failed to fetch wallet balance:", error);
        setWalletBalance("0.00");
      }
    };

    if (hasToken) {
      fetchWalletBalance();
    }
  }, [hasToken]);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const [coinsRes, balanceRes] = await Promise.all([
          axios.get("/wallet-service/api/wallet/coins"),
          axios.get(`/wallet-service/api/wallet/${userId}/balance`),
        ]);

        const coins = coinsRes.data || [];
        const walletBalances = balanceRes.data?.balances || [];

        // 🪙 merge coins and balances
        const colorMap = {
          BTC: "bg-orange-400",
          ETH: "bg-blue-500",
          USDT: "bg-green-500",
          SOL: "bg-purple-500",
          BNB: "bg-yellow-400",
          XRP: "bg-gray-500",
          ADA: "bg-blue-400",
          DOGE: "bg-yellow-500",
          TRX: "bg-red-500",
          LTC: "bg-blue-800",
          DOT: "bg-pink-500",
          MATIC: "bg-indigo-500",
          AVAX: "bg-red-400",
          XLM: "bg-cyan-400",
          BCH: "bg-green-400",
        };

        const merged = coins.map((coin) => {
          const match = walletBalances.find(
            (b) => b.currency.toUpperCase() === coin.symbol.toUpperCase()
          );
          return {
            ...coin,
            color: colorMap[coin.symbol] || "bg-gray-700",
            balance: match ? match.amount.toFixed(5) : "0.00000",
            iconPath: `https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/color/${coin.symbol.toLowerCase()}.svg`,
          };
        });

        setCurrencies(merged);

        // 🪙 Determine preferred or default currency
        const preferred = localStorage.getItem("preferredCurrency");
        let initialCurrency =
          merged.find((c) => c.symbol === preferred) ||
          merged.find((c) => c.symbol === "BTC") ||
          merged[0];

        setSelectedCurrency(initialCurrency);
        localStorage.setItem("preferredCurrency", initialCurrency.symbol);

        // 🧮 Show its balance directly (no USD conversion)
        setWalletBalance(
          `${initialCurrency.balance} ${initialCurrency.symbol}`
        );
      } catch (err) {
        console.error("Error fetching wallet or coins:", err);
        setWalletBalance("0.00000 BTC");
      }
    };

    if (hasToken) fetchWalletData();
    // window.addEventListener("currencyChanged", fetchWalletData);
    // return () => window.removeEventListener("currencyChanged", fetchWalletData);
  }, [hasToken]);

  // 👇 whenever a currency is selected from dropdown
  const handleCurrencySelect = async (currency) => {
    try {
      setSelectedCurrency(currency);
      localStorage.setItem("preferredCurrency", currency.symbol);

      let gameCurrency = localStorage.getItem("gameCurrency") || "USD";
      localStorage.setItem("gameCurrency", gameCurrency);

      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user.id;
      if (!userId) {
        console.error("❌ No user ID found in localStorage");
        setWalletBalance("0.00");
        return;
      }

      setWalletBalance("Updating...");

      const res = await axios.put(
        `/wallet-service/api/games/convert/${userId}`,
        {
          preferredCurrency: currency.symbol,
          gameCurrency: gameCurrency,
        }
      );

      if (res.data?.success && res.data.data) {
        const { balances, betCurrency, preferredCurrency, rate } =
          res.data.data;
        const amount = Number(res.data.data.convertedAmount).toFixed(2);
        console.log("amount are:", amount);

        // ✅ Store in localStorage to persist across reloads
        localStorage.setItem("convertedValue", amount);
        localStorage.setItem("preferredCurrency", preferredCurrency);
        localStorage.setItem("gameCurrency", betCurrency);
        localStorage.setItem("conversionRate", rate);

        setWalletBalance(`${amount} ${betCurrency}`);

        // ✅ Notify GamePage that currency changed
        window.dispatchEvent(new Event("preferredCurrencyUpdated"));
        console.log(
          `💱 Converted ${preferredCurrency} → ${betCurrency} @ rate ${rate}`
        );
      } else {
        console.warn("⚠️ Conversion API failed:", res.data?.message);
        setWalletBalance("0.00");
      }
    } catch (err) {
      console.error("❌ Currency conversion failed:", err.message);
      setWalletBalance("0.00");
    } finally {
      setWalletDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Restore currency & converted value on reload
    const preferred = localStorage.getItem("preferredCurrency");
    const gameCurrency = localStorage.getItem("gameCurrency");
    const convertedValue = localStorage.getItem("convertedValue");

    if (preferred && gameCurrency && convertedValue) {
      const currencyObj = currencies.find(
        (c) => c.symbol.toUpperCase() === preferred.toUpperCase()
      );
      if (currencyObj) setSelectedCurrency(currencyObj);

      setWalletBalance(`${convertedValue} ${gameCurrency}`);
    }
  }, [currencies]);
  // Helper function to get the correct menu icon - SIMPLIFIED VERSION
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

  // Helper function to get menu icon class - SIMPLIFIED VERSION
  const getMenuIconClass = (
    item,
    currentPath,
    isCollapsed,
    isSubmenuActive = false
  ) => {
    const isActive = currentPath === item.path || isSubmenuActive;
    const baseClass = "w-5 h-5 object-contain transition-all duration-300";

    if (isActive) {
      // Active: Show active icon in original colors without any filters
      return `${baseClass} opacity-100 filter-none`;
    } else {
      // Inactive: Regular icon with hover effects
      return `${baseClass} opacity-70 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert`;
    }
  };

  // Helper function to get menu link class - SIMPLIFIED VERSION
  const getMenuLinkClass = (
    item,
    currentPath,
    isCollapsed,
    isSubmenuActive = false
  ) => {
    const isActive = currentPath === item.path || isSubmenuActive;

    if (isActive) {
      // Active state - same styling for both collapsed and expanded
      return "wallet-btn2 view_moon_btn relative flex items-center gap-2 px-3 py-1.5 rounded-[8px] border border-[rgba(255,255,255,0.40)] transition-all shadow-[1px_2px_1px_rgba(0,0,0,0.40)] bg-[linear-gradient(0deg,rgba(240,119,48,0.6)_0%,rgba(240,119,48,0)_100%)] text-white";
    } else {
      // Inactive state - exactly like your sample HTML
      if (isCollapsed) {
        return "justify-center text-[##000] hover: hover:bg-white/5";
      } else {
        return "gap-3 rounded-lg text-[#A8A8A8] hover: hover:bg-white/5"; // Simple like your sample
      }
    }
  };
  // Enhanced menu items with gradient colors

  const menuItems = [
    {
      id: "home",
      label: "Home",
      icon: "/icons/home.svg",
      activeIcon: "/active-menu/home-active.svg", // Single variable for both states
      path: "/",
    },
    {
      id: "favourites",
      label: "Favorites",
      icon: "/icons/favourites.svg",
      activeIcon: "/active-menu/favourites-active.svg", // Single variable for both states
      path: "/casino/favourites",
    },
    {
      id: "recommended",
      label: "Trending",
      icon: "/icons/recommended.svg",
      activeIcon: "/active-menu/recommended-active.svg", // Single variable for both states
      path: "/casino/trending",
    },
  ];

  const gamesItems = [
    {
      id: "casino",
      label: "Casino",
      icon: "/icons/casino.svg",
      activeIcon: "/active-menu/casino-active.svg", // Single variable
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
      activeIcon: "/active-menu/leaderboard-active-collasped.svg", // Single variable
      path: "/leaderboard",
    },
  ];

  const accountItems = [
    {
      path: "/providers",
      label: "Providers",
      icon: "/icons/providers.svg",
      activeIcon: "/active-menu/providers-active.svg", // Single variable
    },
    ...(hasToken
      ? [
          {
            path: "/affiliate",
            label: "Affiliates",
            icon: "/icons/affiliates.svg",
            activeIcon: "/active-menu/affliate-active.svg", // Single variable
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
      activeIcon: "/active-menu/live-support-active.svg", // Single variable
    },
  ];

  // Toggle desktop sidebar collapse
  const toggleDesktopSidebar = () => {
    const newCollapsedState = !sidebarCollapsed;
    setSidebarCollapsed(newCollapsedState);
    setActiveSubmenu(null);

    // Notify parent component (Layout) about sidebar state change
    if (onDesktopSidebarToggle) {
      onDesktopSidebarToggle(newCollapsedState);
    }
  };

  const toggleSidebar = () => {
    if (sidebarCollapsed) {
      setSidebarCollapsed(false);
    }
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setActiveSubmenu(null);
  };

  const toggleSubmenu = (menuId) => {
    if (!sidebarCollapsed) {
      setActiveSubmenu(activeSubmenu === menuId ? null : menuId);
    }
  };

  const closeMobileSidebar = () => {
    if (onCloseMobileSidebar) {
      onCloseMobileSidebar();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("tokenChanged"));
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("kycStatus");
    window.dispatchEvent(new Event("tokenChanged"));
    // setIsLoggedIn(false);
    // setDropdownOpen(false);
    toast.info("You have been logged out successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  };

  // Handle click outside for wallet dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        walletDropdownRef.current &&
        !walletDropdownRef.current.contains(event.target)
      ) {
        setWalletDropdownOpen(false);
      }
    };

    if (walletDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [walletDropdownOpen]);

  // Close sidebar when route changes
  useEffect(() => {
    if (!sidebarCollapsed) {
      closeSidebar();
    }
    closeMobileSidebar();
  }, [location.pathname]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if ((sidebarOpen && !sidebarCollapsed) || isMobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen, sidebarCollapsed, isMobileSidebarOpen]);

  return (
    <>
      {/* DESKTOP TOP HEADER */}
      <TopHeader
        onDesktopSidebarToggle={toggleDesktopSidebar}
        sidebarCollapsed={sidebarCollapsed}
        hasToken={hasToken}
        userName={userName}
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
        walletDropdownOpen={walletDropdownOpen}
        setWalletDropdownOpen={setWalletDropdownOpen}
      />

      {/* DESKTOP SIDEBAR - Collapsible */}
      <SidebarHeader
        sidebarCollapsed={sidebarCollapsed}
        hasToken={hasToken}
        userName={userName}
        handleLogout={handleLogout}
        onCloseSidebar={closeSidebar}
      />

      {/* MOBILE SIDEBAR - Keep existing mobile sidebar code */}
      <MobileHeader
        isMobileSidebarOpen={isMobileSidebarOpen}
        closeMobileSidebar={closeMobileSidebar}
        hasToken={hasToken}
        userName={userName}
        handleLogout={handleLogout}
      />
      {/* Wallet Settings Modal */}
      <WalletSettingsModal
        isOpen={walletSettingsOpen}
        onClose={() => setWalletSettingsOpen(false)}
      />

      {/* Wallet Modal */}
      <WalletModal
        isOpen={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
      />

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
    </>
  );
};

export default Header;
