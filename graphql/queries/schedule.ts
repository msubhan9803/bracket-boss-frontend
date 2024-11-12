import { graphql } from "../generated";

export const GET_SCHEDULE_OF_TOURNAMENT_INPUT = graphql(`
  query GetSchedulePreperationDataOfTournament($input: GetSchedulePreperationDataOfTournamentInput!) {
    getSchedulePreperationDataOfTournament(input: $input) {
      matches {
        name
        teams {
          name
          players {
            name
          }
        }
      }
    }
  }
`);
