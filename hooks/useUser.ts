import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { GET_USER_BY_ID } from "@/graphql/queries/users";
import { graphqlRequestHandler } from "@/lib/graphql-client";
import { getUser } from "@/services/cookie-handler.service";

export enum USE_USER_KEY {
  GET_USER_BY_ID = "GET_USER_BY_ID",
}

export default function useUser() {
  const user = getUser();
  const userId = user?.id ? parseInt(user.id) : null;

  const {
    data: fetchedUserDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: [USE_USER_KEY.GET_USER_BY_ID, userId],
    queryFn: () =>
      graphqlRequestHandler({
        query: GET_USER_BY_ID,
        variables: { userId: userId as number },
      }),
    enabled: !!userId,
  });

  const userRole = useMemo(() => {
    if (fetchedUserDetails?.getUserById.roles) {
      const role = fetchedUserDetails.getUserById.roles[0].id;
      return parseInt(role);
    }
    return null;
  }, [fetchedUserDetails]);

  return {
    session: getUser(),
    userId,
    fetchedUserDetails,
    isLoading,
    error,
    userRole,
  };
}
