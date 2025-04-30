"use client";
import React, { useState } from "react";
import ImportScheduleDataButton from "@/components/mutation-buttons/ImportScheduleDataButton";
import UserSelectionTable from "@/components/tables/UserSelectionTable";
import { Button } from "@/components/ui/button";
import { Team, User } from "@/graphql/generated/graphql";
import useScheduleCreation from "@/hooks/schedule/useScheduleCreation";
import TeamCard from "@/components/scheduling/TeamCard";

type Props = {
  tournamentId: string;
  users: User[];
  teams: Team[];
};

export default function SchedulePreparation({
  tournamentId,
  users,
  teams,
}: Props) {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const { createTournamentTeamMutation } = useScheduleCreation();
  const [doesTeamExists, setDoesTeamExists] = useState(teams.length > 0);

  const handleUsersSelection = (userIds: number[]) => {
    setSelectedUsers(userIds);
  };

  const handleCreateTeams = async () => {
    await createTournamentTeamMutation.mutateAsync({
      tournamentId: parseInt(tournamentId.toString()),
      users: selectedUsers,
    });
    setDoesTeamExists(true);
  };

  return (
    <div>
      {doesTeamExists ? (
        <ExistingPlayers teams={teams} />
      ) : (
        <SelectPlayers
          selectedUsers={selectedUsers}
          doesTeamExists={doesTeamExists}
          handleCreateTeams={handleCreateTeams}
          handleUsersSelection={handleUsersSelection}
          users={users}
        />
      )}
    </div>
  );
}

function SelectPlayers({
  selectedUsers,
  doesTeamExists,
  handleCreateTeams,
  handleUsersSelection,
  users,
}: {
  selectedUsers: any;
  doesTeamExists: any;
  handleCreateTeams: any;
  handleUsersSelection: any;
  users: any;
}) {
  return (
    <>
      <div className="flex justify-between items-center mt-3 mb-4">
        <h2 className="text-2xl font-bold">
          Select Players{" "}
          {selectedUsers.length > 0 ? `(${selectedUsers.length})` : ""}
        </h2>

        {!doesTeamExists && (
          <div className="space-x-2">
            <ImportScheduleDataButton />
            <Button
              disabled={selectedUsers.length === 0}
              onClick={handleCreateTeams}
            >
              Create Teams
            </Button>
          </div>
        )}
      </div>

      <UserSelectionTable
        users={users}
        handleUsersSelection={handleUsersSelection}
      />
    </>
  );
}

function ExistingPlayers({ teams }: { teams: Team[] }) {
  return (
    <>
      <div className="flex justify-between items-center mt-3 mb-4">
        <h2 className="text-2xl font-bold">Teams</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-12">
        {teams.map((team, teamIndex) => (
          <TeamCard team={team} teamIndex={teamIndex} />
        ))}
      </div>
    </>
  );
}
