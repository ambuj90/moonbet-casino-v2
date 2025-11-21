// AccountPayoutsPolicyPage.jsx - Clean Policy Page with Glass Style
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

// Main Policy Page Component
const AccountPayoutsPolicyPage = () => {
  const [activeSection, setActiveSection] = useState(null);

  // Table of Contents
  const sections = [
    { id: 1, title: "ACCOUNT REGISTRATION AND OPENING" },
    { id: 2, title: "ACCOUNT RESTRICTIONS AND PROHIBITED TRANSFERS" },
    { id: 3, title: "DEPOSITS INTO YOUR ACCOUNT" },
    { id: 4, title: "ACCOUNT ADMINISTRATION" },
    { id: 5, title: "PAYOUTS AND WITHDRAWALS" },
    { id: 6, title: "BONUSES AND PROMOTIONS" },
    { id: 7, title: "ACCOUNT CLOSURE" },
    { id: 8, title: "CONTACT AND SUPPORT" },
    { id: 9, title: "UPDATES TO THIS POLICY" },
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
            ACCOUNT, PAYOUTS AND BONUSES POLICY
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

        {/* Section 1 */}
        <div id="section-1">
          <PolicySection number="1" title="ACCOUNT REGISTRATION AND OPENING">
            <SubSection number="1.1" title="Account Creation Requirement">
              <p className="text-gray-300">
                To play any games offered by Moonbet Operations Ltd. (the
                "Company" or "we") on Moonbet.games or associated platforms (the
                "Website"), you must first register and open an account (the
                "Account"). Account creation is completed when you successfully
                log in using the Company's website or mobile application.
              </p>
            </SubSection>

            <SubSection number="1.2" title="Account Opening Information">
              <p className="text-gray-300 mb-3">
                Upon opening an Account, you must provide the following personal
                information:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Full legal name",
                  "Date of birth",
                  "Full residential address",
                  "Telephone number",
                  "Email address",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 text-gray-200"
                    style={{
                      borderRadius: "8px",
                      border: "1px solid rgba(255, 255, 255, 0.20)",
                      background: "rgba(255, 255, 255, 0.05)",
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
              <p className="text-gray-300 mt-3">
                This information (the "Contact Details") may be updated at any
                time by contacting Customer Support or through your Account
                management page on the Website.
              </p>
            </SubSection>

            <SubSection number="1.3" title="Single Account Policy">
              <p className="text-gray-300 mb-3">
                Each customer is permitted to open only one Account with
                Moonbet. If you attempt to open multiple accounts:
              </p>
              <ListItem>
                The Company reserves the right to block or close all accounts
                you attempt to open
              </ListItem>
              <ListItem>
                Any duplicate accounts will be subject to closure and fund
                forfeiture
              </ListItem>
              <ListItem>
                If you discover you have multiple accounts, you must notify the
                Company immediately at support@moonbet.games
              </ListItem>
            </SubSection>

            <SubSection number="1.4" title="Account Operation by Third Parties">
              <p className="text-gray-300 mb-3">
                The Company may appoint or engage:
              </p>
              <ListItem>
                Third-party payment processors or cryptocurrency payment
                solution providers
              </ListItem>
              <ListItem>
                Affiliate companies to act on behalf of the Company
              </ListItem>
              <ListItem>
                External operators to operate or manage accounts
              </ListItem>
              <p className="text-gray-300 mt-3">
                These third parties may receive, hold, and process funds on
                behalf of the Company.
              </p>
            </SubSection>

            <SubSection number="1.5" title="Account Eligibility">
              <p className="text-gray-300 mb-3">
                To open an Account, you must:
              </p>
              <ListItem>
                Be at least 18 years of age (or the higher minimum legal age in
                your jurisdiction)
              </ListItem>
              <ListItem>
                Be legally permitted to participate in gambling in your
                jurisdiction
              </ListItem>
              <ListItem>
                Not reside in a Restricted Jurisdiction where gambling is
                prohibited
              </ListItem>
              <ListItem>
                Comply with all applicable laws and regulations
              </ListItem>
            </SubSection>

            <SubSection number="1.6" title="Account Refusal and Closure Rights">
              <p className="text-gray-300 mb-3">
                The Company reserves the right to refuse to open an Account or
                close an existing Account if:
              </p>
              <ListItem>
                You violate the Company's Terms and Conditions or policies
              </ListItem>
              <ListItem>You violate third-party or affiliate policies</ListItem>
              <ListItem>You violate applicable laws or regulations</ListItem>
              <ListItem>
                A governmental body or regulatory authority requests closure
              </ListItem>
              <ListItem>
                You are determined to be ineligible after KYC verification
              </ListItem>
              <p className="text-gray-300 mt-3">
                However, all contractual obligations already made will be
                honored.
              </p>
            </SubSection>

            <SubSection
              number="1.7"
              title="Ineligible Person Account Treatment"
            >
              <p className="text-gray-300 mb-3">
                If KYC verification determines you are an "Ineligible Person"
                (underage, from a Restricted Jurisdiction, or otherwise
                prohibited from gambling):
              </p>
              <ListItem>Your Account will be immediately blocked</ListItem>
              <ListItem>
                All transactions made while you were ineligible are voided
              </ListItem>
              <ListItem>
                All deposited funds will be frozen and transferred back to your
                original wallet address
              </ListItem>
              <ListItem>
                The Company will review each case individually and determine
                appropriate action
              </ListItem>
              <ListItem>
                The Company may engage local consultants and regulatory agencies
                to ensure compliance
              </ListItem>
              <ListItem>
                Any expenses incurred by the Company may be deducted from your
                Account balance (unless prohibited by law)
              </ListItem>
            </SubSection>

            <SubSection number="1.8" title="Inactive Account Policy">
              <p className="text-gray-300 mb-3">
                An Account is deemed inactive if it has not been accessed for
                180 consecutive days. When an Account becomes inactive:
              </p>
              <ListItem>The positive balance may be reset</ListItem>
              <ListItem>
                To reinstate your balance, contact Customer Support at
                support@moonbet.games
              </ListItem>
              <ListItem>
                The Company may apply applicable inactivity fees per your
                jurisdiction
              </ListItem>
            </SubSection>

            <SubSection
              number="1.9"
              title="Account Security and Fraud Prevention"
            >
              <p className="text-gray-300 mb-3">
                All transactions are checked by the Company's Anti-Fraud
                department in accordance with AML/CFT regulations
              </p>
              <p className="text-gray-300 mb-3">
                Suspicious activity on your Account may result in:
              </p>
              <ListItem>Reporting to relevant authorities</ListItem>
              <ListItem>Freezing of your Account balance</ListItem>
              <ListItem>Account closure</ListItem>
              <ListItem>Forfeiture or confiscation of funds</ListItem>
            </SubSection>
          </PolicySection>
        </div>

        {/* Section 2 */}
        <div id="section-2">
          <PolicySection
            number="2"
            title="ACCOUNT RESTRICTIONS AND PROHIBITED TRANSFERS"
          >
            <SubSection number="2.1" title="Prohibited Account Activities">
              <p className="text-gray-300 mb-3">You are prohibited from:</p>
              <ListItem>
                Transferring funds from your Account to other users
              </ListItem>
              <ListItem>
                Receiving funds from other users into your Account
              </ListItem>
              <ListItem>
                Selling, transferring, or acquiring accounts to or from other
                users
              </ListItem>
              <ListItem>
                Using your Account for purposes other than personal gaming
              </ListItem>
              <p className="text-gray-300 mt-3">
                Violation of these restrictions may result in Account suspension
                or closure.
              </p>
            </SubSection>

            <SubSection number="2.2" title="Third-Party Deposits Prohibited">
              <p className="text-gray-300 mb-3">
                Only you may deposit funds into your Account. Third-party
                deposits (the "Prohibited Deposit") are strictly prohibited. If
                the Company detects a Prohibited Deposit:
              </p>
              <ListItem>
                The Company will immediately return the Prohibited Deposit using
                the same payment method
              </ListItem>
              <ListItem>
                All applicable fees and charges for the return will be deducted
              </ListItem>
              <ListItem>
                No winnings earned using the Prohibited Deposit will be paid out
              </ListItem>
              <ListItem>
                All transactions made using the Prohibited Deposit will be
                voided
              </ListItem>
              <p className="text-gray-300 mt-3">
                If your Account receives multiple Prohibited Deposits:
              </p>
              <ListItem>The Company may close your Account</ListItem>
              <ListItem>
                Your Account balance will be returned to you less all applicable
                fees and charges
              </ListItem>
            </SubSection>
          </PolicySection>
        </div>

        {/* Section 3 */}
        <div id="section-3">
          <PolicySection number="3" title="DEPOSITS INTO YOUR ACCOUNT">
            <SubSection number="3.1" title="Deposit Eligibility">
              <p className="text-gray-300">
                To participate in any game, you must have sufficient funds in
                your Account. You may only participate in a game if your Account
                balance covers the required stake.
              </p>
            </SubSection>

            <SubSection number="3.2" title="Supported Cryptocurrencies">
              <p className="text-gray-300 mb-3">
                Moonbet accepts deposits in the following virtual currencies:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "USDT (Tether on Solana or Ethereum)",
                  "USDC (USD Coin on Solana or Ethereum)",
                  "SOL (Solana)",
                  "ETH (Ethereum)",
                  "BTC (Bitcoin)",
                ].map((currency, idx) => (
                  <div
                    key={idx}
                    className="p-3 text-gray-200 font-semibold"
                    style={{
                      borderRadius: "8px",
                      border: "1px solid rgba(255, 255, 255, 0.30)",
                      background: "rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    {currency}
                  </div>
                ))}
              </div>
              <p className="text-gray-300 mt-3">
                Additional cryptocurrencies may be added by the Company at any
                time.
              </p>
            </SubSection>

            <SubSection number="3.3" title="Deposit Conversion to USDT">
              <p className="text-gray-300 mb-3">
                All deposits are automatically converted to USDT for Account
                balance management:
              </p>
              <ListItem>
                Deposits in BTC, ETH, SOL, USDC, or other currencies are
                automatically exchanged to USDT at current market rates
              </ListItem>
              <ListItem>
                The Company is not responsible for fluctuations in exchange
                rates or cryptocurrency prices
              </ListItem>
              <ListItem>
                You acknowledge that currency conversion may affect your deposit
                amount due to market conditions
              </ListItem>
              <ListItem>
                The Company shall not be liable for any losses or damages
                resulting from currency fluctuations
              </ListItem>
            </SubSection>

            <SubSection number="3.4" title="No Currency Exchange Services">
              <p className="text-gray-300">
                The Company does not offer virtual currency exchange services.
                You cannot manually change your Account balance from one
                cryptocurrency to another (e.g., BTC to ETH). All conversions
                occur automatically at deposit.
              </p>
            </SubSection>

            <SubSection number="3.5" title="Minimum Deposit Amount">
              <p className="text-gray-300 mb-3">
                A minimum deposit amount is required for each supported
                cryptocurrency. Deposits below the minimum:
              </p>
              <ListItem>Will not be processed</ListItem>
              <ListItem>Will not reach your Account</ListItem>
              <ListItem>Cannot be returned to you</ListItem>
              <p className="text-gray-300 mt-3">
                Check the deposit page in your Account for current minimum
                deposit amounts.
              </p>
            </SubSection>

            <SubSection number="3.6" title="Account Balance Calculation">
              <p className="text-gray-300 mb-3">
                Your Account balance is calculated as:
              </p>
              <ListItem>
                Virtual currency deposited and automatically converted to USDT
              </ListItem>
              <ListItem>
                Plus any winnings (including bonuses, if applicable)
              </ListItem>
              <ListItem>Minus any losses</ListItem>
              <ListItem>Minus any rakes, fees, or entry fees</ListItem>
              <ListItem>Minus any previously withdrawn amounts</ListItem>
              <ListItem>
                Minus any amounts forfeited or reclaimed by the Company due to
                fraud or violation
              </ListItem>
            </SubSection>

            <SubSection number="3.7" title="Deposit Confirmation">
              <ListItem>
                Deposited funds are available in your Account within a
                reasonable time after blockchain confirmation
              </ListItem>
              <ListItem>
                Before you can make a withdrawal, all previous deposits must be
                confirmed on the blockchain
              </ListItem>
              <ListItem>
                Processing time depends on network congestion and blockchain
                confirmation times
              </ListItem>
            </SubSection>

            <SubSection number="3.8" title="KYC Verification for Deposits">
              <p className="text-gray-300 mb-3">
                The Company reserves the right to use additional verification
                procedures when processing deposits, including:
              </p>
              <ListItem>
                Enhanced Know Your Customer (KYC) verification
              </ListItem>
              <ListItem>Request for identification documents</ListItem>
              <ListItem>Selfie with identification documents</ListItem>
              <ListItem>
                Other identity verification methods as deemed necessary
              </ListItem>
            </SubSection>

            <SubSection number="3.9" title="Deposit Protection">
              <p className="text-gray-300 mb-3">The Company:</p>
              <ListItem>Is not a financial institution</ListItem>
              <ListItem>Does not offer credit or lending services</ListItem>
              <ListItem>
                Does not convert between fiat currency and cryptocurrency
              </ListItem>
              <ListItem>Does not pay interest on Account balances</ListItem>
              <ListItem>
                Provides basic protection ensuring sufficient funds are
                available to process withdrawals
              </ListItem>
            </SubSection>
          </PolicySection>
        </div>

        {/* Section 4 */}
        <div id="section-4">
          <PolicySection number="4" title="ACCOUNT ADMINISTRATION">
            <SubSection number="4.1" title="Balance Management">
              <p className="text-gray-300 mb-3">
                The Company operates your Account by:
              </p>
              <ListItem>
                Calculating stakes you have placed or offered to place
              </ListItem>
              <ListItem>
                Determining your potential exposure at any time
              </ListItem>
              <ListItem>Calculating your available-to-play balance</ListItem>
              <ListItem>
                Updating your balance in real-time as you wager
              </ListItem>
            </SubSection>

            <SubSection number="4.2" title="Available-to-Play Balance">
              <p className="text-gray-300">
                Your "available-to-play balance" is the amount of cryptocurrency
                in your Account not yet used for a stake. This balance
                determines your maximum wager limit for games.
              </p>
            </SubSection>

            <SubSection number="4.3" title="Stake Processing">
              <p className="text-gray-300 mb-3">When you place a stake:</p>
              <ListItem>
                The wagered amount is held pending the game outcome
              </ListItem>
              <ListItem>
                Upon game completion, your balance updates with the result (win,
                loss, or tie)
              </ListItem>
              <ListItem>
                Winnings are immediately available for play or withdrawal
              </ListItem>
              <ListItem>Losses are deducted from your Account balance</ListItem>
            </SubSection>

            <SubSection number="4.4" title="Account Security">
              <p className="text-gray-300 mb-3">
                If you suspect unauthorized access to your Account:
              </p>
              <ListItem>Immediately change your password</ListItem>
              <ListItem>
                Contact Customer Support: support@moonbet.games
              </ListItem>
              <ListItem>Do not delay reporting suspicious activity</ListItem>
              <p className="text-gray-300 mt-3 font-semibold">
                Red flags include:
              </p>
              <ListItem>
                Changes to Account details you did not authorize (email,
                address, phone, login credentials)
              </ListItem>
              <ListItem>
                Activity you did not perform (deposits, withdrawals, bets)
              </ListItem>
              <ListItem>
                Password change notifications without your action
              </ListItem>
            </SubSection>
          </PolicySection>
        </div>

        {/* Section 5 - Payouts and Withdrawals */}
        <div id="section-5">
          <PolicySection number="5" title="PAYOUTS AND WITHDRAWALS">
            <SubSection number="5.1" title="Payout Processing">
              <p className="text-gray-300 mb-3">When you win:</p>
              <ListItem>
                Winnings are calculated and confirmed by the Company
              </ListItem>
              <ListItem>
                The relevant gaming provider confirms the result (where
                applicable)
              </ListItem>
              <ListItem>
                Winnings are settled in your Account immediately upon
                confirmation
              </ListItem>
              <ListItem>Funds are available for use in your Account</ListItem>
            </SubSection>

            <SubSection number="5.2" title="Payout Timing">
              <p className="text-gray-300 mb-3">
                Payouts are processed within 48 hours from submission of the
                withdrawal request. However:
              </p>
              <ListItem>
                Initial payouts require identity verification (electronic copy
                of passport or government ID)
              </ListItem>
              <ListItem>
                Counterfeit or edited documents may be forwarded to regulatory
                authorities
              </ListItem>
              <ListItem>
                The Company verifies name, surname, birthdate, and other data
                before payment
              </ListItem>
              <ListItem>
                Processing may be delayed for additional security reviews (up to
                72 hours)
              </ListItem>
              <ListItem>
                You will be notified if your withdrawal remains pending after 12
                hours
              </ListItem>
            </SubSection>

            <SubSection number="5.3" title="Payout Verification">
              <p className="text-gray-300 mb-3">
                Before processing payment, the Company will:
              </p>
              <ListItem>
                Verify your identity information matches documents provided
              </ListItem>
              <ListItem>
                Verify correspondence between name, surname, and birthdate
              </ListItem>
              <ListItem>Check for discrepancies in information</ListItem>
              <ListItem>
                Review Account for irregular activity or bonus abuse
              </ListItem>
              <p className="text-gray-300 mt-3">If discrepancies are found:</p>
              <ListItem>The Company may refuse to pay winnings</ListItem>
              <ListItem>The Company may refund all stakes</ListItem>
              <ListItem>
                You must prove identity and accuracy of information to proceed
              </ListItem>
            </SubSection>

            <SubSection number="5.4" title="Erroneous Credits">
              <p className="text-gray-300 mb-3">
                If the Company mistakenly credits your Account with winnings
                that do not belong to you (due to technical error, human error,
                or otherwise):
              </p>
              <ListItem>
                The amount remains the property of the Company
              </ListItem>
              <ListItem>
                The amount will be transferred/deducted from your Account
              </ListItem>
              <ListItem>
                If you have already withdrawn the erroneously credited amount,
                it constitutes a debt you owe to the Company
              </ListItem>
              <ListItem>
                You must notify the Company immediately at support@moonbet.games
                upon discovering the error
              </ListItem>
            </SubSection>

            <SubSection
              number="5.5"
              title="Enhanced Verification for Large Payouts"
            >
              <p className="text-gray-300 mb-3">
                The Company conducts additional verification procedures for:
              </p>
              <ListItem>
                Payouts exceeding thresholds set by the Company (varies by
                amount and jurisdiction)
              </ListItem>
              <ListItem>High-risk transactions or accounts</ListItem>
              <ListItem>Substantial winnings</ListItem>
            </SubSection>

            <SubSection number="5.6" title="Substantial Winnings">
              <p className="text-gray-300 mb-3">
                The Company reserves the right to:
              </p>
              <ListItem>Verify winning amounts with gaming providers</ListItem>
              <ListItem>
                Determine whether winnings are "substantial" (at Company's
                discretion)
              </ListItem>
              <ListItem>
                Process substantial winnings in monthly installments rather than
                lump sum
              </ListItem>
              <ListItem>Extend payout timelines for large amounts</ListItem>
            </SubSection>

            <SubSection number="5.7" title="Currency Fluctuations">
              <p className="text-gray-300 mb-3">
                The Company is not responsible for:
              </p>
              <ListItem>
                Changes in payout amounts due to cryptocurrency exchange rate
                fluctuations
              </ListItem>
              <ListItem>
                Market price volatility between withdrawal request and
                processing
              </ListItem>
              <ListItem>
                Differences in rates between exchanges or wallet providers
              </ListItem>
            </SubSection>

            <SubSection
              number="5.8"
              title="Pre-Withdrawal Wagering Requirement"
            >
              <p className="text-gray-300 mb-3">
                Before your first withdrawal, you must have wagered 100% of your
                deposit. This requirement:
              </p>
              <ListItem>Prevents fraud and money laundering</ListItem>
              <ListItem>
                Ensures Account activity demonstrates legitimate gaming
              </ListItem>
              <ListItem>
                Must be completed before any payout is processed
              </ListItem>
            </SubSection>

            <SubSection number="5.9" title="Withdrawal Eligibility">
              <p className="text-gray-300 mb-3">A withdrawal is subject to:</p>
              <ListItem>
                Wagering of virtual currency deposits or eligible bonuses
              </ListItem>
              <ListItem>
                No outstanding bonus restrictions or wagering requirements
              </ListItem>
              <ListItem>No deposit method restrictions</ListItem>
              <ListItem>Successful completion of KYC verification</ListItem>
            </SubSection>

            <SubSection number="5.10" title="Withdrawal Wallet Requirement">
              <p className="text-gray-300 mb-3">
                Withdrawals are completed to:
              </p>
              <ListItem>
                The same wallet address from which you deposited
              </ListItem>
              <ListItem>
                A confirmed e-wallet address registered with your Account
              </ListItem>
              <ListItem>
                Only wallet addresses you have verified and approved
              </ListItem>
            </SubSection>

            <SubSection number="5.11" title="Withdrawal Request Process">
              <p className="text-gray-300 mb-3">To withdraw funds:</p>
              <ListItem>
                Submit withdrawal request through your Account on the Website
              </ListItem>
              <ListItem>
                Specify amount up to your "available-to-withdraw" balance
              </ListItem>
              <ListItem>
                Select withdrawal cryptocurrency (USDT, USDC, or other available
                options)
              </ListItem>
              <ListItem>Confirm wallet address</ListItem>
              <HighlightBox variant="warning">
                <p className="text-gray-200 font-bold mb-2">
                  Withdrawal Requests Must Be:
                </p>
                <p className="text-gray-300">
                  Submitted through the application/website only
                </p>
                <p className="text-gray-200 font-bold mt-2 mb-2">
                  NOT accepted by:
                </p>
                <ListItem>Telephone</ListItem>
                <ListItem>Mail or analog mail</ListItem>
                <ListItem>Fax</ListItem>
                <ListItem>Email or social media</ListItem>
              </HighlightBox>
            </SubSection>

            <SubSection number="5.12" title="Withdrawal Security Review">
              <p className="text-gray-300 mb-3">
                Your withdrawal is subject to:
              </p>
              <ListItem>Security review by the Company</ListItem>
              <ListItem>
                KYC and identification document verification (if not previously
                completed)
              </ListItem>
              <ListItem>
                Review of your Account behavior for irregular playing patterns
              </ListItem>
              <ListItem>Fraud prevention checks</ListItem>
              <p className="text-gray-300 mt-3">
                If irregular patterns are detected or you avoid providing
                requested information:
              </p>
              <ListItem>The Company may withhold the withdrawal</ListItem>
              <ListItem>
                The Company may confiscate winnings and bonuses
              </ListItem>
              <ListItem>Your Account may be blocked</ListItem>
            </SubSection>

            <SubSection number="5.13" title="Withdrawal Processing Timeline">
              <p className="text-gray-300 mb-3">After identity verification:</p>
              <ListItem>Processing time: 10 minutes to 72 hours</ListItem>
              <ListItem>
                Standard withdrawals: typically processed within 24 hours
              </ListItem>
              <ListItem>
                Complex cases: up to 72 hours with notification if pending over
                12 hours
              </ListItem>
              <ListItem>
                Blockchain confirmation times vary based on network congestion
              </ListItem>
            </SubSection>

            <SubSection number="5.14" title="Irregular Activity Review">
              <p className="text-gray-300 mb-3">
                Before processing withdrawal, the Company reviews your Account
                for:
              </p>
              <ListItem>Irregular use of platform vulnerabilities</ListItem>
              <ListItem>Abuse of bonus features</ListItem>
              <ListItem>Collusion or duplicate account activity</ListItem>
              <ListItem>Suspicious betting patterns</ListItem>
              <p className="text-gray-300 mt-3">
                If irregular activity is detected:
              </p>
              <ListItem>The Company may withhold the withdrawal</ListItem>
              <ListItem>Winnings and bonuses may be confiscated</ListItem>
              <ListItem>Your Account may be blocked</ListItem>
            </SubSection>

            <SubSection
              number="5.15"
              title="Withdrawal from Unwagered Deposit Balance"
            >
              <p className="text-gray-300 mb-3">
                If withdrawing balance that was not fully wagered:
              </p>
              <ListItem>
                Extended Due Diligence (EDD) must be successfully completed
              </ListItem>
              <ListItem>
                The Company may apply a withdrawal charge (amount at Company's
                discretion)
              </ListItem>
            </SubSection>

            <SubSection
              number="5.16"
              title="Blockchain Transaction Responsibility"
            >
              <p className="text-gray-300 mb-3">
                After funds are withdrawn from your Account:
              </p>
              <ListItem>
                You are solely responsible for blockchain transaction outcomes
              </ListItem>
              <ListItem>
                You assume all risk of exchange restrictions or wallet provider
                limitations
              </ListItem>
              <ListItem>
                Funds may be frozen or restricted by your wallet provider due to
                gambling-related terms of service
              </ListItem>
              <ListItem>
                You must read and understand your wallet provider's terms of use
                before withdrawal
              </ListItem>
              <ListItem>
                The Company is not liable for third-party restrictions or
                freezes
              </ListItem>
            </SubSection>

            <SubSection
              number="5.17"
              title="Cryptocurrency Withdrawal Finality"
            >
              <p className="text-gray-300 mb-3">You acknowledge that:</p>
              <ListItem>
                Virtual currency transactions are instant and final
              </ListItem>
              <ListItem>
                The Company does not provide refunds or cancellations of
                withdrawals
              </ListItem>
              <ListItem>
                Once cryptocurrency leaves your Account, the Company cannot
                recover or reverse it
              </ListItem>
              <ListItem>
                You assume all responsibility for withdrawal transactions
              </ListItem>
            </SubSection>
          </PolicySection>
        </div>

        {/* Section 6 */}
        <div id="section-6">
          <PolicySection number="6" title="BONUSES AND PROMOTIONS">
            <SubSection number="6.1" title="Bonus Eligibility and Limitations">
              <p className="text-gray-300 mb-3">
                All bonuses offered by Moonbet:
              </p>
              <ListItem>
                Are limited to one bonus per person (across all linked
                accounts/devices)
              </ListItem>
              <ListItem>
                Depend on your personal information, behavior, and technical
                tools you use
              </ListItem>
              <ListItem>
                Are subject to additional criteria determined by the Company
              </ListItem>
              <ListItem>May be revoked if abuse or fraud is detected</ListItem>
            </SubSection>

            <SubSection number="6.2" title="Bonus Terms and Conditions">
              <p className="text-gray-300 mb-3">
                For each bonus or promotion offered:
              </p>
              <ListItem>
                Specific terms and conditions are provided separately
              </ListItem>
              <ListItem>
                Wagering requirements must be completed before withdrawal
              </ListItem>
              <ListItem>Time limits for bonus use apply</ListItem>
              <ListItem>Eligible games and betting restrictions apply</ListItem>
              <ListItem>Maximum bonus amounts are specified</ListItem>
            </SubSection>

            <SubSection number="6.3" title="Bonus Abuse and Forfeiture">
              <p className="text-gray-300 mb-3">Bonus abuse includes:</p>
              <ListItem>
                Opening multiple accounts to claim bonus multiple times
              </ListItem>
              <ListItem>
                Exploiting bonuses with other players (collusion)
              </ListItem>
              <ListItem>
                Using bonuses to deliberately lose or transfer value
              </ListItem>
              <ListItem>Violating bonus terms and conditions</ListItem>
              <p className="text-gray-300 mt-3">If bonus abuse is detected:</p>
              <ListItem>All bonuses will be forfeited</ListItem>
              <ListItem>Associated winnings will be confiscated</ListItem>
              <ListItem>Your Account may be closed</ListItem>
            </SubSection>

            <SubSection
              number="6.4"
              title="Non-Deposit Bonus Withdrawal Limits"
            >
              <p className="text-gray-300 mb-3">
                Winnings from non-deposit bonuses or free spins:
              </p>
              <ListItem>Have maximum withdrawal limits</ListItem>
              <ListItem>Cannot exceed the bonus amount provided</ListItem>
              <ListItem>
                Example: If you receive $100 bonus and win $300, you can
                withdraw up to $100
              </ListItem>
            </SubSection>

            <SubSection number="6.5" title="Community Contributions (Rake)">
              <p className="text-gray-300 mb-3">
                For poker and multiplayer games:
              </p>
              <ListItem>
                Customers pay commission charges (the "Community Contributions")
                to the Company
              </ListItem>
              <ListItem>
                Rake percentages and structures are detailed in the Company's
                Terms and Conditions
              </ListItem>
              <ListItem>
                Rake is deducted from pots/winnings before payment to winners
              </ListItem>
            </SubSection>
          </PolicySection>
        </div>

        {/* Section 7 */}
        <div id="section-7">
          <PolicySection number="7" title="ACCOUNT CLOSURE">
            <SubSection number="7.1" title="Voluntary Account Closure">
              <p className="text-gray-300 mb-3">To close your Account:</p>
              <ListItem>
                Contact Customer Support at support@moonbet.games
              </ListItem>
              <ListItem>
                Your remaining Account balance will be made available for
                payment
              </ListItem>
              <ListItem>
                Payment requires successful identity verification and KYC
                completion
              </ListItem>
              <ListItem>Payment method is at the Company's discretion</ListItem>
            </SubSection>

            <SubSection number="7.2" title="Company-Initiated Account Closure">
              <p className="text-gray-300 mb-3">
                The Company may close your Account and refund your
                available-to-withdraw balance if:
              </p>
              <ListItem>You violate Terms and Conditions or policies</ListItem>
              <ListItem>You engage in prohibited activities</ListItem>
              <ListItem>Regulatory requirements require closure</ListItem>
              <ListItem>A governmental body requests closure</ListItem>
              <ListItem>
                The Company deems closure necessary (at absolute discretion)
              </ListItem>
              <HighlightBox>
                <p className="text-gray-200 font-bold">
                  Note: The Company has no obligation to provide a reason for
                  account closure.
                </p>
              </HighlightBox>
            </SubSection>

            <SubSection number="7.3" title="Closure and Bonus Forfeiture">
              <p className="text-gray-300 mb-3">Upon Account closure:</p>
              <ListItem>
                Any unused bonuses awarded to you are forfeited and removed
              </ListItem>
              <ListItem>
                Bonus winnings not yet withdrawn are confiscated
              </ListItem>
              <ListItem>
                Your remaining deposit balance may be returned
              </ListItem>
            </SubSection>

            <SubSection number="7.4" title="Closure Processing">
              <p className="text-gray-300 mb-3">
                Account closure may take 24-48 hours to process. During closure:
              </p>
              <ListItem>Your Account access is restricted</ListItem>
              <ListItem>Pending transactions are completed</ListItem>
              <ListItem>Funds are prepared for return to you</ListItem>
            </SubSection>
          </PolicySection>
        </div>

        {/* Section 8 */}
        <div id="section-8">
          <PolicySection number="8" title="CONTACT AND SUPPORT">
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
                  For Account and Payout Questions:
                </h3>
                <ListItem>Email: support@moonbet.games</ListItem>
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
                  For Suspicious Activity or Security Concerns:
                </h3>
                <ListItem>Email: support@moonbet.games</ListItem>
                <ListItem>
                  Subject: "Account Security - [Your Username]"
                </ListItem>
                <ListItem>
                  Action: Change password immediately and report
                </ListItem>
              </div>
            </div>
          </PolicySection>
        </div>

        {/* Section 9 */}
        <div id="section-9">
          <PolicySection number="9" title="UPDATES TO THIS POLICY">
            <div
              className="p-6"
              style={{
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.30)",
              }}
            >
              <p className="text-gray-300 mb-4">
                This Policy may be updated at any time to:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Reflect regulatory changes",
                  "Add new supported cryptocurrencies or payment methods",
                  "Adjust processing timelines or fee structures",
                  "Enhance security or fraud prevention",
                  "Clarify policy terms",
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
                  Updates are effective upon publication. Your continued use of
                  Moonbet constitutes acceptance of updated policies.
                </p>
              </HighlightBox>
            </div>
          </PolicySection>
        </div>
      </div>
    </div>
  );
};

export default AccountPayoutsPolicyPage;
