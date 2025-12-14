import { create } from "zustand";

export const useBalanceStore = create((set) => ({
  walletBalance: "0.00",
  setWalletBalance: (value) => set({ walletBalance: value }),
}));
