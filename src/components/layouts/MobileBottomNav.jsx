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
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M24.5 9H8.5M24.5 16.5H11.7M24.5 24H8.5"
        stroke="#C8C8E1"
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
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M12.6465 24H9.25C8.6424 24 8.19541 23.5166 8.15234 22.9209V16.1445H12.6465V24Z"
        fill="#C8C8E1"
      />
      <path d="M16.9219 24H13.8545V16.1445H16.9219V24Z" fill="#C8C8E1" />
      <path
        d="M22.623 22.9209C22.623 23.5183 22.1332 24 21.5254 24H18.1279V16.1445H22.623V22.9209Z"
        fill="#C8C8E1"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.8066 9C20.2525 9.00017 21.3132 10.0496 21.457 11.2236C21.4906 11.498 21.4664 11.7873 21.3838 12.0654H22.4355C22.9623 12.0656 23.3876 12.5019 23.3877 13.0439V14.2559C23.3875 14.7968 22.9622 15.2323 22.4355 15.2324H8.33887C7.81203 15.2322 7.38792 14.7966 7.3877 14.2559V13.0439C7.38777 12.5019 7.81193 12.0656 8.33887 12.0654H9.13477C9.05315 11.7873 9.02911 11.498 9.0625 11.2236C9.20634 10.0497 10.2673 9.00014 11.5684 9C12.8699 9 13.6909 9.7354 14.2764 10.4336C15.3818 11.76 15.2024 11.762 16.2451 10.4336C16.8298 9.7356 17.6498 9 18.8066 9ZM11.7129 10.5771C11.0598 10.5773 10.6765 11.072 10.6855 11.4121C10.695 11.7758 10.9419 12.0586 11.3047 12.0586H13.5518L13.0391 11.4385C12.556 10.8618 12.1929 10.5771 11.7129 10.5771ZM18.8066 10.5771C18.3278 10.5771 17.9635 10.8618 17.4805 11.4385L16.9688 12.0586H19.2148C19.5774 12.0586 19.8245 11.7758 19.834 11.4121C19.8431 11.072 19.4611 10.5772 18.8066 10.5771Z"
        fill="#C8C8E1"
      />
    </svg>
  );

  const GamesIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M13.9033 16.2256C14.0572 16.2466 14.2098 16.2806 14.3604 16.3262C14.2685 16.4598 14.1816 16.5975 14.1006 16.7393H13.5371C11.9203 16.7393 10.6826 18.1336 10.6826 19.75V20.417H12.8916V19.75C12.8916 19.3899 13.104 19.1358 13.3486 19.0469C13.3223 19.2775 13.3076 19.5121 13.3076 19.75C13.3076 21.025 13.6986 22.2299 14.3633 23.2041C14.0925 23.2874 13.816 23.333 13.5371 23.333C11.7828 23.333 10.2666 21.7588 10.2666 19.75C10.2666 17.8884 11.5861 16.4235 13.1963 16.2383L13.6299 16.1885L13.9033 16.2256ZM19.1445 16.2402C20.7472 16.4334 22.0576 17.8948 22.0576 19.75C22.0576 21.7588 20.5414 23.333 18.7871 23.333C17.0328 23.333 15.5166 21.7588 15.5166 19.75C15.5166 17.8948 16.827 16.4334 18.4297 16.2402L18.7871 16.1973L19.1445 16.2402ZM18.7871 16.7393C17.1703 16.7393 15.9326 18.1336 15.9326 19.75V20.417H18.1416V19.75C18.1416 19.2987 18.4742 19.0107 18.7871 19.0107H19.4541V16.7393H18.7871ZM12.2246 9.60449C13.4975 9.60449 14.4641 10.4713 14.7939 10.8105L14.9609 10.9824L13.6631 11.6494C13.2444 11.8642 12.7605 12.0205 12.2246 12.0205C10.9496 12.0205 9.9913 11.1524 9.65625 10.8125C9.9913 10.4726 10.9496 9.60449 12.2246 9.60449Z"
        fill="#C8C8E1"
        stroke="#C8C8E1"
        stroke-width="1.33333"
      />
    </svg>
  );

  const PromoIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.4996 8C17.2233 8 18.8768 8.69881 20.0957 9.94281C21.3147 11.1869 22 12.8746 22 14.634C22 19.7073 17.7936 24 15.4996 24C13.2054 23.9995 9 19.707 9 14.634C9.00003 12.8746 9.68537 11.1869 10.9043 9.94281C12.1231 8.69893 13.776 8.00011 15.4996 8ZM11.2938 15.8051C11.1716 15.8051 11.0498 15.811 10.9307 15.8242C10.8765 16.3451 10.9373 16.8721 11.1084 17.366C11.2795 17.8598 11.5569 18.3081 11.9198 18.6785C12.2827 19.0489 12.7219 19.3321 13.2058 19.5067C13.6896 19.6813 14.2059 19.7435 14.7163 19.6881C14.7672 19.1984 14.7161 18.7026 14.5674 18.2341C14.4186 17.7658 14.1755 17.3344 13.853 16.9684C13.5303 16.6022 13.1354 16.3094 12.6946 16.1089C12.2538 15.9085 11.7763 15.8051 11.2938 15.8051ZM19.7053 15.8051C19.223 15.8052 18.746 15.9086 18.3054 16.1089C17.8646 16.3094 17.4697 16.6022 17.147 16.9684C16.8244 17.3344 16.5805 17.7657 16.4317 18.2341C16.283 18.7026 16.2328 19.1984 16.2837 19.6881C16.7941 19.7435 17.3104 19.6813 17.7942 19.5067C18.2781 19.3321 18.7173 19.0489 19.0802 18.6785C19.4431 18.3081 19.7205 17.8598 19.8916 17.366C20.0626 16.8721 20.1236 16.3451 20.0693 15.8242C19.9487 15.8113 19.8267 15.8051 19.7053 15.8051Z"
        fill="#C8C8E1"
      />
    </svg>
  );

  const ChatIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      viewBox="0 0 25 15"
      fill="none"
    >
      <path
        d="M6.54423 5.20314C7.30073 3.37012 9.37076 2.50962 11.1585 3.28517C11.4429 3.40858 11.5757 3.74548 11.4554 4.03712C11.3349 4.32849 11.0073 4.46491 10.7229 4.34181C9.50319 3.8126 8.0906 4.39977 7.5745 5.6504C7.48413 5.86891 7.27665 6.00001 7.05888 6.00001C6.98631 5.99997 6.91221 5.9849 6.84111 5.95411C6.55706 5.83055 6.42399 5.4946 6.54423 5.20314Z"
        fill="#C8C8E1"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.92021 1.89845C7.45151 -0.632786 11.5705 -0.632847 14.1018 1.89845C16.633 4.42975 16.633 8.54878 14.1018 11.0801C11.9543 13.2276 8.75994 13.5527 6.26591 12.0567C6.25993 12.0532 6.08339 11.9521 5.93388 12.1016C5.10977 12.9256 2.64228 15.3922 2.62822 15.4063C1.96898 16.0655 1.04686 16.2225 0.462199 15.6377L0.361613 15.5371C-0.222498 14.9525 -0.0657046 14.0312 0.593059 13.3721C0.593059 13.3721 3.07723 10.8879 3.90556 10.0596C4.04702 9.91822 3.94874 9.74317 3.94364 9.73439C2.4475 7.24033 2.77271 4.04594 4.92021 1.89845ZM12.9026 3.09767C11.0323 1.22728 7.98885 1.22733 6.11845 3.09767C4.24839 4.96809 4.24816 8.01157 6.11845 9.88185C7.9888 11.7519 11.0322 11.7518 12.9026 9.88185C14.773 8.01148 14.773 4.96801 12.9026 3.09767Z"
        fill="#C8C8E1"
      />
    </svg>
  );

  const menuItems = [
    { id: "menu", name: "Menu", icon: HamburgerIcon, action: "hamburger" },
    { id: "home", name: "Rewards", icon: HomeIcon, path: "#" },
    { id: "games", name: "Casino", icon: GamesIcon, path: "/casino" },
    { id: "promos", name: "Chat", icon: PromoIcon, path: "/leaderboard" },
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
    } else if (item.action === "search") {
      setShowSearchPopup(true);
    } else if (item.path) {
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
      <style>{`
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
