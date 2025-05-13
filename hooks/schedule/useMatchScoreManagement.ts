import { useEffect, useMemo, useState } from "react";
import {
  Level,
  LevelStatusTypesEnum,
  Pool,
  Round,
  RoundStatusTypesEnum,
} from "@/graphql/generated/graphql";
import useLevelsByTournament from "@/hooks/level/useLevelsByTournament";
import useMatchesByRoundId from "@/hooks/match/useMatchesByRoundId";
import usePoolsByLevel from "@/hooks/pool/usePoolsByLevel";
import useRoundsByPool from "@/hooks/round/useRoundsByPool";
import useScheduleOperations from "@/hooks/schedule/useScheduleOperations";
import useSingleTournament from "../tournament/useSingleTournament";

export default function useMatchScoreManagement(tournamentId: string) {
  const [selectedLevel, setSelectedLevel] = useState<Level>();
  const [selectedPool, setSelectedPool] = useState<Pool>();
  const [selectedRound, setSelectedRound] = useState<Round>();
  const [showUpdateScoreDrawer, setShowUpdateScoreDrawer] = useState(false);
  const [currentMatchId, setCurrentMatchId] = useState<number>();

  const { endRoundMutation, proceedToNextLevelMutation } = useScheduleOperations();

  const { tournament } = useSingleTournament(tournamentId);
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

  const allTournamentRoundsCompleted = useMemo(() => {
    if (!tournament?.rounds) return false;
    return tournament.rounds.every((round) => {
      return round.status === RoundStatusTypesEnum.Completed;
    });
  }, [tournament]);

  const anotherNotStartedLevelLeft = useMemo(() => {
    if (!levels) return undefined;
    const notStartedLevels = levels.filter(
      (level) => level.status === LevelStatusTypesEnum.NotStarted
    );
    return notStartedLevels.length > 0;
  }, [levels]);

  const isSelectedLevelCompleted = useMemo(
    () => selectedLevel?.status === LevelStatusTypesEnum.Completed,
    [selectedLevel]
  );

  const areRoundsOfSelectedLevelAndPoolCompleted = useMemo(
    () =>
      rounds.every((round) => round.status === RoundStatusTypesEnum.Completed) ??
      undefined,
    [rounds]
  );

  const nextLevel = useMemo(() => {
    if (!levels) return undefined;

    const inProgressIndex = levels.findIndex(
      (level) => level.status === LevelStatusTypesEnum.InProgress
    );
    if (inProgressIndex === -1 || inProgressIndex + 1 >= levels.length) {
      return undefined;
    }

    const next = levels[inProgressIndex + 1];

    return next.status === LevelStatusTypesEnum.NotStarted ? next : undefined;
  }, [levels]);

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
      levelId: selectedLevel?.id,
      poolId: selectedPool?.id,
    });
    refetchLevels();
    refetchPools();
    refetchRounds();
    refetchMatches();
  };

  const handleProceedToNextLevel = async () => {
    await proceedToNextLevelMutation.mutateAsync({
      tournamentId: parseInt(tournamentId),
    });
    refetchLevels();
    refetchPools();
    refetchRounds();
    refetchMatches();
  };

  return {
    selectedLevel,
    selectedPool,
    selectedRound,
    showUpdateScoreDrawer,
    currentMatchId,
    levels,
    pools,
    rounds,
    matches,
    isSelectedLevelCompleted,
    areRoundsOfSelectedLevelAndPoolCompleted,
    endRoundMutation,
    nextLevel,
    allTournamentRoundsCompleted,
    anotherNotStartedLevelLeft,
    setSelectedLevel,
    setSelectedPool,
    setSelectedRound,
    setShowUpdateScoreDrawer,
    setCurrentMatchId,
    handleEndRound,
    handleProceedToNextLevel,
    refetchMatches,
  };
}
