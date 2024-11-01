"use client";
import { Fragment, useMemo, useState } from "react";
import DynamicFormSheet from "@/components/core/DynamicFormSheet";
import { DynamicFormField } from "@/global";
import { CreateCourtInputDto } from "@/graphql/generated/graphql";
import { Button } from "@/components/ui/button";
import useCourtOperations from "@/hooks/court/useCourtOperations";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface AddCourtButtonButtonProps {
  refetchCourtList: () => void;
}

const AddCourtButton: React.FC<AddCourtButtonButtonProps> = ({
  refetchCourtList,
}) => {
  const [showModal, setShowModal] = useState(false);
  const { createCourtMutation } = useCourtOperations();
  const clubId = useSelector((state: RootState) => state.user.clubId);

  const formFields: DynamicFormField<CreateCourtInputDto>[] = useMemo(
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
        label: "Location",
        name: "location",
        type: "text",
        placeholder: "Court Location",
        required: true,
        defaultValue: "",
      },
    ],
    []
  );

  const handleCreating = async (input: CreateCourtInputDto) => {
    await createCourtMutation.mutateAsync({
      ...input,
      clubId: clubId as number,
    });
    setShowModal(false);
    refetchCourtList();
  };

  return (
    <Fragment>
      <Button onClick={() => setShowModal(true)} variant="outline">
        Create Court
      </Button>
      <DynamicFormSheet
        isOpen={showModal}
        setIsOpen={setShowModal}
        fields={formFields}
        title="Create Court"
        description="Creates a new court for this club"
        submitButtonLabel="Submit"
        onSubmit={handleCreating}
      />
    </Fragment>
  );
};

export default AddCourtButton;
