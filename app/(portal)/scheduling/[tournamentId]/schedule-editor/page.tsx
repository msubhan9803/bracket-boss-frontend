import React from "react";
import { NextPage } from "next";
import PageTitle from "@/components/PageTitle";
import { PageProps } from "@/global";
import { PageUrls } from "@/lib/app-types";
import ScheduleEditor from "./_components/ScheduleEditor";
import { getSingleTournament } from "@/server-requests/tournament.server-request";

const ScheduleEditorPage: NextPage<PageProps> = async ({ params }) => {
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
            label: "Schedule Editor",
            href: "",
          },
        ]}
      />

      <ScheduleEditor />
    </div>
  );
};

export default ScheduleEditorPage;
