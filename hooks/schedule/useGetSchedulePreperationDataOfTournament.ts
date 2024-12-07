import { useQuery } from "@tanstack/react-query";
import { getSchedulePreperationDataOfTournament } from "@/server-requests/schedule.server-request";
import { useMemo } from "react";

export enum USE_SCHEDULE_OF_TOURNAMENT {
  GET_SCHEDULE_PREPERATION_DATA_OF_TOURNAMENT = "GET_SCHEDULE_PREPERATION_DATA_OF_TOURNAMENT",
}

export default function useGetSchedulePreperationDataOfTournament(
  tournamentId: number,
  userIds: number[],
) {
  const {
    data,
    isLoading,
    refetch: refetchSchedules,
  } = useQuery({
    queryKey: [
      USE_SCHEDULE_OF_TOURNAMENT.GET_SCHEDULE_PREPERATION_DATA_OF_TOURNAMENT,
      tournamentId,
    ],
    queryFn: () => getSchedulePreperationDataOfTournament(tournamentId, userIds),
    enabled:
      userIds.length > 0 &&
      !!tournamentId,
  });

  const matches = useMemo(() => data?.matches ? data?.matches : [], [data]);

  return {
    matches,
    loadingSchedule: isLoading,
    refetchSchedules,
  };
}
