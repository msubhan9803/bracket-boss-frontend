import { GET_PERMISSIONS_BY_ROLEID, GET_STEPS_OF_USER, GET_USER_BY_ID } from "@/graphql/queries/users";
import { GetUserByIdQuery } from "@/graphql/generated/graphql";
import { graphqlRequestHandlerServer } from "@/lib/graphql-server";

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
    options: { isServer: window === undefined },
  });

  return data?.getPermissionsByRoleId;
};