import { graphql } from "../generated";

export const GET_SCHEDULE_OF_TOURNAMENT = graphql(`
  query GetScheduleOfTournament($input: GetScheduleOfTournamentInput!) {
    getScheduleOfTournament(input: $input) {
      id
      name
      order
      pools {
        id
        name
        order
        rounds {
          id
          name
          order
          matches {
            id
            title
            homeTeam {
              name
            }
            awayTeam {
              name
            }
            winnerTeam {
              name
            }
            matchRounds {
              id
              matchRoundNumber
            }
          }
        }
      }
    }
  }
`);
