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
    if (!enable2FA) {
      // Turning ON -> open popup
      setShowTwoFactorPopup(true);
      return;
    }

    // Turning OFF
    setIs2FAUpdating(true);

    try {
      const userId = userData?.id?.toLowerCase();

      await axios.post("/auth-service/api/auth/disable-2fa", { userId });

      setEnable2FA(false);
      toast.success("Two-Factor Authentication disabled");
    } catch (err) {
      console.error(err);
      toast.error("Failed to disable 2FA");
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
        <div className="w-10 h-10 bg-gradient-to-br from-[#5A3799] to-[#DC1FFF] rounded-lg flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <path
              d="M27.9857 17.6528C27.655 17.6051 27.3394 17.4838 27.0625 17.298C26.7855 17.1123 26.5543 16.8668 26.386 16.5798C26.2177 16.2929 26.1167 15.972 26.0905 15.6409C26.0643 15.3098 26.1136 14.9771 26.2347 14.6675C26.3117 14.4651 26.323 14.2439 26.2671 14.0348C26.2112 13.8257 26.0909 13.6392 25.923 13.5015C25.1818 12.8829 24.3382 12.3969 23.4297 12.0652C23.2228 11.9888 22.9969 11.9793 22.7843 12.0379C22.5716 12.0966 22.383 12.2205 22.2453 12.3919C22.0381 12.6553 21.7732 12.8684 21.4708 13.0149C21.1684 13.1614 20.8364 13.2376 20.5 13.2376C20.1636 13.2376 19.8316 13.1614 19.5292 13.0149C19.2268 12.8684 18.9619 12.6553 18.7547 12.3919C18.617 12.2205 18.4284 12.0966 18.2157 12.0379C18.0031 11.9793 17.7772 11.9888 17.5703 12.0652C16.7315 12.3714 15.9472 12.8088 15.247 13.3607C15.0705 13.4996 14.9434 13.691 14.8843 13.9069C14.8251 14.1228 14.8371 14.3518 14.9183 14.5605C15.0491 14.8782 15.1031 15.222 15.0761 15.5642C15.049 15.9065 14.9417 16.2376 14.7626 16.5312C14.5836 16.8247 14.3378 17.0725 14.045 17.2545C13.7522 17.4366 13.4206 17.5479 13.0767 17.5796C12.8534 17.6033 12.6437 17.6977 12.4785 17.8488C12.3132 17.9998 12.2011 18.1997 12.1587 18.4189C12.0532 18.938 12 19.4663 12 19.996C11.9992 20.4394 12.0352 20.8821 12.1077 21.3197C12.1437 21.5459 12.2537 21.754 12.4207 21.9118C12.5877 22.0696 12.8023 22.1683 13.0313 22.1927C13.3828 22.2255 13.7212 22.3415 14.0183 22.531C14.3154 22.7205 14.5625 22.9779 14.739 23.2818C14.9154 23.5857 15.016 23.9272 15.0325 24.2777C15.0489 24.6282 14.9806 24.9775 14.8333 25.2963C14.737 25.5037 14.7131 25.7372 14.7654 25.9597C14.8178 26.1821 14.9434 26.3809 15.1223 26.5242C15.8591 27.1317 16.6946 27.6098 17.593 27.938C17.7079 27.9776 17.8284 27.9985 17.95 28C18.1167 27.9996 18.2809 27.9596 18.4288 27.8831C18.5767 27.8067 18.704 27.6961 18.8 27.5607C19.002 27.2682 19.2727 27.0291 19.5887 26.8642C19.9047 26.6993 20.2564 26.6135 20.6133 26.6144C20.9591 26.6148 21.3001 26.6955 21.609 26.85C21.9179 27.0045 22.1862 27.2286 22.3927 27.5043C22.53 27.6878 22.7245 27.821 22.9459 27.8831C23.1672 27.9453 23.4031 27.9329 23.6167 27.8479C24.4382 27.5193 25.2029 27.0651 25.8833 26.5017C26.0543 26.3613 26.176 26.1705 26.2309 25.957C26.2859 25.7434 26.2714 25.518 26.1893 25.3132C26.0561 24.9996 25.9979 24.6594 26.0196 24.3197C26.0412 23.9799 26.142 23.6497 26.314 23.3553C26.486 23.0609 26.7245 22.8102 27.0107 22.6231C27.2969 22.436 27.6229 22.3176 27.963 22.2772C28.1835 22.2469 28.3886 22.1476 28.5486 21.9937C28.7086 21.8397 28.8151 21.6392 28.8527 21.4211C28.9437 20.9512 28.993 20.4744 29 19.996C29.0001 19.4914 28.9527 18.9879 28.8583 18.4921C28.8201 18.2788 28.7152 18.0829 28.5585 17.9322C28.4018 17.7815 28.2014 17.6838 27.9857 17.6528ZM23.3333 19.996C23.3333 20.553 23.1672 21.0975 22.8558 21.5607C22.5445 22.0238 22.102 22.3848 21.5843 22.5979C21.0666 22.8111 20.4969 22.8669 19.9473 22.7582C19.3976 22.6495 18.8928 22.3813 18.4965 21.9874C18.1003 21.5936 17.8304 21.0918 17.7211 20.5454C17.6118 19.9991 17.6679 19.4329 17.8823 18.9182C18.0968 18.4036 18.46 17.9638 18.9259 17.6543C19.3918 17.3448 19.9396 17.1797 20.5 17.1797C21.2515 17.1797 21.9721 17.4764 22.5035 18.0046C23.0348 18.5327 23.3333 19.2491 23.3333 19.996Z"
              fill="#C8C8E1"
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
                    placeholder="Current Password"
                    className="w-full px-4 py-3 bg-[#1B2132] border border-white/10 rounded-lg text-white placeholder-white focus:outline-none focus:border-[#DC1FFF] focus:ring-1 focus:ring-[#F07730] transition-all pr-12"
                    style={{
                      background:
                        "linear-gradient(109deg, rgba(255,255,255,0.50) 1.57%, rgba(255,255,255,0.10) 100%)",
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
                  >
                    {showCurrentPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="var(--cta-pink)"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.878 9.878a3 3 0 014.243 4.243"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.878 9.878L6.59 6.59M9.878 9.878l4.242 4.242M17.41 17.41L21 21M3 3l3.59 3.59a9.953 9.953 0 015.41-1.59c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="var(--cta-pink)"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
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
                    className="w-full px-4 py-3 bg-[#1B2132] border border-white/10 rounded-lg text-white placeholder-white focus:outline-none focus:border-[#DC1FFF] focus:ring-1 focus:ring-[#F07730] transition-all pr-12"
                    placeholder="New Password"
                    style={{
                      background:
                        "linear-gradient(109deg, rgba(255,255,255,0.50) 1.57%, rgba(255,255,255,0.10) 100%)",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
                  >
                    {showCurrentPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="var(--cta-pink)"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.878 9.878a3 3 0 014.243 4.243"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.878 9.878L6.59 6.59M9.878 9.878l4.242 4.242M17.41 17.41L21 21M3 3l3.59 3.59a9.953 9.953 0 015.41-1.59c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="var(--cta-pink)"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
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
                    className="w-full px-4 py-3 bg-[#1B2132] border border-white/10 rounded-lg text-white placeholder-white focus:outline-none focus:border-[#DC1FFF] focus:ring-1 focus:ring-[#F07730] transition-all pr-12"
                    placeholder="Confirm Password"
                    style={{
                      background:
                        "linear-gradient(109deg, rgba(255,255,255,0.50) 1.57%, rgba(255,255,255,0.10) 100%)",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
                  >
                    {showCurrentPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="var(--cta-pink)"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.878 9.878a3 3 0 014.243 4.243"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.878 9.878L6.59 6.59M9.878 9.878l4.242 4.242M17.41 17.41L21 21M3 3l3.59 3.59a9.953 9.953 0 015.41-1.59c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="var(--cta-pink)"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isUpdatingPassword}
                className="
    w-full py-3 
    rounded-lg text-white font-semibold 
    transition-all flex items-center justify-center gap-2 
    disabled:opacity-50 disabled:cursor-not-allowed
    hover:shadow-lg hover:shadow-[#DC1FFF]/30
  "
                style={{
                  background: "var(--cta-gradient)",
                }}
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

            // Update local stored user data
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            user.isTwoFactorEnabled = true;
            localStorage.setItem("user", JSON.stringify(user));

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
