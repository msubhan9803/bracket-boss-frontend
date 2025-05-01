import { Match } from "@/graphql/generated/graphql";
import { GET_MATCHES_BY_ROUND_ID } from "@/graphql/queries/matches";
import { graphqlRequestHandlerServer } from "@/lib/graphql-server";

export const getMatchesByRoundId = async (roundId: number) => {
  const data = await graphqlRequestHandlerServer({
    query: GET_MATCHES_BY_ROUND_ID,
    options: { isServer: true },
    variables: {
      roundId,
    },
  });

  return data?.getMatchesByRoundId as Match[];
};