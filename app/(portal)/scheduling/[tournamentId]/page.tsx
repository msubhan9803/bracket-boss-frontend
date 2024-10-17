import { NextPage } from "next";
import React from "react";
import PageTitle from "@/components/PageTitle";
import { PageProps } from "@/global";
import { PageUrls, PredefinedSystemRoles } from "@/lib/app-types";
import { getSingleTournament } from "@/server-requests/tournament.server-request";
import { getAllUsersWithoutPagination } from "@/server-requests/user.server-request";
import SchedulePreparation from "./_components/SchedulePreparation";

const ScheduleDetails: NextPage<PageProps> = async ({ params }) => {
  const tournamentDetails = await getSingleTournament(
    parseInt(params.tournamentId)
  );
  const users = await getAllUsersWithoutPagination(
    PredefinedSystemRoles.player
  );

  return (
    <div>
      <PageTitle
        title={tournamentDetails.name}
        breadcrumbs={[
          {
            label: "Schedule Management",
            href: PageUrls.SCHEDULING_MANAGEMENT,
          },
          {
            label: "Schedule Details",
            href: "",
          },
        ]}
      />

      <SchedulePreparation users={users} />
    </div>
  );
};

export default ScheduleDetails;
