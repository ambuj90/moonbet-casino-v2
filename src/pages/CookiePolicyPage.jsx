// CookiePolicyPage.jsx - Clean Cookie Policy Page with Glass Style
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Glass Section Component with dark theme
const PolicySection = ({ number, title, children }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: number * 0.1 }}
      className="mb-8"
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer p-6 transition-all duration-300 hover:bg-white/5"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white flex items-center gap-3">
            <span
              className="px-3 py-1 text-gray-300"
              style={{
                borderRadius: "4px",
                background: "rgba(255, 255, 255, 0.05)",
              }}
            >
              {number}
            </span>
            <span className="text-gray-100">{title}</span>
          </h2>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-400 text-xl"
          >
            ▼
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Subsection Component with glass styling
const SubSection = ({ number, title, children }) => {
  return (
    <div
      className="mb-6 p-5 hover:bg-white/5 transition-all"
      style={{
        borderRadius: "8px",
        border: "1px solid rgba(255, 255, 255, 0.20)",
      }}
    >
      <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-white">
        <span
          className="px-2 py-0.5 text-sm font-bold text-gray-300"
          style={{
            borderRadius: "4px",
            border: "1px solid rgba(255, 255, 255, 0.20)",
            background: "rgba(255, 255, 255, 0.05)",
          }}
        >
          {number}
        </span>
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
};

// List Item Component with minimal styling
const ListItem = ({ children, icon = "•" }) => (
  <div className="flex items-start gap-3 mb-3">
    <span className="text-gray-400 text-lg mt-1">{icon}</span>
    <p className="text-gray-300 flex-1">{children}</p>
  </div>
);

// Highlight Box Component
const HighlightBox = ({ children, variant = "default" }) => {
  const variants = {
    default: "rgba(255, 255, 255, 0.05)",
    warning: "rgba(255, 100, 100, 0.1)",
    info: "rgba(100, 150, 255, 0.1)",
    success: "rgba(100, 255, 100, 0.1)",
  };

  return (
    <div
      className="p-4 mt-4"
      style={{
        borderRadius: "8px",
        border: "1px solid rgba(255, 255, 255, 0.30)",
        background: variants[variant],
      }}
    >
      {children}
    </div>
  );
};

// Cookie Type Card Component
const CookieTypeCard = ({ icon, title, description, essential = false }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="p-4 rounded-lg transition-all"
    style={{
      background: essential
        ? "linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1))"
        : "rgba(255, 255, 255, 0.05)",
      border: essential
        ? "1px solid rgba(34, 197, 94, 0.3)"
        : "1px solid rgba(255, 255, 255, 0.15)",
    }}
  >
    <div className="flex items-start gap-3">
      <span className="text-2xl">{icon}</span>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <h4 className="text-white font-semibold">{title}</h4>
          {essential && (
            <span className="px-2 py-0.5 text-xs font-semibold text-green-400 bg-green-500/20 rounded-full">
              Essential
            </span>
          )}
        </div>
        <p className="text-gray-400 text-sm">{description}</p>
        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center py-8 border-t border-gray-800"
        >
          <p className="text-gray-400">
            © 2025 Moonbet Games LLC. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            This website uses cookies to enhance your experience.
          </p>
        </motion.footer>
      </div>

      {/* Custom CSS for scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  </motion.div>
);

// Main Cookie Policy Page Component
const CookiePolicyPage = () => {
  const [activeSection, setActiveSection] = useState(1);
  const [isTocOpen, setIsTocOpen] = useState(true);

  // Table of Contents
  const sections = [
    { id: 1, title: "WHAT ARE COOKIES?", short: "What" },
    { id: 2, title: "TYPES OF COOKIES WE USE", short: "Types" },
    { id: 3, title: "BLOCKCHAIN AND PRIVACY", short: "Blockchain" },
    { id: 4, title: "YOUR COOKIE CHOICES", short: "Choices" },
    { id: 5, title: "MANAGING YOUR PREFERENCES", short: "Manage" },
    { id: 6, title: "THIRD-PARTY SERVICES", short: "Third Party" },
    { id: 7, title: "OPT-OUT OPTIONS", short: "Opt-Out" },
    { id: 8, title: "COOKIE DURATION", short: "Duration" },
    { id: 9, title: "DATA PROTECTION", short: "Protection" },
    { id: 10, title: "POLICY UPDATES", short: "Updates" },
    { id: 11, title: "CONTACT US", short: "Contact" },
  ];

  // Track active section on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(`section-${sections[i].id}`);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cookieTypes = [
    {
      icon: "🔒",
      title: "Essential/Strictly Necessary Cookies",
      description:
        "Required for the platform to function properly. Enable basic features like wallet connection, account login, form filling, and session management. These cannot be disabled and do not require consent.",
      essential: true,
    },
    {
      icon: "📊",
      title: "Performance/Analytical Cookies",
      description:
        "Help us understand how you use Moonbet—which games you play, how long you stay, which pages you visit, and where you come from. This data helps us improve platform functionality and user experience.",
      essential: false,
    },
    {
      icon: "⚙️",
      title: "Functional Cookies",
      description:
        "Enable enhanced features and personalization. Remember your preferences (language, display settings, game favorites, deposit limits) and allow us to provide a customized experience.",
      essential: false,
    },
    {
      icon: "🛡️",
      title: "Security Cookies",
      description:
        "Detect and prevent fraud, unauthorized access, suspicious activity, and security threats. Help protect your account and our platform from malicious actors.",
      essential: true,
    },
    {
      icon: "📢",
      title: "Marketing/Advertising Cookies",
      description:
        "May be set by our advertising partners to build profiles of your interests and show you relevant ads on other websites. These require your consent.",
      essential: false,
    },
    {
      icon: "🌐",
      title: "Third-Party Cookies",
      description:
        "Set by third-party service providers (payment processors, analytics firms, marketing partners). Their use is subject to their own privacy policies.",
      essential: false,
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Subtle animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 600,
              height: 600,
              background: `radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)`,
              left: `${i * 33}%`,
              top: `${i * 20}%`,
            }}
            animate={{
              y: [0, 30, 0],
              x: [0, -20, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
            COOKIE POLICY
          </h1>
          <p className="text-gray-400 text-lg">
            Last Updated: November 18, 2025
          </p>
        </motion.header>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <HighlightBox variant="info">
            <p className="text-gray-200 text-center">
              At Moonbet.games, we use cookies and similar tracking technologies
              to improve your browsing experience, analyze platform traffic,
              enhance security, and personalize your gaming experience. This
              Cookie Policy explains how we use cookies and the choices
              available to you.
            </p>
          </HighlightBox>
        </motion.div>

        {/* Sticky Compact Table of Contents */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
          style={{ maxHeight: "80vh" }}
        >
          <div
            className="relative"
            style={{
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.10)",
              background: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(20px)",
              width: isTocOpen ? "200px" : "50px",
              transition: "width 0.3s ease",
            }}
          >
            {/* Toggle Button */}
            <button
              onClick={() => setIsTocOpen(!isTocOpen)}
              className="absolute -right-2 top-4 w-8 h-8 rounded-full bg-black border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label={isTocOpen ? "Close navigation" : "Open navigation"}
            >
              <span className="text-white text-sm">
                {isTocOpen ? "◀" : "▶"}
              </span>
            </button>

            <div className={`p-4 ${isTocOpen ? "block" : "hidden"}`}>
              <h3 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">
                Navigation
              </h3>
              <div className="space-y-1 max-h-[70vh] overflow-y-auto custom-scrollbar">
                {sections.map((section) => (
                  <motion.button
                    key={section.id}
                    onClick={() => {
                      const element = document.getElementById(
                        `section-${section.id}`
                      );
                      element?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`
                      w-full text-left px-3 py-2 rounded-lg text-xs transition-all
                      ${
                        activeSection === section.id
                          ? "bg-white/20 text-white font-semibold"
                          : "text-gray-400 hover:bg-white/10 hover:text-white"
                      }
                    `}
                    whileHover={{ x: 2 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] opacity-50">
                        {String(section.id).padStart(2, "0")}
                      </span>
                      <span className="truncate">{section.short}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Compact view when closed */}
            <div className={`p-2 ${!isTocOpen ? "block" : "hidden"}`}>
              <div className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      const element = document.getElementById(
                        `section-${section.id}`
                      );
                      element?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`
                      w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono transition-all
                      ${
                        activeSection === section.id
                          ? "bg-white/20 text-white"
                          : "text-gray-500 hover:bg-white/10 hover:text-white"
                      }
                    `}
                    title={section.title}
                  >
                    {String(section.id).padStart(2, "0")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile Sticky TOC */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="fixed bottom-4 right-4 z-50 lg:hidden"
        >
          <div className="relative">
            <button
              onClick={() => setIsTocOpen(!isTocOpen)}
              className="w-14 h-14 rounded-full bg-black border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all shadow-lg"
              style={{ backdropFilter: "blur(10px)" }}
            >
              <span className="text-white text-xl">☰</span>
            </button>

            <AnimatePresence>
              {isTocOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  className="absolute bottom-16 right-0 w-48 rounded-lg overflow-hidden shadow-xl"
                  style={{
                    border: "1px solid rgba(255, 255, 255, 0.10)",
                    background: "rgba(0, 0, 0, 0.95)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <div className="p-3 max-h-[60vh] overflow-y-auto">
                    <h3 className="text-xs font-bold text-gray-400 mb-2 uppercase">
                      Navigation
                    </h3>
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => {
                          const element = document.getElementById(
                            `section-${section.id}`
                          );
                          element?.scrollIntoView({ behavior: "smooth" });
                          setIsTocOpen(false);
                        }}
                        className={`
                          w-full text-left px-2 py-1.5 rounded text-xs transition-all
                          ${
                            activeSection === section.id
                              ? "bg-white/20 text-white"
                              : "text-gray-400 hover:bg-white/10 hover:text-white"
                          }
                        `}
                      >
                        <span className="font-mono text-[10px] opacity-50 mr-2">
                          {String(section.id).padStart(2, "0")}
                        </span>
                        {section.short}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Policy Sections */}
        <div
          style={{
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.10)",
            background: "rgba(255, 255, 255, 0.02)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Section 1: WHAT ARE COOKIES */}
          <div id="section-1">
            <PolicySection number="01" title="WHAT ARE COOKIES?">
              <p className="text-gray-300 mb-4">
                Cookies are small text files stored on your device (computer,
                smartphone, or tablet) when you visit our website or platform.
                They allow us to remember your actions and preferences so you
                don't have to re-enter them on each visit.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <span className="text-blue-400">🍪</span> Session Cookies
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Deleted when you close your browser. Used for temporary
                    session management.
                  </p>
                </div>

                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <span className="text-purple-400">💾</span> Persistent
                    Cookies
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Remain until they expire or you delete them. Store your
                    preferences for future visits.
                  </p>
                </div>
              </div>
            </PolicySection>
          </div>

          {/* Section 2: TYPES OF COOKIES WE USE */}
          <div id="section-2">
            <PolicySection number="02" title="TYPES OF COOKIES WE USE">
              <div className="grid md:grid-cols-2 gap-4">
                {cookieTypes.map((type, index) => (
                  <CookieTypeCard
                    key={index}
                    icon={type.icon}
                    title={type.title}
                    description={type.description}
                    essential={type.essential}
                  />
                ))}
              </div>
            </PolicySection>
          </div>

          {/* Section 3: BLOCKCHAIN AND PRIVACY CONSIDERATIONS */}
          <div id="section-3">
            <PolicySection
              number="03"
              title="BLOCKCHAIN AND PRIVACY CONSIDERATIONS"
            >
              <p className="text-gray-300 mb-6">
                Because Moonbet operates on blockchain networks, we want to be
                transparent about unique privacy considerations:
              </p>

              <div className="space-y-4">
                <ListItem icon="⚠️">
                  Blockchain transactions (wallet addresses, deposit/withdrawal
                  amounts, timestamps) are
                  <span className="font-semibold text-white">
                    {" "}
                    permanently recorded on public ledgers
                  </span>{" "}
                  and cannot be deleted
                </ListItem>

                <ListItem icon="🔗">
                  Browser cookies can link your identity to blockchain
                  transactions across different websites
                </ListItem>

                <ListItem icon="🔒">
                  We minimize this risk by using secure, privacy-focused cookie
                  practices (HttpOnly attributes, SameSite protections)
                </ListItem>

                <ListItem icon="🛡️">
                  For maximum privacy, you can disable non-essential cookies or
                  use privacy-focused browser extensions
                </ListItem>
              </div>

              <HighlightBox variant="warning">
                <p className="text-gray-200">
                  <span className="font-semibold">Important:</span> While we can
                  control cookies on our platform, blockchain transactions are
                  public and permanent by design.
                </p>
              </HighlightBox>
            </PolicySection>
          </div>

          {/* Section 4: YOUR COOKIE CHOICES */}
          <div id="section-4">
            <PolicySection number="04" title="YOUR COOKIE CHOICES">
              <SubSection number="4.1" title="Cookie Consent Banner">
                <p className="text-gray-300 mb-4">
                  When you first visit Moonbet, a cookie consent banner appears.
                  You can:
                </p>

                <div className="grid md:grid-cols-3 gap-3">
                  <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <h5 className="text-white font-medium mb-1">Accept All</h5>
                    <p className="text-gray-400 text-xs">
                      Enable all cookie types
                    </p>
                  </div>

                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <h5 className="text-white font-medium mb-1">
                      Reject Non-Essential
                    </h5>
                    <p className="text-gray-400 text-xs">
                      Only essential cookies
                    </p>
                  </div>

                  <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <h5 className="text-white font-medium mb-1">Customize</h5>
                    <p className="text-gray-400 text-xs">
                      Choose your preferences
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 mt-4">
                  Your choices are saved and remain effective for up to 12
                  months.
                </p>
              </SubSection>

              <SubSection number="4.2" title="Browser Settings">
                <p className="text-gray-300 mb-4">
                  You can manage cookies through your browser settings:
                </p>

                <ListItem>
                  Most browsers automatically accept cookies, but you can change
                  this
                </ListItem>
                <ListItem>
                  You can choose to reject cookies or receive alerts before
                  cookies are saved
                </ListItem>
                <ListItem>You can delete cookies at any time</ListItem>

                <HighlightBox variant="warning">
                  <p className="text-gray-200 font-semibold mb-2">
                    Important Note:
                  </p>
                  <p className="text-gray-200">
                    Disabling certain cookies may negatively impact your
                    experience. Essential cookies cannot be disabled, and
                    blocking others may:
                  </p>
                  <div className="mt-3 grid md:grid-cols-2 gap-2">
                    <ListItem icon="❌">Prevent you from logging in</ListItem>
                    <ListItem icon="❌">
                      Disable responsible gambling tools
                    </ListItem>
                    <ListItem icon="❌">Affect game performance</ListItem>
                    <ListItem icon="❌">
                      Limit personalization features
                    </ListItem>
                  </div>
                </HighlightBox>
              </SubSection>
            </PolicySection>
          </div>

          {/* Section 5: MANAGING YOUR PREFERENCES */}
          <div id="section-5">
            <PolicySection number="05" title="MANAGING YOUR PREFERENCES">
              <p className="text-gray-300 mb-6">
                You can change your cookie preferences at any time by:
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🔗</span>
                    <h4 className="text-white font-semibold">Footer Link</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Click "Cookie Settings" in the footer
                  </p>
                </div>

                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">⚙️</span>
                    <h4 className="text-white font-semibold">
                      Account Settings
                    </h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Access your account settings
                  </p>
                </div>

                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">📧</span>
                    <h4 className="text-white font-semibold">Contact Us</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Email support@moonbet.games
                  </p>
                </div>
              </div>

              <HighlightBox variant="info">
                <p className="text-gray-200">
                  If you delete cookies from your browser, your preferences will
                  be lost and you'll need to set them again on your next visit.
                </p>
              </HighlightBox>
            </PolicySection>
          </div>

          {/* Section 6: THIRD-PARTY SERVICES */}
          <div id="section-6">
            <PolicySection number="06" title="THIRD-PARTY SERVICES">
              <p className="text-gray-300 mb-6">
                We use third-party services that may place cookies on your
                device:
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="text-white font-semibold mb-2">
                    Google Analytics
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Traffic analysis and user behavior
                  </p>
                </div>

                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="text-white font-semibold mb-2">
                    Payment Processors
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Transaction security and fraud prevention
                  </p>
                </div>

                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="text-white font-semibold mb-2">
                    Marketing Partners
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Ad targeting and campaign analysis
                  </p>
                </div>

                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="text-white font-semibold mb-2">
                    Customer Support Tools
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Live chat functionality
                  </p>
                </div>

                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="text-white font-semibold mb-2">
                    Security Services
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Fraud detection and threat prevention
                  </p>
                </div>
              </div>

              <p className="text-gray-300 mt-6">
                These third parties have their own privacy policies and cookie
                practices. We are not responsible for their use of cookies,
                though we require them to meet our privacy and security
                standards.
              </p>
            </PolicySection>
          </div>

          {/* Section 7: OPT-OUT OPTIONS */}
          <div id="section-7">
            <PolicySection number="07" title="OPT-OUT OPTIONS">
              <SubSection number="7.1" title="Google Analytics Opt-Out">
                <p className="text-gray-300">
                  Download the Google Analytics opt-out browser extension to
                  prevent Google from collecting your data.
                </p>
              </SubSection>

              <SubSection number="7.2" title="Advertising Opt-Out">
                <p className="text-gray-300">
                  Visit the Network Advertising Initiative (NAI) or Digital
                  Advertising Alliance (DAA) opt-out pages to opt out of
                  behavioral advertising.
                </p>
              </SubSection>

              <SubSection number="7.3" title="Do Not Track">
                <p className="text-gray-300">
                  If your browser supports "Do Not Track" signals, we respect
                  that preference, though not all third parties do.
                </p>
              </SubSection>
            </PolicySection>
          </div>

          {/* Section 8: HOW LONG DO COOKIES LAST */}
          <div id="section-8">
            <PolicySection number="08" title="HOW LONG DO COOKIES LAST?">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="text-white font-semibold mb-3">
                    Cookie Duration
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Session cookies:</span>
                      <span className="text-gray-200 font-mono text-sm">
                        Browser close
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Essential cookies:</span>
                      <span className="text-gray-200 font-mono text-sm">
                        1-2 years
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Analytical cookies:</span>
                      <span className="text-gray-200 font-mono text-sm">
                        6 months - 2 years
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Marketing cookies:</span>
                      <span className="text-gray-200 font-mono text-sm">
                        6 months - 1 year
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">
                    Review Process
                  </h4>
                  <p className="text-gray-300">
                    We review cookie retention periods regularly and adjust them
                    as needed to ensure compliance and optimize user experience.
                  </p>
                </div>
              </div>
            </PolicySection>
          </div>

          {/* Section 9: DATA PROTECTION AND SECURITY */}
          <div id="section-9">
            <PolicySection number="09" title="DATA PROTECTION AND SECURITY">
              <div className="grid md:grid-cols-2 gap-4">
                <ListItem icon="🔐">
                  All cookies are encrypted during transmission
                </ListItem>
                <ListItem icon="🚫">
                  Essential cookies do not store personally identifiable
                  information
                </ListItem>
                <ListItem icon="🛡️">
                  We use industry-standard security practices to protect cookie
                  data
                </ListItem>
                <ListItem icon="🔒">
                  Your cookie preferences are stored securely
                </ListItem>
              </div>

              <HighlightBox variant="success">
                <p className="text-gray-200">
                  We implement the latest security standards including HttpOnly
                  attributes, SameSite protections, and secure flag settings on
                  all sensitive cookies.
                </p>
              </HighlightBox>
            </PolicySection>
          </div>

          {/* Section 10: UPDATES TO THIS POLICY */}
          <div id="section-10">
            <PolicySection number="10" title="UPDATES TO THIS POLICY">
              <p className="text-gray-300 mb-4">
                We may update this Cookie Policy from time to time to reflect:
              </p>

              <ListItem>Changes in our cookie practices</ListItem>
              <ListItem>New technologies or tools</ListItem>
              <ListItem>Legal or regulatory requirements</ListItem>
              <ListItem>Improvements to privacy and security</ListItem>

              <p className="text-gray-300 mt-4">
                We encourage you to review this policy periodically. We will
                notify you of material changes via email or a prominent notice
                on the platform.
              </p>
            </PolicySection>
          </div>

          {/* Section 11: CONTACT US */}
          <div id="section-11">
            <PolicySection number="11" title="CONTACT US">
              <p className="text-gray-300 mb-6">
                If you have questions or concerns about our use of cookies:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <HighlightBox>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📧</span>
                    <div>
                      <p className="text-gray-200 font-semibold">Email</p>
                      <p className="text-gray-400">support@moonbet.games</p>
                    </div>
                  </div>
                </HighlightBox>

                <HighlightBox>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💬</span>
                    <div>
                      <p className="text-gray-200 font-semibold">Live Chat</p>
                      <p className="text-gray-400">24/7 via Moonbet.games</p>
                    </div>
                  </div>
                </HighlightBox>
              </div>

              <HighlightBox variant="info">
                <p className="text-gray-200 text-center">
                  By using Moonbet.games, you consent to the use of cookies as
                  described in this Cookie Policy.
                </p>
              </HighlightBox>
            </PolicySection>
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center py-8 border-t border-gray-800"
        >
          <p className="text-gray-400">
            © 2025 Moonbet Games LLC. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            This website uses cookies to enhance your experience.
          </p>
        </motion.footer>
      </div>

      {/* Custom CSS for scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default CookiePolicyPage;
