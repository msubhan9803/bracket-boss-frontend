import { graphql } from "../generated";

export const GET_MATCHES_BY_ROUND_ID = graphql(`
  query GetMatchesByRoundId($roundId: Float!) {
    getMatchesByRoundId(roundId: $roundId) {
      created_at
      id
      status
      title
      updated_at
    }
  }
`);
