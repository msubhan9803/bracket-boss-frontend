import React from "react";
import { NextPage } from "next";
import { PageProps } from "@/global";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Scheduling from "./_components/tabs/Scheduling";
import Scoring from "./_components/tabs/Scoring";
import Standings from "./_components/tabs/Standings";
import Team from "./_components/tabs/Team";
import { PageUrls, PredefinedSystemRoles } from "@/lib/app-types";
import { getAllUsersWithoutPagination } from "@/server-requests/user.server-request";
import PageTitle from "@/components/PageTitle";
import { toTitleCase } from "@/lib/utils";
import Footer from "./_components/Footer";
import { getSingleTournament } from "@/server-requests/tournament.server-request";
import { Badge } from "@/components/ui/badge";
import { getAllTeamsByTournamentId } from "@/server-requests/team.server-request";

const ScheduleDetails: NextPage<PageProps> = async ({ params }) => {
  const users = await getAllUsersWithoutPagination(
    PredefinedSystemRoles.player
  );
  const tournamentDetails = await getSingleTournament(
    parseInt(params.tournamentId)
  );

  const tabs = [
    {
      value: "team",
      label: "Team",
      content: <Team tournamentId={params.tournamentId} users={users} />,
    },
    { value: "scheduling", label: "Scheduling", content: <Scheduling /> },
    { value: "scoring", label: "Scoring", content: <Scoring /> },
    { value: "standing", label: "Standing", content: <Standings /> },
  ];

  return (
    <>
      <PageTitle
        render={
          <div className="my-4">
            <h1 className="text-lg font-semibold md:text-2xl">
              {tournamentDetails.name}
            </h1>

            <Badge className="my-2" variant="secondary">
              {`${toTitleCase(
                tournamentDetails.playOffFormat.name
              )} - ${toTitleCase(tournamentDetails.teamGenerationType.name)}`}
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

      <Tabs defaultValue={tabs[0].value} className="w-full">
        <TabsList className="mx-auto">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="my-8 min-h-[560px]">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>

      {/* <Footer /> */}
    </>
  );
};

export default ScheduleDetails;
