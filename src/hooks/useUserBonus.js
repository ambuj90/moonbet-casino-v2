import { useEffect, useState } from "react";
import api from "../api/axios";
import axios from "axios";

export const useUserBonus = (userId, hasToken) => {
  const [bonus, setBonus] = useState(null);

  useEffect(() => {
    if (!userId || !hasToken) return;

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
