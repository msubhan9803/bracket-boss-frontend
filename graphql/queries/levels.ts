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

export const GET_LEVEL_TEAM_STANDINGS_BY_LEVELID = graphql(`
  query GetLevelTeamStandingsByLevelId($levelId: Float!) {
    getLevelTeamStandingsByLevelId(levelId: $levelId) {
      created_at
      id
      losses
      pointDiffByNumberOfGames
      pointsAgainst
      pointsAgainstByNumberOfGames
      pointsScored
      pointsScoredByNumberOfGames
      updated_at
      wins
      team {
        name
        users {
          name
        }
      }
    }
  }
`);
