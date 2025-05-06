import { useQuery } from "@tanstack/react-query";
import { Level, LevelTeamStanding } from "@/graphql/generated/graphql";
import { getLevelTeamStandingsByLevelId } from "@/server-requests/level.server-request";

export enum USE_LEVEL_TEAM_STANDINGS_BY_LEVELID {
  GET_LEVEL_TEAM_STANDINGS_BY_LEVELID = "GET_LEVEL_TEAM_STANDINGS_BY_LEVELID",
}

export default function useLevelTeamStandingsByLevelId({ levelId, enabled = true }: { levelId: string; enabled?: boolean; }) {
  const {
    data,
    isLoading,
    refetch: refetchLevelTeamStandings,
  } = useQuery({
    queryKey: [USE_LEVEL_TEAM_STANDINGS_BY_LEVELID.GET_LEVEL_TEAM_STANDINGS_BY_LEVELID, levelId],
    queryFn: () => getLevelTeamStandingsByLevelId(parseInt(levelId)),
    enabled
  });

  return {
    levelTeamStandings: data || [] as LevelTeamStanding[],
    loadingLevelTeamStandings: isLoading,
    refetchLevelTeamStandings,
  };
}
