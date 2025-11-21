import React, { useState } from "react";
import { motion } from "framer-motion";

const ResponsibleGamblingPage = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  // Custom SVG Icon Component
  const ResponsibleIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 20 20"
      fill="none"
      className="w-6 h-6"
    >
      <path
        d="M19.4823 8.75592L17.1303 6.4017C16.1631 5.43353 16.7542 4.41157 17.8082 4.34951C19.5443 4.24194 20.5198 2.38835 19.102 0.845078C17.5602 -0.569936 15.7166 0.402369 15.6092 2.13597C15.543 3.19102 14.5138 3.78682 13.5507 2.82279L11.2483 0.518218C10.558 -0.172739 9.43784 -0.172739 8.74755 0.518218L6.41624 2.85175C5.449 3.81992 4.42389 3.21998 4.35776 2.16493C4.25028 0.427194 2.3902 -0.561661 0.848403 0.85749C-0.573525 2.4049 0.414385 4.26676 2.15046 4.37434C3.20451 4.44054 3.80386 5.47077 2.84076 6.43893L0.517722 8.76005C-0.172574 9.45101 -0.172574 10.5723 0.517722 11.2632L2.82009 13.5678C3.78733 14.5318 3.21277 15.5372 2.15873 15.6034C0.422651 15.711 -0.548724 17.5604 0.869071 19.1037C2.41087 20.5229 4.25028 19.5547 4.35776 17.817C4.42389 16.7619 5.43247 16.1827 6.39971 17.1467L8.72274 19.472C9.42544 20.1753 10.5746 20.1753 11.2773 19.4761L13.6044 17.1467C14.5179 16.1909 13.9268 15.1855 12.8852 15.1193C11.1491 15.0118 10.1653 13.1499 11.5831 11.6066C13.1249 10.1875 14.985 11.1763 15.0925 12.9141C15.1586 13.9567 16.1589 14.5442 17.1138 13.6299L19.4492 11.2922C19.4533 11.288 19.4533 11.288 19.4575 11.2839L19.4823 11.2591C20.1726 10.5681 20.1726 9.44687 19.4823 8.75592Z"
        fill="url(#gradient3)"
      />
      <defs>
        <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F07730" />
          <stop offset="100%" stopColor="#EFD28E" />
        </linearGradient>
      </defs>
    </svg>
  );

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <section className="w-full min-h-screen   py-12 md:py-16 lg:py-20">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="wallet-btn3 rounded-2xl p-8 md:p-10 mb-8 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <ResponsibleIcon />
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f7f7f7] uppercase"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Responsible Gambling
            </h1>
          </div>
          <p className="text-gray-300 text-sm md:text-base max-w-3xl mx-auto">
            At Moonbet, we believe crypto gambling should be transparent, fair,
            and fun. Our mission is to create a safe environment where players
            can enjoy decentralized gaming responsibly. Gambling should enhance
            your life, not control it.
          </p>
        </motion.div>

        {/* Philosophy Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="wallet-btn3 rounded-2xl p-6 md:p-8 mb-6"
        >
          <h2
            className="text-xl md:text-2xl font-bold text-white mb-4"
            style={{ fontFamily: "Neuropolitical, sans-serif" }}
          >
            Our Responsible Gambling Philosophy
          </h2>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-4">
            Unlike traditional casinos that profit from addiction, Moonbet's
            success depends on players having positive, sustainable experiences.
            Our near-zero house edge and provably fair algorithms ensure a fair
            gaming ecosystem where everyone benefits from responsible play.
          </p>
        </motion.div>

        {/* Crypto Gaming Considerations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <h2
            className="text-xl md:text-2xl font-bold text-white mb-6 text-center"
            style={{ fontFamily: "Neuropolitical, sans-serif" }}
          >
            Crypto Gaming Considerations
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: "⚡",
                text: "Instant transactions can accelerate spending patterns",
              },
              {
                icon: "🌐",
                text: "24/7 accessibility requires extra self-awareness",
              },
              {
                icon: "📊",
                text: "Blockchain records provide transparent spending history",
              },
              {
                icon: "🔒",
                text: "No chargebacks – all transactions are final",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="wallet-btn3 rounded-xl p-4 text-center hover:bg-gradient-to-br 
                         hover:from-[#F07730]/10 hover:to-transparent transition-all duration-300"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="text-gray-300 text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Responsible Gaming Tools */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h2
            className="text-xl md:text-2xl font-bold text-white mb-6 text-center"
            style={{ fontFamily: "Neuropolitical, sans-serif" }}
          >
            Responsible Gaming Tools
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Cooling-Off Periods */}
            <div
              className="wallet-btn3 rounded-2xl p-6 cursor-pointer hover:bg-white/5 transition-all"
              onClick={() => toggleSection("cooling")}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">
                  Cooling-Off Periods
                </h3>
                <span className="text-[#F07730]">
                  {expandedSection === "cooling" ? "−" : "+"}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Take a temporary break from gaming when you need to step back.
              </p>
              {expandedSection === "cooling" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-3"
                >
                  <div className="flex flex-wrap gap-2">
                    {["24 hours", "7 days", "1 month", "3 months"].map(
                      (period) => (
                        <span
                          key={period}
                          className="px-3 py-1 bg-[#F07730]/20 rounded-lg text-[#F07730] text-sm"
                        >
                          {period}
                        </span>
                      )
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">
                    During this period, you cannot place bets, play games, or
                    access promotions. Accounts reactivate automatically when
                    the duration ends.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Self-Exclusion */}
            <div
              className="wallet-btn3 rounded-2xl p-6 cursor-pointer hover:bg-white/5 transition-all"
              onClick={() => toggleSection("exclusion")}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">Self-Exclusion</h3>
                <span className="text-[#F07730]">
                  {expandedSection === "exclusion" ? "−" : "+"}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                For longer breaks, self-exclusion disables gaming features.
              </p>
              {expandedSection === "exclusion" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-3"
                >
                  <div className="space-y-2">
                    {[
                      "6 months",
                      "1 year",
                      "3 years",
                      "5 years",
                      "Lifetime",
                    ].map((period) => (
                      <div
                        key={period}
                        className="px-3 py-2 bg-white/5 rounded-lg text-gray-300 text-sm"
                      >
                        {period}
                      </div>
                    ))}
                  </div>
                  <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/30">
                    <p className="text-yellow-400 text-sm">
                      ⚠️ Self-exclusion cannot be reversed early
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* On-chain Spending Limits */}
            <div className="wallet-btn3 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                On-chain Spending Limits
              </h3>
              <div className="space-y-3">
                {[
                  "Deposit, loss, and bet limits set by smart contracts",
                  "Session time limits and automated disconnects",
                  "Immutable on-chain enforcement for accountability",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reality Check & Analytics */}
            <div className="wallet-btn3 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Reality Check & Analytics
              </h3>
              <div className="space-y-3">
                <p className="text-gray-300 text-sm">
                  Receive automatic notifications on session length and
                  spending.
                </p>
                <p className="text-gray-300 text-sm">
                  Access detailed Solana-based data including:
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Profit/Loss", "Transactions", "Analytics"].map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-white/10 rounded-lg text-gray-400 text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Self-Assessment */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="wallet-btn3 rounded-2xl p-6 md:p-8 mb-8"
        >
          <h2
            className="text-xl md:text-2xl font-bold text-white mb-4"
            style={{ fontFamily: "Neuropolitical, sans-serif" }}
          >
            Self-Assessment
          </h2>
          <p className="text-gray-300 mb-6 text-sm md:text-base">
            Reflect on your gaming habits using these questions. If you answer
            "yes" to three or more, consider seeking help:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Do you gamble more than planned?",
              "Have you chased losses?",
              "Do you hide gambling behavior from others?",
              "Do friends or family express concern?",
            ].map((question, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-lg p-4 border border-white/10"
              >
                <span className="text-[#F07730] font-bold">{index + 1}.</span>
                <span className="text-gray-300 text-sm ml-2">{question}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Support Resources */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <h2
            className="text-xl md:text-2xl font-bold text-white mb-6 text-center"
            style={{ fontFamily: "Neuropolitical, sans-serif" }}
          >
            Professional Support Resources
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* International Resources */}
            <div className="wallet-btn3 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                International Resources
              </h3>
              <div className="space-y-2">
                {[
                  { name: "Gamblers Anonymous", url: "gamblersanonymous.org" },
                  { name: "GambleAware", url: "gambleaware.org" },
                  { name: "Gambling Therapy", url: "gamblingtherapy.org" },
                  { name: "NCPG", url: "ncpgambling.org" },
                ].map((resource) => (
                  <a
                    key={resource.name}
                    href={`https://${resource.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-400 hover:text-[#F07730] text-sm transition-colors"
                  >
                    {resource.name} →
                  </a>
                ))}
              </div>
            </div>

            {/* Crypto-Specific Help */}
            <div className="wallet-btn3 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Crypto-Specific Help
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Blockchain Gaming Addiction Support</li>
                <li>• Digital Asset Management Counseling</li>
                <li>• Crypto spending pattern analysis</li>
                <li>• Web3 wallet security guidance</li>
              </ul>
            </div>

            {/* Blocking Software */}
            <div className="wallet-btn3 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Blocking Software
              </h3>
              <div className="space-y-2">
                {[
                  { name: "BetBlocker", desc: "Free" },
                  { name: "Gamban", desc: "Comprehensive" },
                  { name: "GamBlock", desc: "Device-level" },
                  { name: "Cold Turkey", desc: "Multi-purpose" },
                ].map((software) => (
                  <div
                    key={software.name}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-gray-300">{software.name}</span>
                    <span className="text-gray-500">{software.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Protecting Minors */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="wallet-btn3 rounded-2xl p-6 md:p-8 mb-8"
        >
          <h2
            className="text-xl md:text-2xl font-bold text-white mb-4"
            style={{ fontFamily: "Neuropolitical, sans-serif" }}
          >
            Protecting Minors
          </h2>
          <p className="text-gray-300 mb-4 text-sm md:text-base">
            Moonbet is for users 18 and older. We enforce strict age checks via
            blockchain identity and automated detection systems.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
              <h3 className="text-red-400 font-bold mb-2">
                Prevention Measures
              </h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Immediate suspension for suspected minors</li>
                <li>• Funds returned to deposit source</li>
                <li>• Age verification protocols</li>
              </ul>
            </div>
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <h3 className="text-blue-400 font-bold mb-2">
                Parental Controls
              </h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Secure wallet handling</li>
                <li>• Device monitoring tools</li>
                <li>• Education about risks</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Fair Play Commitment */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="wallet-btn3 rounded-2xl p-6 md:p-8 mb-8"
        >
          <h2
            className="text-xl md:text-2xl font-bold text-white mb-4"
            style={{ fontFamily: "Neuropolitical, sans-serif" }}
          >
            Fair Play Commitment
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: "🎮",
                title: "Provably Fair",
                desc: "Solana-based verification",
              },
              {
                icon: "📊",
                title: "Transparent RTP",
                desc: "Clear return rates",
              },
              { icon: "✨", title: "No Deception", desc: "Honest marketing" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#F07730]/10 to-transparent rounded-lg p-4 border border-[#F07730]/30 text-center"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="text-white font-bold text-sm mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="wallet-btn3 rounded-2xl p-6 md:p-8 "
        >
          <h2
            className="text-xl md:text-2xl font-bold text-white mb-4 text-center"
            style={{ fontFamily: "Neuropolitical, sans-serif" }}
          >
            Contact Us
          </h2>
          <p className="text-gray-300 text-center mb-6 text-sm md:text-base">
            Our support team is available 24/7 to help with responsible gaming.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
            >
              <span>💬</span>
              <span className="text-gray-300">Live Chat</span>
            </a>
            <a
              href="mailto:support@moonbet.games"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
            >
              <span>📧</span>
              <span className="text-gray-300">support@moonbet.games</span>
            </a>
          </div>
        </motion.div>

        <p className="text-center text-gray-500 text-sm mt-8">
          Last Updated: September 29, 2025
        </p>
      </div>
    </section>
  );
};

export default ResponsibleGamblingPage;
