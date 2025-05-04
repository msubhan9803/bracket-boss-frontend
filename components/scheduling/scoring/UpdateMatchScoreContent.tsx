import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Minus } from "lucide-react";
import { MatchRoundStatusTypes } from "@/graphql/generated/graphql";

interface Team {
  name: string;
}

interface MatchRound {
  id: number;
  matchRoundNumber: number;
  status: MatchRoundStatusTypes;
}

interface Match {
  id: number;
  status: string;
  title: string;
  homeTeam: Team;
  awayTeam: Team;
  matchRounds: MatchRound[];
}

interface UpdateMatchScoreContentProps {
  match: Match | undefined;
  onUpdateScore?: () => void;
  onEndMatchRound?: () => void;
  onStartMatchRound?: () => void;
}

const UpdateMatchScoreContent: React.FC<UpdateMatchScoreContentProps> = ({
  match,
  onUpdateScore,
  onEndMatchRound,
  onStartMatchRound,
}) => {
  const [activeTab, setActiveTab] = useState<string>("1");

  if (!match) {
    return <div className="p-5">Match data not available</div>;
  }

  const getCurrentRound = (): MatchRound | undefined => {
    const roundNumber = parseInt(activeTab);
    return match.matchRounds.find(
      (round) => round.matchRoundNumber === roundNumber
    );
  };

  const currentRound = getCurrentRound();
  const roundStatus = currentRound?.status || MatchRoundStatusTypes.NotStarted;

  const [team1Score, setTeam1Score] = useState<number>(12);
  const [team2Score, setTeam2Score] = useState<number>(2);

  const handleStartRound = () => {
    if (onStartMatchRound) onStartMatchRound();
  };

  const handleEndRound = () => {
    if (onEndMatchRound) onEndMatchRound();
  };

  const handleUpdateScore = () => {
    if (onUpdateScore) onUpdateScore();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-5">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full mb-6"
        >
          <TabsList className="grid grid-cols-3 w-full">
            {[1, 2, 3].map((roundNum) => (
              <TabsTrigger
                key={roundNum}
                value={roundNum.toString()}
                className={`${
                  parseInt(activeTab) === roundNum
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Round {roundNum}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {roundStatus === MatchRoundStatusTypes.NotStarted && (
          <div className="flex flex-col items-center justify-center space-y-4 py-20">
            <p className="text-lg font-medium">Round not started yet</p>
            <Button
              variant="default"
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={handleStartRound}
            >
              Start Match Round
            </Button>
          </div>
        )}

        {roundStatus === MatchRoundStatusTypes.InProgress && (
          <div className="space-y-4">
            <div className="flex flex-col space-y-4">
              <Card className="p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                      <span className="text-xs">Team 1</span>
                    </div>
                    <span className="font-bold text-lg">
                      {match.homeTeam.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="default"
                      size="icon"
                      className="rounded-full bg-green-500 text-white hover:bg-green-600"
                      onClick={() => setTeam1Score((prev) => prev - 1)}
                    >
                      <Minus className="h-6 w-6" />
                    </Button>
                    <div className="w-16 h-16 border border-gray-300 rounded flex items-center justify-center">
                      <span className="text-2xl font-bold">{team1Score}</span>
                    </div>
                    <Button
                      variant="default"
                      size="icon"
                      className="rounded-full bg-green-500 text-white hover:bg-green-600"
                      onClick={() => setTeam1Score((prev) => prev + 1)}
                    >
                      <Plus className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                      <span className="text-xs">Team 2</span>
                    </div>
                    <span className="font-bold text-lg">
                      {match.awayTeam.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="default"
                      size="icon"
                      className="rounded-full bg-green-500 text-white hover:bg-green-600"
                      onClick={() => setTeam2Score((prev) => prev - 1)}
                    >
                      <Minus className="h-6 w-6" />
                    </Button>
                    <div className="w-16 h-16 border border-gray-300 rounded flex items-center justify-center">
                      <span className="text-2xl font-bold">{team2Score}</span>
                    </div>
                    <Button
                      variant="default"
                      size="icon"
                      className="rounded-full bg-green-500 text-white hover:bg-green-600"
                      onClick={() => setTeam2Score((prev) => prev + 1)}
                    >
                      <Plus className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex items-center justify-between gap-4 mt-8">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={handleUpdateScore}
              >
                Update Score
              </Button>
              <Button
                variant="secondary"
                className="flex-1"
                onClick={handleEndRound}
              >
                End Match Round
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateMatchScoreContent;
