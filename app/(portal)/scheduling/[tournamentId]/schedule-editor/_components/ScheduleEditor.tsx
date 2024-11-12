"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useGetSchedulePreperationDataOfTournament from "@/hooks/schedule/useGetSchedulePreperationDataOfTournament";
import MatchCard from "@/components/scheduling/MatchCard";
import { MatchType } from "@/graphql/generated/graphql";

export default function ScheduleEditor() {
  const { tournamentId, userIds } = useSelector(
    (state: RootState) => state.schedule.scheduleOfTorunamentInput
  );

  const { matches } = useGetSchedulePreperationDataOfTournament(
    tournamentId as number,
    userIds
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-12">
      {matches.map((match, index) => (
        <MatchCard key={`match-${index}`} index={index} match={match as MatchType} />
      ))}
    </div>
  );
}
