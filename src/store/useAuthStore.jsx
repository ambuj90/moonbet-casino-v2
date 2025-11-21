import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  useEffect(() => {
    // Sync state when localStorage changes (from other components)
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

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("tokenChanged"));
  };

  return (
    <AuthContext.Provider value={{ token, setToken, isLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthStore = () => useContext(AuthContext);
