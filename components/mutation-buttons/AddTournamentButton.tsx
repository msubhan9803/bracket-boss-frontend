"use client";
import { Fragment, useMemo, useState } from "react";
import DynamicFormSheet from "@/components/core/DynamicFormSheet";
import { DynamicFormField } from "@/global";
import { CreateTournamentInputDto } from "@/graphql/generated/graphql";
import { Button } from "@/components/ui/button";
import useTournamentOperations from "@/hooks/tournament/useTournamentOperations";
import useFormats from "@/hooks/format/useFormats";
import { toTitleCase } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface AddTournamentButtonProps {
  refetchTournamentList: () => void;
}

const AddTournamentButton: React.FC<AddTournamentButtonProps> = ({ refetchTournamentList }) => {
  const [showModal, setShowModal] = useState(false);
  const { createTournamentMutation } = useTournamentOperations();
  const { formats } = useFormats();
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
        defaultValue: false,
      },
      {
        label: "Format",
        name: "formatId",
        type: "select",
        placeholder: "Select format",
        required: true,
        options: formats?.map((format) => ({
          label: toTitleCase(format.name),
          value: format.id.toString(),
        })),
        defaultValue: "",
      },
    ],
    [formats]
  );

  const handleCreating = async (input: CreateTournamentInputDto) => {
    await createTournamentMutation.mutateAsync({
      ...input,
      clubId: clubId as number,
      formatId: parseInt(input.formatId.toString()),
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
