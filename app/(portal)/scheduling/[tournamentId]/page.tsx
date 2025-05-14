import React from "react";
import { NextPage } from "next";
import { PageProps } from "@/global";
import { PageUrls, PredefinedSystemRoles } from "@/lib/app-types";
import { getAllUsersWithoutPagination } from "@/server-requests/user.server-request";
import { getSingleTournament } from "@/server-requests/tournament.server-request";
import TournamentScheduleTabs from "./_components/TournamentScheduleTabs";
import TournamentHeader from "./_components/TournamentHeader";

const ScheduleDetails: NextPage<PageProps> = async ({ params }) => {
  const users = await getAllUsersWithoutPagination(PredefinedSystemRoles.player);
  const tournamentDetails = await getSingleTournament(parseInt(params.tournamentId));

  return (
    <>
      <TournamentHeader tournamentDetails={tournamentDetails} />

      <TournamentScheduleTabs
        initialState={{
          users,
          tournamentDetails,
        }}
      />
    </>
  );
};

export default ScheduleDetails;
