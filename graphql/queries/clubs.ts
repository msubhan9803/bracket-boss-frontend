import { graphql } from "../generated";

export const GET_ALL_CLUBS = graphql(`
  query GetAllClubs {
    getAllClubs {
      createdDate
      description
      id
      logo
      name
      slug
      updatedDate
    }
  }
`);
