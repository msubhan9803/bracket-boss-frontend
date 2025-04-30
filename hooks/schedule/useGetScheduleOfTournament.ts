import { getScheduleOfTournament } from "@/server-requests/schedule.server-request";
import { useQuery } from "@tanstack/react-query";
import { Match } from "@/graphql/generated/graphql";

export enum USE_SCHEDULE_OF_TOURNAMENT {
  GET_SCHEDULE_OF_TOURNAMENT_QUERY = "GET_SCHEDULE_OF_TOURNAMENT_QUERY",
  GET_SCHEDULE_OF_TOURNAMENT = "GET_SCHEDULE_OF_TOURNAMENT",
}

export interface CreatedMatchType extends Match {
  courtName: string;
  schedule: Date;
  startTime: string;
  endTime: string;
}

export default function useGetScheduleOfTournament(tournamentId?: number) {
  const {
    data,
    refetch,
    isLoading
  } = useQuery({
    queryKey: [
      USE_SCHEDULE_OF_TOURNAMENT.GET_SCHEDULE_OF_TOURNAMENT_QUERY,
      tournamentId,
    ],
    queryFn: () => getScheduleOfTournament(tournamentId as number),
    enabled: !!tournamentId,
  });

  return {
    schedule: data,
    scheduleLoading: isLoading,
    scheduleRefetch: refetch
  };
}
