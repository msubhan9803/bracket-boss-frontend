import { graphqlRequestHandlerServer } from "@/lib/graphql-server";
import { GET_ALL_CLUBS } from "@/graphql/queries/clubs";

export const getAllClubsQuery = async () => {
  const data = await graphqlRequestHandlerServer({
    query: GET_ALL_CLUBS,
    options: { isServer: true },
  });

  return data.getAllClubs;
};
