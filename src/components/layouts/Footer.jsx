// =====================================
// FILE: src/components/Footer.jsx
// MoonBet Casino Footer - Fully Responsive Version
// =====================================
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BegambleawareIcon, ContactIcon } from "../ui-elements/svg-img";
import CryptoPaymentSection from "../sections/CryptoPaymentSection";
import TrustBadgesFinal from "../sections/TrustBadges";
import TruestedSection from "../sections/TrustedSection";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const glowVariants = {
    initial: { boxShadow: "0 0 0px rgba(255, 107, 0, 0)" },
    hover: {
      boxShadow: "0 0 20px rgba(255, 107, 0, 0.6)",
      transition: { duration: 0.3 },
    },
  };

  // Social icons
  const socialIcons = [
    {
      name: "Reddit",
      url: "https://www.reddit.com/r/Official_Moonbet/",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/moonbet.games/",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      url: "https://x.com/moonbetgames",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/moonbetgames/",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  const footerLinks = {
    aboutUs: [
      { label: "About", path: "/about" },
      { label: "Affiliate", path: "/affiliate-program" },
      { label: "Privacy Policy", path: "/privacy" },
      { label: "Terms & Conditions", path: "/terms-and-condition" },
      { label: "Contact Us", path: "/contact" },
      {
        label: "Disclaimer",
        path: "/disclaimer",
      },
      {
        label: "Cookie Policy",
        path: "/cookie-policy",
      },
      {
        label: "Aml Policy",
        path: "/aml-policy",
      },
    ],
    support: [
      { label: "Gaming Helpline", path: "/gaming-helpline" },
      { label: "Live Support", path: "/live-support" },
      { label: "Careers", path: "/careers" },
      { label: "Account Payouts Policy", path: "/account-payout-policy" },

      { label: "ModernSlavery", path: "/modern-slavery" },
      {
        label: "Dispute Resolution Policy",
        path: "/dispute-resolution-policy",
      },
      {
        label: "Self Exclusion Policy",
        path: "/self-exclusion-policy",
      },
      {
        label: "Editorial Policy",
        path: "/editorial-policy",
      },
    ],
    moonbet: [
      { label: "Betting Rules", path: "/betting-rules" },
      { label: "Provably Fair", path: "/provably-fair" },
      { label: "Responsible Gambling", path: "/responsible-gambling" },
      { label: "RNG", path: "/rng" },
      { label: "KYC Policy", path: "/kyc-Policy" },
      {
        label: "Moonbet Complaints Policy",
        path: "/moonbet-complaints-policy",
      },

      {
        label: "Moonbet Accessibility",
        path: "/moonbet-accessibility-statement",
      },
    ],
  };

  return (
    <>
      <footer
        className="customborder-footer relative w-full bg-[#080808] overflow-hidden"
        style={{
          paddingTop: "clamp(30px, 8vw, 100px)",
        }}
      >
        <TruestedSection />
        {/* Footer Content */}
        <motion.div
          className="relative z-10 py-6 md:py-8 flex flex-col"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="max-w-[1366px] mx-auto px-4 sm:px-10 w-full flex flex-col h-full pt-6">
            {/* ================= TOP LOGO ROW ================= */}
            <div className="flex items-center justify-center md:justify-between w-full mb-6">
              {/* Logo */}
              <img
                src="/icons/logo.svg"
                alt="MoonBet Logo"
                className="w-40 sm:w-48 md:w-52 lg:w-56 object-contain"
              />

              {/* Back to top button */}
              <motion.button
                className="flex items-center gap-2 text-white/90 text-xs sm:text-sm md:text-base font-medium hover:text-orange-400 transition-all duration-300 
                    absolute right-10 sm:static"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <span className="hidden sm:inline">Back to top</span>
                <motion.span
                  className="p-1 flex items-center justify-center rounded-md bg-white/10 border border-white/20"
                  whileHover={{ boxShadow: "0 0 12px rgba(255, 107, 0, 0.5)" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 25 25"
                    fill="none"
                  >
                    <path
                      d="M13.7071 1.29289C13.3166 0.902369 12.6834 0.902369 12.2929 1.29289L5.92893 7.65685C5.53841 8.04738 5.53841 8.68054 5.92893 9.07107C6.31946 9.46159 6.95262 9.46159 7.34315 9.07107L13 3.41421L18.6569 9.07107C19.0474 9.46159 19.6805 9.46159 20.0711 9.07107C20.4616 8.68054 20.4616 8.04738 20.0711 7.65685L13.7071 1.29289ZM13 24L14 24L14 2L13 2L12 2L12 24L13 24Z"
                      fill="white"
                    />
                  </svg>
                </motion.span>
              </motion.button>
            </div>

            {/* ================= MAIN CONTENT GRID ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2fr] gap-8 md:gap-12 pt-2">
              {/* Left: Description, Email, Social Links */}
              <motion.div
                className="flex flex-col justify-start lg:pr-10 text-center lg:text-left items-center lg:items-start space-y-6 md:space-y-6"
                variants={itemVariants}
              >
                {/* Description */}
                <p className="text-xs sm:text-sm leading-relaxed text-white/70 max-w-[320px] lg:pt-[20px]">
                  Moonbet operates as a decentralized crypto casino on the
                  Solana blockchain. Built by crypto natives for players 18+.
                </p>

                {/* Email */}
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-orange-500 transition-all duration-300 hover:text-white hover:shadow-[0_0_15px_rgba(255,107,0,0.5)]">
                    ✉
                  </span>

                  <a
                    href="mailto:support@moonbet.games"
                    className="text-xs sm:text-sm text-white/80 hover:text-orange-500 transition-colors duration-300"
                  >
                    support@moonbet.games
                  </a>
                </motion.div>

                {/* Email */}
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-orange-500 transition-all duration-300 hover:text-white hover:shadow-[0_0_15px_rgba(255,107,0,0.5)]">
                    ✉
                  </span>

                  <a
                    href="mailto:feedback@moonbet.games"
                    className="text-xs sm:text-sm text-white/80 hover:text-orange-500 transition-colors duration-300"
                  >
                    feedback@moonbet.games
                  </a>
                </motion.div>

                {/* Social Links */}
                <div className="flex gap-3 sm:gap-4 mt-3">
                  {socialIcons.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-white/70 transition-all duration-300 hover:text-white"
                      variants={glowVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.name}
                    >
                      <div className="scale-75 sm:scale-100">{social.icon}</div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Right: Footer Links (About / Support / Moonbet) */}
              <div className="grid grid-cols-2  justify-items-center sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 lg:pt-[20px]">
                {/* About Us */}
                <motion.div
                  className="flex flex-col gap-3 md:gap-3 text-left"
                  variants={itemVariants}
                >
                  <p className="text-sm sm:text-base font-semibold text-white mb-1 md:mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent uppercase text-[#E2E2E2]">
                    About Us
                  </p>
                  <ul className="flex flex-col gap-2 md:gap-3">
                    {footerLinks.aboutUs.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.path}
                          className="text-xs sm:text-sm text-white/70 hover:text-orange-500 transition-all duration-300 inline-block hover:translate-x-1"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Support */}
                <motion.div
                  className="flex flex-col gap-3 md:gap-3 text-left"
                  variants={itemVariants}
                >
                  <p className="text-sm sm:text-base font-semibold text-white mb-1 md:mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent uppercase text-[#E2E2E2]">
                    Support
                  </p>
                  <ul className="flex flex-col gap-2 md:gap-3">
                    {footerLinks.support.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.path}
                          className="text-xs sm:text-sm text-white/70 hover:text-orange-500 transition-all duration-300 inline-block hover:translate-x-1"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Moonbet */}
                <motion.div
                  className="hidden md:block  flex-col gap-3 md:gap-3 text-left"
                  variants={itemVariants}
                >
                  <p className="text-sm sm:text-base font-semibold text-white mb-1 md:mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent uppercase text-[#E2E2E2]">
                    Moonbet
                  </p>
                  <ul className="flex flex-col gap-2 md:gap-3 mt-5">
                    {footerLinks.moonbet.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.path}
                          className="text-xs sm:text-sm text-white/70 hover:text-orange-500 transition-all duration-300 inline-block hover:translate-x-1"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
            <CryptoPaymentSection />
            <TrustBadgesFinal />
            <div className="text-xs sm:text-sm text-white/60 text-center">
              © MoonBet {new Date().getFullYear()}
            </div>
          </div>
        </motion.div>
      </footer>
    </>
  );
};

export default Footer;
