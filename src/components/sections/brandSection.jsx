import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const BrandSection = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const providers = [
    { id: 10, name: "Nolimit", logo: "/brands/img10.webp" },
    { id: 9, name: "3oaks", logo: "/brands/img9.webp" },
    { id: 3, name: "BGaming", logo: "/brands/img3.webp" },
    { id: 2, name: "Evolution", logo: "/brands/img2.webp" },
    { id: 1, name: "Pragmatic Play", logo: "/brands/img1.webp" },
    { id: 7, name: "Spribe", logo: "/brands/img7.webp" },
    { id: 8, name: "Endorphina", logo: "/brands/img8.webp" },
    { id: 4, name: "Hacksaw Gaming", logo: "/brands/img4.webp" },
    { id: 5, name: "Thunderkick", logo: "/brands/img5.webp" },
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
    <section className="w-full py-8 relative">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-6"
        ></motion.div>

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
                className="flex-shrink-0 w-[25%] sm:w-[140px] sm:h-[60px] h-[50px] bg-[#080808]/20 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/5 transition-all duration-300"
              >
                <img
                  src={provider.logo}
                  alt={provider.name}
                  className="max-w-[80px] sm:max-w-[120px] max-h-[35px] sm:max-h-[40px] object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
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

export default BrandSection;
