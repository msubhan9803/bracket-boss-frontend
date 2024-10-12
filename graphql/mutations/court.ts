import { graphql } from "../generated";

export const CREATE_COURT = graphql(`
  mutation CreateCourt($input: CreateCourtInputDto!) {
    createCourt(input: $input) {
      id
      location
      name
      club {
        id
        name
      }
    }
  }
`);
