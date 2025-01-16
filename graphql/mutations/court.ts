import { graphql } from "../generated";

export const UPSERT_COURT = graphql(`
  mutation UpsertCourt($input: UpsertCourtInputDto!) {
    upsertCourt(input: $input) {
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
