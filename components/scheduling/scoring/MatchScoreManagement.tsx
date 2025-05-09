import React, { useEffect, useState } from "react";
import MatchScoreCard from "../MatchScoreCard";
import UpdateMatchScoreDrawer from "@/components/drawers/UpdateMatchScoreDrawer";
import { Button } from "@/components/ui/button";
import useScheduleOperations from "@/hooks/schedule/useScheduleOperations";
import { Level, Pool, Round, RoundStatusTypesEnum } from "@/graphql/generated/graphql";
import useLevelsByTournament from "@/hooks/level/useLevelsByTournament";
import useMatchesByRoundId from "@/hooks/match/useMatchesByRoundId";
import usePoolsByLevel from "@/hooks/pool/usePoolsByLevel";
import useRoundsByPool from "@/hooks/round/useRoundsByPool";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RoundStatusBadge } from "@/components/shared/StatusBadge";

type Props = {
  tournamentId: string;
};

export default function MatchScoreManagement({ tournamentId }: Props) {
  const [selectedLevel, setSelectedLevel] = useState<Level>();
  const [selectedPool, setSelectedPool] = useState<Pool>();
  const [selectedRound, setSelectedRound] = useState<Round>();
  const [showUpdateScoreDrawer, setShowUpdateScoreDrawer] = useState(false);
  const [currentMatchId, setCurrentMatchId] = useState<number>();
  const { endRoundMutation } = useScheduleOperations();

  const { levels, refetchLevels } = useLevelsByTournament({
    tournamentId,
    enabled: !!tournamentId,
  });

  const { pools, refetchPools } = usePoolsByLevel({
    levelId: selectedLevel?.id,
    enabled: !!selectedLevel?.id,
  });

  const { rounds, refetchRounds } = useRoundsByPool({
    poolId: selectedPool?.id,
    enabled: !!selectedPool?.id,
  });

  const { matches, refetchMatches } = useMatchesByRoundId({
    roundId: selectedRound?.id,
    enabled: !!selectedRound?.id,
  });

  useEffect(() => {
    if (levels?.length > 0 && !selectedLevel) {
      setSelectedLevel(levels[0]);
    }
  }, [levels]);

  useEffect(() => {
    if (pools?.length > 0 && !selectedPool) {
      setSelectedPool(pools[0]);
    }
  }, [pools]);

  useEffect(() => {
    if (rounds?.length > 0) {
      updateSelectedRound();
    }
  }, [rounds]);

  const updateSelectedRound = () => {
    const inProgressRound = rounds.find(
      (round) => round.status === RoundStatusTypesEnum.InProgress
    );

    setSelectedRound(
      inProgressRound ||
        rounds.find((round) => round.status === RoundStatusTypesEnum.NotStarted) ||
        rounds.find((round) => round.status === RoundStatusTypesEnum.Completed)
    );
  };

  const handleEndRound = async () => {
    await endRoundMutation.mutateAsync({
      tournamentId: parseInt(tournamentId),
      poolId: selectedPool?.id,
    });
    refetchRounds();
    refetchMatches();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-4">
        <Select
          onValueChange={(value) => {
            const level = levels?.find((l) => l.id === value);
            setSelectedLevel(level);
          }}
          value={selectedLevel?.id}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Level" />
          </SelectTrigger>
          <SelectContent>
            {levels?.map((level) => (
              <SelectItem key={level.id} value={level.id}>
                {level.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => {
            const pool = pools?.find((p) => p.id === value);
            setSelectedPool(pool);
          }}
          value={selectedPool?.id}
          disabled={!selectedLevel}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Pool" />
          </SelectTrigger>
          <SelectContent>
            {pools?.map((pool) => (
              <SelectItem key={pool.id} value={pool.id}>
                {pool.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => {
            const round = rounds?.find((r) => r.id === value);
            setSelectedRound(round);
          }}
          value={selectedRound?.id}
          disabled={!selectedPool}
        >
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select Round" />
          </SelectTrigger>
          <SelectContent>
            {rounds?.map((round) => (
              <SelectItem key={round.id} value={round.id} className="">
                <span>{round.name}</span>
                <span className="text-muted-foreground mx-2">-</span>
                <RoundStatusBadge status={round.status} />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button loading={endRoundMutation.isPending} onClick={handleEndRound}>
          End Round
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {matches?.length > 0 &&
          matches.map((match, index) => (
            <MatchScoreCard
              key={match.id}
              match={match}
              matchIndex={index}
              refetchMatches={refetchMatches}
              setCurrentMatchId={setCurrentMatchId}
              setShowUpdateScoreDrawer={setShowUpdateScoreDrawer}
            />
          ))}
      </div>

      {showUpdateScoreDrawer && currentMatchId && (
        <UpdateMatchScoreDrawer
          isOpen={showUpdateScoreDrawer}
          setIsOpen={setShowUpdateScoreDrawer}
          title="Update Score"
          description="This will update Match Round scores"
          currentMatchId={currentMatchId}
          refetchMatches={refetchMatches}
        />
      )}
    </div>
  );
}
