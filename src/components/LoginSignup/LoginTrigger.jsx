// src/components/LoginSignup/LoginTrigger.jsx

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoginSignup from "./LoginSignup";
import ProfileModal from "../profile/ProfileModal";

export const LoginTrigger = ({
  buttonText = "Login",
  defaultTab = "login",
  onLoginSuccess,
  onSignupSuccess,
  className = "",
  forceOpen = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const dropdownRef = useRef(null);

  /* ------------------------------- CHECK LOGIN ------------------------------ */
  useEffect(() => {
    if (forceOpen) setIsModalOpen(true);
  }, [forceOpen]);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  /* --------------------------- CLICK OUTSIDE CLOSE -------------------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* --------------------------- LOGIN / SIGNUP SUCCESS ----------------------- */
  const handleLoginSuccess = (userData) => {
    const { token, user } = userData || {};
    if (token) {
      localStorage.setItem("token", token);
      window.dispatchEvent(new Event("tokenChanged"));
    }
    if (user) {
      const { username, email, kycStatus, id } = user;
      localStorage.setItem(
        "user",
        JSON.stringify({ id, username, email, kycStatus })
      );
    }
    setIsLoggedIn(true);
    setIsModalOpen(false);
    if (onLoginSuccess) onLoginSuccess(userData);
  };

  const handleSignupSuccess = (userData) => {
    const { token, user } = userData || {};
    if (token) {
      localStorage.setItem("token", token);
      window.dispatchEvent(new Event("tokenChanged"));
    }
    if (user) {
      const { username, email, kycStatus, _id } = user;
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: _id,
          username,
          email,
          kycStatus,
        })
      );
    }
    setIsLoggedIn(true);
    setIsModalOpen(false);
    if (onSignupSuccess) onSignupSuccess(userData);
  };

  /* --------------------------------- LOGOUT -------------------------------- */
  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("tokenChanged"));
    setIsLoggedIn(false);
    setDropdownOpen(false);

    toast.info("You have been logged out successfully", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleOpenModal = () => {
    setActiveTab(defaultTab);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleProfileClick = () => {
    setDropdownOpen(false);
    setShowProfileModal(true);
  };

  /* --------------------------- LOGGED IN UI (DROPDOWN) ---------------------- */
  if (isLoggedIn) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    return (
      <div className="relative" ref={dropdownRef}>
        {/* PROFILE BUTTON */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`${className} w-14 h-14 rounded-full overflow-hidden flex items-center justify-center`}
        >
          <img
            src="/icons/login.svg"
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </button>

        {/* DROPDOWN MENU */}
        {dropdownOpen && (
          <div
            className="absolute right-0 mt-3 w-44 rounded-[24px] py-2 z-[9999] shadow-2xl"
            style={{
              background: "linear-gradient(180deg,#50545B 0%,#3C4046 100%)",
              backdropFilter: "blur(70px)",
              WebkitBackdropFilter: "blur(70px)",
              border: "2px solid rgba(255,255,255,0.05)",
            }}
          >
            {/* PROFILE */}
            <button
              onClick={handleProfileClick}
              className="header-item flex items-center gap-3 w-full"
            >
              <div className="header-icon-wrap">
                <img src="/icons/profile.png" />
              </div>
              <div className="header-info">
                <span className="header-name">Profile</span>
              </div>
            </button>

            {/* BETS */}
            <Link
              to="/bets"
              className="header-item flex items-center gap-3 w-full"
            >
              <div className="header-icon-wrap">
                <img src="/icons/bets.png" />
              </div>
              <div className="header-info">
                <span className="header-name">Bets</span>
              </div>
            </Link>

            {/* TRANSACTIONS */}
            <Link
              to="/transactions"
              className="header-item flex items-center gap-3 w-full"
            >
              <div className="header-icon-wrap">
                <img src="/icons/transactions.png" />
              </div>
              <div className="header-info">
                <span className="header-name">Transactions</span>
              </div>
            </Link>

            {/* SETTINGS */}
            <Link
              to="/settings"
              className="header-item flex items-center gap-3 w-full"
            >
              <div className="header-icon-wrap">
                <img src="/icons/settings.png" />
              </div>
              <div className="header-info">
                <span className="header-name">Settings</span>
              </div>
            </Link>

            {/* DIVIDER */}
            <div className="border-t border-white/10 my-1"></div>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="header-item flex items-center gap-3 w-full"
            >
              <div className="header-icon-wrap">
                <img src="/icons/logout.png" />
              </div>
              <div className="header-info">
                <span className="header-name text-red-400">Logout</span>
              </div>
            </button>
          </div>
        )}

        {/* PROFILE MODAL */}
        <ProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          userData={user}
        />

        {/* HOVER CSS */}
        <style jsx>{`
          .header-item {
            position: relative;
            padding: 0px 18px;
            border-radius: 50px;
            cursor: pointer;
            overflow: hidden;
            transition: all 0.25s ease;
            margin: 7px 0;
          }

          /* Capsule hover */
          .header-item::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 50px;
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.45),
              rgba(255, 255, 255, 0.15)
            );
            opacity: 0;
            transform: scale(0.98);
            transition: opacity 0.25s, transform 0.25s;
            z-index: 0;
            margin: 0px 18px;
          }

          .header-item:hover::before {
            opacity: 1;
            transform: scale(1);
            color: #fff;
          }
          .header-item:hover .header-name {
            color: #fff;
          }

          .header-icon-wrap {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2;
            transition: all 0.25s ease;
          }

          .header-item:hover .header-icon-wrap {
            background: rgba(255, 255, 255, 0.55);
          }

          .header-info {
            // margin-left: 10px;
            z-index: 2;
          }

          .header-name {
            color: #a7a7a7;
            font-size: 14px;
            font-weight: 500;
          }
        `}</style>
      </div>
    );
  }

  /* ---------------------------- DEFAULT LOGIN BUTTON ------------------------ */
  return (
    <>
      <button
        onClick={handleOpenModal}
        className={`${className} cursor-pointer`}
      >
        {buttonText}
      </button>

      <LoginSignup
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        defaultTab={activeTab}
        onLoginSuccess={handleLoginSuccess}
        onSignupSuccess={handleSignupSuccess}
      />
    </>
  );
};

export default LoginTrigger;
