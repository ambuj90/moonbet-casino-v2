import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./theme/moonbet-theme.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { WalletSocketProvider } from "./context/WalletSocketContext.jsx";
import { LoaderProvider } from "./context/LoaderContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <WalletSocketProvider>
        <LoaderProvider>
          <Router>
            <App />
          </Router>
        </LoaderProvider>
      </WalletSocketProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
