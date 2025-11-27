import React from "react";
import { motion } from "framer-motion";

const TruestedSection = () => {
  const providers = [
    {
      id: 1,
      name: "Pragmatic Play",
      logo: "/truested-by/cryptorunner-site-1.png",
    },
    { id: 2, name: "Evolution", logo: "/truested-by/cryptorunner-site-2.png" },
    { id: 3, name: "Hacksaw Gaming", logo: "/truested-by/desktop-logo-1.png" },
    { id: 4, name: "Thunderkick", logo: "/truested-by/img2.png" },
    { id: 5, name: "Play'n GO", logo: "/truested-by/logo-1@2x.png" },
  ];

  return (
    <section className="w-full py-12 relative">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}

        {/* RESPONSIVE LOGO GRID */}
        <div
          className="
            grid 
            grid-cols-2 
            sm:grid-cols-3 
            md:grid-cols-5 
            gap-6 
            place-items-center
          "
        >
          {providers.map((provider, i) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="trust_btn
                 /20 
                rounded-[14px] 
                flex items-center justify-center
                w-full
                max-w-[230px]
                h-[80px]
                sm:h-[85px]
                md:h-[70px]
                hover: /10
                transition-all 
                duration-300
              "
            >
              <img
                src={provider.logo}
                alt={provider.name}
                className="
                  object-contain
                 
                  hover:opacity-100
                  transition-opacity
                  max-w-[150px]
                  max-h-[55px]
                "
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TruestedSection;
