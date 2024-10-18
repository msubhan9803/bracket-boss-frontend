import { useQuery } from "@tanstack/react-query";
import { getScheduleOfTournament } from "@/server-requests/schedule.server-request";

export enum USE_SCHEDULE_OF_TOURNAMENT {
  GET_SCHEDULE_OF_TOURNAMENT = "GET_SCHEDULE_OF_TOURNAMENT",
}

export default function useGetScheduleOfTournament(
  tournamentId: string,
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
    queryFn: () => getScheduleOfTournament(parseInt(tournamentId), userIds),
  });

  return {
    schedule: data,
    loadingOrder: isLoading,
    refetchSchedules,
  };
}
