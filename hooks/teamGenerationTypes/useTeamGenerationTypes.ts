import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllTeamGenerationTypesByFormatId } from "@/server-requests/team-generation-type.server-request";

export enum USE_BRACKET_KEY {
  GET_ALL_TEAM_GENERATION_TYPES = "GET_ALL_TEAM_GENERATION_TYPES",
}

export default function useTeamGenerationTypeByFormat({
  formatId,
}: {
  formatId?: number;
}) {
  const {
    data: teamGenerationTypes,
    isLoading,
    error,
    refetch: refetchTeamGenerationTypes,
  } = useQuery({
    queryKey: [USE_BRACKET_KEY.GET_ALL_TEAM_GENERATION_TYPES, formatId],
    queryFn: () => getAllTeamGenerationTypesByFormatId(parseInt(formatId as any)),
    enabled: !!formatId,
  });

  return {
    teamGenerationTypes,
    isLoading,
    error,
    refetchTeamGenerationTypes
  };
}
