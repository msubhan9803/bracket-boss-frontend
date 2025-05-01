"use client";
import ImportScheduleDataButton from "@/components/mutation-buttons/ImportScheduleDataButton";
import { Button } from "@/components/ui/button";
import {
  CreateScheduleMutation,
  Level,
  Pool,
  Round,
} from "@/graphql/generated/graphql";
import useLevelsByTournament from "@/hooks/level/useLevelsByTournament";
import useMatchesByRoundId from "@/hooks/match/useMatchesByRoundId";
import usePoolsByLevel from "@/hooks/pool/usePoolsByLevel";
import useRoundsByPool from "@/hooks/round/useRoundsByPool";
import useGetScheduleOfTournament from "@/hooks/schedule/useGetScheduleOfTournament";
import useScheduleCreation from "@/hooks/schedule/useScheduleCreation";
import { UseMutationResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type Props = {
  tournamentId: string;
};

export default function Scheduling({ tournamentId }: Props) {
  const [selectedLevel, setSelectedLevel] = useState<Level>();
  const [selectedPool, setSelectedPool] = useState<Pool>();
  const [selectedRoundId, setSelectedRoundId] = useState<Round>()

  const { schedule, scheduleLoading, scheduleRefetch } =
    useGetScheduleOfTournament(parseInt(tournamentId));
  const { levels } = useLevelsByTournament(tournamentId);
  const { pools } = usePoolsByLevel(selectedLevel?.id);
  const { rounds } = useRoundsByPool({
    poolId: selectedPool?.id as string,
  });
  const { matches } = useMatchesByRoundId({
    roundId: selectedRoundId?.id as string,
  });

  const { createScheduleMutation } = useScheduleCreation();

  const handleScheduleCreation = async () => {
    await createScheduleMutation.mutateAsync({
      tournamentId: parseInt(tournamentId as string),
    });
    scheduleRefetch();
  };

  useEffect(() => {
    console.log("🎯 levels: ", levels);

    if (levels.length > 0) setSelectedLevel(levels[0]);
  }, [levels]);

  useEffect(() => {
    console.log("🎱 pools: ", pools);

    if (pools.length > 0) setSelectedPool(pools[0]);
  }, [pools]);
  
  useEffect(() => {
    console.log("📍 rounds: ", rounds);

    if (rounds.length > 0) setSelectedRoundId(rounds[0]);
  }, [rounds]);

  useEffect(() => {
    console.log("📍 matches: ", matches);
  }, [matches]);

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
