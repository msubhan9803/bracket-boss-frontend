import { graphqlRequestHandlerServer } from "@/lib/graphql-server";
import { GET_ALL_TEAMS } from "@/graphql/queries/teams";

type GetAllTeamsParams = {
  page: number;
  pageSize: number;
  filterBy?: string;
  filter?: string;
  sort?: {
    field: string;
    direction: string;
  };
};

export const getAllTeams = async ({
  page,
  pageSize,
  filterBy,
  filter,
  sort,
}: GetAllTeamsParams) => {
  const data = await graphqlRequestHandlerServer({
    query: GET_ALL_TEAMS,
    options: { isServer: window === undefined },
    variables: {
      page,
      pageSize,
      filterBy,
      filter,
      sort,
    },
  });

  return data?.getAllTeams;
};
