import { useQuery } from "@tanstack/react-query";
import { Pool } from "@/graphql/generated/graphql";
import { getPoolsByLevel } from "@/server-requests/pool.server-request";

export enum USE_POOLS_BY_LEVEL {
  GET_POOLS_BY_LEVEL = "GET_POOLS_BY_LEVEL",
}

export default function usePoolsByLevel(levelId: string) {
  const {
    data,
    isLoading,
    refetch: refetchPools,
  } = useQuery({
    queryKey: [USE_POOLS_BY_LEVEL.GET_POOLS_BY_LEVEL, levelId],
    queryFn: () => getPoolsByLevel(parseInt(levelId)),
    enabled: !!levelId
  });

  return {
    pools: data || [] as Pool[],
    loadingPools: isLoading,
    refetchPools,
  };
}
