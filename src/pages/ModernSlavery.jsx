import React from "react";
import { motion } from "framer-motion";

const ModernSlavery = () => {
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
          className=" rounded-2xl pb-6 text-left"
        >
          <div className="flex items-center gap-4 ">
            <PolicyIcon />
            <h1 className="font-bold text-[#CED5E3] uppercase text-xl md:text-4xl lg:text-4xl">
              MODERN SLAVERY STATEMENT
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
              At Moonbet, we are committed to conducting business ethically and
              combating modern slavery in all its forms, including forced labor,
              human trafficking, servitude, and debt bondage. We have a
              zero-tolerance approach to any practices that deprive individuals
              of their basic human rights and freedoms.
            </p>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base mt-4">
              We require all employees, contractors, suppliers, and business
              partners to fully comply with all applicable laws prohibiting
              modern slavery, including the Trafficking Victims Protection Act
              (TVPA), state human trafficking laws, and similar legislation in
              jurisdictions where we operate.
            </p>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base mt-4">
              Our core principles and ongoing efforts to prevent modern slavery
              include:
            </p>
          </div>

          {/* Supplier and Partner Vetting */}
          <div className=" rounded-2xl">
            <h2
              className="text-lg md:text-xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Supplier and Partner Vetting
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              We thoroughly vet suppliers, contractors, and business partners to
              ensure they meet our strict ethical and labor standards. We
              require transparency regarding their supply chains and labor
              practices, and we maintain the right to audit their operations.
            </p>
          </div>

          {/* Employee and Contractor Protections */}
          <div className=" rounded-2xl">
            <h2
              className="text-lg md:text-xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Employee and Contractor Protections
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              We maintain ethical labor practices for all employees and
              contractors. We provide competitive wages, safe working
              conditions, and prohibit any form of coercion or exploitation. We
              ensure all staff understand modern slavery risks through mandatory
              training.
            </p>
          </div>

          {/* Staff Training */}
          <div className=" rounded-2xl">
            <h2
              className="text-lg md:text-xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Staff Training
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              We provide comprehensive training to all employees on identifying
              and mitigating modern slavery risks, recognizing trafficking
              indicators, and reporting suspected violations. Training is
              updated annually and tailored to role-specific risks.
            </p>
          </div>

          {/* Transaction Monitoring */}
          <div className=" rounded-2xl">
            <h2
              className="text-lg md:text-xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Transaction Monitoring
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              As a cryptocurrency platform, we maintain robust transaction
              monitoring systems to detect patterns consistent with human
              trafficking, money laundering of trafficking proceeds, and
              financial exploitation. We cooperate fully with law enforcement
              investigations.
            </p>
          </div>

          {/* Grievance and Reporting Mechanisms */}
          <div className=" rounded-2xl">
            <h2
              className="text-lg md:text-xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Grievance and Reporting Mechanisms
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              We maintain confidential channels for employees, contractors, and
              third parties to report suspected modern slavery or trafficking
              without fear of retaliation. Reports can be made to{" "}
              <a
                href="mailto:support@moonbet.games"
                className="text-[#EFD28E] hover:text-[#F07730] transition-colors"
              >
                support@moonbet.games
              </a>{" "}
              or through anonymous reporting systems.
            </p>
          </div>

          {/* Regular Reviews and Compliance */}
          <div className=" rounded-2xl">
            <h2
              className="text-lg md:text-xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Regular Reviews and Compliance
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              We regularly review and strengthen our systems to enhance modern
              slavery prevention. We monitor regulatory developments,
              incorporate industry best practices, and maintain documentation of
              due diligence and compliance efforts.
            </p>
          </div>

          {/* Cooperation with Authorities */}
          <div className=" rounded-2xl">
            <h2
              className="text-lg md:text-xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              Cooperation with Authorities
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              We cooperate fully with law enforcement and regulatory authorities
              investigating suspected modern slavery or trafficking. We report
              suspected trafficking to relevant authorities including the FBI,
              ICE, and the National Human Trafficking Hotline (1-888-373-7888).
            </p>
          </div>

          {/* Commitment */}
          <div className=" rounded-2xl">
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              We are committed to transparency in confronting this complex
              issue. We welcome feedback to continually improve our ability to
              detect and eliminate any form of modern slavery from our
              operations and supply chains.
            </p>
          </div>

          {/* Contact Section */}
          <div className=" rounded-2xl">
            <h2
              className="text-lg md:text-xl font-bold text-white mb-4"
              style={{ fontFamily: "Neuropolitical, sans-serif" }}
            >
              For questions or to report suspected modern slavery:
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <a
                href="mailto:support@moonbet.games"
                className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
              >
                <span className="text-[#F07730]">📧</span>
                <span className="text-gray-300">
                  <span className="font-bold">Report:</span>{" "}
                  support@moonbet.games
                </span>
              </a>
              <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-[#F07730]">💬</span>
                <span className="text-gray-300">
                  <span className="font-bold">Live Chat:</span> 24/7 via
                  Moonbet.games
                </span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className=" rounded-2xl">
            <p className="text-gray-400 text-sm md:text-base text-left">
              This statement is made pursuant to applicable federal and state
              laws and will be reviewed and updated annually.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernSlavery;
