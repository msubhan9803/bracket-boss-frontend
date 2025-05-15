"use client";
import React, { useMemo, useState } from "react";
import { Team, User } from "@/graphql/generated/graphql";
import useScheduleCreation from "@/hooks/schedule/useScheduleCreation";
import SelectPlayers from "@/components/scheduling/team-management/SelectPlayers";
import useTeamsByTournamentId from "@/hooks/team/useTeamsByTournamentId";
import ExistingTeams from "@/components/scheduling/team-management/ExistingTeams";
import LoadingSpinner from "@/components/core/LoadingSpinner";

type Props = {
  tournamentId: string;
  users: User[];
};

export default function TeamContent({ tournamentId, users }: Props) {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const { createTournamentTeamMutation } = useScheduleCreation();
  const { teamsByTournament, loadingTeamsByTournament, refetchTeamList } =
    useTeamsByTournamentId(parseInt(tournamentId));
  const doesTeamExists = useMemo(
    () => teamsByTournament.length > 0,
    [teamsByTournament]
  );

  const handleUsersSelection = (userIds: number[]) => {
    setSelectedUsers(userIds);
  };

  const handleCreateTeams = async () => {
    await createTournamentTeamMutation.mutateAsync({
      tournamentId: parseInt(tournamentId.toString()),
      users: selectedUsers,
    });
    refetchTeamList();
  };

  if (loadingTeamsByTournament) {
    return <LoadingSpinner className="my-36" />;
  }

  return (
    <div>
      {doesTeamExists ? (
        <ExistingTeams
          isLoading={loadingTeamsByTournament}
          teams={teamsByTournament}
        />
      ) : (
        <SelectPlayers
          selectedUsers={selectedUsers}
          doesTeamExists={doesTeamExists}
          users={users}
          loadingCreateTournamentTeamMutation={createTournamentTeamMutation.isPending}
          handleCreateTeams={handleCreateTeams}
          handleUsersSelection={handleUsersSelection}
        />
      )}
    </div>
  );
}
