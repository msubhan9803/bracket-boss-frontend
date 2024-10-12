import { useQuery } from "@tanstack/react-query";
import { getAllTournaments } from "@/server-requests/tournament.server-request";
import { Dispatch, SetStateAction } from "react";
import { Tournament } from "@/graphql/generated/graphql";

export enum USE_TOURNAMENT_KEY {
  GET_ALL_TOURNAMENTS = "GET_ALL_TOURNAMENTS",
}

export default function useTournaments(
  page: number,
  pageSize: number,
  filterBy: string,
  filter: string,
  sort: {
    field: string;
    direction: string;
  },
) {
  const {
    data,
    isLoading,
    refetch: refetchTournamentList,
  } = useQuery({
    queryKey: [
      USE_TOURNAMENT_KEY.GET_ALL_TOURNAMENTS,
      page,
      pageSize,
      filterBy,
      filter,
      sort,
    ],
    queryFn: () =>
      getAllTournaments({ page, pageSize, filterBy, filter, sort }),
  });

  return {
    tournamentListFetched: data?.tournaments as Tournament[] || [],
    totalRecords: data?.totalRecords || 0,
    loadingOrder: isLoading,
    refetchTournamentList,
  };
}
