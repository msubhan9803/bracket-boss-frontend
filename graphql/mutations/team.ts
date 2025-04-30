import { graphql } from "../generated";

export const CREATE_TEAM = graphql(`
  mutation CreateTeam($input: CreateTeamInputDto!) {
    createTeam(input: $input) {
      createdDate
      id
      name
      updatedDate
      tournament {
        id
      }
    }
  }
`);

export const CREATE_TOURNAMENT_TEAM = graphql(`
  mutation CreateTournamentTeam($input: CreateTournamentTeamsInputDto!) {
    createTournamentTeam(input: $input) {
      id
      name
      statusInTournament
      createdDate
      updatedDate
      users {
        name
      }
    }
  }
`);
