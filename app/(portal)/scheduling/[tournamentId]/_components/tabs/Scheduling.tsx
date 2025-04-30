"use client";
import ImportScheduleDataButton from "@/components/mutation-buttons/ImportScheduleDataButton";
import { Button } from "@/components/ui/button";
import { CreateScheduleMutation } from "@/graphql/generated/graphql";
import useLevelsByTournament from "@/hooks/level/useLevelsByTournament";
import useGetScheduleOfTournament from "@/hooks/schedule/useGetScheduleOfTournament";
import useScheduleCreation from "@/hooks/schedule/useScheduleCreation";
import { UseMutationResult } from "@tanstack/react-query";
import { useEffect } from "react";

type Props = {
  tournamentId: string;
};

export default function Scheduling({ tournamentId }: Props) {
  const { schedule, scheduleLoading, scheduleRefetch } =
    useGetScheduleOfTournament(parseInt(tournamentId));
  const { levels, loadingLevels } = useLevelsByTournament(tournamentId);

  const { createScheduleMutation } = useScheduleCreation();

  const handleScheduleCreation = async () => {
    await createScheduleMutation.mutateAsync({
      tournamentId: parseInt(tournamentId as string),
    });
    scheduleRefetch();
  };

  useEffect(() => {
    console.log("🎯 levels: ", levels);
  }, [levels]);

  return (
    <EmptySchedule
      handleScheduleCreation={handleScheduleCreation}
      createScheduleMutation={createScheduleMutation}
    />
  );
}

function EmptySchedule({
  handleScheduleCreation,
  createScheduleMutation,
}: {
  handleScheduleCreation: () => Promise<void>;
  createScheduleMutation: UseMutationResult<
    CreateScheduleMutation | undefined,
    Error,
    {
      tournamentId: number;
    },
    unknown
  >;
}) {
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
