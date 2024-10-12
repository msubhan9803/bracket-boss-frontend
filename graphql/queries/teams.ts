import { graphql } from "../generated";

export const GET_ALL_TEAMS = graphql(`
  query GetAllTeams(
    $filter: String
    $filterBy: String
    $page: Int
    $pageSize: Int
    $sort: SortInput
  ) {
    getAllTeams(
      filter: $filter
      filterBy: $filterBy
      page: $page
      pageSize: $pageSize
      sort: $sort
    ) {
      teams {
        id
        name
        tournament {
          name
        }
      }
      totalRecords
    }
  }
`);
