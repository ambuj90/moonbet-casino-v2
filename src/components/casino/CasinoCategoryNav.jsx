import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Import the JSON icon data
import categoryIconsData from "./casinoIcons.json";

// SVG Icon Component that renders from JSON data
const CategoryIcon = ({ id, active, isHovered }) => {
  const iconData = categoryIconsData[id];

  if (!iconData) return null;

  const fillColor = active
    ? "#E1E1E1"
    : isHovered
    ? "url(#hoverGradient)"
    : "#7D7D7D";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconData.width}
      height={iconData.height}
      viewBox={iconData.viewBox}
      fill="none"
      style={{ transition: "0.2s ease-in-out" }}
    >
      <defs>
        <linearGradient id="hoverGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFBF9A" />
          <stop offset="100%" stopColor="#F07730" />
        </linearGradient>
        <filter
          id={iconData.filterId}
          x="-1"
          y="0"
          width="27"
          height="26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result={`effect1_dropShadow_${iconData.filterId}`}
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2={`effect1_dropShadow_${iconData.filterId}`}
            result="shape"
          />
        </filter>
      </defs>
      <g filter={active ? `url(#${iconData.filterId})` : undefined}>
        {iconData.paths.map((path, index) => (
          <path key={index} d={path} fill={fillColor} />
        ))}
      </g>
    </svg>
  );
};

// Wrapper component with hover state
const DynamicIcon = ({ id, active }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center justify-center"
    >
      <CategoryIcon id={id} active={active} isHovered={isHovered} />
    </div>
  );
};

const PROVIDER_LIST = [
  { id: "pragmatic play", label: "Pragmatic Play" },
  { id: "evolution gaming", label: "Evolution Gaming" },
  { id: "playngo", label: "Play'n GO" },
  { id: "netent", label: "NetEnt" },
  { id: "hacksaw gaming", label: "Hacksaw Gaming" },
  { id: "ezugi", label: "Ezugi" },
  { id: "bgaming", label: "BGaming" },
];

const CasinoCategoryNav = ({
  selectedCategory,
  setSelectedCategory,
  selectedFilter,
  setSelectedFilter,
  searchTerm,
  setSearchTerm,
}) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [showFilterLeftArrow, setShowFilterLeftArrow] = useState(false);
  const [showFilterRightArrow, setShowFilterRightArrow] = useState(true);
  const categoriesRef = useRef(null);
  const filtersRef = useRef(null);
  const navigate = useNavigate();

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const { category } = useParams();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isLoggedIn = !!user?.id;
  const [studioOpen, setStudioOpen] = useState(false);
  const studioRef = useRef(null);
  const [selectedStudio, setSelectedStudio] = useState("all");
  const [availableStudios, setAvailableStudios] = useState([]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (studioRef.current && !studioRef.current.contains(e.target)) {
        setStudioOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // when URL changes (e.g. /casino/slots)
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("all");
    }
  }, [category]);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        let res;

        if (selectedCategory === "favorites") {
          const user = JSON.parse(localStorage.getItem("user") || "{}");
          const userId = user.id;

          res = await fetch(
            `/wallet-service/api/games/${userId}/favourite-game`
          );
        } else {
          const params = new URLSearchParams();
          const activeCategory = category || selectedCategory;

          if (activeCategory && activeCategory !== "all") {
            params.append("type", activeCategory);
          }

          if (selectedFilter) {
            params.append("sortBy", selectedFilter);
          }

          if (searchTerm) {
            params.append("name", searchTerm);
          }

          const query = params.toString() ? `?${params.toString()}` : "";

          res = await fetch(`/wallet-service/api/games${query}`);
        }

        const data = await res.json();
        if (data.success) {
          let fetchedGames = data.data || [];

          if (selectedStudio !== "all") {
            fetchedGames = fetchedGames.filter((game) => {
              const provider =
                game.provider ||
                game.provider_name ||
                game.studio ||
                game.vendor ||
                "";

              return provider.toLowerCase().includes(selectedStudio);
            });
          }

          setGames(fetchedGames);
        } else {
          setGames([]);
        }
      } catch (err) {
        console.error("Error fetching games:", err);
        setGames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [category, selectedFilter, searchTerm, selectedCategory, selectedStudio]);

  useEffect(() => {
    setAvailableStudios([
      { id: "all", label: "All Studios" },
      ...PROVIDER_LIST,
    ]);
  }, []);

  useEffect(() => {
    setSelectedStudio("all");
  }, [selectedCategory, category]);

  // --- SVG Icon Components ---
  const ChevronLeft = ({ className }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );

  const ChevronRight = ({ className }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );

  // --- Categories (using JSON icons) ---
  const categories = [
    { id: "all", label: "All" },
    { id: "recent", label: "Recent Games" },
    ...(isLoggedIn ? [{ id: "favorites", label: "Favorites" }] : []),
    { id: "live dealer", label: "Live Dealer" },
    { id: "crash", label: "Crash" },
    { id: "slots", label: "Slots" },
    { id: "roulette", label: "Roulette" },
    { id: "blackjack", label: "Blackjack" },
    { id: "baccarat", label: "Baccarat" },
    { id: "game show", label: "Game Shows" },
    { id: "Arcade", label: "Arcade" },
  ];

  const filters = [
    {
      id: "highroller",
      label: "High roller",
      IconComponent: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M6.33306 6.33328C9.38539 6.33328 11.6661 5.12664 11.6661 4.04772C11.6661 2.96889 9.38534 1.76221 6.33306 1.76221C3.28079 1.76221 1.00005 2.96889 1.00005 4.04772C1.00005 5.12664 3.28074 6.33328 6.33306 6.33328Z"
            fill="#7171B4"
          />
          <path
            d="M6.33306 15.4758C6.77857 15.4758 7.20737 15.4499 7.61524 15.4027C7.27143 14.9609 6.9871 14.4706 6.7741 13.944C6.62775 13.9489 6.48089 13.9523 6.33301 13.9523C4.58892 13.9523 2.93723 13.6067 1.68234 12.9792C1.43525 12.8557 1.20787 12.723 1.00005 12.5825V13.1903C1.00005 14.2691 3.28074 15.4758 6.33306 15.4758Z"
            fill="#7171B4"
          />
          <path
            d="M6.33306 12.4283C6.34871 12.4283 6.3641 12.4281 6.3797 12.428C6.34845 12.1783 6.33215 11.9239 6.33215 11.6659C6.33215 11.4079 6.3484 11.1537 6.3797 10.9042C6.3641 10.9042 6.34866 10.9048 6.33306 10.9048C4.58897 10.9048 2.93733 10.5592 1.68239 9.9317C1.43525 9.80816 1.20782 9.67542 1 9.53496V10.1428C1.00005 11.2216 3.28074 12.4283 6.33306 12.4283Z"
            fill="#7171B4"
          />
          <path
            d="M6.33306 9.38073C6.48424 9.38073 6.63339 9.37768 6.78065 9.37189C7.01718 8.79161 7.34041 8.25563 7.73451 7.7803C7.27823 7.83059 6.80931 7.85726 6.33306 7.85726C4.58897 7.85726 2.93733 7.51167 1.68239 6.8842C1.43525 6.7606 1.20782 6.62792 1 6.48741V7.09527C1.00005 8.17415 3.28074 9.38073 6.33306 9.38073Z"
            fill="#7171B4"
          />
          <path
            d="M8.61903 9.1403C8.28934 9.63595 8.05379 10.1993 7.93791 10.8046C7.88442 11.0836 7.85618 11.3715 7.85618 11.6659C7.85618 11.8872 7.87233 12.1048 7.90286 12.3178C7.97789 12.8411 8.14182 13.3359 8.37885 13.7867C8.62757 14.2596 8.95659 14.6841 9.3479 15.0414C10.1611 15.7842 11.2426 16.2378 12.4281 16.2378C14.9491 16.2378 17.0001 14.1869 17.0001 11.6659C17.0001 9.14487 14.9491 7.09395 12.4281 7.09395C12.1676 7.09395 11.9121 7.1162 11.6633 7.15826C10.3959 7.37258 9.30436 8.11014 8.61903 9.1403Z"
            fill="#7171B4"
          />
        </svg>
      ),
    },
    {
      id: "featurebuy",
      label: "Feature buy",
      IconComponent: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M13.9603 7.32041C13.8882 7.1512 13.7261 7.04465 13.5489 7.04465H10.6667L13.4619 1.69252C13.5369 1.54837 13.5339 1.36976 13.4529 1.22875C13.3718 1.08461 13.2247 1 13.0656 1H6.90478C6.70663 1 6.53249 1.13474 6.47545 1.33216L4.01954 9.69879C3.97751 9.8398 4.00453 9.99648 4.08859 10.1156C4.17266 10.2346 4.30776 10.3067 4.45188 10.3067H7.46922L5.56274 16.3827C5.49669 16.5958 5.58075 16.8277 5.7669 16.9373C5.83595 16.9781 5.91401 17 5.98907 17C6.11517 17 6.24127 16.9436 6.32833 16.8402L13.8882 7.82804C14.0053 7.69017 14.0323 7.49275 13.9603 7.32354V7.32041Z"
            fill="#7171B4"
          />
        </svg>
      ),
    },
    {
      id: "trending",
      label: "Trending",
      IconComponent: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M13.6964 7.07269C13.6551 7.01863 13.6052 7.02926 13.579 7.04029C13.5571 7.0496 13.5068 7.07935 13.5138 7.15391C13.5221 7.24344 13.5268 7.33472 13.5277 7.42526C13.5314 7.80082 13.3876 8.16875 13.133 8.43472C12.8801 8.69897 12.5474 8.84134 12.1932 8.83722C11.7093 8.83075 11.308 8.56647 11.0326 8.07294C10.8049 7.66485 10.905 7.13851 11.0109 6.58123C11.073 6.25504 11.1371 5.91773 11.1371 5.5967C11.1371 3.09705 9.53236 1.65493 8.57581 1.01778C8.55602 1.00462 8.53719 1 8.52051 1C8.49339 1 8.4719 1.01225 8.46131 1.01975C8.44077 1.03431 8.40792 1.0675 8.41848 1.12625C8.78411 3.15943 7.69356 4.38227 6.53898 5.67689C5.34888 7.01135 4 8.52388 4 11.2517C4 14.4214 6.46247 17 9.48927 17C11.9814 17 14.1787 15.1805 14.8326 12.5753C15.2785 10.799 14.8112 8.53625 13.6964 7.07269ZM9.62621 15.773C8.86829 15.8092 8.14749 15.5246 7.59694 14.9733C7.05229 14.4279 6.73991 13.6669 6.73991 12.8852C6.73991 11.4183 7.27551 10.3414 8.7161 8.91178C8.73967 8.88837 8.76381 8.88097 8.78485 8.88097C8.80392 8.88097 8.82045 8.88706 8.83182 8.89278C8.85579 8.90487 8.89518 8.93481 8.88987 8.99956C8.83836 9.62722 8.83925 10.1482 8.89249 10.5481C9.02857 11.5695 9.7426 12.2557 10.6693 12.2557C11.1237 12.2557 11.5565 12.0767 11.888 11.7515C11.9265 11.7138 11.9695 11.7186 11.9859 11.7222C12.0077 11.7272 12.037 11.7412 12.0523 11.7798C12.1897 12.1274 12.26 12.4963 12.261 12.8762C12.2654 14.4051 11.0835 15.7047 9.62621 15.773Z"
            fill="#7171B4"
          />
        </svg>
      ),
    },
    {
      id: "new",
      label: "New",
      IconComponent: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M13.9993 9.90456C9.58599 10.6243 8.8014 11.5386 8.21296 16.8687C8.19335 17.0438 7.93835 17.0438 7.91874 16.8687C7.3303 11.5386 6.54571 10.6438 2.1324 9.90456C1.95587 9.88511 1.95587 9.63222 2.1324 9.61277C6.54571 8.89301 7.3303 7.99818 7.91874 2.66809C7.93835 2.49301 8.19335 2.49301 8.21296 2.66809C8.8014 7.99818 9.58599 8.87356 13.9993 9.61277C14.1562 9.63222 14.1562 9.86565 13.9993 9.90456Z"
            fill="#7171B4"
          />
          <path
            d="M15.8823 3.75745C14.5093 4.02979 14.117 4.4772 13.8816 6.07234C13.862 6.24742 13.607 6.24742 13.5874 6.07234C13.352 4.4772 12.9597 4.02979 11.5867 3.73799C11.4298 3.69909 11.4298 3.48511 11.5867 3.4462C12.9401 3.17386 13.352 2.72644 13.5874 1.13131C13.607 0.956231 13.862 0.956231 13.8816 1.13131C14.117 2.72644 14.5093 3.17386 15.8823 3.46565C16.0392 3.50456 16.0392 3.73799 15.8823 3.75745Z"
            fill="#7171B4"
          />
        </svg>
      ),
    },
    {
      id: "hot",
      label: "Hot",
      IconComponent: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M10.472 2.1761C10.3186 2.00332 10.0502 2.09051 10.0226 2.30528C9.90558 3.50928 9.78585 4.57106 9.47668 5.40553C9.13706 6.39121 8.59022 7.00431 7.75312 8.04646C7.35116 8.56303 6.84342 9.21554 6.54916 10.1317C6.29721 10.9935 6.29848 11.8438 6.45971 12.6005C6.74033 13.9324 7.3891 15.0714 8.33389 15.9085C8.49336 16.051 8.73777 15.9275 8.75027 15.7097C8.74675 14.4812 8.74291 13.4101 8.88652 12.4633C8.97804 11.931 9.10257 11.4683 9.28416 11.1116C9.42344 10.8094 9.72267 10.4136 10.1216 9.91216C10.5054 9.40765 10.9709 8.80952 11.307 8.07496C11.6581 7.34346 11.8437 6.49966 11.8333 5.6948C11.7819 4.31496 11.2688 3.12479 10.472 2.1761Z"
            fill="#7171B4"
          />
          <path
            d="M7.2488 1.12861C7.13164 0.931701 6.84219 0.967414 6.78145 1.19119C6.56876 2.01375 6.3774 2.73046 6.05974 3.29561C5.69961 3.99381 5.22857 4.38619 4.47962 5.06846C4.12927 5.40662 3.68227 5.83535 3.34634 6.49124C3.06474 7.11094 2.97002 7.73707 3.008 8.32716C3.06329 9.29853 3.39312 10.1525 3.94028 10.8616C4.07554 11.0465 4.35906 10.9623 4.40169 10.7506C4.52703 9.89459 4.64612 9.14748 4.84037 8.49432C4.96474 8.11031 5.11011 7.77778 5.28544 7.53003C5.42152 7.32154 5.69334 7.06188 6.04064 6.73885C6.37289 6.41275 6.78366 6.00815 7.11927 5.5096C7.45488 5.01104 7.68824 4.3973 7.7618 3.79836C7.90253 2.78806 7.69033 1.89503 7.2488 1.12861Z"
            fill="#7171B4"
          />
          <path
            d="M14.9997 9.43809C15.0108 8.4487 14.684 7.57964 14.167 6.87661C14.0317 6.69176 13.7362 6.75772 13.7056 6.98761C13.5983 7.83157 13.4823 8.56356 13.2369 9.15912C12.9641 9.89078 12.5292 10.3377 11.8735 11.1019C11.5622 11.4794 11.1664 11.9658 10.9208 12.64C10.7115 13.2901 10.6952 13.9164 10.7964 14.5036C10.9663 15.451 11.3957 16.2779 12.0183 16.9236C12.1748 17.0813 12.4463 16.979 12.4588 16.7612C12.4907 15.9019 12.5043 15.1334 12.6383 14.468C12.7174 14.0749 12.8207 13.718 12.9689 13.449C13.093 13.2224 13.3226 12.9384 13.6308 12.576C13.924 12.2105 14.2956 11.7664 14.562 11.2224C14.8314 10.6632 14.9895 10.0341 14.9997 9.43809Z"
            fill="#7171B4"
          />
        </svg>
      ),
    },
    {
      id: "cold",
      label: "Cold",
      IconComponent: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M15.8555 9.848C15.6534 9.456 15.1793 9.304 14.8062 9.512L13.0029 10.496L10.5701 9.032L12.9641 7.664L14.8451 8.736C14.9617 8.8 15.0938 8.832 15.2182 8.832C15.4902 8.832 15.7545 8.68 15.9022 8.416C16.112 8.032 15.9721 7.544 15.599 7.328L14.5653 6.74399L15.5602 6.176C15.9332 5.96 16.0732 5.472 15.8633 5.088C15.6534 4.704 15.1793 4.56 14.8062 4.776L13.9512 5.264L14.0056 4.408C14.0367 3.968 13.7103 3.584 13.2828 3.56C12.8475 3.536 12.4822 3.86401 12.4589 4.30401L12.3423 6.184L9.77728 7.648V4.808L11.5184 3.70401C11.8837 3.47201 12.0003 2.976 11.7749 2.6C11.5494 2.224 11.0753 2.104 10.7022 2.336L9.77728 2.92V1.8C9.77728 1.36 9.42751 1 9.00001 1C8.57251 1 8.22274 1.36 8.22274 1.8V2.888L7.38329 2.352C7.01798 2.12 6.54383 2.232 6.31065 2.608C6.08524 2.984 6.19404 3.472 6.55936 3.712L8.21497 4.776V7.608L5.71992 6.112L5.6344 4.2C5.61108 3.76 5.24579 3.4 4.82607 3.44C4.39857 3.464 4.06433 3.832 4.08765 4.272L4.12652 5.152L3.27929 4.648C2.9062 4.424 2.43206 4.552 2.21443 4.936C1.99679 5.32 2.12117 5.80799 2.49426 6.03199L3.49691 6.63199L2.4787 7.184C2.09784 7.392 1.95794 7.872 2.15226 8.264C2.29216 8.536 2.56422 8.688 2.83626 8.688C2.96062 8.688 3.08499 8.656 3.20158 8.592L5.07479 7.568L7.42216 8.976L4.95043 10.384L3.15494 9.36C2.78185 9.144 2.30771 9.288 2.09785 9.672C1.88798 10.056 2.0279 10.544 2.40099 10.76L3.34148 11.296L2.42431 11.816C2.05122 12.032 1.9113 12.52 2.12117 12.904C2.26107 13.168 2.52534 13.32 2.80516 13.32C2.92952 13.32 3.06167 13.288 3.17826 13.224L4.05655 12.728L3.99438 13.688C3.96329 14.128 4.28974 14.512 4.71723 14.536H4.77165C5.17583 14.536 5.51783 14.208 5.54892 13.784L5.67328 11.8L8.22274 10.352V13.288L6.49718 14.384C6.13187 14.616 6.01529 15.112 6.24069 15.488C6.38837 15.736 6.64486 15.872 6.90139 15.872C7.0413 15.872 7.1812 15.832 7.30557 15.752L8.21497 15.176V16.2C8.21497 16.64 8.56474 17 8.99224 17C9.41974 17 9.76951 16.64 9.76951 16.2V15.192L10.6245 15.736C10.9898 15.968 11.464 15.856 11.6971 15.48C11.9225 15.104 11.8137 14.616 11.4484 14.376L9.77728 13.304V10.392L12.2879 11.896L12.3811 13.896C12.3967 14.328 12.7464 14.656 13.1584 14.656H13.1973C13.6248 14.632 13.959 14.264 13.9357 13.824L13.889 12.864L14.7207 13.368C14.8451 13.44 14.9772 13.48 15.1093 13.48C15.3736 13.48 15.6379 13.336 15.7856 13.08C16.0032 12.696 15.8788 12.208 15.5057 11.984L14.5886 11.432L15.5368 10.912C15.9177 10.704 16.0576 10.224 15.8633 9.832L15.8555 9.848Z"
            fill="#7171B4"
          />
        </svg>
      ),
    },
    {
      id: "highrtp",
      label: "High RTP",
      IconComponent: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M1.99081 14C1.83144 14 1.67831 13.9625 1.53769 13.8906C1.15956 13.7063 0.94394 13.3062 1.01269 12.9187C1.05956 12.6594 1.17519 12.4156 1.32206 12.2625C2.88144 10.6781 4.44706 9.11875 5.63456 7.94063C5.84706 7.73125 6.10019 7.61875 6.36269 7.61875C6.63769 7.61875 6.90331 7.7375 7.13144 7.96562L9.81894 10.6531L13.4752 6.99375L13.1064 6.99062C12.6377 6.9875 11.9939 6.98437 11.6252 6.98125C11.0439 6.975 10.6377 6.57187 10.6346 5.99687C10.6346 5.71562 10.7314 5.4625 10.9127 5.28125C11.0939 5.1 11.3408 5.00312 11.6158 5.00312C12.3596 5 13.1002 5 13.8158 5C14.5627 5 15.3064 5.00312 16.0252 5.00312C16.5814 5.00625 16.9877 5.40312 16.9908 5.95C17.0002 7.475 17.0002 8.97812 16.9908 10.4187C16.9877 10.9656 16.5721 11.3625 16.0033 11.3625H15.9908C15.4252 11.3563 15.0252 10.9594 15.0158 10.3938C15.0096 9.95 15.0096 9.5 15.0127 9.06563C15.0127 8.875 15.0127 8.68438 15.0127 8.49375V8.38125C14.9971 8.39375 14.9846 8.40625 14.9721 8.41875C13.7346 9.65937 12.5002 10.9031 11.2627 12.1469L10.7471 12.6625C10.4408 12.975 10.1502 13.125 9.86582 13.125C9.58144 13.125 9.30019 12.9781 9.00019 12.675L6.36269 10.0312L6.14081 10.25C5.90956 10.4781 5.69394 10.6937 5.48144 10.9062L4.48769 11.9062C3.91581 12.4812 3.32519 13.0781 2.74081 13.6625C2.52519 13.8844 2.26581 14 1.99081 14Z"
            fill="#7171B4"
          />
        </svg>
      ),
    },
    {
      id: "autoplay",
      label: "Auto play",
      IconComponent: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M3.05713 1.05945C3.2857 0.945178 3.51429 1.00232 3.68572 1.17372L4.77141 2.25929C6.02856 1.40228 7.45714 1.00233 9 1.00233C13.4 1.00233 17 4.6018 17 9.00116C17 13.4005 13.4 17 9 17C4.6 17 1.00001 13.4005 1 9.00116V8.31554C1.05714 7.68706 1.62858 7.22999 2.25715 7.28713C2.88572 7.34427 3.34286 7.91562 3.28571 8.54409V9.00116C3.28572 12.1436 5.85715 14.7146 9 14.7146C12.1429 14.7146 14.7143 12.1436 14.7143 9.00116C14.7143 5.85876 12.1429 3.28771 9 3.28771C8.08571 3.28771 7.22857 3.51623 6.42857 3.91617L7.11429 4.6018C7.28571 4.7732 7.34286 5.00173 7.22859 5.23026C7.17144 5.4588 6.94286 5.57309 6.71429 5.57309H3.28571C2.94286 5.57309 2.71429 5.34455 2.71429 5.00175V1.57367C2.71429 1.34514 2.82857 1.11659 3.05713 1.05945Z"
            fill="#7171B4"
          />
          <path
            d="M7.34284 6.14444C7.6857 5.97303 8.14284 5.97303 8.4857 6.20156L11.4 8.02987C11.6857 8.25841 11.9143 8.60122 11.9143 9.00116C11.9143 9.4011 11.7429 9.74392 11.4 9.97246L8.4857 11.8007C8.25713 11.915 8.08571 11.9722 7.85714 11.9722C7.68571 11.9722 7.45713 11.915 7.34284 11.7436C6.99999 11.5722 6.77141 11.1723 6.77141 10.7723V7.11573C6.77141 6.71579 6.99999 6.37297 7.34284 6.14444Z"
            fill="#7171B4"
          />
        </svg>
      ),
    },
  ];

  // --- Scroll Handlers ---
  const handleCategoryScroll = () => {
    const container = categoriesRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft <
          container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  const handleFilterScroll = () => {
    const container = filtersRef.current;
    if (container) {
      setShowFilterLeftArrow(container.scrollLeft > 0);
      setShowFilterRightArrow(
        container.scrollLeft <
          container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  const scrollCategories = (direction) => {
    const container = categoriesRef.current;
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollFilters = (direction) => {
    const container = filtersRef.current;
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const categoriesContainer = categoriesRef.current;
    const filtersContainer = filtersRef.current;

    if (categoriesContainer) {
      categoriesContainer.addEventListener("scroll", handleCategoryScroll);
      handleCategoryScroll();
    }
    if (filtersContainer) {
      filtersContainer.addEventListener("scroll", handleFilterScroll);
      handleFilterScroll();
    }

    return () => {
      if (categoriesContainer) {
        categoriesContainer.removeEventListener("scroll", handleCategoryScroll);
      }
      if (filtersContainer) {
        filtersContainer.removeEventListener("scroll", handleFilterScroll);
      }
    };
  }, []);

  return (
    <section className="relative w-full z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-2 space-y-5">
        {/* --- Categories Row --- */}
        <div className="relative flex items-center w-full">
          {/* Left Arrow */}
          <AnimatePresence>
            {showLeftArrow && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => scrollCategories("left")}
                className="absolute left-0 z-20 flex-shrink-0 hover:bg-white/20"
                style={{
                  background: "#35326B",
                  borderRadius: "8px",
                }}
              >
                <div className="p-1.5 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-all">
                  <ChevronLeft className="w-5 h-5 text-white" />
                </div>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Categories */}
          <div className="relative w-full">
            <div
              className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none z-10"
              style={{
                background:
                  "linear-gradient(to left, rgba(13, 14, 54, 1) 40%, rgba(0, 0, 0, 0))",
              }}
            ></div>
            <div
              ref={categoriesRef}
              className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide scroll-smooth w-full pr-8"
            >
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  data-category-id={cat.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    setSelectedCategory(cat.id);
                    navigate(`/casino/${cat.id === "all" ? "" : cat.id}`);
                    // Scroll the clicked category into view
                    e.currentTarget.scrollIntoView({
                      behavior: "smooth",
                      block: "nearest",
                      inline: "center",
                    });
                  }}
                  className={`trust_btn group relative flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 transition-all flex-shrink-0 ${
                    selectedCategory === cat.id ? "cat-active" : "cat-normal"
                  }`}
                >
                  {/* SVG ICON from JSON */}
                  <span className="flex items-center justify-center w-5 h-5 transition-all duration-200">
                    <DynamicIcon
                      id={cat.id}
                      active={selectedCategory === cat.id}
                    />
                  </span>

                  {/* Label */}
                  <span
                    className={`${
                      selectedCategory === cat.id
                        ? "text-[#E1E1E1]"
                        : "text-[#992D2]"
                    }`}
                  >
                    {cat.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <AnimatePresence>
            {showRightArrow && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => scrollCategories("right")}
                className="absolute right-0 z-20 flex-shrink-0"
              >
                <div className="p-1.5 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-all">
                  <ChevronRight className="w-5 h-5 text-white" />
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* --- Filters Row --- */}
        <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-3 w-full">
          {/* Search + Static Filters */}
          <div className="md:flex flex-wrap sm:flex-nowrap items-center gap-3 flex-shrink-0 w-full hidden sm:w-auto">
            {/* Search Bar */}
            <div className="crypto_btn relative w-full sm:w-64 lg:w-72">
              <input
                type="text"
                placeholder="Search for a casino game"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 text-sm text-[#7171B4] placeholder-[#7171B4] focus:border-[#F07730]/50 focus:bg-white/10 focus:outline-none transition-all rounded-[60px] bg-[#0D0E36]"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Studios */}
            <div ref={studioRef} className="relative">
              <button
                onClick={() => setStudioOpen((p) => !p)}
                className="crypto_btn flex items-center justify-center gap-2 px-4 py-2.5 transition-all rounded-[60px] bg-[#0D0E36]"
              >
                <span className="text-sm cryptp-para">Studios</span>
                <ChevronRight
                  className={`w-4 h-4 text-[#7171B4] transition-transform ${
                    studioOpen ? "rotate-[-90deg]" : "rotate-90"
                  }`}
                />
              </button>

              <AnimatePresence>
                {studioOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute top-[110%] left-0 z-50 min-w-[220px] rounded-xl border border-white/10 bg-[#0D0E36] backdrop-blur-xl shadow-xl p-2"
                  >
                    {availableStudios.map((studio) => (
                      <button
                        key={studio.id}
                        onClick={() => {
                          setSelectedStudio(studio.id);
                          setStudioOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all text-white
      ${
        selectedStudio === studio.id
          ? "bg-[linear-gradient(180deg,#ffb8a1_0%,#a62a00_100%)] text-white"
          : "text-[#CFCFFF] hover:bg-[linear-gradient(0deg,#35326B_0%,rgba(53,50,107,0)_100%)]"
      }`}
                      >
                        {studio.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Filters Button */}
            <button className="crypto_btn flex items-center justify-center gap-2 px-4 py-2.5 transition-all w-full sm:w-auto rounded-[60px] bg-[#0D0E36] sm:flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M13 3.25C13 2.80499 13.132 2.36998 13.3792 1.99997C13.6264 1.62996 13.9778 1.34157 14.389 1.17127C14.8001 1.00097 15.2525 0.956417 15.689 1.04323C16.1254 1.13005 16.5263 1.34434 16.841 1.65901C17.1557 1.97368 17.37 2.37459 17.4568 2.81105C17.5436 3.24751 17.499 3.6999 17.3287 4.11104C17.1584 4.52217 16.87 4.87357 16.5 5.12081C16.13 5.36804 15.695 5.5 15.25 5.5C14.6533 5.5 14.081 5.26295 13.659 4.84099C13.2371 4.41903 13 3.84674 13 3.25ZM1.75 4H10.75C10.9489 4 11.1397 3.92098 11.2803 3.78033C11.421 3.63968 11.5 3.44891 11.5 3.25C11.5 3.05109 11.421 2.86032 11.2803 2.71967C11.1397 2.57902 10.9489 2.5 10.75 2.5H1.75C1.55109 2.5 1.36032 2.57902 1.21967 2.71967C1.07902 2.86032 1 3.05109 1 3.25C1 3.44891 1.07902 3.63968 1.21967 3.78033C1.36032 3.92098 1.55109 4 1.75 4ZM6.25 6.25C5.78579 6.25131 5.33335 6.39616 4.9547 6.6647C4.57605 6.93325 4.28973 7.31234 4.135 7.75H1.75C1.55109 7.75 1.36032 7.82902 1.21967 7.96967C1.07902 8.11032 1 8.30109 1 8.5C1 8.69891 1.07902 8.88968 1.21967 9.03033C1.36032 9.17098 1.55109 9.25 1.75 9.25H4.135C4.27259 9.63916 4.51458 9.98297 4.83448 10.2438C5.15439 10.5046 5.53988 10.6725 5.94877 10.7289C6.35766 10.7853 6.77419 10.7281 7.15278 10.5637C7.53137 10.3992 7.85742 10.1338 8.09526 9.79645C8.33309 9.45909 8.47355 9.06281 8.50125 8.65098C8.52894 8.23914 8.44282 7.82762 8.2523 7.46146C8.06178 7.09529 7.7742 6.78859 7.42105 6.57492C7.06789 6.36125 6.66276 6.24884 6.25 6.25ZM16.75 7.75H10.75C10.5511 7.75 10.3603 7.82902 10.2197 7.96967C10.079 8.11032 10 8.30109 10 8.5C10 8.69891 10.079 8.88968 10.2197 9.03033C10.3603 9.17098 10.5511 9.25 10.75 9.25H16.75C16.9489 9.25 17.1397 9.17098 17.2803 9.03033C17.421 8.88968 17.5 8.69891 17.5 8.5C17.5 8.30109 17.421 8.11032 17.2803 7.96967C17.1397 7.82902 16.9489 7.75 16.75 7.75ZM7.75 13H1.75C1.55109 13 1.36032 13.079 1.21967 13.2197C1.07902 13.3603 1 13.5511 1 13.75C1 13.9489 1.07902 14.1397 1.21967 14.2803C1.36032 14.421 1.55109 14.5 1.75 14.5H7.75C7.94891 14.5 8.13968 14.421 8.28033 14.2803C8.42098 14.1397 8.5 13.9489 8.5 13.75C8.5 13.5511 8.42098 13.3603 8.28033 13.2197C8.13968 13.079 7.94891 13 7.75 13ZM16.75 13H14.365C14.1881 12.4996 13.8399 12.0778 13.3821 11.8093C12.9243 11.5407 12.3863 11.4427 11.8632 11.5324C11.3401 11.6222 10.8655 11.894 10.5234 12.2998C10.1813 12.7056 9.99368 13.2192 9.99368 13.75C9.99368 14.2808 10.1813 14.7944 10.5234 15.2002C10.8655 15.606 11.3401 15.8778 11.8632 15.9676C12.3863 16.0574 12.9243 15.9593 13.3821 15.6907C13.8399 15.4222 14.1881 15.0004 14.365 14.5H16.75C16.9489 14.5 17.1397 14.421 17.2803 14.2803C17.421 14.1397 17.5 13.9489 17.5 13.75C17.5 13.5511 17.421 13.3603 17.2803 13.2197C17.1397 13.079 16.9489 13 16.75 13Z"
                  fill="#7171B4"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Search/Filters */}
          <div className="flex flex-wrap items-center justify-between sm:hidden w-full">
            <div className="flex gap-3 crypto_btn">
              <input
                type="text"
                placeholder="Search for a casino game"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 text-sm text-[#7171B4] placeholder-[#7171B4] focus:border-[#F07730]/50 focus:bg-white/10 focus:outline-none transition-all rounded-[60px] bg-[#0D0E36]"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button className="crypto_btn flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0D0E36] text-sm text-[#7171B4] rounded-[60px]">
              Studios
            </button>
            <button className="crypto_btn flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0D0E36] text-sm text-[#7171B4] rounded-[60px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M13 3.25C13 2.80499 13.132 2.36998 13.3792 1.99997C13.6264 1.62996 13.9778 1.34157 14.389 1.17127C14.8001 1.00097 15.2525 0.956417 15.689 1.04323C16.1254 1.13005 16.5263 1.34434 16.841 1.65901C17.1557 1.97368 17.37 2.37459 17.4568 2.81105C17.5436 3.24751 17.499 3.6999 17.3287 4.11104C17.1584 4.52217 16.87 4.87357 16.5 5.12081C16.13 5.36804 15.695 5.5 15.25 5.5C14.6533 5.5 14.081 5.26295 13.659 4.84099C13.2371 4.41903 13 3.84674 13 3.25ZM1.75 4H10.75C10.9489 4 11.1397 3.92098 11.2803 3.78033C11.421 3.63968 11.5 3.44891 11.5 3.25C11.5 3.05109 11.421 2.86032 11.2803 2.71967C11.1397 2.57902 10.9489 2.5 10.75 2.5H1.75C1.55109 2.5 1.36032 2.57902 1.21967 2.71967C1.07902 2.86032 1 3.05109 1 3.25C1 3.44891 1.07902 3.63968 1.21967 3.78033C1.36032 3.92098 1.55109 4 1.75 4ZM6.25 6.25C5.78579 6.25131 5.33335 6.39616 4.9547 6.6647C4.57605 6.93325 4.28973 7.31234 4.135 7.75H1.75C1.55109 7.75 1.36032 7.82902 1.21967 7.96967C1.07902 8.11032 1 8.30109 1 8.5C1 8.69891 1.07902 8.88968 1.21967 9.03033C1.36032 9.17098 1.55109 9.25 1.75 9.25H4.135C4.27259 9.63916 4.51458 9.98297 4.83448 10.2438C5.15439 10.5046 5.53988 10.6725 5.94877 10.7289C6.35766 10.7853 6.77419 10.7281 7.15278 10.5637C7.53137 10.3992 7.85742 10.1338 8.09526 9.79645C8.33309 9.45909 8.47355 9.06281 8.50125 8.65098C8.52894 8.23914 8.44282 7.82762 8.2523 7.46146C8.06178 7.09529 7.7742 6.78859 7.42105 6.57492C7.06789 6.36125 6.66276 6.24884 6.25 6.25ZM16.75 7.75H10.75C10.5511 7.75 10.3603 7.82902 10.2197 7.96967C10.079 8.11032 10 8.30109 10 8.5C10 8.69891 10.079 8.88968 10.2197 9.03033C10.3603 9.17098 10.5511 9.25 10.75 9.25H16.75C16.9489 9.25 17.1397 9.17098 17.2803 9.03033C17.421 8.88968 17.5 8.69891 17.5 8.5C17.5 8.30109 17.421 8.11032 17.2803 7.96967C17.1397 7.82902 16.9489 7.75 16.75 7.75ZM7.75 13H1.75C1.55109 13 1.36032 13.079 1.21967 13.2197C1.07902 13.3603 1 13.5511 1 13.75C1 13.9489 1.07902 14.1397 1.21967 14.2803C1.36032 14.421 1.55109 14.5 1.75 14.5H7.75C7.94891 14.5 8.13968 14.421 8.28033 14.2803C8.42098 14.1397 8.5 13.9489 8.5 13.75C8.5 13.5511 8.42098 13.3603 8.28033 13.2197C8.13968 13.079 7.94891 13 7.75 13ZM16.75 13H14.365C14.1881 12.4996 13.8399 12.0778 13.3821 11.8093C12.9243 11.5407 12.3863 11.4427 11.8632 11.5324C11.3401 11.6222 10.8655 11.894 10.5234 12.2998C10.1813 12.7056 9.99368 13.2192 9.99368 13.75C9.99368 14.2808 10.1813 14.7944 10.5234 15.2002C10.8655 15.606 11.3401 15.8778 11.8632 15.9676C12.3863 16.0574 12.9243 15.9593 13.3821 15.6907C13.8399 15.4222 14.1881 15.0004 14.365 14.5H16.75C16.9489 14.5 17.1397 14.421 17.2803 14.2803C17.421 14.1397 17.5 13.9489 17.5 13.75C17.5 13.5511 17.421 13.3603 17.2803 13.2197C17.1397 13.079 16.9489 13 16.75 13Z"
                  fill="#7171B4"
                />
              </svg>
            </button>
          </div>

          {/* Scrollable Filter Pills */}
          <div className="flex items-center gap-2 flex-1 overflow-hidden w-full mt-2 sm:mt-0">
            <AnimatePresence>
              {showFilterLeftArrow && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => scrollFilters("left")}
                  className="p-2 transition-all flex-shrink-0 rounded-[60px] bg-[#0D0E36]"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Filter Buttons */}
            <div
              ref={filtersRef}
              className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth flex-1"
            >
              {filters.map((filter) => {
                const IconComponent = filter.IconComponent;
                return (
                  <motion.button
                    key={filter.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`crypto_btn flex items-center gap-2 px-4 py-2.5 transition-all flex-shrink-0 ${
                      selectedFilter === filter.id
                        ? "cat-active2"
                        : "filter-normal"
                    }`}
                  >
                    <span
                      className={` ${
                        selectedFilter === filter.id
                          ? "text-[#F07730]"
                          : "cryptp-para"
                      }`}
                    >
                      {filter.label}
                    </span>
                    <IconComponent className="w-4 h-4" />
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {showFilterRightArrow && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => scrollFilters("right")}
                  className="p-2 transition-all flex-shrink-0 rounded-[8px] border border-[rgba(255,255,255,0.40)] bg-[rgba(255,255,255,0.10)] hover:bg-[rgba(255,255,255,0.15)]"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default CasinoCategoryNav;
