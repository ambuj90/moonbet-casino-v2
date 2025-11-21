// src/components/sections/HomeFAQSection.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HomeFAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "Is Moonbet safe and legit?",
      paragraphs: [
        "Moonbet is committed to providing a safe environment for our community.",
        "For Moonbet, Safety and security are paramount as one of the fairest online casinos.",
      ],
      bullets: [
        "Fully licensed by strict regulators",
        "Uses Military-standard encryption to protect players",
        "Fair games proven with Provably Fair technology",
        "Games are audited once a week",
        "Funds secured in cold storage wallets (Tangem, Ledger)",
      ],
    },
    {
      question: "What types of Casino games can I play?",
      paragraphs: [
        "You can choose upto 4000 games that we have.",
        "Here are the most famous ones:",
      ],
      bullets: ["BlackJack", "Baccarat", "Plinko", "Crash", "Slots"],
    },
    {
      question: "Can i try the games before wagering money?",
      paragraphs: [
        "Yes. We have demos on almost all our games. You can check them out and make strategies before you actually want to gamble.",
      ],
    },
    {
      question: "What game providers do you work with and why?",
      paragraphs: [
        "We at Moonbet have our own games with upto 100% RTP and we work with best quality software providers in the industry.",
        "In the list below, you can see the gaming providers we work with at our online casino.",
      ],
      providers: [
        "Evolution",
        "Big Time Gaming",
        "Pragmatic Play",
        "Quickspin",
        "Blueprint Gaming",
        "ELK Studios",
        "Evoplay",
      ],
      endParagraphs: [
        "We audit most of the games by these providers to showcase on our website.",
        "As you can see, the Moonbet casino has the industry's most exclusive gaming providers.",
      ],
    },
    {
      question: "What payment methods does Moonbet accept?",
      paragraphs: [
        "Moonbet is awarded the #1 Crypto casino title by a lot of newspapers online.",
        "So yes, Moonbet accepts major Cryptocurrencies – Bitcoin, Ethereum, Solana, USDT, and all major tokens.",
        "Connect any Web3 wallet such as Phantom or Metamask, whatever you prefer.",
        "No fiat complications.",
      ],
    },
    {
      question: "Is my cryptocurrency safe at Moonbet?",
      paragraphs: [
        "Yes, Your Cryptocurrency is safe with us.",
        "Your crypto sits behind Solana blockchain security plus Fireblocks enterprise protection.",
        "Funds are safer than being on exchanges and your wallets.",
      ],
    },
    {
      question: "How long does it take for my deposit to show on my balance?",
      paragraphs: [
        "Cryptocurrency deposits on Moonbet are credited as soon as the transaction reaches one confirmation on the blockchain.",
        "This process is instant. Once confirmation hits, the funds will appear in your balance.",
        "Disclaimer — Moonbet has no control over blockchain speed, as they depend entirely on network traffic and the cryptocurrency you’re using.",
        "We recommend using Solana for the fastest speeds.",
        "Here are the average confirmation times for popular coins:",
      ],
      times: [
        "BTC: Under 10–20 minutes",
        "ETH: Under 1 minute",
        "XRP: Under 1 minute",
        "USDT: Under 1 minute",
        "LTC: Under 10 minutes",
        "SOL: Under 1 minute",
        "TRX: Under 2 minutes",
        "BNB: Under 2 minutes",
        "Dogecoin: Under 10 minutes",
      ],
    },
    {
      question: "How long does it take for a withdrawal to be processed?",
      paragraphs: [
        "Cryptocurrency withdrawals on Moonbet are processed and sent within 5 minutes.",
        "Once the withdrawal is sent, it depends on the blockchain confirmation time and your wallet provider’s policies.",
        "Here are the average confirmation times for popular coins:",
      ],
      times: [
        "BTC: Under 10–20 minutes",
        "ETH: Under 1 minute",
        "XRP: Under 1 minute",
        "USDT: Under 1 minute",
        "LTC: Under 10 minutes",
        "SOL: Under 1 minute",
        "TRX: Under 2 minutes",
        "BNB: Under 2 minutes",
        "Dogecoin: Under 10 minutes",
      ],
      endParagraphs: [
        "If there’s a delay beyond the usual time, you can check the transaction on a blockchain explorer or reach out to our support team.",
      ],
    },
    {
      question: "Can I play on mobile devices?",
      paragraphs: [
        "Yes, You can play these games on your mobile.",
        "Games run perfectly on any device - mobile, tablet, or desktop.",
      ],
    },
    {
      question: "Can i watch the live streams of my favorite sport or players?",
      paragraphs: ["Yes. Details are coming soon on how to access them."],
    },
    {
      question: "How do I contact customer support?",
      paragraphs: [
        "24/7 live chat with actual humans who understand crypto. You can also reach us on X, Discord, and Telegram.",
      ],
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // ⭐ Unified Rendering System
  const renderAnswer = (faq) => (
    <div className="text-[#E5EAF2] space-y-6 leading-relaxed">
      {/* Paragraphs */}
      {faq.paragraphs?.map((p, i) => (
        <p key={i} className="text-[16px] md:text-[18px] opacity-90">
          {p}
        </p>
      ))}

      {/* Bullets */}
      {faq.bullets && (
        <ul className="list-disc list-inside space-y-2 pl-4 text-[16px] md:text-[18px] opacity-90">
          {faq.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}

      {/* Providers (same style as list but with dots) */}
      {faq.providers && (
        <ul className="list-none space-y-2 pl-6 text-[16px] md:text-[18px] opacity-90">
          {faq.providers.map((p, i) => (
            <li key={i} className="before:content-['•'] before:mr-3">
              {p}
            </li>
          ))}
        </ul>
      )}

      {/* Times list */}
      {faq.times && (
        <ul className="list-none space-y-2 pl-6 text-[16px] md:text-[18px] opacity-90">
          {faq.times.map((t, i) => (
            <li key={i} className="before:content-['•'] before:mr-3">
              {t}
            </li>
          ))}
        </ul>
      )}

      {/* Ending paragraphs */}
      {faq.endParagraphs?.map((p, i) => (
        <p key={i} className="text-[16px] md:text-[18px] opacity-90">
          {p}
        </p>
      ))}

      {/* Fallback answer */}
      {faq.answer && (
        <p className="text-[16px] md:text-[18px] opacity-90">{faq.answer}</p>
      )}
    </div>
  );

  return (
    <section className="w-full py-10 bg-[#000]">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-center text-[#E5EAF2] text-[26px] font-[400] leading-[34px] uppercase">
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </motion.div>

        {/* FAQ */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative rounded-lg p-[1px] bg-[linear-gradient(106deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.10)_35%,rgba(255,255,255,0.05)_70%,rgba(255,255,255,0)_100%)]"
            >
              <div className="rounded-lg bg-[#0A0B0D]/80 backdrop-blur-sm">
                {/* Question */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-2 text-left flex justify-between items-center"
                >
                  <p className="text-base md:text-lg font-[400] text-[#CED5E3] pr-4">
                    {index + 1}. {faq.question}
                  </p>
                  <motion.span
                    animate={{ rotate: activeIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl text-[#CED5E3]"
                  >
                    +
                  </motion.span>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden px-6 pb-6"
                    >
                      {renderAnswer(faq)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFAQSection;
