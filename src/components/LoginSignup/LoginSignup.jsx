// src/components/LoginSignup/LoginSignup.jsx - Final Updated Version
import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import api from "../../api/axios";
import axios from "axios";
import { Link } from "react-router-dom";
import bs58 from "bs58";
import TwoFactorLoginPopup from "../settings/TwoFactorLoginPopup";

const validateUsername = (username = "") => {
  const uname = String(username).trim();

  // 1️⃣ Must start with a letter
  if (!/^[A-Za-z]/.test(uname)) {
    return "Username must start with a letter.";
  }

  // 2️⃣ Allowed characters + length 3–15
  if (!/^[A-Za-z][A-Za-z0-9._-]{2,14}$/.test(uname)) {
    return "Username must be 3–15 characters and may include letters, numbers, underscores, dots, or hyphens.";
  }

  // 3️⃣ No double special chars
  if (/(\.\.|__|--)/.test(uname)) {
    return "Username cannot contain repeating special characters like '..', '__', '--'.";
  }

  // 4️⃣ Cannot end with special character
  if (/[\._-]$/.test(uname)) {
    return "Username cannot end with a special character.";
  }

  // 5️⃣ Cannot be only numbers
  if (/^\d+$/.test(uname)) {
    return "Username cannot be only numbers.";
  }

  // 6️⃣ No emojis (UTF-16 range)
  if (/[\u{1F600}-\u{1F6FF}]/u.test(uname)) {
    return "Username cannot contain emojis.";
  }

  return null; // VALID
};

const validatePassword = (password) => {
  const lengthCheck = password.length >= 8 && password.length <= 16;
  const upperCheck = /[A-Z]/.test(password);
  const lowerCheck = /[a-z]/.test(password);
  const numberCheck = /[0-9]/.test(password);
  const symbolCheck = /[^A-Za-z0-9]/.test(password);

  return {
    isValid:
      lengthCheck && upperCheck && lowerCheck && numberCheck && symbolCheck,
    lengthCheck,
    upperCheck,
    lowerCheck,
    numberCheck,
    symbolCheck,
  };
};

const WalletIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="23"
    viewBox="0 0 24 23"
    fill="none"
  >
    <g filter="url(#filter0_d_9409_572)">
      <path
        d="M17.4646 3C17.9974 3.0001 18.4286 3.45689 18.4287 4.01981C18.4287 4.58278 17.9974 5.03951 17.4646 5.03961H5.5713C5.21715 5.03967 4.9283 5.34453 4.92824 5.71981C4.92824 6.09513 5.21712 6.39995 5.5713 6.4H19.3928C20.2787 6.4 21 7.16229 21 8.1V9.8H17.7856C16.0134 9.8001 14.5713 11.3253 14.5713 13.2C14.5714 15.0746 16.0134 16.5999 17.7856 16.6H21V18.3C20.9999 19.2376 20.2786 20 19.3928 20H5.5713C4.1533 19.9999 3.00019 18.7801 3 17.2802C3 17.2802 3 5.73001 3 5.71981C3.00005 4.21982 4.15321 3.00005 5.5713 3H17.4646Z"
        fill="white"
      />
      <path
        d="M21 15.2396H17.7856C16.7206 15.2395 15.8575 14.3266 15.8574 13.2C15.8574 12.0733 16.7205 11.1595 17.7856 11.1594H21V15.2396Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_9409_572"
        x="0"
        y="0"
        width="24"
        height="23"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
          result="effect1_dropShadow_9409_572"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_9409_572"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

const LoginSignup = ({
  isOpen,
  onClose,
  defaultTab = "login",
  onLoginSuccess,
  onSignupSuccess,
  onForgotPasswordSuccess,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [showReferralCode, setShowReferralCode] = useState(false);
  const [recoverySent, setRecoverySent] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [walletLoading, setWalletLoading] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFARequired, setTwoFARequired] = useState(false);
  const [twoFAUserId, setTwoFAUserId] = useState(null);

  // Form state
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    referral: "",
    agreeTerms: false,
    agreeMarketing: false,
  });
  useEffect(() => {
    const storedRef = localStorage.getItem("referral_code");
    if (storedRef && activeTab === "register") {
      setSignupData((prev) => ({ ...prev, referral: storedRef }));
    }
  }, [activeTab]);

  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: "",
  });

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

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

  const signMessageUnified = async (provider, message) => {
    const encoded = new TextEncoder().encode(message);

    // 1️⃣ Backpack
    if (provider.isBackpack && provider.signMessage) {
      const result = await provider.signMessage(encoded);

      const bytes =
        result?.signature || // Backpack returns { signature: Uint8Array }
        result; // Fallback

      if (!(bytes instanceof Uint8Array)) {
        throw new Error("Backpack: Invalid signature format");
      }

      return bs58.encode(bytes);
    }

    // 2️⃣ Phantom (returns { signature: Uint8Array })
    if (provider.isPhantom && provider.signMessage) {
      const signed = await provider.signMessage(encoded, "utf8");
      return bs58.encode(signed.signature);
    }

    // 3️⃣ Solflare (returns Uint8Array)
    if (provider.isSolflare && provider.signMessage) {
      const signed = await provider.signMessage(encoded);
      return bs58.encode(signed);
    }

    throw new Error("Wallet does not support message signing");
  };

  const getWalletAddress = (provider) => {
    if (!provider.publicKey) throw new Error("Wallet has no public key");

    // Backpack → publicKey is already a string
    if (typeof provider.publicKey === "string") {
      return provider.publicKey;
    }

    // Phantom/Solflare → PublicKey object
    return provider.publicKey.toString();
  };

  const detectAvailableWallets = () => {
    const wallets = [];

    if (window.phantom?.solana?.isPhantom) wallets.push("phantom");
    if (window.backpack?.solana?.isBackpack) wallets.push("backpack");
    if (window.solflare?.isSolflare) wallets.push("solflare");

    return wallets;
  };

  const WalletSelectModal = ({ open, onClose, onSelect }) => {
    if (!open) return null;

    // Detect installed wallets
    const phantomInstalled = !!window.phantom?.solana?.isPhantom;
    const backpackInstalled = !!window.backpack?.solana?.isBackpack;
    const solflareInstalled = !!window.solflare?.isSolflare;

    // Static list (always show)
    const walletOptions = [
      {
        id: "phantom",
        name: "Phantom",
        icon: "/wallets/phantom.svg",
        installed: phantomInstalled,
      },
      {
        id: "backpack",
        name: "Backpack",
        icon: "/wallets/backpack.svg",
        installed: backpackInstalled,
      },
      {
        id: "solflare",
        name: "Solflare",
        icon: "/wallets/solflare.svg",
        installed: solflareInstalled,
      },
    ];

    // Phantom extension link (Chrome)
    const phantomInstallUrl =
      "https://chrome.google.com/webstore/detail/phantom-wallet/bfnaelmomeimhlpmgjnjophhpkkoljpa";

    return (
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-[6px] flex justify-center items-center z-[999999]"
        onClick={onClose}
      >
        <div
          className="rounded-2xl p-6 w-[360px] sm:w-[400px] relative"
          style={{
            background:
              "linear-gradient(180deg, rgba(28,29,73,0.85) 0%, rgba(20,21,60,0.90) 100%)",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow:
              "0 0 20px rgba(0,0,0,0.4), inset 0 0 15px rgba(255,255,255,0.05)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <p className="text-white text-lg font-semibold mb-4 tracking-wide">
            Select Wallet
          </p>

          {/* Wallet Buttons */}
          <div className="flex flex-col gap-3">
            {walletOptions.map((w) => (
              <button
                key={w.id}
                onClick={() =>
                  w.installed ? onSelect(w.id) : window.open(phantomInstallUrl)
                }
                className="group flex items-center justify-between p-3 rounded-xl transition-all duration-200"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg overflow-hidden bg-[#1C1D49] flex items-center justify-center">
                    <img
                      src={w.icon}
                      alt={w.name}
                      className="w-7 h-7 object-contain"
                    />
                  </div>

                  <span className="text-white font-medium text-sm tracking-wide group-hover:text-[#FFB8A1] transition-colors">
                    {w.name}
                  </span>
                </div>

                {!w.installed ? (
                  <span className="text-[#FFB8A1] text-xs font-semibold group-hover:opacity-80">
                    Install
                  </span>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-[#9292D2] group-hover:text-white transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* Cancel Button */}
          <button
            className="mt-5 w-full py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.03) 100%)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (walletModalOpen) {
      const available = detectAvailableWallets();
      console.log("Detected wallets:", available);
    }
  }, [walletModalOpen]);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleForgotPasswordChange = (e) => {
    const { name, value } = e.target;
    setForgotPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const validTlds = [
    "com",
    "net",
    "org",
    "io",
    "ai",
    "app",
    "co",
    "in",
    "uk",
    "us",
    "dev",
    "info",
    "xyz",
    "cloud",
    "store",
    "online",
    "casino",
  ];

  const validateEmail = (email) => {
    if (!email) return false;

    const lower = email.toLowerCase().trim();

    // Basic check
    const basicRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!basicRegex.test(lower)) return false;

    // Extract TLD
    const tld = lower.split(".").pop();
    return validTlds.includes(tld);
  };

  const isCommonGmailTypo = (email) => {
    const lower = email.toLowerCase();

    const mistakes = [
      "gamil.com",
      "gmial.com",
      "gmail.con",
      "gmail.co",
      "gmail.cim",
      "gmaill.com",
    ];

    return mistakes.some((typo) => lower.endsWith(typo));
  };

  const handleLoginSubmit = async () => {
    const { email, password } = loginData;

    // 1️⃣ Empty fields
    if (!email && !password) {
      toast.error("Please enter email and password.");
      return;
    }
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    // 2️⃣ Invalid email format
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // 3️⃣ Password format validation BEFORE request
    const pass = validatePassword(password);
    if (!pass.isValid) {
      toast.error(
        "Password must be 8–16 characters and include uppercase, lowercase, number and special character."
      );
      return;
    }

    setLoginLoading(true);

    try {
      const { data } = await axios.post(
        "/auth-service/api/auth/login",
        loginData
      );

      setLoginLoading(false);

      // CASE 1 → 2FA Enabled
      if (data.requires2FA === true) {
        console.log("2FA REQUIRED FOR USER:", data.userId);

        setTwoFAUserId(data.userId);
        setTwoFARequired(true); // OPEN THE POPUP

        toast.info("Enter the 6-digit code from your Authenticator App.");
        return;
      }

      // CASE 2 → Normal login
      if (data.token) {
        localStorage.setItem("token", data.token);

        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data.user._id,
            username: data.user.username,
            email: data.user.email,
            isTwoFactorEnabled: data.user.isTwoFactorEnabled || false,
          })
        );

        toast.success("You have logged in successfully!");
        if (onLoginSuccess) onLoginSuccess(data);
        return;
      }

      toast.error(data.message || "Unable to log in.");
    } catch (err) {
      setLoginLoading(false);

      // FIX: check both message AND error fields
      const message = (
        err.response?.data?.message ||
        err.response?.data?.error ||
        ""
      ).toLowerCase();

      console.log("LOGIN ERROR RECEIVED:", message);

      // Email not registered
      if (message.includes("user not found")) {
        toast.error("This email is not registered.");
        return;
      }

      // Password incorrect
      if (
        message.includes("invalid password") ||
        message.includes("incorrect password")
      ) {
        toast.error("Incorrect password.");
        return;
      }

      // Generic invalid credentials
      if (message.includes("invalid credentials")) {
        toast.error("Invalid email or password.");
        return;
      }

      // Fallback
      toast.error("Invalid Email or Password. Please try again.");
    }
  };

  const handleSignupSubmit = async () => {
    const { email, username, password, confirmPassword, agreeTerms } =
      signupData;

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    if (isCommonGmailTypo(email)) {
      toast.error("Did you mean '@gmail.com'? Please correct your email.");
      return;
    }

    const usernameError = validateUsername(username);
    if (usernameError) {
      toast.error(usernameError, {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const pass = validatePassword(password);

    if (!pass.isValid) {
      toast.error(
        "Password must be 8-16 characters and include uppercase, lowercase, number and special characters(_ . - )."
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!agreeTerms) {
      toast.error("You must agree to the Terms and confirm you're 18+.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    setSignupLoading(true);

    try {
      const { data } = await axios.post(
        "/auth-service/api/auth/register",
        signupData
      );

      toast.success("Account created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      localStorage.removeItem("referral_code");

      setTimeout(() => {
        setSignupLoading(false);
        if (onSignupSuccess) onSignupSuccess(data);
      }, 500);
    } catch (err) {
      setSignupLoading(false);
      console.error("Signup error:", err);
      toast.error(
        err.response?.data?.message ||
          "This email is already registered. Please log in or use a different email.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  const handleForgotPasswordSubmit = async () => {
    const { email } = forgotPasswordData;

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      // Disable button while sending
      setRecoverySent("loading");

      const { data } = await axios.post(
        "/auth-service/api/auth/forgot-password",
        { email }
      );

      toast.success(data.message || "Recovery email sent");

      // Show success block
      setRecoverySent(true);

      if (onForgotPasswordSuccess) onForgotPasswordSuccess(data);
    } catch (err) {
      console.error("Forgot Password Error:", err);

      toast.error(
        err.response?.data?.error || "Unable to send recovery email. Try again."
      );

      setRecoverySent(false);
    }
  };

  const handleBackToLogin = () => {
    setActiveTab("login");
    setRecoverySent(false);
    setForgotPasswordData({ email: "" });
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;

      const decoded = jwtDecode(credential);
      console.log("Google decoded:", decoded);

      const { data } = await axios.post("/auth-service/api/auth/google", {
        token: credential,
      });

      if (data?.token) {
        // 1️⃣ Store token
        localStorage.setItem("token", data.token);

        // 2️⃣ MASK EMAIL BEFORE SAVING ANYWHERE
        const maskedEmail = data.user.email?.replace(
          /(.{2}).+(@.+)/,
          (m, p1, p2) => p1 + "*****" + p2
        );

        const safeUser = {
          id: data.user._id,
          username: data.user.username || "Player",
          email: maskedEmail,
          avatar: data.user.avatar || null,
          provider: "google",
        };

        localStorage.setItem("user", JSON.stringify(safeUser));
        window.dispatchEvent(new Event("tokenChanged"));

        toast.success("Signed in with Google!");

        if (onLoginSuccess) onLoginSuccess(data);
      }
    } catch (err) {
      console.error("Google login failed:", err);
      toast.error("Google login failed");
    }
  };

  const handleWalletLogin = async (provider) => {
    setWalletLoading(true);
    try {
      if (!provider) {
        toast.error("No Solana wallet detected.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      // 1️⃣ CONNECT WALLET
      let resp;
      try {
        resp = await provider.connect();
      } catch (err) {
        console.error("❌ Wallet connection error:", err);

        if (err?.message?.includes("User rejected")) {
          toast.error("Wallet connection rejected by user.");
        } else {
          toast.error("Unable to connect to wallet.");
        }
        return;
      }

      const walletAddress = getWalletAddress(provider);
      if (!walletAddress) {
        toast.error("Unable to read wallet address.");
        return;
      }

      console.log("🔌 Wallet connected:", walletAddress);

      // 2️⃣ GET nonce
      let nonceRes;
      try {
        nonceRes = await axios.post("/auth-service/api/auth/wallet/nonce", {
          walletAddress,
        });
        setWalletLoading(true);
      } catch (err) {
        console.error("nonce error:", err);
        toast.error("Failed to get login nonce. Try again.");
        return;
      }

      if (!nonceRes.data?.success) {
        toast.error(nonceRes.data?.error || "nonce generation failed.");
        return;
      }

      const message = nonceRes.data.message;

      // 3️⃣ SIGN MESSAGE
      let signature;
      try {
        signature = await signMessageUnified(provider, message);
        setWalletLoading(true);
      } catch (err) {
        console.error("❌ Signature Error:", err);

        if (err.message.includes("User rejected")) {
          toast.error("Message signing cancelled.");
        } else {
          toast.error("Failed to sign message.");
        }
        return;
      }

      // 4️⃣ VERIFY WITH BACKEND
      let verifyRes;
      try {
        verifyRes = await axios.post("/auth-service/api/auth/wallet/verify", {
          walletAddress,
          signature,
          message,
          walletType: "solana",
        });
        setWalletLoading(true);
      } catch (err) {
        console.error("Verify error:", err);
        toast.error(
          err.response?.data?.error ||
            err.response?.data?.message ||
            "Wallet verification failed."
        );
        return;
      }

      if (!verifyRes.data?.success) {
        toast.error(verifyRes.data?.error || "Authentication failed.");
        return;
      }

      // 5️⃣ SAVE USER DATA
      const user = verifyRes.data?.user || verifyRes.data?.data?.user;
      const token = verifyRes.data?.token || verifyRes.data?.data?.token;

      if (!user || !token) {
        toast.error("Invalid response from wallet server.");
        console.error("Wallet verify response:", verifyRes.data);
        return;
      }

      localStorage.setItem("token", token);
      window.dispatchEvent(new Event("tokenChanged"));

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: user._id,
          username: user.username,
          email: user.email,
          kycStatus: user.kycStatus,
        })
      );

      toast.success("Wallet logged in successfully!", {
        position: "top-right",
      });
      setWalletLoading(true);
      onClose();
      if (onLoginSuccess) onLoginSuccess(verifyRes.data);
    } catch (err) {
      console.error("Wallet login catch error:", err);

      toast.error(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          err.message ||
          "Wallet login failed."
      );
    }
  };

  const handleWalletProviderSelect = async (walletId) => {
    setWalletModalOpen(false);

    let provider = null;

    if (walletId === "phantom") provider = window.phantom?.solana;
    if (walletId === "backpack") provider = window.backpack?.solana;
    if (walletId === "solflare") provider = window.solflare;

    // ❌ Wallet not installed
    if (!provider) {
      toast.error(`Please install ${walletId} wallet first.`, {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // ❌ Prevents crashing in case wallet is locked or blocked
    if (provider.isConnected === false && provider.connect == null) {
      toast.error(`${walletId} wallet cannot connect. Please try again.`, {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    handleWalletLogin(provider);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-2"
      style={{
        backgroundColor: "rgba(13, 14, 54, 0.30)",
        backdropFilter: "blur(25px)",
        WebkitBackdropFilter: "blur(25px)",
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (!walletLoading && !loginLoading && !signupLoading) onClose();
      }}
    >
      {/* Main Container */}
      <div
        className="relative rounded-lg overflow-hidden w-full flex flex-col h-[90vh] max-h-[90vh] min-h-[70vh]"
        style={{ maxWidth: "850px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ========== NEW TOP HEADER BAR ========== */}

        {/* ========== END TOP HEADER BAR ========== */}

        {/* Split Layout - Responsive */}
        <div className="flex flex-col md:flex-row flex-1 min-h-0 max-h-[90vh]">
          {/* Left Side - Image Background (Hidden on mobile) */}
          <div
            className="hidden md:block md:w-[40%] relative"
            style={{
              backgroundImage: "url('/home-assets/login-left.svg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundBlendMode: "overlay",
            }}
          >
            <div className=" flex justify-center mt-14">
              <a class="flex items-center" href="/" data-discover="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="153"
                  height="18"
                  viewBox="0 0 153 18"
                  fill="none"
                >
                  <path
                    d="M48.0696 6.96387C48.6926 0.817612 55.4001 -1.95472 59.9065 1.84863C68.8808 9.42572 58.3734 22.5881 50.6077 15.6895C46.6908 12.2092 42.9565 0.519215 36.4856 4.21191C30.4252 7.67124 34.3001 17.1374 40.7473 14.6953C42.4245 14.0599 43.606 12.5147 45.0833 11.5146L45.0852 11.5137C43.4725 17.9504 36.1112 20.3601 31.7581 15.2051C25.0324 7.23926 34.6868 -3.91872 42.1877 2.41699C46.0955 5.71764 50.6683 19.0446 57.1038 13.7881C62.7924 9.14051 56.8705 0.324447 51.1038 4.08105C49.9693 4.82004 49.1036 6.09383 48.0696 6.96387ZM97.7395 0C105.629 1.77283e-05 108.37 1.32706 108.37 5.04492C108.37 6.81354 107.926 8.02067 106.722 8.80371C108.019 9.5471 108.758 10.834 108.758 12.4629C108.758 16.261 105.924 17.5878 97.887 17.5879C95.4426 17.5879 91.5711 17.2059 89.4036 16.8447C89.1804 16.8051 89.0696 16.6642 89.0696 16.4033H89.0706V1.24707C89.0706 1.00588 89.1813 0.864284 89.4045 0.803711C91.5528 0.421566 95.3499 0 97.7395 0ZM123.153 0C125.56 9.78498e-06 127.357 0.221682 128.783 0.523438C128.987 0.563163 129.098 0.703838 129.154 0.905273L129.562 2.93457C129.636 3.23623 129.525 3.35632 129.247 3.2959C127.377 2.93466 124.635 2.79395 123.115 2.79395C117.096 2.79401 114.967 4.08046 114.559 7.45801H129.061C129.283 7.45801 129.413 7.59894 129.413 7.83984V9.58887C129.413 9.84988 129.283 9.97168 129.061 9.97168H114.522C114.929 13.4086 117.041 14.7148 123.115 14.7148C124.635 14.7148 127.376 14.5543 129.247 14.2129C129.525 14.1327 129.636 14.2732 129.562 14.5537L129.154 16.584C129.117 16.8052 129.005 16.9248 128.802 16.9854C127.375 17.2871 125.56 17.5283 123.153 17.5283C114.504 17.5283 111.318 14.5933 111.336 8.74414C111.318 2.95473 114.504 0 123.153 0ZM70.1223 0C72.8072 1.42967e-05 74.3442 1.30616 75.5852 4.74414C75.6958 5.16595 76.5303 7.41892 77.8079 11.1777C78.7332 13.8711 79.2894 14.5947 80.512 14.5947C81.6231 14.5947 82.1233 13.6091 82.1233 11.3184V0.623047C82.1234 0.362279 82.2342 0.241246 82.4563 0.241211H84.7346C84.9567 0.241261 85.0851 0.361196 85.0852 0.623047V12.7441C85.0852 15.5182 83.3455 17.5086 80.8079 17.5088C78.1219 17.5088 76.6036 16.2023 75.3625 12.7441C75.2516 12.3215 74.3614 9.88862 73.1399 6.33105C72.2318 3.6376 71.6572 2.91406 70.4172 2.91406C69.3063 2.91426 68.8059 3.91869 68.8059 6.19043L68.8254 16.8848V16.8857C68.8254 17.1466 68.7143 17.2676 68.4729 17.2676H66.1956C65.9734 17.2676 65.8626 17.1477 65.8625 16.8857V4.74414C65.8627 1.95028 67.6038 0 70.1223 0ZM6.39282 0C8.31856 0.000146321 9.59718 1.06616 10.4485 3.39746C11.3739 5.88975 11.5955 9.1678 12.2815 10.9365C12.5778 11.7205 12.9673 12.2031 13.5598 12.2031H14.0042C14.5966 12.203 15.0037 11.7204 15.301 10.9365C15.986 9.1678 16.2083 5.89085 17.1155 3.39746C17.9871 1.06611 19.2654 0 21.1731 0H21.8958C24.5258 7.3913e-05 26.0816 1.64905 26.3596 4.52344L27.5637 16.9062L27.5627 16.9053C27.581 17.1464 27.4889 17.287 27.2668 17.2871H24.97C24.7296 17.287 24.5985 17.1464 24.5813 16.9053L23.5627 5.84863C23.377 3.73886 22.8026 2.89453 21.7473 2.89453H21.2102C20.4321 2.89473 19.8768 3.43794 19.47 4.70312C18.8592 6.65361 18.6176 9.80895 17.7288 12.1006C17.0255 13.9704 15.9506 15.1357 14.2288 15.1357H13.3401C11.6366 15.1356 10.5619 13.9693 9.85767 12.1006C8.96881 9.80887 8.72797 6.65359 8.0979 4.70312C7.70927 3.43664 7.15351 2.89456 6.37524 2.89453H5.82056C4.7643 2.89453 4.20913 3.73888 4.00513 5.84863L3.00415 16.9053C2.98589 17.1465 2.83771 17.2871 2.61548 17.2871H0.317627C0.0771409 17.2871 -0.0160615 17.1465 0.00219727 16.9053L1.2063 4.52344C1.48434 1.64899 3.05925 0 5.67017 0H6.39282ZM152.272 0.242188C152.475 0.242355 152.586 0.362774 152.642 0.583984L152.993 2.6543C153.03 2.93606 152.939 3.07603 152.661 3.07617H143.808V16.8652H143.806C143.806 17.1262 143.696 17.248 143.455 17.248H141.196C140.972 17.248 140.843 17.1273 140.843 16.8652V3.07617H131.99C131.713 3.07609 131.619 2.93494 131.656 2.6543L132.009 0.583984C132.046 0.362718 132.176 0.242295 132.379 0.242188H152.272ZM103.889 9.70801C102.556 9.9492 100.832 10.0498 98.6096 10.0498H92.0159V14.4932C93.7389 14.7344 96.1659 14.8545 97.4993 14.8545C104.074 14.8545 105.649 14.3117 105.649 12.1006C105.649 10.7945 105.13 10.0494 103.889 9.70801ZM97.3323 2.75488C95.7026 2.75489 93.4984 2.91565 92.0159 3.11719V7.7793H98.2209C103.944 7.7793 105.26 7.33777 105.26 5.28711C105.26 3.23673 103.758 2.75488 97.3323 2.75488Z"
                    fill="white"
                    fill-opacity="0.9"
                  ></path>
                </svg>
              </a>
            </div>
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

            {/* Bottom content */}
            <div className="absolute text-center inset-x-0 bottom-0 px-5 pb-7 lg:px-7 lg:pb-9">
              <p className="text-white text-sm lg:text-xl font-medium leading-snug">
                200% Deposit Bonus
              </p>
              <p className="text-white text-xl lg:text-3xl font-semibold leading-snug">
                Upto $100,000
              </p>
            </div>
          </div>

          {/* Right Side - Form with specified background */}
          <div
            className="
    flex-1 
    p-6 sm:p-8 md:p-10 
    flex flex-col 
    justify-start 
    overflow-y-auto 
    min-h-0 h-full max-h-full
    scrollbar-thin 
    scrollbar-thumb-[#ffb8a1]/40
    backdrop-blur-2xl
  "
            style={{
              background:
                "linear-gradient(137deg, rgb(201 201 201 / 26%) 1.57%, rgba(196, 196, 196, 0.1) 100%)",
            }}
          >
            {/* Mobile Logo (shown only on mobile) - HIDDEN since we have header now */}
            <div className="hidden">
              {/* <h1 className="text-2xl font-bold text-white tracking-wider text-center">
                MOONBET
              </h1> */}
            </div>

            {/* Tabs */}
            {activeTab !== "forgot" && (
              <div className="flex overflow-y-auto mb-6 md:mb-8 justify-between  ">
                <div className="flex border-b border-white/10 w-60">
                  <button
                    onClick={() => setActiveTab("login")}
                    className={`flex-1 pb-3 font-bold transition-all relative ${
                      activeTab === "login"
                        ? "text-[#E1E1E1]"
                        : "hover:text-gray-300"
                    }`}
                  >
                    Login
                    {activeTab === "login" && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[linear-gradient(0deg,#a62a00_0%,#ffb8a1_100%)]"></div>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("register")}
                    className={`flex-1 pb-3 font-bold transition-all relative ${
                      activeTab === "register"
                        ? "text-[#E1E1E1]"
                        : "hover:text-gray-300"
                    }`}
                  >
                    Register
                    {activeTab === "register" && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[linear-gradient(0deg,#a62a00_0%,#ffb8a1_100%)]"></div>
                    )}
                  </button>
                </div>

                <button
                  disabled={walletLoading || loginLoading || signupLoading}
                  onClick={() => {
                    if (!walletLoading && !loginLoading && !signupLoading)
                      onClose();
                  }}
                  className="flex items-center justify-end transition-all hover:opacity-80 relative z-10"
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
            )}

            {/* Content */}
            <AnimatePresence mode="wait">
              {activeTab === "login" ? (
                <motion.div
                  key="login"
                  className="flex-1 overflow-y-auto min-h-0 pr-1 scrollbar-thin scrollbar-thumb-[#ffb8a1]/40"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="space-y-4 ml-1">
                    {/* Email Address Field */}
                    <div>
                      <label className="text-xs tracking-wider mb-2 block">
                        Email Address
                      </label>
                      <div className="trust_btn">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        className=" trust_btn w-full px-4 py-3 rounded-md text-white placeholder-white/50 focus:outline-none focus:border-[#ffb8a1] focus:ring-1 focus:ring-[#ffb8a1] transition-all"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                          backdropFilter: "blur(20px)",
                        }}
                      />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div>
                      <label className="text-xs tracking-wider mb-2 block">
                        Password
                      </label>
                      <div className="relative trust_btn">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Password"
                          value={loginData.password}
                          onChange={handleLoginChange}
                          className="w-full px-4 py-3 pr-12 rounded-md text-white placeholder-white/50 focus:outline-none focus:border-[#ffb8a1] focus:ring-1 focus:ring-[#ffb8a1] transition-all"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                            backdropFilter: "blur(20px)",
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:opacity-80 transition-opacity"
                        >
                          {showPassword ? (
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="var(--cta-pink)"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.878 9.878a3 3 0 014.243 4.243"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.878 9.878L6.59 6.59M9.878 9.878l4.242 4.242M17.41 17.41L21 21M3 3l3.59 3.59a9.953 9.953 0 015.41-1.59c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="var(--cta-pink)"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Forgot Password Link */}
                    <div className="text-right">
                      <button
                        onClick={() => setActiveTab("forgot")}
                        className="text-sm text-white-90 hover:text-[#ffb8a1] transition-colors"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    {/* Sign In Button with gradient */}
                    <button
                      onClick={handleLoginSubmit}
                      className="w-full py-3 rounded-[12px] font-semibold text-white custom-btn  hover:opacity-90 shadow-xl transition-all"
                    >
                      Sign In
                    </button>

                    {/* OR Divider */}
                    <div className="relative my-6">
                      <div className="flex items-center">
                        {/* Left Border */}
                        <div className="flex-grow border-t border-[rgba(255, 255, 255, 0.20)]"></div>

                        {/* OR Text */}
                        <span className="px-3 text-xs uppercase text-white bg-transparent tracking-wider">
                          OR
                        </span>

                        {/* Right Border */}
                        <div className="flex-grow border-t border-[rgba(255, 255, 255, 0.20)]"></div>
                      </div>
                    </div>
                    {/* Social Login Buttons - Responsive */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Google Login */}
                      <div className="w-full flex justify-center sm:justify-start">
                        <div className="w-full">
                          <GoogleLogin
                            onSuccess={handleGoogleLogin}
                            onError={() => toast.error("Google Sign-In failed")}
                            theme="outline"
                            width="100%"
                            useOneTap={false}
                            ux_mode="popup"
                            context="use"
                            auto_select={false}
                            promptMomentNotification={() => {}}
                            prompt="select_account"
                          />
                        </div>
                      </div>

                      {/* Connect Wallet Button */}
                      <button
                        onClick={() => setWalletModalOpen(true)}
                        className="
                      w-full 
                          flex items-center justify-center 
                          gap-2 py-2 
                          rounded-lg 
                          transition-all 
                          hover:opacity-90
                        "
                        style={{
                          background:
                            "linear-gradient(180deg, #9292D2 0%, #7171B4 100%)",
                        }}
                      >
                        <WalletIcon />
                        <span className="text-white text-sm font-medium">
                          Connect Wallet
                        </span>
                      </button>
                    </div>

                    {/* Register Link */}
                    <div className="text-center pt-4">
                      <span className="text-sm text-gray-400">
                        Don't have an account?{" "}
                      </span>
                      <button
                        onClick={() => setActiveTab("register")}
                        className="text-sm text-white-90 hover:text-[#ffb8a1] font-medium"
                      >
                        Register Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : activeTab === "register" ? (
                <motion.div
                  key="register"
                  className="flex-1 min-h-0 pr-1 scrollbar-thin scrollbar-thumb-[#ffb8a1]/40"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="space-y-3">
                  <div className="trust_btn">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={signupData.email}
                      onChange={handleSignupChange}
                      className=" trust_btn w-full px-4 py-3 rounded-md text-white placeholder-white/50 focus:outline-none focus:border-[#ffb8a1] focus:ring-1 focus:ring-[#ffb8a1] transition-all"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                        backdropFilter: "blur(20px)",
                      }}
                    />
                  </div>

                    <div className="trust_btn">
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={signupData.username}
                      onChange={handleSignupChange}
                      className="w-full px-4 py-3 rounded-md text-white placeholder-white/50 focus:outline-none focus:border-[#ffb8a1] focus:ring-1 focus:ring-[#ffb8a1] transition-all"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                        backdropFilter: "blur(20px)",
                      }}
                    />
                    </div>

                    {/* Password Field */}
                    <div className="trust_btn relative">
                      <input
                        type={showSignupPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={signupData.password}
                        onChange={handleSignupChange}
                        className="w-full px-4 py-3 pr-12 rounded-md text-white placeholder-white/50 focus:outline-none focus:border-[#ffb8a1] focus:ring-1 focus:ring-[#ffb8a1] transition-all"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                          backdropFilter: "blur(20px)",
                        }}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowSignupPassword(!showSignupPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:opacity-80 transition-opacity"
                      >
                        {showSignupPassword ? (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="var(--cta-pink)"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.878 9.878a3 3 0 014.243 4.243"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.878 9.878L6.59 6.59M9.878 9.878l4.242 4.242M17.41 17.41L21 21M3 3l3.59 3.59a9.953 9.953 0 015.41-1.59c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="var(--cta-pink)"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="trust_btn relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={signupData.confirmPassword}
                        onChange={handleSignupChange}
                        className="w-full px-4 py-3 pr-12 rounded-md text-white placeholder-white/50 focus:outline-none focus:border-[#ffb8a1] focus:ring-1 focus:ring-[#ffb8a1] transition-all"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                          backdropFilter: "blur(20px)",
                        }}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:opacity-80 transition-opacity"
                      >
                        {showConfirmPassword ? (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="var(--cta-pink)"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.878 9.878a3 3 0 014.243 4.243"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.878 9.878L6.59 6.59M9.878 9.878l4.242 4.242M17.41 17.41L21 21M3 3l3.59 3.59a9.953 9.953 0 015.41-1.59c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="var(--cta-pink)"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>

                    <div className="trust_btn">
                    <input
                      type="text"
                      name="referral"
                      placeholder="Have a referral code?"
                      value={signupData.referral}
                      onChange={handleSignupChange}
                      className="w-full px-4 py-3 rounded-md text-white placeholder-white/50 focus:outline-none focus:border-[#ffb8a1] focus:ring-1 focus:ring-[#ffb8a1] transition-all"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                        backdropFilter: "blur(20px)",
                      }}
                    />
                    </div>
                    <div className="space-y-2 pt-1">
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          checked={signupData.agreeTerms}
                          onChange={handleSignupChange}
                          className="mt-0.5 w-4 h-4 rounded border-[#3a3d4a] bg-white checked:bg-transparent accent-[#ffb8a1]"
                          style={{
                            background: signupData.agreeTerms
                              ? "var(--cta-pink-gradient)"
                              : "#ffffff",
                          }}
                        />
                        <span className="text-xs text-[#E1E1E1]">
                          I agree to the{" "}
                          <a
                            href="/terms-and-condition"
                            className="text-[#E1E1E1] hover:underline"
                            target="_blank"
                          >
                            Terms
                          </a>{" "}
                          and confirm I'm 18+
                        </span>
                      </label>
                      {/* 
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreeMarketing"
                          checked={signupData.agreeMarketing}
                          onChange={handleSignupChange}
                          className="mt-0.5 w-4 h-4 rounded border-[#3a3d4a] bg-white checked:bg-transparent accent-[#ffb8a1]"
                          style={{
                            background: signupData.agreeMarketing
                              ? "var(--cta-pink-gradient)"
                              : "#ffffff",
                          }}
                        />
                        <span className="text-xs text-[#E1E1E1]">
                          Send me promotions
                        </span>
                      </label> */}
                    </div>

                    {/* Create Account Button with gradient */}
                    <button
                      onClick={handleSignupSubmit}
                      className="w-full py-3 mt-2 rounded-[12px] font-semibold text-white custom-btn hover:opacity-90 shadow-xl transition-all"
                    >
                      Create Account
                    </button>

                    {/* OR Divider */}
                    <div className="relative my-6">
                      <div className="flex items-center">
                        {/* Left Border */}
                        <div className="flex-grow border-t border-[rgba(255, 255, 255, 0.20)]"></div>

                        {/* OR Text */}
                        <span className="px-3 text-xs uppercase text-white bg-transparent tracking-wider">
                          OR
                        </span>

                        {/* Right Border */}
                        <div className="flex-grow border-t border-[rgba(255, 255, 255, 0.20)]"></div>
                      </div>
                    </div>

                    {/* Social Login - Stack on mobile */}
                    <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-3">
                      <div className="flex justify-center">
                        {/* Google Login - Register  */}
                        <div className="w-full flex justify-center sm:justify-start">
                          <div className="Register-moonbet w-full">
                            <GoogleLogin
                              onSuccess={handleGoogleLogin}
                              onError={() =>
                                toast.error("Google Sign-In failed")
                              }
                              theme="outline"
                              width="100%"
                              useOneTap={false} // ❗ stops auto-login
                              ux_mode="popup" // ❗ allows choosing account
                              context="use" // ❗ forces Google to re-open account chooser
                              auto_select={false}
                              promptMomentNotification={() => {}}
                              prompt="select_account"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Connect Wallet Button */}
                      <button
                        onClick={() => setWalletModalOpen(true)}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg transition-all w-full hover:opacity-90"
                        style={{
                          background:
                            "linear-gradient(180deg, #9292D2 0%, #7171B4 100%)",

                          backdropFilter: "blur(30px)",
                          WebkitBackdropFilter: "blur(30px)",
                        }}
                      >
                        <WalletIcon />
                        <span className="text-white text-sm font-medium">
                          Connect Wallet
                        </span>
                      </button>
                    </div>

                    {/* Referral Code (Optional) */}
                    {/* <button
                      onClick={() => setShowReferralCode(!showReferralCode)}
                      className="w-full flex items-center justify-between py-2.5 px-4 bg-[#1e2029] hover:bg-[#2a2d3a] border border-[#3a3d4a] rounded-lg transition-all"
                    >
                      <span className="text-gray-400 text-sm">
                        Have a referral code?
                      </span>
                      <svg
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          showReferralCode ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button> */}

                    {/* {showReferralCode && (
                      <div>
                        <input
                          type="text"
                          name="referralCode"
                          placeholder="Enter referral code"
                          value={signupData.referralCode}
                          onChange={handleSignupChange}
                          className="w-full px-4 py-2.5 rounded-md bg-[#1e2029] border border-[#3a3d4a] text-white placeholder-gray-500 focus:outline-none focus:border-[#F07730] transition-all text-sm"
                        />
                      </div>
                    )} */}

                    <div className="text-center pt-2">
                      <span className="text-sm text-gray-400">
                        Already have an account?{" "}
                      </span>
                      <button
                        onClick={() => setActiveTab("login")}
                        className="text-sm text-white-90 hover:text-[#ffb8a1] font-medium"
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                // Forgot Password Form
                <motion.div
                  key="forgot"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      Recover Account
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {recoverySent
                        ? "Check your email for recovery instructions"
                        : "Enter your email to reset your password"}
                    </p>
                  </div>

                  {!recoverySent ? (
                    <>
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs text-gray-400 tracking-wider mb-2 block">
                            Username or Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            value={forgotPasswordData.email}
                            onChange={handleForgotPasswordChange}
                            className="w-full px-4 py-3 rounded-md bg-[#1e2029] border border-[#3a3d4a] text-white placeholder-gray-500 focus:outline-none focus:border-[#F07730] transition-all"
                          />
                        </div>

                        <button
                          onClick={handleForgotPasswordSubmit}
                          disabled={recoverySent === "loading"}
                          className={`w-full py-3 rounded-[12px] font-semibold text-black 
                          bg-gradient-to-r from-[#F07730] to-[#EFD28E] 
                          shadow-xl transition-all
                          ${
                            recoverySent === "loading"
                              ? "opacity-60 cursor-not-allowed"
                              : "hover:opacity-90"
                          }
                        `}
                        >
                          {recoverySent === "loading"
                            ? "Sending..."
                            : "Recover Account"}
                        </button>
                      </div>

                      <div className="mt-6 text-center">
                        <button
                          onClick={handleBackToLogin}
                          className="text-sm text-[#F07730] hover:text-[#E06620] transition-colors"
                        >
                          Return to Login
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Success State */}
                      <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-green-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                            >
                              <path
                                d="M5 13l4 4L19 7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <div>
                            <div className="text-green-400 font-semibold mb-1">
                              Success!
                            </div>
                            <div className="text-sm text-gray-300">
                              Password recovery email has been sent to{" "}
                              {forgotPasswordData.email}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 text-sm text-gray-400">
                        <p>Please check your email inbox and spam folder.</p>
                        <p>The recovery link will expire in 24 hours.</p>
                      </div>

                      <button
                        onClick={handleBackToLogin}
                        className="w-full py-3 mt-6 rounded-[12px] font-semibold text-black bg-gradient-to-r from-[#F07730] to-[#EFD28E] hover:opacity-90 shadow-xl transition-all"
                      >
                        Return to Login
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            {(loginLoading || signupLoading) && (
              <div
                className="absolute inset-0 z-[99999] flex flex-col items-center justify-center pointer-events-auto"
                style={{
                  background:
                    "linear-gradient(109deg, rgba(201, 201, 201, 0.80) 1.57%, rgba(196, 196, 196, 0.10) 100%)",
                  backdropFilter: "blur(30px)",
                  WebkitBackdropFilter: "blur(30px)",
                }}
              >
                {/* Animated Loader - Responsive with aspect ratio */}
                <img
                  src="/icons/moonlogo.gif"
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
                  alt="Loading"
                />

                {/* Dynamic Text */}
                <p className="mt-4 text-white text-lg font-medium animate-pulse">
                  {loginLoading ? "Signing In..." : "Creating Account..."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Wallet Selection Modal */}
      <WalletSelectModal
        open={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
        onSelect={handleWalletProviderSelect}
      />
      {walletLoading && (
        <div className="absolute inset-0 z-[99999] bg-black/60 backdrop-blur-md flex flex-col items-center justify-center pointer-events-auto">
          {/* Animated Loader */}
          <img
            src="/icons/moonlogo.gif"
            className="w-28 h-28 animate-pulse"
            alt="Loading"
          />

          {/* Connecting text */}
          <p className="mt-4 text-white text-lg font-medium animate-pulse">
            Connecting to Wallet…
          </p>
        </div>
      )}
      <TwoFactorLoginPopup
        isOpen={twoFARequired}
        userId={twoFAUserId}
        onClose={() => setTwoFARequired(false)}
        onSuccess={(data) => {
          // Close ONLY the popup
          setTwoFARequired(false);

          // Save token and user
          localStorage.setItem("token", data?.token);
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: data?.user?._id,
              username: data?.user?.username,
              email: data?.user?.email,
              isTwoFactorEnabled: true,
            })
          );

          toast.success("2FA Login Successful!");

          // 🔥 Do NOT call onClose() here
          // If you want to close the modal, let the parent close it AFTER finishing login flow
          if (onLoginSuccess) onLoginSuccess(data);
        }}
      />
    </div>
  );
};

export default LoginSignup;
