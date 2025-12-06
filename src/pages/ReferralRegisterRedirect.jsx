import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ReferralRegisterRedirect() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const ref = params.get("ref");

    if (ref) {
      // store referral code for signup form
      localStorage.setItem("referral_code", ref);
    }

    // redirect to homepage and open register modal
    navigate("/?modal=auth&tab=register", { replace: true });
  }, []);

  return null;
}
