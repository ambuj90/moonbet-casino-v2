import { useEffect, useState } from "react";
import api from "../api/axios";
import axios from "axios";

export const useUserBonus = (userId, hasToken) => {
    const DEFAULT_BONUS = {
  wagered: 0,
  pool: 0,
  estimatedBonus: 0,
};
  const [bonus, setBonus] = useState(DEFAULT_BONUS);

  useEffect(() => {
    if (!userId || !hasToken) {
    setBonus(DEFAULT_BONUS);
    return;
  }

    axios
      .get(`/wallet-service/api/wallet/${userId}/bonus`)
      .then((res) => {
        if (res.data?.success) {
          setBonus(res.data.data);
        }
      })
      .catch((err) => {
        console.error("❌ Bonus fetch failed", err);
      });
  }, [userId, hasToken]);

  return bonus;
};
