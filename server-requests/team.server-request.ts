import { graphqlRequestHandlerServer } from "@/lib/graphql-server";
import {
  GET_ALL_TEAMS,
  GET_ALL_TEAMS_BY_TOURNAMENTID,
} from "@/graphql/queries/teams";
import { Team } from "@/graphql/generated/graphql";

type GetAllTeamsParams = {
  page: number;
  pageSize: number;
  filterBy?: string;
  filter?: string;
  sort?: {
    field: string;
    direction: string;
  };
};

export const getAllTeams = async ({
  page,
  pageSize,
  filterBy,
  filter,
  sort,
}: GetAllTeamsParams) => {
  const data = await graphqlRequestHandlerServer({
    query: GET_ALL_TEAMS,
    options: { isServer: typeof window === "undefined" },
    variables: {
      page,
      pageSize,
      filterBy,
      filter,
      sort,
    },
  });

  return data?.getAllTeams;
};

export const getAllTeamsByTournamentId = async (tournamentId: number) => {
  const data = await graphqlRequestHandlerServer({
    query: GET_ALL_TEAMS_BY_TOURNAMENTID,
    options: { isServer: typeof window === "undefined" },
    variables: {
      tournamentId,
    },
  });

  return data?.getAllTeamsByTournamentId.teams as Team[];
};
