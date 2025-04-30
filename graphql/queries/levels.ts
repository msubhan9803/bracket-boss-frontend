import { graphql } from "../generated";

export const GET_LEVELS_BY_TOURNAMENT = graphql(`
  query GetLevelsByTournament($tournamentId: Float!) {
    getLevelsByTournament(tournamentId: $tournamentId) {
      created_at
      id
      name
      order
      type
      updated_at
    }
  }
`);
