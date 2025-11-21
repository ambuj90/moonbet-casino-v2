// src/pages/AboutUs.jsx
import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#0C0D15] relative overflow-hidden">
      {/* Soft Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-72 h-72 bg-[#4c5fff]/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-[#f07730]/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 max-w-6xl">
        {/* ======================= HERO ======================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            About Moonbet
          </h1>
          <p className="text-gray-400 text-lg mt-3 font-light">
            The Future of Fair Casino Gaming
          </p>
        </motion.div>

        {/* ======================= INTRO CARD ======================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-14 bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 
          p-8 shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">
            What is Moonbet
          </h2>
          <p className="text-gray-400 text-[15px] leading-relaxed">
            Moonbet is a platform built on transparency, fairness, and real
            payouts. Moonbet is built for players who want clean odds and no
            hidden traps.
          </p>
        </motion.div>

        {/* ======================= WHY & MISSION ======================= */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] rounded-2xl p-8 border border-white/10 hover:bg-white/[0.05] transition-all"
          >
            <h3 className="text-xl text-white font-semibold mb-3">
              Why Moonbet Exists
            </h3>
            <p className="text-gray-400 text-[15px] leading-relaxed">
              The founder, known as DJ, has spent years building products and
              communities. He has seen slow withdrawals, unclear terms, fake
              wins, and operators who treat players like targets. Moonbet is his
              answer. A casino where the system is simple and the treatment is
              honest.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] rounded-2xl p-8 border border-white/10 hover:bg-white/[0.05] transition-all"
          >
            <h3 className="text-xl text-white font-semibold mb-3">
              The Mission
            </h3>
            <p className="text-gray-400 text-[15px] leading-relaxed">
              Give every player a safe place to gamble with clear rules, fast
              payouts, and fair odds. Build games that respect the player. Make
              transparency the standard.
            </p>
          </motion.div>
        </div>

        {/* ======================= STORY ======================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-white/[0.03] backdrop-blur-xl rounded-2xl p-10 border border-white/10"
        >
          <h2 className="text-2xl text-white font-semibold mb-4">The Story</h2>
          <p className="text-gray-300 text-[15px] leading-relaxed mb-3">
            Moonbet started when DJ realized the gap between what casinos
            promise and what they deliver. Players wanted fast payouts, easy
            support and wanted real games with verifiable odds. Most casinos
            aren’t even probably fair in this day and age.
          </p>
          <p className="text-[#F07730] font-semibold text-[16px]">
            Most casinos ignored this.
          </p>
          <p className="text-[#F07730] font-semibold text-[16px]">
            So Moonbet.games launched to do the job correctly.
          </p>
        </motion.div>
        {/* ======================= The vision ======================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-white/[0.03] backdrop-blur-xl rounded-2xl p-10 border border-white/10"
        >
          <h2 className="text-2xl text-white font-semibold mb-4">The vision</h2>
          <p className="text-gray-300 text-[15px] leading-relaxed mb-3">
            Create the most trusted crypto casino with games that are provably
            fair, payouts that move fast, and support that answers without
            delay(And Robotic AI). A world where players know the odds and feel
            respected. A platform that keeps evolving, with original games and
            high transparency.
          </p>
        </motion.div>

        {/* ======================= STAND FOR / AGAINST ======================= */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Stand For */}
          <motion.div
            initial={{ opacity: 0, rotate: -1 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] rounded-2xl p-8 border border-white/10"
          >
            <h3 className="text-xl text-green-300 font-semibold mb-5">
              What Moonbet Stands For
            </h3>
            <ul className="space-y-2 text-gray-300 text-[15px]">
              {[
                "Real play. No fake balances.",
                "Clear terms. No tricks.",
                "Fast withdrawals.",
                "Fair odds with real math.",
                "Strong support.",
                "No hidden rules in promos.",
                "No manipulative design.",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-green-400">✓</span> {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Against */}
          <motion.div
            initial={{ opacity: 0, rotate: 1 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] rounded-2xl p-8 border border-white/10"
          >
            <h3 className="text-xl text-red-300 font-semibold mb-5">
              What Moonbet is Against
            </h3>
            <ul className="space-y-2 text-gray-300 text-[15px]">
              {[
                "Locked withdrawals.",
                "Unrealistic wagering.",
                "Fake casino wins.",
                "Dark UI manipulation.",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-red-400">✗</span> {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ======================= FUTURE DIRECTION ======================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-white/[0.03] rounded-2xl border border-white/10 p-10"
        >
          <h2 className="text-2xl text-white font-semibold mb-6">
            What players can expect
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Smooth UI.",
              "Real odds.",
              "Verifiable fairness.",
              "Instant rewards without hoops.",
              "Safe environment.",
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-[#F07730] text-lg">→</span>
                <span className="text-gray-300 text-[15px]">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
        {/* ======================= What Moonbet is against ======================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-white/[0.03] rounded-2xl border border-white/10 p-10"
        >
          <h2 className="text-2xl text-white font-semibold mb-6">
            What Moonbet is against
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Delayed withdrawals.",
              "Locked funds.",
              "Fake wins.",
              "Predatory bonus traps.",
              "Overcomplicated reward systems built to confuse players.",
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-[#F07730] text-lg">→</span>
                <span className="text-gray-300 text-[15px]">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-14 bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 
          p-8 shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">
            Moonbet refuses the industry shortcuts that treat users as numbers.
          </h2>
          <h3>Who runs Moonbet</h3>
          <p className="text-gray-400 text-[15px] leading-relaxed">
            Moonbet is led by DJ, a builder who has worked across crypto,
            gaming, marketing, and finance. He has built and scaled digital
            brands for years.
          </p>
          <p className="text-gray-400 text-[15px] leading-relaxed">
            His social presence shows his thinking and direction:
          </p>
          <div>x.com/thisisdjen.</div>
          <p>
            The team behind Moonbet includes developers, designers, analysts,
            and support members who work daily to keep the platform fast,
            stable, and fair.
          </p>
          <h3>How Moonbet is built</h3>
          <ul>
            <li>Strong RNG systems.</li>
            <li>Provably fair verification.</li>
            <li>High system uptime.</li>
            <li>Secure wallets and processing.</li>
            <li>Constant testing before releases</li>
          </ul>
          <h3>The commitment</h3>
          <ul>
            <li>Moonbet focuses on real users and honest treatment.</li>
            <li> No gimmicks.</li>
            <li>No hidden traps.</li>
            <li>No noise.</li>
            <li>Only clean gambling with fast payouts and fair odds.</li>
          </ul>
          <h3>The direction Moonbet wants to build:</h3>
          <ul>
            <li>More original house games that are PVP without House Edge</li>
            <li> Lower house edge formats</li>
            <li>Stronger verification systems</li>
            <li>A trusted player community</li>
            <li>Clean retention systems that do not manipulate behavior</li>
          </ul>
        </motion.div>

        {/* ======================= SOCIAL LINKS ======================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 bg-white/[0.03] border border-white/10 backdrop-blur-xl p-10 rounded-3xl text-center"
        >
          <h2 className="text-2xl text-white font-semibold mb-4">Socials</h2>
          <p className="text-gray-400 text-[15px] mb-6">
            Players follow the development and updates on:
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://x.com/moonbetgames"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F07730] hover:text-[#f18a46] transition-colors text-[15px]"
            >
              x.com/moonbetgames
            </a>

            <a
              href="https://trustpilot.com/review/moonbet.games"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F07730] hover:text-[#f18a46] transition-colors text-[15px]"
            >
              trustpilot.com/review/moonbet.games
            </a>

            <a
              href="https://instagram.com/moonbet.games"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F07730] hover:text-[#f18a46] transition-colors text-[15px]"
            >
              instagram.com/moonbet.games
            </a>

            <a
              href="https://linkedin.com/company/moonbetgames"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F07730] hover:text-[#f18a46] transition-colors text-[15px]"
            >
              linkedin.com/company/moonbetgames
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
