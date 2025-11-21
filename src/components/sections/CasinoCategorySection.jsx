import React from "react";

const CasinoCategorySection = () => {
  const rewards = [
    {
      id: 1,
      title: "CASINO",
      description1: "Dive into our in-house games,",
      description2: "live casino and slots",
      bg: "linear-gradient(95deg, rgba(220, 31, 255, 0.10) 0.58%, rgba(220, 31, 255, 0.30) 99.42%)",
    },
    {
      id: 2,
      title: "SLOTS",
      description1: "Dive into our in-house games,",
      description2: "live casino and slots",
      bg: "linear-gradient(107deg, rgba(10, 43, 188, 0.10) 0%, rgba(10, 43, 188, 0.30) 100%)",
    },
    {
      id: 3,
      title: "GAME SHOWS",
      description1: "Dive into our in-house games,",
      description2: "live casino and slots",
      bg: "linear-gradient(107deg, rgba(240, 119, 48, 0.10) 0%, rgba(240, 119, 48, 0.30) 100%)",
    },
    {
      id: 4,
      title: "GAME SHOWS",
      description1: "Dive into our in-house games,",
      description2: "live casino and slots",
      bg: "linear-gradient(157deg, rgba(255, 255, 255, 0.40) 2.12%, rgba(255, 255, 255, 0.00) 39%, rgba(255, 255, 255, 0.00) 54.33%, rgba(255, 255, 255, 0.10) 93.02%)",
    },
    {
      id: 5,
      title: "LIVE CASINO",
      description1: "Dive into our in-house games,",
      description2: "live casino and slots",
      bg: "linear-gradient(157deg, rgba(255, 255, 255, 0.40) 2.12%, rgba(255, 255, 255, 0.00) 39%, rgba(255, 255, 255, 0.00) 54.33%, rgba(255, 255, 255, 0.10) 93.02%)",
    },
  ];

  return (
    <section className="w-full py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* GRID (3 on desktop top, 2 on bottom like screenshot) */}
        <div
          className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-4
        "
        >
          {rewards.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="rounded-xl p-6 min-h-[150px] flex flex-col justify-between"
              style={{ background: item.bg }}
            >
              <h3 className="text-white font-semibold text-lg">{item.title}</h3>
              <p className="text-white/80 text-sm mt-2 leading-[1.4]">
                {item.description1} <br /> {item.description2}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom row (2 cards centered) */}
        <div
          className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-2 
          gap-4 mt-4
        "
        >
          {rewards.slice(3).map((item) => (
            <div
              key={item.id}
              className="rounded-xl p-6 min-h-[150px] flex flex-col justify-between"
              style={{ background: item.bg }}
            >
              <h3 className="text-white font-semibold text-lg">{item.title}</h3>
              <p className="text-white/80 text-sm mt-2 leading-[1.4]">
                {item.description1} <br /> {item.description2}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CasinoCategorySection;
