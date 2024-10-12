import { graphql } from "../generated";

export const GET_ALL_TOURNAMENTS = graphql(`
  query GetAllTournaments(
    $filter: String
    $filterBy: String
    $page: Int
    $pageSize: Int
    $sort: SortInput
  ) {
    getAllTournaments(
      filter: $filter
      filterBy: $filterBy
      page: $page
      pageSize: $pageSize
      sort: $sort
    ) {
      totalRecords
      tournaments {
        id
        name
        description
        start_date
        end_date
        isPrivate
        created_at
        updated_at
        bracket {
          name
        }
        club {
          name
        }
        sport {
          name
        }
      }
    }
  }
`);
