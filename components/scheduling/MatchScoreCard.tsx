"use client";

import React, { useState, useMemo } from "react";
import { BsCalendarDate, BsClock, BsLayoutThreeColumns } from "react-icons/bs";
import moment from "moment";
import { MdLocationOn } from "react-icons/md";
import { convertSnakeCaseToTitleCase } from "@/lib/utils";
import { Match, MatchStatusTypes } from "@/graphql/generated/graphql";
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

type MatchScoreCardProps = {
  match: Match;
  matchIndex?: number;
  refetchMatches: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<Match[], Error>>;
  setCurrentMatchId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setShowUpdateScoreDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};

const statusBadgeVariants: Record<MatchStatusTypes, string> = {
  [MatchStatusTypes.Completed]: "bg-blue-500 hover:bg-blue-700 text-white",
  [MatchStatusTypes.InProgress]: "bg-green-500 hover:bg-green-700 text-white",
  [MatchStatusTypes.NotStarted]: "bg-gray-500 hover:bg-gray-700 text-white",
  [MatchStatusTypes.Paused]: "bg-yellow-500 hover:bg-yellow-700 text-white",
  [MatchStatusTypes.Void]: "bg-red-500 hover:bg-red-700 text-white",
};

export default function MatchScoreCard({
  match,
  refetchMatches,
  setCurrentMatchId,
  setShowUpdateScoreDrawer
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
          <Badge
            className={`${statusBadgeVariants[matchStatus]} rounded-md text-xs`}
          >
            {convertSnakeCaseToTitleCase(matchStatus)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-3 sm:p-4 space-y-4">
        <div className="text-center py-3 sm:py-4 bg-muted/30 border border-border rounded-lg">
          <div className="flex justify-between items-center px-2 sm:px-6">
            {/* Home Team */}
            <div className="flex flex-col items-center space-y-1 sm:space-y-2">
              <div className="flex -space-x-1 sm:-space-x-2">
                {homeTeamUsers.slice(0, 3).map((user) => (
                  <Avatar
                    key={user.id}
                    className="border-2 border-white w-8 h-8 sm:w-10 sm:h-10"
                  >
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs sm:text-sm">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {homeTeamUsers.length > 3 && (
                  <Avatar className="border-2 border-white w-8 h-8 sm:w-10 sm:h-10">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs sm:text-sm">
                      +{homeTeamUsers.length - 3}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
              <span className="text-xs sm:text-sm font-medium text-foreground truncate max-w-[80px] sm:max-w-[100px]">
                {match?.homeTeam?.name ?? "Home Team"}
              </span>
            </div>

            {/* Score */}
            <div className="text-2xl sm:text-3xl font-bold text-foreground flex items-center space-x-2 sm:space-x-3">
              <span className="w-6 sm:w-8 text-center">{homeScore}</span>
              <span>-</span>
              <span className="w-6 sm:w-8 text-center">{awayScore}</span>
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center space-y-1 sm:space-y-2">
              <div className="flex -space-x-1 sm:-space-x-2">
                {awayTeamUsers.slice(0, 3).map((user) => (
                  <Avatar
                    key={user.id}
                    className="border-2 border-white w-8 h-8 sm:w-10 sm:h-10"
                  >
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-xs sm:text-sm">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {awayTeamUsers.length > 3 && (
                  <Avatar className="border-2 border-white w-8 h-8 sm:w-10 sm:h-10">
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-xs sm:text-sm">
                      +{awayTeamUsers.length - 3}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
              <span className="text-xs sm:text-sm font-medium text-foreground truncate max-w-[80px] sm:max-w-[100px]">
                {match?.awayTeam?.name ?? "Away Team"}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2 sm:space-y-3 py-1 sm:py-2">
          {match.pool.name && match.round.name && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <BsLayoutThreeColumns className="text-primary text-base sm:text-lg flex-shrink-0" />
              <span className="text-xs sm:text-sm">
                {match.pool.name} - {match.round.name}
              </span>
            </div>
          )}
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
            <Button size="sm" className="text-xs h-8" onClick={handleUpdateScore}>
              Update Score
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
