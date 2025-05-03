import { graphql } from "../generated";

export const START_MATCH = graphql(`
  mutation StartMatch($matchId: Float!) {
    startMatch(matchId: $matchId) {
      id
      title
      status
    }
  }
`);
