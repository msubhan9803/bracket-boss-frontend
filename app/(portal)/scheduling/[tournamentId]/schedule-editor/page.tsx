import React from "react";
import { NextPage } from "next";
import { PageProps } from "@/global";
import { MatchTypeScheduleEditorScreen } from "@/lib/app-types";
import ScheduleEditor from "./_components/ScheduleEditor";
import { getSingleTournament } from "@/server-requests/tournament.server-request";
import { getScheduleOfTournament } from "@/server-requests/schedule.server-request";

const ScheduleEditorPage: NextPage<PageProps> = async ({ params }) => {
  const tournamentId = parseInt(params.tournamentId as string);
  const scheduleData = await getScheduleOfTournament(tournamentId);
  const createdMatches = scheduleData.schedule.matches.map((match) => {
    return {
      name: `${match.awayTeam.name} vs ${match.homeTeam.name}`,
      teams: [
        {
          name: match.awayTeam.name,
          players: match.awayTeam.users?.map((user) => ({ name: user?.name })),
        },
        {
          name: match.homeTeam.name,
          players: match.homeTeam.users?.map((user) => ({ name: user?.name })),
        }
      ]
    };
  })
  const tournamentDetails = await getSingleTournament(tournamentId);

  return (
    <div>
      <ScheduleEditor tournamentDetails={tournamentDetails} createdMatches={createdMatches as MatchTypeScheduleEditorScreen[]} />
    </div>
  );
};

export default ScheduleEditorPage;
