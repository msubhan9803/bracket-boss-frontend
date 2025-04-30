import { Level } from "@/graphql/generated/graphql";
import { GET_LEVELS_BY_TOURNAMENT } from "@/graphql/queries/levels";
import { graphqlRequestHandlerServer } from "@/lib/graphql-server";

export const getLevelsByTournament = async (tournamentId: number) => {
  const data = await graphqlRequestHandlerServer({
    query: GET_LEVELS_BY_TOURNAMENT,
    options: { isServer: true },
    variables: {
      tournamentId,
    },
  });

  return data?.getLevelsByTournament as Level[];
};