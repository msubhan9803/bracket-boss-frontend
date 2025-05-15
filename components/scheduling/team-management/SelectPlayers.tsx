import ImportScheduleDataButton from "@/components/mutation-buttons/ImportScheduleDataButton";
import UserSelectionTable from "@/components/tables/UserSelectionTable";
import { Button } from "@/components/ui/button";
import { User } from "@/graphql/generated/graphql";

type SelectPlayersProps = {
  selectedUsers: number[];
  doesTeamExists: boolean;
  users: User[];
  loadingCreateTournamentTeamMutation: boolean;
  handleCreateTeams: () => Promise<void>;
  handleUsersSelection: (userIds: number[]) => void;
};

export default function SelectPlayers({
  selectedUsers,
  doesTeamExists,
  users,
  loadingCreateTournamentTeamMutation,
  handleCreateTeams,
  handleUsersSelection,
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
              loading={loadingCreateTournamentTeamMutation}
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
