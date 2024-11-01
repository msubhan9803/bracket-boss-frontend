import { graphqlRequestHandlerServer } from "@/lib/graphql-server";
import { GET_ALL_FORMATS } from "@/graphql/queries/formats";

export const getAllFormats = async () => {
  const data = await graphqlRequestHandlerServer({
    query: GET_ALL_FORMATS,
    options: { isServer: window === undefined },
  });

  return data?.getAllFormats;
};
