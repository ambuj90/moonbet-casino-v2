import React from "react";
import { motion } from "framer-motion";

const MoonbetComplaintsPolicy = () => {
  // Custom SVG Icon Component
  const PolicyIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 20 20"
      fill="none"
      className="w-6 h-6"
    >
      <path
        d="M19.4823 8.75592L17.1303 6.4017C16.1631 5.43353 16.7542 4.41157 17.8082 4.34951C19.5443 4.24194 20.5198 2.38835 19.102 0.845078C17.5602 -0.569936 15.7166 0.402369 15.6092 2.13597C15.543 3.19102 14.5138 3.78682 13.5507 2.82279L11.2483 0.518218C10.558 -0.172739 9.43784 -0.172739 8.74755 0.518218L6.41624 2.85175C5.449 3.81992 4.42389 3.21998 4.35776 2.16493C4.25028 0.427194 2.3902 -0.561661 0.848403 0.85749C-0.573525 2.4049 0.414385 4.26676 2.15046 4.37434C3.20451 4.44054 3.80386 5.47077 2.84076 6.43893L0.517722 8.76005C-0.172574 9.45101 -0.172574 10.5723 0.517722 11.2632L2.82009 13.5678C3.78733 14.5318 3.21277 15.5372 2.15873 15.6034C0.422651 15.711 -0.548724 17.5604 0.869071 19.1037C2.41087 20.5229 4.25028 19.5547 4.35776 17.817C4.42389 16.7619 5.43247 16.1827 6.39971 17.1467L8.72274 19.472C9.42544 20.1753 10.5746 20.1753 11.2773 19.4761L13.6044 17.1467C14.5179 16.1909 13.9268 15.1855 12.8852 15.1193C11.1491 15.0118 10.1653 13.1499 11.5831 11.6066C13.1249 10.1875 14.985 11.1763 15.0925 12.9141C15.1586 13.9567 16.1589 14.5442 17.1138 13.6299L19.4492 11.2922C19.4533 11.288 19.4533 11.288 19.4575 11.2839L19.4823 11.2591C20.1726 10.5681 20.1726 9.44687 19.4823 8.75592Z"
        fill="url(#gradient1)"
      />
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F07730" />
          <stop offset="100%" stopColor="#EFD28E" />
        </linearGradient>
      </defs>
    </svg>
  );

  return (
    <section className="w-full min-h-screen bg-[#080808] py-12 md:py-16 lg:py-20">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl pb-6 text-left"
        >
          <div className="flex items-center gap-4 ">
            <PolicyIcon />
            <h1 className="font-bold text-[#CED5E3] uppercase text-xl md:text-4xl lg:text-4xl">
              MOONBET COMPLAINTS POLICY
            </h1>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Introduction */}
          <div className=" rounded-2xl">
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              At Moonbet, we strive to provide exceptional service and
              satisfactory gaming experiences to all our customers. However, if
              you have a complaint, we take it seriously and are committed to
              addressing it fairly and promptly through this Complaints Policy.
            </p>
          </div>

          {/* How to Submit a Complaint */}
          <div className=" rounded-2xl">
            <h2
              className="text-xl md:text-xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              How to Submit a Complaint
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-4">
              You can submit a complaint through any of the following channels:
            </p>

            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  <span className="font-bold text-white">Email:</span>{" "}
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
                <span className="text-gray-300 text-sm">
                  <span className="font-bold text-white">Live Chat:</span> 24/7
                  accessible via Moonbet.games
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  <span className="font-bold text-white">Contact Form:</span>{" "}
                  Available on Moonbet.games
                </span>
              </li>
            </ul>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-3">
              Please provide:
            </p>

            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Your full name and account information
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  A detailed description of the complaint
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Relevant dates, transaction IDs, or game round numbers
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Any supporting documentation or screenshots
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Your preferred method of resolution
                </span>
              </li>
            </ul>
          </div>

          {/* Complaint Handling Process */}
          <div className=" rounded-2xl">
            <h2
              className="text-xl md:text-xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Complaint Handling Process
            </h2>

            {/* Initial Acknowledgment */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                Initial Acknowledgment
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                We acknowledge receipt of your complaint within a maximum of 2
                business days via your preferred contact method.
              </p>
            </div>

            {/* Investigation */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                Investigation
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                Your complaint is assigned to a member of our Complaints Team,
                who will review your account, transactions, and relevant
                records. We may request additional information or documentation.
              </p>
            </div>

            {/* Initial Response */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                Initial Response
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                Our goal is to provide an initial response with a proposed
                resolution within 10 business days of receiving your complaint.
              </p>
            </div>

            {/* Escalation Review */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                Escalation Review
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                If your complaint requires further investigation, we will
                provide regular status updates. Complex complaints or technical
                issues may require up to 30 days for a final determination. You
                will be notified of any extended timeline.
              </p>
            </div>

            {/* Final Resolution */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                Final Resolution
              </h3>
              <p className="text-gray-300 text-sm md:text-base">
                We will inform you of our final decision, the reasons for it,
                and any remedial action taken (refund, account credit, etc.).
              </p>
            </div>
          </div>

          {/* Types of Complaints We Handle */}
          <div className=" rounded-2xl">
            <h2
              className="text-xl md:text-xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Types of Complaints We Handle
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-4">
              We address complaints regarding:
            </p>

            <ul className="grid sm:grid-cols-2 gap-2">
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Withdrawal or deposit issues
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Disputed game outcomes or results
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Technical malfunctions or platform errors
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Bonus or promotion disputes
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Account access problems
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Billing or transaction errors
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Customer service issues
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Responsible gambling tool malfunction
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Any other platform-related concerns
                </span>
              </li>
            </ul>
          </div>

          {/* What We Need to Investigate */}
          <div className=" rounded-2xl">
            <h2
              className="text-xl md:text-xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              What We Need to Investigate
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-4">
              To efficiently investigate your complaint, please provide:
            </p>

            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Your Moonbet account details
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Specific dates and times of the issue
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Transaction IDs or game round numbers
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Description of what happened and what you expected
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Screenshots or documentation supporting your claim
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  Any previous correspondence with our support team
                </span>
              </li>
            </ul>
          </div>

          {/* Complaint Records */}
          <div className=" rounded-2xl">
            <h2
              className="text-xl md:text-xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Complaint Records
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              We maintain confidential records of all complaints for a minimum
              of 5 years. Records are only accessed by authorized Complaints
              Team personnel and used to improve our services and prevent
              recurring issues.
            </p>
          </div>

          {/* Escalation and Appeals */}
          <div className=" rounded-2xl">
            <h2
              className="text-xl md:text-xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Escalation and Appeals
            </h2>

            {/* If You're Unsatisfied */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-3">
                If You're Unsatisfied with Our Resolution:
              </h3>
              <p className="text-gray-300 text-sm md:text-base mb-3">
                You may escalate your complaint to our Compliance Manager at{" "}
                <a
                  href="mailto:compliance@moonbet.games"
                  className="text-[#EFD28E] hover:text-[#F07730] transition-colors"
                >
                  compliance@moonbet.games
                </a>
                . Please include:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Your original complaint and our response
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Explanation of why you're unsatisfied
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    What resolution you're seeking
                  </span>
                </li>
              </ul>
            </div>

            {/* Legal Remedies */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3">
                Legal Remedies:
              </h3>
              <p className="text-gray-300 text-sm md:text-base mb-3">
                You maintain all consumer rights to seek remedies through
                appropriate legal channels, including:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Small claims court proceedings
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Mediation or arbitration services
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Regulatory authority complaints (if applicable in your
                    jurisdiction)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#F07730] mt-1">•</span>
                  <span className="text-gray-300 text-sm">
                    Third-party dispute resolution services
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Blockchain Transaction Disputes */}
          <div className=" rounded-2xl">
            <h2
              className="text-xl md:text-xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Blockchain Transaction Disputes
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-4">
              For complaints involving blockchain transactions (deposits or
              withdrawals):
            </p>

            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  We cannot reverse on-chain transactions, which are immutable
                  and final
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  We can investigate whether the transaction was processed
                  correctly
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  We can identify where funds are held or where they were
                  received
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  We can use blockchain explorers to verify transaction status
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  For disputes, we work with you to identify the correct
                  solution (resend to correct address, re-issue transaction,
                  etc.)
                </span>
              </li>
            </ul>
          </div>

          {/* Our Commitment */}
          <div className=" rounded-2xl">
            <h2
              className="text-xl md:text-xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Our Commitment
            </h2>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  <span className="font-bold text-white">Fairness:</span> All
                  complaints are investigated objectively and impartially
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  <span className="font-bold text-white">Transparency:</span> We
                  explain our findings and reasoning clearly
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  <span className="font-bold text-white">Timeliness:</span> We
                  aim to resolve complaints as quickly as possible, typically
                  within 10 business days
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  <span className="font-bold text-white">Accessibility:</span>{" "}
                  Multiple channels available; we accommodate accessibility
                  needs
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  <span className="font-bold text-white">Privacy:</span>{" "}
                  Complaint information is kept confidential and secure
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F07730] mt-1">•</span>
                <span className="text-gray-300 text-sm">
                  <span className="font-bold text-white">
                    Continuous Improvement:
                  </span>{" "}
                  We use complaint data to identify and eliminate recurring
                  issues
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className=" rounded-2xl">
            <h2
              className="text-xl md:text-xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Contact Information
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-[#F07730]">💬</span>
                <span className="text-gray-300">
                  <span className="font-bold">Live Chat Support:</span> 24/7 via
                  Moonbet.games
                </span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-[#F07730]">📧</span>
                <span className="text-gray-300">
                  <span className="font-bold">Compliance Support:</span>{" "}
                  <a
                    href="mailto:support@moonbet.games"
                    className="text-[#EFD28E] hover:text-[#F07730] transition-colors"
                  >
                    support@moonbet.games
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-[#F07730]">👤</span>
                <span className="text-gray-300">
                  <span className="font-bold">Compliance Manager:</span>{" "}
                  <a
                    href="mailto:compliance@moonbet.games"
                    className="text-[#EFD28E] hover:text-[#F07730] transition-colors"
                  >
                    compliance@moonbet.games
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className=" rounded-2xl">
            <p className="text-gray-300 text-sm md:text-base text-left">
              We welcome your feedback. If you have concerns about this
              Complaints Policy or suggestions for improvement, please contact
              us at{" "}
              <a
                href="mailto:support@moonbet.games"
                className="text-[#EFD28E] hover:text-[#F07730] transition-colors"
              >
                support@moonbet.games
              </a>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MoonbetComplaintsPolicy;
