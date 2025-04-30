import {
  GET_ALL_USERS,
  GET_ALL_USERS_WITHOUT_PAGINATION,
  GET_PERMISSIONS_BY_ROLEID,
  GET_STEPS_OF_USER,
  GET_USER_BY_ID,
} from "@/graphql/queries/users";
import { GetUserByIdQuery, User } from "@/graphql/generated/graphql";
import { graphqlRequestHandlerServer } from "@/lib/graphql-server";

export const getAllUsersWithoutPagination = async (userRole?: number) => {
  const data = await graphqlRequestHandlerServer({
    query: GET_ALL_USERS_WITHOUT_PAGINATION,
    options: { isServer: true },
    variables: {
      userRole,
    },
  });

  return data?.getAllUsersWithoutPagination as User[];
};

export const getAllUsers = async ({
  userRole,
  page,
  pageSize,
  filterBy,
  filter,
  sort,
}: {
  userRole: number;
  page: number;
  pageSize: number;
  filterBy?: string;
  filter?: string;
  sort?: {
    field: string;
    direction: string;
  };
}) => {
  const data = await graphqlRequestHandlerServer({
    query: GET_ALL_USERS,
    options: { isServer: true },
    variables: {
      userRole,
      page,
      pageSize,
      filterBy,
      filter,
      sort,
    },
  });

  return data?.getAllUsers;
};

export const getUserById = async (userId: number, clubId?: number) => {
  const data = await graphqlRequestHandlerServer({
    query: GET_USER_BY_ID,
    variables: { userId, clubId },
    options: { isServer: true },
  });

  return data?.getUserById as GetUserByIdQuery["getUserById"];
};

export const getStepsOfUser = async () => {
  const data = await graphqlRequestHandlerServer({
    query: GET_STEPS_OF_USER,
    options: { isServer: true },
  });

  return data?.getStepsOfUser;
};

export const getPermissionsByRoleId = async (roleId: number) => {
  const data = await graphqlRequestHandlerServer({
    query: GET_PERMISSIONS_BY_ROLEID,
    variables: { roleId },
    options: { isServer: typeof window === "undefined" },
  });

  return data?.getPermissionsByRoleId;
};
