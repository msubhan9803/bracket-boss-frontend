import { graphql } from "../generated";

export const GET_SCHEDULE_OF_TOURNAMENT_INPUT = graphql(`
  query GetScheduleOfTournamentInput($input: GetScheduleOfTournamentInput!) {
    getScheduleOfTournament(input: $input) {
      matches {
        name
        teams {
          name
          players
        }
      }
    }
  }
`);
