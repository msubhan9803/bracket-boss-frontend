import { Match, MatchRoundStatusTypes } from "@/graphql/generated/graphql";
import RoundActionButton from "./RoundActionButton";
import { Card } from "@/components/ui/card";
import TeamAvatars from "./TeamAvatars";
import ScoreDisplay from "./ScoreDisplay";
import TeamAvatar from "./TeamAvatar";

const RoundContent = ({
    round,
    match,
    team1Score,
    team2Score,
    setTeam1Score,
    setTeam2Score,
    onStartRound,
    onEndRound,
    onUpdateScore,
  }: {
    round: {
      value: string;
      label: string;
      status: MatchRoundStatusTypes;
      id: number;
    };
    match: Match;
    team1Score: number;
    team2Score: number;
    setTeam1Score: (score: number) => void;
    setTeam2Score: (score: number) => void;
    onStartRound?: (roundId: number) => void;
    onEndRound?: (roundId: number) => void;
    onUpdateScore?: (roundId: number) => void;
  }) => {
    const roundStatus = round.status;
    const roundId = round.id;
  
    return (
      <>
        {roundStatus === MatchRoundStatusTypes.NotStarted && (
          <div className="flex flex-col items-center justify-center space-y-4 py-20">
            <p className="text-lg font-medium">Round not started yet</p>
            <RoundActionButton
              onClick={() => onStartRound?.(roundId)}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Start Match Round
            </RoundActionButton>
          </div>
        )}
  
        {roundStatus === MatchRoundStatusTypes.InProgress && (
          <div className="space-y-4">
            <div className="flex flex-col space-y-4">
              <Card className="p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <TeamAvatars team={match.homeTeam}  />
                  <ScoreDisplay
                    score={team1Score}
                    onIncrement={() => setTeam1Score(team1Score + 1)}
                    onDecrement={() => setTeam1Score(Math.max(0, team1Score - 1))}
                  />
                </div>
              </Card>
  
              <Card className="p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <TeamAvatars team={match.awayTeam} variant="secondary" />
                  <ScoreDisplay
                    score={team2Score}
                    onIncrement={() => setTeam2Score(team2Score + 1)}
                    onDecrement={() => setTeam2Score(Math.max(0, team2Score - 1))}
                  />
                </div>
              </Card>
            </div>
  
            <div className="flex items-center justify-between gap-4 mt-8">
              <RoundActionButton onClick={() => onUpdateScore?.(roundId)}>
                Update Score
              </RoundActionButton>
              <RoundActionButton onClick={() => onEndRound?.(roundId)}>
                End Match Round
              </RoundActionButton>
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
                      <TeamAvatar key={user.id} user={user} />
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
                      <TeamAvatar key={user.id} user={user} />
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

  export default RoundContent;