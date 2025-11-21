// DisputeResolutionPolicyPage.jsx - Clean Dispute Resolution Policy Page with Glass Style
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

// Timeline Component for Dispute Resolution Process
const TimelineStep = ({ number, title, duration, description }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: number * 0.1 }}
    className="flex gap-4 mb-6"
  >
    <div className="flex flex-col items-center">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
          border: "2px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        {number}
      </div>
      {number < 8 && <div className="w-0.5 h-20 bg-gray-700 mt-2" />}
    </div>
    <div className="flex-1 pb-8">
      <h4 className="text-white font-semibold text-lg mb-1">{title}</h4>
      {duration && <p className="text-blue-400 text-sm mb-2">{duration}</p>}
      <p className="text-gray-300">{description}</p>
    </div>
  </motion.div>
);

// Main Dispute Resolution Policy Page Component
const DisputeResolutionPolicyPage = () => {
  const [activeSection, setActiveSection] = useState(null);

  // Table of Contents
  const sections = [
    { id: 1, title: "OVERVIEW" },
    { id: 2, title: "DISPUTE RESOLUTION PROCESS" },
    { id: 3, title: "ESCALATION AND APPEALS" },
    { id: 4, title: "ALTERNATIVE DISPUTE RESOLUTION (ADR)" },
    { id: 5, title: "SMALL CLAIMS AND COURT PROCEEDINGS" },
    { id: 6, title: "DISPUTE RESOLUTION TIMELINE" },
    { id: 7, title: "ARBITRATION" },
    { id: 8, title: "CONTACT INFORMATION" },
    { id: 9, title: "FAIRNESS AND TRANSPARENCY" },
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
            DISPUTE RESOLUTION POLICY
          </h1>
          <p className="text-gray-400 text-lg">
            Last Updated: November 18, 2025
          </p>
        </motion.header>

        {/* Table of Contents */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
          style={{
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.10)",
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              TABLE OF CONTENTS
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {sections.map((section) => (
                <motion.div
                  key={section.id}
                  whileHover={{ x: 5 }}
                  className="cursor-pointer"
                  onClick={() => {
                    const element = document.getElementById(
                      `section-${section.id}`
                    );
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <div className="flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-white/5">
                    <span className="text-gray-400 text-sm font-mono">
                      {String(section.id).padStart(2, "0")}
                    </span>
                    <span className="text-gray-200">{section.title}</span>
                  </div>
                </motion.div>
              ))}
            </div>
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
          {/* Section 1: OVERVIEW */}
          <div id="section-1">
            <PolicySection number="01" title="OVERVIEW">
              <SubSection number="1.1" title="Legal Framework">
                <p className="text-gray-300 mb-4">
                  Moonbet Games LLC (the "Company" or "we") acknowledges that
                  gambling may be restricted or prohibited by law in certain
                  jurisdictions. The Company operates under a license granted by
                  [To be provided].
                </p>

                <p className="text-gray-300 mb-4">
                  By participating in games and using Moonbet's services, you
                  confirm that:
                </p>

                <ListItem>
                  You have reached the minimum legal age for gambling in your
                  country of residence
                </ListItem>
                <ListItem>
                  You have the legal capacity to enter into an agreement with
                  the Company
                </ListItem>
                <ListItem>
                  Gambling is not prohibited in your jurisdiction
                </ListItem>
                <ListItem>
                  You understand the risks associated with gambling
                </ListItem>
              </SubSection>

              <SubSection number="1.2" title="Customer Responsibility">
                <p className="text-gray-300 mb-4">
                  Customers are responsible for:
                </p>

                <ListItem>
                  Understanding applicable laws in their jurisdiction
                </ListItem>
                <ListItem>
                  Ensuring their use of Moonbet is legal where they reside
                </ListItem>
                <ListItem>
                  Accepting all consequences if gambling is prohibited in their
                  location
                </ListItem>
                <ListItem>
                  Acting fairly and rationally when using the platform
                </ListItem>
                <ListItem>
                  Reporting platform errors or faults immediately
                </ListItem>
              </SubSection>

              <SubSection number="1.3" title="Account Violations">
                <p className="text-gray-300 mb-4">
                  If your account is closed due to age verification failure,
                  legal non-compliance, or terms violation:
                </p>

                <ListItem>
                  Account balance from your deposits will be refunded to the
                  original payment method/wallet
                </ListItem>
                <ListItem>
                  Account balance from bonuses or Company rewards will be
                  forfeited to Moonbet
                </ListItem>
                <ListItem>
                  No further access to the account will be permitted
                </ListItem>
              </SubSection>

              <SubSection number="1.4" title="Platform Errors">
                <p className="text-gray-300 mb-4">
                  If you detect a clear gambling error on the platform and
                  understand that any resulting payout cannot be valid or real:
                </p>

                <ListItem>
                  You must immediately notify the Company at
                  support@moonbet.games
                </ListItem>
                <ListItem>You must cease gambling on that feature</ListItem>
                <ListItem>
                  Failure to report and continuing to exploit errors may result
                  in account closure and forfeiture of winnings
                </ListItem>

                <HighlightBox variant="warning">
                  <p className="text-gray-200 font-semibold">
                    Important: Exploiting platform errors is considered
                    fraudulent behavior and will result in immediate account
                    termination.
                  </p>
                </HighlightBox>
              </SubSection>
            </PolicySection>
          </div>

          {/* Section 2: DISPUTE RESOLUTION PROCESS */}
          <div id="section-2">
            <PolicySection number="02" title="DISPUTE RESOLUTION PROCESS">
              <SubSection number="2.1" title="Legal Jurisdiction">
                <p className="text-gray-300 mb-4">
                  Legal relations between Customers and the Company are governed
                  by the laws of [Jurisdiction to be specified upon licensing
                  completion]. All disputes arising from bets, gaming, or
                  services are subject to this legal framework.
                </p>
              </SubSection>

              <SubSection number="2.2" title="Internal Resolution (First Step)">
                <p className="text-gray-300 mb-4">
                  All disputes with the Company must first be addressed directly
                  through our internal complaints procedure:
                </p>

                <HighlightBox variant="info">
                  <div className="space-y-2">
                    <p className="text-gray-200">
                      <span className="font-semibold">Email:</span>{" "}
                      support@moonbet.games
                    </p>
                    <p className="text-gray-200">
                      <span className="font-semibold">Live Chat:</span> 24/7
                      accessible via Moonbet.games
                    </p>
                    <p className="text-gray-200">
                      <span className="font-semibold">Provide:</span> Detailed
                      description of dispute, supporting documentation, and
                      desired resolution
                    </p>
                  </div>
                </HighlightBox>
              </SubSection>

              <SubSection number="2.3" title="Initial Response">
                <p className="text-gray-300 mb-4">
                  The Customer Support Department will:
                </p>

                <ListItem>
                  Acknowledge receipt of your dispute within 24-48 hours
                </ListItem>
                <ListItem>Conduct a thorough investigation</ListItem>
                <ListItem>
                  Provide an initial response or proposed resolution within 10
                  business days
                </ListItem>
                <ListItem>
                  If additional investigation is needed, notify you and extend
                  the timeframe by up to 10 additional business days
                </ListItem>
              </SubSection>

              <SubSection number="2.4" title="Types of Disputes Addressed">
                <p className="text-gray-300 mb-4">
                  Internal resolution covers:
                </p>

                <div className="grid md:grid-cols-2 gap-3">
                  <ListItem>Payout disputes</ListItem>
                  <ListItem>Blocked or suspended accounts</ListItem>
                  <ListItem>Delayed withdrawals or deposits</ListItem>
                  <ListItem>Game outcome disputes</ListItem>
                  <ListItem>Bonus or promotion disputes</ListItem>
                  <ListItem>Broken platform features</ListItem>
                  <ListItem>Transaction errors</ListItem>
                  <ListItem>Account management issues</ListItem>
                </div>
              </SubSection>

              <SubSection number="2.5" title="Regulatory Authority Contact">
                <p className="text-gray-300 mb-4">
                  If you believe the Company is not complying with its licensing
                  requirements:
                </p>

                <ListItem>
                  Contact the licensing authority: [Authority Contact
                  Information to be specified upon licensing completion]
                </ListItem>
                <ListItem>Provide documentation of the non-compliance</ListItem>
                <ListItem>
                  The authority will investigate and take appropriate action
                </ListItem>
              </SubSection>
            </PolicySection>
          </div>

          {/* Section 3: ESCALATION AND APPEALS */}
          <div id="section-3">
            <PolicySection number="03" title="ESCALATION AND APPEALS">
              <SubSection number="3.1" title="Unsatisfactory Resolution">
                <p className="text-gray-300 mb-4">
                  If the Company's internal resolution is unsatisfactory, you
                  may:
                </p>

                <ListItem>
                  Request escalation to senior management at
                  compliance@moonbet.games
                </ListItem>
                <ListItem>
                  Provide detailed explanation of why resolution is inadequate
                </ListItem>
                <ListItem>Request specific alternative remedies</ListItem>
              </SubSection>

              <SubSection number="3.2" title="Mediation Option">
                <p className="text-gray-300 mb-4">
                  The Company may propose non-binding mediation to resolve
                  disputes:
                </p>

                <ListItem>Mediation conducted by neutral third party</ListItem>
                <ListItem>
                  Both parties attempt to reach mutually acceptable solution
                </ListItem>
                <ListItem>
                  If mediation fails, customer retains right to pursue further
                  remedies
                </ListItem>
              </SubSection>

              <SubSection number="3.3" title="Liability Limitations">
                <p className="text-gray-300 mb-4">
                  The Company's liability for any dispute is limited to:
                </p>

                <ListItem>
                  The amount of bets placed by the customer, or
                </ListItem>
                <ListItem>
                  The amount of potential winnings involved in the dispute
                </ListItem>

                <HighlightBox variant="warning">
                  <p className="text-gray-200">
                    Claims beyond these amounts are not covered.
                  </p>
                </HighlightBox>
              </SubSection>
            </PolicySection>
          </div>

          {/* Section 4: ALTERNATIVE DISPUTE RESOLUTION (ADR) */}
          <div id="section-4">
            <PolicySection
              number="04"
              title="ALTERNATIVE DISPUTE RESOLUTION (ADR)"
            >
              <SubSection number="4.1" title="ADR Eligibility">
                <p className="text-gray-300 mb-4">
                  If your dispute is not resolved through internal procedures,
                  you may pursue Alternative Dispute Resolution through the
                  designated ADR entity authorized by [Licensing Authority to be
                  specified upon licensing completion].
                </p>
              </SubSection>

              <SubSection number="4.2" title="Prerequisites for ADR">
                <p className="text-gray-300 mb-4">
                  Before submitting to ADR, you must:
                </p>

                <ListItem>
                  Exhaust the Company's internal complaints procedure (waiting
                  for full 10-20 day resolution period)
                </ListItem>
                <ListItem>
                  Not have submitted the same dispute to another ADR provider,
                  regulator, or court
                </ListItem>
                <ListItem>
                  Ensure the dispute relates to a gambling transaction outcome
                </ListItem>
              </SubSection>

              <SubSection number="4.3" title="ADR Submission">
                <p className="text-gray-300 mb-4">Submit your ADR request:</p>

                <HighlightBox variant="info">
                  <div className="space-y-2">
                    <p className="text-gray-200">
                      <span className="font-semibold">Within one year</span> of
                      the Company's final internal resolution
                    </p>
                    <p className="text-gray-200">
                      <span className="font-semibold">Via ADR form:</span>{" "}
                      Available at [ADR Portal Link to be specified upon
                      licensing completion]
                    </p>
                    <p className="text-gray-200">
                      <span className="font-semibold">Include:</span> Detailed
                      dispute description, Company's response, and why you
                      believe resolution is inadequate
                    </p>
                  </div>
                </HighlightBox>
              </SubSection>

              <SubSection number="4.4" title="ADR Refusal Grounds">
                <p className="text-gray-300 mb-4">
                  The ADR may refuse to consider your dispute if:
                </p>

                <ListItem>
                  The dispute has already been submitted to another ADR,
                  regulator, or court
                </ListItem>
                <ListItem>
                  The claim is frivolous, vexatious, or lacks merit
                </ListItem>
                <ListItem>
                  The dispute does not relate to a gambling transaction
                </ListItem>
                <ListItem>
                  The dispute involves misleading terms, bonus application, or
                  account management (outside ADR scope)
                </ListItem>
                <ListItem>
                  Either party has attempted to intimidate, threaten, or
                  improperly influence the ADR process
                </ListItem>
                <ListItem>
                  Processing would seriously impair ADR operations
                </ListItem>

                <p className="text-gray-300 mt-4">
                  <span className="font-semibold">Decision Timeline:</span> ADR
                  will notify you of refusal within 3 weeks of submission.
                </p>
              </SubSection>

              <SubSection number="4.5" title="ADR Decision">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      Binding Nature
                    </h4>
                    <p className="text-gray-300">
                      The ADR's decision is{" "}
                      <span className="font-semibold text-white">
                        binding on both the Customer and the Company
                      </span>
                      . You cannot appeal the ADR decision unless:
                    </p>
                    <div className="mt-2">
                      <ListItem>
                        The ADR violated fundamental rules of impartiality or
                        fairness
                      </ListItem>
                      <ListItem>
                        The ADR's conduct seriously prejudiced your rights
                      </ListItem>
                      <ListItem>
                        Other circumstances permitted by applicable law
                      </ListItem>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      Legal Recourse
                    </h4>
                    <p className="text-gray-300">
                      After ADR resolution, you retain the right to pursue legal
                      action in any court of competent jurisdiction for limited
                      circumstances (e.g., if ADR acted in serious violation of
                      fairness standards).
                    </p>
                  </div>
                </div>
              </SubSection>

              <SubSection number="4.6" title="ADR Portal">
                <p className="text-gray-300">
                  Access the ADR complaint portal at: [To be provided]
                </p>
              </SubSection>
            </PolicySection>
          </div>

          {/* Section 5: SMALL CLAIMS AND COURT PROCEEDINGS */}
          <div id="section-5">
            <PolicySection
              number="05"
              title="SMALL CLAIMS AND COURT PROCEEDINGS"
            >
              <SubSection number="5.1" title="Court Jurisdiction">
                <p className="text-gray-300">
                  No dispute about gambling shall lead to a lawsuit or legal
                  claim if the Company has complied with the arbitration and ADR
                  provisions in this policy.
                </p>
              </SubSection>

              <SubSection number="5.2" title="Competent Courts">
                <p className="text-gray-300 mb-4">
                  For claims exceeding small claims limits (typically USD $5,000
                  or equivalent):
                </p>

                <ListItem>
                  Claims may be pursued in courts of competent jurisdiction in
                  [Jurisdiction to be specified upon licensing completion]
                </ListItem>
                <ListItem>
                  Legal proceedings conducted according to applicable law
                </ListItem>
                <ListItem>
                  Both parties bear their own legal costs unless court orders
                  otherwise
                </ListItem>
              </SubSection>

              <SubSection number="5.3" title="Small Claims">
                <p className="text-gray-300 mb-4">
                  For smaller disputes (typically under USD $5,000):
                </p>

                <ListItem>
                  Small Claims Tribunal may be available (jurisdiction-specific)
                </ListItem>
                <ListItem>
                  Streamlined process with lower costs and faster resolution
                </ListItem>
                <ListItem>
                  Company may offer non-binding mediation for small claims
                </ListItem>
              </SubSection>
            </PolicySection>
          </div>

          {/* Section 6: DISPUTE RESOLUTION TIMELINE */}
          <div id="section-6">
            <PolicySection number="06" title="DISPUTE RESOLUTION TIMELINE">
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Complete Resolution Process:
                </h3>

                <div className="space-y-2">
                  <TimelineStep
                    number={1}
                    title="Initial Dispute Submission"
                    duration="Day 0"
                    description="Submit your dispute via email or live chat with all relevant documentation"
                  />
                  <TimelineStep
                    number={2}
                    title="Acknowledgment"
                    duration="Within 24-48 hours"
                    description="Receive confirmation that your dispute has been received and is under review"
                  />
                  <TimelineStep
                    number={3}
                    title="Initial Response/Investigation"
                    duration="Within 10 business days"
                    description="Receive initial response with proposed resolution or request for additional information"
                  />
                  <TimelineStep
                    number={4}
                    title="Extended Investigation (if needed)"
                    duration="Up to 10 additional business days"
                    description="Complex cases may require extended investigation (total 20 days maximum)"
                  />
                  <TimelineStep
                    number={5}
                    title="Internal Resolution Complete"
                    duration="By Day 20"
                    description="Final internal resolution provided with detailed explanation"
                  />
                </div>
              </div>

              <HighlightBox variant="info">
                <h4 className="text-white font-semibold mb-3">
                  If Unsatisfied:
                </h4>
                <div className="space-y-2">
                  <p className="text-gray-200">
                    <span className="font-semibold">6. ADR Submission:</span>{" "}
                    Within 1 year of Company's final decision
                  </p>
                  <p className="text-gray-200">
                    <span className="font-semibold">7. ADR Decision:</span>{" "}
                    Timeline varies (typically 30-90 days)
                  </p>
                  <p className="text-gray-200">
                    <span className="font-semibold">
                      8. Legal Action (if applicable):
                    </span>{" "}
                    After ADR resolution
                  </p>
                </div>
              </HighlightBox>
            </PolicySection>
          </div>

          {/* Section 7: ARBITRATION */}
          <div id="section-7">
            <PolicySection number="07" title="ARBITRATION">
              <SubSection number="7.1" title="Arbitration Eligibility">
                <p className="text-gray-300 mb-4">
                  For disputes not resolved through ADR, the Company may propose
                  binding arbitration. Arbitration is permitted only if:
                </p>

                <ListItem>
                  An arbitral tribunal is established under applicable national
                  law
                </ListItem>
                <ListItem>
                  The tribunal operates within [To be provided]
                </ListItem>
                <ListItem>
                  The tribunal has not been flagged by regulatory bodies as
                  biased or substandard
                </ListItem>
                <ListItem>
                  Proceedings are conducted in English language
                </ListItem>
                <ListItem>
                  The place of arbitration is within [Jurisdiction to be
                  specified upon licensing completion]
                </ListItem>
              </SubSection>

              <SubSection number="7.2" title="Arbitration Binding">
                <p className="text-gray-300 mb-4">
                  If both parties agree to arbitration:
                </p>

                <ListItem>
                  The arbitrator's decision is final and binding
                </ListItem>
                <ListItem>Limited grounds for appeal exist</ListItem>
                <ListItem>
                  Decision is enforceable in courts of competent jurisdiction
                </ListItem>
              </SubSection>
            </PolicySection>
          </div>

          {/* Section 8: CONTACT INFORMATION */}
          <div id="section-8">
            <PolicySection number="08" title="CONTACT INFORMATION">
              <div className="space-y-6">
                <SubSection number="8.1" title="For Disputes and Complaints">
                  <HighlightBox>
                    <div className="space-y-2">
                      <p className="text-gray-200">
                        <span className="font-semibold">Email:</span>{" "}
                        support@moonbet.games
                      </p>
                      <p className="text-gray-200">
                        <span className="font-semibold">Live Chat:</span> 24/7
                        via Moonbet.games
                      </p>
                    </div>
                  </HighlightBox>
                </SubSection>

                <SubSection number="8.2" title="For ADR Complaints">
                  <HighlightBox>
                    <div className="space-y-2">
                      <p className="text-gray-200">
                        <span className="font-semibold">ADR Portal:</span> [To
                        be provided]
                      </p>
                      <p className="text-gray-200">
                        <span className="font-semibold">
                          Submission Deadline:
                        </span>{" "}
                        Within 1 year of Company's final internal decision
                      </p>
                    </div>
                  </HighlightBox>
                </SubSection>

                <SubSection number="8.3" title="For Regulatory Concerns">
                  <HighlightBox>
                    <p className="text-gray-200">
                      <span className="font-semibold">
                        Licensing Authority:
                      </span>{" "}
                      [To be provided]
                    </p>
                  </HighlightBox>
                </SubSection>
              </div>
            </PolicySection>
          </div>

          {/* Section 9: FAIRNESS AND TRANSPARENCY */}
          <div id="section-9">
            <PolicySection number="09" title="FAIRNESS AND TRANSPARENCY">
              <p className="text-gray-300 mb-4">Moonbet is committed to:</p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400">⚖️</span>
                    </div>
                    <h4 className="text-white font-semibold">
                      Fair Investigation
                    </h4>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Fair and impartial dispute investigation
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <span className="text-green-400">🔍</span>
                    </div>
                    <h4 className="text-white font-semibold">Transparency</h4>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Transparent decision-making and explanations
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-400">⚡</span>
                    </div>
                    <h4 className="text-white font-semibold">
                      Prompt Communication
                    </h4>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Prompt communication throughout the process
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                      <span className="text-pink-400">🛡️</span>
                    </div>
                    <h4 className="text-white font-semibold">
                      Rights Protection
                    </h4>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Respecting customer rights and legal protections
                  </p>
                </div>
              </div>

              <HighlightBox variant="success">
                <p className="text-gray-200 text-center">
                  We are committed to complying with all applicable dispute
                  resolution requirements and ensuring fair treatment for all
                  our customers.
                </p>
              </HighlightBox>
            </PolicySection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisputeResolutionPolicyPage;
