import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProvablyFairPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Custom SVG Icon Component
  const FairIcon = () => (
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

  const faqData = [
    {
      question: "Can Moonbet see my results before I bet?",
      answer:
        "No. While the Server Seed determines the outcome, it's immediately hashed and only revealed after you bet. We cannot see the actual result until the round completes.",
    },
    {
      question: "What if I use the same Client Seed repeatedly?",
      answer:
        "The Nonce ensures each round produces different results even with identical seeds. However, changing your Client Seed regularly adds extra randomization.",
    },
    {
      question:
        "How do I know Moonbet isn't generating favorable Server Seeds?",
      answer:
        "Server Seeds are generated using secure randomization before any betting occurs. The hashed preview proves we cannot select favorable outcomes, and the mathematical verification confirms authentic randomness.",
    },
    {
      question: "Can other players affect my game outcomes?",
      answer:
        "Absolutely not. Each player's Client Seed and game session is completely independent. Other players' actions cannot influence your results.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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
          <div className="flex items-center gap-4">
            <FairIcon />
            <h1 className="font-bold text-[#CED5E3] uppercase text-2xl md:text-4xl lg:text-4xl">
              Provably Fair Gaming
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
          {/* Introduction */}
          <div className="wallet-btn3 rounded-2xl">
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              Moonbet's Provably Fair system puts mathematical proof behind
              every bet, replacing blind trust with blockchain-verified
              transparency. Unlike traditional casinos that hide their RNG
              behind closed doors, our provably fair games let you verify every
              outcome yourself using cryptographic proof that's impossible to
              fake.
            </p>
          </div>

          {/* What Is Provably Fair */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              What Is Provably Fair?
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-4">
              Provably fair is a cryptographic verification system that allows
              players to independently confirm the fairness of every game
              outcome. Instead of trusting the casino's word, you get
              mathematical proof that each result was generated fairly and
              couldn't be manipulated by anyone, including Moonbet.
            </p>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              Every game round generates a unique cryptographic "fingerprint"
              that you can verify using publicly available tools. This system
              ensures that game outcomes are predetermined before you bet,
              eliminating any possibility of real-time manipulation while
              maintaining complete randomness.
            </p>
          </div>

          {/* How Moonbet's Provably Fair System Works */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              How Moonbet's Provably Fair System Works
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-4">
              Our system uses three key components to generate verifiable,
              tamper-proof results:
            </p>

            {/* Server Seed */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                1. Server Seed (Our Random Value)
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                Before each game round, Moonbet generates a secret random string
                called the Server Seed. This value determines your game outcome,
                but we immediately hash it using SHA-256 encryption and show you
                the hash before you play. Think of this as a sealed envelope, we
                can't change what's inside once you've seen the seal.
              </p>
            </div>

            {/* Client Seed */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                2. Client Seed (Your Random Value)
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                You provide your own random input called the Client Seed. This
                can be automatically generated by your browser or you can enter
                a custom value. This ensures that you directly influence the
                outcome generation, making it impossible for anyone to predict
                or control results.
              </p>
            </div>

            {/* Nonce */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                3. Nonce (Round Counter)
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                Each bet gets a unique number called a Nonce that prevents the
                same seeds from producing identical results across multiple
                rounds. This counter increments with every bet, ensuring each
                outcome is unique even when using the same seeds.
              </p>
            </div>
          </div>

          {/* The Verification Process */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              The Verification Process
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] font-bold">
                  Before betting:
                </span>
                <span className="text-gray-300 text-sm md:text-base">
                  We show you the hashed Server Seed
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] font-bold">
                  During gameplay:
                </span>
                <span className="text-gray-300 text-sm md:text-base">
                  Your Client Seed and our Server Seed combine with the Nonce
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] font-bold">
                  Outcome generation:
                </span>
                <span className="text-gray-300 text-sm md:text-base">
                  SHA-256 cryptographic hashing produces your result
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] font-bold">
                  After the round:
                </span>
                <span className="text-gray-300 text-sm md:text-base">
                  We reveal the original Server Seed so you can verify the
                  outcome
                </span>
              </li>
            </ul>
          </div>

          {/* Step-by-Step Verification Guide */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Step-by-Step Verification Guide
            </h2>

            {/* Automatic Verification */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                Automatic Verification
              </h3>
              <p className="text-gray-300 text-sm md:text-base mb-3">
                Click the "Verify" button in any completed game round. Our
                built-in verification tool instantly confirms that:
              </p>

              <ul className="grid sm:grid-cols-1 gap-2 ml-4">
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    The revealed Server Seed matches the original hash
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Your Client Seed was correctly applied
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    The mathematical calculation produces the exact outcome you
                    received
                  </span>
                </li>
              </ul>
            </div>

            {/* Manual Verification */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                Manual Verification
              </h3>
              <p className="text-gray-300 text-sm md:text-base mb-3">
                For players who want deeper confirmation:
              </p>
              <ol className="list-decimal list-inside space-y-2 pl-4 text-gray-300 text-sm md:text-base">
                <li>
                  Copy the Server Seed, Client Seed, and Nonce from your game
                  history
                </li>
                <li>
                  Use any SHA-256 calculator to hash: Server Seed + Client Seed
                  + Nonce
                </li>
                <li>Compare the result with the game outcome displayed</li>
                <li>If they match, the round was provably fair</li>
              </ol>
            </div>
          </div>

          {/* Game-Specific Implementation */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Game-Specific Implementation
            </h2>

            {/* Plinko */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">Plinko</h3>
              <p className="text-gray-300 text-sm md:text-base mb-3">
                Each ball drop uses the combined seed values to determine:
              </p>

              <ul className="grid sm:grid-cols-1 gap-2 ml-4">
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Initial trajectory angle
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Peg collision physics
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Final landing slot
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Multiplier outcome
                  </span>
                </li>
              </ul>
              <p className="text-gray-300 text-sm md:text-base mt-3">
                The same seeds will always produce identical ball paths, making
                every drop completely verifiable.
              </p>
            </div>

            {/* Slots */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">Slots</h3>
              <p className="text-gray-300 text-sm md:text-base mb-3">
                Provably fair slots determine:
              </p>
              <ul className="grid sm:grid-cols-1 gap-2 ml-4">
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Reel positions for each symbol
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Bonus round triggers
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Free spin outcomes
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Progressive jackpot contributions
                  </span>
                </li>
              </ul>
            </div>

            {/* Live Dealer Games */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                Live Dealer Games
              </h3>
              <p className="text-gray-300 text-sm md:text-base mb-3">
                Our live games combine provably fair algorithms with real
                dealers:
              </p>

              <ul className="grid sm:grid-cols-1 gap-2 ml-4">
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Card shuffles use cryptographic randomization
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Dice rolls incorporate physical entropy with digital
                    verification
                  </span>
                </li>
                <li className="flex items-start md:items-center gap-2">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Roulette spins blend mechanical randomness with blockchain
                    verification
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Why Provably Fair Matters */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Why Provably Fair Matters
            </h2>

            {/* Complete Transparency */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                Complete Transparency
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                You don't have to trust Moonbet's claims about fairness, you can
                verify every result yourself using mathematics that's impossible
                to fake.
              </p>
            </div>

            {/* Player Control */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                Player Control
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                Your Client Seed input means you directly participate in
                generating outcomes. No one can manipulate results without your
                knowledge.
              </p>
            </div>

            {/* Instant Verification */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                Instant Verification
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                Check any game result immediately using our built-in tools or
                third-party verification scripts available across the crypto
                gaming community.
              </p>
            </div>

            {/* Blockchain Integration */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                Blockchain Integration
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                All verification data is stored on-chain, creating a permanent,
                tamper-proof record of every bet and outcome.
              </p>
            </div>
          </div>

          {/* Advanced Features */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Advanced Features
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Custom Client Seeds */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="text-[#F07730] font-bold text-sm md:text-base mb-2">
                  Custom Client Seeds
                </h3>
                <p className="text-gray-300 text-sm">
                  Set your own Client Seed for enhanced personalization and
                  control over the randomization process.
                </p>
              </div>

              {/* Bulk Verification */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="text-[#F07730] font-bold text-sm md:text-base mb-2">
                  Bulk Verification
                </h3>
                <p className="text-gray-300 text-sm">
                  Verify hundreds of past bets simultaneously using our batch
                  verification tool.
                </p>
              </div>

              {/* Third-Party Integration */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="text-[#F07730] font-bold text-sm md:text-base mb-2">
                  Third-Party Integration
                </h3>
                <p className="text-gray-300 text-sm">
                  Export your game data for verification using external tools
                  like BTCGOSU's Provably Fair Verifier or community-built
                  verification scripts.
                </p>
              </div>

              {/* Open Source Tools */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="text-[#F07730] font-bold text-sm md:text-base mb-2">
                  Open Source Tools
                </h3>
                <p className="text-gray-300 text-sm">
                  Access our verification algorithms on GitHub, allowing
                  technical players to audit our implementation and build their
                  own verification tools.
                </p>
              </div>
            </div>
          </div>

          {/* FAQs Section */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-6"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              FAQs
            </h2>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="relative rounded-lg p-[1px] bg-[linear-gradient(106deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.10)_35%,rgba(255,255,255,0.05)_70%,rgba(255,255,255,0)_100%)]"
                >
                  <div className="rounded-lg bg-[#0A0B0D]/80 backdrop-blur-sm">
                    {/* Question */}
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center"
                    >
                      <p className="text-base md:text-lg font-[400] text-[#CED5E3] pr-4">
                        Q: {faq.question}
                      </p>
                      <motion.span
                        animate={{ rotate: activeIndex === index ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-2xl text-[#CED5E3] flex-shrink-0"
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
                          <p className="text-[#E5EAF2] text-sm md:text-base opacity-90">
                            A: {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Trust Through Mathematics */}
          <div className="wallet-btn3 rounded-2xl">
            <h2
              className="text-xl md:text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Trust Through Mathematics
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-4">
              Provably fair gaming represents the evolution from "trust us" to
              "verify yourself." Moonbet's implementation gives you the tools to
              mathematically prove that every bet, every spin, and every outcome
              was generated fairly using unbreakable cryptographic methods.
            </p>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-4">
              Your wins are earned, your losses are fair, and every result is
              verifiable. That's the Moonbet guarantee, backed not by promises,
              but by mathematical proof.
            </p>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              Geared up to enjoy provably fair gaming? Every game on Moonbet
              includes full verification tools. Check your results, verify the
              math, and play with complete confidence in a system designed for
              transparency.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProvablyFairPage;
