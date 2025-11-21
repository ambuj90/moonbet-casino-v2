import React, { useState } from "react";
import { motion } from "framer-motion";

const MoonbetAccessibility = () => {
  const [activeSection, setActiveSection] = useState("commitment");

  // Navigation sections
  const sections = [
    { id: "commitment", label: "Our Commitment" },
    { id: "compatibility", label: "Website Compatibility" },
    { id: "content", label: "Accessible Content" },
    { id: "navigation", label: "Navigation and Usability" },
    { id: "web3", label: "Cryptocurrency and Web3 Accessibility" },
    { id: "testing", label: "User Experience Testing" },
    { id: "accommodation", label: "Accommodation Requests and Support" },
    { id: "feedback", label: "Feedback and Issue Reporting" },
    { id: "thirdparty", label: "Third-Party Content" },
    { id: "technical", label: "Technical Documentation" },
    { id: "limitations", label: "Known Limitations" },
    { id: "improvement", label: "Our Commitment to Improvement" },
    { id: "legal", label: "Legal Compliance" },
    { id: "contact", label: "Contact Information" },
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
    <div className="min-h-screen bg-[#080808]">
      {/* Hero Section */}
      <section className="relative py-16 px-4 border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F07730]/10 via-transparent to-[#EFD28E]/10" />
        <div className="container max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-2xl md:text-2xl font-bold mb-6">
              MOONBET ACCESSIBILITY STATEMENT
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-2 md:px-4 py-6 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Desktop Only */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className=" rounded-2xl p-6">
                <p className="text-lg font-bold text-white mb-4">
                  Quick Navigation
                </p>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all flex items-center gap-2
                               ${
                                 activeSection === section.id
                                   ? "bg-[#F07730]/20 text-[#F07730]"
                                   : "text-gray-400 hover:bg-white/5 hover:text-white"
                               }`}
                    >
                      <span>{section.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            {/* Section: Our Commitment */}
            <motion.section
              id="commitment"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className=" rounded-2xl p-2 md:p-8"
            >
              <p className="text-3xl font-bold text-white mb-4">
                Our Commitment
              </p>

              <div className="space-y-4">
                <p className="text-gray-300">
                  At Moonbet, we are committed to making our website and
                  platform accessible to individuals with disabilities. We
                  believe that accessibility is both a legal obligation and a
                  moral imperative. We aim to meet or exceed internationally
                  recognized best practices and guidelines, including:
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Web Content Accessibility Guidelines (WCAG) 2.1 Level AA
                      </span>{" "}
                      - The industry standard for web accessibility
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Americans with Disabilities Act (ADA) Standards
                      </span>{" "}
                      - Ensuring compliance with U.S. disability rights
                      legislation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">EN 301 549</span> -
                      European accessibility requirements for Information and
                      Communication Technology (ICT)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Section 508 of the Rehabilitation Act
                      </span>{" "}
                      - U.S. federal accessibility standards
                    </span>
                  </li>
                </ul>
              </div>
            </motion.section>

            {/* Section: Website Compatibility */}
            <motion.section
              id="compatibility"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className=" rounded-2xl p-2 md:p-8"
            >
              <p className="text-3xl font-bold text-white mb-4">
                Website Compatibility
              </p>

              <div className="space-y-4">
                <p className="text-gray-300">
                  We design and develop Moonbet.games to be compatible with
                  current and future assistive technologies and accessibility
                  tools, including:
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      Screen readers (NVDA, JAWS, VoiceOver, TalkBack)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      Speech recognition software (Dragon NaturallySpeaking,
                      built-in OS voice control)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      Keyboard navigation (full keyboard-only access without
                      mouse required)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      Voice control interfaces (voice commands for navigation
                      and interaction)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      Text magnification and high-contrast settings (supporting
                      browser zoom and custom stylesheets)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      Mobile accessibility features (built-in accessibility
                      features in iOS and Android)
                    </span>
                  </li>
                </ul>
              </div>
            </motion.section>

            {/* Section: Accessible Content */}
            <motion.section
              id="content"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className=" rounded-2xl p-2 md:p-8"
            >
              <p className="text-3xl font-bold text-white mb-4">
                Accessible Content
              </p>

              <div className="space-y-4">
                <p className="text-gray-300">Our platform provides:</p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Text alternatives for non-text content
                      </span>{" "}
                      - Alt text for images, icons, and visual information
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Proper heading and link structure
                      </span>{" "}
                      - Logical page hierarchy and descriptive link labels
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Adjustable text sizing and contrast ratios
                      </span>{" "}
                      - Support for resizing text up to 200% and sufficient
                      color contrast (WCAG AA standards)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Descriptive labels for form fields
                      </span>{" "}
                      - Clear, associated labels for all input elements
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Captions and transcripts for video/audio content
                      </span>{" "}
                      - Where applicable, video content includes captions and
                      audio transcripts
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Seizure prevention
                      </span>{" "}
                      - Avoidance of content that flashes or flickers at rates
                      that could trigger seizures (no more than 3 flashes per
                      second)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Clear language and readability
                      </span>{" "}
                      - Simple, direct language; avoided jargon where possible
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Logical tab order
                      </span>{" "}
                      - Keyboard navigation follows a logical, intuitive
                      sequence
                    </span>
                  </li>
                </ul>
              </div>
            </motion.section>

            {/* Section: Navigation and Usability */}
            <motion.section
              id="navigation"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className=" rounded-2xl p-2 md:p-8"
            >
              <p className="text-3xl font-bold text-white mb-4">
                Navigation and Usability
              </p>

              <div className="space-y-4">
                <p className="text-gray-300">
                  Moonbet's platform is designed for intuitive navigation:
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Consistent navigation elements
                      </span>{" "}
                      - Navigation menus and controls appear in consistent
                      locations across all pages
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Clear page titles and section headings
                      </span>{" "}
                      - Every page and section has a descriptive title or
                      heading
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Breadcrumb navigation
                      </span>{" "}
                      - Users can understand their location within the site
                      structure
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">Skip links</span> -
                      "Skip to main content" links allow users to bypass
                      repetitive navigation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Focus indicators
                      </span>{" "}
                      - Keyboard users can clearly see which element currently
                      has focus
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Descriptive links
                      </span>{" "}
                      - Link text clearly describes where the link leads (not
                      just "click here")
                    </span>
                  </li>
                </ul>
              </div>
            </motion.section>

            {/* Section: Cryptocurrency and Web3 Accessibility */}
            <motion.section
              id="web3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className=" rounded-2xl p-2 md:p-8"
            >
              <p className="text-3xl font-bold text-white mb-4">
                Cryptocurrency and Web3 Accessibility
              </p>

              <div className="space-y-4">
                <p className="text-gray-300">
                  Given that Moonbet operates on blockchain networks and uses
                  Web3 wallet integration, we recognize additional accessibility
                  considerations:
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Wallet compatibility
                      </span>{" "}
                      - Support for major wallet providers with accessibility
                      features
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Transaction confirmations
                      </span>{" "}
                      - Clear, simple presentation of wallet connection and
                      transaction approval screens
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Blockchain data accessibility
                      </span>{" "}
                      - On-chain verification tools are provided with text
                      descriptions and explanations, not just visual
                      representations
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Technical documentation
                      </span>{" "}
                      - Clear, accessible guides for users to understand
                      provably fair verification and blockchain operations
                    </span>
                  </li>
                </ul>
              </div>
            </motion.section>

            {/* Section: User Experience Testing */}
            <motion.section
              id="testing"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className=" rounded-2xl p-2 md:p-8"
            >
              <p className="text-3xl font-bold text-white mb-4">
                User Experience Testing
              </p>

              <div className="space-y-4">
                <p className="text-gray-300">
                  We regularly audit our user experience and interfaces to
                  identify and eliminate accessibility barriers:
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Manual testing
                      </span>{" "}
                      - Accessibility specialists test the platform using screen
                      readers and keyboard navigation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Automated testing
                      </span>{" "}
                      - Tools like WAVE, Axe, and Lighthouse identify
                      accessibility issues
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Testing with assistive technologies
                      </span>{" "}
                      - Regular testing with actual assistive technology users
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        User feedback integration
                      </span>{" "}
                      - We gather feedback from users with disabilities and
                      incorporate their insights
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Ongoing monitoring
                      </span>{" "}
                      - Continuous monitoring identifies new accessibility
                      issues as the platform evolves
                    </span>
                  </li>
                </ul>

                <p className="text-gray-300 mt-4">
                  Any accessibility barriers identified are promptly addressed
                  through bug fixes, feature updates, or implementation of
                  workarounds.
                </p>
              </div>
            </motion.section>

            {/* Section: Accommodation Requests and Support */}
            <motion.section
              id="accommodation"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className=" rounded-2xl p-2 md:p-8"
            >
              <p className="text-3xl font-bold text-white mb-4">
                Accommodation Requests and Support
              </p>

              <div className="space-y-4">
                <p className="text-gray-300">
                  For users who need specific accommodations or who encounter
                  accessibility barriers:
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Email us directly:
                      </span>{" "}
                      <a
                        href="mailto:accessibility@moonbet.games"
                        className="text-[#F07730] underline hover:text-[#EFD28E]"
                      >
                        accessibility@moonbet.games
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Live chat support:
                      </span>{" "}
                      Available 24/7 via the Moonbet platform with trained
                      support staff ready to assist
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Support team:
                      </span>{" "}
                      Our customer support team at{" "}
                      <a
                        href="mailto:support@moonbet.games"
                        className="text-[#F07730] underline hover:text-[#EFD28E]"
                      >
                        support@moonbet.games
                      </a>{" "}
                      can assist with accessibility-related questions or
                      concerns
                    </span>
                  </li>
                </ul>

                <p className="text-gray-300 mt-4">
                  We will work with you to identify and implement reasonable
                  accommodations. Response time for accommodation requests is
                  typically within 24-48 hours.
                </p>
              </div>
            </motion.section>

            {/* Section: Feedback and Issue Reporting */}
            <motion.section
              id="feedback"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className=" rounded-2xl p-2 md:p-8"
            >
              <p className="text-3xl font-bold text-white mb-4">
                Feedback and Issue Reporting
              </p>

              <div className="space-y-4">
                <p className="text-gray-300">
                  We welcome feedback on how to improve Moonbet's accessibility.
                  Please report:
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      Accessibility issues or barriers you encounter
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      Suggestions for improving accessibility
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      Feedback on how well our platform works with your
                      assistive technology
                    </span>
                  </li>
                </ul>

                <p className="text-gray-300 mt-4">
                  Report accessibility issues through:
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Dedicated accessibility email:
                      </span>{" "}
                      <a
                        href="mailto:support@moonbet.games"
                        className="text-[#F07730] underline hover:text-[#EFD28E]"
                      >
                        support@moonbet.games
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">Live chat:</span>{" "}
                      24/7 accessible via the platform
                    </span>
                  </li>
                </ul>

                <p className="text-gray-300 mt-4">
                  Include as much detail as possible, including:
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      The page or feature you were accessing
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      The specific issue or barrier encountered
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      Your assistive technology (if applicable)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      Steps to reproduce the issue
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      Suggested solutions (if you have them)
                    </span>
                  </li>
                </ul>

                <p className="text-gray-300 mt-4">
                  All accessibility feedback is reviewed promptly, and we
                  prioritize fixes based on impact and scope.
                </p>
              </div>
            </motion.section>

            {/* Section: Third-Party Content */}
            <motion.section
              id="thirdparty"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className=" rounded-2xl p-2 md:p-8"
            >
              <p className="text-3xl font-bold text-white mb-4">
                Third-Party Content
              </p>

              <div className="space-y-4">
                <p className="text-gray-300">
                  While we strive to ensure all content on Moonbet is
                  accessible, some content may be provided by third parties,
                  such as:
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      Game providers and software developers
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">Payment processors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">Analytics services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">Marketing partners</span>
                  </li>
                </ul>

                <p className="text-gray-300 mt-4">
                  We work with third-party providers to ensure their content and
                  services meet accessibility standards. However, we recognize
                  that some accessibility limitations may exist in third-party
                  integrations. If you encounter accessibility issues with
                  third-party content, please report them through the channels
                  above, and we will work with the provider to resolve the
                  issue.
                </p>
              </div>
            </motion.section>

            {/* Section: Technical Documentation */}
            <motion.section
              id="technical"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className=" rounded-2xl p-2 md:p-8"
            >
              <p className="text-3xl font-bold text-white mb-4">
                Technical Documentation
              </p>

              <div className="space-y-4">
                <p className="text-gray-300">
                  Technical documentation, API documentation, and developer
                  resources are designed to be accessible:
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      Clear, simple language
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      Logical structure and heading hierarchy
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      Code samples with comments
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      High contrast and readable formatting
                    </span>
                  </li>
                </ul>
              </div>
            </motion.section>

            {/* Section: Known Limitations */}
            <motion.section
              id="limitations"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className=" rounded-2xl p-2 md:p-8"
            >
              <p className="text-3xl font-bold text-white mb-4">
                Known Limitations
              </p>

              <div className="space-y-4">
                <p className="text-gray-300">
                  While we are committed to maximizing accessibility, some
                  limitations may exist:
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Complex data visualizations
                      </span>{" "}
                      - Some game outcome charts or analytics may be challenging
                      to interpret via screen reader; we provide text-based
                      alternatives where possible
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Real-time gaming interactions
                      </span>{" "}
                      - Live dealer games and time-sensitive games may present
                      challenges for users relying on voice control or other
                      speech-based interfaces; we provide real-time audio/text
                      updates where feasible
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Third-party wallet integrations
                      </span>{" "}
                      - Some cryptocurrency wallet providers may have
                      accessibility limitations outside Moonbet's control; we
                      work with wallet providers to address these
                    </span>
                  </li>
                </ul>

                <p className="text-gray-300 mt-4">
                  We continuously work to address these limitations and
                  appreciate your patience as we improve.
                </p>
              </div>
            </motion.section>

            {/* Section: Our Commitment to Improvement */}
            <motion.section
              id="improvement"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className=" rounded-2xl p-2 md:p-8"
            >
              <p className="text-3xl font-bold text-white mb-4">
                Our Commitment to Improvement
              </p>

              <div className="space-y-4">
                <p className="text-gray-300">
                  Accessibility is an ongoing journey, not a destination. We are
                  committed to:
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      Regular audits and testing for accessibility compliance
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      Staying updated on WCAG guidelines and best practices
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      Gathering feedback from users with disabilities and
                      incorporating their input
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      Training staff on accessibility principles and best
                      practices
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      Investing in accessibility improvements as part of
                      platform development
                    </span>
                  </li>
                </ul>
              </div>
            </motion.section>

            {/* Section: Legal Compliance */}
            <motion.section
              id="legal"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className=" rounded-2xl p-2 md:p-8"
            >
              <p className="text-3xl font-bold text-white mb-4">
                Legal Compliance
              </p>

              <div className="space-y-4">
                <p className="text-gray-300">
                  Moonbet is committed to complying with all applicable
                  accessibility laws and regulations, including the Americans
                  with Disabilities Act (ADA), Section 508 of the Rehabilitation
                  Act, the Web Content Accessibility Guidelines (WCAG), and
                  other applicable laws in jurisdictions where we operate.
                </p>
              </div>
            </motion.section>

            {/* Section: Contact Information */}
            <motion.section
              id="contact"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className=" rounded-2xl p-2 md:p-8"
            >
              <p className="text-3xl font-bold text-white mb-4">
                Contact Information
              </p>

              <div className="space-y-4">
                <p className="text-gray-300">
                  For accessibility-related inquiries, accommodations, or
                  feedback:
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        General Support:
                      </span>{" "}
                      <a
                        href="mailto:support@moonbet.games"
                        className="text-[#F07730] underline hover:text-[#EFD28E]"
                      >
                        support@moonbet.games
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Live Chat Support:
                      </span>{" "}
                      24/7 via Moonbet.games
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#F07730] mt-1">•</span>
                    <span className="text-gray-300">
                      <span className="text-white font-bold">
                        Response Time:
                      </span>{" "}
                      We aim to respond to all accessibility inquiries within
                      24-48 hours.
                    </span>
                  </li>
                </ul>
              </div>
            </motion.section>

            {/* Final Note - Acknowledgment */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="bg-gradient-to-r from-[#F07730]/20 to-[#EFD28E]/20 rounded-2xl p-6 md:p-8 border border-[#F07730]/30"
            >
              <p className="text-xl font-bold text-white mb-4 text-center">
                Acknowledgment
              </p>
              <p className="text-gray-300 text-center">
                We recognize that no website is perfectly accessible, and
                accessibility is an evolving area of focus. We appreciate your
                partnership as we work to make Moonbet as accessible as possible
                for all users. Your feedback helps us identify areas for
                improvement and ensures we are serving our entire community
                effectively.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoonbetAccessibility;
