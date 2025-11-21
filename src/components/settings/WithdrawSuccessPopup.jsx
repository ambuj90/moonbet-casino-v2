import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const WithdrawSuccessPopup = ({ isOpen, onClose, amount, currency }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0  /70 backdrop-blur-sm z-[1000] flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          className="bg-[#1A1D24] border border-white/10 rounded-xl p-6 w-full max-w-md shadow-xl text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-3">
            🎉 Congratulations!
          </h2>

          <p className="text-gray-300 text-lg">
            {amount} {currency} withdrawal processed and will be deposited ASAP.
          </p>

          <button
            onClick={onClose}
            className="mt-6 w-full py-3 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-lg text-black font-bold"
          >
            Okay
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WithdrawSuccessPopup;
