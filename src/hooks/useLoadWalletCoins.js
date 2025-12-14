import { useEffect } from "react";
import axios from "axios";
import { useCurrencyStore } from "../store/useCurrencyStore";
import { useBalanceStore } from "../store/useBalanceStore";

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
  const { setWalletBalance } = useBalanceStore();
  const { setCurrencies } = useCurrencyStore();

  const loadCoins = async () => {
    if (!userId || !hasToken) return;

    const res = await axios.get(`/wallet-service/api/wallet/${userId}/balance`);

    const dbBalances = res.data?.balances || [];
    const totalUsd = res.data?.totalUsd || 0;

    // 🔥 Create map for quick lookup
    const balanceMap = {};
    dbBalances.forEach((b) => {
      balanceMap[b.currency.toUpperCase()] = b;
    });

    // ⭐ Build full currency list (ALL CURRENCIES)
    const currencies = Object.keys(iconMap).map((key) => {
      const entry = balanceMap[key] || { amount: 0, usdValue: 0 };

      return {
        name: key,
        symbol: key,
        balance: entry.amount,
        usdValue: entry.usdValue,
        convertedValue: entry.usdValue,
        iconPath: `/wallet-icons/${iconMap[key]}`,
      };
    });

    setCurrencies(currencies);
    setWalletBalance(totalUsd);

    // ⭐ Default currency if none selected → BTC
    const saved = localStorage.getItem("preferredCurrency");
    if (!saved) localStorage.setItem("preferredCurrency", "BTC");
  };

  useEffect(() => {
    loadCoins();
  }, [userId, hasToken]);

  return { loadCoins };
};
