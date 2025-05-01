"use client";
import React, { useMemo } from "react";
import moment from "moment";
import { MdLocationOn } from "react-icons/md";
import { BsCalendarDate, BsClock } from "react-icons/bs";
import { Match } from "@/graphql/generated/graphql";

type MatchCardProps = {
  match: Match;
  matchIndex: number;
};

export default function MatchCard({ match, matchIndex }: MatchCardProps) {
  const matchCourtSchedule = useMemo(() => match?.matchCourtSchedule, [match]);
  const courtSchedule = useMemo(() => matchCourtSchedule?.courtSchedule, [matchCourtSchedule]);
  const courtName = useMemo(() => courtSchedule?.court.name, [courtSchedule]);
  const matchDate = useMemo(() => matchCourtSchedule?.matchDate as Date, [matchCourtSchedule]);
  const startTime = useMemo(() => courtSchedule?.timeSlot.startTime, [courtSchedule]);
  const endTime = useMemo(() => courtSchedule?.timeSlot.endTime, [courtSchedule]);

  return (
    <div className="p-4 bg-muted/50 rounded-lg border border-secondary hover:border-primary shadow-md">
      <h3 className="font-bold mb-2 text-primary">Match {matchIndex + 1}</h3>
      <div className="my-5 space-y-3">
        {courtName && (
          <h4 className="font-bold flex items-center gap-2 text-sm">
            <MdLocationOn className="text-primary text-xl" />
            {courtName}
          </h4>
        )}
        {matchDate && (
          <h4 className="font-bold flex items-center gap-2 text-sm">
            <BsCalendarDate className="text-primary text-xl" />
            {moment(matchDate).format("ddd, MMM Do, YYYY")}
          </h4>
        )}
        {startTime && endTime && (
          <h4 className="font-bold flex items-center gap-2 text-sm">
            <BsClock className="text-primary text-xl" />
            {moment(startTime, "HH:mm:ss").format("hh:mm A")} -{" "}
            {moment(endTime, "HH:mm:ss").format("hh:mm A")}
          </h4>
        )}
      </div>
    </div>
  );
}
