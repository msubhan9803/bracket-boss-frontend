import { graphql } from "../generated";

export const GET_ALL_FORMATS= graphql(`
  query GetAllFormats {
    getAllFormats {
      id
      name
    }
  }
`);
