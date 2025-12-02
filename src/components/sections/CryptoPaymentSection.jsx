import React from "react";
import { motion } from "framer-motion";

const CryptoPaymentSection = () => {
  const payments = [
    "/deposit-bonus/apple_pay-DhGEreIw.webp",
    "/deposit-bonus/mastercard-CVVg_XRh.webp",
    "/deposit-bonus/visa-CHvdFeKw.webp",
    "/deposit-bonus/google_pay-FVJ2d1pF.webp",
    "/deposit-bonus/pic_pay-fE-XPIEr.webp",
  ];

  const cryptos = [
    "/deposit-bonus/btc.webp",
    "/deposit-bonus/eth.webp",
    "/deposit-bonus/bnb.webp",
    "/deposit-bonus/xrp.webp",
    "/deposit-bonus/usdt.webp",
    "/deposit-bonus/usdc.webp",
    "/deposit-bonus/sol.webp",
    "/deposit-bonus/ada.webp",
    "/deposit-bonus/doge.webp",
    "/deposit-bonus/matic.webp",
    "/deposit-bonus/trx.webp",
  ];

  return (
    <section className="w-full md:py-2 py-4 px-4 md:flex hidden justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-7xl mx-auto rounded-2xl  sm:px-4 grid grid-cols-1 sm:grid-cols-2 items-center gap-8 sm:gap-6"
      >
        {/* LEFT — Desktop left, Mobile center */}
        <div className="flex sm:justify-start justify-center">
          <p className="flex items-center sm:text-2xl">
            <span className="text-[#28C203] text-2xl font-bold">200%</span>{" "}
            <span className="text-[#7171B4] text-[20px] px-2">
              Deposit Bonus
            </span>
          </p>
        </div>

        {/* RIGHT — Desktop right, Mobile center */}
        <div className="flex sm:justify-end justify-center gap-2 -sm:gap-2 -space-x-3">
          {cryptos.map((icon, i) => (
            <div
              key={i}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-opacity-30 flex items-center justify-center"
            >
              <img
                src={icon}
                alt=""
                className="w-full h-full rounded-full object-contain hover:scale-110 transition"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CryptoPaymentSection;
