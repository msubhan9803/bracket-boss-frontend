"use client";
import { Fragment, useMemo, useState } from "react";
import DynamicFormSheet from "@/components/core/DynamicFormSheet";
import { DynamicFormField } from "@/global";
import {
  CreateTeamInputDto,
  Tournament,
  User,
} from "@/graphql/generated/graphql";
import { Button } from "@/components/ui/button";
import { toTitleCase } from "@/lib/utils";
import useTeamOperations from "@/hooks/team/useTeamOperations";

interface AddTeamButtonProps {
  refetchTeamList: () => void;
  tournaments: Tournament[];
  users: User[];
}

const AddTeamButton: React.FC<AddTeamButtonProps> = ({
  refetchTeamList,
  tournaments,
  users,
}) => {
  const [showModal, setShowModal] = useState(false);
  const { createTeamMutation } = useTeamOperations();

  const formFields: DynamicFormField<CreateTeamInputDto>[] = useMemo(
    () => [
      {
        label: "Name",
        name: "name",
        type: "text",
        placeholder: "Team Name",
        required: true,
        defaultValue: "",
      },
      {
        label: "Tournament",
        name: "tournamentId",
        type: "select",
        placeholder: "Select tournament",
        required: true,
        options: tournaments?.map((tournament) => ({
          label: toTitleCase(tournament.name),
          value: tournament.id.toString(),
        })),
        defaultValue: [],
      },
      {
        label: "Users",
        name: "userIds",
        type: "multi-select",
        placeholder: "Select tournament",
        required: true,
        options: users?.map((user) => ({
          label: `${toTitleCase(user.name)} - ${user.email}`,
          value: user.id.toString(),
        })),
        defaultValue: [],
      },
    ],
    [tournaments, users]
  );

  const handleCreating = async (input: CreateTeamInputDto) => {
    await createTeamMutation.mutateAsync({
      ...input,
      tournamentId: parseInt(input.tournamentId.toString()),
      userIds: input.userIds.map((id) => parseInt(id.toString())),
    });
    setShowModal(false);
    refetchTeamList();
  };

  return (
    <Fragment>
      <Button onClick={() => setShowModal(true)} variant="outline">
        Create Team
      </Button>
      <DynamicFormSheet
        isOpen={showModal}
        setIsOpen={setShowModal}
        fields={formFields}
        title="Create Team"
        description="Creates a new team for this club"
        submitButtonLabel="Submit"
        onSubmit={handleCreating}
      />
    </Fragment>
  );
};

export default AddTeamButton;
