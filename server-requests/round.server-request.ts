import { Round } from "@/graphql/generated/graphql";
import { GET_ROUNDS_BY_POOL_ID } from "@/graphql/queries/rounds";
import { graphqlRequestHandlerServer } from "@/lib/graphql-server";

export const getRoundsByPoolId = async (poolId: number) => {
  const data = await graphqlRequestHandlerServer({
    query: GET_ROUNDS_BY_POOL_ID,
    options: { isServer: true },
    variables: {
      poolId,
    },
  });

  return data?.getRoundsByPoolId as Round[];
};