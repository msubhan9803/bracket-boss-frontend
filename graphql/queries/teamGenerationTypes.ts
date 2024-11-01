import { graphql } from "../generated";

export const Get_All_Team_Generation_Types_By_Format_Id = graphql(`
  query GetAllTeamGenerationTypesByFormatId($formatId: Float!) {
    getAllTeamGenerationTypesByFormatId(formatId: $formatId) {
      id
      name
    }
  }
`);
