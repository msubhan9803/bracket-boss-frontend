"use client";
import React, { useState, useMemo, useCallback } from "react";
import EmptyScoring from "@/components/scheduling/scoring/EmptyScoring";
import {
  Tournament,
  TournamentStatusTypesEnum,
} from "@/graphql/generated/graphql";
import MatchScoreManagement from "@/components/scheduling/scoring/MatchScoreManagement";
import EmptySchedule from "@/components/scheduling/schedule-management/EmptySchedule";
import useLevelsByTournament from "@/hooks/level/useLevelsByTournament";
import useSingleTournament from "@/hooks/tournament/useSingleTournament";

type Props = {
  tournamentId: string;
};

export default function Scoring({ tournamentId }: Props) {
  const { tournament, refetchTournament } = useSingleTournament(tournamentId);
  const { levels, refetchLevels } = useLevelsByTournament({
    tournamentId,
    enabled: !!tournamentId,
  });
  const scheduleExists = useMemo(() => levels.length > 0, [levels]);

  if (!scheduleExists) {
    return (
      <EmptySchedule
        tournamentId={tournamentId}
        refetchTournament={refetchTournament}
      />
    );
  }

  if (tournament?.status === TournamentStatusTypesEnum.NotStarted) {
    return <EmptyScoring tournamentId={tournamentId} refetchTournament={refetchTournament} />;
  }

  return (
    <div>
      <MatchScoreManagement tournamentId={tournamentId} />
    </div>
  );
}