import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Match, MatchRoundStatusTypes } from "@/graphql/generated/graphql";
import { cn } from "@/lib/utils";
import RoundContent from "./RoundContent";

interface UpdateMatchScoreContentProps {
  match: Match | undefined;
  onUpdateScore?: (roundId: number) => void;
  onEndMatchRound?: (roundId: number) => void;
  onStartMatchRound?: (roundId: number) => void;
}

const UpdateMatchScoreContent: React.FC<UpdateMatchScoreContentProps> = ({
  match,
  onUpdateScore,
  onEndMatchRound,
  onStartMatchRound,
}) => {
  if (!match) {
    return <div className="p-5">Match data not available</div>;
  }

  const [team1Score, setTeam1Score] = useState<number>(0);
  const [team2Score, setTeam2Score] = useState<number>(0);

  // Create tabs configuration based on match rounds
  const roundTabs = match.matchRounds.map((round) => ({
    value: round.matchRoundNumber.toString(),
    label: `Round ${round.matchRoundNumber}`,
    status: round.status,
    id: round.id,
  }));

  // Default to the first round
  const defaultTab = roundTabs.length > 0 ? roundTabs[0].value : "1";

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
                team1Score={team1Score}
                team2Score={team2Score}
                setTeam1Score={setTeam1Score}
                setTeam2Score={setTeam2Score}
                onStartRound={onStartMatchRound}
                onEndRound={onEndMatchRound}
                onUpdateScore={(roundId) => {
                  onUpdateScore?.(roundId);
                }}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default UpdateMatchScoreContent;
