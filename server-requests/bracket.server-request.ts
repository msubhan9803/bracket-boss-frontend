import { graphqlRequestHandlerServer } from "@/lib/graphql-server";
import { GET_ALL_BRACKETS } from "@/graphql/queries/brackets";

export const getAllBrackets = async () => {
  const data = await graphqlRequestHandlerServer({
    query: GET_ALL_BRACKETS,
    options: { isServer: window === undefined },
  });

  return data?.getAllBrackets;
};
