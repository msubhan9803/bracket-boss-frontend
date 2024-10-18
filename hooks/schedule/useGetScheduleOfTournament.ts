import { useQuery } from "@tanstack/react-query";
import { getScheduleOfTournament } from "@/server-requests/schedule.server-request";

export enum USE_SCHEDULE_OF_TOURNAMENT {
  GET_SCHEDULE_OF_TOURNAMENT = "GET_SCHEDULE_OF_TOURNAMENT",
}

export default function useGetScheduleOfTournament(
  tournamentId: number,
  userIds: number[]
) {
  const {
    data,
    isLoading,
    refetch: refetchSchedules,
  } = useQuery({
    queryKey: [
      USE_SCHEDULE_OF_TOURNAMENT.GET_SCHEDULE_OF_TOURNAMENT,
      tournamentId,
    ],
    queryFn: () => getScheduleOfTournament(tournamentId, userIds),
  });

  return {
    matches: data?.matches || [],
    loadingSchedule: isLoading,
    refetchSchedules,
  };
}
