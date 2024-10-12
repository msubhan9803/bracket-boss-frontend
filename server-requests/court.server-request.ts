import { graphqlRequestHandlerServer } from "@/lib/graphql-server";
import { GET_ALL_COURTS } from "@/graphql/queries/courts";

type GetAllCourtsParams = {
  page: number;
  pageSize: number;
  filterBy?: string;
  filter?: string;
  sort?: {
    field: string;
    direction: string;
  };
};

export const getAllCourts = async ({
  page,
  pageSize,
  filterBy,
  filter,
  sort,
}: GetAllCourtsParams) => {
  const data = await graphqlRequestHandlerServer({
    query: GET_ALL_COURTS,
    options: { isServer: true },
    variables: {
      page,
      pageSize,
      filterBy,
      filter,
      sort,
    },
  });

  return data?.getAllCourts;
};
