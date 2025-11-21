// src/components/settings/TwoFactorAuthPopup.jsx
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";

const TwoFactorAuthPopup = ({
  isOpen,
  onClose,
  onComplete,
  userEmail = "user@example.com",
  userId,
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  console.log("userId for this qr:", userId);

  /** Fetch QR + Secret when opened */
  useEffect(() => {
    if (isOpen && userId) {
      fetchTwoFactorData();
    }
  }, [isOpen, userId]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  /** -----------------------------
   *  STEP 1: Enable 2FA -> get QR + secret
   *  ----------------------------- */
  const fetchTwoFactorData = async () => {
    try {
      setIsLoading(true);

      const { data } = await axios.post("/auth-service/api/auth/enable-2fa", {
        userId,
      });

      console.log("Backend 2FA Response:", data);

      // ✅ These are the actual fields returned by your backend
      const qrDataUrl = data.qrCodeDataUrl;
      const secret = data.secret;

      if (!qrDataUrl || !secret) {
        throw new Error("Missing QR code or secret in backend response");
      }

      // ✅ Set them directly
      setQrCodeUrl(qrDataUrl);
      setSecretKey(secret);

      console.log("✅ QR Loaded:", qrDataUrl.substring(0, 60) + "...");
      toast.success("Scan this QR code with your Authenticator app!");
    } catch (err) {
      console.error("❌ 2FA setup error:", err);
      toast.error("Failed to generate Two-Factor QR code");
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  /** -----------------------------
   *  STEP 2: Verify token
   *  ----------------------------- */
  const handleCompleteSetup = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post("/auth-service/api/auth/verify-2fa", {
        userId,
        token: Number(verificationCode),
      });

      if (data?.success) {
        toast.success("Two-Factor Authentication enabled successfully!");
        onComplete?.(true);
        handleClose();
      } else {
        toast.error(data?.message || "Invalid verification code");
      }
    } catch (err) {
      console.error("Verification error:", err);
      toast.error("Failed to verify code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /** Copy secret key */
  const copyToClipboard = () => {
    if (!secretKey) return;
    navigator.clipboard.writeText(secretKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setVerificationCode("");
    setCopied(false);
    onClose();
  };

  if (!isOpen) return null;

  /** -----------------------------
   *  POPUP VIEW
   *  ----------------------------- */
  const portalContent = (
    <>
      {/* Background overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#080808]/80 backdrop-blur-sm z-[9998]"
        onClick={handleClose}
      />

      {/* Popup content */}
      <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-lg pointer-events-auto"
        >
          <div className="bg-[#1A1D29] rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-[#1A1D29] to-[#252837] px-6 pt-6 pb-4 border-b border-white/10">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition"
              >
                <svg
                  className="w-5 h-5 text-gray-400 hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-2xl font-bold text-white">
                Two-Factor Authentication
              </h2>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Instructions + QR */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Setup Instructions
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Scan this QR code with{" "}
                    <span className="text-blue-400">Google Authenticator</span>{" "}
                    or any TOTP app to link your account.
                  </p>
                  <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                    Or manually enter the secret key below.
                  </p>
                </div>

                {/* QR Image */}
                <div className="flex justify-center md:justify-end">
                  <div className="bg-white p-3 rounded-lg inline-block">
                    {qrCodeUrl ? (
                      <img
                        src={qrCodeUrl}
                        alt="2FA QR"
                        className="w-44 h-44 object-contain"
                      />
                    ) : (
                      <div className="w-44 h-44 bg-gray-200 animate-pulse rounded" />
                    )}
                  </div>
                </div>
              </div>

              {/* Secret Key */}
              {secretKey && (
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Secret Key
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={secretKey}
                      readOnly
                      className="w-full bg-[#252837] text-white font-mono text-base px-4 py-3 pr-12 rounded-lg border border-white/10 focus:outline-none"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded transition"
                    >
                      {copied ? (
                        <svg
                          className="w-4 h-4 text-green-400"
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
                          className="w-4 h-4 text-gray-400"
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
                    </button>
                  </div>
                </div>
              )}

              {/* Code Input */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Enter 6-digit code
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) =>
                    setVerificationCode(
                      e.target.value.replace(/\D/g, "").slice(0, 6)
                    )
                  }
                  placeholder="000000"
                  className="w-full bg-[#252837] text-white text-lg font-mono px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 placeholder-gray-600"
                />
              </div>

              {/* Complete Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCompleteSetup}
                disabled={isLoading || !verificationCode}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? "Verifying..." : "Complete Setup"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );

  return ReactDOM.createPortal(
    <AnimatePresence>{isOpen && portalContent}</AnimatePresence>,
    document.body
  );
};

export default TwoFactorAuthPopup;
