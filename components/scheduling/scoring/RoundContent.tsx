import { Match, MatchRoundStatusTypes } from "@/graphql/generated/graphql";
import { Card } from "@/components/ui/card";
import TeamAvatars from "./TeamAvatars";
import ScoreDisplay from "./ScoreDisplay";
import TeamAvatar from "./TeamAvatar";
import { Button } from "@/components/ui/button";

interface RoundContentProps {
  round: {
    value: string;
    label: string;
    status: MatchRoundStatusTypes;
    id: number;
  };
  match: Match;
  team1Score: number;
  team2Score: number;
  endRoundLoading: boolean;
  onTeam1ScoreChange: (score: number) => void;
  onTeam2ScoreChange: (score: number) => void;
  onStartRound?: (roundId: number) => void;
  onEndRound?: (roundId: number) => void;
}

const RoundContent: React.FC<RoundContentProps> = ({
  round,
  match,
  team1Score,
  team2Score,
  endRoundLoading,
  onTeam1ScoreChange,
  onTeam2ScoreChange,
  onStartRound,
  onEndRound,
}) => {
  const roundStatus = round.status;
  const roundId = round.id;

  return (
    <>
      {roundStatus === MatchRoundStatusTypes.NotStarted && (
        <div className="flex flex-col items-center justify-center space-y-4 py-20">
          <p className="text-lg font-medium">Round not started yet</p>
          <Button className="flex-1" onClick={() => onStartRound?.(roundId)}>
            Start Match Round
          </Button>
        </div>
      )}

      {roundStatus === MatchRoundStatusTypes.InProgress && (
        <div className="space-y-4">
          <div className="flex flex-col space-y-4">
            <Card className="p-4 rounded-lg shadow-sm">
              <div className="flex flex-col justify-center md:flex-row md:items-center md:justify-between">
                <TeamAvatars team={match.homeTeam} />
                <ScoreDisplay
                  score={team1Score}
                  onIncrement={() => onTeam1ScoreChange(team1Score + 1)}
                  onDecrement={() =>
                    onTeam1ScoreChange(Math.max(0, team1Score - 1))
                  }
                  onScoreChange={onTeam1ScoreChange}
                />
              </div>
            </Card>

            <Card className="p-4 rounded-lg shadow-sm">
              <div className="flex flex-col justify-center md:flex-row md:items-center md:justify-between">
                <TeamAvatars team={match.awayTeam} variant="secondary" />
                <ScoreDisplay
                  score={team2Score}
                  onIncrement={() => onTeam2ScoreChange(team2Score + 1)}
                  onDecrement={() =>
                    onTeam2ScoreChange(Math.max(0, team2Score - 1))
                  }
                  onScoreChange={onTeam2ScoreChange}
                />
              </div>
            </Card>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
            <Button
              className="flex-1"
              variant="secondary"
              onClick={() => onEndRound?.(roundId)}
              loading={endRoundLoading}
            >
              End Match Round
            </Button>
          </div>
        </div>
      )}

      {roundStatus === MatchRoundStatusTypes.Completed && (
        <div className="flex flex-col items-center justify-center space-y-4 py-8">
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
