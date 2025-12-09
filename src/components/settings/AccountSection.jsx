// src/components/settings/AccountSection.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AccountSection = ({ userData, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState(userData?.email || "");

  useEffect(() => {
    if (userData) {
      setEmail(userData.email || "");
    }
  }, [userData]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // ONLY send email update
    if (onUpdate) {
      onUpdate({ email });
    }
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <p className="text-xl font-bold text-white">Account Information</p>

        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-all text-sm text-gray-300 hover:text-white"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1.5 bg-gradient-to-r from-[#a62a00] to-[#ffb8a1] rounded-lg text-white text-sm font-semibold hover:scale-105 transition-transform"
            >
              Save
            </button>
            <button
              onClick={handleEdit}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 text-sm transition-all"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Form */}
      <div className="space-y-4">
        
        {/* USERNAME (ALWAYS READ-ONLY) */}
        <div>
          <label className="block text-sm text-gray-400 mb-2 font-medium">Username</label>
          <div className="relative">
            <input
              type="text"
              value={userData.username}
              readOnly
              disabled
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed focus:outline-none"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* EMAIL (EDITABLE) */}
        <div>
          <label className="block text-sm text-gray-400 mb-2 font-medium">Email Address</label>
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={!isEditing}
              className={`w-full bg-white/5 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white focus:outline-none transition-all ${
                isEditing ? "focus:border-[#a62a00]/50" : "cursor-not-allowed"
              }`}
            />
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default AccountSection;
