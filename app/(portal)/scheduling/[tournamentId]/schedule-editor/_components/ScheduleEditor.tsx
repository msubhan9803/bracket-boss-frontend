"use client";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { RootState } from "@/redux/store";
import useGetSchedulePreperationDataOfTournament from "@/hooks/schedule/useGetSchedulePreperationDataOfTournament";
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
import MatchesContainer from "@/components/scheduling/MatchesContainer";

type Props = {
  tournamentDetails: Tournament;
};

export default function ScheduleEditor({ tournamentDetails }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { tournamentId, userIds } = useSelector(
    (state: RootState) => state.schedule.scheduleOfTorunamentInput
  );
  const clubId = useSelector((state: RootState) => state.user.clubId);
  const params = useParams();

  const { createdMatches, useGetScheduleOfTournamentRefetch, isLoading: createdMatchesLoading } = useGetScheduleOfTournament(parseInt(params.tournamentId as string));
  const { matches: fetchedMatches, refetchSchedules, loadingSchedule } = useGetSchedulePreperationDataOfTournament(
    tournamentId as number,
    userIds,
  );

  const { createScheduleMutation } = useScheduleCreation();
  const { deleteScheduleMutation } = useDeleteCreation();
  
  const [matches, setMatches] = useState<MatchType[] | CreatedMatchType[]>([]);

  const doesCreatedMatchesExist = useMemo(() => createdMatches && createdMatches.length > 0, [createdMatches]);
  const doesFetchedMatchesExist = useMemo(() => fetchedMatches.length > 0, [fetchedMatches]);
  const showCreateButton = useMemo(
    () => !doesCreatedMatchesExist && doesFetchedMatchesExist,
    [doesCreatedMatchesExist, doesFetchedMatchesExist]
  );
  const showDeleteButton = useMemo(() => doesCreatedMatchesExist, [doesCreatedMatchesExist]);
  const showMatches = useMemo(() => doesCreatedMatchesExist || doesFetchedMatchesExist, [doesCreatedMatchesExist, doesFetchedMatchesExist]);

  useEffect(() => {
    if (createdMatches?.length > 0) {
      setMatches(createdMatches);
    } else if (fetchedMatches?.length > 0) {
      setMatches(fetchedMatches);
    } else {
      setMatches([]);
    }
  }, [createdMatches, fetchedMatches]);

  const handleScheduleCreation = async () => {
    await createScheduleMutation.mutateAsync({
      clubId: clubId as number,
      tournamentId: parseInt(params.tournamentId as string),
      matches: (fetchedMatches as MatchType[]).map((match) => ({
        matchDate: new Date(),
        teams: match.teams.map((team) => ({
          name: team.name,
          userIds: team.players.map((player) => player.id),
        })),
      }))
    });
    await useGetScheduleOfTournamentRefetch();
    await refetchSchedules();
  };

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
  };

  const goToScheduleEditorScreen = () => {
    router.push(`${PageUrls.SCHEDULING_MANAGEMENT}/${params.tournamentId}/${PageNames.SCHEDULE_PREPARATION}`);
  };

  const onDragEnd = useCallback((result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) return;

    // If the location didn't change
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newMatches = Array.from(matches);

    if (type === "MATCH") {
      // Reorder matches
      const [removed] = newMatches.splice(source.index, 1);
      newMatches.splice(destination.index, 0, removed);
      setMatches(newMatches);
      return;
    }

    if (type === "TEAM") {
      const sourceMatchIndex = parseInt(source.droppableId.split("-")[2]);
      const destMatchIndex = parseInt(destination.droppableId.split("-")[2]);

      const sourceMatch = { ...newMatches[sourceMatchIndex] };
      const destMatch = { ...newMatches[destMatchIndex] };

      const sourceTeams = Array.from(sourceMatch.teams);
      const [removedTeam] = sourceTeams.splice(source.index, 1);

      if (sourceMatchIndex === destMatchIndex) {
        sourceTeams.splice(destination.index, 0, removedTeam);
        sourceMatch.teams = sourceTeams;
        newMatches[sourceMatchIndex] = sourceMatch;
      } else {
        const destTeams = Array.from(destMatch.teams);
        destTeams.splice(destination.index, 0, removedTeam);
        sourceMatch.teams = sourceTeams;
        destMatch.teams = destTeams;
        newMatches[sourceMatchIndex] = sourceMatch;
        newMatches[destMatchIndex] = destMatch;
      }

      setMatches(newMatches);
      return;
    }

    if (type === "PLAYER") {
      const parseDroppableId = (id: string) => {
        const parts = id.split("-");
        return {
          matchIndex: parseInt(parts[2]),
          teamIndex: parseInt(parts[3])
        };
      };

      const { matchIndex: sMatchI, teamIndex: sTeamI } = parseDroppableId(source.droppableId);
      const { matchIndex: dMatchI, teamIndex: dTeamI } = parseDroppableId(destination.droppableId);

      const sourceMatch = { ...newMatches[sMatchI] };
      const destMatch = { ...newMatches[dMatchI] };
      const sourceTeam = { ...sourceMatch.teams[sTeamI] };
      const destTeam = { ...destMatch.teams[dTeamI] };

      const sourcePlayers = Array.from(sourceTeam.players as any);
      const [removedPlayer] = sourcePlayers.splice(source.index, 1);

      if (sMatchI === dMatchI && sTeamI === dTeamI) {
        // reorder players within the same team
        sourcePlayers.splice(destination.index, 0, removedPlayer);
        sourceTeam.players = sourcePlayers as any;
        sourceMatch.teams[sTeamI] = sourceTeam;
        newMatches[sMatchI] = sourceMatch;
      } else {
        // moving player to a different team
        const destPlayers = Array.from(destTeam.players as any);
        destPlayers.splice(destination.index, 0, removedPlayer);
        sourceTeam.players = sourcePlayers as any;
        destTeam.players = destPlayers as any;
        sourceMatch.teams[sTeamI] = sourceTeam;
        destMatch.teams[dTeamI] = destTeam;
        newMatches[sMatchI] = sourceMatch;
        newMatches[dMatchI] = destMatch;
      }

      setMatches(newMatches);
      return;
    }
  }, [matches]);

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
          {showDeleteButton && (
            <Button variant='secondary' onClick={handleScheduleDelete} loading={deleteScheduleMutation.isPending}>
              Delete Schedule
            </Button>
          )}

          {showCreateButton && (
            <Button onClick={handleScheduleCreation} loading={createScheduleMutation.isPending}>
              Create Schedule
            </Button>
          )}
        </div>
      </div>

      {(createdMatchesLoading || loadingSchedule) && (
        <div className="flex-1 w-full flex items-center justify-center my-auto">
          <LoadingSpinner />
        </div>
      )}

      {!doesCreatedMatchesExist && !doesFetchedMatchesExist && !(createdMatchesLoading || loadingSchedule) && (
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
      )}

      {showMatches && (
        <DragDropContext onDragEnd={onDragEnd}>
          <MatchesContainer matches={matches as MatchType[]} />
        </DragDropContext>
      )}
    </>
  );
}
