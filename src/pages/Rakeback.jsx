import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// RackBack Icon Component
const RackBackIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="16"
    viewBox="0 0 20 16"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1.79253 16C1.71049 16 1.64018 15.9543 1.59331 15.8972C1.45268 15.6916 0.374551 12.1399 0.0229867 11.3976C-0.0356073 11.2834 0.0229867 11.1463 0.140175 11.1006C2.4605 10.0385 3.18706 9.3419 4.03082 8.51963L4.18316 8.37116C4.60504 7.97145 5.71833 6.89793 6.97224 7.80014C9.42147 9.54747 11.0152 9.79872 11.5894 9.82156C11.8824 9.8444 12.773 9.87866 12.9137 10.4383C13.0309 10.9408 12.4332 11.4661 11.9527 11.8087C13.6871 11.9229 14.5895 11.3176 15.5738 10.6552C15.9371 10.4154 16.3004 10.1642 16.734 9.93576C17.2379 9.67309 19.5348 9.04497 19.9332 9.58173C20.027 9.70735 20.0739 9.94718 19.7106 10.2784C14.8004 14.7438 11.9527 15.0407 10.9566 14.9607C10.3824 14.9151 9.72616 14.7552 9.04647 14.5953C7.82771 14.2984 6.56208 13.99 5.48395 14.2413C3.86675 14.6752 1.93315 15.9429 1.92143 15.9543C1.88628 15.9772 1.8394 16 1.79253 16Z"
      fill="url(#paint0_linear_10438_6530)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.90584 6.77231C8.85897 6.77231 8.81209 6.74946 8.77693 6.72662C8.70662 6.68094 8.67146 6.58958 8.68318 6.50964L8.97615 4.3626L7.44099 2.798C7.3824 2.7409 7.35896 2.64954 7.3824 2.56959C7.41755 2.48965 7.48787 2.43255 7.5699 2.42113L9.7496 2.03283L10.8043 0.125625C10.8512 0.0456817 10.9215 0 11.0152 0C11.0973 0 11.1793 0.0456817 11.2144 0.125625L12.2691 2.03283L14.4606 2.42113C14.5426 2.43255 14.6129 2.48965 14.6363 2.56959C14.6598 2.64954 14.6481 2.7409 14.5895 2.798L13.0543 4.3626L13.3473 6.50964C13.359 6.58958 13.3238 6.68094 13.2535 6.72662C13.1832 6.77231 13.0895 6.78373 13.0074 6.74946L11.0152 5.80157L9.01131 6.74946C8.97615 6.76089 8.941 6.77231 8.90584 6.77231Z"
      fill="url(#paint1_linear_10438_6530)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_10438_6530"
        x1="-1.56462e-08"
        y1="2.4"
        x2="19.7862"
        y2="23.5995"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FFB8A1" />
        <stop offset="1" stop-color="#A62A00" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_10438_6530"
        x1="-1.56462e-08"
        y1="2.4"
        x2="19.7862"
        y2="23.5995"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FFB8A1" />
        <stop offset="1" stop-color="#A62A00" />
      </linearGradient>
    </defs>
  </svg>
);
const BonusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1.79253 18C1.71049 18 1.64018 17.9543 1.59331 17.8972C1.45268 17.6916 0.374551 14.1399 0.0229867 13.3976C-0.0356073 13.2834 0.0229867 13.1463 0.140175 13.1006C2.4605 12.0385 3.18706 11.3419 4.03082 10.5196L4.18316 10.3712C4.60504 9.97145 5.71833 8.89793 6.97224 9.80014C9.42147 11.5475 11.0152 11.7987 11.5894 11.8216C11.8824 11.8444 12.773 11.8787 12.9137 12.4383C13.0309 12.9408 12.4332 13.4661 11.9527 13.8087C13.6871 13.9229 14.5895 13.3176 15.5738 12.6552C15.9371 12.4154 16.3004 12.1642 16.734 11.9358C17.2379 11.6731 19.5348 11.045 19.9332 11.5817C20.027 11.7074 20.0739 11.9472 19.7106 12.2784C14.8004 16.7438 11.9527 17.0407 10.9566 16.9607C10.3824 16.9151 9.72616 16.7552 9.04647 16.5953C7.82771 16.2984 6.56208 15.99 5.48395 16.2413C3.86675 16.6752 1.93315 17.9429 1.92143 17.9543C1.88628 17.9772 1.8394 18 1.79253 18Z"
      fill="url(#paint0_linear_10244_2073)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.90584 8.77231C8.85897 8.77231 8.81209 8.74946 8.77693 8.72662C8.70662 8.68094 8.67146 8.58958 8.68318 8.50964L8.97615 6.3626L7.44099 4.798C7.3824 4.7409 7.35896 4.64954 7.3824 4.56959C7.41755 4.48965 7.48787 4.43255 7.5699 4.42113L9.7496 4.03283L10.8043 2.12562C10.8512 2.04568 10.9215 2 11.0152 2C11.0973 2 11.1793 2.04568 11.2144 2.12562L12.2691 4.03283L14.4606 4.42113C14.5426 4.43255 14.6129 4.48965 14.6363 4.56959C14.6598 4.64954 14.6481 4.7409 14.5895 4.798L13.0543 6.3626L13.3473 8.50964C13.359 8.58958 13.3238 8.68094 13.2535 8.72662C13.1832 8.77231 13.0895 8.78373 13.0074 8.74946L11.0152 7.80157L9.01131 8.74946C8.97615 8.76089 8.941 8.77231 8.90584 8.77231Z"
      fill="url(#paint1_linear_10244_2073)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_10244_2073"
        x1="-1.56462e-08"
        y1="4.4"
        x2="19.7862"
        y2="25.5995"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FFB8A1" />
        <stop offset="1" stop-color="#A62A00" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_10244_2073"
        x1="-1.56462e-08"
        y1="4.4"
        x2="19.7862"
        y2="25.5995"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FFB8A1" />
        <stop offset="1" stop-color="#A62A00" />
      </linearGradient>
    </defs>
  </svg>
);

// Rakeback Content Component
const RakebackContent = () => {
  const [isClaimLoading, setIsClaimLoading] = useState(false);

  const handleClaimRakeback = () => {
    setIsClaimLoading(true);
    // Add your claim logic here
    setTimeout(() => {
      setIsClaimLoading(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Title */}
      <div className="flex items-center gap-3">
        <RackBackIcon />
        <h2
          className="text-lg sm:text-xl font-bold tracking-wide uppercase"
          style={{
            background: "linear-gradient(90deg, #FFFFFF 0%, #E8E8E8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          50% Rakeback - Earn on Every Bet
        </h2>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed">
        Now this bonus is the golden goose for serious crypto players. Every
        wager generates real cash back to your wallet, regardless of the
        outcome.
      </p>

      {/* What you get */}
      <div className="space-y-3">
        <p className="text-white font-semibold text-sm">What you get</p>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>$3 per $1,000 wagered (10% of house edge returned)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>Instant payouts. Withdraw anytime.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>Works on all games, including 99%+ RTP originals</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>Scales with VIP tier</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>Zero time limits. Zero expiration.</span>
          </li>
        </ul>
      </div>

      {/* The Math */}
      <div className="space-y-3">
        <p className="text-white font-semibold text-sm">The Math</p>
        <div className="text-gray-400 text-sm space-y-1">
          <p>
            $100,000 monthly wagering × $3 per thousand = $300/month in rakeback
          </p>
          <p>$300/month × 12 months = $3,600 annual value</p>
          <p className="mt-2">
            Reinvest that rakeback and earn rakeback on it. Compound growth.
          </p>
        </div>
      </div>

      {/* Duration */}
      <div className="space-y-2">
        <p className="text-white font-semibold text-sm">
          Duration:{" "}
          <span className="text-gray-400 text-sm ml-1">
            Ongoing (no expiration)
          </span>
        </p>
      </div>

      {/* Terms & Conditions */}
      <div className="space-y-3">
        <p className="text-white font-semibold text-sm">Terms & Conditions</p>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>Available to all players upon sign up</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>
              You can either choose this or the 200% deposit bonus, not both
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>Calculated on net wagering amount</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>Paid daily to your account</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>
              Eligibility: All game types (slots, live dealer, table games,
              originals)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>No restrictions on withdrawal timing</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>VIP players receive boosted rakeback percentages</span>
          </li>
        </ul>
      </div>

      {/* Claim Button */}
      <motion.button
        whileHover={{
          scale: 1.02,
          boxShadow: "0 6px 25px rgba(240, 119, 48, 0.4)",
        }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClaimRakeback}
        disabled={isClaimLoading}
        className="px-6 py-2 transition-all disabled:opacity-70"
        style={{
          borderRadius: "50px",
          fontSize: "18px",
          fontWeight: 600,
          background:
            "var(--orange-cta, linear-gradient(180deg, #FFB8A1 0%, #A62A00 100%))",
          boxShadow:
            "0 3px 3px rgba(255, 255, 255, 0.25) inset, 0 3px 3px rgba(0, 0, 0, 0.25)",
        }}
      >
        {isClaimLoading ? "Claiming..." : "Claim Rakeback"}
      </motion.button>
    </motion.div>
  );
};

// Bonus Card Component - Updated to match the design
const BonusCard = ({
  badge,
  title,
  description,
  buttonText,
  buttonAction,
  image,
  isExpanded,
  onToggle,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="rounded-xl overflow-hidden"
      style={{
        background: "rgba(30, 27, 75, 0.4)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="flex h-full">
        {/* Left Content */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          {/* Badge */}
          <div>
            <div
              className="inline-block px-4 py-1.5 text-[11px] uppercase tracking-wider mb-4"
              style={{
                background: "#35326B",
                borderRadius: "8px",
              }}
            >
              <h6>{badge}</h6>
            </div>

            {/* Title */}
            <p className=" text-base mb-2">{title}</p>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {description}
            </p>

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={buttonAction}
              className="px-5 py-2 text-sm font-semibold text-white transition-all"
              style={{
                borderRadius: "50px",
                background: "linear-gradient(180deg, #FFB8A1 0%, #A62A00 100%)",
                boxShadow:
                  "0 2px 2px rgba(255, 255, 255, 0.2) inset, 0 2px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              {buttonText}
            </motion.button>
          </div>

          {/* Know More Toggle */}
          <button
            onClick={"#"}
            className="flex items-center gap-1 text-gray-400 text-sm mt-4 hover:text-white transition-colors w-fit"
          >
            <span>Know More</span>
            <motion.svg
              animate={{ rotate: isExpanded ? 180 : 0 }}
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </button>
        </div>

        {/* Right Image */}
        <div className="w-40 sm:w-48 md:w-56 flex-shrink-0 relative">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-white/10"
          >
            <div className="p-5 text-gray-400 text-sm space-y-2">
              <p>• Available for new and existing players</p>
              <p>• No hidden wagering requirements</p>
              <p>• Instant credit to your account</p>
              <p>• Compatible with all supported cryptocurrencies</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Bonus Content Component
const BonusContent = () => {
  const navigate = useNavigate();
  const [expandedCard, setExpandedCard] = useState(null);

  const handleToggleCard = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Title */}
      <div className="flex items-center gap-3">
        <BonusIcon />
        <h2
          className="text-lg sm:text-xl font-bold tracking-wide uppercase"
          style={{
            background: "linear-gradient(90deg, #FFFFFF 0%, #E8E8E8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          MoonBet Promotions - Play. Unlock. Earn.
        </h2>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed">
        You gain something on every single bet at Moonbet. Forget impossible
        wagering multipliers, balance traps, and catches you never saw coming.
      </p>

      {/* Choose Your Reward */}
      <div className="space-y-2">
        <p className="text-white font-semibold text-sm">Choose Your Reward</p>
        <p className="text-gray-500 text-xs">
          Click any card below to see full terms, conditions, and how to claim.
        </p>
      </div>

      {/* Bonus Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Welcome Bonus Card */}
        <BonusCard
          badge="Welcome Bonus"
          title="200% Match Up to $100,000 or 1 BTC"
          description="Double the bankroll at none of the wagering requirements."
          buttonText="Claim Deposit Bonus"
          buttonAction={() => {
            // Handle deposit bonus claim
            console.log("Claim deposit bonus");
          }}
          image="/brands/bonus1.svg"
          isExpanded={expandedCard === "welcome"}
          onToggle={() => handleToggleCard("welcome")}
        />

        {/* Daily & Monthly Rewards Card */}
        <BonusCard
          badge="Daily & Monthly Rewards"
          title="Just For Playing"
          description="Every session brings extra perks and rewards beyond the welcome bonus or rakeback."
          buttonText="Leaderboard"
          buttonAction={() => navigate("/leaderboard")}
          image="/brands/bonus2.svg"
          isExpanded={expandedCard === "daily"}
          onToggle={() => handleToggleCard("daily")}
        />
      </div>
    </motion.div>
  );
};

// Main RackBack Page Component
const RackBack = () => {
  const [activeTab, setActiveTab] = useState("rakeback");

  return (
    <section className="w-full py-6 sm:py-12 md:py-16 min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div
          className="flex gap-1 mb-6 sm:mb-8 p-1 rounded-full overflow-x-auto scrollbar-hide w-fit"
          style={{
            background: "#282753",
          }}
        >
          {["rakeback", "bonus"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-5 sm:px-6 py-2 font-medium text-sm rounded-full transition-all duration-200 ${
                activeTab === tab
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="rackbackTab"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(180deg, #FFB8A1 0%, #A62A00 100%)",
                  }}
                  transition={{ type: "spring", duration: 0.4 }}
                />
              )}
              <span className="relative z-10 capitalize font-semibold">
                {tab}
              </span>
            </button>
          ))}
        </div>

        {/* Content Container */}
        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{
            background:
              "linear-gradient(160deg, rgba(40, 35, 80, 0.6) 0%, rgba(25, 22, 55, 0.8) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(20px)",
          }}
        >
          <AnimatePresence mode="wait">
            {activeTab === "rakeback" ? (
              <RakebackContent key="rakeback" />
            ) : (
              <BonusContent key="bonus" />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default RackBack;
