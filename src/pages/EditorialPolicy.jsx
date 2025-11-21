import React, { useState } from "react";
import { motion } from "framer-motion";

const EditorialPolicy = () => {
  const [activeSection, setActiveSection] = useState("mission");

  // Navigation sections
  const sections = [
    { id: "mission", label: "Our Mission" },
    { id: "guidelines", label: "Content Guidelines" },
    { id: "ugc", label: "User-Generated Content" },
    { id: "review", label: "Content Review Process" },
    { id: "corrections", label: "Corrections and Updates" },
    { id: "sources", label: "Sources and Attribution" },
    { id: "advertising", label: "Advertising and Sponsored Content" },
    { id: "responsible", label: "Responsible Gaming Messaging" },
    { id: "diversity", label: "Diversity and Inclusion" },
    { id: "factchecking", label: "Fact-Checking Standards" },
    { id: "team", label: "Our Editorial Team" },
    { id: "conflicts", label: "Conflicts of Interest" },
    { id: "trust", label: "Reader Trust" },
    { id: "contact", label: "Contact and Feedback" },
    { id: "updates", label: "Policy Updates" },
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
              MOONBET EDITORIAL POLICY
            </h1>

            <p className="text-gray-300 leading-relaxed mt-4">
              At Moonbet, we are committed to publishing high-quality, accurate,
              and ethical content across our website, blog, forums, and
              platforms. This Editorial Policy outlines the standards and
              processes we follow to ensure trust, accuracy, and responsibility
              in all content we create or feature.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-2 md:px-4 py-6 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Desktop Only with orange accent line */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="rounded-2xl p-6">
                <nav className="space-y-2 bg-[rgba(20,20,20,0.80)] shadow-[2px_2px_4px_rgba(0,0,0,0.25)] backdrop-blur-[2px] p-2">
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
                      {/* Orange accent line for active section */}
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
            {/* Our Mission */}
            <motion.section
              id="mission"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="rounded-2xl p-2 md:p-8 mt-0"
            >
              <h2 className="text-xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-300 mb-3">
                Our editorial mission is to provide players with:
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    Accurate information about our platform, games, and features
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    Transparent disclosures about promotions, bonuses, and
                    partnerships
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    Helpful guidance on responsible gaming and blockchain
                    technology
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    Trustworthy reviews and comparisons based on facts, not
                    commercial interests
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    Ethical content that respects player privacy and safety
                  </span>
                </li>
              </ul>
            </motion.section>

            {/* Content Guidelines */}
            <motion.section
              id="guidelines"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="rounded-2xl p-2 md:p-8 mt-0"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Content Guidelines
              </h2>
              <p className="text-gray-300 mb-4">All Moonbet content must:</p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Be Factual and Well-Researched
                  </h3>
                  <p className="text-gray-300">
                    All claims are supported by data, third-party sources, or
                    our own verified experience. We attribute sources clearly
                    and link to external references where appropriate.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Comply with Laws and Regulations
                  </h3>
                  <p className="text-gray-300">
                    All content adheres to applicable federal and state laws,
                    gambling regulations, advertising standards (FTC guidelines,
                    state gaming laws), and platform policies. We do not promote
                    illegal gambling or unregulated platforms.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Respect Intellectual Property
                  </h3>
                  <p className="text-gray-300">
                    We obtain proper permissions and licenses for all images,
                    videos, music, and third-party content. We credit creators
                    and respect copyright protections.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Avoid Harmful Content
                  </h3>
                  <p className="text-gray-300 mb-3">
                    We prohibit content containing:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Hate speech, discrimination, or derogatory language
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Obscene or sexually explicit material
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Defamatory statements or false accusations
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Content promoting illegal activities
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Misleading health or financial claims
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Disclose Conflicts of Interest
                  </h3>
                  <p className="text-gray-300 mb-3">
                    We transparently disclose:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Sponsored content and paid partnerships
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Affiliate relationships and compensation
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Internal reviews or featured products
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Any potential conflicts with commercial interests
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Promote Responsible Gaming
                  </h3>
                  <p className="text-gray-300 mb-3">
                    All content about gambling includes:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Warnings that gambling carries risk of financial loss
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Information on responsible gaming tools (limits,
                        self-exclusion)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Resources for problem gambling support
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        No claims of "guaranteed" or "sure" wins
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    No Misleading Language
                  </h3>
                  <p className="text-gray-300 mb-3">We do not use:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        "Guaranteed returns" or "can't-lose" claims
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        False promises of easy money or consistent profits
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Sensationalized or manipulative language
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Misleading odds or payout representations
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* User-Generated Content */}
            <motion.section
              id="ugc"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="rounded-2xl p-2 md:p-8 mt-0"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                User-Generated Content
              </h2>
              <p className="text-gray-300 mb-4">
                We accept user submissions including reviews, forum posts,
                comments, and articles. However:
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    <span className="text-white font-bold">
                      Editorial Control:
                    </span>{" "}
                    Moonbet reserves full editorial discretion to modify,
                    reject, or remove submissions
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    <span className="text-white font-bold">
                      Guidelines Apply:
                    </span>{" "}
                    All submissions must comply with the Content Guidelines
                    above
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    <span className="text-white font-bold">Moderation:</span>{" "}
                    Submissions are reviewed for accuracy, safety, and
                    appropriateness
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    <span className="text-white font-bold">Removal:</span>{" "}
                    Violating content is removed without notice
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    <span className="text-white font-bold">Attribution:</span>{" "}
                    User content is properly attributed unless anonymity is
                    requested
                  </span>
                </li>
              </ul>
            </motion.section>

            {/* Content Review Process */}
            <motion.section
              id="review"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="rounded-2xl p-2 md:p-8 mt-0"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Content Review Process
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Before Publication
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Fact-Checking:
                        </span>{" "}
                        All claims are verified against credible sources
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Accuracy Review:
                        </span>{" "}
                        Information is reviewed for accuracy and completeness
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Compliance Check:
                        </span>{" "}
                        Content is verified for legal and regulatory compliance
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Appropriateness Review:
                        </span>{" "}
                        Content is assessed for tone, safety, and brand
                        alignment
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Editor Approval:
                        </span>{" "}
                        Senior editors approve all content before publication
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Peer Review
                  </h3>
                  <p className="text-gray-300">
                    Where appropriate, content is reviewed by multiple team
                    members to ensure quality and objectivity.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Timing</h3>
                  <p className="text-gray-300">
                    We aim to complete review within 2-5 business days, with
                    urgent content expedited as needed.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Corrections and Updates */}
            <motion.section
              id="corrections"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="rounded-2xl p-2 md:p-8 mt-0"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Corrections and Updates
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Error Correction
                  </h3>
                  <p className="text-gray-300 mb-3">
                    If factual errors are identified, we will:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Correct the information promptly
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Note the correction transparently (with date and
                        explanation if material)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Notify readers if appropriate
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Update linked references
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Content Updates
                  </h3>
                  <p className="text-gray-300 mb-3">
                    Published content is periodically reviewed and updated to:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Maintain accuracy and relevance
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Reflect new information or regulatory changes
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Incorporate reader feedback
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Update outdated links or references
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Reader Feedback
                  </h3>
                  <p className="text-gray-300 mb-3">
                    We encourage readers to report errors, outdated information,
                    or concerns. Email{" "}
                    <a
                      href="mailto:support@moonbet.games"
                      className="text-[#EFD28E] hover:text-[#F07730] transition-colors"
                    >
                      support@moonbet.games
                    </a>{" "}
                    with:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        The article title/URL
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        The specific error or concern
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Supporting information
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Suggested correction
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Sources and Attribution */}
            <motion.section
              id="sources"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="rounded-2xl p-2 md:p-8 mt-0"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Sources and Attribution
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Credible Sources
                  </h3>
                  <p className="text-gray-300 mb-3">We rely on:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        First-hand experience and testing
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Third-party certifications and audits
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Academic research and studies
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Industry publications and reports
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Government and regulatory sources
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Direct quotes from authoritative figures
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Attribution
                  </h3>
                  <p className="text-gray-300 mb-3">
                    All external sources are:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Clearly cited in the text or footnotes
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Linked to whenever possible
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Credited appropriately (author, publication, date)
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Quotes and References
                  </h3>
                  <p className="text-gray-300">
                    Direct quotes are used accurately and in context. We link to
                    original sources where feasible.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Advertising and Sponsored Content */}
            <motion.section
              id="advertising"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="rounded-2xl p-2 md:p-8 mt-0"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Advertising and Sponsored Content
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Clear Labeling
                  </h3>
                  <p className="text-gray-300 mb-3">
                    All sponsored content, paid promotions, and affiliate links
                    are clearly labeled as:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">"Sponsored"</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">"Advertisement"</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">"Paid Partnership"</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">"Affiliate Link"</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Disclaimer
                  </h3>
                  <p className="text-gray-300">
                    Sponsored content includes a clear disclaimer explaining the
                    commercial relationship.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Editorial Independence
                  </h3>
                  <p className="text-gray-300">
                    Paid partnerships do not influence our editorial standards
                    or recommendations. Commercial interests never override
                    editorial integrity.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    No Native Advertising
                  </h3>
                  <p className="text-gray-300">
                    We do not use deceptive "native advertising" formats that
                    blur the line between editorial and advertising content.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Responsible Gaming Messaging */}
            <motion.section
              id="responsible"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="rounded-2xl p-2 md:p-8 mt-0"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Responsible Gaming Messaging
              </h2>
              <p className="text-gray-300 mb-3">
                All gaming-related content includes:
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    <span className="text-white font-bold">Age Reminder:</span>{" "}
                    "18+ only. Must be of legal age to gamble in your
                    jurisdiction."
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    <span className="text-white font-bold">
                      Risk Disclosure:
                    </span>{" "}
                    "Gambling involves risk of financial loss. Play
                    responsibly."
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    <span className="text-white font-bold">
                      Resource Links:
                    </span>{" "}
                    Information on self-exclusion, deposit limits, and support
                    services
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    <span className="text-white font-bold">No Hype:</span>{" "}
                    Gambling is presented as entertainment, not a money-making
                    opportunity
                  </span>
                </li>
              </ul>
            </motion.section>

            {/* Diversity and Inclusion */}
            <motion.section
              id="diversity"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="rounded-2xl p-2 md:p-8 mt-0"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Diversity and Inclusion
              </h2>
              <p className="text-gray-300 mb-3">
                Our content team reflects diverse perspectives and experiences.
                We:
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    Avoid stereotyping or discriminatory language
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    Include diverse voices and viewpoints
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    Respect cultural differences and sensitivities
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    Challenge biases and promote inclusive content
                  </span>
                </li>
              </ul>
            </motion.section>

            {/* Fact-Checking Standards */}
            <motion.section
              id="factchecking"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="rounded-2xl p-2 md:p-8 mt-0"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Fact-Checking Standards
              </h2>
              <p className="text-gray-300 mb-4">
                We adhere to rigorous fact-checking procedures:
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Multiple Sources
                  </h3>
                  <p className="text-gray-300">
                    Claims are verified against multiple credible, independent
                    sources.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Expert Consultation
                  </h3>
                  <p className="text-gray-300">
                    Complex topics are reviewed by subject matter experts
                    (blockchain specialists, responsible gambling counselors,
                    etc.).
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Data Verification
                  </h3>
                  <p className="text-gray-300">
                    Statistics and data are traced to original sources and
                    cross-referenced.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Transparency
                  </h3>
                  <p className="text-gray-300">
                    Our fact-checking methods are transparent and accessible to
                    readers.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Our Editorial Team */}
            <motion.section
              id="team"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="rounded-2xl p-2 md:p-8 mt-0"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Our Editorial Team
              </h2>
              <p className="text-gray-300 mb-3">Our editorial team includes:</p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    Gaming industry experts and veterans
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    Blockchain and cryptocurrency specialists
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    Responsible gambling advocates
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    Writers with journalism experience
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    Subject matter experts for specialized topics
                  </span>
                </li>
              </ul>

              <h3 className="text-lg font-bold text-white mb-3">
                Expertise Requirements
              </h3>
              <p className="text-gray-300">
                Team members are hired based on their knowledge, experience, and
                commitment to ethical content creation.
              </p>
            </motion.section>

            {/* Conflicts of Interest */}
            <motion.section
              id="conflicts"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="rounded-2xl p-2 md:p-8 mt-0"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Conflicts of Interest
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Disclosure
                  </h3>
                  <p className="text-gray-300">
                    All conflicts of interest (financial, personal,
                    professional) are disclosed to the Editor-in-Chief.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Recusal</h3>
                  <p className="text-gray-300">
                    Team members recuse themselves from editorial decisions
                    where conflicts exist.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Transparency
                  </h3>
                  <p className="text-gray-300">
                    Material conflicts are disclosed to readers where
                    appropriate.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Reader Trust */}
            <motion.section
              id="trust"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="rounded-2xl p-2 md:p-8 mt-0"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Reader Trust
              </h2>
              <p className="text-gray-300 mb-3">
                Our overarching commitment is to our readers. All editorial
                decisions prioritize:
              </p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    <span className="text-white font-bold">Truthfulness:</span>{" "}
                    Honesty and accuracy above all
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    <span className="text-white font-bold">Fairness:</span>{" "}
                    Balanced, unbiased information
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    <span className="text-white font-bold">Clarity:</span>{" "}
                    Content that's understandable and useful
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    <span className="text-white font-bold">Safety:</span>{" "}
                    Responsible messaging and player protection
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    <span className="text-white font-bold">Trust:</span>{" "}
                    Building and maintaining reader confidence
                  </span>
                </li>
              </ul>
            </motion.section>

            {/* Contact and Feedback */}
            <motion.section
              id="contact"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="rounded-2xl p-2 md:p-8 mt-0"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Contact and Feedback
              </h2>
              <p className="text-gray-300 mb-4">
                We welcome reader feedback to improve our content and editorial
                practices:
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Report Errors or Concerns
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">Email:</span>{" "}
                        <a
                          href="mailto:support@moonbet.games"
                          className="text-[#EFD28E] hover:text-[#F07730] transition-colors"
                        >
                          support@moonbet.games
                        </a>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">Subject:</span>{" "}
                        [Article Title] – Error Report or Feedback
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Include specific issue, supporting information, and
                        suggested correction
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    General Feedback
                  </h3>
                  <p className="text-gray-300">
                    <span className="text-white font-bold">Live Chat:</span>{" "}
                    24/7 via{" "}
                    <a
                      href="https://moonbet.games/"
                      className="text-[#EFD28E] hover:text-[#F07730] transition-colors"
                    >
                      Moonbet.games
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    Response Time
                  </h3>
                  <p className="text-gray-300">
                    We aim to respond to feedback within 2-3 business days.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Policy Updates */}
            <motion.section
              id="updates"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="rounded-2xl p-2 md:p-8 mt-0"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Policy Updates
              </h2>
              <p className="text-gray-300 mb-4">
                This Editorial Policy is reviewed annually and updated as needed
                to reflect:
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    Changes in industry standards
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">Regulatory developments</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    Technological advancements
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300">
                    Reader feedback and evolving best practices
                  </span>
                </li>
              </ul>

              <p className="text-gray-300 mb-6">
                Material changes are communicated to our audience.
              </p>

              <p className="text-gray-300 font-bold">
                At Moonbet, editorial integrity is non-negotiable. We are
                committed to earning and maintaining your trust through
                accurate, ethical, and responsible content.
              </p>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorialPolicy;
