import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { GET_USER_BY_ID } from "@/graphql/queries/users";
import { graphqlRequestHandler } from "@/lib/graphql-client";
import { getSession } from "@/services/cookie-handler.service";

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
    queryFn: () =>
      graphqlRequestHandler({
        query: GET_USER_BY_ID,
        variables: { userId: userId as number },
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
    session: getSession(),
    userDetails,
    isLoading,
    error,
    userRole,
  };
}
