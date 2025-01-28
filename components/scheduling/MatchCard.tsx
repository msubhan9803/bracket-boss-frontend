"use client";
import React from "react";
import moment from "moment";
import { MdLocationOn } from "react-icons/md";
import { BsCalendarDate, BsClock } from "react-icons/bs";
import { CreatedMatchType } from "@/hooks/schedule/useGetScheduleOfTournament";
import TeamsContainer from "./TeamsContainer";

type MatchCardProps = {
  match: CreatedMatchType;
  matchIndex: number;
};

export default function MatchCard({ match, matchIndex }: MatchCardProps) {
  return (
    <div className="p-4 bg-muted/50 rounded-lg border border-secondary hover:border-primary shadow-md">
      <h3 className="font-bold mb-2 text-primary">Match {matchIndex + 1}</h3>
      <div className="my-5 space-y-3">
        {match?.courtName && (
          <h4 className="font-bold flex items-center gap-2 text-sm">
            <MdLocationOn className="text-primary text-xl" />
            {match?.courtName}
          </h4>
        )}
        {match?.schedule && (
          <h4 className="font-bold flex items-center gap-2 text-sm">
            <BsCalendarDate className="text-primary text-xl" />
            {moment(match?.schedule).format("MMMM Do YYYY")}
          </h4>
        )}
        {match?.startTime && match?.endTime && (
          <h4 className="font-bold flex items-center gap-2 text-sm">
            <BsClock className="text-primary text-xl" />
            {moment(match?.startTime, "HH:mm:ss").format("hh:mm A")} -{" "}
            {moment(match?.endTime, "HH:mm:ss").format("hh:mm A")}
          </h4>
        )}
      </div>

      <TeamsContainer matchIndex={matchIndex} teams={match.teams as any} />
    </div>
  );
}
