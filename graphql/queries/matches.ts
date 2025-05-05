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

export const GET_MATCH_BY_MATCH_ID = graphql(`
  query GetMatchByMatchId($matchId: Float!) {
    getMatchByMatchId(matchId: $matchId) {
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
        id
        name
        users {
          id
          name
        }
      }
      awayTeam {
        id
        name
        users {
          id
          name
        }
      }
      matchRounds {
        id
        matchRoundNumber
        status
      }
      pool {
        name
      }
      matchRounds {
        matchRoundNumber
        status
        matchRoundScore {
          id
          homeTeamScore
          awayTeamScore
        }
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
        name
        users {
          id
          name
        }
      }
      awayTeam {
        id
        name
        users {
          id
          name
        }
      }
      created_at
      matchRounds {
        matchRoundNumber
        status
        matchRoundScore {
          id
          homeTeamScore
          awayTeamScore
        }
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
