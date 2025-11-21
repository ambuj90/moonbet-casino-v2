import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RNGTestingPolicy = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Custom SVG Icon Component
  const RNGIcon = () => (
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
        fill="url(#gradient1)"
      />
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F07730" />
          <stop offset="100%" stopColor="#EFD28E" />
        </linearGradient>
      </defs>
    </svg>
  );

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // FAQ Data
  const faqData = [
    {
      question: "Can Moonbet manipulate RNG results in real-time?",
      answer:
        "No. Cryptographic commitment systems lock in outcomes before betting occurs. The Company cannot see or alter results until after players place their bets.",
    },
    {
      question: "Why do I sometimes experience long losing streaks?",
      answer:
        "Random outcomes naturally include streaks and patterns. True randomness does not guarantee even distribution in short sessions. Experiencing both winning and losing streaks is statistically normal.",
    },
    {
      question: "How do I know if the RNG is working properly?",
      answer:
        "Check the actual RTP statistics published for each game and use our verification tools to audit individual outcomes. Consistent performance within expected statistical ranges indicates proper RNG function.",
    },
    {
      question: "Can other players affect my RNG outcomes?",
      answer:
        "No. Each player's outcomes are generated independently. Other players' actions, betting patterns, or timing cannot influence your results.",
    },
    {
      question: "What makes blockchain RNG better than traditional RNG?",
      answer:
        "Blockchain RNG provides cryptographic proof of fairness that you can verify yourself using mathematical verification tools, while traditional RNG requires blind trust in the casino's claims.",
    },
    {
      question: "How often is the RNG tested?",
      answer:
        "RNG systems undergo rigorous independent testing before launch and receive continuous monitoring 24/7 for compliance and proper function. Additional periodic audits by certified testing laboratories are conducted as required by regulatory standards.",
    },
  ];

  return (
    <section className="w-full min-h-screen   py-12 md:py-16 lg:py-20">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="wallet-btn3 rounded-2xl pb-6 text-center"
        >
          <div className="flex items-start gap-4">
            <h1 className="font-bold text-[#CED5E3] text-left uppercase text-2xl md:text-4xl lg:text-4xl">
              MOONBET FAIRNESS & RNG TESTING POLICY
            </h1>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Section 1 - Overview */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">1.</span> OVERVIEW
            </h2>

            {/* 1.1 Company Information */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                1.1 Company Information
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                Moonbet Operations Ltd. (the "Company" or "we"), registration
                number [to be provided upon licensing completion], registered
                address [to be provided upon licensing completion], operates via
                the website Moonbet.games and associated platforms and
                applications. The Company is licensed and regulated by
                [Licensing Authority to be specified upon licensing completion]
                under License No. [to be provided upon licensing completion].
              </p>
            </div>

            {/* 1.2 Commitment to Fairness */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                1.2 Commitment to Fairness
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                The Company is committed to ensuring that all games offered on
                the platform are fair, transparent, and operate with verified
                randomness. This policy outlines the methodologies, testing
                procedures, and certifications that guarantee game fairness and
                RNG integrity.
              </p>
            </div>

            {/* 1.3 Software Provider Partnerships */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                1.3 Software Provider Partnerships
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                The Company has agreements with professional games and gambling
                software providers (developers and aggregators) to ensure
                fairness of all games provided on the platform. The Company's
                software technology, IT infrastructure, and technical
                development are managed in collaboration with certified software
                providers and third-party testing laboratories.
              </p>
            </div>
          </div>

          {/* Section 2 - RNG Definition and Purpose */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">2.</span> RANDOM NUMBER GENERATOR
              (RNG) DEFINITION AND PURPOSE
            </h2>

            {/* 2.1 What is RNG */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                2.1 What is RNG
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-3">
                A Random Number Generator (RNG) is a computer program and
                cryptographic system that produces the results of every game
                played on our platform. The RNG is the mathematical engine that
                determines game outcomes such as:
              </p>
              <ul className="grid sm:grid-cols-2 gap-2 ml-4">
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Slot symbol positions
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Roulette ball landing positions
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Card shuffling and distribution
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">Dice rolls</span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Bonus trigger timing
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Payout multipliers
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    All randomized game elements
                  </span>
                </li>
              </ul>
            </div>

            {/* 2.2 RNG Characteristics */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                2.2 RNG Characteristics
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-3">
                The RNG is:
              </p>
              <div className="grid gap-3">
                <div className="p-3">
                  <p className="text-gray-300 text-sm">
                    <span className="font-bold text-white">
                      Entirely random:
                    </span>{" "}
                    Results are generated through cryptographic algorithms and
                    are neither predictable nor manipulable.
                  </p>
                </div>
                <div className="p-3">
                  <p className="text-gray-300 text-sm">
                    <span className="font-bold text-white">
                      Regulated and governed:
                    </span>{" "}
                    RNG systems operate under licensing agreements and
                    regulatory oversight.
                  </p>
                </div>
                <div className="p-3">
                  <p className="text-gray-300 text-sm">
                    <span className="font-bold text-white">
                      Regularly and rigorously tested:
                    </span>{" "}
                    Independent, industry-approved testing bodies verify RNG
                    integrity and randomness.
                  </p>
                </div>
                <div className="p-3">
                  <p className="text-gray-300 text-sm">
                    <span className="font-bold text-white">
                      Blockchain-integrated:
                    </span>{" "}
                    Where applicable, RNG outcomes are recorded on-chain,
                    creating permanent, auditable records.
                  </p>
                </div>
                <div className="p-3">
                  <p className="text-gray-300 text-sm">
                    <span className="font-bold text-white">Tamper-proof:</span>{" "}
                    Cryptographic commitments and one-way hashing prevent
                    manipulation or retroactive changes to results.
                  </p>
                </div>
              </div>
            </div>

            {/* 2.3 RNG Cannot Be Manipulated */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                2.3 RNG Cannot Be Manipulated
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                The Company cannot predict, manipulate, or alter RNG results,
                nor can any external party. Cryptographic commitment systems
                lock in outcomes before any gameplay occurs, creating
                mathematical proof that fairness is maintained.
              </p>
            </div>
          </div>

          {/* Section 3 - RNG Technology and Implementation */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">3.</span> RNG TECHNOLOGY AND
              IMPLEMENTATION
            </h2>

            {/* 3.1 Cryptographic Foundation */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                3.1 Cryptographic Foundation
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-3">
                Moonbet's RNG utilizes advanced cryptographic algorithms based
                on industry-standard, battle-tested hashing functions. The
                system incorporates:
              </p>
              <div className="grid gap-3">
                <div className="p-3">
                  <p className="text-gray-300 text-sm">
                    <span className="font-bold text-white">
                      Hardware-level entropy:
                    </span>{" "}
                    Cryptographically secure random seed generation from
                    physical hardware sources.
                  </p>
                </div>
                <div className="p-3">
                  <p className="text-gray-300 text-sm">
                    <span className="font-bold text-white">
                      Client-side randomness:
                    </span>{" "}
                    Player browsers and wallets contribute additional
                    randomness, ensuring no single party controls outcomes.
                  </p>
                </div>
                <div className="p-3">
                  <p className="text-gray-300 text-sm">
                    <span className="font-bold text-white">
                      Blockchain verification:
                    </span>{" "}
                    Final results recorded on-chain (Solana or other applicable
                    networks) for permanent, publicly verifiable records.
                  </p>
                </div>
                <div className="p-3">
                  <p className="text-gray-300 text-sm">
                    <span className="font-bold text-white">
                      KECCAK-256 and similar cryptographic standards:
                    </span>{" "}
                    Military-grade encryption securing all randomness
                    generation.
                  </p>
                </div>
              </div>
            </div>

            {/* 3.2 Commitment and Verification System */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                3.2 Commitment and Verification System
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-3">
                The RNG operates using a commitment and verification model:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-[#F07730] font-bold text-sm mb-2">
                    1. Commitment Phase
                  </p>
                  <p className="text-gray-300 text-sm">
                    Server-side seeds are hashed and made publicly visible
                    before any betting occurs.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-[#F07730] font-bold text-sm mb-2">
                    2. Gameplay Phase
                  </p>
                  <p className="text-gray-300 text-sm">
                    Player actions and client-side inputs contribute additional
                    randomness.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-[#F07730] font-bold text-sm mb-2">
                    3. Result Generation
                  </p>
                  <p className="text-gray-300 text-sm">
                    Final outcome is generated using cryptographic algorithms.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-[#F07730] font-bold text-sm mb-2">
                    4. Blockchain Recording
                  </p>
                  <p className="text-gray-300 text-sm">
                    Result is permanently recorded on-chain.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-[#F07730] font-bold text-sm mb-2">
                    5. Player Verification
                  </p>
                  <p className="text-gray-300 text-sm">
                    Players can independently verify outcomes using published
                    algorithms and cryptographic proofs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4 - Third-Party Certification */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">4.</span> THIRD-PARTY
              CERTIFICATION AND TESTING
            </h2>

            {/* 4.1 Independent Testing Laboratory */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                4.1 Independent Testing Laboratory
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-3">
                All Moonbet RNG systems and games undergo rigorous testing and
                certification by independent, internationally recognized testing
                laboratories. The Company engages certified testing bodies such
                as [Gaming Laboratories International (GLI), iTech Labs, eCOGRA,
                or equivalent] to verify:
              </p>
              <div className="grid sm:grid-cols-1">
                <div className="p-3">
                  <p className="text-gray-300 text-sm">
                    <span className="font-bold text-white">Randomness:</span>{" "}
                    Statistical analysis confirming true randomness of outcomes
                  </p>
                </div>
                <div className="p-3">
                  <p className="text-gray-300 text-sm">
                    <span className="font-bold text-white">
                      Unpredictability:
                    </span>{" "}
                    Verification that results cannot be predicted or forecasted
                  </p>
                </div>
                <div className="p-3">
                  <p className="text-gray-300 text-sm">
                    <span className="font-bold text-white">
                      Mathematical integrity:
                    </span>{" "}
                    Confirmation that game mathematics and algorithms function
                    as designed
                  </p>
                </div>
                <div className="p-3">
                  <p className="text-gray-300 text-sm">
                    <span className="font-bold text-white">Compliance:</span>{" "}
                    Adherence to international gaming authority standards and
                    regulatory requirements
                  </p>
                </div>
                <div className="p-3">
                  <p className="text-gray-300 text-sm">
                    <span className="font-bold text-white">Security:</span>{" "}
                    Validation that systems are secure against manipulation and
                    external interference
                  </p>
                </div>
              </div>
            </div>

            {/* 4.2 Testing Scope */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                4.2 Testing Scope
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-3">
                Third-party certifiers verify:
              </p>
              <ul className="grid gap-2 ml-4">
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    <span className="font-bold text-white">Functionality:</span>{" "}
                    Games operate as designed without errors or malfunctions
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    <span className="font-bold text-white">
                      Display accuracy:
                    </span>{" "}
                    Game interface accurately represents odds, payouts, and
                    rules
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    <span className="font-bold text-white">
                      Transaction integrity:
                    </span>{" "}
                    Deposits, bets, and payouts are processed correctly
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    <span className="font-bold text-white">Game rules:</span>{" "}
                    Rules are implemented exactly as published
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    <span className="font-bold text-white">
                      RNG mathematics:
                    </span>{" "}
                    Random number generation is cryptographically sound and
                    statistically valid
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    <span className="font-bold text-white">
                      RTP calculations:
                    </span>{" "}
                    Return to Player percentages are mathematically correct and
                    achievable
                  </span>
                </li>
              </ul>
            </div>

            {/* 4.3 Certification Documentation */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                4.3 Certification Documentation
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                Certifications and testing reports are maintained and made
                available to regulatory authorities. Summary certification
                information and verification seals may be displayed on the
                platform to confirm third-party validation.
              </p>
            </div>
          </div>

          {/* Section 5 - Continuous Monitoring */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">5.</span> CONTINUOUS MONITORING
              AND COMPLIANCE
            </h2>

            {/* 5.1 24/7 Automated Monitoring */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                5.1 24/7 Automated Monitoring
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-3">
                The Company operates continuous, automated monitoring systems
                that track RNG performance and game outcomes in real-time. These
                systems:
              </p>
              <ul className="grid gap-2 ml-4">
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Monitor statistical distribution of outcomes for each game
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Detect anomalies or deviations from expected ranges
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Trigger immediate investigation if unusual patterns are
                    detected
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Log all monitoring activities for audit and compliance
                    purposes
                  </span>
                </li>
              </ul>
            </div>

            {/* 5.2 RTP Performance Analysis */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                5.2 RTP Performance Analysis
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-3">
                The Company conducts regular (monthly or more frequent) analysis
                of actual Return to Player (RTP) performance to ensure games
                perform within expected statistical ranges. This analysis
                confirms that:
              </p>
              <ul className="grid gap-2 ml-4">
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    RNG systems function properly and generate truly random
                    results
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Game mathematical integrity is maintained
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Actual payout percentages align with published Theoretical
                    RTP values (within acceptable statistical variance)
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    No systematic bias or manipulation has occurred
                  </span>
                </li>
              </ul>
            </div>

            {/* 5.3 Statistical Variance */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                5.3 Statistical Variance
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                The Company acknowledges that short-term actual RTP may deviate
                from Theoretical RTP due to natural statistical variance.
                However, over significant numbers of game rounds (millions of
                plays), actual RTP converges toward Theoretical RTP, confirming
                proper RNG operation.
              </p>
            </div>
          </div>

          {/* Section 6 - Return to Player (RTP) */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">6.</span> RETURN TO PLAYER (RTP)
              AND THEORETICAL RTP
            </h2>

            {/* 6.1 Definition of Theoretical RTP */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                6.1 Definition of Theoretical RTP
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                The Theoretical Return to Player (RTP) is a theoretical
                calculation of the expected percentage of total wagers that a
                specific game will return to players as winnings after an
                extremely large number of plays (e.g., hundreds of millions of
                rounds).
              </p>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base mt-3">
                For example, a game with 96% RTP means that, mathematically, for
                every $100 wagered across all players over millions of rounds,
                approximately $96 is returned as winnings and $4 is retained as
                house edge.
              </p>
            </div>

            {/* 6.2 Important RTP Context */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                6.2 Important RTP Context
              </h3>
              <div className="grid gap-3">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-gray-300 text-sm">
                    <span className="font-bold text-white">
                      Theoretical vs. Actual:
                    </span>{" "}
                    Theoretical RTP is a mathematical expectation; actual
                    results in any given session may vary significantly.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-gray-300 text-sm">
                    <span className="font-bold text-white">
                      Long-term average:
                    </span>{" "}
                    RTP is achieved only over extremely large numbers of plays.
                    Individual sessions can result in wins or losses regardless
                    of RTP.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-gray-300 text-sm">
                    <span className="font-bold text-white">
                      Individual variance:
                    </span>{" "}
                    Your personal RTP can differ wildly from the game's
                    Theoretical RTP. Some players win more; others lose more,
                    depending on random outcomes.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-gray-300 text-sm">
                    <span className="font-bold text-white">
                      House edge exists:
                    </span>{" "}
                    The difference between 100% and the RTP represents the
                    mathematical house edge. This built-in advantage ensures the
                    platform's financial sustainability.
                  </p>
                </div>
              </div>
            </div>

            {/* 6.3 RTP Transparency */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                6.3 RTP Transparency
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                Each game on the Moonbet platform displays its Theoretical RTP
                prominently, allowing players to understand the house edge and
                long-term mathematical expectations before playing.
              </p>
            </div>
          </div>

          {/* Section 7 - Compliance Testing */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">7.</span> COMPLIANCE TESTING AND
              INTEGRATION
            </h2>

            {/* 7.1 Development and Testing Phases */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                7.1 Development and Testing Phases
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-3">
                All games undergo rigorous testing before launch:
              </p>
              <div className="grid gap-3">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-[#F07730] font-bold text-sm mb-2">
                    Phase 1: Developer Testing
                  </p>
                  <p className="text-gray-300 text-sm">
                    Software developers and game providers conduct initial
                    testing to verify functionality and compliance with
                    specifications.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-[#F07730] font-bold text-sm mb-2">
                    Phase 2: Third-Party Certification Testing
                  </p>
                  <p className="text-gray-300 text-sm">
                    Independent, certified testing laboratories conduct
                    comprehensive testing of RNG, RTP, functionality, display,
                    transactions, and rules.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-[#F07730] font-bold text-sm mb-2">
                    Phase 3: Integration Testing
                  </p>
                  <p className="text-gray-300 text-sm">
                    The Company integrates games into the Moonbet platform and
                    conducts Integration Testing to verify functionality within
                    the platform environment.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-[#F07730] font-bold text-sm mb-2">
                    Phase 4: User Acceptance Testing (UAT)
                  </p>
                  <p className="text-gray-300 text-sm">
                    Games undergo User Acceptance Testing to ensure they
                    function as expected in terms of user experience,
                    performance, and security.
                  </p>
                </div>
              </div>
            </div>

            {/* 7.2 Pre-Launch Verification */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                7.2 Pre-Launch Verification
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                Games are not made available to players until all testing phases
                are complete and verification requirements are satisfied.
                Documentation of all testing and compliance checks is maintained
                for regulatory review.
              </p>
            </div>

            {/* 7.3 Post-Launch Monitoring */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                7.3 Post-Launch Monitoring
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                Following launch, games remain subject to continuous monitoring
                (Section 5.1) to ensure ongoing compliance and proper RNG
                function.
              </p>
            </div>
          </div>

          {/* Section 8 - Player Verification */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">8.</span> PLAYER VERIFICATION AND
              TRANSPARENCY
            </h2>

            {/* 8.1 Verification Tools */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                8.1 Verification Tools
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-3">
                Players can independently verify game fairness and RNG integrity
                through:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3">
                  <p className="text-gray-300 text-sm">
                    <span className="font-bold text-white">
                      Outcome verification tools:
                    </span>{" "}
                    Access verification data for any game round, including
                    cryptographic seeds and hashes
                  </p>
                </div>
                <div className="p-3">
                  <p className="text-gray-300 text-sm">
                    <span className="font-bold text-white">
                      Open-source verification scripts:
                    </span>{" "}
                    Published algorithms and scripts enabling technical players
                    to audit outcomes using publicly available tools
                  </p>
                </div>
                <div className="p-3">
                  <p className="text-gray-300 text-sm">
                    <span className="font-bold text-white">
                      GitHub repositories:
                    </span>{" "}
                    Key RNG algorithms and verification components are available
                    on GitHub for community audit
                  </p>
                </div>
                <div className="p-3">
                  <p className="text-gray-300 text-sm">
                    <span className="font-bold text-white">
                      Blockchain explorers:
                    </span>{" "}
                    On-chain game results can be verified through public
                    blockchain explorers
                  </p>
                </div>
              </div>
            </div>

            {/* 8.2 Transparency of Algorithms */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                8.2 Transparency of Algorithms
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-3">
                The Company publishes:
              </p>
              <ul className="grid gap-2 ml-4">
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    RNG algorithm descriptions and specifications
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Cryptographic hashing methods used
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Commitment/verification protocols
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    RTP calculation methodologies
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Game rule specifications
                  </span>
                </li>
              </ul>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base mt-4">
                This information enables players, regulators, and independent
                auditors to verify fairness without requiring blind trust in the
                Company's claims.
              </p>
            </div>
          </div>

          {/* Section 9 - Regulatory Compliance */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">9.</span> REGULATORY COMPLIANCE
              AND AUTHORITY OVERSIGHT
            </h2>

            {/* 9.1 Licensing and Regulatory Requirements */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                9.1 Licensing and Regulatory Requirements
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                The Company's fairness, transparency, and RNG integrity are
                confirmed by [Licensing Authority] under License No. [License
                Number]. The Company complies with all applicable regulations
                and standards set by the licensing authority regarding game
                fairness, RNG testing, and player protection.
              </p>
            </div>

            {/* 9.2 Regulatory Verification */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                9.2 Regulatory Verification
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                A Verification Seal or official confirmation of regulatory
                approval regarding RNG fairness and game compliance may be
                displayed on the Moonbet website and platform, confirming the
                Company's compliance status with the licensing authority.
              </p>
            </div>

            {/* 9.3 Regulatory Reporting */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                9.3 Regulatory Reporting
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                The Company maintains all documentation of RNG testing,
                certification, and compliance and provides such documentation to
                regulatory authorities upon request. The Company cooperates
                fully with regulatory audits, inspections, and investigations.
              </p>
            </div>
          </div>

          {/* Section 10 - RNG Across Game Types */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">10.</span> RNG ACROSS GAME TYPES
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {/* 10.1 Slot Games */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-3">
                  10.1 Slot Games
                </h3>
                <p className="text-gray-300 text-sm mb-2">
                  Slot games use RNG to determine:
                </p>
                <ul className="space-y-1 ml-4">
                  <li className="flex items-start md:items-center gap-2">
                    <span className="text-[#F07730] mt-1 text-xs">•</span>
                    <span className="text-gray-300 text-sm">
                      Reel positions: Which symbols appear on each reel
                    </span>
                  </li>
                  <li className="flex items-start md:items-center gap-2">
                    <span className="text-[#F07730] mt-1 text-xs">•</span>
                    <span className="text-gray-300 text-sm">
                      Bonus triggers: When and if bonus rounds activate
                    </span>
                  </li>
                  <li className="flex items-start md:items-center gap-2">
                    <span className="text-[#F07730] mt-1 text-xs">•</span>
                    <span className="text-gray-300 text-sm">
                      Multipliers: Random payout multipliers applied to wins
                    </span>
                  </li>
                  <li className="flex items-start md:items-center gap-2">
                    <span className="text-[#F07730] mt-1 text-xs">•</span>
                    <span className="text-gray-300 text-sm">
                      Progressive jackpots: Trigger conditions for progressive
                      prize pools
                    </span>
                  </li>
                </ul>
              </div>

              {/* 10.2 Table Games */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-3">
                  10.2 Table Games
                </h3>
                <p className="text-gray-300 text-sm mb-2">
                  Table games use RNG to simulate authentic gaming outcomes:
                </p>
                <ul className="space-y-1 ml-4">
                  <li className="flex items-start md:items-center gap-2">
                    <span className="text-[#F07730] mt-1 text-xs">•</span>
                    <span className="text-gray-300 text-sm">
                      Card shuffling: Virtual decks are shuffled using
                      cryptographic randomness
                    </span>
                  </li>
                  <li className="flex items-start md:items-center gap-2">
                    <span className="text-[#F07730] mt-1 text-xs">•</span>
                    <span className="text-gray-300 text-sm">
                      Dice rolls: Craps and other dice games use RNG to simulate
                      authentic roll outcomes
                    </span>
                  </li>
                  <li className="flex items-start md:items-center gap-2">
                    <span className="text-[#F07730] mt-1 text-xs">•</span>
                    <span className="text-gray-300 text-sm">
                      Roulette spins: Ball landing positions generated through
                      cryptographically secure algorithms
                    </span>
                  </li>
                  <li className="flex items-start md:items-center gap-2">
                    <span className="text-[#F07730] mt-1 text-xs">•</span>
                    <span className="text-gray-300 text-sm">
                      Card distribution: Baccarat, blackjack, and other card
                      games use RNG for authentic card distribution
                    </span>
                  </li>
                </ul>
              </div>

              {/* 10.3 Live Dealer Games */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-3">
                  10.3 Live Dealer Games
                </h3>
                <p className="text-gray-300 text-sm mb-2">
                  Live dealer games combine physical randomness with digital RNG
                  verification:
                </p>
                <ul className="space-y-1 ml-4">
                  <li className="flex items-start md:items-center gap-2">
                    <span className="text-[#F07730] mt-1 text-xs">•</span>
                    <span className="text-gray-300 text-sm">
                      Physical elements: Real dealers use physical cards and
                      wheels
                    </span>
                  </li>
                  <li className="flex items-start md:items-center gap-2">
                    <span className="text-[#F07730] mt-1 text-xs">•</span>
                    <span className="text-gray-300 text-sm">
                      Shuffle verification: Card shuffles incorporate
                      cryptographic verification
                    </span>
                  </li>
                  <li className="flex items-start md:items-center gap-2">
                    <span className="text-[#F07730] mt-1 text-xs">•</span>
                    <span className="text-gray-300 text-sm">
                      Cut card placement: Random elements determined by RNG
                    </span>
                  </li>
                  <li className="flex items-start md:items-center gap-2">
                    <span className="text-[#F07730] mt-1 text-xs">•</span>
                    <span className="text-gray-300 text-sm">
                      Side bets: Digital side bets use certified RNG systems
                    </span>
                  </li>
                </ul>
              </div>

              {/* 10.4 Originals/Specialty Games */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-3">
                  10.4 Originals/Specialty Games
                </h3>
                <p className="text-gray-300 text-sm mb-2">
                  Moonbet Originals or Specialty games (Plinko, Crash, etc.) use
                  RNG for:
                </p>
                <ul className="space-y-1 ml-4">
                  <li className="flex items-start md:items-center gap-2">
                    <span className="text-[#F07730] mt-1 text-xs">•</span>
                    <span className="text-gray-300 text-sm">
                      Physics simulation: Ball trajectories and interactions in
                      physics-based games
                    </span>
                  </li>
                  <li className="flex items-start md:items-center gap-2">
                    <span className="text-[#F07730] mt-1 text-xs">•</span>
                    <span className="text-gray-300 text-sm">
                      Crash multipliers: Randomly determined crash points
                    </span>
                  </li>
                  <li className="flex items-start md:items-center gap-2">
                    <span className="text-[#F07730] mt-1 text-xs">•</span>
                    <span className="text-gray-300 text-sm">
                      Mini-games: All bonus games use certified RNG systems
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 11 - Integrity and Fairness Assurances */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">11.</span> INTEGRITY AND FAIRNESS
              ASSURANCES
            </h2>

            {/* 11.1 Mathematical Fairness */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                11.1 Mathematical Fairness
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-3">
                RNG systems ensure outcomes are determined purely by
                mathematics, eliminating:
              </p>
              <ul className="grid gap-2 ml-4">
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Human bias or favoritism
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Predictable patterns
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Unfair advantages to any party
                  </span>
                </li>
              </ul>
            </div>

            {/* 11.2 Player Protection */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                11.2 Player Protection
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-3">
                Cryptographic proofs and blockchain verification protect players
                by:
              </p>
              <ul className="grid gap-2 ml-4">
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Preventing unfair practices
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Ensuring outcomes are immutable and permanently recorded
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Enabling independent verification
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Maintaining house edge within published parameters
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 12 - FAQ */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-6"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">12.</span> FREQUENTLY ASKED
              QUESTIONS
            </h2>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative rounded-lg p-[1px] bg-[linear-gradient(106deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.10)_35%,rgba(255,255,255,0.05)_70%,rgba(255,255,255,0)_100%)]"
                >
                  <div className="rounded-lg bg-[#0A0B0D]/80 backdrop-blur-sm">
                    {/* Question */}
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center"
                    >
                      <p className="text-base md:text-lg font-[400] text-[#CED5E3] pr-4">
                        {faq.question}
                      </p>
                      <motion.span
                        animate={{ rotate: activeIndex === index ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-2xl text-[#CED5E3]"
                      >
                        +
                      </motion.span>
                    </button>

                    {/* Answer */}
                    <AnimatePresence>
                      {activeIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden px-6 pb-6"
                        >
                          <p className="text-[#E5EAF2] text-[16px] md:text-[18px] opacity-90 leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section 13 - Contact for Fairness Inquiries */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              <span className="text-[#F07730]">13.</span> CONTACT FOR FAIRNESS
              INQUIRIES
            </h2>
            <p className="text-gray-300 mb-4 text-sm md:text-base">
              For questions about RNG fairness, testing procedures, or to verify
              game outcomes:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:support@moonbet.games"
                className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
              >
                <span className="text-[#F07730]">📧</span>
                <span className="text-gray-300">support@moonbet.games</span>
              </a>
              <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-[#F07730]">💬</span>
                <span className="text-gray-300">
                  24/7 Live Chat via the platform
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RNGTestingPolicy;
