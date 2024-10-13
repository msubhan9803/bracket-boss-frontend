import { graphql } from "../generated";

export const CREATE_TEAM = graphql(`
  mutation CreateTeam($input: CreateTeamInputDto!) {
    createTeam(input: $input) {
      createdDate
      id
      name
      updatedDate
      teamsTournamentsUsers {
        id
        club {
          id
        }
        team {
          id
        }
      }
      tournament {
        id
      }
      club {
        id
      }
    }
  }
`);
