import { useQuery } from "@tanstack/react-query";
import { Round } from "@/graphql/generated/graphql";
import { getRoundsByPoolId } from "@/server-requests/round.server-request";

export enum USE_ROUNDS_BY_POOL {
  GET_ROUNDS_BY_POOL_ID = "GET_ROUNDS_BY_POOL_ID",
}

export default function useRoundsByPool({ poolId, enabled = true }: { poolId: string; enabled?: boolean; }) {
  const {
    data,
    isLoading,
    refetch: refetchRounds,
  } = useQuery({
    queryKey: [USE_ROUNDS_BY_POOL.GET_ROUNDS_BY_POOL_ID, poolId],
    queryFn: () => getRoundsByPoolId(parseInt(poolId)),
    enabled
  });

  return {
    rounds: data || [] as Round[],
    loadingRounds: isLoading,
    refetchRounds,
  };
}
