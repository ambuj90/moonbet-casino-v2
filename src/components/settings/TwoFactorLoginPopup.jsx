import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const TwoFactorLoginPopup = ({ isOpen, onClose, userId, onSuccess }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const verifyOtp = async () => {
  if (code.length !== 6) {
    toast.error("Enter a valid 6-digit code");
    return;
  }

  setLoading(true);
  try {
    const { data } = await axios.post("/auth-service/api/auth/verify-2fa", {
      userId,
      token: code,
    });

    if (data.success && data.token) {
      // REMOVE THESE — let parent handle them
      // localStorage.setItem("token", data.token);
      // localStorage.setItem("user", JSON.stringify(data.user));

      onSuccess?.(data);  // <-- send result to parent

    //   toast.success("2FA Login Successful!");
    } else {
      toast.error(data.message || "Invalid code");
    }
  } catch (err) {
    toast.error("Verification failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[99999]">
      <div className="bg-[#1C1D49] p-6 rounded-xl w-[350px] text-white border border-white/10"
      onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Two-Factor Verification</h2>

        <p className="text-gray-300 mb-4">
          Enter the 6-digit code from your Authenticator app.
        </p>

        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0,6))}
          className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/20 text-center text-xl tracking-widest"
          placeholder="000000"
        />

        <button
          onClick={verifyOtp}
          disabled={loading}
          className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-[#F07730] to-[#EFD28E] text-black font-semibold"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        <button
          onClick={onClose}
          className="w-full mt-3 py-2 text-gray-300 hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TwoFactorLoginPopup;
