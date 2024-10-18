"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useGetScheduleOfTournament from "@/hooks/schedule/useGetScheduleOfTournament";
import MatchCard from "@/components/scheduling/MatchCard";

export default function ScheduleEditor() {
  const { tournamentId, userIds } = useSelector(
    (state: RootState) => state.schedule.scheduleOfTorunamentInput
  );

  const { matches, loadingSchedule } = useGetScheduleOfTournament(
    tournamentId as number,
    userIds
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-12">
      {matches.map((match, index) => (
        <MatchCard key={`match-${index}`} index={index} match={match} />
      ))}
    </div>
  );
}
