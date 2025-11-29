import React from "react";
import { motion } from "framer-motion";

const ModernSlavery = () => {
  return (
    <section className="w-full min-h-screen py-12 md:py-16 lg:py-20">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl pb-6 text-left"
        >
          <div className="flex items-center gap-4">
            <h1 className="font-bold uppercase text-xl md:text-4xl lg:text-4xl text-[var(--text-light-grey)]">
              MODERN SLAVERY STATEMENT
            </h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="rounded-2xl">
            <p className="text-[var(--text-lavender-1)] leading-relaxed text-sm md:text-base">
              At Moonbet, we are committed to conducting business ethically and
              combating modern slavery in all its forms, including forced labor,
              human trafficking, servitude, and debt bondage. We have a
              zero-tolerance approach to any practices that deprive individuals
              of their basic human rights and freedoms.
            </p>

            <p className="text-[var(--text-lavender-1)] leading-relaxed text-sm md:text-base mt-4">
              We require all employees, contractors, suppliers, and business
              partners to fully comply with all applicable laws prohibiting
              modern slavery, including the Trafficking Victims Protection Act
              (TVPA), state human trafficking laws, and similar legislation in
              jurisdictions where we operate.
            </p>

            <p className="text-[var(--text-lavender-1)] leading-relaxed text-sm md:text-base mt-4">
              Our core principles and ongoing efforts to prevent modern slavery
              include:
            </p>
          </div>

          <div className="rounded-2xl">
            <h2 className="text-lg md:text-xl font-bold text-[var(--text-light-grey)] mb-4">
              Supplier and Partner Vetting
            </h2>
            <p className="text-[var(--text-lavender-1)] leading-relaxed text-sm md:text-base">
              We thoroughly vet suppliers...
            </p>
          </div>

          <div className="rounded-2xl">
            <h2 className="text-lg md:text-xl font-bold text-[var(--text-light-grey)] mb-4">
              Employee and Contractor Protections
            </h2>
            <p className="text-[var(--text-lavender-1)] leading-relaxed text-sm md:text-base">
              We maintain ethical labor practices for all employees...
            </p>
          </div>

          <div className="rounded-2xl">
            <h2 className="text-lg md:text-xl font-bold text-[var(--text-light-grey)] mb-4">
              Staff Training
            </h2>
            <p className="text-[var(--text-lavender-1)] leading-relaxed text-sm md:text-base">
              We provide comprehensive training to all employees...
            </p>
          </div>

          <div className="rounded-2xl">
            <h2 className="text-lg md:text-xl font-bold text-[var(--text-light-grey)] mb-4">
              Transaction Monitoring
            </h2>
            <p className="text-[var(--text-lavender-1)] leading-relaxed text-sm md:text-base">
              As a cryptocurrency platform, we maintain robust transaction
              monitoring...
            </p>
          </div>

          <div className="rounded-2xl">
            <h2 className="text-lg md:text-xl font-bold text-[var(--text-light-grey)] mb-4">
              Grievance and Reporting Mechanisms
            </h2>
            <p className="text-[var(--text-lavender-1)] leading-relaxed text-sm md:text-base">
              We maintain confidential channels...
              <a
                href="mailto:support@moonbet.games"
                className="text-[var(--cta-pink)] hover:text-[var(--cta-pink)]/80 transition-colors"
              >
                support@moonbet.games
              </a>
            </p>
          </div>

          <div className="rounded-2xl">
            <h2 className="text-lg md:text-xl font-bold text-[var(--text-light-grey)] mb-4">
              Regular Reviews and Compliance
            </h2>
            <p className="text-[var(--text-lavender-1)] leading-relaxed text-sm md:text-base">
              We regularly review and strengthen our systems...
            </p>
          </div>

          <div className="rounded-2xl">
            <h2 className="text-lg md:text-xl font-bold text-[var(--text-light-grey)] mb-4">
              Cooperation with Authorities
            </h2>
            <p className="text-[var(--text-lavender-1)] leading-relaxed text-sm md:text-base">
              We cooperate fully with law enforcement...
            </p>
          </div>

          <div className="rounded-2xl">
            <p className="text-[var(--text-lavender-1)] leading-relaxed text-sm md:text-base">
              We are committed to transparency...
            </p>
          </div>

          <div className="rounded-2xl">
            <h2 className="text-lg md:text-xl font-bold text-[var(--text-light-grey)] mb-4">
              For questions or to report suspected modern slavery:
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <a
                href="mailto:support@moonbet.games"
                className="flex items-center gap-3 px-4 py-3 bg-[var(--glass-white-10)] rounded-xl border border-[var(--glass-white-20)] hover:bg-[var(--glass-white-15)] transition-all"
              >
                <span className="text-[var(--cta-pink)]">📧</span>
                <span className="text-[var(--text-lavender-1)]">
                  <span className="font-bold text-[var(--text-light-grey)]">
                    Report:
                  </span>{" "}
                  support@moonbet.games
                </span>
              </a>

              <div className="flex items-center gap-3 px-4 py-3 bg-[var(--glass-white-10)] rounded-xl border border-[var(--glass-white-20)]">
                <span className="text-[var(--cta-pink)]">💬</span>
                <span className="text-[var(--text-lavender-1)]">
                  <span className="font-bold text-[var(--text-light-grey)]">
                    Live Chat:
                  </span>{" "}
                  24/7 via Moonbet.games
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl">
            <p className="text-[var(--text-lavender-2)] text-sm md:text-base text-left">
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
