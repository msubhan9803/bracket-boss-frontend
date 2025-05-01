import { useQuery } from "@tanstack/react-query";
import { Level } from "@/graphql/generated/graphql";
import { getLevelsByTournament } from "@/server-requests/level.server-request";

export enum USE_LEVELS_BY_TOURNAMENT {
  GET_LEVELS_BY_TOURNAMENT = "GET_LEVELS_BY_TOURNAMENT",
}

export default function useLevelsByTournament({ tournamentId, enabled = true }: { tournamentId: string; enabled?: boolean; }) {
  const {
    data,
    isLoading,
    refetch: refetchLevels,
  } = useQuery({
    queryKey: [USE_LEVELS_BY_TOURNAMENT.GET_LEVELS_BY_TOURNAMENT, tournamentId],
    queryFn: () => getLevelsByTournament(parseInt(tournamentId)),
    enabled
  });

  return {
    levels: data || [] as Level[],
    loadingLevels: isLoading,
    refetchLevels,
  };
}
