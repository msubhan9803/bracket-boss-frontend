import { graphql } from "../generated";

export const CREATE_CLUB = graphql(`
  mutation CreateClub($input: CreateClubInputDto!) {
    createClub(input: $input) {
      club {
        id
        logo
        name
        description
        createdDate
        updatedDate
        users {
          id
          name
          email
        }
      }
      message
    }
  }
`);
