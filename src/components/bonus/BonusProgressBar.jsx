import React, { memo } from "react";

const BonusProgressBar = ({ bonus }) => {
  if (!bonus) return null;

  const {
    wagered = 0,
    pool = 0,
    estimatedBonus = 0,
  } = bonus;

  const progress =
    pool > 0 ? Math.min((wagered / pool) * 100, 100) : 0;

  const progressLabel = progress.toFixed(2);

  return (
    <div
      className="
        flex flex-col justify-center
        px-4 py-3 mt-3 md:mt-0 md:ml-4
        rounded-xl border border-white/10
        w-full md:min-w-[500px] lg:min-w-[400px]
        relative overflow-hidden
      "
      style={{
        background: "#555594",
      }}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center text-[14px] text-white/90 mb-2">
        <span className="uppercase tracking-wide font-medium">
          Bonus Progress
        </span>

        <span className="text-white font-semibold">
          {progressLabel}%
        </span>
      </div>

      {/* PROGRESS BAR */}
      <div className="relative group">
        {/* Track */}
        <div className="w-full h-[10px] rounded-full bg-black/30 overflow-hidden">
          {/* Fill */}
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progress}%`,
              background:
                "linear-gradient(90deg, #FFE1D6 0%, #FFFFFF 100%)",
            }}
          />
        </div>

        {/* 🎯 TOOLTIP */}
        <div
          className="
            absolute -top-10
            opacity-0 group-hover:opacity-100
            pointer-events-none
            transition-opacity duration-200
          "
          style={{
            left: `${progress}%`,
            transform: "translateX(-50%)",
          }}
        >
          <div className="bg-black text-white text-[13px] px-2 py-1 rounded-md shadow-lg whitespace-nowrap">
            ${wagered.toFixed(2)} wagered
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center text-[13px] mt-2 text-white/80">
        <span>
          ${wagered.toFixed(2)} / ${pool.toLocaleString()}
        </span>
        <span className="font-medium">
          Est: ${estimatedBonus.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default memo(BonusProgressBar);
