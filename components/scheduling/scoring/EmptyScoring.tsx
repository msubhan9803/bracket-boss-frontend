import React from "react";
import { Button } from "@/components/ui/button";
import useScheduleCreation from "@/hooks/schedule/useScheduleCreation";

type Props = {
  tournamentId: string;
};

export default function EmptyScoring({ tournamentId }: Props) {
  const { createScheduleMutation } = useScheduleCreation();

  const handleStartTournament = async () => {
    // tournamentId
  };

  return (
    <div className="flex-1 w-full flex items-center justify-center my-auto">
      <div className="flex flex-col items-center gap-y-4">
        <h2 className="text-primary text-2xl">Tournament not started yet</h2>

        <Button
          onClick={handleStartTournament}
          loading={createScheduleMutation.isPending}
        >
          Start Tournament
        </Button>
      </div>
    </div>
  );
}
