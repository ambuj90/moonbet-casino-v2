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
    console.log("🔥 useLoadWalletCoins mounted:", { userId, hasToken });
    if (!hasToken || !userId) return;

    const load = async () => {
      try {
        console.log("📌 Calling wallet APIs...");

        const [coinsRes, balanceRes] = await Promise.all([
          axios.get("/wallet-service/api/wallet/coins"),
          axios.get(`/wallet-service/api/wallet/${userId}/balance`),
        ]);

        const coins = coinsRes.data || [];
        const walletBalances = balanceRes.data?.balances || [];

        const merged = coins.map((coin) => {
          const symbol = coin.symbol.toUpperCase();

          const balanceEntry = walletBalances.find(
            (b) => b.currency.toUpperCase() === symbol
          );

          const balance = balanceEntry ? balanceEntry.amount : 0;

          return {
            ...coin,
            balance,
            convertedValue: balance, // show raw balance (not USD)
            iconPath: `/wallet-icons/${iconMap[symbol] || "bitcoin.svg"}`,
          };
        });

        setCurrencies(merged);

        // Load preferred or default currency
        const savedSymbol = localStorage.getItem("preferredCurrency");

        const finalCurrency =
          merged.find((c) => c.symbol === savedSymbol) ||
          merged.find((c) => c.symbol === "BTC") ||
          merged[0];

        if (finalCurrency) {
          setSelectedCurrency(finalCurrency);

          let gameCurrency = localStorage.getItem("gameCurrency");
          if (!gameCurrency) return;   // Wait until backend loads it

          // Show raw balance (converted later in header)
          setDisplayBalance(
            `${finalCurrency.balance} ${finalCurrency.symbol}`
          );
        }

        window.dispatchEvent(new Event("currencyLoaded"));
      } catch (err) {
        console.error("❌ Failed loading wallet:", err);
      }
    };

    load();
  }, [hasToken, userId]);
};
