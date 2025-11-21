// src/components/MobileBottomNav.jsx - Updated Mobile Bottom Navigation
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const MobileBottomNav = ({ onHamburgerClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState("home");

  // SVG Icons as components
  const HamburgerIcon = () => (
    <svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );

  const HomeIcon = () => (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );

  const GamesIcon = () => (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  );

  const PromoIcon = () => (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
    </svg>
  );

  const ChatIcon = () => (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
    </svg>
  );

  const menuItems = [
    { id: "menu", name: "Menu", icon: HamburgerIcon, action: "hamburger" },
    { id: "home", name: "Home", icon: HomeIcon, path: "/" },
    { id: "games", name: "Games", icon: GamesIcon, path: "/games" },
    { id: "promos", name: "Promos", icon: PromoIcon, path: "/promotions" },
    { id: "chat", name: "Chat", icon: ChatIcon, path: "/chat" },
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
      // Call the parent component's hamburger handler
      onHamburgerClick();
    } else if (item.path) {
      setSelectedItem(item.id);
      navigate(item.path);
    }
  };

  return (
    <>
      {/* Mobile Bottom Navigation - Only visible on mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40   border-t border-white/10">
        <div className="flex items-center justify-around px-2 py-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all min-w-[60px] ${
                  selectedItem === item.id && item.id !== "menu"
                    ? "text-[#F07730]"
                    : "text-gray-400 hover:text-white"
                } ${item.id === "menu" ? "text-white" : ""}`}
              >
                <span className="mb-1">
                  <IconComponent />
                </span>
                <span className="text-xs font-medium">{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

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
