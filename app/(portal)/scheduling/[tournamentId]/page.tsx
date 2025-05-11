import React from "react";
import { NextPage } from "next";
import { PageProps } from "@/global";
import { PageUrls, PredefinedSystemRoles } from "@/lib/app-types";
import { getAllUsersWithoutPagination } from "@/server-requests/user.server-request";
import PageTitle from "@/components/PageTitle";
import { toTitleCase } from "@/lib/utils";
import { getSingleTournament } from "@/server-requests/tournament.server-request";
import { Badge } from "@/components/ui/badge";
import TournamentScheduleTabs from "./_components/TournamentScheduleTabs";

const ScheduleDetails: NextPage<PageProps> = async ({ params }) => {
  const users = await getAllUsersWithoutPagination(PredefinedSystemRoles.player);
  const tournamentDetails = await getSingleTournament(parseInt(params.tournamentId));

  return (
    <>
      <PageTitle
        render={
          <div className="my-4">
            <h1 className="text-lg font-semibold md:text-2xl">
              {tournamentDetails.name}
            </h1>

            <Badge className="my-2" variant="secondary">
              {`${toTitleCase(tournamentDetails.teamGenerationType.name)}`}
            </Badge>
          </div>
        }
        breadcrumbs={[
          {
            label: "Schedule Management",
            href: PageUrls.SCHEDULING_MANAGEMENT,
          },
          {
            label: "Team Management",
            href: "",
          },
        ]}
      />

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
