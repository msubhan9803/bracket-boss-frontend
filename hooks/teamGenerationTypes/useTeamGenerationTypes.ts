import { useQuery } from "@tanstack/react-query";
import { getAllTeamGenerationTypesByFormatId } from "@/server-requests/team-generation-type.server-request";
import { useEffect, useMemo } from "react";

export enum USE_BRACKET_KEY {
  GET_ALL_TEAM_GENERATION_TYPES = "GET_ALL_TEAM_GENERATION_TYPES",
}

export default function useTeamGenerationTypeByFormat({
  poolPlayFormatId,
}: {
  poolPlayFormatId: number;
}) {
  const {
    data: teamGenerationTypes,
    isLoading,
    error,
  } = useQuery({
    queryKey: [USE_BRACKET_KEY.GET_ALL_TEAM_GENERATION_TYPES, poolPlayFormatId],
    queryFn: () =>
      getAllTeamGenerationTypesByFormatId(parseInt(poolPlayFormatId as any)),
    enabled: !!poolPlayFormatId,
  });

  const teamGenerationTypesMemo = useMemo(
    () =>
      teamGenerationTypes?.length && teamGenerationTypes?.length > 0
        ? teamGenerationTypes
        : [],
    [teamGenerationTypes]
  );

  return {
    teamGenerationTypes: teamGenerationTypesMemo,
    isLoading,
    error,
  };
}
