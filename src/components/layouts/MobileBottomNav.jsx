// src/components/MobileBottomNav.jsx - Updated Mobile Bottom Navigation
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GlobalSearchPopup from "../settings/GlobalSearchPopup";

const MobileBottomNav = ({ onHamburgerClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState("home");
  const [showSearchPopup, setShowSearchPopup] = useState(false);

  // SVG Icons as components
  const HamburgerIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
    >
      <path
        d="M25 11H10M25 18H13M25 25H10"
        stroke="#9292D2"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );

  const HomeIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
    >
      <path
        d="M14.876 26.0391H11.0801C10.4012 26.0391 9.9026 25.4891 9.85449 24.8125V17.1152H14.876V26.0391ZM19.6514 26.0391H16.2246V17.1152H19.6514V26.0391ZM26.0215 24.8125C26.0215 25.4912 25.475 26.0391 24.7959 26.0391H21V17.1152H26.0215V24.8125ZM21.7578 9C23.3735 9.00012 24.5592 10.1925 24.7197 11.5264C24.7572 11.8381 24.7301 12.1664 24.6377 12.4824H25.8125C26.4011 12.4826 26.877 12.9779 26.877 13.5938V14.9697C26.8769 15.5844 26.4011 16.079 25.8125 16.0791H10.0625C9.47363 16.079 9.00007 15.5842 9 14.9697V13.5938C9 12.9778 9.47358 12.4825 10.0625 12.4824H10.9512C10.8599 12.1664 10.8328 11.8381 10.8701 11.5264C11.0306 10.1926 12.2169 9 13.6709 9C15.1251 9.00001 16.0421 9.83486 16.6963 10.6279C17.9316 12.1348 17.7314 12.137 18.8965 10.6279C19.5497 9.83518 20.4654 9 21.7578 9ZM13.832 10.791C13.102 10.7913 12.6731 11.3539 12.6836 11.7402C12.6942 12.1534 12.9707 12.4746 13.376 12.4746H15.8867L15.3135 11.7695C14.7737 11.1145 14.3684 10.791 13.832 10.791ZM21.7578 10.791C21.2228 10.791 20.8161 11.1145 20.2764 11.7695L19.7041 12.4746H22.2148C22.6197 12.4744 22.8957 12.1533 22.9062 11.7402C22.9167 11.3538 22.4894 10.791 21.7578 10.791Z"
        fill="#9292D2"
      />
    </svg>
  );

  const GamesIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
    >
      <path
        d="M13.1625 13.4199C13.9572 13.4199 14.6572 13.194 15.2352 12.9056C14.6484 14.0558 14.2968 15.3872 14.227 16.7602C11.8806 17.0226 10.0406 19.0732 10.0406 21.5859C10.0406 24.2757 12.1413 26.5 14.7234 26.5C15.5189 26.5 16.281 26.2665 16.9644 25.876C15.9042 24.7933 15.2438 23.2512 15.2438 21.5859C15.2438 19.9207 15.9042 18.4147 16.9644 17.332C16.4382 17.0312 15.8647 16.8267 15.266 16.7472C15.4923 12.9163 18.2697 9.75639 21.8508 9.17982C20.9387 10.5136 20.4469 12.1052 20.4469 13.7762V16.7628C18.1118 17.0364 16.2844 19.0816 16.2844 21.5859C16.2844 24.2757 18.385 26.5 20.9672 26.5C23.5494 26.5 25.65 24.2757 25.65 21.5859C25.65 19.0816 23.8225 17.0364 21.4875 16.7628V13.7762C21.4875 11.9437 22.1724 10.2209 23.4163 8.9252L24.3045 8H23.0484C20.6046 8 18.3897 9.03811 16.7872 10.7126C16.3665 10.2919 15.0175 9.08398 13.1625 9.08398C10.9674 9.08398 9.46544 10.7877 9.39281 10.8603L9 11.252L9.39281 11.6436C9.46544 11.7162 10.9674 13.4199 13.1625 13.4199ZM20.9672 19.96C20.1065 19.96 19.4062 20.6894 19.4062 21.5859H18.3656C18.3656 20.0918 19.5328 18.876 20.9672 18.876V19.96ZM14.7234 19.96C13.8628 19.96 13.1625 20.6894 13.1625 21.5859H12.1219C12.1219 20.0918 13.2891 18.876 14.7234 18.876V19.96Z"
        fill="#9292D2"
      />
    </svg>
  );

  const PromoIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
    >
      <path
        d="M19.9648 23.5293C20.992 23.5293 21.8251 24.3615 21.8252 25.3887V25.4033H22.9229C23.2544 25.4033 23.5224 25.6714 23.5225 26.0029C23.5225 26.3346 23.2545 26.6035 22.9229 26.6035H11.0801C10.7486 26.6033 10.4805 26.3344 10.4805 26.0029C10.4805 25.6715 10.7486 25.4035 11.0801 25.4033H12.1777V25.3887C12.1778 24.3615 13.0109 23.5293 14.0381 23.5293H19.9648ZM21.5 8C22.1659 8.00003 22.7 8.54036 22.7002 9.2002V9.28418H24.2061C25.196 9.28426 26.0059 10.095 26.0059 11.085V11.6904C26.0059 13.6464 24.548 15.2729 22.6641 15.543C22.4119 17.8107 20.8337 19.671 18.7158 20.3369L19.4844 22.3281H14.5215L15.29 20.3369C13.1782 19.677 11.594 17.8107 11.3418 15.543C9.45184 15.2729 8 13.6464 8 11.6904V11.085C8 10.095 8.80385 9.28426 9.7998 9.28418H11.2998V9.2002C11.3 8.54034 11.8401 8 12.5 8H21.5ZM17.5459 11.6787C17.3239 11.2287 16.682 11.2287 16.46 11.6787L15.8779 12.8545L14.5762 13.04C14.0842 13.112 13.8802 13.7241 14.2461 14.0781L15.1816 14.9961L14.96 16.2861C14.876 16.7841 15.3979 17.1626 15.8359 16.9287L17 16.3164L18.1582 16.9287C18.6081 17.1624 19.124 16.784 19.04 16.2861L18.8242 14.9961L19.7598 14.0781C20.1196 13.7301 19.9218 13.1189 19.4238 13.0469L18.1279 12.8545L17.5459 11.6787ZM9.7998 10.4844C9.46984 10.4845 9.2002 10.755 9.2002 11.085V11.6904C9.2002 12.9743 10.0999 14.0423 11.2998 14.3184V10.4844H9.7998ZM22.7002 10.4844V14.3184C23.906 14.0422 24.8057 12.9683 24.8057 11.6904V11.085C24.8057 10.755 24.536 10.4845 24.2061 10.4844H22.7002Z"
        fill="#9292D2"
      />
    </svg>
  );

  const ChatIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
    >
      <path
        d="M13.8428 10.2546C16.8487 7.24849 21.7391 7.2485 24.7451 10.2546C27.751 13.2608 27.7511 18.1518 24.7451 21.158C22.1951 23.7078 18.4029 24.0944 15.4414 22.3181C15.4414 22.3181 15.2265 22.1902 15.0459 22.3708C14.0686 23.3482 11.1464 26.2703 11.1211 26.2957C10.3382 27.0786 9.24311 27.2655 8.54883 26.571L8.42969 26.4519C7.7354 25.7575 7.92216 24.6625 8.70508 23.8796C8.71829 23.8664 11.6562 20.9275 12.6377 19.946C12.8101 19.7738 12.6826 19.5593 12.6826 19.5593C10.906 16.5975 11.2927 12.8049 13.8428 10.2546ZM23.3223 11.6775C21.1012 9.45633 17.4867 9.45634 15.2656 11.6775C13.0446 13.8986 13.0448 17.5129 15.2656 19.7341C17.4868 21.9552 21.1011 21.9552 23.3223 19.7341C25.5432 17.5129 25.5433 13.8986 23.3223 11.6775ZM15.0254 14.1423C16.1018 11.5985 19.0471 10.4047 21.5908 11.4812C21.9954 11.6525 22.1849 12.1195 22.0137 12.5242C21.8424 12.9288 21.3755 13.1181 20.9707 12.947C19.2352 12.2126 17.2256 13.0269 16.4912 14.7625C16.3627 15.066 16.0678 15.2488 15.7578 15.2488C15.6545 15.2488 15.5495 15.2281 15.4482 15.1853C15.0436 15.014 14.8541 14.5471 15.0254 14.1423Z"
        fill="#9292D2"
      />
    </svg>
  );

  const menuItems = [
    { id: "menu", name: "Menu", icon: HamburgerIcon, action: "hamburger" },
    { id: "home", name: "Rewards", icon: HomeIcon, path: "#" },
    { id: "games", name: "Casino", icon: GamesIcon, path: "/casino" },
    { id: "promos", name: "Scores", icon: PromoIcon, path: "/leaderboard" },
    { id: "chat", name: "Search", icon: ChatIcon, action: "search" },
  ];

  // Update selected state based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/") {
      setSelectedItem("home");
    } else if (currentPath.includes("/game") || currentPath === "/games") {
      setSelectedItem("games");
    } else if (currentPath === "/promotions") {
      setSelectedItem("promos");
    } else if (currentPath === "/chat") {
      setSelectedItem("chat");
    }
  }, [location.pathname]);

  const handleMenuClick = (item) => {
  if (item.action === "hamburger") {
    onHamburgerClick();
  } 
  else if (item.action === "search") {
    setShowSearchPopup(true);
  }
  else if (item.path) {
    setSelectedItem(item.id);
    navigate(item.path);
  }
};

  return (
    <>
      {/* Mobile Bottom Navigation - Only visible on mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40   border-t border-white/10">
        <div className="flex items-center justify-around px-2 py-2 bg-[linear-gradient(0deg, rgb(28 29 73) 0%, rgb(28 29 73 / 72%) 100%)] backdrop-blur-2xl">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all min-w-[60px] ${
                  selectedItem === item.id && item.id !== "menu"
                    ? "text-[#9292D2]"
                    : "text-[#9292D2] hover:text-white"
                } ${item.id === "menu" ? "text-white" : ""}`}
              >
                <span className="mb-1">
                  <IconComponent />
                </span>
                <span className="text-xs font-medium text-[#9292D2]">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <GlobalSearchPopup 
  isOpen={showSearchPopup} 
  onClose={() => setShowSearchPopup(false)} 
/>

      {/* Add padding to main content on mobile to prevent overlap */}
      <style jsx>{`
        @media (max-width: 1023px) {
          body {
            padding-bottom: 60px;
          }
        }
      `}</style>
    </>
  );
};

export default MobileBottomNav;
