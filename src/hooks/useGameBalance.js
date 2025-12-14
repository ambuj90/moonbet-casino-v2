import { useState, useEffect } from "react";
import axios from "axios";

export const useGameBalance = (userId, hasToken) => {
  const [loading, setLoading] = useState(true);
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [gameCurrency, setGameCurrency] = useState("USD");
  const [displayBalance, setDisplayBalance] = useState("0.00");

  // 🔥 Load backend preferred currency (gameCurrency)
  useEffect(() => {
    if (!userId || !hasToken) return;

    const loadGameCurrency = async () => {
      try {
        const res = await axios.get(
          `/wallet-service/api/games/${userId}/check-currency`
        );

        const gc = res.data?.data?.gameCurrency || "USD";
        setGameCurrency(gc);
        localStorage.setItem("gameCurrency", gc);
      } catch (err) {
        console.error("Failed to load gameCurrency", err);
      }
    };

    loadGameCurrency();
  }, [userId, hasToken]);

  // 🔥 Load wallet coins + balances
  useEffect(() => {
    if (!userId || !hasToken) return;

    const loadWallet = async () => {
      try {
        const [coinsRes, balanceRes] = await Promise.all([
          axios.get("/wallet-service/api/wallet/coins"),
          axios.get(`/wallet-service/api/wallet/${userId}/balance`),
        ]);

        const coins = coinsRes.data;
        const balances = balanceRes.data?.balances || [];

        const merged = coins.map((coin) => {
          const match = balances.find(
            (b) => b.currency.toUpperCase() === coin.symbol.toUpperCase()
          );
          return {
            ...coin,
            balance: match ? Number(match.amount).toFixed(5) : "0.00000",
            usdValue: match ? Number(match.usdValue).toFixed(2) : "0.00",
          };
        });

        setCurrencies(merged);

        // preferredCurrency from LS or default
        const pref = localStorage.getItem("preferredCurrency");
        let currencyObj =
          merged.find((c) => c.symbol === pref) || merged[0];

        setSelectedCurrency(currencyObj);

        // ⭐ Display balance ONLY of selected coin (USD value)
        setDisplayBalance(`${currencyObj.usdValue} ${gameCurrency}`);
        setLoading(false);

      } catch (err) {
        console.error("Failed to load wallet balance", err);
        setLoading(false);
      }
    };

    loadWallet();
  }, [userId, hasToken, gameCurrency]);

  // 🔥 Currency switch handler
  const changeCurrency = async (currency) => {
    try {
      setSelectedCurrency(currency);
      localStorage.setItem("preferredCurrency", currency.symbol);

      const res = await axios.put(
        `/wallet-service/api/games/convert/${userId}`,
        {
          preferredCurrency: currency.symbol,
          gameCurrency,
        }
      );

      const amount = Number(res.data?.data?.convertedAmount).toFixed(2);

      setDisplayBalance(`${amount} ${gameCurrency}`);
      window.dispatchEvent(new Event("preferredCurrencyUpdated"));
    } catch (err) {
      console.error("Failed to change currency", err);
    }
  };

  return {
    loading,
    currencies,
    selectedCurrency,
    gameCurrency,
    displayBalance,
    changeCurrency,
  };
};
