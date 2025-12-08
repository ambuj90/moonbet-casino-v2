import { create } from "zustand";

export const useGeoStore = create((set, get) => ({
  userCountry: typeof window !== "undefined"
    ? localStorage.getItem("userCountry") || "UN"
    : "UN",

  // { "PRAGMATICPLAY": ["GB", "US"], "EVOLUTION GAMING": ["US"] }
  restrictedProviders: {},

  setUserCountry: (country) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userCountry", country);
    }
    set({ userCountry: country });
  },

  setRestrictedProviders: (providers) => set({ restrictedProviders: providers }),

  isProviderBlocked: (providerName) => {
    if (!providerName) return false;
    const { userCountry, restrictedProviders } = get();
    const providerKey = providerName.toUpperCase();
    const list = restrictedProviders[providerKey];
    if (!list || !Array.isArray(list)) return false;
    return list.includes(userCountry);
  },
}));
