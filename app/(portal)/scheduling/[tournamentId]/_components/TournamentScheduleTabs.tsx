"use client";

import React, { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tournament, User } from "@/graphql/generated/graphql";
import Scheduling from "./tabs/Scheduling";
import Scoring from "./tabs/Scoring";
import Standings from "./tabs/Standings";
import Team from "./tabs/Team";

type Props = {
  initialState: {
    users: User[];
    tournamentDetails: Tournament;
  };
};

export default function TournamentScheduleTabs({ initialState }: Props) {
  const { users, tournamentDetails } = initialState;
  const tournamentId = useMemo(() => tournamentDetails.id, [tournamentDetails]);

  const tabs = [
    { value: "team", label: "Team" },
    { value: "scheduling", label: "Scheduling" },
    { value: "scoring", label: "Scoring" },
    { value: "standing", label: "Standing" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const renderTabContent = () => {
    switch (activeTab) {
      case "team":
        return <Team tournamentId={tournamentId} users={users} />;
      case "scheduling":
        return <Scheduling tournamentId={tournamentId} />;
      case "scoring":
        return <Scoring tournamentDetails={tournamentDetails} />;
      case "standing":
        return <Standings />;
      default:
        return null;
    }
  };

  return (
    <>
      <Tabs
        defaultValue={activeTab}
        className="w-full flex-1 flex flex-col"
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="self-start">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="flex-1 flex flex-col my-8">
          {renderTabContent()}
        </TabsContent>
      </Tabs>
    </>
  );
}
