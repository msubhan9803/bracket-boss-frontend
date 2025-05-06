import { Level, LevelTeamStanding } from "@/graphql/generated/graphql";
import { GET_LEVEL_TEAM_STANDINGS_BY_LEVELID, GET_LEVELS_BY_TOURNAMENT } from "@/graphql/queries/levels";
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

export const getLevelTeamStandingsByLevelId = async (levelId: number) => {
  const data = await graphqlRequestHandlerServer({
    query: GET_LEVEL_TEAM_STANDINGS_BY_LEVELID,
    options: { isServer: true },
    variables: {
      levelId,
    },
  });

  return data?.getLevelTeamStandingsByLevelId as LevelTeamStanding[];
};