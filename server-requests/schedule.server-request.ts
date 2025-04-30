import { graphqlRequestHandlerServer } from "@/lib/graphql-server";
import { GET_SCHEDULE_OF_TOURNAMENT } from "@/graphql/queries/schedule";

export const getScheduleOfTournament = async (
  tournamentId: number
) => {
  const data = await graphqlRequestHandlerServer({
    query: GET_SCHEDULE_OF_TOURNAMENT,
    options: { isServer: true },
    variables: {
      input: {
        tournamentId,
      },
    },
  });

  return data?.getScheduleOfTournament;
};
