import { useQuery } from "@tanstack/react-query";
import { Court } from "@/graphql/generated/graphql";
import { getAllCourts } from "@/server-requests/court.server-request";

export enum USE_COURTS_KEY {
  GET_ALL_COURTS = "GET_ALL_COURTS",
}

export default function useCourts(
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
    refetch: refetchCourtList,
  } = useQuery({
    queryKey: [
      USE_COURTS_KEY.GET_ALL_COURTS,
      page,
      pageSize,
      filterBy,
      filter,
      sort,
    ],
    queryFn: () =>
      getAllCourts({ page, pageSize, filterBy, filter, sort }),
  });

  return {
    courtListFetched: data?.courts as Court[] || [],
    totalRecords: data?.totalRecords || 0,
    loadingOrder: isLoading,
    refetchCourtList,
  };
}
