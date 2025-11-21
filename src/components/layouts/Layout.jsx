// Enhanced Layout.jsx with Sidebar State Management
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";

const Layout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(true); // Default to collapsed (icon-only)

  // Handle hamburger click from mobile bottom nav
  const handleMobileHamburgerClick = () => {
    setMobileSidebarOpen(true);
  };

  // Handle closing mobile sidebar
  const handleCloseMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  // Handle desktop sidebar toggle
  const handleDesktopSidebarToggle = (collapsed) => {
    setDesktopSidebarCollapsed(collapsed);
    // Note: Not saving to localStorage to ensure it always starts collapsed on page load
  };

  // Sidebar always starts collapsed on page load/refresh
  // No localStorage loading - ensures consistent collapsed state on every page load

  return (
    <div className="min-h-screen flex flex-col bg-[#0D0E36]">
      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header with sidebar state management */}
        <Header
          onMobileSidebarToggle={handleMobileHamburgerClick}
          isMobileSidebarOpen={mobileSidebarOpen}
          onCloseMobileSidebar={handleCloseMobileSidebar}
          onDesktopSidebarToggle={handleDesktopSidebarToggle}
          isDesktopSidebarCollapsed={desktopSidebarCollapsed}
        />

        {/* Main content area with dynamic margin based on sidebar state */}
        <motion.main
          initial={false}
          animate={{
            marginLeft:
              window.innerWidth >= 1024
                ? desktopSidebarCollapsed
                  ? 60
                  : 256
                : 0,
            paddingTop: 64, // Height of header
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-1 pb-0 md:pb-16 lg:pb-0"
        >
          {/* Glass morphism container for content */}
          <div className=" ">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.main>

        {/* Footer - Always visible on desktop, hidden behind bottom nav on mobile */}
        <motion.div
          initial={false}
          animate={{
            marginLeft:
              window.innerWidth >= 1024
                ? desktopSidebarCollapsed
                  ? 60
                  : 256
                : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="lg:block"
        >
          <Footer />
        </motion.div>

        {/* Mobile Bottom Navigation - Only visible on mobile */}
        <MobileBottomNav onHamburgerClick={handleMobileHamburgerClick} />
      </div>

      {/* Global Styles for Neon Effects */}
      <style jsx global>{`
        /* Neon Text Shadow */
        .neon-text {
          text-shadow: 0 0 10px rgba(139, 92, 246, 0.5),
            0 0 20px rgba(139, 92, 246, 0.3), 0 0 30px rgba(139, 92, 246, 0.2);
        }

        /* Neon Button Glow */
        .neon-button {
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.5),
            inset 0 0 20px rgba(139, 92, 246, 0.1);
        }

        /* Glass Card Effect */
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Animated Gradient Background */
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animated-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 10s ease infinite;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          border-radius: 8px;
          background: var(
            --hover-bar,
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.3) 0%,
              rgba(255, 255, 255, 0.05) 50%,
              rgba(255, 255, 255, 0.3) 100%
            )
          );
          box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(2px);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          border-radius: 8px;
          background: var(
            --hover-bar,
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.3) 0%,
              rgba(255, 255, 255, 0.05) 50%,
              rgba(255, 255, 255, 0.3) 100%
            )
          );
          box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(2px);
        }

        /* Prevent text selection on UI elements */
        .no-select {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>
    </div>
  );
};

export default Layout;
