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

  const formFields: DynamicFormField<any>[] = useMemo(
    () => [
      {
        type: "render",
        className: "col-span-2",
        isVisible: true,
        render: () => (
          <h1 className='text-lg font-bold'>Court Details</h1>
        ),
      },
      {
        label: "Name",
        name: "name",
        type: "text",
        placeholder: "Tournament Name",
        required: true,
        defaultValue: "",
        className: 'col-span-2',
      },
      {
        label: "Location",
        name: "location",
        type: "text",
        placeholder: "Court Location",
        required: true,
        defaultValue: "",
        className: 'col-span-2',
      },
      {
        label: "Court Length",
        name: "courtLength",
        type: "number",
        placeholder: "e.g. 10",
        suffixRender: <p>feet</p>,
        defaultValue: '',
        className: 'col-span-2 lg:col-span-1',
      },
      {
        label: "Court Width",
        name: "courtWidth",
        type: "number",
        placeholder: "e.g. 10",
        suffixRender: <p>feet</p>,
        className: 'col-span-2 lg:col-span-1',
      },
      {
        type: "render",
        className: "col-span-2 my-2",
        isVisible: true,
        render: () => (
          <hr />
        ),
      },
      {
        type: "render",
        className: "col-span-2",
        isVisible: true,
        render: () => (
          <h1 className='text-lg font-bold'>Court Timings</h1>
        ),
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
        submitButtonLabel="Save Changes"
        onSubmit={handleCreating}
        fixedFooter
        formGridCols="grid-cols-2"
      />
    </Fragment>
  );
};

export default AddCourtButton;
