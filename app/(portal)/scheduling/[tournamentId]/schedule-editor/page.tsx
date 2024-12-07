import React from "react";
import { NextPage } from "next";
import { PageProps } from "@/global";
import ScheduleEditor from "./_components/ScheduleEditor";
import { getSingleTournament } from "@/server-requests/tournament.server-request";

const ScheduleEditorPage: NextPage<PageProps> = async ({ params }) => {
  const tournamentId = parseInt(params.tournamentId as string);
  const tournamentDetails = await getSingleTournament(tournamentId);

  return (
    <ScheduleEditor
      tournamentDetails={tournamentDetails}
    />
  );
};

export default ScheduleEditorPage;
