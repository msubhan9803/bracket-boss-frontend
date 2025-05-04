import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Minus } from "lucide-react";
import { Match, MatchRoundStatusTypes, Team } from "@/graphql/generated/graphql";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
  console.log("Match 🔥🔥🔥🔥🔥 ", match);

  if (!match) {
    return <div className="p-5">Match data not available</div>;
  }

  const [team1Score, setTeam1Score] = useState<number>(12);
  const [team2Score, setTeam2Score] = useState<number>(2);

  // Create tabs configuration based on match rounds
  const roundTabs = match.matchRounds.map((round) => ({
    value: round.matchRoundNumber.toString(),
    label: `Round ${round.matchRoundNumber}`,
    status: round.status,
    id: round.id,
  }));

  // Default to the first round
  const defaultTab = roundTabs.length > 0 ? roundTabs[0].value : "1";

  const handleStartRound = (roundId: number) => {
    if (onStartMatchRound) onStartMatchRound();
  };

  const handleEndRound = (roundId: number) => {
    if (onEndMatchRound) onEndMatchRound();
  };

  const handleUpdateScore = (roundId: number) => {
    if (onUpdateScore) onUpdateScore();
  };

  // Helper component for team user avatars
  const TeamAvatars = ({ team }: { team: Team }) => {
    const users = team.users || [];

    return (
      <div className="flex items-center space-x-3">
        <div className="flex -space-x-2">
          {users.length > 0 ? (
            <>
              {users.slice(0, 3).map((user) => (
                <Avatar
                  key={user.id}
                  className="border-2 border-white w-10 h-10"
                >
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
              {users.length > 3 && (
                <Avatar className="border-2 border-white w-10 h-10">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    +{users.length - 3}
                  </AvatarFallback>
                </Avatar>
              )}
            </>
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
              <span className="text-xs">
                {team.name.substring(0, 2).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <span className="font-bold text-lg">{team.name}</span>
      </div>
    );
  };

  // Round content component to avoid repetition
  const RoundContent = ({ round }: { round: (typeof roundTabs)[0] }) => {
    const roundStatus = round.status;
    const roundId = round.id;

    return (
      <>
        {roundStatus === MatchRoundStatusTypes.NotStarted && (
          <div className="flex flex-col items-center justify-center space-y-4 py-20">
            <p className="text-lg font-medium">Round not started yet</p>
            <Button
              variant="default"
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={() => handleStartRound(roundId)}
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
                  <TeamAvatars team={match.homeTeam} />
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="default"
                      size="icon"
                      className="rounded-full bg-green-500 text-white hover:bg-green-600"
                      onClick={() =>
                        setTeam1Score((prev) => Math.max(0, prev - 1))
                      }
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
                  <TeamAvatars team={match.awayTeam} />
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="default"
                      size="icon"
                      className="rounded-full bg-green-500 text-white hover:bg-green-600"
                      onClick={() =>
                        setTeam2Score((prev) => Math.max(0, prev - 1))
                      }
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
                onClick={() => handleUpdateScore(roundId)}
              >
                Update Score
              </Button>
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => handleEndRound(roundId)}
              >
                End Match Round
              </Button>
            </div>
          </div>
        )}

        {roundStatus === MatchRoundStatusTypes.Completed && (
          <div className="flex flex-col items-center justify-center space-y-4 py-20">
            <p className="text-lg font-medium">Round completed</p>
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex -space-x-2 justify-center">
                    {(match.homeTeam.users || []).slice(0, 3).map((user) => (
                      <Avatar
                        key={user.id}
                        className="border-2 border-white w-8 h-8"
                      >
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <p className="font-bold">{match.homeTeam.name}</p>
                </div>
                <p className="text-3xl font-bold mt-2">{team1Score}</p>
              </div>
              <div className="text-xl font-bold">vs</div>
              <div className="text-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex -space-x-2 justify-center">
                    {(match.awayTeam.users || []).slice(0, 3).map((user) => (
                      <Avatar
                        key={user.id}
                        className="border-2 border-white w-8 h-8"
                      >
                        <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <p className="font-bold">{match.awayTeam.name}</p>
                </div>
                <p className="text-3xl font-bold mt-2">{team2Score}</p>
              </div>
            </div>
          </div>
        )}
      </>
    );
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
                className={`${
                  tab.status === MatchRoundStatusTypes.InProgress
                    ? "data-[state=active]:bg-green-500 data-[state=active]:text-white"
                    : ""
                }`}
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
              <RoundContent round={tab} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default UpdateMatchScoreContent;
