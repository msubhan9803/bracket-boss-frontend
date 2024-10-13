import { graphqlRequestHandlerServer } from "@/lib/graphql-server";
import {
  GET_ALL_TOURNAMENTS,
  GET_ALL_TOURNAMENTS_WITHOUT_PAGINATION,
} from "@/graphql/queries/tournaments";
import { Tournament } from "@/graphql/generated/graphql";

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

export const getAllTournamentsWithoutPagination = async () => {
  const data = await graphqlRequestHandlerServer({
    query: GET_ALL_TOURNAMENTS_WITHOUT_PAGINATION,
    options: { isServer: true },
  });

  return data.getAllTournamentsWithoutPagination as Tournament[];
};
