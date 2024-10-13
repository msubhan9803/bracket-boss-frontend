"use client";
import { Fragment, useMemo, useState } from "react";
import DynamicFormSheet from "@/components/core/DynamicFormSheet";
import { DynamicFormField } from "@/global";
import { CreateTeamInputDto, Tournament } from "@/graphql/generated/graphql";
import { Button } from "@/components/ui/button";
import { toTitleCase } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import useTeamOperations from "@/hooks/team/useTeamOperations";

interface AddTeamButtonProps {
  refetchTeamList: () => void;
  tournaments: Tournament[];
}

const AddTeamButton: React.FC<AddTeamButtonProps> = ({ refetchTeamList, tournaments }) => {
  const [showModal, setShowModal] = useState(false);
  const { createTeamMutation } = useTeamOperations();
  const clubId = useSelector((state: RootState) => state.user.clubId) as number;

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
        defaultValue: "",
      },
    ],
    [tournaments]
  );

  const handleCreating = async (input: CreateTeamInputDto) => {
    await createTeamMutation.mutateAsync({
      ...input,
      clubId,
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
