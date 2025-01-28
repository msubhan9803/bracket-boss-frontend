import { graphql } from "../generated";

export const GET_SCHEDULE_OF_TOURNAMENT_INPUT = graphql(`
  query GetSchedulePreperationDataOfTournament($input: GetSchedulePreperationDataOfTournamentInput!) {
    getSchedulePreperationDataOfTournament(input: $input) {
      matches {
        name
        teams {
          name
          players {
            id
            name
          }
        }
      }
    }
  }
`);

export const GET_SCHEDULE_OF_TOURNAMENT = graphql(`
query GetScheduleOfTournament($input: GetScheduleOfTournamentInput!) {
  getScheduleOfTournament(input: $input) {
    schedule {
      tournament {
        id
        name
        description
      }
      tournamentRounds {
        id
        roundNumber
        roundFormat {
          name
        }
        matches {
          awayTeam {
            name
          }
          homeTeam {
            name
          }
          matchRounds {
            matchRoundNumber
            startTime
            endTime
            matchRoundScores {
              id
              score
            }
          }
        }
      }
      matches {
        awayTeam {
          name
          users {
            id
            name
          }
        }
        homeTeam {
          name
          users {
            id
            name
          }
        }
      }
    }
  }
}
`);
