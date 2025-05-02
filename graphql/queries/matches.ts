import { graphql } from "../generated";

export const GET_MATCHES_BY_ROUND_ID = graphql(`
  query GetMatchesByRoundId($roundId: Float!) {
    getMatchesByRoundId(roundId: $roundId) {
      created_at
      id
      status
      title
      updated_at
      matchCourtSchedule {
        matchDate
        courtSchedule {
          court {
            name
          }
          timeSlot {
            startTime
            endTime
          }
          day {
            name
          }
        }
      }
      homeTeam {
        name
      }
      awayTeam {
        name
      }
    }
  }
`);

export const GET_ALL_MATCHES_WITH_FILTERS = graphql(`
  query GetAllMatchesWithFilters($input: FilterMatchesInputDto!) {
    getAllMatchesWithFilters(input: $input) {
      id
      title
      status
      level {
        order
      }
      pool {
        name
        order
      }
      round {
        name
        order
      }
      homeTeam {
        id
        users {
          id
          name
        }
      }
      awayTeam {
        id
        users {
          id
          name
        }
      }
      created_at
      matchRounds {
        matchRoundNumber
      }
      tournament {
        name
      }
      matchCourtSchedule {
        matchDate
        courtSchedule {
          court {
            name
          }
          timeSlot {
            startTime
            endTime
          }
          day {
            name
          }
        }
      }
      updated_at
    }
  }
`);
