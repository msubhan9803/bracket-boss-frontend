import { Pool } from "@/graphql/generated/graphql";
import { GET_POOLS_BY_LEVEL } from "@/graphql/queries/pools";
import { graphqlRequestHandlerServer } from "@/lib/graphql-server";

export const getPoolsByLevel = async (levelId: number) => {
  const data = await graphqlRequestHandlerServer({
    query: GET_POOLS_BY_LEVEL,
    options: { isServer: true },
    variables: {
      levelId,
    },
  });

  return data?.getPoolsByLevel as Pool[];
};