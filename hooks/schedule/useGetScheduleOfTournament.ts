import { useMutation, useQuery } from "@tanstack/react-query";
import { GetScheduleOfTournamentInput } from "@/graphql/generated/graphql";
import { GET_SCHEDULE_OF_TOURNAMENT } from "@/graphql/queries/schedule";
import { graphqlRequestHandler } from "@/lib/graphql-client";
import { getScheduleOfTournament } from "@/server-requests/schedule.server-request";
import { useMemo } from "react";

export enum USE_SCHEDULE_OF_TOURNAMENT {
  GET_SCHEDULE_OF_TOURNAMENT_QUERY = "GET_SCHEDULE_OF_TOURNAMENT_QUERY",
  GET_SCHEDULE_OF_TOURNAMENT = "GET_SCHEDULE_OF_TOURNAMENT",
}

export type CreatedMatchType = {
  name: string;
  teams: {
    name: string;
    players: {
      name: string;
    }[] | undefined;
  }[];
}

export default function useGetScheduleOfTournament(tournamentId?: number) {
  const {
    data,
    refetch,
    isLoading
  } = useQuery({
    queryKey: [
      USE_SCHEDULE_OF_TOURNAMENT.GET_SCHEDULE_OF_TOURNAMENT_QUERY,
      tournamentId,
    ],
    queryFn: () => getScheduleOfTournament(tournamentId as number),
    enabled: !!tournamentId,
  });

  const getScheduleOfTournamentMutation = useMutation({
    mutationKey: [USE_SCHEDULE_OF_TOURNAMENT.GET_SCHEDULE_OF_TOURNAMENT],
    mutationFn: async (variables: GetScheduleOfTournamentInput) =>
      graphqlRequestHandler({
        query: GET_SCHEDULE_OF_TOURNAMENT,
        variables: { input: variables },
      }),
  });

  const createdMatches = useMemo(() => data?.schedule.matches.map((match) => {
    return {
      name: `${match.awayTeam.name} vs ${match.homeTeam.name}`,
      teams: [
        {
          name: match.awayTeam.name,
          players: match.awayTeam.users?.map((user) => ({ name: user?.name })),
        },
        {
          name: match.homeTeam.name,
          players: match.homeTeam.users?.map((user) => ({ name: user?.name })),
        }
      ]
    };
  }) as CreatedMatchType[], [data]);

  return {
    createdMatches,
    getScheduleOfTournamentMutation,
    useGetScheduleOfTournamentRefetch: refetch,
    isLoading
  };
}
