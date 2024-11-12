"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useGetSchedulePreperationDataOfTournament from "@/hooks/schedule/useGetSchedulePreperationDataOfTournament";
import MatchCard from "@/components/scheduling/MatchCard";
import { MatchType, Tournament } from "@/graphql/generated/graphql";
import { MatchTypeScheduleEditorScreen, PageUrls } from "@/lib/app-types";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import useScheduleOperations from "@/hooks/schedule/useScheduleOperations";

type Props = {
  createdMatches: MatchTypeScheduleEditorScreen[]
  tournamentDetails: Tournament;
}

export default function ScheduleEditor({ tournamentDetails, createdMatches }: Props) {
  const clubId = useSelector((state: RootState) => state.user.clubId) as number;
  const { tournamentId, userIds } = useSelector(
    (state: RootState) => state.schedule.scheduleOfTorunamentInput
  );
  const { createScheduleMutation } = useScheduleOperations();
  const { matches: fetchedMatches } = useGetSchedulePreperationDataOfTournament(
    tournamentId as number,
    userIds
  );
  const [matches, setMatches] = useState<MatchTypeScheduleEditorScreen[]>([]);

  useEffect(() => {
    if (createdMatches.length > 0) {
      setMatches(createdMatches);
    } else {
      setMatches(fetchedMatches as MatchTypeScheduleEditorScreen[]);
    }
  }, [createdMatches, fetchedMatches]);

  const handleScheduleCreation = async () => {
    console.log('🌺🌺🌺🌺 matches: ', matches);
    // await createScheduleMutation.mutateAsync({
    //   tournamentId: tournamentId as number,
    //   clubId,
    //   matches,
    // });
  }

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
        {matches.map((match, index) => (
          <MatchCard key={`match-${index}`} index={index} match={match as MatchType} />
        ))}
      </div>
    </>
  );
}