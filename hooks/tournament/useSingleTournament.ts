import { useQuery } from "@tanstack/react-query";
import { getSingleTournament } from "@/server-requests/tournament.server-request";
import { Tournament } from "@/graphql/generated/graphql";

export enum USE_TOURNAMENT_KEY {
  GET_SINGLE_TOURNAMENT = "GET_SINGLE_TOURNAMENT",
}

export default function useSingleTournament(tournamentId: string, enabled = true) {
  const {
    data,
    isLoading,
    refetch: refetchTournament,
  } = useQuery({
    queryKey: [USE_TOURNAMENT_KEY.GET_SINGLE_TOURNAMENT, tournamentId],
    queryFn: () => getSingleTournament(parseInt(tournamentId)),
    enabled,
  });

  return {
    tournament: data as Tournament,
    loadingOrder: isLoading,
    refetchTournament,
  };
}
