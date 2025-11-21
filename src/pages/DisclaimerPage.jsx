// DisclaimerPage.jsx - Clean Disclaimer Page with Glass Style
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
const ListItem = ({ children, icon = "•" }) => (
  <div className="flex items-start gap-3 mb-3">
    <span className="text-gray-400 text-lg mt-1">{icon}</span>
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

// Risk Card Component for Blockchain Risks
const RiskCard = ({ icon, title, description, color = "blue" }) => {
  const colors = {
    blue: "rgba(59, 130, 246, 0.1)",
    red: "rgba(239, 68, 68, 0.1)",
    yellow: "rgba(245, 158, 11, 0.1)",
    purple: "rgba(147, 51, 234, 0.1)",
    green: "rgba(34, 197, 94, 0.1)",
  };

  const borderColors = {
    blue: "rgba(59, 130, 246, 0.3)",
    red: "rgba(239, 68, 68, 0.3)",
    yellow: "rgba(245, 158, 11, 0.3)",
    purple: "rgba(147, 51, 234, 0.3)",
    green: "rgba(34, 197, 94, 0.3)",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-4 rounded-lg transition-all"
      style={{
        background: colors[color],
        border: `1px solid ${borderColors[color]}`,
      }}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <h4 className="text-white font-semibold mb-1">{title}</h4>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Main Disclaimer Page Component
const DisclaimerPage = () => {
  const [activeSection, setActiveSection] = useState(null);

  // Table of Contents
  const sections = [
    { id: 1, title: "NO WARRANTIES" },
    { id: 2, title: "LIMITATION OF LIABILITY" },
    { id: 3, title: "BLOCKCHAIN AND CRYPTOCURRENCY RISKS" },
    { id: 4, title: "THIRD-PARTY LINKS AND SERVICES" },
    { id: 5, title: "USER-GENERATED CONTENT" },
    { id: 6, title: "RESPONSIBLE GAMING DISCLAIMER" },
    { id: 7, title: "RESTRICTED LOCATIONS" },
    { id: 8, title: "NO PROFESSIONAL ADVICE" },
    { id: 9, title: "MODIFICATIONS" },
    { id: 10, title: "GOVERNING LAW AND DISPUTE RESOLUTION" },
    { id: 11, title: "CONTACT" },
  ];

  const blockchainRisks = [
    {
      icon: "🔒",
      title: "Irreversible transactions",
      description: "On-chain transactions are permanent and cannot be reversed",
      color: "red",
    },
    {
      icon: "🔑",
      title: "Private key responsibility",
      description:
        "Users are solely responsible for their wallet security and private keys",
      color: "yellow",
    },
    {
      icon: "⛽",
      title: "Network fees",
      description:
        "Blockchain network fees (gas fees) are not controlled by Moonbet",
      color: "blue",
    },
    {
      icon: "📊",
      title: "Volatility",
      description: "Cryptocurrency values fluctuate significantly",
      color: "purple",
    },
    {
      icon: "⚠️",
      title: "Technical risks",
      description:
        "Blockchain networks may experience congestion, delays, or failures",
      color: "red",
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
            DISCLAIMER
          </h1>
          <p className="text-gray-400 text-lg">
            Last Updated: November 18, 2025
          </p>
        </motion.header>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <HighlightBox variant="info">
            <p className="text-gray-200 text-center">
              Welcome to Moonbet.games. By accessing or using this website,
              platform, and services, you agree to the following disclaimer.
            </p>
          </HighlightBox>
        </motion.div>

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
            <h2 className="text-2xl font-bold text-white mb-6">
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
            border: "1px solid rgba(255, 255, 255, 0.10)",
            background: "rgba(255, 255, 255, 0.02)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Section 1: NO WARRANTIES */}
          <div id="section-1">
            <PolicySection number="01" title="NO WARRANTIES">
              <p className="text-gray-300 mb-4">
                All information, software, products, and services on
                Moonbet.games are provided "as is" without warranty of any kind.
                Moonbet makes no representations or warranties about the
                accuracy, reliability, completeness, or timeliness of any
                content, including game odds, RTP percentages, or blockchain
                data.
              </p>

              <p className="text-gray-300 mb-4">
                Cryptocurrency values are volatile and unpredictable. Use is at
                your own risk.
              </p>

              <HighlightBox variant="warning">
                <p className="text-gray-200 font-semibold">
                  ⚠️ Important: All services are provided without any guarantees
                  or warranties. Users assume all risks associated with platform
                  usage.
                </p>
              </HighlightBox>
            </PolicySection>
          </div>

          {/* Section 2: LIMITATION OF LIABILITY */}
          <div id="section-2">
            <PolicySection number="02" title="LIMITATION OF LIABILITY">
              <p className="text-gray-300 mb-4">
                Under no circumstances shall Moonbet be liable for any direct,
                indirect, punitive, incidental, special, or consequential
                damages arising from or relating to the use or inability to use
                this website or services.
              </p>

              <p className="text-gray-300 mb-4">This includes damages for:</p>

              <div className="grid md:grid-cols-2 gap-3 mb-4">
                <ListItem icon="❌">Errors and defects</ListItem>
                <ListItem icon="❌">Loss of data</ListItem>
                <ListItem icon="❌">Lost profits</ListItem>
                <ListItem icon="❌">Business interruption</ListItem>
                <ListItem icon="❌">Cryptocurrency losses</ListItem>
                <ListItem icon="❌">Service unavailability</ListItem>
              </div>

              <HighlightBox variant="warning">
                <p className="text-gray-200">
                  Moonbet's liability is limited to the maximum extent permitted
                  by applicable law.
                </p>
              </HighlightBox>
            </PolicySection>
          </div>

          {/* Section 3: BLOCKCHAIN AND CRYPTOCURRENCY RISKS */}
          <div id="section-3">
            <PolicySection
              number="03"
              title="BLOCKCHAIN AND CRYPTOCURRENCY RISKS"
            >
              <p className="text-gray-300 mb-6">
                Moonbet operates on blockchain networks. Users acknowledge:
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {blockchainRisks.map((risk, index) => (
                  <RiskCard
                    key={index}
                    icon={risk.icon}
                    title={risk.title}
                    description={risk.description}
                    color={risk.color}
                  />
                ))}
              </div>

              <p className="text-gray-300 mb-4">
                For more information on blockchain security, visit:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="text-white font-semibold mb-2">Ethereum</h4>
                  <a
                    href="https://www.ethereum.org/en/"
                    className="text-blue-400 hover:text-blue-300 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.ethereum.org/en/
                  </a>
                </div>

                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="text-white font-semibold mb-2">Solana</h4>
                  <a
                    href="https://solana.com/"
                    className="text-blue-400 hover:text-blue-300 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://solana.com/
                  </a>
                </div>
              </div>
            </PolicySection>
          </div>

          {/* Section 4: THIRD-PARTY LINKS AND SERVICES */}
          <div id="section-4">
            <PolicySection number="04" title="THIRD-PARTY LINKS AND SERVICES">
              <p className="text-gray-300 mb-4">
                This website may contain links to third-party websites, wallets,
                payment processors, and blockchain explorers. These links are
                provided solely for convenience. Moonbet has no control over and
                assumes no responsibility for the content, practices, or
                policies of any third-party sites.
              </p>

              <p className="text-gray-300 mb-4">
                We recommend reviewing third-party privacy policies and terms
                before use.
              </p>

              <SubSection number="4.1" title="Examples of Third-Party Services">
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <h5 className="text-white font-medium mb-1">
                      Wallet Providers
                    </h5>
                    <p className="text-gray-400 text-sm">
                      MetaMask, Phantom, etc.
                    </p>
                  </div>

                  <div className="p-3 bg-white/5 rounded-lg">
                    <h5 className="text-white font-medium mb-1">
                      Blockchain Explorers
                    </h5>
                    <p className="text-gray-400 text-sm">
                      <a
                        href="https://solscan.io/"
                        className="text-blue-400 hover:text-blue-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        solscan.io
                      </a>
                    </p>
                  </div>

                  <div className="p-3 bg-white/5 rounded-lg">
                    <h5 className="text-white font-medium mb-1">
                      Payment Processors
                    </h5>
                    <p className="text-gray-400 text-sm">
                      Various crypto services
                    </p>
                  </div>
                </div>
              </SubSection>
            </PolicySection>
          </div>

          {/* Section 5: USER-GENERATED CONTENT */}
          <div id="section-5">
            <PolicySection number="05" title="USER-GENERATED CONTENT">
              <p className="text-gray-300 mb-4">
                Moonbet does not endorse or assume liability for user-generated
                content such as comments, forum posts, reviews, or chat
                messages. Users are solely responsible for their own submissions
                and interactions.
              </p>

              <p className="text-gray-300 mb-4">
                Moonbet reserves the right to remove or moderate content that
                violates our policies.
              </p>

              <HighlightBox variant="info">
                <p className="text-gray-200">
                  <span className="font-semibold">Note:</span> User content does
                  not represent the views or opinions of Moonbet Games LLC.
                </p>
              </HighlightBox>
            </PolicySection>
          </div>

          {/* Section 6: RESPONSIBLE GAMING DISCLAIMER */}
          <div id="section-6">
            <PolicySection number="06" title="RESPONSIBLE GAMING DISCLAIMER">
              <HighlightBox variant="warning">
                <p className="text-gray-200 mb-3 font-semibold">
                  ⚠️ Gambling involves risk of financial loss
                </p>
                <p className="text-gray-200">
                  Moonbet is for entertainment purposes only and is not a source
                  of income. Never gamble more than you can afford to lose.
                </p>
              </HighlightBox>

              <div className="mt-6">
                <p className="text-gray-300 mb-4">
                  If you experience problem gambling, seek help immediately:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
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

                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
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
                </div>
              </div>
            </PolicySection>
          </div>

          {/* Section 7: RESTRICTED LOCATIONS */}
          <div id="section-7">
            <PolicySection number="07" title="RESTRICTED LOCATIONS">
              <p className="text-gray-300 mb-4">
                Residents of certain jurisdictions may be restricted from
                accessing Moonbet.games and its services based on local laws and
                regulations.
              </p>

              <p className="text-gray-300 mb-4">
                It is your sole responsibility to determine whether use is legal
                in your location. Moonbet does not provide legal advice
                regarding jurisdiction-specific restrictions.
              </p>

              <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-gray-300">
                  For US-specific gambling regulations, see:{" "}
                  <a
                    href="https://www.fincen.gov/"
                    className="text-blue-400 hover:text-blue-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.fincen.gov/
                  </a>
                </p>
              </div>
            </PolicySection>
          </div>

          {/* Section 8: NO PROFESSIONAL ADVICE */}
          <div id="section-8">
            <PolicySection number="08" title="NO PROFESSIONAL ADVICE">
              <p className="text-gray-300 mb-4">
                Nothing on Moonbet.games constitute financial, legal, tax, or
                investment advice. Cryptocurrency transactions have tax
                implications.
              </p>

              <p className="text-gray-300">
                Consult appropriate professionals before making decisions based
                on platform information.
              </p>

              <div className="grid md:grid-cols-4 gap-3 mt-6">
                <div className="p-3 bg-white/5 rounded-lg text-center">
                  <span className="text-2xl mb-2 block">💰</span>
                  <p className="text-gray-400 text-sm">No Financial Advice</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg text-center">
                  <span className="text-2xl mb-2 block">⚖️</span>
                  <p className="text-gray-400 text-sm">No Legal Advice</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg text-center">
                  <span className="text-2xl mb-2 block">📊</span>
                  <p className="text-gray-400 text-sm">No Tax Advice</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg text-center">
                  <span className="text-2xl mb-2 block">📈</span>
                  <p className="text-gray-400 text-sm">No Investment Advice</p>
                </div>
              </div>
            </PolicySection>
          </div>

          {/* Section 9: MODIFICATIONS */}
          <div id="section-9">
            <PolicySection number="09" title="MODIFICATIONS">
              <p className="text-gray-300 mb-4">
                Moonbet reserves the right to revise this disclaimer at any time
                by updating this posting. Your continued use after modifications
                implies acceptance of the revised disclaimer.
              </p>

              <HighlightBox variant="info">
                <p className="text-gray-200">
                  <span className="font-semibold">Last Updated:</span> November
                  18, 2025
                </p>
                <p className="text-gray-200 mt-2">
                  Check this page periodically for updates to our disclaimer.
                </p>
              </HighlightBox>
            </PolicySection>
          </div>

          {/* Section 10: GOVERNING LAW AND DISPUTE RESOLUTION */}
          <div id="section-10">
            <PolicySection
              number="10"
              title="GOVERNING LAW AND DISPUTE RESOLUTION"
            >
              <p className="text-gray-300 mb-4">
                This disclaimer shall be governed by and construed in accordance
                with the laws of [Jurisdiction to be specified upon licensing
                completion].
              </p>

              <p className="text-gray-300">
                Any disputes shall be resolved via binding arbitration in
                accordance with [Arbitration Rules to be specified upon
                licensing completion].
              </p>
            </PolicySection>
          </div>

          {/* Section 11: CONTACT */}
          <div id="section-11">
            <PolicySection number="11" title="CONTACT">
              <p className="text-gray-300 mb-6">
                If you have questions about this disclaimer or disagree with any
                provision, please contact us:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <HighlightBox>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📧</span>
                    <div>
                      <p className="text-gray-200 font-semibold">Email</p>
                      <p className="text-gray-400">support@moonbet.games</p>
                    </div>
                  </div>
                </HighlightBox>

                <HighlightBox>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💬</span>
                    <div>
                      <p className="text-gray-200 font-semibold">Live Chat</p>
                      <p className="text-gray-400">24/7 via Moonbet.games</p>
                    </div>
                  </div>
                </HighlightBox>
              </div>

              <HighlightBox variant="warning">
                <p className="text-gray-200 text-center font-semibold">
                  If you do not agree with this disclaimer, please discontinue
                  use of Moonbet.games immediately.
                </p>
              </HighlightBox>
            </PolicySection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;
