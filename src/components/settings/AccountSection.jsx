// src/components/settings/AccountSection.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AccountSection = ({ userData, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: userData?.username || "",
    email: userData?.email || "",
  });
  // console.log("user data tech are:",userData);
  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.username || "",
        email: userData.email || "",
      });
    }
  }, [userData]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Call parent update function
    if (onUpdate) {
      onUpdate(formData);
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#F07730]/20 to-[#EFD28E]/20 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-[#F07730]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <p className="text-xl font-bold text-white">Account Information</p>
        </div>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-all text-sm text-gray-300 hover:text-white"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1.5 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-lg text-white text-sm font-semibold hover:scale-105 transition-transform"
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

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2 font-medium">
            Username
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              readOnly={!isEditing}
              className={`w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none transition-all pr-12 ${
                isEditing ? "focus:border-[#F07730]/50" : "cursor-not-allowed"
              }`}
            />
            {!isEditing && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-green-500"
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
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2 font-medium">
            Email Address
          </label>
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
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
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              readOnly={!isEditing}
              className={`w-full bg-white/5 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white focus:outline-none transition-all ${
                isEditing ? "focus:border-[#F07730]/50" : "cursor-not-allowed"
              }`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AccountSection;
