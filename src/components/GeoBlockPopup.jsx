import React from "react";

const GeoBlockPopup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1C1D49] p-6 rounded-xl max-w-sm w-full text-center border border-white/10">
        <div className="text-4xl mb-2">🚫</div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Game Blocked
        </h2>
        <p className="text-sm text-gray-300 mb-4">{message}</p>

        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#a62a00] to-[#FFB8A1] text-white w-full"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default GeoBlockPopup;
