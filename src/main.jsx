import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./theme/moonbet-theme.css";
import { AuthProvider } from "./store/useAuthStore";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { WalletSocketProvider } from "./context/WalletSocketContext.jsx";
import { LoaderProvider } from "./context/LoaderContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";   // ✅ FIX HERE

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <WalletSocketProvider>
        <AuthProvider>
          <LoaderProvider>
            <Router>
              <App />
            </Router>
          </LoaderProvider>
        </AuthProvider>
      </WalletSocketProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
