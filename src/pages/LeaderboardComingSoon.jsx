import React from "react";
import { useNavigate } from "react-router-dom";
import StarGameBackground from "../components/leaderboard/starGameBackground";

const LeaderboardComingSoon = () => {
  const navigate = useNavigate();

  return (
    <section className="relative max-w-7xl mx-auto min-h-[calc(100vh-100px)] flex items-center justify-center mt-5">
      {/* Star background */}
      <StarGameBackground />

      {/* Center wrapper */}
      <div className="relative flex flex-col items-center justify-center w-full px-4 translate-y-12 md:translate-y-24">
        {/* Card wrapper (relative so astronaut anchors correctly) */}
        <div className="relative flex flex-col items-center">
          {/* Astronaut */}
          <img
            src="/leaderboard-assets/leaderboard-astro.png"
            alt="Leaderboard Astronaut"
            className="
              absolute
              -top-28
              sm:-top-32
              md:-top-52
              w-40
              sm:w-48
              md:w-56
              lg:w-60
              object-contain
              z-20
              pointer-events-none
            "
          />

          {/* Glass Card */}
          <div
            className="
              trust_btn
              relative
              z-10
              w-full
              max-w-sm
              sm:max-w-md
              rounded-2xl
              px-6
              sm:px-8
              pt-16
              pb-6
              text-center
            "
            style={{
              background: "rgba(28,29,73,0.92)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            {/* Title */}
            <h1 className="text-white text-lg sm:text-xl font-semibold mb-2">
              Leaderboard coming soon
            </h1>

            {/* Subtitle */}
            <p className="text-sm text-[#B4B4DE] mb-5 leading-snug">
              Compete for rewards in upcoming rankings.
            </p>

            {/* CTA */}
            <button
              onClick={() => navigate("/")}
              className="
                w-full
                sm:w-3/4
                mx-auto
                px-4
                py-2.5
                rounded-xl
                text-sm
                font-semibold
                text-white
                transition-transform
                active:scale-95
              "
              style={{
                background: "linear-gradient(180deg, #FFB8A1 0%, #A62A00 100%)",
              }}
            >
              Back to Lobby
            </button>

            {/* Footer */}
            <p className="text-xs text-[#9C9CCB] mt-4">
              Check back later to see leaderboard in action.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardComingSoon;
