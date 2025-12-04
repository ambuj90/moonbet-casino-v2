// src/components/settings/ActivityPreferencesSection.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const ActivityPreferencesSection = ({
  showBetsPublicly,
  setShowBetsPublicly,
  displayStats,
  setDisplayStats,
  receiveTipNotifications,
  setReceiveTipNotifications,
}) => {
  const [isUpdating, setIsUpdating] = useState({
    bets: false,
    stats: false,
    notifications: false,
  });

  // Handle toggle with optional API call
  const handleToggle = async (type, currentValue, setter) => {
    // Optimistically update UI immediately
    setter(!currentValue);

    // Set loading state for this specific toggle
    setIsUpdating((prev) => ({ ...prev, [type]: true }));

    try {
      // Simulate API call (replace with your actual API call)
      await new Promise((resolve) => setTimeout(resolve, 300));

      // If you have an API call, do it here:
      // await fetch('/api/settings', {
      //   method: 'PUT',
      //   body: JSON.stringify({ [type]: !currentValue })
      // });
    } catch (error) {
      // If API call fails, revert the change
      setter(currentValue);
      console.error("Failed to update setting:", error);
    } finally {
      // Remove loading state
      setIsUpdating((prev) => ({ ...prev, [type]: false }));
    }
  };

  // Toggle Switch Component with loading state
  const ToggleSwitch = ({
    enabled,
    onChange,
    disabled = false,
    isLoading = false,
  }) => (
    <button
      onClick={onChange}
      disabled={disabled || isLoading}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
        enabled ? "bg-gradient-to-r from-[#a62a00] to-[#ffb8a1]" : "bg-gray-600"
      } ${
        disabled || isLoading
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer"
      }`}
    >
      {isLoading ? (
        <svg
          className="absolute inset-0 m-auto w-4 h-4 text-white animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      )}
    </button>
  );

  const SectionCard = ({ children, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300"
    >
      {children}
    </motion.div>
  );

  return (
    <>
      {/* Activity Visibility */}
      <SectionCard delay={0.1}>
        <div className="flex items-center gap-3 mb-6">
          <p className="text-xl font-bold text-white">Activity Visibility</p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="flex-1">
                <p className="text-white font-semibold mb-1">
                  Show Bets Publicly
                </p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Show your username on bets you make in the live feed and
                  recent wins feed
                </p>
              </div>
            </div>
            <ToggleSwitch
              enabled={showBetsPublicly}
              onChange={setShowBetsPublicly}
            />
          </div>

          <div className="h-px bg-white/10" />

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="flex-1">
                <p className="text-white font-semibold mb-1">
                  Display Statistics on Profile
                </p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Display your total bet statistics on your profile for other
                  players to see
                </p>
              </div>
            </div>
            <ToggleSwitch enabled={displayStats} onChange={setDisplayStats} />
          </div>
        </div>
      </SectionCard>

      {/* Preferences */}
      <SectionCard delay={0.2}>
        <div className="flex items-center gap-3 mb-6">
          <p className="text-xl font-bold text-white">Preferences</p>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="flex-1">
              <p className="text-white font-semibold mb-1">
                Receive Tip Notifications
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">
                Receive a notification when a player sends you a tip
              </p>
            </div>
          </div>
          <ToggleSwitch
            enabled={receiveTipNotifications}
            onChange={setReceiveTipNotifications}
          />
        </div>
      </SectionCard>
    </>
  );
};

export default ActivityPreferencesSection;
