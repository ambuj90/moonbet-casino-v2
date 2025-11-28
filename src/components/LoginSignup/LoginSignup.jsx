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
  const lengthCheck = password.length >= 12 && password.length <= 15;
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
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
      fill="currentColor"
    />
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

  // Form state
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
    agreeTerms: false,
    agreeMarketing: false,
  });
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

    const wallets = [
      window.phantom?.solana?.isPhantom && {
        id: "phantom",
        name: "Phantom",
        icon: "/wallets/phantom.svg",
      },
      window.backpack?.solana?.isBackpack && {
        id: "backpack",
        name: "Backpack",
        icon: "/wallets/backpack.svg",
      },
      window.solflare && {
        id: "solflare",
        name: "Solflare",
        icon: "/wallets/solflare.svg",
      },
    ].filter(Boolean);

    return (
      <div
        className="fixed inset-0  /70 backdrop-blur-sm flex justify-center items-center z-[999999]"
        onClick={() => {
          if (!walletLoading) onClose();
        }}
      >
        <div
          className="bg-[#1a1a1a] p-6 rounded-xl w-[340px] shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-white text-lg font-semibold mb-4">
            Select Wallet
          </h2>

          <div className="flex flex-col gap-3">
            {wallets.map((w) => (
              <button
                key={w.id}
                onClick={() => onSelect(w.id)}
                className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              >
                <img src={w.icon} alt={w.name} className="w-7 h-7" />
                <span className="text-white font-medium">{w.name}</span>
              </button>
            ))}
          </div>

          <button
            className="mt-4 w-full py-2 bg-white/10 rounded-lg text-white hover:bg-white/20"
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

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
        "Password must be 12–15 characters and include uppercase, lowercase, number and special character."
      );
      return;
    }

    setLoginLoading(true);

    try {
      const { data } = await axios.post(
        "/auth-service/api/auth/login",
        loginData
      );

      if (data?.token) {
        setLoginLoading(false);
        localStorage.setItem("token", data.token);
        toast.success("You have logged in successfully!");
        if (onLoginSuccess) onLoginSuccess(data);
        return;
      }

      // 4️⃣ Backend returned error but with no token
      setLoginLoading(false);
      toast.error(data.message || "Unable to log in. Please try again.");
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
      toast.error("Unable to log in. Please try again.");
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
        "Password must be 10-18 characters and include uppercase, lowercase, number and special character."
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

      // 2️⃣ GET NONCE
      let nonceRes;
      try {
        nonceRes = await axios.post("/auth-service/api/auth/wallet/nonce", {
          walletAddress,
        });
        setWalletLoading(true);
      } catch (err) {
        console.error("Nonce error:", err);
        toast.error("Failed to get login nonce. Try again.");
        return;
      }

      if (!nonceRes.data?.success) {
        toast.error(nonceRes.data?.error || "Nonce generation failed.");
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
      className="fixed inset-0 z-[99999] h-screen flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(13, 14, 54, 0.30)",
        backdropFilter: "blur(25px)",
        WebkitBackdropFilter: "blur(25px)",
      }}
      onClick={() => {
        e.stopPropagation();
        if (!walletLoading && !loginLoading && !signupLoading) {
          onClose();
        }
      }}
    >
      {/* Main Container - Responsive */}
      <div
        className="relative  rounded-lg overflow-hidden w-full"
        style={{
          maxWidth: "804px",
          width: "100%",
          height: "auto",
          minHeight: "535px",
          maxHeight: "90vh",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          disabled={walletLoading || loginLoading || signupLoading}
          onClick={() => {
            if (!walletLoading && !loginLoading && !signupLoading) onClose();
          }}
          className="absolute top-2 right-2  z-50 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all"
        >
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              d="M6 18L18 6M6 6l12 12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Split Layout - Responsive */}
        <div className="flex flex-col md:flex-row h-full min-h-[535px] ">
          {/* Left Side - Image Background (Hidden on mobile) */}
          <div
            className="hidden md:block md:w-[340px] relative bg-gradient-to-br from-blue-600/30 to-purple-600/30"
            style={{
              backgroundImage: "url('/home-assets/login-bg.svg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "overlay",
            }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

            {/* Logo at the top left of the image */}
            <div className="absolute top-8 left-8">
              <Link to="/" className="flex gap-2">
                <span className="flex gap-2 text-xl font-bold text-white tracking-wider">
                  {/* Desktop Logo */}
                  <img
                    src="/icons/logo.svg"
                    alt="Moonbet Logo"
                    className="w-32 h-auto object-contain hidden md:block md:mx-1"
                  />
                  {/* Mobile Logo */}
                  <img
                    src="/home-assets/mobile-logo.svg"
                    alt="Moonbet Logo Mobile"
                    className="w-28 h-auto object-contain block md:hidden"
                  />
                </span>
              </Link>
            </div>
          </div>

          {/* Right Side - Form with specified background */}
          <div
            className="flex-1 p-6 sm:p-8 md:p-10 flex flex-col justify-center relative overflow-hidden"
            style={{
              // borderRadius: "0 12px 12px 0",
              background:
                "linear-gradient(109deg, rgba(201, 201, 201, 0.80) 1.57%, rgba(196, 196, 196, 0.10) 100%)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: `
      0 8px 32px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.5),
      inset 0 -1px 0 rgba(255, 255, 255, 0.1),
      inset 0 0 20px 10px rgba(255, 255, 255, 0.1)
    `,
            }}
          >
            {/* Top gradient line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)",
              }}
            />

            {/* Left gradient line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "1px",
                height: "100%",
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.8), transparent, rgba(255, 255, 255, 0.3))",
              }}
            />
            {/* Mobile Logo (shown only on mobile) */}
            <div className="block md:hidden mb-6">
              <h1 className="text-2xl font-bold text-white tracking-wider text-center">
                MOONBET
              </h1>
            </div>

            {/* Tabs */}
            {activeTab !== "forgot" && (
              <div className="flex mb-6 md:mb-8 border-b border-white/10">
                <button
                  onClick={() => setActiveTab("login")}
                  className={`flex-1 pb-3 font-medium transition-all relative ${
                    activeTab === "login"
                      ? "text-[#E1E1E1]"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  Login
                  {activeTab === "login" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[linear-gradient(0deg,#5A3799_0%,#DC1FFF_100%)]"></div>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("register")}
                  className={`flex-1 pb-3 font-medium transition-all relative ${
                    activeTab === "register"
                      ? "text-[#E1E1E1]"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  Register
                  {activeTab === "register" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[linear-gradient(0deg,#5A3799_0%,#DC1FFF_100%)]"></div>
                  )}
                </button>
              </div>
            )}

            {/* Content */}
            <AnimatePresence mode="wait">
              {activeTab === "login" ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="space-y-4">
                    {/* Email Address Field */}
                    <div>
                      <label className="text-xs text-[#E1E1E1] tracking-wider mb-2 block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        className="w-full px-4 py-3 rounded-md text-white placeholder-white/80 focus:outline-none focus:border-[#5A3799] transition-all"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(255, 255, 255, 0.18)",
                        }}
                      />
                    </div>

                    {/* Password Field */}
                    <div>
                      <label className="text-xs text-[#E1E1E1] tracking-wider mb-2 block">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        className="w-full px-4 py-3 rounded-md border border-[#fff] text-white placeholder-gray-500 focus:outline-none focus:border-[#5A3799] transition-all"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                          backdropFilter: "blur(20px)",
                        }}
                      />
                    </div>

                    {/* Forgot Password Link */}
                    <div className="text-right">
                      <button
                        onClick={() => setActiveTab("forgot")}
                        className="text-sm text-gray-400 hover:text-[#F07730] transition-colors"
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
                    {/* Social Login Buttons - Stack on mobile, side by side on desktop */}
                    <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-3">
                      {/* Google Login */}
                      <div className="flex justify-center">
                        <GoogleLogin
                          onSuccess={async (credentialResponse) => {
                            try {
                              const { credential } = credentialResponse;
                              const decoded = jwtDecode(credential);
                              console.log("✅ Google user:", decoded);

                              const { data } = await axios.post(
                                "/auth-service/api/auth/google",
                                { token: credential }
                              );

                              if (data?.token) {
                                localStorage.setItem("token", data.token);
                                localStorage.setItem(
                                  "user",
                                  JSON.stringify(data.user)
                                );
                                window.dispatchEvent(new Event("tokenChanged"));
                                toast.success("Signed in with Google!");
                                if (onLoginSuccess) onLoginSuccess(data);
                              }
                            } catch (err) {
                              console.error("Google login failed:", err);
                              toast.error("Google login failed");
                            }
                          }}
                          onError={() => toast.error("Google Sign-In failed")}
                          theme="filled_black"
                          width="100%"
                        />
                      </div>

                      {/* Connect Wallet Button */}
                      <button
                        onClick={() => setWalletModalOpen(true)}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#1e2029] hover:bg-[#2a2d3a] border border-[#3a3d4a] rounded-lg transition-all w-full"
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
                        className="text-sm text-[#E1E1E1] hover:text-[#E06620] font-medium"
                      >
                        Register Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : activeTab === "register" ? (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="max-h-[calc(90vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-[#F07730]/40"
                >
                  <div className="space-y-3">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={signupData.email}
                      onChange={handleSignupChange}
                      className="w-full px-4 py-2.5 rounded-md bg-[#1e2029] border border-[#3a3d4a] text-white placeholder-gray-500 focus:outline-none focus:border-[#F07730] transition-all text-sm"
                    />

                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={signupData.username}
                      onChange={handleSignupChange}
                      className="w-full px-4 py-2.5 rounded-md bg-[#1e2029] border border-[#3a3d4a] text-white placeholder-gray-500 focus:outline-none focus:border-[#F07730] transition-all text-sm"
                    />

                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={signupData.password}
                      onChange={handleSignupChange}
                      className="w-full px-4 py-2.5 rounded-md bg-[#1e2029] border border-[#3a3d4a] text-white placeholder-gray-500 focus:outline-none focus:border-[#F07730] transition-all text-sm"
                    />

                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={signupData.confirmPassword}
                      onChange={handleSignupChange}
                      className="w-full px-4 py-2.5 rounded-md bg-[#1e2029] border border-[#3a3d4a] text-white placeholder-gray-500 focus:outline-none focus:border-[#F07730] transition-all text-sm"
                    />

                    <div className="space-y-2 pt-1">
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          checked={signupData.agreeTerms}
                          onChange={handleSignupChange}
                          className="mt-0.5 w-4 h-4 rounded bg-[#1e2029] border-[#3a3d4a] accent-[#F07730]"
                        />
                        <span className="text-xs text-[#E1E1E1]">
                          I agree to the{" "}
                          <a
                            href="/terms-and-condition"
                            className="text-[#E1E1E1] hover:underline"
                          >
                            Terms
                          </a>{" "}
                          and confirm I'm 18+
                        </span>
                      </label>

                      <label className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreeMarketing"
                          checked={signupData.agreeMarketing}
                          onChange={handleSignupChange}
                          className="mt-0.5 w-4 h-4 rounded bg-[#1e2029] border-[#3a3d4a] accent-[#F07730]"
                        />
                        <span className="text-xs text-[#E1E1E1]">
                          Send me promotions
                        </span>
                      </label>
                    </div>

                    {/* Create Account Button with gradient */}
                    <button
                      onClick={handleSignupSubmit}
                      className="w-full py-3 mt-2 rounded-[12px] font-semibold text-white custom-btn hover:opacity-90 shadow-xl transition-all"
                    >
                      Create Account
                    </button>

                    {/* OR Divider */}
                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[#3a3d4a]" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="px-3 text-xs uppercase text-gray-500 bg-transparent tracking-wider">
                          OR
                        </span>
                      </div>
                    </div>

                    {/* Social Login - Stack on mobile */}
                    <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-3">
                      <div className="flex justify-center">
                        <GoogleLogin
                          onSuccess={async (credentialResponse) => {
                            try {
                              const { credential } = credentialResponse;
                              const decoded = jwtDecode(credential);
                              console.log("✅ Google user:", decoded);

                              const { data } = await axios.post(
                                "/auth-service/api/auth/google",
                                { token: credential }
                              );

                              if (data?.token) {
                                localStorage.setItem("token", data.token);
                                localStorage.setItem(
                                  "user",
                                  JSON.stringify(data.user)
                                );
                                window.dispatchEvent(new Event("tokenChanged"));
                                toast.success("Signed in with Google!");
                                if (onLoginSuccess) onLoginSuccess(data);
                              }
                            } catch (err) {
                              console.error("Google login failed:", err);
                              toast.error("Google login failed");
                            }
                          }}
                          onError={() => toast.error("Google Sign-In failed")}
                          theme="filled_black"
                          width="100%"
                        />
                      </div>

                      {/* Connect Wallet Button */}
                      <button
                        onClick={() => setWalletModalOpen(true)}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#1e2029] hover:bg-[#2a2d3a] border border-[#3a3d4a] rounded-lg transition-all w-full"
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
                        className="text-sm text-[#F07730] hover:text-[#E06620] font-medium"
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
              <div className="absolute inset-0 z-[99999] bg-black/60 backdrop-blur-md flex flex-col items-center justify-center pointer-events-auto">
                {/* Animated Loader */}
                <img
                  src="/icons/moonlogo.gif"
                  className="w-28 h-28 animate-pulse"
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
    </div>
  );
};

export default LoginSignup;
