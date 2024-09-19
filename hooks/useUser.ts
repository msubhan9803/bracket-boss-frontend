import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { GET_USER_BY_ID } from "@/graphql/queries/users";
import { graphqlRequestHandler } from "@/lib/graphql-client";
import { getCookie } from "cookies-next";

export enum USE_USER_KEY {
  GET_USER_BY_ID = "GET_USER_BY_ID",
}

export default function useUser() {
  const user = getCookie('user') as any;
  const userId = user?.id ? parseInt(user.id, 10) : null;

  const {
    data: userDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: [USE_USER_KEY.GET_USER_BY_ID, userId],
    queryFn: () =>
      graphqlRequestHandler({
        query: GET_USER_BY_ID,
        variables: { userId: userId as number },
        options: { isServer: false },
      }),
    enabled: !!userId,
  });

  const userRole = useMemo(() => {
    if (userDetails?.getUserById.roles) {
      const role = userDetails.getUserById.roles[0].id;
      return parseInt(role);
    }
    return null;
  }, [userDetails]);

  return {
    userId,
    userDetails,
    isLoading,
    error,
    userRole,
  };
}
