import React, { useMemo, useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Match, MatchRoundStatusTypes } from "@/graphql/generated/graphql";
import { cn } from "@/lib/utils";
import RoundContent from "./RoundContent";
import useMatchOperations from "@/hooks/match/useMatchOperations";
import useAllMatchesWithFilters from "@/hooks/match/useAllMatchesWithFilters";
import { MatchDetails, StatusBadge } from "../MatchScoreCard";
import { Separator } from "@/components/ui/separator";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

interface UpdateMatchScoreContentProps {
  match: Match;
  refetchMatch: (options?: RefetchOptions) => Promise<QueryObserverResult<Match, Error>>;
}

const UpdateMatchScoreContent: React.FC<UpdateMatchScoreContentProps> = ({ match, refetchMatch }) => {
  const courtName = match.matchCourtSchedule?.courtSchedule.court.name;
  const matchDate = match.matchCourtSchedule?.matchDate;
  const startTime = match.matchCourtSchedule?.courtSchedule.timeSlot.startTime;
  const endTime = match.matchCourtSchedule?.courtSchedule.timeSlot.endTime;

  const [homeTeamScores, setHomeTeamScores] = useState<Record<number, number>>({});
  const [awayTeamScores, setAwayTeamScores] = useState<Record<number, number>>({});

  const { updateScoreMutation, endMatchRoundMutation, startMatchRoundMutation } = useMatchOperations();
  const { refetchMatches } = useAllMatchesWithFilters();

  const roundTabs = useMemo(
    () =>
      match.matchRounds.map((round) => ({
        value: round.matchRoundNumber.toString(),
        label: `Round ${round.matchRoundNumber}`,
        status: round.status,
        id: round.id,
      })),
    [match.matchRounds]
  );

  const defaultTab = roundTabs.length > 0 ? roundTabs[0].value : "1";

  const handleTeam1ScoreChange = async (roundId: number, newScore: number) => {
    setHomeTeamScores((prevScores) => ({ ...prevScores, [roundId]: newScore }));
    await updateScoreMutation.mutateAsync({
      matchId: match.id,
      roundId: roundId,
      homeTeamScore: newScore,
      awayTeamScore: awayTeamScores[roundId] || 0,
    });
    refetchMatches();
  };

  const handleTeam2ScoreChange = async (roundId: number, newScore: number) => {
    setAwayTeamScores((prevScores) => ({ ...prevScores, [roundId]: newScore }));
    await updateScoreMutation.mutateAsync({
      matchId: match.id,
      roundId: roundId,
      homeTeamScore: homeTeamScores[roundId] || 0,
      awayTeamScore: newScore,
    });
    refetchMatches();
  };

  const handleStartRound = async (roundId: number) => {
    await startMatchRoundMutation.mutateAsync({
      matchId: match.id,
      roundId: roundId,
    });

    refetchMatch();
  };

  const handleEndRound = async (roundId: number) => {
    await endMatchRoundMutation.mutateAsync({
      matchId: match.id,
      roundId: roundId,
    });

    refetchMatch();
  };

  useEffect(() => {
    if (match?.matchRounds) {
      const initialHomeScores: Record<number, number> = {};
      const initialAwayScores: Record<number, number> = {};
      match.matchRounds.forEach((round) => {
        if (round.matchRoundScore) {
          initialHomeScores[round.id] = round.matchRoundScore.homeTeamScore || 0;
          initialAwayScores[round.id] = round.matchRoundScore.awayTeamScore || 0;
        }
      });
      setHomeTeamScores(initialHomeScores);
      setAwayTeamScores(initialAwayScores);
    }
  }, [match?.matchRounds]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h1 className="text-base sm:text-lg font-semibold text-foreground">{match.title}</h1>
          <StatusBadge status={match.status} />
        </div>

        <div className="space-y-4 mb-4">
          <MatchDetails
            poolName={match.pool.name}
            courtName={courtName}
            matchDate={matchDate}
            startTime={startTime}
            endTime={endTime}
          />
          <Separator />
        </div>

        <Tabs defaultValue={defaultTab} className="w-full flex flex-col">
          <TabsList className="self-start">
            {roundTabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  tab.status === MatchRoundStatusTypes.InProgress
                    ? "data-[state=active]:bg-green-500 data-[state=active]:text-white"
                    : ""
                )}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {roundTabs.map((tab, index) => (
            <TabsContent key={tab.value} value={tab.value} className="flex-1 flex flex-col mt-6">
              <RoundContent
                round={tab}
                match={match}
                team1Score={homeTeamScores[tab.id] || 0}
                team2Score={awayTeamScores[tab.id] || 0}
                onTeam1ScoreChange={(newScore) => handleTeam1ScoreChange(tab.id, newScore)}
                onTeam2ScoreChange={(newScore) => handleTeam2ScoreChange(tab.id, newScore)}
                onStartRound={handleStartRound}
                onEndRound={handleEndRound}
                endRoundLoading={endMatchRoundMutation.isPending}
                previousRoundStatus={roundTabs[Math.max(0, index - 1)].status}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default UpdateMatchScoreContent;
