import { graphqlRequestHandlerServer } from "@/lib/graphql-server";
import { GET_ALL_FORMATS } from "@/graphql/queries/formats";

export const getAllFormats = async () => {
  const data = await graphqlRequestHandlerServer({
    query: GET_ALL_FORMATS,
    options: { isServer: typeof window === "undefined" },
  });

  return data?.getAllFormats;
};
