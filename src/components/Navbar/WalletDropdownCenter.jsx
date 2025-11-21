// components/Navbar/WalletDropdownCenter.jsx
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const WalletDropdownCenter = ({
  hasToken,
  userId,
  walletBalance,
  setWalletBalance,
  currencies,
  setCurrencies,
  selectedCurrency,
  setSelectedCurrency,
  setWalletModalOpen,
  setWalletSettingsOpen,
  handleCurrencySelect
}) => {
  const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const walletDropdownRef = useRef(null);

  // ⭐ Replace icons based on EXACT CDN URLs
  const imageFix = (url) => {
    if (!url) return url;

    if (url.includes("dogecoin.svg")) return "/wallet-icons/doge-coin.svg";

    if (url.includes("usdttrc20.svg")) return "/wallet-icons/tether.svg";

    if (url.includes("bnbmainnet.svg")) return "/wallet-icons/bnb.svg";

    if (url.includes("maticmainnet.svg")) return "/wallet-icons/polygon.svg";

    return url; // default (keep API icon)
  };

  // Apply auto replacement to all currencies
  const finalCurrencies = currencies.map((c) => ({
    ...c,
    iconPath: imageFix(c.iconPath),
  }));

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

  if (!hasToken) return null;

  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
      {/* Balance Display with Dropdown */}
      <div
        className="relative flex justify-center sm:justify-start"
        ref={walletDropdownRef}
      >
        {/* Wallet Button */}
        <button
          onClick={() => setWalletDropdownOpen(!walletDropdownOpen)}
          className="wallet-btn relative flex items-center gap-2 px-3 sm:px-4 py-2 -mt-2 sm:py-2.5 rounded-[8px] border-[rgba(255,255,255,0.4)] text-white transition-all duration-300 max-w-[150px] sm:max-w-none"
        >
          {/* Coin logo */}
          <img
            src={
              selectedCurrency
                ? selectedCurrency.iconPath
                : "/icons/default-coin.svg"
            }
            alt={selectedCurrency?.name || "Currency"}
            className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
          />

          {/* Balance text */}
          <span className="text-white text-xs sm:text-sm font-semibold tracking-wide truncate">
            {selectedCurrency
              ? `${selectedCurrency.icon || ""} ${walletBalance}`
              : walletBalance}
          </span>

          {/* Dropdown arrow */}
          <svg
            className={`w-3 sm:w-4 h-3 sm:h-4 text-white/70 transition-transform duration-200 ${
              walletDropdownOpen ? "rotate-180" : ""
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

        {/* Wallet Dropdown */}
        {walletDropdownOpen && (
          <div
            className="custom-header wallet-dropdown-card absolute left-[80%] sm:left-1/2 md:left-[65%] 
    -translate-x-1/2 mt-10 w-[267px] rounded-[24px] z-[99999] 
    shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden "
            style={{
              padding: "0 12px",
              background:
                "linear-gradient(rgb(80, 84, 91) 0%, rgb(60, 64, 70) 100%)",
              backdropFilter: "blur(67.5px)",
              WebkitBackdropFilter: "blur(67.5px)",
              boxShadow: "rgba(0, 0, 0, 0.25) 0px 4px 10px",
            }}
          >
            {/* Search Box */}
            <div className="search-box mt-3 h-[42px] rounded-xl bg-white/10 border border-white/5 flex items-center px-3">
              <svg
                className="w-4 h-4 text-gray-400 opacity-60 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search Currency"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-white text-sm placeholder-gray-400"
              />
            </div>

            {/* Currency List */}
            <div className="wallet-list flex-1 mt-2.5 max-h-[280px] overflow-y-auto pr-1.5 pb-2">
              {finalCurrencies
                .filter(
                  (currency) =>
                    currency.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    currency.symbol
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                )
                .map((currency) => (
                  <div
                    key={currency.symbol}
                    onClick={() => {
                      handleCurrencySelect(currency);
                      setWalletDropdownOpen(false);
                    }}
                    className={`wallet-item group flex items-center pr-3 my-2.5 rounded-full relative cursor-pointer transition-all duration-250 ${
                      selectedCurrency?.symbol === currency.symbol
                        ? "selected-currency"
                        : ""
                    }`}
                  >
                    {/* Hover Background Effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/45 to-white/15 opacity-0 scale-[0.98] group-hover:opacity-100 group-hover:scale-100 transition-all duration-250 pointer-events-none" />

                    {/* Icon Wrapper */}
                    <div
                      className={`icon-wrap w-9 h-9 rounded-full flex items-center justify-center transition-all duration-250 relative z-10 group-hover:bg-white/55 ${
                        selectedCurrency?.symbol === currency.symbol
                          ? "bg-white/30"
                          : ""
                      }`}
                    >
                      <img
                        src={currency.iconPath}
                        alt={currency.name}
                        className="w-[26px] h-[26px] object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/icons/default-coin.svg";
                        }}
                      />
                    </div>

                    {/* Currency Info */}
                    <div className="coin-info flex-1 flex flex-col ml-2.5 z-10">
                      <span className="coin-name text-white text-sm font-medium">
                        {currency.name}
                      </span>
                      <span className="coin-symbol text-[#bfbfbf] text-xs -mt-px">
                        {currency.symbol}
                      </span>
                    </div>

                    {/* Balance */}
                    <span className="coin-amount text-white text-[13px] z-10">
                      {currency.balance}
                    </span>
                  </div>
                ))}
            </div>

            {/* Bottom Settings Bar */}
            <div
              onClick={() => {
                setWalletDropdownOpen(false);
                setWalletSettingsOpen(true);
              }}
              className="wallet-settings h-[52px] bg-white/10 border-t border-white/10 rounded-t-2xl flex items-center justify-center gap-1.5 mb-1.5 cursor-pointer transition-all duration-200 hover:bg-white/[0.18] -mx-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 14 13"
                fill="none"
                className="opacity-80"
              >
                <path
                  d="M11.2502 0C11.6646 8.01163e-05 12.0001 0.349384 12.0001 0.779852C12.0001 1.21036 11.6647 1.55962 11.2502 1.5597H1.9999C1.72445 1.55975 1.49979 1.79287 1.49975 2.07985C1.49975 2.36686 1.72443 2.59996 1.9999 2.6H12.75C13.439 2.6 14 3.18293 14 3.9V5.2H11.4999C10.1215 5.20008 8.9999 6.36642 8.9999 7.8C8.99996 9.23353 10.1215 10.3999 11.4999 10.4H14V11.7C13.9999 12.417 13.4389 13 12.75 13H1.9999C0.897011 13 0.000151205 12.0671 0 10.9201C0 10.9201 0 2.08765 0 2.07985C3.95682e-05 0.932801 0.896942 4.11503e-05 1.9999 0H11.2502Z"
                  fill="#E1E1E1"
                />
                <path
                  d="M14 9.3597H11.4999C10.6715 9.35963 10.0003 8.66153 10.0002 7.8C10.0002 6.93842 10.6715 6.23963 11.4999 6.23956H14V9.3597Z"
                  fill="#E1E1E1"
                />
              </svg>
              <span className="text-[#E1E1E1] text-sm">Wallet Settings</span>
            </div>
          </div>
        )}
      </div>

      {/* Coins/Chips Display - Wallet Button */}
      <button
        onClick={() => setWalletModalOpen(true)}
        className="wallet-btn2 relative flex items-center gap-2 px-3 py-1.5 -mt-2 rounded-[8px] border-[rgba(255,255,255,0.40)] transition-all hover:scale-[1.02] backdrop-blur-[1.5px] shadow-[1px_2px_1px_rgba(0,0,0,0.40)]"
        style={{
          background:
            "linear-gradient(0deg, rgba(240, 119, 48, 0.60) 0%, rgba(240, 119, 48, 0.00) 100%)",
        }}
      >
        <span className="text-xl">
          <img
            src="/icons/wallet.svg"
            alt="Wallet Icon"
            className="w-6 h-6 object-contain"
          />
        </span>
      </button>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .wallet-list::-webkit-scrollbar {
          width: 6px;
        }
        .wallet-list::-webkit-scrollbar-track {
          background: transparent;
        }
        .wallet-list::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.27);
          border-radius: 10px;
        }
        .wallet-list::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.35);
        }

        /* Selected currency styling */
        .selected-currency {
          background: rgba(255, 255, 255, 0.3);
          // border: 1px solid rgba(255, 255, 255, 0.5);
        }

        /* Smooth transitions */
        .wallet-item * {
          transition: all 0.25s ease;
        }

        /* Prevent text selection on hover */
        .wallet-item:hover {
          user-select: none;
        }

        /* Additional glow effect on hover */
        .wallet-item:hover .coin-name {
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
        }
        /* Make active item look like hover */
        .selected-currency::before {
          opacity: 1 !important;
          transform: scale(1) !important;
        }

        .selected-currency .icon-wrap {
          background: rgba(255, 255, 255, 0.55) !important;
          border: 1px solid rgba(255, 255, 255, 0.9) !important;
        }

        .selected-currency .coin-name,
        .selected-currency .coin-symbol,
        .selected-currency .coin-amount {
          color: #fff !important;
        }

        .selected-currency .coin-name {
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.3) !important;
        }
      `}</style>
    </div>
  );
};

export default WalletDropdownCenter;
