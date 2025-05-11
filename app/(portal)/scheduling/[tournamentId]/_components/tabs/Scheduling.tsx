"use client";
import { useMemo } from "react";
import EmptySchedule from "@/components/scheduling/schedule-management/EmptySchedule";
import MatchManagement from "@/components/scheduling/schedule-management/MatchManagement";
import LoadingSpinner from "@/components/core/LoadingSpinner";
import useSingleTournament from "@/hooks/tournament/useSingleTournament";

type Props = {
  tournamentId: string;
};

export default function Scheduling({ tournamentId }: Props) {
  const { tournament, loadingTournament, refetchTournament } = useSingleTournament(tournamentId);
  const scheduleExists = useMemo(
    () =>
      (tournament?.levels?.length > 0 &&
        tournament.levels[0].pools?.length > 0 &&
        tournament.levels[0].pools[0].rounds?.length > 0) ??
      [],
    [tournament]
  );

  if (!scheduleExists) {
    return <EmptySchedule tournamentId={tournamentId} refetchTournament={refetchTournament} />;
  }

  if (loadingTournament) {
    return <LoadingSpinner className="my-36" />;
  }

  return (
    <div>
      <MatchManagement tournamentId={tournamentId} />
    </div>
  );
}
