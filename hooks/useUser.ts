import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { GET_USER_BY_ID } from "@/graphql/queries/users";
import { useMemo } from "react";
import { graphqlRequestHandlerClient } from "@/lib/graphql-client";

export enum USE_USER_KEY {
  GET_USER_BY_ID = "GET_USER_BY_ID",
}

export default function useUser() {
  const { data: session } = useSession();
  const userId = session?.user?.id ? parseInt(session.user.id, 10) : null;

  const {
    data: userDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: [USE_USER_KEY.GET_USER_BY_ID, userId],
    queryFn: () =>
      graphqlRequestHandlerClient(GET_USER_BY_ID, { userId: userId as number }),
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
