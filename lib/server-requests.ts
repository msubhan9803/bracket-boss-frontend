import { GET_USER_BY_ID } from "@/graphql/queries/users";
import { GetUserByIdQuery } from "@/graphql/generated/graphql";
import { graphqlRequestHandler } from "@/lib/graphql-client";

export const getUserById = async (userId: number) => {
  const data = await graphqlRequestHandler({
    query: GET_USER_BY_ID,
    variables: { userId },
    options: { isServer: true },
  });
  return data.getUserById as GetUserByIdQuery["getUserById"];
};
