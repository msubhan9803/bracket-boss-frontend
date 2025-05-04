import React from "react";
import { Button } from "@/components/ui/button";
import useTournamentOperations from "@/hooks/tournament/useTournamentOperations";
import { Tournament } from "@/graphql/generated/graphql";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";

type Props = {
  tournamentId: string;
  onRefetchTournament: (options?: RefetchOptions) => Promise<QueryObserverResult<Tournament, Error>>;
};

export default function EmptyScoring({ tournamentId, onRefetchTournament }: Props) {
  const { startTournamentMutation } = useTournamentOperations();

  const handleStartTournament = async () => {
    await startTournamentMutation.mutateAsync(parseInt(tournamentId as string));
    onRefetchTournament();
  };

  return (
    <div className="flex-1 w-full flex items-center justify-center my-auto">
      <div className="flex flex-col items-center gap-y-4">
        <h2 className="text-primary text-2xl">Tournament not started yet</h2>

        <Button
          onClick={handleStartTournament}
          loading={startTournamentMutation.isPending}
        >
          Start Tournament
        </Button>
      </div>
    </div>
  );
}