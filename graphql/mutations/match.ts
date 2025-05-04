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

export const UPDATE_SCORE = graphql(`
  mutation UpdateScore($input: UpdateMatchScoreInputDto!) {
    updateScore(input: $input) {
      awayTeamScore
      created_at
      homeTeamScore
      id
      updated_at
    }
  }
`);
