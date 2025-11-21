import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Custom Icons
  const ChevronRight = ({ className }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );

  const Shield = ({ className }) => (
    <svg
      className={className}
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
  );

  const Book = ({ className }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  );

  const Scale = ({ className }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
      />
    </svg>
  );

  const User = ({ className }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );

  const Wallet = ({ className }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
      />
    </svg>
  );

  const Lock = ({ className }) => (
    <svg
      className={className}
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
  );

  const Mail = ({ className }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );

  // Navigation sections
  const sections = [
    {
      id: "introduction",
      label: "1. Introduction",
      icon: <Book className="w-5 h-5" />,
    },
    { id: "definitions", label: "2. Definitions", icon: "📚" },
    {
      id: "eligibility",
      label: "3. Eligibility",
      icon: <User className="w-5 h-5" />,
    },
    {
      id: "account",
      label: "4. Account & Wallet",
      icon: <Wallet className="w-5 h-5" />,
    },
    { id: "deposits", label: "5. Deposits & Withdrawals", icon: "💰" },
    { id: "gameplay", label: "6. Gameplay & Fairness", icon: "🎮" },
    { id: "promotions", label: "7. Promotions", icon: "🎁" },
    { id: "fees", label: "8. Fees & Taxes", icon: "💸" },
    { id: "responsible", label: "9. Responsible Gambling", icon: "❤️" },
    { id: "conduct", label: "10. User Conduct", icon: "⚠️" },
    { id: "intellectual", label: "11. Intellectual Property", icon: "©️" },
    { id: "refunds", label: "12. Refunds", icon: "↩️" },
    { id: "disclaimers", label: "13. Disclaimers", icon: "⚡" },
    {
      id: "liability",
      label: "14. Liability",
      icon: <Shield className="w-5 h-5" />,
    },
    { id: "indemnification", label: "15. Indemnification", icon: "🛡️" },
    { id: "privacy", label: "16. Privacy", icon: <Lock className="w-5 h-5" /> },
    { id: "cookies", label: "17. Cookies", icon: "🍪" },
    { id: "security", label: "18. Security", icon: "🔒" },
    { id: "retention", label: "19. Data Retention", icon: "💾" },
    { id: "support", label: "20. Support", icon: "🤝" },
    {
      id: "law",
      label: "21. Governing Law",
      icon: <Scale className="w-5 h-5" />,
    },
    { id: "changes", label: "22. Changes", icon: "📝" },
    { id: "contact", label: "23. Contact", icon: <Mail className="w-5 h-5" /> },
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Check if user has previously accepted terms
    const hasAccepted = localStorage.getItem("moonbet_terms_accepted");
    setAcceptedTerms(hasAccepted === "true");
  }, []);

  return (
    <div className="min-h-screen  ">
      {/* Hero Section */}
      <section className="relative py-12 px-4 border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F07730]/10 via-transparent to-[#EFD28E]/10" />
        <div className="container max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1
              className="text-4xl md:text-2xl font-bold mb-4 text-[#f7f7f7]"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Terms & Conditions
            </h1>
            <p className="text-gray-400 mb-2">
              Last Updated:{" "}
              <span className="text-white">September 29, 2025</span>
            </p>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              These Terms govern your use of Moonbet's decentralized crypto
              casino platform. By accessing or using the Platform, you agree to
              be bound by these Terms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation Pills */}
      <div className="sticky top-0 z-40  /95 backdrop-blur-md border-b border-white/10">
        <div className="container max-w-7xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {sections.slice(0, 10).map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap text-xs transition-all
                         ${
                           activeSection === section.id
                             ? "bg-gradient-to-r from-[#F07730]/30 to-[#EFD28E]/30 border border-[#F07730]/50"
                             : "bg-white/5 border border-white/10 hover:bg-white/10"
                         }`}
              >
                <span>
                  {typeof section.icon === "string"
                    ? section.icon
                    : section.icon}
                </span>
                <span className="hidden md:inline text-gray-300">
                  {section.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="wallet-btn3 rounded-2xl p-4">
                <p className="text-sm font-bold text-white mb-4 px-2">
                  ALL SECTIONS
                </p>
                <nav className="space-y-1 max-h-[70vh] overflow-y-auto scrollbar-hide">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all
                               ${
                                 activeSection === section.id
                                   ? "bg-[#F07730]/20 text-[#F07730] border-l-2 border-[#F07730]"
                                   : "text-gray-400 hover:bg-white/5 hover:text-white"
                               }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            {/* Section 1: Introduction */}
            <motion.section
              id="introduction"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-6"
            >
              <p className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Book className="w-6 h-6 text-[#F07730]" />
                1. Introduction
              </p>
              <div className="space-y-3 text-gray-300">
                <p>
                  <span className="text-[#F07730] font-bold">1.1 Purpose:</span>{" "}
                  Define rules, rights, and responsibilities for Users.
                </p>
                <p>
                  <span className="text-[#F07730] font-bold">1.2 Scope:</span>{" "}
                  Applies to all access, gameplay, deposits, withdrawals, and
                  services on the Platform.
                </p>
                <p>
                  <span className="text-[#F07730] font-bold">
                    1.3 Acceptance:
                  </span>{" "}
                  By connecting your Wallet, you agree to these Terms and our
                  Privacy Policy.
                </p>
              </div>
            </motion.section>

            {/* Section 2: Definitions */}
            <motion.section
              id="definitions"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-6"
            >
              <p className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-xl">📚</span>
                2. Definitions
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    term: "User/You",
                    def: "Any person accessing or using the Platform.",
                  },
                  {
                    term: "Wallet",
                    def: "Web3 crypto wallet (e.g., Phantom, MetaMask).",
                  },
                  {
                    term: "Game",
                    def: "Slots, table games, crash, plinko, poker, baccarat, video poker, etc.",
                  },
                  {
                    term: "Transaction",
                    def: "Blockchain-recorded deposit, bet, win, withdrawal.",
                  },
                  {
                    term: "Provably Fair",
                    def: "Verifiable game outcomes via onchain algorithms.",
                  },
                  {
                    term: "RTP",
                    def: "Return to Player percentage over time.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/5 rounded-xl p-3 border border-white/10"
                  >
                    <h4 className="text-[#F07730] font-bold text-sm mb-1">
                      {item.term}
                    </h4>
                    <p className="text-gray-400 text-sm">{item.def}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Section 3: Eligibility */}
            <motion.section
              id="eligibility"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-6"
            >
              <p className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <User className="w-6 h-6 text-[#F07730]" />
                3. Eligibility & Compliance
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-[#F07730] font-bold">3.1</span>
                  <p className="text-gray-300">
                    <span className="font-bold">Minimum Age:</span> 18+ (or
                    legal age in jurisdiction).
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#F07730] font-bold">3.2</span>
                  <p className="text-gray-300">
                    <span className="font-bold">Jurisdiction:</span> Not
                    available where crypto gambling is illegal.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#F07730] font-bold">3.3</span>
                  <p className="text-gray-300">
                    <span className="font-bold">Self-Certification:</span> You
                    warrant eligibility and compliance with local laws.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 4: Account & Wallet */}
            <motion.section
              id="account"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-6"
            >
              <p className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Wallet className="w-6 h-6 text-[#F07730]" />
                4. Account & Wallet Connection
              </p>
              <div className="space-y-3">
                <p className="text-gray-300">
                  <span className="text-[#F07730] font-bold">4.1</span> No
                  traditional registration; connect via Wallet.
                </p>
                <p className="text-gray-300">
                  <span className="text-[#F07730] font-bold">4.2</span> You
                  control your private keys; Moonbet is not liable for lost
                  keys.
                </p>
                <p className="text-gray-300">
                  <span className="text-[#F07730] font-bold">4.3</span> You must
                  not share Wallet credentials or permit unauthorized use.
                </p>
              </div>
            </motion.section>

            {/* Section 5: Deposits & Withdrawals */}
            <motion.section
              id="deposits"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-6"
            >
              <p className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-xl">💰</span>
                5. Deposits & Withdrawals
              </p>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="text-white font-bold mb-2">
                    5.1 Supported Cryptos
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["BTC", "ETH", "SOL", "USDT", "USDC"].map((crypto) => (
                      <span
                        key={crypto}
                        className="px-3 py-1 bg-[#F07730]/20 rounded-lg text-[#F07730] text-sm font-bold"
                      >
                        {crypto}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-300">
                  <span className="text-[#F07730] font-bold">
                    5.2 Deposit Process:
                  </span>{" "}
                  Instant credit after blockchain confirmation; network fees
                  apply.
                </p>
                <p className="text-gray-300">
                  <span className="text-[#F07730] font-bold">
                    5.3 Withdrawal Process:
                  </span>{" "}
                  Requested onchain, processed within 60 seconds; network fees
                  apply.
                </p>
                <p className="text-gray-300">
                  <span className="text-[#F07730] font-bold">
                    5.4 Irreversible:
                  </span>{" "}
                  All onchain Transactions are final once confirmed.
                </p>
              </div>
            </motion.section>

            {/* Section 6: Gameplay & Fairness */}
            <motion.section
              id="gameplay"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-6"
            >
              <p className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-xl">🎮</span>
                6. Gameplay & Fairness
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-[#F07730]/10 to-transparent rounded-xl p-4 border border-[#F07730]/30">
                  <h3 className="text-[#F07730] font-bold mb-2">
                    6.1 Provably Fair RNG
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Outcomes verified on Solana blockchain.
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="text-white font-bold mb-2">
                    6.2 House Edge & RTP
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Near-zero for Moonbet Originals; high RTP for partners.
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="text-white font-bold mb-2">6.3 Game Rules</h3>
                  <p className="text-gray-300 text-sm">
                    Displayed per Game; you must adhere.
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="text-white font-bold mb-2">
                    6.4 Game Availability
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Moonbet may add, modify, suspend, or remove any Game.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 7: Promotions */}
            <motion.section
              id="promotions"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-6"
            >
              <p className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-xl">🎁</span>
                7. Promotions & Bonuses
              </p>
              <div className="space-y-3 text-gray-300">
                <p>
                  <span className="text-[#F07730] font-bold">
                    7.1 Promotion Terms:
                  </span>{" "}
                  Each offer has specific criteria (e.g., min deposit,
                  wagering).
                </p>
                <p>
                  <span className="text-[#F07730] font-bold">
                    7.2 Abuse Prevention:
                  </span>{" "}
                  Multiple Wallets, collusion, or prohibited conduct voids
                  bonuses.
                </p>
                <p>
                  <span className="text-[#F07730] font-bold">
                    7.3 Amendments:
                  </span>{" "}
                  Moonbet may cancel or adjust promotions at its discretion.
                </p>
              </div>
            </motion.section>

            {/* Section 8: Fees & Taxes */}
            <motion.section
              id="fees"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-6"
            >
              <p className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-xl">💸</span>
                8. Fees & Taxes
              </p>
              <div className="space-y-3">
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                  <p className="text-green-400 font-bold">
                    8.1 Platform Fees: None on deposits, bets, wins, or
                    withdrawals.
                  </p>
                </div>
                <p className="text-gray-300">
                  <span className="text-[#F07730] font-bold">
                    8.2 Network Fees:
                  </span>{" "}
                  You bear blockchain gas fees.
                </p>
                <p className="text-gray-300">
                  <span className="text-[#F07730] font-bold">
                    8.3 Tax Obligations:
                  </span>{" "}
                  You are solely responsible for reporting/winning taxes.
                </p>
              </div>
            </motion.section>

            {/* Section 9: Responsible Gambling */}
            <motion.section
              id="responsible"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-6"
            >
              <p className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-xl">❤️</span>
                9. Responsible Gambling
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="text-white font-bold mb-2">
                    9.1 Self-Exclusion
                  </h3>
                  <p className="text-gray-300 text-sm">
                    You may exclude your Wallet from the Platform.
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="text-white font-bold mb-2">9.2 Limits</h3>
                  <p className="text-gray-300 text-sm">
                    Set deposit or bet limits via onchain smart contract
                    controls.
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="text-white font-bold mb-2">9.3 Resources</h3>
                  <p className="text-gray-300 text-sm">
                    Contact our support for assistance and links to help
                    organizations.
                  </p>
                </div>
                <div className="bg-[#F07730]/10 rounded-xl p-4 border border-[#F07730]/30">
                  <h3 className="text-[#F07730] font-bold mb-2">9.4 Advice</h3>
                  <p className="text-gray-300 text-sm">
                    Gamble responsibly; bet only what you can afford to lose.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 10: User Conduct */}
            <motion.section
              id="conduct"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-6"
            >
              <p className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-xl">⚠️</span>
                10. User Conduct & Prohibited Activities
              </p>
              <div className="space-y-4">
                <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                  <h3 className="text-red-400 font-bold mb-3">
                    10.1 Prohibited Conduct:
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>a) Money laundering, fraud, illicit activities</li>
                    <li>b) Botting or automation for unfair advantage</li>
                    <li>c) Collusion or multi-Wallet abuse</li>
                    <li>
                      d) Interfering with Platform security or RNG manipulation
                    </li>
                    <li>e) Harassment of staff or Users</li>
                  </ul>
                </div>
                <p className="text-gray-300">
                  <span className="text-[#F07730] font-bold">
                    10.2 Enforcement:
                  </span>{" "}
                  Violations lead to suspension, fund forfeiture, and reporting.
                </p>
              </div>
            </motion.section>

            {/* Section 11: Intellectual Property */}
            <motion.section
              id="intellectual"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-6"
            >
              <p className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-xl">©️</span>
                11. Intellectual Property
              </p>
              <div className="space-y-3 text-gray-300">
                <p>
                  <span className="text-[#F07730] font-bold">
                    11.1 Ownership:
                  </span>{" "}
                  All content, software, graphics, trademarks, and materials on
                  the Platform are owned by or licensed to Moonbet.
                </p>
                <p>
                  <span className="text-[#F07730] font-bold">
                    11.2 Restrictions:
                  </span>{" "}
                  You may not copy, modify, distribute, or create derivative
                  works without Moonbet's prior written consent.
                </p>
              </div>
            </motion.section>

            {/* Section 12: Refunds */}
            <motion.section
              id="refunds"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-6"
            >
              <p className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-xl">↩️</span>
                12. Refunds & Chargebacks
              </p>
              <div className="space-y-3 text-gray-300">
                <p>
                  <span className="text-[#F07730] font-bold">
                    12.1 No Refunds:
                  </span>{" "}
                  All deposits and bets are final and non-refundable, except as
                  required by law.
                </p>
                <p>
                  <span className="text-[#F07730] font-bold">
                    12.2 Chargebacks:
                  </span>{" "}
                  Attempted chargebacks on network fees or platform operations
                  will lead to immediate suspension and legal action.
                </p>
              </div>
            </motion.section>

            {/* Section 13: Disclaimers */}
            <motion.section
              id="disclaimers"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-6"
            >
              <p className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-xl">⚡</span>
                13. Disclaimers
              </p>
              <div className="space-y-3 text-gray-300">
                <p>
                  <span className="text-[#F07730] font-bold">
                    13.1 "As Is" Basis:
                  </span>{" "}
                  The Platform is provided without warranties of any kind,
                  express or implied.
                </p>
                <p>
                  <span className="text-[#F07730] font-bold">
                    13.2 No Guarantee:
                  </span>{" "}
                  Moonbet does not guarantee uninterrupted or error-free play.
                </p>
                <p>
                  <span className="text-[#F07730] font-bold">
                    13.3 Risk Acknowledgment:
                  </span>{" "}
                  Crypto gambling carries volatility and loss risk. Play
                  responsibly.
                </p>
              </div>
            </motion.section>

            {/* Section 14: Limitation of Liability */}
            <motion.section
              id="liability"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-6"
            >
              <p className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-[#F07730]" />
                14. Limitation of Liability
              </p>
              <div className="space-y-3 text-gray-300">
                <p>
                  <span className="text-[#F07730] font-bold">
                    14.1 Maximum Liability:
                  </span>{" "}
                  Moonbet's total liability is limited to the refund of your net
                  deposits (deposits minus withdrawals).
                </p>
                <p>
                  <span className="text-[#F07730] font-bold">
                    14.2 No Consequential Damages:
                  </span>{" "}
                  Moonbet is not liable for indirect, special, incidental, or
                  consequential damages.
                </p>
                <p>
                  <span className="text-[#F07730] font-bold">
                    14.3 Exclusions:
                  </span>{" "}
                  Liability limitations apply to the fullest extent permitted by
                  law.
                </p>
              </div>
            </motion.section>

            {/* Section 15: Indemnification */}
            <motion.section
              id="indemnification"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-6"
            >
              <p className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-xl">🛡️</span>
                15. Indemnification
              </p>
              <p className="text-gray-300">
                You agree to indemnify and hold harmless Moonbet, its
                affiliates, officers, directors, employees, and agents from any
                claims, liabilities, losses, and expenses arising from your
                breach of these Terms or misuse of the Platform.
              </p>
            </motion.section>

            {/* Section 16-19: Privacy & Data */}
            <motion.section
              id="privacy"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-6"
            >
              <p className="text-2xl font-bold text-white mb-4">
                Privacy & Data Protection
              </p>

              <div className="space-y-6">
                {/* Privacy */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-[#F07730]" />
                    16. Privacy & Data Protection
                  </h3>
                  <p className="text-gray-300">
                    <span className="text-[#F07730] font-bold">16.1</span>{" "}
                    Privacy Policy at Moonbet.games/privacy.
                  </p>
                  <p className="text-gray-300">
                    <span className="text-[#F07730] font-bold">16.2</span> By
                    using the Platform, you consent to data collection and
                    processing.
                  </p>
                </div>

                {/* Cookies */}
                <div id="cookies">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-xl">🍪</span>
                    17. Cookies & Tracking
                  </h3>
                  <p className="text-gray-300">
                    <span className="text-[#F07730] font-bold">17.1</span> We
                    use cookies and similar technologies to provide and improve
                    services.
                  </p>
                  <p className="text-gray-300">
                    <span className="text-[#F07730] font-bold">17.2</span> You
                    can manage cookie preferences via your browser settings.
                  </p>
                </div>

                {/* Security */}
                <div id="security">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-xl">🔒</span>
                    18. Data Security
                  </h3>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <p className="text-sm text-gray-300">
                        <span className="text-[#F07730] font-bold">18.1</span>{" "}
                        Industry-standard encryption & Fireblocks custody
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <p className="text-sm text-gray-300">
                        <span className="text-[#F07730] font-bold">18.2</span>{" "}
                        Role-based access controls
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <p className="text-sm text-gray-300">
                        <span className="text-[#F07730] font-bold">18.3</span>{" "}
                        Breach response procedures
                      </p>
                    </div>
                  </div>
                </div>

                {/* Data Retention */}
                <div id="retention">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-xl">💾</span>
                    19. Data Retention
                  </h3>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>
                        <span className="text-[#F07730] font-bold">19.1</span>{" "}
                        Account Data: Active + 6 years
                      </li>
                      <li>
                        <span className="text-[#F07730] font-bold">19.2</span>{" "}
                        Transaction Records: 6 years per regulations
                      </li>
                      <li>
                        <span className="text-[#F07730] font-bold">19.3</span>{" "}
                        Support Logs: 3 years
                      </li>
                      <li>
                        <span className="text-[#F07730] font-bold">19.4</span>{" "}
                        Analytics Data: 2 years
                      </li>
                      <li>
                        <span className="text-[#F07730] font-bold">19.5</span>{" "}
                        Blockchain Data: Permanent on Solana ledger
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Section 20: Support */}
            <motion.section
              id="support"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-6"
            >
              <p className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-xl">🤝</span>
                20. Responsible Gambling Support
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <h3 className="text-[#F07730] font-bold mb-2">
                    20.1 Self-Exclusion
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Exclude your Wallet via support
                  </p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <h3 className="text-[#F07730] font-bold mb-2">20.2 Limits</h3>
                  <p className="text-gray-400 text-sm">
                    Set deposit/bet limits onchain
                  </p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <h3 className="text-[#F07730] font-bold mb-2">
                    20.3 Resources
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Links to help organizations
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 21: Governing Law */}
            <motion.section
              id="law"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-6"
            >
              <p className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Scale className="w-6 h-6 text-[#F07730]" />
                21. Governing Law & Dispute Resolution
              </p>
              <div className="space-y-3 text-gray-300">
                <p>
                  <span className="text-[#F07730] font-bold">
                    21.1 Governing Law:
                  </span>{" "}
                  These Terms are governed by Cayman Islands law.
                </p>
                <p>
                  <span className="text-[#F07730] font-bold">
                    21.2 Dispute Resolution:
                  </span>{" "}
                  Any dispute will be resolved via binding arbitration in the
                  Cayman Islands.
                </p>
                <p>
                  <span className="text-[#F07730] font-bold">
                    21.3 Arbitration Binding:
                  </span>{" "}
                  The arbitrator's decision is final and binding.
                </p>
              </div>
            </motion.section>

            {/* Section 22: Changes */}
            <motion.section
              id="changes"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-6"
            >
              <p className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-xl">📝</span>
                22. Changes to Terms
              </p>
              <div className="space-y-3 text-gray-300">
                <p>
                  <span className="text-[#F07730] font-bold">
                    22.1 Amendments:
                  </span>{" "}
                  We may update these Terms. Material changes will be notified
                  on the Platform.
                </p>
                <p>
                  <span className="text-[#F07730] font-bold">
                    22.2 Acceptance:
                  </span>{" "}
                  Continued use after changes indicates your acceptance of the
                  revised Terms.
                </p>
              </div>
            </motion.section>

            {/* Section 23: Contact */}
            <motion.section
              id="contact"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-6"
            >
              <p className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Mail className="w-6 h-6 text-[#F07730]" />
                23. Contact Us
              </p>
              <p className="text-gray-300 mb-4">
                For questions or to exercise your rights, contact us:
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:support@moonbet.games"
                  className="flex items-center gap-2 px-4 py-3 bg-white/5 rounded-xl border border-white/10 
                            hover:bg-white/10 transition-all"
                >
                  <Mail className="w-5 h-5 text-[#F07730]" />
                  <span className="text-gray-300">support@moonbet.games</span>
                </a>
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-xl">💬</span>
                  <span className="text-gray-300">
                    24/7 Live Chat via Platform
                  </span>
                </div>
              </div>
            </motion.section>

            {/* Final Statement */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="bg-gradient-to-r from-[#F07730]/20 to-[#EFD28E]/20 rounded-2xl p-6 border border-[#F07730]/30 text-center"
            >
              <p className="text-lg text-white font-bold mb-2">
                Thank you for choosing Moonbet
              </p>
              <p className="text-gray-300">
                Your fair, transparent, and secure on-chain gaming platform.
              </p>
            </motion.div>

            {/* Accept Terms Button (if not already accepted) */}
            {!acceptedTerms && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="flex justify-center"
              >
                <button
                  onClick={() => {
                    localStorage.setItem("moonbet_terms_accepted", "true");
                    setAcceptedTerms(true);
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-[#F07730] to-[#EFD28E] text-black font-bold 
                           rounded-xl hover:shadow-lg hover:shadow-[#F07730]/25 transition-all"
                >
                  I Accept the Terms & Conditions
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default TermsAndConditions;
