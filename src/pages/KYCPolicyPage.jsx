// KYCPolicyPage.jsx - Clean KYC Policy Page with Glass Style
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
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
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
const ListItem = ({ children }) => (
  <div className="flex items-start gap-3 mb-2">
    <span className="text-gray-400 text-lg mt-1">•</span>
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

// Main KYC Policy Page Component
const KYCPolicyPage = () => {
  const [activeSection, setActiveSection] = useState(null);

  // Table of Contents
  const sections = [
    { id: 1, title: "OVERVIEW" },
    { id: 2, title: "PURPOSE OF KYC POLICY" },
    { id: 3, title: "CUSTOMER IDENTIFICATION" },
    { id: 4, title: "ENHANCED DUE DILIGENCE (EDD)" },
    { id: 5, title: "VERIFICATION FAILURE AND ACCOUNT RESTRICTIONS" },
    { id: 6, title: "RESTRICTED TERRITORIES" },
    { id: 7, title: "DATA SECURITY AND PRIVACY" },
    { id: 8, title: "RESPONSIBLE GAMBLING GUIDELINES" },
    { id: 9, title: "CONTACTING THE COMPANY" },
    { id: 10, title: "UPDATES TO THIS POLICY" },
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
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-2xl font-bold mb-4 text-white">
            KNOW YOUR CUSTOMER (KYC) POLICY
          </h1>
          <p
            className="text-xl text-gray-400 inline-block px-6 py-2"
            style={{
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.40)",
            }}
          >
            Last Updated: November 18, 2025
          </p>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12 p-6"
          style={{
            borderRadius: "8px",
            border: "1px solid rgba(255, 255, 255, 0.40)",
          }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Quick Navigation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  document
                    .getElementById(`section-${section.id}`)
                    ?.scrollIntoView({ behavior: "smooth" });
                  setActiveSection(section.id);
                }}
                className="p-3 text-left text-gray-300 font-medium transition-all"
                style={{
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.20)",
                }}
              >
                <span className="text-gray-400 mr-2">{section.id}.</span>{" "}
                {section.title}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Section 1 - Overview */}
        <div id="section-1">
          <PolicySection number="1" title="OVERVIEW">
            <SubSection number="1.1" title="Policy Purpose">
              <p className="text-gray-300">
                This Know Your Customer Policy (the "KYC Policy") explains how
                Moonbet Games LLC (the "Company" or "we") verifies customer
                identity and conducts verification procedures when you use our
                services on Moonbet.games and associated platforms (the
                "Website" or "Services").
              </p>
            </SubSection>

            <SubSection number="1.2" title="Policy Acceptance">
              <p className="text-gray-300">
                By creating an account, accessing the Website, using the
                Services, or contacting us, you confirm that you have read,
                understood, and accepted this KYC Policy. Verification is
                mandatory and required by applicable gambling regulations and
                legal requirements.
              </p>
            </SubSection>

            <SubSection number="1.3" title="Mandatory Verification">
              <p className="text-gray-300">
                Identity verification is a mandatory condition of using
                Moonbet's Services. Failure to complete verification when
                requested may result in account suspension or closure.
              </p>
            </SubSection>
          </PolicySection>
        </div>

        {/* Section 2 - Purpose of KYC Policy */}
        <div id="section-2">
          <PolicySection number="2" title="PURPOSE OF KYC POLICY">
            <SubSection number="2.1" title="Age Verification">
              <p className="text-gray-300">
                The Company verifies that all customers are over 18 years of age
                (or the legal gambling age in their jurisdiction, whichever is
                higher). Underage gambling is strictly prohibited.
              </p>
            </SubSection>

            <SubSection number="2.2" title="Identity Confirmation">
              <p className="text-gray-300 mb-3">
                The Company verifies the identity of all customers to:
              </p>
              <ListItem>Confirm the customer is who they claim to be</ListItem>
              <ListItem>Prevent fraud and identity theft</ListItem>
              <ListItem>
                Comply with anti-money laundering (AML) regulations
              </ListItem>
              <ListItem>Detect and prevent duplicate accounts</ListItem>
              <ListItem>Protect customer funds and platform integrity</ListItem>
            </SubSection>

            <SubSection number="2.3" title="Legal Compliance">
              <p className="text-gray-300 mb-3">
                KYC verification is required by:
              </p>
              <ListItem>Applicable gambling regulations</ListItem>
              <ListItem>Anti-money laundering laws</ListItem>
              <ListItem>
                Know Your Customer regulations in jurisdictions where we operate
              </ListItem>
              <ListItem>Licensing authority requirements</ListItem>
            </SubSection>
          </PolicySection>
        </div>

        {/* Section 3 - Customer Identification */}
        <div id="section-3">
          <PolicySection number="3" title="CUSTOMER IDENTIFICATION">
            <SubSection number="3.1" title="Required Information">
              <p className="text-gray-300 mb-3">
                All customers must provide the following minimum identification
                data:
              </p>
              <ListItem>
                Full legal name (exactly as it appears on government ID)
              </ListItem>
              <ListItem>Date of birth (to verify customer is 18+)</ListItem>
              <ListItem>
                Full residential address (including street, city,
                state/province, postal code, country)
              </ListItem>
              <ListItem>
                Contact details (valid email address and phone number)
              </ListItem>
            </SubSection>

            <SubSection number="3.2" title="Acceptable Identity Documents">
              <p className="text-gray-300 mb-3">
                The Company accepts the following documents for identity
                verification:
              </p>

              <div className="mb-4">
                <p className="text-gray-200 font-semibold mb-2">
                  Government-Issued Photo ID:
                </p>
                <ListItem>National ID card</ListItem>
                <ListItem>Passport (full ID photo page)</ListItem>
                <ListItem>Driver's license</ListItem>
                <ListItem>Military ID</ListItem>
              </div>

              <div className="mb-4">
                <p className="text-gray-200 font-semibold mb-2">
                  Address Verification:
                </p>
                <ListItem>
                  Utility bill (electricity, water, gas, internet) - not older
                  than 3 months
                </ListItem>
                <ListItem>
                  Bank statement or financial institution letter - not older
                  than 3 months
                </ListItem>
                <ListItem>
                  Government-issued document with address (tax return, vehicle
                  registration)
                </ListItem>
                <ListItem>
                  Other documents as requested by the Company on a case-by-case
                  basis
                </ListItem>
              </div>
            </SubSection>

            <SubSection number="3.3" title="Document Submission Requirements">
              <p className="text-gray-300 mb-3">
                Documents must be submitted according to these specifications:
              </p>

              <div className="mb-4">
                <p className="text-gray-200 font-semibold mb-2">
                  Format and Delivery:
                </p>
                <ListItem>
                  Each document must be submitted as a separate image file
                </ListItem>
                <ListItem>
                  Scanned copies preferred in .jpeg or .pdf format
                </ListItem>
                <ListItem>Clear, high-quality photos acceptable</ListItem>
                <ListItem>
                  Avoid using flash when photographing documents
                </ListItem>
                <ListItem>Email documents to: support@moonbet.games</ListItem>
              </div>

              <div>
                <p className="text-gray-200 font-semibold mb-2">
                  Image Quality Standards:
                </p>
                <ListItem>
                  Image must be in focus with all text clearly readable
                </ListItem>
                <ListItem>
                  Full document must be visible and uncropped - no edges cut off
                </ListItem>
                <ListItem>
                  Document must not be covered by hands, fingers, or other
                  obstructions
                </ListItem>
                <ListItem>
                  Both sides of document must be submitted if applicable
                </ListItem>
                <ListItem>
                  Natural lighting preferred; images must not be dark or unclear
                </ListItem>
              </div>
            </SubSection>

            <SubSection number="3.4" title="Document Submission Process">
              <p className="text-gray-300 mb-3">Email Submission:</p>
              <ListItem>
                Send documents from the email address registered with your
                Moonbet account
              </ListItem>
              <ListItem>Send to: support@moonbet.games</ListItem>
              <ListItem>
                Include your account username or account number in the email
                subject line
              </ListItem>
              <ListItem>
                Example subject: "KYC Verification - [Your Username]"
              </ListItem>
              <ListItem>Attach all required documents to the email</ListItem>
            </SubSection>

            <SubSection number="3.5" title="Account Registration Information">
              <p className="text-gray-300 mb-3">
                Upon creating your account, you must provide:
              </p>
              <ListItem>
                Name and contact details - Valid email address (must be unique
                to your account)
              </ListItem>
              <ListItem>Date of birth - Must be at least 18 years old</ListItem>
              <ListItem>
                Username - Unique identifier (letters, numbers, underscore, and
                hyphen symbols only)
              </ListItem>
              <ListItem>Password - Secure password known only to you</ListItem>
            </SubSection>

            <SubSection number="3.6" title="Registration Verification">
              <p className="text-gray-300 mb-3">
                The registration page provides real-time validation:
              </p>
              <ListItem>Checks details as you enter them</ListItem>
              <ListItem>
                Notifies you immediately of any errors or format issues
              </ListItem>
              <ListItem>
                Allows you to make corrections before submission
              </ListItem>
              <ListItem>
                You must correct any issues before clicking "Register"
              </ListItem>
            </SubSection>

            <SubSection number="3.7" title="Verification Timeline">
              <p className="text-gray-300 mb-3">
                The Company will process KYC submissions:
              </p>
              <ListItem>Standard verification: 24-48 hours</ListItem>
              <ListItem>
                Complex cases requiring additional review: up to 5 business days
              </ListItem>
              <ListItem>
                You will be notified by email upon completion of verification
              </ListItem>
              <ListItem>
                Account restrictions may be in place pending verification
                completion
              </ListItem>
            </SubSection>
          </PolicySection>
        </div>

        {/* Section 4 - Enhanced Due Diligence */}
        <div id="section-4">
          <PolicySection number="4" title="ENHANCED DUE DILIGENCE (EDD)">
            <SubSection number="4.1" title="When EDD Is Required">
              <p className="text-gray-300 mb-3">
                Enhanced Due Diligence may be required for:
              </p>
              <ListItem>High-value transactions or deposits</ListItem>
              <ListItem>Customers identified as medium or high-risk</ListItem>
              <ListItem>Politically Exposed Persons (PEPs)</ListItem>
              <ListItem>Customers from high-risk jurisdictions</ListItem>
              <ListItem>Unusual transaction patterns</ListItem>
              <ListItem>
                At the Company's discretion for compliance purposes
              </ListItem>
            </SubSection>

            <SubSection number="4.2" title="Additional Information Requested">
              <p className="text-gray-300 mb-3">
                For EDD, the Company may request:
              </p>
              <ListItem>Source of funds documentation</ListItem>
              <ListItem>Source of wealth verification</ListItem>
              <ListItem>Business ownership information</ListItem>
              <ListItem>Explanation of intended use of account</ListItem>
              <ListItem>Additional identification documents</ListItem>
              <ListItem>
                References from banks or financial institutions
              </ListItem>
              <ListItem>Employment verification</ListItem>
            </SubSection>

            <SubSection number="4.3" title="EDD Timeline">
              <p className="text-gray-300 mb-3">
                Enhanced Due Diligence may extend verification timelines:
              </p>
              <ListItem>Initial review: 5-10 business days</ListItem>
              <ListItem>Complex cases: up to 30 business days</ListItem>
              <ListItem>
                You will be notified of any delays and reasons for extended
                review
              </ListItem>
            </SubSection>
          </PolicySection>
        </div>

        {/* Section 5 - Verification Failure and Account Restrictions */}
        <div id="section-5">
          <PolicySection
            number="5"
            title="VERIFICATION FAILURE AND ACCOUNT RESTRICTIONS"
          >
            <SubSection number="5.1" title="Reasons for Verification Failure">
              <p className="text-gray-300 mb-3">
                Account verification may be declined if:
              </p>
              <ListItem>
                Documents do not match information provided during registration
              </ListItem>
              <ListItem>
                Documents are unclear, incomplete, or do not meet quality
                standards
              </ListItem>
              <ListItem>
                Customer information cannot be verified through available
                methods
              </ListItem>
              <ListItem>
                Documents are determined to be fraudulent or forged
              </ListItem>
              <ListItem>Customer is identified as underage</ListItem>
              <ListItem>Customer is from a Restricted Jurisdiction</ListItem>
            </SubSection>

            <SubSection number="5.2" title="Re-Submission">
              <p className="text-gray-300 mb-3">
                If verification initially fails:
              </p>
              <ListItem>
                The Company will notify you of specific reasons for rejection
              </ListItem>
              <ListItem>
                You will be given opportunity to re-submit corrected or
                additional documents
              </ListItem>
              <ListItem>
                Re-submissions must meet all formatting and quality requirements
              </ListItem>
              <ListItem>
                The Company reserves right to request alternative documentation
              </ListItem>
              <ListItem>
                Multiple failed submissions may result in account closure
              </ListItem>
            </SubSection>

            <SubSection number="5.3" title="Document Re-Submission Process">
              <p className="text-gray-300 mb-3">To re-submit documents:</p>
              <ListItem>
                Email corrected documents to support@moonbet.games
              </ListItem>
              <ListItem>
                Include your username and reference number from rejection notice
              </ListItem>
              <ListItem>
                Ensure all documents meet quality and completeness requirements
              </ListItem>
              <ListItem>Submit from your registered email address</ListItem>
            </SubSection>
          </PolicySection>
        </div>

        {/* Section 6 - Restricted Territories */}
        <div id="section-6">
          <PolicySection number="6" title="RESTRICTED TERRITORIES">
            <SubSection
              number="6.1"
              title="Customer Responsibility for Legality"
            >
              <p className="text-gray-300 mb-3">
                By creating an account, you warrant that:
              </p>
              <ListItem>
                You understand that access to Moonbet may be illegal in certain
                jurisdictions
              </ListItem>
              <ListItem>
                You have determined that use of Moonbet is legal in your country
                of residence
              </ListItem>
              <ListItem>
                You accept full responsibility for compliance with local laws
              </ListItem>
              <ListItem>
                Gambling is not illegal in the territory where you reside
              </ListItem>
            </SubSection>

            <SubSection number="6.2" title="Company Limitation">
              <p className="text-gray-300">
                The Company cannot verify the legality of services in every
                jurisdiction worldwide. It is your sole responsibility to
                determine whether accessing and using Moonbet is legal where you
                are located.
              </p>
            </SubSection>

            <SubSection number="6.3" title="Restricted Jurisdictions List">
              <p className="text-gray-300 mb-3">
                The Company does not permit accounts to be opened or used by
                residents of certain jurisdictions (the "Restricted
                Jurisdictions"). A current list of Restricted Jurisdictions is
                available:
              </p>
              <ListItem>On the Website under "Restricted Territories"</ListItem>
              <ListItem>By contacting support@moonbet.games</ListItem>
              <ListItem>
                Updated periodically as legal requirements change
              </ListItem>
            </SubSection>

            <SubSection number="6.4" title="Ineligible Person Status">
              <p className="text-gray-300 mb-3">
                An "Ineligible Person" is defined as someone who:
              </p>
              <ListItem>
                Is underage (under 18 or below legal gambling age in their
                jurisdiction)
              </ListItem>
              <ListItem>Resides in a Restricted Jurisdiction</ListItem>
              <ListItem>Is prohibited from gambling by applicable law</ListItem>
              <ListItem>
                Has self-excluded or been excluded by another operator
              </ListItem>
            </SubSection>

            <SubSection number="6.5" title="Consequences of Ineligible Status">
              <p className="text-gray-300 mb-3">
                If you are identified as an Ineligible Person:
              </p>
              <ListItem>Your account will be immediately blocked</ListItem>
              <ListItem>All deposits you made will be frozen</ListItem>
              <ListItem>
                All transactions made while ineligible will be voided
              </ListItem>
              <ListItem>
                Funds will be transferred back to your original payment method
                or wallet address
              </ListItem>
              <ListItem>
                Any winnings accumulated while ineligible will be forfeited
              </ListItem>
              <ListItem>
                The Company will maintain records of the account closure
              </ListItem>
            </SubSection>
          </PolicySection>
        </div>

        {/* Section 7 - Data Security and Privacy */}
        <div id="section-7">
          <PolicySection number="7" title="DATA SECURITY AND PRIVACY">
            <SubSection number="7.1" title="Document Storage">
              <p className="text-gray-300 mb-3">
                All submitted documents and identification information are:
              </p>
              <ListItem>Stored securely using encryption</ListItem>
              <ListItem>
                Retained for minimum 5+ years per regulatory requirements
              </ListItem>
              <ListItem>
                Accessible only to authorized Company personnel
              </ListItem>
              <ListItem>
                Never shared with third parties except as required by law
              </ListItem>
            </SubSection>

            <SubSection number="7.2" title="Privacy Protection">
              <p className="text-gray-300 mb-3">
                Your personal information is protected according to our Privacy
                Policy:
              </p>
              <HighlightBox variant="info">
                <p className="text-gray-200">
                  <a
                    href="https://moonbet.games/privacy"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    https://moonbet.games/privacy
                  </a>
                </p>
                <p className="text-gray-300 mt-2">
                  For detailed information on how your data is collected, used,
                  and protected, please review our Privacy Policy.
                </p>
              </HighlightBox>
            </SubSection>

            <SubSection number="7.3" title="Recording and Monitoring">
              <p className="text-gray-300 mb-3">Please note:</p>
              <ListItem>
                All customer communications may be recorded for training and
                security purposes
              </ListItem>
              <ListItem>
                Phone calls, live chat sessions, and email communications may be
                monitored
              </ListItem>
              <ListItem>
                Recordings are retained for compliance and dispute resolution
                purposes
              </ListItem>
            </SubSection>
          </PolicySection>
        </div>

        {/* Section 8 - Responsible Gambling Guidelines */}
        <div id="section-8">
          <PolicySection number="8" title="RESPONSIBLE GAMBLING GUIDELINES">
            <p className="text-gray-300 mb-4">
              While undergoing or after completing KYC verification, please
              consider these responsible gambling guidelines:
            </p>

            <SubSection number="" title="Session Duration">
              <ListItem>
                Decide how long you wish to gamble before you begin
              </ListItem>
              <ListItem>
                Monitor the time and stick to your predetermined session length
              </ListItem>
              <ListItem>Take regular breaks from gambling</ListItem>
            </SubSection>

            <SubSection
              number=""
              title="Avoid Interference with Responsibilities"
            >
              <ListItem>
                Do not let gambling interfere with work, family, or personal
                responsibilities
              </ListItem>
              <ListItem>
                Gambling should not replace sleep, exercise, or other essential
                activities
              </ListItem>
              <ListItem>
                Maintain balance between gaming and other aspects of your life
              </ListItem>
            </SubSection>

            <SubSection number="" title="Health and Substance Considerations">
              <ListItem>
                Do not gamble while under the influence of alcohol or drugs
              </ListItem>
              <ListItem>
                Do not gamble if recovering from dependency or addiction
              </ListItem>
              <ListItem>
                Consult your healthcare provider if you have concerns about
                substance use
              </ListItem>
              <ListItem>
                Do not gamble if taking prescription medications that impair
                judgment
              </ListItem>
            </SubSection>

            <SubSection number="" title="Gambling as Entertainment Only">
              <ListItem>
                View gambling as entertainment, not as income generation
              </ListItem>
              <ListItem>
                Never gamble with money needed for essentials (rent, food,
                utilities, medical care)
              </ListItem>
              <ListItem>
                Do not gamble to recover losses or pay off debt
              </ListItem>
              <ListItem>
                Understand that gambling should be fun, not stressful or
                desperate
              </ListItem>
            </SubSection>

            <SubSection number="" title="Seeking Help">
              <p className="text-gray-300 mb-3">
                If you experience problem gambling or have concerns:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div
                  className="p-4"
                  style={{
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.20)",
                    background: "rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <p className="text-gray-200 font-semibold mb-1">
                    National Council on Problem Gambling
                  </p>
                  <p className="text-gray-400 text-sm">
                    <a
                      href="https://www.ncpgambling.org/"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      www.ncpgambling.org
                    </a>{" "}
                    | 1-800-522-4700
                  </p>
                </div>

                <div
                  className="p-4"
                  style={{
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.20)",
                    background: "rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <p className="text-gray-200 font-semibold mb-1">
                    Gamblers Anonymous
                  </p>
                  <p className="text-gray-400 text-sm">
                    <a
                      href="https://www.gamblersanonymous.org/"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      www.gamblersanonymous.org
                    </a>
                  </p>
                </div>

                <div
                  className="p-4"
                  style={{
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.20)",
                    background: "rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <p className="text-gray-200 font-semibold mb-1">
                    Gambling Therapy
                  </p>
                  <p className="text-gray-400 text-sm">
                    <a
                      href="https://www.gamblingtherapy.org/"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      www.gamblingtherapy.org
                    </a>
                  </p>
                </div>

                <div
                  className="p-4"
                  style={{
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.20)",
                    background: "rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <p className="text-gray-200 font-semibold mb-1">
                    SAMHSA National Helpline
                  </p>
                  <p className="text-gray-400 text-sm">
                    <a
                      href="https://www.samhsa.gov/"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      www.samhsa.gov
                    </a>{" "}
                    | 1-800-662-4357
                  </p>
                </div>
              </div>
            </SubSection>
          </PolicySection>
        </div>

        {/* Section 9 - Contacting the Company */}
        <div id="section-9">
          <PolicySection number="9" title="CONTACTING THE COMPANY">
            <div className="grid md:grid-cols-2 gap-6">
              <div
                className="p-6"
                style={{
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.30)",
                  background: "rgba(255, 255, 255, 0.05)",
                }}
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  For KYC and Verification Questions:
                </h3>
                <ListItem>Email: support@moonbet.games</ListItem>
                <ListItem>
                  Subject Line: "KYC Verification - [Your Username]"
                </ListItem>
                <ListItem>
                  Live Chat: 24/7 accessible via Moonbet.games
                </ListItem>
                <ListItem>
                  Response Time: 24-48 hours for standard inquiries
                </ListItem>
              </div>

              <div
                className="p-6"
                style={{
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.30)",
                  background: "rgba(255, 255, 255, 0.05)",
                }}
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  For Document Submissions:
                </h3>
                <ListItem>
                  Email high-quality document images to: support@moonbet.games
                </ListItem>
                <ListItem>Include username in subject line</ListItem>
                <ListItem>Submit from registered email address</ListItem>
                <ListItem>Allow 24-48 hours for processing</ListItem>
              </div>
            </div>
          </PolicySection>
        </div>

        {/* Section 10 - Updates to This Policy */}
        <div id="section-10">
          <PolicySection number="10" title="UPDATES TO THIS POLICY">
            <div
              className="p-6"
              style={{
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.30)",
              }}
            >
              <p className="text-gray-300 mb-4">
                The Company reserves the right to update this KYC Policy:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "To comply with new regulatory requirements",
                  "To enhance security and fraud prevention",
                  "To improve verification procedures",
                  "In response to regulatory guidance",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4"
                    style={{
                      borderRadius: "8px",
                      border: "1px solid rgba(255, 255, 255, 0.20)",
                      background: "rgba(255, 255, 255, 0.05)",
                    }}
                  >
                    <ListItem>{item}</ListItem>
                  </div>
                ))}
              </div>
              <HighlightBox variant="info">
                <p className="text-gray-200 font-bold text-center text-lg">
                  Updated policies will be published on this page. Your
                  continued use of Moonbet constitutes acceptance of any
                  updates.
                </p>
              </HighlightBox>
            </div>
          </PolicySection>
        </div>
      </div>
    </div>
  );
};

export default KYCPolicyPage;
