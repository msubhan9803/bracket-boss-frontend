import { graphqlRequestHandlerServer } from "@/lib/graphql-server";
import { GET_SCHEDULE_OF_TOURNAMENT, GET_SCHEDULE_OF_TOURNAMENT_INPUT } from "@/graphql/queries/schedule";

export const getSchedulePreperationDataOfTournament = async (
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

  return data?.getSchedulePreperationDataOfTournament;
};

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
