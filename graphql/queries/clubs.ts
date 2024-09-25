import { graphql } from "../generated";

export const GET_ALL_CLUBS = graphql(`
  query GetAllClubs {
    getAllClubs {
      id
      name
      logo
    }
  }
`);
