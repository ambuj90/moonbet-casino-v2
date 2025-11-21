// src/components/settings/EmailVerificationPopup.jsx
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import api from "../../api/axios";
import axios from "axios";

const EmailVerificationPopup = ({
  isOpen,
  onClose,
  onVerify,
  userEmail,
  resendCooldown = 60, // seconds
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef([]);

  // Start countdown when popup opens
  useEffect(() => {
    if (isOpen) {
      setResendTimer(resendCooldown);
    }
  }, [isOpen, resendCooldown]);

  // Countdown timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);
  // Prevent body scroll when modal is open
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

  if (!isOpen) return null;

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

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only last character
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d+$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }

    setOtp(newOtp);

    // Focus on the next empty field or last field
    const nextEmptyIndex = newOtp.findIndex((val) => val === "");
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      toast.error("Please enter a complete 6-digit OTP");
      return;
    }

    setIsLoading(true);

    try {
      const email =
        userEmail ||
        JSON.parse(localStorage.getItem("user") || "{}").email ||
        localStorage.getItem("email");

      if (!email) {
        toast.error("Email not found. Please log in again.");
        setIsLoading(false);
        return;
      }

      // ✅ Call backend verify-email API via Axios
      const { data } = await axios.post("/auth-service/api/auth/verify-email", {
        email,
        otp: parseInt(otpString, 10),
      });

      toast.success(data.message || "Email verified successfully!");
      handleClose();

      // ✅ Refresh user data or reload page after short delay
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error("❌ Verification error:", error);
      toast.error(
        error.response?.data?.message || "Invalid OTP. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);

    try {
      // Add your resend OTP API call here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      toast.success("Verification code resent to your email!");
      setResendTimer(resendCooldown);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error) {
      toast.error("Failed to resend code. Please try again.");
      console.error("Resend error:", error);
    } finally {
      setIsResending(false);
    }
  };

  const handleClose = () => {
    setOtp(["", "", "", "", "", ""]);
    setResendTimer(0);
    onClose();
  };

  // Render nothing if not open
  if (!isOpen) return null;

  // Portal content
  const portalContent = (
    <AnimatePresence>
      <>
        {/* Overlay - Fixed position covers entire viewport */}
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0  /80 backdrop-blur-md"
          style={{ zIndex: 9998 }}
          onClick={handleClose}
        />

        {/* Modal - Fixed position centered in viewport */}
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 flex items-center justify-center w-full p-4 sm:p-6 md:p-8"
          style={{ zIndex: 9999 }}
        >
          <div className="relative w-full max-w-md">
            {/* Glassmorphism Card */}
            <div className="relative bg-[#1A1D24]/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
              {/* Animated Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 opacity-20 blur-xl animate-pulse" />

              {/* Content Container */}
              <div className="relative bg-[#1A1D24]/90 backdrop-blur-lg rounded-2xl p-8">
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
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

                {/* Logo Section */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    {/* Animated Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-xl opacity-50 animate-pulse" />
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-2">
                  Verify Your Email
                </h2>

                {/* Description */}
                <p className="text-center text-gray-400 text-sm mb-6">
                  We've sent a 6-digit verification code to
                  <br />
                  <span className="text-white font-semibold">{userEmail}</span>
                </p>

                {/* OTP Input Section */}
                <div className="mb-6">
                  <label className="block text-gray-400 text-sm mb-4 text-center">
                    Enter Verification Code
                  </label>
                  <div className="flex gap-2 justify-center">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        className="w-12 h-14 bg-white/5 backdrop-blur border border-white/20 rounded-lg text-center text-white text-xl font-bold placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all"
                        placeholder="0"
                        autoFocus={index === 0}
                      />
                    ))}
                  </div>
                </div>

                {/* Resend Timer/Button */}
                <div className="text-center mb-6">
                  {resendTimer > 0 ? (
                    <p className="text-sm text-gray-400">
                      Resend code in{" "}
                      <span className="text-green-400 font-bold">
                        {resendTimer}s
                      </span>
                    </p>
                  ) : (
                    <button
                      onClick={handleResendOtp}
                      disabled={isResending}
                      className="text-sm text-green-400 hover:text-green-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isResending ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Resending...
                        </span>
                      ) : (
                        "Didn't receive the code? Resend"
                      )}
                    </button>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClose}
                    className="flex-1 py-3 px-4 bg-white/5 backdrop-blur border border-white/20 text-gray-300 font-semibold rounded-lg hover:bg-white/10 transition-all"
                    disabled={isLoading}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleVerify}
                    disabled={isLoading || otp.some((digit) => !digit)}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-2"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Verifying...
                      </span>
                    ) : (
                      "Verify Email"
                    )}
                  </motion.button>
                </div>

                {/* Security Notice */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-xs text-gray-500 text-center">
                    🔒 Never share your verification code with anyone
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );

  // Use React Portal to render at the document body level
  return ReactDOM.createPortal(portalContent, document.body);
};

export default EmailVerificationPopup;
