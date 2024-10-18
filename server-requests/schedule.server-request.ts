import { graphqlRequestHandlerServer } from "@/lib/graphql-server";
import { GET_SCHEDULE_OF_TOURNAMENT_INPUT } from "@/graphql/queries/schedule";

export const getScheduleOfTournament = async (
  tournamentId: number,
  users: number[]
) => {
  const data = await graphqlRequestHandlerServer({
    query: GET_SCHEDULE_OF_TOURNAMENT_INPUT,
    options: { isServer: true },
    variables: {
      input: {
        tournamentId,
        users,
      },
    },
  });

  return data?.getScheduleOfTournament;
};
