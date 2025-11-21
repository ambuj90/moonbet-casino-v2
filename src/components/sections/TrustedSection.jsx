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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M19.203 8.07217L18.187 7.05811C18.0632 6.93465 17.965 6.7879 17.8981 6.62632C17.8312 6.46473 17.7969 6.29151 17.7972 6.11662V4.92859C17.7965 4.20579 17.5091 3.51279 16.9981 3.00161C16.487 2.49042 15.7941 2.20279 15.0713 2.20181H13.8833C13.5308 2.20086 13.1929 2.06115 12.9427 1.81293L11.9277 0.797012C11.416 0.286624 10.7227 0 10 0C9.27726 0 8.58403 0.286624 8.07232 0.797012L7.05825 1.81293C6.80773 2.06138 6.46957 2.20139 6.11674 2.20274H4.92776C4.20494 2.20372 3.51203 2.49135 3.00101 3.00254C2.48999 3.51372 2.20259 4.20672 2.20185 4.92952V6.11662C2.20231 6.29144 2.16818 6.46463 2.10144 6.62621C2.0347 6.78779 1.93666 6.93457 1.81296 7.05811L0.797027 8.07217C0.286629 8.58386 0 9.27709 0 9.99981C0 10.7225 0.286629 11.4158 0.797027 11.9274L1.81296 12.9415C1.93683 13.065 2.03504 13.2117 2.10194 13.3733C2.16885 13.5349 2.20311 13.7081 2.20278 13.883V15.071C2.20352 15.7938 2.49092 16.4868 3.00194 16.998C3.51296 17.5092 4.20587 17.7968 4.92869 17.7978H6.11674C6.46933 17.799 6.80725 17.9391 7.05732 18.1876L8.07232 19.2026C8.58391 19.7132 9.27719 20 10 20C10.7228 20 11.4161 19.7132 11.9277 19.2026L12.9417 18.1876C13.1923 17.9392 13.5304 17.7992 13.8833 17.7978H15.0722C15.7951 17.7968 16.488 17.5092 16.999 16.998C17.51 16.4868 17.7974 15.7938 17.7981 15.071V13.883C17.7978 13.7081 17.8321 13.5349 17.899 13.3733C17.9659 13.2117 18.0641 13.065 18.188 12.9415L19.203 11.9274C19.7134 11.4158 20 10.7225 20 9.99981C20 9.27709 19.7134 8.58386 19.203 8.07217ZM13.2841 8.63037L9.56274 12.3517C9.49808 12.4166 9.42124 12.4681 9.33662 12.5033C9.25201 12.5384 9.16128 12.5565 9.06965 12.5565C8.97803 12.5565 8.8873 12.5384 8.80269 12.5033C8.71807 12.4681 8.64123 12.4166 8.57657 12.3517L6.71588 10.491C6.59263 10.3588 6.52553 10.1838 6.52872 10.003C6.53191 9.82228 6.60514 9.64981 6.73298 9.52197C6.86082 9.39413 7.03329 9.3209 7.21406 9.31771C7.39483 9.31453 7.56978 9.38162 7.70205 9.50487L9.06965 10.8734L12.298 7.64608C12.4302 7.52283 12.6052 7.45573 12.7859 7.45892C12.9667 7.46211 13.1392 7.53534 13.267 7.66318C13.3949 7.79102 13.4681 7.96349 13.4713 8.14425C13.4745 8.32501 13.4074 8.49996 13.2841 8.63223V8.63037Z"
              fill="#CED5E3"
            />
          </svg>

          <h3 className="text-[#CED5E3] text-[18px] md:text-[20px] font-[400] tracking-wide uppercase">
            Trusted By
          </h3>
        </motion.div>

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
                bg-[#080808]/20 
                rounded-[14px] 
                flex items-center justify-center
                w-full
                max-w-[230px]
                h-[80px]
                sm:h-[85px]
                md:h-[70px]
                hover:bg-[#080808]/10
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
