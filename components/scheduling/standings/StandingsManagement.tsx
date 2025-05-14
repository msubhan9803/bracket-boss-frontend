import React, { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Trophy, Medal, Users } from "lucide-react";
import { Tournament, Level } from "@/graphql/generated/graphql";
import LevelTeamStandingsTable from "@/components/tables/LevelTeamStandingsTable";

interface LevelWithId extends Level {
  id: string;
}

interface WinnerWithMembers {
  rank: number;
  team: {
    id: string;
    name: string;
    members: { initial: string }[];
  };
}

const TeamBadge = ({
  letter,
  color = "bg-green-500",
}: {
  letter: string;
  color?: string;
}) => (
  <div
    className={`${color} text-white font-semibold w-8 h-8 rounded-full flex items-center justify-center`}
  >
    {letter}
  </div>
);

const StandingsManagement = ({ tournament }: { tournament: Tournament }) => {
  const [levels, setLevels] = useState<LevelWithId[]>([]);
  const [selectedLevelId, setSelectedLevelId] = useState<string>("");
  const [winners, setWinners] = useState<WinnerWithMembers[]>([]);
  const [activeTab, setActiveTab] = useState<"standings" | "winners">("standings");

  useEffect(() => {
    if (tournament) {
      const tournamentLevels = tournament.levels;

      const tournamentWinners: WinnerWithMembers[] =
        tournament.tournamentResult?.winners?.map((winner) => ({
          ...winner,
          team: {
            ...winner.team,
            members: winner.team.name.split(" ").map((word) => ({ initial: word[0] })),
          },
        })) || [];

      setLevels(tournamentLevels);
      setSelectedLevelId(tournamentLevels[0]?.id || "");
      setWinners(tournamentWinners);
    }
  }, [tournament]);

  if (!tournament) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-400">No tournament data available</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue="standings"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "standings" | "winners")}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger
            value="standings"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            <Users className="mr-2 h-4 w-4" />
            Standings
          </TabsTrigger>
          <TabsTrigger
            value="winners"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            <Trophy className="mr-2 h-4 w-4" />
            Winners
          </TabsTrigger>
        </TabsList>

        {/* Standings content */}
        <TabsContent value="standings" className="space-y-4">
          {levels.length > 0 && (
            <div className="flex mb-4">
              <Select value={selectedLevelId} onValueChange={setSelectedLevelId}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level.id} value={level.id}>
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Card>
            <CardHeader className="bg-muted pb-4">
              <CardTitle className="text-lg text-black dark:text-white">
                {levels.find((l) => l.id === selectedLevelId)?.name || "Tournament"}{" "}
                Standings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <LevelTeamStandingsTable levelId={selectedLevelId} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Winners tab content */}
        <TabsContent value="winners" className="space-y-6">
          <Card>
            <CardHeader className="bg-muted pb-4">
              <CardTitle className="text-lg text-black dark:text-white">
                Tournament Winners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {winners.length > 0 ? (
                  winners.slice(0, 3).map((winner) => (
                    <div
                      key={`winner-${winner.team.id}`}
                      className={`flex items-center p-4 rounded-lg my-8 ${
                        winner.rank === 1
                          ? "bg-gradient-to-r from-green-600/20 dark:from-green-600/20 to-transparent border border-green-600/30 dark:border-green-600/30"
                          : "bg-zinc-800/50 dark:bg-zinc-200/50 border border-zinc-700/30 dark:border-zinc-300/30"
                      }`}
                    >
                      <div className="mr-4">
                        {winner.rank === 1 ? (
                          <div className="w-12 h-12 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center">
                            <Trophy className="h-6 w-6 text-white" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-zinc-700 dark:bg-zinc-400 rounded-full flex items-center justify-center">
                            <Medal className="h-6 w-6 text-white dark:text-zinc-800" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="flex -space-x-2 mr-3">
                            {winner.team.members.map((member, i) => (
                              <TeamBadge
                                key={i}
                                letter={member.initial}
                                color={
                                  winner.rank === 1
                                    ? "bg-green-500 dark:bg-green-600"
                                    : "bg-zinc-700 dark:bg-zinc-400"
                                }
                              />
                            ))}
                          </div>
                          <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">
                            {winner.team.name}
                          </h3>
                        </div>
                      </div>
                      <div>
                        <Badge
                          className={
                            winner.rank === 1
                              ? "bg-yellow-300 dark:bg-yellow-400 text-zinc-800"
                              : winner.rank === 2
                              ? "bg-zinc-500 dark:bg-zinc-300 text-white dark:text-zinc-800"
                              : "bg-amber-800 dark:bg-amber-600 text-white"
                          }
                        >
                          {winner.rank === 1
                            ? "1st Place"
                            : winner.rank === 2
                            ? "2nd Place"
                            : "3rd Place"}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-400 dark:text-zinc-500 py-8">
                    No winners data available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StandingsManagement;
