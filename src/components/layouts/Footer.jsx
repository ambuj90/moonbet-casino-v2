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
        label: "AML Policy",
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
        className="customborder-footer relative w-full overflow-hidden"
        style={{
          paddingTop: "clamp(30px, 4vw, 100px)",
        }}
      >
        <CryptoPaymentSection />
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
            <div className="flex items-center justify-center md:justify-between w-full relative">
              {/* Logo */}
              <img
                src="/logo/logo.svg"
                alt="MoonBet Logo"
                className="w-40 sm:w-48 md:w-52 lg:w-56 object-contain"
              />

              {/* Back to top button */}
              <motion.button
                className="flex items-center gap-2 text-xs sm:text-sm md:text-base font-medium  transition-all duration-300 absolute right-10 sm:static"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <span className="hidden sm:inline">Back to top</span>
                <motion.span className="p-1 flex items-center justify-center">
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
                      ></div>
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
                  <span className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#282753] backdrop-blur-sm border border-white/10 text-[#9292D2] transition-all duration-300 hover:text-white hover:shadow-[0_0_15px_rgba(240,119,48,0.5)]">
                    ✉
                  </span>

                  <a
                    href="mailto:support@moonbet.games"
                    className="text-xs sm:text-sm text-white/80 hover:text-[#9292D2] transition-colors duration-300"
                  >
                    support@moonbet.games
                  </a>
                </motion.div>

                {/* Email */}
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#282753] backdrop-blur-sm border border-white/10 text-[#9292D2] transition-all duration-300 hover:text-white hover:shadow-[0_0_15px_rgba(240,119,48,0.5)]">
                    ✉
                  </span>

                  <a
                    href="mailto:feedback@moonbet.games"
                    className="text-xs sm:text-sm text-white/80 hover:text-[#9292D2] transition-colors duration-300"
                  >
                    feedback@moonbet.games
                  </a>
                </motion.div>

                {/* Social Links */}
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2  py-3 transition-all duration-200"
                    onClick={() =>
                      window.open("https://x.com/moonbetgames", "_blank")
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                    >
                      <rect
                        x="1"
                        y="1"
                        width="34"
                        height="34"
                        rx="12"
                        fill="#282753"
                      />
                      <rect
                        x="1"
                        y="1"
                        width="34"
                        height="34"
                        rx="12"
                        stroke="url(#paint0_linear_9185_1053)"
                        stroke-width="2"
                      />
                      <path
                        d="M26.9543 14.2921C26.9121 13.3357 26.7574 12.6781 26.5358 12.1084C26.3072 11.5036 25.9555 10.9621 25.4947 10.512C25.0445 10.0549 24.4994 9.69969 23.9015 9.4747C23.3283 9.25315 22.6741 9.09848 21.7175 9.05632C20.7538 9.01058 20.4478 9 18.0035 9C15.5592 9 15.2532 9.01058 14.2931 9.05274C13.3365 9.09491 12.6788 9.24971 12.1091 9.47113C11.5041 9.69969 10.9625 10.0513 10.5123 10.512C10.0551 10.9621 9.69996 11.5072 9.47479 12.1049C9.2532 12.6781 9.0985 13.3321 9.05633 14.2885C9.01058 15.252 9 15.5579 9 18.0018C9 20.4456 9.01058 20.7515 9.05275 21.7115C9.09493 22.6679 9.24976 23.3254 9.47136 23.8952C9.69996 24.5 10.0551 25.0414 10.5123 25.4916C10.9625 25.9487 11.5076 26.3039 12.1055 26.5289C12.6788 26.7504 13.3329 26.9051 14.2896 26.9473C15.2497 26.9896 15.5558 27 18.0001 27C20.4444 27 20.7503 26.9896 21.7105 26.9473C22.6671 26.9051 23.3247 26.7504 23.8945 26.5289C25.1044 26.0612 26.061 25.1048 26.5288 23.8952C26.7502 23.322 26.9051 22.6679 26.9472 21.7115C26.9894 20.7515 27 20.4456 27 18.0018C27 15.5579 26.9964 15.252 26.9543 14.2921ZM25.333 21.6412C25.2943 22.5203 25.1466 22.995 25.0235 23.3114C24.721 24.0956 24.0985 24.718 23.3142 25.0204C22.9976 25.1435 22.5194 25.2911 21.6436 25.3297C20.694 25.3721 20.4092 25.3825 18.0071 25.3825C15.6049 25.3825 15.3166 25.3721 14.3704 25.3297C13.4912 25.2911 13.0164 25.1435 12.6998 25.0204C12.3095 24.8762 11.9543 24.6476 11.6659 24.3487C11.367 24.0569 11.1384 23.7052 10.9941 23.315C10.871 22.9985 10.7233 22.5203 10.6847 21.6448C10.6424 20.6953 10.632 20.4105 10.632 18.0088C10.632 15.6071 10.6424 15.3188 10.6847 14.373C10.7233 13.4939 10.871 13.0192 10.9941 12.7027C11.1384 12.3123 11.367 11.9573 11.6695 11.6688C11.9613 11.3699 12.313 11.1414 12.7034 10.9973C13.02 10.8742 13.4983 10.7266 14.374 10.6878C15.3236 10.6457 15.6085 10.6351 18.0105 10.6351C20.4162 10.6351 20.701 10.6457 21.6472 10.6878C22.5264 10.7266 23.0012 10.8742 23.3177 10.9973C23.708 11.1414 24.0633 11.3699 24.3517 11.6688C24.6506 11.9607 24.8792 12.3123 25.0235 12.7027C25.1466 13.0192 25.2943 13.4973 25.333 14.373C25.3752 15.3224 25.3858 15.6071 25.3858 18.0088C25.3858 20.4105 25.3752 20.6918 25.333 21.6412Z"
                        fill="#9292D2"
                      />
                      <path
                        d="M18.0035 13.3778C15.4502 13.3778 13.3787 15.4489 13.3787 18.0018C13.3787 20.5547 15.4502 22.6258 18.0035 22.6258C20.5569 22.6258 22.6284 20.5547 22.6284 18.0018C22.6284 15.4489 20.5569 13.3778 18.0035 13.3778ZM18.0035 21.0012C16.3471 21.0012 15.0035 19.658 15.0035 18.0018C15.0035 16.3455 16.3471 15.0023 18.0035 15.0023C19.6601 15.0023 21.0035 16.3455 21.0035 18.0018C21.0035 19.658 19.6601 21.0012 18.0035 21.0012Z"
                        fill="#9292D2"
                      />
                      <path
                        d="M23.891 13.195C23.891 13.7911 23.4076 14.2745 22.8112 14.2745C22.215 14.2745 21.7315 13.7911 21.7315 13.195C21.7315 12.5987 22.215 12.1155 22.8112 12.1155C23.4076 12.1155 23.891 12.5987 23.891 13.195Z"
                        fill="#9292D2"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_9185_1053"
                          x1="3.38187"
                          y1="0.999992"
                          x2="19.5807"
                          y2="38.2923"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="white" stop-opacity="0.4" />
                          <stop
                            offset="0.405687"
                            stop-color="white"
                            stop-opacity="0.01"
                          />
                          <stop
                            offset="0.574372"
                            stop-color="white"
                            stop-opacity="0.01"
                          />
                          <stop
                            offset="1"
                            stop-color="white"
                            stop-opacity="0.1"
                          />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2  py-3 transition-all duration-200"
                    onClick={() =>
                      window.open(
                        "https://www.instagram.com/moonbet.games/",
                        "_blank"
                      )
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                    >
                      <rect
                        x="1"
                        y="1"
                        width="34"
                        height="34"
                        rx="12"
                        fill="#282753"
                      />
                      <rect
                        x="1"
                        y="1"
                        width="34"
                        height="34"
                        rx="12"
                        stroke="url(#paint0_linear_9185_1056)"
                        stroke-width="2"
                      />
                      <path
                        d="M19.7124 16.6218L26.4133 9H24.8254L19.0071 15.6179L14.3599 9H9L16.0274 19.0074L9 27H10.588L16.7324 20.0113L21.6401 27H27L19.7124 16.6218ZM11.1602 10.1697H13.5992L24.8262 25.8835H22.3871L11.1602 10.1697Z"
                        fill="#9292D2"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_9185_1056"
                          x1="3.38187"
                          y1="0.999992"
                          x2="19.5807"
                          y2="38.2923"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="white" stop-opacity="0.4" />
                          <stop
                            offset="0.405687"
                            stop-color="white"
                            stop-opacity="0.01"
                          />
                          <stop
                            offset="0.574372"
                            stop-color="white"
                            stop-opacity="0.01"
                          />
                          <stop
                            offset="1"
                            stop-color="white"
                            stop-opacity="0.1"
                          />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 transition-all duration-200"
                    onClick={() =>
                      window.open(
                        "https://www.telegram.com/moonbet.games/",
                        "_blank"
                      )
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                    >
                      <rect
                        x="1"
                        y="1"
                        width="34"
                        height="34"
                        rx="12"
                        fill="#282753"
                      />
                      <rect
                        x="1"
                        y="1"
                        width="34"
                        height="34"
                        rx="12"
                        stroke="url(#paint0_linear_9185_1059)"
                        stroke-width="2"
                      />
                      <path
                        d="M16.0631 21.2041L15.7653 25.9505C16.1913 25.9505 16.3758 25.7431 16.5971 25.4941L18.5944 23.3308L22.733 26.7657C23.492 27.2451 24.0267 26.9926 24.2315 25.9743L26.9481 11.5482L26.9488 11.5473C27.1896 10.2757 26.5431 9.7785 25.8035 10.0904L9.83565 17.0188C8.74588 17.4982 8.76238 18.1867 9.6504 18.4986L13.7327 19.9376L23.2152 13.2133C23.6615 12.8784 24.0672 13.0637 23.7335 13.3986L16.0631 21.2041Z"
                        fill="#9292D2"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_9185_1059"
                          x1="3.38187"
                          y1="0.999992"
                          x2="19.5807"
                          y2="38.2923"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="white" stop-opacity="0.4" />
                          <stop
                            offset="0.405687"
                            stop-color="white"
                            stop-opacity="0.01"
                          />
                          <stop
                            offset="0.574372"
                            stop-color="white"
                            stop-opacity="0.01"
                          />
                          <stop
                            offset="1"
                            stop-color="white"
                            stop-opacity="0.1"
                          />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.button>
                </div>
              </motion.div>

              {/* Right: Footer Links (About / Support / Moonbet) */}
              <div className="grid grid-cols-2  justify-items-center sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 lg:pt-[20px]">
                {/* About Us */}
                <motion.div
                  className="flex flex-col gap-3 md:gap-3 text-left"
                  variants={itemVariants}
                >
                  <p className="text-sm sm:text-base font-semibold text-white mb-1 md:mb-2 bg-clip-text text-transparent uppercase text-[rgba(225, 225, 225, 0.50)]">
                    About Us
                  </p>
                  <ul className="flex flex-col gap-2 md:gap-3">
                    {footerLinks.aboutUs.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.path}
                          className="text-xs sm:text-sm text-white/70 hover:text-[#9292D2] transition-all duration-300 inline-block hover:translate-x-1"
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
                          className="text-xs sm:text-sm text-white/70 hover:text-[#9292D2] transition-all duration-300 inline-block hover:translate-x-1"
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
                          className="text-xs sm:text-sm text-white/70 hover:text-[#9292D2] transition-all duration-300 inline-block hover:translate-x-1"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>

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
