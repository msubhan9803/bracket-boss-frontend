import { graphql } from "../generated";

export const GET_ROUNDS_BY_POOL_ID = graphql(`
  query GetRoundsByPoolId($poolId: Float!) {
    getRoundsByPoolId(poolId: $poolId) {
      id
      name
      order
      status
      created_at
      updated_at
    }
  }
`);
