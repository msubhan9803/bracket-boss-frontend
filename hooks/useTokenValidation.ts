import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  clearAllCookies,
  getAuthToken,
} from "@/services/cookie-handler.service";

const isTokenExpired = (expiresIn: number) => {
  return expiresIn < Math.floor(Date.now() / 1000);
};

export default function useTokenValidation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const logout = searchParams.get("logout");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const authToken = getAuthToken();
      if (!authToken || isTokenExpired(authToken.expiresIn) || logout === "1") {
        clearAllCookies();
        router.replace("/login");
        return;
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  }, [logout, router]);

  return { error };
}
