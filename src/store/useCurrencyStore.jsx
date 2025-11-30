import { create } from "zustand";

export const useCurrencyStore = create((set) => ({
  preferredCurrency: localStorage.getItem("preferredCurrency") || "BTC",
  gameCurrency: localStorage.getItem("gameCurrency") || "USD",
  currencies: [],
  selectedCurrency: null,
  displayBalance: "0.00",

  setPreferredCurrency: (currency) => {
    localStorage.setItem("preferredCurrency", currency);
    set({ preferredCurrency: currency });
  },

  setGameCurrency: (currency) => {
    localStorage.setItem("gameCurrency", currency);
    set({ gameCurrency: currency });
  },

  setCurrencies: (list) => set({ currencies: Array.isArray(list) ? list : [] }),

  setSelectedCurrency: (obj) =>
    set((state) => {
      if (!obj) return state;

      // DO NOT overwrite gameCurrency
      // DO NOT overwrite preferredCurrency for gameplay

      localStorage.setItem("preferredCurrency", obj.symbol);

      return {
        selectedCurrency: obj,
        preferredCurrency: obj.symbol,
      };
    }),

  setDisplayBalance: (value) => set({ displayBalance: value }),
}));
