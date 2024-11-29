"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from 'next/navigation'
import useGetSchedulePreperationDataOfTournament from "@/hooks/schedule/useGetSchedulePreperationDataOfTournament";
import MatchCard from "@/components/scheduling/MatchCard";
import { MatchType, Tournament } from "@/graphql/generated/graphql";
import { PageNames, PageUrls } from "@/lib/app-types";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import useGetScheduleOfTournament from "@/hooks/schedule/useGetScheduleOfTournament";
import { useParams } from "next/navigation";
import useScheduleCreation from "@/hooks/schedule/useScheduleCreation";
import useDeleteCreation from "@/hooks/schedule/useDeleteCreation";

type Props = {
  tournamentDetails: Tournament;
}

export default function ScheduleEditor({ tournamentDetails }: Props) {
  const { tournamentId, userIds } = useSelector(
    (state: RootState) => state.schedule.scheduleOfTorunamentInput
  );
  const clubId = useSelector((state: RootState) => state.user.clubId);
  const params = useParams()
  const { createdMatches, useGetScheduleOfTournamentRefetch } = useGetScheduleOfTournament(parseInt(params.tournamentId as string));
  const { matches: fetchedMatches } = useGetSchedulePreperationDataOfTournament(
    tournamentId as number,
    userIds
  );
  const { createScheduleMutation } = useScheduleCreation();
  const { deleteScheduleMutation } = useDeleteCreation();
  const router = useRouter()

  const handleScheduleCreation = async () => {
    await createScheduleMutation.mutateAsync({
      clubId: clubId as number,
      tournamentId: parseInt(params.tournamentId as string),
      matches: fetchedMatches.map((match) => {
        return {
          matchDate: new Date(),
          teams: match.teams.map((team) => {
            return {
              name: team.name,
              userIds: team.players.map((player) => player.id),
            }
          })
        };
      })
    });
    await useGetScheduleOfTournamentRefetch();
  }

  const handleScheduleDelete = async () => {
    await deleteScheduleMutation.mutateAsync({
      tournamentId: parseInt(params.tournamentId as string)
    });
    await useGetScheduleOfTournamentRefetch();
  }

  const goToScheduleEditorScreen = () => {
    router.push(`${PageUrls.SCHEDULING_MANAGEMENT}/${params.tournamentId}/${PageNames.SCHEDULE_PREPARATION}`)
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
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

        <div className="space-x-2 my-2 lg:my-0 flex items-center">
          {
            createdMatches && createdMatches?.length > 0 && (
              <Button variant='secondary' onClick={handleScheduleDelete} loading={deleteScheduleMutation.isPending}>Delete Schedule</Button>
            )
          }
          <Button onClick={handleScheduleCreation} loading={createScheduleMutation.isPending}>Create Schedule</Button>
        </div>
      </div>

      {
        fetchedMatches.length > 0 || (createdMatches && createdMatches?.length > 0) ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-12">
            {(createdMatches && createdMatches?.length > 0 ? createdMatches : fetchedMatches).map((match, index) => (
              <MatchCard key={`match-${index}`} index={index} match={match as MatchType} />
            ))}
          </div>
        ) : ''
      }

      {
        fetchedMatches.length === 0 && createdMatches?.length === 0 && (
          <div className="flex-1 w-full flex items-center justify-center my-auto">
            <div className="flex flex-col items-center gap-y-4">
              <h2 className="text-primary text-2xl">No schedule found</h2>
              <Button onClick={goToScheduleEditorScreen}>Go back to select users</Button>
            </div>
          </div>
        )
      }
    </>
  );
}