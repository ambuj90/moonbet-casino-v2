import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import GameCarousel from "../common/GameCarousel";

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="31"
    viewBox="0 0 32 31"
    fill="none"
  >
    <rect
      x="1"
      y="1"
      width="28.1644"
      height="30"
      rx="7"
      transform="matrix(-4.10515e-08 1 1 4.62187e-08 -4.62187e-08 1.35958e-06)"
      fill="#0D0E36"
      fillOpacity="0.4"
      stroke="url(#paint0_linear)"
      strokeWidth="2"
    />
    <path
      d="M10 10.6182C10 10.7821 10.0754 10.9397 10.21 11.0557L15.4512 15.5664L10.21 20.0791C10.0832 20.1963 10.0143 20.3516 10.0176 20.5117C10.021 20.6717 10.0962 20.8243 10.2275 20.9375C10.3592 21.0508 10.5374 21.1163 10.7236 21.1191C10.9096 21.1219 11.0894 21.0622 11.2256 20.9531L16.4678 16.4414L21.71 20.9531C21.7758 21.0139 21.8552 21.0629 21.9434 21.0967C22.0315 21.1305 22.1271 21.1479 22.2236 21.1494C22.32 21.1508 22.4155 21.1355 22.5049 21.1045C22.5943 21.0734 22.6759 21.0274 22.7441 20.9688C22.8124 20.91 22.8662 20.8397 22.9023 20.7627C22.9384 20.6858 22.9567 20.6035 22.9551 20.5205C22.9534 20.4374 22.9319 20.3552 22.8926 20.2793C22.8533 20.2035 22.7962 20.1357 22.7256 20.0791L17.4834 15.5664L22.7256 11.0557C22.8602 10.9397 22.9365 10.7821 22.9365 10.6182C22.9365 10.4542 22.8602 10.2967 22.7256 10.1807C22.5909 10.065 22.4081 10 22.2178 10C22.0274 10.0001 21.8447 10.0649 21.71 10.1807L16.4678 14.6924L11.2256 10.1807C11.0909 10.065 10.9081 10 10.7178 10C10.5274 10.0001 10.3446 10.0649 10.21 10.1807C10.0754 10.2967 10 10.4542 10 10.6182Z"
      fill="white"
      fillOpacity="0.9"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="2.11317"
        y1="-7.09502e-06"
        x2="17.9712"
        y2="34.4136"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0.4" />
        <stop offset="0.4" stopColor="white" stopOpacity="0.01" />
        <stop offset="0.57" stopColor="white" stopOpacity="0.01" />
        <stop offset="1" stopColor="white" stopOpacity="0.1" />
      </linearGradient>
    </defs>
  </svg>
);
const FireIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M13.7473 3.74906H2.50543C2.17415 3.74906 1.85644 3.88072 1.62219 4.11508C1.38794 4.34944 1.25634 4.6673 1.25634 4.99874C1.25634 5.33017 1.38794 5.64803 1.62219 5.88239C1.85644 6.11675 2.17415 6.24842 2.50543 6.24842H13.7473C14.4098 6.24842 15.0453 6.51174 15.5138 6.98046C15.9823 7.44918 16.2455 8.0849 16.2455 8.74777C16.2455 9.07921 16.3771 9.39707 16.6113 9.63143C16.8456 9.86579 17.1633 9.99745 17.4946 9.99745C17.8258 9.99745 18.1436 9.86579 18.3778 9.63143C18.6121 9.39707 18.7437 9.07921 18.7437 8.74777C18.7437 7.42203 18.2173 6.15059 17.2803 5.21315C16.3433 4.27571 15.0724 3.74906 13.7473 3.74906Z"
      fill="url(#paint0_linear_10217_1632)"
    />
    <path
      d="M2.50543 9.99745C2.17415 9.99745 1.85644 10.1291 1.62219 10.3635C1.38794 10.5978 1.25634 10.9157 1.25634 11.2471C1.25634 12.5729 1.78274 13.8443 2.71974 14.7818C3.65675 15.7192 4.92759 16.2458 6.25272 16.2458H17.4946C17.8258 16.2458 18.1436 16.1142 18.3778 15.8798C18.6121 15.6455 18.7437 15.3276 18.7437 14.9962C18.7437 14.6647 18.6121 14.3469 18.3778 14.1125C18.1436 13.8782 17.8258 13.7465 17.4946 13.7465H6.25272C5.59016 13.7465 4.95473 13.4832 4.48623 13.0144C4.01773 12.5457 3.75453 11.91 3.75453 11.2471C3.75453 10.9157 3.62293 10.5978 3.38868 10.3635C3.15442 10.1291 2.83671 9.99745 2.50543 9.99745Z"
      fill="url(#paint1_linear_10217_1632)"
    />
    <path
      d="M14.9964 9.99745C14.832 9.9965 14.669 10.028 14.5168 10.0902C14.3647 10.1524 14.2262 10.244 14.1095 10.3599C13.9924 10.476 13.8995 10.6143 13.8361 10.7665C13.7727 10.9188 13.74 11.0822 13.74 11.2471C13.74 11.4121 13.7727 11.5754 13.8361 11.7277C13.8995 11.88 13.9924 12.0182 14.1095 12.1344L16.9824 14.9962L14.1095 17.8579C13.8743 18.0933 13.7422 18.4124 13.7422 18.7452C13.7422 19.078 13.8743 19.3972 14.1095 19.6325C14.3447 19.8678 14.6637 20 14.9964 20C15.329 20 15.648 19.8678 15.8832 19.6325L19.6305 15.8834C19.7476 15.7673 19.8405 15.6291 19.9039 15.4768C19.9674 15.3245 20 15.1611 20 14.9962C20 14.8312 19.9674 14.6679 19.9039 14.5156C19.8405 14.3633 19.7476 14.2251 19.6305 14.1089L15.8832 10.3599C15.7665 10.244 15.6281 10.1524 15.4759 10.0902C15.3237 10.028 15.1608 9.9965 14.9964 9.99745Z"
      fill="url(#paint2_linear_10217_1632)"
    />
    <path
      d="M5.00362 2.08875e-05C4.83923 -0.000929985 4.67627 0.0305932 4.52409 0.092783C4.3719 0.154973 4.23348 0.246606 4.11676 0.362428L0.36948 4.11146C0.252404 4.22764 0.159479 4.36585 0.096064 4.51814C0.0326491 4.67042 0 4.83376 0 4.99874C0 5.16371 0.0326491 5.32705 0.096064 5.47933C0.159479 5.63162 0.252404 5.76984 0.36948 5.88601L4.11676 9.63505C4.35197 9.87037 4.67099 10.0026 5.00362 10.0026C5.16833 10.0026 5.33142 9.97011 5.48359 9.90705C5.63575 9.84399 5.77401 9.75156 5.89048 9.63505C6.00694 9.51853 6.09933 9.3802 6.16236 9.22796C6.22539 9.07572 6.25783 8.91256 6.25783 8.74777C6.25783 8.58299 6.22539 8.41982 6.16236 8.26759C6.09933 8.11535 6.00694 7.97702 5.89048 7.8605L3.01756 4.99874L5.89048 2.13697C6.00755 2.0208 6.10048 1.88258 6.16389 1.7303C6.22731 1.57801 6.25996 1.41467 6.25996 1.2497C6.25996 1.08473 6.22731 0.921388 6.16389 0.769103C6.10048 0.616818 6.00755 0.478602 5.89048 0.362428C5.77376 0.246606 5.63534 0.154973 5.48316 0.092783C5.33097 0.0305932 5.16801 -0.000929985 5.00362 2.08875e-05Z"
      fill="url(#paint3_linear_10217_1632)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_10217_1632"
        x1="-1.56462e-08"
        y1="3"
        x2="24.5"
        y2="24"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FFB8A1" />
        <stop offset="1" stop-color="#A62A00" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_10217_1632"
        x1="-1.56462e-08"
        y1="3"
        x2="24.5"
        y2="24"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FFB8A1" />
        <stop offset="1" stop-color="#A62A00" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_10217_1632"
        x1="-1.56462e-08"
        y1="3"
        x2="24.5"
        y2="24"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FFB8A1" />
        <stop offset="1" stop-color="#A62A00" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_10217_1632"
        x1="-1.56462e-08"
        y1="3"
        x2="24.5"
        y2="24"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FFB8A1" />
        <stop offset="1" stop-color="#A62A00" />
      </linearGradient>
    </defs>
  </svg>
);

const GlobalSearchPopup = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Fetch matching games
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const load = setTimeout(async () => {
      try {
        const { data } = await axios.get(
          `/wallet-service/api/games?name=${query}`
        );
        setResults(data?.data || []);
      } catch {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(load);
  }, [query]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999999] flex items-center justify-center"
        style={{
          backgroundColor: "rgba(13, 14, 54, 0.40)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* MODAL CONTAINER */}
        <motion.div
          className="w-full max-w-3xl mx-2 p-4 rounded-3xl relative max-h-[90vh] overflow-y-auto"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 100%)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(25px)",
          }}
          initial={{ scale: 0.93, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.93, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* CLOSE BUTTON */}
          <button className="absolute top-6 right-5" onClick={onClose}>
            <CloseIcon />
          </button>

          {/* SEARCH BAR */}
          <div className="trust_btn3 w-[80%] flex items-center gap-3 bg-[#1E1F4B]/70 border border-white/10 rounded-full px-5 py-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 16 16"
              className="opacity-60"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.91938 1.89852C7.45073 -0.632855 11.5701 -0.632826 14.1015 1.89852C16.6328 4.42991 16.6329 8.54917 14.1015 11.0806C11.9541 13.2277 8.76039 13.5528 6.26647 12.0571C6.26647 12.0571 6.0863 11.9497 5.93426 12.1014C5.10789 12.9277 2.62776 15.4073 2.62776 15.4073C1.96853 16.0662 1.04706 16.2224 0.46251 15.6377L0.362195 15.5375C-0.222361 14.9528 -0.0661856 14.0314 0.59279 13.3722C0.59279 13.3722 3.07764 10.8879 3.9058 10.0598C4.04794 9.91772 3.94781 9.74149 3.94358 9.73424C2.44747 7.24024 2.7721 4.04606 4.91938 1.89852ZM12.9029 3.09771C11.0325 1.22729 7.98972 1.2274 6.11926 3.09771C4.24892 4.96802 4.24787 8.0109 6.11795 9.88137C7.98846 11.7517 11.0325 11.7517 12.9029 9.88137C14.7732 8.01101 14.7731 4.96809 12.9029 3.09771Z"
                fill="#555594"
              />
            </svg>

            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Games, Providers"
              className="w-full bg-transparent text-white text-sm placeholder-[#6F6FA8] outline-none"
            />
          </div>

          {/* CATEGORY TABS */}
          <div className=" flex gap-1 mt-4">
            {["Casino", "Live Dealer", "Slots"].map((tab) => (
              <button
                key={tab}
                className="trust_btn3 px-5 py-2 rounded-full bg-[rgba(40, 39, 83, 0.40)] text-white text-xs
                border border-white/10 hover:bg-[#2f2f61]"
              >
                {tab}
              </button>
            ))}
          </div>

          {/* HIGH RTP GAMES */}
          <div className="mt-1">
            <GameCarousel
              title="HIGH RTP GAMES"
              icon={<FireIcon />}
              games={results.slice(0, 4)}
              loading={false}
              viewAllPath="/casino/high-rtp"
              geoVariant="default"
            />
          </div>

          {/* Second Section (as screenshot) */}
          <div className="mt-1">
            <GameCarousel
              title="HIGH RTP GAMES"
              icon={<FireIcon />}
              games={results.slice(0, 4)}
              loading={false}
              viewAllPath="/casino/high-rtp"
              geoVariant="default"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GlobalSearchPopup;
