import { useQuery } from "@tanstack/react-query";
import { Team } from "@/graphql/generated/graphql";
import { getAllTeamsByTournamentId } from "@/server-requests/team.server-request";

export enum USE_TEAMS_KEY {
  GET_ALL_TEAMS_BY_TOURNAMENTID = "GET_ALL_TEAMS_BY_TOURNAMENTID",
}

export default function useTeamsByTournamentId(tournamentId: number, enabled: boolean = true) {
  const {
    data,
    isLoading,
    refetch: refetchTeamList,
  } = useQuery({
    queryKey: [USE_TEAMS_KEY.GET_ALL_TEAMS_BY_TOURNAMENTID, tournamentId],
    queryFn: () => getAllTeamsByTournamentId(tournamentId),
    enabled
  });

  return {
    teamsByTournament: (data as Team[]) || [],
    loadingTeamsByTournament: isLoading,
    refetchTeamList,
  };
}
