// src/hooks/useLoadWalletCoins.js
import { useEffect } from "react";
import axios from "axios";
import { useCurrencyStore } from "../store/useCurrencyStore";

const iconMap = {
  BTC: "bitcoin.svg",
  BCH: "bitcoin-cash.svg",
  ETH: "eth.svg",
  SOL: "sol.svg",
  BNBMAINNET: "bnb.svg",
  ADA: "ada.svg",
  DOGECOIN: "doge-coin.svg",
  USDTTRC20: "tether.svg",
  DOT: "dot.svg",
  BNB: "bnb.svg",
  MATICMAINNET: "polygon.svg",
  AVAX: "avax.svg",
  XLM: "xlm.svg",
  XRP: "ripple.svg",
  LTC: "litecoin.svg",
  TRX: "tron.svg",
};

export const useLoadWalletCoins = (userId, hasToken) => {
  const { setCurrencies, setSelectedCurrency, setDisplayBalance } =
    useCurrencyStore();

  useEffect(() => {
    if (!hasToken || !userId) return;

    const load = async () => {
      try {
        const [coinsRes, balanceRes] = await Promise.all([
          axios.get("/wallet-service/api/wallet/coins"),
          axios.get(`/wallet-service/api/wallet/${userId}/balance`),
        ]);

        const coins = coinsRes.data || [];
        const walletBalances = balanceRes.data?.balances || [];

        const merged = coins.map((coin) => {
  const balanceEntry = walletBalances.find(
    (b) => b.currency.toUpperCase() === coin.symbol.toUpperCase()
  );

  return {
    ...coin,
    balance: balanceEntry ? balanceEntry.amount : 0,
    iconPath: `/wallet-icons/${iconMap[coin.symbol] || "bitcoin.svg"}`, // fallback
  };
});

        setCurrencies(merged);

        // Preferred selection
        const savedPref = localStorage.getItem("preferredCurrency");
        const finalCurrency =
          merged.find((c) => c.symbol === savedPref) ||
          merged.find((c) => c.symbol === "BTC") ||
          merged[0];

        if (finalCurrency) setSelectedCurrency(finalCurrency);

        // Restore converted OR normal
        const savedConverted = localStorage.getItem("convertedValue");
        const gameCurrency = localStorage.getItem("gameCurrency");

        if (savedConverted && gameCurrency) {
          setDisplayBalance(`${savedConverted} ${gameCurrency}`);
        } else {
          setDisplayBalance(`${finalCurrency.balance} ${finalCurrency.symbol}`);
        }

        window.dispatchEvent(new Event("currencyLoaded"));
      } catch (err) {
        console.error("❌ Failed loading wallet:", err);
      }
    };

    load();
  }, [hasToken, userId]);
};
