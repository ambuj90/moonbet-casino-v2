import { create } from "zustand";

export const useCurrencyStore = create((set) => ({
  selectedCurrency: null,
  currencies: [],

  setSelectedCurrency: (currency) =>
    set({ selectedCurrency: currency }),

  setCurrencies: (list) =>
    set({ currencies: list }),
}));
