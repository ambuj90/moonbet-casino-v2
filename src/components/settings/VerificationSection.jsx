// src/components/settings/VerificationSection.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VerificationSection = () => {
  const [expandedVerification, setExpandedVerification] = useState(null);

  const verificationLevels = [
    {
      id: 1,
      title: "Level 1 - Personal Information",
      description:
        "Verify your basic personal details including full name, date of birth, and nationality.",
      status: "incomplete",
      benefits: [
        "Access to basic gaming features",
        "Standard withdrawal limits",
      ],
    },
    {
      id: 2,
      title: "Level 2 - Upload ID and Liveness Check",
      description:
        "Upload a government-issued ID and complete our liveness verification process.",
      status: "incomplete",
      benefits: ["Increased withdrawal limits", "Priority support"],
    },
    {
      id: 3,
      title: "Level 3 - Proof of Address",
      description:
        "Provide a recent utility bill or bank statement showing your residential address.",
      status: "incomplete",
      benefits: ["Higher transaction limits", "VIP status eligibility"],
    },
    {
      id: 4,
      title: "Level 4 - Source of Income",
      description:
        "Verify your source of funds for enhanced security and compliance.",
      status: "incomplete",
      benefits: ["Maximum withdrawal limits", "Exclusive VIP perks"],
    },
  ];

  const handleStartVerification = (levelId) => {
    console.log(`Starting verification for level ${levelId}`);
    // Add your verification logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center">
          <svg
            className="w-5 h-5 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <p className="text-xl font-bold text-white">Verification</p>
      </div>

      <div className="space-y-3">
        {verificationLevels.map((level) => (
          <div key={level.id} className="overflow-hidden">
            <button
              onClick={() =>
                setExpandedVerification(
                  expandedVerification === level.id ? null : level.id
                )
              }
              className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 group-hover:text-[#F07730] transition-colors">
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold text-sm group-hover:text-[#F07730] transition-colors">
                    {level.title}
                  </p>
                </div>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                  expandedVerification === level.id ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <AnimatePresence>
              {expandedVerification === level.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 py-4 bg-white/5 border border-white/10 border-t-0 rounded-b-lg space-y-4">
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {level.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-white">
                        Benefits:
                      </h4>
                      <ul className="space-y-1">
                        {level.benefits.map((benefit, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-gray-400 flex items-center gap-2"
                          >
                            <svg
                              className="w-4 h-4 text-green-500 flex-shrink-0"
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
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => handleStartVerification(level.id)}
                      className="w-full px-4 py-2 bg-gradient-to-r from-[#F07730] to-[#EFD28E] rounded-lg text-white font-semibold hover:scale-105 transition-transform"
                    >
                      Start Verification
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default VerificationSection;
