"use client";
import { useMemo } from "react";
import EmptySchedule from "@/components/scheduling/schedule-management/EmptySchedule";
import MatchManagement from "@/components/scheduling/schedule-management/MatchManagement";
import useLevelsByTournament from "@/hooks/level/useLevelsByTournament";
import LoadingSpinner from "@/components/core/LoadingSpinner";

type Props = {
  tournamentId: string;
};

export default function Scheduling({ tournamentId }: Props) {
  const { levels, loadingLevels, refetchLevels } = useLevelsByTournament({
    tournamentId,
    enabled: !!tournamentId,
  });
  const scheduleExists = useMemo(() => levels.length > 0, [levels]);

  if (!scheduleExists) {
    return (
      <EmptySchedule
        tournamentId={tournamentId}
        refetchLevels={refetchLevels}
      />
    );
  }

  if (loadingLevels) {
    return <LoadingSpinner className="my-36" />;
  }

  return (
    <div>
      <MatchManagement tournamentId={tournamentId} />
    </div>
  );
}
