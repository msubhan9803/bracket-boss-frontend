import React, { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Match, MatchRoundStatusTypes } from "@/graphql/generated/graphql";
import { cn } from "@/lib/utils";
import RoundContent from "./RoundContent";
import useMatchOperations from "@/hooks/match/useMatchOperations";
import useAllMatchesWithFilters from "@/hooks/match/useAllMatchesWithFilters";

interface UpdateMatchScoreContentProps {
  match: Match | undefined;
}

const UpdateMatchScoreContent: React.FC<UpdateMatchScoreContentProps> = ({
  match,
}) => {
  if (!match) {
    return <div className="p-5">Match data not available</div>;
  }

  const [homeTeamScores, setHomeTeamScores] = useState<Record<number, number>>({});
  const [awayTeamScores, setAwayTeamScores] = useState<Record<number, number>>({});

  const { updateScoreMutation } = useMatchOperations();
  const { refetchMatches } = useAllMatchesWithFilters();

  const roundTabs = useMemo(() =>
    match.matchRounds.map((round) => ({
      value: round.matchRoundNumber.toString(),
      label: `Round ${round.matchRoundNumber}`,
      status: round.status,
      id: round.id,
    })),
    [match.matchRounds]
  );

  const defaultTab = roundTabs.length > 0 ? roundTabs[0].value : "1";

  const handleTeam1ScoreChange = (roundId: number, newScore: number) => {
    setHomeTeamScores((prevScores) => ({ ...prevScores, [roundId]: newScore }));
    updateScoreMutation.mutate({
      matchId: match.id,
      roundId: roundId,
      homeTeamScore: newScore,
      awayTeamScore: awayTeamScores[roundId] || 0,
    });
    refetchMatches();
  };

  const handleTeam2ScoreChange = (roundId: number, newScore: number) => {
    setAwayTeamScores((prevScores) => ({ ...prevScores, [roundId]: newScore }));
    updateScoreMutation.mutate({
      matchId: match.id,
      roundId: roundId,
      homeTeamScore: homeTeamScores[roundId] || 0,
      awayTeamScore: newScore,
    });
    refetchMatches();
  };

  const handleStartRound = (roundId: number) => {
    console.log("Starting Round.... ", roundId);
  };

  const handleEndRound = (roundId: number) => {
    console.log("Ending Round.... ", roundId);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-5">
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

          {roundTabs.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="flex-1 flex flex-col mt-6"
            >
              <RoundContent
                round={tab}
                match={match}
                team1Score={homeTeamScores[tab.id] || 0}
                team2Score={awayTeamScores[tab.id] || 0}
                onTeam1ScoreChange={(newScore) =>
                  handleTeam1ScoreChange(tab.id, newScore)
                }
                onTeam2ScoreChange={(newScore) =>
                  handleTeam2ScoreChange(tab.id, newScore)
                }
                onStartRound={handleStartRound}
                onEndRound={handleEndRound}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default UpdateMatchScoreContent;