import { useQuery } from "@tanstack/react-query";
import { Court, Team } from "@/graphql/generated/graphql";
import { getAllTeams } from "@/server-requests/team.server-request";

export enum USE_TEAMS_KEY {
  GET_ALL_TEAMS = "GET_ALL_TEAMS",
}

export default function useTeams(
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
    refetch: refetchTeamList,
  } = useQuery({
    queryKey: [
      USE_TEAMS_KEY.GET_ALL_TEAMS,
      page,
      pageSize,
      filterBy,
      filter,
      sort,
    ],
    queryFn: () =>
      getAllTeams({ page, pageSize, filterBy, filter, sort }),
  });

  return {
    teamListFetched: data?.teams as Team[] || [],
    totalRecords: data?.totalRecords || 0,
    loadingOrder: isLoading,
    refetchTeamList,
  };
}
