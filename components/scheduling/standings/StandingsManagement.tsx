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
import { Trophy, Medal, Users, Calendar } from "lucide-react";
import { Tournament, Level, TournamentWinner, Team, User } from "@/graphql/generated/graphql";

interface Standing {
  rank: number;
  team: {
    id: string;
    name: string;
    members: { initial: string }[];
  };
  wins: number;
  losses: number;
  points: number;
}

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

const StandingsCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <Card className={`bg-zinc-900 border-zinc-800 overflow-hidden ${className}`}>
    {children}
  </Card>
);

const TeamBadge = ({ letter, color = "bg-green-500" }: { letter: string; color?: string }) => (
  <div
    className={`${color} text-white font-semibold w-8 h-8 rounded-full flex items-center justify-center`}
  >
    {letter}
  </div>
);

const StandingsManagement = ({ tournament }: { tournament: Tournament }) => {
  // State for the standings data
  const [levels, setLevels] = useState<LevelWithId[]>([]);
  const [selectedLevelId, setSelectedLevelId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [winners, setWinners] = useState<WinnerWithMembers[]>([]);
  const [standingsData, setStandingsData] = useState<Record<string, Standing[]>>({});
  const [activeTab, setActiveTab] = useState<"standings" | "winners">("standings");

  // Initialize data from tournament prop
  useEffect(() => {
    if (tournament) {
      // Extract levels from tournament
      const tournamentLevels: LevelWithId[] = tournament.levels?.map((level, index) => ({
        ...level,
        id: index.toString(),
      })) || [];

      // Extract winners from tournament
      const tournamentWinners: WinnerWithMembers[] = tournament.tournamentResult?.winners?.map((winner) => ({
        ...winner,
        team: {
          ...winner.team,
          // Mock member data since it's not in the provided schema
          members: winner.team.name.split(' ').map(word => ({ initial: word[0] }))
        }
      })) || [];

      // Mock standings data since it's not in the provided schema
      // In a real app, this would come from the API
      const mockStandings: Record<string, Standing[]> = {};
      tournament.levels?.forEach((level, index) => {
        mockStandings[index.toString()] = generateMockStandings(level.name);
      });

      setLevels(tournamentLevels);
      setSelectedLevelId(tournamentLevels[0]?.id || "");
      setWinners(tournamentWinners);
      setStandingsData(mockStandings);
    }
  }, [tournament]);

  // Helper function to generate mock standings (replace with real data from API)
  const generateMockStandings = (levelName: string): Standing[] => {
    // This is just placeholder logic - replace with actual data
    const teamCount = levelName === "Pool Play" ? 4 : 3;
    return Array.from({ length: teamCount }, (_, i) => ({
      rank: i + 1,
      team: {
        id: (i + 1).toString(),
        name: `Team ${i + 1}`,
        members: [
          { initial: String.fromCharCode(65 + i) },
          { initial: String.fromCharCode(66 + i) },
        ],
      },
      wins: teamCount - i - 1,
      losses: i,
      points: (teamCount - i - 1) * 3,
    }));
  };

  // Get current standings based on selected level
  const currentStandings = standingsData[selectedLevelId] || [];

  // Format date function
  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!tournament) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-400">No tournament data available</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tournament info header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">{tournament.name}</h2>
        <div className="flex items-center text-gray-400 text-sm space-x-4">
          <span className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            {formatDate(tournament.start_date)} - {formatDate(tournament.end_date)}
          </span>
          <Badge className="bg-green-500 text-white hover:bg-green-600">
            {tournament.status === "completed" ? "Completed" : tournament.status}
          </Badge>
        </div>
      </div>

      {/* Main tabs */}
      <Tabs
        defaultValue="standings"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "standings" | "winners")}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 mb-6 bg-zinc-800">
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
                <SelectTrigger className="w-[200px] bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Select Level" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  {levels.map((level) => (
                    <SelectItem
                      key={level.id}
                      value={level.id}
                      className="hover:bg-zinc-700"
                    >
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <StandingsCard>
            <CardHeader className="bg-zinc-800 pb-4">
              <CardTitle className="text-lg text-white">
                {levels.find((l) => l.id === selectedLevelId)?.name || "Tournament"} Standings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-zinc-400 text-sm border-b border-zinc-800">
                      <th className="py-3 px-4">Rank</th>
                      <th className="py-3 px-4">Team</th>
                      <th className="py-3 px-4 text-center">W</th>
                      <th className="py-3 px-4 text-center">L</th>
                      <th className="py-3 px-4 text-center">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentStandings.map((standing) => (
                      <tr
                        key={`team-${standing.team.id}`}
                        className="border-b border-zinc-800 hover:bg-zinc-800/50"
                      >
                        <td className="py-4 px-4 text-zinc-300">
                          <div className="flex items-center">
                            <span
                              className={`${
                                standing.rank <= 3
                                  ? "text-green-500 font-semibold"
                                  : "text-zinc-400"
                              }`}
                            >
                              #{standing.rank}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="flex -space-x-2 mr-3">
                              {standing.team.members.map((member, i) => (
                                <TeamBadge
                                  key={i}
                                  letter={member.initial}
                                  color={
                                    standing.rank === 1 ? "bg-green-500" : "bg-zinc-700"
                                  }
                                />
                              ))}
                            </div>
                            <span className="font-medium text-white">
                              {standing.team.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center text-green-500 font-medium">
                          {standing.wins}
                        </td>
                        <td className="py-4 px-4 text-center text-red-500 font-medium">
                          {standing.losses}
                        </td>
                        <td className="py-4 px-4 text-center text-white font-semibold">
                          {standing.points}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </StandingsCard>
        </TabsContent>

        {/* Winners tab content */}
        <TabsContent value="winners" className="space-y-6">
          <StandingsCard>
            <CardHeader className="bg-zinc-800 pb-4">
              <CardTitle className="text-lg text-white">Tournament Winners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {winners.length > 0 ? (
                  winners.slice(0, 3).map((winner) => (
                    <div
                      key={`winner-${winner.team.id}`}
                      className={`flex items-center p-4 rounded-lg my-8 ${
                        winner.rank === 1
                          ? "bg-gradient-to-r from-green-600/20 to-transparent border border-green-600/30"
                          : "bg-zinc-800/50 border border-zinc-700/30"
                      }`}
                    >
                      <div className="mr-4">
                        {winner.rank === 1 ? (
                          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                            <Trophy className="h-6 w-6 text-white" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-zinc-700 rounded-full flex items-center justify-center">
                            <Medal className="h-6 w-6 text-white" />
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
                                color={winner.rank === 1 ? "bg-green-500" : "bg-zinc-700"}
                              />
                            ))}
                          </div>
                          <h3 className="text-lg font-semibold text-white">
                            {winner.team.name}
                          </h3>
                        </div>
                      </div>
                      <div>
                        <Badge
                          className={
                            winner.rank === 1
                              ? "bg-yellow-300"
                              : winner.rank === 2
                              ? "bg-zinc-500"
                              : "bg-amber-800"
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
                  <div className="text-center text-gray-400 py-8">
                    No winners data available
                  </div>
                )}
              </div>
            </CardContent>
          </StandingsCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StandingsManagement;