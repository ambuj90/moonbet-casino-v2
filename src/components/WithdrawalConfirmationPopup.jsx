// src/components/WithdrawalConfirmationPopup.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WithdrawalConfirmationPopup = ({
  isOpen,
  onClose,
  onConfirm,
  withdrawalData = {},
  userEmail = "user@example.com",
}) => {
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handlePinSubmit = async () => {
    if (!pin || pin.length < 4) {
      alert("Please enter a valid PIN");
      return;
    }

    setIsLoading(true);

    // Call the onConfirm callback with PIN
    if (onConfirm) {
      await onConfirm(pin);
    }

    setIsLoading(false);
    setPin("");
  };

  const handleClose = () => {
    setPin("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0  /80 backdrop-blur-md z-[200]"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 flex items-center justify-center z-[201] p-4"
          >
            <div className="relative w-full max-w-md">
              {/* Glassmorphism Card with Casino Theme */}
              <div className="relative bg-[#1A1D24]/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#F07730] via-[#EFD28E] to-[#F07730] opacity-20 blur-xl" />

                {/* Content Container */}
                <div className="relative bg-[#1A1D24]/90 backdrop-blur-lg rounded-2xl p-8">
                  {/* Logo Section */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full flex items-center justify-center shadow-lg">
                        <svg
                          className="w-10 h-10 text-black"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      {/* Animated Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full blur-xl opacity-50 animate-pulse" />
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-[#F07730] to-[#EFD28E] bg-clip-text text-transparent mb-2">
                    Confirm Withdrawal
                  </h2>

                  {/* User Info */}
                  <div className="text-center mb-6">
                    <p className="text-gray-400 text-sm">
                      Hi, {userEmail.split("@")[0]}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">{userEmail}</p>
                  </div>

                  {/* Withdrawal Details Card */}
                  <div className="bg-white/5 backdrop-blur rounded-xl p-4 mb-6 border border-white/10">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-400 text-sm">Amount</span>
                      <span className="text-white font-bold text-lg">
                        {withdrawalData.amount} {withdrawalData.currency}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">To Address</span>
                      <span className="text-white text-xs font-mono">
                        {withdrawalData.address?.slice(0, 6)}...
                        {withdrawalData.address?.slice(-6)}
                      </span>
                    </div>
                  </div>

                  {/* PIN Input Section */}
                  <div className="mb-6">
                    <label className="block text-gray-400 text-sm mb-3 text-center">
                      Please Enter Your OTP
                    </label>
                    <input
                      type="password"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      placeholder="Enter PIN"
                      maxLength="6"
                      className="w-full bg-white/5 backdrop-blur border border-white/20 rounded-lg px-4 py-3 text-center text-white text-xl tracking-widest placeholder-gray-500 focus:outline-none focus:border-[#F07730] focus:ring-1 focus:ring-[#F07730]/50 transition-all"
                      autoFocus
                    />
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
                      onClick={handlePinSubmit}
                      disabled={isLoading || !pin}
                      className="flex-1 py-3 px-4 bg-gradient-to-r from-[#F07730] to-[#EFD28E] text-black font-bold rounded-lg hover:from-[#F07730]/90 hover:to-[#EFD28E]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
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
                          Processing...
                        </span>
                      ) : (
                        "Confirm"
                      )}
                    </motion.button>
                  </div>

                  {/* Forgot PIN Link */}
                  <div className="text-center mt-4">
                    <a
                      href="#"
                      className="text-sm text-[#F07730] hover:text-[#EFD28E] transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Please contact support to reset your PIN");
                      }}
                    >
                      Forgot OTP?
                    </a>
                  </div>

                  {/* Security Notice */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <p className="text-xs text-gray-500 text-center">
                      🔒 This transaction is secured and encrypted
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WithdrawalConfirmationPopup;
