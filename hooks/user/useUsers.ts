import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/server-requests/user.server-request";
import { User } from "@/graphql/generated/graphql";

export enum USE_USERS {
  GET_ALL_USERS = "GET_ALL_USERS",
}

export default function useUsers(
  userRole: number,
  page: number,
  pageSize: number,
  filterBy: string,
  filter: string,
  sort: {
    field: string;
    direction: string;
  }
) {
  const {
    data,
    isLoading,
    error,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: [USE_USERS.GET_ALL_USERS],
    queryFn: () =>
      getAllUsers({ userRole, page, pageSize, filterBy, filter, sort }),
  });

  return {
    usersList: (data?.users as Partial<User>[]) || [],
    totalRecords: data?.totalRecords || 0,
    isLoading,
    error,
    refetchUsers,
  };
}
