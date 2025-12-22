import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "qrcode";
import { toast } from "react-toastify";
import axios from "axios";
import { useWalletSocket } from "../context/WalletSocketContext";
import WithdrawProcessingPopup from "./settings/WithdrawProcessingPopup";
import WithdrawSuccessPopup from "./settings/WithdrawSuccessPopup";

const WalletModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("deposit");
  const [walletBalance, setWalletBalance] = useState(null);

  // Deposit
  const [depositCoinList, setDepositCoinList] = useState([]);
  const [selectedDepositCoin, setSelectedDepositCoin] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [depositAddress, setDepositAddress] = useState("");
  const [qrCodeData, setQrCodeData] = useState("");
  const [copied, setCopied] = useState(false);
  const [showDepositDropdown, setShowDepositDropdown] = useState(false);
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);

  // Withdraw
  const [withdrawCoinList, setWithdrawCoinList] = useState([]);
  const [selectedWithdrawCoin, setSelectedWithdrawCoin] = useState(null);
  const [selectedWithdrawNetwork, setSelectedWithdrawNetwork] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [withdrawAmountUSD, setWithdrawAmountUSD] = useState("");
  const [withdrawAmountCrypto, setWithdrawAmountCrypto] = useState("");
  const [addressValid, setAddressValid] = useState(null);
  const [isValidatingAddress, setIsValidatingAddress] = useState(false);
  const [showWithdrawDropdown, setShowWithdrawDropdown] = useState(false);
  const [showWithdrawNetworkDropdown, setShowWithdrawNetworkDropdown] =
    useState(false);

  const [showProcessingPopup, setShowProcessingPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const socket = useWalletSocket();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id;
  const token = localStorage.getItem("token");

  const depositCurrencyRef = useRef(null);
  const networkRef = useRef(null);
  const withdrawCurrencyRef = useRef(null);
  const withdrawNetworkRef = useRef(null);
  const modalRef = useRef(null);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Don't close if processing popup or success popup is open
      if (showProcessingPopup || showSuccessPopup) return;

      // Close modal if click is outside the modal content
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      // Add a small delay to prevent immediate closing when opening
      const timer = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timer);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, onClose, showProcessingPopup, showSuccessPopup]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleDropdownClickOutside = (e) => {
      if (
        depositCurrencyRef.current &&
        !depositCurrencyRef.current.contains(e.target)
      ) {
        setShowDepositDropdown(false);
      }
      if (networkRef.current && !networkRef.current.contains(e.target)) {
        setShowNetworkDropdown(false);
      }
      if (
        withdrawCurrencyRef.current &&
        !withdrawCurrencyRef.current.contains(e.target)
      ) {
        setShowWithdrawDropdown(false);
      }
      if (
        withdrawNetworkRef.current &&
        !withdrawNetworkRef.current.contains(e.target)
      ) {
        setShowWithdrawNetworkDropdown(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleDropdownClickOutside);
    }
    return () =>
      document.removeEventListener("mousedown", handleDropdownClickOutside);
  }, [isOpen]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (
        e.key === "Escape" &&
        isOpen &&
        !showProcessingPopup &&
        !showSuccessPopup
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isOpen, onClose, showProcessingPopup, showSuccessPopup]);

  // Socket rooms
  useEffect(() => {
    if (!isOpen || !socket || !userId) return;
    socket.emit("joinDepositRoom", userId);
    socket.emit("joinWithdrawRoom", userId);
  }, [isOpen, socket, userId]);

  // Deposit status listener
  useEffect(() => {
    if (!socket) return;
    const handler = (msg) => {
      if (msg.status === "credited") {
        toast.success("Deposit credited");
        refreshBalance();
      }
      if (msg.status === "finished")
        toast.success("Blockchain confirmations completed");
      if (msg.status === "confirming") toast.info("Confirming on blockchain");
      if (msg.status === "sending") toast.info("Processing via provider");
      if (msg.status === "waiting")
        toast.info("Payment detected, waiting confirmations");
    };
    socket.on("deposit_status", handler);
    return () => socket.off("deposit_status", handler);
  }, [socket]);

  // Withdraw status listener
  useEffect(() => {
    if (!socket) return;
    const handleWithdrawStatus = (msg) => {
      if (msg.status === "confirming") toast.info("Withdrawal confirming");
      if (msg.status === "sending") toast.info("Broadcasting transaction");
      if (msg.status === "finished") toast.success("Withdrawal finalized");
      if (msg.status === "completed") {
        toast.success("Withdrawal completed");
        setShowProcessingPopup(false);
        refreshBalance();
        setShowSuccessPopup(true);
      }
    };
    socket.on("withdraw_status", handleWithdrawStatus);
    return () => socket.off("withdraw_status", handleWithdrawStatus);
  }, [socket]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Fetch wallet balance
  useEffect(() => {
    if (!isOpen || !userId || !token) return;
    axios
      .get(`/wallet-service/api/wallet/${userId}/balance`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => setWalletBalance(data))
      .catch((err) => console.error("Error fetching wallet balance:", err));
  }, [isOpen, userId, token]);

  const refreshBalance = async () => {
    if (!userId || !token) return;
    try {
      const { data } = await axios.get(
        `/wallet-service/api/wallet/${userId}/balance`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setWalletBalance(data);
    } catch (err) {
      console.error("Error refreshing wallet balance:", err);
    }
  };

  // Load coins for deposit and withdraw
  useEffect(() => {
    if (!isOpen) return;
    axios
      .get(`/wallet-service/api/wallet/coins`)
      .then(({ data }) => {
        if (Array.isArray(data)) {
          setDepositCoinList(data);
          setWithdrawCoinList(data);
          const defaultCoin = data[0] || null;
          setSelectedDepositCoin(defaultCoin);
          setSelectedWithdrawCoin(defaultCoin);
          setSelectedNetwork(defaultCoin?.network || "");
          setSelectedWithdrawNetwork(defaultCoin?.network || "");
        }
      })
      .catch((err) => console.error("Error fetching coins:", err));
  }, [isOpen]);

  // Fetch deposit address for selected coin
  useEffect(() => {
    if (!selectedDepositCoin?.symbol || !userId) return;
    const currency = selectedDepositCoin.symbol.toUpperCase();
    axios
      .get(
        `/wallet-service/api/wallet/${userId}/deposit-address?currency=${currency}`
      )
      .then(async ({ data }) => {
        const address = data.payAddress || "";
        setDepositAddress(address);
        if (address) {
          const qr = await QRCode.toDataURL(address, {
            width: 256,
            margin: 2,
            color: { dark: "#000000", light: "#FFFFFF" },
          });
          setQrCodeData(qr);
        } else {
          setQrCodeData("");
        }
      })
      .catch((err) => console.error("Error fetching deposit address:", err));
  }, [selectedDepositCoin, userId]);

  // Address validation API
  const validateAddressAPI = async (address, currency) => {
    try {
      const { data } = await axios.post(
        "/wallet-service/api/wallet/validate-address",
        { address, currency }
      );
      return data.valid === true;
    } catch (err) {
      console.error("Address validation failed:", err);
      return false;
    }
  };

  // Debounced withdraw address validation
  useEffect(() => {
    if (!withdrawAddress || !selectedWithdrawCoin) {
      setAddressValid(null);
      return;
    }
    const delay = setTimeout(async () => {
      setIsValidatingAddress(true);
      const isValid = await validateAddressAPI(
        withdrawAddress,
        selectedWithdrawCoin.symbol.toUpperCase()
      );
      setAddressValid(isValid);
      setIsValidatingAddress(false);
    }, 600);
    return () => clearTimeout(delay);
  }, [withdrawAddress, selectedWithdrawCoin]);

  const copyToClipboard = () => {
    if (!depositAddress) return;
    navigator.clipboard.writeText(depositAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWithdrawClick = () => {
    setShowProcessingPopup(true);
    setShowSuccessPopup(false);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.25, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const selectedBalanceObj = walletBalance?.balances?.find(
    (b) =>
      b.currency?.toUpperCase() === selectedWithdrawCoin?.symbol?.toUpperCase()
  );

  const noCurrencyFound = !selectedBalanceObj && selectedWithdrawCoin != null;

  let isWithdrawDisabled =
    noCurrencyFound ||
    !withdrawAmountUSD ||
    Number(withdrawAmountUSD) <= 0 ||
    !withdrawAddress.trim() ||
    addressValid !== true;

  const networksForSelected =
    selectedDepositCoin &&
    depositCoinList.filter((c) => c.symbol === selectedDepositCoin.symbol);
  const uniqueNetworks = Array.from(
    new Set((networksForSelected || []).map((c) => c.network).filter(Boolean))
  );

  const withdrawNetworksForSelected =
    selectedWithdrawCoin &&
    withdrawCoinList.filter((c) => c.symbol === selectedWithdrawCoin.symbol);
  const uniqueWithdrawNetworks = Array.from(
    new Set(
      (withdrawNetworksForSelected || []).map((c) => c.network).filter(Boolean)
    )
  );

  const walletTotalUsd = walletBalance?.totalUsd
    ? walletBalance.totalUsd.toFixed(2)
    : "0.00000000";

  const getNetworkLabel = () =>
    selectedNetwork || selectedDepositCoin?.network || "Select";
  const getWithdrawNetworkLabel = () =>
    selectedWithdrawNetwork || selectedWithdrawCoin?.network || "Select";

  const getCoinBalance = (symbol) => {
    const balance = walletBalance?.balances?.find(
      (b) => b.currency?.toUpperCase() === symbol?.toUpperCase()
    );
    return balance ? Number(balance.amount).toFixed(2) : "0.00";
  };

  // Step indicator component
  const StepIndicator = ({ step, isLast = false }) => (
    <div className="flex flex-col items-center">
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold text-white/70"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {step}
      </div>
      {!isLast && (
        <div
          className="w-px h-12"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)",
          }}
        />
      )}
    </div>
  );

  // Crypto icon component
  const CryptoIcon = ({ symbol, size = "w-8 h-8" }) => {
    const gradients = {
      BTC: "linear-gradient(135deg, #F7931A 0%, #FFAB40 100%)",
      BCH: "linear-gradient(135deg, #8DC351 0%, #4CC24E 100%)",
      ETH: "linear-gradient(135deg, #627EEA 0%, #8B9FEF 100%)",
      USDT: "linear-gradient(135deg, #26A17B 0%, #50D9A3 100%)",
      SOL: "linear-gradient(135deg, #9945FF 0%, #14F195 50%, #00C2FF 100%)",
      BNB: "linear-gradient(135deg, #F3BA2F 0%, #F0B90B 100%)",
      BNBMAINNET: "linear-gradient(135deg, #F3BA2F 0%, #F0B90B 100%)",
      ADA: "linear-gradient(135deg, #0033AD 0%, #0052FF 100%)",
    };
    const symbols = {
      BTC: "₿",
      BCH: "₿",
      ETH: "Ξ",
      USDT: "₮",
      SOL: "◎",
      BNB: "B",
      BNBMAINNET: "B",
      ADA: "₳",
    };

    return (
      <div
        className={`${size} rounded-full flex items-center justify-center`}
        style={{
          background:
            gradients[symbol] ||
            "linear-gradient(135deg, #F07730 0%, #D4A574 100%)",
        }}
      >
        <span className="text-white text-xs font-bold">
          {symbols[symbol] || symbol?.charAt(0) || "?"}
        </span>
      </div>
    );
  };

  // Multi crypto icons for placeholder
  const MultiCryptoIcons = () => (
    <div className="flex items-center -space-x-1">
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center z-30"
        style={{
          background: "linear-gradient(135deg, #F7931A 0%, #FFAB40 100%)",
        }}
      >
        <span className="text-white text-[8px] font-bold">₿</span>
      </div>
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center z-20"
        style={{
          background: "linear-gradient(135deg, #627EEA 0%, #8B9FEF 100%)",
        }}
      >
        <span className="text-white text-[8px] font-bold">Ξ</span>
      </div>
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center z-10"
        style={{
          background: "linear-gradient(135deg, #26A17B 0%, #50D9A3 100%)",
        }}
      >
        <span className="text-white text-[8px] font-bold">₮</span>
      </div>
    </div>
  );

  // Currency Dropdown Component - renders inside relative container
  const CurrencyDropdown = ({ isOpen, items, onSelect, selectedItem }) => (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            background: "rgba(200, 200, 225, 0.20)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 top-full mt-5 z-[300] rounded-xl overflow-hidden"
            style={{
              background: "rgba(200, 200, 225, 0.20)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
              maxHeight: "260px",
            }}
          >
            <div className="py-1.5 overflow-y-auto max-h-[260px] pr-1">
              {items.map((coin) => {
                const isSelected =
                  selectedItem?.symbol === coin.symbol &&
                  selectedItem?.network === coin.network;
                return (
                  <button
                    key={coin.symbol + coin.network}
                    onClick={() => onSelect(coin)}
                    className={`wallet-item group flex items-center w-full pr-3 my-1 rounded-full relative cursor-pointer transition-all duration-250 ${
                      isSelected
                        ? "bg-gradient-to-r from-white/35 to-[rgba(90,55,153,0.10)]"
                        : ""
                    }`}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/35 to-[rgba(90,55,153,0.10)] opacity-0 scale-[0.98] group-hover:opacity-100 group-hover:scale-100 transition-all duration-250 pointer-events-none" />
                    <div className="flex items-center gap-3 flex-1 relative z-10">
                      <CryptoIcon symbol={coin.symbol} size="w-10 h-10" />
                      <div className="flex flex-col items-start">
                        <span className="text-sm text-white font-medium">
                          {coin.symbol}
                        </span>
                        <span className="text-[10px]">
                          {coin.network || coin.symbol}
                        </span>
                      </div>
                    </div>
                    <span className="text-white/80 text-sm font-medium relative z-10">
                      {getCoinBalance(coin.symbol)}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  // Network Dropdown Component
  const NetworkDropdown = ({ isOpen, items, onSelect, selectedNet }) => (
    <AnimatePresence>
      {isOpen && items.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          className="absolute left-0 right-0 top-full mt-2 z-[300] rounded-xl overflow-hidden"
          style={{
            background: "rgba(13,14,54,0.95)",
            backdropFilter: "blur(22px)",
            WebkitBackdropFilter: "blur(22px)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
            maxHeight: "200px",
          }}
        >
          <div className="py-1.5 max-h-[200px] overflow-y-auto pr-1">
            {items.map((net) => {
              const isSelected = selectedNet === net;
              return (
                <button
                  key={net}
                  onClick={() => onSelect(net)}
                  className={`wallet-item group flex items-center w-full px-3 py-2.5 my-1 rounded-full relative cursor-pointer transition-all duration-250 ${
                    isSelected
                      ? "bg-gradient-to-r from-white/35 to-[rgba(90,55,153,0.10)]"
                      : ""
                  }`}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/35 to-[rgba(90,55,153,0.10)] opacity-0 scale-[0.98] group-hover:opacity-100 group-hover:scale-100 transition-all duration-250 pointer-events-none" />
                  <span className="relative z-10 text-white text-sm font-medium">
                    {net}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderDepositContent = () => (
    <div className="flex gap-4">
      {/* Step indicators */}
      <div className="flex flex-col items-center pt-1">
        <StepIndicator step={1} />
        <StepIndicator step={2} />
        <StepIndicator step={3} />
      </div>

      {/* Form content */}
      <div className="flex-1 space-y-4">
        {/* Step 1: Select Currency */}
        <div ref={depositCurrencyRef} className="relative z-[50]">
          <label className="block text-[11px] text-gray-400 mb-1.5 font-medium">
            Select Currency
          </label>
          <button
            onClick={() => {
              setShowDepositDropdown((prev) => !prev);
              setShowNetworkDropdown(false);
            }}
            className="w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all hover:border-white/15"
            style={{ border: "1px solid rgba(255, 255, 255, 0.08)" }}
          >
            <div className="flex items-center gap-2.5">
              {selectedDepositCoin ? (
                <CryptoIcon
                  symbol={selectedDepositCoin.symbol}
                  size="w-6 h-6"
                />
              ) : (
                <MultiCryptoIcons />
              )}
              <span className="text-white/90 text-sm">
                {selectedDepositCoin
                  ? `${selectedDepositCoin.symbol} ${
                      selectedDepositCoin.name || ""
                    }`
                  : "Select Crypto"}
              </span>
            </div>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${
                showDepositDropdown ? "rotate-180" : ""
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
          <CurrencyDropdown
            isOpen={showDepositDropdown}
            items={depositCoinList}
            onSelect={(coin) => {
              setSelectedDepositCoin(coin);
              setSelectedNetwork(coin.network || "");
              setShowDepositDropdown(false);
            }}
            selectedItem={selectedDepositCoin}
          />
        </div>

        {/* Step 2: Select Network */}
        <div ref={networkRef} className="relative z-[40]">
          <label className="block text-[11px] text-gray-400 mb-1.5 font-medium">
            Select Network
          </label>
          <button
            onClick={() => {
              setShowNetworkDropdown((prev) => !prev);
              setShowDepositDropdown(false);
            }}
            className="w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all hover:border-white/15"
            style={{ border: "1px solid rgba(255, 255, 255, 0.08)" }}
          >
            <span className="text-white/90 text-sm">{getNetworkLabel()}</span>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${
                showNetworkDropdown ? "rotate-180" : ""
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
          <NetworkDropdown
            isOpen={showNetworkDropdown}
            items={uniqueNetworks}
            onSelect={(net) => {
              setSelectedNetwork(net);
              setShowNetworkDropdown(false);
              const match = depositCoinList.find(
                (c) =>
                  c.symbol === selectedDepositCoin.symbol && c.network === net
              );
              if (match) setSelectedDepositCoin(match);
            }}
            selectedNet={selectedNetwork}
          />
        </div>

        {/* Step 3: Deposit Address */}
        <div className="relative z-[30]">
          <label className="block text-[11px] text-gray-400 mb-1.5 font-medium">
            Deposit Address
          </label>
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-2.5"
            style={{ border: "1px solid rgba(255, 255, 255, 0.08)" }}
          >
            <span className="text-white/80 text-sm font-mono flex-1 truncate">
              {depositAddress || "Address"}
            </span>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={copyToClipboard}
              className={`p-1 rounded transition-all ${
                copied ? "text-green-400" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {copied ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              )}
            </motion.button>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="flex gap-2 items-start mt-4">
          <div className="bg-white rounded-lg p-2 w-24 h-24 flex items-center justify-center flex-shrink-0">
            {qrCodeData ? (
              <img
                src={qrCodeData}
                alt="Deposit QR"
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                  />
                </svg>
              </div>
            )}
          </div>
          <div
            className="flex-1 py-7 px-1 align-center"
            style={{ borderRadius: "8px", background: "rgba(255, 0, 0, 0.10)" }}
          >
            <p className="text-[#FF4F4F] text-xs leading-relaxed text-center">
              Send Only {selectedDepositCoin?.symbol || "BTC"} on the{" "}
              {getNetworkLabel()} Network.
            </p>
            <p className="text-[#fff]/50 text-xs mt-1 text-center leading-relaxed">
              $10.00 minimum deposit, 1 confirmation required.
            </p>
          </div>
        </div>

        {/* OR Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-gray-500 text-[10px] uppercase tracking-wider">
            OR
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Deposit from Wallet Button */}
        <motion.button
          whileHover={{
            scale: 1.01,
            boxShadow: "0 6px 25px rgba(240, 119, 48, 0.4)",
          }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-3"
          style={{
            background: "linear-gradient(180deg, #FFB8A1 0%, #A62A00 100%)",
            boxShadow: "0 4px 15px rgba(240, 119, 48, 0.3)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none"
          >
            <g filter="url(#filter0_d_10318_2060)">
              <path
                d="M15.8574 3C16.331 3.00009 16.7144 3.37626 16.7144 3.83984C16.7144 4.30346 16.331 4.67959 15.8574 4.67968H5.2856C4.9708 4.67973 4.71404 4.93079 4.714 5.23984C4.714 5.54893 4.97078 5.79996 5.2856 5.8H17.5714C18.3588 5.8 19 6.42777 19 7.2V8.6H16.1428C14.5674 8.60009 13.2856 9.85614 13.2856 11.4C13.2857 12.9438 14.5675 14.1999 16.1428 14.2H19V15.6C18.9999 16.3722 18.3588 17 17.5714 17H5.2856C4.02516 17 3.00017 15.9953 3 14.7602C3 14.7602 3 5.24824 3 5.23984C3.00005 4.00455 4.02508 3.00004 5.2856 3H15.8574Z"
                fill="white"
              />
              <path
                d="M19 13.0797H16.1428C15.196 13.0796 14.4289 12.3278 14.4288 11.4C14.4288 10.4721 15.196 9.71961 16.1428 9.71952H19V13.0797Z"
                fill="white"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_10318_2060"
                x="0"
                y="0"
                width="22"
                height="20"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="1.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_10318_2060"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_10318_2060"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
          <span>Deposit Directly From Your Wallet</span>
        </motion.button>
      </div>
    </div>
  );

  const renderWithdrawContent = () => (
    <div className="flex gap-4">
      {/* Step indicators */}
      <div className="flex flex-col items-center pt-1">
        <StepIndicator step={1} />
        <StepIndicator step={2} />
        <StepIndicator step={3} isLast={true} />
      </div>

      {/* Form content */}
      <div className="flex-1 space-y-4">
        {/* Step 1: Select Currency */}
        <div ref={withdrawCurrencyRef} className="relative z-[50]">
          <label className="block text-[11px] text-gray-400 mb-1.5 font-medium">
            Select Currency
          </label>
          <button
            onClick={() => {
              setShowWithdrawDropdown((prev) => !prev);
              setShowWithdrawNetworkDropdown(false);
            }}
            className="w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all hover:border-white/15"
            style={{ border: "1px solid rgba(255, 255, 255, 0.08)" }}
          >
            <div className="flex items-center gap-2.5">
              {selectedWithdrawCoin ? (
                <CryptoIcon
                  symbol={selectedWithdrawCoin.symbol}
                  size="w-6 h-6"
                />
              ) : (
                <MultiCryptoIcons />
              )}
              <span className="text-white/90 text-sm">
                {selectedWithdrawCoin
                  ? `${selectedWithdrawCoin.symbol} ${
                      selectedWithdrawCoin.name || ""
                    }`
                  : "Select Crypto"}
              </span>
            </div>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${
                showWithdrawDropdown ? "rotate-180" : ""
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
          <CurrencyDropdown
            isOpen={showWithdrawDropdown}
            items={withdrawCoinList}
            onSelect={(coin) => {
              setSelectedWithdrawCoin(coin);
              setSelectedWithdrawNetwork(coin.network || "");
              setShowWithdrawDropdown(false);
              setWithdrawAmountUSD("");
              setWithdrawAmountCrypto("");
              setWithdrawAddress("");
              setAddressValid(null);
            }}
            selectedItem={selectedWithdrawCoin}
          />
        </div>

        {/* Step 2: Select Network */}
        <div ref={withdrawNetworkRef} className="relative z-[40]">
          <label className="block text-[11px] text-gray-400 mb-1.5 font-medium">
            Select Network
          </label>
          <button
            onClick={() => {
              setShowWithdrawNetworkDropdown((prev) => !prev);
              setShowWithdrawDropdown(false);
            }}
            className="w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all hover:border-white/15"
            style={{ border: "1px solid rgba(255, 255, 255, 0.08)" }}
          >
            <span className="text-white/90 text-sm">
              {getWithdrawNetworkLabel()}
            </span>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${
                showWithdrawNetworkDropdown ? "rotate-180" : ""
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
          <NetworkDropdown
            isOpen={showWithdrawNetworkDropdown}
            items={uniqueWithdrawNetworks}
            onSelect={(net) => {
              setSelectedWithdrawNetwork(net);
              setShowWithdrawNetworkDropdown(false);
              const match = withdrawCoinList.find(
                (c) =>
                  c.symbol === selectedWithdrawCoin.symbol && c.network === net
              );
              if (match) setSelectedWithdrawCoin(match);
            }}
            selectedNet={selectedWithdrawNetwork}
          />
        </div>

        {/* Step 3: Withdraw Address */}
        <div className="relative z-[30]">
          <label className="block text-[11px] text-gray-400 mb-1.5 font-medium">
            Withdraw Address
          </label>
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-2.5"
            style={{ border: "1px solid rgba(255, 255, 255, 0.08)" }}
          >
            <input
              type="text"
              value={withdrawAddress}
              onChange={(e) => setWithdrawAddress(e.target.value)}
              placeholder="Address"
              className="flex-1 bg-transparent text-white/90 text-sm placeholder-gray-500 focus:outline-none"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-1 rounded text-gray-500 hover:text-gray-300 transition-all"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </motion.button>
          </div>
          {isValidatingAddress && withdrawAddress && (
            <p className="text-[10px] text-yellow-400 mt-1">
              Validating address…
            </p>
          )}
          {addressValid === false && (
            <p className="text-[10px] text-red-400 mt-1">
              Invalid {selectedWithdrawCoin?.symbol} address
            </p>
          )}
          {addressValid === true && (
            <p className="text-[10px] text-green-400 mt-1">
              Address looks valid
            </p>
          )}
        </div>

        {/* Amount Fields */}
        {withdrawAddress && (
          <div className="grid grid-cols-2 gap-3 relative z-[20]">
            <div>
              <label className="block text-[11px] text-gray-400 mb-1.5 font-medium">
                Amount (USD)
              </label>
              <input
                type="number"
                value={withdrawAmountUSD}
                onChange={(e) => {
                  setWithdrawAmountUSD(e.target.value);
                  const usdValue = parseFloat(e.target.value) || 0;
                  const cryptoValue = (usdValue / 85000).toFixed(8);
                  setWithdrawAmountCrypto(cryptoValue);
                }}
                placeholder="0.00"
                className="w-full rounded-lg px-3 py-2.5 text-sm text-white/90 placeholder-gray-500 focus:outline-none"
                style={{
                  background: "rgba(13, 14, 54, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              />
            </div>
            <div>
              <label className="block text-[11px] text-gray-400 mb-1.5 font-medium">
                Amount ({selectedWithdrawCoin?.symbol || "BTC"})
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  ≈
                </span>
                <input
                  type="text"
                  value={withdrawAmountCrypto}
                  readOnly
                  placeholder="0.00000000"
                  className="w-full rounded-lg pl-7 pr-3 py-2.5 text-sm text-white/90 placeholder-gray-500 focus:outline-none"
                  style={{
                    background: "rgba(13, 14, 54, 0.6)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Withdraw Button */}
        <motion.button
          whileHover={
            !isWithdrawDisabled
              ? { scale: 1.01, boxShadow: "0 6px 25px rgba(240, 119, 48, 0.4)" }
              : {}
          }
          whileTap={!isWithdrawDisabled ? { scale: 0.98 } : {}}
          disabled={isWithdrawDisabled}
          onClick={() => {
            if (isWithdrawDisabled) {
              if (addressValid === false)
                toast.error(
                  `Invalid ${selectedWithdrawCoin?.symbol || ""} address`
                );
              return;
            }
            handleWithdrawClick();
          }}
          className="w-full py-3 rounded-xl text-sm font-semibold transition-all relative z-[10]"
          style={{
            background: "linear-gradient(180deg, #FFB8A1 0%, #A62A00 100%)",
            boxShadow: "0 4px 15px rgba(240, 119, 48, 0.3)",
          }}
        >
          Withdraw
        </motion.button>

        {/* Footer Text */}
        <p
          className="text-center text-[11px] text-gray-500 py-2 relative z-[10]"
          style={{ borderRadius: "8px", background: "rgba(255, 0, 0, 0.10)" }}
        >
          Please fill in all the fields to see the approximate fee.
        </p>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[100]"
            style={{
              background: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          />

          {/* Modal Container */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 flex items-center justify-center z-[101] p-4"
          >
            {/* Glassmorphism Card - with ref for click outside detection */}
            <div
              ref={modalRef}
              className="w-full max-w-xl rounded-2xl relative overflow-visible"
              style={{
                background: "rgba(255,255,255,0.15)",
                WebkitBackdropFilter: "blur(20px)",
                borderRadius: "20px",
              }}
            >
              {/* Glow Effects */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#F07730]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#EFD28E]/20 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="flex flex-row justify-between px-3 sm:px-5 py-3 sm:py-4 relative z-20 items-center">
                {/* LEFT — Deposit / Withdraw Tabs */}
                <div
                  className="trust_btn2 flex items-center gap-1 rounded-full p-1"
                  style={{
                    borderRadius: "50px",
                    background: " rgba(40, 39, 83, 0.20)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {["deposit", "withdraw"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                        activeTab === tab
                          ? "text-white"
                          : "text-gray-400 hover:text-gray-200"
                      }`}
                      style={
                        activeTab === tab
                          ? {
                              background:
                                "linear-gradient(180deg, #FFB8A1 0%, #A62A00 100%)",
                              boxShadow: "0 2px 10px rgba(240, 119, 48, 0.3)",
                            }
                          : {}
                      }
                    >
                      <span className="capitalize">{tab}</span>
                    </button>
                  ))}
                </div>

                {/* RIGHT — Close Button */}
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.92 }}
                  className="flex items-center justify-center w-8 h-8 rounded-lg transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="31"
                    viewBox="0 0 32 31"
                    fill="none"
                  >
                    <rect
                      x="1"
                      y="1"
                      width="28.1644"
                      height="30"
                      rx="7"
                      transform="matrix(-4.10515e-08 1 1 4.62187e-08 -4.62187e-08 1.35958e-06)"
                      fill="#0D0E36"
                      fillOpacity="0.4"
                      stroke="url(#paint0_linear_close)"
                      strokeWidth="2"
                    />
                    <path
                      d="M10 10.6182C10 10.7821 10.0754 10.9397 10.21 11.0557L15.4512 15.5664L10.21 20.0791C10.0832 20.1963 10.0143 20.3516 10.0176 20.5117C10.021 20.6717 10.0962 20.8243 10.2275 20.9375C10.3592 21.0508 10.5374 21.1163 10.7236 21.1191C10.9096 21.1219 11.0894 21.0622 11.2256 20.9531L16.4678 16.4414L21.71 20.9531C21.7758 21.0139 21.8552 21.0629 21.9434 21.0967C22.0315 21.1305 22.1271 21.1479 22.2236 21.1494C22.32 21.1508 22.4155 21.1355 22.5049 21.1045C22.5943 21.0734 22.6759 21.0274 22.7441 20.9688C22.8124 20.91 22.8662 20.8397 22.9023 20.7627C22.9384 20.6858 22.9567 20.6035 22.9551 20.5205C22.9534 20.4374 22.9319 20.3552 22.8926 20.2793C22.8533 20.2035 22.7962 20.1357 22.7256 20.0791L17.4834 15.5664L22.7256 11.0557C22.8602 10.9397 22.9365 10.7821 22.9365 10.6182C22.9365 10.4542 22.8602 10.2967 22.7256 10.1807C22.5909 10.065 22.4081 10 22.2178 10C22.0274 10.0001 21.8447 10.0649 21.71 10.1807L16.4678 14.6924L11.2256 10.1807C11.0909 10.065 10.9081 10 10.7178 10C10.5274 10.0001 10.3446 10.0649 10.21 10.1807C10.0754 10.2967 10 10.4542 10 10.6182Z"
                      fill="white"
                      fillOpacity="0.9"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_close"
                        x1="2.11317"
                        y1="-7.09502e-06"
                        x2="17.9712"
                        y2="34.4136"
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
                        <stop offset="1" stopColor="white" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.button>
              </div>

              {/* Content */}
              <div className="px-5 pb-5 relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{
                      opacity: 0,
                      x: activeTab === "deposit" ? -20 : 20,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: activeTab === "deposit" ? 20 : -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === "deposit"
                      ? renderDepositContent()
                      : renderWithdrawContent()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          <WithdrawProcessingPopup
            isOpen={showProcessingPopup}
            onClose={() => setShowProcessingPopup(false)}
            withdrawalData={{
              amount: withdrawAmountUSD,
              currency: selectedWithdrawCoin?.symbol?.toUpperCase(),
              address: withdrawAddress,
            }}
            userId={userId}
          />
          {showSuccessPopup && (
            <WithdrawSuccessPopup
              isOpen={showSuccessPopup}
              onClose={() => setShowSuccessPopup(false)}
            />
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default WalletModal;
