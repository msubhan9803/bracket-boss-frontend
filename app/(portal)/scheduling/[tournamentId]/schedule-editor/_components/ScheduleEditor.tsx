"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter, useParams } from 'next/navigation';
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import useGetSchedulePreperationDataOfTournament from "@/hooks/schedule/useGetSchedulePreperationDataOfTournament";
import MatchCard from "@/components/scheduling/MatchCard";
import { MatchType, Tournament } from "@/graphql/generated/graphql";
import { PageNames, PageUrls } from "@/lib/app-types";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import useGetScheduleOfTournament, { CreatedMatchType } from "@/hooks/schedule/useGetScheduleOfTournament";
import useScheduleCreation from "@/hooks/schedule/useScheduleCreation";
import useDeleteCreation from "@/hooks/schedule/useDeleteCreation";
import { setScheduleOfTorunamentInput } from "@/redux/slices/schedule.slice";
import ImportScheduleDataButton from "@/components/mutation-buttons/ImportScheduleDataButton";
import LoadingSpinner from "@/components/core/LoadingSpinner";

type Props = {
  tournamentDetails: Tournament;
}

export default function ScheduleEditor({ tournamentDetails }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { tournamentId, userIds } = useSelector(
    (state: RootState) => state.schedule.scheduleOfTorunamentInput
  );
  const clubId = useSelector((state: RootState) => state.user.clubId);
  const params = useParams()
  const [matches, setMatches] = useState<MatchType[] | CreatedMatchType[]>([])
  const { createdMatches, useGetScheduleOfTournamentRefetch, isLoading: createdMatchesLoading } = useGetScheduleOfTournament(parseInt(params.tournamentId as string));
  const { matches: fetchedMatches, refetchSchedules, loadingSchedule } = useGetSchedulePreperationDataOfTournament(
    tournamentId as number,
    userIds,
  );
  const { createScheduleMutation } = useScheduleCreation();
  const { deleteScheduleMutation } = useDeleteCreation();

  const doesCreatedMatchesExist = useMemo(() => createdMatches && createdMatches?.length > 0, [createdMatches]);
  const doesFetchedMatchesExist = useMemo(() => fetchedMatches.length > 0, [fetchedMatches]);
  const showCreateButton = useMemo(() => !doesCreatedMatchesExist && doesFetchedMatchesExist, [doesCreatedMatchesExist, doesFetchedMatchesExist]);
  const showDeleteButton = useMemo(() => doesCreatedMatchesExist, [doesCreatedMatchesExist]);
  const showMatches = useMemo(() => doesCreatedMatchesExist || doesFetchedMatchesExist, [doesCreatedMatchesExist, doesFetchedMatchesExist]);

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
    await refetchSchedules();
  }

  const handleScheduleDelete = async () => {
    await deleteScheduleMutation.mutateAsync({
      tournamentId: parseInt(params.tournamentId as string)
    });
    dispatch(setScheduleOfTorunamentInput({
      tournamentId: null,
      userIds: [],
    }));
    await useGetScheduleOfTournamentRefetch();
    await refetchSchedules();
  }

  const goToScheduleEditorScreen = () => {
    router.push(`${PageUrls.SCHEDULING_MANAGEMENT}/${params.tournamentId}/${PageNames.SCHEDULE_PREPARATION}`)
  }

  useEffect(() => {
    if (createdMatches?.length > 0) {
      setMatches(createdMatches);
    } else if (fetchedMatches?.length > 0) {
      setMatches(fetchedMatches);
    } else {
      setMatches([]);
    }
  }, [createdMatches, fetchedMatches]);

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
            showDeleteButton && (
              <Button variant='secondary' onClick={handleScheduleDelete} loading={deleteScheduleMutation.isPending}>
                Delete Schedule
              </Button>
            )
          }

          {showCreateButton && (
            <Button onClick={handleScheduleCreation} loading={createScheduleMutation.isPending}>
              Create Schedule
            </Button>
          )}
        </div>
      </div>

      {
        showMatches ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-12">
            {matches.map((match, index) => (
              <MatchCard key={`match-${index}`} index={index} match={match as MatchType} />
            ))}
          </div>
        ) : ''
      }

      {
        createdMatchesLoading || loadingSchedule ? (
          <div className="flex-1 w-full flex items-center justify-center my-auto">
            <LoadingSpinner />
          </div>
        ) :
          !doesCreatedMatchesExist && !doesFetchedMatchesExist ? (
            <div className="flex-1 w-full flex items-center justify-center my-auto">
              <div className="flex flex-col items-center gap-y-4">
                <h2 className="text-primary text-2xl">No schedule found</h2>
                <Button onClick={goToScheduleEditorScreen}>Go back to select users</Button>

                <div className="flex items-center my-2">
                  <div className="border-t border-1 border-gray-600 flex-grow w-8"></div>
                  <div className="px-3 text-gray-400 text-sm">OR</div>
                  <div className="border-t border-1 border-gray-600 flex-grow w-8"></div>
                </div>

                <ImportScheduleDataButton />
              </div>
            </div>
          ) :
          ''
      }
    </>
  );
}