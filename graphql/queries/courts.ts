import { graphql } from "../generated";

export const GET_ALL_COURTS = graphql(`
  query GetAllCourts(
    $filter: String
    $filterBy: String
    $page: Int
    $pageSize: Int
    $sort: SortInput
  ) {
    getAllCourts(
      filter: $filter
      filterBy: $filterBy
      page: $page
      pageSize: $pageSize
      sort: $sort
    ) {
      courts {
        id
        name
        location
        club {
          name
        }
      }
      totalRecords
    }
  }
`);
