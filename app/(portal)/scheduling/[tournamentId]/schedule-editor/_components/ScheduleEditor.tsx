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
    <div>
      {matches.map((match, index) => (
        <MatchCard key={`match-${index}`} match={match} />
      ))}
    </div>
  );
}
