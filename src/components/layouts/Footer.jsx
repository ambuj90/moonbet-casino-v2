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

  return (
    <>
      <footer className="customborder-footer relative w-full overflow-hidden">
        {/* Footer Content */}
        <motion.div
          className="relative z-10 py-6 md:py-2 flex flex-col"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="max-w-[1366px] mx-auto px-4 sm:px-10 w-full flex flex-col h-full pt-6">
            {/* ================= TOP LOGO ROW ================= */}
            <div className="flex items-center justify-center md:justify-between w-full relative py-6 md:py-2">
              {/* Logo */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="201"
                height="25"
                viewBox="0 0 201 25"
                fill="none"
              >
                <g clip-path="url(#clip0_9612_6688)">
                  <path
                    d="M128.402 0C138.766 3.34674e-05 142.368 1.84315 142.369 7.00684C142.369 9.4634 141.784 11.14 140.202 12.2275C141.905 13.26 142.877 15.0473 142.877 17.3096C142.877 22.5848 139.154 24.4277 128.595 24.4277C125.384 24.4277 120.298 23.8972 117.451 23.3955C117.157 23.3405 117.011 23.1446 117.011 22.7822H117.013V1.73145C117.013 1.39651 117.158 1.20033 117.452 1.11621C120.274 0.585441 125.262 0 128.402 0ZM161.788 0C164.951 1.38594e-05 167.311 0.307458 169.185 0.726562C169.453 0.781732 169.598 0.978021 169.671 1.25781L170.207 4.07617C170.305 4.49529 170.159 4.66225 169.793 4.57812C167.337 4.0765 163.735 3.88088 161.74 3.88086C153.832 3.88086 151.033 5.66719 150.497 10.3584H169.55C169.842 10.3586 170.012 10.5548 170.012 10.8896V13.3184C170.012 13.6807 169.842 13.8485 169.55 13.8486H150.45C150.984 18.6226 153.758 20.4375 161.74 20.4375C163.735 20.4375 167.335 20.2134 169.793 19.7393C170.159 19.6276 170.305 19.8239 170.207 20.2139L169.671 23.0332C169.623 23.3403 169.477 23.5067 169.21 23.5908C167.336 24.0099 164.951 24.3457 161.788 24.3457C150.426 24.3457 146.239 20.269 146.263 12.1455C146.239 4.10433 150.426 0 161.788 0ZM92.1205 0C95.6477 9.918e-05 97.667 1.81452 99.2973 6.58984C99.4428 7.17617 100.539 10.3044 102.217 15.5244C103.433 19.2655 104.164 20.2705 105.77 20.2705C107.229 20.2704 107.886 18.9011 107.886 15.7197V0.866211C107.886 0.503792 108.032 0.335053 108.324 0.334961H111.317C111.609 0.335016 111.778 0.502224 111.778 0.866211V17.7012C111.778 21.554 109.492 24.3174 106.158 24.3174C102.629 24.3174 100.635 22.5038 99.0043 17.7012C98.859 17.1153 97.6894 13.7361 96.0844 8.79395C94.8913 5.05256 94.1372 4.0469 92.5082 4.04688C91.0485 4.04688 90.3911 5.44228 90.391 8.59766L90.4164 23.4502V23.4521C90.4164 23.8146 90.2708 23.9824 89.9535 23.9824H86.9613C86.6694 23.9824 86.5239 23.8161 86.5238 23.4521V6.58984C86.5238 2.70921 88.8118 0 92.1205 0ZM8.39688 0C10.927 5.98678e-05 12.6066 1.4807 13.725 4.71875C14.9408 8.18026 15.233 12.7329 16.1342 15.1895C16.5234 16.2781 17.0337 16.948 17.8119 16.9482H18.3959C19.1744 16.9482 19.7094 16.2784 20.1 15.1895C20.9998 12.7329 21.292 8.18179 22.4838 4.71875C23.6289 1.4807 25.3087 0 27.8148 0H28.7641C32.2192 0.000201713 34.2631 2.29011 34.6283 6.28223L36.2104 23.4814L36.2084 23.4795C36.2324 23.8144 36.1116 24.0107 35.8197 24.0107H32.8031C32.4872 24.0107 32.3151 23.8145 32.2924 23.4795L30.9535 8.12402C30.7096 5.19328 29.9552 4.01953 28.5688 4.01953H27.8637C26.8413 4.01958 26.1121 4.77391 25.5775 6.53125C24.7751 9.2401 24.4581 13.6226 23.2904 16.8057C22.3666 19.4029 20.9541 21.0215 18.6918 21.0215H17.5248C15.2866 21.0215 13.8748 19.4014 12.9496 16.8057C11.7818 13.6225 11.4659 9.24018 10.6381 6.53125C10.1276 4.77244 9.3967 4.01971 8.37442 4.01953H7.64493C6.25719 4.01953 5.52811 5.19328 5.26016 8.12402L3.94571 23.4795C3.92171 23.8145 3.72691 24.0107 3.43497 24.0107H0.415436C0.0995741 24.0107 -0.021643 23.8144 0.00234985 23.4795L1.5834 6.28223C1.94867 2.28994 4.01763 0 7.44766 0H8.39688ZM200.041 0.336914C200.309 0.336914 200.454 0.503233 200.528 0.810547L200.991 3.68652C201.039 4.078 200.918 4.27246 200.553 4.27246H188.922V23.4248H188.921C188.921 23.7871 188.775 23.9551 188.459 23.9551H185.491C185.198 23.955 185.029 23.7885 185.029 23.4248V4.27246H173.397C173.033 4.27238 172.91 4.07635 172.959 3.68652L173.422 0.810547C173.47 0.503336 173.642 0.337095 173.909 0.336914H200.041ZM136.48 13.4834C134.728 13.8184 132.465 13.958 129.545 13.958H120.883V20.1299C123.147 20.4648 126.334 20.6318 128.085 20.6318C136.724 20.6318 138.791 19.8771 138.791 16.8057C138.791 14.9917 138.11 13.9576 136.48 13.4834ZM127.867 3.8252C125.726 3.82522 122.831 4.04921 120.883 4.3291V10.8057H129.035C136.553 10.8057 138.281 10.1918 138.281 7.34375C138.281 4.49561 136.309 3.8252 127.867 3.8252Z"
                    fill="white"
                  />
                  <path
                    d="M59.229 15.9906C57.1107 24.9312 47.4392 28.278 41.7203 21.1179C32.8846 10.0542 45.5675 -5.4423 55.4217 3.35756C60.5554 7.94181 66.5636 26.4517 75.0181 19.1508C82.4913 12.6958 74.7115 0.451298 67.1355 5.66881C65.6451 6.69518 64.508 8.46341 63.1496 9.67181C63.9681 1.13503 72.7798 -2.715 78.7 2.56828C90.4899 13.092 76.6858 31.3724 66.4837 21.7909C61.3379 16.9574 56.4322 0.72051 47.9311 5.8493C39.9686 10.6538 45.0596 23.8024 53.5301 20.4097C55.7336 19.5271 57.2854 17.3811 59.2263 15.9922L59.229 15.9906Z"
                    fill="url(#paint0_linear_9612_6688)"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_9612_6688"
                    x1="60.9837"
                    y1="0.155273"
                    x2="60.9837"
                    y2="24.9996"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FFB8A1" />
                    <stop offset="1" stop-color="#A62A00" />
                  </linearGradient>
                  <clipPath id="clip0_9612_6688">
                    <rect width="201" height="25" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              {/* Back to top button */}
              <motion.button
                className="flex items-center gap-2 text-xs sm:text-sm md:text-base font-medium  transition-all duration-300 absolute right-0 md:right-10 sm:static"
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

                <div className="flex flex-col-2 md:flex-col gap-2">
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
                </div>
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
