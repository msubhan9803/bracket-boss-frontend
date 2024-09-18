import { GET_USER_BY_ID } from "@/graphql/queries/users";
import { graphqlRequestHandlerServer } from "../lib/graphql-server";
import { GetUserByIdQuery } from "@/graphql/generated/graphql";

export const getUserById = async (userId: number) => {
  const data = await graphqlRequestHandlerServer(GET_USER_BY_ID, { userId });
  return data.getUserById as GetUserByIdQuery["getUserById"];
};
