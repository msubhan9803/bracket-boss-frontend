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
        teamGenerationType {
          name
        }
        sport {
          name
        }
        splitSwitchGroupBy
        created_at
        updated_at
      }
    }
  }
`);

export const GET_ALL_TOURNAMENTS_WITHOUT_PAGINATION = graphql(`
  query GetAllTournamentsWithoutPagination {
    getAllTournamentsWithoutPagination {
      created_at
      description
      end_date
      id
      isPrivate
      name
      start_date
      updated_at
    }
  }
`);

export const GET_TOURNAMENT_BY_ID = graphql(`
  query GetTournamentById($tournamentId: Float!) {
    getTournamentById(tournamentId: $tournamentId) {
      description
      end_date
      id
      isPrivate
      name
      start_date
      teamGenerationType {
        name
      }
      levels {
        name
        pools {
          name
          rounds {
            name
          }
        }
      }
      rounds {
        id
        name
        status
      }
      splitSwitchGroupBy
      status
      created_at
      updated_at
    }
  }
`);
