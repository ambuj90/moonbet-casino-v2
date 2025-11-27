import axios from "axios";
import { useCurrencyStore } from "../store/useCurrencyStore";

export async function convertBalance(preferredCurrency, gameCurrency) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id;

  try {
    const res = await axios.put(`/wallet-service/api/games/convert/${userId}`, {
      preferredCurrency,   // ✅ FIXED
      gameCurrency         // ✅ OK
    });

    if (!res.data.success) return;

    const converted = res.data.data.convertedAmount;

    useCurrencyStore.getState().setDisplayBalance(`${converted} ${gameCurrency}`);

    localStorage.setItem("convertedValue", converted);
    localStorage.setItem("preferredCurrency", preferredCurrency);
    localStorage.setItem("gameCurrency", gameCurrency);

    window.dispatchEvent(new Event("currencyChanged"));

    return converted;
  } catch (err) {
    console.log("❌ convertBalance error:", err);
    return null;
  }
}
