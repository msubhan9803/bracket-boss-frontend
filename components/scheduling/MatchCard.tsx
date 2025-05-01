"use client";
import React, { useMemo } from "react";
import moment from "moment";
import { MdLocationOn } from "react-icons/md";
import { BsCalendarDate, BsClock } from "react-icons/bs";
import { Match } from "@/graphql/generated/graphql";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

type MatchCardProps = {
  match: Match;
  matchIndex: number;
};

export default function MatchCard({ match, matchIndex }: MatchCardProps) {
  const homeTeam = useMemo(() => match?.homeTeam, [match]);
  const awayTeam = useMemo(() => match?.awayTeam, [match]);
  const matchCourtSchedule = useMemo(() => match?.matchCourtSchedule, [match]);
  const courtSchedule = useMemo(() => matchCourtSchedule?.courtSchedule ?? null, [matchCourtSchedule]);
  const courtName = useMemo(() => courtSchedule?.court.name ?? null, [courtSchedule]);
  const matchDate = useMemo(() => matchCourtSchedule?.matchDate as Date, [matchCourtSchedule]);
  const startTime = useMemo(() => courtSchedule?.timeSlot.startTime, [courtSchedule]);
  const endTime = useMemo(() => courtSchedule?.timeSlot.endTime, [courtSchedule]);

  return (
    <Card className="w-full rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-border bg-background">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-lg font-bold text-foreground">
          <Badge className="bg-primary text-primary-foreground">Match {matchIndex + 1}</Badge>
          <span className="truncate">Game Details</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        <div className="text-center py-3 bg-muted/30 rounded-lg">
          <h3 className="text-xl font-bold text-foreground">
            {homeTeam?.name ?? "Home Team"} <span className="text-muted-foreground px-2">vs</span> {awayTeam?.name ?? "Away Team"}
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
              <span className="text-sm">{moment(matchDate).format("ddd, MMM Do, YYYY")}</span>
            </div>
          )}
          {startTime && endTime && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <BsClock className="text-primary text-lg flex-shrink-0" />
              <span className="text-sm">
                {moment(startTime, "HH:mm:ss").format("hh:mm A")} - {moment(endTime, "HH:mm:ss").format("hh:mm A")}
              </span>
            </div>
          )}
        </div>

        <Separator />

        <div className="text-xs text-muted-foreground">
          Match ID: <span className="font-mono">{match?.id || "N/A"}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-2 pb-4 px-4 flex flex-wrap gap-2 justify-end">
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="text-xs">Update Timing</Button>
          <Button variant="secondary" size="sm" className="text-xs">Change Court</Button>
          <Button variant="destructive" size="sm" className="text-xs">Delete Match</Button>
        </div>
      </CardFooter>
    </Card>
  );
}