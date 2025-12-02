// src/components/WalletModal.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "qrcode";
import { toast } from "react-toastify";
import api from "../api/axios";
import axios from "axios";
import { useWalletSocket } from "../context/WalletSocketContext";
import WithdrawProcessingPopup from "./settings/WithdrawProcessingPopup";
import WithdrawSuccessPopup from "./settings/WithdrawSuccessPopup";

const WalletModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [depositTab, setDepositTab] = useState("crypto");
  const [qrCodeData, setQrCodeData] = useState("");
  const [hideZeroBalances, setHideZeroBalances] = useState(false);
  const [displayCryptoInFiat, setDisplayCryptoInFiat] = useState(true);
  const [selectedFiatCurrency, setSelectedFiatCurrency] = useState("USD");
  const [buyAmount, setBuyAmount] = useState("");
  const [copied, setCopied] = useState(false);
  const [coinList, setCoinList] = useState([]);
  const [walletBalance, setWalletBalance] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [showCoinDropdown, setShowCoinDropdown] = useState(false);
  const [depositCoinList, setDepositCoinList] = useState([]);
  const [selectedDepositCoin, setSelectedDepositCoin] = useState(null);
  const [depositAddress, setDepositAddress] = useState("");
  const [showDepositDropdown, setShowDepositDropdown] = useState(false);
  const [otpRequestId, setOtpRequestId] = useState(null);

  const walletAddress = "Ar64QrBWTHWncHKXv2ojJ2np1zAGTEhZUA8wfdhTg7n";

  // Withdraw states
  const [withdrawCoinList, setWithdrawCoinList] = useState([]);
  const [selectedWithdrawCoin, setSelectedWithdrawCoin] = useState(null);
  const [showWithdrawDropdown, setShowWithdrawDropdown] = useState(false);
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [showProcessingPopup, setShowProcessingPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [addressValid, setAddressValid] = useState(null);
  const [isValidatingAddress, setIsValidatingAddress] = useState(false);

  const [showWithdrawConfirmation, setShowWithdrawConfirmation] =
    useState(false);

  const socket = useWalletSocket();

  useEffect(() => {
    if (!isOpen || !socket) return;

    const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
    if (!userId) return;

    socket.emit("joinDepositRoom", userId);
    socket.emit("joinWithdrawRoom", userId);
  }, [isOpen, socket]);

  useEffect(() => {
    if (!socket) return;

    const handler = (msg) => {
      console.log("🔥 Wallet deposit update:", msg);

      if (msg.status === "credited") {
        console.log("Message status are:", msg.status);
        toast.success("🎉 Deposit credited!");
        refreshBalance();
      }

      if (msg.status === "finished") {
        console.log("Message status are:", msg.status);
        toast.success("💸 Blockchain confirmations completed");
      }

      if (msg.status === "confirming") {
        console.log("Message status are:", msg.status);
        toast.info("⏳ Confirming on blockchain…");
      }

      if (msg.status === "sending") {
        console.log("Message status are:", msg.status);
        toast.info("📤 Processing via NOWPayments…");
      }

      if (msg.status === "waiting") {
        console.log("Message status are:", msg.status);
        toast.info("💰 Payment detected — waiting confirmations");
      }
    };

    socket.on("deposit_status", handler);

    return () => socket.off("deposit_status", handler);
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    const handleWithdrawStatus = (msg) => {
      console.log("🔥 Wallet withdraw update:", msg);

      if (msg.status === "confirming") toast.info("⏳ Withdrawal confirming…");
      if (msg.status === "sending") toast.info("📤 Broadcasting transaction…");
      if (msg.status === "finished") toast.success("💸 Withdrawal finalized!");

      if (msg.status === "completed") {
        toast.success("🎉 Withdrawal completed!");

        // CLOSE PROCESSING POPUP
        setShowProcessingPopup(false);

        // REFRESH BALANCE
        refreshBalance();

        // SHOW SUCCESS POPUP
        setShowSuccessPopup(true);
      }
    };

    socket.on("withdraw_status", handleWithdrawStatus);
    return () => socket.off("withdraw_status", handleWithdrawStatus);
  }, [socket]);

  const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
  const emailId = JSON.parse(localStorage.getItem("user") || "{}").email;
  useEffect(() => {
    if (isOpen) {
      const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
      const token = localStorage.getItem("token");

      if (!userId || !token) return;

      axios
        .get(`/wallet-service/api/wallet/${userId}/balance`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(({ data }) => setWalletBalance(data))
        .catch((err) =>
          console.error("❌ Error fetching wallet balance:", err)
        );
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      axios
        .get(`/wallet-service/api/wallet/coins`)
        .then(({ data }) => {
          if (Array.isArray(data)) {
            setCoinList(data);
            setSelectedCoin(data[0]);
          }
        })
        .catch((err) => console.error("❌ Error fetching coins:", err));
    }
  }, [isOpen]);

  useEffect(() => {
    if (showDepositModal) {
      axios
        .get(`/wallet-service/api/wallet/coins`)
        .then(({ data }) => {
          if (Array.isArray(data)) {
            setDepositCoinList(data);
            setSelectedDepositCoin(null);
          }
        })
        .catch((err) => console.error("❌ Error fetching deposit coins:", err));
    }
  }, [showDepositModal]);

  // Fetch withdraw coins
  useEffect(() => {
    if (showWithdrawModal) {
      axios
        .get(`/wallet-service/api/wallet/coins`)
        .then(({ data }) => {
          if (Array.isArray(data)) {
            setWithdrawCoinList(data);
            setSelectedWithdrawCoin(data[0]);
          }
        })
        .catch((err) =>
          console.error("❌ Error fetching withdraw coins:", err)
        );
    }
  }, [showWithdrawModal]);

  useEffect(() => {
    const userId =
      JSON.parse(localStorage.getItem("user") || "{}").id ||
      "68eb94c22a7983ea19b0bd6a";

    if (selectedDepositCoin?.symbol) {
      const currency = selectedDepositCoin.symbol.toUpperCase();

      axios
        .get(
          `/wallet-service/api/wallet/${userId}/deposit-address?currency=${currency}`
        )
        .then(async ({ data }) => {
          setDepositAddress(data.payAddress || "");
          if (data.payAddress) {
            const qr = await QRCode.toDataURL(data.payAddress, {
              width: 256,
              margin: 2,
              color: { dark: "#000000", light: "#FFFFFF" },
            });
            setQrCodeData(qr);
          }
        })
        .catch((err) =>
          console.error("❌ Error fetching deposit address:", err)
        );
    }
  }, [selectedDepositCoin]);

  useEffect(() => {
    if (walletAddress) {
      QRCode.toDataURL(walletAddress, {
        width: 256,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      })
        .then(setQrCodeData)
        .catch(console.error);
    }
  }, [walletAddress]);

  const refreshBalance = async () => {
    const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
    const token = localStorage.getItem("token");

    axios
      .get(`/wallet-service/api/wallet/${userId}/balance`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => setWalletBalance(data))
      .catch(console.error);
  };

  const cryptoCurrencies = [
    {
      symbol: "SOL",
      name: "Solana",
      icon: "◎",
      balance: "0.10009677",
      value: "$19.58",
    },
    {
      symbol: "BTC",
      name: "Bitcoin",
      icon: "₿",
      balance: "0.00000000",
      value: "$0.00",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      icon: "Ξ",
      balance: "0.00000000",
      value: "$0.00",
    },
    {
      symbol: "USDT",
      name: "Tether",
      icon: "₮",
      balance: "0.00000000",
      value: "$0.00",
    },
  ];

  const fiatCurrencies = [
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "JPY", symbol: "¥" },
    { code: "INR", symbol: "₹" },
    { code: "CAD", symbol: "$" },
    { code: "CNY", symbol: "¥" },
    { code: "IDR", symbol: "Rp" },
    { code: "KRW", symbol: "₩" },
    { code: "PHP", symbol: "₱" },
    { code: "RUB", symbol: "₽" },
    { code: "DKK", symbol: "Kr" },
    { code: "MXN", symbol: "$" },
    { code: "PLN", symbol: "zł" },
    { code: "TRY", symbol: "₺" },
    { code: "VND", symbol: "đ" },
    { code: "ARS", symbol: "ARS" },
    { code: "PEN", symbol: "S/" },
    { code: "CLP", symbol: "CLP" },
    { code: "NGN", symbol: "₦" },
    { code: "CRC", symbol: "₡" },
    { code: "MAD", symbol: "MAD" },
    { code: "MYR", symbol: "RM" },
    { code: "QAR", symbol: "ر.ق" },
    { code: "SAR", symbol: "﷼" },
  ];

  const validateAddressAPI = async (address, currency) => {
    try {
      const { data } = await axios.post(
        "/wallet-service/api/wallet/validate-address",
        { address, currency }
      );

      return data.valid === true;
    } catch (err) {
      console.error("❌ Address validation failed:", err);
      return false;
    }
  };

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

  const copyToClipboard = () => {
    if (depositAddress) {
      navigator.clipboard.writeText(depositAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWithdrawClick = () => {
    setShowWithdrawModal(false);
    setShowProcessingPopup(true);
    setShowSuccessPopup(false);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const renderDepositModal = () => (
    <AnimatePresence>
      {showDepositModal && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0  /70 backdrop-blur-sm z-[102]"
            onClick={() => setShowDepositModal(false)}
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 flex items-center justify-center z-[103] p-4"
          >
            <div
              className="bg-[#1A1D24] rounded-xl w-full max-w-lg shadow-2xl border border-white/10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
                borderRadius: "6px",
              }}
            >
              <div className="flex items-center gap-3 p-6 border-b border-white/10">
                <button
                  onClick={() => setShowDepositModal(false)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <h2 className="text-xl font-bold text-white">Deposit</h2>
                <button
                  onClick={() => setShowDepositModal(false)}
                  className="ml-auto hover:bg-white/5 rounded-lg transition-colors"
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
                      fill="#080808"
                      fillOpacity="0.2"
                      stroke="url(#paint0_linear_9379_1117)"
                      strokeWidth="2"
                    />
                    <path
                      d="M10 10.6182C10 10.7821 10.0754 10.9397 10.21 11.0557L15.4512 15.5664L10.21 20.0791C10.0832 20.1963 10.0143 20.3516 10.0176 20.5117C10.021 20.6717 10.0962 20.8243 10.2275 20.9375C10.3592 21.0508 10.5374 21.1163 10.7236 21.1191C10.9096 21.1219 11.0894 21.0622 11.2256 20.9531L16.4678 16.4414L21.71 20.9531C21.7758 21.0139 21.8552 21.0629 21.9434 21.0967C22.0315 21.1305 22.1271 21.1479 22.2236 21.1494C22.32 21.1508 22.4155 21.1355 22.5049 21.1045C22.5943 21.0734 22.6759 21.0274 22.7441 20.9688C22.8124 20.91 22.8662 20.8397 22.9023 20.7627C22.9384 20.6858 22.9567 20.6035 22.9551 20.5205C22.9534 20.4374 22.9319 20.3552 22.8926 20.2793C22.8533 20.2035 22.7962 20.1357 22.7256 20.0791L17.4834 15.5664L22.7256 11.0557C22.8602 10.9397 22.9365 10.7821 22.9365 10.6182C22.9365 10.4542 22.8602 10.2967 22.7256 10.1807C22.5909 10.065 22.4081 10 22.2178 10C22.0274 10.0001 21.8447 10.0649 21.71 10.1807L16.4678 14.6924L11.2256 10.1807C11.0909 10.065 10.9081 10 10.7178 10C10.5274 10.0001 10.3446 10.0649 10.21 10.1807C10.0754 10.2967 10 10.4542 10 10.6182Z"
                      fill="white"
                      fillOpacity="0.9"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_9379_1117"
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
                </button>
              </div>

              <div className="px-6 pb-6">
                <div className="mb-4 mt-4 relative">
                  <label className="text-[#E1E1E1] text-sm mb-2 block">
                    Currency
                  </label>

                  <div
                    onClick={() => setShowDepositDropdown(!showDepositDropdown)}
                    className="rounded-lg p-2 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-all"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      boxShadow:
                        "rgba(0,0,0,0.5) 0px 20px 60px, rgba(220,31,255,0.1) 0px 0px 100px",
                      borderRadius: "6px",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {selectedDepositCoin ? (
                        <>
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-[#fff] font-bold"
                            style={{
                              background: "var(--cta-pink-gradient)",
                            }}
                          >
                            {selectedDepositCoin.symbol.charAt(0)}
                          </div>

                          <div>
                            <div className="text-white font-bold">
                              {selectedDepositCoin.symbol}
                            </div>
                            <div className="text-gray-400 text-sm">
                              {selectedDepositCoin.name}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="text-[#E1E1E1] text-sm">
                          Select Currency
                        </div>
                      )}
                    </div>

                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${
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
                  </div>

                  {/* DROPDOWN WITH YOUR WALLET STYLE */}
                  <AnimatePresence>
                    {showDepositDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 right-0 mt-2 rounded-lg shadow-lg z-[999]  overflow-y-auto p-2"
                        style={{
                          background: "var(--container-dark-purple-3)",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        <div className="wallet-list flex-1 max-h-[240px] overflow-y-auto pr-1.5 pb-2">
                          {depositCoinList.map((coin) => (
                            <div
                              key={coin.symbol}
                              onClick={() => {
                                setSelectedDepositCoin(coin);
                                setShowDepositDropdown(false);
                              }}
                              className="wallet-item group flex items-center pr-3 my-2.5 rounded-full relative cursor-pointer transition-all duration-250"
                            >
                              {/* Hover Background Effect */}
                              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/45 to-white/15 opacity-0 scale-[0.98] group-hover:opacity-100 group-hover:scale-100 transition-all duration-250 pointer-events-none" />

                              {/* Icon */}
                              <div className="icon-wrap w-9 h-9 rounded-full flex items-center justify-center transition-all duration-250 relative z-10 group-hover:bg-white/55">
                                <div
                                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                                  style={{
                                    background: "var(--cta-pink-gradient)",
                                  }}
                                >
                                  {coin.symbol.charAt(0)}
                                </div>
                              </div>

                              {/* Text */}
                              <div className="ml-3 relative z-10">
                                <div className="text-white font-bold">
                                  {coin.symbol}
                                </div>
                                <div className="text-gray-400 text-xs">
                                  {coin.name}
                                </div>
                              </div>

                              <span className="text-gray-400 text-sm ml-auto relative z-10">
                                {coin.network}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ADDRESS FIELD */}
                <div className="mb-6">
                  <label className="text-[#E1E1E1] text-sm mb-2 block">
                    Address
                  </label>
                  <div
                    className="rounded-lg p-2 flex items-center gap-3 border border-white/10"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                    }}
                  >
                    <span className="text-white text-sm font-mono flex-1 truncate">
                      {depositAddress || "Please select currency..."}
                    </span>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={copyToClipboard}
                      className={`p-2 rounded-lg transition-all ${
                        copied
                          ? "bg-green-500/20 text-green-400"
                          : "hover:bg-white/5 text-white"
                      }`}
                    >
                      {copied ? (
                        <svg
                          className="w-5 h-5"
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
                          className="w-5 h-5"
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

                {/* QR CODE */}
                <div className="flex justify-center mb-6">
                  <div className="bg-white p-4 rounded-xl relative w-40 h-40 flex items-center justify-center">
                    {qrCodeData && (
                      <img
                        src={qrCodeData}
                        alt="QR Code"
                        className={`w-36 h-36 transition-all duration-300 ${
                          !selectedDepositCoin
                            ? "blur-sm opacity-60"
                            : "blur-0 opacity-100"
                        }`}
                      />
                    )}
                  </div>
                </div>

                <div className="text-center text-white mb-4">Or</div>

                {/* DIRECT WALLET BUTTON */}
                <button
                  className="w-full hover:bg-white/5 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-all border border-white/10"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                  }}
                >
                  <span>Deposit Directly From Your Wallet</span>
                  <div className="flex gap-2">
                    <span className="text-xl">🦊</span>
                    <span className="text-xl">👻</span>
                    <span className="text-xl">🔵</span>
                    <span className="text-xl">◎</span>
                    <span
                      className="text-sm text-white px-2 py-1 rounded font-bold"
                      style={{ background: "var(--cta-pink-gradient)" }}
                    >
                      +300
                    </span>
                  </div>
                </button>

                <div className="mt-4 flex justify-between text-sm">
                  <span className="text-white">Credited</span>
                  <span className="text-white">2 Confirmations</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
  const selectedBalanceObj = walletBalance?.balances?.find(
    (b) =>
      b.currency?.toUpperCase() === selectedWithdrawCoin?.symbol?.toUpperCase()
  );

  const availableBalance = selectedBalanceObj
    ? Number(selectedBalanceObj.amount)
    : null;
  const minWithdraw = 0.0001;

  const noCurrencyFound = availableBalance === null; // currency not in wallet

  const isWithdrawDisabled =
    noCurrencyFound ||
    !withdrawAmount ||
    withdrawAmount <= 0 ||
    Number(withdrawAmount) < minWithdraw ||
    (availableBalance !== null && withdrawAmount > availableBalance) ||
    withdrawAddress.trim().length === 0;
  addressValid === false || addressValid === null;

  let dynamicInsufficientMessage = "Enter a valid amount";

  if (noCurrencyFound) {
    dynamicInsufficientMessage = `You don’t have ${
      selectedWithdrawCoin?.symbol || ""
    } in your wallet`;
  } else if (withdrawAmount > availableBalance) {
    dynamicInsufficientMessage = "Amount exceeds available balance";
  }

  const renderWithdrawModal = () => (
    <AnimatePresence>
      {showWithdrawModal && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0  /70 backdrop-blur-sm z-[102]"
            onClick={() => setShowWithdrawModal(false)}
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 flex items-center justify-center z-[103] p-4"
          >
            <div
              className=" rounded-xl w-full max-w-lg shadow-2xl border border-white/10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
                borderRadius: "6px",
              }}
            >
              <div className="flex items-center gap-3 p-6 border-b border-white/10">
                <button
                  onClick={() => setShowWithdrawModal(false)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <h2 className="text-xl font-bold text-white test">Withdraw</h2>
                <button
                  onClick={() => setShowWithdrawModal(false)}
                  className="ml-auto hover:bg-white/5 rounded-lg transition-colors"
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
                      fill="#080808"
                      fillOpacity="0.2"
                      stroke="url(#paint0_linear_9379_1117)"
                      strokeWidth="2"
                    />
                    <path
                      d="M10 10.6182C10 10.7821 10.0754 10.9397 10.21 11.0557L15.4512 15.5664L10.21 20.0791C10.0832 20.1963 10.0143 20.3516 10.0176 20.5117C10.021 20.6717 10.0962 20.8243 10.2275 20.9375C10.3592 21.0508 10.5374 21.1163 10.7236 21.1191C10.9096 21.1219 11.0894 21.0622 11.2256 20.9531L16.4678 16.4414L21.71 20.9531C21.7758 21.0139 21.8552 21.0629 21.9434 21.0967C22.0315 21.1305 22.1271 21.1479 22.2236 21.1494C22.32 21.1508 22.4155 21.1355 22.5049 21.1045C22.5943 21.0734 22.6759 21.0274 22.7441 20.9688C22.8124 20.91 22.8662 20.8397 22.9023 20.7627C22.9384 20.6858 22.9567 20.6035 22.9551 20.5205C22.9534 20.4374 22.9319 20.3552 22.8926 20.2793C22.8533 20.2035 22.7962 20.1357 22.7256 20.0791L17.4834 15.5664L22.7256 11.0557C22.8602 10.9397 22.9365 10.7821 22.9365 10.6182C22.9365 10.4542 22.8602 10.2967 22.7256 10.1807C22.5909 10.065 22.4081 10 22.2178 10C22.0274 10.0001 21.8447 10.0649 21.71 10.1807L16.4678 14.6924L11.2256 10.1807C11.0909 10.065 10.9081 10 10.7178 10C10.5274 10.0001 10.3446 10.0649 10.21 10.1807C10.0754 10.2967 10 10.4542 10 10.6182Z"
                      fill="white"
                      fillOpacity="0.9"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_9379_1117"
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
                </button>
              </div>

              <div className="px-6 pb-6 pt-6">
                <div className="mb-4 relative">
                  <label className="text-[#E1E1E1] text-sm mb-2 block">
                    Currency
                  </label>

                  {/* Top Selector */}
                  <div
                    onClick={() =>
                      setShowWithdrawDropdown(!showWithdrawDropdown)
                    }
                    className="rounded-lg p-2 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-all border border-white/10"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ background: "var(--cta-pink-gradient)" }}
                      >
                        {selectedWithdrawCoin?.symbol?.charAt(0) || "◎"}
                      </div>

                      <div>
                        <div className="text-white font-bold">
                          {selectedWithdrawCoin?.symbol || "SOL"}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {selectedWithdrawCoin?.name || "Solana"}
                        </div>
                      </div>
                    </div>

                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${
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
                  </div>

                  {/* DROPDOWN WITH WALLET STYLE */}
                  <AnimatePresence>
                    {showWithdrawDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 right-0 mt-2 rounded-lg shadow-lg z-[999] overflow-y-auto p-2 border border-white/10"
                        style={{ background: "var(--container-dark-purple-3)" }}
                      >
                        <div className="wallet-list flex-1 max-h-[240px] overflow-y-auto pr-1.5 pb-2">
                          {withdrawCoinList.map((coin) => (
                            <div
                              key={coin.symbol}
                              onClick={() => {
                                setSelectedWithdrawCoin(coin);
                                setShowWithdrawDropdown(false);
                              }}
                              className="wallet-item group flex items-center pr-3 my-2.5 rounded-full relative cursor-pointer transition-all duration-250"
                            >
                              {/* Hover Background */}
                              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/45 to-white/15 opacity-0 scale-[0.98] group-hover:opacity-100 group-hover:scale-100 transition-all duration-250 pointer-events-none" />

                              {/* Icon */}
                              <div className="icon-wrap w-9 h-9 rounded-full flex items-center justify-center transition-all duration-250 relative z-10 group-hover:bg-white/55">
                                <div
                                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                                  style={{
                                    background: "var(--cta-pink-gradient)",
                                  }}
                                >
                                  {coin.symbol.charAt(0)}
                                </div>
                              </div>

                              {/* Coin Text */}
                              <div className="ml-3 relative z-10">
                                <div className="text-white font-bold">
                                  {coin.symbol}
                                </div>
                                <div className="text-gray-400 text-xs">
                                  {coin.name}
                                </div>
                              </div>

                              <span className="text-gray-400 text-sm ml-auto relative z-10">
                                {coin.network}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* WITHDRAWAL ADDRESS INPUT */}
                <div className="mb-4">
                  <label className="text-[#E1E1E1] text-sm mb-2 block">
                    Withdrawal Address
                  </label>
                  <input
                    type="text"
                    value={withdrawAddress}
                    onChange={(e) => setWithdrawAddress(e.target.value)}
                    placeholder="Enter wallet address"
                    className="w-full rounded-lg p-4 text-white font-mono text-sm border border-white/10 focus:border-[#5A3799] focus:outline-none transition-all placeholder-[#E1E1E1]"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                    }}
                  />
                  {isValidatingAddress && withdrawAddress && (
                    <p className="text-yellow-400 text-xs mt-1">
                      Validating address...
                    </p>
                  )}

                  {addressValid === false && (
                    <p className="text-red-400 text-xs mt-1">
                      ❌ Invalid {selectedWithdrawCoin?.symbol} address
                    </p>
                  )}

                  {addressValid === true && (
                    <p className="text-green-400 text-xs mt-1">
                      ✔ Valid {selectedWithdrawCoin?.symbol} address
                    </p>
                  )}
                </div>

                {/* AMOUNT */}
                <div className="mb-6">
                  <label className="text-[#E1E1E1] text-sm mb-2 block">
                    Amount
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full rounded-lg p-4 pr-20 text-white text-lg font-bold border border-white/10 focus:border-[#5A3799] focus:outline-none transition-all placeholder-[#E1E1E1]"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                      }}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                      {selectedWithdrawCoin?.symbol || "SOL"}
                    </div>
                  </div>

                  <div className="mt-2 flex justify-between text-sm">
                    <span className="text-[#E1E1E1]">Available Balance:</span>
                    <span className="text-[#E1E1E1] font-bold">
                      {walletBalance?.balances
                        ?.find(
                          (b) =>
                            b.currency?.toUpperCase() ===
                            selectedWithdrawCoin?.symbol?.toUpperCase()
                        )
                        ?.amount.toFixed(8) || "0.00000000"}
                    </span>
                  </div>
                </div>

                {/* INFO BOX */}
                <div
                  className="rounded-lg p-4 mb-6"
                  style={{
                    background:
                      "linear-gradient(109deg, rgba(255,255,255,0.50) 1.57%, rgba(255,255,255,0.10) 100%)",
                  }}
                >
                  <div className="flex gap-3">
                    <div
                      className="w-5 h-5 flex-shrink-0 mt-0.5 rounded-full flex items-center justify-center"
                      style={{ background: "var(--cta-pink-gradient)" }}
                    >
                      <svg className="w-3 h-3" fill="#fff" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-[#fff] text-sm">
                      Please double-check the withdrawal address. Transactions
                      cannot be reversed once confirmed.
                    </p>
                  </div>
                </div>

                {/* BUTTON */}
                <motion.button
                  whileHover={!isWithdrawDisabled ? { scale: 1.02 } : {}}
                  whileTap={!isWithdrawDisabled ? { scale: 0.98 } : {}}
                  onClick={() => {
                    if (isWithdrawDisabled) {
                      if (addressValid === false) {
                        toast.error(
                          `Invalid ${selectedWithdrawCoin?.symbol} address`
                        );
                      }
                      return;
                    }
                    handleWithdrawClick();
                  }}
                  disabled={isWithdrawDisabled}
                  className={`w-full py-4 px-6 rounded-lg font-bold transition-all
      ${
        isWithdrawDisabled
          ? "bg-gray-500 text-gray-300 cursor-not-allowed opacity-50"
          : "text-black bg-gradient-to-r from-[#F07730] to-[#EFD28E] hover:from-[#F07730]/90 hover:to-[#EFD28E]/90"
      }
    `}
                >
                  {isWithdrawDisabled
                    ? dynamicInsufficientMessage
                    : "Confirm Withdrawal"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 flex items-center justify-center z-[101] p-4"
          >
            <div
              className="w-full rounded-2xl max-w-lg shadow-2xl transform transition-all duration-300 scale-100"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                boxShadow:
                  "rgba(0, 0, 0, 0.5) 0px 20px 60px, rgba(240, 119, 48, 0.1) 0px 0px 100px",
              }}
            >
              {/* Header with enhanced glass effect */}
              <div
                className="flex items-center justify-between p-4 rounded-2xl"
                style={{
                  borderRadius: "12px 12px 0 0",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                }}
              >
                <div className="flex items-center gap-3">
                  <h2 className="text-xl text-white drop-shadow-lg">WALLET</h2>
                </div>
                <button
                  onClick={onClose}
                  className="hover:bg-white/10 rounded-lg transition-all backdrop-blur-sm"
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
                      fill="#080808"
                      fillOpacity="0.2"
                      stroke="url(#paint0_linear_9379_1117)"
                      strokeWidth="2"
                    />
                    <path
                      d="M10 10.6182C10 10.7821 10.0754 10.9397 10.21 11.0557L15.4512 15.5664L10.21 20.0791C10.0832 20.1963 10.0143 20.3516 10.0176 20.5117C10.021 20.6717 10.0962 20.8243 10.2275 20.9375C10.3592 21.0508 10.5374 21.1163 10.7236 21.1191C10.9096 21.1219 11.0894 21.0622 11.2256 20.9531L16.4678 16.4414L21.71 20.9531C21.7758 21.0139 21.8552 21.0629 21.9434 21.0967C22.0315 21.1305 22.1271 21.1479 22.2236 21.1494C22.32 21.1508 22.4155 21.1355 22.5049 21.1045C22.5943 21.0734 22.6759 21.0274 22.7441 20.9688C22.8124 20.91 22.8662 20.8397 22.9023 20.7627C22.9384 20.6858 22.9567 20.6035 22.9551 20.5205C22.9534 20.4374 22.9319 20.3552 22.8926 20.2793C22.8533 20.2035 22.7962 20.1357 22.7256 20.0791L17.4834 15.5664L22.7256 11.0557C22.8602 10.9397 22.9365 10.7821 22.9365 10.6182C22.9365 10.4542 22.8602 10.2967 22.7256 10.1807C22.5909 10.065 22.4081 10 22.2178 10C22.0274 10.0001 21.8447 10.0649 21.71 10.1807L16.4678 14.6924L11.2256 10.1807C11.0909 10.065 10.9081 10 10.7178 10C10.5274 10.0001 10.3446 10.0649 10.21 10.1807C10.0754 10.2967 10 10.4542 10 10.6182Z"
                      fill="white"
                      fillOpacity="0.9"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_9379_1117"
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
                </button>
              </div>

              {/* Content Area with glass overlay */}
              <div className="overflow-y-auto">
                {activeTab === "overview" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4"
                  >
                    {/* Balance Section with glass card */}
                    <div className="mb-6 rounded-xl">
                      <div className="flex items-center justify-between gap-4  /30 px-4 py-3 rounded-xl border border-white/10">
                        {/* Left side: Label and Balance */}
                        <div className="flex flex-col">
                          <p className="font-medium tracking-wide">Balance</p>
                          <span className="text-2xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
                            ${walletBalance?.totalUsd?.toFixed(2) || "0.00"}
                          </span>
                        </div>

                        {/* Right side: Gradient Icon */}
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-extrabold text-lg"
                          style={{
                            background: "var(--cta-pink-gradient)",
                          }}
                        >
                          $
                        </div>
                      </div>
                    </div>

                    {/* Currency List with glass cards */}
                    <div className="mb-6">
                      <div
                        className="flex justify-between text-gray-400 text-sm mb-4 pb-2"
                        style={{
                          textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                        }}
                      >
                        <span>Currency</span>
                        <span>Value</span>
                      </div>
                      {walletBalance?.balances &&
                      walletBalance.balances.length > 0 ? (
                        walletBalance.balances.map((coin, index) => (
                          <motion.div
                            key={coin.currency}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between py-1 px-3 mb-2 rounded-lg transition-all"
                            style={{
                              background:
                                "linear-gradient(109deg, rgba(255, 255, 255, 0.50) 1.57%, rgba(255, 255, 255, 0.10) 100%)",
                              backdropFilter: "blur(30px)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background =
                                "linear-gradient(109deg, rgba(255, 255, 255, 0.60) 1.57%, rgba(255, 255, 255, 0.20) 100%)";
                              e.currentTarget.style.border = "";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background =
                                "linear-gradient(109deg, rgba(255, 255, 255, 0.50) 1.57%, rgba(255, 255, 255, 0.10) 100%)";
                              e.currentTarget.style.border = "";
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-[#F07730]/20"
                                style={{
                                  background: "var(--cta-pink-gradient)",
                                }}
                              >
                                {coin.currency.charAt(0)}
                              </div>
                              <div>
                                <div className="text-white font-bold">
                                  {coin.currency}
                                </div>
                                <div className="text-[#E1E1E1] text-sm">
                                  Crypto Asset
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-white font-bold">
                                {coin.amount.toFixed(8)}
                              </div>
                              <div className="text-gray-400 text-sm">
                                ${coin.usdValue.toFixed(2)} USD
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-gray-400 text-center py-6">
                          No balances found.
                        </div>
                      )}
                    </div>

                    {/* Action Buttons with glass effect */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowWithdrawModal(true)}
                        className="text-white py-2 px-6 rounded-lg font-bold transition-all"
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          backdropFilter: "blur(10px)",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(255, 255, 255, 0.08)";
                          e.currentTarget.style.border = "";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            "rgba(255, 255, 255, 0.05)";
                          e.currentTarget.style.border = "";
                        }}
                      >
                        Withdraw
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowDepositModal(true)}
                        className="text-white custom-btn hover:from-[#F07730]/90 hover:to-[#EFD28E]/90  py-4 px-6 rounded-lg font-bold transition-all shadow-lg shadow-[#F07730]/30"
                      >
                        Deposit
                      </motion.button>
                    </div>

                    {/* 2FA Card with enhanced glass */}
                    {/* <div
                      className="rounded-lg p-4"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(240, 119, 48, 0.1) 0%, rgba(240, 119, 48, 0.05) 100%)",
                        backdropFilter: "blur(15px)",
                        border: "1px solid rgba(240, 119, 48, 0.3)",
                        boxShadow: "0 4px 20px rgba(240, 119, 48, 0.1)",
                      }}
                    >
                      <p className="text-gray-300 mb-4">
                        Improve your account security with Two-Factor
                        Authentication
                      </p>
                      <button className="w-full bg-gradient-to-r from-[#F07730] to-[#EFD28E] hover:from-[#F07730]/90 hover:to-[#EFD28E]/90 text-black py-3 px-4 rounded-lg font-medium transition-all shadow-lg shadow-[#F07730]/30">
                        Enable 2FA
                      </button>
                    </div> */}
                  </motion.div>
                )}

                {activeTab === "buycrypto" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6"
                  >
                    {/* Coin Selector with glass effect */}
                    <div className="mb-4 relative">
                      <label className="text-[#E1E1E1] text-sm mb-2 block">
                        Buy
                      </label>

                      <div
                        onClick={() => setShowCoinDropdown(!showCoinDropdown)}
                        className="rounded-lg p-3 flex items-center justify-between cursor-pointer transition-all"
                        style={{
                          background: "rgba(15, 17, 22, 0.6)",
                          backdropFilter: "blur(15px)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(255, 255, 255, 0.05)";
                          e.currentTarget.style.border =
                            "1px solid rgba(255, 255, 255, 0.15)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            "rgba(15, 17, 22, 0.6)";
                          e.currentTarget.style.border =
                            "1px solid rgba(255, 255, 255, 0.1)";
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full flex items-center justify-center text-black font-bold shadow-lg shadow-[#F07730]/20">
                            {selectedCoin?.symbol?.charAt(0) || "◎"}
                          </div>
                          <div>
                            <div className="text-white font-bold">
                              {selectedCoin?.symbol || "SOL"}
                            </div>
                            <div className="text-gray-400 text-sm">
                              {selectedCoin?.name || "Solana"}
                            </div>
                          </div>
                        </div>
                        <svg
                          className={`w-5 h-5 text-gray-400 transition-transform ${
                            showCoinDropdown ? "rotate-180" : ""
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
                      </div>

                      {/* Dropdown with glass effect */}
                      <AnimatePresence>
                        {showCoinDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 right-0 mt-2 rounded-lg shadow-xl z-[999] max-h-60 overflow-y-auto"
                            style={{
                              background: "rgba(15, 17, 22, 0.95)",
                              backdropFilter: "blur(20px)",
                              border: "1px solid rgba(255, 255, 255, 0.15)",
                              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
                            }}
                          >
                            {coinList.map((coin) => (
                              <div
                                key={coin.symbol}
                                onClick={() => {
                                  setSelectedCoin(coin);
                                  setShowCoinDropdown(false);
                                }}
                                className="flex items-center justify-between px-4 py-3 cursor-pointer transition-all"
                                style={{
                                  borderBottom:
                                    "1px solid rgba(255, 255, 255, 0.05)",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background =
                                    "rgba(255, 255, 255, 0.05)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background =
                                    "transparent";
                                }}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full flex items-center justify-center text-black font-bold shadow-md shadow-[#F07730]/20">
                                    {coin.symbol.charAt(0)}
                                  </div>
                                  <div>
                                    <div className="text-white font-bold">
                                      {coin.symbol}
                                    </div>
                                    <div className="text-gray-400 text-xs">
                                      {coin.name}
                                    </div>
                                  </div>
                                </div>
                                <span className="text-gray-400 text-sm">
                                  {coin.network}
                                </span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Amount Input with glass effect */}
                    <div className="mb-6">
                      <label className="text-gray-400 text-sm mb-2 block">
                        Amount *
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={buyAmount}
                          onChange={(e) => setBuyAmount(e.target.value)}
                          placeholder="0"
                          className="flex-1 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F07730] transition-all"
                          style={{
                            background: "rgba(15, 17, 22, 0.6)",
                            backdropFilter: "blur(15px)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                          }}
                        />
                        <div
                          className="rounded-lg px-4 py-3 flex items-center gap-2 min-w-[120px]"
                          style={{
                            background: "rgba(15, 17, 22, 0.6)",
                            backdropFilter: "blur(15px)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                          }}
                        >
                          <div className="w-6 h-6 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full flex items-center justify-center text-black text-xs font-bold shadow-md shadow-[#F07730]/20">
                            ₹
                          </div>
                          <span className="text-white font-medium">INR</span>
                          <svg
                            className="w-4 h-4 text-gray-400"
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
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-[#F07730] to-[#EFD28E] hover:from-[#F07730]/90 hover:to-[#EFD28E]/90 text-black py-4 px-6 rounded-lg font-bold transition-all shadow-lg shadow-[#F07730]/30"
                    >
                      Buy {selectedCoin?.symbol || "SOL"}
                    </motion.button>
                  </motion.div>
                )}

                {activeTab === "settings" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6"
                  >
                    {/* Settings toggles with glass cards */}
                    <div className="space-y-4 mb-6">
                      <div
                        className="flex items-center justify-between p-4 rounded-lg"
                        style={{
                          background: "rgba(255, 255, 255, 0.03)",
                          backdropFilter: "blur(15px)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                        }}
                      >
                        <div>
                          <h4 className="text-white font-medium">
                            Hide Zero Balances
                          </h4>
                          <p className="text-gray-400 text-sm">
                            Your zero balances won't appear in your wallet
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={hideZeroBalances}
                            onChange={(e) =>
                              setHideZeroBalances(e.target.checked)
                            }
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#F07730] peer-checked:to-[#EFD28E] shadow-inner"></div>
                        </label>
                      </div>

                      <div
                        className="flex items-center justify-between p-4 rounded-lg"
                        style={{
                          background: "rgba(255, 255, 255, 0.03)",
                          backdropFilter: "blur(15px)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                        }}
                      >
                        <div>
                          <h4 className="text-white font-medium">
                            Display Crypto in Fiat
                          </h4>
                          <p className="text-gray-400 text-sm">
                            All bets & transactions will be settled in the
                            crypto equivalent
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={displayCryptoInFiat}
                            onChange={(e) =>
                              setDisplayCryptoInFiat(e.target.checked)
                            }
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#F07730] peer-checked:to-[#EFD28E] shadow-inner"></div>
                        </label>
                      </div>
                    </div>

                    {/* Currency Selection with glass effect */}
                    <div className="grid grid-cols-4 gap-3 mb-6">
                      {fiatCurrencies.map((currency) => (
                        <motion.button
                          key={currency.code}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedFiatCurrency(currency.code)}
                          className={`flex items-center gap-2 p-3 rounded-lg transition-all ${
                            selectedFiatCurrency === currency.code ? "" : ""
                          }`}
                          style={
                            selectedFiatCurrency === currency.code
                              ? {
                                  background:
                                    "linear-gradient(135deg, rgba(240, 119, 48, 0.2) 0%, rgba(239, 210, 142, 0.2) 100%)",
                                  border: "2px solid #F07730",
                                  backdropFilter: "blur(10px)",
                                }
                              : {
                                  background: "rgba(255, 255, 255, 0.05)",
                                  border: "2px solid transparent",
                                  backdropFilter: "blur(10px)",
                                }
                          }
                          onMouseEnter={(e) => {
                            if (selectedFiatCurrency !== currency.code) {
                              e.currentTarget.style.background =
                                "rgba(255, 255, 255, 0.08)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedFiatCurrency !== currency.code) {
                              e.currentTarget.style.background =
                                "rgba(255, 255, 255, 0.05)";
                            }
                          }}
                        >
                          <div className="relative">
                            <div
                              className={`w-5 h-5 rounded-full border-2 ${
                                selectedFiatCurrency === currency.code
                                  ? "border-[#F07730]"
                                  : "border-gray-500"
                              }`}
                            >
                              {selectedFiatCurrency === currency.code && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#F07730] to-[#EFD28E]"></div>
                                </div>
                              )}
                            </div>
                          </div>
                          <span className="text-white text-sm font-medium">
                            {currency.code}
                          </span>
                          <div className="w-5 h-5 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full flex items-center justify-center text-black text-xs shadow-md shadow-[#F07730]/20">
                            {currency.symbol}
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    {/* 2FA Card with enhanced glass */}
                    <div
                      className="rounded-lg p-4"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(240, 119, 48, 0.1) 0%, rgba(240, 119, 48, 0.05) 100%)",
                        backdropFilter: "blur(15px)",
                        border: "1px solid rgba(240, 119, 48, 0.3)",
                        boxShadow: "0 4px 20px rgba(240, 119, 48, 0.1)",
                      }}
                    >
                      <p className="text-gray-300 mb-4">
                        Improve your account security with Two-Factor
                        Authentication
                      </p>
                      <button className="w-full bg-gradient-to-r from-[#F07730] to-[#EFD28E] hover:from-[#F07730]/90 hover:to-[#EFD28E]/90 text-black py-3 px-4 rounded-lg font-medium transition-all shadow-lg shadow-[#F07730]/30">
                        Enable 2FA
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          <WithdrawProcessingPopup
            isOpen={showProcessingPopup}
            onClose={() => setShowProcessingPopup(false)}
            withdrawalData={{
              amount: withdrawAmount,
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

          {renderDepositModal()}
          {renderWithdrawModal()}
        </>
      )}
    </AnimatePresence>
  );
};

export default WalletModal;
