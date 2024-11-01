import { graphqlRequestHandlerServer } from "@/lib/graphql-server";
import { Get_All_Team_Generation_Types_By_Format_Id } from "@/graphql/queries/teamGenerationTypes";

export const getAllTeamGenerationTypesByFormatId = async (formatId: number) => {
  const data = await graphqlRequestHandlerServer({
    query: Get_All_Team_Generation_Types_By_Format_Id,
    options: { isServer: window === undefined },
    variables: { formatId },
  });

  return data?.getAllTeamGenerationTypesByFormatId;
};
