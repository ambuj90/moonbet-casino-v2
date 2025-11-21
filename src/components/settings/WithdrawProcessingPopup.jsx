import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WithdrawSuccessPopup from "./WithdrawSuccessPopup";
import axios from "axios";
import { toast } from "react-toastify";
import { useWalletSocket } from "../../context/WalletSocketContext"; // socket

const WithdrawProcessingPopup = ({
  isOpen,
  onClose,
  withdrawalData,
  userId,
}) => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState("Waiting for confirmation...");
  const [progress, setProgress] = useState(10);

  const socket = useWalletSocket();

  // Animate progress bar smoothly
  useEffect(() => {
    if (!isOpen) return;
    let interval = setInterval(() => {
      setProgress((p) => (p < 85 ? p + 2 : p));
    }, 400);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Listen for NOWPayments status updates through websocket
  useEffect(() => {
    if (!socket || !isOpen) return;

    const handler = (msg) => {
      console.log("🔥 Withdraw update:", msg);

      if (msg.status === "confirming") {
        setStatusText("⏳ Confirming transaction...");
        setProgress(40);
      }

      if (msg.status === "sending") {
        setStatusText("📤 Sending to blockchain...");
        setProgress(60);
      }

      if (msg.status === "finished") {
        setStatusText("💸 Finalizing withdrawal...");
        setProgress(85);
      }

      if (msg.status === "completed") {
        setStatusText("🎉 Withdrawal completed!");
        setProgress(100);

        setTimeout(() => {
          onClose(); // closes processing popup
          setShowSuccessPopup(true); // triggers success popup
        }, 800);
      }
    };

    socket.on("withdraw_status", handler);
    return () => socket.off("withdraw_status", handler);
  }, [socket, isOpen]);

  const handleConfirm = async () => {
    setLoading(true);
    setStatusText("Submitting withdrawal...");
    setProgress(20);

    const payload = {
      currency: withdrawalData.currency,
      amount: parseFloat(withdrawalData.amount),
      address: withdrawalData.address,
    };

    try {
      const { data } = await axios.post(
        `/wallet-service/api/wallet/${userId}/withdraw`,
        payload
      );

      setStatusText("Withdrawal Request Created!");
      setProgress(50);
      toast.success("Withdrawal Request Generated, Deposited ASAP!");

      // Animation delay before success popup
      setTimeout(() => {
        setLoading(false);
        onClose();
        setShowSuccessPopup(true);
      }, 1200);
    } catch (err) {
      toast.error(err.response?.data?.message || "Withdrawal failed");
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0  /70 backdrop-blur-sm z-[999] flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-[#1A1D24] border border-white/10 rounded-xl p-6 w-full max-w-md shadow-xl relative"
        >
          <h2 className="text-xl font-bold text-white mb-4">
            Withdraw Processing
          </h2>

          {/* Amount */}
          <p className="text-lg text-white font-semibold">
            {withdrawalData.amount} {withdrawalData.currency}
          </p>

          {/* Address */}
          <p className="text-gray-300 text-sm mt-2 break-words">
            <span className="font-bold">Address:</span> {withdrawalData.address}
          </p>

          {/* Progress Animation */}
          <div className="mt-6">
            <p className="text-orange-300 text-sm mb-1">{statusText}</p>

            <div className="w-full bg-white/10 h-2 rounded-md overflow-hidden">
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-[#F07730] to-[#EFD28E]"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleConfirm}
              disabled={loading}
              className="flex-1 py-3 rounded-lg bg-gradient-to-r from-[#F07730] to-[#EFD28E] text-black font-bold disabled:opacity-50"
            >
              {loading ? "Processing..." : "Confirm"}
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Success Popup */}
      <WithdrawSuccessPopup
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        amount={withdrawalData.amount}
        currency={withdrawalData.currency}
      />
    </AnimatePresence>
  );
};

export default WithdrawProcessingPopup;
