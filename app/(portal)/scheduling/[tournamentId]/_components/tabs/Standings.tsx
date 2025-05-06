"use client";
import React, { useMemo } from "react";
import LoadingSpinner from "@/components/core/LoadingSpinner";
import EmptyStanding from "@/components/scheduling/standings/EmptyStanding";
import StandingsManagement from "@/components/scheduling/standings/Standings";
import { TournamentStatusTypesEnum } from "@/graphql/generated/graphql";
import useLevelsByTournament from "@/hooks/level/useLevelsByTournament";
import useSingleTournament from "@/hooks/tournament/useSingleTournament";

type Props = {
  tournamentId: string;
};

export default function Standings({ tournamentId }: Props) {
  const { tournament } = useSingleTournament(tournamentId);
  const { levels, loadingLevels } = useLevelsByTournament({
    tournamentId,
    enabled: !!tournamentId,
  });
  const scheduleExists = useMemo(() => levels.length > 0, [levels]);

  if (!scheduleExists) {
    return <EmptyStanding text="No Standing data" />;
  }

  if (loadingLevels) {
    return <LoadingSpinner className="my-36" />;
  }

  if (tournament?.status === TournamentStatusTypesEnum.NotStarted) {
    return <EmptyStanding text="Tournament not started yet" />;
  }

  return <StandingsManagement levels={levels} />;
}
