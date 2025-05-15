"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tournament, User } from "@/graphql/generated/graphql";
import Scheduling from "./tabs/Scheduling";
import Scoring from "./tabs/Scoring";
import Standings from "./tabs/Standings";
import Team from "./tabs/Team";
import { Button } from "@/components/ui/button";
import useScheduleOperations from "@/hooks/schedule/useScheduleOperations";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  initialState: {
    users: User[];
    tournamentDetails: Tournament;
  };
};

export default function TournamentScheduleTabs({ initialState }: Props) {
  const router = useRouter();
  const { users, tournamentDetails } = initialState;
  const tournamentId = useMemo(() => tournamentDetails.id, [tournamentDetails]);

  const [deleteScheduleModalOpen, setDeleteScheduleModalOpen] = useState(false);

  const { deleteScheduleMutation } = useScheduleOperations();

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
        return <Scoring tournamentId={tournamentId} />;
      case "standing":
        return <Standings tournamentId={tournamentId} />;
      default:
        return null;
    }
  };

  const handleDeleteSchedule = async () => {
    try {
      await deleteScheduleMutation.mutateAsync({
        tournamentId: parseInt(tournamentId),
      });
      router.back();
    } catch (error) {
      console.error("Failed to delete schedule:", error);
    }
  };

  return (
    <>
      <Tabs
        defaultValue={activeTab}
        className="w-full flex-1 flex flex-col"
        onValueChange={(value) => setActiveTab(value)}
      >
        <div className="flex justify-between items-center">
          <TabsList className="self-start">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <Button onClick={() => setDeleteScheduleModalOpen(true)} variant="secondary">
            Delete Schedule
          </Button>
        </div>

        <TabsContent value={activeTab} className="flex-1 flex flex-col my-8">
          {renderTabContent()}
        </TabsContent>
      </Tabs>

      <Dialog open={deleteScheduleModalOpen} onOpenChange={setDeleteScheduleModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription className="pt-2">
              Do you want to delete schedule?
            </DialogDescription>
            <div className="pt-5 w-full flex flex-col md:flex-row gap-4">
              <Button
                onClick={() => setDeleteScheduleModalOpen(false)}
                className="w-full"
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteSchedule}
                loading={deleteScheduleMutation.isPending}
                className="w-full"
              >
                Delete Schedule
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
