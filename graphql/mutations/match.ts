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

export const END_MATCH_ROUND = graphql(`
  mutation EndMatchRound($matchId: Float!, $roundId: Float!) {
    endMatchRound(matchId: $matchId, roundId: $roundId) {
      id
      matchRoundNumber
      status
      created_at
      updated_at
    }
  }
`);
