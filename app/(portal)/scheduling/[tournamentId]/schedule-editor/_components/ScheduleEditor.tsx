"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useGetSchedulePreperationDataOfTournament from "@/hooks/schedule/useGetSchedulePreperationDataOfTournament";
import MatchCard from "@/components/scheduling/MatchCard";
import { MatchType, Tournament } from "@/graphql/generated/graphql";
import { PageUrls } from "@/lib/app-types";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import useGetScheduleOfTournament from "@/hooks/schedule/useGetScheduleOfTournament";
import { useParams } from "next/navigation";

type Props = {
  tournamentDetails: Tournament;
}

export default function ScheduleEditor({ tournamentDetails }: Props) {
  const { tournamentId, userIds } = useSelector(
    (state: RootState) => state.schedule.scheduleOfTorunamentInput
  );
  const params = useParams()
  const { createdMatches } = useGetScheduleOfTournament(parseInt(params.tournamentId as string));
  const { matches: fetchedMatches } = useGetSchedulePreperationDataOfTournament(
    tournamentId as number,
    userIds
  );

  const handleScheduleCreation = async () => {}

  return (
    <>
      <div className="flex justify-between items-center">
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

        <Button onClick={handleScheduleCreation}>Create Schedule</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-12">
        {(createdMatches && createdMatches?.length > 0 ? createdMatches : fetchedMatches).map((match, index) => (
          <MatchCard key={`match-${index}`} index={index} match={match as MatchType} />
        ))}
      </div>
    </>
  );
}