import { NextPage } from "next";
import React from "react";
import PageTitle from "@/components/PageTitle";
import UserSelectionTable from "@/components/tables/UserSelectionTable";
import { Button } from "@/components/ui/button";
import { PageProps } from "@/global";
import { PageUrls } from "@/lib/app-types";
import { getSingleTournament } from "@/server-requests/tournament.server-request";
import ImportScheduleDataButton from "@/components/mutation-buttons/ImportScheduleDataButton";

const ScheduleDetails: NextPage<PageProps> = async ({ params }) => {
  const tournamentDetails = await getSingleTournament(
    parseInt(params.tournamentId)
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

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mt-6 mb-4">Select Users</h2>

        <div className="space-x-2">
          <ImportScheduleDataButton />
          <Button>View Schedule</Button>
        </div>
      </div>

      <UserSelectionTable />
    </div>
  );
};

export default ScheduleDetails;
