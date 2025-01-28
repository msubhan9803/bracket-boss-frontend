"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import { DragDropContext } from "@hello-pangea/dnd";
import { RootState } from "@/redux/store";
import useGetSchedulePreperationDataOfTournament from "@/hooks/schedule/useGetSchedulePreperationDataOfTournament";
import { MatchType, TeamType, Tournament } from "@/graphql/generated/graphql";
import { PageNames, PageUrls } from "@/lib/app-types";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import useGetScheduleOfTournament, {
  CreatedMatchType,
} from "@/hooks/schedule/useGetScheduleOfTournament";
import useScheduleCreation from "@/hooks/schedule/useScheduleCreation";
import useDeleteCreation from "@/hooks/schedule/useDeleteCreation";
import { setScheduleOfTorunamentInput } from "@/redux/slices/schedule.slice";
import ImportScheduleDataButton from "@/components/mutation-buttons/ImportScheduleDataButton";
import LoadingSpinner from "@/components/core/LoadingSpinner";
import MatchesContainer from "@/components/scheduling/MatchesContainer";
import useScheduleDragAndDrop from "@/hooks/schedule/useScheduleDragAndDrop";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TeamsGlobalContainer from "@/components/scheduling/TeamsGlobalContainer";
import { toTitleCase } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Dialog from "@/components/shared/Dialog";

type Props = {
  tournamentDetails: Tournament;
};

type Match = MatchType | CreatedMatchType;

export default function ScheduleEditor({ tournamentDetails }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { tournamentId, userIds } = useSelector(
    (state: RootState) => state.schedule.scheduleOfTorunamentInput
  );
  const clubId = useSelector((state: RootState) => state.user.clubId);
  const params = useParams();
  const [deleteScheduleOpen, setDeleteScheduleOpen] = useState(false);

  const {
    createdMatches,
    useGetScheduleOfTournamentRefetch,
    isLoading: createdMatchesLoading,
  } = useGetScheduleOfTournament(parseInt(params.tournamentId as string));
  const {
    matches: fetchedMatches,
    refetchSchedules,
    loadingSchedule,
  } = useGetSchedulePreperationDataOfTournament(
    tournamentId as number,
    userIds
  );

  const [matches, setMatches] = useState<Match[]>([]);
  const [activeTab, setActiveTab] = useState<"matches" | "teams">("matches");

  const doesCreatedMatchesExist = useMemo(
    () => createdMatches && createdMatches.length > 0,
    [createdMatches]
  );
  const doesFetchedMatchesExist = useMemo(
    () => fetchedMatches.length > 0,
    [fetchedMatches]
  );

  const showCreateButton = useMemo(
    () => !doesCreatedMatchesExist && doesFetchedMatchesExist,
    [doesCreatedMatchesExist, doesFetchedMatchesExist]
  );
  const showDeleteButton = useMemo(
    () => doesCreatedMatchesExist,
    [doesCreatedMatchesExist]
  );
  const showMatches = useMemo(
    () => doesCreatedMatchesExist || doesFetchedMatchesExist,
    [doesCreatedMatchesExist, doesFetchedMatchesExist]
  );

  useEffect(() => {
    if (createdMatches?.length > 0) {
      setMatches(createdMatches);
    } else if (fetchedMatches?.length > 0) {
      setMatches(fetchedMatches as any);
    } else {
      setMatches([]);
    }
  }, [createdMatches, fetchedMatches]);

  const { createScheduleMutation } = useScheduleCreation();
  const { deleteScheduleMutation } = useDeleteCreation();

  // Extract all unique teams from all matches
  const allTeams = useMemo(() => {
    const uniqueTeamsMap: { [teamName: string]: TeamType } = {};
    for (const match of matches) {
      const typedMatch = match as MatchType;
      for (const team of typedMatch.teams) {
        // Use team.name as a unique key. If you have team.id, use that instead.
        if (!uniqueTeamsMap[team.name]) {
          uniqueTeamsMap[team.name] = team;
        }
      }
    }
    return Object.values(uniqueTeamsMap);
  }, [matches]);

  const { onDragEnd } = useScheduleDragAndDrop({
    matches,
    setMatches,
    activeTab,
    allTeams,
  });

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
      })),
    });
    await useGetScheduleOfTournamentRefetch();
    await refetchSchedules();
  };

  const handleScheduleDelete = async () => {
    await deleteScheduleMutation.mutateAsync({
      tournamentId: parseInt(params.tournamentId as string),
    });
    setDeleteScheduleOpen(false);
    dispatch(
      setScheduleOfTorunamentInput({
        tournamentId: null,
        userIds: [],
      })
    );
    await useGetScheduleOfTournamentRefetch();
    await refetchSchedules();
  };

  const goToScheduleEditorScreen = () => {
    router.push(
      `${PageUrls.SCHEDULING_MANAGEMENT}/${params.tournamentId}/${PageNames.SCHEDULE_PREPARATION}`
    );
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <PageTitle
          render={
            <div className="my-4">
              <h1 className="text-lg font-semibold md:text-2xl">
                {tournamentDetails.name}
              </h1>

              <Badge className="my-2" variant="secondary">
                {`${toTitleCase(tournamentDetails.format.name)} - ${toTitleCase(
                  tournamentDetails.teamGenerationType.name
                )}`}
              </Badge>
            </div>
          }
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
            <Button
              variant="secondary"
              onClick={() => setDeleteScheduleOpen(!deleteScheduleOpen)}
              loading={deleteScheduleMutation.isPending}
            >
              Delete Schedule
            </Button>
          )}

          {showCreateButton && (
            <Button
              onClick={handleScheduleCreation}
              loading={createScheduleMutation.isPending}
            >
              Create Schedule
            </Button>
          )}
        </div>
      </div>

      {createdMatchesLoading || loadingSchedule ? (
        <div className="flex-1 w-full flex items-center justify-center my-auto">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {!doesCreatedMatchesExist &&
            !doesFetchedMatchesExist &&
            !(createdMatchesLoading || loadingSchedule) && (
              <div className="flex-1 w-full flex items-center justify-center my-auto">
                <div className="flex flex-col items-center gap-y-4">
                  <h2 className="text-primary text-2xl">No schedule found</h2>
                  <Button onClick={goToScheduleEditorScreen}>
                    Go back to select users
                  </Button>

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
            <Tabs
              value={activeTab}
              onValueChange={(val: any) =>
                setActiveTab(val as "matches" | "teams")
              }
            >
              <TabsList>
                <TabsTrigger value="matches">Matches</TabsTrigger>
                <TabsTrigger value="teams">Teams</TabsTrigger>
              </TabsList>
              <TabsContent value="matches">
                <DragDropContext onDragEnd={onDragEnd}>
                  <MatchesContainer matches={matches as CreatedMatchType[]} />
                </DragDropContext>
              </TabsContent>
              <TabsContent value="teams">
                <DragDropContext onDragEnd={onDragEnd}>
                  <TeamsGlobalContainer teams={allTeams} />
                </DragDropContext>
              </TabsContent>
            </Tabs>
          )}

          <Dialog
            open={deleteScheduleOpen}
            onOpenChange={setDeleteScheduleOpen}
            title="Do you want to delete this schedule?"
            description="This action cannot be undone. This will permanently delete this item."
            onConfirm={handleScheduleDelete}
            onCancel={() => setDeleteScheduleOpen(false)}
            confirmLoading={deleteScheduleMutation.isPending}
          />
        </>
      )}
    </>
  );
}
