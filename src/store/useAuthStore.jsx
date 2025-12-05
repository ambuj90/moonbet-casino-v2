import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const PRIVATE_ROUTES = [
  "/settings",
  "/transactions",
  "/bets",
  "/bet-history",
  "/affiliate"
];

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: localStorage.getItem("token") || null,
      isLoggedIn: !!localStorage.getItem("token"),

      setToken: (token) => {
        if (token) {
          localStorage.setItem("token", token);
        }
        set({ token, isLoggedIn: !!token });
        window.dispatchEvent(new Event("tokenChanged"));
      },

      logout: () => {
        const currentPath = window.location.pathname;

        // ---- 1) Remove auth data ----
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // ---- 2) Revoke Google session ----
        const googleToken = localStorage.getItem("google_credential");
        if (googleToken && window.google?.accounts?.id) {
          try {
            window.google.accounts.id.disableAutoSelect();
            window.google.accounts.id.revoke(googleToken);
          } catch (e) {
            console.warn("Google revoke failed:", e);
          }
        }
        localStorage.removeItem("google_credential");

        // ---- 3) Zustand state update ----
        set({ token: null, isLoggedIn: false });

        window.dispatchEvent(new Event("tokenChanged"));

        // ---- 4) Logic: Public route refresh | Private route redirect ----
        const isPrivate = PRIVATE_ROUTES.some((route) =>
          currentPath.startsWith(route)
        );

        if (isPrivate) {
          // Private route → go home
          window.location.replace("/");
        } else {
          // Public route → refresh page
          window.location.reload();
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
