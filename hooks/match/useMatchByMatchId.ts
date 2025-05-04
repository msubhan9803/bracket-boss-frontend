import { useQuery } from "@tanstack/react-query";
import { getMatchByMatchId } from "@/server-requests/match.server-request";

export enum USE_MATCH_BY_MATCH_ID {
  GET_MATCH_BY_MATCH_ID = "GET_MATCH_BY_MATCH_ID",
}

export default function useMatchByMatchId({
  matchId,
  enabled = true,
}: {
  matchId: number;
  enabled?: boolean;
}) {
  const {
    data,
    isLoading,
    refetch: refetchMatch,
  } = useQuery({
    queryKey: [USE_MATCH_BY_MATCH_ID.GET_MATCH_BY_MATCH_ID, matchId],
    queryFn: () => getMatchByMatchId(matchId),
    enabled,
  });

  return {
    match: data,
    loadingMatch: isLoading,
    refetchMatch,
  };
}
