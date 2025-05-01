import React, { useEffect, useState } from "react";
import useLevelsByTournament from "@/hooks/level/useLevelsByTournament";
import usePoolsByLevel from "@/hooks/pool/usePoolsByLevel";
import useRoundsByPool from "@/hooks/round/useRoundsByPool";
import useMatchesByRoundId from "@/hooks/match/useMatchesByRoundId";
import { Level, Pool, Round } from "@/graphql/generated/graphql";
import MatchCard from "../MatchCard";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Props = {
  tournamentId: string;
};

export default function MatchManagement({ tournamentId }: Props) {
  const [selectedLevel, setSelectedLevel] = useState<Level>();
  const [selectedPool, setSelectedPool] = useState<Pool>();
  const [selectedRound, setSelectedRound] = useState<Round>();

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
    if (levels?.length && !selectedLevel) {
      setSelectedLevel(levels[0]);
    }
  }, [levels]);

  useEffect(() => {
    if (pools?.length && !selectedPool) {
      setSelectedPool(pools[0]);
    }
  }, [pools]);

  useEffect(() => {
    if (rounds?.length && !selectedRound) {
      setSelectedRound(rounds[0]);
    }
  }, [rounds]);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold text-primary">Match Management</h2>

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
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Round" />
          </SelectTrigger>
          <SelectContent>
            {rounds?.map((round) => (
              <SelectItem key={round.id} value={round.id}>
                {round.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-12">
        {matches?.length
          ? matches.map((match, index) => (
              <MatchCard key={match.id} match={match} matchIndex={index} />
            ))
          : selectedRound && (
              <p className="text-muted-foreground">
                No matches available for this round.
              </p>
            )}
      </div>
    </div>
  );
}
