import React from "react";
import ImportScheduleDataButton from "@/components/mutation-buttons/ImportScheduleDataButton";
import { Button } from "@/components/ui/button";
import useScheduleCreation from "@/hooks/schedule/useScheduleCreation";

type Props = {
  tournamentId: string;
  refetchLevels: any;
};

export default function EmptySchedule({ tournamentId, refetchLevels }: Props) {
  const { createScheduleMutation } = useScheduleCreation();

  const handleScheduleCreation = async () => {
    await createScheduleMutation.mutateAsync({
      tournamentId: parseInt(tournamentId as string),
    });
    refetchLevels();
  };

  return (
    <div className="flex-1 w-full flex items-center justify-center my-auto">
      <div className="flex flex-col items-center gap-y-4">
        <h2 className="text-primary text-2xl">No schedule found</h2>

        <Button
          onClick={handleScheduleCreation}
          loading={createScheduleMutation.isPending}
        >
          Create Schedule
        </Button>

        <div className="flex items-center my-2">
          <div className="border-t border-1 border-gray-600 flex-grow w-8"></div>
          <div className="px-3 text-gray-400 text-sm">OR</div>
          <div className="border-t border-1 border-gray-600 flex-grow w-8"></div>
        </div>

        <ImportScheduleDataButton />
      </div>
    </div>
  );
}
