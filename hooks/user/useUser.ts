import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "@/services/cookie-handler.service";
import { getUserById } from "@/server-requests/user.server-request";

export enum USE_USER_KEY {
  GET_USER_BY_ID = "GET_USER_BY_ID",
}

export default function useUser() {
  const session = getSession();
  const userId = session?.id ? parseInt(session.id) : null;

  const {
    data: userDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: [USE_USER_KEY.GET_USER_BY_ID, userId],
    queryFn: () => getUserById(userId as number),
    enabled: !!userId,
  });

  return {
    session: getSession(),
    userDetails,
    isLoading,
    error,
  };
}
