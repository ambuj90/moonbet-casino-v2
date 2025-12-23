// src/components/sections/HomeRewardsSection.jsx (MOBILE FIXED)
import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, scale, useInView } from "framer-motion";
import { Link } from "react-router-dom";

const HomeRewardsSection = () => {
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Memoized rewards data to prevent recreation on every render
  const rewardsData = useMemo(
    () => [
      {
        id: 1,
        badge: "Bonus",
        titleLine1: "Upto $100,000",
        titleLine2: "Bonus",
        description1: "Elite Status, Stellar",
        description2: "Awards",
        img: "/rewards/rewards7.png",
        bg: "/rewards/bg-reward.png",
        link: "/promotions",
        buttonText: "Claim Rewards",
      },
      {
        id: 2,
        badge: "Live Casino",
        titleLine1: "Live Casino",
        titleLine2: "Games",
        description1: "Odds out of this",
        description2: "world.",
        img: "/rewards/rewards8.png",
        link: "/casino/live-casino",
        buttonText: "Play Now",
      },
      {
        id: 3,
        badge: "Leaderboard",
        titleLine1: "Tournament & ",
        titleLine2: "Leaderboard",
        description1: "Best out of all Crash",
        description2: "games out there.",
        img: "/rewards/rewards10.png",
        link: "/leaderboard",
        buttonText: "View Now",
      },
    ],
    []
  );

  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (id, fallbackImg) => {
    setImageErrors((prev) => ({ ...prev, [id]: fallbackImg }));
  };

  // Optimized scroll handler with debouncing via RAF
  useEffect(() => {
    const container = document.querySelector(".rewards-scroll-container");
    if (!container) return;

    let rafId = null;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const scrollLeft = container.scrollLeft;
        const containerWidth = container.offsetWidth;
        const newIndex = Math.round(scrollLeft / containerWidth);
        setCurrentIndex(
          Math.min(Math.max(0, newIndex), rewardsData.length - 1)
        );
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [rewardsData.length]);

  // Simplified animation variants (GPU-accelerated)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-2 md:py-4 relative overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6">
        {/* Cards Container */}
        <div
          className="rewards-scroll-container overflow-x-auto lg:overflow-visible scrollbar-hide w-full"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollBehavior: "smooth",
          }}
        >
          <motion.div
            className="flex lg:grid lg:grid-cols-3 gap-4 lg:gap-[10px] pb-4 lg:pb-0"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {rewardsData.map((reward) => (
              <motion.div
                key={reward.id}
                variants={cardVariants}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className="flex-shrink-0 lg:flex-shrink w-full md:w-[calc(50%-8px)] lg:w-auto snap-center"
              >
                <Link to={reward.link}>
                  <div
                    className="reward_btn relative rounded-[15px] group cursor-pointer will-change-transform overflow-visible mt-8 md-mt-0"
                    style={{
                      width: "100%",
                      height: "195px",
                    }}
                  >
                    {/* Content - Left Side */}
                    <div
                      className="absolute left-0 md:top-0 top-2 bottom-0 z-10 flex flex-col justify-start gap-4 md:p-6 p-4"
                      style={{ width: "50%" }}
                    >
                      {/* Badge */}
                      <span
                        className="inline-block w-fit px-2 md:px-1.5 py-0 rounded-full"
                        style={{
                          color: "var(--text-charcoal",
                          fontStyle: "normal",
                          fontWeight: 700,
                          lineHeight: "24px" /* 171.429% */,
                          borderRadius: "4px",
                          background: "#C8C8E1",
                        }}
                      >
                        {reward.badge}
                      </span>

                      {/* Title & Description */}
                      <div>
                        <h3
                          className="text-[18px] md:text-[20px]"
                          style={{
                            color: "#E5EAF2",
                            fontFamily: "Neue Plak",
                            fontWeight: 400,
                            lineHeight: "24px",
                          }}
                        >
                          {reward.titleLine1}
                          <br />
                          {reward.titleLine2}
                        </h3>
                      </div>

                      {/* Button */}
                      <button
                        className="px-3 inline-block w-fit py-1 rounded-md font-bold text-white border border-white/80"
                        style={{
                          color: "#E1E1E1",
                          fontFamily: "Neue Plak",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "24px",
                        }}
                      >
                        {reward.buttonText}
                      </button>
                    </div>

                    {/* Image - Right Side (Fixed Size) */}
                    <div className="absolute right-0 top-1/2 -translate-y-[58%] w-[53%] overflow-visible pointer-events-none z-20">
                      {/* Background Box */}
                      <div className="flex items-center justify-center ">
                        {/* Image */}
                        <img
                          src={imageErrors[reward.id] || reward.img}
                          alt={reward.titleLine2}
                          loading="lazy"
                          className="w-full h-auto object-contain drop-shadow-2xl"
                          onError={(e) => {
                            e.target.onerror = null;
                            handleImageError(reward.id, reward.fallbackImg);
                            e.target.src = reward.fallbackImg;
                          }}
                        />
                      </div>
                    </div>

                    {/* Hover Effect - GPU Accelerated */}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile Scroll Indicators */}
        <div className="flex lg:hidden justify-center gap-2">
          {rewardsData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const container = document.querySelector(
                  ".rewards-scroll-container"
                );
                if (container) {
                  const scrollAmount = container.offsetWidth * index;
                  container.scrollTo({
                    left: scrollAmount,
                    behavior: "smooth",
                  });
                }
              }}
              className={`transition-all duration-300 ${
                currentIndex === index
                  ? "w-8 h-2 bg-[#282753]"
                  : "w-2 h-2 bg-white/20"
              } rounded-full`}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Mobile: Force one card view */
        @media (max-width: 1023px) {
          .rewards-scroll-container {
            scroll-snap-type: x mandatory;
            scroll-padding: 0 16px;
          }

          .rewards-scroll-container > div > div {
            scroll-snap-align: center;
            scroll-snap-stop: always;
          }
        }
        /* Tablet layout fix */
        @media (min-width: 768px) and (max-width: 1024px) {
          .rewards-scroll-container {
            overflow-x: auto;
            scroll-snap-type: x mandatory;
          }
          .rewards-scroll-container > div {
            display: flex;
            gap: 16px;
          }
          .rewards-scroll-container > div > div {
            min-width: calc(50% - 8px);
            flex-shrink: 0;
            scroll-snap-align: start;
          }
          .reward_btn {
            width: 100%;
            height: 220px;
          }
        }
      `}</style>
    </section>
  );
};

export default HomeRewardsSection;
