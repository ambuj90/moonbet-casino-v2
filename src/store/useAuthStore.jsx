import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  useEffect(() => {
    const syncToken = () => {
      const newToken = localStorage.getItem("token");
      setToken(newToken);
      setIsLoggedIn(!!newToken);
    };

    window.addEventListener("storage", syncToken);
    window.addEventListener("tokenChanged", syncToken);

    return () => {
      window.removeEventListener("storage", syncToken);
      window.removeEventListener("tokenChanged", syncToken);
    };
  }, []);

  // ✅ Full logout including Google revoke
  const logout = () => {
    try {
      // ---- (1) Remove app storage ----
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // ---- (2) Revoke Google One-Tap / OAuth session ----
      if (window.google && window.google.accounts) {
        try {
          window.google.accounts.id.disableAutoSelect();
        } catch (e) {
          console.warn("Google disableAutoSelect failed:", e);
        }
      }

      // ---- (3) Revoke Google Credential if present ----
      const googleToken = localStorage.getItem("google_credential");
      if (googleToken && window.google?.accounts?.id) {
        window.google.accounts.id.revoke(googleToken, (done) => {
          console.log("Google session revoked:", done);
        });
        localStorage.removeItem("google_credential");
      }

      // ---- (4) Clear cookies (best effort) ----
      document.cookie =
        "g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "G_AUTHUSER_H=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "G_ENABLED_IDPS=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // ---- (5) Update global app state ----
      setToken(null);
      setIsLoggedIn(false);

      // ---- (6) Broadcast logout event ----
      window.dispatchEvent(new Event("tokenChanged"));

      console.log("🧹 Full logout complete (Google + App).");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ token, setToken, isLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthStore = () => useContext(AuthContext);
