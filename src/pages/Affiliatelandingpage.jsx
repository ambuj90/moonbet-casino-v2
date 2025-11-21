import React, { useState } from "react";
import { motion } from "framer-motion";

const AffiliateLandingPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  // Custom Icons as SVG components
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

  const ChevronDown = ({ className }) => (
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
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );

  const ChevronUp = ({ className }) => (
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
        d="M5 15l7-7 7 7"
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

  const BarChart = ({ className }) => (
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
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  );

  const TrendingUp = ({ className }) => (
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
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
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

  const Zap = ({ className }) => (
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
        d="M13 10V3L4 14h7v7l9-11h-7z"
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

  const MessageCircle = ({ className }) => (
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
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );

  const Headphones = ({ className }) => (
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

  // FAQ data
  const faqs = [
    {
      question: "How quickly can I start earning?",
      answer:
        "Your unique referral link is generated instantly upon wallet connection. You can start promoting and earning commissions immediately.",
    },
    {
      question: "What games can I promote?",
      answer:
        "All Moonbet games including slots, table games (blackjack, roulette, baccarat), crash, plinko, video poker, and our exclusive Moonbet Originals with near-zero house edge.",
    },
    {
      question: "Is there geographic targeting?",
      answer:
        "Moonbet is VPN-friendly and accessible in places where casino games are allowed. However, you should comply with local advertising laws in your jurisdiction.",
    },
    {
      question: "How do I track my performance?",
      answer:
        "Access real-time analytics in your affiliate dashboard showing clicks, conversions, player activity, and earnings, all verifiable on-chain.",
    },
    {
      question: "What support is available?",
      answer:
        "24/7 support via live chat, dedicated Discord channel for affiliates, and assigned affiliate managers for high-volume partners.",
    },
    {
      question: "Are there any costs to join?",
      answer:
        "Absolutely none. No signup fees, no monthly charges, no hidden costs. You only pay standard blockchain network fees when withdrawing commissions.",
    },
    {
      question: "How does blockchain verification work?",
      answer:
        "Every referral, bet, and commission is recorded on the Solana blockchain. You can independently verify all transactions and earnings, with complete transparency.",
    },
  ];

  // Commission tiers data
  const commissionTiers = [
    { range: "$0 - $10,000", rate: "X%", bonus: "None" },
    { range: "$10,001 - $25,000", rate: "X+5%", bonus: "Performance bonus" },
    { range: "$25,001 - $50,000", rate: "X+10%", bonus: "Priority support" },
    { range: "$50,000+", rate: "Custom Rate", bonus: "Dedicated manager" },
  ];

  return (
    <div className="min-h-screen  ">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F07730]/10 via-transparent to-[#EFD28E]/10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container max-w-7xl mx-auto relative z-10"
        >
          <div className="text-center mb-12">
            <p
              className="text-5xl md:text-2xl font-bold mb-6 "
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Moonbet Affiliate Program
            </p>
            <p
              className="text-2xl md:text-3xl text-gray-300 mb-8"
              style={{ fontFamily: "Avenir, -apple-system, sans-serif" }}
            >
              Start earning at X% and never stop growing
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-10">
              Join the first truly decentralized crypto casino affiliate program
              where transparency meets profitability. Built on Solana's
              lightning-fast blockchain with millions of provably fair
              transactions.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#F07730] to-[#EFD28E] 
                       text-black font-bold text-lg rounded-xl hover:shadow-lg 
                       hover:shadow-[#F07730]/25 transition-all duration-200"
              style={{ fontFamily: "Avenir, -apple-system, sans-serif" }}
            >
              Join Now
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Simple Steps Section */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl md:text-2xl font-bold text-center mb-16 text-white"
          >
            We make it simple to start earning
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "1",
                title: "Instant Sign-Up",
                description:
                  "Get your unique referral link in seconds. No lengthy applications or approval delays, just connect your wallet and start promoting immediately.",
                icon: <Wallet className="w-8 h-8" />,
              },
              {
                number: "2",
                title: "Real-Time Tracking",
                description:
                  "Monitor your earnings, clicks, and conversions in real-time on our transparent dashboard. Every transaction is verifiable on the Solana blockchain.",
                icon: <BarChart className="w-8 h-8" />,
              },
              {
                number: "3",
                title: "Lifetime Revenue",
                description:
                  "Earn lifetime commissions on all players you refer to Moonbet's provably fair games and zero-fee platform.",
                icon: <TrendingUp className="w-8 h-8" />,
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="wallet-btn3 p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 bg-gradient-to-r from-[#F07730] to-[#EFD28E] 
                                  rounded-xl flex items-center justify-center text-black font-bold text-xl"
                    >
                      {step.number}
                    </div>
                    <div className="text-[#F07730]">{step.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <p
              className="text-3xl md:text-2xl font-bold mb-6 text-white"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Promote the Earth's leading decentralized casino
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Attract high-value crypto natives through our unique offering:
              provably fair games, near-zero house edge, instant withdrawals,
              and VPN-friendly access. Focus on one audience or activate players
              across multiple channels.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "PROVABLY FAIR GAMING",
                description:
                  'Every outcome verifiable onchain, no "trust us" blackboxes. Players can independently verify every game result.',
                icon: <Shield className="w-6 h-6" />,
              },
              {
                title: "ZERO WITHDRAWAL FEES",
                description:
                  "Unlike traditional casinos that skim fees, Moonbet players keep 100% of their winnings. More satisfied players = higher lifetime value.",
                icon: <DollarSign className="w-6 h-6" />,
              },
              {
                title: "INSTANT SOLANA SPEED",
                description:
                  "60-second withdrawals and instant deposits create an unmatched user experience that converts browsers into players.",
                icon: <Zap className="w-6 h-6" />,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="wallet-btn3 p-6"
              >
                <div
                  className="w-12 h-12 bg-[#F07730]/20 rounded-xl flex items-center 
                              justify-center text-[#F07730] mb-4"
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Structure */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <p
              className="text-3xl md:text-2xl font-bold mb-6 text-white"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Commission Structure
            </p>
            <h3 className="text-xl text-gray-300 mb-8">Revenue Share Model</h3>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              { label: "Tier 1", value: "X% commission on net gaming revenue" },
              {
                label: "Tier 2",
                value: "Higher percentage for top-performing affiliates",
              },
              {
                label: "No Negative Carryover",
                value: "Player wins don't affect your earnings",
              },
              {
                label: "Lifetime Commissions",
                value: "Earn as long as your referrals remain active",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <CheckCircle className="w-6 h-6 text-[#F07730] flex-shrink-0 mt-1" />
                <div>
                  <span className="font-bold text-white">{item.label}:</span>
                  <span className="text-gray-400 ml-2">{item.value}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Commission Tiers Table */}
          <div className="wallet-btn3 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#F07730]/20">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-bold">
                    Monthly Revenue Generated
                  </th>
                  <th className="px-6 py-4 text-center text-white font-bold">
                    Commission Rate
                  </th>
                  <th className="px-6 py-4 text-right text-white font-bold">
                    Additional Bonuses
                  </th>
                </tr>
              </thead>
              <tbody>
                {commissionTiers.map((tier, index) => (
                  <tr
                    key={index}
                    className="border-t border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-gray-300">{tier.range}</td>
                    <td className="px-6 py-4 text-center text-[#F07730] font-bold">
                      {tier.rate}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-400">
                      {tier.bonus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-500 text-center mt-4 italic">
            Top performers may qualify for enhanced commission structures and
            exclusive partnership opportunities.
          </p>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl md:text-2xl font-bold text-center mb-12 text-white"
            style={{ fontFamily: "Neuropolitical, sans-serif" }}
          >
            Why Partner with Moonbet?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "1",
                title: "Trusted by Crypto Natives",
                description:
                  "Built by actual crypto whales who understand what players want: transparency, fairness, and respect for digital assets.",
              },
              {
                number: "2",
                title: "Proven Performance",
                points: [
                  "Near-zero house edge games = more player wins = higher satisfaction",
                  "Provably fair system = increased player trust and retention",
                  "Zero fees = better value proposition than any competitor",
                ],
              },
              {
                number: "3",
                title: "Increase Your Reputation",
                description:
                  "Promote a casino platform that actually respects players instead of exploiting them. Your audience will thank you.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="wallet-btn3 p-6"
              >
                <div
                  className="w-12 h-12 bg-gradient-to-r from-[#F07730] to-[#EFD28E] 
                              rounded-xl flex items-center justify-center text-black 
                              font-bold text-xl mb-4"
                >
                  {item.number}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-gray-400">{item.description}</p>
                )}
                {item.points && (
                  <ul className="space-y-2">
                    {item.points.map((point, idx) => (
                      <li
                        key={idx}
                        className="text-gray-400 text-sm flex items-start gap-2"
                      >
                        <span className="text-[#F07730] mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Resources */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl md:text-2xl font-bold text-center mb-12 text-white"
            style={{ fontFamily: "Neuropolitical, sans-serif" }}
          >
            Affiliate Tools & Resources
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="wallet-btn3 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <BarChart className="w-8 h-8 text-[#F07730]" />
                <h3 className="text-2xl font-bold text-white">
                  Tracking & Analytics
                </h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Real-time conversion tracking",
                  "Player lifetime value analytics",
                  "A/B testing tools for campaign optimization",
                  "Detailed geographic and demographic breakdowns",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#F07730] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="wallet-btn3 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Headphones className="w-8 h-8 text-[#F07730]" />
                <h3 className="text-2xl font-bold text-white">
                  Support & Optimization
                </h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Dedicated affiliate manager for strategic guidance",
                  "Weekly performance reviews and optimization suggestions",
                  "Access to exclusive promotions for your audience",
                  "Priority support via Discord, Telegram, and email",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#F07730] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl md:text-2xl font-bold text-center mb-12 text-white"
            style={{ fontFamily: "Neuropolitical, sans-serif" }}
          >
            Getting Started
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Eligibility */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">
                Eligibility Requirements
              </h3>
              <ul className="space-y-3">
                {[
                  "Must be 18+ years old",
                  "Cannot promote in restricted jurisdictions where crypto gambling is illegal",
                  "Must comply with advertising standards and regulations",
                  "Should have existing audience interested in crypto/gaming",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-[#F07730] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Application Process */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">
                Application Process
              </h3>
              <div className="space-y-4">
                {[
                  {
                    step: "1",
                    title: "Connect Wallet",
                    desc: "Link your preferred crypto wallet (Phantom, MetaMask, etc.)",
                  },
                  {
                    step: "2",
                    title: "Get Your Link",
                    desc: "Receive a unique tracking URL immediately",
                  },
                  {
                    step: "3",
                    title: "Start Promoting",
                    desc: "Begin earning commissions on first referred player",
                  },
                  {
                    step: "4",
                    title: "Track & Optimize",
                    desc: "Monitor performance in real-time dashboard",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div
                      className="w-8 h-8 bg-gradient-to-r from-[#F07730] to-[#EFD28E] 
                                  rounded-lg flex items-center justify-center text-black 
                                  font-bold flex-shrink-0"
                    >
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{item.title}:</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="mt-12 wallet-btn3 p-8">
            <h3 className="text-xl font-bold text-white mb-6">Payment Terms</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: "Frequency",
                  value: "Monthly payouts on the 1st of each month",
                },
                { label: "Minimum", value: "No minimum payout threshold" },
                {
                  label: "Methods",
                  value:
                    "Direct to your connected crypto wallet (BTC, ETH, SOL, USDT)",
                },
                {
                  label: "Currency",
                  value: "Commissions paid in cryptocurrency of your choice",
                },
              ].map((item, index) => (
                <div key={index}>
                  <h4 className="font-bold text-[#F07730] mb-2">
                    {item.label}:
                  </h4>
                  <p className="text-gray-400 text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl md:text-2xl font-bold text-center mb-12 text-white"
            style={{ fontFamily: "Neuropolitical, sans-serif" }}
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="wallet-btn3 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left 
                           hover:bg-white/5 relative rounded-lg p-[1px]
        bg-[linear-gradient(106deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.10)_35%,rgba(255,255,255,0.05)_70%,rgba(255,255,255,0)_100%)]
        transition-all duration-300"
                >
                  <span className="text-base md:text-lg font-[400] text-[#CED5E3] pr-4">
                    {faq.question}
                  </span>
                  {openFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-[#F07730]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 border-t border-white/10">
        <div className="container max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <p
              className="text-2xl md:text-2xl font-bold mb-6 text-white"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Shall We?
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of affiliates earning with the most transparent,
              fair, and profitable crypto casino affiliate program.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#F07730] to-[#EFD28E] 
                       text-black font-bold text-lg rounded-xl hover:shadow-lg 
                       hover:shadow-[#F07730]/25 transition-all duration-200 mb-12"
              style={{ fontFamily: "Avenir, -apple-system, sans-serif" }}
            >
              Connect Wallet & Start Earning
            </motion.button>

            <div className="border-t border-white/10 pt-8">
              <p className="text-gray-400 mb-6">
                Contact our affiliate team with any questions:
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="mailto:affiliates@moonbet.com"
                  className="flex items-center gap-2 text-gray-300 hover:text-[#F07730] transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  affiliates@moonbet.com
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-gray-300 hover:text-[#F07730] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  MoonbetAffiliates
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-gray-300 hover:text-[#F07730] transition-colors"
                >
                  <Headphones className="w-5 h-5" />
                  24/7 Live Chat
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AffiliateLandingPage;
