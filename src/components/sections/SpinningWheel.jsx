import { useState } from "react";

const SpinningWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedSegment, setSelectedSegment] = useState(null);

  // 7 segments for semi-circle (180 degrees)
  const segments = [
    { id: 1, value: "5", color: "#9CA3AF", image: "/home-assets/wheel.svg" },
    { id: 2, value: "20", color: "#6B7280", image: "/home-assets/wheel.svg" },
    { id: 3, value: "5", color: "#4B5563", image: "/home-assets/wheel.svg" },
    {
      id: 4,
      label: "BLACK JACK",
      color: "#1E3A8A",
      special: true,
      image: "/home-assets/wheel.svg",
    },
    { id: 5, value: "5", color: "#4B5563", image: "/home-assets/wheel.svg" },
    { id: 6, value: "20", color: "#6B7280", image: "/home-assets/wheel.svg" },
    { id: 7, value: "5", color: "#9CA3AF", image: "/home-assets/wheel.svg" },
  ];

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);

    const randomSegment = Math.floor(Math.random() * segments.length);
    const segmentAngle = 180 / segments.length; // 180 degrees divided by segments
    const targetRotation = 360 * 5 + randomSegment * segmentAngle; // 5 full rotations

    setRotation(rotation + targetRotation);

    setTimeout(() => {
      setSelectedSegment(segments[randomSegment]);
      setIsSpinning(false);
    }, 4000);
  };

  const segmentAngle = 180 / segments.length; // Each segment angle for semi-circle

  return (
    <div className="relative w-full py-12 flex flex-col items-center justify-end   overflow-hidden min-h-screen">
      {/* Stars background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>

      {/* Title */}
      <div className="text-center mb-8 z-10">
        <h1
          className="text-5xl md:text-6xl font-black text-white mb-2"
          style={{ fontFamily: "Arial, sans-serif", letterSpacing: "2px" }}
        >
          Daily Spin Wheel
        </h1>
        <p className="text-gray-400 text-lg">Spin to win amazing rewards!</p>
      </div>

      {/* Main wheel container - positioned at bottom */}
      <div className="relative z-10 mb-0">
        {/* Pointer/Arrow at top center */}
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 z-30"
          style={{ marginTop: "-60px" }}
        >
          <div className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-t-[60px] border-t-red-500 drop-shadow-2xl"></div>
        </div>

        <div
          className="relative"
          style={{
            width: "800px",
            height: "400px", // Half height for semi-circle
          }}
        >
          {/* White border ring - semi-circle */}
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-full border-[16px] border-gray-300 shadow-2xl overflow-hidden"
            style={{
              height: "400px",
              borderBottom: "none",
            }}
          >
            {/* Spinning segments container */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                transition: isSpinning
                  ? "transform 4s cubic-bezier(0.17, 0.67, 0.35, 0.96)"
                  : "none",
                transform: `rotate(${rotation}deg)`,
                transformOrigin: "center bottom",
              }}
            >
              {/* Segments */}
              {segments.map((segment, index) => {
                const startAngle = -90 + segmentAngle * index; // Start from -90° (left)
                const endAngle = startAngle + segmentAngle;

                // Calculate the path for the segment
                const radius = 400;
                const innerRadius = 140; // Center hub size

                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;

                const x1 = 400 + radius * Math.cos(startRad);
                const y1 = 400 + radius * Math.sin(startRad);
                const x2 = 400 + radius * Math.cos(endRad);
                const y2 = 400 + radius * Math.sin(endRad);

                const x3 = 400 + innerRadius * Math.cos(endRad);
                const y3 = 400 + innerRadius * Math.sin(endRad);
                const x4 = 400 + innerRadius * Math.cos(startRad);
                const y4 = 400 + innerRadius * Math.sin(startRad);

                const pathData = `
                  M ${x1},${y1}
                  A ${radius},${radius} 0 0,1 ${x2},${y2}
                  L ${x3},${y3}
                  A ${innerRadius},${innerRadius} 0 0,0 ${x4},${y4}
                  Z
                `;

                const midAngle = (startAngle + endAngle) / 2;
                const textRadius = (radius + innerRadius) / 2;
                const textX =
                  400 + textRadius * Math.cos((midAngle * Math.PI) / 180);
                const textY =
                  400 + textRadius * Math.sin((midAngle * Math.PI) / 180);

                return (
                  <svg
                    key={segment.id}
                    className="absolute inset-0"
                    viewBox="0 0 800 400"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {/* Segment path */}
                    <path
                      d={pathData}
                      fill={segment.color}
                      stroke="#000"
                      strokeWidth="2"
                    />

                    {/* Content group */}
                    <g transform={`translate(${textX}, ${textY})`}>
                      {/* Icon/Image */}
                      <image
                        href={segment.image}
                        x="-30"
                        y="-50"
                        width="60"
                        height="60"
                        style={{
                          filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5))",
                        }}
                      />

                      {/* Text */}
                      <text
                        x="0"
                        y="25"
                        textAnchor="middle"
                        fill="white"
                        fontSize={segment.special ? "20" : "28"}
                        fontWeight="bold"
                        style={{
                          filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))",
                        }}
                      >
                        {segment.label || segment.value}
                      </text>

                      {segment.special && (
                        <text
                          x="0"
                          y="45"
                          textAnchor="middle"
                          fill="white"
                          fontSize="14"
                          fontWeight="normal"
                          style={{
                            filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8))",
                          }}
                        >
                          ∞
                        </text>
                      )}
                    </g>
                  </svg>
                );
              })}
            </div>

            {/* Center hub with logo */}
            <div
              className="absolute left-1/2 bottom-0 transform -translate-x-1/2 rounded-full bg-gradient-to-br from-gray-800 via-gray-900 to-black border-4 border-gray-700 shadow-2xl flex items-center justify-center z-20"
              style={{
                width: "280px",
                height: "280px",
              }}
            >
              <div className="text-center">
                <div className="text-white font-bold text-2xl mb-2">MOON</div>
                <div className="text-gray-400 text-sm tracking-[4px]">
                  ORIGINALS
                </div>
              </div>
            </div>
          </div>

          {/* Bottom cover to hide lower half */}
          <div
            className="absolute bottom-0 left-0 right-0   z-10"
            style={{
              height: "200px",
              marginBottom: "-100px",
            }}
          ></div>
        </div>

        {/* Spin button */}
        <div className="absolute bottom-[-80px] left-1/2 transform -translate-x-1/2 z-30">
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className={`
              px-16 py-5 rounded-full font-black text-xl
              bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600
              text-white shadow-2xl uppercase tracking-wider
              transition-all duration-300
              flex items-center gap-3
              ${
                isSpinning
                  ? "opacity-60 cursor-not-allowed scale-95"
                  : "hover:scale-110 cursor-pointer active:scale-95"
              }
            `}
            style={{
              boxShadow: "0 10px 50px rgba(234, 179, 8, 0.6)",
            }}
          >
            <svg
              className={`w-7 h-7 ${isSpinning ? "animate-spin" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>{isSpinning ? "SPINNING..." : "SPIN NOW"}</span>
          </button>
        </div>
      </div>

      {/* Result display */}
      {selectedSegment && !isSpinning && (
        <div className="mt-20 z-20 animate-bounce">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-t-3xl px-12 py-6 shadow-2xl text-center">
            <p className="text-white text-2xl font-black">You Won!</p>
            <p className="text-white text-xl font-bold mt-2">
              {selectedSegment.label || `${selectedSegment.value} Free Spins`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpinningWheel;
