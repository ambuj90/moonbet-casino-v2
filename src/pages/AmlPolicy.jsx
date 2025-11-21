import React, { useState } from "react";
import { motion } from "framer-motion";

const AmlPolicy = () => {
  const [activeSection, setActiveSection] = useState("general");

  // Navigation sections
  const sections = [
    { id: "general", label: "1. General Provisions" },
    { id: "risk", label: "2. Risk-Based Approach" },
    { id: "identification", label: "3. Customer Identification" },
    { id: "edd", label: "4. Enhanced Due Diligence" },
    { id: "ongoing", label: "5. Ongoing Due Diligence" },
    { id: "suspicious", label: "6. Suspicious Activity" },
    { id: "monitoring", label: "7. Transaction Monitoring" },
    { id: "training", label: "8. Employee Training" },
    { id: "records", label: "9. Record Keeping" },
    { id: "sanctions", label: "10. Sanctions Screening" },
    { id: "peps", label: "11. Politically Exposed Persons" },
    { id: "review", label: "12. Policy Review" },
    { id: "contact", label: "13. Contact and Reporting" },
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
      <section className="relative py-8 md:py-16 px-4 border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F07730]/10 via-transparent to-[#EFD28E]/10" />
        <div className="container max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-2xl md:text-2xl font-bold mb-2 md:mb-6">
              ANTI-MONEY LAUNDERING (AML) POLICY
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
            {/* Section 1: General Provisions */}
            <motion.section
              id="general"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className=" rounded-2xl p-2 md:p-8"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                1. GENERAL PROVISIONS
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    1.1 Policy Overview
                  </h3>
                  <p className="text-gray-300">
                    Moonbet Games LLC (the "Company") is committed to preventing
                    money laundering, terrorist financing, and other financial
                    crimes. This Anti-Money Laundering and Counter-Terrorist
                    Financing Policy (the "Policy") establishes procedures for
                    implementing requirements under applicable AML/CFT laws and
                    regulations.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    1.2 Company Information
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Legal Name:
                        </span>{" "}
                        Moonbet Games LLC
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">Business:</span>{" "}
                        Online cryptocurrency gaming and casino services
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">Platform:</span>{" "}
                        Moonbet.games and associated applications
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Regulatory Oversight:
                        </span>{" "}
                        [To be provided]
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    1.3 Policy Scope
                  </h3>
                  <p className="text-gray-300">
                    This Policy applies to all customers, employees,
                    contractors, and business partners. It governs customer
                    onboarding, ongoing monitoring, transaction verification,
                    and suspicious activity reporting.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    1.4 Compliance Framework
                  </h3>
                  <p className="text-gray-300 mb-3">This Policy aligns with:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Applicable US federal AML/CFT laws (Trafficking Victims
                        Protection Act, Bank Secrecy Act provisions)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Financial Action Task Force (FATF) recommendations
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        FinCEN guidance on cryptocurrency and virtual asset
                        service providers
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        State-level AML requirements
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 2: Risk-Based Approach */}
            <motion.section
              id="risk"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className=" rounded-2xl p-2 md:p-8"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                2. RISK-BASED APPROACH
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    2.1 Inherent Risk
                  </h3>
                  <p className="text-gray-300">
                    The cryptocurrency gaming industry poses significant risk
                    for money laundering and terrorist financing. Moonbet
                    implements a risk-based approach to mitigate these risks.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    2.2 Customer Risk Classification
                  </h3>
                  <p className="text-gray-300 mb-3">
                    Customers are classified into three risk categories:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">Low Risk:</span>{" "}
                        No identified risk factors
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Medium Risk:
                        </span>{" "}
                        One risk factor identified; Enhanced Due Diligence (EDD)
                        applied
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">High Risk:</span>{" "}
                        Two or more risk factors identified; business
                        relationship declined
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    2.3 Risk Factors
                  </h3>
                  <p className="text-gray-300 mb-3">Risk factors include:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Adverse Media:
                        </span>{" "}
                        Customer linked to terrorism, financial crimes,
                        violence, narcotics, cybercrime, fraud
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Politically Exposed Persons (PEPs):
                        </span>{" "}
                        Customer or close associates hold prominent public
                        positions
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Sanctions Lists:
                        </span>{" "}
                        Customer appears on OFAC or other sanctions lists
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          High-Risk Jurisdictions:
                        </span>{" "}
                        Customer located in FATF-identified high-risk countries
                        or regions subject to increased monitoring
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    2.4 Risk Assessment Timeline
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Customers are classified as Low Risk by default
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Risk assessment completed during onboarding
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Classification documented and reviewed regularly
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 3: Customer Identification and Onboarding */}
            <motion.section
              id="identification"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className=" rounded-2xl p-2 md:p-8"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                3. CUSTOMER IDENTIFICATION AND ONBOARDING
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    3.1 Remote Identification
                  </h3>
                  <p className="text-gray-300 mb-3">
                    Moonbet conducts remote customer identification using:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Online application with personal data
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Government-issued ID verification
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Address verification
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Beneficial ownership verification (where applicable)
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    3.2 Required Information
                  </h3>
                  <p className="text-gray-300 mb-3">Customers provide:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">Full legal name</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">Date of birth</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">Full address</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Contact details (phone and email)
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    3.3 Identity Verification Documents
                  </h3>
                  <p className="text-gray-300 mb-3">
                    Acceptable documents include:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Copy of national ID card, passport, or driver's license
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Utility bill (not older than 6 months)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Bank statement (not older than 6 months)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Other documents as required by the Company
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    3.4 Verification Process
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Scanned copies or high-quality photos required
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Full name verified against identity documents
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Account closed if information does not match
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Account closed if customer is underage or
                        gambling-prohibited
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        All documents stored securely for 5+ years
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    3.5 Business Relationship Establishment
                  </h3>
                  <p className="text-gray-300 mb-3">
                    Business relationship established only after:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Customer identification completed
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Risk classification determined
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Enhanced Due Diligence (if required) completed
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Appropriate approvals obtained
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 4: Enhanced Due Diligence */}
            <motion.section
              id="edd"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className=" rounded-2xl p-2 md:p-8"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                4. ENHANCED DUE DILIGENCE (EDD)
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    4.1 EDD Triggers
                  </h3>
                  <p className="text-gray-300 mb-3">
                    Enhanced Due Diligence required for:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Medium Risk customers (one risk factor identified)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Large transactions or unusual patterns
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Customers in elevated-risk jurisdictions
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        PEPs and close associates
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    4.2 EDD Procedures
                  </h3>
                  <p className="text-gray-300 mb-3">EDD measures include:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Request for additional information and documentation
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Verification of source of funds and source of wealth
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Senior manager approval required
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Collection of business relationship documentation
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Risk mitigation assessment
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    4.3 EDD Decisions
                  </h3>
                  <p className="text-gray-300 mb-3">Following EDD:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Business relationship approved if risk adequately
                        mitigated
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Business relationship declined if customer fails to
                        provide documentation or risk cannot be mitigated
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Customer notified in writing of decision
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    4.4 High-Risk Customer Policy
                  </h3>
                  <p className="text-gray-300 mb-3">
                    Customers classified as High Risk (two or more risk
                    factors):
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Business relationship automatically declined
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Customer notified in writing
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Record maintained in compliance registry
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 5: Ongoing Due Diligence */}
            <motion.section
              id="ongoing"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className=" rounded-2xl p-2 md:p-8"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                5. ONGOING DUE DILIGENCE
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    5.1 Continuous Monitoring
                  </h3>
                  <p className="text-gray-300 mb-3">
                    Moonbet maintains ongoing monitoring of all customers:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Transaction patterns and amounts
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Frequency of deposits and withdrawals
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Gaming behavior and patterns
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Account activity consistency with customer profile
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    5.2 Data Updates
                  </h3>
                  <p className="text-gray-300 mb-3">
                    Customer data and documentation updated:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Low Risk customers: At least every 24 months
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Medium/High Risk customers: At least every 12 months
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Upon customer request
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        When risk factors change
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    5.3 Monitoring Frequency
                  </h3>
                  <p className="text-gray-300 mb-3">
                    Real-time automated monitoring:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Unusual transaction detection
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Pattern anomaly identification
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Risk score recalculation
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Alert generation for manual review
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    5.4 Account Termination
                  </h3>
                  <p className="text-gray-300 mb-3">
                    Moonbet may terminate business relationships if:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Customer fails to provide updated documentation
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Risk factors change negatively
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Suspicious activity detected
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Customer becomes prohibited from gambling
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Legal or regulatory requirements dictate termination
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 6: Suspicious Activity Detection and Reporting */}
            <motion.section
              id="suspicious"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className=" rounded-2xl p-2 md:p-8"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                6. SUSPICIOUS ACTIVITY DETECTION AND REPORTING
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    6.1 Suspicious Transaction Indicators
                  </h3>
                  <p className="text-gray-300 mb-3">
                    Unusual transactions include:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Transactions inconsistent with customer's known behavior
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Unusually large transactions without apparent economic
                        purpose
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Rapid deposits followed by immediate withdrawals
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Multiple small transactions (structuring)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Transactions from high-risk jurisdictions
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Duplicate account activity
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Gaming activity inconsistent with customer profile
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    6.2 Documentation
                  </h3>
                  <p className="text-gray-300 mb-3">
                    Suspicious transactions documented in writing:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Transaction details and context
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Detection date and methodology
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">Risk assessment</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Supporting evidence and documentation
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    6.3 Reporting Protocol
                  </h3>
                  <p className="text-gray-300 mb-3">
                    <span className="text-white font-bold">
                      Internal Reporting:
                    </span>
                  </p>
                  <ul className="space-y-3 mb-4">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Suspicious activity reported to senior manager without
                        undue delay
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Detailed investigation and analysis completed
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Documentation of all findings
                      </span>
                    </li>
                  </ul>
                  <p className="text-gray-300 mb-3">
                    <span className="text-white font-bold">
                      External Reporting:
                    </span>
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Money Laundering Reporting Officer (MLRO) prepares
                        external report
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Report submitted to FinCEN (or applicable authority)
                        without undue delay
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Quarterly compliance reporting submitted
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    6.4 Record Retention
                  </h3>
                  <p className="text-gray-300 mb-3">
                    All suspicious transaction records maintained for minimum 5
                    years:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Electronic storage with secure access controls
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Documentation of reported and non-reported suspicious
                        activity
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Reasons for any decisions not to report
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    6.5 Reporting Structure
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Money Laundering Reporting Officer (MLRO):
                        </span>{" "}
                        Responsible for external reporting to authorities
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Executive Director:
                        </span>{" "}
                        Drafts and investigates suspicious transaction reports
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Senior Management:
                        </span>{" "}
                        Approves reports for external filing
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          All directors:
                        </span>{" "}
                        Sign all filed reports
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 7: Transaction Monitoring */}
            <motion.section
              id="monitoring"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className=" rounded-2xl p-2 md:p-8"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                7. TRANSACTION MONITORING
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    7.1 Automated Monitoring Systems
                  </h3>
                  <p className="text-gray-300 mb-3">
                    Moonbet employs automated systems to:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Monitor all deposits and withdrawals in real-time
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Detect unusual transaction patterns
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Flag high-risk transactions for manual review
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Generate alerts for suspicious activity
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    7.2 Manual Review Process
                  </h3>
                  <p className="text-gray-300 mb-3">
                    Transactions flagged for manual review receive:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Investigation by trained compliance personnel
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Assessment against customer profile and history
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Risk determination (normal, suspicious, or potential
                        criminal activity)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Documentation of findings and conclusions
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    7.3 Cryptocurrency-Specific Monitoring
                  </h3>
                  <p className="text-gray-300 mb-3">
                    Given Moonbet's cryptocurrency foundation:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        On-chain transaction verification
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Blockchain address analysis
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Wallet reputation screening
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Cross-exchange transaction tracking (where feasible)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Mixing or tumbling service detection
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 8: Employee Training and Competency */}
            <motion.section
              id="training"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className=" rounded-2xl p-2 md:p-8"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                8. EMPLOYEE TRAINING AND COMPETENCY
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    8.1 Mandatory Training
                  </h3>
                  <p className="text-gray-300 mb-3">
                    All employees receive AML/CFT training covering:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Applicable AML/CFT laws and regulations
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        FATF and CFATF recommendations
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Money laundering and terrorist financing typologies
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Company AML policies and procedures
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Customer identification and verification
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Suspicious activity indicators
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Reporting obligations and procedures
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Consequences of non-compliance
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    8.2 Training Frequency
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">Initial:</span>{" "}
                        All new hires within 30 days
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">Annual:</span>{" "}
                        Mandatory refresher for all employees
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Specialized:
                        </span>{" "}
                        Quarterly for compliance and customer service staff
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        <span className="text-white font-bold">
                          Senior Management:
                        </span>{" "}
                        Annual training by external providers
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    8.3 Competency Requirements
                  </h3>
                  <p className="text-gray-300 mb-3">
                    Customer identification and AML monitoring conducted only
                    by:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Trained and certified personnel
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Employees demonstrating competency through testing
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Staff with current knowledge of AML/CFT practices
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 9: Record Keeping and Data Storage */}
            <motion.section
              id="records"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className=" rounded-2xl p-2 md:p-8"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                9. RECORD KEEPING AND DATA STORAGE
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    9.1 Required Registers
                  </h3>
                  <p className="text-gray-300 mb-3">Moonbet maintains:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Customer identification records
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Enhanced Due Diligence documentation
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Transaction monitoring logs
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Suspicious activity reports
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Business relationship establishment records
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Business relationship termination records
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    9.2 Retention Periods
                  </h3>
                  <p className="text-gray-300 mb-3">
                    All records stored electronically for minimum 5 years from:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Date of customer account closure
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">Date of transaction</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Date of suspicious activity report filing
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    9.3 Data Security and Confidentiality
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Secure electronic storage with access controls
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Data not sold or disclosed to third parties
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Disclosure only to authorities if legally required
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Breach notification procedures implemented
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    9.4 Regulatory Access
                  </h3>
                  <p className="text-gray-300 mb-3">
                    Records made available to regulatory authorities upon
                    request:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Cooperation with regulatory audits and investigations
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Prompt response to information requests
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Documentation of all authority requests and responses
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 10: Sanctions Screening */}
            <motion.section
              id="sanctions"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className=" rounded-2xl p-2 md:p-8"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                10. SANCTIONS SCREENING
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    10.1 Screening Procedures
                  </h3>
                  <p className="text-gray-300 mb-3">
                    All customers screened against:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        OFAC Specially Designated Nationals (SDN) list
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        FATF-identified high-risk jurisdictions
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Interpol alerts and watch lists
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Other applicable sanctions and watch lists
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    10.2 Screening Timing
                  </h3>
                  <p className="text-gray-300 mb-3">Screening conducted:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        During customer onboarding
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Ongoing periodic screening (minimum quarterly)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Prior to high-value transactions
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Upon name changes or updated information
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    10.3 Match Resolution
                  </h3>
                  <p className="text-gray-300 mb-3">
                    Potential matches investigated:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        False positive determination
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Name similarity assessment
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Customer clarification requested if needed
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Account frozen pending clearance
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 11: Politically Exposed Persons (PEPs) */}
            <motion.section
              id="peps"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className=" rounded-2xl p-2 md:p-8"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                11. POLITICALLY EXPOSED PERSONS (PEPs)
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    11.1 PEP Definition
                  </h3>
                  <p className="text-gray-300 mb-3">PEPs include:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Current and former national government officials
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Military and judicial officers
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Senior executives of state-owned enterprises
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        International organization officials
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Close family members and associates
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    11.2 PEP Identification
                  </h3>
                  <p className="text-gray-300 mb-3">PEPs identified through:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Public records searches
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Third-party PEP databases
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Adverse media screening
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Customer self-identification
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    11.3 PEP Customer Policy
                  </h3>
                  <p className="text-gray-300 mb-3">
                    PEP customers subject to:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Enhanced Due Diligence (EDD)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Senior management approval
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Enhanced ongoing monitoring
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Higher transaction scrutiny
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 12: Policies and Procedures Review */}
            <motion.section
              id="review"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className=" rounded-2xl p-2 md:p-8"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                12. POLICIES AND PROCEDURES REVIEW
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    12.1 Annual Review
                  </h3>
                  <p className="text-gray-300 mb-3">
                    This Policy is reviewed annually and updated:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Changes in regulatory requirements
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Emerging AML/CFT threats and typologies
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Lessons learned from incident investigations
                      </span>
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
                        FATF recommendations and guidance
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    12.2 Approval and Effective Date
                  </h3>
                  <p className="text-gray-300 mb-3">
                    Policy approved by senior management:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Effective upon approval
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        All employees notified of policy changes
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#F07730] mt-1">•</span>
                      <span className="text-gray-300">
                        Training updated to reflect policy changes
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 13: Contact and Reporting */}
            <motion.section
              id="contact"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className=" rounded-2xl p-2 md:p-8"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                13. CONTACT AND REPORTING
              </h2>

              <p className="text-gray-300 mb-6">
                Report Suspicious Activity or ask questions about this policy:
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
                    <span className="font-bold">Live Chat:</span> 24/7
                    accessible via{" "}
                    <a
                      href="https://moonbet.games/"
                      className="text-[#EFD28E] hover:text-[#F07730] transition-colors"
                    >
                      {" "}
                      Moonbet.games
                    </a>
                  </span>
                </div>
              </div>

              <p className="text-gray-300">
                Moonbet is committed to maintaining the highest AML/CFT
                standards. This Policy reflects our dedication to preventing
                financial crime and protecting the integrity of the gaming
                industry.
              </p>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmlPolicy;
