import { graphql } from "../generated";

export const GET_USERS = graphql(`
  query GetUsers {
    getUsers {
      id
      email
      name
    }
  }
`);
