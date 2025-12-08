// src/components/Footer.jsx

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TrustBadgesFinal from "../sections/TrustBadges";

const Footer = () => {
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

  const footerLinks = {
    aboutUs: [
      { label: "About", path: "/about" },
      { label: "Affiliate", path: "/affiliate-program" },
      { label: "Privacy Policy", path: "/privacy" },
      { label: "Terms & Conditions", path: "/terms-and-condition" },
      { label: "Disclaimer", path: "/disclaimer" },
      { label: "Cookie Policy", path: "/cookie-policy" },
      { label: "AML Policy", path: "/aml-policy" },
    ],
    support: [
      { label: "Careers", path: "/careers" },
      { label: "Live Support", path: "/live-support" },
      { label: "Gaming Helpline", path: "/gaming-helpline" },
      { label: "Account Payouts Policy", path: "/account-payout-policy" },
      { label: "Modern Slavery", path: "/modern-slavery" },
      {
        label: "Dispute Resolution Policy",
        path: "/dispute-resolution-policy",
      },
      {
        label: "Self Exclusion Policy",
        path: "/self-exclusion-policy",
      },
    ],
    moonbet: [
      { label: "Betting Rules", path: "/betting-rules" },
      { label: "Provably Fair", path: "/provably-fair" },
      { label: "Responsible Gambling", path: "/responsible-gambling" },
      { label: "RNG", path: "/rng" },
      {
        label: "Moonbet Complaints Policy",
        path: "/moonbet-complaints-policy",
      },
      {
        label: "Moonbet Accessibility",
        path: "/moonbet-accessibility-statement",
      },
      {
        label: "Editorial Policy",
        path: "/editorial-policy",
      },
    ],
  };

  const communityLinks = [
    {
      label: "Twitter",
      href: "https://x.com/moonbetgames",
    },
    {
      label: "Telegram",
      href: "https://www.telegram.com/moonbet.games/",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/moonbet.games/",
    },
  ];

  return (
    <footer className="customborder-footer relative w-full overflow-hidden">
      <motion.div
        className="relative z-10 py-6 md:py-2 flex flex-col"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-[1366px] mx-auto px-4 sm:px-10 w-full flex flex-col h-full pt-6">
          {/* Top row: logo + back to top */}
          <div className="flex items-center justify-center md:justify-between w-full relative py-6 md:py-2">
            <img
              src="/logo/logo.svg"
              alt="MoonBet Logo"
              className="w-40 sm:w-48 md:w-52 lg:w-56 object-contain"
            />

            <motion.button
              className="flex items-center gap-2 text-xs sm:text-sm md:text-base font-medium transition-all duration-300 absolute right-0 md:right-10 sm:static"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span className="hidden sm:inline">Back to top</span>
              <motion.span className="p-1 flex items-center justify-center">
                {/* same arrow button svg as before */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="39"
                  height="40"
                  viewBox="0 0 39 40"
                  fill="none"
                >
                  <foreignObject x="-3" y="-3" width="43" height="43">
                    <div
                      xmlns="http://www.w3.org/1999/xhtml"
                      style={{
                        backdropFilter: "blur(1.5px)",
                        clipPath: "url(#bgblur_0_9018_6149_clip_path)",
                        height: "100%",
                        width: "100%",
                      }}
                    />
                  </foreignObject>
                  <g
                    filter="url(#filter0_d_9018_6149)"
                    data-figma-bg-blur-radius="3"
                  >
                    <rect
                      width="35"
                      height="35"
                      rx="8"
                      transform="matrix(-1 0 0 1 36 1)"
                      fill="url(#paint0_linear_9018_6149)"
                      fillOpacity="0.15"
                      shapeRendering="crispEdges"
                    />
                    <rect
                      width="35"
                      height="35"
                      rx="8"
                      transform="matrix(-1 0 0 1 36 1)"
                      stroke="url(#paint1_linear_9018_6149)"
                      strokeWidth="2"
                      shapeRendering="crispEdges"
                    />
                  </g>
                  <path
                    d="M18 26C18 26.5523 18.4477 27 19 27C19.5523 27 20 26.5523 20 26L19 26L18 26ZM19.7071 11.2929C19.3166 10.9024 18.6834 10.9024 18.2929 11.2929L11.9289 17.6568C11.5384 18.0474 11.5384 18.6805 11.9289 19.0711C12.3195 19.4616 12.9526 19.4616 13.3432 19.0711L19 13.4142L24.6569 19.0711C25.0474 19.4616 25.6805 19.4616 26.0711 19.0711C26.4616 18.6805 26.4616 18.0474 26.0711 17.6569L19.7071 11.2929ZM19 26L20 26L20 12L19 12L18 12L18 26L19 26Z"
                    fill="#E1E1E1"
                    fillOpacity="0.5"
                  />
                  <defs>
                    <filter
                      id="filter0_d_9018_6149"
                      x="-3"
                      y="-3"
                      width="43"
                      height="43"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dx="1" dy="2" />
                      <feGaussianBlur stdDeviation="0.5" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_9018_6149"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_9018_6149"
                        result="shape"
                      />
                    </filter>
                    <clipPath
                      id="bgblur_0_9018_6149_clip_path"
                      transform="translate(3 3)"
                    >
                      <rect
                        width="35"
                        height="35"
                        rx="8"
                        transform="matrix(-1 0 0 1 36 1)"
                      />
                    </clipPath>
                    <linearGradient
                      id="paint0_linear_9018_6149"
                      x1="17.5"
                      y1="0"
                      x2="17.5"
                      y2="35"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#4B4B4B" stopOpacity="0.2" />
                      <stop offset="1" stopColor="#4B4B4B" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_9018_6149"
                      x1="2.45192"
                      y1="-7.76018e-06"
                      x2="19.1272"
                      y2="38.3892"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" stopOpacity="0.4" />
                      <stop
                        offset="0.405687"
                        stopColor="white"
                        stopOpacity="0.01"
                      />
                      <stop
                        offset="0.574372"
                        stopColor="white"
                        stopOpacity="0.01"
                      />
                      <stop offset="1" stopColor="white" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.span>
            </motion.button>
          </div>

          {/* main layout: four link columns + trust badges column */}
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_1.5fr] gap-8 md:gap-12 pt-2">
            {/* link columns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 lg:pt-[10px]">
              {/* About Us */}
              <motion.div
                className="flex flex-col gap-3 md:gap-3 text-left"
                variants={itemVariants}
              >
                <p className="text-sm sm:text-base font-semibold text-white mb-1 md:mb-2 bg-clip-text text-transparent uppercase text-[rgba(225,225,225,0.50)]">
                  About Us
                </p>
                <ul className="flex flex-col gap-2 md:gap-3">
                  {footerLinks.aboutUs.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.path}
                        className="text-xs sm:text-sm text-white/70 hover:text-[#e1e1e1] transition-all duration-300 inline-block hover:translate-x-1"
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
                  {footerLinks.support.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.path}
                        className="text-xs sm:text-sm text-white/70 hover:text-[#e1e1e1] transition-all duration-300 inline-block hover:translate-x-1"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Moonbet */}
              <motion.div
                className="flex flex-col gap-3 md:gap-3 text-left"
                variants={itemVariants}
              >
                <p className="text-sm sm:text-base font-semibold text-white mb-1 md:mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent uppercase text-[#E2E2E2]">
                  Moonbet
                </p>
                <ul className="flex flex-col gap-2 md:gap-3 mt-1">
                  {footerLinks.moonbet.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.path}
                        className="text-xs sm:text-sm text-white/70 hover:text-[#e1e1e1] transition-all duration-300 inline-block hover:translate-x-1"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact + Community */}
              <motion.div
                className="flex flex-col gap-4 text-left"
                variants={itemVariants}
              >
                <div>
                  <p className="text-sm sm:text-base font-semibold text-white mb-1 md:mb-2 bg-clip-text text-transparent uppercase text-[rgba(225,225,225,0.50)]">
                    Contact Us
                  </p>
                  <ul className="flex flex-col gap-2 md:gap-3">
                    <li>
                      <a
                        href="mailto:support@moonbet.games"
                        className="text-xs sm:text-sm text-white/80 hover:text-[#9292D2] transition-colors duration-300"
                      >
                        support@moonbet.games
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:feedback@moonbet.games"
                        className="text-xs sm:text-sm text-white/80 hover:text-[#9292D2] transition-colors duration-300"
                      >
                        feedback@moonbet.games
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-sm sm:text-base font-semibold text-white mb-1 md:mb-2 bg-clip-text text-transparent uppercase text-[rgba(225,225,225,0.50)]">
                    Community
                  </p>
                  <ul className="flex flex-col gap-2 md:gap-3">
                    {communityLinks.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs sm:text-sm text-white/70 hover:text-[#e1e1e1] transition-all duration-300 inline-block hover:translate-x-1"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* trust badges column (5th) */}
            <motion.div
              className="max-w-xs w-full lg:ml-auto"
              variants={itemVariants}
            >
              <TrustBadgesFinal layout="column" />
            </motion.div>
          </div>

          <div className="mt-6 text-xs sm:text-sm text-white/60 text-center">
            © MoonBet {new Date().getFullYear()}
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
