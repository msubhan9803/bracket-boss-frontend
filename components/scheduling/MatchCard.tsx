"use client";
import React, { useMemo } from "react";
import moment from "moment";
import { MdLocationOn } from "react-icons/md";
import { BsCalendarDate, BsClock } from "react-icons/bs";
import { Match, MatchStatusTypes } from "@/graphql/generated/graphql";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { convertSnakeCaseToTitleCase } from "@/lib/utils";

type MatchCardProps = {
  match: Match;
  matchIndex: number;
};

export default function MatchCard({ match, matchIndex }: MatchCardProps) {
  const homeTeam = useMemo(() => match?.homeTeam, [match]);
  const awayTeam = useMemo(() => match?.awayTeam, [match]);
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
    () => courtSchedule?.timeSlot.startTime,
    [courtSchedule]
  );
  const endTime = useMemo(
    () => courtSchedule?.timeSlot.endTime,
    [courtSchedule]
  );

  // Define match status (you can replace this with actual status from your data)
  const matchStatus = match?.status || "Scheduled";

  // Get status badge color based on status
  const getStatusBadgeVariant = (status: MatchStatusTypes) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500 hover:bg-green-600";
      case "in progress":
        return "bg-blue-500 hover:bg-blue-600";
      case "cancelled":
        return "bg-red-500 hover:bg-red-600";
      case "postponed":
        return "bg-orange-500 hover:bg-orange-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <Card className="w-full rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-border bg-background">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between w-full">
          <div className="">
            {match.title}
          </div>
          <Badge className={`${getStatusBadgeVariant(matchStatus)} text-white rounded-md`}>
            {convertSnakeCaseToTitleCase(matchStatus)}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        <div className="text-center py-3 bg-muted/30 border border-border rounded-lg">
          <h3 className="text-xl font-bold text-foreground">
            {homeTeam?.name ?? "Home Team"}{" "}
            <span className="text-muted-foreground px-2">vs</span>{" "}
            {awayTeam?.name ?? "Away Team"}
          </h3>
        </div>

        <div className="space-y-3 py-2">
          {courtName && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MdLocationOn className="text-primary text-lg flex-shrink-0" />
              <span className="text-sm">{courtName}</span>
            </div>
          )}
          {matchDate && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <BsCalendarDate className="text-primary text-lg flex-shrink-0" />
              <span className="text-sm">
                {moment(matchDate).format("ddd, MMM Do, YYYY")}
              </span>
            </div>
          )}
          {startTime && endTime && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <BsClock className="text-primary text-lg flex-shrink-0" />
              <span className="text-sm">
                {moment(startTime, "HH:mm:ss").format("hh:mm A")} -{" "}
                {moment(endTime, "HH:mm:ss").format("hh:mm A")}
              </span>
            </div>
          )}
        </div>

        <Separator />
      </CardContent>

      <CardFooter className="pt-2 pb-4 px-4 flex flex-wrap gap-2 justify-end">
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="text-xs">
            Update Timing
          </Button>
          <Button variant="secondary" size="sm" className="text-xs">
            Change Court
          </Button>
          <Button variant="destructive" size="sm" className="text-xs">
            Delete Match
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
