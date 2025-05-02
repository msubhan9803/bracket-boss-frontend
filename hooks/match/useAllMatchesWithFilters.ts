import { useQuery } from "@tanstack/react-query";
import { FilterMatchesInputDto, Match } from "@/graphql/generated/graphql";
import { getAllMatchesWithFilters } from "@/server-requests/match.server-request";

export enum USE_ALL_MATCHES_WITH_FILTERS {
  GET_ALL_MATCHES_WITH_FILTERS = "GET_ALL_MATCHES_WITH_FILTERS",
}

export default function useAllMatchesWithFilters(props: FilterMatchesInputDto, enabled = true) {
  const {
    data,
    isLoading,
    refetch: refetchMatches,
  } = useQuery({
    queryKey: [USE_ALL_MATCHES_WITH_FILTERS.GET_ALL_MATCHES_WITH_FILTERS, props],
    queryFn: () => getAllMatchesWithFilters(props),
    enabled
  });

  return {
    matches: data || [] as Match[],
    loadingMatches: isLoading,
    refetchMatches,
  };
}
