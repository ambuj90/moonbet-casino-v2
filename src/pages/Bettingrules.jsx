import React, { useState } from "react";
import { motion } from "framer-motion";

const BettingRules = () => {
  const [activeSection, setActiveSection] = useState("claims");

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

  const Clock = ({ className }) => (
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
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const DollarSign = ({ className }) => (
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
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const AlertCircle = ({ className }) => (
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
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const CheckCircle = ({ className }) => (
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
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  // Navigation sections
  const sections = [
    {
      id: "claims",
      label: "1. Claims and Protests",
      icon: <AlertCircle className="w-5 h-5" />,
    },
    {
      id: "general",
      label: "2. General Principles",
      icon: <Shield className="w-5 h-5" />,
    },
    { id: "games", label: "3. Eligible Games", icon: "🎮" },
    {
      id: "limits",
      label: "4. Stake Limits",
      icon: <DollarSign className="w-5 h-5" />,
    },
    { id: "settlement", label: "5. Settlement & Payouts", icon: "💰" },
    { id: "volatility", label: "6. Payout Structures", icon: "📊" },
    {
      id: "fairness",
      label: "7. Smart Contract & Fairness",
      icon: <Shield className="w-5 h-5" />,
    },
    { id: "promos", label: "8. Promotional Conditions", icon: "🎁" },
    { id: "fraud", label: "9. Fraud Prevention", icon: "🔒" },
    { id: "responsible", label: "10. Responsible Gaming", icon: "❤️" },
    { id: "glossary", label: "11. Glossary", icon: "📖" },
  ];

  // Glossary terms
  const glossaryTerms = [
    { term: "Stake", definition: "The crypto amount wagered per game round." },
    {
      term: "RTP (Return to Player)",
      definition: "Percentage of average stake returned over time.",
    },
    {
      term: "Volatility",
      definition:
        "Measure of payout variance; higher volatility means bigger swings.",
    },
    {
      term: "Provable RNG",
      definition:
        "Blockchain‐based random number generation verifiable on-chain.",
    },
    {
      term: "Wagering Requirement",
      definition:
        "Multiplier on bonus funds before conversion to withdrawable balance.",
    },
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

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Hero Section */}
      <section className="relative py-16 px-4 border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F07730]/10 via-transparent to-[#EFD28E]/10" />
        <div className="container max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-2xl md:text-2xl font-bold mb-6 ">
              Betting Rules
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Moonbet's Betting Rules ensure every on-chain casino wager is
              transparent, provably fair, and protected by secure crypto
              protocols. This detailed guide outlines claim procedures, general
              principles, game-specific rules, payout mechanics, and responsible
              gaming measures. Each section spells out exactly how Moonbet
              handles your bets so you can play with confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-2 md:px-4 py-6 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Desktop Only */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="wallet-btn3 rounded-2xl p-6">
                <p className="text-lg font-bold text-white mb-4">
                  Quick Navigation
                </p>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all flex items-center gap-2
                               ${
                                 activeSection === section.id
                                   ? "bg-[#F07730]/20 text-[#F07730]"
                                   : "text-gray-400 hover:bg-white/5 hover:text-white"
                               }`}
                    >
                      <span>{section.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            {/* Section 1: Claims and Protests */}
            <motion.section
              id="claims"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-2 md:p-8"
            >
              <p className="text-3xl font-bold text-white mb-4">
                1. Claims and Protests
              </p>
              <p className="text-gray-400 mb-6">
                How to dispute game outcomes or transaction errors.
              </p>

              <div className="space-y-4">
                <p className="text-gray-300">
                  All complaints must be submitted within{" "}
                  <span className="text-[#F07730] font-bold">14 days</span> of
                  the wager's result via{" "}
                  <a
                    href="mailto:support@moonbet.games"
                    className="text-[#F07730] underline hover:text-[#EFD28E]"
                  >
                    support@moonbet.games
                  </a>
                  . Include your account ID, transaction hash or bet reference,
                  timestamped screenshot of the game result, and a concise
                  explanation.
                </p>

                <p className="text-gray-300">
                  Moonbet will acknowledge within 48 hours and resolve disputes,
                  either approving a refund or providing a detailed response
                  within 7 business days. Claims received after 14 days are
                  automatically declined.
                </p>
              </div>
            </motion.section>

            {/* Section 2: General Betting Principles */}
            <motion.section
              id="general"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-2 md:p-8"
            >
              <p className="text-3xl font-bold text-white mb-4">
                2. General Betting Principles
              </p>
              <p className="text-gray-400 mb-6">
                Core rules governing acceptance, finality, and error handling of
                casino wagers.
              </p>

              <div className="space-y-6">
                <div>
                  <p className="text-xl font-bold text-white mb-3">
                    2.1 Bet Finality
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Once you confirm a wager, it is irrevocable. Always
                        verify game type, stake, and settings (volatility, rows,
                        bet size) before confirming.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Moonbet may void or adjust wagers only for clear
                        technical errors or rule violations (e.g., system
                        malfunction).
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-xl font-bold text-white mb-3">
                    2.2 Provable Fairness
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        All casino games use blockchain-based RNG with open
                        shuffles or provable algorithms. Game results are
                        publicly auditable on-chain.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Moonbet cannot alter results after provable data is
                        committed.
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-xl font-bold text-white mb-3">
                    2.3 Error Handling
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        If a game fails to load or a transaction times out, any
                        pending wager is canceled and stake returned
                        automatically.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        In rare cases of smart‐contract malfunction, Moonbet
                        will issue refunds once the issue is verified and fixed.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 3: Eligible Games */}
            <motion.section
              id="games"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-2 md:p-8"
            >
              <p className="text-3xl font-bold text-white mb-4">
                3. Eligible Games and Bet Types
              </p>
              <p className="text-gray-400 mb-6">
                Definitions of each supported casino game and their wager
                structures.
              </p>

              <div className="space-y-6">
                <div>
                  <p className="text-xl font-bold text-white mb-3">
                    3.1 Slot Games
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Single Spin Wager:
                        </span>{" "}
                        Stake per spin multiplied by the number of paylines.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Bonus Rounds & Free Spins:
                        </span>{" "}
                        Bets placed during bonus features follow the same
                        stake-per-line rule.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Autoplay Mode:
                        </span>{" "}
                        Automated spins at chosen stake; must set loss limit to
                        prevent runaway bets.
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-xl font-bold text-white mb-3">
                    3.2 Card Games & Live Dealer Titles
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">Table Bet:</span>{" "}
                        Stake placed against dealer on outcomes (e.g.,
                        Player/Banker in baccarat).
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">Side Bets:</span>{" "}
                        Optional wagers (e.g., pairs in blackjack) follow
                        separate payout tables.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Time Limits:
                        </span>{" "}
                        Bets must be confirmed before dealer announces "no more
                        bets." Late wagers are void.
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-xl font-bold text-white mb-3">
                    3.3 Special Games (Like Plinko)
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Ball Drop Wager:
                        </span>{" "}
                        Stake per ball. Players choose number of rows and
                        volatility.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Volatility Settings:
                        </span>{" "}
                        Low, Medium, High alter multiplier distribution (see
                        Section 6).
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">Row Count:</span>{" "}
                        8–16 rows adjust maximum multiplier potential versus hit
                        frequency.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 4: Stake Limits */}
            <motion.section
              id="limits"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-2 md:p-8"
            >
              <p className="text-3xl font-bold text-white mb-4">
                4. Stake Limits and Controls
              </p>
              <p className="text-gray-400 mb-6">
                Minimum, maximum, and dynamic limits to ensure platform
                stability.
              </p>

              <div className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Default Minimum Stake:
                      </span>{" "}
                      0.10 USDT (or equivalent token).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Default Maximum Stake:
                      </span>{" "}
                      100 USDT per spin/drop; high‐roller tables and VIP games
                      may allow up to 1,000 USDT.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Dynamic Caps:
                      </span>{" "}
                      Moonbet may adjust limits per account or game based on
                      observed risk, suspicious activity, or VIP status.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Player Controls:
                      </span>{" "}
                      Users can set personalized daily spend and loss caps in
                      their account settings.
                    </span>
                  </li>
                </ul>
              </div>
            </motion.section>

            {/* Section 5: Settlement and Payouts */}
            <motion.section
              id="settlement"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-2 md:p-8"
            >
              <p className="text-3xl font-bold text-white mb-4">
                5. Settlement and Payout Mechanics
              </p>
              <p className="text-gray-400 mb-6">
                When and how winnings are credited or refunded.
              </p>

              <div className="space-y-6">
                <div>
                  <p className="text-xl font-bold text-white mb-3">
                    5.1 Instant On-Chain Payouts
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Winnings are disbursed immediately via the same wallet
                        used for betting.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Payout transactions generate an on-chain record you can
                        verify in real time.
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-xl font-bold text-white mb-3">
                    5.2 Refunds and Voided Bets
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Voided Scenarios:
                        </span>{" "}
                        Game crash, network failure, or wager placed after
                        betting window closed.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Refund Process:
                        </span>{" "}
                        Voided stakes return instantly. You should watch your
                        wallet balance update on-chain.
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-xl font-bold text-white mb-3">
                    5.3 Transaction Fees
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Moonbet charges no platform withdrawal fees.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Only blockchain network gas fees apply, and those are
                        handled by your wallet provider.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 6: Payout Structures */}
            <motion.section
              id="volatility"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-2 md:p-8"
            >
              <p className="text-3xl font-bold text-white mb-4">
                6. Payout Structures and Volatility
              </p>
              <p className="text-gray-400 mb-6">
                How multipliers work, chance distributions, and risk settings.
              </p>

              <div className="space-y-6">
                <div>
                  <p className="text-xl font-bold text-white mb-3">
                    6.1 Plinko Multipliers
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Low Volatility:
                        </span>{" "}
                        Multipliers clustered between 0.5×–10× for frequent
                        small wins.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Medium Volatility:
                        </span>{" "}
                        Spread 0.5×–50× balancing hits and occasional big
                        rewards.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          High Volatility:
                        </span>{" "}
                        Wide range 0.2×–1,000×; rare but massive potential
                        payouts (&lt;0.002% chance for max).
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Row Impact:
                        </span>{" "}
                        More rows increase maximum multiplier but lower hit
                        frequency; fewer rows boost consistency.
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-xl font-bold text-white mb-3">
                    6.2 Slot RTP Variance
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Each slot lists its Return to Player (RTP) percentage
                        (e.g., 90%–98%).
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Higher RTP games offer steadier returns; low‐RTP titles
                        may feature bigger jackpot potential.
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-xl font-bold text-white mb-3">
                    6.3 Table & Live Dealer Payouts
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Standard pay tables are displayed before each bet window
                        (e.g., Blackjack pays 3:2 on naturals).
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Side bet odds (e.g., Perfect Pairs 25:1) clearly listed
                        on game UI.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 7: Smart Contract & Fairness */}
            <motion.section
              id="fairness"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-2 md:p-8"
            >
              <p className="text-3xl font-bold text-white mb-4">
                7. Smart‐Contract and Provable Fairness Audits
              </p>
              <p className="text-gray-400 mb-6">
                Transparency measures ensuring game integrity.
              </p>

              <div className="space-y-3">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      All RNG logic and shuffle contracts are open-source.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      Independent third-party audits are conducted quarterly;
                      reports published on Moonbet's Transparency page.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      Players can verify individual game seeds and outcomes via
                      on-chain proof tools linked in the game lobby.
                    </span>
                  </li>
                </ul>
              </div>
            </motion.section>

            {/* Section 8: Promotional Conditions */}
            <motion.section
              id="promos"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-2 md:p-8"
            >
              <p className="text-3xl font-bold text-white mb-4">
                8. Promotional Bet Conditions
              </p>
              <p className="text-gray-400 mb-6">
                Rules for wagering bonuses, free spins, and rakeback.
              </p>

              <div className="space-y-6">
                <div>
                  <p className="text-xl font-bold text-white mb-3">
                    8.1 Bonus Wagering Requirements
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Welcome Bonus:
                        </span>{" "}
                        Must wager the bonus amount on Plinko or slots before
                        withdrawal.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Free Spins:
                        </span>{" "}
                        Winnings from free spins convert to bonus balance with
                        certain wagering requirements.
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-xl font-bold text-white mb-3">
                    8.2 Rakeback for VIPs
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        VIP players earn rakeback on net losses across all
                        casino games.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Rakeback credited weekly as withdrawable funds.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 9: Fraud Prevention */}
            <motion.section
              id="fraud"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-2 md:p-8"
            >
              <p className="text-3xl font-bold text-white mb-4">
                9. Cancellation and Fraud Prevention
              </p>
              <p className="text-gray-400 mb-6">
                How Moonbet handles suspicious activity and enforces rules.
              </p>

              <div className="space-y-3">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Self‐Exclusion & Account Verification:
                      </span>{" "}
                      KYC optional but required for bonuses or VIP status.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Fraud Detection:
                      </span>{" "}
                      Automated monitoring flags irregular play patterns;
                      accounts may be suspended pending review.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Unauthorised Transactions:
                      </span>{" "}
                      Report wallet compromise immediately; Moonbet will freeze
                      account and transactions until resolved.
                    </span>
                  </li>
                </ul>
              </div>
            </motion.section>

            {/* Section 10: Responsible Gaming */}
            <motion.section
              id="responsible"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-2 md:p-8"
            >
              <p className="text-3xl font-bold text-white mb-4">
                10. Responsible Gaming and Support
              </p>
              <p className="text-gray-400 mb-6">
                Tools for safe play and where to seek help.
              </p>

              <div className="space-y-3">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Deposit/Loss Limits:
                      </span>{" "}
                      Set personal caps daily, weekly, or monthly.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">Time-Outs:</span>{" "}
                      Temporary session breaks of 24 hours up to 30 days.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Self-Exclusion:
                      </span>{" "}
                      Permanent ban option requiring identity confirmation.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">Support:</span>{" "}
                      24/7 live chat, email at{" "}
                      <a
                        href="mailto:support@moonbet.games"
                        className="text-[#F07730] underline hover:text-[#EFD28E]"
                      >
                        support@moonbet.games
                      </a>
                      , and Discord community for guidance and resources.
                    </span>
                  </li>
                </ul>
              </div>
            </motion.section>

            {/* Section 11: Glossary */}
            <motion.section
              id="glossary"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="wallet-btn3 rounded-2xl p-2 md:p-8"
            >
              <p className="text-3xl font-bold text-white mb-4">
                11. Glossary of Key Terms
              </p>
              <p className="text-gray-400 mb-6">
                Quick definitions of essential betting concepts.
              </p>

              <div className="space-y-4">
                {glossaryTerms.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/5 rounded-xl p-4 border border-white/10"
                  >
                    <h4 className="text-[#F07730] font-bold mb-1">
                      {item.term}
                    </h4>
                    <p className="text-gray-300 text-sm">{item.definition}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Final Note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="bg-gradient-to-r from-[#F07730]/20 to-[#EFD28E]/20 rounded-2xl p-8 border border-[#F07730]/30"
            >
              <p className="text-gray-300 text-center">
                With these rules, Moonbet guarantees a fair, transparent, and
                secure on-chain casino experience. Always review the rules
                before playing, set your controls wisely, and enjoy provably
                honest crypto gambling on Moonbet.
              </p>
            </motion.div>
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

export default BettingRules;
