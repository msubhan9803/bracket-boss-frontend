import { graphql } from "../generated";

export const GET_POOLS_BY_LEVEL = graphql(`
  query GetPoolsByLevel($levelId: Float!) {
    getPoolsByLevel(levelId: $levelId) {
      created_at
      id
      name
      order
      updated_at
    }
  }
`);
