import { useQuery } from "@tanstack/react-query";
import { Match } from "@/graphql/generated/graphql";
import { getAllMatchesWithFilters } from "@/server-requests/match.server-request";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export enum USE_ALL_MATCHES_WITH_FILTERS {
  GET_ALL_MATCHES_WITH_FILTERS = "GET_ALL_MATCHES_WITH_FILTERS",
}

export default function useAllMatchesWithFilters(enabled = true) {
  const filters = useSelector((state: RootState) => state.matchFilter.filter);

  const {
    data,
    isLoading,
    refetch: refetchMatches,
  } = useQuery({
    queryKey: [USE_ALL_MATCHES_WITH_FILTERS.GET_ALL_MATCHES_WITH_FILTERS, filters],
    queryFn: () => getAllMatchesWithFilters(filters),
    enabled
  });

  return {
    matches: data || [] as Match[],
    loadingMatches: isLoading,
    refetchMatches,
  };
}
