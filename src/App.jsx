// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";

import Layout from "./components/layouts/Layout";
import Homepage from "./pages/Homepage";
import Settings from "./pages/Settings";
import Transactions from "./pages/Transactions";
import Bets from "./pages/Bets";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import GamePage from "./pages/GamePage";
import { ToastContainer } from "react-toastify";
import "./styles/toastify-custom.css";
import AuthTest from "./pages/AuthTest";
import "react-toastify/dist/ReactToastify.css";
import AffiliateProgram from "./pages/AffiliateProgram";
import Leaderboard from "./pages/Leaderboard";
import TidioChatButton from "./components/TidioChatButton";
import Blackjack from "./pages/Blackjack";
import Casino from "./pages/Casino";
import ProvidersPage from "./pages/ProvidersPage";
import AffiliateLandingPage from "./pages/Affiliatelandingpage";
import BettingRules from "./pages/Bettingrules";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsAndConditions from "./pages/Termsandconditions";
import ResponsibleGamblingPage from "./pages/ResponsibleGamblingPage";
import ProvablyFairPage from "./pages/ProvablyFairPage";
import ContactUsPage from "./pages/Contactuspage.jsx";
import ProductShowcase from "./components/Productshowcase.jsx";
import { useLoader } from "./context/LoaderContext";
import GlobalLoader from "./components/GlobalLoader";
import AboutUs from "./pages/AboutUs.jsx";
import RNGTestingPolicy from "./pages/RNGTestingPolicy.jsx";
import CareersPage from "./pages/CareersPage.jsx";
import MoonbetAccessibility from "./pages/MoonbetAccessibility.jsx";
import AccountPayoutsPolicyPage from "./pages/AccountPayoutsPolicyPage.jsx";
import ModernSlavery from "./pages/ModernSlavery.jsx";
import MoonbetComplaintsPolicy from "./pages/MoonbetComplaintsPolicy.jsx";
import KYCPolicyPage from "./pages/KYCPolicyPage.jsx";
import Premium404 from "./pages/Premium404.jsx";
import DisputeResolutionPolicyPage from "./pages/DisputeResolutionPolicyPage.jsx";
import SelfExclusionPolicyPage from "./pages/SelfExclusionPolicyPage.jsx";
import DisclaimerPage from "./pages/DisclaimerPage.jsx";
import CookiePolicy from "./pages/PrivacyPolicyPage";
import AmlPolicy from "./pages/AmlPolicy.jsx";
import EditorialPolicy from "./pages/EditorialPolicy.jsx";

// Temporary pages
const SimplePage = ({ title }) => (
  <div className="min-h-screen p-8 text-white">
    <h1>{title}</h1>
  </div>
);

const HoneypotPage = () => <SimplePage title="Honeypot Game" />;
const CoinflipPage = () => <SimplePage title="Coinflip Game" />;
const PumpDumpPage = () => <SimplePage title="PumpDump Game" />;
const FuturesPage = () => <SimplePage title="Futures Game" />;
const ChatPage = () => <SimplePage title="Chat" />;

//
// 🔐 PRIVATE ROUTE
//
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/?modal=auth&tab=login" replace />;
  }
  return children;
};

//
// 🔓 Auth Modal Wrapper
//
const AuthModalHandler = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [defaultTab, setDefaultTab] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const modalParam = searchParams.get("modal");
    const tabParam = searchParams.get("tab");

    if (modalParam === "auth" && !isLoggedIn) {
      setIsAuthModalOpen(true);
      setDefaultTab(tabParam === "register" ? "register" : "login");
    } else {
      setIsAuthModalOpen(false);
    }
  }, [searchParams, isLoggedIn]);

  const closeModal = () => {
    setIsAuthModalOpen(false);
    searchParams.delete("modal");
    searchParams.delete("tab");
    setSearchParams(searchParams);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    closeModal();
  };

  return (
    <>
      {children}
      {!isLoggedIn && (
        <LoginSignup
          isOpen={isAuthModalOpen}
          onClose={closeModal}
          defaultTab={defaultTab}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
};

//
// 🧭 MAIN APP
//
function App() {
  const location = useLocation();
  const { loading, setLoading } = useLoader();

  /* Global Loader on route change */
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <AuthModalHandler>
      <>
        {loading && <GlobalLoader />}

        <Routes>
          {/* ---------------- PUBLIC ROUTES inside Layout ---------------- */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="game/honeypot" element={<HoneypotPage />} />
            <Route path="game/coinflip" element={<CoinflipPage />} />
            <Route path="game/pumpdump" element={<PumpDumpPage />} />
            <Route path="game/futures" element={<FuturesPage />} />
            <Route path="game/:gameId" element={<GamePage />} />

            <Route path="chat" element={<ChatPage />} />
            <Route path="authtest" element={<AuthTest />} />

            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="blackjack" element={<Blackjack />} />

            <Route path="casino" element={<Casino />} />
            <Route path="casino/:category" element={<Casino />} />

            <Route path="providers" element={<ProvidersPage />} />
            <Route path="providers/:slug" element={<ProvidersPage />} />

            <Route path="product-data" element={<ProductShowcase />} />
          </Route>

          {/* ---------------- PUBLIC ROUTES OUTSIDE LAYOUT ---------------- */}
          <Route path="/" element={<Layout />}>
            <Route path="betting-rules" element={<BettingRules />} />
            <Route path="privacy" element={<PrivacyPolicyPage />} />
            <Route path="contact" element={<ContactUsPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route
              path="/account-payout-policy"
              element={<AccountPayoutsPolicyPage />}
            />
            <Route path="/modern-slavery" element={<ModernSlavery />} />

            <Route
              path="/moonbet-accessibility-statement"
              element={<MoonbetAccessibility />}
            />
            <Route
              path="affiliate-program"
              element={<AffiliateLandingPage />}
            />
            <Route path="about" element={<AboutUs />} />
            <Route
              path="rng"
              element={
                <PrivateRoute>
                  <RNGTestingPolicy />
                </PrivateRoute>
              }
            />
            <Route
              path="/moonbet-complaints-policy"
              element={<MoonbetComplaintsPolicy />}
            />
            <Route path="/kyc-Policy" element={<KYCPolicyPage />} />
            <Route
              path="terms-and-condition"
              element={<TermsAndConditions />}
            />
            <Route
              path="/dispute-resolution-policy"
              element={<DisputeResolutionPolicyPage />}
            />
            <Route
              path="/self-exclusion-policy"
              element={<SelfExclusionPolicyPage />}
            />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />

            <Route
              path="responsible-gambling"
              element={<ResponsibleGamblingPage />}
            />
            <Route path="aml-policy" element={<AmlPolicy />} />
            <Route path="editorial-policy" element={<EditorialPolicy />} />

            <Route path="provably-fair" element={<ProvablyFairPage />} />
          </Route>
          {/* ---------------- PRIVATE ROUTES OUTSIDE LAYOUT ---------------- */}
          <Route path="/" element={<Layout />}>
            <Route
              path="settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
            <Route
              path="transactions"
              element={
                <PrivateRoute>
                  <Transactions />
                </PrivateRoute>
              }
            />
            <Route
              path="bets"
              element={
                <PrivateRoute>
                  <Bets />
                </PrivateRoute>
              }
            />
            <Route
              path="bet-history"
              element={
                <PrivateRoute>
                  <Bets />
                </PrivateRoute>
              }
            />
            <Route
              path="affiliate"
              element={
                <PrivateRoute>
                  <AffiliateProgram />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="*" element={<Premium404 />} />
        </Routes>

        {/* Global UI */}
        <ToastContainer theme="dark" />
        <TidioChatButton />
      </>
    </AuthModalHandler>
  );
}

export default App;
