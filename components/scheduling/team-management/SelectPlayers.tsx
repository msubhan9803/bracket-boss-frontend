import ImportScheduleDataButton from "@/components/mutation-buttons/ImportScheduleDataButton";
import UserSelectionTable from "@/components/tables/UserSelectionTable";
import { User } from "@/graphql/generated/graphql";
import { Button } from "@tremor/react";

type SelectPlayersProps = {
  selectedUsers: number[];
  doesTeamExists: boolean;
  handleCreateTeams: () => Promise<void>;
  handleUsersSelection: (userIds: number[]) => void;
  users: User[];
};

export default function SelectPlayers({
  selectedUsers,
  doesTeamExists,
  handleCreateTeams,
  handleUsersSelection,
  users,
}: SelectPlayersProps) {
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
