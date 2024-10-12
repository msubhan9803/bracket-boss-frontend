import { graphqlRequestHandlerServer } from "@/lib/graphql-server";
import { GET_ALL_TOURNAMENTS } from "@/graphql/queries/tournaments";

type GetAllTournamentsParams = {
  page: number;
  pageSize: number;
  filterBy?: string;
  filter?: string;
  sort?: {
    field: string;
    direction: string;
  };
};

export const getAllTournaments = async ({
  page,
  pageSize,
  filterBy,
  filter,
  sort,
}: GetAllTournamentsParams) => {
  const data = await graphqlRequestHandlerServer({
    query: GET_ALL_TOURNAMENTS,
    options: { isServer: true },
    variables: {
      page,
      pageSize,
      filterBy,
      filter,
      sort,
    },
  });

  return data?.getAllTournaments;
};
