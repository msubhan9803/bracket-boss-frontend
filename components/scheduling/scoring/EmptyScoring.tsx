import React from "react";
import { Button } from "@/components/ui/button";
import useTournamentOperations from "@/hooks/tournament/useTournamentOperations";

type Props = {
  tournamentId: string;
};

export default function EmptyScoring({ tournamentId }: Props) {
  const { startTournamentMutation } = useTournamentOperations();

  const handleStartTournament = async () => {
    await startTournamentMutation.mutateAsync(parseInt(tournamentId as string));
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