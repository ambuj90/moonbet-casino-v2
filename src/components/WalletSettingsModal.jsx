// src/components/WalletSettingsModal.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCurrencyStore } from "../store/useCurrencyStore";

const WalletSettingsModal = ({ isOpen, onClose }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id;
  const setPreferredCurrency = useCurrencyStore((s) => s.setPreferredCurrency);
  const setGameCurrency = useCurrencyStore((s) => s.setGameCurrency);

  // Currency options with their flags/icons
  const currencies = [
    // { code: "AUD", name: "Australian Dollar", flag: "🇦🇺", color: "bg-red-500" },
    // { code: "BRL", name: "Brazilian Real", flag: "🇧🇷", color: "bg-green-500" },
    // { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦", color: "bg-red-500" },
    // { code: "EUR", name: "Euro", flag: "🇪🇺", color: "bg-blue-500" },
    // { code: "GBP", name: "British Pound", flag: "🇬🇧", color: "bg-blue-600" },
    { code: "USD", name: "US Dollar", flag: "🇺🇸", color: "bg-yellow-500" },
  ];

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // ✅ Fetch user's gameCurrency when modal opens
  useEffect(() => {
    if (!isOpen || !userId) return;

    const fetchCurrency = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `/wallet-service/api/games/${userId}/check-currency`
        );

        if (data?.success && data?.data?.gameCurrency) {
          setSelectedCurrency(data.data.gameCurrency);
        }
      } catch (err) {
        console.error("❌ Failed to fetch currency:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrency();
  }, [isOpen, userId]);

  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      setSaving(true);

      await axios.put(`/wallet-service/api/games/${userId}/currency`, {
        currency: selectedCurrency,
      });

      // 🔥 UPDATE LOCAL STORAGE THROUGH ZUSTAND
      setGameCurrency(selectedCurrency);

      // 🔥 Notify GamePage
      window.dispatchEvent(new Event("preferredCurrencyUpdated"));

      onClose();
    } catch (err) {
      console.error(
        "Failed to update currency:",
        err?.response?.data || err.message
      );
      alert(
        err?.response?.data?.message ||
          "Failed to update currency. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0  /70 backdrop-blur-sm z-[100] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-[101] p-4">
        <div
          className="rounded-2xl w-full max-w-2xl shadow-2xl transform transition-all duration-300 scale-100"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            boxShadow:
              "rgba(0, 0, 0, 0.5) 0px 20px 60px, rgba(240, 119, 48, 0.1) 0px 0px 100px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: "var(--cta-pink-gradient)",
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="#fff"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-xl font-bold text-white">Wallet Settings</p>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="31"
                viewBox="0 0 32 31"
                fill="none"
              >
                <rect
                  x="1"
                  y="1"
                  width="28.1644"
                  height="30"
                  rx="7"
                  transform="matrix(-4.10515e-08 1 1 4.62187e-08 -4.62187e-08 1.35958e-06)"
                  fill="#080808"
                  fillOpacity="0.2"
                  stroke="url(#paint0_linear_9379_1117)"
                  strokeWidth="2"
                />
                <path
                  d="M10 10.6182C10 10.7821 10.0754 10.9397 10.21 11.0557L15.4512 15.5664L10.21 20.0791C10.0832 20.1963 10.0143 20.3516 10.0176 20.5117C10.021 20.6717 10.0962 20.8243 10.2275 20.9375C10.3592 21.0508 10.5374 21.1163 10.7236 21.1191C10.9096 21.1219 11.0894 21.0622 11.2256 20.9531L16.4678 16.4414L21.71 20.9531C21.7758 21.0139 21.8552 21.0629 21.9434 21.0967C22.0315 21.1305 22.1271 21.1479 22.2236 21.1494C22.32 21.1508 22.4155 21.1355 22.5049 21.1045C22.5943 21.0734 22.6759 21.0274 22.7441 20.9688C22.8124 20.91 22.8662 20.8397 22.9023 20.7627C22.9384 20.6858 22.9567 20.6035 22.9551 20.5205C22.9534 20.4374 22.9319 20.3552 22.8926 20.2793C22.8533 20.2035 22.7962 20.1357 22.7256 20.0791L17.4834 15.5664L22.7256 11.0557C22.8602 10.9397 22.9365 10.7821 22.9365 10.6182C22.9365 10.4542 22.8602 10.2967 22.7256 10.1807C22.5909 10.065 22.4081 10 22.2178 10C22.0274 10.0001 21.8447 10.0649 21.71 10.1807L16.4678 14.6924L11.2256 10.1807C11.0909 10.065 10.9081 10 10.7178 10C10.5274 10.0001 10.3446 10.0649 10.21 10.1807C10.0754 10.2967 10 10.4542 10 10.6182Z"
                  fill="white"
                  fillOpacity="0.9"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_9379_1117"
                    x1="2.11317"
                    y1="-7.09502e-06"
                    x2="17.9712"
                    y2="34.4136"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" stopOpacity="0.4" />
                    <stop
                      offset="0.405687"
                      stopColor="white"
                      stopOpacity="0.01"
                    />
                    <stop
                      offset="0.574372"
                      stopColor="white"
                      stopOpacity="0.01"
                    />
                    <stop offset="1" stopColor="white" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Currency Section */}
            <div className="mb-8">
              <h3 className="text-[#E1E1E1] text-sm font-medium mb-4">
                Currency
              </h3>

              {loading ? (
                <p className="text-[#E1E1E1] text-sm">Loading currencies...</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => setSelectedCurrency(currency.code)}
                      disabled={saving}
                      className={`
                        relative flex items-center gap-3 p-3 rounded-xl
                        transition-all duration-200
                        ${
                          selectedCurrency === currency.code
                            ? "bg-white/10 border-2 border-[#a62a00]"
                            : "bg-white/5 border-2 border-transparent hover:bg-white/10"
                        }
                        ${saving ? "opacity-60 cursor-not-allowed" : ""}
                      `}
                    >
                      {/* Radio Circle */}
                      <div className="relative">
                        <div
                          className={`w-5 h-5 rounded-full border-2 ${
                            selectedCurrency === currency.code
                              ? "border-[#fff]"
                              : "border-gray-500"
                          }`}
                        >
                          {selectedCurrency === currency.code && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-2.5 h-2.5 rounded-full bg-[#fff]"></div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Currency Info */}
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-full ${currency.color} flex items-center justify-center text-white text-xs font-bold`}
                        >
                          {currency.flag}
                        </div>
                        <span className="text-white font-medium">
                          {currency.code}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Box */}
            {/* <div
              className="rounded-xl p-4"
              style={{
                background:
                  "linear-gradient(109deg, rgba(255, 255, 255, 0.50) 1.57%, rgba(255, 255, 255, 0.10) 100%)",
              }}
            >
              <div className="flex gap-3">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: "var(--cta-pink-gradient)",
                  }}
                >
                  <svg className="w-4 h-4" fill="#fff" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-white text-sm leading-relaxed">
                  By switching currencies, your balance will be fully converted
                  to the selected currency using current exchange rates.
                </p>
              </div>
            </div> */}

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                disabled={saving}
                className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-gray-300 font-medium rounded-xl transition-all disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="w-[176px] h-[44px] 
                 text-white custom-btn
                 text-[#fff] font-[600] text-[16px] 
                 font-['Neue_Plack',sans-serif]
                 rounded-lg shadow-md 
                 transition-all duration-300
                 hover:opacity-90
                 flex items-center justify-center"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WalletSettingsModal;
