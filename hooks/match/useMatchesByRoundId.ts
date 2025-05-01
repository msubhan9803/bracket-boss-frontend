import { useQuery } from "@tanstack/react-query";
import { Match } from "@/graphql/generated/graphql";
import { getMatchesByRoundId } from "@/server-requests/match.server-request";

export enum USE_MATCHES_BY_ROUND_ID {
  GET_MATCHES_BY_ROUND_ID = "GET_MATCHES_BY_ROUND_ID",
}

export default function useMatchesByRoundId({ roundId, enabled = true }: { roundId: string; enabled?: boolean; }) {
  const {
    data,
    isLoading,
    refetch: refetchMatches,
  } = useQuery({
    queryKey: [USE_MATCHES_BY_ROUND_ID.GET_MATCHES_BY_ROUND_ID, roundId],
    queryFn: () => getMatchesByRoundId(parseInt(roundId)),
    enabled
  });

  return {
    matches: data || [] as Match[],
    loadingMatches: isLoading,
    refetchMatches,
  };
}
