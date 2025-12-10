// src/pages/Leaderboard.jsx
// Podium Leaderboard – matches provided design (desktop + mobile)

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import StarfieldBackground from "../components/leaderboard/StarfieldBackground";

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [currentPage, setCurrentPage] = useState(1);
  const [topWinners, setTopWinners] = useState([]);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: "daily", label: "Daily" },
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
    { id: "all-time", label: "All Time" },
  ];

  const totalPages = 11;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `/referral-service/api/leaderboard/top/all-time`
        );

        let leaderboard = [];
        if (response.data?.success) {
          leaderboard = response.data.data || [];
        }

        const enriched = leaderboard.map((item, index) => ({
          ...item,
          prize: "Prize",
          avatar: `/leaderboard-assets/astro-profile${(index % 5) + 1}.svg`,
          profileInner: `/leaderboard-assets/profile${(index % 5) + 1}.svg`,
          icon: `/leaderboard-assets/group${(index % 5) + 1}.svg`,
          earned: `${Math.floor(item.points / 4) || 50}+ points`,
        }));

        const topThree = enriched.slice(0, 3);
        const others = enriched.slice(3);

        const formattedTop = topThree.map((item, i) => {
          let position = "center";
          if (i === 1) position = "left";
          if (i === 2) position = "right";

          return {
            ...item,
            position,
            isWinner: i === 0,
          };
        });

        setTopWinners(formattedTop);
        setLeaderboardData(others);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [activeTab]);

  const orderedTopWinners = useMemo(() => {
    const weight = { left: 0, center: 1, right: 2 };
    return [...topWinners].sort(
      (a, b) => (weight[a.position] || 0) - (weight[b.position] || 0)
    );
  }, [topWinners]);

  const userCount = topWinners.length + leaderboardData.length;

  const podiumBgByPosition = {
    left: "/leaderboard-assets/left-podium.svg",
    center: "/leaderboard-assets/center-podium.svg",
    right: "/leaderboard-assets/right-podium.svg",
  };

  const PodiumCard = ({ winner }) => {
    const isCenter = winner.position === "center";

    const heightClasses = isCenter
      ? "h-[240px] xs:h-[280px] sm:h-[380px] lg:h-[410px]"
      : "h-[200px] xs:h-[240px] sm:h-[330px] lg:h-[360px]";

    const delayMap = {
      left: 0.15,
      center: 0.05,
      right: 0.25,
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delayMap[winner.position] || 0 }}
        className={`relative flex flex-col items-center flex-1`}
      >
        {winner.isWinner && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute top-2 md:top-8 xs:top-6 sm:top-8 left-1/2 z-30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="37"
              height="37"
              viewBox="0 0 37 37"
              fill="none"
              className="w-6 h-6 xs:w-7 xs:h-7 sm:w-[37px] sm:h-[37px]"
            >
              <path
                d="M0.266001 24.0488C0.686392 23.5226 1.47125 23.435 1.99745 23.8554L14.8314 34.1084C15.3576 34.5287 15.4451 35.3136 15.0248 35.8398C14.6044 36.366 13.8195 36.4545 13.2933 36.0341L0.459361 25.7802C-0.0667064 25.3598 -0.154304 24.5749 0.266001 24.0488Z"
                fill="url(#paint0_linear_9665_5200)"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.92713 1.11227C10.4572 -0.419661 12.6279 -0.346635 13.0805 1.19234L15.2816 8.96383C15.5619 10.0077 16.7599 10.4816 17.6908 9.92184L25.2875 5.415C26.5902 4.62674 28.1682 5.88741 27.6869 7.33199L24.9447 15.7382C24.6144 16.7569 25.3544 17.8319 26.4242 17.8877L34.4906 18.3183C36.0886 18.3971 36.6391 20.4978 35.2494 21.3427L17.9652 32.0283C17.3857 32.3853 16.6205 32.3427 16.0814 31.9121L3.85096 22.1406C3.31193 21.7099 3.0912 20.986 3.32167 20.3291L9.92713 1.11227ZM12.639 17.1142C12.1129 16.6939 11.328 16.7814 10.9076 17.3076C10.4875 17.8337 10.575 18.6186 11.101 19.039L17.518 24.166C18.0441 24.5863 18.83 24.4987 19.2504 23.9726C19.6708 23.4464 19.5822 22.6606 19.056 22.2402L12.639 17.1142Z"
                fill="url(#paint1_linear_9665_5200)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_9665_5200"
                  x1="-2.81969e-08"
                  y1="5.44497"
                  x2="44.4179"
                  y2="43.2482"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FFB8A1" />
                  <stop offset="1" stopColor="#A62A00" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_9665_5200"
                  x1="-2.81969e-08"
                  y1="5.44497"
                  x2="44.4179"
                  y2="43.2482"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FFB8A1" />
                  <stop offset="1" stopColor="#A62A00" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        )}

        {/* Helmet avatar */}
        <div className="relative z-20 ">
          <div className="relative w-20 h-20 xs:w-24 xs:h-24 md:w-44 md:h-44">
            <img
              src="/leaderboard-assets/astro-profile1.svg"
              alt="Astronaut Helmet"
              className="absolute object-contain inset-0 w-full h-full md:mt-[40px] mt-[23px]"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={winner.profileInner}
                alt={winner.name}
                className="w-10 h-10 xs:w-16 xs:h-16 sm:w-20 sm:h-20 rounded-full object-cover md:mt-[40px] mt-[38px]"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${winner.name}&background=random`;
                }}
              />
            </div>
          </div>
        </div>

        {/* Podium block using SVG as full background */}
        <div
          className={`relative w-full max-w-[320px] lg:max-w-[353px] ${heightClasses} flex items-stretch justify-center`}
        >
          <div
            className="relative w-full h-full rounded-[16px] xs:rounded-[20px] sm:rounded-[24px] overflow-hidden"
            style={{
              backgroundImage: `url(${podiumBgByPosition[winner.position]})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top center",
            }}
          >
            {/* Slight top glow */}
            <div className="absolute inset-0" />

            <div className="relative z-10 px-3 xs:px-4 sm:px-6 sm:px-8 pt-12 xs:pt-14 sm:pt-20 sm:pt-10 flex flex-col h-full text-center">
              <h3 className="text-sm xs:text-base sm:text-xl sm:text-2xl font-['Neue_Plak'] font-bold mb-1 xs:mb-2 sm:mb-3 sm:mb-4 truncate">
                {winner.name}
              </h3>

              {winner.icon && (
                <div className="mb-1 xs:mb-2 sm:mb-3 sm:mb-4 flex justify-center">
                  <img
                    src={winner.icon}
                    alt="Icon"
                    className="w-7 h-7 xs:w-8 xs:h-8 sm:w-11 sm:h-11 sm:w-12 sm:h-12"
                  />
                </div>
              )}

              <p className="text-[10px] xs:text-xs sm:text-xs sm:text-sm text-gray-200 mb-1 xs:mb-2 sm:mb-3">
                Earn {winner.earned}
              </p>

              <div className="mb-1 xs:mb-2 sm:mb-3 sm:mb-4 flex items-center justify-center gap-1 sm:gap-2">
                <div
                  className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5"
                  style={{
                    WebkitMaskImage: "url(/leaderboard-assets/diamond.svg)",
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    background:
                      "linear-gradient(131deg, #FFB8A1 6.92%, #A62A00 121.35%)",
                  }}
                />
                <span className="text-base xs:text-lg sm:text-xl sm:text-2xl font-['Neue_Plak'] font-bold">
                  {winner.points}
                </span>
              </div>

              <p className="text-[10px] xs:text-xs sm:text-xs sm:text-sm text-gray-200 mb-1 xs:mb-2 sm:mb-3">
                {winner.prize}
              </p>

              <div className="mb-1 xs:mb-2 sm:mb-3 mx-auto w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 sm:w-4 sm:h-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.70698 17.2929C5.09751 17.6834 5.09751 18.3166 4.70698 18.7071L2.70698 20.7071C2.31646 21.0976 1.6833 21.0976 1.29277 20.7071C0.902247 20.3166 0.902247 19.6834 1.29277 19.2929L3.29277 17.2929C3.6833 16.9024 4.31646 16.9024 4.70698 17.2929ZM17.2928 17.2929C17.6833 16.9024 18.3165 16.9024 18.707 17.2929L20.707 19.2929C21.0975 19.6834 21.0975 20.3166 20.707 20.7071C20.3165 21.0976 19.6833 21.0976 19.2928 20.7071L17.2928 18.7071C16.9022 18.3166 16.9022 17.6834 17.2928 17.2929Z"
                    fill="white"
                    fillOpacity="0.2"
                  />
                  <path
                    d="M2.2632 1.02298C2.87364 0.924817 3.41956 1.16149 3.85156 1.37748L4.44705 1.67523C4.94103 1.92222 5.14126 2.52289 4.89427 3.01687C4.64728 3.51085 4.0466 3.71108 3.55263 3.46409L2.95713 3.16634C2.76703 3.07129 2.65505 3.02789 2.58683 3.00885L2.58245 3.00765L2.57882 3.01007C2.5202 3.04949 2.42732 3.12609 2.27664 3.27677C2.12597 3.42744 2.04937 3.52032 2.00995 3.57894L2.00753 3.58258L2.00873 3.58695C2.02776 3.65517 2.07117 3.76716 2.16622 3.95725L2.46396 4.55275C2.71095 5.04673 2.51073 5.6474 2.01675 5.89439C1.52277 6.14138 0.9221 5.94115 0.675111 5.44717L0.377363 4.85168C0.161363 4.41968 -0.0753048 3.87376 0.0228602 3.26332C0.121149 2.65212 0.51765 2.20733 0.862431 1.86255C1.20721 1.51777 1.65199 1.12127 2.2632 1.02298Z"
                    fill="white"
                    fillOpacity="0.2"
                  />
                  <path
                    d="M19.4128 3.00885C19.3446 3.02789 19.2326 3.07129 19.0425 3.16634L18.4471 3.46409C17.9531 3.71108 17.3524 3.51085 17.1054 3.01687C16.8584 2.52289 17.0586 1.92222 17.5526 1.67523L18.1481 1.37748C18.5801 1.16149 19.126 0.924817 19.7365 1.02298C20.3477 1.12127 20.7925 1.51777 21.1372 1.86255C21.482 2.20733 21.8785 2.65212 21.9768 3.26332C22.075 3.87376 21.8383 4.41968 21.6223 4.85168L21.3246 5.44717C21.0776 5.94115 20.4769 6.14138 19.9829 5.89439C19.4889 5.6474 19.2887 5.04673 19.5357 4.55275L19.8335 3.95725C19.9285 3.76716 19.9719 3.65517 19.9909 3.58695L19.9921 3.58257L19.9897 3.57894C19.9503 3.52032 19.8737 3.42744 19.723 3.27677C19.5724 3.12609 19.4795 3.04949 19.4209 3.01007L19.4172 3.00765L19.4128 3.00885Z"
                    fill="white"
                    fillOpacity="0.2"
                  />
                  <path
                    d="M11 2.25C16.3848 2.25 20.75 6.61522 20.75 12C20.75 17.3848 16.3848 21.75 11 21.75C5.61522 21.75 1.25 17.3848 1.25 12C1.25 6.61522 5.61522 2.25 11 2.25ZM11 7.5C10.4477 7.5 10 7.94772 10 8.5V12.5C10 12.7652 10.1054 13.0195 10.293 13.207L12.293 15.207C12.6835 15.5976 13.3165 15.5976 13.707 15.207C14.0976 14.8165 14.0976 14.1835 13.707 13.793L12 12.0859V8.5C12 7.94772 11.5523 7.5 11 7.5Z"
                    fill="white"
                    fillOpacity="0.2"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.99988 1C7.99988 0.447715 8.44759 0 8.99988 0L12.9999 0C13.5522 0 13.9999 0.447715 13.9999 1C13.9999 1.55228 13.5522 2 12.9999 2L11.9999 2V2.5C11.9999 3.05228 11.5522 3.5 10.9999 3.5C10.4476 3.5 9.99988 3.05228 9.99988 2.5V2L8.99988 2C8.44759 2 7.99988 1.55228 7.99988 1Z"
                    fill="white"
                    fillOpacity="0.2"
                  />
                </svg>
              </div>

              {winner.endsIn && (
                <div className="mt-auto text-[10px] xs:text-xs sm:text-xs sm:text-sm">
                  <p className="text-gray-300">Ends in</p>
                  <p className="text-white font-semibold text-xs xs:text-sm sm:text-sm sm:text-base">
                    {winner.endsIn}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <StarfieldBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-2 xs:px-3 sm:px-4 lg:px-8 pt-6 xs:pt-8 sm:pt-10 pb-16">
        {/* Tabs */}
        <div className="flex justify-center mb-6 xs:mb-8 sm:mb-10">
          <div className="trust_btn2 inline-flex gap-0.5 xs:gap-1 p-1 xs:p-1.5 sm:p-2 rounded-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-2.5 xs:px-3 sm:px-4 sm:px-6 py-1.5 xs:py-2 sm:py-2 sm:py-2 rounded-full text-[10px] xs:text-xs sm:text-xs sm:text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "text-white "
                    : "text-gray-300 hover:text-white"
                }`}
                style={
                  activeTab === tab.id
                    ? { background: "var(--cta-pink-gradient)" }
                    : {}
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Podium area */}
        {loading ? (
          <div className="flex justify-center items-center py-20 text-gray-300 text-lg">
            Loading leaderboard...
          </div>
        ) : (
          <>
            {orderedTopWinners.length > 0 && (
              <div className="flex justify-center mb-6">
                <div className="flex sm:flex-row justify-center items-end gap-1 xs:gap-1.5 sm:gap-2 lg:gap-2 w-full max-w-5xl px-1">
                  {orderedTopWinners.map((winner, i) => (
                    <PodiumCard key={i} winner={winner} />
                  ))}
                </div>
              </div>
            )}

            {/* GLOW BEHIND ALL PODIUMS */}
            <div className="relative flex justify-center w-full mt-[-40px] mb-6">
              <div
                className="absolute -z-10 w-[500px] h-[500px]"
                style={{
                  background:
                    "radial-gradient(circle, rgba(244,116,251,0.5) 0%, rgba(244,116,251,0) 70%)",
                  filter: "blur(120px)",
                  top: "-120px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  opacity: 0.75,
                }}
              />
            </div>

            {/* PRIZE POOL + YOUR POSITION ABOVE CENTER PODIUM */}
            <div className="flex justify-center w-full mt-8 md:-mt-8 mb-6">
              <div className="flex items-center gap-1 sm:gap-2">
                {/* Prize Pool */}
                <div className="trust_btn flex items-center gap-2 px-4 sm:px-6 py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_9681_695)">
                      <path
                        d="M15.9672 1.24242H14.5454V1.16113C14.5454 0.522523 14.0412 0 13.4124 0H4.91522C4.29207 0 3.78226 0.522523 3.78226 1.16113V1.24242H2.36606C1.42569 1.24242 0.666626 2.02617 0.666626 2.98411V3.57049C0.666626 5.4631 2.03749 7.03645 3.82188 7.29771C4.05983 9.49223 5.55534 11.2978 7.54932 11.9364L6.82425 13.8639H11.509L10.7839 11.9364C12.7836 11.292 14.2734 9.49223 14.5114 7.29771C16.2901 7.03645 17.6666 5.4631 17.6666 3.57049V2.98411C17.6666 2.02617 16.9019 1.24242 15.9672 1.24242ZM3.78226 6.11337C2.6493 5.84629 1.79958 4.81287 1.79958 3.57049V2.98411C1.79958 2.66481 2.05447 2.40355 2.36606 2.40355H3.78226V6.11337ZM11.7696 5.88113L10.8859 6.76937L11.0898 8.0176C11.1691 8.49948 10.682 8.86524 10.2571 8.63881L9.16381 8.04662L8.06484 8.63881C7.65128 8.86524 7.15845 8.49948 7.23777 8.0176L7.44736 6.76937L6.56365 5.88113C6.21811 5.53858 6.41069 4.94643 6.87521 4.87676L8.1045 4.69679L8.65396 3.55887C8.86356 3.12344 9.46969 3.12344 9.67929 3.55887L10.2288 4.69679L11.4524 4.88254C11.9226 4.95224 12.1095 5.54439 11.7696 5.88113ZM16.5337 3.57049C16.5337 4.8071 15.6839 5.84629 14.5454 6.11337V2.40355H15.9672C16.2788 2.40355 16.5337 2.66481 16.5337 2.98411V3.57049Z"
                        fill="url(#paint0_linear_9681_695)"
                      />
                      <path
                        d="M14.7558 16.8389H13.7193V16.8251C13.7193 15.8312 12.933 15.0254 11.9631 15.0254H6.36748C5.39761 15.0254 4.6114 15.8312 4.6114 16.8251V16.8389H3.57502C3.2619 16.8389 3.00854 17.0985 3.00854 17.4194C3.00854 17.7403 3.2619 18 3.57502 18H14.7558C15.0689 18 15.3223 17.7403 15.3223 17.4194C15.3223 17.0985 15.0689 16.8389 14.7558 16.8389Z"
                        fill="url(#paint1_linear_9681_695)"
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear_9681_695"
                        x1="0.666626"
                        y1="2.7"
                        x2="22.4901"
                        y2="20.3666"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FFB8A1" />
                        <stop offset="1" stop-color="#A62A00" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_9681_695"
                        x1="0.666626"
                        y1="2.7"
                        x2="22.4901"
                        y2="20.3666"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FFB8A1" />
                        <stop offset="1" stop-color="#A62A00" />
                      </linearGradient>
                      <clipPath id="clip0_9681_695">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <span className="text-[#9292D2] text-xs sm:text-sm">
                    Prize Pool
                  </span>
                  <span className="font-semibold text-xs sm:text-sm text-white">
                    $0.00
                  </span>
                </div>

                {/* Your Position */}
                <div className="trust_btn flex items-center gap-2 px-4 sm:px-6 py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.1709 18L9.07516 13.8999C9.45084 13.8037 9.79907 13.614 10.0872 13.3433C10.2157 13.2226 10.3577 13.1844 10.5292 13.2246C11.7157 13.5021 12.9162 12.8106 13.2751 11.6436L14.6521 16.7961L12.0724 16.1291L10.1709 18V18ZM7.55195 0.375649C7.19508 0.710859 6.73458 0.834608 6.25833 0.723197C5.54706 0.556848 4.82824 0.972945 4.6163 1.67378C4.4744 2.14297 4.13724 2.48103 3.6693 2.62331C2.97037 2.83582 2.55535 3.55656 2.72125 4.26973C2.83233 4.74722 2.70895 5.20899 2.37463 5.56681C1.87512 6.10145 1.87512 6.9333 2.37463 7.46797C2.70895 7.8258 2.83233 8.28757 2.72125 8.76505C2.55535 9.47822 2.97037 10.199 3.6693 10.4115C4.13724 10.5538 4.4744 10.8918 4.6163 11.361C4.82824 12.0618 5.54706 12.4779 6.25833 12.3116C6.73454 12.2002 7.19508 12.3239 7.55195 12.6591C8.08516 13.16 8.91479 13.16 9.44804 12.6591C9.80491 12.3239 10.2654 12.2002 10.7417 12.3116C11.4529 12.4779 12.1717 12.0618 12.3837 11.361C12.5256 10.8918 12.8627 10.5538 13.3307 10.4115C14.0296 10.199 14.4446 9.47822 14.2787 8.76505C14.1677 8.28757 14.291 7.8258 14.6254 7.46797C15.1249 6.93334 15.1249 6.10148 14.6254 5.56681C14.291 5.20899 14.1677 4.74722 14.2787 4.26973C14.4447 3.55656 14.0296 2.83582 13.3307 2.62331C12.8627 2.48103 12.5256 2.14297 12.3837 1.67378C12.1717 0.972945 11.4529 0.556848 10.7417 0.723197C10.2654 0.834571 9.80491 0.710859 9.44804 0.375649C8.91479 -0.125235 8.08519 -0.125198 7.55195 0.375649ZM8.49999 3.00438L9.53148 5.4647L12.1839 5.68805L10.169 7.43197L10.7768 10.0303L8.49999 8.64779L6.22321 10.0303L6.83099 7.43197L4.81608 5.68805L7.46851 5.4647L8.49999 3.00438ZM6.82912 18L4.92761 16.1291L2.34793 16.796L3.72484 11.6436C4.08372 12.8106 5.28433 13.502 6.47076 13.2245C6.64224 13.1844 6.78424 13.2225 6.91275 13.3432C7.20091 13.6139 7.54914 13.8037 7.92482 13.8998L6.82912 17.9999V18Z"
                      fill="url(#paint0_linear_9681_701)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_9681_701"
                        x1="2"
                        y1="2.7"
                        x2="21.9715"
                        y2="15.0633"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FFB8A1" />
                        <stop offset="1" stop-color="#A62A00" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <span className="text-[#9292D2] text-xs sm:text-sm">
                    Your Position
                  </span>
                  <span className="font-semibold text-xs sm:text-sm text-white">
                    -
                  </span>

                  <svg
                    className="w-3 h-3 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Table Header */}
        <div
          className="grid grid-cols-4 px-8 py-4 text-sm mt-6"
          style={{ color: "var(--moon-silver)" }}
        >
          <div className="text-left">Rank</div>
          <div className="text-center">User name</div>
          <div className="text-center">Points</div>
          <div className="text-right">Prize</div>
        </div>

        {/* Desktop rows */}
        <div className="block">
          {leaderboardData.map((user, index) => (
            <motion.div
              key={user.rank ?? index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.3 + index * 0.03 }}
              className="px-4 py-1.5"
            >
              <div
                className="
          grid grid-cols-4 items-center 
          rounded-xl px-6 py-3 
          transition-all
          bg-[#1C1D49]
          hover:bg-[#35326B]
        "
                style={{ border: "1px solid rgba(255,255,255,0.05)" }}
              >
                {/* Rank */}
                <div className="text-sm font-semibold text-gray-200 text-left">
                  {user.rank.toString().padStart(2, "0")}
                </div>

                {/* Username */}
                <div className="flex items-center justify-center gap-3">
                  <img
                    src={user.avatar}
                    className="w-9 h-9 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${user.username}&background=random`;
                    }}
                  />
                  <span className="text-sm font-medium text-white truncate">
                    {user.username}
                  </span>
                </div>

                {/* Points */}
                <div className="flex items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 18 17"
                    className="w-4 h-4"
                    fill="none"
                  >
                    <path
                      d="M11.2645 0C11.8972 -0.000147852 12.3209 -0.000577709 12.7274 0.0986328C12.9114 0.143552 13.0912 0.203898 13.2645 0.27832C13.6493 0.443628 13.9785 0.697098 14.4617 1.06934L14.5203 1.11523L14.5477 1.13574C15.4193 1.80677 16.1101 2.33876 16.618 2.81543C17.137 3.30257 17.5198 3.78063 17.7205 4.36426C17.8853 4.84339 17.9474 5.3488 17.9022 5.85156C17.8469 6.46623 17.5867 7.01541 17.1961 7.59863C16.8149 8.1679 16.2681 8.82735 15.5809 9.65723L12.199 13.7412C11.5855 14.4822 11.081 15.0914 10.618 15.5088C10.1317 15.9472 9.61048 16.25 8.95782 16.25C8.30525 16.25 7.78387 15.9471 7.29767 15.5088C6.83469 15.0913 6.33016 14.4822 5.71661 13.7412L2.33478 9.65723C1.64776 8.82755 1.10175 8.16781 0.72052 7.59863C0.329943 7.01541 0.069749 6.46623 0.0144653 5.85156C-0.0307519 5.34881 0.0304065 4.84338 0.195129 4.36426C0.395796 3.78069 0.778781 3.30252 1.29767 2.81543C1.80558 2.33869 2.49711 1.80691 3.36896 1.13574L3.39532 1.11523L3.45392 1.06934C3.93728 0.697024 4.26628 0.443648 4.65118 0.27832C4.82453 0.203865 5.00425 0.143572 5.18829 0.0986328C5.59491 -0.000631231 6.01915 -0.000147919 6.65216 0L11.2645 0ZM7.29083 4.58301C6.94602 4.58327 6.66606 4.86318 6.66583 5.20801C6.66583 5.55302 6.94588 5.83274 7.29083 5.83301L10.6248 5.83301C10.9699 5.83292 11.2498 5.55313 11.2498 5.20801C11.2496 4.86308 10.9698 4.5831 10.6248 4.58301L7.29083 4.58301Z"
                      fill="url(#diamondGradient)"
                    />
                    <defs>
                      <linearGradient
                        id="diamondGradient"
                        x1="0"
                        y1="2.43"
                        x2="20.11"
                        y2="21.44"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FFB8A1" />
                        <stop offset="1" stopColor="#A62A00" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <span className="text-sm font-semibold text-white">
                    {user.points}
                  </span>
                </div>

                {/* Prize */}
                <div className="text-right text-sm font-semibold text-white">
                  ${Number(user.prize || 15000).toLocaleString()}
                </div>
              </div>
            </motion.div>
          ))}

          {!leaderboardData.length && !loading && (
            <div className="py-8 text-center text-gray-400 text-sm">
              No leaderboard entries
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-1.5 xs:gap-2 mt-6 xs:mt-8">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="p-1.5 xs:p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
          >
            <svg
              className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 rounded-full text-[10px] xs:text-xs sm:text-sm font-medium transition-all ${
                currentPage === page
                  ? "bg-white text.black shadow-[0_0_18px_rgba(255,255,255,0.4)] text-black"
                  : "bg.white/5 text-gray-300 hover:bg-white/10 border border-white/10 bg-white/5"
              }`}
            >
              {page}
            </button>
          ))}

          <span className="text-gray-400 text-[10px] xs:text-xs sm:text-sm px-0.5 xs:px-1">
            ...
          </span>

          {[10, 11].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 rounded-full text-[10px] xs:text-xs sm:text-sm font-medium transition-all ${
                currentPage === page
                  ? "bg.white text-black shadow-[0_0_18px_rgba(255,255,255,0.4)] bg-white"
                  : "bg.white/5 text-gray-300 hover:bg-white/10 border border-white/10 bg-white/5"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            className="p-1.5 xs:p-2 rounded-lg bg.white/5 hover:bg-white/10 transition-colors border border-white/10 disabled:opacity-40 disabled:cursor-not-allowed bg-white/5"
            disabled={currentPage === totalPages}
          >
            <svg
              className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
