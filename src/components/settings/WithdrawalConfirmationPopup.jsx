// src/components/WithdrawalConfirmationPopup.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const WithdrawalConfirmationPopup = ({
  isOpen,
  onClose,
  requestId,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0  /70 backdrop-blur-sm flex items-center justify-center z-[200]"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#1A1D24] border border-white/10 rounded-xl p-6 w-full max-w-md text-center shadow-2xl"
        >
          <h2 className="text-xl font-bold text-white mb-4">
            Withdrawal Processing
          </h2>

          <p className="text-gray-300 mb-2">Your request ID:</p>
          <p className="text-[#F07730] font-mono mb-6 break-words">
            {requestId}
          </p>

          <div className="flex gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onConfirm(requestId)}
              className="bg-gradient-to-r from-[#F07730] to-[#EFD28E] text-black font-bold py-3 px-6 rounded-lg shadow-md hover:from-[#F07730]/90 hover:to-[#EFD28E]/90"
            >
              Confirm Withdrawal
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="bg-gray-700 text-white font-medium py-3 px-6 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WithdrawalConfirmationPopup;
