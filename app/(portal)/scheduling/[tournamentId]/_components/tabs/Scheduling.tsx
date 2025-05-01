"use client";
import { useMemo } from "react";
import EmptySchedule from "@/components/scheduling/schedule-management/EmptySchedule";
import MatchManagement from "@/components/scheduling/schedule-management/MatchManagement";
import useLevelsByTournament from "@/hooks/level/useLevelsByTournament";

type Props = {
  tournamentId: string;
};

export default function Scheduling({ tournamentId }: Props) {
  const { levels, refetchLevels } = useLevelsByTournament({
    tournamentId,
    enabled: !!tournamentId,
  });
  const scheduleExists = useMemo((() => levels.length > 0), [levels]);

  return (
    <div>
      {!scheduleExists ? (
        <EmptySchedule tournamentId={tournamentId} refetchLevels={refetchLevels} />
      ) : (
        <MatchManagement tournamentId={tournamentId} />
      )}
    </div>
  );
}
