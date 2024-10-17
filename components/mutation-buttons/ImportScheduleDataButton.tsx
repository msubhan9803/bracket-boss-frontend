"use client";
import { Fragment, useMemo, useState } from "react";
import DynamicFormSheet from "@/components/core/DynamicFormSheet";
import { DynamicFormField } from "@/global";
import { CreateTeamInputDto } from "@/graphql/generated/graphql";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import useTeamOperations from "@/hooks/team/useTeamOperations";

const ImportScheduleDataButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { createTeamMutation } = useTeamOperations();
  const clubId = useSelector((state: RootState) => state.user.clubId) as number;

  const formFields: DynamicFormField<CreateTeamInputDto>[] = useMemo(
    () => [],
    []
  );

  const handleCreating = async (input: CreateTeamInputDto) => {
    await createTeamMutation.mutateAsync({
      ...input,
      tournamentId: parseInt(input.tournamentId.toString()),
      clubId,
      userIds: input.userIds.map((id) => parseInt(id.toString())),
    });
    setShowModal(false);
  };

  return (
    <Fragment>
      <Button onClick={() => setShowModal(true)} variant="secondary">
        Import data
      </Button>
      <DynamicFormSheet
        isOpen={showModal}
        setIsOpen={setShowModal}
        fields={formFields}
        title="Import Schedule data"
        description="Upload a CSV file to import schedule data"
        submitButtonLabel="Submit"
        onSubmit={handleCreating}
      />
    </Fragment>
  );
};

export default ImportScheduleDataButton;
