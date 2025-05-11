import React from "react";
import MatchScoreCard from "../MatchScoreCard";
import UpdateMatchScoreDrawer from "@/components/drawers/UpdateMatchScoreDrawer";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { LevelStatusBadge, RoundStatusBadge } from "@/components/shared/StatusBadge";
import useMatchScoreManagement from "@/hooks/schedule/useMatchScoreManagement";

type Props = {
  tournamentId: string;
};

export default function MatchScoreManagement({ tournamentId }: Props) {
  const {
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
    allRoundsByTournamentCompleted,
    anotherNotStartedLevelLeft,
    setSelectedLevel,
    setSelectedPool,
    setSelectedRound,
    setShowUpdateScoreDrawer,
    setCurrentMatchId,
    handleEndRound,
    refetchMatches,
  } = useMatchScoreManagement(tournamentId);

  return (
    <div className="space-y-5">
      <div className="flex justify-between flex-wrap gap-4">
        <div className="flex gap-4">
          <Select
            onValueChange={(value) => {
              const level = levels?.find((l) => l.id === value);
              setSelectedLevel(level);
            }}
            value={selectedLevel?.id}
          >
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              {levels?.map((level) => (
                <SelectItem key={level.id} value={level.id}>
                  <span>{level.name}</span>
                  <span className="text-muted-foreground mx-2">-</span>
                  <LevelStatusBadge status={level.status} />
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
            <SelectTrigger className="w-[250px]">
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
                <SelectItem key={round.id} value={round.id}>
                  <span>{round.name}</span>
                  <span className="text-muted-foreground mx-2">-</span>
                  <RoundStatusBadge status={round.status} />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4">
          {!isSelectedLevelCompleted && !areRoundsOfSelectedLevelAndPoolCompleted && (
            <Button loading={endRoundMutation.isPending} onClick={handleEndRound}>
              End Round
            </Button>
          )}

          {allRoundsByTournamentCompleted && anotherNotStartedLevelLeft && (
            <Button loading={endRoundMutation.isPending} onClick={handleEndRound}>
              Move to {nextLevel?.name}
            </Button>
          )}
        </div>
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
