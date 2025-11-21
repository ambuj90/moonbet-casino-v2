import React, { useState } from "react";
import { motion } from "framer-motion";

const CookiePolicy = () => {
  const [activeSection, setActiveSection] = useState("what");

  // Navigation sections
  const sections = [
    { id: "what", label: "What Are Cookies?" },
    { id: "types", label: "Types of Cookies We Use" },
    { id: "blockchain", label: "Blockchain and Privacy" },
    { id: "choices", label: "Your Cookie Choices" },
    { id: "managing", label: "Managing Your Preferences" },
    { id: "thirdparty", label: "Third-Party Services" },
    { id: "optout", label: "Opt-Out Options" },
    { id: "duration", label: "How Long Do Cookies Last?" },
    { id: "security", label: "Data Protection and Security" },
    { id: "updates", label: "Updates to This Policy" },
    { id: "contact", label: "Contact Us" },
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen  ">
      {/* Hero Section */}
      <section className="relative py-8 md:py-16 px-4 border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F07730]/10 via-transparent to-[#EFD28E]/10" />
        <div className="container max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-2xl md:text-2xl font-bold mb-2 md:mb-6">
              MOONBET COOKIE POLICY
            </h1>
            <p className="text-gray-300 leading-relaxed">
              At Moonbet.games, we use cookies and similar tracking technologies
              to improve your browsing experience, analyze platform traffic,
              enhance security, and personalize your gaming experience. This
              Cookie Policy explains how we use cookies and the choices
              available to you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-2 md:px-4 py-6 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Desktop Only with blue accent line */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="rounded-2xl p-6">
                {/* <p className="text-lg font-bold text-white mb-4">
                  Quick Navigation
                </p> */}
                <nav className="space-y-2 bg-[rgba(20,20,20,0.80) shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px] p-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all flex items-center gap-2 relative
                               ${
                                 activeSection === section.id
                                   ? "bg-transparent text-white"
                                   : "text-gray-400 hover:bg-white/5 hover:text-white"
                               }`}
                    >
                      {/* Blue accent line for active section */}
                      {activeSection === section.id && (
                        <span className="absolute left-0 top-0 bottom-0 w-1 bg-[rgb(240,129,58)] rounded-r"></span>
                      )}
                      <span
                        className={activeSection === section.id ? "ml-2" : ""}
                      >
                        {section.label}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            {/* What Are Cookies? */}
            <motion.section
              id="what"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="rounded-2xl p-2 md:p-8 mt-0"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                What Are Cookies?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Cookies are small text files stored on your device (computer,
                smartphone, or tablet) when you visit our website or platform.
                They allow us to remember your actions and preferences so you
                don't have to re-enter them on each visit. Cookies can be either
                "session cookies" (deleted when you close your browser) or
                "persistent cookies" (remain until they expire or you delete
                them).
              </p>
            </motion.section>

            {/* Types of Cookies We Use */}
            <motion.section
              id="types"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="rounded-2xl p-2 md:p-8 mt-0"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Types of Cookies We Use
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Essential/Strictly Necessary Cookies
                  </h3>
                  <p className="text-gray-300">
                    These cookies are required for the platform to function
                    properly. They enable basic features like wallet connection,
                    account login, form filling, and session management. These
                    cannot be disabled and do not require consent.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Performance/Analytical Cookies
                  </h3>
                  <p className="text-gray-300">
                    These cookies help us understand how you use Moonbet—which
                    games you play, how long you stay, which pages you visit,
                    and where you come from. This data helps us improve platform
                    functionality and user experience. We use services like
                    Google Analytics for this purpose.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Functional Cookies
                  </h3>
                  <p className="text-gray-300">
                    These cookies enable enhanced features and personalization.
                    They remember your preferences (language, display settings,
                    game favorites, deposit limits) and allow us to provide a
                    customized experience during your next visit.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Security Cookies
                  </h3>
                  <p className="text-gray-300">
                    These cookies detect and prevent fraud, unauthorized access,
                    suspicious activity, and security threats. They help protect
                    your account and our platform from malicious actors.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Marketing/Advertising Cookies
                  </h3>
                  <p className="text-gray-300">
                    These cookies may be set by our advertising partners to
                    build profiles of your interests and show you relevant ads
                    on other websites. These require your consent.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Third-Party Cookies
                  </h3>
                  <p className="text-gray-300">
                    We may allow third-party service providers (payment
                    processors, analytics firms, marketing partners) to use
                    cookies on our platform. Their use of cookies is subject to
                    their own privacy policies.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Blockchain and Privacy Considerations */}
            <motion.section
              id="blockchain"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="rounded-2xl p-2 md:p-8 mt-0"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Blockchain and Privacy Considerations
              </h2>
              <p className="text-gray-300 mb-4">
                Because Moonbet operates on blockchain networks, we want to be
                transparent about a unique privacy consideration:
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    Blockchain transactions (wallet addresses,
                    deposit/withdrawal amounts, timestamps) are permanently
                    recorded on public ledgers and cannot be deleted
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    Browser cookies can link your identity to blockchain
                    transactions across different websites
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    We minimize this risk by using secure, privacy-focused
                    cookie practices (HttpOnly attributes, SameSite protections)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    For maximum privacy, you can disable non-essential cookies
                    or use privacy-focused browser extensions
                  </span>
                </li>
              </ul>
            </motion.section>

            {/* Your Cookie Choices */}
            <motion.section
              id="choices"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="rounded-2xl p-2 md:p-8 mt-0"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Your Cookie Choices
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Cookie Consent Banner
                  </h3>
                  <p className="text-gray-300 mb-3">
                    When you first visit Moonbet, a cookie consent banner
                    appears. You can:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">Accept all cookies</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Reject non-essential cookies
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Customize your cookie preferences
                      </span>
                    </li>
                  </ul>
                  <p className="text-gray-300 mt-3">
                    Your choices are saved and remain effective for up to 12
                    months.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Browser Settings
                  </h3>
                  <p className="text-gray-300 mb-3">
                    You can manage cookies through your browser settings:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Most browsers automatically accept cookies, but you can
                        change this
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        You can choose to reject cookies or receive alerts
                        before cookies are saved
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        You can delete cookies at any time
                      </span>
                    </li>
                  </ul>
                  <p className="text-gray-300 mt-4">
                    <span className="text-white font-bold">
                      Important Note:
                    </span>{" "}
                    Disabling certain cookies may negatively impact your
                    experience. Essential cookies cannot be disabled, and
                    blocking others may:
                  </p>
                  <ul className="space-y-3 mt-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Prevent you from logging in
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Disable responsible gambling tools
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Affect game performance
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Limit personalization features
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Managing Your Preferences */}
            <motion.section
              id="managing"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="rounded-2xl p-2 md:p-8 mt-0"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Managing Your Preferences
              </h2>
              <p className="text-gray-300 mb-4">
                You can change your cookie preferences at any time by:
              </p>

              <ul className="space-y-3 mb-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    Clicking the "Cookie Settings" link in the footer of our
                    website
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    Accessing your account settings
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    Contacting us at{" "}
                    <a
                      href="mailto:support@moonbet.games"
                      className="text-[#EFD28E] hover:text-[#F07730] transition-colors"
                    >
                      support@moonbet.games
                    </a>
                  </span>
                </li>
              </ul>

              <p className="text-gray-300">
                If you delete cookies from your browser, your preferences will
                be lost and you'll need to set them again on your next visit.
              </p>
            </motion.section>

            {/* Third-Party Services */}
            <motion.section
              id="thirdparty"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="rounded-2xl p-2 md:p-8 mt-0"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Third-Party Services
              </h2>
              <p className="text-gray-300 mb-4">
                We use third-party services that may place cookies on your
                device:
              </p>

              <ul className="space-y-3 mb-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    <span className="text-white font-bold">
                      Google Analytics
                    </span>{" "}
                    – Traffic analysis and user behavior
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    <span className="text-white font-bold">
                      Payment Processors
                    </span>{" "}
                    – Transaction security and fraud prevention
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    <span className="text-white font-bold">
                      Marketing Partners
                    </span>{" "}
                    – Ad targeting and campaign analysis
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    <span className="text-white font-bold">
                      Customer Support Tools
                    </span>{" "}
                    – Live chat functionality
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    <span className="text-white font-bold">
                      Security Services
                    </span>{" "}
                    – Fraud detection and threat prevention
                  </span>
                </li>
              </ul>

              <p className="text-gray-300">
                These third parties have their own privacy policies and cookie
                practices. We are not responsible for their use of cookies,
                though we require them to meet our privacy and security
                standards.
              </p>
            </motion.section>

            {/* Opt-Out Options */}
            <motion.section
              id="optout"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="rounded-2xl p-2 md:p-8 mt-0"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Opt-Out Options
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Google Analytics Opt-Out
                  </h3>
                  <p className="text-gray-300">
                    Download the Google Analytics opt-out browser extension to
                    prevent Google from collecting your data.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Advertising Opt-Out
                  </h3>
                  <p className="text-gray-300">
                    Visit the Network Advertising Initiative (NAI) or Digital
                    Advertising Alliance (DAA) opt-out pages to opt out of
                    behavioral advertising.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Do Not Track
                  </h3>
                  <p className="text-gray-300">
                    If your browser supports "Do Not Track" signals, we respect
                    that preference, though not all third parties do.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* How Long Do Cookies Last? */}
            <motion.section
              id="duration"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="rounded-2xl p-2 md:p-8 mt-0"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                How Long Do Cookies Last?
              </h2>

              <ul className="space-y-3 mb-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    <span className="text-white font-bold">
                      Session cookies:
                    </span>{" "}
                    Deleted when you close your browser
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    <span className="text-white font-bold">
                      Essential cookies:
                    </span>{" "}
                    Typically 1-2 years
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    <span className="text-white font-bold">
                      Analytical cookies:
                    </span>{" "}
                    Typically 6 months to 2 years
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    <span className="text-white font-bold">
                      Marketing cookies:
                    </span>{" "}
                    Typically 6 months to 1 year
                  </span>
                </li>
              </ul>

              <p className="text-gray-300">
                We review cookie retention periods regularly and adjust them as
                needed.
              </p>
            </motion.section>

            {/* Data Protection and Security */}
            <motion.section
              id="security"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="rounded-2xl p-2 md:p-8 mt-0"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Data Protection and Security
              </h2>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    All cookies are encrypted during transmission
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    Essential cookies do not store personally identifiable
                    information
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    We use industry-standard security practices to protect
                    cookie data
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    Your cookie preferences are stored securely
                  </span>
                </li>
              </ul>
            </motion.section>

            {/* Updates to This Policy */}
            <motion.section
              id="updates"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="rounded-2xl p-2 md:p-8 mt-0"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Updates to This Policy
              </h2>
              <p className="text-gray-300 mb-4">
                We may update this Cookie Policy from time to time to reflect:
              </p>

              <ul className="space-y-3 mb-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    Changes in our cookie practices
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    New technologies or tools
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    Legal or regulatory requirements
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    Improvements to privacy and security
                  </span>
                </li>
              </ul>

              <p className="text-gray-300">
                We encourage you to review this policy periodically. We will
                notify you of material changes via email or a prominent notice
                on the platform.
              </p>
            </motion.section>

            {/* Contact Us */}
            <motion.section
              id="contact"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="rounded-2xl p-2 md:p-8 mt-0"
            >
              <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-300 mb-6">
                If you have questions or concerns about our use of cookies:
              </p>

              <div className="flex flex-col gap-4 mb-6">
                <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-gray-300">
                    <span className="font-bold">Email:</span>{" "}
                    <a
                      href="mailto:support@moonbet.games"
                      className="text-[#EFD28E] hover:text-[#F07730] transition-colors"
                    >
                      support@moonbet.games
                    </a>
                  </span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-gray-300">
                    <span className="font-bold">Live Chat:</span> 24/7 via{" "}
                    <a
                      href="https://moonbet.games/"
                      className="text-[#EFD28E] hover:text-[#F07730] transition-colors"
                    >
                      Moonbet.games
                    </a>
                  </span>
                </div>
              </div>

              <p className="text-gray-300">
                By using Moonbet.games, you consent to the use of cookies as
                described in this Cookie Policy.
              </p>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
