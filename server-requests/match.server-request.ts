import { FilterMatchesInputDto, Match } from "@/graphql/generated/graphql";
import { GET_ALL_MATCHES_WITH_FILTERS, GET_MATCH_BY_MATCH_ID, GET_MATCHES_BY_ROUND_ID } from "@/graphql/queries/matches";
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

export const getMatchByMatchId = async (matchId: number) => {
  const data = await graphqlRequestHandlerServer({
    query: GET_MATCH_BY_MATCH_ID,
    options: { isServer: true },
    variables: {
      matchId,
    },
  });

  return data?.getMatchByMatchId as Match;
};

export const getAllMatchesWithFilters = async (values: FilterMatchesInputDto) => {
  const data = await graphqlRequestHandlerServer({
    query: GET_ALL_MATCHES_WITH_FILTERS,
    options: { isServer: true },
    variables: { input: values },
  });

  return data.getAllMatchesWithFilters as Match[];
};

