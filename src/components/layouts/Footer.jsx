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
        <div className="max-w-[1320px] mx-auto px-4 sm:px-10 w-full flex flex-col h-full pt-6">
          {/* Top row: logo + back to top */}
          <div className="flex items-center justify-betwwen md:justify-between w-full relative py-6 md:py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="201"
              height="25"
              viewBox="0 0 201 25"
              fill="none"
              className=""
            >
              <g clip-path="url(#clip0_9930_1835)">
                <path
                  d="M128.402 0C138.766 3.34674e-05 142.368 1.84315 142.369 7.00684C142.369 9.4634 141.784 11.14 140.202 12.2275C141.905 13.26 142.877 15.0473 142.877 17.3096C142.877 22.5848 139.154 24.4277 128.595 24.4277C125.384 24.4277 120.298 23.8972 117.451 23.3955C117.157 23.3405 117.011 23.1446 117.011 22.7822H117.013V1.73145C117.013 1.39651 117.158 1.20033 117.452 1.11621C120.274 0.585441 125.262 0 128.402 0ZM161.788 0C164.951 1.38594e-05 167.311 0.307458 169.185 0.726562C169.453 0.781732 169.598 0.978021 169.671 1.25781L170.208 4.07617C170.305 4.49529 170.159 4.66225 169.793 4.57812C167.337 4.0765 163.735 3.88088 161.74 3.88086C153.832 3.88086 151.034 5.66719 150.498 10.3584H169.55C169.842 10.3586 170.012 10.5548 170.012 10.8896V13.3184C170.012 13.6807 169.842 13.8485 169.55 13.8486H150.45C150.984 18.6226 153.759 20.4375 161.74 20.4375C163.735 20.4375 167.335 20.2134 169.793 19.7393C170.159 19.6276 170.305 19.8239 170.208 20.2139L169.671 23.0332C169.623 23.3403 169.477 23.5067 169.21 23.5908C167.336 24.0099 164.951 24.3457 161.788 24.3457C150.426 24.3457 146.239 20.269 146.263 12.1455C146.239 4.10433 150.426 0 161.788 0ZM92.1206 0C95.6478 9.918e-05 97.667 1.81452 99.2974 6.58984C99.4429 7.17617 100.539 10.3044 102.217 15.5244C103.433 19.2655 104.164 20.2705 105.77 20.2705C107.23 20.2704 107.886 18.9011 107.886 15.7197V0.866211C107.886 0.503792 108.032 0.335053 108.324 0.334961H111.317C111.609 0.335016 111.778 0.502224 111.778 0.866211V17.7012C111.778 21.554 109.492 24.3174 106.158 24.3174C102.629 24.3174 100.635 22.5038 99.0044 17.7012C98.8591 17.1153 97.6895 13.7361 96.0845 8.79395C94.8914 5.05256 94.1373 4.0469 92.5083 4.04688C91.0486 4.04688 90.3912 5.44228 90.3911 8.59766L90.4165 23.4502V23.4521C90.4165 23.8146 90.2709 23.9824 89.9536 23.9824H86.9614C86.6695 23.9824 86.524 23.8161 86.5239 23.4521V6.58984C86.5239 2.70921 88.8119 0 92.1206 0ZM8.39697 0C10.9271 5.98678e-05 12.6067 1.4807 13.7251 4.71875C14.9409 8.18026 15.2331 12.7329 16.1343 15.1895C16.5235 16.2781 17.0338 16.948 17.812 16.9482H18.396C19.1744 16.9482 19.7095 16.2784 20.1001 15.1895C20.9999 12.7329 21.2921 8.18179 22.4839 4.71875C23.629 1.4807 25.3088 0 27.8149 0H28.7642C32.2192 0.000201713 34.2632 2.29011 34.6284 6.28223L36.2104 23.4814L36.2085 23.4795C36.2325 23.8144 36.1117 24.0107 35.8198 24.0107H32.8032C32.4873 24.0107 32.3151 23.8145 32.2925 23.4795L30.9536 8.12402C30.7097 5.19328 29.9553 4.01953 28.5688 4.01953H27.8638C26.8414 4.01958 26.1122 4.77391 25.5776 6.53125C24.7751 9.2401 24.4582 13.6226 23.2905 16.8057C22.3667 19.4029 20.9541 21.0215 18.6919 21.0215H17.5249C15.2867 21.0215 13.8749 19.4014 12.9497 16.8057C11.7819 13.6225 11.466 9.24018 10.6382 6.53125C10.1277 4.77244 9.39679 4.01971 8.37451 4.01953H7.64502C6.25728 4.01953 5.5282 5.19328 5.26025 8.12402L3.9458 23.4795C3.92181 23.8145 3.727 24.0107 3.43506 24.0107H0.415527C0.0996657 24.0107 -0.0215514 23.8144 0.00244141 23.4795L1.5835 6.28223C1.94876 2.28994 4.01772 0 7.44775 0H8.39697ZM200.042 0.336914C200.309 0.336914 200.454 0.503233 200.528 0.810547L200.991 3.68652C201.039 4.078 200.918 4.27246 200.553 4.27246H188.922V23.4248H188.921C188.921 23.7871 188.775 23.9551 188.459 23.9551H185.491C185.198 23.955 185.029 23.7885 185.029 23.4248V4.27246H173.397C173.033 4.27238 172.91 4.07635 172.959 3.68652L173.422 0.810547C173.47 0.503336 173.642 0.337095 173.909 0.336914H200.042ZM136.48 13.4834C134.728 13.8184 132.465 13.958 129.545 13.958H120.883V20.1299C123.147 20.4648 126.334 20.6318 128.085 20.6318C136.724 20.6318 138.792 19.8771 138.792 16.8057C138.791 14.9917 138.11 13.9576 136.48 13.4834ZM127.867 3.8252C125.726 3.82522 122.831 4.04921 120.883 4.3291V10.8057H129.035C136.553 10.8057 138.281 10.1918 138.281 7.34375C138.281 4.49561 136.309 3.8252 127.867 3.8252Z"
                  fill="white"
                />
                <path
                  d="M59.229 15.9906C57.1107 24.9312 47.4392 28.278 41.7202 21.1179C32.8845 10.0542 45.5675 -5.4423 55.4217 3.35756C60.5554 7.94181 66.5636 26.4517 75.0181 19.1508C82.4913 12.6958 74.7114 0.451298 67.1355 5.66881C65.6451 6.69518 64.508 8.46341 63.1496 9.67181C63.9681 1.13503 72.7798 -2.715 78.7 2.56828C90.4898 13.092 76.6857 31.3724 66.4836 21.7909C61.3379 16.9574 56.4322 0.72051 47.9311 5.8493C39.9686 10.6538 45.0596 23.8024 53.53 20.4097C55.7336 19.5271 57.2853 17.3811 59.2263 15.9922L59.229 15.9906Z"
                  fill="url(#paint0_linear_9930_1835)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_9930_1835"
                  x1="60.9837"
                  y1="0.155273"
                  x2="60.9837"
                  y2="24.9996"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FFB8A1" />
                  <stop offset="1" stop-color="#A62A00" />
                </linearGradient>
                <clipPath id="clip0_9930_1835">
                  <rect width="201" height="25" fill="white" />
                </clipPath>
              </defs>
            </svg>

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
                <p className="text-sm sm:text-base font-semibold text-white mb-1 md:mb-2 bg-clip-text text-transparent text-[rgba(225,225,225,0.50)]">
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
                <p className="text-sm sm:text-base font-semibold text-white mb-1 md:mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent text-[#E2E2E2]">
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
                <p className="text-sm sm:text-base font-semibold text-white mb-1 md:mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent text-[#E2E2E2]">
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
                  <p className="text-sm sm:text-base font-semibold text-white mb-1 md:mb-2 bg-clip-text text-transparent text-[rgba(225,225,225,0.50)]">
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
                  <p className="text-sm sm:text-base font-semibold text-white mb-1 md:mb-2 bg-clip-text text-transparent text-[rgba(225,225,225,0.50)]">
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
              className="w-full lg:max-w-xs lg:ml-auto mt-2"
              variants={itemVariants}
            >
              <TrustBadgesFinal layout="column" />
            </motion.div>
          </div>

          <div className="mt-6 pb-8 text-xs sm:text-sm text-white/60 text-left">
            Moonbet operates as a decentralized crypto casino on the Solana
            blockchain. Built by crypto natives for players 18+.
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
