// src/components/profile/ProfileModal.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // ✅ FIX: added import
import api from "../../api/axios";
import axios from "axios";

const ProfileModal = ({ isOpen, onClose, userData }) => {
  const [profileData, setProfileData] = useState({
    username: "Loading...",
    publicId: "...",
    memberSince: "...",
    rank: "Unranked",
    nextRank: "Bronze I",
    remainingToNextRank: 0,
    totalToNextRank: 5000,
    totalBets: 0,
    totalWagered: 0,
    avatarLevel: 1,
  });

  const navigate = useNavigate(); // ✅ FIX: properly initialized

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

  useEffect(() => {
    if (isOpen && userData) {
      fetchProfileData();
    }
  }, [isOpen, userData]);

  const fetchProfileData = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = userData?._id || storedUser.id;
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        console.warn("⚠️ No userId or token found — user not logged in");
        toast.info("Please log in to view profile");
        return;
      }

      // ✅ Fetch profile data securely
      const { data } = await axios.get(
        `/auth-service/api/auth/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ Set formatted profile data
      setProfileData({
        username: data.username || "Guest User",
        publicId: data._id?.toUpperCase() || "",
        memberSince: new Date(data.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        rank: "Unranked", // static for now
        nextRank: "Bronze I",
        remainingToNextRank: 0,
        totalToNextRank: 5000,
        totalBets: 0,
        totalWagered: 0,
        avatarLevel: Math.floor(Math.random() * 10) + 1,
        email: data.email,
        displayName: data.displayName,
        kycStatus: data.kycStatus,
        roles: data.roles,
        emailVerified: data.emailVerified,
      });
    } catch (error) {
      console.error("❌ Failed to fetch profile data:", error);
      toast.error(
        error.response?.data?.message || "Unable to load profile data"
      );
    }
  };

  const progressPercentage =
    ((profileData.totalToNextRank - profileData.remainingToNextRank) /
      profileData.totalToNextRank) *
    100;

  const copyPublicId = () => {
    navigator.clipboard.writeText(profileData.publicId);
    toast.success("Public ID copied to clipboard!");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed h-screen inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#080808]/80 backdrop-blur-sm"
          />

          {/* Modal Container - Responsive */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[90%] sm:max-w-[80%] lg:max-w-[55%]  xl:max-w-[30%] mx-auto max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent
"
          >
            {/* Glassmorphism Card */}
            <div
              className="relative bg-gradient-to-br from-[#1a1d24]/95 to-[#13161F]/95 backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: `
      0 8px 32px rgba(0,0,0,0.20),
      inset 0 1px 0 rgba(255,255,255,0.5),
      inset 0 -1px 0 rgba(255,255,255,0.1),
      inset 0 0 20px 6px rgba(255,255,255,0.15)
    `,
              }}
            >
              {/* Glow Effects */}
              <div className="absolute -top-20 -left-20 w-32 sm:w-40 h-32 sm:h-40 bg-[#F07730]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-32 sm:w-40 h-32 sm:h-40 bg-[#EFD28E]/20 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="relative p-4 sm:p-5 md:p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Profile
                  </h2>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-all"
                  >
                    <svg
                      className="w-5 h-5 text-white/70"
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
                </div>

                {/* Public ID - Responsive */}
                <div className="view_btn mt-3 sm:mt-4 flex flex-col sm:flex-row  p-2 rounded-lg sm:items-center gap-2">
                  <span className="text-gray-400 text-xs sm:text-sm">
                    Public ID:
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-white/70 text-xs sm:text-sm font-mono truncate max-w-[200px] sm:max-w-none">
                      {profileData.publicId}
                    </span>
                    <button
                      onClick={copyPublicId}
                      className="p-1 rounded hover:bg-white/10 transition-all flex-shrink-0"
                    >
                      <svg
                        className="w-4 h-4 text-gray-400 hover:text-white"
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
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Content - Responsive Padding */}
              <div className="relative p-4 sm:p-5 md:p-6">
                {/* User Info Section - Responsive */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  {/* Avatar + Profile Overlay */}
                  {/* Avatar + Level Overlay */}
                  <div className="relative w-24 h-24 sm:w-22 sm:h-22 md:w-20 md:h-20 flex items-center justify-center mx-auto sm:mx-0 -mt-2">
                    {/* Astronaut Image with fixed responsive sizing */}
                    <img
                      src="/leaderboard-assets/astro-profile1.svg"
                      alt="Profile Avatar"
                      className="w-full h-full object-contain pointer-events-none select-none"
                    />

                    {/* LEVEL TEXT INSIDE THE HELMET */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-white font-bold text-sm sm:text-base md:text-lg drop-shadow-[0_0_6px_rgba(0,0,0,0.6)]">
                        {profileData.avatarLevel}
                      </span>
                    </div>
                  </div>

                  {/* User Details - Centered on mobile */}
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-lg sm:text-xl font-bold text-white uppercase mb-1">
                      {profileData.username}
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      {profileData.emailVerified
                        ? "✅ Verified"
                        : "❌ Not Verified"}
                    </p>

                    <p className="text-gray-400 text-xs sm:text-sm">
                      Member since: {profileData.memberSince}
                    </p>
                  </div>
                </div>

                {/* Rank Progress Section */}
                <div className="mb-4 sm:mb-6">
                  <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 mb-2">
                    <span className="text-[#F07730] font-semibold text-sm sm:text-base">
                      {profileData.rank}
                    </span>
                    <span className="text-white font-semibold text-sm sm:text-base">
                      ${profileData.remainingToNextRank.toFixed(2)} remaining
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="absolute h-full bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-full"
                    />
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-500 text-xs">
                      {profileData.rank}
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-orange-600 to-orange-400 rounded transform rotate-45" />
                      <span className="text-orange-400 text-xs sm:text-sm font-semibold">
                        {profileData.nextRank}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Responsive */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose?.();
                      navigate("/settings");
                    }}
                    className="flex-1 py-2.5 sm:py-3 bg-gradient-to-br from-[#F07730] to-[#EFD28E]  hover:bg-white/20 rounded-lg sm:rounded-xl text-white font-bold text-sm sm:text-base transition-all border border-white/10"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;
