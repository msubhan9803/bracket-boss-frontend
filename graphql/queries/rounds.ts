import { graphql } from "../generated";

export const GET_ROUNDS_BY_POOL_ID = graphql(`
  query GetRoundsByPoolId($poolId: Float!) {
    getRoundsByPoolId(poolId: $poolId) {
      created_at
      id
      name
      order
      updated_at
    }
  }
`);
