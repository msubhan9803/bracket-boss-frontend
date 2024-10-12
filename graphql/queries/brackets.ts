import { graphql } from "../generated";

export const GET_ALL_BRACKETS= graphql(`
  query GetAllBrackets {
    getAllBrackets {
      id
      name
    }
  }
`);
