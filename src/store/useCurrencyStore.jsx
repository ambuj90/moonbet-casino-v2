import { create } from "zustand";

export const useCurrencyStore = create((set) => ({
  preferredCurrency: localStorage.getItem("preferredCurrency") || "BTC",
  gameCurrency: localStorage.getItem("gameCurrency") || "USD",

  currencies: [],
  selectedCurrency: null,

  displayBalance: "0.00",   // ⭐ required

  setPreferredCurrency: (currency) => {
    localStorage.setItem("preferredCurrency", currency);
    set({ preferredCurrency: currency });
  },

  setGameCurrency: (currency) => {
    localStorage.setItem("gameCurrency", currency);
    set({ gameCurrency: currency });
  },

  setCurrencies: (list) =>
    set({ currencies: Array.isArray(list) ? list : [] }),

  setSelectedCurrency: (obj) =>
  set((state) => {
    const symbol = obj?.symbol;

    if (symbol) {
      localStorage.setItem("preferredCurrency", symbol);
    }

    return {
      selectedCurrency: obj,
      // 🔥 also update store.preferredCurrency
      preferredCurrency: symbol || state.preferredCurrency,
    };
  }),

  setDisplayBalance: (value) => set({ displayBalance: value }), // ⭐ correct
}));
