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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 35 35"
            fill="none"
          >
            <rect
              x="0.5"
              y="0.5"
              width="34"
              height="34"
              rx="7.5"
              fill="url(#paint0_linear_9142_775)"
            />
            <rect
              x="0.5"
              y="0.5"
              width="34"
              height="34"
              rx="7.5"
              stroke="url(#paint1_linear_9142_775)"
            />
            <path
              d="M27.1612 8.5261C27.2324 8.17793 28.0307 8.18584 27.9991 8.62897L27.9833 19.5727C27.8173 20.2374 27.3667 20.6884 26.7107 20.8704C26.5289 22.4056 25.7542 23.7429 24.6555 24.7874C24.782 26.2592 24.5449 27.7469 22.8375 28.0001H12.2535C10.5224 27.7864 10.2458 26.275 10.3881 24.7874C9.28936 23.735 8.51473 22.3977 8.33293 20.8704C7.61363 20.6647 7.10775 20.1504 7.04451 19.3828C6.98918 18.726 6.98128 17.5153 7.04451 16.8585C7.10775 16.2017 7.62944 15.5845 8.29341 15.4579C8.39616 14.6824 8.52263 13.9228 8.77558 13.1869C10.3644 8.51819 15.5655 5.97019 20.2765 7.39453C23.8097 8.47071 26.434 11.7467 26.7423 15.4342L27.1612 15.5766V8.5261ZM11.2022 22.5876C12.4827 23.8695 16.7827 24.2177 18.5454 24.1306C20.4346 24.0357 24.4105 23.4897 24.6476 21.1157C24.8373 19.2483 24.5132 17.088 24.6476 15.1889C24.3947 13.3689 22.7506 12.9732 21.2408 12.5697C20.9642 12.4984 20.2449 12.269 20.0077 12.2769C19.9287 12.2769 19.9129 12.2927 19.8496 12.3323C19.5888 12.4826 18.9881 13.3372 18.7509 13.3847H16.3006L15.1386 12.2927C13.4471 12.7121 10.641 12.9732 10.4434 15.1968C10.309 16.724 10.4118 18.8843 10.4987 20.4431C10.5462 21.3531 10.4987 21.8991 11.1943 22.6034L11.2022 22.5876Z"
              fill="white"
            />
            <defs>
              <linearGradient
                id="paint0_linear_9142_775"
                x1="17.5"
                y1="35"
                x2="17.5"
                y2="4.17233e-06"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#5A3799" />
                <stop offset="1" stop-color="#DC1FFF" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_9142_775"
                x1="2.45192"
                y1="-7.76018e-06"
                x2="19.1272"
                y2="38.3892"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" stop-opacity="0.4" />
                <stop
                  offset="0.405687"
                  stop-color="white"
                  stop-opacity="0.01"
                />
                <stop
                  offset="0.574372"
                  stop-color="white"
                  stop-opacity="0.01"
                />
                <stop offset="1" stop-color="white" stop-opacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </button>

        {/* DROPDOWN MENU */}
        {dropdownOpen && (
          <div
            className="custom-header absolute right-0 mt-3 w-44 rounded-[24px] py-2 z-[9999] shadow-2xl"
            style={{
              background: "rgb(40 39 83)",
              backdropFilter: "blur(70px)",
              WebkitBackdropFilter: "blur(70px)",
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
