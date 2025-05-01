import React, { useState } from 'react';
import useLevelsByTournament from "@/hooks/level/useLevelsByTournament";
import useMatchesByRoundId from "@/hooks/match/useMatchesByRoundId";
import usePoolsByLevel from "@/hooks/pool/usePoolsByLevel";
import useRoundsByPool from "@/hooks/round/useRoundsByPool";
import { Level, Pool, Round } from "@/graphql/generated/graphql";

type Props = {
    tournamentId: string;
}

export default function MatchManagement({ tournamentId }: Props) {
  const [selectedLevel, setSelectedLevel] = useState<Level>();
  const [selectedPool, setSelectedPool] = useState<Pool>();
  const [selectedRoundId, setSelectedRoundId] = useState<Round>();

  const { levels, refetchLevels } = useLevelsByTournament({
    tournamentId,
    enabled: !!tournamentId,
  });
  const { pools, refetchPools } = usePoolsByLevel({
    levelId: selectedLevel?.id,
    enabled: !!selectedLevel?.id,
  });
  const { rounds, refetchRounds } = useRoundsByPool({
    poolId: selectedPool?.id as string,
    enabled: !!selectedPool?.id,
  });
  const { matches, refetchMatches } = useMatchesByRoundId({
    roundId: selectedRoundId?.id as string,
    enabled: !!selectedRoundId?.id,
  });

  return (
    <div>MatchManagement</div>
  )
}
