// src/components/sections/HomeRewardsSection.jsx (MOBILE FIXED)
import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, scale, useInView } from "framer-motion";

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
        titleLine1: "Upto $20,000",
        titleLine2: "Bonus",
        description1: "Elite Status, Stellar",
        description2: "Awards",
        img: "/rewards/rewards7.png",
        bg: "/rewards/bg-reward.png",
      },
      {
        id: 2,
        badge: "Live Casino",
        titleLine1: "Live Casino",
        titleLine2: "Games",
        description1: "Odds out of this",
        description2: "world.",
        img: "/rewards/rewards8.png",
      },
      {
        id: 3,
        badge: "Leaderboard",
        titleLine1: "Tournament & ",
        titleLine2: "Leaderboard",
        description1: "Best out of all Crash",
        description2: "games out there.",
        img: "/rewards/rewards10.png",
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
      className="w-full py-16 md:py-12 relative overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6">
        {/* Cards Container */}
        <div
          className="rewards-scroll-container overflow-x-auto lg:overflow-visible scrollbar-hide"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
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
                className="flex-shrink-0 lg:flex-shrink w-full lg:w-auto snap-center"
                style={{
                  minWidth:
                    window.innerWidth < 1024 ? "calc(100vw - 32px)" : "auto",
                  maxWidth:
                    window.innerWidth < 1024 ? "calc(100vw - 32px)" : "100%",
                }}
              >
                <div
                  className="reward_btn relative rounded-[15px] group cursor-pointer will-change-transform overflow-visible"
                  style={{
                    width: "100%",
                    height: "195px",
                    background: "#2A2A2A",
                    boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
                    backdropFilter: "blur(2px)",
                  }}
                >
                  {/* Content - Left Side */}
                  <div
                    className="absolute left-0 top-0 bottom-0 z-10 flex flex-col justify-start gap-5 p-6"
                    style={{ width: "50%" }}
                  >
                    {/* Badge */}
                    <span
                      className="inline-block w-fit px-3 py-0 rounded-full"
                      style={{
                        background: "var(--color-bg-elevated)",
                        fontFamily: "Neue Plak, sans-serif",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "24px",
                        borderRadius: "4px",
                        padding: "0px 12px",
                      }}
                    >
                      {reward.badge}
                    </span>

                    {/* Title & Description */}
                    <div>
                      <h3
                        className="mb-2"
                        style={{
                          color: "#E5EAF2",
                          fontFamily: "Neue Plak, sans-serif",
                          fontSize: "20px",
                          fontWeight: 400,
                          lineHeight: "23px",
                        }}
                      >
                        {reward.titleLine1}
                        <br />
                        {reward.titleLine2}
                      </h3>
                    </div>
                  </div>

                  {/* Image - Right Side (Fixed Size) */}
                  <div className="absolute right-0 top-1/2 -translate-y-[58%] w-[52%] overflow-visible pointer-events-none z-20">
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
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none rounded-[15px]"
                    style={{
                      transition:
                        "opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
                      willChange: "opacity",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile Scroll Indicators */}
        <div className="flex lg:hidden justify-center gap-2 mt-6">
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
                  ? "w-8 h-2 bg-[#F07730]"
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
      `}</style>
    </section>
  );
};

export default HomeRewardsSection;
