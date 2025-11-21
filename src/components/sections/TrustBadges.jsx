import React from "react";
import { motion } from "framer-motion";

const TrustBadgesFinal = () => {
  const badges = [
    {
      id: 1,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 33 33"
          fill="none"
          className="w-full h-full"
        >
          <path
            d="M33 16.7578C33 17.4698 32.4229 18.0469 31.7109 18.0469H29.7773V19.9805C29.7773 20.6925 29.2003 21.2695 28.4883 21.2695C27.7763 21.2695 27.1992 20.6925 27.1992 19.9805V18.0469H25.2656C24.5536 18.0469 23.9766 17.4698 23.9766 16.7578C23.9766 16.0458 24.5536 15.4688 25.2656 15.4688H27.1992V13.5352C27.1992 12.8232 27.7763 12.2461 28.4883 12.2461C29.2003 12.2461 29.7773 12.8232 29.7773 13.5352V15.4688H31.7109C32.4229 15.4688 33 16.0458 33 16.7578ZM29.8128 23.9758C29.224 23.5755 28.4223 23.7283 28.022 24.317C25.423 28.1396 21.1157 30.4219 16.5 30.4219C8.82353 30.4219 2.57812 24.1765 2.57812 16.5C2.57812 8.82353 8.82353 2.57812 16.5 2.57812C21.2141 2.57812 25.572 4.9362 28.1575 8.88622C28.5474 9.48191 29.3463 9.64858 29.942 9.25859C30.5377 8.86885 30.7046 8.06973 30.3146 7.47404C27.2511 2.79414 22.0868 0 16.5 0C12.0928 0 7.94913 1.71632 4.83273 4.83273C1.71632 7.94913 0 12.0928 0 16.5C0 20.9072 1.71632 25.0509 4.83273 28.1673C7.94913 31.2837 12.0928 33 16.5 33C21.9702 33 27.0746 30.296 30.154 25.7666C30.5543 25.1778 30.4015 24.3761 29.8128 23.9758ZM9.60352 22.623C10.3155 22.623 10.8926 22.046 10.8926 21.334V11.7305C10.8926 11.2453 10.6202 10.8012 10.1876 10.5814C9.75508 10.3613 9.23568 10.4031 8.84367 10.6891L6.45891 12.4294C5.88387 12.8491 5.75773 13.6555 6.17743 14.2305C6.59713 14.8056 7.40355 14.9315 7.97859 14.512L8.31445 14.2668V21.334C8.31445 22.046 8.89151 22.623 9.60352 22.623ZM13.4707 18.7559C13.4707 17.7244 13.8776 16.7865 14.5382 16.0924C14.0717 15.4922 13.793 14.7391 13.793 13.9219C13.793 11.9671 15.3831 10.377 17.3379 10.377C19.2926 10.377 20.8828 11.9671 20.8828 13.9219C20.8828 14.7391 20.6041 15.4922 20.1376 16.0924C20.7982 16.7865 21.2051 17.7244 21.2051 18.7559C21.2051 20.8884 19.4704 22.623 17.3379 22.623C15.2054 22.623 13.4707 20.8884 13.4707 18.7559ZM18.627 18.7559C18.627 18.0451 18.0486 17.4668 17.3379 17.4668C16.6271 17.4668 16.0488 18.0451 16.0488 18.7559C16.0488 19.4666 16.6271 20.0449 17.3379 20.0449C18.0486 20.0449 18.627 19.4666 18.627 18.7559ZM16.3711 13.9219C16.3711 14.4549 16.8049 14.8887 17.3379 14.8887C17.8709 14.8887 18.3047 14.4549 18.3047 13.9219C18.3047 13.3889 17.8709 12.9551 17.3379 12.9551C16.8049 12.9551 16.3711 13.3889 16.3711 13.9219Z"
            fill="#CED5E3"
          />
        </svg>
      ),
      title: "Responsible Gambling",
      mobileTitle: "18+ Only",
    },
    {
      id: 2,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 28 33"
          fill="none"
          className="w-full h-full"
        >
          <path
            d="M24.8034 3.57229L16.3388 0.423934C14.8179 -0.141311 13.1621 -0.141311 11.6596 0.423934L3.1767 3.57229C1.27405 4.28796 0 6.11741 0 8.13376V16.655C0 20.3686 1.71253 23.5732 3.95554 26.1943C6.18168 28.7956 8.91989 30.8135 10.9743 32.1141C11.9065 32.6991 12.9521 33 13.9992 33C15.0464 33 16.092 32.6991 17.0241 32.1141C21.1131 29.5128 28 24.064 28 16.655V8.13376C28 6.11741 26.7045 4.28796 24.8034 3.57229ZM20.8846 13.3562L14.6079 19.5587C13.9609 20.1999 13.1054 20.5205 12.2683 20.5205C11.4128 20.5205 10.5558 20.1999 9.91031 19.5587L7.45573 17.126C6.8854 16.579 6.8854 15.6749 7.45573 15.1279C8.00767 14.5627 8.90149 14.5627 9.47183 15.1279L11.9249 17.5606C12.115 17.749 12.4002 17.749 12.5903 17.5606L18.867 11.3581C19.4189 10.7928 20.3128 10.7928 20.8831 11.3581C21.435 11.9051 21.4366 12.8092 20.8846 13.3562Z"
            fill="#CED5E3"
          />
        </svg>
      ),
      title: "Provably Fair",
      mobileTitle: "Provably Fair",
    },
    {
      id: 3,
      icon: (
        <img
          src="/crypto-assets/licensed.svg"
          alt="Licensed"
          className="w-full h-full rounded"
        />
      ),
      title: "Licensed",
      mobileTitle: "Licensed",
    },
    {
      id: 4,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 33 33"
          fill="none"
          className="w-full h-full"
        >
          <rect
            x="4"
            y="4"
            width="25"
            height="25"
            rx="4"
            fill="none"
            stroke="#CED5E3"
            strokeWidth="2"
          />
          <path
            d="M12 16.5L15.5 20L21 12"
            stroke="#CED5E3"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "BeGambleAware",
      mobileTitle: "BeGambleAware",
    },
  ];

  return (
    <section className="relative w-full py-3 sm:py-5 md:py-6 lg:py-8 bg-[#080808]">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
        {/* Perfect 2x2 grid on mobile, 1x4 on desktop */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4"
          style={{ gridAutoRows: "minmax(0, 1fr)" }}
        >
          {badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.05,
                duration: 0.3,
                ease: "easeOut",
              }}
              className="w-full"
            >
              <button
                className="provider_btn w-full h-full group relative overflow-hidden transition-all duration-300 rounded-lg sm:rounded-xl hover:transform hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(30, 30, 30, 0.15) 0%, rgba(75, 75, 75, 0.15) 100%)",
                  boxShadow: "0 2px 4px 1px rgba(0, 0, 0, 0.25)",
                  minHeight: "70px",
                }}
              >
                {/* Inner content wrapper */}
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-1.5 sm:gap-2 md:gap-3 p-3 sm:p-3.5 md:p-4 lg:px-6 h-full">
                  {/* Icon with responsive sizing */}
                  <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <div className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] md:w-[30px] md:h-[30px] lg:w-[33px] lg:h-[33px]">
                      {badge.icon}
                    </div>
                  </div>

                  {/* Text with better responsive sizing */}
                  <span
                    className="text-center md:text-left font-normal capitalize transition-colors duration-300 group-hover:text-white leading-tight"
                    style={{
                      color: "#CED5E3",
                      fontFamily: '"Neue Plak", sans-serif',
                    }}
                  >
                    {/* Mobile: Smaller text, full words when possible */}
                    <span className="block md:hidden text-[11px] sm:text-xs whitespace-nowrap">
                      {badge.mobileTitle}
                    </span>

                    {/* Desktop: Full text */}
                    <span className="hidden md:block text-sm lg:text-base">
                      {badge.title}
                    </span>
                  </span>
                </div>

                {/* Subtle hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0%, transparent 60%)",
                  }}
                />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadgesFinal;
