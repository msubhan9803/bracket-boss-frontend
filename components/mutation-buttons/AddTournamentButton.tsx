"use client";
import { Fragment, useMemo, useState } from "react";
import DynamicFormSheet from "@/components/core/DynamicFormSheet";
import { DynamicFormField } from "@/global";
import { CreateTournamentInputDto } from "@/graphql/generated/graphql";
import { Button } from "@/components/ui/button";
import useTournamentOperations from "@/hooks/tournament/useTournamentOperations";
import useBrackets from "@/hooks/bracket/useBrackets";
import { toTitleCase } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface AddTournamentButtonProps {
  refetchTournamentList: () => void;
}

const AddTournamentButton: React.FC<AddTournamentButtonProps> = ({ refetchTournamentList }) => {
  const [showModal, setShowModal] = useState(false);
  const { createTournamentMutation } = useTournamentOperations();
  const { brackets } = useBrackets();
  const clubId = useSelector((state: RootState) => state.user.clubId);

  const formFields: DynamicFormField<CreateTournamentInputDto>[] = useMemo(
    () => [
      {
        label: "Name",
        name: "name",
        type: "text",
        placeholder: "Tournament Name",
        required: true,
        defaultValue: "",
      },
      {
        label: "Description",
        name: "description",
        type: "textarea",
        placeholder: "Description",
        required: true,
        defaultValue: "",
      },
      {
        label: "Start Date",
        name: "start_date",
        type: "date",
        placeholder: "Start Date",
        required: true,
        defaultValue: "",
      },
      {
        label: "End Date",
        name: "end_date",
        type: "date",
        placeholder: "End Date",
        required: true,
        defaultValue: "",
      },
      {
        label: "Is Private?",
        name: "isPrivate",
        type: "switch",
        placeholder: "",
        required: true,
        defaultValue: "",
      },
      {
        label: "Bracket",
        name: "bracketId",
        type: "select",
        placeholder: "Select bracket",
        required: true,
        options: brackets?.map((bracket) => ({
          label: toTitleCase(bracket.name),
          value: bracket.id.toString(),
        })),
        defaultValue: "",
      },
    ],
    [brackets]
  );

  const handleCreating = async (input: CreateTournamentInputDto) => {
    await createTournamentMutation.mutateAsync({
      ...input,
      clubId: clubId as number,
      bracketId: parseInt(input.bracketId.toString()),
    });
    setShowModal(false);
    refetchTournamentList();
  };

  return (
    <Fragment>
      <Button onClick={() => setShowModal(true)} variant="outline">
        Create Tournament
      </Button>
      <DynamicFormSheet
        isOpen={showModal}
        setIsOpen={setShowModal}
        fields={formFields}
        title="Create Tournament"
        description="Creates a new tournament for this club"
        submitButtonLabel="Submit"
        onSubmit={handleCreating}
      />
    </Fragment>
  );
};

export default AddTournamentButton;
