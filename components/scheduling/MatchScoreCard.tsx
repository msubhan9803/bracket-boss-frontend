"use client";

import React, { useState, useMemo } from "react";
import { BsCalendarDate, BsClock, BsLayoutThreeColumns } from "react-icons/bs";
import moment from "moment";
import { MdLocationOn } from "react-icons/md";
import { convertSnakeCaseToTitleCase } from "@/lib/utils";
import { Match, MatchStatusTypes, User } from "@/graphql/generated/graphql";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import useMatchOperations from "@/hooks/match/useMatchOperations";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import TeamAvatar from "./scoring/TeamAvatar";

type StatusBadgeProps = {
  status: MatchStatusTypes;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusBadgeVariants: Record<MatchStatusTypes, string> = {
    [MatchStatusTypes.Completed]: "bg-blue-500 hover:bg-blue-700 text-white",
    [MatchStatusTypes.InProgress]: "bg-green-500 hover:bg-green-700 text-white",
    [MatchStatusTypes.NotStarted]: "bg-gray-500 hover:bg-gray-700 text-white",
    [MatchStatusTypes.Paused]: "bg-yellow-500 hover:bg-yellow-700 text-white",
    [MatchStatusTypes.Void]: "bg-red-500 hover:bg-red-700 text-white",
  };

  return (
    <Badge className={`${statusBadgeVariants[status]} rounded-md text-xs`}>
      {convertSnakeCaseToTitleCase(status)}
    </Badge>
  );
};

type TeamMembersAvatarsProps = {
  users: User[];
  variant?: "primary" | "secondary";
};

const TeamMembersAvatars: React.FC<TeamMembersAvatarsProps> = ({
  users,
  variant,
}) => {
  const avatarClassName = `border-2 border-white w-8 h-8 sm:w-10 sm:h-10 ${
    variant === "secondary"
      ? "bg-secondary text-secondary-foreground"
      : "bg-primary text-primary-foreground"
  } text-xs sm:text-sm`;
  return (
    <div className="flex -space-x-1 sm:-space-x-2">
      {users.slice(0, 3).map((user) => (
        <TeamAvatar key={user.id} user={user} variant={variant} />
      ))}
      {users.length > 3 && (
        <Avatar className={avatarClassName}>
          <AvatarFallback>+{users.length - 3}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

type TeamInfoProps = {
  teamName?: string | null;
  users: User[];
  variant?: "primary" | "secondary";
};

export const TeamInfo: React.FC<TeamInfoProps> = ({
  teamName,
  users,
  variant,
}) => (
  <div className="flex flex-col items-center space-y-1 sm:space-y-2">
    <TeamMembersAvatars users={users} variant={variant} />
    <span className="text-xs sm:text-sm font-medium text-foreground truncate max-w-[80px] sm:max-w-[100px]">
      {teamName ?? "Team"}
    </span>
  </div>
);

type ScoreDisplayProps = {
  homeScore: number;
  awayScore: number;
};

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  homeScore,
  awayScore,
}) => (
  <div className="text-2xl sm:text-3xl font-bold text-foreground flex items-center space-x-2 sm:space-x-3">
    <span className="w-6 sm:w-8 text-center">{homeScore}</span>
    <span>-</span>
    <span className="w-6 sm:w-8 text-center">{awayScore}</span>
  </div>
);

type MatchDetailsProps = {
  poolName?: string | null;
  roundName?: string | null;
  courtName?: string | null;
  matchDate?: Date | null;
  startTime?: string | null;
  endTime?: string | null;
};

export const MatchDetails: React.FC<MatchDetailsProps> = ({
  poolName,
  roundName,
  courtName,
  matchDate,
  startTime,
  endTime,
}) => (
  <div className="space-y-2 sm:space-y-3 py-1 sm:py-2">
    {
      <div className="flex items-center gap-2 text-muted-foreground">
        <BsLayoutThreeColumns className="text-primary text-base sm:text-lg flex-shrink-0" />
        <span className="text-xs sm:text-sm">
          {poolName && roundName
            ? `${poolName} - ${roundName}`
            : poolName || roundName}
        </span>
      </div>
    }
    {courtName && (
      <div className="flex items-center gap-2 text-muted-foreground">
        <MdLocationOn className="text-primary text-base sm:text-lg flex-shrink-0" />
        <span className="text-xs sm:text-sm">{courtName}</span>
      </div>
    )}
    {matchDate && (
      <div className="flex items-center gap-2 text-muted-foreground">
        <BsCalendarDate className="text-primary text-base sm:text-lg flex-shrink-0" />
        <span className="text-xs sm:text-sm">
          {moment(matchDate).format("ddd, MMM Do, YYYY")}
        </span>
      </div>
    )}
    {startTime && endTime && (
      <div className="flex items-center gap-2 text-muted-foreground">
        <BsClock className="text-primary text-base sm:text-lg flex-shrink-0" />
        <span className="text-xs sm:text-sm">
          {moment(startTime, "HH:mm:ss").format("hh:mm A")} -{" "}
          {moment(endTime, "HH:mm:ss").format("hh:mm A")}
        </span>
      </div>
    )}
  </div>
);

type MatchScoreCardProps = {
  match: Match;
  matchIndex?: number;
  refetchMatches: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<Match[], Error>>;
  setCurrentMatchId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setShowUpdateScoreDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MatchScoreCard({
  match,
  refetchMatches,
  setCurrentMatchId,
  setShowUpdateScoreDrawer,
}: MatchScoreCardProps) {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  const homeTeamUsers = useMemo(() => match?.homeTeam?.users ?? [], [match]);
  const awayTeamUsers = useMemo(() => match?.awayTeam?.users ?? [], [match]);
  const matchStatus = useMemo(
    () => match?.status ?? MatchStatusTypes.NotStarted,
    [match]
  );
  const matchCourtSchedule = useMemo(() => match?.matchCourtSchedule, [match]);
  const courtSchedule = useMemo(
    () => matchCourtSchedule?.courtSchedule ?? null,
    [matchCourtSchedule]
  );
  const courtName = useMemo(
    () => courtSchedule?.court.name ?? null,
    [courtSchedule]
  );
  const matchDate = useMemo(
    () => matchCourtSchedule?.matchDate as Date,
    [matchCourtSchedule]
  );
  const startTime = useMemo(
    () => courtSchedule?.timeSlot?.startTime,
    [courtSchedule]
  );
  const endTime = useMemo(
    () => courtSchedule?.timeSlot?.endTime,
    [courtSchedule]
  );

  const { startTournamentMutation } = useMatchOperations();

  const handleStartMatch = async () => {
    await startTournamentMutation.mutateAsync(match.id);
    refetchMatches();
  };

  const handleUpdateScore = () => {
    setCurrentMatchId(match.id);
    setShowUpdateScoreDrawer(true);
  };

  return (
    <Card className="w-full rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-border bg-background">
      <CardHeader className="pb-2 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <CardTitle className="text-base sm:text-lg font-semibold text-foreground">
            {match.title}
          </CardTitle>
          <StatusBadge status={matchStatus} />
        </div>
      </CardHeader>

      <CardContent className="p-3 sm:p-4 space-y-4">
        <div className="text-center py-3 sm:py-4 bg-muted/30 border border-border rounded-lg">
          <div className="flex justify-between items-center px-2 sm:px-6">
            <TeamInfo teamName={match?.homeTeam?.name} users={homeTeamUsers} />
            <ScoreDisplay homeScore={homeScore} awayScore={awayScore} />
            <TeamInfo
              variant="secondary"
              teamName={match?.awayTeam?.name}
              users={awayTeamUsers}
            />
          </div>
        </div>

        <MatchDetails
          poolName={match.pool.name}
          roundName={match.round.name}
          courtName={courtName}
          matchDate={matchDate}
          startTime={startTime}
          endTime={endTime}
        />

        <Separator />
      </CardContent>

      <CardFooter className="pt-0 pb-3 sm:pb-4 px-3 sm:px-4 flex flex-wrap gap-2 justify-end">
        <div className="flex flex-wrap gap-2">
          {matchStatus === MatchStatusTypes.NotStarted && (
            <Button
              variant="secondary"
              size="sm"
              className="text-xs h-8"
              loading={startTournamentMutation.isPending}
              onClick={handleStartMatch}
            >
              Start Match
            </Button>
          )}

          {matchStatus === MatchStatusTypes.InProgress && (
            <Button
              size="sm"
              className="text-xs h-8"
              onClick={handleUpdateScore}
            >
              Update Score
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
