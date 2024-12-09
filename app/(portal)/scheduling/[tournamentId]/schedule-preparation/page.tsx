import { NextPage } from "next";
import React from "react";
import PageTitle from "@/components/PageTitle";
import { PageProps } from "@/global";
import { PageUrls, PredefinedSystemRoles } from "@/lib/app-types";
import { getSingleTournament } from "@/server-requests/tournament.server-request";
import { getAllUsersWithoutPagination } from "@/server-requests/user.server-request";
import SchedulePreparation from "./_components/SchedulePreparation";
import { toTitleCase } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
        render={
          <div className="my-4">
            <h1 className="text-lg font-semibold md:text-2xl">
              {tournamentDetails.name}
            </h1>

            <Badge className="my-2" variant='secondary'>
              {`${toTitleCase(tournamentDetails.format.name)} - ${toTitleCase(
                tournamentDetails.teamGenerationType.name
              )}`}
            </Badge>
          </div>
        }
        breadcrumbs={[
          {
            label: "Schedule Management",
            href: PageUrls.SCHEDULING_MANAGEMENT,
          },
          {
            label: "Schedule Preparation",
            href: "",
          },
        ]}
      />

      <SchedulePreparation tournamentId={params.tournamentId} users={users} />
    </div>
  );
};

export default ScheduleDetails;
