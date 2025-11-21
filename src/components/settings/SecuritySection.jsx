// src/components/settings/SecuritySection.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import EmailVerificationPopup from "./EmailVerificationPopup";
import TwoFactorAuthPopup from "./TwoFactorAuthPopup";
import api from "../../api/axios";
import axios from "axios";

const SecuritySection = ({
  userData,
  emailVerified,
  enable2FA,
  setEnable2FA,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [is2FAUpdating, setIs2FAUpdating] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [showTwoFactorPopup, setShowTwoFactorPopup] = useState(false);
  const [showEmailVerificationPopup, setShowEmailVerificationPopup] =
    useState(false);
  console.log("emailVerified are:", emailVerified);

  // Handle 2FA toggle with API call
  const handle2FAToggle = async () => {
    // User is turning 2FA ON
    if (!enable2FA) {
      setShowTwoFactorPopup(true);
      return; // Wait until user finishes the popup flow
    }

    // User is turning 2FA OFF
    setIs2FAUpdating(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setEnable2FA(false);
      toast.info("Two-Factor Authentication disabled");
    } catch (error) {
      console.error("Failed to disable 2FA:", error);
      toast.error("Failed to disable 2FA. Please try again.");
    } finally {
      setIs2FAUpdating(false);
    }
  };

  // Toggle Switch Component
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
        enabled ? "bg-gradient-to-r from-[#F07730] to-[#EFD28E]" : "bg-gray-600"
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

  const handleSendVerification = async () => {
    setIsLoading(true);

    try {
      const email =
        userData?.email ||
        JSON.parse(localStorage.getItem("user") || "{}")?.email ||
        localStorage.getItem("email");

      if (!email) {
        toast.error("Email not found. Please log in again.");
        setIsLoading(false);
        return;
      }

      // ✅ Call send-otp API via Axios
      const { data } = await axios.post("/auth-service/api/auth/send-otp", {
        email,
      });

      toast.success(data.message || "Verification code sent to your email!");
      setShowEmailVerificationPopup(true);
    } catch (error) {
      console.error("❌ Error sending verification:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to send verification email. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailVerification = async (otp) => {
    try {
      // For now, simulate the API call
      // Replace this with your actual API endpoint
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate OTP validation (accept "123456" for testing)
          if (otp === "123456") {
            resolve();
          } else {
            reject(new Error("Invalid OTP"));
          }
        }, 1000);
      });

      // Uncomment and modify this when you have your actual API endpoint:
      /*
      const response = await fetch(
        "http://localhost:4000/api/auth/verify-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            otp: otp,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid OTP");
      }
      */

      toast.success("Email verified successfully!");
      // Update the parent component or reload as needed
      window.location.reload();
      return true;
    } catch (error) {
      console.error("Verification error:", error);
      throw error;
    }
  };

  const handleUpdatePassword = () => {
    setShowPasswordForm(!showPasswordForm);
    if (showPasswordForm) {
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    // ✅ Match backend password policy
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,15}$/;
    if (!passwordRegex.test(newPassword)) {
      toast.error(
        "Password must be 12–15 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    setIsUpdatingPassword(true);

    try {
      const username =
        userData?.username ||
        JSON.parse(localStorage.getItem("user") || "{}")?.username;

      if (!username) {
        toast.error("Username not found. Please log in again.");
        setIsUpdatingPassword(false);
        return;
      }

      // ✅ Call change-password API via Axios
      const { data } = await axios.post(
        "/auth-service/api/auth/change-password",
        {
          username,
          oldPassword: currentPassword,
          newPassword,
        }
      );

      toast.success(data.message || "Password changed successfully ✅");

      setShowPasswordForm(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("❌ Change password error:", error);
      toast.error(
        error.response?.data?.error ||
          "Failed to change password. Please try again."
      );
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const PasswordField = React.memo(function PasswordField({
    name,
    label,
    value,
    showPassword,
    setShowPassword,
    onChange,
  }) {
    return (
      <div onMouseDown={(e) => e.stopPropagation()}>
        <label className="block text-sm text-gray-400 mb-2">{label}</label>
        <div className="relative">
          <input
            key={name} // ✅ stable identity
            type={showPassword ? "text" : "password"}
            name={name}
            value={value}
            onChange={onChange} // ✅ passed down (stable)
            className="w-full px-4 py-3 bg-[#1B2132] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#F07730] focus:ring-1 focus:ring-[#F07730] transition-all pr-12"
            placeholder={label}
            autoComplete={
              name === "currentPassword"
                ? "current-password"
                : name === "newPassword"
                ? "new-password"
                : "new-password"
            }
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
          >
            {showPassword ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-lg flex items-center justify-center">
          <svg
            className="w-5 h-5 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <p className="text-xl font-bold text-white">Security</p>
      </div>

      <div className="space-y-4">
        {/* Verify Email */}
        <div className="p-4 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-all">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
            <div className="flex-1">
              <p className="text-white font-semibold mb-1">Verify Email</p>
              {emailVerified ? (
                <span className="inline-block px-2 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded">
                  Verified
                </span>
              ) : (
                <span className="inline-block px-2 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded animate-pulse">
                  Not Verified
                </span>
              )}
            </div>
            {!emailVerified && (
              <button
                onClick={handleSendVerification}
                disabled={isLoading}
                className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white font-semibold hover:scale-105 transition-transform text-sm whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
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
                    Sending...
                  </span>
                ) : (
                  "Send Verification"
                )}
              </button>
            )}
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Increase your account security by verifying your email
          </p>
        </div>

        {/* Update Password */}
        {/* Update Password */}
        <div className="p-4 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-all">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
            <div className="flex-1">
              <p className="text-white font-semibold mb-1">Update Password</p>
            </div>
            <button
              onClick={() => {
                setShowPasswordForm((prev) => !prev);
                setPasswordData({
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                });
              }}
              className="w-full sm:w-auto px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-semibold transition-all text-sm whitespace-nowrap"
            >
              {showPasswordForm ? "Cancel" : "Update Password"}
            </button>
          </div>

          {!showPasswordForm && (
            <p className="text-sm text-gray-400 leading-relaxed">
              Update your password to improve account security
            </p>
          )}

          {showPasswordForm && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePasswordSubmit();
              }}
              className="mt-4 space-y-4"
              autoComplete="off"
            >
              {/* Current Password */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    autoComplete="current-password"
                    className="w-full px-4 py-3 bg-[#1B2132] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#F07730] focus:ring-1 focus:ring-[#F07730] transition-all pr-12"
                    placeholder="Current Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
                  >
                    {showCurrentPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    autoComplete="new-password"
                    className="w-full px-4 py-3 bg-[#1B2132] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#F07730] focus:ring-1 focus:ring-[#F07730] transition-all pr-12"
                    placeholder="New Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
                  >
                    {showNewPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    autoComplete="new-password"
                    className="w-full px-4 py-3 bg-[#1B2132] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#F07730] focus:ring-1 focus:ring-[#F07730] transition-all pr-12"
                    placeholder="Confirm Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isUpdatingPassword}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-green-500/30"
              >
                {isUpdatingPassword ? "Updating..." : "Save Changes"}
              </button>
            </form>
          )}
        </div>

        {/* Enable 2FA */}
        <div className="p-4 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-all">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-white font-semibold mb-1">Enable 2FA</p>
              <p className="text-sm text-gray-400 leading-relaxed">
                Two-Factor Authentication helps secure your account from
                unauthorized access
              </p>
            </div>
            <ToggleSwitch
              enabled={enable2FA}
              onChange={() => {
                if (!enable2FA) setShowTwoFactorPopup(true);
                else handle2FAToggle();
              }}
              isLoading={is2FAUpdating}
            />
          </div>
        </div>
      </div>

      {/* Email Verification Popup */}
      <EmailVerificationPopup
        isOpen={showEmailVerificationPopup}
        onClose={() => setShowEmailVerificationPopup(false)}
        onVerify={handleEmailVerification}
        userEmail={userData.email}
        resendCooldown={60}
      />
      {/* Two Factor Auth Popup */}
      <TwoFactorAuthPopup
        isOpen={showTwoFactorPopup}
        onClose={() => setShowTwoFactorPopup(false)}
        onComplete={(success) => {
          if (success) {
            setEnable2FA(true);
            setShowTwoFactorPopup(false);
          }
        }}
        userEmail={userData?.email}
        userId={userData?.id?.toLowerCase()}
      />
    </motion.div>
  );
};

export default SecuritySection;
