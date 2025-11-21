// src/pages/Settings.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AccountSection from "../components/settings/AccountSection";
import ActivityPreferencesSection from "../components/settings/ActivityPreferencesSection";
import VerificationSection from "../components/settings/VerificationSection";
import SecuritySection from "../components/settings/SecuritySection";
import ConnectedWalletsSection from "../components/settings/ConnectedWalletsSection";
import LoginSignup from "../components/LoginSignup/LoginSignup";
import { toast } from "react-toastify";
import api from "../api/axios";
import axios from "axios";
import { Link } from "react-router-dom";

const Settings = () => {
  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // User data state
  const [userData, setUserData] = useState({});

  // Toggle states
  const [showBetsPublicly, setShowBetsPublicly] = useState(true);
  const [displayStats, setDisplayStats] = useState(true);
  const [receiveTipNotifications, setReceiveTipNotifications] = useState(true);
  const [enable2FA, setEnable2FA] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Copy to clipboard state
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user.id;

      console.log("userId:", userId);

      // If user not logged in
      if (!userId || !token) {
        setShowLoginModal(true);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        const { data } = await axios.get(
          `/auth-service/api/auth/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("User profile:", data);

        setUserData({
          id: data._id?.toUpperCase() || "ayrtykhvb1",
          username: data.username || "",
          email: data.email || "",
          displayName: data.displayName || "",
          memberSince: new Date(data.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          emailVerified: data.emailVerified || false,
        });

        setShowLoginModal(false);
      } catch (error) {
        console.error("❌ Error fetching user profile:", error);
        toast.error(error.response?.data?.message || "Failed to fetch profile");
        setShowLoginModal(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Simulate loading data
  useEffect(() => {
    // Simulate API call to fetch user settings
    const loadSettings = async () => {
      // Simulate 500ms loading time
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
    };

    loadSettings();
  }, []);

  // Handle copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(userData.publicId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle account update
  const handleAccountUpdate = (updatedData) => {
    setUserData({ ...userData, ...updatedData });
    // Add API call here to save to backend
    console.log("Account updated:", updatedData);
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 md:pt-24 pb-8 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center mb-8">
              <div className="h-10 bg-white/5 rounded-lg w-48" />
              <div className="flex gap-3">
                <div className="h-10 bg-white/5 rounded-lg w-32" />
                <div className="h-10 bg-white/5 rounded-lg w-24" />
              </div>
            </div>

            {/* Public ID Skeleton */}
            <div className="h-16 bg-white/5 rounded-lg mb-8" />

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="h-64 bg-white/5 rounded-2xl" />
                <div className="h-48 bg-white/5 rounded-2xl" />
                <div className="h-32 bg-white/5 rounded-2xl" />
              </div>
              <div className="space-y-6">
                <div className="h-96 bg-white/5 rounded-2xl" />
                <div className="h-64 bg-white/5 rounded-2xl" />
                <div className="h-48 bg-white/5 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //   if (showLoginModal) {
  //   return (
  //     <LoginSignup
  //       isOpen={true}
  //       onClose={() => setShowLoginModal(false)}
  //       defaultTab="login"
  //       onLoginSuccess={() => {
  //         setShowLoginModal(false);
  //         window.location.reload(); // refresh after successful login
  //       }}
  //     />
  //   );
  // }

  return (
    <div className="min-h-screen bg-[#0A0B0D] pt-20 md:pt-24 pb-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8"
        >
          <h1 className="text-2xl lg:text-4xl font-bold text-white">
            Settings
          </h1>
          <div className="flex flex-wrap gap-3">
            <Link to="/affiliate">
              <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all flex items-center gap-2 text-sm">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Affiliates
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Public ID Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-white/10"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-gray-400 text-sm">Public ID:</span>
            <code className="text-white font-mono text-xs md:text-sm bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 break-all">
              {userData.id}
            </code>
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-white/10 rounded-lg transition-all duration-300 group"
              title="Copy to clipboard"
            >
              {copied ? (
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
              ) : (
                <svg
                  className="w-4 h-4 text-gray-400 group-hover:text-[#F07730] transition-colors"
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
              )}
            </button>
          </div>
          <span className="text-gray-400 text-sm">
            Member since{" "}
            <span className="text-white font-semibold">
              {userData.memberSince}
            </span>
          </span>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            <AccountSection
              userData={userData}
              onUpdate={handleAccountUpdate}
            />

            <ActivityPreferencesSection
              showBetsPublicly={showBetsPublicly}
              setShowBetsPublicly={setShowBetsPublicly}
              displayStats={displayStats}
              setDisplayStats={setDisplayStats}
              receiveTipNotifications={receiveTipNotifications}
              setReceiveTipNotifications={setReceiveTipNotifications}
            />
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            <VerificationSection />

            <SecuritySection
              userData={userData}
              emailVerified={userData.emailVerified}
              enable2FA={enable2FA}
              setEnable2FA={setEnable2FA}
            />

            <ConnectedWalletsSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
