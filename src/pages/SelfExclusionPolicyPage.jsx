// SelfExclusionPolicyPage.jsx - Clean Self-Exclusion Policy Page with Glass Style
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Glass Section Component with dark theme
const PolicySection = ({ number, title, children }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: number * 0.1 }}
      className="mb-8"
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer p-6 transition-all duration-300 hover:bg-white/5"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white flex items-center gap-3">
            <span
              className="px-3 py-1 text-gray-300"
              style={{
                borderRadius: "4px",
                background: "rgba(255, 255, 255, 0.05)",
              }}
            >
              {number}
            </span>
            <span className="text-gray-100">{title}</span>
          </h2>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-400 text-xl"
          >
            ▼
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Subsection Component with glass styling
const SubSection = ({ number, title, children }) => {
  return (
    <div
      className="mb-6 p-5 hover:bg-white/5 transition-all"
      style={{
        borderRadius: "8px",
        border: "1px solid rgba(255, 255, 255, 0.20)",
      }}
    >
      <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-white">
        <span
          className="px-2 py-0.5 text-sm font-bold text-gray-300"
          style={{
            borderRadius: "4px",
            border: "1px solid rgba(255, 255, 255, 0.20)",
            background: "rgba(255, 255, 255, 0.05)",
          }}
        >
          {number}
        </span>
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
};

// List Item Component with minimal styling
const ListItem = ({ children }) => (
  <div className="flex items-start gap-3 mb-2">
    <span className="text-gray-400 text-lg mt-1">•</span>
    <p className="text-gray-300 flex-1">{children}</p>
  </div>
);

// Highlight Box Component
const HighlightBox = ({ children, variant = "default" }) => {
  const variants = {
    default: "rgba(255, 255, 255, 0.05)",
    warning: "rgba(255, 100, 100, 0.1)",
    info: "rgba(100, 150, 255, 0.1)",
    success: "rgba(100, 255, 100, 0.1)",
  };

  return (
    <div
      className="p-4 mt-4"
      style={{
        borderRadius: "8px",
        border: "1px solid rgba(255, 255, 255, 0.30)",
        background: variants[variant],
      }}
    >
      {children}
    </div>
  );
};

// Exclusion Period Card Component
const ExclusionPeriodCard = ({
  period,
  duration,
  description,
  recommended,
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="p-4 rounded-lg transition-all cursor-pointer"
    style={{
      background: recommended
        ? "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))"
        : "rgba(255, 255, 255, 0.05)",
      border: recommended
        ? "1px solid rgba(59, 130, 246, 0.3)"
        : "1px solid rgba(255, 255, 255, 0.15)",
    }}
  >
    {recommended && (
      <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-400 bg-blue-500/20 rounded-full mb-2">
        Recommended
      </span>
    )}
    <div className="flex justify-between items-start mb-2">
      <h4 className="text-white font-semibold">{period}</h4>
      <span className="text-gray-400 text-sm">{duration}</span>
    </div>
    {description && <p className="text-gray-400 text-sm">{description}</p>}
  </motion.div>
);

// Main Self-Exclusion Policy Page Component
const SelfExclusionPolicyPage = () => {
  const [activeSection, setActiveSection] = useState(null);

  // Table of Contents
  const sections = [
    { id: 1, title: "OVERVIEW" },
    { id: 2, title: "SELF-EXCLUSION OPTIONS" },
    { id: 3, title: "HOW TO REQUEST SELF-EXCLUSION" },
    { id: 4, title: "COOLING-OFF PERIOD" },
    { id: 5, title: "CONFIRMATION AND ACTIVATION" },
    { id: 6, title: "ACCOUNT RESTRICTIONS DURING SELF-EXCLUSION" },
    { id: 7, title: "ACCOUNT CLOSURE VS. SELF-EXCLUSION" },
    { id: 8, title: "END OF SELF-EXCLUSION PERIOD" },
    { id: 9, title: "REOPENING A SELF-EXCLUDED ACCOUNT" },
    { id: 10, title: "COMPANY LIABILITY DISCLAIMER" },
    { id: 11, title: "MULTI-OPERATOR SELF-EXCLUSION" },
    { id: 12, title: "CONTACT AND SUPPORT" },
    { id: 13, title: "RESPONSIBLE GAMBLING COMMITMENT" },
  ];

  const exclusionPeriods = [
    {
      period: "24 hours",
      duration: "Cooling-off",
      description: "Quick break to reassess",
      recommended: false,
    },
    {
      period: "7 days",
      duration: "One week",
      description: "Short-term pause",
      recommended: false,
    },
    {
      period: "1 month",
      duration: "30 days",
      description: "Monthly reset period",
      recommended: true,
    },
    {
      period: "3 months",
      duration: "90 days",
      description: "Quarterly break",
      recommended: false,
    },
    {
      period: "6 months",
      duration: "Six months",
      description: "Extended pause",
      recommended: false,
    },
    {
      period: "1 year",
      duration: "12 months",
      description: "Annual exclusion",
      recommended: false,
    },
    {
      period: "5 years",
      duration: "Long-term",
      description: "Extended self-exclusion",
      recommended: false,
    },
    {
      period: "Permanent",
      duration: "Indefinite",
      description: "Cannot be reversed",
      recommended: false,
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Subtle animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 600,
              height: 600,
              background: `radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)`,
              left: `${i * 33}%`,
              top: `${i * 20}%`,
            }}
            animate={{
              y: [0, 30, 0],
              x: [0, -20, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
            SELF-EXCLUSION POLICY
          </h1>
          <p className="text-gray-400 text-lg">
            Last Updated: November 18, 2025
          </p>
        </motion.header>

        {/* Table of Contents */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
          style={{
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.10)",
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="p-8">
            <h2 className="text-xl font-bold text-white mb-6">
              TABLE OF CONTENTS
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {sections.map((section) => (
                <motion.div
                  key={section.id}
                  whileHover={{ x: 5 }}
                  className="cursor-pointer"
                  onClick={() => {
                    const element = document.getElementById(
                      `section-${section.id}`
                    );
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <div className="flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-white/5">
                    <span className="text-gray-400 text-sm font-mono">
                      {String(section.id).padStart(2, "0")}
                    </span>
                    <span className="text-gray-200">{section.title}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Policy Sections */}
        <div
          style={{
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            background: "rgba(255, 255, 255, 0.02)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Section 1: OVERVIEW */}
          <div id="section-1">
            <PolicySection number="01" title="OVERVIEW">
              <p className="text-gray-300 mb-4">
                Moonbet Games LLC (the "Company" or "we") recognizes the
                importance of responsible gaming and offers customers (the
                "Customers" or "you") the ability to self-exclude from their
                accounts on Moonbet.games and associated platforms.
              </p>

              <p className="text-gray-300">
                Self-exclusion is a voluntary measure that allows you to
                restrict your access to gaming for a specified period to support
                responsible gambling practices.
              </p>

              <HighlightBox variant="info">
                <p className="text-gray-200">
                  <span className="font-semibold">Important:</span>{" "}
                  Self-exclusion is a serious commitment. Once activated (after
                  the cooling-off period), it cannot be reversed until the
                  exclusion period ends.
                </p>
              </HighlightBox>
            </PolicySection>
          </div>

          {/* Section 2: SELF-EXCLUSION OPTIONS */}
          <div id="section-2">
            <PolicySection number="02" title="SELF-EXCLUSION OPTIONS">
              <p className="text-gray-300 mb-6">
                Moonbet offers the following self-exclusion periods:
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exclusionPeriods.map((period, index) => (
                  <ExclusionPeriodCard
                    key={index}
                    period={period.period}
                    duration={period.duration}
                    description={period.description}
                    recommended={period.recommended}
                  />
                ))}
              </div>

              <p className="text-gray-300 mt-6">
                You may select the self-exclusion period that best suits your
                needs.
              </p>
            </PolicySection>
          </div>

          {/* Section 3: HOW TO REQUEST SELF-EXCLUSION */}
          <div id="section-3">
            <PolicySection number="03" title="HOW TO REQUEST SELF-EXCLUSION">
              <SubSection number="3.1" title="Submission Methods">
                <p className="text-gray-300 mb-4">
                  Self-exclusion requests can be submitted through:
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl">📧</span>
                      <h4 className="text-white font-semibold">Email</h4>
                    </div>
                    <p className="text-gray-400 text-sm">
                      support@moonbet.games
                    </p>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl">💬</span>
                      <h4 className="text-white font-semibold">Live Chat</h4>
                    </div>
                    <p className="text-gray-400 text-sm">
                      24/7 via Moonbet.games
                    </p>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl">⚙️</span>
                      <h4 className="text-white font-semibold">
                        Account Settings
                      </h4>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Self-exclusion tool in dashboard
                    </p>
                  </div>
                </div>
              </SubSection>

              <SubSection number="3.2" title="Required Information">
                <p className="text-gray-300 mb-4">
                  When requesting self-exclusion, provide:
                </p>

                <ListItem>Your full name</ListItem>
                <ListItem>Account email address</ListItem>
                <ListItem>Wallet address (if applicable)</ListItem>
                <ListItem>Desired self-exclusion period</ListItem>
                <ListItem>Reason for self-exclusion (optional)</ListItem>
              </SubSection>

              <SubSection number="3.3" title="Email Requirement">
                <HighlightBox variant="warning">
                  <p className="text-gray-200">
                    <span className="font-semibold">Important:</span> Requests
                    must be sent from the email address registered with your
                    Moonbet account. Requests from alternate email addresses
                    will not be processed.
                  </p>
                </HighlightBox>
              </SubSection>
            </PolicySection>
          </div>

          {/* Section 4: COOLING-OFF PERIOD */}
          <div id="section-4">
            <PolicySection number="04" title="COOLING-OFF PERIOD">
              <SubSection number="4.1" title="24-Hour Consideration Period">
                <p className="text-gray-300 mb-4">
                  For all self-exclusion requests, Moonbet provides a 24-hour
                  cooling-off period during which:
                </p>

                <ListItem>
                  Your account is immediately restricted from gameplay
                </ListItem>
                <ListItem>
                  You may contact support to cancel the self-exclusion
                </ListItem>
                <ListItem>
                  No deposits or withdrawals are permitted during this period
                </ListItem>
                <ListItem>
                  After 24 hours, self-exclusion becomes permanent for the
                  requested period
                </ListItem>

                <HighlightBox variant="warning">
                  <p className="text-gray-200">
                    <span className="font-semibold">Important:</span> After the
                    24-hour cooling-off period expires, self-exclusion cannot be
                    cancelled until the exclusion period ends.
                  </p>
                </HighlightBox>
              </SubSection>
            </PolicySection>
          </div>

          {/* Section 5: CONFIRMATION AND ACTIVATION */}
          <div id="section-5">
            <PolicySection number="05" title="CONFIRMATION AND ACTIVATION">
              <SubSection number="5.1" title="Confirmation Email">
                <p className="text-gray-300 mb-4">
                  All self-exclusion requests are considered fulfilled only upon
                  receipt of a confirmation email from our Customer Support
                  Department. You will receive:
                </p>

                <ListItem>
                  Confirmation that your self-exclusion has been activated
                </ListItem>
                <ListItem>
                  The effective date and end date of exclusion
                </ListItem>
                <ListItem>Your exclusion reference number</ListItem>
                <ListItem>
                  Instructions on what to do if you have questions
                </ListItem>
              </SubSection>

              <SubSection number="5.2" title="Activation Timeline">
                <ListItem>
                  Self-exclusion typically activated within 24 hours of
                  confirmation
                </ListItem>
                <ListItem>
                  Account immediately restricted from login and gameplay
                </ListItem>
                <ListItem>
                  Any pending transactions completed before exclusion takes
                  effect
                </ListItem>
                <ListItem>
                  Remaining account balance frozen and inaccessible during
                  exclusion
                </ListItem>
              </SubSection>
            </PolicySection>
          </div>

          {/* Section 6: ACCOUNT RESTRICTIONS DURING SELF-EXCLUSION */}
          <div id="section-6">
            <PolicySection
              number="06"
              title="ACCOUNT RESTRICTIONS DURING SELF-EXCLUSION"
            >
              <p className="text-gray-300 mb-4">
                During self-exclusion, your account will be:
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-red-400">🔒</span>
                    <h4 className="text-white font-semibold">Locked</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Unable to login or access gaming
                  </p>
                </div>

                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-red-400">❌</span>
                    <h4 className="text-white font-semibold">No Deposits</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Cannot deposit additional funds
                  </p>
                </div>

                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-red-400">🚫</span>
                    <h4 className="text-white font-semibold">No Withdrawals</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Cannot withdraw funds (except where required by law)
                  </p>
                </div>

                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-red-400">🎮</span>
                    <h4 className="text-white font-semibold">No Gameplay</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    All games and wagering disabled
                  </p>
                </div>

                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-red-400">🎁</span>
                    <h4 className="text-white font-semibold">No Bonuses</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Excluded from promotions and bonus offers
                  </p>
                </div>

                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-red-400">📧</span>
                    <h4 className="text-white font-semibold">No Marketing</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Removed from all promotional communications
                  </p>
                </div>
              </div>

              <SubSection number="6.1" title="Access to Support">
                <p className="text-gray-300">
                  You may contact customer support at support@moonbet.games or
                  via live chat if you have questions about your exclusion.
                  Support cannot override or cancel the exclusion during the
                  active period.
                </p>
              </SubSection>
            </PolicySection>
          </div>

          {/* Section 7: ACCOUNT CLOSURE VS. SELF-EXCLUSION */}
          <div id="section-7">
            <PolicySection
              number="07"
              title="ACCOUNT CLOSURE VS. SELF-EXCLUSION"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <SubSection number="7.1" title="Simple Account Closure">
                  <p className="text-gray-300 mb-4">
                    If you request account closure without specifying a reason
                    or exclusion period:
                  </p>

                  <ListItem>
                    Account is closed but may be reopened at any time upon your
                    request
                  </ListItem>
                  <ListItem>No cooling-off period applies</ListItem>
                  <ListItem>Remaining funds returned upon request</ListItem>
                  <ListItem>
                    Different from self-exclusion (cannot be reopened during an
                    active exclusion)
                  </ListItem>
                </SubSection>

                <SubSection
                  number="7.2"
                  title="Self-Exclusion (Specified Period)"
                >
                  <p className="text-gray-300 mb-4">
                    If you request self-exclusion with a specific period:
                  </p>

                  <ListItem>
                    Account locked for the entire requested period
                  </ListItem>
                  <ListItem>
                    Cannot be reopened during exclusion, under any circumstances
                  </ListItem>
                  <ListItem>
                    After exclusion period expires, account may be reopened upon
                    request
                  </ListItem>
                  <ListItem>
                    Permanent self-exclusion cannot be reversed
                  </ListItem>
                </SubSection>
              </div>
            </PolicySection>
          </div>

          {/* Section 8: END OF SELF-EXCLUSION PERIOD */}
          <div id="section-8">
            <PolicySection number="08" title="END OF SELF-EXCLUSION PERIOD">
              <SubSection number="8.1" title="Automatic Account Reactivation">
                <p className="text-gray-300 mb-4">
                  When your self-exclusion period ends:
                </p>

                <ListItem>
                  Your account may be automatically reactivated, or
                </ListItem>
                <ListItem>
                  You must request reactivation by contacting
                  support@moonbet.games
                </ListItem>
                <ListItem>
                  Reactivation is not automatic; you must take action to resume
                  gameplay
                </ListItem>
              </SubSection>

              <SubSection number="8.2" title="Cooling-Off Before Reactivation">
                <p className="text-gray-300 mb-4">
                  Even after your exclusion period ends, Moonbet recommends:
                </p>

                <ListItem>
                  Taking additional time to consider your return to gaming
                </ListItem>
                <ListItem>
                  Contacting support to discuss responsible gambling practices
                </ListItem>
                <ListItem>
                  Setting deposit/loss limits before resuming gameplay
                </ListItem>
              </SubSection>

              <SubSection number="8.3" title="Permanent Self-Exclusion">
                <HighlightBox variant="warning">
                  <p className="text-gray-200">
                    Permanent self-exclusion cannot be reversed under any
                    circumstances. Your account will remain closed indefinitely.
                  </p>
                </HighlightBox>
              </SubSection>
            </PolicySection>
          </div>

          {/* Section 9: REOPENING A SELF-EXCLUDED ACCOUNT */}
          <div id="section-9">
            <PolicySection
              number="09"
              title="REOPENING A SELF-EXCLUDED ACCOUNT"
            >
              <SubSection number="9.1" title="Eligibility">
                <p className="text-gray-300 mb-4">
                  After your self-exclusion period expires, you may request
                  reactivation by:
                </p>

                <ListItem>
                  Emailing support@moonbet.games from your registered email
                  address
                </ListItem>
                <ListItem>
                  Providing your account details and request for reactivation
                </ListItem>
                <ListItem>
                  Confirming understanding of responsible gambling policies
                </ListItem>
              </SubSection>

              <SubSection number="9.2" title="Important Requirements">
                <ListItem>
                  Requests must come from the email address originally
                  registered with the account
                </ListItem>
                <ListItem>
                  Reactivation requests will not be processed from alternate
                  email addresses
                </ListItem>
                <ListItem>
                  Moonbet may request additional information before reactivating
                  accounts
                </ListItem>
              </SubSection>

              <SubSection number="9.3" title="Reactivation Timeline">
                <ListItem>
                  Reactivation requests processed within 24-48 hours
                </ListItem>
                <ListItem>
                  You will receive confirmation when account is reactivated
                </ListItem>
                <ListItem>
                  Responsible gambling tools (limits, cooling-off options)
                  available immediately upon reactivation
                </ListItem>
              </SubSection>
            </PolicySection>
          </div>

          {/* Section 10: COMPANY LIABILITY DISCLAIMER */}
          <div id="section-10">
            <PolicySection number="10" title="COMPANY LIABILITY DISCLAIMER">
              <HighlightBox variant="warning">
                <h4 className="text-white font-semibold mb-3">
                  Important Notice
                </h4>
                <p className="text-gray-200 mb-3">
                  Moonbet is not responsible for:
                </p>

                <div className="space-y-2">
                  <ListItem>
                    New accounts opened by self-excluded customers using
                    different email addresses or wallets
                  </ListItem>
                  <ListItem>
                    Accounts opened by someone other than the self-excluded
                    customer
                  </ListItem>
                  <ListItem>
                    Gameplay occurring on accounts opened after self-exclusion
                    initiated
                  </ListItem>
                  <ListItem>Funds wagered on unauthorized accounts</ListItem>
                </div>
              </HighlightBox>

              <div className="mt-6">
                <p className="text-gray-300 mb-4">
                  If a self-excluded customer bypasses Moonbet's systems and
                  opens a new account:
                </p>

                <ListItem>
                  No refunds will be processed for wagering on the new account
                </ListItem>
                <ListItem>
                  The new account will be identified and closed upon discovery
                </ListItem>
                <ListItem>
                  The customer remains bound by the original self-exclusion
                  agreement
                </ListItem>
                <ListItem>
                  Funds may be forfeited in accordance with Terms & Conditions
                </ListItem>
              </div>
            </PolicySection>
          </div>

          {/* Section 11: MULTI-OPERATOR SELF-EXCLUSION */}
          <div id="section-11">
            <PolicySection number="11" title="MULTI-OPERATOR SELF-EXCLUSION">
              <SubSection number="11.1" title="Industry-Wide Exclusion">
                <p className="text-gray-300 mb-4">
                  Moonbet recognizes that some players may wish to self-exclude
                  from multiple gaming platforms simultaneously. While Moonbet
                  maintains its own self-exclusion system, players may also:
                </p>

                <ListItem>
                  Contact National Council on Problem Gambling (NCPG) -
                  <a
                    href="https://www.ncpgambling.org/"
                    className="text-blue-400 hover:text-blue-300 ml-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.ncpgambling.org/
                  </a>
                </ListItem>
                <ListItem>
                  Participate in industry-wide exclusion programs where
                  available
                </ListItem>
                <ListItem>
                  Request information about cross-platform exclusion options
                </ListItem>
              </SubSection>
            </PolicySection>
          </div>

          {/* Section 12: CONTACT AND SUPPORT */}
          <div id="section-12">
            <PolicySection number="12" title="CONTACT AND SUPPORT">
              <SubSection
                number="12.1"
                title="Self-Exclusion Requests and Questions"
              >
                <HighlightBox>
                  <div className="space-y-2">
                    <p className="text-gray-200">
                      <span className="font-semibold">Email:</span>{" "}
                      support@moonbet.games
                    </p>
                    <p className="text-gray-200">
                      <span className="font-semibold">Live Chat:</span> 24/7 via
                      Moonbet.games
                    </p>
                    <p className="text-gray-200">
                      <span className="font-semibold">Subject Line:</span>{" "}
                      "Self-Exclusion Request"
                    </p>
                  </div>
                </HighlightBox>
              </SubSection>

              <SubSection number="12.2" title="Responsible Gambling Resources">
                <p className="text-gray-300 mb-4">
                  If you're struggling with gambling, support is available:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">
                      National Council on Problem Gambling
                    </h4>
                    <p className="text-gray-400 text-sm mb-2">
                      <a
                        href="https://www.ncpgambling.org/"
                        className="text-blue-400 hover:text-blue-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        https://www.ncpgambling.org/
                      </a>
                    </p>
                    <p className="text-gray-400 text-sm">📞 1-800-522-4700</p>
                  </div>

                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">
                      Gamblers Anonymous
                    </h4>
                    <p className="text-gray-400 text-sm">
                      <a
                        href="https://www.gamblersanonymous.org/"
                        className="text-blue-400 hover:text-blue-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        https://www.gamblersanonymous.org/
                      </a>
                    </p>
                  </div>

                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">
                      Gambling Therapy
                    </h4>
                    <p className="text-gray-400 text-sm">
                      <a
                        href="https://www.gamblingtherapy.org/"
                        className="text-blue-400 hover:text-blue-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        https://www.gamblingtherapy.org/
                      </a>
                    </p>
                  </div>

                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">
                      Mental Health Resources
                    </h4>
                    <p className="text-gray-400 text-sm">
                      <a
                        href="https://www.samhsa.gov/"
                        className="text-blue-400 hover:text-blue-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        https://www.samhsa.gov/
                      </a>
                    </p>
                  </div>
                </div>
              </SubSection>

              <SubSection number="12.3" title="Professional Counseling">
                <p className="text-gray-300">
                  We encourage anyone experiencing problem gambling to seek
                  professional help. Mental health resources available at{" "}
                  <a
                    href="https://www.samhsa.gov/"
                    className="text-blue-400 hover:text-blue-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.samhsa.gov/
                  </a>
                </p>
              </SubSection>
            </PolicySection>
          </div>

          {/* Section 13: RESPONSIBLE GAMBLING COMMITMENT */}
          <div id="section-13">
            <PolicySection number="13" title="RESPONSIBLE GAMBLING COMMITMENT">
              <p className="text-gray-300 mb-6">
                Moonbet is committed to supporting responsible gaming.
                Self-exclusion is one tool available to help you maintain
                control. Additional responsible gaming tools include:
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-green-400">💰</span>
                    <h4 className="text-white font-semibold">Deposit Limits</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Set daily, weekly, or monthly maximum deposits
                  </p>
                </div>

                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-green-400">📉</span>
                    <h4 className="text-white font-semibold">Loss Limits</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Cap maximum losses per period
                  </p>
                </div>

                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-green-400">⏰</span>
                    <h4 className="text-white font-semibold">
                      Session Time Limits
                    </h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Automatic logout after set duration
                  </p>
                </div>

                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-green-400">🔔</span>
                    <h4 className="text-white font-semibold">Reality Checks</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Reminders during gameplay
                  </p>
                </div>

                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-green-400">⏸️</span>
                    <h4 className="text-white font-semibold">
                      Pause/Cooling-Off
                    </h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Temporary account suspension
                  </p>
                </div>
              </div>

              <HighlightBox variant="info">
                <p className="text-gray-200">
                  For more information on these tools, visit your account
                  settings or contact support@moonbet.games.
                </p>
              </HighlightBox>
            </PolicySection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfExclusionPolicyPage;
