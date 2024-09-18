import { GET_USER_BY_ID } from "@/graphql/queries/users";
import { graphqlRequestHandler } from "./graphql-server";

export const getUserById = async (userId: number) => {
  const data = await graphqlRequestHandler(GET_USER_BY_ID, { userId });
  return data.getUserById;
};
