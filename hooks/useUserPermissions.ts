import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getPermissionsByRoleId } from "@/server-requests/user.server-request";

export enum USE_USER_KEY {
  GET_PERMISSIONS_BY_ROLEID = "GET_PERMISSIONS_BY_ROLEID",
}

export default function useUserPermissions() {
  const roleId = useSelector((state: RootState) => state.user.roleId);

  const {
    data: permissions,
    isLoading,
    error,
  } = useQuery({
    queryKey: [USE_USER_KEY.GET_PERMISSIONS_BY_ROLEID, roleId],
    queryFn: () => getPermissionsByRoleId(roleId as number),
    enabled: !!roleId,
  });

  return {
    permissions,
    isLoading,
    error,
  };
}
