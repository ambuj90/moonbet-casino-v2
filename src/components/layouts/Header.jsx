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

  // Currencies with neon colors
  // const currencies = [
  //   {
  //     symbol: "BTC",
  //     name: "Bitcoin",
  //     balance: "0.00000",
  //     icon: "₿",
  //     color: "bg-orange-400",
  //   },
  //   {
  //     symbol: "ETH",
  //     name: "Ethereum",
  //     balance: "0.00000",
  //     icon: "Ξ",
  //     color: "bg-blue-500",
  //   },
  //   {
  //     symbol: "LTC",
  //     name: "Litecoin",
  //     balance: "0.00000",
  //     icon: "Ł",
  //     color: "bg-blue-800",
  //   },
  //   {
  //     symbol: "USDT",
  //     name: "Tether",
  //     balance: "0.00000",
  //     icon: "₮",
  //     color: "bg-green-500",
  //   },
  //   {
  //     symbol: "SOL",
  //     name: "Solana",
  //     balance: "0.00000",
  //     icon: "◎",
  //     color: "bg-purple-500",
  //   },
  //   {
  //     symbol: "DOGE",
  //     name: "Dogecoin",
  //     balance: "0.00000",
  //     icon: "Ð",
  //     color: "bg-yellow-500",
  //   },
  //   {
  //     symbol: "BCH",
  //     name: "Bitcoin Cash",
  //     balance: "0.00000",
  //     icon: "฿",
  //     color: "bg-green-400",
  //   },
  //   {
  //     symbol: "XRP",
  //     name: "Ripple",
  //     balance: "0.00000",
  //     icon: "✕",
  //     color: "bg-gray-600",
  //   },
  //   {
  //     symbol: "TRX",
  //     name: "Tron",
  //     balance: "0.00000",
  //     icon: "⟠",
  //     color: "bg-red-500",
  //   },
  // ];
  //   const [currencies, setCurrencies] = useState([]);
  // const [selectedCurrency, setSelectedCurrency] = useState(null);
  // const [searchQuery, setSearchQuery] = useState("");

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
        return "justify-center text-[##000] hover:text-white/90 hover:bg-white/5";
      } else {
        return "gap-3 rounded-lg text-[#A8A8A8] hover:text-white/90 hover:bg-white/5"; // Simple like your sample
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
      {/* DESKTOP HEADER */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 h-16 bg-[rgba(20,20,20,0.80)] shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px]border-b border-white/10 z-50"
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

            {/* Logo with 3D Coin */}
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
          <div className="flex items-center gap-2">
            {/* 🧍 User Avatar / Leaderboard Link */}
            {/* <Link
              to="/leaderboard"
              className="view_btn w-10 h-10 flex items-center justify-center overflow-hidden hover:opacity-80 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
              >
                <path
                  d="M11.9648 15.5293C12.992 15.5293 13.8251 16.3615 13.8252 17.3887V17.4033H14.9229C15.2544 17.4033 15.5224 17.6714 15.5225 18.0029C15.5225 18.3346 15.2545 18.6035 14.9229 18.6035H3.08008C2.7486 18.6033 2.48047 18.3344 2.48047 18.0029C2.48053 17.6715 2.74864 17.4035 3.08008 17.4033H4.17773V17.3887C4.17782 16.3615 5.01091 15.5293 6.03809 15.5293H11.9648ZM13.5 0C14.1659 2.94004e-05 14.7 0.540356 14.7002 1.2002V1.28418H16.2061C17.196 1.28426 18.0059 2.09499 18.0059 3.08496V3.69043C18.0059 5.64638 16.548 7.27294 14.6641 7.54297C14.4119 9.81074 12.8337 11.671 10.7158 12.3369L11.4844 14.3281H6.52148L7.29004 12.3369C5.17821 11.677 3.59399 9.81074 3.3418 7.54297C1.45184 7.27294 0 5.64638 0 3.69043V3.08496C0 2.09499 0.803849 1.28426 1.7998 1.28418H3.2998V1.2002C3.29996 0.540338 3.84007 0 4.5 0H13.5ZM9.5459 3.67871C9.3239 3.22871 8.68196 3.22871 8.45996 3.67871L7.87793 4.85449L6.57617 5.04004C6.08421 5.11203 5.88023 5.7241 6.24609 6.07812L7.18164 6.99609L6.95996 8.28613C6.87596 8.7841 7.39793 9.16261 7.83594 8.92871L9 8.31641L10.1582 8.92871C10.6081 9.16239 11.124 8.78403 11.04 8.28613L10.8242 6.99609L11.7598 6.07812C12.1196 5.7301 11.9218 5.1189 11.4238 5.04688L10.1279 4.85449L9.5459 3.67871ZM1.7998 2.48438C1.46984 2.48445 1.2002 2.75502 1.2002 3.08496V3.69043C1.2002 4.97434 2.09989 6.04229 3.2998 6.31836V2.48438H1.7998ZM14.7002 2.48438V6.31836C15.906 6.04225 16.8057 4.96834 16.8057 3.69043V3.08496C16.8057 2.75501 16.536 2.48445 16.2061 2.48438H14.7002Z"
                  fill="#7D7D7D"
                />
              </svg>
            </Link> */}
            {/* ✅ Show Login & Register only when NOT logged in */}
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
              flex items-center justify-center"
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

            {/* ✅ Profile & Wallet shown only when logged in */}
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

      {/* DESKTOP SIDEBAR - Collapsible */}
      <div className="hidden lg:block">
        {/* Backdrop for mobile/tablet */}
        {sidebarOpen && !sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#080808]/50 backdrop-blur-sm z-40 lg:hidden"
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
          className={`fixed left-0 top-16 bottom-0 bg-[rgba(20,20,20,0.80) shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px]border-r border-white/10 z-[99999] px-2 
`}
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
                                    textShadow:
                                      "0 0 10px rgba(255,255,255,0.25)",
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

      {/* MOBILE SIDEBAR - Keep existing mobile sidebar code */}
      <div className="lg:hidden">
        {/* Mobile Backdrop */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#080808]/50 backdrop-blur-sm z-40"
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
            {/* Mobile Main Menu */}
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
                              ${getMenuLinkClass(
                                item,
                                location.pathname,
                                false
                              )}`}
                          >
                            <div className="flex items-center gap-3 relative z-10">
                              <span className="text-lg flex items-center justify-center">
                                {typeof item.icon === "string" &&
                                item.icon.startsWith("/") ? (
                                  <img
                                    src={getMenuIcon(
                                      item,
                                      location.pathname,
                                      false
                                    )}
                                    alt={item.label}
                                    className={getMenuIconClass(
                                      item,
                                      location.pathname,
                                      false
                                    )}
                                    key={`mobile-${item.id}-${isActive}`}
                                  />
                                ) : (
                                  item.icon
                                )}
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
                                <div className="p-2 space-y-1 bg-[#080808]/40 backdrop-blur-md rounded-xl">
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
                              ${getMenuLinkClass(
                                item,
                                location.pathname,
                                false
                              )}`}
                            onClick={closeMobileSidebar}
                          >
                            <span className="text-lg flex items-center justify-center">
                              {typeof item.icon === "string" &&
                              item.icon.startsWith("/") ? (
                                <img
                                  src={getMenuIcon(
                                    item,
                                    location.pathname,
                                    false
                                  )}
                                  alt={item.label}
                                  className={getMenuIconClass(
                                    item,
                                    location.pathname,
                                    false
                                  )}
                                  key={`mobile-${item.id}-${isActive}`}
                                />
                              ) : (
                                <span
                                  className={
                                    isActive
                                      ? "brightness-0 invert"
                                      : "group-hover:brightness-0 group-hover:invert"
                                  }
                                >
                                  {item.icon}
                                </span>
                              )}
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

                            {/* Active indicator bar */}
                            {isActive && (
                              <motion.div
                                layoutId="activeIndicatorMobile"
                                className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6  rounded-r"
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
                            onClick={() => {
                              setActiveSubmenu(
                                activeSubmenu === item.id ? null : item.id
                              );
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[8px] bg-white/10 shadow-[2px_2px_4px_0_rgba(0,0,0,0.25)] backdrop-blur-[2px] transition-all duration-300 hover:bg-white/10 relative overflow-hidden group
                              ${
                                isActive
                                  ? "bg-gradient-to-b from-white/30 via-white/5 to-white/30 shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px] text-white"
                                  : "text-[rgb(168,168,168)] hover:text-white"
                              }`}
                          >
                            <div className="flex items-center gap-3 relative z-10">
                              <span className="text-lg flex items-center justify-center">
                                {typeof item.icon === "string" &&
                                item.icon.startsWith("/") ? (
                                  <img
                                    src={getMenuIcon(
                                      item,
                                      location.pathname,
                                      false,
                                      isSubmenuActive
                                    )}
                                    alt={item.label}
                                    className={getMenuIconClass(
                                      item,
                                      location.pathname,
                                      false,
                                      isSubmenuActive
                                    )}
                                    key={`mobile-games-${item.id}-${isActive}`} // Force re-render
                                  />
                                ) : (
                                  <span
                                    className={
                                      isActive
                                        ? "brightness-0 invert"
                                        : "group-hover:brightness-0 group-hover:invert"
                                    }
                                  >
                                    {item.icon}
                                  </span>
                                )}
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
                              {typeof item.icon === "string" &&
                              item.icon.startsWith("/") ? (
                                <img
                                  src={getMenuIcon(
                                    item,
                                    location.pathname,
                                    false
                                  )}
                                  alt={item.label}
                                  className={getMenuIconClass(
                                    item,
                                    location.pathname,
                                    false
                                  )}
                                  key={`mobile-games-${item.id}-${isActive}`} // Force re-render
                                />
                              ) : (
                                <span
                                  className={
                                    isActive
                                      ? "brightness-0 invert"
                                      : "group-hover:brightness-0 group-hover:invert"
                                  }
                                >
                                  {item.icon}
                                </span>
                              )}
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

                            {/* Active indicator bar */}
                            {isActive && (
                              <motion.div
                                layoutId="activeIndicatorMobile"
                                className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6  rounded-r"
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
                          ${getMenuLinkClass(item, location.pathname, false)}`}
                        onClick={closeMobileSidebar}
                      >
                        <span className="text-lg flex items-center justify-center">
                          {typeof item.icon === "string" &&
                          item.icon.startsWith("/") ? (
                            <img
                              src={getMenuIcon(item, location.pathname, false)}
                              alt={item.label}
                              className={getMenuIconClass(
                                item,
                                location.pathname,
                                false
                              )}
                              key={`mobile-account-${item.path}-${isActive}`}
                            />
                          ) : (
                            <span
                              className={
                                isActive
                                  ? "brightness-0 invert"
                                  : "group-hover:brightness-0 group-hover:invert"
                              }
                            >
                              {item.icon}
                            </span>
                          )}
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

                        {/* Active indicator bar */}
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicatorMobile"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6  rounded-r"
                          />
                        )}
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
      </div>

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
