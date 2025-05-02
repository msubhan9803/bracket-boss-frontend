import React from "react";
import EmptyScoring from "@/components/scheduling/scoring/EmptyScoring";
import { Tournament, TournamentStatusTypesEnum } from "@/graphql/generated/graphql";
import MatchScoreManagement from "@/components/scheduling/scoring/MatchScoreManagement";

type Props = {
  tournamentDetails: Tournament;
};

export default function Scoring({ tournamentDetails }: Props) {
  const tournamentId = tournamentDetails.id;
  const tournamentStatus = tournamentDetails.status;

  if (tournamentStatus === TournamentStatusTypesEnum.NotStarted) {
    return <EmptyScoring tournamentId={tournamentId} />;
  }

  return (
    <div>
      <MatchScoreManagement tournamentId={tournamentId} />
    </div>
  );
}
