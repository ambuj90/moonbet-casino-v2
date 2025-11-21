import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const AwardSection = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const providers = [
    { id: 1, name: "Pragmatic Play", logo: "/awards/img1.webp" },
    { id: 2, name: "Evolution", logo: "/awards/img2.webp" },
    { id: 3, name: "BGaming", logo: "/awards/img3.webp" },
    { id: 4, name: "Hacksaw Gaming", logo: "/awards/img4.png" },
    { id: 5, name: "Thunderkick", logo: "/awards/img5.webp" },
    { id: 6, name: "Play'n GO", logo: "/awards/img6.webp" },
    { id: 7, name: "Spribe", logo: "/awards/img7.webp" },
    { id: 8, name: "Endorphina", logo: "/awards/img8.webp" },
  ];

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const canLeft = scrollLeft > 5;
    const canRight = scrollLeft < scrollWidth - clientWidth - 5;

    setCanScrollLeft(canLeft);
    setCanScrollRight(canRight);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollPosition();
    container.addEventListener("scroll", checkScrollPosition);
    window.addEventListener("resize", checkScrollPosition);

    // check again after render stabilizes
    const timer = setTimeout(checkScrollPosition, 500);

    return () => {
      container.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
      clearTimeout(timer);
    };
  }, []);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 640;
    const scrollAmount = isMobile ? container.clientWidth * 0.8 : 300;

    const newPos =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({ left: newPos, behavior: "smooth" });

    // Check scroll state after animation completes
    setTimeout(checkScrollPosition, 500);
  };

  return (
    <section className="w-full py-10 relative">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-6"
        >
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10 0C4.48583 0 0 4.48583 0 10C0 15.5142 4.48583 20 10 20C15.5142 20 20 15.5142 20 10C20 4.48583 15.5142 0 10 0ZM15.8242 8.37L14.9183 13.6475C14.8667 13.9475 14.6067 14.1667 14.3025 14.1667H5.6975C5.39333 14.1667 5.13333 13.9475 5.08167 13.6475L4.17583 8.37C4.13583 8.13917 4.22917 7.905 4.41667 7.76417C4.605 7.6225 4.85417 7.6 5.06583 7.7025L7.4775 8.87667L9.45417 5.32083C9.67417 4.92333 10.3267 4.92333 10.5467 5.32083L12.5233 8.87667L14.935 7.7025C15.1458 7.6 15.3958 7.6225 15.5842 7.76417C15.7708 7.905 15.8642 8.13917 15.8242 8.37Z"
                fill="#CED5E3"
              />
            </svg>
            <h3 className="text-[#CED5E3] font-[400] text-[16px] md:text-[18px] uppercase">
              Awards
            </h3>
          </div>
        </motion.div>

        {/* Scrollable container */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {providers.map((provider, i) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex-shrink-0 w-[140px]  /20 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/5 transition-all duration-300"
              >
                <img
                  src={provider.logo}
                  alt={provider.name}
                  className="w-full h-full  object-contain 
      filter brightness-0 invert opacity-80 
      hover:opacity-100 
      transition-opacity
    "
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = `<span class='text-white/60 text-xs font-medium text-center'>${provider.name}</span>`;
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardSection;
